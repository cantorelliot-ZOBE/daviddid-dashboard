'use client'
import DashboardShell from '@/components/DashboardShell'
import Empty from '@/components/Empty'
import { useBootstrap } from '@/lib/api'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-muted text-[11px] font-mono tracking-[0.15em] uppercase mb-3">{children}</div>
}

export default function TrainingPage() {
  const { data } = useBootstrap()
  if (!data) return <DashboardShell><div className="text-muted text-sm font-mono">Loading…</div></DashboardShell>
  const t = data.training
  const sessions = t?.sessions ?? []

  return (
    <DashboardShell>
      <div className="text-muted text-[11px] font-mono tracking-widest uppercase">Train</div>
      <div className="text-bone text-[28px] font-bold mb-4">This week</div>

      <SectionLabel>Sessions</SectionLabel>
      {sessions.length === 0 ? (
        <Empty label="No sessions scheduled yet — your plan will appear here once it syncs." />
      ) : (
        sessions.slice(0, 6).map(s => (
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
        ))
      )}

      <SectionLabel>This week</SectionLabel>
      {!t ? (
        <Empty label="No training stats yet." />
      ) : (
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { val: t.weekDone != null && t.weekTotal != null ? `${t.weekDone}/${t.weekTotal}` : '—', label: 'Sessions', sub: 'done this week' },
            { val: t.weekHours != null ? `${t.weekHours}h` : '—',                                     label: 'Active',   sub: 'training time' },
            { val: t.weekKcal != null ? t.weekKcal.toLocaleString() : '—',                            label: 'Kcal',     sub: 'output' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-white/[0.06] rounded-card p-3 text-center">
              <div className="text-bone text-[22px] font-bold">{s.val}</div>
              <div className="text-muted text-[10px] font-mono uppercase tracking-wide mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
