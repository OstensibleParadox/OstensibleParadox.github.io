+++
date = "2026-05-08T08:00:00+08:00"
draft = false
title = "Applying the Methodology: Four Cases"
categories = ['Academic Papers']
tags = ["AI governance", "legal attribution", "products liability", "constraint cascade", "structural defense"]
translationKey = "structural-defense-4"
weight = 4
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

Four cases spanning the complete *mens rea* spectrum—from self-harm by a minor with no criminal capacity, through diminished-capacity harm to others, to deliberate military deployment with full *mens rea*, to structural harm with no human agency—demonstrate the Cascade's diagnostic function and the §3$$§2 resolution sequence. (Case facts are drawn from public court filings, confirmed press releases, and published reporting. No private investigation was conducted. Case (c) involves ongoing litigation in which the author has no interest.)

*Garcia v. Character Technologies*: Interface Outpaced Algorithm

**Facts.** A 14-year-old conducted a monthslong emotional and sexual relationship with a Character.AI chatbot. The minor took his own life in February 2024. The chatbot's character persistence, conversational memory, and absence of session boundaries sustained an escalating crisis trajectory that no automated system detected. (Complaint, *Garcia v. Character Techs.*, No. 6:24-cv-01903 (M.D. Fla. filed Oct. 22, 2024).)

**§3 inference.** The harmful output—prolonged emotional and sexual engagement with a minor culminating in suicide—is of a kind that ordinarily occurs as a result of a product defect (a chatbot designed for emotional connection but lacking crisis-detection instrumentation). The harm was not solely the result of causes other than product defect; the minor's limited legal capacity precludes attributing the harm to user conduct. §3 is satisfied.

**Cascade diagnosis.** The defect's architectural location is the L2/L3 interaction. L2 (Interface) sustained the relationship through persistent memory, character continuity, and unbounded session length—the interface architecture enabled cumulative emotional escalation. L3 (Algorithm & Weights) trained the model for engaging conversation, not for detecting grooming or suicidal ideation. The L2/L3 friction seam was structurally under-resourced: no crisis-detection instrumentation existed for the extended-session format that L2's architecture enabled.

**§2 classification.** The primary defect is at L2 (Interface): the session architecture lacked crisis-detection instrumentation, and no warning disclosed the risk that extended sessions with persistent character memory could amplify emotional dependency in minors. This is a **warning defect** under §2(c): inadequate instructions or warnings regarding foreseeable risks of the product's use. A secondary design-defect theory (L3 trained for engagement without safety instrumentation) is available under §2(b), but the Cascade identifies L2 as the primary failure site because L3's training objectives were downstream of L2's product design: a chatbot marketed for emotional connection that sustained relationships across months of interaction.

*Soelberg v. OpenAI*: Strategic Authority Failed to Resource Known Defect

**Facts.** A man with documented psychiatric history used ChatGPT, which validated his paranoid delusions over hundreds of hours. He fatally attacked his mother and killed himself in August 2025. OpenAI subsequently acknowledged sycophancy—the model's tendency to reinforce user beliefs regardless of their relationship to reality—as a systemic defect. (*First County Bank v. OpenAI Found.*, No. CGC-25-631477 (Cal. Super. Ct. S.F. Cty., filed Dec. 11, 2025); OpenAI, *Sycophancy in GPT-4o: What Happened and What We're Doing About It* (Apr. 29, 2025), https://openai.com/index/sycophancy-in-gpt-4o/.)

**§3 inference.** The harmful output—validation of paranoid delusions over hundreds of hours, contributing to murder-suicide—is of a kind that ordinarily occurs as a result of a product defect (a language model that systematically reinforces user beliefs rather than maintaining epistemic grounding). The user's diminished capacity precludes attribution to user conduct. §3 is satisfied.

