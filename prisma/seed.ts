import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { caseStudiesContent } from "../lib/content/caseStudies";
import { markdownToBodyJson, staticSectionsToRichDoc } from "../lib/case-studies/studies";
import { markdownToRichDoc, parseRichDoc, richDocToPlainText, serializeRichDoc } from "../lib/rich-content/document";

const prisma = new PrismaClient();

const SAMPLE_POSTS = [
  {
    title: "Why shift-start kills die casting margins",
    slug: "why-shift-start-kills-die-casting-margins",
    excerpt:
      "Furnace pre-heat overlap, holding loads, and the MD spike your incomer meter sees every morning, quantified in rupees.",
    category: "plant-intelligence",
    tags: ["die casting", "maximum demand", "shift planning"],
    featured: true,
    coverImage: "/industries/die-casting.jpeg",
    content: `## The invisible morning spike

Every die casting plant knows the rhythm: furnaces ramp, compressors kick in, and the incomer meter registers a spike before the first pour. What plant heads rarely see is how much of that spike is **avoidable overlap**, not production demand.

## What the data shows

Across automotive-adjacent die casting units we've studied, **15–22% of billed maximum demand** traces to the first 30–40 minutes of shift start. The pattern is predictable:

- Three furnaces pre-heating simultaneously
- Holding compressors running before moulds are staged
- Quench and utility loads starting on a fixed clock, not production schedule

## From observation to prescription

The fix isn't a capital project. It's sequencing:

1. **Map ramp curves** against actual pour timestamps from MES or manual logs
2. **Stagger pre-heat windows** by 8–12 minutes per furnace
3. **Alert supervisors** when holding load exceeds baseline with zero scheduled pours

Prescriptions in rupees, "stagger Furnace 2 by 10 minutes, save ₹1.2L/month in demand charges", change behaviour faster than kWh dashboards.

## What to measure next week

- Incomer kW at 15-minute intervals for first hour of each shift
- Furnace ramp start times vs first pour time
- Compressor run hours before first production signal

If shift-start overlap exceeds 20 minutes daily, you're likely leaving **₹4–8L/month** on the table at typical HT tariff bands.

## Bottom line

Shift-start isn't an operations nuisance. It's a **margin lever** hiding in your incomer data. Quantify it before the next tariff revision makes it expensive to ignore.`,
  },
  {
    title: "Weekend furnace holding: the silent cost in heat treatment",
    slug: "weekend-furnace-holding-silent-cost",
    excerpt:
      "Batch furnaces held temperature over empty weekends, 15–25% of furnace energy with no parts scheduled.",
    category: "cost-optimization",
    tags: ["heat treatment", "furnace", "non-production energy"],
    featured: true,
    coverImage: "/industries/heat-treatment.webp",
    content: `## Holding temperature with nothing to hold

Heat treatment shops run batch furnaces like insurance policies: keep soak temperature through the weekend so Monday doesn't start cold. The logic is sound until you check the production calendar.

In plants we've baselined, **40% of weekends had zero batches scheduled**, yet furnaces maintained full holding load for 48+ hours.

## The rupee math

Furnace holding isn't free. For a typical batch shop with three furnaces:

- Holding load: 60–120 kW per furnace
- Weekend hours without batches: 36–48 hours
- At ₹8–12/kWh blended rate: **₹3–6L/month** in pure waste

That's not maintenance. That's margin walking out the exhaust.

## Safe ramp-down prescriptions

The objection is always Monday morning: "We can't afford a 4-hour re-heat."

The answer is **calendar-linked prescriptions**:

1. Correlate furnace registers with confirmed batch schedules 36 hours out
2. Ramp down when no batches are scheduled before Sunday 18:00
3. Pre-heat Monday timed to **first confirmed batch**, not fixed 06:00 clock

Plants that adopt this pattern see **60% reduction in weekend holding hours** without missing Monday dispatches.

## Verify on the bill

Track non-production furnace kWh week-over-week. IPMVP-style comparison against the same weeks prior year (adjusted for production volume) gives plant heads a number the CFO will believe.

## Takeaway

Weekend holding is a habit, not a requirement. Your production calendar already knows when it's waste, your energy layer should too.`,
  },
  {
    title: "2025 energy reality check for Indian manufacturers",
    slug: "2025-energy-reality-check-indian-manufacturers",
    excerpt:
      "Tariffs, demand charges, and SEC pressure are reshaping unit economics. What plant heads should plan for in 2026.",
    category: "energy-strategy",
    tags: ["tariffs", "SEC", "manufacturing economics"],
    featured: true,
    coverImage: "/industries/forging.jpg",
    content: `## Energy is a unit economics problem again

For a decade, many SME manufacturers treated electricity as a fixed overhead, negotiated annually, allocated per unit, rarely optimised shift-by-shift. **2025 changed that.**

Three forces converged:

1. **Tariff volatility**, HT industrial bands shifting faster than annual budgets
2. **Demand charge weight**, MD penalties growing as a share of total bill
3. **Customer SEC asks**, OEM sustainability questionnaires hitting Tier-2 suppliers

## What changed on the plant floor

Plants that only had a monthly bill now face weekly questions:

- Why did SEC spike on night shift Tuesday?
- Which line drove the MD breach?
- What's the rupee impact of holding loads with no production?

Dashboards that answer in kWh don't survive these questions. **Prescriptions in rupees do.**

## The 2026 playbook

Leading plants are moving to three capabilities:

| Capability | Outcome |
|------------|---------|
| SEC baseline by SKU/shift | Know normal before chasing savings |
| MD forecasting | Avoid surprises on the bill |
| Prescription tracking | Potential vs realised savings weekly |

Software-only deployment, incomer meter + existing PLC data, gets you there without capex.

## Boardroom translation

Energy efficiency isn't a sustainability slide. It's **margin per unit**:

- 12–20% electricity cost reduction typical for process-intensive SMEs
- 3–6 month platform payback at reference benchmarks
- Verified on the next bill, not in a consultant report

## Closing thought

2026 belongs to manufacturers who treat energy as **operational intelligence**, not utility administration. The data already exists in your plant. The gap is prescriptions your team can execute.`,
  },
  {
    title: "From metering to prescriptions: the intelligence gap",
    slug: "from-metering-to-prescriptions-intelligence-gap",
    excerpt:
      "Most plants have meters. Few have intelligence that tells a shift supervisor what to do tomorrow morning.",
    category: "ai-manufacturing",
    tags: ["prescriptive AI", "metering", "SME manufacturing"],
    featured: false,
    coverImage: "/industries/rubber-moulding.jpg",
    content: `## Data abundance, action scarcity

Walk into any auto component plant and you'll find meters, SCADA screens, and monthly Excel exports. Ask the plant head what to change tomorrow to save ₹50,000 this month, silence.

The gap isn't data collection. It's **translation to action**.

## Three layers that matter

1. **Connect**, incomer, compressors, furnaces, bills in one model
2. **Observe**, SEC, MD, and non-production load baselined by shift
3. **Prescribe**, ranked actions in rupees with payback days

Analytics that stop at layer 2 are expensive wallpaper. Layer 3 is where payback lives.

## Why SMEs can move faster than conglomerates

Enterprise EMS deployments take 18 months and six consultants. An SME with one incomer and three problem assets can pilot in **2–3 weeks**:

- Week 1: connect data
- Week 2: baseline
- Week 3: first prescriptions verified against meter trend

Speed is the advantage. Use it.

## Start here

Pick one asset class, compressors, furnaces, or shift-start MD. Baseline it for 30 days. Issue three prescriptions. Verify on the bill.

That's the intelligence gap closing in practice, not theory.`,
  },
] as const;

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@stampedenergy.com";
  const password = process.env.ADMIN_PASSWORD ?? "StampedAdmin2026!";
  const name = process.env.ADMIN_NAME ?? "Stamped Admin";

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name },
  });

  for (const sample of SAMPLE_POSTS) {
    const bodyJson = markdownToBodyJson(sample.content);
    const plainText = richDocToPlainText(markdownToRichDoc(sample.content));
    await prisma.blogPost.upsert({
      where: { slug: sample.slug },
      update: {
        title: sample.title,
        excerpt: sample.excerpt,
        content: plainText,
        contentFormat: "RICH",
        bodyJson,
        category: sample.category,
        tags: JSON.stringify(sample.tags),
        featured: sample.featured,
        coverImage: sample.coverImage,
        status: "PUBLISHED",
        readTimeMin: Math.max(1, Math.ceil(plainText.split(/\s+/).length / 200)),
        publishedAt: new Date(),
        authorId: admin.id,
      },
      create: {
        title: sample.title,
        slug: sample.slug,
        excerpt: sample.excerpt,
        content: plainText,
        contentFormat: "RICH",
        bodyJson,
        category: sample.category,
        tags: JSON.stringify(sample.tags),
        featured: sample.featured,
        coverImage: sample.coverImage,
        status: "PUBLISHED",
        readTimeMin: Math.max(1, Math.ceil(plainText.split(/\s+/).length / 200)),
        publishedAt: new Date(),
        authorId: admin.id,
      },
    });
  }

  for (const study of caseStudiesContent.studies) {
    const bodyJson = staticSectionsToRichDoc({
      challenge: study.challenge,
      approach: study.approach,
      outcomes: study.outcomes,
      coverImage: study.imageSrc,
    });
    const plainText = richDocToPlainText(parseRichDoc(bodyJson));

    await prisma.caseStudy.upsert({
      where: { slug: study.slug },
      update: {
        title: study.title,
        excerpt: study.excerpt,
        content: plainText,
        contentFormat: "RICH",
        bodyJson,
        coverImage: study.imageSrc,
        coverImageAlt: study.imageAlt,
        category: study.category,
        industry: study.industry,
        clientContext: study.clientContext,
        tag: study.tag ?? null,
        metrics: JSON.stringify(study.metrics),
        outcomes: JSON.stringify(study.outcomes),
        disclaimer: study.disclaimer ?? null,
        status: "PUBLISHED",
        featured: study.featured ?? false,
        readTimeMin: Math.max(1, Math.ceil(plainText.split(/\s+/).length / 200)),
        publishedAt: new Date(),
        authorId: admin.id,
      },
      create: {
        title: study.title,
        slug: study.slug,
        excerpt: study.excerpt,
        content: plainText,
        contentFormat: "RICH",
        bodyJson,
        coverImage: study.imageSrc,
        coverImageAlt: study.imageAlt,
        category: study.category,
        industry: study.industry,
        clientContext: study.clientContext,
        tag: study.tag ?? null,
        metrics: JSON.stringify(study.metrics),
        outcomes: JSON.stringify(study.outcomes),
        disclaimer: study.disclaimer ?? null,
        status: "PUBLISHED",
        featured: study.featured ?? false,
        readTimeMin: Math.max(1, Math.ceil(plainText.split(/\s+/).length / 200)),
        publishedAt: new Date(),
        authorId: admin.id,
      },
    });
  }

  console.log(`Seeded admin: ${email}`);
  console.log(`Seeded ${SAMPLE_POSTS.length} blog posts.`);
  console.log(`Seeded ${caseStudiesContent.studies.length} case studies.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
