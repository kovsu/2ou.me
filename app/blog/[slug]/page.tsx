import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { blog } from '@/.velite'
import { BackLink } from '@/components/BackLink'
import { ThemeToggle } from '@/components/ThemeToggle'
import { TableOfContents } from '@/components/TableOfContents'
import { MDXContent } from '@/components/mdx/MDXContent'
import { formatDate } from '@/lib/utils'

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return blog.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post = blog.find((p) => p.slug === slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title} - Konv Suu`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post = blog.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-background text-foreground">
      {/* Mobile TOC - sticky at top */}
      <div className="xl:hidden sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b border-foreground/10 px-8 py-4">
        <TableOfContents links={post.toc} />
      </div>

      {/* Three column layout for desktop */}
      <div className="grid xl:grid-cols-[200px_1fr_280px] gap-8 max-w-350 mx-auto px-8 py-16">
        {/* Left spacer */}
        <div className="hidden xl:block" />

        {/* Main content */}
        <div className="max-w-3xl">
          <div className="flex items-center justify-between">
            <BackLink to="/blog" label="Back to blog" />
            <ThemeToggle />
          </div>

          {/* Header */}
          <header className="mt-8 mb-12">
            <time className="text-xs text-muted-foreground font-mono block mb-4">
              {formatDate(post.date)}
            </time>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">{post.title}</h1>
            <p className="text-lg text-muted-foreground">{post.description}</p>
            <div className="flex items-center gap-3 mt-6">
              {post.category && (
                <span className="inline-block px-2 py-0.5 text-xs text-accent border border-accent/30">
                  {post.category}
                </span>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs text-muted-foreground border border-foreground/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Content */}
          <MDXContent
            code={post.body}
            className="prose dark:prose-invert max-w-none
              prose-headings:font-serif prose-headings:font-normal prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-foreground/10
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-foreground/80 prose-p:leading-relaxed
              prose-a:text-accent prose-a:no-underline prose-a:border-b prose-a:border-accent/30 hover:prose-a:border-accent
              prose-strong:text-foreground prose-strong:font-semibold
              prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:pl-4 prose-blockquote:pr-4 prose-blockquote:py-3 prose-blockquote:bg-muted/50 prose-blockquote:not-italic prose-blockquote:text-foreground/70
              prose-code:text-accent prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-muted prose-pre:border prose-pre:border-foreground/10
              prose-img:my-8
              prose-hr:border-0 prose-hr:border-t prose-hr:border-foreground/10 prose-hr:my-10
              prose-ul:my-4 prose-ol:my-4 prose-li:text-foreground/80
              prose-table:w-full prose-table:text-sm prose-table:border prose-table:border-foreground/10
              prose-th:h-10 prose-th:px-3 prose-th:text-left prose-th:align-middle prose-th:font-medium prose-th:text-muted-foreground prose-th:border-b prose-th:border-foreground/10
              prose-td:p-3 prose-td:align-middle prose-td:border-b prose-td:border-foreground/10
              [&_tr:last-child_td]:border-b-0"
          />

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-foreground/10">
            <BackLink to="/blog" label="Back to blog" hoverColor="foreground" />
          </div>
        </div>

        {/* Right sidebar - TOC for desktop */}
        <div className="hidden xl:block">
          <div className="sticky top-8">
            <TableOfContents links={post.toc} />
          </div>
        </div>
      </div>
    </article>
  )
}
