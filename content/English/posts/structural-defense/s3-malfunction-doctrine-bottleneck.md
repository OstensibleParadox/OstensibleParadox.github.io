+++
date = "2026-05-08T08:00:00+08:00"
draft = false
title = "The §3 Malfunction Doctrine Bottleneck and Its Resolution"
categories = ['Academic Papers']
tags = ["AI governance", "legal attribution", "products liability", "constraint cascade", "structural defense"]
translationKey = "structural-defense-3"
weight = 3
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

## The Bottleneck

The Restatement (Third) §3 provides:

quote
It may be inferred that the harm sustained by the plaintiff was caused by a product defect existing at the time of sale or distribution, without proof of a specific defect, when the incident that harmed the plaintiff:
enumerate
was of a kind that ordinarily occurs as a result of a product defect; and
was not, in the particular case, solely the result of causes other than product defect existing at the time of sale or distribution.
enumerate
quote

§3 is a bridge doctrine: it allows plaintiffs to survive summary judgment on the existence of a defect without identifying the specific defect, reserving the classification question for discovery and trial. (Restatement (Third) of Torts: Products Liability §3 cmt. b (1998) ("The inference of a product defect established by the malfunction doctrine does not, by itself, establish whether the defect is a manufacturing defect, a design defect, or a failure to warn.").) For physical products, this bridge works because discovery can resolve the classification question. For AI systems, the bridge leads to a chasm.

The problem is structural. §3 proves that a defect exists somewhere in the deployment architecture. But the information needed to determine *where*—to classify the defect under §2(a), (b), or (c)—is partitioned from the factfinder by the epistemic boundary between L2 (observable interface) and L3 (unobservable weights). The following propositions are true simultaneously:

enumerate
**The same harmful output** can be produced by an L1 failure (adversarial user input), an L2 failure (inadequate interface warnings about session-length risk), an L3 failure (weight-level sycophancy or contamination), or an L4 failure (strategic resource deprivation of known safety needs).

**Each failure maps to a different §2 category** and therefore a different liability standard. L1$$contributory/comparative; L2$$§2(c) warning defect / §2(b) interface design defect; L3$$§2(a)/(b) manufacturing/design defect; L4 corporate$$vicarious liability; L4 sovereign$$Administrative Law.

**Output observation cannot distinguish** between these failure modes, as proven by *Dual Certificates*. The epistemic boundary ensures that the behavioral evidence—the output trace—underdetermines the architectural location of the defect.

**Therefore, §3 without structural discovery is a one-way valve:** it admits the plaintiff's claim of a defect but provides no doctrinal mechanism for classifying the defect, and therefore no mechanism for determining the applicable liability standard.
enumerate

This is not a problem of insufficient evidence. It is a problem of evidence type: the behavioral evidence that §3 makes sufficient for establishing *that* a defect exists is structurally insufficient for establishing *where* the defect is located. The inference chain that worked for physical products—from malfunction to defect location to §2 classification—is broken at the second link.

## Resolution: Structural Discovery Through the Cascade

The Cascade resolves the bottleneck by providing an architectural map for structural discovery. The §3 inference proves a defect exists at some layer; the Cascade provides the diagnostic vocabulary for discovery to determine which layer; §2 classification follows.

The resolution proceeds in three steps:

**Step 1: §3 inference.** The plaintiff establishes that the AI system produced harmful output of a kind that ordinarily occurs as a result of a product defect, and that the harm was not solely the result of causes other than product defect. This inference is sufficient to survive summary judgment on the existence of a defect. No modification to §3 is required.

**Step 2: Cascade-guided structural discovery.** Once §3 is satisfied, discovery proceeds not through open-ended requests for "the algorithm" or "the training data" but through Cascade-targeted interrogatories:

itemize
**L1 discovery:** Session logs, user interaction history, prompt content, cumulative context length at time of harm. Did the user's behavior fall within the reasonably foreseeable use envelope?

**L2 discovery:** Interface configuration at time of harm (temperature, system prompt, agent/skill settings), session architecture, crisis-detection instrumentation (or its absence), accumulated token count and quasi-weight state.

**Epistemic boundary discovery:** Logging manifest—what internal states were recorded and what were not. The static certificate $_state^UB$ can be computed from deployment topology to quantify the structural information gap.

**L3 discovery:** Training data provenance, RLHF methodology documentation, known defect tracking (internal bug reports, safety incident databases, pre-deployment red-team results), model version and architecture specifications. Weight-level access may require protective orders; the Cascade identifies *which* L3 information is relevant to §2 classification rather than demanding undifferentiated model access.

**L4 discovery (corporate):** Safety resource allocation decisions, product timeline documentation, internal communications regarding known defects and resourcing tradeoffs, regulatory compliance assessments.

**L4 discovery (sovereign):** Procurement specifications, government communications regarding safety requirements or override directives, the "reasonably precise specifications" required by *Boyle*.
itemize

**Step 3: §2 classification.** The structural discovery identifies the defect's architectural location. The Cascade maps that location to the corresponding §2 category (Table 2.1). Classification proceeds under existing doctrine; the Cascade does not create new liability categories but enables courts to apply existing categories to AI systems by providing the missing diagnostic vocabulary.

table[!htbp]

The §3$$§2 resolution sequence.

3pt
tabularx@l l Y Y@

**Step** & **Doctrine** & **What it establishes** & **What it does not establish** \\

1. §3 inference & Malfunction Doctrine & A defect exists somewhere in the deployment architecture & The defect's architectural location \\
2. Cascade discovery & Structural interrogatories & The layer at which the defect originated; the failure pattern (Override, Contamination, Compression) & Legal responsibility (liability follows from §2 classification, not from layer identification alone) \\
3. §2 classification & Manufacturing / Design / Warning defect & The applicable liability standard and the plaintiff's burden & Apportionment between multiple tortfeasors (governed by joint-and-several liability doctrine) \\

tabularx
table

## The Cascade Does Not Determine Liability

A doctrinal limitation must be stated clearly. The Cascade identifies *where* a defect is architecturally located; it does not determine *who* bears legal responsibility. A defect located at L3 (Algorithm & Weights) is classified as a design defect under §2(b), but whether the developer, the training-data provider, the RLHF contractor, or some combination bears liability remains a question of causation, duty, and apportionment governed by existing tort doctrine, not by the Cascade. The Cascade narrows the space of doctrinal options by providing a structural answer to the classification question; it does not substitute for the legal analysis that follows classification.

---

[Previous: The Constraint Cascade as a Legal Diagnostic](/en/posts/structural-defense/constraint-cascade-legal-diagnostic/) | [Contents](/en/posts/structural-defense/) | [Next: Applying the Methodology: Four Cases](/en/posts/structural-defense/applying-methodology-four-cases/)
