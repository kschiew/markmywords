---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/predictions/page.tsx","components/AppHeader.tsx","features/prediction/CreatePredictionSection.tsx","features/prediction/CreatePredictionModal.tsx","features/prediction/PredictionCard.tsx"]
---

# Surface brief — MarkMyWords app shell

Scope: `app/page.tsx` (home: capture + public feed), `app/predictions/page.tsx` (own record), `components/AppHeader.tsx`, `features/prediction/*`, and the shared token layer in `packages/ui/src/styles/globals.css`.

Visitor mode: Persuade above the fold, Operate below it. A first-timer and a regular land on the same URL: the bill has to make the mechanism obvious in one viewport, and the feed under it has to be a working surface someone reads daily.

Audience: confident opinion-havers who just made a call out loud somewhere else and want a receipt. They arrive with one sentence already in their head.

Action: type one sentence, set when it should come back, mark it. Under ten seconds.

Constraints carried from PRODUCT.md: reminders are stored but never delivered, so no surface may promise a poke. Predictions publish to the public feed immediately; `remindAt` only schedules the author's nudge. Private predictions appear nowhere but their author's page. There is no resolution or scoring — never imply a right/wrong verdict or an accuracy record.

Named failure modes from the user: generic SaaS landing (centered hero, gradient, rounded cards, Inter); anything slow or heavy to use.

## Direction contract

THESIS: A prediction is a booked fight with a date on it — the claim, the caller, and the day it settles, printed at full volume. This surface refuses the arrangement it currently has: a centered hero above a grid of rounded shadcn cards. There is no card grid in this world; there is a bill, and under it a printed programme.

OWN-WORLD: Bone programme stock `#E8E1D2` as the ground everywhere, oxblood `#5C1220` as the heaviest ink, ink black `#121110` for reading, brass `#C8952B` reserved system-wide for one thing only — a prediction coming due — and used nowhere else, ever. Type is fight-bill wood type, never editorial serif: Big Shoulders Display ultra-condensed for bill setting, Archivo for working text, Courier Prime for stamps, dates and tale-of-the-tape figures. Materials are hairline oxblood rules, tale-of-the-tape tables, register marks, and a rubber date stamp. Square corners and flat ink throughout: no shadow, no gradient, no rounded card, no glass.

STORY: The visitor understands within one viewport that this is where you put a claim on the record with a date against it. They believe it because the bill sets their own sentence in wood type as they type it — the mechanism demonstrates itself before they commit. They mark it, and the bill takes a stamp.

FIRST VIEWPORT: Bone ground to the edges. Top left, the wordmark as a stamped oxblood block with nav set as printed furniture on the same rule, not a chrome bar. Centre-left, an oxblood kicker line, then the capture field where the typed sentence sets itself live in Big Shoulders at display scale, filling the bill. Directly beneath, a tale-of-the-tape rule in Courier Prime printing CALLED BY / ON / SETTLES with the date parsed from plain English. The primary action sits at the end of that rule as a solid oxblood block reading MARK IT. Below the fold the ground stays bone and the feed runs as dense programme strips separated by hairline rules, newest on top, each strip carrying its state stamp.

FORM: The fight bill in the Globe Poster tradition, rendered Inverted — bone stock, oxblood ink, brass reserve. Candidate 6 of my grounded list; seed key 449185db, assigned index 6, palette and depth chosen by the user over two follow-up rounds.

Raises carried into the build, each named for the challenger that donated it:
- From the VU-meter bridge: one reserved colour. Brass appears only on a prediction coming due, nowhere else in the system.
- From the starship terminal: a rule-based state vocabulary. Open, coming due, due today, called, and no-bell each get a systematic printed expression — stamp, rule weight, ink — never a grey date string.
- From Versailles: a deliberate scale sequence. The bill is monumental, the programme strips are intimate and dense; density varies on purpose.
- From the wildstyle blackbook: navigation lives inside the typographic composition as printed furniture, not in a chrome bar above it.

Signature interaction: the sentence sets itself in wood type as it is typed, and marking it stamps the bill — a rubber-stamp impression that lands with the date, once, at the moment of commit.

Execution self-check, standing: the user knowingly chose the palette closest to the look models default to. Bone plus a deep red becomes the generic AI page the moment it is set in an elegant high-contrast serif with soft edges and generous air. It stays a fight bill by being hard, condensed, ruled, and printed. Any serif display, any rounded corner, any shadow, any gradient in this build is the failure the risk line named.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Publish-vs-remind copy in the create modal currently lies; it is corrected in this build to describe immediate publication plus a private nudge.
- Reminder delivery does not exist. The bill may show a scheduled bell but must not promise it will ring.
