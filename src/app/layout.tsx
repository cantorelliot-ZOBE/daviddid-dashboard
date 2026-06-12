import type { Metadata } from 'next'
import './globals.css'
import AuthGate from '@/components/AuthGate'

export const metadata: Metadata = {
  title: 'David — Performance Dashboard',
  description: 'Your AI performance coach dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  )
}
