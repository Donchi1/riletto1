import { cn } from '@/lib/utils'

type VerificationStatus = 'valid' | 'invalid' | 'risky' | 'catch-all' | 'role-based' | 'unverified' | 'pending' | 'disposable'

const statusConfig: Record<VerificationStatus, { label: string; classes: string }> = {
  valid: { label: 'Valid', classes: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800' },
  invalid: { label: 'Invalid', classes: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800' },
  risky: { label: 'Risky', classes: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800' },
  'catch-all': { label: 'Catch-All', classes: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800' },
  'role-based': { label: 'Role-Based', classes: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800' },
  unverified: { label: 'Unverified', classes: 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-700' },
  pending: { label: 'Pending', classes: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800' },
  disposable: { label: 'Disposable', classes: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800' },
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status as VerificationStatus] ?? statusConfig.unverified
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
      config.classes,
      className
    )}>
      {config.label}
    </span>
  )
}

interface ConfidenceScoreProps {
  score: number
  className?: string
}

export function ConfidenceScore({ score, className }: ConfidenceScoreProps) {
  const color = score >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
    score >= 70 ? 'text-amber-600 dark:text-amber-400' :
    'text-red-500 dark:text-red-400'

  return (
    <span className={cn('text-sm font-semibold tabular-nums', color, className)}>
      {score}%
    </span>
  )
}
