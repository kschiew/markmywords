import { cn } from '@workspace/ui/lib/utils'
import { predictionState, stampDate } from '@/lib/predictionState'

export type PredictionProps = {
  text: string
  author: string
  date: Date
  remindAt?: Date | null
  skipRemind?: boolean
  isPrivate?: boolean
  /** The bill's own main-event setting runs larger than a programme strip. */
  size?: 'strip' | 'bill'
  className?: string
}

/*
 * The claim is the artifact. Everything else on the strip is the tale of the
 * tape underneath it, set in Courier because it is measurement — who, when,
 * and the day it comes due.
 */
export const Prediction = ({
  text,
  author,
  date,
  remindAt,
  skipRemind = false,
  isPrivate = false,
  size = 'strip',
  className,
}: PredictionProps) => {
  const state = predictionState(remindAt, skipRemind)

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <p
        className={cn(
          'bill-type text-balance text-ink dark:text-bone',
          size === 'bill'
            ? 'text-[clamp(2.5rem,7vw,5.5rem)]'
            : 'text-[clamp(1.5rem,3.2vw,2.25rem)]',
        )}
      >
        {text}
      </p>

      <div className="tape flex flex-wrap items-center gap-x-3 gap-y-2 text-ash">
        <span className="text-oxblood dark:text-bone">{author}</span>
        <span aria-hidden="true">/</span>
        <time dateTime={date.toISOString()}>{stampDate(date)}</time>

        {isPrivate && (
          <span className="border border-rule px-1.5 py-0.5 text-ash">
            Private
          </span>
        )}

        <span
          className={cn(
            'px-1.5 py-0.5',
            state.brass
              ? 'bg-brass text-ink'
              : 'border border-rule text-ash',
          )}
        >
          {state.stamp}
        </span>
      </div>
    </div>
  )
}
