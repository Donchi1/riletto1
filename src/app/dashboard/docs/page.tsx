'use client'

import { BookOpen, Code2, ShieldCheck, Sparkles, Search, ArrowRight } from 'lucide-react'
import { Topbar } from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const docSections = [
  { title: 'Getting Started', icon: BookOpen, desc: 'Quick start guide, authentication, and platform overview.', color: 'text-primary bg-primary/10' },
  { title: 'Discover API', icon: Search, desc: 'Discover business contacts by domain, industry, or keywords.', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30' },
  { title: 'Verify API', icon: ShieldCheck, desc: 'Multi-layer email verification endpoints and response formats.', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' },
  { title: 'Enrich API', icon: Sparkles, desc: 'Enrich email addresses and domains with business data.', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30' },
  { title: 'Developer Tools', icon: Code2, desc: 'API reference, request logs, and SDK documentation.', color: 'text-slate-600 bg-slate-50 dark:bg-slate-950/30' },
]

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Documentation" subtitle="Guides, API reference, and integration resources" />
      <div className="flex-1 p-6">
        <div className="max-w-4xl">
          <div className="grid md:grid-cols-2 gap-5">
            {docSections.map((section) => (
              <Card key={section.title} className="p-6 hover:shadow-md transition-shadow cursor-pointer group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${section.color}`}>
                  <section.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{section.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{section.desc}</p>
                <Button variant="ghost" size="sm" className="gap-1.5 h-7 text-xs p-0 text-primary group-hover:gap-2 transition-all">
                  Read docs <ArrowRight className="h-3 w-3" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
