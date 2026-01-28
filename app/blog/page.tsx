import { Metadata } from 'next'
import Link from 'next/link'
import { blog } from '@/.velite'
import { BackLink } from '@/components/BackLink'
import { ThemeToggle } from '@/components/ThemeToggle'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog - Konv Suu',
  description: 'Thoughts, stories and ideas.',
}

export default function BlogPage() {
  const sortedPosts = blog.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className="min-h-screen bg-background text-foreground font-sans py-16 px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center justify-between">
            <BackLink to="/" />
            <ThemeToggle />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mt-8 mb-4">Blog</h1>
          <p className="text-muted-foreground">Thoughts, stories and ideas.</p>
        </div>

        {sortedPosts.length > 0 ? (
          <div className="space-y-1">
            {sortedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block py-3 px-4 hover:bg-muted/50 transition-colors duration-300"
              >
                <div className="flex items-center gap-8">
                  <time className="text-xs text-muted-foreground font-mono w-24 shrink-0">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="flex-1 text-xl font-serif text-foreground group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h2>
                  {post.category && (
                    <span className="shrink-0 px-2 py-0.5 text-xs text-accent border border-accent/30">
                      {post.category}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </div>
    </div>
  )
}
