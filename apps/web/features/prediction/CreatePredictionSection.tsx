'use client'

import { RotatingPlaceholderInput } from '@/components/RotatingPlaceholder'
import { CreatePredictionModal } from './CreatePredictionModal'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem } from '@workspace/ui/components/form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseDate } from 'chrono-node'
import { trpc } from '@/trpc/client'
import {
  createPredictionFormSchema,
  CreatePredictionFormValues,
} from '@/types/prediction'
import { useState } from 'react'

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

  const { mutateAsync: createAsync } = trpc.prediction.create.useMutation()

  const [open, setOpen] = useState(false)

  const onSubmit = async () => {
    const values = form.getValues()
    await createAsync(values)
    toast('Prediction created successfully!')
  }

  return (
    <form
      className="flex flex-col items-center justify-center gap-4 w-full"
      onSubmit={(e) => {
        e.preventDefault()
        setOpen(true)
      }}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="prediction"
          render={({ field }) => (
            <FormItem>
              <RotatingPlaceholderInput
                suggestions={[
                  'Lewis Hamilton will win Drivers Championship in 2026',
                  'The housing market is going to crash in 5 years',
                  'My first kid will be a daughter',
                ]}
                animation={'fade'}
                intervalMs={5000}
                className="min-w-50"
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />

        <CreatePredictionModal
          open={open}
          onOpenChange={setOpen}
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
        />
      </Form>
    </form>
  )
}
