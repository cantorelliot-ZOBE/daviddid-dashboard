// Browser auth token store for the dashboard. The Supabase access token issued
// by daviddid-api's /api/auth/login is kept in localStorage and sent as
// `Authorization: Bearer <token>` on every API call. All access is guarded for
// SSR (no `window` on the server).

const TOKEN_KEY = 'david.auth.access_token'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(TOKEN_KEY, token)
  } catch {
    /* ignore */
  }
}

export function clearToken(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignore */
  }
}

// Authorization header for a request, or an empty object when there's no token.
export function authHeader(): Record<string, string> {
  const t = getToken()
  return t ? { Authorization: `Bearer ${t}` } : {}
}
