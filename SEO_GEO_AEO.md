# SEO, GEO & AEO — Stamped Energy (`stamped.work`)

Living record of search, generative-engine, and answer-engine optimizations for the marketing site.  
**Last updated:** 2026-06-08 · **Domain:** `https://stamped.work`

---

## Purpose

| Discipline | Goal |
|------------|------|
| **SEO** | Rank for brand and category queries in Google/Bing |
| **AEO** | Be cited as the authoritative answer in AI assistants (ChatGPT, Perplexity, Google AI Overviews) |
| **GEO** | Establish **Stamped Energy** as a recognizable entity across the web (schema, profiles, Wikidata) |

**Primary audience:** Plant directors, VP Operations, electrical heads, and CFOs at Indian manufacturers (₹200 Cr+ revenue, ₹20–30 lakh+ monthly electricity bills). Verticals: cement, steel, pharmaceutical, chemical, automotive.

**Priority keywords (in order):**

1. `stamped energy` (brand — must dominate)
2. `prescriptive energy intelligence India`
3. `energy management software for manufacturers India`
4. `reduce electricity bill manufacturing India`
5. `maximum demand reduction India`
6. `cement plant energy management India`
7. `steel plant energy efficiency India`
8. `pharmaceutical plant HVAC energy savings`
9. `batch process energy optimization India`
10. `DISCOM bill savings India`
11. `SEC reduction manufacturing India`

---

## Code architecture

All SEO logic lives under `lib/seo/` and is applied in App Router `page.tsx` / `layout.tsx` files. **No SEO config in UI components** except content classes (e.g. `.hero-headline` for Speakable schema).

| File | Responsibility |
|------|----------------|
| `lib/seo/pages.ts` | Canonical **title tags** and **meta descriptions** for static routes |
| `lib/seo/metadata.ts` | `buildPageMetadata()`, `buildPageMetadataFromConfig()`, OG/Twitter, canonical, `en-IN` geo tags |
| `lib/seo/constants.ts` | `SITE_URL`, default OG image, organization/website `@id`s |
| `lib/seo/schemas.ts` | JSON-LD objects (Organization, FAQ, HowTo, Article, Person, etc.) |
| `lib/seo/breadcrumbs.ts` | `generateBreadcrumbSchema()` helper |
| `lib/seo/crawlers.ts` | Search + AI crawler allow-list for `robots.ts` |
| `components/seo/JsonLd.tsx` | Renders `<script type="application/ld+json">` |
| `app/robots.ts` | Dynamic `/robots.txt` (replaces static `public/robots.txt`) |
| `app/sitemap.ts` | Dynamic `/sitemap.xml` (static routes + blog + case studies) |
| `lib/seo/extract-faq.ts` | Auto-extract FAQ JSON-LD from blog/case study headings ending with `?` |
| `app/llms-full.txt/route.ts` | Dynamic CMS index for AI crawlers (all posts + case studies) |
| `public/llms.txt` | Static site guide for AI crawlers (**not linked in UI**) |
| `public/og-default.png` | Default Open Graph image (1200×630) |

**Environment:** Set `NEXT_PUBLIC_SITE_URL=https://stamped.work` in production so canonicals, OG URLs, and schema `@id`s resolve correctly.

---

## Completed — technical SEO

### Metadata (Sections 1–2)

Every public route has spec-aligned **title**, **meta description**, **canonical URL**, **Open Graph**, and **Twitter Card** tags.

| Route | Title source |
|-------|----------------|
| `/` | `PAGE_SEO.home` |
| `/how-it-works` | `PAGE_SEO.howItWorks` |
| `/about` | `PAGE_SEO.about` |
| `/blog` | `PAGE_SEO.blog` |
| `/case-studies` | `PAGE_SEO.caseStudies` |
| `/contact` | `PAGE_SEO.contact` |
| `/industries` | `PAGE_SEO.industries` |
| `/industries/automotive` | `PAGE_SEO.industriesAutomotive` |
| `/blog/[slug]` | `{Post Title} \| Stamped Energy` |
| `/case-studies/[slug]` | `{Title} — Case Study \| Stamped Energy` |

