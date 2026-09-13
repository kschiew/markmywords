import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'

/*
 * Printed furniture, not a chrome bar: the wordmark is a struck block, the nav
 * sits on the same baseline as the imprint line, and one heavy rule closes the
 * masthead the way a bill's top rule does.
 */
export const AppHeader = () => {
  return (
    <header className="border-b-2 border-oxblood dark:border-bone">
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3 sm:px-8">
        <Link
          href="/"
          className="group inline-flex items-baseline bg-oxblood px-2.5 py-1 text-bone transition-colors hover:bg-ink dark:bg-bone dark:text-oxblood-deep"
        >
          <span className="bill-type text-[26px] leading-none">Mark</span>
          <span className="bill-type text-[26px] font-normal leading-none">
            My
          </span>
          <span className="bill-type text-[26px] font-black leading-none">
            Words
          </span>
        </Link>

        <nav aria-label="Main" className="flex items-center">
          <Link
            href="/"
            className="tape border-r border-rule px-3 py-1 text-ink transition-colors hover:text-oxblood dark:text-bone"
          >
            The Bill
          </Link>
          <SignedIn>
            <Link
              href="/predictions"
              className="tape px-3 py-1 text-ink transition-colors hover:text-oxblood dark:text-bone"
            >
              My Record
            </Link>
          </SignedIn>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <button className="tape cursor-pointer px-1 py-1 text-ash transition-colors hover:text-oxblood">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="tape cursor-pointer bg-oxblood px-3 py-2 text-bone transition-colors hover:bg-ink dark:bg-bone dark:text-oxblood-deep">
                Start calling
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'rounded-none h-8 w-8',
                  userButtonAvatarBox: 'rounded-none',
                  userButtonPopoverCard: 'rounded-none',
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
