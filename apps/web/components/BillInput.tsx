'use client'

import { cn } from '@workspace/ui/lib/utils'
import { useState } from 'react'

export type BillInputProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  /** One set line, printed behind an empty field. Not a carousel. */
  suggestion: string
  maxLength?: number
  id?: string
}

/*
 * The main-event slot.
 *
 * The field IS the wood type. An invisible sizer holds the box open to whatever
 * is longest — the typed claim or the set line behind it — and both the ghost
 * and the textarea are laid over it. Sizing the box off the textarea's own
 * scrollHeight was the earlier bug: a two-line suggestion got sliced in half by
 * a box that only knew about one line of typed text.
 */
export const BillInput = ({
  value,
  onChange,
  onSubmit,
  suggestion,
  maxLength = 240,
  id = 'bill-input',
}: BillInputProps) => {
  const [focused, setFocused] = useState(false)
  const ghost = value.length === 0

  const typeClass =
    'bill-type w-full border-0 px-0 pb-0 pt-[0.14em] text-[clamp(2.25rem,6.5vw,5.25rem)] whitespace-pre-wrap break-words'

  return (
    <div className="relative">
      {/* Sizer: in flow, never painted, never read aloud. */}
      <p aria-hidden="true" className={cn(typeClass, 'invisible')}>
        {value || suggestion}
      </p>

      {ghost && (
        <p
          aria-hidden="true"
          className={cn(
            typeClass,
            'pointer-events-none absolute inset-0 text-ash transition-opacity',
            focused && 'opacity-55',
          )}
        >
          {suggestion}
        </p>
      )}

      <label htmlFor={id} className="sr-only">
        Your prediction
      </label>
      <textarea
        id={id}
        value={value}
        maxLength={maxLength}
        spellCheck
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSubmit()
          }
        }}
        className={cn(
          typeClass,
          'absolute inset-0 resize-none overflow-hidden bg-transparent text-ink outline-none dark:text-bone',
        )}
      />
    </div>
  )
}
