# Project Overview

## Purpose

Main marketing website for Stamped Energy, a prescriptive energy intelligence platform for Indian manufacturers.

## System Overview

- Public marketing site built with Next.js App Router
- Landing page communicates prescriptive positioning, verified rupee outcomes, and the Connect-to-Verify workflow
- Separate routes scaffolded for How It Works and Industries
- Blog planned as a separate application with its own admin portal

## High-Level Architecture

```
app/
  layout.tsx          # Root layout, fonts, nav, footer, Lenis
  page.tsx            # Landing page composition
  how-it-works/       # Scaffold page
  industries/         # Scaffold page
  api/contact/        # Discovery call form handler (stub)
components/
  layout/             # Navbar, Footer
  sections/           # Landing page sections (one file per section)
  ui/                 # Shared primitives (Button, Reveal, ContactForm, etc.)
lib/
  content/            # Typed copy and configuration (single edit point for text)
  motion/             # GSAP + Lenis setup
styles/
  theme.css           # SINGLE SOURCE OF TRUTH for all brand colors
```

## Constraints

- Brand and color system: `Deisgn_Stamped_Energy_original.md` (Forge Industrial v2.0)
- All colors must be changed only in `styles/theme.css`
- All copy should be changed in `lib/content/` without touching layout components
- Workflow: see `AGENTS.md` and `.cursor/rules/`
