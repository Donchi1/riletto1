'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { useUIStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useUIStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className={cn(
        'transition-all duration-300',
        sidebarOpen ? 'ml-64' : 'ml-0'
      )}>
        {children}
      </main>
    </div>
  )
}
