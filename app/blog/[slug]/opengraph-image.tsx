import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'
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

  const avatarData = await readFile(join(process.cwd(), 'public', 'monochrome.svg'))
  const avatarBase64 = `data:image/svg+xml;base64,${avatarData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fafaf9',
          fontFamily: 'Georgia, serif',
          padding: 72,
          position: 'relative',
        }}
      >
        {/* Left accent border */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            backgroundColor: '#2d5f4c',
          }}
        />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 48,
          }}
        >
          <img
            src={avatarBase64}
            width={44}
            height={44}
            style={{ objectFit: 'contain' }}
          />
          <div style={{ fontSize: 18, color: '#1a1a1a' }}>Konv Suu</div>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: '#d4d4d4',
            }}
          />
          <div style={{ fontSize: 16, color: '#a3a3a3', fontFamily: 'monospace' }}>
            Blog
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontStyle: 'italic',
              color: '#1a1a1a',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: 24,
              maxWidth: '95%',
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 22,
                color: '#737373',
                lineHeight: 1.5,
                maxWidth: '85%',
              }}
            >
              {description}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            fontSize: 15,
            color: '#a3a3a3',
            fontFamily: 'monospace',
          }}
        >
          2ou.me
        </div>
      </div>
    ),
    { ...size }
  )
}
