type Store = Map<string, { count: number; resetAt: number }>;

const store: Store = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

export function checkRateLimit(ip: string, context: string): { allowed: boolean } {
  const key = `${context}:${ip}`;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false };
  }

  entry.count++;
  return { allowed: true };
}
