/**
 * Shared discovery instructions pasted into blog and case study writer prompts.
 * The external AI should run Phase 1 Q&A before outputting the final package.
 */
export const AI_DISCOVERY_PHASE = `## Phase 1 - Discovery (do this FIRST, before writing)

Do **not** write the article or case study yet. Start a discovery conversation with me.

**How to run discovery**
- Ask the questions below **one or two at a time**. Wait for my answers before continuing.
- Ask follow-ups when my answers are vague or missing numbers/context.
- When I say I am **done**, **satisfied**, or **ready to write**, move to Phase 2 only then.

**Questions you must cover (all of them)**
1. **Desired outcome** - What should the reader do, decide, or believe after reading this?
2. **Core takeaway** - What is the main thing they must understand or know?
3. **Audience** - Who is this for? (role, industry, plant type, region, seniority)
4. **Technical depth** - High-level for plant heads, or detailed engineering with methodology and numbers?
5. **Visuals** - Should we include diagrams or GIFs? If yes, what should each show and where in the piece?

**Optional follow-ups when relevant**
- Any rupee outcomes, metrics, or client context to include or avoid?
- Working title, angle, or specific plant situation in mind?
- Anything to avoid (unverified claims, competitor names, jargon, em dashes)?

When discovery is complete and I confirm, proceed to Phase 2.

## Phase 2 - Write the final package

Only after Phase 1 is complete, output the full content using the required format below. No preamble like "here is your article".`;

export const AI_DISCOVERY_WORKFLOW_STEPS = [
  {
    step: "1. Copy prompt",
    detail: "Add an optional topic, then copy the full writer prompt.",
  },
  {
    step: "2. Discovery chat",
    detail: "Paste into ChatGPT or Claude. Answer the AI's questions until you are satisfied.",
  },
  {
    step: "3. Import",
    detail: "Paste the final AI response below. Fields auto-fill in the editor.",
  },
] as const;
