import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { blog } from '@/.velite'
import { TableOfContents } from '@/components/TableOfContents'
import { MDXContent } from '@/components/mdx/MDXContent'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return blog.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post = blog.find((p) => p.slug === slug)

  if (!post) return {}

  return {
    title: `${post.title} - KonvSuu`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
    },
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post = blog.find((p) => p.slug === slug)

  if (!post) notFound()

  return (
    <article className="min-h-screen">
      {/* Mobile TOC */}
      <div className={cn(
        'xl:hidden sticky top-0 z-10',
        'bg-background/80 backdrop-blur-lg',
        'border-b border-foreground/10',
        'px-6 py-4'
      )}>
        <TableOfContents links={post.toc} />
      </div>

      {/* Layout */}
      <div className={cn(
        'grid xl:grid-cols-[1fr_720px_280px] gap-12',
        'max-w-7xl mx-auto',
        'px-6 py-24'
      )}>
        {/* Left - empty */}
        <div className="hidden xl:block" />

        {/* Content */}
        <div>
          {/* Mobile back link */}
          <Link 
            href="/blog"
            className={cn(
              'inline-flex items-center gap-2 mb-12 xl:hidden',
              'text-sm text-muted-foreground hover:text-foreground',
              'transition-colors duration-200'
            )}
          >
            <span>←</span>
            Writing
          </Link>

          <header className="mb-12">
            <time className="font-mono text-xs text-muted-foreground block mb-4">
              {formatDate(post.date)}
            </time>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-lg text-muted-foreground">
                {post.description}
              </p>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <MDXContent
            code={post.body}
            className={cn(
              'prose dark:prose-invert max-w-none',
              'prose-headings:font-semibold prose-headings:tracking-tight',
              'prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4',
              'prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3',
              'prose-p:text-foreground/80 prose-p:leading-relaxed',
              'prose-a:text-foreground prose-a:underline prose-a:transition-colors prose-a:duration-200 prose-a:hover:text-foreground/70',
              'prose-strong:font-semibold prose-strong:text-foreground',
              'prose-blockquote:border-l-2 prose-blockquote:border-foreground/20 prose-blockquote:pl-4 prose-blockquote:not-italic prose-blockquote:text-muted-foreground',
              'prose-code:text-sm prose-code:bg-foreground/10 prose-code:text-foreground prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none',
              'prose-pre:bg-transparent prose-pre:border-0',
              'prose-img:my-8',
              'prose-ul:my-4 prose-ol:my-4',
              'prose-li:text-foreground/80'
            )}
          />

          <footer className="mt-20 pt-8 border-t border-foreground/10">
            <Link 
              href="/blog"
              className={cn(
                'inline-flex items-center gap-2',
                'text-sm text-muted-foreground hover:text-foreground',
                'transition-colors duration-200 group'
              )}
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
              Back to writing
            </Link>
          </footer>
        </div>

        {/* Right - TOC */}
        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <TableOfContents links={post.toc} />
          </div>
        </aside>
      </div>
    </article>
  )
}
