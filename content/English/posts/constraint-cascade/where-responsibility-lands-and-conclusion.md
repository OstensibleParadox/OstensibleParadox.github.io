+++
date = "2026-05-09T08:00:00+08:00"
draft = false
title = "Where Responsibility Lands and Conclusion"
categories = ['Academic Papers']
tags = ["AI governance", "diagnostic taxonomy", "constraint cascade", "structural audit", "Dual Certificates"]
translationKey = "constraint-cascade-5"
weight = 5
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

The Cascade identifies which layer failed and how the failure propagated; the downstream question of who bears legal responsibility requires a doctrinal methodology (developed in companion work). The Cascade does make visible a structural pressure on governance institutions that is worth stating independently.

## The Upstream Pressure

Output-only review cannot stabilize same-case-same-action, because the reviewer at the epistemic boundary sees the output trace, not the internal states that produced it (§2). The Cascade does not resolve the downstream legal question—that requires a doctrinal methodology developed in companion work. But it makes visible a structural pressure that legal analysis must address. When output-only review cannot stabilize same-case-same-action, responsibility drifts upstream: toward entities whose decisions are institutionally legible (product design, organizational resourcing, audit obligations) rather than entities whose fault is partitioned from observation by the epistemic boundary. The drift has an addressee problem—in cases (a) and (b), the victims cannot bear liability (a minor lacks legal capacity; a person of diminished capacity lacks the agency any liability regime presupposes)—but whether the resulting upstream allocation is doctrinally sound is a legal question, not a taxonomic one. The Cascade provides the diagnostic vocabulary that legal analysis requires; it does not substitute for it.

## Institutional Implications

The Cascade maps each layer to a distinct institutional response domain (Table 5.2). The point is not that law redeems technical failure. It is that technical systems cannot settle their own authority boundaries once the structural insufficiency at the epistemic boundary is in view. The Cascade provides the diagnostic vocabulary for institutions to ask, and answer, *which layer failed*—separating that architectural question from the downstream allocation of responsibility.

table[!htbp]

Layer-specific institutional interventions.

4pt
tabularx@P1.4cmP3.1cmY@

**Layer** & **Intervention domain** & **Mechanism** \\

L1 Environment & Market-level & Labeling of intended user context; interoperability mandates; data-provenance documentation for training corpora \\
L2 Interface & Session architecture & Context transparency; session boundary instrumentation; crisis-detection mandates for extended interactions \\
*Epistemic Gap* & *Audit infrastructure* & *Logging mandates; structural-access requirements for certified auditors; min-cut computation on deployment topology* \\
L3 Algorithm & Weights & Training governance & Weight-level audit protocols; RLHF methodology transparency; red-team requirements; sycophancy and contamination diagnostics \\
L4 Strategic Authority & Strategy governance & Longitudinal re-certification; cross-version behavioral audits; mandatory disclosure of safety-resource allocation \\

tabularx
table

## Related Work

Six research streams converge on the problem the Cascade addresses.

The structural hole at the epistemic boundary. Three recent technical results specify the governance gap from complementary angles. Nikolaou et al. establish that decoder-only Transformer language models are injective almost surely: distinct prompts map to distinct hidden states, recoverable in linear time. Mishra, Khashabi, and Liu establish the dual: activation steering pushes the residual stream off the manifold of states reachable from any prompt—internal behaviors exist that no textual prompt can reproduce. Naseem surveys mechanistic interpretability methods, cataloguing them as inherently correlational: they reveal which representations activate and which circuits fire, but not whether the system "meant" the output in any sense that maps to legal categories. *Dual Certificates* unifies these results within an information-theoretic framework. Together, these results establish that the epistemic boundary is structural, not a failure of transparency practice.

Layered governance architectures. Several recent proposals organize AI governance into layered structures. These are *regulatory* architectures specifying what rules should apply at each level; the Cascade is a *diagnostic* architecture identifying where damage originates and how it propagates—the question regulatory approaches presuppose is answered. A regulatory-layer analysis of the Garcia case would say "product liability applies" but cannot identify *which architectural component* produced the harm or predict cross-layer propagation.

