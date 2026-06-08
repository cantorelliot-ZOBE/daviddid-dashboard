'use client'
import DashboardShell from '@/components/DashboardShell'
import { mockLifts } from '@/lib/mockData'
import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const chartTooltipStyle = { background:'#111410', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, fontSize:11, fontFamily:'DM Mono', color:'#F0EDE6' }

export default function LiftsPage() {
  const lifts = Object.keys(mockLifts)
  const [selected, setSelected] = useState('Back Squat')
  const data = mockLifts[selected as keyof typeof mockLifts]
  const chartData = data.map(s=>({date:s.date, max:Math.max(...s.sets.map(x=>x.w)), vol:s.sets.reduce((a,x)=>a+(x.w*x.r),0)}))
  const pr = Math.max(...chartData.map(d=>d.max))
  const first = chartData[0].max
  const gain = pr - first

  return (
    <DashboardShell>
      <div className="px-8 py-6 max-w-[1400px] mx-auto">
        <div className="text-muted text-[11px] font-mono tracking-widest uppercase">Lifts</div>
        <div className="text-bone text-[26px] font-bold mb-5">Lift history</div>

        {/* Lift selector */}
        <div className="flex gap-2 mb-6">
          {lifts.map(l=>(
            <button key={l} onClick={()=>setSelected(l)}
              className={`px-4 py-2 rounded-xl text-[13px] font-medium border transition-colors ${selected===l?'bg-lime/10 text-lime border-lime/20':'bg-card border-white/[0.055] text-muted hover:text-bone'}`}>
              {l}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            {val:`${pr} lbs`, label:'Current PR',        delta:`+${gain}lbs since start`, up:true},
            {val:`${data.length}`,label:'Sessions logged',delta:'This block',               up:null},
            {val:`${chartData[chartData.length-1].max} lbs`,label:'Last session top set',delta:data[data.length-1].date, up:null},
            {val:`${Math.round(chartData.reduce((a,d)=>a+d.vol,0)/chartData.length).toLocaleString()}`,label:'Avg session volume',delta:'lbs total',up:null},
          ].map(s=>(
            <div key={s.label} className="bg-card border border-white/[0.055] rounded-2xl p-4">
              <div className="text-bone text-[26px] font-bold leading-none">{s.val}</div>
              <div className="text-muted text-[10px] font-mono uppercase tracking-wide mt-1">{s.label}</div>
              {s.delta && <div className={`text-[11px] font-mono mt-1 ${s.up===true?'text-lime':'text-muted'}`}>{s.delta}</div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card border border-white/[0.055] rounded-2xl p-5">
            <div className="text-muted text-[10px] font-mono tracking-widest uppercase mb-4">Top set weight over time</div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={chartData} margin={{top:4,right:4,bottom:0,left:-20}}>
                <defs>
                  <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8F560" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#C8F560" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{fill:'#5a5a4e',fontSize:10,fontFamily:'DM Mono'}} tickLine={false} axisLine={false}/>
                <YAxis domain={['auto','auto']} tick={{fill:'#5a5a4e',fontSize:10,fontFamily:'DM Mono'}} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={chartTooltipStyle} itemStyle={{color:'#C8F560'}} labelStyle={{color:'#F0EDE6'}}/>
                <Area type="monotone" dataKey="max" stroke="#C8F560" strokeWidth={2} fill="url(#lg)" dot={{fill:'#C8F560',r:3}} activeDot={{r:5}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card border border-white/[0.055] rounded-2xl p-5">
            <div className="text-muted text-[10px] font-mono tracking-widest uppercase mb-4">Session volume (lbs total)</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData} margin={{top:4,right:4,bottom:0,left:-20}}>
                <XAxis dataKey="date" tick={{fill:'#5a5a4e',fontSize:10,fontFamily:'DM Mono'}} tickLine={false} axisLine={false}/>
                <YAxis tick={{fill:'#5a5a4e',fontSize:10,fontFamily:'DM Mono'}} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={chartTooltipStyle} itemStyle={{color:'#C8F560'}}/>
                <Bar dataKey="vol" fill="rgba(200,245,96,0.2)" radius={[4,4,0,0]} activeBar={{fill:'rgba(200,245,96,0.4)'}}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Session log table */}
        <div className="bg-card border border-white/[0.055] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.055]">
            <div className="text-muted text-[10px] font-mono tracking-widest uppercase">All sessions</div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.055]">
                {['Date','Set 1','Set 2','Set 3','Top set','Volume'].map(h=>(
                  <th key={h} className="text-left text-muted text-[10px] font-mono uppercase tracking-widest px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...data].reverse().map((session,i)=>{
                const top = Math.max(...session.sets.map(s=>s.w))
                const vol = session.sets.reduce((a,s)=>a+(s.w*s.r),0)
                return (
                  <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3 text-muted text-[12px] font-mono">{session.date}</td>
                    {session.sets.map((s,j)=>(
                      <td key={j} className="px-5 py-3">
                        <span className="text-bone text-[13px] font-medium">{s.w}</span>
                        <span className="text-muted text-[11px]">lbs × {s.r}</span>
                      </td>
                    ))}
                    {session.sets.length < 3 && <td className="px-5 py-3 text-muted text-[12px]">—</td>}
                    <td className="px-5 py-3">
                      <span className={`text-[13px] font-bold ${top===pr?'text-lime':'text-bone'}`}>{top} lbs</span>
                      {top===pr && <span className="ml-2 text-[9px] font-mono bg-lime/10 text-lime px-1.5 py-0.5 rounded">PR</span>}
                    </td>
                    <td className="px-5 py-3 text-muted text-[12px] font-mono">{vol.toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  )
}
