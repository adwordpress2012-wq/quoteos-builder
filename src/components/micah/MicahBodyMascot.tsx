import { cn } from '../../lib/utils'

type MicahBodyMascotProps = {
  isThinking?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SCALE = { sm: 0.85, md: 1, lg: 1.15 } as const

export function MicahBodyMascot({
  isThinking = false,
  size = 'md',
  className,
}: MicahBodyMascotProps) {
  const scale = SCALE[size]

  return (
    <div
      className={cn('relative flex flex-col items-center', className)}
      style={{ width: 72 * scale }}
      aria-hidden="true"
    >
      <div
        className="micah-body-glow pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 60%, rgba(59,130,246,0.36), transparent 68%)',
          filter: 'blur(12px)',
        }}
      />

      <div
        className="relative"
        style={{
          width: 52 * scale,
          height: 48 * scale,
          borderRadius: 18 * scale,
          background:
            'radial-gradient(circle at 38% 28%, rgba(96,165,250,0.32), rgba(2,6,23,0.96) 58%)',
          border: '1.5px solid rgba(34,211,238,0.42)',
          boxShadow:
            '0 0 24px rgba(34,211,238,0.32), inset 0 0 14px rgba(34,211,238,0.12)',
        }}
      >
        <span
          className="micah-body-eye"
          style={{
            position: 'absolute',
            top: '34%',
            left: '26%',
            height: 7 * scale,
            width: 4 * scale,
            borderRadius: 999,
            background: '#22d3ee',
            boxShadow: '0 0 10px rgba(34,211,238,0.9)',
          }}
        />
        <span
          className="micah-body-eye"
          style={{
            position: 'absolute',
            top: '34%',
            right: '26%',
            height: 7 * scale,
            width: 4 * scale,
            borderRadius: 999,
            background: '#22d3ee',
            boxShadow: '0 0 10px rgba(34,211,238,0.9)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 16 * scale,
            height: 7 * scale,
            borderRadius: '0 0 10px 10px',
            borderBottom: '2px solid rgba(34,211,238,0.85)',
            display: 'block',
          }}
        />
        {isThinking ? (
          <span
            className="animate-pulse"
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 6 * scale,
              height: 6 * scale,
              borderRadius: 999,
              background: '#a78bfa',
              boxShadow: '0 0 8px rgba(167,139,250,0.9)',
            }}
          />
        ) : null}
        <span
          style={{
            position: 'absolute',
            bottom: -9 * scale,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 18 * scale,
            height: 18 * scale,
            borderRadius: 999,
            background: '#1d4ed8',
            border: '1.5px solid rgba(34,211,238,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 8 * scale,
            fontWeight: 700,
            color: '#fff',
            boxShadow: '0 0 10px rgba(34,211,238,0.6)',
            zIndex: 1,
          }}
        >
          M
        </span>
      </div>

      <div className="relative mt-2.5 flex items-center">
        <div
          style={{
            width: 10 * scale,
            height: 20 * scale,
            borderRadius: 999,
            background: 'rgba(59,130,246,0.8)',
            marginRight: 2,
            transform: 'rotate(-18deg)',
            transformOrigin: 'top center',
            boxShadow: '0 0 10px rgba(59,130,246,0.7)',
          }}
        />
        <div
          style={{
            width: 36 * scale,
            height: 28 * scale,
            borderRadius: 10 * scale,
            background:
              'linear-gradient(150deg, rgba(59,130,246,0.28) 0%, rgba(139,92,246,0.22) 100%)',
            border: '1.5px solid rgba(59,130,246,0.38)',
            boxShadow: 'inset 0 0 10px rgba(59,130,246,0.12)',
          }}
        />
        <div
          style={{
            width: 10 * scale,
            height: 20 * scale,
            borderRadius: 999,
            background: 'rgba(59,130,246,0.8)',
            marginLeft: 2,
            transform: 'rotate(18deg)',
            transformOrigin: 'top center',
            boxShadow: '0 0 10px rgba(59,130,246,0.7)',
          }}
        />
      </div>

      <div className="mt-1 flex gap-2">
        <div
          style={{
            width: 13 * scale,
            height: 7 * scale,
            borderRadius: '0 0 6px 6px',
            background: 'rgba(59,130,246,0.7)',
            boxShadow: '0 0 8px rgba(59,130,246,0.55)',
          }}
        />
        <div
          style={{
            width: 13 * scale,
            height: 7 * scale,
            borderRadius: '0 0 6px 6px',
            background: 'rgba(59,130,246,0.7)',
            boxShadow: '0 0 8px rgba(59,130,246,0.55)',
          }}
        />
      </div>
    </div>
  )
}
