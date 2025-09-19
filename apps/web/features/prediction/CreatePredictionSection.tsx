'use client'

import { RotatingPlaceholderInput } from '@/components/RotatingPlaceholder'
import { CreatePredictionModal } from './CreatePredictionModal'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem } from '@workspace/ui/components/form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseDate } from 'chrono-node'

const createPredictionFormSchema = z.object({
  prediction: z.string(),
  remindBy: z.date().optional(),
  skipRemind: z.boolean(),
})

export type CreatePredictionFormValues = z.infer<
  typeof createPredictionFormSchema
>

export const CreatePredictionSection = () => {
  const form = useForm<CreatePredictionFormValues>({
    resolver: zodResolver(createPredictionFormSchema),
    defaultValues: {
      prediction: '',
      remindBy: parseDate('In two days') || new Date(),
      skipRemind: false,
    },
  })

  return (
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

      <CreatePredictionModal form={form} />
    </Form>
  )
}
