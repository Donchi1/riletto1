'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Globe, Mail, Building2, MapPin, Users, Link2,
  AtSign, Loader2, CheckCircle2, Plus, ArrowRight
} from 'lucide-react'
import { Topbar } from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge } from '@/components/ui/status-badge'
import { toast } from 'sonner'

interface EnrichResult {
  email: string
  first_name: string
  last_name: string
  title: string
  company: string
  website: string
  linkedin: string
  twitter: string
  location: string
  country: string
  industry: string
  company_size: string
  category: string
  role_type: string
}

const demoEnrichResults: EnrichResult[] = [
  { email: 'sarah.chen@acme-ventures.com', first_name: 'Sarah', last_name: 'Chen', title: 'Head of Marketing', company: 'Acme Ventures', website: 'acme-ventures.com', linkedin: 'linkedin.com/in/sarah-chen', twitter: '@sarahchen_mkt', location: 'San Francisco, CA', country: 'US', industry: 'Technology', company_size: '51-200', category: 'Venture Capital', role_type: 'Marketing' },
  { email: 'james.wright@buildstack.io', first_name: 'James', last_name: 'Wright', title: 'Co-Founder & CEO', company: 'BuildStack', website: 'buildstack.io', linkedin: 'linkedin.com/in/jameswright', twitter: '@james_buildstack', location: 'Austin, TX', country: 'US', industry: 'SaaS', company_size: '11-50', category: 'Developer Tools', role_type: 'Founder' },
]

export default function EnrichPage() {
  const [emailInput, setEmailInput] = useState('')
  const [enriching, setEnriching] = useState(false)
  const [result, setResult] = useState<EnrichResult | null>(null)
  const [bulkEmails, setBulkEmails] = useState('')
  const [bulkResults, setBulkResults] = useState<EnrichResult[]>([])

  const handleEnrich = async () => {
    if (!emailInput.trim()) return
    setEnriching(true)
    setResult(null)
    await new Promise((r) => setTimeout(r, 1800))
    setEnriching(false)
    const found = demoEnrichResults.find((r) => r.email === emailInput)
    setResult(found || {
      ...demoEnrichResults[0],
      email: emailInput,
      first_name: emailInput.split('@')[0].split('.')[0] || 'Unknown',
      last_name: emailInput.split('@')[0].split('.')[1] || '',
    })
    toast.success('Contact enriched successfully')
  }

  const handleBulkEnrich = async () => {
    const emails = bulkEmails.split('\n').filter((e) => e.trim())
    if (!emails.length) return
    setEnriching(true)
    await new Promise((r) => setTimeout(r, 2000))
    setBulkResults(emails.map((email, i) => ({ ...demoEnrichResults[i % demoEnrichResults.length], email })))
    setEnriching(false)
    toast.success(`Enriched ${emails.length} contacts`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Enrich" subtitle="Transform emails and domains into complete business profiles" />

      <div className="flex-1 p-6 space-y-6">
        <Tabs defaultValue="single">
          <TabsList className="h-9 mb-6">
            <TabsTrigger value="single" className="gap-1.5 text-xs"><Sparkles className="h-3.5 w-3.5" />Single Enrichment</TabsTrigger>
            <TabsTrigger value="bulk" className="gap-1.5 text-xs"><Users className="h-3.5 w-3.5" />Bulk Enrichment</TabsTrigger>
          </TabsList>

          <TabsContent value="single">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Enrich a Contact</h3>
                <p className="text-sm text-muted-foreground mb-6">Enter an email address or domain to retrieve full business profile data.</p>
                <Input
                  placeholder="email@company.com or company.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEnrich()}
                  className="mb-4"
                />
                <Button onClick={handleEnrich} disabled={enriching} className="w-full gap-1.5">
                  {enriching ? <><Loader2 className="h-4 w-4 animate-spin" />Enriching...</> : <><Sparkles className="h-4 w-4" />Enrich Contact</>}
                </Button>

                <div className="mt-6 space-y-2">
                  <p className="text-xs font-medium text-foreground">Enrichment data includes:</p>
                  {['Full name & job title', 'Company name & website', 'LinkedIn & Twitter profiles', 'Location & country', 'Industry & company size', 'Role classification', 'Business category'].map((item) => (
                    <p key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />{item}
                    </p>
                  ))}
                </div>
              </Card>

              <AnimatePresence>
                {enriching && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Card className="p-8 flex flex-col items-center justify-center h-full text-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                      </div>
                      <p className="text-sm font-medium text-foreground">Enriching contact data...</p>
                      <div className="space-y-2 w-full max-w-xs">
                        {['Identifying company...', 'Fetching social profiles...', 'Detecting role type...'].map((step, i) => (
                          <motion.p
                            key={step}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.4 }}
                            className="text-xs text-muted-foreground flex items-center gap-2"
                          >
                            <Loader2 className="h-3 w-3 animate-spin text-primary" />{step}
                          </motion.p>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}

                {result && !enriching && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-lg font-bold text-primary">
                            {result.first_name[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{result.first_name} {result.last_name}</p>
                            <p className="text-sm text-muted-foreground">{result.title}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">{result.role_type}</Badge>
                      </div>

                      <div className="space-y-3">
                        {[
                          { icon: Mail, label: 'Email', value: result.email },
                          { icon: Building2, label: 'Company', value: result.company },
                          { icon: Globe, label: 'Website', value: result.website },
                          { icon: MapPin, label: 'Location', value: `${result.location}, ${result.country}` },
                          { icon: Users, label: 'Company Size', value: result.company_size + ' employees' },
                          { icon: Link2, label: 'LinkedIn', value: result.linkedin },
                          { icon: AtSign, label: 'Twitter', value: result.twitter },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                              <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-[11px] text-muted-foreground">{item.label}</p>
                              <p className="text-xs font-medium text-foreground">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-6 pt-4 border-t border-border">
                        <Button size="sm" className="gap-1.5 flex-1 text-xs h-7" onClick={() => toast.success('Added to workspace')}>
                          <Plus className="h-3 w-3" />Save Prospect
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1.5 text-xs h-7" onClick={() => toast.success('Verifying email...')}>
                          Verify Email <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="bulk">
            <div className="max-w-2xl">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Bulk Contact Enrichment</h3>
                <textarea
                  placeholder="Enter one email or domain per line:&#10;john@company.com&#10;jane@startup.io&#10;company.com"
                  className="w-full h-40 p-3 text-sm border border-border rounded-lg resize-none bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  value={bulkEmails}
                  onChange={(e) => setBulkEmails(e.target.value)}
                />
                <Button onClick={handleBulkEnrich} disabled={enriching} className="w-full mt-4 gap-1.5">
                  {enriching ? <><Loader2 className="h-4 w-4 animate-spin" />Enriching...</> : <><Sparkles className="h-4 w-4" />Enrich All</>}
                </Button>
              </Card>

              {bulkResults.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <Card className="overflow-hidden">
                    <div className="px-4 py-3 border-b border-border bg-muted/30">
                      <span className="text-sm font-semibold">{bulkResults.length} contacts enriched</span>
                    </div>
                    <div className="divide-y divide-border">
                      {bulkResults.map((r, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-3">
                          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-semibold text-primary">{r.first_name[0]}</div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{r.first_name} {r.last_name}</p>
                            <p className="text-xs text-muted-foreground">{r.email}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">{r.company}</div>
                          <Badge variant="secondary" className="text-xs">{r.role_type}</Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
