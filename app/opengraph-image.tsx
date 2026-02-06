import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'KonvSuu'
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
        <div
          style={{
            position: 'absolute',
            right: 80,
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
            justifyContent: 'space-between',
            marginBottom: 60,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
            }}
          >
            v1.0.0
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
            }}
          >
            28.2°N 112.9°E
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
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              color: '#f5f5f5',
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}
          >
            KonvSuu
          </div>
          <div
            style={{
              fontSize: 24,
              color: 'rgba(255,255,255,0.5)',
              marginBottom: 8,
            }}
          >
            Frontend Developer
          </div>
          <div
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'monospace',
            }}
          >
            Changsha, China
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
            2ou.me
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
              GitHub
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
              X
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
