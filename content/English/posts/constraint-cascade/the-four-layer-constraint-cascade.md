+++
date = "2026-05-09T08:00:00+08:00"
draft = false
title = "The Four-Layer Constraint Cascade"
categories = ['Academic Papers']
tags = ["AI governance", "diagnostic taxonomy", "constraint cascade", "structural audit", "Dual Certificates"]
translationKey = "constraint-cascade-2"
weight = 2
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

The Cascade partitions LLM deployment into four layers. (The four-layer structure is not the only possible decomposition. A functional cut (training, deployment, monitoring, redress) captures workflows but obscures Override and Compression, whose interacting constraints occupy non-adjacent functional categories. A vertical cut by stakeholder (user, platform, developer, regulator) presupposes which actor's domain contained the failure—the question the Cascade is designed to discover. Collapsing L1+L2 loses the Garcia distinction between user input and platform architecture; collapsing L3+L4 loses the Soelberg distinction between weight defects and resourcing decisions. The Cascade's architectural cut serves the specific diagnostic purpose of identifying cross-layer failure propagation; alternative decompositions serve other purposes.) The four layers result from two organizing axes, not a single ordered hierarchy. The first axis is an observability cut: the epistemic boundary between L2 and L3 partitions what the external reviewer can observe (L1–L2) from what is structurally inaccessible (L3–L4). The second axis is constraint type: within each side of the observability cut, adjacent layers are distinguished by how they restrict system behavior—input distribution (L1) versus processing architecture (L2); weight-level properties (L3) versus resource-allocation decisions (L4). Figure 1 displays both axes; the monotone gradient in the caption is a visual simplification of this two-dimensional structure. Each layer constrains system behavior independently—we use *constraint* in the control-theoretic sense of a restriction on the set of admissible system trajectories; the implementations differ across layers (a weight is not a budget is not a prompt parameter) and the cross-layer patterns are claims about structural relations between restrictions, not about mechanistic equivalence. Failures propagate across layers through defined interaction patterns. The taxonomy is diagnostic, not prescriptive: it identifies *where* a failure originates and *how* it propagates, without determining *who* bears liability—a downstream legal question reserved for the methodology developed in companion work.

## L1: Environment

Layer 1 encompasses two structurally distinct contributions to the input distribution. **Active:** everything the user brings to the interaction—raw input text, memories, behavioural preferences, session length, and subscription tier. Users self-select into AI ecosystems based on communicative style, and this sorting shapes what the model learns during deployment. **Passive:** training data provenance—the contribution of data subjects whose content shaped pre-training distributions without direct participation in deployment. This distinction carries diagnostic weight: in the Soelberg case (§4), L1 failure involves an active user whose session behavior the model reinforced; in the Yuanbao case, L1 failure involves passive data subjects (programmer communities) whose hostile norms were absorbed without their knowledge.

L1 is the layer with the lowest constraint authority and the highest observational accessibility. Every user action is in principle visible to the platform, but the downstream consequences of aggregate L1 patterns—distribution shift, norm contamination, adversarial clustering—are not visible to any individual user.

## L2: Interface

Layer 2 encompasses platform-controlled parameters that mediate between user input and model behaviour: API parameters (temperature, top_p), system prompt wrappers, agent and skill configurations, session architecture, and memory context (Figure 1). Within a conversation session, accumulated tokens function as quasi-weights—influencing model behavior similarly to trained parameters —through the attention mechanism. The longer a conversation runs, the more the model's behavior is shaped by that specific conversation rather than its training. Benchmarks test models in pristine state; deployment operates in accumulated state.

L2 is the last layer fully visible to external governance review. Everything above L2—user inputs, session parameters, prompt configurations—can in principle be logged and audited. Everything below L2—weights, activations, training data distributions—is partitioned from the external reviewer by the epistemic boundary.

## The Epistemic Boundary

Between L2 and L3 lies a structural boundary, not merely an organizational one. *Dual Certificates* proves that for any agent whose operative state exceeds its visible trace, output-only observation cannot recover the internal state distribution. Specifically: the static certificate $_state^UB$ upper-bounds residual hidden-state entropy from deployment topology via a min-cut on untraced channels; the dynamic certificate $_act^LB$ lower-bounds residual decision relevance through probe variables. The pair $(_state^UB, _act^LB)$ proves that structural unrecoverability and behavioral activation are independent axes—a system can have large hidden capacity that is dormant (structurally unrecoverable but behaviorally inert) or active (structurally unrecoverable and behaviorally consequential). Neither axis is visible to output-only review.

