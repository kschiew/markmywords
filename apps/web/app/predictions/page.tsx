import { PredictionCard } from '@/features/prediction/PredictionCard'
import { createTRPCContext } from '@/server/context'
import { appRouter } from '@/server/routers/_app'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { predictionState } from '@/lib/predictionState'

export default async function Page() {
  const user = await currentUser()
  if (!user) redirect('/')

  const ctx = await createTRPCContext()
  const caller = appRouter.createCaller(ctx)

  const predictions = (await caller.prediction.getAll()) ?? []

  const due = predictions.filter(
    (p) =>
      predictionState(p.predictions.remindAt, p.predictions.skipRemind).brass,
  ).length

  return (
    <main className="mx-auto w-full max-w-[1400px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
      <div className="rule-heavy flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 pb-5 pt-4">
        <h1 className="bill-type text-[clamp(2.25rem,6vw,4.5rem)] text-oxblood dark:text-bone">
          My record
        </h1>
        <div className="tape flex flex-wrap items-center gap-x-4 gap-y-2 text-ash">
          <span>
            {predictions.length}{' '}
            {predictions.length === 1 ? 'call' : 'calls'}
          </span>
          {due > 0 && (
            <span className="bg-brass px-1.5 py-0.5 text-ink">
              {due} coming due
            </span>
          )}
        </div>
      </div>

      {predictions.length === 0 ? (
        <div className="flex flex-col items-start gap-6 pt-12">
          <p className="max-w-[58ch] text-sm leading-relaxed text-ash">
            You have not called anything yet. Your record starts the moment you
            put one sentence on the bill.
          </p>
          <Link
            href="/#bill"
            className="tape bg-oxblood px-6 py-3.5 text-bone transition-colors hover:bg-ink dark:bg-bone dark:text-oxblood-deep"
          >
            Make the first call
          </Link>
        </div>
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
              isPrivate={p.predictions.isPrivate}
            />
          ))}
        </div>
      )}
    </main>
  )
}
