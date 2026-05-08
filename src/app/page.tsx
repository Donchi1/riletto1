'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search, ShieldCheck, Sparkles, FolderKanban, Database, ArrowRight,
  CheckCircle2, Zap, Globe, FileText, Code2, ChevronRight, Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Riletto</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Datasets', 'API', 'Pricing'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link href="/register">
              <Button size="sm" className="gap-1.5">Start Free <ArrowRight className="h-3.5 w-3.5" /></Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center max-w-4xl mx-auto" initial="initial" animate="animate" variants={stagger}>
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-8"
            >
              <Zap className="h-3 w-3" />AI-Powered Prospect Intelligence
              <ChevronRight className="h-3 w-3" />
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]">
              Discover, Verify &{' '}
              <span className="gradient-text">Organize</span>{' '}Business Prospects
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Riletto helps sales teams discover business contacts, verify email quality, organize prospect data, and build outreach-ready lead collections — all in one platform.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2 h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25">
                  Start Free Trial<ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard/datasets">
                <Button variant="outline" size="lg" className="gap-2 h-12 px-8 text-base">
                  <Database className="h-4 w-4" />Explore Datasets
                </Button>
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-4 text-xs text-muted-foreground">
              No credit card required · 1,000 free credits included
            </motion.p>
          </motion.div>

          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            <div className="rounded-2xl border border-border shadow-2xl shadow-black/10 overflow-hidden bg-card">
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex-1 mx-4 h-6 rounded-md bg-background/60 border border-border flex items-center px-3">
                  <span className="text-xs text-muted-foreground">app.riletto.io/dashboard</span>
                </div>
              </div>
              <div className="p-6 bg-background/50">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Total Prospects', value: '4,821', color: 'text-primary' },
                    { label: 'Verified Emails', value: '3,920', color: 'text-emerald-500' },
                    { label: 'Credits Used', value: '7,250', color: 'text-amber-500' },
                    { label: 'Enriched', value: '2,140', color: 'text-blue-500' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-card rounded-xl p-4 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 bg-card rounded-xl p-4 border border-border">
                    <p className="text-xs font-semibold text-foreground mb-3">Recent Prospects</p>
                    <div className="space-y-2">
                      {[
                        { name: 'Sarah Chen', email: 'sarah@acme.com', company: 'Acme Ventures', score: 97 },
                        { name: 'James Wright', email: 'james@buildstack.io', company: 'BuildStack', score: 94 },
                        { name: 'Michael Torres', email: 'michael@cloudlogix.co', company: 'CloudLogix', score: 99 },
                      ].map((p) => (
                        <div key={p.email} className="flex items-center gap-3 py-1.5">
                          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">{p.name[0]}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground">{p.name}</p>
                            <p className="text-[11px] text-muted-foreground truncate">{p.email}</p>
                          </div>
                          <div className="text-[11px] text-muted-foreground hidden sm:block">{p.company}</div>
                          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{p.score}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <p className="text-xs font-semibold text-foreground mb-3">Email Quality</p>
                    {[
                      { label: 'Valid', pct: 81, color: 'bg-emerald-500' },
                      { label: 'Risky', pct: 12, color: 'bg-amber-500' },
                      { label: 'Invalid', pct: 7, color: 'bg-red-500' },
                    ].map((item) => (
                      <div key={item.label} className="mb-2">
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium text-foreground">{item.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-muted-foreground mb-8">Trusted by modern sales teams worldwide</p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {['Nexus Ventures', 'CloudScale', 'DataOps', 'LaunchPad', 'GrowthLab', 'PipeDrive'].map((name) => (
              <span key={name} className="text-sm font-semibold text-muted-foreground/60 tracking-wide">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">Platform Modules</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Everything for prospect intelligence</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">From discovery to export, Riletto covers every step of the prospect workflow.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Search, title: 'Prospect Discovery', description: 'Find business contacts from websites, domains, and multiple sources with AI-powered search.', color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30' },
              { icon: ShieldCheck, title: 'Email Verification', description: 'Verify email quality with multi-layer checks including MX records, SMTP validation, and disposable detection.', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' },
              { icon: Sparkles, title: 'Contact Enrichment', description: 'Transform emails into complete business profiles with company data, roles, and social presence.', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' },
              { icon: FolderKanban, title: 'Smart Organization', description: 'Compare datasets, remove duplicates, manage workspaces, and organize prospects into clean collections.', color: 'text-primary bg-primary/10' },
              { icon: Database, title: 'Datasets Marketplace', description: 'Access curated, verified lead collections across industries — from SaaS companies to local businesses.', color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30' },
              { icon: Code2, title: 'Developer API', description: 'Integrate Riletto into your workflows with a RESTful API covering all platform capabilities.', color: 'text-slate-500 bg-slate-50 dark:bg-slate-950/30' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">Workflow</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">From discovery to outreach-ready</h2>
            <p className="text-muted-foreground text-lg">A seamless workflow for modern sales teams</p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: Globe, title: 'Discover', desc: 'Find contacts from websites, domains, or browse our datasets marketplace.' },
              { step: '02', icon: ShieldCheck, title: 'Verify', desc: 'Run multi-layer email verification to ensure quality and deliverability.' },
              { step: '03', icon: Sparkles, title: 'Enrich', desc: 'Add company data, roles, and contact details to each prospect.' },
              { step: '04', icon: FileText, title: 'Export', desc: 'Export clean, outreach-ready data to your CRM or email platform.' },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{item.step}</span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center my-4">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: '50M+', label: 'Business contacts indexed', icon: Users },
              { value: '94%', label: 'Average verification accuracy', icon: ShieldCheck },
              { value: '200+', label: 'Curated dataset collections', icon: Database },
            ].map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-5xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">Pricing</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground text-lg">Start free, scale as you grow. No hidden fees.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Starter', price: '$0', period: 'forever', description: 'Perfect for individuals exploring prospect intelligence', credits: '1,000', features: ['1,000 prospect credits/mo', 'Email verification', 'Basic enrichment', 'CSV export', '1 workspace'], popular: false, cta: 'Start Free' },
              { name: 'Growth', price: '$49', period: '/month', description: 'For growing sales teams with regular outreach', credits: '10,000', features: ['10,000 prospect credits/mo', 'Advanced verification', 'Full enrichment', 'All export formats', '10 workspaces', 'API access', 'Datasets access'], popular: true, cta: 'Start Free Trial' },
              { name: 'Scale', price: '$149', period: '/month', description: 'For high-volume teams and agencies', credits: '50,000', features: ['50,000 prospect credits/mo', 'Priority verification', 'Deep enrichment', 'CRM integrations', 'Unlimited workspaces', 'Full API access', 'Premium datasets', 'Dedicated support'], popular: false, cta: 'Contact Sales' },
            ].map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border p-8 ${plan.popular ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10' : 'border-border bg-card'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">Most Popular</div>
                )}
                <h3 className="font-bold text-xl text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground mb-1">{plan.period}</span>
                </div>
                <div className="text-sm font-medium text-primary mb-4">{plan.credits} credits included</div>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button variant={plan.popular ? 'default' : 'outline'} className="w-full">{plan.cta}</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to build your prospect pipeline?</h2>
            <p className="text-xl text-muted-foreground mb-10">Join thousands of sales professionals using Riletto to discover and organize quality business prospects.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2 h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25">
                  Get Started Free<ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">View Demo Dashboard</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold text-foreground">Riletto</span>
            </div>
            <div className="flex items-center gap-8">
              {['Privacy', 'Terms', 'API Docs', 'Status'].map((item) => (
                <Link key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">© 2026 Riletto. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
