# Stamped Energy — Master Product & Company Document

*Version 1.3 | June 2026*
*Status: Pre-validation — core assumptions flagged. Treat as a living document and update after every 5 discovery calls.*

> **Honesty Convention (carried over from project documents):**
> `[~]` = Approximate or benchmark-derived figure — not yet validated on our own customer base
> `[!]` = Actively evolving — verify before using in customer conversations

---

## 1. Identity & Positioning

**Company Name:** Stamped Energy

**One-Line Position:**
A prescriptive energy intelligence platform purpose-built for Indian small and mid-market manufacturers — delivering verified cost reduction from existing infrastructure, without enterprise complexity or enterprise pricing.

> **ICP Scope Note:** The initial ICP is SMEs in the Indian automotive manufacturing sector — specifically auto component manufacturers in the Delhi NCR belt. This is the entry wedge. Stamped Energy is designed as a solution for manufacturing industries broadly, and the platform will expand to other manufacturing verticals (process, pharma, food & beverage, metals, and others) and to larger enterprise-scale manufacturers as the initial segment is validated.

**Working Tagline:**
*Precision energy intelligence. Verified savings. Built for manufacturers.*

**What Stamped Energy is:**
A software-first energy decision and optimization platform that integrates with a manufacturing plant's existing infrastructure — SCADA systems, PLCs, CNCs, energy meters, and production data — to identify specific energy inefficiencies, prescribe exact corrective actions with rupee-denominated impact, track execution, and verify that savings materialize on the next electricity bill.

**What Stamped Energy is not:**
A monitoring dashboard. An ESG reporting tool. A sustainability compliance platform. A hardware company. Stamped Energy does not surface data — it closes the loop from insight to verified savings.

---

## 2. Core Hypothesis

**Initial ICP focus:** Mid-sized Indian auto component manufacturers — companies that already run SCADA systems, PLCs, CNC machines, and energy meters as standard operating infrastructure — are losing ₹2 to ₹20 lakh every month to avoidable energy waste. This is the segment we are validating first. The underlying problem — fragmented data, no prescriptive decision layer, energy waste that never closes the loop to verified savings — applies equally across manufacturing verticals. Auto component manufacturing in NCR is the entry point; the platform is designed for manufacturing broadly. Demand charges triggered by simultaneous machine startups that nobody coordinated. Compressors consuming 20% more energy than their baseline because the inlet filter hasn't been flagged. Furnaces holding temperature through the weekend because no setback schedule was programmed. CNCs idling at full spindle power between batches because nobody built an auto-sleep routine.

The data to find and fix all of this already exists in their systems. The problem is that it is fragmented across SCADA, PLCs, energy meters, ERP, and utility bills — and no software layer sits across all of it to turn that data into specific, rupee-denominated actions that someone actually executes and tracks.

They will pay for a software-first layer that connects to what they already have, tells them exactly where the money is going in rupees per month, turns that insight into specific assigned actions, and verifies that the savings appear on the next electricity bill.

**The primary question this hypothesis rests on:**
Is energy cost pain acute enough in this segment — and is the gap between available data and optimized decisions wide enough — that a lean, prescriptive software product at the right price point delivers an obvious, fast-ROI purchase? This is what discovery calls must confirm or refute.

---

## 3. The Core Insight

Indian manufacturing SMEs do not primarily suffer from a lack of data.

They suffer from **fragmented decision-making, delayed visibility, and no clear path from insight to action.**

Most mid-sized auto component plants already have:

- SCADA systems collecting real-time machine and process data
- PLCs controlling key equipment — compressors, presses, furnaces, die casting cells
- CNC machines with spindle load, cycle, and idle state data available
- Energy meters at the incomer and, increasingly, at feeder level
- Monthly electricity bills with full tariff breakdowns
- An electrical engineer or plant manager who already knows something is wrong
- Maintenance staff who can act if told exactly what to do

The problem is that:

