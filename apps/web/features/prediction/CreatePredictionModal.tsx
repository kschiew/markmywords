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
import { CreatePredictionFormValues } from './CreatePredictionSection'
import {
  FormControl,
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
import { Checkbox } from '@workspace/ui/components/checkbox'
import { cn } from '@workspace/ui/lib/utils'

export type CreatePredictionModalProps = {
  form: UseFormReturn<CreatePredictionFormValues>
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

export const CreatePredictionModal = ({ form }: CreatePredictionModalProps) => {
  const { user } = useUser()
  const predictionText = form.watch('prediction')
  const remindBy = form.watch('remindBy')
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
            name={'remindBy'}
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
                  <span className="font-medium">{formatDate(remindBy)}</span>.
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skipRemind"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-gray-500">
                  Don't send me a reminder
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
