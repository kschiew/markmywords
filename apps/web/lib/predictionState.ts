/*
 * The bill's state vocabulary.
 *
 * Brass belongs to exactly one idea in this system — a call coming due — so it
 * is emitted here and nowhere else. If a component reaches for brass on its
 * own, that is the bug, not a style choice.
 *
 * Note what these states deliberately do NOT say: nothing here claims a
 * prediction was right or wrong. The schema has no resolution and the product
 * has no scoring, so the vocabulary tops out at "the day arrived".
 */

export type PredictionStatus =
  | 'no-bell'
  | 'open'
  | 'coming-due'
  | 'due-today'
  | 'called'

export type PredictionState = {
  status: PredictionStatus
  /** Short stamp text, set in Courier on the strip. */
  stamp: string
  /** The reserved colour. True for coming-due and due-today only. */
  brass: boolean
  /** Top rule weight for the strip; the scale sequence reads through these. */
  rule: 'hair' | 'heavy'
}

const DAY = 86_400_000

const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]

/** Deterministic on server and client — never Intl, which drifts by locale. */
export function stampDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0')
  return `${d} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

export function longDate(date: Date): string {
  return stampDate(date)
}

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

export function predictionState(
  remindAt: Date | null | undefined,
  skipRemind: boolean,
  now: Date = new Date(),
): PredictionState {
  if (skipRemind || !remindAt) {
    return { status: 'no-bell', stamp: 'No bell set', brass: false, rule: 'hair' }
  }

  const days = Math.round((startOfDay(remindAt) - startOfDay(now)) / DAY)

  if (days < 0) {
    return {
      status: 'called',
      stamp: `Came due ${stampDate(remindAt)}`,
      brass: false,
      rule: 'hair',
    }
  }

  if (days === 0) {
    return { status: 'due-today', stamp: 'Due today', brass: true, rule: 'heavy' }
  }

  if (days <= 7) {
    return {
      status: 'coming-due',
      stamp: days === 1 ? 'Due tomorrow' : `Due in ${days} days`,
      brass: true,
      rule: 'heavy',
    }
  }

  return {
    status: 'open',
    stamp: `Settles ${stampDate(remindAt)}`,
    brass: false,
    rule: 'hair',
  }
}