- All of this data lives in separate systems that never talk to each other
- SCADA data and energy meter data are never synthesized against the electricity bill
- Production context (what was being made, at what rate) is never cross-referenced with energy consumption
- No one is continuously watching for deviations from normal consumption patterns
- When the bill arrives, the month's waste has already happened and cannot be recovered
- Inefficiencies are known by intuition but never quantified in rupees
- Recommendations made internally never get prioritized, tracked, or verified
- The decision loop from "something is wrong" to "we fixed it and saved ₹X" never fully closes

Most existing energy software monitors. Stamped Energy **optimizes decisions.**

The key distinction — borrowed from the best practices of Zerowatt and Greenovative, then adapted for the SME reality:

> Insight is only valuable if it reliably causes action. Action is only credible if it is measured. Measurement is only trusted if it is in rupees.

---

## 4. The Market Gap: The Mid-Market Blind Spot

Both Zerowatt (stated ICP: ₹50 lakh/month energy spend minimum) and Greenovative (ICP: large multi-plant conglomerates) have validated that Indian manufacturers will pay for prescriptive energy intelligence. Both have real enterprise customers and documented outcomes.

But both are explicitly built for large facilities. The segment we target **initially** — auto component manufacturers with 50 to 1,000 employees, roughly ₹10 Cr to ₹800 Cr in revenue — is not their target. For these companies, the existing solutions fail structurally:

- **Price:** Annual contracts sized for enterprise procurement budgets, unviable for owner-operators and mid-market plant heads
- **Deployment complexity:** Products built to require full enterprise-grade SCADA, BMS, DCS, and ERP integration as prerequisites, rather than delivering value from existing infrastructure immediately
- **Sales process:** Built for multi-month corporate procurement cycles and sustainability committees, not plant-level decisions
- **Support model:** Expensive human "customer pods" that only make unit economics work at large ACVs — not scalable to this segment

This creates a genuine white space. India's auto component sector has hundreds of manufacturers in the 50–1,000 employee range — the largest concentration in the Delhi NCR industrial belt: Faridabad, Manesar, Bawal, Noida, Greater Noida. These companies run real SCADA systems, real PLCs, real CNC machines. The infrastructure exists. The energy waste exists. The pain is felt every time the electricity bill arrives. No product is designed for them.

The opportunity is not "teach SMEs that energy optimization exists." It is "give mid-market manufacturers a tool that uses the infrastructure they already have to actually fix a problem they already know they have."

> **Beyond the initial ICP:** The same market gap — no prescriptive, SME-priced energy intelligence product — exists across multiple manufacturing verticals: pharmaceuticals, food & beverage, rubber, metals, chemicals, textiles. The auto component segment is the entry wedge because the pain is acute, the infrastructure is present, and the segment is geographically concentrated for early-stage sales motion. The long-term addressable market is Indian manufacturing SMEs broadly, with larger enterprises as a subsequent expansion tier.

---

## 5. Why Now

Several forces have converged to make this moment the right time to build for this segment:

**Rising electricity tariffs:** Industrial electricity tariffs in Haryana, UP, and other NCR-belt states have increased meaningfully over the past 3–5 years `[~]`. Energy, once 5–8% of operating cost for lighter processes, is now 12–20% for process-intensive segments like die casting, forging, and heat treatment `[~]`. Every tariff revision makes the problem more acute.

**OEM price reduction pressure:** Auto component OEMs impose 2–5% annual cost-reduction targets on their suppliers `[~]`. Suppliers absorb tariff hikes rather than passing them through. Energy is one of the few remaining controllable cost lines — making energy optimization not a "nice to have" but a margin defense imperative.

**SME digital maturity is rising:** Band C companies now routinely have ERPs, and smart energy meters are increasingly being installed at main incomers across mid-sized plants — often because of DISCOM mandates or OEM audit requirements. The minimum data floor required to start is now accessible to a larger share of the target segment than it was 3–5 years ago.

**AI development velocity:** Building a prescriptive energy platform no longer requires a 5-year product development cycle. AI-native tooling and modern infrastructure enable rapid iteration, fast deployment, and intelligent pattern recognition at a cost structure that makes SME pricing viable.

