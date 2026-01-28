'use client'

import { Icon } from '@iconify/react'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { isDark, toggleTheme, mounted } = useTheme()

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      <Icon
        icon={isDark ? 'carbon:sun' : 'carbon:moon'}
        className="w-4 h-4"
      />
    </button>
  )
}
