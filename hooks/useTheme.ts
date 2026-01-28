'use client'

import { useTheme as useNextTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme()
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const isDark =
    mounted && (theme === 'dark' || (theme === 'system' && systemTheme === 'dark'))

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return {
    isDark,
    toggleTheme,
    mounted,
  }
}
