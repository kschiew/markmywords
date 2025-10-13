import { CreatePredictionSection } from '@/features/prediction/CreatePredictionSection'
import { PredictionCard } from '@/features/prediction/PredictionCard'
import { createTRPCContext } from '@/server/context'
import { appRouter } from '@/server/routers/_app'

export default async function Page() {
  const ctx = await createTRPCContext()
  const caller = appRouter.createCaller(ctx)

  const predictions = (await caller.prediction.getAllPublic()) ?? []

  return (
    <div className="container mx-auto p-8 flex min-h-svh w-full">
      <div className="flex flex-col items-center gap-4 w-full pt-40">
        <h1 className="text-2xl font-bold">
          Call it. Nail it. We’ll poke you when the moment comes.
        </h1>
        <CreatePredictionSection />
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
