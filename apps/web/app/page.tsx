import { CreatePredictionSection } from '@/features/prediction/CreatePredictionSection'
import { PredictionCard } from '@/features/prediction/PredictionCard'
import { createTRPCContext } from '@/server/context'
import { appRouter } from '@/server/routers/_app'

export default async function Page() {
  const ctx = await createTRPCContext()
  const caller = appRouter.createCaller(ctx)

  const predictions = (await caller.prediction.getAllPublic()) ?? []

  return (
    <main className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
      {/* The bill. Monumental, and the mechanism demonstrates itself. */}
      <section id="bill" className="pb-10 pt-10 sm:pb-14 sm:pt-16">
        <CreatePredictionSection />
        <p className="mt-6 max-w-[58ch] text-sm leading-relaxed text-ash">
          Every call here is public, dated and signed. There is no taking one
          back.
        </p>
      </section>

      {/* The programme. Intimate and dense — the scale drops on purpose. */}
      <section className="pb-24">
        <div className="rule-heavy flex items-baseline justify-between gap-4 pb-5 pt-4">
          <h2 className="bill-type text-[clamp(1.75rem,3.5vw,2.75rem)] text-oxblood dark:text-bone">
            On the record
          </h2>
          <span className="tape text-ash">
            {predictions.length} {predictions.length === 1 ? 'call' : 'calls'}
          </span>
        </div>

        {predictions.length === 0 ? (
          <p className="max-w-[58ch] pt-10 text-sm leading-relaxed text-ash">
            Nothing on the bill yet. The first call printed here is the one
            everybody else has to beat.
          </p>
        ) : (
          <div>
            {predictions.map((p) => (
              <PredictionCard
                key={p.predictions.id}
                predictionText={p.predictions.content}
                author={p.users.displayName}
                date={p.predictions.createdAt}
                remindAt={p.predictions.remindAt}
                skipRemind={p.predictions.skipRemind}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
