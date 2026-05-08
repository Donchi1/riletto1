'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Search, ShieldCheck, Sparkles, FolderKanban,
  Database, Code2, CreditCard, Settings, ChevronLeft, Zap,
  Users, Download, BookOpen, Menu
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store'
import { Badge } from '@/components/ui/badge'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Discover', href: '/dashboard/discover', icon: Search, badge: 'AI' },
  { label: 'Verify', href: '/dashboard/verify', icon: ShieldCheck },
  { label: 'Enrich', href: '/dashboard/enrich', icon: Sparkles },
  { label: 'Organize', href: '/dashboard/organize', icon: FolderKanban },
  { label: 'Datasets', href: '/dashboard/datasets', icon: Database, badge: 'New' },
  { label: 'Exports', href: '/dashboard/exports', icon: Download },
]

const bottomItems = [
  { label: 'API', href: '/dashboard/api', icon: Code2 },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  { label: 'Docs', href: '/dashboard/docs', icon: BookOpen },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  return (
    <>
      <AnimatePresence>
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-sm hover:bg-accent transition-colors"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-40 flex flex-col"
          >
            {/* Logo */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-sidebar-border">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg text-sidebar-foreground tracking-tight">Riletto</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>

            {/* Credits indicator */}
            <div className="mx-4 mt-4 px-3 py-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-primary">Credits Used</span>
                <span className="text-xs font-semibold text-primary">7,250 / 10,000</span>
              </div>
              <div className="h-1.5 bg-primary/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '72.5%' }} />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 mt-4 space-y-0.5 overflow-y-auto">
              {navItems.map((item) => {
                const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                      active
                        ? 'bg-sidebar-accent text-sidebar-primary'
                        : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                    )}
                  >
                    <item.icon className={cn('h-4 w-4 flex-shrink-0', active ? 'text-sidebar-primary' : '')} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/15 text-primary border-0">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Bottom navigation */}
            <div className="px-3 pb-4 border-t border-sidebar-border pt-3 space-y-0.5">
              {bottomItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                      active
                        ? 'bg-sidebar-accent text-sidebar-primary'
                        : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}

              {/* User section */}
              <div className="mt-2 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent/50 cursor-pointer transition-colors">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Users className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-sidebar-foreground truncate">Demo User</p>
                  <p className="text-[10px] text-sidebar-foreground/50 truncate">Starter Plan</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
