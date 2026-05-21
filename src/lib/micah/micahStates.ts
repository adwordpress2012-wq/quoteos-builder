export type MicahState = 'idle' | 'thinking' | 'reminder' | 'success' | 'warning'

export type MicahStateConfig = {
  label: string
  message: string
  toneClass: string
  glowClass: string
}

export const micahStateConfig: Record<MicahState, MicahStateConfig> = {
  idle: {
    label: 'Idle',
    message: 'Ready to help.',
    toneClass: 'text-cyan-200',
    glowClass: 'shadow-[0_0_34px_rgba(34,211,238,0.5)]',
  },
  thinking: {
    label: 'Thinking',
    message: 'Building your quote...',
    toneClass: 'text-blue-200',
    glowClass: 'shadow-[0_0_38px_rgba(59,130,246,0.62)]',
  },
  reminder: {
    label: 'Reminder',
    message: 'Follow-up due.',
    toneClass: 'text-purple-200',
    glowClass: 'shadow-[0_0_38px_rgba(139,92,246,0.62)]',
  },
  success: {
    label: 'Success',
    message: 'Quote ready.',
    toneClass: 'text-emerald-200',
    glowClass: 'shadow-[0_0_38px_rgba(16,185,129,0.54)]',
  },
  warning: {
    label: 'Warning',
    message: 'Check margin or missing terms.',
    toneClass: 'text-amber-200',
    glowClass: 'shadow-[0_0_38px_rgba(245,158,11,0.56)]',
  },
}

export function getMicahStateConfig(state: MicahState): MicahStateConfig {
  return micahStateConfig[state]
}
