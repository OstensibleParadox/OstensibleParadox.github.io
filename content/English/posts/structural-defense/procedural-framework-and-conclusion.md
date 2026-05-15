+++
date = "2026-05-08T08:00:00+08:00"
draft = false
title = "Procedural Framework and Conclusion"
categories = ['Academic Papers']
tags = ["AI governance", "legal attribution", "products liability", "constraint cascade", "structural defense"]
translationKey = "structural-defense-5"
weight = 5
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

The §3$$§2 resolution sequence requires a procedural mechanism for Cascade-guided structural discovery. We propose a framework consistent with existing federal discovery practice under the Federal Rules of Civil Procedure, adapted to the architectural structure of AI deployment.

## Tiered Discovery Based on the Epistemic Boundary

The Cascade partitions deployment architecture by observability. Discovery should be tiered accordingly:

**Tier 1 (L1–L2): Routine discovery.** Session logs, user interaction history, interface configuration at time of harm, system prompt, agent/skill settings, accumulated token counts. These are logged in the ordinary course of deployment and are accessible without protective order. L1–L2 discovery can proceed immediately upon §3 satisfaction.

**Tier 2 (Epistemic boundary): Logging-manifest discovery.** The logging manifest—the enumeration of what internal states are recorded and what are not—is the key diagnostic document. It enables computation of the static certificate $_state^UB$ from deployment topology (*Dual Certificates* Corollary 2), quantifying the structural information gap between what the reviewer sees and what the system's internal state contains. This computation does not require access to the weights themselves, only to the deployment architecture and logging configuration. Tier 2 discovery should be subject to a standard protective order but does not require the heightened protections of weight-level access.

**Tier 3 (L3): Weight-level and training-data discovery.** Access to model weights, training data compositions, RLHF methodology documentation, and internal defect-tracking databases. This tier implicates trade secrets and may require heightened protective orders, special masters, or in camera review. The Cascade limits the scope of Tier 3 discovery by identifying *which* L3 information is relevant to §2 classification:

itemize
**Design defect (§2(b)):** Training methodology documentation, RLHF reward model specifications, pre-deployment safety evaluation results, known-defect tracking databases, model version history. Full weight access may not be necessary if the defect can be characterized through methodology documentation and behavioral testing under controlled conditions.

**Manufacturing defect (§2(a)):** Instance-specific deployment configuration, weight checksums or hashes to verify integrity of the specific model instance that produced the harm, deployment-log verification. Manufacturing-defect claims are likely rare for AI systems; they would arise when a specific deployment instance diverges from the intended configuration through corruption or unauthorized modification.

**Data-sourcing defect:** Training-data provenance records, data-filtering methodology, contamination-detection protocols. This is the least protected category of L3 information; data-provenance documentation does not typically implicate the same trade-secret concerns as weight access.
itemize

**Tier 4 (L4): Strategic-authority discovery.** Internal communications regarding safety resource allocation, product timeline decisions, regulatory compliance assessments, and (for sovereign L4) government procurement specifications and communications. Tier 4 discovery implicates attorney-client privilege, work-product doctrine, and (for sovereign L4) state-secrets and deliberative-process privileges. The Cascade limits Tier 4 discovery to communications specifically concerning the architectural layer at which the defect is diagnosed: if the defect is at L2, L4 discovery is generally unnecessary; if the defect is diagnosed as L4 resource deprivation (as in Soelberg), L4 discovery is essential.

## Burden-Shifting Under the Cascade

The Cascade suggests a burden-shifting framework that aligns with existing products liability practice:

enumerate
**Plaintiff's prima facie burden:** (§3 satisfied) The plaintiff establishes that the AI system produced harmful output of a kind that ordinarily occurs as a result of a product defect. This burden is satisfied by the behavioral evidence alone.

**Defendant's Cascade response:** The defendant may rebut by identifying, through Cascade analysis, the specific architectural layer at which the defect is located and arguing that the defect does not satisfy the relevant §2 standard. For example: "The defect is at L2 (Interface), and the interface configuration satisfied the reasonable-alternative-design test for warning defects under §2(c)."

**Plaintiff's §2 burden:** If the defendant identifies a specific layer, the plaintiff must satisfy the §2 standard for that layer. If the defendant does not identify a specific layer—whether because the information is unavailable (structural underdetermination) or because identification would be adverse to the defendant's position—the plaintiff may proceed under §3's malfunction inference alone, and the trier of fact may draw an adverse inference from the defendant's failure to identify the defect's architectural location.

**Sovereign-L4 special case:** When the defendant identifies L4 (sovereign) as the defect location, the burden shifts to the government to establish the *Boyle* defense or to justify the override under Administrative Law standards. The developer's identification of sovereign L4 as the defect location, supported by Cascade analysis, should be sufficient to shift the burden; the developer should not bear the burden of proving the government's override was arbitrary when the government possesses the relevant evidence.
enumerate

This framework does not alter the substantive liability standards of the Restatement (Third). It provides a procedural mechanism for applying those standards to AI systems by resolving the architectural-identification problem that the epistemic boundary creates.

## Cross-Jurisdictional Extensibility

The doctrinal mapping developed above is built on U.S. tort architecture (Restatement Third) because it provides the most developed doctrinal vocabulary for products liability. The Cascade's architectural diagnosis—identifying which layer failed—is jurisdiction-independent; the liability mapping is jurisdiction-specific. This Part sketches extensibility to two major alternative frameworks.

## European Union: AI Act and Revised Product Liability Directive

