'use client'

import { CheckCircle2, CreditCard, Zap, TrendingUp } from 'lucide-react'
import { Topbar } from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const plans = [
  { name: 'Starter', price: 0, credits: 1000, features: ['1,000 credits/mo', 'Email verification', 'Basic enrichment', 'CSV export', '1 workspace'], current: true },
  { name: 'Growth', price: 49, credits: 10000, features: ['10,000 credits/mo', 'Advanced verification', 'Full enrichment', 'All exports', '10 workspaces', 'API access', 'Datasets'], current: false },
  { name: 'Scale', price: 149, credits: 50000, features: ['50,000 credits/mo', 'Priority verification', 'Deep enrichment', 'CRM integrations', 'Unlimited workspaces', 'Full API', 'Premium datasets'], current: false },
]

const invoices = [
  { id: 'INV-2026-004', date: 'Apr 1, 2026', amount: '$0.00', status: 'paid' },
  { id: 'INV-2026-003', date: 'Mar 1, 2026', amount: '$0.00', status: 'paid' },
]

export default function BillingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Billing" subtitle="Manage your plan, credits, and payment information" />
      <div className="flex-1 p-6 space-y-6">
        {/* Current plan */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Current Plan</p>
              <p className="text-xs text-muted-foreground">You are on the Starter plan</p>
            </div>
            <Badge variant="secondary" className="text-xs">Free</Badge>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '72.5%' }} />
            </div>
            <span className="text-sm font-semibold text-foreground tabular-nums">7,250 / 10,000</span>
          </div>
          <p className="text-xs text-muted-foreground">Credits reset on June 1, 2026</p>
        </Card>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <Card key={plan.name} className={`p-6 ${plan.current ? 'border-primary bg-primary/5' : ''}`}>
              {plan.current && <Badge className="mb-3 text-xs bg-primary/15 text-primary border-0">Current Plan</Badge>}
              <h3 className="font-bold text-lg text-foreground mb-1">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-foreground">${plan.price}</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <div className="text-sm font-medium text-primary mb-4">{plan.credits.toLocaleString()} credits</div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.current ? 'outline' : 'default'}
                className="w-full text-xs h-8"
                disabled={plan.current}
                onClick={() => !plan.current && toast.success(`Upgrading to ${plan.name}...`)}
              >
                {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </Button>
            </Card>
          ))}
        </div>

        {/* Payment method */}
        <Card className="p-6">
          <p className="text-sm font-semibold text-foreground mb-4">Payment Method</p>
          <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">No payment method on file</span>
            <Button size="sm" variant="outline" className="ml-auto h-7 text-xs" onClick={() => toast.info('Payment setup would open here')}>
              Add Card
            </Button>
          </div>
        </Card>

        {/* Billing history */}
        <Card className="overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-muted/30">
            <span className="text-sm font-semibold">Billing History</span>
          </div>
          <div className="divide-y divide-border">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center gap-4 px-5 py-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{inv.id}</p>
                  <p className="text-xs text-muted-foreground">{inv.date}</p>
                </div>
                <p className="text-sm font-semibold text-foreground">{inv.amount}</p>
                <Badge variant="secondary" className="text-xs text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400">Paid</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
