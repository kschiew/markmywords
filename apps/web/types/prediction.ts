import z from 'zod'

export const createPredictionFormSchema = z.object({
  prediction: z.string(),
  remindAt: z.coerce.date().optional(),
  skipRemind: z.boolean(),
  isPrivate: z.boolean(),
})

export type CreatePredictionFormValues = z.infer<
  typeof createPredictionFormSchema
>
