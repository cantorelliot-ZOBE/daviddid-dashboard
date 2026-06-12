'use client'
import { useEffect, useState } from 'react'
import { getToken } from '@/lib/auth'
import Login from './Login'

// Gates the entire dashboard on a stored token. No token -> render the login
// page instead of the dashboard. Token check runs after mount (localStorage is
// client-only), so we render nothing until it resolves to avoid a flash of the
// wrong screen and to keep server/client first render identical (no hydration
// mismatch — both start at `null`).
export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    setAuthed(!!getToken())
  }, [])

  if (authed === null) return null
  return authed ? <>{children}</> : <Login />
}
