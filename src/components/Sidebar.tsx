'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href:'/',          label:'Today',    icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { href:'/training',  label:'Train',    icon:'M6.5 6.5h11M6.5 17.5h11M3 12h18' },
  { href:'/nutrition', label:'Fuel',     icon:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8 12h8' },
  { href:'/analytics', label:'Progress', icon:'M3 3v18h18M7 16l4-4 4 4 4-8' },
  { href:'/lifts',     label:'Lifts',    icon:'M6 4v16M18 4v16M6 12h12' },
  { href:'/people',    label:'People',   icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
]

export default function Sidebar() {
  const path = usePathname()
  return (
    <aside className="w-[56px] bg-card border-r border-white/[0.055] flex flex-col shrink-0 h-screen items-center py-4 gap-1">
      <div className="mb-4 pb-4 border-b border-white/[0.055] w-full flex justify-center">
        <div className="text-lime font-black text-[11px] tracking-widest uppercase" style={{writingMode:'vertical-rl',transform:'rotate(180deg)',letterSpacing:'0.2em'}}>DD</div>
      </div>
      {nav.map(item => {
        const active = path === item.href || (item.href !== '/' && path.startsWith(item.href))
        return (
          <Link key={item.href} href={item.href} title={item.label}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all group relative ${
              active ? 'bg-lime/10 text-lime' : 'text-muted hover:text-bone hover:bg-white/[0.04]'
            }`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.icon}/>
            </svg>
            <span className="absolute left-12 bg-card2 text-bone text-[11px] font-medium px-2 py-1 rounded-lg border border-white/[0.06] opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
              {item.label}
            </span>
          </Link>
        )
      })}
      <div className="mt-auto pt-4 border-t border-white/[0.055] w-full flex justify-center">
        <div className="w-7 h-7 rounded-full bg-lime/10 border border-lime/30 flex items-center justify-center text-lime text-[10px] font-bold">
          EC
        </div>
      </div>
    </aside>
  )
}
