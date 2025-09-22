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

  const onSubmit = async () => {
    console.log('onSubmit called')
    const values = form.getValues()
    await createAsync(values)
    toast()
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-4 w-full"
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
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
        />
      </Form>
    </form>
  )
}
