# Multi-Vertical Expansion & Website Strategy
## Automotive · Cement · Steel · Pharma · Chemical Plants

*Stamped Energy · Industry & GTM research · June 2026*

**Purpose:** Detailed analysis of five target verticals — how each industry consumes energy, where waste hides, how Stamped reduces cost, and how to **structure stamped.work** and **market** to each segment.

**Sources:** Stamped master product doc, `external-learning/greenovative/`, `external-learning/zerowatt/`, BEE/PAT public material, industry publications, energy audit literature. Vendor claims (Greenovative, Zerowatt) are labelled **external reference**, not Stamped customer results.

**Honesty convention:** `[~]` = benchmark or third-party estimate · `[!]` = verify before sales use

---

## Executive summary

Stamped Energy is a **prescriptive energy intelligence** layer: connect bills + meters (+ optional SCADA/PLC), detect waste, assign **rupee-denominated actions**, verify savings on the next DISCOM bill. The auto component wedge is validated first; **cement, steel, pharma, and chemical** are strategic expansions where the **same six waste categories** (Zerowatt framework) and **prescription patterns** (Greenovative case studies) recur — but **buyer language, integration depth, and facility scale differ**.

| Vertical | Stamped sub-segment to target (Phase 1-2) | Primary energy pain | Stamped entry wedge | Website priority |
| --- | --- | --- | --- | --- |
| **Automotive & components** | Tier-2/3 suppliers, 200-1,500 employees, ₹3-25L+/mo bill `[~]` | MD spikes, furnace hold, compressed air | **Core — live now** | P1 — flagship |
| **Cement** | Single-site / regional plants, 1-3 MTPA, not only mega-groups | Multi-source dispatch, kWh/ton drift, peak grid | Bill + MD + dispatch prescriptions (daily/shift) | P1 — new vertical page |
| **Steel & metals** | Secondary steel, rolling, forging, mini-mills, foundry | Furnaces, MD, gas-electric mix, PAT/CCTS pressure | Furnace + utility prescriptions (auto playbook overlap) | P2 |
| **Pharma** | MSME formulation/API, Baddi-Solan, Hyderabad, Ahmedabad | HVAC **~85%** of electricity (BEE MSME mapping) | HVAC scheduling, CA, RE utilization | P2 |
| **Chemical & paint** | Batch specialty, resins, coatings, agrochemical | Batch thermal, reactors, steam, idle utilities | Batch SEC + shift idle + MD | P2 |

**Strategic tension (internal):** Greenovative’s published wins skew **enterprise** (₹8-10 Cr/yr cement dispatch; ₹3,000 Cr/yr energy conglomerate). Stamped wins by **same mechanics at mid-market scale** — Path A (bill + MD) first, Path B (PLC/SCADA) when data exists. Do **not** sell 15-minute cement dispatch to a ₹8L/month bill plant; sell **“three prescriptions this week, verified on your bill.”**

---

## Part 1 — How Stamped helps every vertical (shared platform story)

### 1.1 Universal problem (JTBD)

**Who:** Plant owner, VP Operations, or Electrical HOD at an energy-intensive Indian manufacturer.

**Why:** Electricity is **10-50% of production cost** depending on vertical `[~]`, tariffs are **structurally high** (Greenovative 2025 reality check: HV **₹10-11+/kWh** in multiple states), and **monitoring alone does not close the loop**.

**What before:** SCADA/EMS dashboards, annual energy audits, Excel SEC tracking, intuition (“compressor sounds wrong”), no owner assigned, no bill verification.

**How (Stamped):**

```
CONNECT → OBSERVE → PRESCRIBE → ASSIGN → VERIFY ON BILL
```

| Capability | What it does | Cost impact |
| --- | --- | --- |
| Bill + MD ingestion | Parses DISCOM HT bill, contracted vs actual MD, ToD, PF penalty | Surfaces **avoidable line items** without hardware |
| Baseline + anomaly | Production-normalized SEC where data exists; shift patterns otherwise | Finds **drift before month-end** |
| Prescriptions | Specific action + ₹/month + owner + due date | Converts insight to **work orders** |
| Closed-loop verify | Compare post-action consumption to adjusted baseline | **Trust** for CFO/owner |

