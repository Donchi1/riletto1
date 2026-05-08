'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Code2, Key, BarChart3, BookOpen, Copy, Eye, EyeOff,
  Plus, Trash2, CheckCircle2, Activity, Zap
} from 'lucide-react'
import { Topbar } from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockApiUsage } from '@/lib/mock-data'
import { toast } from 'sonner'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const demoApiKeys = [
  { id: '1', name: 'Production Key', prefix: 'rl_prod_', lastUsed: '2 min ago', status: 'active', usage: 4821, limit: 10000 },
  { id: '2', name: 'Development Key', prefix: 'rl_dev_', lastUsed: '1 hr ago', status: 'active', usage: 312, limit: 1000 },
]

const endpoints = [
  { method: 'GET', path: '/v1/discover', description: 'Discover business contacts by domain, company, or industry', credits: 1 },
  { method: 'POST', path: '/v1/verify', description: 'Verify email addresses with multi-layer validation', credits: 1 },
  { method: 'POST', path: '/v1/enrich', description: 'Enrich email or domain with full business profile', credits: 2 },
  { method: 'POST', path: '/v1/compare', description: 'Compare two datasets and identify duplicates', credits: 5 },
  { method: 'POST', path: '/v1/extract', description: 'Extract emails from HTML, text, or file content', credits: 1 },
  { method: 'GET', path: '/v1/datasets', description: 'Browse and download curated lead datasets', credits: 0 },
  { method: 'POST', path: '/v1/scan', description: 'Crawl a URL to discover contact information', credits: 3 },
]

const methodColors: Record<string, string> = {
  GET: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800',
  POST: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800',
  PUT: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800',
  DELETE: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800',
}

export default function ApiPage() {
  const [showKey, setShowKey] = useState<Record<string, boolean>>({})
  const [apiKeys] = useState(demoApiKeys)

  const toggleShow = (id: string) => setShowKey((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="API Platform" subtitle="Integrate Riletto into your workflows with our developer API" />

      <div className="flex-1 p-6">
        <Tabs defaultValue="keys">
          <TabsList className="h-9 mb-6">
            <TabsTrigger value="keys" className="gap-1.5 text-xs"><Key className="h-3.5 w-3.5" />API Keys</TabsTrigger>
            <TabsTrigger value="usage" className="gap-1.5 text-xs"><BarChart3 className="h-3.5 w-3.5" />Usage</TabsTrigger>
            <TabsTrigger value="endpoints" className="gap-1.5 text-xs"><Code2 className="h-3.5 w-3.5" />Endpoints</TabsTrigger>
            <TabsTrigger value="logs" className="gap-1.5 text-xs"><Activity className="h-3.5 w-3.5" />Request Logs</TabsTrigger>
          </TabsList>

          {/* API Keys */}
          <TabsContent value="keys">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Manage your API keys for authentication</p>
                <Button size="sm" className="gap-1.5 h-8 text-xs" onClick={() => toast.success('New API key created')}>
                  <Plus className="h-3.5 w-3.5" />Create API Key
                </Button>
              </div>

              {apiKeys.map((key) => (
                <Card key={key.id} className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-foreground">{key.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Last used: {key.lastUsed}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800">Active</Badge>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => toast.error('API key deleted')}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 font-mono text-xs bg-muted px-3 py-2 rounded-lg text-foreground/70 overflow-hidden">
                      {showKey[key.id] ? `${key.prefix}sk_live_xxxxxxxxxxxxxxxxxxxxxxxx` : `${key.prefix}••••••••••••••••••••••••`}
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleShow(key.id)}>
                      {showKey[key.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { toast.success('Copied to clipboard'); }}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Monthly usage</span>
                      <span>{key.usage.toLocaleString()} / {key.limit.toLocaleString()} requests</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${(key.usage / key.limit) * 100}%` }} />
                    </div>
                  </div>
                </Card>
              ))}

              {/* Quick start */}
              <Card className="p-6 bg-muted/30">
                <p className="text-sm font-semibold text-foreground mb-3">Quick Start</p>
                <pre className="text-xs font-mono bg-background rounded-lg p-4 overflow-x-auto text-foreground/80 border border-border">
{`curl -X POST https://api.riletto.io/v1/verify \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "contact@company.com"}'`}
                </pre>
              </Card>
            </div>
          </TabsContent>

          {/* Usage */}
          <TabsContent value="usage">
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Total Requests', value: '5,133', change: '+18%', color: 'text-primary' },
                  { label: 'Credits Used', value: '7,250', change: '72.5%', color: 'text-amber-600 dark:text-amber-400' },
                  { label: 'Avg Response Time', value: '142ms', change: '-8%', color: 'text-emerald-600 dark:text-emerald-400' },
                ].map((stat) => (
                  <Card key={stat.label} className="p-4">
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <Badge variant="secondary" className="text-[10px] mt-2">{stat.change}</Badge>
                  </Card>
                ))}
              </div>

              <Card className="p-5">
                <p className="text-sm font-semibold text-foreground mb-5">API Requests Over Time</p>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={mockApiUsage}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.52 0.22 250)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="oklch(0.52 0.22 250)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 240)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'oklch(0.5 0.015 240)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: 'oklch(0.5 0.015 240)' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="verify" stroke="oklch(0.52 0.22 250)" strokeWidth={2} fill="url(#g1)" name="Requests" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </TabsContent>

          {/* Endpoints */}
          <TabsContent value="endpoints">
            <div className="max-w-3xl space-y-3">
              {endpoints.map((ep) => (
                <Card key={ep.path} className="p-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border font-mono ${methodColors[ep.method]}`}>
                      {ep.method}
                    </span>
                    <code className="text-sm font-mono text-foreground">{ep.path}</code>
                    <div className="flex-1" />
                    <Badge variant="secondary" className="text-xs">{ep.credits === 0 ? 'Free' : `${ep.credits} credit${ep.credits > 1 ? 's' : ''}`}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 ml-[68px]">{ep.description}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Logs */}
          <TabsContent value="logs">
            <Card className="overflow-hidden max-w-4xl">
              <div className="px-5 py-3 border-b border-border bg-muted/30">
                <span className="text-sm font-semibold">Request Logs</span>
              </div>
              <div className="divide-y divide-border">
                {[
                  { method: 'POST', path: '/v1/verify', status: 200, time: '142ms', credits: 1, timestamp: '2 min ago' },
                  { method: 'GET', path: '/v1/discover', status: 200, time: '89ms', credits: 1, timestamp: '5 min ago' },
                  { method: 'POST', path: '/v1/enrich', status: 200, time: '210ms', credits: 2, timestamp: '12 min ago' },
                  { method: 'POST', path: '/v1/verify', status: 429, time: '12ms', credits: 0, timestamp: '18 min ago' },
                  { method: 'POST', path: '/v1/scan', status: 200, time: '1.2s', credits: 3, timestamp: '25 min ago' },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/20 transition-colors font-mono text-xs">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${methodColors[log.method]}`}>{log.method}</span>
                    <span className="text-foreground">{log.path}</span>
                    <span className={log.status === 200 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}>{log.status}</span>
                    <span className="text-muted-foreground">{log.time}</span>
                    <span className="text-muted-foreground flex-1">{log.credits}cr</span>
                    <span className="text-muted-foreground">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
