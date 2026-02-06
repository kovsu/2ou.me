'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'

interface Project {
  title: string
  description: string
  logo: string
  link: string
  type: string
}

interface Post {
  title: string
  description: string
  date: string
  slug: string
}

interface HomeClientProps {
  projects: Project[]
  posts: Post[]
}

const socials = [
  { name: 'GitHub', href: 'https://github.com/kovsu' },
  { name: 'X', href: 'https://x.com/stillalive401' },
  { name: 'Instagram', href: 'https://instagram.com/_y1kun2ou' },
]

export function HomeClient({ projects, posts }: HomeClientProps) {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-24">
          <span className="font-mono text-xs text-muted-foreground">v1.0.0</span>
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs text-muted-foreground">28.07°N 113.01°E</span>
            <ThemeToggle />
          </div>
        </header>

        <section className="mb-32">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              KonvSuu
            </h1>
            <p className="text-sm text-muted-foreground font-mono">
              Open Source Enthusiast
            </p>
            <p className="text-sm text-muted-foreground font-mono">
              Always Learning, Always Building.
            </p>
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-sm text-foreground">001</span>
              <span className="font-mono text-sm text-muted-foreground">/</span>
              <span className="font-mono text-sm text-muted-foreground">ABOUT</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>

            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                I believe in the craft of building things well.
              </p>
              <p>
                In the world of frontend development, every pixel, every animation, 
                every interaction is an opportunity to create something meaningful. 
                I write code, but what I really care about is the experience behind it.
              </p>
            </div>

            <div className="mt-8 p-5 border border-foreground/10 bg-background">
              <div className="font-mono text-xs text-muted-foreground mb-3">STACK</div>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'Node.js', 'Vue', 'React', 'Tailwind'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 text-xs font-mono text-muted-foreground border border-foreground/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-3 text-xs text-muted-foreground font-mono">
                Currently learning: Go
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-sm text-foreground">002</span>
              <span className="font-mono text-sm text-muted-foreground">/</span>
              <span className="font-mono text-sm text-muted-foreground">PROJECTS</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>

            <div className="space-y-4">
              {projects.map((project, index) => (
                <ScrollReveal key={project.title} delay={index * 100}>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'block p-5 border border-foreground/10 bg-background',
                      'hover:border-foreground/20',
                      'transition-[border-color] duration-300 group'
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-mono text-xs text-muted-foreground mb-1">
                          {project.type.toUpperCase()}
                        </div>
                        <h3 className="font-semibold">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-end">
                      <span className={cn(
                        'text-sm text-muted-foreground',
                        'transition-transform duration-300',
                        'group-hover:translate-x-1'
                      )}>
                        →
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <Link 
              href="/projects"
              className={cn(
                'inline-flex items-center gap-2 mt-6',
                'text-sm text-muted-foreground hover:text-foreground',
                'transition-colors duration-200'
              )}
            >
              View all projects →
            </Link>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-sm text-foreground">003</span>
              <span className="font-mono text-sm text-muted-foreground">/</span>
              <span className="font-mono text-sm text-muted-foreground">WRITING</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>

            <div className="space-y-6">
              {posts.map((post, index) => (
                <ScrollReveal key={post.slug} delay={index * 100}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className={cn(
                          'font-medium mb-1',
                          'group-hover:text-foreground transition-colors'
                        )}>
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {post.description}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground shrink-0">
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <div className="mt-4 h-px bg-foreground/5" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <Link 
              href="/blog"
              className={cn(
                'inline-flex items-center gap-2 mt-6',
                'text-sm text-muted-foreground hover:text-foreground',
                'transition-colors duration-200'
              )}
            >
              View all writing →
            </Link>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <footer className="pt-16 border-t border-foreground/10">
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-2">Let&apos;s connect.</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-3">LINKS</div>
                <div className="space-y-2">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex items-center justify-between py-1',
                        'text-sm text-foreground/80 hover:text-foreground',
                        'transition-colors duration-200 group'
                      )}
                    >
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-xs text-muted-foreground mb-3">CONTACT</div>
                <a
                  href="mailto:hi@kovsu.com"
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  hi@kovsu.com
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-foreground/10">
              <div className="font-mono text-xs text-muted-foreground">
                © 2026 KonvSuu
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={cn(
                  'font-mono text-xs text-muted-foreground',
                  'hover:text-foreground transition-colors',
                  'focus-visible:ring-1 focus-visible:ring-foreground/50'
                )}
              >
                Back to top ↑
              </button>
            </div>
          </footer>
        </ScrollReveal>
      </div>
    </div>
  )
}
