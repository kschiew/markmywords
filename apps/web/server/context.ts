import { currentUser } from '@clerk/nextjs/server'

export async function createTRPCContext(opts?: { req: Request }) {
  const user = await currentUser()
  console.log({
    userId: user?.id,
    userEmail: user?.primaryEmailAddress?.emailAddress,
  })

  return {
    userId: user?.id,
    userEmail: user?.primaryEmailAddress?.emailAddress,
  }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>