**Regulatory tailwinds:** BEE's PAT scheme, BRSR requirements for listed parent companies, and ISO 50001 mandates from global OEM customers are pushing energy management up the agenda for Tier 1 and Tier 2 suppliers. These mandates create urgency that didn't exist 3 years ago `[!]`.

---

## 6. Product Vision

Stamped Energy is a **prescriptive energy and operational optimization engine for manufacturing SMEs.**

> **Scope:** The initial ICP is SMEs in automotive component manufacturing. The platform architecture, integration model, and prescription engine are designed to be industry-agnostic across manufacturing verticals — process industries, pharma, food & beverage, metals, rubber, and others. Vertical-specific expansion will follow validation of the automotive SME entry point. Larger enterprises within and beyond automotive manufacturing represent a future growth layer after the SME segment is established.

The system:

1. **Connects** to a plant's existing infrastructure — for customers with SCADA, PLCs, and CNCs, this means direct system integration from day one; for customers with basic meters only, it means starting with meter and utility bill data and deepening integration over time
2. **Builds a baseline** of what the plant should be consuming under normal production conditions
3. **Identifies deviations** — continuously, in near-real time — finding where energy is being wasted, what is causing it, and what the monthly rupee impact is
4. **Generates specific prescriptions:** not "energy is high this week" but "your demand charge spiked at 07:15 on Monday because Compressor 1 and Press Line 3 started simultaneously — stagger them by 10 minutes to save ₹38,000 this month"
5. **Routes prescriptions into a workflow** — assigned to the right person, status tracked, delivered via WhatsApp and dashboard
6. **Verifies outcomes** — after the action is marked complete, monitors whether the saving materialized and builds a running ₹ savings ledger

The platform delivers **measurable, verified cost reduction** — not software features.

---

## 7. The Product

### 7.1 Infrastructure-Adaptive Integration Model

Stamped Energy meets each customer at the level of infrastructure they already have. The majority of our target customers — particularly those in the 200–1,000 employee range — already operate SCADA systems, PLCs, and CNCs as standard equipment. We integrate directly with all of it. For customers with thinner digital infrastructure, we start with what they have and deepen over time.

Two integration paths exist. Both deliver real value from day one.

---

**Path A — Direct System Integration**
*For customers with SCADA, PLCs, and CNCs already in operation*

This is the primary integration path for most Medium Organized and Larger Mid-Market customers, and for many smaller IATF-certified plants that have invested in automation to meet OEM quality requirements.

*What we connect to:*
- **SCADA systems** (Siemens WinCC, Wonderware/AVEVA, Rockwell FactoryTalk, GE iFIX, and others) via OPC-UA or Modbus TCP
- **PLCs** (Siemens S7, Allen-Bradley ControlLogix, Mitsubishi MELSEC, and others) for machine-level energy draw, operational state, and cycle data
- **CNC machines** for spindle load, cycle time, idle state, and coolant system consumption
- **Smart energy meters** at incomer and feeder levels via Modbus TCP/RTU or MQTT
- **ERP production schedule data** (SAP, Oracle, Tally Prime Enterprise) where accessible — for production-normalized baseline calculation
- **Compressed air system instruments** — pressure transmitters, flow meters where present

*What this delivers from week 1:*
- Machine-level energy attribution — exactly which machine or process is consuming what, and when
- Production-normalized baselines — energy per part produced, adjusted for product mix and machine configuration
- Real-time anomaly detection against equipment-specific baselines
- Demand spike attribution with machine-level specificity ("the demand spike at 06:45 Monday is caused by Compressor 1, CNC Line 3, and the heat treatment furnace starting simultaneously — stagger by 8 minutes to save ₹35,000 this month")
- Shift-level and batch-level Specific Energy Consumption (SEC) tracking
- Full prescription engine active and producing actionable outputs from week 1

---

**Path B — Progressive Meter-Up Integration**
*For customers with energy meters but no SCADA or PLC data access*

Applicable to smaller organized suppliers and owner-operated plants with basic electrical infrastructure but limited automation.

*Entry requirement:* One connected smart energy meter at the main incomer + last 6 months of electricity bills.

