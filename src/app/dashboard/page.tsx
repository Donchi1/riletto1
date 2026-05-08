'use client'

import { motion } from 'framer-motion'
import {
  Users, ShieldCheck, Sparkles, CreditCard, TrendingUp,
  Search, ArrowUpRight, Activity, Zap, BarChart3, Clock
} from 'lucide-react'
import { Topbar } from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockDashboardStats, mockProspects, mockApiUsage } from '@/lib/mock-data'
import { StatusBadge, ConfidenceScore } from '@/components/ui/status-badge'
import Link from 'next/link'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
}

export default function DashboardPage() {
  const stats = mockDashboardStats
  const creditsPercent = Math.round((stats.creditsUsed / stats.creditsTotal) * 100)

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Dashboard" subtitle="Welcome back — here's your intelligence overview" />

      <div className="flex-1 p-6 space-y-6">
        {/* Stats grid */}
        <motion.div
          initial="initial" animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Prospects', value: stats.totalProspects.toLocaleString(), icon: Users, change: '+12%', color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'Verified Emails', value: stats.verifiedEmails.toLocaleString(), icon: ShieldCheck, change: `${stats.verificationRate}% rate`, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
            { label: 'Enriched Contacts', value: stats.enrichedContacts.toLocaleString(), icon: Sparkles, change: '+24%', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30' },
            { label: 'Credits Used', value: `${creditsPercent}%`, icon: CreditCard, change: `${stats.creditsUsed.toLocaleString()} / ${stats.creditsTotal.toLocaleString()}`, color: creditsPercent > 80 ? 'text-red-500' : 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30' },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <Card className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.bg}`}>
                    <stat.icon className={`h-4.5 w-4.5 ${stat.color}`} style={{ width: '1.1rem', height: '1.1rem' }} />
                  </div>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">{stat.change}</Badge>
                </div>
                <p className={`text-2xl font-bold ${stat.color} mb-0.5`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Credits bar */}
        <motion.div variants={fadeUp} initial="initial" animate="animate">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Credit Usage This Month</p>
                <p className="text-xs text-muted-foreground">Resets on June 1, 2026</p>
              </div>
              <Link href="/dashboard/billing">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs h-7">
                  Upgrade Plan <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${creditsPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                  className={`h-full rounded-full ${creditsPercent > 80 ? 'bg-amber-500' : 'bg-primary'}`}
                />
              </div>
              <span className="text-sm font-semibold text-foreground tabular-nums w-24 text-right">
                {stats.creditsUsed.toLocaleString()} / {stats.creditsTotal.toLocaleString()}
              </span>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Usage chart */}
          <motion.div variants={fadeUp} initial="initial" animate="animate" className="lg:col-span-2">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm font-semibold text-foreground">API Usage</p>
                  <p className="text-xs text-muted-foreground">Last 7 days</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Discover</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />Verify</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />Enrich</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={mockApiUsage}>
                  <defs>
                    <linearGradient id="discover" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.52 0.22 250)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="oklch(0.52 0.22 250)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="verify" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(16 185 129)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="rgb(16 185 129)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 240)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'oklch(0.5 0.015 240)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'oklch(0.5 0.015 240)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="discover" stroke="oklch(0.52 0.22 250)" strokeWidth={2} fill="url(#discover)" />
                  <Area type="monotone" dataKey="verify" stroke="rgb(16 185 129)" strokeWidth={2} fill="url(#verify)" />
                  <Area type="monotone" dataKey="enrich" stroke="rgb(245 158 11)" strokeWidth={2} fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Recent activity */}
          <motion.div variants={fadeUp} initial="initial" animate="animate">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm font-semibold text-foreground">Recent Activity</p>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-3">
                {stats.recentActivity.map((activity, i) => {
                  const colors: Record<string, string> = {
                    verify: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400',
                    discover: 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400',
                    export: 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400',
                    enrich: 'bg-primary/10 text-primary',
                    organize: 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400',
                  }
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${colors[activity.type]}`}>
                        <Zap className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="text-xs text-foreground/90">{activity.action}</p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="h-2.5 w-2.5" />{activity.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent prospects table */}
        <motion.div variants={fadeUp} initial="initial" animate="animate">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm font-semibold text-foreground">Recent Prospects</p>
                <p className="text-xs text-muted-foreground">Your latest discovered contacts</p>
              </div>
              <Link href="/dashboard/discover">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs h-7">
                  <Search className="h-3 w-3" />Discover More
                </Button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Contact</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Company</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Industry</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">Status</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProspects.slice(0, 6).map((p) => (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0">
                            {p.first_name?.[0] || p.email[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-foreground">{p.first_name} {p.last_name}</p>
                            <p className="text-[11px] text-muted-foreground">{p.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-xs text-foreground/80">{p.company}</td>
                      <td className="py-3 pr-4 text-xs text-muted-foreground">{p.industry}</td>
                      <td className="py-3 pr-4"><StatusBadge status={p.verification_status} /></td>
                      <td className="py-3"><ConfidenceScore score={p.confidence_score} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Quick actions */}
        <motion.div variants={fadeUp} initial="initial" animate="animate" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Discover Prospects', desc: 'Find new business contacts', icon: Search, href: '/dashboard/discover', color: 'bg-primary text-white' },
            { label: 'Verify Emails', desc: 'Check email quality', icon: ShieldCheck, href: '/dashboard/verify', color: 'bg-emerald-600 text-white' },
            { label: 'Browse Datasets', desc: 'Curated lead collections', icon: BarChart3, href: '/dashboard/datasets', color: 'bg-amber-600 text-white' },
            { label: 'API Console', desc: 'Developer tools', icon: Zap, href: '/dashboard/api', color: 'bg-slate-700 text-white' },
          ].map((action) => (
            <Link key={action.label} href={action.href}>
              <Card className="p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${action.color}`}>
                  <action.icon className="h-4.5 w-4.5" style={{ width: '1.1rem', height: '1.1rem' }} />
                </div>
                <p className="text-sm font-semibold text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.desc}</p>
              </Card>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
