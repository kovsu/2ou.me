'use client'

import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/kovsu' },
  { name: 'X', url: 'https://x.com/stillalive401' },
  { name: 'Instagram', url: 'https://instagram.com/_y1kun2ou' },
]
 
const inter = Inter({
  subsets: ['latin'],
})



export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 100)
  }, [])

  return (
    <div className={cn("h-screen overflow-hidden bg-background text-foreground flex items-center justify-center", inter.className)}>
      <div className="w-full max-w-350 mx-auto px-8 md:px-16">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div
            className={cn(
              'transition-all duration-300',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            )}
          >
            <h1 className="text-5xl md:text-7xl mb-6">
              <span className="block text-foreground">Hello, I&apos;m</span>
              <span className="font-serif block italic text-accent text-6xl md:text-8xl">
                Konv Suu
              </span> 
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-foreground/10" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-mono">
                CHANG SHA / 20XX
              </span>
            </div>
          </div>

          <div
            className={cn(
              'transition-all duration-300',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <nav className="space-y-2">
              <Link
                href="/blog"
                className="group flex items-baseline justify-between py-4 border-b border-foreground/10 transition-all duration-300 hover:pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-xs text-muted-foreground group-hover:text-accent font-mono">
                    01
                  </span>
                  <span className="font-serif text-2xl md:text-3xl text-foreground group-hover:text-accent">
                    Blog
                  </span>
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-accent">
                  Thoughts & Ideas
                </span>
              </Link>

              <Link
                href="/projects"
                className="group flex items-baseline justify-between py-4 border-b border-foreground/10 transition-all duration-300 hover:pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-xs text-muted-foreground group-hover:text-accent font-mono">
                    02
                  </span>
                  <span className="font-serif text-2xl md:text-3xl text-foreground group-hover:text-accent">
                    Projects
                  </span>
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-accent">
                  Selected Works
                </span>
              </Link>

              <div className="py-4 border-b border-foreground/10">
                <div className="flex items-baseline gap-6 mb-4">
                  <span className="text-xs text-muted-foreground font-mono">03</span>
                  <span className="font-serif text-2xl md:text-3xl text-foreground">
                    Find Me
                  </span>
                </div>
                <div className="ml-12 space-y-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-muted-foreground hover:text-accent transition-colors duration-300 focus-visible:outline-none focus-visible:text-accent"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            <div className="mt-8 pt-6 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">2026 - PRESENT @ Konv Suu</p>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
