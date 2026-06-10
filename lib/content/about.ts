export const aboutContent = {
  hero: {
    eyebrow: "About us",
    title: "Built for plant heads who read the electricity bill every month",
    description:
      "Stamped connects meters, SCADA, and bills you already run, and turns them into assigned fixes in rupees. Not another dashboard your electrical HOD opens once and forgets.",
    heroImageSrc: "/industries/die-casting.jpeg",
    heroImageAlt: "Energy-intensive manufacturing plant floor",
  },

  intro: {
    eyebrow: "Who we are",
    title: "Your plant has the data. It lacks the decision layer.",
    description:
      "Every factory has incomer meters, PLCs, SCADA tags, and monthly DISCOM bills. What's missing is software that turns Monday's MD spike into a maintenance ticket with a rupee figure, and checks the next bill to prove it worked.",
    imageSrc: "/industries/forging.jpg",
    imageAlt: "Manufacturing plant with heavy industrial equipment",
    pillars: [
      {
        id: "grounded",
        title: "Starts from your incomer and your shifts",
        description:
          "Baselines from your production schedule and equipment signatures, not benchmarks from unrelated sectors.",
      },
      {
        id: "industrial",
        title: "No hardware retrofit sales pitch",
        description:
          "Software connects to meters, SCADA, and PLCs you already paid for. Sub-meters only when ROI is clear.",
      },
      {
        id: "verified",
        title: "Pilot before annual contract",
        description:
          "One verified saving on the bill before subscription scale. If it doesn't show up in rupees, you walk.",
      },
    ],
  },

  visionMission: {
    eyebrow: "Direction",
    title: "Vision & mission",
    vision: {
      title: "Vision",
      description:
        "Indian manufacturing competes on unit economics; energy waste should be as visible and controllable as scrap rate or OEE.",
    },
    mission: {
      title: "Mission",
      description:
        "Help plant heads close the loop from “something is wrong on the bill” to “we fixed it and saved ₹X”, using infrastructure they already own.",
    },
  },

  values: {
    eyebrow: "How we work",
    title: "How we work with manufacturers",
    description: "Principles for plant-floor partnerships, not vendor slide decks.",
    items: [
      {
        id: "proof",
        title: "Proof on the bill",
        description:
          "If it is not on the DISCOM bill in rupees, we do not claim it saved. Every prescription links to verifiable M&V.",
      },
      {
        id: "clarity",
        title: "Plain language for supervisors",
        description:
          "If a shift supervisor cannot act on it tomorrow morning, we have not finished. Jargon is a failed translation.",
      },
      {
        id: "pragmatism",
        title: "Start with what you have",
        description:
          "Incomer meter and bills first. SCADA and PLCs when accessible. Instrumentation upgrades only when payback is obvious.",
      },
      {
        id: "partnership",
        title: "Your team executes, we quantify",
        description:
          "Maintenance and electrical staff know the plant. We find the leak in rupees and track until it is closed.",
      },
    ],
  },

  team: {
    eyebrow: "Leadership",
    title: "Meet our founders",
    description:
      "IIT Roorkee engineers building software for plant heads who measure success on the electricity bill.",
    members: [
      {
        id: "vinayak",
        name: "Vinayak Raizada",
        role: "Co-Founder",
        imageSrc: "/team/vinayak.jpg",
        imageAlt: "Vinayak Raizada, Co-Founder of Stamped Energy",
        linkedIn: "https://www.linkedin.com/in/vinayak-rz/",
        bio: "Leads product and platform engineering. Electrical Engineering at IIT Roorkee. Builds the prescriptive intelligence layer, plant data integrations, and the systems that turn raw meter and PLC signals into actionable prescriptions.",
      },
      {
        id: "utso",
        name: "Utsavsar Karan",
        role: "Co-Founder",
        imageSrc: "/team/utso.jpg",
        imageAlt: "Utsavsar Karan, Co-Founder of Stamped Energy",
        linkedIn: "https://www.linkedin.com/in/utso/",
        bio: "Leads core engineering and systems architecture. Mathematics & Computing at IIT Roorkee. Background building production software, from mobile platforms to data pipelines, with a focus on reliable systems that run in real plant environments.",
      },
    ],
  },

  journey: {
    eyebrow: "Our journey",
    title: "From problem to platform",
    milestones: [
      {
        id: "2024",
        period: "2024",
        title: "The constraint",
        description:
          "Field visits to auto component and process plants revealed the same gap: abundant data, zero rupee-denominated prescriptions. Bills arrived after waste was already locked in.",
      },
      {
        id: "2025",
        period: "2025",
        title: "Pilot foundations",
        description:
          "Built software-only connectivity to incomer meters, compressors, and furnaces. Validated SEC baselining and shift-start MD analysis across automotive-adjacent segments.",
      },
      {
        id: "2026",
        period: "2026",
        title: "Prescriptive intelligence",
        description:
          "Building Stamped Energy with pilot-led deployments. Prescriptions ranked by monthly rupee impact, verified on the next utility bill before annual commitment.",
      },
    ],
  },

  finalCta: {
    eyebrow: "Work with us",
    title: "Tell us about your plant",
    description:
      "Share your incomer setup and production profile. We'll follow up to schedule a discovery conversation, no hardware retrofit required.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" },
  },
} as const;
