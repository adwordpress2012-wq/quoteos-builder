import { useId } from 'react'
import { motion } from 'framer-motion'
import type { PipMood } from '../../types/pip'

type PipMoodProps = {
  mood: PipMood
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const glow = 'drop-shadow(0 0 8px rgba(34,211,238,0.55))'

function EyeShape({ mood }: { mood: PipMood }) {
  const common = {
    stroke: '#22D3EE',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    fill: 'none',
    style: { filter: glow },
  }

  switch (mood) {
    case 'happy':
    case 'relaxed':
      return (
        <>
          <path d="M7 11 Q10 8 13 11" {...common} />
          <path d="M19 11 Q22 8 25 11" {...common} />
        </>
      )
    case 'focused':
    case 'operational':
      return (
        <>
          <line x1="7" y1="10" x2="13" y2="10" {...common} />
          <line x1="19" y1="10" x2="25" y2="10" {...common} />
        </>
      )
    case 'sleepy':
      return (
        <>
          <path d="M7 9 Q10 12 13 9" {...common} />
          <path d="M19 9 Q22 12 25 9" {...common} />
        </>
      )
    case 'celebration':
      return (
        <>
          <polygon
            points="10,7 11,10 14,10 11.5,12 12.5,15 10,13 7.5,15 8.5,12 6,10 9,10"
            {...common}
          />
          <polygon
            points="22,7 23,10 26,10 23.5,12 24.5,15 22,13 19.5,15 20.5,12 18,10 21,10"
            {...common}
          />
        </>
      )
    case 'curious':
    default:
      return (
        <>
          <circle cx="10" cy="10" r="2.2" fill="#22D3EE" style={{ filter: glow }} />
          <circle cx="22" cy="10" r="2.2" fill="#22D3EE" style={{ filter: glow }} />
        </>
      )
  }
}

const sizeMap = { sm: 40, md: 52, lg: 64 }

export default function PipMood({ mood, size = 'md', className = '' }: PipMoodProps) {
  const px = sizeMap[size]
  const gradientId = useId()

  return (
    <motion.div
      className={`relative shrink-0 ${className}`}
      style={{ width: px, height: px }}
      animate={{ y: mood === 'celebration' ? [0, -2, 0] : 0 }}
      transition={{
        duration: 2.4,
        repeat: mood === 'celebration' ? Infinity : 0,
        ease: 'easeInOut',
      }}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" width={px} height={px} className="overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        <rect
          x="4"
          y="6"
          width="24"
          height="22"
          rx="10"
          fill={`url(#${gradientId})`}
          stroke="rgba(34,211,238,0.35)"
          strokeWidth="1"
        />
        <rect
          x="8"
          y="10"
          width="16"
          height="8"
          rx="4"
          fill="#050A18"
          stroke="rgba(34,211,238,0.25)"
        />
        <EyeShape mood={mood} />
        <text
          x="16"
          y="27"
          textAnchor="middle"
          fill="#22D3EE"
          fontSize="7"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
          style={{ filter: glow }}
        >
          P
        </text>
      </svg>
      {(mood === 'focused' || mood === 'operational') && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-2xl"
          animate={{ opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 18px rgba(34,211,238,0.25)' }}
        />
      )}
    </motion.div>
  )
}