The EU AI Act operates primarily at L3 (requirements for high-risk AI systems, data governance, transparency) and L4 (regulatory obligations for providers and deployers). L2 appears in the Act's transparency obligations (Article 50); L1 is largely outside the Act's scope. The revised Product Liability Directive, effective December 2026, treats AI systems as products and developers as manufacturers, extending strict liability to software.

The Cascade maps onto these instruments as follows:

itemize
**L1 (Environment):** Not directly addressed. The AI Act's data-governance requirements (Article 10) address training-data quality but not passive contamination from deployment-environment norms.
**L2 (Interface):** Article 50 transparency obligations. The revised PLD's strict-liability framework does not distinguish between L2 warning defects and L3 design defects; the Cascade identifies this conflation as a doctrinal gap.
**L3 (Algorithm & Weights):** AI Act Articles 9–15 (risk management, data governance, transparency, human oversight, accuracy). The revised PLD's strict liability for design defects.
**L4 (Strategic Authority):** AI Act obligations for providers (Article 16) and deployers (Article 26). The Cascade distinguishes between corporate and sovereign L4, a distinction the AI Act does not draw because it does not contemplate sovereign-override scenarios.
itemize

The EU's withdrawal of the AI Liability Directive in February 2025, amid acknowledged difficulties in fault attribution across the AI supply chain, confirms the structural diagnosis: fault-based liability attribution for AI systems is structurally infeasible without an architectural diagnostic instrument. The Cascade provides the missing instrument; its incorporation into EU regulatory practice would enable the fault-based analysis that the withdrawn Directive envisioned.

## China: CAC Regulations and the Yuanbao Precedent

China's Cyberspace Administration of China (CAC) January 2026 draft regulations requiring layer-specific governance for AI systems represent the first regulatory acknowledgment of the Cascade's architectural diagnosis. The Yuanbao incident—passive L1 contamination producing L3 weight-level defects, with cross-modal recurrence—provides a concrete illustration of why layer-specific governance is necessary: a text-layer L2 intervention could not prevent image-layer recurrence because the contamination was at L3, not L2.

The CAC draft regulations do not yet map layers to liability doctrines; they are a regulatory-governance instrument, not a tort-law instrument. The Cascade provides the missing doctrinal mapping, adaptable to China's product-quality law framework and the Tort Liability Law of the People's Republic of China.

## Conclusion: From Output-Censorship to Structural Choice-of-Law

The current trajectory of AI liability law is unsustainable. Courts confronted with AI harm can determine *that* a product is defective (§3) but cannot determine *which* liability standard applies (§2) because the behavioral evidence that satisfies §3 structurally underdetermines the architectural location of the defect. The result is doctrinal oscillation: complaints plead design defect, manufacturing defect, and failure-to-warn in the alternative, not because all theories are meritorious, but because no structural framework exists for choosing among them.

The Cascade resolves this paralysis by shifting the analytical frame from output-censorship to structural choice-of-law. Rather than asking "what did the model output?"—a question the epistemic boundary prevents from resolving §2 classification—courts should ask "which layer of the deployment architecture failed?" The question is architectural, not behavioral. It can be answered through structural discovery. And the answer determines the applicable liability doctrine.

This shift has three practical consequences:

enumerate
**Pleadings specificity.** Complaints alleging AI defect should identify, to the extent feasible from publicly available information, the architectural layer(s) at which the defect is believed to originate. This specificity serves the notice function of pleading and narrows the scope of discovery.

**Discovery efficiency.** Cascade-guided tiered discovery reduces the cost and scope of AI litigation by targeting discovery at the specific architectural information relevant to §2 classification, rather than compelling undifferentiated access to "the model" or "the algorithm."

**Doctrinal coherence.** The Cascade enables courts to apply existing products liability doctrine to AI systems without doctrinal innovation. The Restatement (Third) already provides the §2 categories; the Cascade provides the diagnostic vocabulary to determine which category applies. No new liability categories, no extension of legal personhood to AI systems, and no departure from strict-products-liability principles are required.
enumerate

The behavioral inference chain that has served products liability law since *Greenman* is broken for AI systems. The Cascade repairs it not by restoring behavioral inference but by replacing it with structural diagnosis. The deeper implication is that AI law has been applying the wrong paradigm. Human law developed behavioral inference because the human mind *is* a black box—inaccessible in principle. AI presents the inverse: a system whose internal states are mathematically auditable but whose outputs are behaviorally underdetermined. To persist in output-censorship under these conditions is to choose the wrong instrument for the available evidence. Structural access can reveal capacities that behavioral observation cannot; behavioral observation can reveal deployment patterns that structural analysis cannot predict. The Cascade integrates both—not by choosing between them, but by mapping each to the architectural layer where it carries diagnostic weight. Courts do not need to peer inside the black box. They need to know which layer of the architecture failed, and the Cascade tells them where to look.

Generative AI Usage Statement

The author(s) utilized Large Language Models for formatting, grammar correction, and copy-editing. The Constraint Cascade legal methodology, the §3$$§2 resolution sequence, the tiered-discovery framework, the burden-shifting proposal, and all case analyses are original contributions of the author(s). No LLM was used to generate legal arguments, doctrinal claims, or novel theoretical contributions.

Ethical Considerations Statement

This Article discusses four real-world cases involving loss of life and serious harm. To respect the privacy and dignity of victims, all case details are drawn exclusively from public court filings, confirmed press releases, and published reporting. No private investigation or unauthorized data collection was conducted. Case (c) involves ongoing litigation in which the author has no financial or representational interest.

---

[Previous: Applying the Methodology: Four Cases](/en/posts/structural-defense/applying-methodology-four-cases/) | [Contents](/en/posts/structural-defense/)
