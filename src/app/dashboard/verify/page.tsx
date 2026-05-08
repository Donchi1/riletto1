'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck, Upload, CheckCircle2, XCircle, AlertTriangle,
  RefreshCw, Download, Search, BarChart3, Loader2
} from 'lucide-react'
import { Topbar } from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge, ConfidenceScore } from '@/components/ui/status-badge'
import { toast } from 'sonner'

interface VerifyResult {
  email: string
  status: string
  confidence: number
  mx: boolean
  smtp: boolean
  disposable: boolean
  role: boolean
  catch_all: boolean
}

const demoResults: VerifyResult[] = [
  { email: 'sarah.chen@acme-ventures.com', status: 'valid', confidence: 97, mx: true, smtp: true, disposable: false, role: false, catch_all: false },
  { email: 'test@mailinator.com', status: 'invalid', confidence: 0, mx: false, smtp: false, disposable: true, role: false, catch_all: false },
  { email: 'info@bigcompany.com', status: 'role-based', confidence: 45, mx: true, smtp: true, disposable: false, role: true, catch_all: false },
  { email: 'catch@alldomain.io', status: 'catch-all', confidence: 62, mx: true, smtp: true, disposable: false, role: false, catch_all: true },
  { email: 'james.wright@buildstack.io', status: 'valid', confidence: 94, mx: true, smtp: true, disposable: false, role: false, catch_all: false },
  { email: 'temp123@10minutemail.com', status: 'invalid', confidence: 0, mx: false, smtp: false, disposable: true, role: false, catch_all: false },
]

export default function VerifyPage() {
  const [singleEmail, setSingleEmail] = useState('')
  const [bulkEmails, setBulkEmails] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<VerifyResult[]>([])

  const handleSingleVerify = async () => {
    if (!singleEmail.trim()) return
    setVerifying(true)
    await new Promise((r) => setTimeout(r, 1500))
    setVerifying(false)
    const mockResult = demoResults.find((r) => r.email === singleEmail) || {
      email: singleEmail,
      status: Math.random() > 0.3 ? 'valid' : 'risky',
      confidence: Math.floor(Math.random() * 40 + 55),
      mx: true, smtp: true, disposable: false, role: false, catch_all: false
    }
    setResults([mockResult])
    toast.success('Verification complete')
  }

  const handleBulkVerify = async () => {
    if (!bulkEmails.trim()) return
    const emails = bulkEmails.split('\n').filter((e) => e.trim())
    setVerifying(true)
    setProgress(0)
    setResults([])
    for (let i = 0; i < emails.length; i++) {
      await new Promise((r) => setTimeout(r, 300))
      setProgress(Math.round(((i + 1) / emails.length) * 100))
      const r = demoResults[i % demoResults.length]
      setResults((prev) => [...prev, { ...r, email: emails[i].trim() }])
    }
    setVerifying(false)
    toast.success(`Verified ${emails.length} emails`)
  }

  const statusCounts = {
    valid: results.filter((r) => r.status === 'valid').length,
    risky: results.filter((r) => r.status === 'risky').length,
    invalid: results.filter((r) => r.status === 'invalid').length,
    catchAll: results.filter((r) => r.status === 'catch-all').length,
    roleBased: results.filter((r) => r.status === 'role-based').length,
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Verify" subtitle="Multi-layer email verification and quality scoring" />

      <div className="flex-1 p-6 space-y-6">
        {results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-5 gap-4">
            {[
              { label: 'Valid', count: statusCounts.valid, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
              { label: 'Risky', count: statusCounts.risky, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30' },
              { label: 'Invalid', count: statusCounts.invalid, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30' },
              { label: 'Catch-All', count: statusCounts.catchAll, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30' },
              { label: 'Role-Based', count: statusCounts.roleBased, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30' },
            ].map((stat) => (
              <Card key={stat.label} className="p-4 text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </Card>
            ))}
          </motion.div>
        )}

        <Tabs defaultValue="single">
          <TabsList className="h-9 mb-6">
            <TabsTrigger value="single" className="gap-1.5 text-xs"><Search className="h-3.5 w-3.5" />Single</TabsTrigger>
            <TabsTrigger value="bulk" className="gap-1.5 text-xs"><BarChart3 className="h-3.5 w-3.5" />Bulk</TabsTrigger>
            <TabsTrigger value="upload" className="gap-1.5 text-xs"><Upload className="h-3.5 w-3.5" />Upload File</TabsTrigger>
          </TabsList>

          <TabsContent value="single">
            <div className="max-w-xl">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Verify Single Email</h3>
                <div className="flex gap-3">
                  <Input
                    placeholder="email@company.com"
                    value={singleEmail}
                    onChange={(e) => setSingleEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSingleVerify()}
                    type="email"
                    className="flex-1"
                  />
                  <Button onClick={handleSingleVerify} disabled={verifying} className="gap-1.5 min-w-[110px]">
                    {verifying ? <><Loader2 className="h-4 w-4 animate-spin" />Verifying...</> : <><ShieldCheck className="h-4 w-4" />Verify</>}
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bulk">
            <div className="max-w-xl">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Bulk Email Verification</h3>
                <textarea
                  placeholder="Enter one email per line:&#10;john@company.com&#10;jane@startup.io&#10;info@agency.com"
                  className="w-full h-40 p-3 text-sm border border-border rounded-lg resize-none bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-mono"
                  value={bulkEmails}
                  onChange={(e) => setBulkEmails(e.target.value)}
                />
                {verifying && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Verifying emails...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}
                <Button onClick={handleBulkVerify} disabled={verifying} className="w-full mt-4 gap-1.5">
                  {verifying ? <><Loader2 className="h-4 w-4 animate-spin" />Verifying...</> : <><ShieldCheck className="h-4 w-4" />Verify All</>}
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upload">
            <div className="max-w-xl">
              <Card className="p-8 text-center">
                <div
                  className="border-2 border-dashed border-border rounded-xl p-12 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                  onClick={() => toast.info('File picker would open')}
                >
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">Upload a file with emails</p>
                  <p className="text-xs text-muted-foreground">CSV, TXT, XLSX supported</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Results */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
                  <span className="text-sm font-semibold text-foreground">Verification Results</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => toast.success('Downloading...')}>
                      <Download className="h-3 w-3" />Export CSV
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setResults([])}>Clear</Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Email</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Status</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Score</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">MX</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">SMTP</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Disposable</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Role</th>
                        <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Catch-All</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r, i) => (
                        <motion.tr
                          key={`${r.email}-${i}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                        >
                          <td className="px-5 py-3 text-sm font-medium text-foreground">{r.email}</td>
                          <td className="px-3 py-3"><StatusBadge status={r.status} /></td>
                          <td className="px-3 py-3"><ConfidenceScore score={r.confidence} /></td>
                          <td className="px-3 py-3">{r.mx ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-red-500" />}</td>
                          <td className="px-3 py-3">{r.smtp ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-red-500" />}</td>
                          <td className="px-3 py-3">{r.disposable ? <AlertTriangle className="h-4 w-4 text-amber-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}</td>
                          <td className="px-3 py-3">{r.role ? <AlertTriangle className="h-4 w-4 text-orange-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}</td>
                          <td className="px-3 py-3">{r.catch_all ? <AlertTriangle className="h-4 w-4 text-blue-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
