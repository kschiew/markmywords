# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: confident opinion-havers — people who make bold calls out loud (group chats, work, sports, markets, tech, life) and want receipts when the moment arrives. They reach for MarkMyWords immediately after making a call in some other conversation, with roughly one sentence in their head and no appetite for a form.

The audience is social and playful rather than professional-analytical. Deliberate calibration-tracking by forecasters, analysts, or traders was explicitly considered and is not the primary audience.

## Product Purpose

Let someone stake a claim about the future in one line, put a public timestamp on it, and have that claim come back to them at the moment it can finally be judged.

Success is that a prediction is captured in seconds, survives untouched until its moment, and returns to its author (and to a public record) when that moment arrives.

## Positioning

Three mechanisms, confirmed as core, that a neighboring product could not truthfully copy together:

1. **The reminder boomerang** — the author chooses when to be poked, and the prediction is brought back to them at that time. This is the lead claim, not a feature; current hero copy says "Call it. Nail it. We'll poke you when the moment comes."
2. **Public timestamped receipts** — predictions are public by default on a shared feed, creating social accountability and a verifiable "I called it first" record.
3. **Frictionless capture** — one line of natural language, including a plain-English reminder time ("in two days"), and it's marked.

Explicitly **not** core: resolving predictions right/wrong and rolling them into a personal accuracy score. Scoring was offered and not chosen; do not design the product around a track record or leaderboard unless the user later adds it.

## Operating Context

The call is made somewhere else — a group chat, a thread, a meeting, a comment section. MarkMyWords is the fast side-step out of that conversation: arrive, type the claim, pick when it should come back, leave. The visit is short and often mobile-adjacent in spirit even though the product is web.

The second context is the return: the author is pulled back by the reminder at the moment the claim is testable, in a different mood — curiosity or reckoning — rather than the confidence of the original moment.

The third is browsing: the public feed is read by others as a stream of other people's stakes.

## Capabilities and Constraints

Built today:

- Create a prediction: free-text content, a `remindAt` date parsed from natural language (`chrono-node`) or picked from a calendar, a "don't remind me" switch, and a private/public switch.
- Public home feed of all non-private predictions, with author display name and creation date.
- "My Predictions" page listing the signed-in user's own predictions (public and private).
- Auth via Clerk; a user row is upserted from the Clerk session. Users without a name default to the display name "Unknown Jedi".

Technical constraints (current state, not a commitment): Next.js 15 App Router + React 19, TypeScript, tRPC + React Query, Drizzle ORM on PostgreSQL, Clerk, Tailwind + shadcn/ui shared through `packages/ui`, Turborepo/pnpm monorepo.

Open / undecided — do not present these as working:

- **Reminders are stored but never delivered.** `remindAt` is persisted and echoed in the UI; there is no email, push, scheduler, or job anywhere in the codebase. The product's headline mechanism is not yet implemented.
- Predictions cannot be edited, deleted, or resolved after creation.
- No profiles, follows, comments, reactions, or per-author pages.
- The modal copy says "Your post will be published on {remindAt}" while the router publishes immediately — the intended publish-vs-remind semantics are unresolved and must be settled before copy is treated as truth.

## Brand Commitments

None are binding. The user confirmed that the current look, wordmark, and copy are a starting sketch that future work is free to replace.

For reference only, the incumbent sketch: the name "markmywords"; a lowercase text wordmark at `public/images/logo.svg` set in mixed weights (mark / my / words); default shadcn neutral tokens with no brand color; Geist Sans and Geist Mono; a light, playful voice ("Call it. Nail it.", "Unknown Jedi"). Treat all of it as evidence, not as a constraint.

## Evidence on Hand

- `apps/web/public/images/logo.svg` — the existing wordmark, `currentColor`, tintable.
- Sample prediction copy already written into the capture input: "Lewis Hamilton will win Drivers Championship in 2026", "The housing market is going to crash in 5 years", "My first kid will be a daughter".

Absences future work must not fabricate: there are no users, no usage or accuracy statistics, no testimonials, no customer names, no press, no pricing, no photography or illustration assets, and no launch date. No claim about how many predictions exist or how often people are right may be invented.

## Product Principles

1. **The one line is the front door.** Capture must stay to a single sentence plus a when; anything that turns marking a prediction into filling a form is a regression.
2. **The prediction's words are the artifact.** The user's sentence is the content the interface exists to hold — it should be treated as quotable, ownable, and legible, never as a row in a list.
3. **Time is the second subject.** Every prediction carries a moment it points at. When that moment is is as much a part of the object as what was said.
4. **Public by consent, private without leaks.** The feed's value is social exposure, but the privacy choice is per-prediction and absolute: a private prediction appears nowhere but its author's own page.
5. **Don't promise what doesn't fire.** While reminders are unimplemented, no surface may imply a poke that will never arrive.
