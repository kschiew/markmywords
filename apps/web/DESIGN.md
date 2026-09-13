---
name: MarkMyWords
description: A fight bill in the Globe Poster tradition, rendered inverted — bone programme stock, oxblood ink, brass held in reserve.
colors:
  bone: "oklch(0.9 0.021 82)"
  bone-deep: "oklch(0.855 0.026 80)"
  ink: "oklch(0.16 0.004 60)"
  ash: "oklch(0.47 0.018 64)"
  oxblood: "oklch(0.31 0.116 17)"
  oxblood-deep: "oklch(0.24 0.099 17)"
  brass: "oklch(0.7 0.126 78)"
  brass-deep: "oklch(0.59 0.113 74)"
  rule: "oklch(0.31 0.116 17)"
  border: "color-mix(in oklab, oklch(0.31 0.116 17) 34%, transparent)"
  input: "color-mix(in oklab, oklch(0.31 0.116 17) 46%, transparent)"
  destructive: "oklch(0.46 0.176 27)"
typography:
  bill:
    fontFamily: "Big Shoulders, Archivo Narrow, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.025em"
    textTransform: "uppercase"
  headline:
    fontFamily: "Big Shoulders, Archivo Narrow, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.025em"
    textTransform: "uppercase"
  title:
    fontFamily: "Big Shoulders, Archivo Narrow, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.025em"
    textTransform: "uppercase"
  strip:
    fontFamily: "Big Shoulders, Archivo Narrow, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.025em"
    textTransform: "uppercase"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  tape:
    fontFamily: "Courier Prime, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.16em"
    textTransform: "uppercase"
    fontFeature: "tabular-nums"
rounded:
  sm: "0rem"
  md: "0rem"
  lg: "0rem"
  xl: "0rem"
spacing:
  gutter: "1.25rem"
  gutter-sm: "2rem"
  strip: "1.5rem"
  strip-sm: "1.75rem"
  section: "2.5rem"
  section-sm: "4rem"
  foot: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.bone}"
    typography: "{typography.tape}"
    rounded: "{rounded.sm}"
    padding: "0.875rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
  button-primary-disabled:
    backgroundColor: "transparent"
    textColor: "{colors.ash}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ash}"
    typography: "{typography.tape}"
    padding: "0.25rem 0.25rem"
  button-ghost-hover:
    textColor: "{colors.oxblood}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.tape}"
    padding: "0.25rem 0.75rem"
  nav-link-hover:
    textColor: "{colors.oxblood}"
  wordmark:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.bone}"
    typography: "{typography.title}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.625rem"
    size: "26px"
  input-tape:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.tape}"
    rounded: "{rounded.sm}"
    padding: "0.625rem 0.75rem"
  bill-input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.bill}"
    rounded: "{rounded.sm}"
    padding: "0.14em 0 0 0"
  stamp-reserved:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.ink}"
    typography: "{typography.tape}"
    rounded: "{rounded.sm}"
    padding: "0.125rem 0.375rem"
  stamp-plain:
    backgroundColor: "transparent"
    textColor: "{colors.ash}"
    typography: "{typography.tape}"
    rounded: "{rounded.sm}"
    padding: "0.125rem 0.375rem"
  dialog:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0"
    width: "36rem"
---

# Design System: MarkMyWords

## Overview

**Creative North Star: "The Inverted Fight Bill"**

This is a boxing bill printed in the Globe Poster of Baltimore tradition, run inverted: bone programme stock is the ground everywhere, oxblood is the heaviest ink on the sheet, and brass is held back for one job. A prediction is a booked fight with a date on it, so the claim is set at full volume in ultra-condensed wood type and everything beneath it — who called it, on what day, when it settles — is set in Courier because it is measurement, not commentary. Nothing in this world is a card. A strip of the programme is defined by the rule above it and the air around it.

Density varies on purpose. The bill at the top of the page is monumental: one sentence at display scale, the mechanism demonstrating itself as the visitor types. The programme below it is intimate and dense, strips stacked on hairlines, the type dropping by roughly half. That gap between the two scales is the composition; flattening them into one comfortable middle size is how this world dies.

