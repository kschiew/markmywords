import { currentUser } from '@clerk/nextjs/server'

export async function createTRPCContext(opts?: { req: Request }) {
  const user = await currentUser()
  const userDisplayName = user?.fullName || 'Unknown Jedi'
  console.log({
    userId: user?.id,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    userDisplayName,
  })

  return {
    userId: user?.id,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    userDisplayName,
  }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>
