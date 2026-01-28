import { Icon } from '@iconify/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BackLinkProps {
  to: string
  label?: string
  hoverColor?: 'accent' | 'foreground'
  className?: string
}

export function BackLink({
  to,
  label = 'Back',
  hoverColor = 'accent',
  className,
}: BackLinkProps) {
  return (
    <Link
      href={to}
      className={cn(
        'inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-500',
        hoverColor === 'foreground' ? 'hover:text-foreground' : 'hover:text-accent',
        className
      )}
    >
      <Icon icon="carbon:arrow-left" className="w-3.5 h-3.5" />
      <span>{label}</span>
    </Link>
  )
}
