import { Metadata } from 'next'
import Link from 'next/link'
import { blog } from '@/.velite'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Writing - KonvSuu',
  description: 'Thoughts on code, design, and everything in between.',
}

export default function BlogPage() {
  const posts = blog.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

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
            <span className="font-mono text-sm text-foreground">003</span>
            <span className="font-mono text-sm text-muted-foreground">/</span>
            <span className="font-mono text-sm text-muted-foreground">WRITING</span>
            <div className="flex-1 h-px bg-foreground/10" />
          </div>

          <h1 className="text-4xl font-semibold tracking-tight mb-4">
            Writing
          </h1>
          <p className="text-muted-foreground">
            Thoughts on code, design, and everything in between.
          </p>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className={cn(
                      'text-lg font-medium mb-1',
                      'group-hover:text-foreground transition-colors'
                    )}>
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-sm text-muted-foreground">
                        {post.description}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-xs text-muted-foreground shrink-0">
                    {formatDate(post.date)}
                  </span>
                </div>
                <div className="mt-4 h-px bg-muted/50" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </div>
    </main>
  )
}