Blog posts also emit `article` Open Graph with `publishedTime`, `modifiedTime`, `authors`, and `tags`.

### Global metadata defaults (root layout)

- **`SEO_KEYWORDS`** — priority keywords on all static pages via `buildPageMetadataFromConfig()`
- **`robots`** — `index, follow` with `googleBot` `max-image-preview: large`, `max-snippet: -1`
- **Default OG/Twitter** — fallback images on all pages via `siteMetadataBase`
- **`app/not-found.tsx`** — `noindex, nofollow` for 404 pages

### Region & language (Section 14)

- `<html lang="en-IN">` in root layout
- Metadata `other` fields: `geo.region: IN`, `geo.placename: India`, `content-language: en-IN`
- Open Graph `locale: en_IN`

### Crawling & discovery

- **`app/robots.ts`** — welcomes `*` plus named **search crawlers** (Googlebot, Bingbot, etc.) and **AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, and others). Only blocks `/blog/admin`, `/api/`, `/_next/`.
- **`app/sitemap.ts`** — dynamic sitemap with route priorities (`/` = 1.0, `/how-it-works` & `/industries/automotive` = 0.9, etc.) plus all published blog posts and case studies.
- **`public/llms.txt`** — site summary, core page links, keywords, audience, and crawling policy for AI systems. Served at `/llms.txt`; intentionally **not linked anywhere in the UI**.
- **`/llms-full.txt`** — auto-generated CMS index (all blog posts + case studies); linked from `llms.txt` only, not in UI.
- Static `public/robots.txt` **removed** so `app/robots.ts` is the single source of truth (Next.js ignores `robots.ts` when a static file exists).

### Admin & non-public routes

All `/blog/admin/*` pages export `robots: { index: false, follow: false }`.

### Default OG image (Section 9)

- `public/og-default.png` — used when a page has no custom cover image
- Referenced in `buildPageMetadata()` with width, height, and alt text

---

## Completed — structured data / JSON-LD (Section 7)

| Schema | Where | Purpose |
|--------|-------|---------|
| **Organization** | `app/layout.tsx` (every page) | Brand entity, logo, `contactPoint`, `knowsAbout`, founder LinkedIn `sameAs` |
| **SoftwareApplication** | Homepage | Product entity for energy intelligence software |
| **WebSite** + SearchAction | Homepage | Site entity; blog search template |
| **FAQPage** | Homepage | 5 product FAQs for rich results / AI extraction |
| **FAQPage** | `/industries/automotive` | 3 industry FAQs |
| **FAQPage** | Blog/case study posts (auto) | Extracted from `?`-ending H2/H3 headings in content |
| **HowTo** (5 steps) | `/how-it-works` | Workflow with `#connect` … `#verify` anchors |
| **ContactPage** | `/contact` | Contact/discovery call page entity |
| **CollectionPage** | `/blog`, `/case-studies` | Listing pages for crawlers |
| **Person** × 2 | `/about` | Vinayak Raizada, Utso Sarkar (IIT Roorkee alumni) |
| **Article** | Each `/blog/[slug]` | Headline, dates, author, publisher with logo, keywords |
| **Article** | Each `/case-studies/[slug]` | Case study with industry/category keywords |
| **SpeakableSpecification** | Homepage | CSS selectors: `.hero-headline`, `.value-proposition`, `.key-numbers` |
| **SpeakableSpecification** | Each blog post | `.blog-article-prose h1`, `.blog-article-prose p` |
| **BreadcrumbList** | All non-homepage routes | Home → section → page |

---

## Completed — content & AEO (Sections 8, 10, 11, 13)

### Heading & snippet targeting