Product liability and the classification gap. Ayres & Balkin establish that AI systems lack intentions and should be held to objective liability standards. Abraham & Sharkey provide the most comprehensive tort analysis to date, identifying the "black box" problem as the core barrier to doctrinal fit. Henderson et al. sharpen this gap: identical model outputs carry fundamentally different liability exposure depending on architectural choices invisible to end users. Selbst et al.'s "Ripple Effect Trap" —where interventions at one system level produce unforeseen consequences at others—is the motivating insight the Cascade formalizes.

Mens rea impossibility. Abbott & Sarch establish through doctrinal analysis that *mens rea* attribution is structurally impossible for AI systems. Nerantzi & Sartor's "hard AI crime" identifies the resulting criminal responsibility gap across jurisdictions. Alternative approaches propose new legal fictions: Mukherjee & Chang's "operational agency" would treat AI as possessing permeable agency for culpability-tracing. The Cascade avoids this jurisprudential cost: rather than extending legal personhood concepts, it diagnoses which architectural layer failed.

Single-layer documentation and the verification gap. Model Cards and Datasheets established transparency standards; HELM benchmarks cross-scenario robustness. Benerofe argues that computational intractability creates a structural verification gap. Each operates within a single layer; individually verified layers can still produce emergent damage through interaction. Imana et al. —FAccT 2025 Best Paper—demonstrated this concretely: Meta's Variance Reduction System, an L4 intervention, achieved demographic parity in ad delivery by suppressing reach for all groups rather than expanding it for underserved groups—an output-policing fix that reduced total utility without improving individual opportunity.

Systems safety engineering. Leveson's *Engineering a Safer World* and the STPA Handbook established the gold standard for layered accident analysis. Rismani et al. propose process-oriented hazard analysis to overcome the "silo problem" in AI safety. The Cascade inherits this layered diagnostic architecture but operates where STPA's prerequisite fails: AI deployment lacks the assumption that operational safety decomposes into well-defined physical sub-states. Terminal outcomes may be uncontested while operational safe states remain disputed—the gap the Cascade addresses. Madaio et al. —FAccT 2024 Best Paper—provide qualitative evidence: practitioners report learning responsible AI through on-the-job friction rather than formal training, confirming that safety knowledge itself propagates through the same lossy cascade this paper diagnoses.

## Conclusion

What follows is not a morality play of bad technology and good law. It is a claim about failed closure. Once output-only review cannot stabilize same-case-same-action, unresolved questions of authority and responsibility return to institutions. The Cascade provides the diagnostic vocabulary for those institutions to ask *which layer failed* before they answer *who bears responsibility*. Technical systems remain part of the problem, but they cannot by themselves close the questions of authority and responsibility that their failures open.

To move beyond model-centric regulation is therefore not to deny that models matter. It is to refuse to collapse the entire governance stack into the model-user dyad. Many failures that appear to be failures of model behavior are better understood as Override (a higher layer suppressing a lower), Contamination (a lower layer degrading a higher), or Compression (multiple layers combining to produce behavior no single layer intended). The Cascade distinguishes these patterns. Whether the institutional drift toward upstream responsibility is ethically sound lies outside this diagnostic frame—but the drift itself is visible, structural, and accelerating.

Generative AI Usage Statement

The author(s) utilized Large Language Models for formatting, grammar correction, and copy-editing. The Constraint Cascade taxonomy, the four-layer architecture, the friction seam analysis, the cross-layer failure pattern taxonomy (Override, Contamination, Compression), and all case analyses are original contributions of the author(s). No LLM was used to generate scientific claims or novel theoretical arguments.

Ethical Considerations Statement

This paper discusses four real-world cases involving loss of life and serious harm. *Garcia v. Character Technologies* involves a minor's suicide; *Soelberg v. OpenAI* involves a murder-suicide by a person of diminished capacity; the Claude-Maven case involves military targeting operations. To respect the privacy and dignity of victims, all case details are drawn exclusively from public court filings, confirmed press releases, and published reporting. No private investigation or unauthorized data collection was conducted.

The Tencent Yuanbao analysis draws exclusively from public social media posts, official corporate statements, and published news reports. Translations from Mandarin Chinese by the author(s); original text preserved where English equivalents are contested.

---

[Previous: Four Cases One Diagnostic Structure](/en/posts/constraint-cascade/four-cases-one-diagnostic-structure/) | [Contents](/en/posts/constraint-cascade/)