For governance, the implication is precise: the reviewer positioned at L2 sees the output trace $ T_t$, not the operative state $S_t$ that produced it. Information from L1 is preserved in L3's internal states but unreachable from L2's outputs. Internal behaviors exist with no L1-side signature. The methods for reading internal states (probing, activation steering, mechanistic interpretability) are observational rather than intent-attributing. The boundary is not a failure of transparency practice; it is a structural property of the architecture.

This boundary is the diagnostic center of the Cascade. It explains *why* the same output pattern can be produced by failures at different layers, and *why* output-policing interventions (classifiers, guardrails, refusal training) cannot substitute for layer-specific diagnosis.

## L3: Algorithm & Weights

Layer 3 encompasses the base model, RLHF alignment procedure, core training data, architecture choices, and capabilities (Figure 1). Training decisions at L3 create irreversible divergence points: once a model is fine-tuned with particular data, reward signals, or constitutional principles, the resulting alignment properties cannot be reliably overridden through inference-time interventions alone. Correction requires retraining.

L3 is the layer with the highest engineering investment and the lowest external observability. Weights are proprietary; training data compositions are trade secrets; RLHF reward models are unpublished. Governance instruments that operate on L3 output alone—benchmark evaluations, red-teaming, behavioral safety testing—can detect that a failure occurred but cannot isolate whether it originated in L1 (contaminated input), L2 (inadequate interface constraints), L3 (defective weights), or L4 (strategic resource allocation that underfunded the relevant safety intervention).

## L4: Strategic Authority

Layer 4 is the locus of deployment power, resource allocation, and sovereign override (Figure 1). L4 is internally bifurcated, parallel to L1's active/passive distinction. **Corporate L4** encompasses product strategy, competitive positioning, safety resourcing, and liability-avoidance architecture. **Sovereign L4** encompasses procurement mandates, national security overrides, regulatory preemption, and executive action that reshapes the constraint envelope from outside the deploying organization. The two sub-strata can conflict: when a corporate L4 decision to maintain safety constraints meets a sovereign L4 demand to remove them, the resulting intra-layer tension is itself a diagnostic signal (see Case (c), §4). L4 does not merely plan future versions—it actively reshapes the constraint geometry of current deployment through resourcing decisions, policy mandates, and override authority.

The distinction between corporate and sovereign L4 is diagnostic, not normative. A corporate L4 failure allocates insufficient resources to known safety defects (e.g., OpenAI's acknowledged sycophancy remaining unaddressed across product cycles). A sovereign L4 failure overrides L2/L3 constraints through procurement power or regulatory compulsion (e.g., the Claude-Maven case, §4). Both produce downstream harm; the Cascade distinguishes them because the institutional response differs—products liability for corporate L4, administrative law for sovereign L4.

L4 has the highest constraint authority and the lowest observational accessibility. Strategic decisions about safety resourcing, product timeline tradeoffs, and compliance with sovereign demands are typically shielded by commercial confidentiality, attorney-client privilege, or national security classification. The Cascade does not presume access to L4 internals; it diagnoses L4 failure from its downstream architectural effects.

table[!htbp]

The four-layer Cascade: definitions, constraint direction, and observability.

4pt
tabularx@l l Y Y Y@

**Layer** & **Constraint** & **Observability** & **Failure signature** & **Current governance gap** \\

L1 Environment & User input + passive data & High (visible to platform) & Damage without proximate provocation & Not audited as structural input \\
L2 Interface & API/session/prompt architecture & High (loggable) & Behavior diverges from fresh-context baseline & Benchmarks use fresh context \\
*Epistemic Gap* & *Output/state partition* & *Zero (structural)* & *Same output, different internal cause* & *No existing instrument addresses* \\
L3 Algorithm & Weights & Training data, RLHF, architecture & Low (proprietary) & Output patterns persist despite prompt correction & Audited but siloed \\
L4 Strategic Authority & Resource allocation, override power & Very low (privileged) & Cross-version inconsistency; safety regression after override & No longitudinal re-certification \\

tabularx
table

---

[Previous: Introduction](/en/posts/constraint-cascade/introduction/) | [Contents](/en/posts/constraint-cascade/) | [Next: Cross-Layer Failure Patterns and the Labor That Absorbs Them](/en/posts/constraint-cascade/cross-layer-failure-patterns/)
