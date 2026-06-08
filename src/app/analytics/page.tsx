'use client'
import DashboardShell from '@/components/DashboardShell'
import { mockAnalytics } from '@/lib/mockData'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-muted text-[11px] font-mono tracking-[0.15em] uppercase mb-3">{children}</div>
}

const recoveryData = mockAnalytics.recoveryTrend.map((v, i) => ({ day: i + 1, score: v }))
const weightData = [188,187.5,187,186.5,186,185.5,185,184.5,184,183.5,183,182.5,182,182,181.5,181,181,180.5,180.5,180,180,182,182.5,182,181.5,181,181,180.5,180,182].map((v,i) => ({ day: i+1, weight: v }))
const strengthData = [185,185,190,190,195,195,200,200,205,205,210,210,215,215,215,220,220,220,225,225].map((v,i) => ({ week: i+1, squat: v }))

export default function AnalyticsPage() {
  const a = mockAnalytics
  return (
    <DashboardShell>
      <div className="text-muted text-[11px] font-mono tracking-widest uppercase">Progress</div>
      <div className="text-bone text-[28px] font-bold mb-5">30-day overview</div>

      <SectionLabel>Strength progression</SectionLabel>
      <div className="bg-card border border-white/[0.06] rounded-card p-4 mb-3">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-bone text-[32px] font-bold leading-none">225 <span className="text-muted text-[16px] font-normal">lbs</span></div>
            <div className="text-muted text-[12px] mt-1">Back squat 1RM</div>
          </div>
          <span className="text-lime text-[12px] font-mono bg-lime/10 px-2 py-1 rounded-lg">↑ +40lbs · 10 weeks</span>
        </div>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={strengthData} margin={{ top: 4, right: 4, bottom: 0, left: -32 }}>
            <XAxis dataKey="week" hide />
            <YAxis domain={[175, 235]} hide />
            <Tooltip contentStyle={{ background: '#161810', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, fontSize: 12, fontFamily: 'DM Mono', color: '#F0EDE6' }} itemStyle={{ color: '#C8F560' }} labelFormatter={v => `Week ${v}`} />
            <Line type="monotone" dataKey="squat" stroke="#C8F560" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-white/[0.06]">
          {[
            { label: 'Bench press', val: '185 lbs', delta: '+20lbs' },
            { label: 'Deadlift',    val: '315 lbs', delta: '+35lbs' },
            { label: 'OHP',         val: '125 lbs', delta: '+15lbs' },
          ].map(l => (
            <div key={l.label}>
              <div className="text-bone text-[16px] font-bold">{l.val}</div>
              <div className="text-muted text-[10px] font-mono uppercase tracking-wide">{l.label}</div>
              <div className="text-lime text-[10px] font-mono mt-0.5">{l.delta}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionLabel>Body weight</SectionLabel>
      <div className="bg-card border border-white/[0.06] rounded-card p-4 mb-3">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-bone text-[32px] font-bold leading-none">182 <span className="text-muted text-[16px] font-normal">lbs</span></div>
            <div className="text-muted text-[12px] mt-1">Down from 188 · 4 weeks ago</div>
          </div>
          <span className="text-lime text-[12px] font-mono bg-lime/10 px-2 py-1 rounded-lg">↓ -6lbs</span>
        </div>
        <ResponsiveContainer width="100%" height={80}>
          <LineChart data={weightData} margin={{ top: 4, right: 4, bottom: 0, left: -32 }}>
            <XAxis dataKey="day" hide />
            <YAxis domain={[178, 190]} hide />
            <Tooltip contentStyle={{ background: '#161810', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, fontSize: 12, fontFamily: 'DM Mono', color: '#F0EDE6' }} itemStyle={{ color: '#C8F560' }} labelFormatter={v => `Day ${v}`} />
            <Line type="monotone" dataKey="weight" stroke="#C8F560" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <SectionLabel>Recovery &amp; health</SectionLabel>
      <div className="bg-card border border-white/[0.06] rounded-card p-4 mb-3">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-bone text-[32px] font-bold leading-none">{a.avgRecovery} <span className="text-muted text-[16px] font-normal">/ 100</span></div>
            <div className="text-muted text-[12px] mt-1">Avg recovery score · 30 days</div>
          </div>
          <span className="text-lime text-[12px] font-mono bg-lime/10 px-2 py-1 rounded-lg">↑ +6 vs prev</span>
        </div>
        <ResponsiveContainer width="100%" height={80}>
          <LineChart data={recoveryData} margin={{ top: 4, right: 4, bottom: 0, left: -32 }}>
            <XAxis dataKey="day" hide />
            <YAxis domain={[40, 100]} hide />
            <Tooltip contentStyle={{ background: '#161810', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, fontSize: 12, fontFamily: 'DM Mono', color: '#F0EDE6' }} itemStyle={{ color: '#C8F560' }} labelFormatter={v => `Day ${v}`} />
            <Line type="monotone" dataKey="score" stroke="#C8F560" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-white/[0.06]">
          {[
            { label: 'Avg HRV',     val: `${a.avgHRV}ms`, delta: '+4ms', up: true },
            { label: 'Avg sleep',   val: a.avgSleep,        delta: '-14m',  up: false },
            { label: 'Resting HR',  val: `${a.avgRestingHR}bpm`, delta: 'improving', up: true },
          ].map(s => (
            <div key={s.label}>
              <div className="text-bone text-[16px] font-bold">{s.val}</div>
              <div className="text-muted text-[10px] font-mono uppercase tracking-wide">{s.label}</div>
              <div className={`text-[10px] font-mono mt-0.5 ${s.up ? 'text-lime' : 'text-amber'}`}>{s.delta}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card2 border border-white/[0.06] border-l-2 border-l-lime rounded-card p-4">
        <div className="text-lime text-[11px] font-mono tracking-widest uppercase mb-2">David</div>
        <div className="text-bone text-[14px] leading-relaxed">
          "Recovery trending up, strength going in the right direction. Body comp is moving — you&apos;re down 6lbs with strength still climbing, which means the cut is working. Sleep is the one lever left to pull."
        </div>
      </div>
    </DashboardShell>
  )
}
