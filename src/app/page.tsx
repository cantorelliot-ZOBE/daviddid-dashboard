'use client'
import DashboardShell from '@/components/DashboardShell'
import { mockRecovery, mockTraining, mockNutrition, mockAnalytics, mockLifts } from '@/lib/mockData'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useState } from 'react'

const Label = ({children}:{children:React.ReactNode}) => (
  <div className="text-muted text-[10px] font-mono tracking-[0.14em] uppercase mb-2">{children}</div>
)

const Card = ({children,className='',onClick}:{children:React.ReactNode,className?:string,onClick?:()=>void}) => (
  <div onClick={onClick} className={`bg-card border border-white/[0.055] rounded-2xl p-5 ${onClick?'cursor-pointer hover:border-white/10 transition-colors':''} ${className}`}>
    {children}
  </div>
)

const Stat = ({val,unit,label,delta,up}:{val:string|number,unit?:string,label:string,delta?:string,up?:boolean}) => (
  <div>
    <div className="flex items-baseline gap-1">
      <span className="text-bone text-[28px] font-bold leading-none">{val}</span>
      {unit && <span className="text-muted text-[13px]">{unit}</span>}
    </div>
    <div className="text-muted text-[11px] font-mono uppercase tracking-wide mt-1">{label}</div>
    {delta && <div className={`text-[11px] font-mono mt-0.5 ${up?'text-lime':'text-amber'}`}>{delta}</div>}
  </div>
)

const chartTooltipStyle = {
  background:'#111410', border:'1px solid rgba(255,255,255,0.06)',
  borderRadius:10, fontSize:11, fontFamily:'DM Mono', color:'#F0EDE6'
}

