# Implementation Plan

_Status: approved and in progress (landing page MVP complete)._

## Approved Requirements

- Next.js 15 + TypeScript + Tailwind v4 + GSAP + Lenis
- Landing page only (full build), with How It Works and Industries scaffolds
- Center-aligned hero with gradient/grid placeholder for future video
- Scroll-driven GSAP animations with reduced-motion fallback
- Outcome stats shown as target ranges with disclaimer
- On-page contact form posting to Next.js API route stub
- Centralized theming via `styles/theme.css`
- Content separated into typed `lib/content/` layer

## Architecture Decisions

See `DECISIONS.md`.

## Phase Breakdown

### Phase 1 — Scaffold (complete)

- Next.js project setup, theme tokens, content layer, layout shells, route stubs

### Phase 2 — Motion + Hero (complete)

- Lenis smooth scroll, GSAP registration, Reveal helper, animated hero

### Phase 3 — Trust + Outcomes + Problem (complete)

### Phase 4 — Workflow loop + Prescription (complete)

### Phase 5 — How It Works + Industries + Why Stamped (complete)

### Phase 6 — Future media + CTA + Contact API (complete)

### Phase 7 — QA (partial)

- Build and lint: passed
- Remaining: manual responsive review, reduced-motion check in browser, performance tuning

## Deliverables

- [x] Landing page at `/`
- [x] Navbar with How It Works, Industries, Blog (external)
- [x] Contact form with API stub
- [x] Theme file for one-file color changes
- [x] Content layer for one-file copy changes
- [ ] Hero/product media assets (pending from founder)
- [ ] Full secondary pages

## Risks

- Pinned workflow section may need mobile tuning after real-device testing
- Contact API currently logs only; email integration pending
- Outcome stats are benchmark-derived until customer validation
