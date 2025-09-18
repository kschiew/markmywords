import { CreatePredictionSection } from '@/features/prediction/CreatePredictionSection'

export default function Page() {
  return (
    <div className="container mx-auto p-8 flex items-center justify-center min-h-svh w-full">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-2xl font-bold">
          Call it. Nail it. We’ll poke you when the moment comes.
        </h1>
        <CreatePredictionSection />
      </div>
    </div>
  )
}
