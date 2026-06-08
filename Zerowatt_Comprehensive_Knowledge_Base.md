# Comprehensive AI Knowledge Base: Zerowatt (Alphageek Enterprises Pvt. Ltd.)
> **Document Purpose:** A high-density, fully synthesized knowledge base combining business strategy, financial due diligence, product positioning, and technical architecture of Zerowatt. Optimized for AI parsing, retrieval-augmented generation (RAG), and strategic analysis.

## 1. Entity Metadata & Executive Overview

### 1.1. Core Identity
* **Entity Name:** Alphageek Enterprises Private Limited
* **Brand Name:** Zerowatt
* **Website:** https://zerowatt.energy
* **Sector:** Industrial Energy Intelligence / CleanTech / Industrial IoT / Prescriptive Analytics
* **Headquarters:** IIT Madras Research Park, Chennai, Tamil Nadu, India
* **Other Locations:** Leicester, UK; Kochi, Kerala (founding/registered address)
* **Founded:** 2018 (Alphageek Enterprises); brand active ~2020
* **Employee Estimate:** 30–70 (inferred from pod model and site coverage)
* **Research Date:** June 2026

### 1.2. Synthesis Statement
Zerowatt is an integration-first, AI-driven industrial energy intelligence platform operating a hybrid edge-to-cloud architecture. It goes beyond descriptive energy monitoring (dashboards) to deliver **prescriptive, automated root-cause analysis** and quantified repair recommendations. Built by domain experts from NTPC, the platform's core moat is its encoded operational knowledge and native use of the IPMVP (International Performance Measurement and Verification Protocol) to guarantee auditor-defensible savings (12–30% verified SEC reduction). 

## 2. Founder Profile & Operational Context

