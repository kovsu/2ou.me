'use client'

import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { isDark, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return <div className="w-4 h-4" />
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative w-4 h-4 rounded-full',
        'transition-colors duration-300',
        'focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isDark 
          ? 'bg-foreground' 
          : 'bg-transparent border border-foreground'
      )}
      aria-label="Toggle theme"
    />
  )
}
