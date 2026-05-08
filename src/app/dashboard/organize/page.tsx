'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FolderKanban, Copy, Trash2, Upload, Download, Plus, Search,
  GitMerge, Layers, Tag, Filter, MoreHorizontal, Loader2
} from 'lucide-react'
import { Topbar } from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge } from '@/components/ui/status-badge'
import { mockProspects } from '@/lib/mock-data'
import { toast } from 'sonner'

const workspaces = [
  { id: '1', name: 'SaaS Companies Q2', count: 342, color: '#3B82F6', tags: ['saas', 'verified'] },
  { id: '2', name: 'Marketing Agencies', count: 187, color: '#10B981', tags: ['agencies', 'enriched'] },
  { id: '3', name: 'E-Commerce Stores', count: 521, color: '#F59E0B', tags: ['ecommerce'] },
  { id: '4', name: 'Healthcare Providers', count: 94, color: '#EF4444', tags: ['healthcare', 'verified'] },
]

export default function OrganizePage() {
  const [comparing, setComparing] = useState(false)
  const [compareProgress, setCompareProgress] = useState(0)
  const [compareResult, setCompareResult] = useState<{ duplicates: number; unique: number; merged: number } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleCompare = async () => {
    setComparing(true)
    setCompareProgress(0)
    setCompareResult(null)
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((r) => setTimeout(r, 300))
      setCompareProgress(i)
    }
    setComparing(false)
    setCompareResult({ duplicates: 47, unique: 312, merged: 359 })
    toast.success('Comparison complete — 47 duplicates found')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Organize" subtitle="Manage, compare, clean, and structure your prospect data" />

      <div className="flex-1 p-6">
        <Tabs defaultValue="workspaces">
          <TabsList className="h-9 mb-6">
            <TabsTrigger value="workspaces" className="gap-1.5 text-xs"><FolderKanban className="h-3.5 w-3.5" />Workspaces</TabsTrigger>
            <TabsTrigger value="comparer" className="gap-1.5 text-xs"><GitMerge className="h-3.5 w-3.5" />Comparer</TabsTrigger>
            <TabsTrigger value="dedup" className="gap-1.5 text-xs"><Layers className="h-3.5 w-3.5" />Deduplication</TabsTrigger>
            <TabsTrigger value="lists" className="gap-1.5 text-xs"><Tag className="h-3.5 w-3.5" />Saved Lists</TabsTrigger>
          </TabsList>

          {/* Workspaces */}
          <TabsContent value="workspaces">
            <div className="flex items-center justify-between mb-4">
              <div className="relative max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Search workspaces..." className="pl-8 h-8 text-xs" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Button size="sm" className="gap-1.5 h-8 text-xs" onClick={() => toast.success('New workspace created')}>
                <Plus className="h-3.5 w-3.5" />New Workspace
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workspaces.map((ws) => (
                <motion.div key={ws.id} whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
                  <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: ws.color + '20' }}>
                          <FolderKanban className="h-4.5 w-4.5" style={{ color: ws.color, width: '1.1rem', height: '1.1rem' }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{ws.name}</p>
                          <p className="text-xs text-muted-foreground">{ws.count} prospects</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 -mt-0.5">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {ws.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-4">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex-1 h-7 text-xs gap-1" onClick={() => toast.success('Opening workspace...')}>
                        View Prospects
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.success('Exporting...')}>
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* New workspace card */}
              <motion.div whileHover={{ y: -2 }}>
                <Card
                  className="p-5 border-dashed cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center min-h-[160px] gap-3"
                  onClick={() => toast.success('New workspace created')}
                >
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Plus className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">Create New Workspace</p>
                </Card>
              </motion.div>
            </div>

            {/* Prospects list */}
            <div className="mt-6">
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
                  <span className="text-sm font-semibold">All Prospects</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><Filter className="h-3 w-3" />Filter</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><Download className="h-3 w-3" />Export</Button>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {mockProspects.map((p) => (
                    <div key={p.id} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/20 transition-colors">
                      <input type="checkbox" className="accent-primary" />
                      <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0">
                        {p.first_name?.[0] || p.email[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{p.first_name} {p.last_name}</p>
                        <p className="text-xs text-muted-foreground truncate">{p.email}</p>
                      </div>
                      <p className="text-xs text-foreground/70 hidden sm:block">{p.company}</p>
                      <p className="text-xs text-muted-foreground hidden md:block">{p.industry}</p>
                      <StatusBadge status={p.verification_status} />
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="h-3.5 w-3.5 text-muted-foreground" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Comparer */}
          <TabsContent value="comparer">
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <GitMerge className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Dataset Comparer</h3>
                    <p className="text-sm text-muted-foreground">Upload two files to compare, deduplicate, and merge</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {['File A (Primary)', 'File B (Secondary)'].map((label) => (
                    <div
                      key={label}
                      className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                      onClick={() => toast.info('File picker would open')}
                    >
                      <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-xs font-medium text-foreground">{label}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">CSV, XLSX, TXT</p>
                    </div>
                  ))}
                </div>

                {comparing && (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Comparing datasets...</span>
                      <span>{compareProgress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${compareProgress}%` }} />
                    </div>
                  </div>
                )}

                <Button onClick={handleCompare} disabled={comparing} className="w-full gap-1.5">
                  {comparing ? <><Loader2 className="h-4 w-4 animate-spin" />Comparing...</> : <><GitMerge className="h-4 w-4" />Compare & Merge</>}
                </Button>
              </Card>

              <AnimatePresence>
                {compareResult && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                    <Card className="p-6">
                      <h3 className="font-semibold text-foreground mb-4">Comparison Report</h3>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 rounded-xl bg-red-50 dark:bg-red-950/30">
                          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{compareResult.duplicates}</p>
                          <p className="text-xs text-muted-foreground mt-1">Duplicates Found</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{compareResult.unique}</p>
                          <p className="text-xs text-muted-foreground mt-1">Unique Records</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-primary/10">
                          <p className="text-2xl font-bold text-primary">{compareResult.merged}</p>
                          <p className="text-xs text-muted-foreground mt-1">Total Merged</p>
                        </div>
                      </div>
                      <Button className="w-full gap-1.5" onClick={() => toast.success('Downloading merged file...')}>
                        <Download className="h-4 w-4" />Download Merged File
                      </Button>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          {/* Deduplication */}
          <TabsContent value="dedup">
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
                    <Layers className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Smart Deduplication</h3>
                    <p className="text-sm text-muted-foreground">Remove duplicates using fuzzy matching and normalized comparison</p>
                  </div>
                </div>

                <div
                  className="border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all mb-6"
                  onClick={() => toast.info('File picker would open')}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">Upload your contact list</p>
                  <p className="text-xs text-muted-foreground">CSV, XLSX, TXT</p>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-xs font-medium text-foreground">Deduplication settings:</p>
                  {[
                    { label: 'Fuzzy email matching', desc: 'Match similar emails (typos, variations)' },
                    { label: 'Domain-based dedup', desc: 'Remove multiple entries from same domain' },
                    { label: 'Company normalization', desc: 'Match "Inc.", "LLC", "Ltd" variants' },
                  ].map((opt) => (
                    <label key={opt.label} className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="accent-primary mt-0.5" defaultChecked />
                      <div>
                        <p className="text-sm text-foreground">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <Button className="w-full gap-1.5" onClick={() => toast.success('Deduplication complete — 47 duplicates removed')}>
                  <Layers className="h-4 w-4" />Run Deduplication
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* Saved Lists */}
          <TabsContent value="lists">
            <div className="flex items-center justify-between mb-4">
              <Input placeholder="Search lists..." className="h-8 text-xs max-w-xs" />
              <Button size="sm" className="gap-1.5 h-8 text-xs" onClick={() => toast.success('New list created')}>
                <Plus className="h-3.5 w-3.5" />New List
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Verified US SaaS Founders', count: 128, tags: ['verified', 'founders'], date: '2 days ago' },
                { name: 'EU Marketing Directors', count: 89, tags: ['marketing', 'eu'], date: '1 week ago' },
                { name: 'Healthcare Decision Makers', count: 214, tags: ['healthcare', 'enriched'], date: '3 days ago' },
              ].map((list) => (
                <Card key={list.name} className="p-5 hover:shadow-md transition-shadow">
                  <p className="text-sm font-semibold text-foreground mb-1">{list.name}</p>
                  <p className="text-xs text-muted-foreground mb-3">{list.count} prospects · {list.date}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {list.tags.map((t) => <Badge key={t} variant="secondary" className="text-[10px] px-1.5 h-4">{t}</Badge>)}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">View</Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.success('Exporting...')}><Download className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.success('Deleted')}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
