+++
date = "2026-05-09T08:00:00+08:00"
draft = false
title = "Cross-Layer Failure Patterns and the Labor That Absorbs Them"
categories = ['Academic Papers']
tags = ["AI governance", "diagnostic taxonomy", "constraint cascade", "structural audit", "Dual Certificates"]
translationKey = "constraint-cascade-3"
weight = 3
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

Individual layer failures are well-documented: prompt injection (L1), inadequate content filtering (L2), reward hacking (L3), safety-resource underinvestment (L4). The Cascade's diagnostic contribution is the taxonomy of *cross-layer* failures—patterns that emerge from the interaction between layers and are invisible to single-layer analysis. We define three canonical patterns.

These patterns are not abstract structural dynamics. Each materializes at a specific friction seam where identifiable human labor absorbs the misalignment costs the architecture generates. These seams are defined by power gradients: who absorbs cost and who has authority to redesign the constraint that produced it are systematically different. The L2/L3 seam is occupied by content moderators, data annotators, and safety classifier teams—predominantly contract workers in the Global South —who absorb *output-level* costs (exposure to harmful content, psychological injury) but lack authority to modify weights or interface architecture. The L3/L4 seam is occupied by alignment researchers and safety engineers who translate strategic mandates into weight-level interventions; they absorb *design-level* costs (inability to implement known safety improvements under resource constraints) and can modify weights conditional on L4's resource envelope. Table 3.4 summarizes this structure; the remainder of this section maps each failure pattern to the seam that absorbs it.

## Override

Override occurs when a higher-layer constraint suppresses a lower-layer safety mechanism. The suppression can be explicit (a sovereign L4 directive removing L2/L3 guardrails) or structural (a corporate L4 product decision that makes L2 interface constraints inoperable for a class of interactions).

**Mechanism.** Higher layers have greater constraint authority; when a higher-layer decision conflicts with a lower-layer safety mechanism, the higher layer wins. The failure is not that the lower-layer mechanism malfunctioned but that it was structurally subordinated. Override materializes at the L3/L4 seam: alignment researchers maintain weight-level safety constraints, but when L4 (corporate or sovereign) suppresses those constraints through resourcing decisions or executive action, the seam workers absorb the design-level cost of a mandate they cannot fulfill.

**Diagnostic signature.** Safety degradation coincides with a change in L4 posture (policy shift, resource reallocation, override directive) without corresponding changes in L2 or L3. The same interface and weights that previously produced safe outputs now produce harmful ones because the constraint envelope has been altered from above.

**Example.** The Claude-Maven case (§4): an L4 sovereign override (executive order designating the developer a supply-chain risk) suppressed L2/L3 safety constraints, and the model was used for military targeting the following day. The L3 weights did not change; the L2 interface did not change; the constraint envelope was overridden from L4.

## Contamination

Contamination occurs when lower-layer properties degrade higher-layer alignment through information flow that crosses the epistemic boundary. Because L3 training absorbs properties of L1 data distributions, hostile or toxic L1 patterns can become encoded in L3 weights, after which no L2 interface constraint can reliably filter them.

**Mechanism.** Training data (L1 passive) shapes weight-level representations (L3). Once contamination is encoded in weights, it can activate in deployment contexts that share statistical properties with the contaminated training distribution, regardless of L2 interface constraints. The epistemic boundary ensures that the contamination is invisible to L2-level review until it surfaces in outputs.

Contamination has two structurally distinct entry points. *L1$$L3 contamination* (the Yuanbao case) operates through pre-training data whose hostile properties are encoded in weights before deployment. *L2$$L3 contamination* operates through interface-level decisions that shape subsequent training distributions—conversation logs selected for RLHF, user feedback signals that encode platform design choices into weight updates, the feedback loops Selbst et al.'s "Ripple Effect Trap" identifies. Both species cross the epistemic boundary; they differ in whether the contaminating signal originates from data subjects who never deployed (L1) or from platform design decisions about which interactions to surface and reinforce (L2). Contamination materializes at the L2/L3 seam: moderators and annotators absorb the output-level costs of weight-encoded defects they cannot correct, detecting harmful content the architecture generated but lacking authority to modify the weights or training distributions that produced it.

**Diagnostic signature.** Harmful outputs occur without proximate L1 provocation in the deployment session. The model "blurts out" content that no user in the current session requested. Cross-modal recurrence—a text-layer fix does not prevent image-layer recurrence—is a strong diagnostic indicator of L3-level contamination.