**Stage 1 — Meter + Bill (Weeks 1–2):**
- Baseline monthly cost structure (energy charges, demand charges, power factor adjustment)
- MD pattern analysis — when peaks occur, estimated causes, ₹ cost per peak event
- Power factor penalty quantification
- Time-of-use waste identification
- First actionable prescriptions delivered within 2 weeks

**Stage 2 — Sub-Meters Added (Months 2–3):**
*Added:* Sub-meters at 2–3 high-consumption areas (compressor house, furnace bay, press line)
- Area-level energy attribution — where the energy goes within the plant
- Equipment-level anomaly detection where sub-metered
- Shift and batch-level consumption visibility

**Stage 3 — PLC/SCADA Integration (Month 4+, where available):**
*Added:* PLC or SCADA data feeds where the plant has them
- Full production-normalized baselines
- Machine-level attribution and root-cause analysis
- Transitions from Path B to Path A capability level

---

**The governing principle:** Every customer gets real, verified prescriptions from day one at their integration level. We do not gate insights behind infrastructure upgrades. A Path A customer gets richer prescriptions faster. A Path B customer gets meaningful bill-level prescriptions immediately. The depth grows with the integration; the value starts immediately.

---

### 7.2 Core Capabilities

**1. Demand Intelligence and Maximum Demand Reduction**

Real-time and historical analysis of electricity demand patterns. Identifies when and why demand peaks occur — at shift start, during equipment startups, at certain production states. Quantifies the ₹ cost of each demand event. Prescribes specific scheduling changes (startup staggering, load sequencing, non-critical load shedding during peak windows) to reduce maximum demand (MD) charges.

MD charges represent 30–50% of a large Indian industrial electricity bill `[~]` and are triggered by often-avoidable demand spikes. This is typically the fastest win available — identifiable from bill and incomer meter data alone, actionable within the first billing cycle.

**2. Tariff Structure Optimization**

Analyzes the plant's actual consumption profile against its tariff structure (MSEDCL, DHBVN, PVVNL, or other state DISCOM tariff orders). Identifies whether the contracted maximum demand (CMD) is sized appropriately, whether time-of-use opportunities are being exploited, and whether power factor is attracting penalties or qualifying for rebates. Prescribes specific adjustments with ₹ impact figures.

**3. Utility Waste Detection**

Identifies energy consumption that cannot be attributed to productive work: machines running at idle, compressed air being consumed during non-production periods (a proxy signal for leaks), HVAC and heating systems running outside shift hours, motors running unloaded. At Stage 2, this becomes equipment-level with specific machine attribution.

Compressed air leaks alone typically account for 15–25% of compressed air system energy in poorly maintained plants `[~]` — identifiable from meter trend analysis even without dedicated flow meters.

**4. Prescription Engine**

Every identified inefficiency generates a specific prescription:

| Field | Content |
|---|---|
| **What** | Exact action required (e.g., "Clean inlet filter on Compressor 2 in the north compressor room") |
| **Why** | Root cause and evidence ("Compressor 2 specific power has increased 18% over the past 3 weeks — inlet differential pressure rising") |
| **Who** | Role responsible ("Electrical maintenance team") |
| **Effort** | Time and difficulty estimate ("2-hour job, no specialized tools") |
| **₹ Impact** | Monthly saving if done ("₹42,000/month at current operating hours") |
| **When** | Urgency ("Schedule in next maintenance window; if delayed beyond 2 weeks, efficiency will continue degrading") |

**5. Workflow and Execution Tracking**

Prescriptions do not stop at the alert. They become work items assigned to a specific person or role, with status tracking (Open → In Progress → Completed / Deferred / Rejected). Plant operator notification via WhatsApp. Plant head and owner visibility via dashboard. No prescription disappears into a report that nobody reads.

This is the layer that separates a real optimization engine from another monitoring platform. The insight-to-action gap is where most energy savings are lost.

**6. Savings Verification (Potential vs. Realized)**

After each prescription is marked complete, the system monitors post-action energy consumption against the adjusted baseline. Calculates whether the expected saving materialized — and by how much. Builds a running savings ledger: **"Since deployment, Stamped Energy has delivered ₹X in verified savings."**

