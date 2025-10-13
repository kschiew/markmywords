import { PredictionCard } from '@/features/prediction/PredictionCard'
import { createTRPCContext } from '@/server/context'
import { appRouter } from '@/server/routers/_app'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()
  if (!user) redirect('/')

  const ctx = await createTRPCContext()
  const caller = appRouter.createCaller(ctx)

  const predictions = (await caller.prediction.getAll()) ?? []

  return (
    <div className="container mx-auto p-4 flex-col min-h-svh w-full gap-4 items-start">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-2xl font-bold self-start">My Predictions</h1>
        <div className="grid grid-cols-2 gap-4">
          {predictions.map((p) => (
            <PredictionCard
              predictionText={p.predictions.content}
              author={p.users.displayName}
              date={p.predictions.createdAt}
              key={p.predictions.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
