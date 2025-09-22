import { CreatePredictionSection } from '@/features/prediction/CreatePredictionSection'
import { createTRPCContext } from '@/server/context'
import { appRouter } from '@/server/routers/_app'

export default async function Page() {
  const ctx = await createTRPCContext()
  const caller = appRouter.createCaller(ctx)

  const predictions = (await caller.prediction.getAll()) ?? []

  return (
    <div className="container mx-auto p-8 flex items-center justify-center min-h-svh w-full">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-2xl font-bold">
          Call it. Nail it. We’ll poke you when the moment comes.
        </h1>
        <CreatePredictionSection />
        <div className="grid grid-cols-3 gap-4">
          {predictions.map((p) => (
            <div>{p.content}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
