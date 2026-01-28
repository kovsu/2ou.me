'use client'

import { ReactNode } from 'react'
import { Icon } from '@iconify/react'
import { cn } from '@/lib/utils'

type CalloutType = 'note' | 'tip' | 'important' | 'warning' | 'caution'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

const calloutConfig: Record<CalloutType, { icon: string; color: string; bg: string; border: string }> = {
  note: {
    icon: 'carbon:information',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/5',
    border: 'border-blue-500/20',
  },
  tip: {
    icon: 'carbon:idea',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/20',
  },
  important: {
    icon: 'carbon:warning-alt',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-500/5',
    border: 'border-purple-500/20',
  },
  warning: {
    icon: 'carbon:warning',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20',
  },
  caution: {
    icon: 'carbon:close-outline',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-500/5',
    border: 'border-red-500/20',
  },
}

const calloutTitles: Record<CalloutType, string> = {
  note: 'Note',
  tip: 'Tip',
  important: 'Important',
  warning: 'Warning',
  caution: 'Caution',
}

export function Callout({ type = 'note', title, children }: CalloutProps) {
  const config = calloutConfig[type]
  const displayTitle = title || calloutTitles[type]

  return (
    <div
      className={cn(
        'my-6 border-l-2 p-4 not-prose',
        config.bg,
        config.border
      )}
    >
      <div className={cn('flex items-center gap-2 font-medium mb-2', config.color)}>
        <Icon icon={config.icon} className="w-4 h-4" />
        <span className="text-sm">{displayTitle}</span>
      </div>
      <div className="text-sm text-foreground/80 [&>p]:my-0">
        {children}
      </div>
    </div>
  )
}
