# Progress Log

**For whoever tutors the next session, whichever model it is:**
- Read `CURRICULUM.md` §1–5 before each session.
- Start every session with the recall test of the previous boxed result.
- Keep the running world, the datasets (§5) and the notation fixed.
- Maths is just in time, via Math Boxes (§3). Never teach maths ahead of the lesson that needs it.
- Each Part's Investigation: get the learner's written prediction *before* working it out, and log it below.
- Update this file at the end of every session.

## Current position

**Lesson 1.3 (fast track).** 1.1 and 1.2 are done. Parts 1–3 run as a fast verification pass: one check problem per lesson, and we slow down only where something is new or a check fails.

## Learner profile

- **Goal:** researcher-level intuition; aiming to work at a frontier AI lab. Transformers in depth are a primary goal.
- **Constraints:**
  - no code written; pen and paper only;
  - maths just in time; "implement" = apply by hand;
  - easy numbers;
  - plain-English and implementation meaning for every symbol;
  - one running world throughout;
  - no flattery;
  - no rabbit holes.
- **Maths background:** says they know end-to-end backprop through multiple layers (2026-10-13). Verify this through the check problems, not by assuming it.
- **Style notes from 1.1–1.2:**
  - The first 1.1 was too dense: a table of 5 symbol cards at once. Introduce notation one piece at a time.
  - The plain-English rewrite then over-corrected into something too basic, which the learner found confusing. Pitch at the level of someone who knows backprop, using compact standard notation.

## Decisions

| ID | Question | Status | Choice |
|---|---|---|---|
| D1 | Running world | adopted (no objection raised) | toy self-driving car, all datasets linked (§5) |
| D2 | Transformers | **decided by the learner** | mandatory, research depth → Part 8 |
| D3 | Part 7: no code at all, or may the learner *read* a few lines? | default | no code at all |
| D4 | Is the learner reading Weidman's book alongside? | pending | — |
| D5 | Maths policy | **decided by the learner** | just in time; Part 0 removed; upfront diagnostic dropped |

## Math Toolbox progress

| Box | Status | Notes |
|---|---|---|
| MB1–MB25 | not started | (fill in as each box fires: skipped-known / taught / shaky) |

## Investigations: prediction vs outcome

| Part | Investigation | Learner's prediction (written first) | Outcome | Lesson learned |
|---|---|---|---|---|
| P1 | Straight line at speed 3? | — | — | — |
| P2 | Minimum hidden units for the interaction? | — | — | — |
| P3 | Does a second hidden layer help on v0? | — | — | — |
| P4 | All-zero initialisation? | — | — | — |
| P5 | Dense vs conv vs conv+pool on the left-column pedestrian? | — | — | — |
| P6 | Gradient decay vs distance k? | — | — | — |
| P7 | Does the autoencoder rediscover (h, w)? | — | — | — |
| P8 | Attention finds the latest light? Induction? | — | — | — |
| P9 | What does a red-light-only reward produce? | — | — | — |

## Open Questions log

| ID | Question | Opened | Closed in |
|---|---|---|---|
| OQ1 | Why *squared* error? | 1.3 (planned) | 4.2 |
| OQ2 | Can the car use a light seen k steps ago without k multiplications, and without step-by-step processing? | 6.5 (planned) | Part 8 |

## Weak spots / recurring errors

(none yet)

## Session log

| # | Date | Lesson | Boxed result | Recall test | Notes |
|---|---|---|---|---|---|
| 0 | 2026-10-12 | Planning v1 | — | — | Curriculum drafted; gaps researched |
| 0b | 2026-10-12 | Planning v2 | — | — | Just-in-time maths; Transformers Part 8 (mandatory); trip-log dataset; RLHF 9.5 |
| 0c | 2026-10-12 | Planning v3 | — | — | Audit vs criteria: linked world, all datasets fixed, Investigations, spaced recall, forward-then-backprop explicit, pooling made D |
| 1 | 2026-10-13 | 1.1, 1.2 | supervised learning = learn a rule from (x, y) to guess y for new x; model = family of rules, parameters pick one | — | Key point: identical x with different y ⇒ irreducible error from missing features. Learner skipped the notation drills. Level recalibrated: knows backprop. |
