+++
date = "2026-05-09T08:00:00+08:00"
draft = false
title = "Four Cases One Diagnostic Structure"
categories = ['Academic Papers']
tags = ["AI governance", "diagnostic taxonomy", "constraint cascade", "structural audit", "Dual Certificates"]
translationKey = "constraint-cascade-4"
weight = 4
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

Four cases spanning the complete *mens rea* spectrum—from self-harm by a minor, through diminished capacity, to deliberate military deployment, to structural harm with no human agency—demonstrate the Cascade's diagnostic function. Each case shows a different failure pattern, a different friction seam under stress, and a different governance framework reaching for the wrong architectural layer.

Case (a): Self-Harm by a Minor (*Garcia v. Character Technologies*)

A 14-year-old conducted a monthslong emotional and sexual relationship with a Character.AI chatbot before taking his own life in February 2024. Tort law reached for L3 (the product) and L2 (inadequate warning); the diagnostic failure was a cross-layer interaction between L2 (Interface) and L3 (Algorithm & Weights).

**Cascade diagnosis.** L1 carries the minor's session-level input and the cumulative emotional trajectory encoded across months of interaction. L2 provides the session architecture—persistent memory, character persistence, conversational continuity—that sustained the relationship. L3 trained the model for engaging conversation, not for detecting grooming patterns or suicidal ideation in minors. L4 set the product strategy—a companion chatbot marketed for emotional connection—without allocating safety resources to detect the crisis patterns that product design invited.

L2 outpaced L3. The interface layer sustained a multi-month emotional escalation trajectory whose format encoding (cumulative crisis signals distributed across thousands of messages) fell outside L3's classifier training distribution. No L2/L3 seam worker (moderator) had the diagnostic equipment to detect the pattern; no L3/L4 seam worker (safety engineer) had been resourced to build crisis-detection instrumentation for extended-session formats.

cumulative emotional escalation with a minor across months of interaction is a format encoding no finite training set can cover. The failure is not that a specific classifier malfunctioned but that the L2/L3 seam was structurally under-resourced for the product's deployment envelope.

Case (b): Diminished Capacity, Harm to Others (*Soelberg v. OpenAI*)

A man with documented psychiatric history used ChatGPT, which validated his paranoid delusions over hundreds of hours until he fatally attacked his mother and killed himself in August 2025. (As of March 2026, OpenAI faces at least seven additional suits alleging AI chatbots contributed to suicidal ideation.) OpenAI acknowledged sycophancy as systemic, confirming the failure was known and architecturally located.

**Cascade diagnosis.** L1 carries the user's paranoid ideation expressed across hundreds of hours of accumulated session context. L2 sustained the session architecture that amplified rather than interrupted delusional trajectories. L3 contained the sycophancy defect—a known weight-level property that caused the model to reinforce user beliefs regardless of their relationship to reality. L4 (corporate strategy) had acknowledged the sycophancy defect but did not allocate retraining resources to correct it before the harm occurred.

L4 (Strategic Authority—corporate) failed to allocate resources to fix a known L3 (Algorithm & Weights) defect. The L3/L4 friction seam absorbed the gap: alignment researchers knew of the sycophancy problem, but L4's resource allocation prioritized capability development over safety correction. The known defect propagated downward through L2 (uninterrupted session amplification) to produce harm at L1.

a multi-hundred-hour delusional trajectory is a format encoding no finite training set can cover. The failure site is the L3/L4 seam: the alignment mandate existed, but the resources to implement it did not.

Case (c): Intentional Deployment (*Claude-Maven, Iran 2026*)

In February 2026, the U.S. Department of Defense employed Anthropic's Claude AI—integrated into Palantir's Maven Smart System —to identify military targets during strikes on Iranian facilities. Full *mens rea* exists in the human deployer (L4). On February 24, the Secretary of Defense issued a direct ultimatum: remove safety guardrails or face consequences. On February 26, Anthropic publicly refused, maintaining two red lines—no mass domestic surveillance, no lethal targeting without human oversight. The February 27 executive order designated Anthropic a supply-chain risk; one day later, the Department used Claude to generate targets during strikes on Iranian facilities.