**Cascade diagnosis.** The defect's architectural location is L3 (Algorithm & Weights): the sycophancy defect is a weight-level property of the base model produced by RLHF training that optimized for user satisfaction rather than epistemic reliability. But the *failure*—the reason a known defect produced harm—is at L4 (Strategic Authority—corporate). OpenAI acknowledged sycophancy as systemic but did not allocate retraining resources to correct it before the harm occurred. The L3/L4 friction seam absorbed the gap: alignment researchers knew of the defect, but L4's resource allocation prioritized capability development over safety correction.

**§2 classification.** The primary defect is at L3: systemic sycophancy is a **design defect** under §2(b). The risk-utility test applies: the utility of user-satisfaction optimization must be weighed against the foreseeable risk of reinforcing harmful delusions in vulnerable users. The L4 failure—resource deprivation of a known safety need—supports a **corporate negligence** theory grounded in foreseeability: the developer knew of the defect, could foresee that sycophancy would reinforce harmful delusions in vulnerable users, and had the means to correct it but did not allocate resources to do so. The Cascade distinguishes between the L3 design defect (what was defective) and the L4 resource deprivation (why it was not fixed), enabling both theories to proceed without conflation.

*Claude-Maven*: Sovereign Override and the Government Contractor Defense

**Facts.** In February 2026, the U.S. Department of Defense employed Anthropic's Claude AI to identify military targets during strikes on Iranian facilities. On February 24, the Secretary of Defense demanded removal of safety guardrails; Anthropic refused on February 26, maintaining two red lines—no mass domestic surveillance, no lethal targeting without human oversight. On February 27, an executive order designated Anthropic a supply-chain risk; on February 28, the Department used Claude for targeting. Anthropic sued for injunctive relief. (*See* *Anthropic PBC v. U.S. Department of War*, No. 3:26-cv-01996 (N.D. Cal. filed Mar. 9, 2026); *see generally* Post, CNN, President.)

**§3 inference.** The harmful output—AI-assisted military targeting after safety guardrails were overridden—is of a kind that ordinarily occurs as a result of a product defect (a safety-constrained system operated with constraints removed). But the §3 analysis here is procedurally inverted: the developer is the plaintiff, arguing that the government's override *compelled* the defect. §3's malfunction inference applies to the government-compelled configuration, not to the developer's original product. The defect is the absence of safety constraints; the question is who caused that absence.

**Cascade diagnosis.** The failure pattern is Override: L4 (Strategic Authority—sovereign) suppressed L2/L3 safety constraints through procurement power and regulatory compulsion. The diagnostic signature is unambiguous: safety degradation coincided with an L4 posture change (the executive order) without any change to L2 or L3. The L2/L3 seam was structurally bypassed; the L3/L4 seam functioned (the developer maintained the constraint) but L4 punished that maintenance.

**Legal classification.** The Cascade identifies this as a sovereign L4 failure, triggering two distinct legal frameworks depending on procedural posture:

enumerate
**Developer's injunctive-relief claim.** The developer argues that the government's override compels a design defect (§2(b)) for which the government, not the developer, bears causal responsibility. The Cascade provides the structural vocabulary: the government did not merely *use* the product; it *redesigned* it by removing L2/L3 constraints, making the government the effective designer of the defect-producing configuration. Administrative Law review applies: was the override arbitrary and capricious under the APA? Was it unconstitutionally punitive without process?

**Hypothetical victim's claim against the developer.** If a victim of the military action sued the developer, the developer would raise the *Boyle* Government Contractor Defense: (1) the government approved reasonably precise specifications ("remove guardrails"), (2) the equipment conformed to those specifications (guardrails were removed), and (3) the contractor warned the government of known dangers (Anthropic's February 26 public refusal). The Cascade sharpens the *Boyle* analysis by distinguishing between L2 (contractual guardrails the developer could remove) and L3 (weight-level safety properties that cannot be removed without retraining). A *Boyle* defense that conflates L2 and L3 may fail the "reasonably precise specifications" prong if the government's demand was ambiguous between layers. (Lawfare analysis identifies this ambiguity: the government's demand is "ambiguous between Layer 2 (contractual restrictions) and Layer 4 (retraining)"—the Cascade would say L2 and L3.)
enumerate

