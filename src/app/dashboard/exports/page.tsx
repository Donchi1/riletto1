'use client'

import { Download, FileText, FileSpreadsheet, Code2, RefreshCw, CheckCircle2 } from 'lucide-react'
import { Topbar } from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const exportFormats = [
  { name: 'CSV', icon: FileText, desc: 'Universal spreadsheet format', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' },
  { name: 'XLSX', icon: FileSpreadsheet, desc: 'Microsoft Excel format', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30' },
  { name: 'JSON', icon: Code2, desc: 'Developer-friendly format', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30' },
  { name: 'HubSpot', icon: RefreshCw, desc: 'Direct CRM sync', color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/30' },
  { name: 'Instantly', icon: RefreshCw, desc: 'Email outreach platform', color: 'text-primary bg-primary/10' },
  { name: 'Smartlead', icon: RefreshCw, desc: 'Sales engagement platform', color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/30' },
]

const recentExports = [
  { name: 'SaaS Companies Q2.csv', records: 342, format: 'CSV', date: '2 min ago', status: 'complete' },
  { name: 'Marketing Agencies.xlsx', records: 187, format: 'XLSX', date: '1 hr ago', status: 'complete' },
  { name: 'Verified US Founders.json', records: 128, format: 'JSON', date: '3 hr ago', status: 'complete' },
  { name: 'Healthcare Contacts.csv', records: 94, format: 'CSV', date: 'Yesterday', status: 'complete' },
]

export default function ExportsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Exports" subtitle="Export your prospect data to any format or platform" />
      <div className="flex-1 p-6 space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {exportFormats.map((fmt) => (
            <Card key={fmt.name} className="p-5 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${fmt.color}`}>
                <fmt.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{fmt.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{fmt.desc}</p>
              <Button variant="outline" className="w-full gap-1.5 text-xs h-8" onClick={() => toast.success(`Exporting as ${fmt.name}...`)}>
                <Download className="h-3.5 w-3.5" />Export as {fmt.name}
              </Button>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-muted/30">
            <span className="text-sm font-semibold">Recent Exports</span>
          </div>
          <div className="divide-y divide-border">
            {recentExports.map((exp) => (
              <div key={exp.name} className="flex items-center gap-4 px-5 py-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{exp.name}</p>
                  <p className="text-xs text-muted-foreground">{exp.records} records · {exp.date}</p>
                </div>
                <Badge variant="secondary" className="text-xs">{exp.format}</Badge>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.success('Re-downloading...')}>
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
