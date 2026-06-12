'use client'
import { useState } from 'react'
import { API } from '@/lib/api'
import { setToken } from '@/lib/auth'

// Dashboard login. Same Supabase-backed auth as the app: POST /api/auth/login,
// store the returned access token in localStorage, then reload so AuthGate finds
// the token and renders the dashboard.
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password || busy) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.access_token) {
        throw new Error(data?.error || `Login failed (${res.status})`)
      }
      setToken(data.access_token)
      window.location.reload()
    } catch (err: any) {
      setError(err?.message || 'Login failed. Check your credentials and try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-[380px]">
        <div className="text-lime text-[11px] font-mono tracking-[0.2em] uppercase mb-3">David</div>
        <h1 className="text-bone text-[28px] font-bold leading-tight mb-1.5">Performance dashboard</h1>
        <p className="text-muted text-[14px] mb-8">Log in to view your coaching data.</p>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="block text-muted text-[11px] font-mono uppercase tracking-wide mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              disabled={busy}
              placeholder="you@email.com"
              className="w-full bg-card border border-white/[0.08] rounded-[14px] px-4 py-3.5 text-bone text-[15px] outline-none focus:border-lime/40 transition-colors disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-muted text-[11px] font-mono uppercase tracking-wide mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={busy}
              placeholder="••••••••"
              className="w-full bg-card border border-white/[0.08] rounded-[14px] px-4 py-3.5 text-bone text-[15px] outline-none focus:border-lime/40 transition-colors disabled:opacity-60"
            />
          </div>

          {error ? <div className="text-amber text-[13px] -mt-1">{error}</div> : null}

          <button
            type="submit"
            disabled={!email.trim() || !password || busy}
            className="mt-1 w-full bg-lime text-bg font-bold text-[14px] uppercase tracking-wide rounded-[14px] py-4 transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {busy ? 'Signing in…' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}
