import { cn } from '@workspace/ui/lib/utils'
import { Prediction } from './Prediction'
import { predictionState } from '@/lib/predictionState'

export type PredictionCardProps = {
  predictionText: string
  author: string
  date: Date
  remindAt?: Date | null
  skipRemind?: boolean
  isPrivate?: boolean
}

/*
 * One entry in the printed programme. The rule above it carries its weight:
 * hairline for an open call, heavy for one coming due. No card, no box, no
 * shadow — a strip is defined by the line above it and the space around it.
 */
export const PredictionCard = ({
  predictionText,
  author,
  date,
  remindAt,
  skipRemind = false,
  isPrivate = false,
}: PredictionCardProps) => {
  const state = predictionState(remindAt, skipRemind)

  return (
    <article
      className={cn(
        'py-6 sm:py-7',
        state.rule === 'heavy' ? 'rule-heavy' : 'rule-hair',
      )}
    >
      <Prediction
        text={predictionText}
        author={author}
        date={date}
        remindAt={remindAt}
        skipRemind={skipRemind}
        isPrivate={isPrivate}
      />
    </article>
  )
}
