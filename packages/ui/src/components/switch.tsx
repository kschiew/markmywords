"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@workspace/ui/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=unchecked]:bg-transparent inline-flex h-5 w-9 shrink-0 items-center rounded-none border border-input transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-3.5 rounded-none ring-0 transition-transform data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-primary-foreground data-[state=unchecked]:translate-x-[2px] data-[state=unchecked]:bg-muted-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
