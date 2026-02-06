import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/.velite'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Work - KonvSuu',
  description: 'Projects and things I have built.',
}

export default function ProjectsPage() {
  const personal = projects.filter((p) => p.type === 'personal')
  const opensource = projects.filter((p) => p.type === 'maintainer')

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <Link 
            href="/"
            className={cn(
              'inline-flex items-center gap-2 mb-12',
              'text-sm text-muted-foreground hover:text-foreground',
              'transition-colors duration-200'
            )}
          >
            <span>←</span>
            Home
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-sm text-foreground">002</span>
            <span className="font-mono text-sm text-muted-foreground">/</span>
            <span className="font-mono text-sm text-muted-foreground">PROJECTS</span>
            <div className="flex-1 h-px bg-foreground/10" />
          </div>

          <h1 className="text-4xl font-semibold tracking-tight mb-4">
            PROJECTS
          </h1>
          <p className="text-muted-foreground">
            Projects and things I have built.
          </p>
        </div>

        {/* Personal Projects */}
        {personal.length > 0 && (
          <section className="mb-16">
            <div className="font-mono text-xs text-muted-foreground mb-8">
              PERSONAL
            </div>
            <div className="space-y-6">
              {personal.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Open Source */}
        {opensource.length > 0 && (
          <section>
            <div className="font-mono text-xs text-muted-foreground mb-8">
              OPEN SOURCE
            </div>
            <div className="space-y-6">
              {opensource.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>
        )}

        {projects.length === 0 && (
          <p className="text-muted-foreground">No projects yet.</p>
        )}
      </div>
    </main>
  )
}

interface Project {
  title: string
  description: string
  logo: string
  link: string
  github?: string
  type: string
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'block p-6 border border-foreground/10 bg-background',
        'hover:border-foreground/20',
        'transition-all duration-300 group'
      )}
    >
      <div className="flex items-start gap-4">
        <Image
          src={project.logo}
          alt={project.title}
          width={40}
          height={40}
          className={cn(
            'w-10 h-10 object-contain',
            'grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100',
            'transition-all duration-300'
          )}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">
              {project.title}
            </h3>
            <span className={cn(
              'text-muted-foreground',
              'transition-all duration-300',
              'group-hover:translate-x-1'
            )}>
              →
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
