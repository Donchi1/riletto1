'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Globe, FileText, Upload, Database, Filter, SlidersHorizontal,
  Download, Plus, CheckCircle2, RefreshCw, ExternalLink, Copy, Sparkles
} from 'lucide-react'
import { Topbar } from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge, ConfidenceScore } from '@/components/ui/status-badge'
import { mockProspects } from '@/lib/mock-data'
import { toast } from 'sonner'

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } }

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [pasteText, setPasteText] = useState('')
  const [scanning, setScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanResults, setScanResults] = useState<typeof mockProspects>([])
  const [selectedProspects, setSelectedProspects] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState('search')

  const handleSearch = () => {
    toast.success('Finding prospects matching your criteria...')
    setTimeout(() => setScanResults(mockProspects), 1000)
  }

  const handleUrlScan = async () => {
    if (!urlInput.trim()) return
    setScanning(true)
    setScanProgress(0)
    setScanResults([])
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 200))
      setScanProgress(i)
    }
    setScanning(false)
    setScanResults(mockProspects.slice(0, 5))
    toast.success(`Found ${mockProspects.slice(0, 5).length} contacts from ${urlInput}`)
  }

  const handlePasteExtract = () => {
    if (!pasteText.trim()) return
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const found = pasteText.match(emailRegex) || []
    const results = found.map((email, i) => ({ ...mockProspects[i % mockProspects.length], email, id: `paste-${i}` }))
    setScanResults(results)
    toast.success(`Extracted ${found.length} email addresses`)
  }

  const toggleSelect = (id: string) => {
    setSelectedProspects((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const selectAll = () => {
    if (selectedProspects.size === scanResults.length) {
      setSelectedProspects(new Set())
    } else {
      setSelectedProspects(new Set(scanResults.map((p) => p.id)))
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Discover" subtitle="Find and extract business contacts from multiple sources" />

      <div className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <TabsList className="h-9">
              <TabsTrigger value="search" className="gap-1.5 text-xs"><Search className="h-3.5 w-3.5" />Prospect Search</TabsTrigger>
              <TabsTrigger value="url" className="gap-1.5 text-xs"><Globe className="h-3.5 w-3.5" />URL Scanner</TabsTrigger>
              <TabsTrigger value="paste" className="gap-1.5 text-xs"><FileText className="h-3.5 w-3.5" />Paste Extractor</TabsTrigger>
              <TabsTrigger value="file" className="gap-1.5 text-xs"><Upload className="h-3.5 w-3.5" />File Extractor</TabsTrigger>
              <TabsTrigger value="bulk" className="gap-1.5 text-xs"><Database className="h-3.5 w-3.5" />Bulk Domains</TabsTrigger>
            </TabsList>
            {selectedProspects.size > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{selectedProspects.size} selected</span>
                <Button size="sm" variant="outline" className="gap-1.5 h-7 text-xs" onClick={() => toast.success('Added to workspace')}>
                  <Plus className="h-3 w-3" />Add to Workspace
                </Button>
                <Button size="sm" className="gap-1.5 h-7 text-xs" onClick={() => toast.success('Exporting...')}>
                  <Download className="h-3 w-3" />Export
                </Button>
              </div>
            )}
          </div>

          {/* Prospect Search Tab */}
          <TabsContent value="search">
            <div className="grid lg:grid-cols-4 gap-6">
              <Card className="p-5 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">Filters</span>
                </div>
                {[
                  { label: 'Industry / Niche', placeholder: 'e.g. SaaS, Marketing' },
                  { label: 'Location', placeholder: 'City, Country' },
                  { label: 'Company Size', placeholder: '1-10, 11-50, 50+' },
                  { label: 'Keywords', placeholder: 'Job title, skills...' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">{field.label}</label>
                    <Input placeholder={field.placeholder} className="h-8 text-xs" />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-medium text-foreground mb-2 block">Email Type</label>
                  <div className="flex flex-col gap-1.5">
                    {['Personal', 'Company', 'Both'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="emailType" className="accent-primary" defaultChecked={opt === 'Both'} />
                        <span className="text-xs text-foreground/80">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Button className="w-full gap-1.5 text-xs" onClick={handleSearch}>
                  <Search className="h-3.5 w-3.5" />Search Prospects
                </Button>
              </Card>

              <div className="lg:col-span-3 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, company, or domain..."
                      className="pl-9 h-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button onClick={handleSearch} className="h-9 gap-1.5">
                    <Search className="h-3.5 w-3.5" />Search
                  </Button>
                </div>

                <AnimatePresence>
                  {scanResults.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Card className="overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              className="accent-primary"
                              checked={selectedProspects.size === scanResults.length && scanResults.length > 0}
                              onChange={selectAll}
                            />
                            <span className="text-xs font-medium text-foreground">{scanResults.length} prospects found</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                              <Filter className="h-3 w-3" />Filter
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                              <Download className="h-3 w-3" />Export All
                            </Button>
                          </div>
                        </div>
                        <div className="divide-y divide-border">
                          {scanResults
                            .filter((p) => !searchQuery || p.email.includes(searchQuery) || p.company?.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((prospect) => (
                              <motion.div
                                key={prospect.id}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex items-center gap-4 px-4 py-3 hover:bg-muted/30 transition-colors ${selectedProspects.has(prospect.id) ? 'bg-primary/5' : ''}`}
                              >
                                <input
                                  type="checkbox"
                                  className="accent-primary flex-shrink-0"
                                  checked={selectedProspects.has(prospect.id)}
                                  onChange={() => toggleSelect(prospect.id)}
                                />
                                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0">
                                  {prospect.first_name?.[0] || prospect.email[0].toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-foreground">{prospect.first_name} {prospect.last_name}</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-muted-foreground">{prospect.email}</span>
                                    <button onClick={() => { navigator.clipboard.writeText(prospect.email); toast.success('Copied') }} className="text-muted-foreground hover:text-foreground transition-colors">
                                      <Copy className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                                <div className="hidden sm:block text-xs text-foreground/70">{prospect.company}</div>
                                <div className="hidden md:block text-xs text-muted-foreground">{prospect.title}</div>
                                <div className="hidden lg:block text-xs text-muted-foreground">{prospect.location}</div>
                                <StatusBadge status={prospect.verification_status} />
                                <ConfidenceScore score={prospect.confidence_score} />
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.success('Enriching...')}>
                                    <Sparkles className="h-3.5 w-3.5" />
                                  </Button>
                                  {prospect.website && (
                                    <Button variant="ghost" size="icon" className="h-7 w-7">
                                      <a href={`https://${prospect.website}`} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-3.5 w-3.5" />
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {scanResults.length === 0 && (
                  <Card className="p-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Search for prospects</h3>
                    <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">Use the filters on the left or enter keywords to discover business contacts across industries and locations.</p>
                    <Button onClick={handleSearch} className="gap-1.5">
                      <Search className="h-4 w-4" />Start Discovery
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* URL Scanner Tab */}
          <TabsContent value="url">
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Website URL Scanner</h3>
                    <p className="text-sm text-muted-foreground">Crawl any website to discover contact information</p>
                  </div>
                </div>
                <div className="flex gap-3 mb-6">
                  <Input
                    placeholder="https://example.com"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUrlScan()}
                    className="flex-1"
                  />
                  <Button onClick={handleUrlScan} disabled={scanning} className="gap-1.5 min-w-[100px]">
                    {scanning ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
                    {scanning ? 'Scanning...' : 'Scan'}
                  </Button>
                </div>

                {scanning && (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Crawling pages and extracting contacts...</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        animate={{ width: `${scanProgress}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                    <div className="mt-3 space-y-1">
                      {['Fetching homepage...', 'Scanning /contact page...', 'Extracting mailto links...'].map((step, i) => (
                        scanProgress > i * 30 && (
                          <div key={step} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                            {step}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-muted-foreground space-y-1.5">
                  <p className="font-medium text-foreground">Scanner capabilities:</p>
                  {['Discovers emails from contact pages and footers', 'Extracts linked domains and social profiles', 'Identifies business metadata and categories', 'Detects embedded and obfuscated email formats'].map((f) => (
                    <p key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />{f}
                    </p>
                  ))}
                </div>
              </Card>

              {scanResults.length > 0 && !scanning && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <Card className="overflow-hidden">
                    <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
                      <span className="text-xs font-medium">{scanResults.length} contacts discovered</span>
                      <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                        <Download className="h-3 w-3" />Export
                      </Button>
                    </div>
                    <div className="divide-y divide-border">
                      {scanResults.map((p) => (
                        <div key={p.id} className="flex items-center gap-3 px-4 py-3">
                          <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-semibold text-primary">{p.email[0].toUpperCase()}</div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{p.email}</p>
                            <p className="text-xs text-muted-foreground">{p.company}</p>
                          </div>
                          <StatusBadge status={p.verification_status} />
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          </TabsContent>

          {/* Paste Extractor */}
          <TabsContent value="paste">
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Paste Extractor</h3>
                    <p className="text-sm text-muted-foreground">Paste any text to extract emails and domains</p>
                  </div>
                </div>
                <textarea
                  placeholder="Paste HTML, plain text, copied website content, or any document here..."
                  className="w-full h-48 p-4 text-sm border border-border rounded-xl resize-none bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                />
                <div className="flex items-center gap-3 mt-4">
                  <Button onClick={handlePasteExtract} className="gap-1.5 flex-1">
                    <Search className="h-4 w-4" />Extract Contacts
                  </Button>
                  <Button variant="outline" onClick={() => { setPasteText(''); setScanResults([]) }}>Clear</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* File Extractor */}
          <TabsContent value="file">
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                    <Upload className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">File Extractor</h3>
                    <p className="text-sm text-muted-foreground">Upload files to extract contact information</p>
                  </div>
                </div>
                <div
                  className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                  onDrop={(e) => { e.preventDefault(); toast.success('File uploaded — processing...'); setTimeout(() => setScanResults(mockProspects.slice(0, 4)), 1500) }}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => toast.info('File picker would open here')}
                >
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">Drag & drop files or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supports PDF, DOCX, TXT, CSV, HTML, XLSX</p>
                  <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                    {['PDF', 'DOCX', 'TXT', 'CSV', 'XLSX', 'HTML'].map((ext) => (
                      <Badge key={ext} variant="secondary" className="text-xs">{ext}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Bulk Domains */}
          <TabsContent value="bulk">
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center">
                    <Database className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Bulk Domain Scanner</h3>
                    <p className="text-sm text-muted-foreground">Scan multiple domains at once to find business emails</p>
                  </div>
                </div>
                <textarea
                  placeholder="Enter one domain per line:&#10;company1.com&#10;company2.io&#10;startup.co"
                  className="w-full h-40 p-4 text-sm border border-border rounded-xl resize-none bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-mono"
                />
                <div className="flex items-center gap-3 mt-4">
                  <Button className="gap-1.5 flex-1" onClick={() => toast.success('Starting bulk scan...')}>
                    <Database className="h-4 w-4" />Start Bulk Scan
                  </Button>
                  <Button variant="outline" onClick={() => toast.info('Upload CSV with domains')}>
                    <Upload className="h-4 w-4 mr-1.5" />Upload CSV
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
