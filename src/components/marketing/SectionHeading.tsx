import { cn } from '../../lib/utils'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  id,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <div className={cn(alignClass, 'max-w-2xl')}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2563eb]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="mt-2 text-2xl font-bold tracking-tight text-[#0f2744] sm:text-3xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[#475569]">
          {description}
        </p>
      ) : null}
    </div>
  )
}
