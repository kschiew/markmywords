import { createPredictionFormSchema } from '@/types/prediction'
import { protectedProcedure, publicProcedure, router } from '../trpc'
import { db } from '@workspace/db/index'
import { predictionsTable, usersTable } from '@workspace/db/schema'
import { eq } from 'drizzle-orm'

export const predictionRouter = router({
  getAllPublic: publicProcedure.query(async () => {
    try {
      return await db
        .select()
        .from(predictionsTable)
        .innerJoin(usersTable, eq(predictionsTable.userId, usersTable.id))
        .where(eq(predictionsTable.isPrivate, false))
    } catch (e) {
      console.log({ e, control: 'control' })
    }
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await db
        .select()
        .from(predictionsTable)
        .innerJoin(usersTable, eq(predictionsTable.userId, usersTable.id))
        .where(eq(predictionsTable.userId, ctx.userId))
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
