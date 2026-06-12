'use client'
import { useEffect, useState } from 'react'
import { authHeader, clearToken } from './auth'

// Browser-reachable API URL. Override via NEXT_PUBLIC_API_URL; defaults to the
// deployed API so the dashboard works without extra config.
export const API = process.env.NEXT_PUBLIC_API_URL || 'https://daviddid-api-production.up.railway.app'

// Every endpoint below /api/auth now requires a valid token. On a 401 (missing,
// expired, or revoked token) we drop the token and reload — AuthGate then finds
// no token and renders the login page instead of the dashboard.
function onUnauthorized() {
  clearToken()
  if (typeof window !== 'undefined') window.location.reload()
}

type LiftSet = { w: number; r: number }
type LiftEntry = { date: string; sets: LiftSet[] }

// Mirrors the GET /api/bootstrap response. A brand-new (empty) database returns
// null for the single-row slices and empty collections — every field below that
// can be absent is typed `| null` so pages render "no data yet" placeholders.
export type Recovery = {
  score: number | null; label: string | null; directive: string | null
  hrv: number | null; hrvDelta: number | null; restingHR: number | null; restingHRDelta: number | null
  sleep: { total: string | null; quality: string | number | null; efficiency: number | null; spo2: number | null; deep: string | null; rem: string | null; core: string | null; awake: string | null } | null
  hrvWeek: number[]; hrvMonth: number[]
}
export type Training = {
  weekDone: number | null; weekTotal: number | null; weekKcal: number | null; weekHours: number | null
  sessions: { id: number; name: string; sub: string; duration: string; day: string; status: string }[]
}
export type Nutrition = {
  calories: { current: number | null; target: number | null }
  protein: { current: number | null; target: number | null }
  carbs: { current: number | null; target: number | null }
  fat: { current: number | null; target: number | null }
  davidNote: string | null
  meals: { name: string; time: string; macros: string; kcal: number }[]
}
export type Analytics = {
  avgRecovery: number | null; avgHRV: number | null; sessionsDone: number | null; sessionsTotal: number | null
  avgSleep: string | null; avgKcal: number | null; avgRestingHR: number | null
  recoveryTrend: number[]; weightTrend: number[]; strengthTrend: number[]
}

export type Bootstrap = {
  user: { name: string; initials: string; email: string | null; goals?: string[] | string | null } | null
  recovery: Recovery | null
  training: Training | null
  nutrition: Nutrition | null
  analytics: Analytics | null
  lifts: Record<string, LiftEntry[]>
  people: { id: number; initials: string; name: string; role: string; permission: string; color: string; status: string }[]
  messages: { role: string; content: string; time: string }[]
}

// Fetch once and share the promise across all pages/components.
let cache: Promise<Bootstrap> | null = null
function loadBootstrap(): Promise<Bootstrap> {
  if (!cache) {
    cache = fetch(`${API}/api/bootstrap`, { headers: { ...authHeader() } }).then((r) => {
      if (r.status === 401) { onUnauthorized(); throw new Error('Unauthorized') }
      if (!r.ok) throw new Error(`API ${r.status}`)
      return r.json()
    })
    // Don't cache a rejected promise — allow a retry on next mount.
    cache.catch(() => { cache = null })
  }
  return cache
}

export function useBootstrap() {
  const [data, setData] = useState<Bootstrap | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    loadBootstrap()
      .then((d) => { if (alive) setData(d) })
      .catch((e) => { if (alive) setError(String(e)) })
    return () => { alive = false }
  }, [])

  return { data, error }
}

// Server-side David chat. The Anthropic key lives only on the API; the browser
// never talks to Anthropic directly. Returns David's reply text.
export async function sendChat(
  messages: { role: 'user' | 'assistant'; content: string }[],
  system?: string,
): Promise<string> {
  const res = await fetch(`${API}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ messages, system }),
  })
  if (res.status === 401) { onUnauthorized(); throw new Error('Unauthorized') }
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error || `Chat API error (${res.status})`)
  return data.text || ''
}
