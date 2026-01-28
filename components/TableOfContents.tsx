'use client'

import { Icon } from '@iconify/react'
import { useState, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface TocEntry {
  title: string
  url: string
  items: TocEntry[]
}

interface TableOfContentsProps {
  links: TocEntry[]
}

interface FlatLink {
  id: string
  text: string
  depth: number
}

export function TableOfContents({ links }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set())

  function flattenLinks(links: TocEntry[], depth = 0): FlatLink[] {
    return links.reduce<FlatLink[]>((acc, link) => {
      const id = link.url.replace('#', '')
      acc.push({ id, text: link.title, depth })
      if (link.items && link.items.length > 0) {
        acc.push(...flattenLinks(link.items, depth + 1))
      }
      return acc
    }, [])
  }

  const flatLinks = useMemo(() => flattenLinks(links), [links])

  useEffect(() => {
    let observer: IntersectionObserver | null = null

    function setupObserver() {
      if (observer) {
        observer.disconnect()
      }

      observer = new IntersectionObserver(
        (entries) => {
          setActiveIds((prev) => {
            const newSet = new Set(prev)
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                newSet.add(entry.target.id)
              } else {
                newSet.delete(entry.target.id)
              }
            })
            return newSet
          })
        },
        {
          rootMargin: '-80px 0px 0px 0px',
          threshold: 0,
        }
      )

      const headings = document.querySelectorAll(
        'article h2[id], article h3[id], .prose h2[id], .prose h3[id]'
      )

      headings.forEach((heading) => {
        observer!.observe(heading)
      })

      if (flatLinks.length > 0) {
        setActiveIds(new Set([flatLinks[0]!.id]))
      }
    }

    const handleScroll = () => {
      const article = document.querySelector('article')
      if (!article) return

      const rect = article.getBoundingClientRect()
      const scrolled = -rect.top
      const total = rect.height - window.innerHeight
      setReadingProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)))
      setShowBackToTop(window.scrollY > 400)
    }

    setTimeout(setupObserver, 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [flatLinks])

  function scrollToHeading(id: string) {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!links || links.length === 0) return null

  return (
    <nav className="toc">
      <button
        className="lg:hidden flex items-center gap-2 w-full text-sm text-muted-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon icon="carbon:list" className="w-4 h-4" />
        <span>Table of Contents</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground/60">
            {Math.round(readingProgress)}%
          </span>
          <Icon
            icon="carbon:chevron-down"
            className={cn(
              'w-4 h-4 transition-transform duration-300',
              isOpen && 'rotate-180'
            )}
          />
        </span>
      </button>

      <div
        className={cn(
          'transition-all duration-300 ease-out',
          isOpen ? 'mt-4' : 'hidden lg:block'
        )}
      >
        <div className="hidden lg:flex items-center justify-between mb-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
            On this page
          </p>
          <span className="text-xs text-muted-foreground/60 font-mono">
            {Math.round(readingProgress)}%
          </span>
        </div>

        <div className="hidden lg:block h-px mb-4 overflow-hidden bg-foreground/10">
          <div
            className="h-full bg-accent transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        <ul className="space-y-2">
          {flatLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  'block text-sm transition-all duration-200 truncate',
                  link.depth > 0 && 'pl-3 text-xs',
                  activeIds.has(link.id)
                    ? 'text-accent'
                    : 'text-foreground/40 hover:text-foreground/70'
                )}
                title={link.text}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHeading(link.id)
                }}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={cn(
            'mt-6 flex items-center gap-2 transition-all duration-200 group text-xs text-muted-foreground hover:text-foreground',
            showBackToTop ? 'opacity-100' : 'opacity-40'
          )}
          onClick={scrollToTop}
        >
          <Icon
            icon="carbon:arrow-up"
            className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5"
          />
          <span>Back to top</span>
        </button>
      </div>
    </nav>
  )
}
