'use client'

import { Search, Bell, Sun, Moon, Command } from 'lucide-react'
import { useUIStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { CommandPalette } from '@/components/command-palette'

interface TopbarProps {
  title: string
  subtitle?: string
}

export function Topbar({ title, subtitle }: TopbarProps) {
  const { theme, toggleTheme, setCommandOpen, sidebarOpen } = useUIStore()

  return (
    <>
      <CommandPalette />
      <header className={`h-14 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-6 transition-all ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-sm font-semibold text-foreground">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-muted-foreground h-8 text-xs px-3"
            onClick={() => setCommandOpen(true)}
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search anything...</span>
            <kbd className="hidden sm:inline-flex h-4 items-center gap-0.5 rounded border border-border bg-muted px-1 font-mono text-[10px]">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
          </Button>
        </div>
      </header>
    </>
  )
}
