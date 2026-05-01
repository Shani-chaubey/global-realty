/**
 * Fetcher utility for website → admin API communication.
 * Used for ISR / SSG / SSR fetches on the website side.
 */
export async function fetchFromAPI(endpoint, options = {}) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || "";
    const url = `${baseUrl}/api/${endpoint}`;
    const res = await fetch(url, {
      next: { revalidate: options.revalidate ?? 300 },
      ...options,
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? json ?? null;
  } catch {
    return null;
  }
}

/**
 * Direct DB fetch helper (server-side only, no HTTP round-trip).
 * Import models and connectDB directly in server components instead.
 */
export function safeArray(data) {
  return Array.isArray(data) ? data : [];
}

export function safeObject(data, fallback = {}) {
  return data && typeof data === "object" && !Array.isArray(data)
    ? data
    : fallback;
}
