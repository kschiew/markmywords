'use client'

import { BillInput } from '@/components/BillInput'
import { CreatePredictionModal } from './CreatePredictionModal'
import { useForm } from 'react-hook-form'
import { Form } from '@workspace/ui/components/form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseDate } from 'chrono-node'
import { trpc } from '@/trpc/client'
import {
  createPredictionFormSchema,
  CreatePredictionFormValues,
} from '@/types/prediction'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs'
import { stampDate } from '@/lib/predictionState'
import { motion, useReducedMotion } from 'motion/react'

const UNSET = '—'

export const CreatePredictionSection = () => {
  const form = useForm<CreatePredictionFormValues>({
    resolver: zodResolver(createPredictionFormSchema),
    defaultValues: {
      prediction: '',
      remindAt: parseDate('In two days') || new Date(),
      skipRemind: false,
      isPrivate: false,
    },
  })

  const { user } = useUser()
  const reduceMotion = useReducedMotion()
  const { mutateAsync: createAsync, isPending } =
    trpc.prediction.create.useMutation()

  const [open, setOpen] = useState(false)
  const [marked, setMarked] = useState<string | null>(null)
  const router = useRouter()

  const prediction = form.watch('prediction')
  const remindAt = form.watch('remindAt')
  const skipRemind = form.watch('skipRemind')
  const ready = prediction.trim().length > 0

  const onSubmit = async () => {
    try {
      await createAsync(form.getValues())
      setOpen(false)
      // The press comes down on the bill itself, where STORY promised it would.
      // The field keeps the claim until the impression clears — clearing first
      // stamps the ghost line instead of what was actually marked.
      setMarked(stampDate(new Date()))
      setTimeout(() => {
        setMarked(null)
        form.reset({
          prediction: '',
          remindAt: parseDate('In two days') || new Date(),
          skipRemind: false,
          isPrivate: false,
        })
        router.refresh()
      }, 1800)
    } catch {
      toast('That did not go on the record. Try marking it again.')
    }
  }

  const caller = user?.fullName || user?.username || 'You'

  return (
    <Form {...form}>
      <div className="flex flex-col gap-6">
        <div className="relative">
          <BillInput
            value={prediction}
            onChange={(v) => form.setValue('prediction', v)}
            onSubmit={() => ready && setOpen(true)}
            suggestion="Lewis Hamilton will win the drivers championship in 2026"
          />

          {marked && (
            <motion.div
              aria-hidden="true"
              initial={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 2.1, filter: 'blur(10px)' }
              }
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <span className="bill-type -rotate-[9deg] border-[3px] border-oxblood px-6 py-3 text-[clamp(1.75rem,4vw,3rem)] text-oxblood dark:border-bone dark:text-bone">
                Marked {marked}
              </span>
            </motion.div>
          )}
        </div>

        {/* Tale of the tape: who is calling it, when, and the day it comes due. */}
        <div className="rule-heavy flex flex-wrap items-center gap-x-8 gap-y-4 pt-4">
          <div className="flex flex-col gap-1">
            <span className="tape text-ash">Called by</span>
            <span className="tape text-ink dark:text-bone">
              {ready ? caller : UNSET}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="tape text-ash">On</span>
            <span className="tape text-ink dark:text-bone">
              {ready ? stampDate(new Date()) : UNSET}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="tape text-ash">Settles</span>
            <span className="tape text-ink dark:text-bone">
              {!ready
                ? UNSET
                : skipRemind || !remindAt
                  ? 'No bell set'
                  : stampDate(remindAt)}
            </span>
          </div>

          <div className="w-full sm:ml-auto sm:w-auto">
            <SignedIn>
              <button
                type="button"
                onClick={() => setOpen(true)}
                disabled={!ready}
                className="tape w-full cursor-pointer bg-oxblood px-6 py-3.5 text-bone transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:bg-transparent disabled:text-ash disabled:outline disabled:outline-1 disabled:outline-rule sm:w-auto dark:bg-bone dark:text-oxblood-deep"
              >
                Mark it
              </button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="tape w-full cursor-pointer bg-oxblood px-6 py-3.5 text-bone transition-colors hover:bg-ink sm:w-auto dark:bg-bone dark:text-oxblood-deep"
                >
                  Sign in to mark it
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        <CreatePredictionModal
          open={open}
          onOpenChange={setOpen}
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
          isPending={isPending}
        />
      </div>
    </Form>
  )
}