This is the number the owner, the CFO, and any OEM sustainability auditor will ask for. It must be real, defensible, and attributable.

---

### 7.3 The Workflow Loop

```
CONNECT              OBSERVE           DECIDE            EXECUTE           MEASURE
────────────         ────────          ────────          ────────          ────────
SCADA / PLC /      Baseline           Prescription      Work order        Saving
CNC / Meters   →   + anomaly    →     with ₹         →  assigned     →    verified
+ Bill data        detection          impact            and tracked        in ₹
```

---

## 8. Outcomes We Deliver

The following outcome ranges are derived from industry benchmarks established by Zerowatt (20–30% average energy cost reduction across their fleet) and Greenovative (8–10% average). SME-specific validation is pending and will be updated as our own customer data accumulates. `[~]`

**Outcome 1 — Electricity Bill Reduction**
Target range: 12–20% reduction in total monthly electricity cost. `[~]`

What this means in rupees for our target bands:
- Band B (₹5 lakh/month bill): ₹60,000–1,00,000 saved per month; ₹7.2–12 lakh per year
- Band C (₹20 lakh/month bill): ₹2.4–4 lakh saved per month; ₹29–48 lakh per year

**Outcome 2 — Maximum Demand Charge Reduction**
Target range: 15–25% reduction in MD charges specifically. `[~]`

MD charges are typically the largest single avoidable cost item on an Indian industrial electricity bill. This outcome is often deliverable from Stage 1 data alone — no sub-metering required — and can appear in the first billing cycle after prescription execution.

**Outcome 3 — Utility Waste Identification and Elimination**
Target range: Identify and begin eliminating 10–20% of non-production-linked energy consumption within 90 days. `[~]`

This includes compressed air leaks (largest single waste source in most auto component plants), idle machine loads, and HVAC and heating systems running outside production hours.

**Platform payback target:** Subscription cost recovered within 3–6 months of deployment. `[~]`

**Time to first insight:** Within 2 weeks of first meter connection.

**Time to first verified saving:** Within the first complete billing cycle after the first prescription is executed.

*These outcome ranges will be updated to reflect our own validated customer data as it accumulates. They are targets, not guarantees, at this stage.*

---

## 9. Who We Serve (Initial ICP)

**Initial ICP — Auto Component Manufacturers, India (NCR Belt)**

Auto component manufacturers in India, concentrated in the Delhi NCR industrial belt as the primary geography — Faridabad, Manesar, Bawal, Noida, Greater Noida, Ghaziabad, Bhiwadi. Secondary expansion to Pune–Chakan and Chennai–Sriperumbudur after initial NCR validation.

> **Expansion note:** This is the initial ICP. The same energy waste patterns, integration model, and prescriptive approach apply across manufacturing verticals — process industries, pharma, metals, rubber moulding, food & beverage, and others. These verticals, and larger enterprise-scale manufacturers across all sectors, represent the next expansion layer once the auto component SME segment is validated. The platform is designed for manufacturing industries broadly; the ICP is focused for speed of initial entry.

Three segments, each with distinct infrastructure maturity, buying behavior, and deployment path:

---

### Small Organized Suppliers (50–200 employees)
₹10–100 Cr revenue `[~]` | Pvt Ltd, often family-owned | Tier 2/3, supplies to Tier 1 | ISO 9001 certified or working toward it | Single plant | Basic PLCs on major machines; energy meters at incomer; no SCADA | Monthly electricity bill ₹2–10 lakh `[~]`

**Why energy pain is acute:** Owner directly sees every cost line. Electricity bill is personally reviewed every month. Margins are compressed by Tier 1 price reduction pressure. Energy cost as a share of operating cost is often unknown precisely — which means the pain is real but undersized in the owner's mind until a specific ₹ figure is shown.

**Infrastructure reality:** Basic PLCs likely present; SCADA unlikely; energy meters usually at main incomer only. Path B integration is typical. Upgrading to sub-meters at 2–3 process areas is low-cost and often willing once value is demonstrated.

