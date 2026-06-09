'use client'
import DashboardShell from '@/components/DashboardShell'
import Empty from '@/components/Empty'
import { useBootstrap } from '@/lib/api'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-muted text-[11px] font-mono tracking-[0.15em] uppercase mb-3">{children}</div>
}

const tooltipStyle = { background: '#161810', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, fontSize: 12, fontFamily: 'DM Mono', color: '#F0EDE6' }

export default function AnalyticsPage() {
  const { data } = useBootstrap()
  if (!data) return <DashboardShell><div className="text-muted text-sm font-mono">Loading…</div></DashboardShell>
  const a = data.analytics

  const strengthData = (a?.strengthTrend ?? []).map((v, i) => ({ week: i + 1, squat: v }))
  const weightData = (a?.weightTrend ?? []).map((v, i) => ({ day: i + 1, weight: v }))
  const recoveryData = (a?.recoveryTrend ?? []).map((v, i) => ({ day: i + 1, score: v }))

  return (
    <DashboardShell>
      <div className="text-muted text-[11px] font-mono tracking-widest uppercase">Progress</div>
      <div className="text-bone text-[28px] font-bold mb-5">30-day overview</div>

      <SectionLabel>Strength progression</SectionLabel>
      <div className="bg-card border border-white/[0.06] rounded-card p-4 mb-3">
        {strengthData.length === 0 ? (
          <Empty label="No lifts logged yet." />
        ) : (
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={strengthData} margin={{ top: 4, right: 4, bottom: 0, left: -32 }}>
              <XAxis dataKey="week" hide />
              <YAxis domain={['auto', 'auto']} hide />
              <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#C8F560' }} labelFormatter={v => `Week ${v}`} />
              <Line type="monotone" dataKey="squat" stroke="#C8F560" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <SectionLabel>Body weight</SectionLabel>
      <div className="bg-card border border-white/[0.06] rounded-card p-4 mb-3">
        {weightData.length === 0 ? (
          <Empty label="No body-weight history yet." />
        ) : (
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={weightData} margin={{ top: 4, right: 4, bottom: 0, left: -32 }}>
              <XAxis dataKey="day" hide />
              <YAxis domain={['auto', 'auto']} hide />
              <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#C8F560' }} labelFormatter={v => `Day ${v}`} />
              <Line type="monotone" dataKey="weight" stroke="#C8F560" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <SectionLabel>Recovery &amp; health</SectionLabel>
      <div className="bg-card border border-white/[0.06] rounded-card p-4 mb-3">
        {!a || recoveryData.length === 0 ? (
          <Empty label="No recovery data yet — connect Apple Health in the app." />
        ) : (
          <>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-bone text-[32px] font-bold leading-none">{a.avgRecovery ?? '—'} <span className="text-muted text-[16px] font-normal">/ 100</span></div>
                <div className="text-muted text-[12px] mt-1">Avg recovery score · 30 days</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={recoveryData} margin={{ top: 4, right: 4, bottom: 0, left: -32 }}>
                <XAxis dataKey="day" hide />
                <YAxis domain={[40, 100]} hide />
                <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#C8F560' }} labelFormatter={v => `Day ${v}`} />
                <Line type="monotone" dataKey="score" stroke="#C8F560" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-white/[0.06]">
              {[
                { label: 'Avg HRV',    val: a.avgHRV != null ? `${a.avgHRV}ms` : '—' },
                { label: 'Avg sleep',  val: a.avgSleep ?? '—' },
                { label: 'Resting HR', val: a.avgRestingHR != null ? `${a.avgRestingHR}bpm` : '—' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-bone text-[16px] font-bold">{s.val}</div>
                  <div className="text-muted text-[10px] font-mono uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardShell>
  )
}
