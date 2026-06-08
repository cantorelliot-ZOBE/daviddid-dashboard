'use client'
export default function Topbar({ title }: { title: string }) {
  return (
    <div className="h-12 bg-card border-b border-white/[0.06] flex items-center justify-between px-6 shrink-0">
      <div className="text-bone text-[15px] font-semibold">{title}</div>
      <div className="flex items-center gap-3">
        <div className="text-muted text-[11px] font-mono bg-card2 px-2.5 py-1 rounded-lg border border-white/[0.06]">
          Wed · Jun 8
        </div>
        <button className="w-7 h-7 rounded-lg bg-card2 border border-white/[0.06] flex items-center justify-center text-muted hover:text-bone transition-colors relative">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-lime rounded-full"></span>
        </button>
      </div>
    </div>
  )
}
