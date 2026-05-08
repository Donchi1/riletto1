'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { useUIStore } from '@/lib/store'
import { LayoutDashboard, Search, ShieldCheck, Sparkles, FolderKanban, Database, Code2, CreditCard, Settings } from 'lucide-react'

const commands = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, group: 'Navigation' },
  { label: 'Discover Prospects', href: '/dashboard/discover', icon: Search, group: 'Navigation' },
  { label: 'Verify Emails', href: '/dashboard/verify', icon: ShieldCheck, group: 'Navigation' },
  { label: 'Enrich Contacts', href: '/dashboard/enrich', icon: Sparkles, group: 'Navigation' },
  { label: 'Organize Data', href: '/dashboard/organize', icon: FolderKanban, group: 'Navigation' },
  { label: 'Datasets Marketplace', href: '/dashboard/datasets', icon: Database, group: 'Navigation' },
  { label: 'API Platform', href: '/dashboard/api', icon: Code2, group: 'Navigation' },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard, group: 'Account' },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings, group: 'Account' },
]

export function CommandPalette() {
  const { commandOpen, setCommandOpen } = useUIStore()
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen(!commandOpen)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [commandOpen, setCommandOpen])

  const grouped = commands.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = []
    acc[cmd.group].push(cmd)
    return acc
  }, {} as Record<string, typeof commands>)

  return (
    <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
      <CommandInput placeholder="Search pages, features, or actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(grouped).map(([group, items]) => (
          <CommandGroup key={group} heading={group}>
            {items.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => {
                  router.push(item.href)
                  setCommandOpen(false)
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
        <CommandSeparator />
      </CommandList>
    </CommandDialog>
  )
}