The palette is knowingly the nearest neighbour to the look models default to — warm off-white plus a deep red. What keeps it out of that cluster is hardness: condensed, uppercase, ruled, flat ink, square corners, zero air where air would be polite. Set the same two colours in an elegant high-contrast serif with soft edges and generous whitespace and you have the generic AI page. There is no serif display anywhere in this build and there never will be.

**Unspent devices** — this world owns these and has not spent them; reach for them before inventing anything new: higher ink coverage in the first viewport; face mixing across widths and weights inside one composition (Big Shoulders' `opsz` axis and Archivo's `wdth` axis are both loaded and barely used); a richer rule vocabulary beyond the two weights that exist; reversed-out setting (bone knocked out of an oxblood field) on a headline or a whole section rather than only the wordmark and buttons; register marks.

**Key Characteristics:**
- Bone stock to the edges, carrying a printed-paper texture, never a gradient
- Oxblood as the heaviest ink and the only structural line colour
- Brass reserved system-wide for a single meaning: a call coming due
- Three faces, no serif: condensed wood type, a grotesque, and Courier
- Square corners at every radius step; flat ink, no shadow anywhere
- Rules carry information — hairline and heavy mean different things

## Colors

Printed ink on printed stock: four warm neutrals, one deep red doing all the structural work, and one reserved gold that is never decorative.

### Primary
- **Oxblood** (`{colors.oxblood}`): the heaviest ink. Every structural line, the masthead's closing rule, the heavy strip rule, the wordmark block, the primary button field, section headings, the focus ring, the caret, the scrollbar thumb, and the selection highlight. This is the colour that gives the sheet its weight.
- **Oxblood Deep** (`{colors.oxblood-deep}`): the darker pull. The dialog overlay wash (oxblood-deep at 72%) and, in the drenched rendition, the stock itself.

### Secondary
- **Brass** (`{colors.brass}`): the reserved ink. It is emitted by exactly one module — the prediction state vocabulary — and it means exactly one thing: a call is coming due. It appears as a solid brass field behind ink-black Courier on a state stamp and on the due-count in the record header. Nowhere else, ever.
- **Brass Deep** (`{colors.brass-deep}`): the darker rendition of the same reserve. Defined, unspent in this build.

### Neutral
- **Bone** (`{colors.bone}`): the programme stock. The page ground, card and popover ground, and the knocked-out type inside oxblood blocks. It is the ground everywhere in the daylight rendition.
- **Bone Deep** (`{colors.bone-deep}`): the second stock tone, used for muted and accent surfaces.
- **Ink** (`{colors.ink}`): the reading black. Body copy, the typed claim on the bill, the claim on every strip, and the type on a brass stamp.
- **Ash** (`{colors.ash}`): measurement grey. Courier metadata, the ghost line behind an empty bill field, unreserved stamp text, supporting copy, and disabled type.
- **Rule / Border / Input**: the line family is oxblood at three strengths — full oxblood for a named rule, 34% for the default border, 46% for input strokes. Lines are never neutral grey.

### Named Rules
**The Brass Reserve Rule.** Brass is emitted by `lib/predictionState.ts` and by nothing else. It is true only for `coming-due` and `due-today`. A component that reaches for `bg-brass` on its own authority is a bug, not a style choice — the colour's meaning is its only justification.

**The Oxblood Line Rule.** Every rule, border, stroke and divider in this system is oxblood at some strength. There are no grey lines. If a line needs to recede, lower its opacity, do not change its hue.

**The Printed Stock Rule.** The ground carries `--stock`: two offset 1px hairline grids at 2.5–3.5% ink. It is paper tooth, not a gradient. Never replace it with a gradient, a blur, or an image, and never raise it past 4% — above that it reads as a pattern instead of a stock.

**The Drenched Rendition.** A `.dark` variant is authored in the token layer: oxblood-deep becomes the stock, bone becomes the ink, rules invert to bone, and brass keeps its single job and its brightness. It is the same press run soaked, not a second design system. **It is currently switched off** — `components/providers.tsx` sets `forcedTheme="light"`, so no visitor can reach it, because it has never been inspected by eye. Keep authoring dark variants alongside light ones in new work; before the force is lifted, the rendition needs a visual pass of its own.

## Typography

