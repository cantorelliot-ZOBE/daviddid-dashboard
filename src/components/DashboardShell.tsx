import Sidebar from '@/components/Sidebar'
import DavidChat from '@/components/DavidChat'

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <DavidChat />
    </div>
  )
}
