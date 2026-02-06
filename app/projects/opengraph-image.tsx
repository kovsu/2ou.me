import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Projects - KonvSuu'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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

        {/* Accent lines */}
        <div
          style={{
            position: 'absolute',
            left: 80,
            top: 0,
            bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)',
          }}
        />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 60,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: '#f5f5f5',
              fontFamily: 'monospace',
            }}
          >
            002
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'monospace',
            }}
          >
            /
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
            }}
          >
            WORK
          </div>
          <div
            style={{
              flex: 1,
              height: 1,
              background: 'rgba(255,255,255,0.1)',
              marginLeft: 16,
            }}
          />
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
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              color: '#f5f5f5',
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}
          >
            Projects
          </div>
          <div
            style={{
              fontSize: 22,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.5,
            }}
          >
            Things I have built with attention to detail and performance.
          </div>
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
            2ou.me/projects
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.3)',
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