**Primary buyer:** Owner / MD is champion, economic buyer, and approver simultaneously. No procurement committee.

**How they buy:** Through trust and peer referrals. A specific INR figure, a fast low-risk pilot, and a reference from a peer in the same industrial estate are the three most effective conversion drivers. Skeptical of technology vendors; converts when they see results. WhatsApp is the primary operating channel.

---

### Medium Organized Suppliers (200–500 employees)
₹80–400 Cr revenue `[~]` | Formal Pvt Ltd or SME-listed | Tier 1/2, supplies directly to OEMs or large Tier 1s | IATF 16949 certified or in process | Single or dual plant | PLCs on most machines; often has SCADA at some level; energy meters at incomer and some feeders; ERP (SAP, Oracle, or Tally Prime Enterprise) | Monthly electricity bill ₹8–35 lakh `[~]`

**Why energy pain is acute:** OEM customers impose 2–5% annual price reduction targets `[~]`. Energy is 8–15% of operating cost in die casting, forging, and heat treatment `[~]` — the dominant processes in this segment. Every tariff hike is absorbed. The Electrical HOD has the data but not the tools; the Plant Head has the authority but not the time.

**Infrastructure reality:** This is the primary Path A segment. SCADA and PLCs are standard. Integration with existing systems is immediate and delivers the richest prescriptions from week 1.

**Primary buyer:** Plant Head / VP Operations as economic buyer. Electrical HOD or Energy Manager as champion and technical validator. CFO as mobilizer on annual contracts.

**How they buy:** Will run a structured pilot. Needs one verified saving before committing to an annual contract. Responds to ₹ figures, OEM audit language, and IPMVP-aligned savings documentation. Familiar with B2B software procurement.

---

### Larger Mid-Market Manufacturers (500–1,000 employees)
₹300–800 Cr revenue `[~]` | Formal Pvt Ltd or listed | Direct Tier 1 OEM supplier; may supply global OEMs | IATF 16949 certified | Multi-plant or large single plant | Full SCADA deployment; PLCs on all process lines; CNCs; energy metering infrastructure; ERP standard | Monthly electricity bill ₹25–80 lakh `[~]`

**Who they are:** These are organized, operationally mature manufacturers — not large enterprises on the scale of Bharat Forge or Samvardhana Motherson, but not small owner-operated shops either. They have energy managers or electrical HODs with defined roles. They face PAT scheme obligations if they are Designated Consumers `[!]`. They receive sustainability audit requests from global OEM customers.

**Why energy pain is acute:** Scale magnifies every inefficiency. A 5% demand charge reduction on a ₹40 lakh/month bill is ₹2 lakh saved per month. They have the infrastructure to find waste at machine level — but no software layer that synthesizes it into prioritized, tracked actions. Their existing EMS (if any) shows dashboards; it does not prescribe.

**Infrastructure reality:** Full Path A integration. SCADA, PLCs, CNCs, sub-meters, and ERP are all present and connectable. This segment produces the richest prescription output and the most defensible savings verification.

**Primary buyer:** VP Operations or COO as economic buyer. Head of Electrical / Energy Manager as champion. CFO or Corporate Sustainability Head as mobilizer for multi-site expansion.

**How they buy:** Longer cycle than smaller segments — typically 6–12 weeks from first conversation to pilot start. Requires formal pilot structure, IPMVP-aligned savings reporting, and possibly a group-level rollout conversation. Responds to verified case studies from comparable plants and to regulatory compliance language (PAT, ISO 50001, BRSR).

---

*Full ICP criteria, persona profiles, outreach sequences, and named lead research for Bands B and C are in: `ICP-AutoComponent-LeadSearch-Criteria.md` and `lead-research-auto-component-NCR-2026-06.md`. These documents will need to be extended to cover the 500–1,000 employee segment.*

---

## 10. Revenue Model

### Pilot Phase (All New Customers)

The pilot exists for one purpose: **remove financial risk from the first purchase decision and generate the first verified savings data point.**

