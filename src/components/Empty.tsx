// Shared "no data yet" placeholder. Shown wherever a panel has no real data —
// a brand-new account starts empty and fills in as the app posts real data.
export default function Empty({ label = 'No data yet', className = '' }: { label?: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center text-center text-muted text-[12px] font-mono tracking-wide border border-dashed border-white/[0.08] rounded-card py-8 px-4 ${className}`}>
      {label}
    </div>
  )
}