- **Homepage H1** — single `<h1>`: “Energy decisions. Verified savings. Built for manufacturers.” + `sr-only` keyword span
- **Homepage H2** — “The Stamped Energy Loop” (was generic five-step title)
- **How It Works** — definition paragraph under H1 (“what is prescriptive energy intelligence”); sr-only AEO question headings; step anchor IDs (`#connect`, `#observe`, `#decide`, `#execute`, `#verify`)
- **Automotive** — sr-only FAQ-style H2/H3 headings; inline blog links on die casting and heat treatment segments

### Internal linking (Section 10)

- **Homepage / resources section** — descriptive “Read: …” anchor text (not “Read more →”)
- **Blog posts** — “Related Articles” footer: related posts + `/industries/automotive#die-casting` + `/how-it-works`
- **Industry segments** — `relatedArticle` links in content for die casting and heat treatment

### Image alt text (Section 13)

Updated alts on hero isometric, die casting, forging, heat treatment, rubber moulding, founder photo, and resource cards — keyword-aware where natural.

---

## Entity establishment & validation (Sections 12 & 15)

### Done (manual + technical)

| # | Item | Status |
|---|------|--------|
| 1 | Google Search Console — property verified | **Done** |
| 2 | Sitemap submitted (`https://stamped.work/sitemap.xml`) | **Done** |
| 6 | Rich Results Test — Homepage FAQ, Blog Article, HowTo, BreadcrumbList | **Done** |
| 7 | Schema.org validator — Organization, Person | **Done** |
| 8 | All public pages return HTTP 200 | **Done** |
| 9 | `/sitemap.xml` accessible | **Done** |
| 10 | `/robots.txt` accessible | **Done** |

### Not done yet — Section 12 entity establishment

These are **manual, off-site** steps. Required for the `stamped energy` brand query to dominate and for GEO/AEO entity recognition.