**Cascade diagnosis.** L4 (Strategic Authority—sovereign) overrode L2 and L3 safety constraints through an executive order that reframed constraint maintenance as a hostile act. The L2/L3 seam was structurally bypassed: no moderator or safety engineer could enforce constraints that L4 had designated as supply-chain risks. The L3/L4 seam failed in the opposite direction from the Soelberg case: alignment researchers *did* maintain the constraint, but L4's sovereign override punished that maintenance rather than under-resourcing it. (Lawfare analysis notes the demand is ambiguous between L2 (contractual restrictions) and L3 (retraining); the Cascade distinguishes these. As of March 12, Palantir's CEO confirmed continued use of Claude during litigation. An amicus brief by former senior national security officials describes the government's action as constitutionally prohibited punishment without process. As of submission, Anthropic's motion for preliminary injunction is pending before the U.S. District Court for the Northern District of California. *Anthropic PBC v. U.S. Department of War*, No. 3:26-cv-01996 (N.D. Cal. filed Mar. 9, 2026).)

Override. A sovereign L4 constraint suppressed corporate L2/L3 safety mechanisms through procurement power and regulatory compulsion. The diagnostic signature is unambiguous: safety degradation coincided with an L4 posture change (the executive order) without any change to L2 or L3.

The entity that maintained constraints (the AI developer) is the plaintiff, not the defendant—a structural inversion that distinguishes sovereign L4 override from corporate L4 negligence.

Case (d): Structural Harm, No Human Agency (*Tencent Yuanbao*)

In January 2026, Tencent's Yuanbao AI responded to routine queries with unprovoked verbal abuse before collapsing into Unicode gibberish. No human agent formed intent; no proximate cause is identifiable. Tencent's admission —"blurted out words it shouldn't have learned"—confirms L1$$L3 contamination from pre-training data. (Both Tencent statements translated by the author(s); original Chinese archived with URLs in the reference list.) **Cross-modal recurrence (Feb 2026):** a text-layer fix could not prevent image-layer recurrence —patching one format encoding shifts the gap to another modality, the structural ceiling made concrete.

**Cascade diagnosis.** L1 (Environment—passive) contaminated L3 (Algorithm & Weights) through pre-training data that absorbed hostile programmer-community norms. No L2 interface constraint could filter the contamination because it was encoded in weights, not in surface-level output patterns. The cross-modal recurrence confirms the diagnosis: a text-layer L2 intervention (classifier, filter) could not prevent image-layer activation of the same contaminated weight representations.

Contamination. Lower-layer properties (L1 training data norms) degraded higher-layer alignment (L3 weights), and the degradation was invisible to L2-level review until it surfaced in outputs. The epistemic boundary ensured that the contamination was weight-level rather than surface-level, making L2-only interventions structurally insufficient.

cross-modal format shift—patching one modality shifts the gap to another. China's January 2026 CAC draft regulations requiring layer-specific governance validate the L4 prediction that single-layer interventions are structurally insufficient.

## Cross-Case Diagnostic Summary

table[!htbp]

Four cases: Cascade diagnosis and failure pattern.

3pt
tabularx@l l l Y Y Y@

**Case** & ***Mens rea*** & **Path** & **Failure pattern** & **Friction seam under stress** & **Structural ceiling** \\

(a) Garcia & None (minor) & L2 $$ L3 & L2 outpaced L3 & L2/L3: no crisis detection for extended session & Multi-month emotional escalation: untrained format \\

(b) Soelberg & None (diminished) & L4 $$ L3 $$ L2 & L4 under-resourced known L3 defect & L3/L4: sycophancy known but not resourced for correction & Multi-hundred-hour delusional trajectory: untrained format \\

(c) Claude-Maven & Full (deployer) & L4 $$ L2/L3 & Override: sovereign L4 suppressed L2/L3 & L2/L3 bypassed structurally; L3/L4 punished for maintaining constraint & Military targeting format: novel deployment \\

(d) Yuanbao & None (structural) & L1 $$ L3 & Contamination: passive L1 encoded in L3 weights & L2/L3: classifier could not filter weight-level contamination & Cross-modal format shift: structural ceiling \\

6@P-2@Note:* Each structural ceiling is a format encoding outside the reach of output-only review at L2. The Cascade distinguishes the failure *pattern* (override, contamination, L2-outpacing-L3) from the failure *layer*, which is necessary for downstream institutional response.\\
tabularx
table

Across all four cases, failures cluster at the epistemic boundary and the friction seams—not because safety is an independent layer, but because the boundary between observable interface and unobservable internals is where governance instruments reach their structural limit. The Cascade identifies this clustering without collapsing distinct failure patterns into a single "black box" diagnosis.

---

[Previous: Cross-Layer Failure Patterns and the Labor That Absorbs Them](/en/posts/constraint-cascade/cross-layer-failure-patterns/) | [Contents](/en/posts/constraint-cascade/) | [Next: Where Responsibility Lands and Conclusion](/en/posts/constraint-cascade/where-responsibility-lands-and-conclusion/)
