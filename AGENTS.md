# Stamped Energy - Agent Instructions

## Project

Main website for Stamped Energy. Design tokens and brand direction live in `docs/design/brand-tokens.md`.

## Workflow Orchestration

Before any task:

1. Follow `planning.mdc` - analyze requirements, create a plan, get approval.
2. Follow `communication.mdc` - surface uncertainty, risks, and tradeoffs explicitly.
3. Follow `documentation.mdc` - keep project docs at the repo root in sync.

During implementation:

4. Apply `execution.mdc` - phase-based work only; preserve architecture.

Before completion:

5. Apply `quality-gates.mdc` - validate, report, update progress.

## Documentation (repo root)

| File | Purpose |
|------|---------|
| `PROJECT_OVERVIEW.md` | Purpose, architecture, constraints |
| `IMPLEMENTATION_PLAN.md` | Approved plan and phases |
| `DECISIONS.md` | Architecture decision log |
| `PROGRESS.md` | Current status and blockers |
| `SEO_GEO_AEO.md` | SEO, GEO, and AEO implementation log and remaining checklist |

## Rule Activation

| Rule | When |
|------|------|
| rule-awareness | Always - load all rules before acting |
| planning, communication, documentation | Always |
| execution | Implementation phases |
| quality-gates | Validation and completion |

If a rule is not auto-loaded, reference it with `@execution` or `@quality-gates` in chat.