**Display Font:** Big Shoulders (ultra-condensed wood type, `next/font/google`, `opsz` axis, bound to `--font-display`, falling back to Archivo Narrow)
**Body Font:** Archivo (`wdth` axis, bound to `--font-sans`)
**Label/Mono Font:** Courier Prime (400/700, bound to `--font-mono`)

**Character:** Three faces with three jobs and no overlap. Big Shoulders is the bill's voice — uppercase, weight 800, line-height 0.86, letter-spacing -0.025em, packed so tight the lines touch. Archivo does the quiet reading at small sizes and generous leading. Courier Prime is measurement: dates, figures, stamps, labels, buttons and navigation, always uppercase at 0.16em tracking with tabular numerals.

### Hierarchy
- **Bill** (800, `clamp(2.5rem, 7vw, 5.5rem)`, 0.86): the main-event claim — the sentence a visitor types, and the same claim previewed at bill scale. The type box carries `padding-top: 0.14em` because Big Shoulders' caps sit above the em box and clip at the top without it.
- **Headline** (800, `clamp(2.25rem, 6vw, 4.5rem)`, 0.86): a page's own title, set in oxblood.
- **Title** (800, `clamp(1.75rem, 3.5vw, 2.75rem)`, 0.86): section heads on the programme rule, set in oxblood.
- **Strip** (800, `clamp(1.5rem, 3.2vw, 2.25rem)`, 0.86): the claim on a programme strip, set in ink. Roughly half the bill — the drop is the point.
- **Body** (400, 0.875rem, 1.625, Archivo): supporting and explanatory copy only. Measure capped at 52–62ch.
- **Tape** (400, 0.6875rem, 0.16em, uppercase, Courier, tabular): every label, stamp, date, figure, button and nav link.

### Named Rules
**The No Serif Rule.** There is no serif display face in this system and there will not be one. The palette sits one step from the generic default; hard condensed type is the only thing holding it away. Any elegant high-contrast serif is the failure this world was built to avoid.

**The Courier Measures Rule.** Courier is used for measurement and instruction — dates, counts, stamps, labels, buttons, nav — never as decorative texture and never for reading passages.

**The Wood Type Slot Rule.** Big Shoulders is reserved for the claim itself, page and section heads, the wordmark and the stamp impression. It never sets a label, a paragraph, or a control.

**The Figures Line Up Rule.** Every `<time>` and every `.tabular` element runs tabular numerals at 0.02em. Dates are formatted by `stampDate` (`DD MON YYYY`), never by `Intl`, so server and client print the same sheet.

## Layout

One container, `max-width: 1400px`, centred, with a 1.25rem gutter rising to 2rem at `sm`. The container is the sheet; nothing sits outside it except the masthead's full-bleed closing rule.

The page is a vertical sequence of ruled bands, not a grid. The masthead is a single wrapping row closed by a 2px oxblood bottom rule. The bill band runs 2.5rem/4rem of air, holds the display field, then a tale-of-the-tape row that opens on a heavy rule: three stacked label/value pairs in Courier (`Called by` / `On` / `Settles`) with the primary action pushed to the end of the same rule at `sm` and dropped to full width below it. The programme band opens on a heavy rule carrying the section head and a count, then stacks strips at 1.5rem/1.75rem of vertical air each, first strip flush to its rule. Pages close with 6rem of foot.

Reading measure is explicitly capped: 58ch for page-level copy, 62ch and 52ch inside the modal. The rhythm is coarse and consistent — 0.75rem inside tape rows, 1.5rem between bill elements, 1.75rem between form groups, 2.5rem–4rem between bands.

Responsive behaviour is a scale change, not a rearrangement. Type sizes are all viewport-clamped, the container gutter steps once at `sm`, and the only layout switch in the build is the primary action moving from full-width block to inline end-of-rule.

### Named Rules
**The Scale Sequence Rule.** The bill is monumental and the programme is intimate; the claim type drops by roughly half between them. Never normalise the two toward a comfortable middle — the contrast between the main event and the undercard is the composition.

**The Printed Furniture Rule.** Navigation lives inside the typographic composition on the masthead baseline — struck wordmark block, Courier links divided by a hairline — not in a floating chrome bar. Headers do not stick, blur, or shrink on scroll.

## Elevation & Depth

