'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@workspace/ui/components/dialog'
import { useUser } from '@clerk/nextjs'
import { UseFormReturn } from 'react-hook-form'
import { FormField, FormItem } from '@workspace/ui/components/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover'
import { useState } from 'react'
import { parseDate } from 'chrono-node'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@workspace/ui/components/calendar'
import { cn } from '@workspace/ui/lib/utils'
import { Switch } from '@workspace/ui/components/switch'
import { CreatePredictionFormValues } from '@/types/prediction'
import { Prediction } from './Prediction'
import { stampDate } from '@/lib/predictionState'

export type CreatePredictionModalProps = {
  form: UseFormReturn<CreatePredictionFormValues>
  onSubmit: () => void
  open: boolean
  onOpenChange: (val: boolean) => void
  isPending: boolean
}

export const CreatePredictionModal = ({
  form,
  onSubmit,
  open,
  onOpenChange,
  isPending,
}: CreatePredictionModalProps) => {
  const { user } = useUser()

  const predictionText = form.watch('prediction')
  const remindAt = form.watch('remindAt')
  const skipRemind = form.watch('skipRemind')
  const isPrivate = form.watch('isPrivate')

  const [naturalTextInput, setNaturalTextInput] = useState('In two days')
  const [isCalendarPopoverOpen, setIsCalendarPopoverOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] gap-0 overflow-y-auto border-2 border-oxblood bg-bone p-0 shadow-none sm:max-w-xl dark:border-bone dark:bg-oxblood-deep">
        <DialogHeader className="border-b-2 border-oxblood px-6 py-4 dark:border-bone">
          <DialogTitle className="tape text-left text-ink dark:text-bone">
            Put it on the record
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-7 px-6 py-6">
          {/* The strip exactly as it will print on the bill. */}
          <div className="relative">
            <Prediction
              text={predictionText}
              author={user?.fullName || user?.username || 'You'}
              date={new Date()}
              remindAt={remindAt}
              skipRemind={skipRemind}
              isPrivate={isPrivate}
            />

          </div>

          <FormField
            control={form.control}
            name="remindAt"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 space-y-0">
                <label
                  htmlFor="comes-due"
                  className="tape text-ash"
                >
                  Comes due
                </label>
                <div className="flex gap-0">
                  <input
                    id="comes-due"
                    value={naturalTextInput}
                    placeholder="Tomorrow, or next March"
                    disabled={skipRemind}
                    onChange={(e) => {
                      setNaturalTextInput(e.target.value)
                      const date = parseDate(e.target.value)
                      if (date) field.onChange(date)
                    }}
                    className="tape w-full border border-input bg-transparent px-3 py-2.5 text-ink outline-none placeholder:text-ash focus-visible:border-oxblood disabled:text-ash dark:text-bone dark:focus-visible:border-bone"
                  />
                  <Popover
                    open={isCalendarPopoverOpen}
                    onOpenChange={setIsCalendarPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        disabled={skipRemind}
                        className="border border-l-0 border-input px-3 text-ink transition-colors hover:bg-oxblood hover:text-bone disabled:text-ash disabled:hover:bg-transparent disabled:hover:text-ash dark:text-bone dark:hover:bg-bone dark:hover:text-oxblood-deep"
                      >
                        <CalendarIcon className="size-4" />
                        <span className="sr-only">Pick the date instead</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto border-2 border-oxblood bg-bone p-0 shadow-none dark:border-bone dark:bg-oxblood-deep">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date)
                            setNaturalTextInput(stampDate(date))
                          }
                          setIsCalendarPopoverOpen(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <p
                  className={cn(
                    'max-w-[62ch] text-sm leading-relaxed text-ash',
                    skipRemind && 'line-through',
                  )}
                >
                  {/*
                    Honest by contract: create() publishes immediately, and
                    nothing in this codebase sends a reminder. Saying otherwise
                    is the one thing the surface brief forbids outright.
                  */}
                  This goes on the public bill the moment you mark it. The date
                  only sets when it starts showing as due — nothing emails you
                  yet.
                </p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skipRemind"
            render={({ field }) => (
              <FormItem className="rule-hair flex flex-row items-center justify-between gap-6 space-y-0 pt-5">
                <label htmlFor="no-bell" className="tape text-ink dark:text-bone">
                  Don&apos;t set a bell
                </label>
                <Switch
                  id="no-bell"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPrivate"
            render={({ field }) => (
              <FormItem className="rule-hair flex flex-row items-start justify-between gap-6 space-y-0 pt-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="private"
                    className="tape text-ink dark:text-bone"
                  >
                    Keep it off the public bill
                  </label>
                  <p className="max-w-[52ch] text-sm leading-relaxed text-ash">
                    Only you will see it, on your own record.
                  </p>
                </div>
                <Switch
                  id="private"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between gap-4 border-t-2 border-oxblood px-6 py-4 dark:border-bone">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="tape cursor-pointer text-ash transition-colors hover:text-oxblood"
          >
            Not yet
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isPending}
            className="tape cursor-pointer bg-oxblood px-6 py-3.5 text-bone transition-colors hover:bg-ink disabled:cursor-wait disabled:bg-ash dark:bg-bone dark:text-oxblood-deep"
          >
            {isPending ? 'Stamping…' : 'Mark it'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
