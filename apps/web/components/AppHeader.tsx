import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'
import Image from 'next/image'
import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'

export const AppHeader = async () => {
  const user = await currentUser()
  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-50">
      <div className="flex items-center">
        <Image src={'images/logo.svg'} alt="logo" width={220} height={100} />
        <div className="flex">
          <Button asChild variant={'ghost'}>
            <Link href="/">Home</Link>
          </Button>
          {user && (
            <Button asChild variant={'ghost'}>
              <Link href="/predictions">My Predictions</Link>
            </Button>
          )}
        </div>
      </div>
      <SignedOut>
        <div className="flex gap-2">
          <SignInButton />
          <SignUpButton>
            <Button>Sign Up</Button>
          </SignUpButton>
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}
