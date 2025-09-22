import { Button } from '@workspace/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog'
import {
  Blockquote,
  BlockquoteAuthor,
} from '@workspace/ui/components/blockquote'
import { useUser } from '@clerk/nextjs'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@workspace/ui/components/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover'
import { Input } from '@workspace/ui/components/input'
import { useState } from 'react'
import { parseDate } from 'chrono-node'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@workspace/ui/components/calendar'
import { cn } from '@workspace/ui/lib/utils'
import { Switch } from '@workspace/ui/components/switch'
import { CreatePredictionFormValues } from '@/types/prediction'

export type CreatePredictionModalProps = {
  form: UseFormReturn<CreatePredictionFormValues>
  onSubmit: () => void
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return ''
  }
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export const CreatePredictionModal = ({
  form,
  onSubmit,
}: CreatePredictionModalProps) => {
  const { user } = useUser()
  const predictionText = form.watch('prediction')
  const remindAt = form.watch('remindAt')
  const skipRemind = form.watch('skipRemind')

  const [naturalTextInput, setNaturalTextInput] = useState('In two days')
  const [isCalendarPopoverOpen, setIsCalendarPopoverOpen] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" disabled={!predictionText}>
          Mark it
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create prediction</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Blockquote>
            {predictionText}
            <BlockquoteAuthor className="text-sm">
              {(user?.fullName ?? 'Unknown jedi') +
                ', ' +
                new Date().toLocaleDateString()}
            </BlockquoteAuthor>
          </Blockquote>
          <FormField
            control={form.control}
            name={'remindAt'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remind me:</FormLabel>
                <div className="relative flex gap-2">
                  <Input
                    value={naturalTextInput}
                    placeholder="Tomorrow or next week"
                    disabled={skipRemind}
                    onChange={(e) => {
                      setNaturalTextInput(e.target.value)
                      const date = parseDate(e.target.value)
                      if (date) {
                        field.onChange(date)
                      }
                    }}
                  />
                  <Popover
                    open={isCalendarPopoverOpen}
                    onOpenChange={setIsCalendarPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button variant={'ghost'} disabled={skipRemind}>
                        <CalendarIcon className="size-3.5" />
                        <span className="sr-only">Select date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date)
                          setIsCalendarPopoverOpen(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div
                  className={cn('text-muted-foreground px-1 text-sm', {
                    'line-through': skipRemind,
                  })}
                >
                  Your post will be published on{' '}
                  <span className="font-medium">{formatDate(remindAt)}</span>.
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skipRemind"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Don't send me a reminder</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPrivate"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Make this prediction private</FormLabel>
                  <FormDescription>
                    This prediction will be visible to only you, and will not be
                    visible on the home page.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="self-end" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