**What after:** Defensible ₹ savings ledger; PAT/BRSR-ready meter narrative; energy treated as **portfolio**, not fixed overhead (Greenovative boardroom gap theme).

**Alternatives:** Enterprise EMS (Greenovative, Schneider), audit consultants (one-off), internal Excel, Zerowatt-style full-stack at **₹50L+/mo** spend bands. Stamped: **prescription + verify**, weeks to value, SME price band.

**Target outcome band:** `[~]` **12-20%** electricity cost reduction (master doc); **15-25%** MD charge reduction often achievable from Stage 1 data alone. External benchmarks: Zerowatt **12-30%** bill recovery on published cases; Greenovative **15-20%** category claim.

---

### 1.2 Six waste categories → prescriptions (Zerowatt × Stamped)

These recur in **all five verticals**. Website and sales should map industry pages to this table:

| # | Waste category | Typical prescription | Cement | Steel | Pharma | Chemical |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Compressed air | Leak program, pressure setback, staging | Bag house, instruments | Instrument air, blast | Process air, packaging | Pneumatic transfer |
| 2 | Cooling / HVAC / chillers | Setpoint, VFD, schedule vs occupancy | Office + lab | Control rooms | **Primary lever (~85% MSME)** | Reactor cooling |
| 3 | Furnaces / process heat | Weekend hold, ramp schedule, SEC/ton | Kiln support, calciner aux | Reheat, melting, heat treat | Sterilization (minor) | Batch reactors, distillation |
| 4 | Idle / auxiliary | Dust collectors, pumps on break | Conveyors, idling mills | Roll table, aux fans | AHU off-hours | Agitators between batches |
| 5 | MD / PF / harmonics | Stagger startup, APFC vs sequence | Mill + crusher simultaneous start | EAF + rolling overlap | Chiller banks together | Multi-reactor start |
| 6 | VFD / pump-fan | Throttle → speed control | Mill, fan, cooler | Cooling water, fume | CW pumps, AHU fans | Circulation pumps |

---

## Part 2 — Industry deep dives

---

### 2.1 Automotive & components (core wedge)

#### Industry energy profile

- Energy **8-15%** of operating cost for process-heavy segments (die casting, forging, HT) `[~]` — see `customer-profile/ICP-AutoComponent-LeadSearch-Criteria.md`.
- Industry uses **~41%** of national electricity (Greenovative 2025 blog, IEA consumption data cited).
- Dominant loads: **HPDC cells, forge furnaces, heat treatment, paint, compressors, chillers**.

#### External reference outcomes

| Source | Outcome |
| --- | --- |
| Zerowatt | **18% SEC** reduction; pump + foundry case **₹34.74L/mo** savings `[external]` |
| Greenovative | 70+ plant conglomerate: **₹3+ Cr** prescriptive opportunities identified `[external]` |

#### How Stamped cuts cost (concrete prescriptions)

1. **Shift-start MD:** Stagger press line + compressor + furnace ramp — *“Monday 07:15 MD spike cost ₹38,000 — delay Press 3 by 10 min.”*
2. **Weekend furnace hold:** Calendar-linked setback on HT furnaces — existing blog playbook in `outputs/`.
3. **Compressed air:** kW/SCFM drift vs production state — leak or idle pressure.
4. **SEC per part:** kWh per shot / per kg forged when production tags available (Path B).

#### ICP (Stamped)

- Revenue **₹100-500 Cr**, **200-1,500 employees**, NCR / Pune / Chennai clusters.
- Bill **₹3-25L+/month** `[~]`.
- Champion: Electrical HOD, Plant Head.

#### Marketing

| Channel | Message |
| --- | --- |
| Outbound | OEM margin squeeze + tariff hike — *“OEMs cut 2-5%/yr; energy is the cost you control.”* |
| SEO | MD reduction, die casting audit, furnace holding (content roadmap P1) |
| Proof | Shivam dossier, validation call → bill upload |
| Events | ACMA, regional auto clusters |

