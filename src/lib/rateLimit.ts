interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory store for tracking failed attempts by client IP
const failedAttempts = new Map<string, RateLimitRecord>();

const MAX_FAILED_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes lockout

export function checkLoginRateLimit(ip: string): {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const record = failedAttempts.get(ip);

  // Clean up if expired
  if (record && now > record.resetAt) {
    failedAttempts.delete(ip);
  }

  const current = failedAttempts.get(ip);

  if (current && current.count >= MAX_FAILED_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil((current.resetAt - now) / 1000);
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds: Math.max(1, retryAfterSeconds),
    };
  }

  const remaining = current ? MAX_FAILED_ATTEMPTS - current.count : MAX_FAILED_ATTEMPTS;

  return {
    allowed: true,
    remainingAttempts: remaining,
  };
}

export function recordFailedLogin(ip: string): { remainingAttempts: number } {
  const now = Date.now();
  const record = failedAttempts.get(ip);

  if (!record || now > record.resetAt) {
    failedAttempts.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return { remainingAttempts: MAX_FAILED_ATTEMPTS - 1 };
  }

  record.count += 1;
  failedAttempts.set(ip, record);

  return {
    remainingAttempts: Math.max(0, MAX_FAILED_ATTEMPTS - record.count),
  };
}

export function resetLoginRateLimit(ip: string) {
  failedAttempts.delete(ip);
}

export function getClientIp(req: Request): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }
  return "127.0.0.1";
}
