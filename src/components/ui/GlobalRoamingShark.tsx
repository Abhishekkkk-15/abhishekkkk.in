"use client";

import { useEffect, useRef } from "react";

interface SampledPixel {
  x: number;
  y: number;
  brightness: number;
  r: number;
  g: number;
  b: number;
  spineS: number; // Orthogonal progress along spine (0 = snout, 1 = caudal tip)
  distPerp: number; // Signed lateral distance from spine
}

export default function GlobalRoamingShark({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000, active: false, speed: 0, lastX: 0, lastY: 0, lastTime: 0 });

  // Physics simulation state preserved across animation frames
  const physicsRef = useRef({
    x: 0,
    y: 0,
    heading: 0.2, // radians
    turnRate: 0,
    bankAngle: 0,
    speed: 42, // pixels per second
    targetSpeed: 42,
    targetHeading: 0.2,
    swimCycle: 0,
    wanderTimer: 0,
    burstTimer: 0,
    depth: 0.6, // 0 = deep abyss, 1 = near surface
    targetDepth: 0.6,
    initialized: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Snout and tail coordinates in source image
    const snoutX = 0.167;
    const snoutY = 0.241;
    const tailX = 0.861;
    const tailY = 0.741;
    const spineDx = tailX - snoutX;
    const spineDy = tailY - snoutY;
    const spineLenSq = spineDx * spineDx + spineDy * spineDy;
    const spineLen = Math.sqrt(spineLenSq);
    const sourceSpineAngle = Math.atan2(spineDy, spineDx); // ~0.627 rad (35.9 deg)

    // Load source image to extract exact shark silhouette
    const img = new Image();
    img.src = "/images/shark.jfif";

    let sampledShark: SampledPixel[] = [];

    img.onload = () => {
      const offCanvas = document.createElement("canvas");
      const cols = 36;
      const rows = 54;
      offCanvas.width = cols;
      offCanvas.height = rows;
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, cols, rows);
      const imgData = offCtx.getImageData(0, 0, cols, rows).data;

      const pixels: SampledPixel[] = [];

      for (let r = 0; r < rows; r++) {
        const ny = r / rows;
        for (let c = 0; c < cols; c++) {
          const nx = c / cols;

          // Clean shark silhouette bounds
          if (ny < 0.22 || ny > 0.78) continue;
          if (ny < 0.35 && nx > 0.65) continue;
          if (nx < 0.14 || nx > 0.92) continue;
          // Filter out detached left artifact
          if (ny > 0.50 && nx < 0.32) continue;

          const idx = (r * cols + c) * 4;
          const red = imgData[idx];
          const green = imgData[idx + 1];
          const blue = imgData[idx + 2];
          const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

          if (luminance > 0.20) {
            // Compute true orthogonal projection onto anatomical spine axis
            const dx = nx - snoutX;
            const dy = ny - snoutY;
            const spineProgress = Math.max(0, Math.min(1, (dx * spineDx + dy * spineDy) / spineLenSq));
            const distPerp = (dx * spineDy - dy * spineDx) / spineLen;

            pixels.push({
              x: nx,
              y: ny,
              brightness: luminance,
              r: red,
              g: green,
              b: blue,
              spineS: spineProgress,
              distPerp: distPerp,
            });
          }
        }
      }

      sampledShark = pixels;
    };

    // Fallback parametric points
    const generateFallbackShark = (): SampledPixel[] => {
      const fallback: SampledPixel[] = [];
      const cols = 32;
      const rows = 48;

      for (let r = 0; r < rows; r++) {
        const ny = 0.24 + (r / rows) * 0.50;
        const progress = r / rows;
        const spineX = 0.22 + progress * 0.60;
        let bodyW = 0.12 * Math.sin(progress * Math.PI);
        if (progress > 0.6) bodyW = 0.06 * (1 - (progress - 0.6) / 0.4);

        for (let c = 0; c < cols; c++) {
          const nx = c / cols;
          const dist = Math.abs(nx - spineX);
          if (dist < bodyW) {
            const b = 1 - dist / bodyW;
            fallback.push({
              x: nx,
              y: ny,
              brightness: b,
              r: Math.floor(180 + b * 75),
              g: Math.floor(220 + b * 35),
              b: 255,
              spineS: progress,
              distPerp: nx - spineX,
            });
          }
        }
      }
      return fallback;
    };

    const fallbackShark = generateFallbackShark();

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Initialize position to comfortable center-right if first run
      if (!physicsRef.current.initialized && width > 0 && height > 0) {
        physicsRef.current.x = width * 0.65;
        physicsRef.current.y = height * 0.45;
        physicsRef.current.initialized = true;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const m = mousePosRef.current;
      const dt = m.lastTime > 0 ? (now - m.lastTime) * 0.001 : 0.016;
      if (dt > 0.005) {
        const mdx = e.clientX - m.lastX;
        const mdy = e.clientY - m.lastY;
        m.speed = Math.sqrt(mdx * mdx + mdy * mdy) / dt;
        m.lastX = e.clientX;
        m.lastY = e.clientY;
        m.lastTime = now;
      }
      m.x = e.clientX;
      m.y = e.clientY;
      m.active = true;
    };

    const handleMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    let lastFrameTime = performance.now();

    // Helper: angle difference wrapped to [-PI, PI]
    const normalizeAngle = (a: number) => {
      while (a > Math.PI) a -= 2 * Math.PI;
      while (a < -Math.PI) a += 2 * Math.PI;
      return a;
    };

    const render = (now: number) => {
      const rawDt = (now - lastFrameTime) * 0.001;
      lastFrameTime = now;
      const dt = Math.min(Math.max(rawDt, 0.004), 0.06); // bounded delta time

      ctx.clearRect(0, 0, width, height);

      const p = physicsRef.current;
      const mouse = mousePosRef.current;

      // -------------------------------------------------------------
      // 1. BIOMECHANICAL STEERING & AUTONOMOUS HYDRODYNAMICS
      // -------------------------------------------------------------
      p.wanderTimer -= dt;
      if (p.wanderTimer <= 0) {
        // Pick smooth new exploration heading across open water
        p.wanderTimer = 3.5 + Math.random() * 4.0;
        // Bias towards center of screen with gentle random wander
        const centerDir = Math.atan2(height * 0.5 - p.y, width * 0.5 - p.x);
        p.targetHeading = centerDir + (Math.random() - 0.5) * 1.4;
        p.targetSpeed = 38 + Math.random() * 18; // cruising speed variations
        p.targetDepth = 0.35 + Math.random() * 0.55; // vertical dive level
      }

      // Smooth depth transition (Z-axis swimming)
      p.depth += (p.targetDepth - p.depth) * 0.6 * dt;

      // Boundary repulsion: turn gracefully away from screen edges
      const edgeMarginX = Math.max(80, width * 0.12);
      const edgeMarginY = Math.max(80, height * 0.12);
      let steerX = 0;
      let steerY = 0;

      if (p.x < edgeMarginX) steerX += (edgeMarginX - p.x) / edgeMarginX;
      else if (p.x > width - edgeMarginX) steerX -= (p.x - (width - edgeMarginX)) / edgeMarginX;

      if (p.y < edgeMarginY) steerY += (edgeMarginY - p.y) / edgeMarginY;
      else if (p.y > height - edgeMarginY) steerY -= (p.y - (height - edgeMarginY)) / edgeMarginY;

      if (Math.abs(steerX) > 0.01 || Math.abs(steerY) > 0.01) {
        const avoidHeading = Math.atan2(steerY * 3.5, steerX * 3.5);
        p.targetHeading = avoidHeading;
      }

      // Cursor interaction: Predatory curiosity vs Evasive burst
      if (mouse.active) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const distToMouse = Math.sqrt(mdx * mdx + mdy * mdy);

        if (distToMouse < 180) {
          // Rapid cursor movement triggers evasive tail-whip dive
          if (mouse.speed > 350 || distToMouse < 90) {
            p.burstTimer = 1.4;
            p.targetSpeed = 95; // burst acceleration
            p.targetDepth = Math.max(0.15, p.depth - 0.35); // dive deep to evade
            p.targetHeading = Math.atan2(mdy, mdx) + (Math.random() - 0.5) * 0.5; // steer away
          } else if (p.burstTimer <= 0) {
            // Calm curiosity: slow glide inspecting the area
            p.targetSpeed = 46;
          }
        }
      }

      if (p.burstTimer > 0) {
        p.burstTimer -= dt;
        if (p.burstTimer <= 0) {
          p.targetSpeed = 42;
        }
      }

      // Smooth speed interpolation (inertia)
      p.speed += (p.targetSpeed - p.speed) * 2.2 * dt;

      // Smooth heading steering with physical turning radius limit
      const deltaAngle = normalizeAngle(p.targetHeading - p.heading);
      const maxTurnRate = p.burstTimer > 0 ? 1.8 : 0.95; // rad/s
      p.turnRate += (deltaAngle * 2.2 - p.turnRate) * 4.0 * dt;
      p.turnRate = Math.max(-maxTurnRate, Math.min(maxTurnRate, p.turnRate));
      p.heading = normalizeAngle(p.heading + p.turnRate * dt);

      // Hydrodynamic 3D Banking Roll on turns
      const targetBank = Math.max(-0.45, Math.min(0.45, p.turnRate * 0.65));
      p.bankAngle += (targetBank - p.bankAngle) * 3.5 * dt;

      // Tail-beat propulsion frequency tightly coupled to speed
      // Faster swimming = more rapid tail beat; gliding = slow graceful sway
      const cycleRate = (p.speed / 20.0 + 1.1);
      p.swimCycle += cycleRate * dt;

      // Forward thrust surges twice per tail stroke (bilateral caudal propulsion)
      const thrustPulse = Math.sin(p.swimCycle * 2.0) * 0.12;
      const effectiveSpeed = p.speed * (1.0 + thrustPulse);

      // Integrate world position
      p.x += Math.cos(p.heading) * effectiveSpeed * dt;
      p.y += Math.sin(p.heading) * effectiveSpeed * dt;

      // -------------------------------------------------------------
      // 2. 3D WATER DEPTH SCALING & AMBIENT BIOLUMINESCENCE
      // -------------------------------------------------------------
      const isMobile = width < 640;
      // Depth modulation: shallow = larger, brighter; deep = smaller, hazier
      const depthScale = 0.82 + p.depth * 0.32;
      const baseScale = isMobile ? Math.min(width * 0.55, 280) : Math.min(width * 0.30, height * 0.48, 380);
      const sharkScale = baseScale * depthScale;

      // Dynamic ambient bioluminescent glow expanding with depth
      const glowGrad = ctx.createRadialGradient(
        p.x,
        p.y,
        15 * depthScale,
        p.x,
        p.y,
        sharkScale * (0.65 + (1 - p.depth) * 0.25)
      );
      const glowCoreAlpha = (0.12 + p.depth * 0.10).toFixed(3);
      const glowRingAlpha = (0.05 + p.depth * 0.05).toFixed(3);
      glowGrad.addColorStop(0, `rgba(56, 189, 248, ${glowCoreAlpha})`);
      glowGrad.addColorStop(0.45, `rgba(37, 99, 235, ${glowRingAlpha})`);
      glowGrad.addColorStop(1, "rgba(244, 243, 239, 0)");

      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      const activePixels = sampledShark.length > 0 ? sampledShark : fallbackShark;
      const baseCellSize = isMobile ? 8.0 : 10.0;
      const cellSize = baseCellSize * depthScale;

      // Snout-to-tail alignment transformation
      // Source shark image is oriented at sourceSpineAngle (~35.9 deg).
      // We align the snout with the swimming heading angle.
      const rotAngle = p.heading - (sourceSpineAngle + Math.PI);

      // Recoil head yaw: slight counter-oscillation to balance caudal whip
      const headRecoilYaw = Math.sin(p.swimCycle) * 0.022;
      const totalHeading = rotAngle + headRecoilYaw;
      const cosH = Math.cos(totalHeading);
      const sinH = Math.sin(totalHeading);

      // Normal vector perpendicular to swimming heading (direction of lateral whip)
      const normX = -sinH;
      const normY = cosH;

      const sharkMidX = 0.514;
      const sharkMidY = 0.491;

      // Lateral banking compression factor (3D roll illusion)
      const lateralFactor = 1.0 - Math.abs(p.bankAngle) * 0.28;

      // -------------------------------------------------------------
      // 3. RENDER EACH SHARK PIXEL WITH BIOMECHANICAL KINEMATICS
      // -------------------------------------------------------------
      for (let i = 0; i < activePixels.length; i++) {
        const pt = activePixels[i];

        // Normalized offset from shark center
        const relX = (pt.x - sharkMidX) * sharkScale;
        const relY = (pt.y - sharkMidY) * sharkScale;

        // TRUE ANATOMICAL WAVE PROPAGATION:
        // Anterior zone (s < 0.32): head and gills remain stable and rigid.
        // Posterior zone (s >= 0.32): cubic tail whip with traveling phase.
        const s = pt.spineS;
        let waveAmp: number;
        if (s < 0.32) {
          waveAmp = s * 1.5; // minimal head displacement
        } else {
          const tailProgress = (s - 0.32) / 0.68;
          // Cubic amplitude expansion toward caudal tip
          waveAmp = 0.48 + Math.pow(tailProgress, 2.4) * (20.0 + p.speed * 0.08);
        }

        // Traveling lateral flexural wave
        const wavePhase = p.swimCycle - s * 4.8;
        const lateralDisplacement = Math.sin(wavePhase) * waveAmp;

        // Apply 3D banking roll perpendicular to spine
        const bankedDist = pt.distPerp * lateralFactor + Math.sin(p.bankAngle) * 0.05 * Math.abs(pt.distPerp);

        // Orthogonal rotation and displacement
        const unbankedRelX = relX;
        const unbankedRelY = relY;

        const rotatedX = unbankedRelX * cosH - unbankedRelY * sinH + lateralDisplacement * normX;
        const rotatedY = unbankedRelX * sinH + unbankedRelY * cosH + lateralDisplacement * normY;

        let finalX = p.x + rotatedX;
        let finalY = p.y + rotatedY;

        // Proximity hover response: slight organic push from cursor
        if (mouse.active) {
          const mdx = finalX - mouse.x;
          const mdy = finalY - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 120) {
            const push = (1 - mDist / 120) * 10;
            finalX += (mdx / mDist) * push;
            finalY += (mdy / mDist) * push;
          }
        }

        // Color & luminance computation with 3D depth modulation
        const b = pt.brightness * (0.85 + p.depth * 0.25);
        const boxScale = (0.30 + Math.pow(b, 1.25) * 0.70) * depthScale;
        const boxSize = (cellSize - 1.2) * boxScale;
        const halfSize = boxSize / 2;

        let boxColor: string;
        let borderColor: string | null = null;
        let showInnerCore = false;

        if (b > 0.75) {
          boxColor = p.depth > 0.5 ? "#2563EB" : "#1D4ED8";
          borderColor = "#1E40AF";
          showInnerCore = p.depth > 0.4;
        } else if (b > 0.50) {
          boxColor = p.depth > 0.5 ? "#0284C7" : "#0369A1";
          borderColor = "#0284C7";
        } else if (b > 0.32) {
          boxColor = "#3B82F6";
        } else {
          boxColor = "#60A5FA";
        }

        const renderX = Math.round(finalX - halfSize);
        const renderY = Math.round(finalY - halfSize);
        const renderSize = Math.max(2, Math.round(boxSize));

        // 1. Draw solid square box
        ctx.fillStyle = boxColor;
        ctx.fillRect(renderX, renderY, renderSize, renderSize);

        // 2. Fine hairline border on prominent square boxes
        if (borderColor && renderSize > 5) {
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 0.75;
          ctx.strokeRect(renderX + 0.5, renderY + 0.5, renderSize - 1, renderSize - 1);
        }

        // 3. Luminous inner core for high-density cells
        if (showInnerCore && renderSize > 6) {
          const innerSize = Math.max(2, Math.round(renderSize * 0.40));
          const innerX = Math.round(finalX - innerSize / 2);
          const innerY = Math.round(finalY - innerSize / 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(innerX, innerY, innerSize, innerSize);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none select-none z-[2] opacity-45 mix-blend-multiply overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
