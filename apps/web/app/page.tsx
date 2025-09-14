import { RotatingPlaceholderInput } from '@/components/RotatingPlaceholder'
import { Button } from '@workspace/ui/components/button'
export default function Page() {
  return (
    <div className="container mx-auto p-8 flex items-center justify-center min-h-svh w-full">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        {/* <h1 className="text-2xl font-bold"> */}
        {/*   Write down your prediction. Set the date. See if you called it. We’ll */}
        {/*   ping you when it counts. */}
        {/* </h1> */}
        <h1 className="text-2xl font-bold">
          Call it. Nail it. We’ll poke you when the moment comes.
        </h1>
        <RotatingPlaceholderInput
          suggestions={[
            'Lewis Hamilton will win Drivers Championship in 2026',
            'The housing market is going to crash in 5 years',
            'My first kid will be a daughter',
          ]}
          animation={'fade'}
          intervalMs={5000}
          className="min-w-50"
        />
        <Button size="lg">Mark it</Button>
      </div>
    </div>
  )
}
