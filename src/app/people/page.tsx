import DashboardShell from '@/components/DashboardShell'
import { mockPeople } from '@/lib/mockData'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-muted text-[11px] font-mono tracking-[0.15em] uppercase mb-3">{children}</div>
}

const permStyles: Record<string, string> = {
  viewer: 'text-muted bg-white/[0.05]',
  editor: 'text-bone bg-white/[0.08]',
  full:   'text-lime bg-lime/[0.08]',
}

export default function PeoplePage() {
  return (
    <DashboardShell>
      <div className="text-muted text-[11px] font-mono tracking-widest uppercase">People</div>
      <div className="text-bone text-[28px] font-bold mb-5">Your team</div>

      <SectionLabel>Who can see your data</SectionLabel>
      <div className="flex flex-col gap-2 mb-5">
        {mockPeople.map(p => (
          <div key={p.id} className={`bg-card border border-white/[0.06] rounded-card flex items-center gap-3 px-4 py-3.5 ${p.status==='pending'?'opacity-50':''}`}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 border"
              style={{ background: `${p.color}18`, borderColor: `${p.color}30`, color: p.color }}>
              {p.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-bone text-[14px] font-semibold">{p.name}</div>
              <div className="text-muted text-[12px] mt-0.5">{p.role}</div>
            </div>
            <span className={`text-[11px] font-mono px-2.5 py-1 rounded-lg capitalize ${permStyles[p.permission]}`}>
              {p.permission}
            </span>
          </div>
        ))}

        <div className="bg-card border border-dashed border-lime/20 rounded-card flex items-center gap-3 px-4 py-4 cursor-pointer hover:border-lime/40 hover:bg-lime/[0.02] transition-colors">
          <div className="w-9 h-9 rounded-full bg-lime/10 border border-lime/20 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8F560" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <div>
            <div className="text-bone text-[14px] font-semibold">Add someone</div>
            <div className="text-muted text-[12px]">Coach, trainer, training partner</div>
          </div>
        </div>
      </div>

      <SectionLabel>Permission levels</SectionLabel>
      <div className="bg-card border border-white/[0.06] rounded-card overflow-hidden mb-5">
        {[
          { level: 'viewer', label: 'View all dashboard data',    scope: 'Read only'             },
          { level: 'editor', label: 'Edit training + nutrition',  scope: 'Write: 2 tabs'         },
          { level: 'full',   label: 'Full coach access',          scope: 'Write everything'      },
        ].map((row, i) => (
          <div key={row.level} className={`flex items-center gap-3 px-4 py-3.5 ${i < 2 ? 'border-b border-white/[0.06]' : ''}`}>
            <span className={`text-[11px] font-mono px-2.5 py-1 rounded-lg capitalize w-16 text-center ${permStyles[row.level]}`}>{row.level}</span>
            <span className="text-bone text-[13px] flex-1">{row.label}</span>
            <span className="text-muted text-[11px] font-mono">{row.scope}</span>
          </div>
        ))}
      </div>

      <div className="bg-card border border-white/[0.06] rounded-card p-4">
        <SectionLabel>Dashboards I can access</SectionLabel>
        <div className="text-muted text-[13px]">No one has shared their dashboard with you yet.</div>
      </div>
    </DashboardShell>
  )
}
