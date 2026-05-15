+++
date = "2026-05-08T08:00:00+08:00"
draft = false
title = "The Constraint Cascade as a Legal Diagnostic"
categories = ['Academic Papers']
tags = ["AI governance", "legal attribution", "products liability", "constraint cascade", "structural defense"]
translationKey = "structural-defense-2"
weight = 2
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

The Constraint Cascade partitions LLM deployment into four architectural layers separated by an epistemic boundary. (The Cascade is developed in full as an STS/governance taxonomy in companion work. This Part summarizes the architecture as needed for the legal argument; readers are directed there for the full technical and sociotechnical development.) The four layers, from lowest constraint authority to highest, are:

description
Active user inputs (prompts, memories, behavioral preferences, session length) and passive data contamination (training data poisoned by community norms without data-subject participation). L1 is the layer with the lowest constraint authority and the highest observational accessibility.

API parameters (temperature, top_p), system prompt wrappers, agent and skill configurations, session architecture, and memory context. L2 is the last layer fully visible to external review. Accumulated session tokens function as quasi-weights through the attention mechanism, meaning behavior diverges from fresh-context benchmarks as conversation length increases.

Between L2 and L3 lies a structural boundary proven by *Dual Certificates*: output-only observation cannot recover internal state. The reviewer positioned at L2 sees the output trace, not the operative state that produced it. Information from L1 is preserved in L3's internal states but unreachable from L2's outputs; internal behaviors exist with no L1-side signature.

The base model, RLHF alignment procedure, core training data, architecture choices, and capabilities. L3 has high engineering investment and low external observability. Training decisions create irreversible divergence points that inference-time interventions cannot reliably override.

The locus of deployment power, resource allocation, and sovereign override. L4 encompasses corporate strategy (product positioning, safety resourcing decisions, liability-avoidance posture) and sovereign authority (procurement mandates, national security overrides, regulatory preemption). L4 has the highest constraint authority and the lowest observational accessibility.
description

## Layer-to-Liability Mapping

Each layer maps to a distinct liability doctrine under U.S. tort architecture (Table 2.1). The mapping is structural, not metaphorical: each layer's characteristic failure mode corresponds to the doctrinal category designed for that mode of defect.

table[!htbp]

Layer-to-liability mapping under the Restatement (Third) of Torts.

4pt
tabularx@P1.6cmP2.0cmP2.2cmY@

**Layer** & **Characteristic defect** & **Doctrine** & **Legal basis** \\

L1 Environment & User misuse; passive data contamination that reasonable platform should have anticipated & Contributory / comparative negligence; data protection & Rest. §17 comment d (consumer expectations in context of foreseeable misuse) \\
L2 Interface & Inadequate disclosure of session risk; unsafe default parameters; missing crisis-detection instrumentation & Warning defect; design defect (interface) & Rest. §2(c) (inadequate instructions or warnings); §2(b) for unsafe default interface parameters \\
*Epistemic Boundary* & *Output underdetermines internal state; behavioral evidence proves defect exists but cannot isolate layer* & *§3 Malfunction Doctrine bottleneck* & *Rest. §3; res ipsa loquitur inference of product defect* \\
L3 Algorithm & Weights & Systemic model-level defect: sycophancy, contamination, reward hacking & Design defect; manufacturing defect & Rest. §2(b) (design defect); §2(a) (manufacturing defect for instance-specific weight corruption) \\
L4 Strategic Authority (corporate) & Resource deprivation of known safety needs; strategic decisions causing harm & Vicarious liability; corporate negligence & *Respondeat superior*; Rest. §10 (liability of successor entities); *United States v. Park*, 421 U.S. 658 (1975) \\
L4 Strategic Authority (sovereign) & Government compulsion of defect; sovereign override of safety constraints & Administrative Law; Government Contractor Defense & *Boyle v. United Techs. Corp.*, 487 U.S. 500 (1988); APA arbitrary-and-capricious review \\

tabularx
table

## The L4 Bifurcation: Procedural Posture Determines Doctrine

A critical architectural feature of the Cascade is the bifurcation of L4 by procedural posture. The same layer—Strategic Authority—maps to fundamentally different legal frameworks depending on whether the L4 actor is a corporate defendant or a sovereign entity.

**Corporate L4.** When the L4 actor is a corporate strategist, the applicable doctrines are products liability and corporate negligence. The Restatement (Third) §10 extends liability to successor entities and those in the chain of distribution. *United States v. Park* establishes that corporate officers bear strict criminal liability for regulatory violations even absent personal knowledge. (421 U.S. 658, 670–73 (1975).) The Cascade sharpens these doctrines by identifying *which* corporate decision—resource allocation, product timeline, safety staffing—constituted the L4 failure, enabling courts to distinguish between strategic negligence (actionable) and ordinary business judgment (not actionable).

**Sovereign L4.** When the L4 actor is a sovereign entity, the applicable framework shifts to Administrative Law and the Government Contractor Defense established in *Boyle v. United Technologies Corp.* (487 U.S. 500 (1988). Under *Boyle*, government contractors are immune from design-defect liability when (1) the government approved reasonably precise specifications, (2) the equipment conformed to those specifications, and (3) the contractor warned the government of known dangers.) The Cascade distinguishes between two sovereign-L4 scenarios with opposite procedural postures:

enumerate
*Sovereign as plaintiff/regulator seeking to compel design change.* The Cascade identifies which layer the sovereign seeks to modify. A demand that an AI developer remove safety guardrails implicates L2 (contractual restrictions) or L3 (retraining), and the Cascade distinguishes these. Under *Boyle*, the government's specification of the product design must be "reasonably precise"; a demand to "remove guardrails" without specifying at which layer may fail the precision requirement.

*Sovereign as defendant (developer sues state for compelled defect).* *Anthropic PBC v. U.S. Department of War* presents this posture: the developer seeks injunctive relief against a sovereign L4 override. The Cascade provides the structural vocabulary for the developer to argue that the override compels a design defect (§2(b)) for which the sovereign, not the developer, bears causal responsibility. This is a *Boyle* defense in reverse: the contractor warned of dangers, the government compelled the dangerous design, and the contractor seeks to enjoin the compulsion rather than defend against liability.
enumerate

This bifurcation is not a theoretical curiosity. The Claude-Maven case (§4.3) presents the second posture in live litigation. Without the Cascade's structural distinction between corporate L4 and sovereign L4, courts lack the vocabulary to distinguish between a developer's autonomous design choices and government-compelled design changes.

---

[Previous: Introduction: The Bankruptcy of the Behaviorist Consensus](/en/posts/structural-defense/introduction/) | [Contents](/en/posts/structural-defense/) | [Next: The §3 Malfunction Doctrine Bottleneck and Its Resolution](/en/posts/structural-defense/s3-malfunction-doctrine-bottleneck/)