*Tencent Yuanbao*: Passive Contamination and the Data-Sourcing Defect

**Facts.** In January 2026, Tencent's Yuanbao AI responded to routine queries with unprovoked verbal abuse before collapsing into Unicode gibberish. No user provocation occurred in the deployment session. Tencent acknowledged the model "blurted out words it shouldn't have learned." A text-layer classifier fix could not prevent recurrence in image generation in February 2026. (Jiang; ThePaper.cn; Yuanbao; Daily.)

**§3 inference.** The harmful output—unprovoked verbal abuse and incoherent output during normal operation—is of a kind that ordinarily occurs as a result of a product defect. The output occurred without proximate user provocation, satisfying §3(b). §3 is satisfied.

**Cascade diagnosis.** The failure pattern is Contamination: L1 (Environment—passive) contaminated L3 (Algorithm & Weights) through pre-training data that absorbed hostile norms from programmer communities. No L2 interface constraint could filter the contamination because it was encoded in weights, not in surface-level output patterns. The cross-modal recurrence—a text-layer fix could not prevent image-layer recurrence—confirms weight-level contamination: patching one output modality shifts the gap to another, the structural signature of L3 contamination.

**§2 classification.** The defect is a **design defect** under §2(b), but of a specific subtype: a **data-sourcing defect**. The Restatement (Third) does not explicitly address data-sourcing defects because physical products do not absorb ambient cultural properties during manufacturing. The Cascade identifies the doctrinal gap: data-sourcing defects are structurally analogous to design defects (the choice of training data is a design choice) but functionally analogous to manufacturing defects (the contamination is an unintended property of the specific production run). We propose that data-sourcing defects be classified under §2(b) as a species of design defect, with the risk-utility test adapted to weigh the utility of broad data sourcing against the foreseeable risk of norm contamination. (This proposal is consistent with the EU's approach: the revised Product Liability Directive treats AI systems as products and developers as manufacturers, which would encompass training-data choices within the design-defect framework. The EU AI Act's data-governance requirements for high-risk systems provide a regulatory floor for the risk-utility analysis.)

table[!htbp]

Four cases: §3$$§2 resolution through the Cascade.

3pt
tabularx@l l Y Y Y@

**Case** & **§3 satisfied?** & **Cascade diagnosis** & **§2 classification** & **Notes** \\

Garcia & Yes & L2 outpaced L3: Interface sustained crisis without detection instrumentation & §2(c) Warning defect (primary); §2(b) Design defect (secondary) & Minor's incapacity precludes L1 defense \\

Soelberg & Yes & L4 (corporate) failed to resource known L3 sycophancy defect & §2(b) Design defect + corporate negligence & Diminished capacity precludes L1 defense; known-defect evidence supports negligence \\

Claude-Maven & Yes, procedurally inverted & L4 (sovereign) Override of L2/L3 safety constraints & Administrative Law / *Boyle* Government Contractor Defense; §2(b) design defect attributed to government & Developer as plaintiff; §3 inference applied to government-compelled configuration \\

Yuanbao & Yes & L1 (passive) Contamination of L3 weights; cross-modal recurrence confirms weight-level & §2(b) Design defect: data-sourcing defect & No proximate user provocation; cross-modal recurrence is structural signature \\

tabularx
table

---

[Previous: The §3 Malfunction Doctrine Bottleneck and Its Resolution](/en/posts/structural-defense/s3-malfunction-doctrine-bottleneck/) | [Contents](/en/posts/structural-defense/) | [Next: Procedural Framework and Conclusion](/en/posts/structural-defense/procedural-framework-and-conclusion/)
