'use client'
import { useEffect, useState } from 'react'

// Browser-reachable API URL. Set via NEXT_PUBLIC_API_URL in docker-compose.
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

type LiftSet = { w: number; r: number }
type LiftEntry = { date: string; sets: LiftSet[] }

// Mirrors the GET /api/bootstrap response, which in turn mirrors the shapes
// the dashboard used to import from mockData.ts.
export type Bootstrap = {
  user: { name: string; initials: string; email: string }
  recovery: {
    score: number; label: string; directive: string
    hrv: number; hrvDelta: number; restingHR: number; restingHRDelta: number
    sleep: { total: string; quality: number; efficiency: number; spo2: number; deep: string; rem: string; core: string; awake: string }
    hrvWeek: number[]; hrvMonth: number[]
  }
  training: {
    weekDone: number; weekTotal: number; weekKcal: number; weekHours: number
    sessions: { id: number; name: string; sub: string; duration: string; day: string; status: string }[]
  }
  nutrition: {
    calories: { current: number; target: number }
    protein: { current: number; target: number }
    carbs: { current: number; target: number }
    fat: { current: number; target: number }
    davidNote: string
    meals: { name: string; time: string; macros: string; kcal: number }[]
  }
  analytics: {
    avgRecovery: number; avgHRV: number; sessionsDone: number; sessionsTotal: number
    avgSleep: string; avgKcal: number; avgRestingHR: number
    recoveryTrend: number[]; weightTrend: number[]; strengthTrend: number[]
  }
  lifts: Record<string, LiftEntry[]>
  people: { id: number; initials: string; name: string; role: string; permission: string; color: string; status: string }[]
  messages: { role: string; content: string; time: string }[]
}

// Fetch once and share the promise across all pages/components.
let cache: Promise<Bootstrap> | null = null
function loadBootstrap(): Promise<Bootstrap> {
  if (!cache) {
    cache = fetch(`${API}/api/bootstrap`).then((r) => {
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
