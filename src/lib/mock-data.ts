export const mockProspects = [
  { id: '1', email: 'sarah.chen@acme-ventures.com', first_name: 'Sarah', last_name: 'Chen', company: 'Acme Ventures', title: 'Head of Marketing', website: 'acme-ventures.com', industry: 'Technology', location: 'San Francisco, CA', verification_status: 'valid', confidence_score: 97, enriched: true },
  { id: '2', email: 'james.wright@buildstack.io', first_name: 'James', last_name: 'Wright', company: 'BuildStack', title: 'Co-Founder', website: 'buildstack.io', industry: 'SaaS', location: 'Austin, TX', verification_status: 'valid', confidence_score: 94, enriched: true },
  { id: '3', email: 'priya.patel@nexusretail.com', first_name: 'Priya', last_name: 'Patel', company: 'Nexus Retail', title: 'VP Sales', website: 'nexusretail.com', industry: 'E-Commerce', location: 'New York, NY', verification_status: 'risky', confidence_score: 71, enriched: false },
  { id: '4', email: 'michael.torres@cloudlogix.co', first_name: 'Michael', last_name: 'Torres', company: 'CloudLogix', title: 'CEO', website: 'cloudlogix.co', industry: 'Technology', location: 'Seattle, WA', verification_status: 'valid', confidence_score: 99, enriched: true },
  { id: '5', email: 'emily.brooks@marketpro.agency', first_name: 'Emily', last_name: 'Brooks', company: 'MarketPro Agency', title: 'Director', website: 'marketpro.agency', industry: 'Marketing', location: 'Chicago, IL', verification_status: 'catch-all', confidence_score: 62, enriched: false },
  { id: '6', email: 'david.kim@scalepath.io', first_name: 'David', last_name: 'Kim', company: 'ScalePath', title: 'Founder', website: 'scalepath.io', industry: 'Consulting', location: 'Los Angeles, CA', verification_status: 'valid', confidence_score: 96, enriched: true },
  { id: '7', email: 'alice.morgan@brightledger.com', first_name: 'Alice', last_name: 'Morgan', company: 'BrightLedger', title: 'CFO', website: 'brightledger.com', industry: 'Finance', location: 'Boston, MA', verification_status: 'valid', confidence_score: 93, enriched: true },
  { id: '8', email: 'info@sunrisestores.net', first_name: '', last_name: '', company: 'Sunrise Stores', title: 'General', website: 'sunrisestores.net', industry: 'Retail', location: 'Dallas, TX', verification_status: 'role-based', confidence_score: 45, enriched: false },
]

export const mockVerifications = [
  { email: 'sarah.chen@acme-ventures.com', status: 'valid', confidence: 97, mx: true, smtp: true, disposable: false, role: false },
  { email: 'test@mailinator.com', status: 'invalid', confidence: 0, mx: false, smtp: false, disposable: true, role: false },
  { email: 'info@bigcompany.com', status: 'role-based', confidence: 45, mx: true, smtp: true, disposable: false, role: true },
  { email: 'catchall@domain.io', status: 'catch-all', confidence: 62, mx: true, smtp: true, disposable: false, role: false },
  { email: 'james.wright@buildstack.io', status: 'valid', confidence: 94, mx: true, smtp: true, disposable: false, role: false },
]

export const mockApiUsage = [
  { date: 'May 1', discover: 45, verify: 120, enrich: 30 },
  { date: 'May 2', discover: 62, verify: 98, enrich: 45 },
  { date: 'May 3', discover: 38, verify: 145, enrich: 22 },
  { date: 'May 4', discover: 89, verify: 167, enrich: 58 },
  { date: 'May 5', discover: 54, verify: 132, enrich: 41 },
  { date: 'May 6', discover: 71, verify: 189, enrich: 67 },
  { date: 'May 7', discover: 93, verify: 211, enrich: 74 },
]

export const mockDashboardStats = {
  totalProspects: 4821,
  verifiedEmails: 3920,
  enrichedContacts: 2140,
  creditsUsed: 7250,
  creditsTotal: 10000,
  verificationRate: 94,
  recentActivity: [
    { action: 'Verified 45 emails', time: '2 min ago', type: 'verify' },
    { action: 'Discovered 12 contacts from buildstack.io', time: '15 min ago', type: 'discover' },
    { action: 'Exported 200 prospects to CSV', time: '1 hr ago', type: 'export' },
    { action: 'Enriched 30 contacts from Marketing Agency dataset', time: '3 hr ago', type: 'enrich' },
    { action: 'Removed 47 duplicates from Workspace #2', time: '5 hr ago', type: 'organize' },
  ]
}