There are no shadows in this system. Not one `box-shadow` ships; the dialog and popover both explicitly pass `shadow-none`, and the squared switch clears its stock shadow in the token layer. Depth is entirely printing: ink weight, rule weight, and figure/ground inversion. A surface that needs to come forward gets a 2px oxblood border and the bone ground; a surface that needs to sit back keeps the stock and gets a hairline. A modal reads as above the page because an oxblood-deep wash at 72% floods everything behind it, not because it floats.

### Named Rules
**The Flat Ink Rule.** No shadow, no gradient, no blur, no glass, no glow. Ink is either on the sheet or it is not. The only blur in the build is transient — the stamp impression resolving from `blur(10px)` to zero on commit.

**The Rule Weight Rule.** Rules carry information. A hairline (1px oxblood) separates an ordinary strip: open, called, or no-bell. A heavy rule (2px oxblood) means this call is coming due, and it is also the band-opening rule for a page or section head. Weight is assigned by the state vocabulary, never chosen for looks.

## Shapes

Every corner in this system is square. `--radius` is `0rem` and all four scale steps (`sm`/`md`/`lg`/`xl`) are pinned to `0rem`, so any inherited `rounded-lg` in a stock component resolves to nothing; a base-layer `border-radius: 0` on `*` catches the rest.

The vocabulary of forms is small and flat: the bare horizontal rule (two weights), the struck block (a solid oxblood field with bone type knocked out of it, used for the wordmark and the primary button), the hairline-outlined stamp (a 1.5rem-ish Courier chip with a 1px oxblood border), the brass stamp (the same chip, filled, reserved), and the heavy-bordered panel (2px oxblood, used for the dialog, the popover and the toast). Buttons and stamps are rectangles with type in them; nothing is a pill, a capsule, or a circle. Clerk's avatar and popover are forced square in the token layer, including the avatar image.

### Named Rules
**The Squared-At-The-Component Rule.** Stock shadcn components are re-specced in their own files, not patched in CSS. `switch.tsx` carries `rounded-none` on the root and thumb and a transparent, hairline-bordered unchecked track; `dialog.tsx` carries the oxblood-deep overlay wash directly. Utility classes beat `@layer components`, so a CSS override loses to the component's own Tailwind. Fix the component; the token layer only handles what has no component to edit (Clerk's injected DOM, the switch's geometry).

## Components

### Buttons
- **Shape:** hard rectangle, no radius (`0`), no border unless it is the disabled or secondary state.
- **Primary:** solid oxblood field, bone Courier type, `0.875rem 1.5rem` padding, full width below `sm` and inline above it. In the drenched rendition it inverts to a bone field with oxblood-deep type.
- **Hover / Focus:** the field goes ink black (`transition-colors`, no movement, no lift). Focus is the global 2px oxblood outline at 2px offset.
- **Disabled:** the field empties — transparent ground, ash type, 1px oxblood outline. A pending submit instead fills ash and reads `Stamping…`.
- **Ghost / tertiary:** bare Courier in ash, no field, going oxblood on hover. Used for `Not yet`, `Sign in`, and anything that must not compete with the mark.

### Cards / Containers
There are no cards. The programme strip is the container primitive: an `<article>` with no background, no border box and no shadow, defined only by the rule above it (hairline or heavy, assigned by state) and 1.5rem/1.75rem of vertical air. The first strip sits flush to its band rule. Do not add a background, a box, an inset, or a hover fill to a strip.

### Inputs / Fields
- **Tape field** (the date input): transparent ground, 1px oxblood-at-46% stroke, `0.625rem 0.75rem` padding, Courier at tape size, ash placeholder. Focus swaps the stroke to full oxblood. Its calendar trigger is welded to its right edge with `border-left: 0` so the pair reads as one ruled cell.
- **Bill field** (the signature capture): see below.
- **Switch:** 2.25rem × 1.25rem rectangle with a 0.875rem square thumb. Unchecked is a transparent track with a hairline border and an ash thumb; checked fills oxblood with a bone thumb. Never a pill.

### Navigation
Printed furniture on the masthead baseline. The wordmark is a struck oxblood block with `Mark` / `My` / `Words` set in three weights of the same condensed face at 26px, hovering to ink. Nav links are Courier tape in ink, divided by a 1px oxblood rule on the right edge, hovering to oxblood. Account controls push to the far end. The whole masthead is closed by a 2px oxblood rule and does not stick.

