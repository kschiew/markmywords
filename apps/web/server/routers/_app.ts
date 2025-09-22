import { router } from '../trpc'
import { predictionRouter } from './prediction'

export const appRouter = router({
  prediction: predictionRouter,
})

export type AppRouter = typeof appRouter
