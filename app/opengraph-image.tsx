import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const dynamic = 'force-static'
export const alt = 'Konv Suu'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const avatarData = await readFile(join(process.cwd(), 'public', 'monochrome.svg'))
  const avatarBase64 = `data:image/svg+xml;base64,${avatarData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#fafaf9',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Left content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 60px 80px 80px',
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: '#2d5f4c',
              fontFamily: 'monospace',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            Personal Website
          </div>
          <div
            style={{
              fontSize: 80,
              fontStyle: 'italic',
              color: '#1a1a1a',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              marginBottom: 24,
            }}
          >
            Konv Suu
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#737373',
              lineHeight: 1.6,
              maxWidth: 400,
            }}
          >
            Developer, open source enthusiast, and lifelong learner.
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 15,
              color: '#a3a3a3',
              fontFamily: 'monospace',
            }}
          >
            2ou.me
          </div>
        </div>

        {/* Right avatar section */}
        <div
          style={{
            width: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            
          }}
        >
          <img
            src={avatarBase64}
            width={260}
            height={260}
            style={{ objectFit: 'contain',
              borderRadius: '50%' }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