The company DNA is heavily skewed toward energy domain operations rather than traditional software engineering.
* **Ansha Naji (CEO):** 14 years at NTPC (India's largest energy utility). Led power plant operations, green hydrogen, carbon-capture, and energy storage verticals.
* **Sooraj Surendran (COO):** Expert in grid commissioning and industrial rollouts. Operational execution background.
* **Subin Abid (CPO):** NTPC project management background. Focuses on product scoping and delivery in power sector contexts.
* **Rishy George (Strategic Advisor):** Background not publicly detailed.
* **Technical Implication:** The technical architecture relies on well-established IoT/Cloud patterns rather than novel ML infrastructure. The proprietary moat is the *codification of the founders' domain knowledge* (heuristics, audit guidelines, energy physics) into the AI rule engine.

## 3. Product Suite Overview

Zerowatt offers two distinct product lines catering to different markets:

### 3.1. ZOE (Zerowatt Optimization Engine) - Enterprise Platform
* **Target Audience:** Energy managers, plant heads, CFOs, ESG teams, and executives at large industrial facilities.
* **Function:** A "virtual energy expert" embedded via a hybrid edge + cloud deployment. 
* **Value Prop:** Generates specific repair instructions with cost-impact quantification (e.g., "Clean Compressor #3 intercooler for an immediate 12% improvement / $3.4K monthly savings").
* **Key Features:** Conversational AI querying (ZOE Chat), automated baseline calculation (IPMVP), logbook learning (ingesting unstructured manual shift notes), multi-stakeholder dashboards.
* **Deployment:** No greenfield infrastructure required; layers on top of existing BMS, PLC, SCADA, and MES.

### 3.2. Smart Energy Monitor - SMB / Consumer Hardware
* **Status:** Pre-booking phase (Q3 2026 ship target, capped at 500 units). *Not currently a material revenue driver.*
* **Target Audience:** Homes, shops, restaurants, hotels, small factories.
* **Function:** 12-circuit clip-on IoT device, WiFi-connected, installed in 15 minutes.
* **App Capabilities:** AI-powered anomaly detection, real-time circuit data, bill prediction.

## 4. Business Model & Go-To-Market (GTM)

### 4.1. Revenue Model & Economics
* **Model:** Enterprise Subscription SaaS wrapper with a high-touch managed service layer.
* **Pricing (Inferred):** ~₹5–25L per site annually based on facility size. ROI payback claimed within 3–6 months.
* **Service Layer ("Customer Pods"):** Dedicated pods consisting of energy engineers, data scientists, and success managers provide weekly syncs, quarterly reviews, and IPMVP M&V reports.
* **Hardware:** Deploys edge gateways/sensors where gaps exist; likely amortized or charged upfront.

### 4.2. Target ICP (Ideal Customer Profile)
* **Energy Spend:** > ₹50L/month (~$60K/month).
* **Environment:** Continuous/batch production, critical utilities, multi-line/multi-site.
* **Drivers:** Regulatory compliance (PAT Cycle IX, BRSR) and aggressive sustainability mandates.

### 4.3. Traction & Financials
* **Client Volume:** 100+ industrial sites, 120+ MW under management.
* **Reported Revenue:** ₹1.41 Cr (~$170K USD) as of FY2025 (Tracxn). Note: *This reveals a scale gap compared to the client count, suggesting pilot pricing, deferred revenue, or outdated DB numbers.*
* **Target:** Company states a ₹40 Cr 12-month revenue target (requires ~28x growth).
* **Backing:** Supported by Kerala Startup Mission (KSUM), IIT Madras Incubation Cell, and MeitY GENESIS.
* **UK Expansion:** Announced £10M (₹116 Cr) investment linked to India-UK bilateral trade deal in July 2025.

### 4.4. Key Customers
* **Notable:** Indian Oil Corporation Limited (IOC) - major trust signal for PSU procurement. Mahindra Aerospace, Peekay Steel, Manorama Group, Venus Water Heaters, VKC Pride, Infoparks Kerala, Aquasub, Santhi Gears, Milma, Medreich Pharma.

### 4.5. Marketing & Distribution
* **Channels:** Deeply India-native. Utilizes WhatsApp for alert delivery and sales inquiries. Regional TV (Startup Singam on Star Vijay) for trust building in the South India manufacturing belt.
* **Partnerships:** JK Cement (Bharat Startup Grand Challenge winner), IIT Madras ecosystem.

## 5. Technical Architecture & Data Stack
*(Note: Zerowatt has no public developer docs. Inferences below are flagged by confidence level.)*

### 5.1. System Architecture (Hybrid Edge + Cloud)
* **Edge Layer:** Gateways aggregate local data, translate protocols (Modbus, OPC-UA), buffer during network outages, and encrypt traffic.
* **Cloud Platform:** Ingests telemetry into a time-series database. Runs ML pipelines and Rule Engines asynchronously/streamed. Contains IPMVP logic. 
* **User Delivery:** Mobile App (React Native/Flutter), Web Dashboard, and WhatsApp Business API.

### 5.2. Tech Stack Inferences (Low-Medium Confidence)
* **IoT Protocols:** MQTT, Modbus/RTU, OPC-UA. REST APIs for ERP/MES.
* **Databases:** Time-series DB (InfluxDB/TimescaleDB), Relational DB (PostgreSQL).
* **AI/ML:** Python ML stack (scikit-learn/XGBoost for anomaly detection); LLM + RAG for ZOE Chat conversational AI; OpenCV for thermal imaging pipelines.
* **Infrastructure:** AWS/Azure, Docker/Kubernetes, TLS 1.2+ transit, AES-256 rest.

### 5.3. Data Ingestion Verticals
* **Structured IoT:** Energy analyzers, flow meters, thermal cameras, vibration sensors, BMS/SCADA dumps.
* **Unstructured (Differentiator):** Manual logbooks, operator shift notes, SOPs. ZOE parses these to cross-reference sensor anomalies with institutional tribal knowledge (e.g., last cleaning dates).
* **Environmental Context:** Temp, humidity, CO2, emissions data.

## 6. The Core ML/AI Workflow (8-Step Execution)
*Example: Resolving Compressor Energy Waste*
1. **Continuous Ingestion:** SCADA pushes compressor power/temp/pressure data + logbook maintenance dates.
2. **Baseline Establishment:** ZOE calculates expected baseline for the load/ambient temp using IPMVP protocols.
3. **Anomaly Detection (Streaming):** Identifies power draw is 15% above baseline + elevated thermal differential at the intercooler.
4. **Root Cause Analysis (Rule + ML Hybrid):** Matches pattern to expert rules: `Elevated temp + high kWh @ same load = intercooler fouling`. Validates via logbook (last cleaned 4 months ago).
5. **Prescriptive Insight Generation:** Outputs exact action ("Clean intercooler"), effort ("Low"), and ROI ($3.4K/month savings).
6. **Delivery:** Pushes to WhatsApp (Plant Supervisor) + Web Dashboard (Energy Manager).
7. **Execution Tracking:** Supervisor marks action completed. ZOE monitors post-action energy draw.
8. **Measurement & Verification (M&V):** ZOE compares new baseline to old baseline, verifies exact savings, and updates the financial ledger.

## 7. Competitive Landscape & Moat

### 7.1. Competitors
* **True Competitors:** Schneider Electric EcoStruxure, Siemens Energy Manager, Samsara (Industrial prescriptive analytics).
* **Adjacent (Not direct competitors):** Landis+Gyr (hardware/meters), Sense (consumer), Prescinto (renewables specific).

### 7.2. Competitive Defensibility (The Moats)
1. **IPMVP Native Architecture:** Savings are legally defensible and auditor-ready out-of-the-box. Eliminates the "prove it works" procurement blocker.
2. **Hybrid ML + Rules Engine:** ML finds the anomalies; Rules explain *why* and *how to fix it*. Pure ML cannot explain itself to an industrial operator; pure rules cannot scale. Zerowatt's hybrid model is highly defensible.
3. **Logbook Learning:** Ingesting unstructured historical data creates a sticky data moat.
4. **Integration First:** By integrating with existing PLCs and SCADAs via Modbus/OPC-UA, they bypass massive CAPEX barriers.

## 8. Regulatory Context & Security
* **Security:** ISO 27001-aligned controls, granular RBAC (Role-Based Access Control).
* **PAT Cycle IX (India):** Platform supports Perform, Achieve and Trade mandates, making the software a regulatory necessity for Indian heavy industry.
* **BRSR Ready:** Automates GHG Scope 1-3 accounting required by SEBI for top 1000 listed companies.
* **UK Expansion:** Will necessitate GDPR localization and UK specific net-zero scheme compliance.

## 9. Strategic & Technical Risks

| Risk Type | Description | Severity |
| :--- | :--- | :--- |
| **Financial Scale Gap** | Discrepancy between 100+ claimed clients and ₹1.41 Cr revenue. Suggests heavily discounted pilot pricing or flawed public data. | High |
| **Service Scaling Ceiling** | Relying on human "Customer Pods" for weekly syncs and M&V reporting limits SaaS margins and exponential scale. | High |
| **Funding Transparency** | The exact nature of the £10M UK trade deal investment (equity vs grant vs commercial commitment) is unverified. | High |
| **Data Quality Dependency** | "No rip-and-replace" means ZOE relies on the client's existing (sometimes failing or low-fidelity) sensor networks. | Medium |
| **UK Market Entry** | Requires strict GDPR compliance, new relationships outside the Indian PSU network, and different M&V regulatory alignments. | Medium |

## 10. Playbook: Lessons & Strategic Adoptions

### 10.1. Product & Engineering Adoptions
* **Build IPMVP into the DB Primitives:** Savings ledgers and non-routine baseline adjustments must be fundamental data types, not frontend spreadsheet exports.
* **Multi-Modal Dashboards:** A single dataset must output different UI layers: WhatsApp alerts for operators, ROI cards for managers, ESG metrics for C-suite.
* **WhatsApp as Primary UI:** In Indian/emerging industrial markets, SMS and push notifications fail. WhatsApp Business API is the optimal delivery layer for real-time edge alerts.
* **Unstructured Data Ingestion:** Start with structured drop-downs for logbooks, evolve into NLP pipelines. Capturing operational tribal knowledge is a massive competitive differentiator against pure-sensor IoT.

### 10.2. Business & GTM Adoptions
* **Domain Expertise > Generalist AI:** ZOE's success stems from NTPC veterans writing the rules, not a black-box LLM. Hire energy engineers, not just data scientists.
* **Regulatory Tailwinds as Sales Funnels:** Position the product as a PAT/BRSR compliance tool to convert the software from a "nice-to-have ROI generator" to a "mandatory operational expense."
* **Regional Trust Building:** Local TV (Startup Singam) and regional hubs (KSUM) are more effective for deep-industry B2B in India than generic digital marketing.
* **Government/Institution Halos:** Stacking IIT Madras, MeitY, and IOC pilot logos constructs a fortress of credibility required to close massive PSU contracts.

---
*End of Knowledge Base.*
