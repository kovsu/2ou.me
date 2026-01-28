'use client'

import { Icon } from '@iconify/react'

interface LinkCardProps {
  href: string
  title: string
  description?: string
}

export function LinkCard({ href, title, description }: LinkCardProps) {
  const domain = new URL(href).hostname.replace('www.', '')

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-6 flex items-center justify-between gap-4 border border-foreground/10 p-5 hover:border-accent/50 transition-colors not-prose group"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Icon icon="carbon:link" className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="font-medium text-foreground group-hover:text-accent transition-colors truncate">
            {title}
          </span>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground truncate pl-6">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
        <span>{domain}</span>
        <Icon icon="carbon:arrow-up-right" className="w-3.5 h-3.5" />
      </div>
    </a>
  )
}
