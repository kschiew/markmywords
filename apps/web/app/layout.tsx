import { Archivo, Big_Shoulders, Courier_Prime } from 'next/font/google'

import '@workspace/ui/globals.css'
import { Providers } from '@/components/providers'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@workspace/ui/components/sonner'
import { TRPCProvider } from './providers'
import { AppHeader } from '@/components/AppHeader'
import type { Metadata } from 'next'

// Wood type for the bill, a grotesque for reading, Courier for the record.
const fontDisplay = Big_Shoulders({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-display',
})

const fontSans = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-sans',
})

const fontMono = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'MarkMyWords — call it, on the record',
  description:
    'Put a claim about the future on the record with a date against it, and read what everyone else has called.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <TRPCProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${fontSans.variable} ${fontMono.variable} ${fontDisplay.variable} font-sans antialiased`}
          >
            <Providers>
              <a
                href="#bill"
                className="tape sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-oxblood focus:px-3 focus:py-2 focus:text-bone"
              >
                Skip to the bill
              </a>
              <AppHeader />
              {children}
            </Providers>
            <Toaster
              position="bottom-center"
              toastOptions={{
                unstyled: true,
                classNames: {
                  toast:
                    'tape flex w-full items-center gap-3 border-2 border-oxblood bg-bone px-4 py-3 text-ink shadow-none dark:border-bone dark:bg-oxblood-deep dark:text-bone',
                },
              }}
            />
          </body>
        </html>
      </TRPCProvider>
    </ClerkProvider>
  )
}
