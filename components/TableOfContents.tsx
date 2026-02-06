'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface TocEntry {
  title: string
  url: string
  items: TocEntry[]
}

interface TableOfContentsProps {
  links: TocEntry[]
}

function TocTree({ 
  items, 
  activeIds, 
  depth = 0,
  onLinkClick 
}: { 
  items: TocEntry[]
  activeIds: Set<string>
  depth?: number
  onLinkClick?: () => void
}) {
  return (
    <ul className={cn('space-y-2', depth > 0 && 'mt-2')}>
      {items.map((item) => {
        const id = item.url.replace('#', '')
        const isActive = activeIds.has(id)
        const hasChildren = item.items?.length > 0

        return (
          <li key={id} className="relative">
            <div className="flex items-start gap-2">
              {depth > 0 && (
                <span className="flex items-center h-4 shrink-0">
                  <span className="w-3 h-px bg-foreground/20" />
                </span>
              )}
              
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(id)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    history.pushState(null, '', `#${id}`)
                  }
                  onLinkClick?.()
                }}
                className={cn(
                  'block text-xs transition-all duration-200 relative',
                  isActive
                    ? 'text-foreground font-medium pl-2 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-foreground'
                    : 'text-muted-foreground/60 hover:text-foreground'
                )}
              >
                {item.title}
              </a>
            </div>

            {hasChildren && (
              <div className="ml-1 pl-2 border-l border-foreground/10">
                <TocTree 
                  items={item.items} 
                  activeIds={activeIds} 
                  depth={depth + 1}
                  onLinkClick={onLinkClick}
                />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function TableOfContents({ links }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set())
  const [progress, setProgress] = useState(0)

  const updateProgress = useCallback(() => {
    const article = document.querySelector('article')
    if (!article) return

    const rect = article.getBoundingClientRect()
    const scrollTop = window.scrollY
    const articleOffsetTop = scrollTop + rect.top
    const articleHeight = rect.height
    const windowHeight = window.innerHeight

    // 从文章开始到文章结束的进度
    const start = articleOffsetTop
    const end = articleOffsetTop + articleHeight - windowHeight
    const current = scrollTop
    
    let percent = 0
    if (current <= start) {
      percent = 0
    } else if (current >= end) {
      percent = 100
    } else {
      percent = ((current - start) / (end - start)) * 100
    }
    
    setProgress(percent)
  }, [])

  useEffect(() => {
    const updateActiveHeadings = () => {
      const headings = Array.from(document.querySelectorAll('article h2[id], article h3[id]'))
      const windowHeight = window.innerHeight
      const offset = 120 // 顶部偏移量
      
      const visibleIds = new Set<string>()
      
      headings.forEach((heading, index) => {
        const rect = heading.getBoundingClientRect()
        const nextHeading = headings[index + 1]
        const nextRect = nextHeading?.getBoundingClientRect()
        
        // 当前 heading 在视口内（考虑顶部偏移）
        const isInView = rect.top >= -offset && rect.top < windowHeight * 0.7
        
        // 当前 heading 已经滚过顶部，但下一个还没到顶部
        const isCurrentSection = rect.top < offset && (!nextRect || nextRect.top > offset)
        
        if (isInView || isCurrentSection) {
          visibleIds.add(heading.id)
        }
      })
      
      // 滚动到底部时高亮最后一个
      if (visibleIds.size === 0 && headings.length > 0) {
        const lastHeading = headings[headings.length - 1]
        if (lastHeading.getBoundingClientRect().top < windowHeight) {
          visibleIds.add(lastHeading.id)
        }
      }
      
      setActiveIds(visibleIds)
    }

    const handleScroll = () => {
      updateProgress()
      updateActiveHeadings()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [updateProgress])

  if (!links?.length) return null

  return (
    <nav className="font-mono text-sm">
      {/* Mobile toggle */}
      <button
        className="xl:hidden flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-1 focus-visible:ring-foreground/50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle table of contents"
        aria-expanded={isOpen}
      >
        <span className="w-3 h-3 border border-current flex items-center justify-center">
          <span className={cn(
            'text-[8px] transition-transform duration-150',
            isOpen && 'rotate-180'
          )}>
            ↓
          </span>
        </span>
        <span>On this page</span>
      </button>

      {/* TOC content */}
      <div className={cn(
        'transition-[max-height,margin] duration-200 overflow-hidden',
        isOpen ? 'mt-4 max-h-[500px]' : 'max-h-0 xl:max-h-none'
      )}>
        {/* Header & Progress bar - desktop only */}
        <div className="hidden xl:block mb-4 space-y-2">
          <span className="text-xs text-muted-foreground">ON THIS PAGE</span>
          <div className="flex items-center gap-3">
            <div className="w-24 h-px bg-foreground/10 relative overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-foreground"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground/50 tabular-nums font-mono">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <TocTree 
          items={links} 
          activeIds={activeIds}
          onLinkClick={() => setIsOpen(false)}
        />
      </div>
    </nav>
  )
}
