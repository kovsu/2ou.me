'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

interface GitHubCardProps {
  repo: string
}

interface RepoData {
  full_name: string
  description: string
  stargazers_count: number
  forks_count: number
  language: string
  html_url: string
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Vue: '#41b883',
  CSS: '#563d7c',
  HTML: '#e34c26',
}

export function GitHubCard({ repo }: GitHubCardProps) {
  const [data, setData] = useState<RepoData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [repo])

  if (loading) {
    return (
      <div className="my-6 border border-foreground/10 p-5 not-prose">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-foreground/5 w-1/3" />
          <div className="h-3 bg-foreground/5 w-2/3" />
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <a
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="my-6 block border border-foreground/10 p-5 hover:border-foreground/20 transition-colors not-prose"
      >
        <span className="text-sm text-muted-foreground">{repo}</span>
      </a>
    )
  }

  return (
    <a
      href={data.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="my-6 block border border-foreground/10 p-5 hover:border-accent/50 transition-colors not-prose group"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon icon="octicon:repo-16" className="w-4 h-4 text-muted-foreground shrink-0" />
        <span className="font-medium text-foreground group-hover:text-accent transition-colors truncate">
          {data.full_name}
        </span>
      </div>
      {data.description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {data.description}
        </p>
      )}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {data.language && (
          <span className="flex items-center gap-1.5">
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: languageColors[data.language] || '#6e7681' }}
            />
            {data.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Icon icon="carbon:star" className="w-3.5 h-3.5" />
          {data.stargazers_count.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <Icon icon="carbon:branch" className="w-3.5 h-3.5" />
          {data.forks_count.toLocaleString()}
        </span>
      </div>
    </a>
  )
}
