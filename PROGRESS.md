# Progress

## Current Phase

Multi-vertical industries expansion — complete (2026-06-08)

## Completed Phases

- [x] Project rules created (`.cursor/rules/`)
- [x] Documentation stubs created
- [x] `AGENTS.md` orchestration added
- [x] Site architecture and tech stack defined
- [x] Next.js 15 + Tailwind v4 + GSAP + Lenis scaffold
- [x] Centralized theme tokens (`styles/theme.css`)
- [x] Typed content layer (`lib/content/`)
- [x] Landing page sections implemented
- [x] `/how-it-works` and `/industries` route scaffolds
- [x] Contact form + `/api/contact` stub route
- [x] Production build and lint validation
- [x] GSAP + ScrollTrigger + Lenis motion provider (replaced Framer Motion)
- [x] Full `/how-it-works` page - pinned journey, intelligence stack, prescription scrub, integrations, deployment timeline
- [x] How It Works opening Option C - interactive plant SLD diagram, Greenovative-aligned hero copy, core capabilities strip
- [x] How It Works visual pass - shortened copy, diagram-first journey, chip labels, removed optional media text block
- [x] Core capabilities - Greenovative-style visual cards (SVG animations + full copy, 2×2 grid; `mediaSrc` hook for custom assets)
- [x] SEO/AEO — page titles, meta descriptions, canonical/OG/Twitter on all routes
- [x] SEO/AEO — JSON-LD (Organization, WebSite, FAQ, HowTo, Article, Breadcrumb, Person, Speakable)
- [x] SEO/AEO — dynamic sitemap priorities, robots.ts (AI + search crawlers welcome), `og-default.png`, internal linking, heading/AEO pass
- [x] SEO/AEO — `llms.txt` for AI answer-engine discovery (not linked in UI)
- [x] SEO validation (Section 15): Rich Results Test, Schema.org validator, HTTP 200s, sitemap + robots.txt live on production
- [x] Entity establishment (Section 12): Google Search Console verified, sitemap submitted
- [x] `SEO_GEO_AEO.md` — living SEO/GEO/AEO documentation and remaining checklist
- [x] **Multi-vertical industries** — `VerticalPageContent` model, `icp.ts`, five vertical pages (automotive, cement, steel, pharma, chemical)
- [x] **Generic vertical components** — `components/industries/vertical/*`, `IndustryVerticalPage` shell
- [x] **Dynamic route** — `app/industries/[slug]/page.tsx` with static params, per-vertical SEO + FAQ schema
- [x] **ICP copy refresh** — homepage hero, hub, landing industries tiles, `site.ts` description
- [x] **Scenario shuffle** — `scenarios.ts` (cement prescription, pharma before/after, neutral hero callouts)
- [x] **SEO/docs** — sitemap, `PAGE_SEO`, `llms.txt`, placeholder industry images, ADR-006

## Remaining Phases

See **`SEO_GEO_AEO.md` → Remaining & ongoing maintenance** for the full list. Highlights:

- [ ] **Google Business Profile** (Section 12 #3)
- [ ] **LinkedIn Company Page** (Section 12 #4) — then update Organization schema `sameAs`
- [ ] **Wikidata entry** for Stamped Energy (Section 12 #5)
- [ ] Replace placeholder industry hero images (cement, steel, pharma, chemical photo shoot)
- [ ] Custom plant node icons or isometric SLD art (optional polish for interactive diagram)
- [ ] Dashboard walkthrough video / live embed for prescription section
- [ ] Landing workflow loop GIF/WebM (`landing.ts` → `workflow.media.src`)
- [ ] Per-vertical blog posts (content roadmap P2)
- [ ] Real case studies for cement/steel/pharma/chemical (Phase 3 in strategy doc)
- [ ] Blog app (separate deployment + admin portal)
- [ ] Contact form email/CRM forwarding
- [ ] Customer logos, case studies, testimonials

## Active Blockers

None.
