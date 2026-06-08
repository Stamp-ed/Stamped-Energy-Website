# Decisions

Architecture and workflow decisions for this project.

---

## ADR-001: Cursor workflow rules

**Date:** 2026-06-08

**Context:** Need a disciplined, phase-based AI development workflow for this repository.

**Alternatives:**

1. Single monolithic `.cursorrules` file
2. Modular `.cursor/rules/*.mdc` with scoped activation
3. `AGENTS.md` only

**Selected:** Modular `.mdc` rules + `AGENTS.md` orchestration.

**Rationale:** `.mdc` supports `alwaysApply` and intelligent activation; rules are version-controlled and shareable; `AGENTS.md` provides a single entry point without extra token cost.

---

## ADR-002: Centralized theme and content layers

**Date:** 2026-06-08

**Context:** Founder requires easy re-theming and maintainable edits for both humans and AI agents.

**Alternatives:**

1. Hardcode colors and copy in components
2. Tailwind config-only tokens without a dedicated theme file
3. `styles/theme.css` for colors + `lib/content/` for copy

**Selected:** `styles/theme.css` (all brand colors as CSS variables) + `lib/content/` (typed site and landing content).

**Rationale:** Re-theming is a one-file edit; copy changes do not require touching layout or animation code; strict separation improves maintainability and reduces regression risk.

---

## ADR-003: Frontend stack for marketing site

**Date:** 2026-06-08

**Context:** Need a premium industrial SaaS landing page with scroll-driven animation.

**Alternatives:**

1. Next.js + Framer Motion only
2. Next.js + GSAP + Lenis
3. Static HTML/CSS

**Selected:** Next.js 15 App Router + TypeScript + Tailwind v4 + GSAP/ScrollTrigger + Lenis.

**Rationale:** Matches approved plan and competitor-quality scroll storytelling; GSAP gives precise pinned/scrub control; Lenis provides premium smooth scroll; Next.js supports API route for contact form.
