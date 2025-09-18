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
import { FormField } from '@workspace/ui/components/form'
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
        <div className="flex flex-col">
          <Blockquote>
            {predictionText}
            <BlockquoteAuthor>
              {(user?.fullName ?? 'Unknown jedi') +
                ', ' +
                new Date().toLocaleDateString()}
            </BlockquoteAuthor>
          </Blockquote>
          <FormField
            control={form.control}
            name={'remindBy'}
            render={({ field }) => (
              <>
                <div className="relative flex gap-2">
                  <Input
                    value={naturalTextInput}
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
                      <Button variant={'ghost'}>
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
                <div className="text-muted-foreground px-1 text-sm">
                  Your post will be published on{' '}
                  <span className="font-medium">{formatDate(remindBy)}</span>.
                </div>
              </>
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