#### Website (P1 flagship)

- URL: `/industries/automotive-and-components`
- Hero: *“Prescriptive energy intelligence for auto component plants — verified on your DISCOM bill.”*
- Sections: Process loads diagram (HPDC, forge, HT) · 3 prescription examples · MD calculator CTA · FAQ (EMS vs Stamped)

---

### 2.2 Cement

#### Industry energy profile

| Metric | Range | Source |
| --- | --- | --- |
| Energy share of production cost | **35-50%** | Industry literature / research `[~]` |
| Power & fuel as % of revenue | **10-33%** (company-dependent) | Listed cement cos. analysis `[~]` |
| Electrical SEC | **~70-80 kWh/ton** cement; best plants **<67** | Industry benchmarks `[~]` |
| Electrical intensity (modern dry process) | **110-120 kWh/ton** cement (incl. clinker grinding) | Mejeoumov / industry reviews `[~]` |
| WHR typical | **5-10 MW** per plant | Industry estimates `[~]` |

**Process context:** Continuous **24/7** operation. Electrical energy heavy in **raw mill, kiln drives, finish grinding, material handling**. Thermal energy dominates clinker — Stamped focuses on **electrical bill + dispatch + auxiliary SEC**, not replacing kiln physics models.

**Regulatory:** Cement is a **PAT designated sector** (multiple cycles). **CCTS** transition adds emissions-intensity compliance (FY2025-26+). Energy data auditability rising — aligns with Stamped verify narrative.

#### Greenovative learning (external)