- **Duration:** 4–8 weeks
- **Band C pilot pricing:** Fixed low fee `[~]` — working estimate ₹25,000–50,000 for the pilot period (to be calibrated through discovery calls)
- **Band B pilot pricing:** Two options:
  - Fixed low fee (working estimate ₹10,000–20,000)
  - Pay-as-you-save: a defined percentage of the first verified month's savings, capped at a ceiling — removes all financial risk for the owner
- **Goal of pilot:** Deliver one verified ₹ saving. Use that number to convert to a subscription.

### Monthly Subscription (Band B Post-Pilot)

- Month-to-month, no long-term commitment required initially
- Working estimate: ₹8,000–25,000/month per site depending on plant size and bill scale `[~]`
- Customer exits freely if savings stop materializing

### Annual Contract (Band C Post-Pilot)

- Annual commitment with quarterly savings reviews
- Working estimate: ₹1.5–6 lakh/year per site `[~]`
- Multi-site discount for Band C companies with multiple plants
- Includes formal IPMVP-aligned savings verification documentation (relevant for ISO 50001 and OEM audit purposes)

*All pricing figures above are working estimates based on target economics. They will be calibrated against what customers are willing to pay during discovery conversations and pilot results — not imposed in advance.*

---

## 11. Operating Bets

These are the current strategic beliefs underlying product and go-to-market decisions. They are **assumptions requiring validation**, not proven truths.

**Bet 1: The data floor at Stage 1 is sufficient.**
One smart meter + utility bill history is enough to generate meaningful prescriptions — specifically on demand charges, power factor, and time-of-use patterns — before any sub-metering or PLC integration is required. If discovery shows this is not true, we need to reassess the entry point or add a lightweight hardware component.

**Bet 2: Prescriptive + workflow outperforms prescriptive-only.**
The Insight → Action → Savings loop fails without workflow tracking. Recommendations that are not tracked are not executed. For SMEs, this is even more important than for enterprises — there is no dedicated energy manager whose job it is to chase down work orders. The workflow must be lightweight enough not to add friction, but structured enough to close the loop.

**Bet 3: INR-denominated outcomes are the only language that works.**
This audience makes decisions based on rupees saved per month — not kWh reduced, not percentage improvement, not carbon credits. Every prescription, every dashboard metric, every case study must lead with ₹. This is not a presentation choice; it is a product architecture principle.

**Bet 4: Pilot pricing is the key conversion unlock.**
The biggest barrier to first purchase in the SME segment is not price — it is skepticism from previous software disappointments. A cheap or pay-as-you-save pilot that delivers one verified saving eliminates this barrier more effectively than any sales argument. Conversion from pilot to contract, if the pilot delivers, should be high.

**Bet 5: The SME segment is genuinely underserved, not merely unaddressed.**
There is a meaningful difference between a segment nobody has tried and one that has been tried and failed. Our belief is that the economics work at this scale, the pain is real, and the gap exists because incumbents built for enterprise and never designed down. Discovery calls will confirm or disconfirm this within the first 10 conversations.

**Bet 6: Speed and price are durable early-stage advantages.**
Moving faster and pricing more accessibly than incumbents is a genuine advantage in years 1–2. As the product matures and the customer base grows, data network effects (cross-plant benchmarking, larger anomaly pattern libraries) become the durable moat. Use the speed and price window aggressively before it closes.

---

## 12. Risks and Honest Unknowns

**Risk 1: Stage 1 data may be too thin for useful prescriptions in some plant types.**
A plant with only an incomer meter and a bill provides limited machine-level signal. For certain plant types (precision machining, wiring harness assembly) where energy cost is lower and less process-intensive, Stage 1 may produce few or no high-value prescriptions. The ICP must be filtered to prioritize energy-intensive processes (die casting, forging, heat treatment, rubber moulding) where the signal-to-noise ratio at Stage 1 is higher.

**Risk 2: Action closure may be harder in Band B than assumed.**
In Band B, the owner is the only executor, approver, and champion simultaneously. If he is in production, traveling, or simply disengaged for a week, the prescription queue sits. The workflow must be designed with this reality in mind — minimum steps, WhatsApp-native, and designed to re-surface if not actioned within 48 hours.

