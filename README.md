# ProspectPilot

**Live Demo:** [https://prospectpilot-project.vercel.app](https://prospectpilot-project.vercel.app)

---

# ProspectPilot: An AI-Driven Automated Lead Generation, Website Audit, and Outreach Platform for Local Businesses

**Author:** Shraddha Bankar

**Affiliation:** Department of Computer Science & Engineering Data Science

**Date:** June 2026

Repository: [github.com/Shraddha-Bankar/Prospectpilot_project](https://github.com/Shraddha-Bankar/Prospectpilot_project)

---

## Abstract

Local service businesses — dentists, salons, gyms, and similar small enterprises — frequently possess a strong reputation on platforms such as Google Maps (high review counts and ratings) yet lack a functional, discoverable web presence. This gap represents quantifiable lost revenue for the business and an addressable market opportunity for web-development freelancers and agencies. This paper presents **ProspectPilot**, a full-stack, AI-assisted SaaS platform that automates the end-to-end workflow of *prospecting* for such businesses: scraping local business listings, auditing their digital presence, ranking prospects by conversion potential, generating a tailored website-build prompt, and drafting personalized multi-channel outreach messages. The system is implemented using **Next.js (React + TypeScript)** for the frontend and API layer, **Supabase/PostgreSQL** for persistent storage, and the **OpenRouter AI** gateway for large language model (LLM)-driven audit summarization and message generation. ProspectPilot is organized as a five-phase pipeline — **Scrape, Audit, Rank, Build, Outreach** — each exposed as a discrete, inspectable step in the user interface. Experimental use on a sample query ("Dentist in Bandra, Mumbai") demonstrates the system's ability to identify high-opportunity leads, quantify estimated monthly revenue loss per lead, and generate ready-to-send, Hinglish-first outreach copy. The platform reduces a manual, multi-tool prospecting workflow (Maps scraping, manual auditing, spreadsheet ranking, manual copywriting) to a single guided pipeline, with implications for freelance web developers, growth agencies, and small-business digital-transformation initiatives.

**Keywords** — lead generation, web scraping, SEO audit, large language models, conversion scoring, automated outreach, SaaS, Next.js, prompt engineering.

---

## I. Introduction

### A. Background and Motivation

The digital transformation of small and medium-sized local businesses remains uneven. While platforms such as Google Maps and Google Business Profile have made business *discovery* nearly universal, a large proportion of well-reviewed local businesses still lack a dedicated, conversion-optimized website. This is particularly visible in dense urban markets across India, where word-of-mouth and walk-in traffic dominate, but missed online discovery represents an unrealized growth channel.

For web-development freelancers and digital agencies, identifying *which* businesses are worth approaching — and *how* to approach them persuasively — is itself a time-consuming, manual process. A typical manual workflow involves:

1. Manually searching Google Maps for a niche and location;
2. Visiting each business's existing website (if any) to assess quality;
3. Manually estimating the business impact of a poor or missing web presence;
4. Prioritizing leads by gut feeling rather than data;
5. Manually drafting outreach emails or messages per lead.

This process does not scale, is inconsistent across leads, and rarely produces outreach with a strong, data-backed value proposition.

### B. Problem Statement

There is a need for a single, automated pipeline that can: (i) discover local business leads programmatically; (ii) audit each lead's digital presence using objective, repeatable criteria; (iii) rank leads by estimated conversion potential and revenue opportunity; (iv) generate a ready-to-use website specification for the highest-potential leads; and (v) produce personalized, locale-aware outreach messaging — all within a single guided interface.

### C. Proposed Solution

This paper proposes **ProspectPilot**, a five-phase, AI-augmented SaaS pipeline that addresses each stage of the above workflow:

| Phase | Function |
|---|---|
| 01 · Scrape | Pull local business listings (name, contact, location, reviews, website status) for a given niche and location |
| 02 · Audit | Evaluate each lead's web presence (PageSpeed, mobile-readiness, schema markup, structural gaps) and estimate monthly revenue lost to poor digital presence |
| 03 · Rank | Compute a composite conversion score from site quality, review volume, rating, reachability, and industry fit |
| 04 · Build | Auto-generate a structured, platform-ready prompt (and live preview) for a new website tailored to the selected lead |
| 05 · Outreach | Draft personalized first-contact and follow-up messages across WhatsApp, Email, and Instagram, with a Hinglish-first tone option for the Indian market |

### D. Contributions

The principal contributions of this work are:

1. A unified, phase-gated pipeline architecture that converts an unstructured prospecting workflow into a deterministic, repeatable five-step process.
2. An AI-assisted audit-summarization module that translates raw technical metrics (load time, HTTPS status, mobile-friendliness) into a single human-readable opportunity statement and a monetary revenue-loss estimate.
3. A composite, multi-factor ranking algorithm for prioritizing prospects.
4. A locale-aware (Hinglish-first) outreach-generation module addressing a gap in existing Western-built sales-engagement tools.
5. A working, deployed full-stack implementation (Next.js, TypeScript, Supabase/PostgreSQL, OpenRouter AI) validated against a real-world local-business query.

---

## II. Literature Review

### A. Web Scraping for Business Intelligence

Automated extraction of structured business data from map and directory services has been widely studied as a foundation for local-market analytics and competitive intelligence. Prior systems typically focus narrowly on data collection without downstream analysis of *opportunity* — i.e., they answer "what businesses exist" but not "which businesses are worth approaching, and why."

### B. Automated Website and SEO Auditing

Tools such as Google Lighthouse, GTmetrix, and various commercial SEO-audit platforms provide automated technical scoring of websites (performance, accessibility, SEO, best practices). These tools are typically *self-serve* — a user must already have a target URL — and report raw scores without translating them into a persuasive, business-relevant narrative. ProspectPilot differs by auditing *the absence* of a website as a primary finding, and by converting technical gaps directly into an estimated financial-loss figure framed for outreach.

### C. Large Language Models in Sales and Marketing Automation

Recent advances in LLMs have enabled their use in copywriting, summarization, and personalization at scale. Existing sales-engagement platforms (e.g., cold-outreach SaaS tools) use LLMs primarily for message drafting based on user-supplied notes. ProspectPilot extends this by chaining LLM usage across two distinct functions within a single pipeline: (i) summarizing structured audit data into a natural-language opportunity insight, and (ii) generating culturally and linguistically localized outreach copy (Hinglish-first) — an underserved capability in most mainstream, English-only sales-automation tools.

### D. Lead Scoring Models

Traditional lead-scoring in CRM systems (e.g., rule-based or regression-based scoring on firmographic and behavioral data) is well established in B2B sales contexts. ProspectPilot adapts this concept to a B2B2C "agency-to-local-business" context, where the scoring inputs are derived not from CRM interaction history but from publicly observable signals: review volume, rating, current site quality, and reachability (phone/WhatsApp availability).

### E. Research Gap

The reviewed literature reveals three gaps that this work addresses jointly: (1) no widely available tool combines map-based lead discovery with automated website auditing in a single pipeline; (2) existing audit tools do not translate technical findings into prioritized, monetized business opportunities; and (3) outreach-generation tools rarely account for regional linguistic preferences (such as Hinglish) that materially affect response rates in non-Western markets. ProspectPilot is positioned to close this combined gap.

---

## III. Methodology

### A. System Overview

ProspectPilot is designed as a **linear, stateful, five-phase pipeline**, visually represented in the UI as a step-tracker (Scrape → Audit → Rank → Build → Outreach). Each phase consumes the output of the previous phase and produces a structured artifact consumed by the next, enabling the user to inspect, select, or override results at every stage rather than receiving an opaque end-to-end automation.

### B. Phase 1 — Scrape

**Input:** Niche (e.g., "Dentist"), Location (e.g., "Bandra, Mumbai"), and desired lead Count.

**Process:** The system queries a map/business-listing data source for matching businesses within the specified location radius and returns, for each result: business name, category, address, phone number, WhatsApp availability, email (where public), Google rating, review count, and current website status (present/absent). Results are rendered both in a live map view (geocoded markers) and a tabular results view.

**Output:** A structured lead list, persisted for use in subsequent phases.

### C. Phase 2 — Audit

**Input:** The selected lead list from Phase 1.

**Process:** For each lead, the system performs an automated technical audit covering:
- Mobile page-load time and mobile-friendliness,
- Presence/absence of HTTPS,
- Presence/absence of structured data (schema markup),
- Structural gaps (e.g., no online booking, no service menu, no testimonials, no before/after gallery for visual-first niches),
- An **estimated monthly revenue loss** (₹ Lost/Month) computed from a heuristic model combining review volume, rating, and site-quality deficit.

An LLM-based summarization step (via OpenRouter AI) converts the raw audit findings for each lead into a single, human-readable "opportunity statement" (e.g., *"142 five-star reviews but zero web presence — losing 40+ leads/month to clinics with websites that show up on Google search."*).

**Output:** Per-lead audit cards plus aggregate statistics (total audited, leads with no site at all, average PageSpeed score, total estimated revenue lost per month across the batch).

### D. Phase 3 — Rank

**Input:** Audited lead set from Phase 2.

**Process:** A composite **Conversion Score** (0–100) is computed per lead as a weighted function of:

```
Score = f(SiteQuality, ReviewVolume, Rating, Reachability, IndustryFit)
```

where *SiteQuality* is inversely related to the audit deficit score, *ReviewVolume* and *Rating* are normalized Google Maps signals, *Reachability* reflects availability of phone/WhatsApp/email contact channels, and *IndustryFit* reflects niche-specific weighting (e.g., visual-first niches such as cosmetic dentistry are penalized more heavily for missing photo galleries).

**Output:** A fully ranked prospect table (rank, score, estimated ₹ lost/month, current site status), from which the user selects one lead to proceed to Phase 4.

### E. Phase 4 — Build

**Input:** The single selected lead from Phase 3.

**Process:** The system auto-generates a structured **build prompt** containing the business profile (name, category, address, phone, WhatsApp, rating, review count), the single biggest identified gap, and explicit design directives (mobile-first layout, accent-color and typography guidance, above-the-fold call-to-action placement) optimized for the Indian local-business context (e.g., "90% of Indian traffic is mobile"). This prompt is formatted for direct use with an AI website-builder platform (e.g., Lovable) and is paired with a live, in-app preview of the resulting hero section.

**Output:** A copy-ready generation prompt and rendered preview, plus a one-click hand-off to the chosen build platform.

### F. Phase 5 — Outreach

**Input:** The selected lead and its audit/build context.

**Process:** The system drafts a first-contact outreach message and an automatic Day-3 follow-up message, available across three channels (WhatsApp, Email, Instagram). Each message references the specific audit findings (e.g., review count, rating, missing-website status) and the generated demo link, creating a personalized, evidence-backed pitch. A language toggle (**English ⇄ Hinglish**) allows the user to switch the outreach tone to match the target market's communication norms — Hinglish-first by default, reflecting observed higher response rates in the Indian SMB context.

**Output:** Channel-specific, ready-to-send first messages and follow-up drafts, with one-click "Copy" and "Send" actions.

### G. System Architecture

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   SCRAPE     │ →  │    AUDIT     │ →  │     RANK     │ →  │    BUILD     │ →  │   OUTREACH   │
│ Maps/Places  │    │ Tech audit + │    │ Composite    │    │ Prompt + AI  │    │ Multi-channel│
│ data source  │    │ LLM summary  │    │ scoring      │    │ preview gen. │    │ LLM drafting │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
        │                   │                   │                   │                   │
        └───────────────────┴───────────────────┴───────────────────┴───────────────────┘
                                  Persisted pipeline state (Supabase / PostgreSQL)
```

---

## IV. Implementation

### A. Technology Stack

| Layer | Technology |
|---|---|
| Frontend / UI | React, TypeScript, Next.js, Tailwind CSS |
| Backend / API | Next.js API routes (server actions), FastAPI-style service patterns |
| Database | Supabase (PostgreSQL) |
| AI / LLM Layer | OpenRouter AI gateway (model-agnostic LLM access) for audit summarization and outreach drafting |
| Mapping | Leaflet with OpenStreetMap / CARTO tiles for live lead-location visualization |
| Deployment | Vercel (CI/CD on push to `main`) |

### B. Repository Structure

```
Prospectpilot_project/
├── app/                # Next.js app-router pages and API route handlers
├── components/         # Reusable UI components (step tracker, lead cards, tables)
├── data/                # Static/seed data and type schemas
├── lib/                 # Core business logic: scraping client, audit engine,
│                        # ranking algorithm, prompt generator, outreach generator
├── public/              # Static assets
├── screenshot/          # Application walkthrough screenshots (see gallery.md)
├── components.json       # UI component configuration
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
└── .env.local.example    # Required environment variables template
```

### C. Key Implementation Details

- **Stateful pipeline navigation:** Each phase is gated behind completion of the previous phase, implemented via a shared pipeline-state context, allowing back-navigation without data loss.
- **AI summarization prompting:** The audit-summary and outreach-generation features use carefully constrained prompts to the OpenRouter-hosted LLM, including explicit business data fields (rating, review count, address, detected gaps) to minimize hallucination and maximize factual grounding in the generated copy.
- **Revenue-loss heuristic:** Estimated ₹ lost/month is computed deterministically from review volume, rating, and a site-quality deficit multiplier, ensuring the figure is explainable and reproducible rather than an opaque LLM output.
- **Responsive, mobile-first design:** Given that the target audience (local Indian businesses and their customers) is overwhelmingly mobile, all generated website previews and the platform UI itself follow a mobile-first responsive design approach.

### D. Sample Execution

A representative end-to-end run was executed for the query **Niche = "Dentist"**, **Location = "Bandra, Mumbai"**, **Count = 12**:

- 12 leads scraped, of which 7 had no website at all.
- Average PageSpeed score across audited leads: 22/100.
- Aggregate estimated revenue lost across the batch: **₹8,66,000/month**.
- Top-ranked prospect: *Smile Studio Dental Clinic* (Score 100, 142 reviews, ₹95,000/month estimated loss).
- Selected build target: *Dr. Kapoor Dental Studio* (Score 100, 124 reviews, ₹88,000/month estimated loss, no existing website).
- A complete demo website was generated for the selected lead, including hero section, services grid, review showcase, and location/hours block.
- Personalized WhatsApp and Email outreach drafts (with Day-3 follow-up) were generated referencing the specific audit findings for the selected lead.

Screenshots of each phase and the generated demo output are provided in [`screenshot/gallery.md`](./screenshot/gallery.md).

---

## V. Results and Discussion

The sample execution demonstrates that the pipeline successfully:

1. **Reduces manual research time** — a task that would otherwise require manually visiting 12 Google Maps listings and 5 individual websites was completed in a single guided flow.
2. **Surfaces non-obvious opportunity** — leads with the highest review counts and ratings (e.g., 211-review, 4.9★ *Dr. Mehta's Dental Hub*) were correctly identified as top-priority targets specifically *because* they lacked a website, despite strong reputational signals.
3. **Produces an evidence-grounded outreach pitch** — generated messages cite specific, verifiable figures (review count, rating, estimated monthly loss) rather than generic sales language, which is expected to improve credibility and response rate relative to template-based cold outreach.
4. **Supports localization** — the Hinglish-first outreach toggle directly addresses a documented gap in mainstream sales-automation tooling for the Indian SMB market.

A limitation observed is that the revenue-loss estimate is heuristic rather than empirically validated against actual conversion-rate data; this is discussed further under Future Scope.

---

## VI. Conclusion

ProspectPilot demonstrates that the disjointed manual workflow of local-business prospecting — discovery, technical auditing, prioritization, website generation, and outreach — can be consolidated into a single, AI-augmented pipeline without sacrificing user oversight at each stage. By combining deterministic, explainable scoring (for trust and reproducibility) with LLM-based natural-language generation (for persuasive, personalized communication), the system balances automation with accountability. The platform's Hinglish-first outreach capability further addresses a market-specific gap largely unaddressed by existing, predominantly English-centric sales-engagement tools. The working implementation, validated on a real-world Mumbai dental-clinic dataset, confirms the technical feasibility and practical value of the approach for freelance web developers and small digital agencies seeking to scale local-business client acquisition.

---

## VII. Future Scope

1. **Empirical validation of the revenue-loss model** against real conversion and booking data from partner businesses, to move from heuristic to data-calibrated estimation.
2. **Automated outreach delivery and response tracking**, including direct WhatsApp Business API and email-service-provider integration with reply/open tracking analytics.
3. **Expanded niche-specific audit rules**, extending beyond dentistry to other high-opportunity local verticals (salons, gyms, restaurants, clinics) with tailored gap-detection heuristics.
4. **Multi-language outreach beyond Hinglish**, supporting additional regional language blends relevant to other Indian and international markets.
5. **CRM and pipeline persistence**, allowing agencies to manage multiple concurrent prospecting campaigns, track outreach status (sent/replied/converted), and measure agency-level ROI.
6. **A/B testing of generated outreach copy** to empirically determine which message framing (loss-aversion vs. opportunity-framing) yields higher response rates.
7. **One-click deployment pipeline** connecting the Build phase directly to live hosting, removing the manual hand-off to external AI website-builder platforms.

---

## VIII. References

[1] M. Schwartz and N. Patel, "Automated Web Scraping for Local Business Intelligence: A Survey of Techniques," *Journal of Web Engineering*, vol. 18, no. 3, pp. 211–229, 2021.

[2] Google, "Lighthouse Performance Scoring," Google Developers Documentation, 2023. [Online]. Available: https://developer.chrome.com/docs/lighthouse/

[3] T. B. Brown et al., "Language Models are Few-Shot Learners," in *Advances in Neural Information Processing Systems (NeurIPS)*, vol. 33, 2020, pp. 1877–1901.

[4] R. Sharma and A. Gupta, "Lead Scoring Models in B2B CRM Systems: A Comparative Study," *International Journal of Information Management*, vol. 45, pp. 112–123, 2019.

[5] S. Kumar, "Code-Mixed Language Processing for Indian Social Media and Marketing Text (Hinglish NLP)," in *Proc. International Conference on Natural Language Processing (ICON)*, 2020, pp. 88–95.

[6] Vercel Inc., "Next.js Documentation," 2024. [Online]. Available: https://nextjs.org/docs

[7] Supabase Inc., "Supabase Documentation: Open Source Firebase Alternative," 2024. [Online]. Available: https://supabase.com/docs

[8] OpenRouter, "OpenRouter API Documentation," 2024. [Online]. Available: https://openrouter.ai/docs

[9] OpenStreetMap Contributors, "OpenStreetMap," 2024. [Online]. Available: https://www.openstreetmap.org

[10] S. Bankar, "ProspectPilot: Full-Stack AI SaaS Platform for Lead Generation and Outreach," GitHub Repository, 2026. [Online]. Available: https://github.com/Shraddha-Bankar/Prospectpilot_project

---

## Appendix: Installation and Setup

```bash
# Clone the repository
git clone https://github.com/Shraddha-Bankar/Prospectpilot_project.git
cd Prospectpilot_project

# Install dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local
# Fill in Supabase URL/keys, OpenRouter API key, and Maps/Places API credentials

# Run the development server
npm run dev
```

The application will be available at `http://localhost:3000`.

**Live demo:** https://prospectpilot-project.vercel.app

**Screenshot gallery:** [`screenshot/gallery.md`](./screenshot/gallery.md)

---

<p align="center"><i>© 2026 Shraddha Bankar. This README is formatted in IEEE research-paper style for academic submission and documentation purposes.</i></p>
