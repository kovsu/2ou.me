import { Icon } from '@iconify/react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/.velite'
import { BackLink } from '@/components/BackLink'
import { ThemeToggle } from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Projects - Konv Suu',
  description: 'Things I have built and worked on.',
}

export default function ProjectsPage() {
  const personalProjects = projects.filter((p) => p.type === 'personal')
  const maintainerProjects = projects.filter((p) => p.type === 'maintainer')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <BackLink to="/" />
            <ThemeToggle />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Projects
          </h1>
          <p className="text-muted-foreground">Things I have built and worked on.</p>
        </header>

        {/* Personal Projects */}
        {personalProjects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-6">
              Personal Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalProjects.map((project) => (
                <div
                  key={project.title}
                  className="group relative p-6 bg-muted/30 hover:bg-muted/50 transition-all duration-500"
                >
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="mb-4">
                      <Image
                        src={project.logo}
                        alt={project.title}
                        width={40}
                        height={40}
                        priority
                        className="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>

                    <h3 className="font-serif text-lg text-foreground group-hover:text-accent transition-colors duration-500 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </Link>

                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-6 right-6 text-muted-foreground hover:text-accent transition-colors duration-500"
                    >
                      <Icon icon="carbon:logo-github" className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Maintainer Projects */}
        {maintainerProjects.length > 0 && (
          <section>
            <h2 className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-6">
              Open Source Contributions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {maintainerProjects.map((project) => (
                <div
                  key={project.title}
                  className="group relative p-6 bg-muted/30 hover:bg-muted/50 transition-all duration-500 grayscale hover:grayscale-0"
                >
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="mb-4">
                      <Image
                        src={project.logo}
                        alt={project.title}
                        width={40}
                        height={40}
                        priority
                        className="w-10 h-10 object-contain rounded transition-all duration-500"
                      />
                    </div>

                    <h3 className="font-serif text-lg text-accent transition-colors duration-500 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </Link>

                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-6 right-6 text-muted-foreground hover:text-accent transition-colors duration-500"
                    >
                      <Icon icon="carbon:logo-github" className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm">No projects yet. Stay tuned!</p>
          </div>
        )}
      </div>
    </div>
  )
}