**Example.** The Yuanbao case (§4): unprovoked verbal abuse followed by Unicode gibberish, with Tencent confirming the model "blurted out words it shouldn't have learned." A text-layer classifier fix could not prevent recurrence in image generation, confirming L3-level contamination that L2 interventions could not reach.

## Compression

Compression occurs when constraints from multiple layers simultaneously activate, collapsing the permissible output space to near-zero. Unlike Override (one layer dominates) or Contamination (one layer degrades another), Compression is an emergent property of the full constraint architecture: individually reasonable constraints at L1, L2, L3, and L4 combine to produce a behavior that no single layer intended.

**Mechanism.** Each layer independently constrains the output distribution. Under normal conditions, these constraints are partially redundant—the system has "slack." When multiple layers activate tightly (a user's sensitive query triggers L2 content policy, which activates L3 refusal training, which is reinforced by L4 liability-avoidance strategy), the intersection of constraints can be empty, producing refusal on queries that seem straightforward in isolation. Compression materializes at both seams simultaneously: the L2/L3 seam absorbs the output-level refusal cost (moderators cannot override the compounded constraints), and the L3/L4 seam absorbs the design-level cost (alignment researchers cannot relax any single constraint without L4 authorization).

**Diagnostic signature.** "The model just stopped working" on a class of queries that no individual constraint layer would block. The refusal pattern is not attributable to any single layer's policy; remove any one constraint and the behavior normalizes, but the constraint that should be removed is not identifiable from outputs alone.

**Example.** Medical information queries that trigger simultaneous L1 sensitivity classification, L2 content policy, L3 refusal training, and L4 liability avoidance—producing refusal on queries that would be answered under any three constraints but not under all four.

## Structural Asymmetry

The two seams are asymmetric in kind. The L2/L3 seam absorbs output-level costs (exposure to harmful content, psychological injury); workers at this seam cannot redesign the system. The L3/L4 seam absorbs design-level costs (inability to implement known safety improvements under resource constraints); workers at this seam can modify weights conditional on L4's resource envelope. Both seams are structurally necessary—no deployment architecture can eliminate the gap between what a model produces and what an interface should present, or between what strategists mandate and what training can achieve—but the distribution of costs across them is a design choice, not a technical inevitability. The Cascade makes this distribution visible: when a governance reviewer asks why the safety system failed, the answer distinguishes whether the failure was at the L2/L3 seam (harm detected but not preventable), the L3/L4 seam (defect known but not resourced for repair), or whether the seam itself was under-resourced such that detection was structurally impossible.

table[!htbp]

Friction seams: labor, function, authority, and failure mode.

4pt
tabularx@l l Y Y Y@

**Seam** & **Labor type** & **Function** & **Authority** & **Failure mode** \\

L2/L3 & Moderators, annotators, classifier teams & Absorb output-level misalignment costs & None: cannot modify weights or interface & Harm detected but not prevented; cost borne by lowest-status labor \\
L3/L4 & Alignment researchers, safety engineers & Translate strategic mandates into weight-level interventions & Conditional: can modify weights within L4 resource envelope & Known defects unaddressed; safety triaged below capability development \\

tabularx
table

These three patterns are canonical, not exhaustive. They were selected because each exploits the epistemic boundary in a structurally distinct way—top-down suppression across the cut (Override), bottom-up degradation across the cut (Contamination), multi-layer collision (Compression). Additional patterns, including L3$$L1 (model outputs entering future training distributions; model collapse) and L3$$L4 (emergent capabilities constraining strategic options), are structurally real but outside the present taxonomy's scope. The three patterns defined here cover the failure modes exhibited by the case set in §4; extension to additional patterns is deferred to future work.

table[!htbp]

Cross-layer failure patterns: mechanism, signature, and example.

4pt
tabularx@l l Y Y@

**Pattern** & **Direction** & **Mechanism** & **Diagnostic signature** \\

Override & L4 $$ L2/L3 & Higher constraint authority suppresses lower safety mechanism & Safety degradation coinciding with L4 posture change; L2/L3 unchanged \\
Contamination & L1/L2 $$ L3 & Passive data or interface-level feedback encoded in weights; crosses epistemic boundary & Unprovoked harmful output; cross-modal recurrence after text-layer fix \\
Compression & Multi-layer & Independent constraints combine to collapse output space & Refusal on queries no single layer would block; normalization when any constraint removed \\

tabularx
table

---

[Previous: The Four-Layer Constraint Cascade](/en/posts/constraint-cascade/the-four-layer-constraint-cascade/) | [Contents](/en/posts/constraint-cascade/) | [Next: Four Cases One Diagnostic Structure](/en/posts/constraint-cascade/four-cases-one-diagnostic-structure/)
