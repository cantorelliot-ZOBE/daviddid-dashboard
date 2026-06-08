'use client'
import DashboardShell from '@/components/DashboardShell'
import { useBootstrap } from '@/lib/api'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-muted text-[11px] font-mono tracking-[0.15em] uppercase mb-3">{children}</div>
}

export default function TrainingPage() {
  const { data } = useBootstrap()
  if (!data) return <DashboardShell><div className="text-muted text-sm font-mono">Loading…</div></DashboardShell>
  const t = data.training
  return (
    <DashboardShell>
      <div className="text-muted text-[11px] font-mono tracking-widest uppercase">Train</div>
      <div className="text-bone text-[28px] font-bold mb-4">Wednesday</div>

      {/* Week strip */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {[
          { day: 'M', date: 2, type: 'strength', done: true },
          { day: 'T', date: 3, type: 'hypertrophy', done: true },
          { day: 'W', date: 4, type: 'hypertrophy', active: true },
          { day: 'T', date: 5, type: 'rest' },
          { day: 'F', date: 6, type: 'strength' },
          { day: 'S', date: 7, type: 'cardio' },
          { day: 'S', date: 8, type: 'rest' },
        ].map((d, i) => {
          const colors: Record<string, string> = { strength: '#C8F560', hypertrophy: '#E8A020', cardio: '#5bc4c4', rest: '#555' }
          const bg = d.active ? 'border-2 border-lime' : ''
          return (
            <div key={i} className={`flex flex-col items-center gap-1 shrink-0`}>
              <div className="text-muted text-[10px] font-mono uppercase">{d.day}</div>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold ${bg}`}
                style={{ background: d.done || d.active ? colors[d.type] + '33' : '#1c1f14', color: colors[d.type] || '#555' }}>
                {d.date}
              </div>
            </div>
          )
        })}
      </div>

      {/* Sessions */}
      <SectionLabel>Today&apos;s sessions</SectionLabel>
      {t.sessions.filter(s => s.status !== 'upcoming').concat(t.sessions.filter(s => s.status === 'today')).slice(0,3).map(s => (
        <div key={s.id} className={`bg-card border rounded-card p-4 mb-2 ${s.status==='today'?'border-lime/30':'border-white/[0.06]'}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-muted text-[11px] font-mono tracking-widest uppercase">{s.day}</span>
            {s.status === 'done' && (
              <span className="text-lime text-[12px] font-medium flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Cleared
              </span>
            )}
            {s.status === 'today' && <span className="text-amber text-[12px] font-mono">Up next</span>}
          </div>
          <div className="text-bone text-[18px] font-bold">{s.name}</div>
          <div className="text-muted text-[13px] mt-0.5">{s.sub} · {s.duration}</div>
        </div>
      ))}

      <SectionLabel>This week</SectionLabel>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { val: `${t.weekDone}/${t.weekTotal}`, label: 'Sessions', sub: 'done this week' },
          { val: `${t.weekHours}h`,              label: 'Active',   sub: 'training time' },
          { val: t.weekKcal.toLocaleString(),    label: 'Kcal',     sub: 'output' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-white/[0.06] rounded-card p-3 text-center">
            <div className="text-bone text-[22px] font-bold">{s.val}</div>
            <div className="text-muted text-[10px] font-mono uppercase tracking-wide mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* David note */}
      <div className="bg-card2 border border-white/[0.06] border-l-2 border-l-lime rounded-card p-4">
        <div className="text-lime text-[11px] font-mono tracking-widest uppercase mb-2">David</div>
        <div className="text-bone text-[14px] leading-relaxed">
          "Two-a-day cleared — lift fresh this morning, keep the cardio truly easy tonight."
        </div>
      </div>
    </DashboardShell>
  )
}