**Risk 3: Band B at the low end may not sustain the unit economics.**
A Band B plant spending ₹2 lakh/month on electricity where we achieve 15% savings generates ₹30,000/month in savings. If our subscription is ₹15,000/month, the ROI is real but thin. Band B qualification should prioritize plants with electricity bills above ₹4–5 lakh/month and process-intensive operations (die casting, heat treatment) where higher savings percentages are achievable.

**Risk 4: Integration friction is unknown until tested.**
"Pure software, no hardware" assumes the smart meter is readable. The actual ease of reading a meter via Modbus, MQTT, or a utility-provided API varies significantly by meter brand, model, age, and plant IT maturity. Real deployment friction per customer is unknown until 3–5 actual installations are attempted. This risk does not block moving forward — it means being honest about deployment timelines in early conversations.

**Risk 5: The initial ICP remains a hypothesis.**
The auto component manufacturing segment in NCR is our best-formed hypothesis for the entry ICP — based on research, domain knowledge, and ICP modeling. It has not yet been validated through direct customer conversations. Everything in this document should be treated as a framework to test, not a confirmed business reality. Subsequent vertical expansion (other manufacturing sectors) and upmarket expansion (larger enterprises) carry their own assumptions, which will be sequenced after the initial ICP is validated.

---

## 13. Founder Context

Stamped Energy is founded by an Electrical Engineering graduate of IIT Roorkee, with academic research background in energy systems from the same institution. The problem is understood from first principles — not from consulting reports. The founder is AI-native, with a genuine technical understanding of what modern AI tooling can and cannot do in industrial settings. The operating thesis is that the combination of deep domain knowledge, AI-native product development velocity, and a genuine focus on the underserved SME segment creates an advantage over both the slow incumbents who serve large enterprises and the hardware-heavy IoT players who cannot price down to this market.

---

## 14. The North Star

There is one thing the customer buys: **a verified reduction in their electricity bill, measured in rupees per month.**

Not software. Not AI. Not a dashboard. Not sustainability reporting.

Every product decision, every pricing decision, every communication should be tested against one question:

> *Does this make it faster and more certain that the customer receives a verified reduction in their electricity cost, measured in rupees per month?*

If it does: build it, price it, communicate it. If it does not: remove it.

---

## Document Links and Dependencies

| Document | Purpose |
|---|---|
| `ICP-AutoComponent-LeadSearch-Criteria.md` | Full ICP criteria, persona profiles, outreach templates, search query blocks |
| `lead-research-auto-component-NCR-2026-06.md` | Named company lead list with financials, director contacts, fit scores |
| `energy_auto_india.md` | Domain knowledge foundation — processes, energy systems, tariffs, protocols, metrics |
| `indian-auto-component-industry-analysis__1_.md` | Industry X-ray — value chain, competitive landscape, macro trends |
| `Greenovative_Comprehensive_AI_Profile.md` | Competitive reference — architecture, GTM, outcomes |
| `Zerowatt_Comprehensive_Knowledge_Base.md` | Competitive reference — architecture, GTM, outcomes, IPMVP methodology |
| `DESIGN_v2.md` | Forge v2.0 design system — brand, color, typography, component library |

---

*Update log:*
*v1.0 — June 2026 — Initial document. All outcome figures are benchmark-derived, not customer-validated.*
*v1.2 — June 2026 — ICP scope clarified throughout: auto component manufacturing SMEs (NCR belt) is the initial ICP and entry wedge. Stamped Energy is designed as a manufacturing-industry-broad solution; other verticals and larger enterprise-scale manufacturers are explicit future expansion layers. Relevant sections updated: Identity & Positioning, Core Hypothesis, Market Gap, Product Vision, Who We Serve, Operating Bets, Risks.*
*v1.3 — June 2026 — Positioning language professionalised: One-Line Position, Working Tagline, What Stamped Energy Is / Is Not, Product Vision closing line, and North Star test updated for SaaS-grade tone. No substantive content changes.*
