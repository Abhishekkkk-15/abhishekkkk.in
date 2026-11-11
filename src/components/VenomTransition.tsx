"use client";

import React, { useEffect, useRef } from "react";

// Vertex shader: Full-screen quad
const VS_SOURCE = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Fragment shader: Organic Venom Symbiote metaballs, tendrils, and wet specular highlights
const FS_SOURCE = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_origin;
uniform float u_progress;      // 0.0 to 1.0
uniform float u_time;          // seconds
uniform float u_alpha;         // master opacity
uniform int u_is_dark;         // 1: Black Venom (to dark), 0: Anti-Venom (to light)

out vec4 fragColor;

// Smooth minimum for organic metaball blending
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  // Convert gl_FragCoord to DOM screen coordinates (origin top-left)
  vec2 screenPos = vec2(fragCoord.x, u_resolution.y - fragCoord.y);
  vec2 diff = screenPos - u_origin + vec2(0.0001, 0.0001);
  float dist = length(diff);
  float angle = atan(diff.y, diff.x);

  // Maximum screen diagonal from origin
  vec2 c1 = vec2(0.0, 0.0);
  vec2 c2 = vec2(u_resolution.x, 0.0);
  vec2 c3 = vec2(0.0, u_resolution.y);
  vec2 c4 = u_resolution;
  float maxDist = max(max(length(u_origin - c1), length(u_origin - c2)),
                      max(length(u_origin - c3), length(u_origin - c4))) * 1.15;

  float t = clamp(u_progress, 0.0, 1.0);

  // Symbiote organic modulation:
  // 1. Crawling liquid perimeter noise
  float w1 = sin(angle * 3.0 + u_time * 2.8) * 0.14;
  float w2 = sin(angle * 7.0 - u_time * 4.2) * 0.09;
  float w3 = sin(angle * 13.0 + u_time * 6.0) * 0.05;

  // 2. Visceral reaching tendrils (multiple sharp filaments)
  float spike1 = pow(max(0.0, sin(angle * 4.0 + 0.8 + sin(u_time * 2.5) * 0.25)), 6.0) * 0.42;
  float spike2 = pow(max(0.0, cos(angle * 5.0 - 1.3 - cos(u_time * 3.0) * 0.3)), 8.0) * 0.50;
  float spike3 = pow(max(0.0, sin(angle * 8.0 + 2.2)), 10.0) * 0.35;
  float spike4 = pow(max(0.0, cos(angle * 12.0 - 0.7)), 12.0) * 0.28;

  float organicR = 1.0 + w1 + w2 + w3 + spike1 + spike2 + spike3 + spike4;
  float frontRadius = t * maxDist * organicR;

  // Primary signed distance to front
  float d = dist - frontRadius;

  // 3. Satellite symbiote droplets & tendril heads ahead of main wave
  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    float dropAngle = fi * 0.897 + sin(u_time * 3.2 + fi) * 0.22;
    float dropDist = (t * 1.16 + sin(fi * 4.3) * 0.05) * maxDist;
    vec2 dropPos = u_origin + vec2(cos(dropAngle), sin(dropAngle)) * dropDist;
    float dropRadius = (0.045 + sin(fi + u_time * 4.5) * 0.02) * maxDist * max(0.0, 1.0 - t * 0.7);
    float dropD = length(screenPos - dropPos) - dropRadius;
    d = smin(d, dropD, 48.0);
  }

  if (d > 25.0) {
    discard;
  }

  // 4. Finite-difference surface normal for wet specular reflections
  vec2 eps = vec2(2.5, 0.0);
  float dRight = length(screenPos + eps.xy - u_origin) - frontRadius;
  float dUp = length(screenPos + eps.yx - u_origin) - frontRadius;
  vec2 grad = normalize(vec2(dRight - d, dUp - d) + 0.0001);

  // Directional wet light
  vec2 lightDir = normalize(vec2(-0.55, -0.83));
  float spec = pow(max(0.0, dot(-grad, lightDir)), 14.0) * 0.9;

  // Sharp viscous liquid boundary
  float mask = smoothstep(1.5, -2.5, d);

  // Wet symbiote perimeter rim
  float rim = smoothstep(7.0, 0.0, abs(d)) * mask;

  // Palette selection based on target theme:
  vec3 baseColor;
  vec3 rimGloss;

  if (u_is_dark == 1) {
    // Venom Black Symbiote: deep obsidian black with slick wet highlights
    baseColor = vec3(0.051, 0.051, 0.055); // #0d0d0e
    rimGloss = vec3(0.88, 0.93, 1.0);       // wet chrome/specular reflection
  } else {
    // Anti-Venom Light Surge: clean porcelain white with ink-black tendril edges
    baseColor = vec3(0.976, 0.976, 0.976); // #f9f9f9
    rimGloss = vec3(0.08, 0.08, 0.10);       // dark symbiote rim
  }

  vec3 finalColor = mix(baseColor, rimGloss, clamp(rim * 0.8 + spec * 0.45, 0.0, 1.0));

  fragColor = vec4(finalColor, mask * u_alpha);
}
`;

type TransitionCallback = () => void;

interface TriggerOptions {
  x: number;
  y: number;
  nextDark: boolean;
  onSwap: TransitionCallback;
}

// Global active trigger handle
let triggerVenomInstance: ((opts: TriggerOptions) => void) | null = null;

export function triggerVenomTransition(opts: TriggerOptions) {
  if (triggerVenomInstance) {
    triggerVenomInstance(opts);
  } else {
    // Direct fallback if overlay not mounted
    opts.onSwap();
  }
}

export function VenomTransitionOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGL2RenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let positionBuffer: WebGLBuffer | null = null;
    let vao: WebGLVertexArrayObject | null = null;
    let animFrameId: number | null = null;

    // Uniform locations
    let uResolutionLoc: WebGLUniformLocation | null = null;
    let uOriginLoc: WebGLUniformLocation | null = null;
    let uProgressLoc: WebGLUniformLocation | null = null;
    let uTimeLoc: WebGLUniformLocation | null = null;
    let uAlphaLoc: WebGLUniformLocation | null = null;
    let uIsDarkLoc: WebGLUniformLocation | null = null;

    // Try initializing WebGL2
    try {
      gl = canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
      });

      if (gl) {
        const compileShader = (type: number, source: string) => {
          if (!gl) return null;
          const s = gl.createShader(type);
          if (!s) return null;
          gl.shaderSource(s, source);
          gl.compileShader(s);
          if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.warn(gl.getShaderInfoLog(s));
            gl.deleteShader(s);
            return null;
          }
          return s;
        };

        const vs = compileShader(gl.VERTEX_SHADER, VS_SOURCE);
        const fs = compileShader(gl.FRAGMENT_SHADER, FS_SOURCE);

        if (vs && fs) {
          program = gl.createProgram();
          if (program) {
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
              console.warn(gl.getProgramInfoLog(program));
              program = null;
            } else {
              gl.useProgram(program);

              const posLoc = gl.getAttribLocation(program, "a_position");
              uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
              uOriginLoc = gl.getUniformLocation(program, "u_origin");
              uProgressLoc = gl.getUniformLocation(program, "u_progress");
              uTimeLoc = gl.getUniformLocation(program, "u_time");
              uAlphaLoc = gl.getUniformLocation(program, "u_alpha");
              uIsDarkLoc = gl.getUniformLocation(program, "u_is_dark");

              vao = gl.createVertexArray();
              gl.bindVertexArray(vao);

              positionBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
              gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array([
                  -1.0, -1.0,
                   1.0, -1.0,
                  -1.0,  1.0,
                  -1.0,  1.0,
                   1.0, -1.0,
                   1.0,  1.0,
                ]),
                gl.STATIC_DRAW
              );

              gl.enableVertexAttribArray(posLoc);
              gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

              gl.enable(gl.BLEND);
              gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            }
          }
        }
      }
    } catch (e) {
      console.warn("WebGL2 initialization skipped for VenomTransition:", e);
      gl = null;
    }

    // Set canvas resolution
    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // 2D Canvas Fallback in case WebGL2 is not available
    const runCanvas2DFallback = (
      originX: number,
      originY: number,
      nextDark: boolean,
      onSwap: TransitionCallback
    ) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        onSwap();
        return;
      }

      let swapped = false;
      const startTime = performance.now();
      const duration = 650;
      const maxR = Math.hypot(
        Math.max(originX, window.innerWidth - originX),
        Math.max(originY, window.innerHeight - originY)
      ) * 1.15;

      const loop = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1.0, elapsed / duration);

        if (!swapped && p >= 0.5) {
          onSwap();
          swapped = true;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.fillStyle = nextDark ? "#0d0d0e" : "#f9f9f9";

        // Draw organic wavy symbiote circle
        const currentR = p < 0.5 ? (p / 0.5) * maxR : (1.0 - (p - 0.5) / 0.5) * maxR;
        ctx.beginPath();
        for (let angle = 0; angle <= Math.PI * 2 + 0.1; angle += 0.1) {
          const wave = 1.0 + Math.sin(angle * 7 + p * 10) * 0.12 + Math.cos(angle * 3) * 0.08;
          const r = currentR * wave;
          const px = originX + Math.cos(angle) * r;
          const py = originY + Math.sin(angle) * r;
          if (angle === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        if (p < 1.0) {
          animFrameId = requestAnimationFrame(loop);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.style.display = "none";
        }
      };

      canvas.style.display = "block";
      animFrameId = requestAnimationFrame(loop);
    };

    // WebGL2 Animation Loop
    triggerVenomInstance = ({ x, y, nextDark, onSwap }) => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }

      if (!gl || !program) {
        runCanvas2DFallback(x, y, nextDark, onSwap);
        return;
      }

      resize();
      canvas.style.display = "block";

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const originX = x * dpr;
      const originY = y * dpr;
      const width = canvas.width;
      const height = canvas.height;

      gl.viewport(0, 0, width, height);

      let themeSwapped = false;
      const startTime = performance.now();
      const expandDuration = 380; // ms to reach full screen coverage
      const totalDuration = 720;  // ms total animation time

      const render = (now: number) => {
        if (!gl || !program) return;
        const elapsed = now - startTime;
        const timeSec = elapsed * 0.001;

        let progress = 0;
        let alpha = 1.0;

        if (elapsed < expandDuration) {
          // Organic cubic ease-in surge
          const t = elapsed / expandDuration;
          progress = t * t * (3.0 - 2.0 * t);
          alpha = 1.0;
        } else {
          // Full coverage achieved: swap theme underneath
          if (!themeSwapped) {
            onSwap();
            themeSwapped = true;
          }
          progress = 1.0;
          // Smoothly dissolve the liquid veil into the newly active theme
          const dissolveT = (elapsed - expandDuration) / (totalDuration - expandDuration);
          alpha = Math.max(0.0, 1.0 - dissolveT * dissolveT);
        }

        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        if (alpha > 0.001 && progress > 0.001) {
          gl.useProgram(program);
          gl.bindVertexArray(vao);

          gl.uniform2f(uResolutionLoc, width, height);
          gl.uniform2f(uOriginLoc, originX, originY);
          gl.uniform1f(uProgressLoc, progress);
          gl.uniform1f(uTimeLoc, timeSec);
          gl.uniform1f(uAlphaLoc, alpha);
          gl.uniform1i(uIsDarkLoc, nextDark ? 1 : 0);

          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }

        if (elapsed < totalDuration) {
          animFrameId = requestAnimationFrame(render);
        } else {
          if (!themeSwapped) {
            onSwap();
          }
          if (gl) {
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
          }
          canvas.style.display = "none";
          animFrameId = null;
        }
      };

      animFrameId = requestAnimationFrame(render);
    };

    return () => {
      triggerVenomInstance = null;
      window.removeEventListener("resize", resize);
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
      if (gl) {
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        if (vao) gl.deleteVertexArray(vao);
        if (program) gl.deleteProgram(program);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[999999]"
      style={{ display: "none" }}
      aria-hidden="true"
    />
  );
}
