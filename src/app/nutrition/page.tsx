'use client'
import DashboardShell from '@/components/DashboardShell'
import { useBootstrap } from '@/lib/api'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-muted text-[11px] font-mono tracking-[0.15em] uppercase mb-3">{children}</div>
}

export default function NutritionPage() {
  const { data } = useBootstrap()
  if (!data) return <DashboardShell><div className="text-muted text-sm font-mono">Loading…</div></DashboardShell>
  const n = data.nutrition
  return (
    <DashboardShell>
      <div className="text-muted text-[11px] font-mono tracking-widest uppercase">Today&apos;s Fuel</div>
      <div className="text-bone text-[44px] font-black leading-none mt-1">
        {n.calories.current.toLocaleString()}
        <span className="text-muted text-[24px] font-normal ml-2">/ {n.calories.target.toLocaleString()}</span>
      </div>
      <div className="text-muted text-[14px] mt-1 mb-4">{n.calories.target - n.calories.current} kcal left</div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { val: n.protein.current, label: 'Protein', color: '#C8F560' },
          { val: n.carbs.current,   label: 'Carbs',   color: '#E8A020' },
          { val: n.fat.current,     label: 'Fat',      color: '#F0EDE6' },
        ].map(m => (
          <div key={m.label} className="bg-card border border-white/[0.06] rounded-card p-3 text-center">
            <div className="text-[28px] font-bold" style={{ color: m.color }}>{m.val}</div>
            <div className="text-muted text-[10px] font-mono uppercase tracking-widest mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      <SectionLabel>Why these numbers</SectionLabel>
      {[
        { label: 'Protein', current: n.protein.current, target: n.protein.target, unit: 'g', color: '#C8F560', note: '1g per lb of bodyweight — protects muscle while you cut.' },
        { label: 'Carbs',   current: n.carbs.current,   target: n.carbs.target,   unit: 'g', color: '#E8A020', note: 'Most land around training — better performance and recovery.' },
        { label: 'Fat',     current: n.fat.current,     target: n.fat.target,     unit: 'g', color: '#F0EDE6', note: 'Hormonal baseline — don\'t go below 50g.' },
      ].map(m => (
        <div key={m.label} className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-bone text-[15px] font-semibold">{m.label}</span>
            <span className="text-muted text-[13px] font-mono">{m.current} / {m.target} {m.unit}</span>
          </div>
          <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden mb-1.5">
            <div className="h-full rounded-full" style={{ width: `${(m.current/m.target)*100}%`, background: m.color }} />
          </div>
          <div className="text-muted text-[12px]">{m.note}</div>
        </div>
      ))}

      <SectionLabel>Meal log</SectionLabel>
      <div className="flex flex-col gap-px bg-white/[0.04] rounded-card overflow-hidden mb-4">
        {n.meals.map((meal, i) => (
          <div key={i} className="flex items-center justify-between bg-card px-4 py-3">
            <div>
              <div className="text-bone text-[14px] font-semibold">{meal.name}</div>
              <div className="text-muted text-[12px] mt-0.5">{meal.time} · {meal.macros}</div>
            </div>
            <div className="text-muted text-[13px] font-mono">{meal.kcal}</div>
          </div>
        ))}
        <div className="flex items-center justify-between bg-card border-l-2 border-dashed border-white/10 px-4 py-3">
          <div>
            <div className="text-muted text-[14px]">Dinner — not logged</div>
            <div className="text-muted text-[12px] mt-0.5">~620 kcal remaining</div>
          </div>
          <div className="text-muted text-[13px] font-mono">—</div>
        </div>
      </div>

      <div className="bg-card2 border border-white/[0.06] border-l-2 border-l-lime rounded-card p-4">
        <div className="text-lime text-[11px] font-mono tracking-widest uppercase mb-2">David</div>
        <div className="text-bone text-[14px] leading-relaxed">{n.davidNote}</div>
      </div>
    </DashboardShell>
  )
}
