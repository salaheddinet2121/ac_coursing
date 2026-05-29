type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

// Prune entries older than their window to avoid unbounded memory growth
function prune() {
  const now = Date.now();
  for (const [key, bucket] of store) {
    if (now > bucket.resetAt) store.delete(key);
  }
}

/**
 * Returns true when the request should be allowed, false when rate-limited.
 * @param ip      Client IP string
 * @param key     Namespace (e.g. "devis", "contact")
 * @param limit   Max allowed requests per window
 * @param windowMs Window duration in ms (default: 1 hour)
 */
export function checkRateLimit(
  ip: string,
  key: string,
  limit: number,
  windowMs = 60 * 60 * 1000,
): boolean {
  if (store.size > 5_000) prune();

  const storeKey = `${key}:${ip}`;
  const now = Date.now();
  const bucket = store.get(storeKey);

  if (!bucket || now > bucket.resetAt) {
    store.set(storeKey, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;

  bucket.count++;
  return true;
}