**Case: Governing power dispatch at scale** ([case study](https://greenovative.com/case-studies/governing-power-dispatch-decisions-at-scale/))

- **15+ power feeds:** grid ToD, captive thermal, WHR, RE.
- Decisions every **15 minutes**; operators chose safe expensive mix.
- **₹0.10/unit** × 96 intervals/day → multi-crore exposure.
- Result: **₹8-10 Cr/yr** savings potential `[Greenovative claim]`.

**Stamped translation:** Same **decision-system** story; SME/mid cement may need **daily MD + shift-level source mix** prescriptions, not 15-min agent stack.

#### Where waste hides in cement

| Load | Waste pattern | Stamped prescription type |
| --- | --- | --- |
| Raw/finish **mills** | SEC drift 5-12% when bearings/separator degrade `[~]` | Anomaly → maintenance work order + schedule |
| **Kiln auxiliaries** | Idling fans, cooler inefficiency | Idle load + SEC/kWh clinker |
| **Crushers + mills** | Simultaneous start → MD spike | Category 5 — stagger startup |
| **WHR + grid + RE** | Under-use cheap power in peak window | Category 5 + RE utilization (platform peak example: 6.2 vs 3.9 MW) |
| **Compressed air** | Instrument/plant air leaks | Category 1 |
| **Dispatch heuristics** | “Safe” thermal when RE available | Daily prescription: source mix recommendation |

#### Stamped ICP within cement (honest scope)

**Target (Phase 1-2):**

- Standalone or group **grinding units / regional plants** — **0.5-3 MTPA**, not only UltraTech-scale integrated sites.
- Monthly electricity **₹15L-₹2Cr+** `[~]` — large enough for MD pain, small enough for Stamped sales motion.
- Existing **EMS/PMS** or at minimum **HT metering + monthly bills**.
- Geography: Rajasthan, MP, Chhattisgarh, Gujarat, AP — high HV tariff states (Greenovative cites **₹11.50/kWh** HV Chhattisgarh FY24-25).

**Defer initially:** Greenfield integrated plants with only enterprise RFP procurement.

#### Value proposition (6-part)

| Part | Cement-specific |
| --- | --- |
| **Who** | Plant Director / Head of Electrical / Energy coordinator at continuous-process cement plant |
| **Why** | Power is structural margin; dispatch complexity exceeds operator heuristics; audits are post-facto |
| **Before** | EMS shows trends; dispatch in operator experience; savings seen only after billing |
| **How** | Stamped unifies bill + meter + (optional) EMS feeds → prescriptions on MD, kWh/ton, source mix |
| **After** | Governed dispatch habits; SEC visible per line; ₹ ledger for management / PAT evidence |
| **Alternatives** | OEM EMS, Greenovative enterprise AI, manual dispatch — Stamped: faster deploy, mid-market |

#### How to market cement

| Motion | Tactic |
| --- | --- |
| **Message pillar** | *“Your plant already has the data. You lack the decision layer.”* (from Greenovative cement insight) |
| **Content** | Pillar: *“kWh per ton cement: what drifts cost you”* · *“Cement plant MD: crushers, mills, and peak windows”* |
| **Outbound** | Target plants with public **WHR/RE announcements** or high tariff state filings |
| **Champion** | Head Electrical + Plant Manager (not only corporate sustainability) |
| **Proof hook** | Upload last 3 DISCOM bills → free MD + dispatch opportunity scan |
| **Partners** | Cement equipment OEMs, WHR integrators (referral, not compete) |
| **Avoid** | Promising 15-min AI agents day one; leading with carbon credits before ₹ |

#### Website — cement page spec

**URL:** `/industries/cement`

**Hero headline options:**

1. *“Cut cement plant electricity cost — prescriptions verified on your DISCOM bill.”*
2. *“From EMS dashboards to dispatch decisions your team actually executes.”*

**Page structure:**

1. **Pain bar:** Energy **35-50%** of cost · HV tariffs **₹10-11+/kWh** `[~]` · Multi-source power stack
2. **Process diagram:** Raw mill → Kiln → Finish mill → Utilities (annotate electrical hotspots)
3. **Three example prescriptions** (illustrative, not customer claims):
   - Peak window: increase WHR/solar draw 18:00-22:00 — **₹X/month**
   - Stagger mill restart after outage — avoid MD breach
   - Finish mill SEC drift vs baseline — maintenance trigger
4. **Greenovative pattern callout (attributed):** Enterprise cement saved **₹8-10 Cr/yr potential** through dispatch governance — *“Stamped brings governed decisions to mid-market plants.”*
5. **Integration:** Works with existing EMS/PMS/SCADA — no rip-and-replace
6. **CTA:** Book validation call · Upload bill
7. **FAQ schema:** kWh/ton benchmark, PAT, EMS vs prescriptive

**SEO targets:** `cement plant energy management India`, `reduce kWh per ton cement`, `cement plant maximum demand`, `WHR grid dispatch optimization`

---

### 2.3 Steel & metals

#### Industry energy profile

| Metric | Value | Source |
| --- | --- | --- |
| Energy share of production cost | **20-40%** | TERI steel review `[~]` |
| PAT coverage | **~270 plants**, threshold **20,000 TOE** | BEE / TERI `[~]` |
| Zerowatt published SEC win | **17%** reduction; **2,126 → 1,765 kWh/ton** | `[Zerowatt external]` |
| Zerowatt integrated plant case | **₹9.8 Cr/mo** electricity; **₹161.7L/mo** savings | `[Zerowatt external]` — enterprise scale |
| CCTS | Steel among first sectors; intensity targets FY2025-26+ | Public policy `[~]` |

**Process routes:** Blast furnace-BOF (integrated), **EAF/induction** (secondary), **rolling, forging, heat treatment**. Stamped Phase 1-2 focus: **secondary steel, rolling mills, forging, foundry** — overlaps auto wedge; integrated BF route is enterprise-long-cycle.

#### Greenovative + Zerowatt learning

- Greenovative **Steel** vertical: fuel + power balance, competitiveness framing.
- Zerowatt **six waste categories** all apply; **furnaces** and **MD** highest ROI.
- PAT: structured **3-5% SEC** gains industry-wide (Greenovative 2025 blog, BEE PAT Cycle I).

#### Where waste hides

| Load | Pattern | Prescription |
| --- | --- | --- |
| **EAF / induction furnace** | Holding power between heats; power factor | Schedule + PF sequencing |
| **Reheating furnace** | Weekend hold, idle soak | Same as auto HT playbook |
| **Rolling mill** | Simultaneous stand startup | MD stagger |
| **Cooling water / fume extraction** | Constant speed pumps | VFD opportunity (Cat 6) |
| **Compressed air** | Leak + overpressure | Cat 1 |
| **Gas-electric mix** | Suboptimal when grid ToD high | Shift schedule to tariff `[Path B]` |

#### Stamped ICP within steel

- **Mid-market:** Induction furnace + rolling, **50-500 Cr** revenue, **₹10L-₹1Cr+/mo** electricity `[~]`.
- **Forging / foundry:** Treat as **auto-adjacent** — same sales playbook.
- **Avoid initially:** Single-site integrated BF with ₹9.8 Cr/mo bill unless enterprise motion built.

#### Value proposition

*“Steel margins are set globally; your electricity bill is local and controllable. Stamped turns meter and furnace data into assigned actions — verified in rupees, aligned with PAT discipline.”*

#### Marketing

| Tactic | Detail |
| --- | --- |
| **Segment** | Secondary steel clusters: Raipur, Jalna, Ghaziabad, Ludhiana forging belt |
| **Hook** | PAT/CCTS — *“SEC improvement is regulated and monetizable”* |
| **Content** | *“Induction furnace holding power: what it costs on your bill”* · Rolling mill MD |
| **Proof** | Zerowatt **17% SEC** as external benchmark only |
| **Outbound** | Plants with public **GEOA/RE** announcements |

#### Website — steel page spec

**URL:** `/industries/steel-and-metals`

**Hero:** *“Prescriptive energy intelligence for steel and metals — furnaces, rolling mills, and utilities verified on your bill.”*

**Sections:** Route selector (EAF / rolling / forging) · Furnace + MD prescriptions · PAT/CCTS explainer (informational) · CTA

**SEO:** `steel plant energy efficiency India`, `induction furnace power consumption`, `PAT scheme steel SEC`

---

### 2.4 Pharmaceutical manufacturing

#### Industry energy profile

| Metric | Value | Source |
| --- | --- | --- |
| MSME pharma units in India | **~8,000-9,000** | BEE MSME cluster mapping `[~]` |
| Sector electricity (MSME) | **~22,873 GWh/yr** | BEE `[~]` |
| **HVAC share of plant electricity** | **~85%** | BEE pharma MSME study |
| HVAC + CA + pumps + vacuum | **~92%** of electrical focus | BEE |
| EE potential (MSME pharma) | **~24%** electricity savings identified | BEE `[~]` |
| Greenovative pharma case | **₹500-600 Cr RE CAPEX**, **₹1-2 Cr/yr** leakage prevented | `[Greenovative external]` |

**Process context:** GMP drives **24/7 HVAC**, clean rooms, chillers, AHUs, WFI systems. Batch production creates **scheduleable** load — unlike cement 24/7 uniformity. **Regulated environment** → change control friction; prescriptions must be **low-risk operational tweaks** first (setpoints, schedules, staging), not HVAC redesign.

#### Where waste hides

| System | Pattern | Stamped prescription |
| --- | --- | --- |
| **Chillers / AHUs** | Over-cooling, fixed setpoints vs occupancy | Schedule + setpoint band |
| **Chiller staging** | All units start together → MD | Stagger + load balance |
| **Compressed air** | Overpressure for “safety margin” | Pressure band + leak tag |
| **Pumps / CW loops** | Constant flow | VFD / duty cycle |
| **Clean room idle** | Full HVAC during non-production | Qualified setback windows `[!]` — document GMP check |
| **Captive RE / open access** | Banking leakage, peak grid draw | Greenovative pharma pattern at smaller scale |

#### Stamped ICP within pharma

- **MSME / mid-market formulation, API, nutraceutical** — Baddi-Solan, Hyderabad, Ahmedabad, Goa.
- Bill **₹5L-₹50L+/month** `[~]` — BEE cluster data supports meaningful HVAC savings.
- **Champion:** Engineering head / utilities; **economic buyer:** Plant head / owner (many MSME).
- **Not Phase 1:** Top-20 listed pharma multi-plant RE governance (Greenovative case scale).

#### Value proposition

*“HVAC is most of your bill — but nobody ties chiller run-hours to production and tariff windows. Stamped prescribes schedule and staging changes your team can execute this week, verified on the bill.”*

#### Marketing

| Tactic | Detail |
| --- | --- |
| **Message** | **85% HVAC** stat (BEE) — instant credibility with engineering |
| **Compliance angle** | BRSR for listed cos.; MSME → cost not ESG lead |
| **Content** | *“Pharma plant HVAC: where 24% savings hide (BEE mapping)”* |
| **Outbound** | Baddi/Hyderabad clusters; pharma parks |
| **Caution** | Never promise GMP changes without validation — frame as **utilities**, not room reclassification |

#### Website — pharma page spec

**URL:** `/industries/pharmaceutical`

**Hero:** *“Most of your electricity is HVAC. Stamped shows exactly where — in rupees, verified on your bill.”*

**Sections:** 85% HVAC stat (cite BEE) · Chiller/MD/AHU prescription examples · RE utilization for plants with solar · GMP-safe operational levers FAQ · CTA

**SEO:** `pharmaceutical plant energy consumption India`, `HVAC energy savings pharma`, `reduce electricity cost API manufacturing`

---

### 2.5 Chemical & paint plants

#### Industry energy profile

Greenovative lists **Chemical & Paint** as core vertical — *continuous energy discipline, batch thermal, reactors, solvents, HVAC*.

| Aspect | Detail |
| --- | --- |
| PAT | **Chlor-alkali** and other chemical subsectors under PAT (GtG SEC, gate-to-gate) |
| Process mode | **Batch-heavy** — energy demand time-shifted; scheduling matters (academic literature on batch energy integration) |
| Dominant loads | Reactors, distillation, steam, agitators, CA, cooling, solvent recovery |
| Paint/coating | Ovens, exhaust, HVAC, pumps |

**Energy economics:** Batch plants waste energy in **waiting times** (heated vessels idle), **simultaneous batch starts**, **steam venting**, and **utility baseload** between batches — analogous to auto **shift-start** and **idle auxiliary** categories.

#### Greenovative learning

- Positioning: **cost control + operational predictability** in continuous/batch hybrid plants.
- Same platform patterns: SEC intelligence, anomaly, prescriptive actions.

#### Where waste hides

| Pattern | Prescription |
| --- | --- |
| **Batch reactor idle hold** | Soak temperature schedule vs production calendar |
| **Simultaneous batch heating** | MD stagger across reactors |
| **Steam / thermal** | Trap maintenance signal from condensate temp `[Path B]` |
| **Cooling between batches** | Chiller setpoint vs next batch start |
| **Solvent recovery units** | Run window vs tariff |
| **Paint oven** | Cure cycle alignment; avoid partial oven heat |

#### Stamped ICP within chemicals

- **Specialty chemicals, resins, agrochemical formulation, paint** — not necessarily mega chlor-alkali DCs.
- **₹8L-₹80L+/month** electricity `[~]`; batch MES or at least batch logs helpful.
- Clusters: Vapi, Ankleshwar, Dahej, Cuddalore, Alwar.

#### Value proposition

*“Batch plants don’t fail on total kWh — they fail on kWh per batch and idle hold between batches. Stamped connects your bill to batch windows and prescribes stagger, setback, and utility changes — verified monthly.”*

#### Marketing

| Tactic | Detail |
| --- | --- |
| **Message** | Batch SEC + PAT SEC narrative |
| **Content** | *“Energy between batches: the hidden cost in chemical manufacturing”* |
| **Outbound** | Responsible Care / ICC member lists; cluster associations |
| **Integration story** | Batch log CSV + bill (Path A) → Path B DCS |

#### Website — chemical page spec

**URL:** `/industries/chemical-and-paint`

**Hero:** *“Batch energy waste is invisible until the bill arrives. Stamped prescribes what to change before month-end.”*

**Sections:** Batch timeline diagram (heat → hold → idle → cool) · Five prescription types · PAT SEC note · CTA

**SEO:** `chemical plant energy audit India`, `batch process energy optimization`, `reduce steam cost manufacturing plant`

---

## Part 3 — Website architecture (multi-vertical)

### 3.1 Information architecture

```
stamped.work/
├── /                          → Multi-industry hero + industry tiles + core loop
├── /how-it-works              → CONNECT → PRESCRIBE → VERIFY (universal)
├── /industries/               → Hub: 5 vertical cards + comparison table
│   ├── /automotive-and-components
│   ├── /cement
│   ├── /steel-and-metals
│   ├── /pharmaceutical
│   └── /chemical-and-paint
├── /pricing                   → [when ready] band by bill size
├── /resources/                → Blog + guides (SEO)
│   ├── /maximum-demand-india
│   ├── /sec-benchmarks
│   └── /discom-bill-guide
├── /about
└── /contact / book-validation-call
```

### 3.2 Homepage redesign (aimed at five verticals)

**Above fold:**

- **Headline:** *“Prescriptive energy intelligence for Indian manufacturers — verified on your DISCOM bill.”*
- **Sub:** Not monitoring. Specific actions. Rupee impact. Closed loop.
- **Industry selector:** 5 tiles (Auto · Cement · Steel · Pharma · Chemical) — each links to vertical page with `?from=home` for analytics.

**Social proof band:** External benchmarks attributed — *“Industry prescriptive platforms report 15-20% cost reductions [Greenovative category]; IPMVP-verified audits show 12-30% bill recovery [Zerowatt cases]. Stamped verifies on your bill.”*

**Universal 3-step:** Upload bill → Get prescriptions → Verify savings.

**Do not:** List only auto in meta title — use *“Manufacturers”* + structured data for each vertical.

### 3.3 Shared page template (all `/industries/*`)

Each vertical page follows the same template for consistency and faster CMS build:

| Section | Content |
| --- | --- |
| 1. Hero | Vertical-specific pain in **₹** + one-line Stamped promise |
| 2. Energy economics | 3-4 stats with sources (BEE, industry, external vendors) |
| 3. Where waste hides | Table: load → pattern → prescription type |
| 4. Example prescriptions | 3 anonymized illustrations with ₹ ranges `[~]` |
| 5. How Stamped works | Path A / Path B integration diagram |
| 6. Outcomes | Target bands + honesty footnote |
| 7. FAQ (JSON-LD) | Vertical-specific + shared EMS vs Stamped |
| 8. CTA | Book validation call · Upload bill |

### 3.4 Messaging matrix (channel × vertical)

| Element | Auto | Cement | Steel | Pharma | Chemical |
| --- | --- | --- | --- | --- | --- |
| **Primary pain** | OEM margin squeeze | kWh/ton + dispatch | Furnace + PAT | 85% HVAC | Batch idle hold |
| **Lead metric** | MD + SEC/part | kWh/ton + MD | SEC + MD | kWh/conditioned area | kWh/batch |
| **Hero verb** | “Protect margins” | “Govern power mix” | “Control furnace bill” | “Right-size HVAC” | “Cut idle batch cost” |
| **Proof ask** | 3 DISCOM bills | + EMS export if any | + furnace meter | + chiller logs | + batch schedule |
| **Objection** | “We have SCADA” | “EMS enough” | “PAT audit done” | “GMP limits changes” | “Batch variability” |
| **Response** | SCADA ≠ prescriptions | EMS ≠ dispatch decisions | Audits ≠ continuous loop | Operational levers only | SEC per batch normalizes |

### 3.5 Positioning vs enterprise players (website FAQ)

**Stamped position (unclaimed territory):**

> *“The only prescriptive energy intelligence built for mid-market Indian plants — rupee prescriptions from your existing bill and meters, verified monthly, without enterprise EMS replacement.”*

Different from **Greenovative** (enterprise multi-plant AI) and **Zerowatt** (full-stack, larger spend bands) — Stamped owns **speed, mid-market, bill-verified loop**.

### 3.6 Content roadmap additions (from `content-strategy/`)

| Priority | New asset | Vertical |
| --- | --- | --- |
| P1 | Industry landing pages (5) | All |
| P1 | Homepage multi-vertical refresh | All |
| P1 | SEC pillar expanded with cement kWh/ton + pharma HVAC | Cement, pharma |
| P2 | Cement dispatch / MD pillar | Cement |
| P2 | Induction furnace holding | Steel |
| P2 | Pharma HVAC BEE stats article | Pharma |
| P2 | Batch energy between cycles | Chemical |

### 3.7 Technical SEO / GEO

- **Organization schema** on homepage with `knowsAbout`: Industrial energy management, PAT, SEC, MD optimization.
- **FAQPage schema** per industry page.
- **BreadcrumbList:** Home → Industries → {Vertical}.
- Entity clarity sentence on every page (content roadmap 1.1): *“Stamped Energy is prescriptive energy intelligence software for Indian manufacturers…”*

---

## Part 4 — GTM sequencing & success metrics

### 4.1 Recommended rollout

| Phase | Timeline | Focus |
| --- | --- | --- |
| **Phase 0** | Now | Auto validation calls + website auto page live |
| **Phase 1** | +4-8 weeks | Cement + steel **pages live**; 10 outbound conversations each; refine prescriptions |
| **Phase 2** | +8-16 weeks | Pharma + chemical pages; cluster outbound (Baddi, Vapi) |
| **Phase 3** | After 3 verified saves | Vertical case studies (anonymized) on site |

### 4.2 KPIs per vertical (90-day)

| Metric | Target `[~]` |
| --- | --- |
| Validation calls booked | 8-12 per vertical |
| Bill uploads | 50% of calls |
| Prescriptions delivered | 100% of onboarded pilots |
| Verified ₹ on bill | ≥1 per vertical (stretch) |
| Page → call conversion | 2-4% |

### 4.3 Risks & mitigations

| Risk | Mitigation |
| --- | --- |
| Cement/steel too enterprise | Target regional plants; lead with bill-only Path A |
| Pharma GMP change control | Prescriptions = utilities/schedules; document no product impact |
| Chemical batch data sparse | Start MD + idle; add batch when logs available |
| Overclaiming vendor benchmarks | Always attribute Greenovative/Zerowatt; Stamped `[~]` bands |
| Long sales cycle on integrated steel | Qualify bill band + champion in first call |

---

## Part 5 — Quick reference: “How we cut your bill” by vertical

| Vertical | Top 3 Stamped levers (first 90 days) |
| --- | --- |
| **Auto** | MD stagger · Furnace weekend hold · Compressed air drift |
| **Cement** | Peak-window source mix · Mill/crusher MD · kWh/ton drift alert |
| **Steel** | Furnace hold schedule · Rolling startup sequence · Pump VFD |
| **Pharma** | Chiller staging · AHU schedule vs production · CA pressure band |
| **Chemical** | Batch idle hold · Reactor stagger · Off-peak utility scheduling |

---

## Sources & repo cross-links

| Resource | Path |
| --- | --- |
| Stamped master product doc | `core-product/Stamped_Energy_Master_Document_v1.3.md` |
| Auto ICP | `customer-profile/ICP-AutoComponent-LeadSearch-Criteria.md` |
| Greenovative learning | `external-learning/greenovative/` |
| Zerowatt learning | `external-learning/zerowatt/` |
| Content roadmap | `content-strategy/stamped-content-roadmap.md` |
| Greenovative 2025 energy reality | `external-learning/greenovative/guides/01-2025-energy-reality-check-india.md` |
| Cement dispatch case | `external-learning/greenovative/guides/06-peak-dispatch-cement-pattern.md` |
| Pharma RE governance | `external-learning/greenovative/guides/07-renewable-roi-governance-pharma.md` |
| Zerowatt waste categories | `external-learning/zerowatt/01-industries-overview-and-waste-patterns.md` |

**External web sources (June 2026 research):**

- BEE — PAT scheme brief; MSME pharma cluster energy mapping
- TERI — Energy efficiency in steel sector review
- Greenovative — industries, platform, case studies, 2025 energy blog
- Indian Cement Review / industry SEC literature
- Greenovative cement dispatch case study (Feb 2026)

---

*Document owner: Stamped Energy GTM / product strategy. Update after first validated customer in each vertical.*
