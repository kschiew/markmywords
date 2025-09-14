'use client'

import { Input } from '@workspace/ui/components/input'
import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

export type RotatingPlaceholderInputProps = {
  suggestions: string[]
  intervalMs?: number
  animation?: 'fade' | 'type'
  className?: string
  inputProps?: React.ComponentProps<typeof Input>
}

export const RotatingPlaceholderInput = ({
  suggestions,
  intervalMs,
  animation,
  className,
  inputProps,
}: RotatingPlaceholderInputProps) => {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [value, setValue] = useState('')

  const active = suggestions.length > 0 && !paused && value.length === 0

  useEffect(() => {
    if (!active) return

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % suggestions.length)
    }, intervalMs)

    return () => clearInterval(id)
  })

  // Handlers
  const onFocus = () => setPaused(true)
  const onBlur = () => setPaused(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    inputProps?.onChange?.(e)
  }

  const suggestion = suggestions[index] ?? ''

  // Animation variants
  const fadeMs = reduceMotion ? 0 : 250
  const typeSpeed = reduceMotion ? 0 : 25

  return (
    <div className="relative min-w-1/2">
      <Input
        aria-describedby={inputProps?.['aria-describedby']}
        {...inputProps}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={inputProps?.placeholder ?? ''}
        className={clsx(
          // Ensure enough right padding so ghost text never overlaps suffix icons
          'pr-10',
          // Keep placeholder color consistent (Tailwind's placeholder:*)
          'placeholder:text-muted-foreground',
          className,
        )}
      />

      {value.length === 0 && (
        <div
          aria-hidden
          className={clsx(
            'pointer-events-none absolute inset-0 flex items-center',
            // Match Input's default paddings (shadcn Input uses h-10 px-3 text-sm by default)
            'px-3 text-sm text-muted-foreground',
          )}
        >
          {/* A masked container so long text can fade out at the end nicely */}
          <div className="relative w-full overflow-hidden">
            {animation === 'type' ? (
              <Typewriter key={index} text={suggestion} speed={typeSpeed} />
            ) : (
              <AnimatePresence mode="wait">
                <motion.span
                  key={suggestion}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: fadeMs / 1000 }}
                  className="block truncate"
                >
                  {suggestion}
                </motion.span>
              </AnimatePresence>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Typewriter({ text, speed = 20 }: { text: string; speed?: number }) {
  const [shown, setShown] = useState('')
  useEffect(() => {
    let i = 0
    let cancelled = false
    const tick = () => {
      if (cancelled) return
      i++
      setShown(text.slice(0, i))
      if (i < text.length) setTimeout(tick, speed)
    }
    tick()
    return () => {
      cancelled = true
    }
  }, [text, speed])

  return (
    <span className="block truncate">
      {shown}
      <span className="opacity-60">
        {shown.length < text.length ? '▍' : ''}
      </span>
    </span>
  )
}
