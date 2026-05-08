'use client'

import { useState } from 'react'
import { User, Bell, Shield, Palette, Globe, Save } from 'lucide-react'
import { Topbar } from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [name, setName] = useState('Demo User')
  const [email, setEmail] = useState('demo@riletto.io')
  const [company, setCompany] = useState('')

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Settings" subtitle="Manage your account and platform preferences" />
      <div className="flex-1 p-6">
        <div className="max-w-2xl">
          <Tabs defaultValue="profile">
            <TabsList className="h-9 mb-6">
              <TabsTrigger value="profile" className="gap-1.5 text-xs"><User className="h-3.5 w-3.5" />Profile</TabsTrigger>
              <TabsTrigger value="notifications" className="gap-1.5 text-xs"><Bell className="h-3.5 w-3.5" />Notifications</TabsTrigger>
              <TabsTrigger value="security" className="gap-1.5 text-xs"><Shield className="h-3.5 w-3.5" />Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="p-6 space-y-5">
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Full Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Email Address</label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Company</label>
                  <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your company name" />
                </div>
                <Button className="gap-1.5" onClick={() => toast.success('Profile saved')}>
                  <Save className="h-4 w-4" />Save Changes
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="p-6 space-y-4">
                {[
                  { label: 'Email verification completed', desc: 'Get notified when bulk verification finishes' },
                  { label: 'Credits running low', desc: 'Alert at 20% credits remaining' },
                  { label: 'New datasets available', desc: 'Be first to know about new collections' },
                  { label: 'Export ready', desc: 'Notification when large exports are complete' },
                ].map((notif) => (
                  <label key={notif.label} className="flex items-start justify-between gap-4 cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-foreground">{notif.label}</p>
                      <p className="text-xs text-muted-foreground">{notif.desc}</p>
                    </div>
                    <input type="checkbox" className="accent-primary mt-0.5" defaultChecked />
                  </label>
                ))}
                <Button className="gap-1.5 mt-2" onClick={() => toast.success('Notification preferences saved')}>
                  <Save className="h-4 w-4" />Save Preferences
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="p-6 space-y-5">
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Current Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">New Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Confirm Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button className="gap-1.5" onClick={() => toast.success('Password changed')}>
                  <Shield className="h-4 w-4" />Update Password
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
