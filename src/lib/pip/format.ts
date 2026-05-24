const SYDNEY_TZ = 'Australia/Sydney'

export function sydneyGreetingPeriod(): 'Morning' | 'Afternoon' | 'Evening' {
  const hour = Number(
    new Intl.DateTimeFormat('en-AU', {
      timeZone: SYDNEY_TZ,
      hour: 'numeric',
      hour12: false,
    }).format(new Date()),
  )
  if (hour < 12) return 'Morning'
  if (hour < 17) return 'Afternoon'
  return 'Evening'
}

function titleCaseWord(value: string): string {
  const t = value.trim()
  if (!t) return ''
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()
}

export function displayFirstName(
  fullName: string | null | undefined,
  fallback = 'mate',
): string {
  const raw = fullName?.trim()
  if (!raw) return fallback
  const first = raw.split(/\s+/)[0]?.trim()
  if (!first) return fallback
  return titleCaseWord(first) || fallback
}
