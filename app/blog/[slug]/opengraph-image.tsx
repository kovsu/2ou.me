import { ImageResponse } from 'next/og'
import { blog } from '@/.velite'

export const dynamic = 'force-static'
export const alt = 'Blog Post'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return blog.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blog.find((p) => p.slug === slug)

  const title = post?.title || 'Blog'
  const description = post?.description || ''
  const date = post?.date ? new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.') : ''

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#080808',
          padding: 80,
          position: 'relative',
        }}
      >
        {/* Grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Left accent line */}
        <div
          style={{
            position: 'absolute',
            left: 80,
            top: 0,
            bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.15) 80%, transparent)',
          }}
        />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 60,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'monospace',
              }}
            >
              WRITING
            </div>
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'monospace',
            }}
          >
            {date}
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            paddingRight: 40,
          }}
        >
          <div
            style={{
              fontSize: title.length > 40 ? 44 : 52,
              fontWeight: 600,
              color: '#f5f5f5',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 20,
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.5,
                maxWidth: '90%',
              }}
            >
              {description}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'monospace',
            }}
          >
            2ou.me/blog
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
            }}
          >
            KonvSuu
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