export default function HomePage() {
  const r = mockRecovery
  const n = mockNutrition
  const t = mockTraining
  const a = mockAnalytics
  const circumference = 2*Math.PI*28
  const offset = circumference - (r.score/100)*circumference

  const recoveryData = a.recoveryTrend.map((v,i)=>({day:i+1,score:v}))
  const weightData = a.weightTrend.map((v,i)=>({day:i+1,weight:v}))
  const squat = mockLifts['Back Squat'].map(s=>({date:s.date,max:Math.max(...s.sets.map(x=>x.w))}))

  const [selectedLift, setSelectedLift] = useState('Back Squat')
  const liftData = mockLifts[selectedLift as keyof typeof mockLifts].map(s=>({date:s.date,max:Math.max(...s.sets.map(x=>x.w))}))

  return (
    <DashboardShell>
      <div className="px-8 py-6 max-w-[1400px] mx-auto">

        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-muted text-[11px] font-mono tracking-widest uppercase">Wednesday · June 8</div>
            <div className="text-bone text-[26px] font-bold leading-tight mt-0.5">Good morning, Elliot</div>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1.5 bg-card border border-white/[0.055] rounded-full px-3 py-1.5 text-[12px] font-medium text-bone">
              <span className="w-2 h-2 rounded-full bg-lime"></span> Recovery {r.score}
            </span>
            <span className="flex items-center gap-1.5 bg-card border border-white/[0.055] rounded-full px-3 py-1.5 text-[12px] font-medium text-bone">
              <span className="text-amber">↓</span> 620 kcal left
            </span>
          </div>
        </div>

        {/* David brief — full width, prominent but not dominant */}
        <div className="bg-card2 border border-white/[0.055] border-l-[3px] border-l-lime rounded-2xl px-5 py-4 mb-6 flex items-start gap-4">
          <div className="shrink-0 mt-0.5">
            <div className="text-lime text-[10px] font-mono tracking-widest uppercase mb-1">David</div>
            <svg width="56" height="56" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(200,245,96,0.1)" strokeWidth="5"/>
              <circle cx="32" cy="32" r="28" fill="none" stroke="#C8F560" strokeWidth="5"
                strokeDasharray={circumference} strokeDashoffset={offset}
                strokeLinecap="round" transform="rotate(-90 32 32)"/>
              <text x="32" y="37" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="14" fontWeight="800" fill="#C8F560">{r.score}</text>
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-bone text-[14px] leading-relaxed">{r.directive}</div>
            <div className="flex gap-3 mt-3">
              <span className="bg-lime/[0.08] text-lime text-[11px] font-mono px-2.5 py-1 rounded-lg">HRV +{r.hrvDelta}ms</span>
              <span className="bg-white/[0.05] text-muted text-[11px] font-mono px-2.5 py-1 rounded-lg">Sleep {r.sleep.total}</span>
              <span className="bg-white/[0.05] text-muted text-[11px] font-mono px-2.5 py-1 rounded-lg">HR {r.restingHR}bpm</span>
            </div>
          </div>
          <div className="shrink-0 bg-card2 border-2 border-lime/25 rounded-xl px-4 py-3 text-center min-w-[140px]">
            <div className="text-lime text-[10px] font-mono tracking-widest uppercase mb-1">→ Do next</div>
            <div className="text-bone text-[13px] font-semibold leading-snug">Eat lunch — behind on protein</div>
            <div className="text-muted text-[11px] mt-1">Aim for 40g+</div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-12 gap-4">

          {/* LEFT COL: Today */}
          <div className="col-span-3 flex flex-col gap-4">
            <Card>
              <Label>Today&apos;s training</Label>
              <div className="flex flex-col gap-1.5">
                {t.sessions.filter(s=>['done','today','upcoming'].includes(s.status)).slice(0,4).map(s=>(
                  <div key={s.id} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border ${s.status==='today'?'border-lime/20 bg-lime/[0.03]':'border-white/[0.04] bg-white/[0.01]'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.status==='done'?'bg-lime/40':s.status==='today'?'bg-lime':'bg-muted/30'}`}/>
                    <div className="flex-1 min-w-0">
                      <div className="text-bone text-[12px] font-medium truncate">{s.name}</div>
                      <div className="text-muted text-[10px] font-mono">{s.duration}</div>
                    </div>
                    <span className={`text-[9px] font-mono uppercase tracking-wide shrink-0 ${s.status==='done'?'text-lime/60':s.status==='today'?'text-amber':'text-muted'}`}>
                      {s.status==='done'?'✓':s.status==='today'?'Now':'—'}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/training" className="block text-center text-lime text-[11px] font-mono mt-3 hover:underline">View full schedule →</Link>
            </Card>

            <Card>
              <Label>Fuel today</Label>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-bone text-[26px] font-bold">{n.calories.current.toLocaleString()}</span>
                <span className="text-muted text-[13px]">/ {n.calories.target.toLocaleString()}</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-3">
                <div className="h-full bg-lime rounded-full" style={{width:`${(n.calories.current/n.calories.target)*100}%`}}/>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {val:n.protein.current, label:'Protein', color:'#C8F560'},
                  {val:n.carbs.current,   label:'Carbs',   color:'#E8A020'},
                  {val:n.fat.current,     label:'Fat',     color:'#F0EDE6'},
                ].map(m=>(
                  <div key={m.label} className="text-center">
                    <div className="font-bold text-[18px]" style={{color:m.color}}>{m.val}</div>
                    <div className="text-muted text-[9px] font-mono uppercase tracking-wide">{m.label}</div>
                  </div>
                ))}
              </div>
              <Link href="/nutrition" className="block text-center text-lime text-[11px] font-mono mt-3 hover:underline">Full log →</Link>
            </Card>

            <Card>
              <Label>HRV · 7 days</Label>
              <div className="flex items-end gap-1 h-12 mb-1">
                {r.hrvWeek.map((v,i)=>{
                  const max=Math.max(...r.hrvWeek)
                  return <div key={i} className="flex-1 rounded-sm transition-all" style={{height:`${(v/max)*100}%`,background:i===r.hrvWeek.length-1?'#C8F560':'rgba(200,245,96,0.25)'}}/>
                })}
              </div>
              <div className="flex justify-between mt-1">
                {['M','T','W','T','F','S','T'].map((d,i)=>(
                  <span key={i} className={`text-[9px] font-mono ${i===6?'text-lime':'text-muted'}`}>{d}</span>
                ))}
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-white/[0.055]">
                <Stat val={r.hrv} unit="ms" label="Today" delta={`+${r.hrvDelta}ms`} up/>
                <Stat val={r.restingHR} unit="bpm" label="Resting HR"/>
              </div>
            </Card>
          </div>

          {/* CENTER COL: Progression */}
          <div className="col-span-6 flex flex-col gap-4">

            {/* Lift progression — clickable header */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <Label>Lift progression</Label>
                <div className="flex gap-1">
                  {Object.keys(mockLifts).map(lift=>(
                    <button key={lift} onClick={()=>setSelectedLift(lift)}
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-lg transition-colors ${selectedLift===lift?'bg-lime/10 text-lime':'text-muted hover:text-bone'}`}>
                      {lift}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-bone text-[34px] font-bold leading-none">{liftData[liftData.length-1]?.max}</span>
                <span className="text-muted text-[14px]">lbs · {selectedLift}</span>
                <span className="text-lime text-[12px] font-mono bg-lime/10 px-2 py-0.5 rounded-lg ml-auto">
                  +{liftData[liftData.length-1].max - liftData[0].max}lbs since May
                </span>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={liftData} margin={{top:4,right:4,bottom:0,left:-28}}>
                  <defs>
                    <linearGradient id="liftGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C8F560" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#C8F560" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{fill:'#5a5a4e',fontSize:10,fontFamily:'DM Mono'}} tickLine={false} axisLine={false}/>
                  <YAxis domain={['auto','auto']} tick={{fill:'#5a5a4e',fontSize:10,fontFamily:'DM Mono'}} tickLine={false} axisLine={false}/>
                  <Tooltip contentStyle={chartTooltipStyle} itemStyle={{color:'#C8F560'}} labelStyle={{color:'#F0EDE6'}}/>
                  <Area type="monotone" dataKey="max" stroke="#C8F560" strokeWidth={2} fill="url(#liftGrad)" dot={{fill:'#C8F560',r:3}} activeDot={{r:5}}/>
                </AreaChart>
              </ResponsiveContainer>
              {/* Last session sets */}
              <div className="mt-4 pt-4 border-t border-white/[0.055]">
                <div className="text-muted text-[10px] font-mono uppercase tracking-widest mb-2">Last session · {mockLifts[selectedLift as keyof typeof mockLifts].slice(-1)[0].date}</div>
                <div className="flex gap-2 flex-wrap">
                  {mockLifts[selectedLift as keyof typeof mockLifts].slice(-1)[0].sets.map((s,i)=>(
                    <div key={i} className="bg-white/[0.04] border border-white/[0.055] rounded-xl px-3 py-2 text-center">
                      <div className="text-bone text-[15px] font-semibold">{s.w}<span className="text-muted text-[11px]">lbs</span></div>
                      <div className="text-muted text-[10px] font-mono">{s.r} reps</div>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/lifts" className="block text-center text-lime text-[11px] font-mono mt-3 hover:underline">Full lift history →</Link>
            </Card>

            {/* Recovery trend */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <Label>Recovery · 30 days</Label>
                <span className="text-lime text-[11px] font-mono bg-lime/10 px-2 py-0.5 rounded-lg">Avg {a.avgRecovery}</span>
              </div>
              <ResponsiveContainer width="100%" height={90}>
                <AreaChart data={recoveryData} margin={{top:4,right:4,bottom:0,left:-28}}>
                  <defs>
                    <linearGradient id="recGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C8F560" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#C8F560" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{fill:'#5a5a4e',fontSize:9,fontFamily:'DM Mono'}} tickLine={false} axisLine={false} interval={6}/>
                  <YAxis domain={[40,100]} tick={{fill:'#5a5a4e',fontSize:9,fontFamily:'DM Mono'}} tickLine={false} axisLine={false}/>
                  <Tooltip contentStyle={chartTooltipStyle} itemStyle={{color:'#C8F560'}} labelFormatter={v=>`Day ${v}`}/>
                  <Area type="monotone" dataKey="score" stroke="#C8F560" strokeWidth={1.5} fill="url(#recGrad)" dot={false}/>
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* RIGHT COL: Body + quick stats */}
          <div className="col-span-3 flex flex-col gap-4">

            <Card>
              <Label>Body weight · 30 days</Label>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-bone text-[30px] font-bold leading-none">182</span>
                <span className="text-muted text-[13px]">lbs</span>
                <span className="text-lime text-[11px] font-mono ml-auto">↓ -6lbs</span>
              </div>
              <ResponsiveContainer width="100%" height={70}>
                <LineChart data={weightData} margin={{top:4,right:4,bottom:0,left:-32}}>
                  <XAxis dataKey="day" hide/>
                  <YAxis domain={[178,190]} hide/>
                  <Tooltip contentStyle={chartTooltipStyle} itemStyle={{color:'#C8F560'}} labelFormatter={v=>`Day ${v}`}/>
                  <Line type="monotone" dataKey="weight" stroke="#C8F560" strokeWidth={2} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <Label>30-day snapshot</Label>
              <div className="flex flex-col gap-4">
                <Stat val={`${a.avgHRV}ms`} label="Avg HRV" delta="+4ms" up/>
                <Stat val={a.avgSleep} label="Avg sleep" delta="-14m vs last month"/>
                <Stat val={`${a.avgRestingHR}bpm`} label="Resting HR" delta="↓ improving" up/>
                <Stat val={`${a.sessionsDone}/${a.sessionsTotal}`} label="Adherence" delta="85%" up/>
              </div>
            </Card>

            <Card>
              <Label>Strength PRs</Label>
              <div className="flex flex-col gap-3">
                {[
                  {lift:'Back squat', val:'225 lbs', delta:'+40lbs'},
                  {lift:'Deadlift',   val:'315 lbs', delta:'+50lbs'},
                  {lift:'Bench',      val:'185 lbs', delta:'+30lbs'},
                  {lift:'OHP',        val:'125 lbs', delta:'+20lbs'},
                ].map(l=>(
                  <div key={l.lift} className="flex items-center justify-between">
                    <div>
                      <div className="text-bone text-[13px] font-semibold">{l.val}</div>
                      <div className="text-muted text-[10px] font-mono uppercase tracking-wide">{l.lift}</div>
                    </div>
                    <span className="text-lime text-[11px] font-mono">{l.delta}</span>
                  </div>
                ))}
              </div>
              <Link href="/lifts" className="block text-center text-lime text-[11px] font-mono mt-3 hover:underline">Drill into lifts →</Link>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
