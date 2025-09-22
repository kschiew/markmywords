import { initTRPC, TRPCError } from '@trpc/server'
import { Context } from './context'
import { db } from '@workspace/db/index'
import { usersTable } from '@workspace/db/schema'
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create()
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' })
  console.log({ userId: ctx.userId })
  if (ctx.userEmail) {
    try {
      await db
        .insert(usersTable)
        .values({ id: ctx.userId, email: ctx.userEmail })
        .onConflictDoNothing()
    } catch (e) {
      console.log('protectedProcedure error', { e })
    }
  }
  return next({ ctx: { ...ctx, userId: ctx.userId } })
})
