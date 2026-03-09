import { ReactNode } from 'react'

type CardTitleProps = {
  title: string
  subtitle?: string
  meta?: ReactNode
  action?: ReactNode
  className?: string
}

const CardTitle = ({
  title,
  subtitle,
  meta,
  action,
  className = '',
}: CardTitleProps) => {
  return (
    <div
      className={`mb-5 rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-6 w-1.5 rounded-full bg-orange-500" />
            <h2 className="truncate text-sm font-bold tracking-wide text-orange-900 md:text-base">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="mt-1 text-xs text-orange-800/80 md:text-sm">{subtitle}</p>
          )}
        </div>

        {(meta || action) && (
          <div className="flex shrink-0 items-center gap-2">
            {meta ? <div className="text-xs text-orange-800/80">{meta}</div> : null}
            {action}
          </div>
        )}
      </div>
    </div>
  )
}

export default CardTitle