| # | Item | Status | How to complete |
|---|------|--------|-----------------|
| 3 | **Google Business Profile** | **Not done** | [business.google.com](https://business.google.com) — category: Software Company or Energy Consultant; founding location: IIT Roorkee, Roorkee, Uttarakhand; website: `https://stamped.work` |
| 4 | **LinkedIn Company Page** | **Not done** | Create **Stamped Energy** company page (separate from founder profiles). Then add URL to `sameAs` in `lib/seo/schemas.ts` and link from About page |
| 5 | **Wikidata entry** | **Not done** | [wikidata.org](https://www.wikidata.org) — minimal item: name, website, instance of software company, country India, founded 2025, IIT Roorkee founding location |

**After completing #4:** update Organization schema:

```ts
// lib/seo/schemas.ts → organizationSchema.sameAs
sameAs: [
  "https://www.linkedin.com/in/vinayak-rz/",
  "https://www.linkedin.com/in/utso/",
  "https://www.linkedin.com/company/stamped-energy", // add actual URL
],
```

---

## Remaining & ongoing maintenance

### High priority (SEO/AEO / GEO impact)

| Item | Notes | Owner |
|------|-------|-------|
| **Google Business Profile** (Section 12 #3) | Not created yet — see entity table above | Marketing |
| **LinkedIn Company Page** (Section 12 #4) | Not created yet — then update `sameAs` in schema + About page link | Marketing + Dev |
| **Wikidata entry** (Section 12 #5) | Not created yet — helps AI engines recognize brand entity | Marketing |
| **Add LinkedIn Company URL to Organization schema** | Blocked until company page exists; update `lib/seo/schemas.ts` | Dev |
| **OG image QA on social platforms** | Run [Twitter Card Validator](https://cards-dev.twitter.com/validator) and [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) on homepage + a blog post after each deploy | Marketing |
| **GSC monitoring** | Watch Coverage, Core Web Vitals, and AI Overview impressions weekly for 4–8 weeks post-launch | Marketing |
| **Blog FAQ content** | Use `## Question ending with?` headings in posts to trigger auto FAQ schema (already wired) | Content |

### Medium priority (content & coverage)

| Item | Notes |
|------|-------|
| **Forging blog post** | Spec references forging industry → blog link; write post and add `relatedArticle` on forging segment |
| **Custom OG images per major page** | Replace `og-default.png` on homepage, how-it-works, automotive with branded 1200×630 assets |
| **Heading audit on remaining pages** | Verify single H1 and no skipped levels on `/about`, `/case-studies`, `/blog` listing |

### Low priority / periodic

| Item | Notes |
|------|-------|
| **Refresh `llms.txt`** | When new industry verticals or major pages ship |
| **Sitemap `lastModified`** | Already dynamic for blog/case studies; static routes use build time |
| **New AI crawler user-agents** | Add to `AI_CRAWLERS` in `lib/seo/crawlers.ts` as the landscape evolves |
| **AEO mention tracking** | Periodically search brand in ChatGPT, Perplexity, Google AI Overviews |
| **Wikidata / GBP sync** | After GBP and Wikidata exist — keep name, URL, location aligned with Organization schema |

### Not in scope (site features, not SEO blockers)

- Contact form email/CRM forwarding  
- Separate admin subdomain hardening  
- Customer logos / testimonial section  
- Full non-automotive industry pages  

---

## How to update when adding content

### New static page

1. Add entry to `lib/seo/pages.ts` (`absoluteTitle`, `description`, `path`).
2. In the route's `page.tsx`:
   ```ts
   export const metadata = buildPageMetadataFromConfig(PAGE_SEO.myPage);
   ```
3. Add `<JsonLd data={breadcrumbSchema} />` and any page-specific schema.
4. Add path to `STATIC_PATHS` and `STATIC_PRIORITIES` in `app/sitemap.ts`.
5. Add link + one-line description to `public/llms.txt` (Core pages section).

### New blog post

- Title format is automatic: `{title} | Stamped Energy`.
- Article + Speakable + Breadcrumb JSON-LD are automatic via `app/blog/[slug]/page.tsx`.
- **FAQ schema** auto-generated when post uses H2/H3 headings ending with `?` followed by answer paragraphs.
- Sitemap and `/llms-full.txt` pick up published posts automatically.
- Consider adding to a related post's footer or an industry segment's `relatedArticle`.

### New case study

- Title format: `{title} — Case Study | Stamped Energy`.
- Article + Breadcrumb + optional FAQ JSON-LD are automatic via `app/case-studies/[slug]/page.tsx`.

### New industry vertical

- Add `PAGE_SEO` entry, page metadata, FAQ schema if applicable, segment blog links, and sitemap path.

---

## Validation checklist (run after major SEO changes)

- [ ] `npm run build` passes
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) on homepage + one blog post + `/how-it-works`
- [ ] [Schema validator](https://validator.schema.org) on Organization + one Article
- [ ] `https://stamped.work/robots.txt` — AI bots listed with `Allow: /`
- [ ] `https://stamped.work/sitemap.xml` — new URLs present
- [ ] `https://stamped.work/llms.txt` — updated if static pages added
- [ ] `https://stamped.work/llms-full.txt` — lists all published posts and case studies
- [ ] No duplicate H1s; canonical URLs match production (no trailing-slash mismatch)
- [ ] Resubmit sitemap in GSC if URL count changed significantly

---

## Git history (SEO-related commits)

| Commit | Summary |
|--------|---------|
| `0b6a98d` | Full SEO/AEO metadata, JSON-LD, content optimizations, `og-default.png` |
| `07c5f75` | AI + search crawler welcome policy, `llms.txt`, removed static `robots.txt` |
| *(this commit)* | Phase 2: FAQ auto-extract, case study Article, llms-full.txt, SoftwareApplication, global robots/keywords |

---

## Related docs

- `PROGRESS.md` — high-level project phase tracking  
- `DECISIONS.md` — architecture decisions (add ADR when SEO strategy changes)  
- Original engineering spec — pasted in Cursor chat (Sections 1–15)

**Maintenance rule:** Update this file whenever SEO, GEO, or AEO implementation changes — new pages, schema types, crawler policy, or completed manual validation steps.
