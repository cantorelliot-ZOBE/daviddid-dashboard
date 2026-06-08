'use client'
import { useState, useRef, useEffect } from 'react'
import { mockRecovery, mockNutrition } from '@/lib/mockData'

type Message = { role:'user'|'assistant'; content:string; time:string }

const SYSTEM = `You are David, a direct no-nonsense AI performance coach inside the DavidDid web dashboard. Current data: Recovery ${mockRecovery.score}/100, HRV ${mockRecovery.hrv}ms (+${mockRecovery.hrvDelta}ms), Sleep ${mockRecovery.sleep.total} (${mockRecovery.sleep.efficiency}% efficiency), Resting HR ${mockRecovery.restingHR}bpm. Macros: ${mockNutrition.calories.current}/${mockNutrition.calories.target}kcal, ${mockNutrition.protein.current}/${mockNutrition.protein.target}g protein. Strength: Back squat 225lbs (+40lbs this block), Bench 185lbs, Deadlift 315lbs. Body weight: 182lbs, down 6lbs over 4 weeks. Be sharp, direct, data-informed. No filler. No cheerleading.`

const INIT:Message[] = [
  { role:'assistant', content:"Recovery at 87, HRV up 4ms. Push session is the right call today — don't swap it.", time:'8:02' },
]

function now(){ const d=new Date(); return d.getHours()+':'+String(d.getMinutes()).padStart(2,'0') }

export default function DavidChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INIT)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}) },[messages,loading])

  async function send(text?:string) {
    const content = (text??input).trim()
    if (!content||loading) return
    setInput('')
    const userMsg:Message = {role:'user',content,time:now()}
    setMessages(prev=>[...prev,userMsg])
    setLoading(true)
    const history = [...messages,userMsg].map(m=>({role:m.role,content:m.content}))
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:SYSTEM,messages:history}),
      })
      const data = await res.json()
      const reply = data.content?.find((b:{type:string})=>b.type==='text')?.text??'No response.'
      setMessages(prev=>[...prev,{role:'assistant',content:reply,time:now()}])
    } catch {
      setMessages(prev=>[...prev,{role:'assistant',content:'Connection issue.',time:now()}])
    }
    setLoading(false)
  }

  function onKey(e:React.KeyboardEvent){ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()} }

  return (
    <>
      {/* Collapsed tab */}
      {!open && (
        <button onClick={()=>setOpen(true)}
          className="fixed bottom-6 right-6 bg-lime text-bg px-4 py-2.5 rounded-full font-semibold text-[13px] flex items-center gap-2 shadow-lg hover:bg-lime/90 transition-all z-50">
          <span className="w-1.5 h-1.5 rounded-full bg-bg/60 inline-block"></span>
          Ask David
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="w-[320px] bg-card border-l border-white/[0.055] flex flex-col shrink-0 h-screen">
          <div className="px-4 py-3 border-b border-white/[0.055] shrink-0 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime"></span>
                <span className="text-lime text-[11px] font-mono tracking-widest uppercase font-medium">David</span>
              </div>
              <div className="text-muted text-[10px] font-mono mt-0.5">AI Coach · Always on</div>
            </div>
            <button onClick={()=>setOpen(false)} className="text-muted hover:text-bone transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((m,i)=>(
              <div key={i} className={`flex flex-col ${m.role==='user'?'items-end':'items-start'}`}>
                {m.role==='assistant' && <div className="text-lime text-[10px] font-mono tracking-widest uppercase mb-1">David</div>}
                <div className={`max-w-[95%] px-3 py-2.5 rounded-xl text-[13px] leading-relaxed ${
                  m.role==='user'
                    ? 'bg-card2 border border-white/[0.06] text-bone rounded-tr-sm'
                    : 'bg-card2 border-l-2 border-lime border-y border-r border-white/[0.06] text-bone rounded-tl-sm'
                }`}>{m.content}</div>
                <div className="font-mono text-[9px] text-muted mt-1">{m.time}</div>
              </div>
            ))}
            {loading && (
              <div className="flex flex-col items-start">
                <div className="text-lime text-[10px] font-mono tracking-widest uppercase mb-1">David</div>
                <div className="bg-card2 border-l-2 border-lime border-y border-r border-white/[0.06] rounded-xl rounded-tl-sm px-3 py-2.5 flex gap-1.5">
                  {[0,1,2].map(i=><span key={i} className="w-1 h-1 rounded-full bg-muted inline-block" style={{animation:`bounce 1.2s infinite ${i*0.2}s`}}/>)}
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          <div className="px-4 py-3 border-t border-white/[0.055] shrink-0">
            <div className="flex gap-2 items-end">
              <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey}
                placeholder="Ask David anything..." rows={1}
                className="flex-1 bg-card2 border border-white/[0.06] rounded-xl px-3 py-2 text-[13px] text-bone placeholder:text-muted resize-none outline-none focus:border-lime/30 min-h-[36px] max-h-[100px]"/>
              <button onClick={()=>send()} disabled={loading||!input.trim()}
                className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center shrink-0 disabled:opacity-30 hover:bg-lime/90 transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0D0F0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
                </svg>
              </button>
            </div>
          </div>
          <style jsx>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-4px)}}`}</style>
        </div>
      )}
    </>
  )
}
