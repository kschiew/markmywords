import { createPredictionFormSchema } from '@/types/prediction'
import { protectedProcedure, publicProcedure, router } from '../trpc'
import { db } from '@workspace/db/index'
import { predictionsTable } from '@workspace/db/schema'

export const predictionRouter = router({
  getAll: publicProcedure.query(async () => {
    try {
      return await db.select().from(predictionsTable)
    } catch (e) {
      console.log({ e, control: 'control' })
    }
  }),
  create: protectedProcedure
    .input(createPredictionFormSchema)
    .mutation(async ({ input, ctx }) => {
      const { prediction, skipRemind, remindAt, isPrivate } = input
      await db.insert(predictionsTable).values({
        userId: ctx.userId,
        content: prediction,
        remindAt,
        skipRemind,
        isPrivate,
      })
      return 'OK'
    }),
})