### Dialog
A 2px oxblood-bordered panel on bone, no radius, no shadow, capped at `36rem` and `90svh`. Its header and footer are each closed by their own 2px oxblood rule, giving the three-band structure of a printed form. Behind it, the overlay is an oxblood-deep wash at 72% — the page is soaked in ink, not dimmed with black.

### The Bill Input (signature)
The capture field is the main-event slot, and the field *is* the wood type. Three layers share one box: an invisible in-flow sizer holding the box open to whichever is longer (the typed claim or the set line behind it), a ghost line in ash shown only while empty and fading to 55% on focus, and the transparent textarea itself. All three carry the identical type class — `clamp(2.25rem, 6.5vw, 5.25rem)`, `padding-top: 0.14em` — because any divergence between them shifts the caret off the ghost. Sizing from the textarea's own `scrollHeight` is the known wrong answer: it slices a two-line ghost in half. Enter marks it; Shift+Enter breaks the line.

### The Stamp (signature)
On commit the bill takes an impression: a -9° rotated, 3px-oxblood-bordered Courier-cap block reading `Marked DD MON YYYY`, landing from `scale(2.1)` and `blur(10px)` over 0.5s on `cubic-bezier(0.16, 1, 0.3, 1)`, holding 1.8s before the field clears. The field keeps the claim until the impression clears — clearing first would stamp the ghost line instead of what was marked. Under `prefers-reduced-motion` the impression appears at rest with no scale or blur, and the global 0.01ms clamp kills every other transition.

### State Stamps
Five states, one vocabulary, all emitted from `lib/predictionState.ts`:
- **Open** (`Settles DD MON YYYY`): hairline rule, ash Courier in a hairline-outlined chip.
- **Coming due** (`Due in N days` / `Due tomorrow`, within 7 days): heavy rule, solid brass chip with ink type.
- **Due today** (`Due today`): heavy rule, solid brass chip with ink type.
- **Called** (`Came due DD MON YYYY`): hairline rule, outlined ash chip. The date arrived; that is all it says.
- **No bell** (`No bell set`): hairline rule, outlined ash chip.

A `Private` marker is a second outlined ash chip on the same tape row. The vocabulary deliberately stops at "the day arrived" — there is no resolution, no score, and no right/wrong stamp, so never introduce one.

## Do's and Don'ts

### Do:
- **Do** let brass come only from `predictionState`. If a new surface needs to show urgency, it asks the state vocabulary for it.
- **Do** give every strip its rule and its air, and nothing else — no box, no fill, no border.
- **Do** set claims in Big Shoulders and everything measurable in Courier, with tabular figures and `stampDate` formatting.
- **Do** keep the scale sequence: monumental bill, intimate programme, roughly a 2:1 drop in claim size.
- **Do** square stock components in their own file (`rounded-none` on the component) rather than in `@layer components`, because utilities win.
- **Do** cap reading measure at 52–62ch and keep body copy in Archivo at 0.875rem/1.625.
- **Do** spend the world's unspent devices first — heavier ink coverage, face mixing across the `opsz`/`wdth` axes, more rule weights, reversed-out headlines, register marks — before importing a device from outside it.
- **Do** keep writing `dark:` variants in new work, but do not rely on the drenched rendition until it has had a visual pass and `forcedTheme` is lifted.

### Don't:
- **Don't** introduce a serif display face, a rounded corner, a shadow, a gradient, a blur or a glass surface. Each one is the named failure mode of this palette.
- **Don't** spend brass on anything but a call coming due — not on hover, not on a highlight, not on a logo, not on an empty state.
- **Don't** build a card grid. There are no cards in this world; there is a bill and a programme of strips.
- **Don't** use a grey line. Every rule, border and stroke is oxblood at some strength.
- **Don't** add a third rule weight, a new face, or a new stamp colour without deciding what it *means*; every weight and colour in this system carries information.
- **Don't** print a kicker, eyebrow or label line above a headline. The bill opens on the claim.
- **Don't** imply a verdict — no correct/incorrect stamp, no accuracy figure, no score. The vocabulary tops out at "the day arrived".
- **Don't** promise a notification. A scheduled bell may be printed; it must never be described as something that will ring.
