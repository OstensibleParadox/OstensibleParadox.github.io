+++
date = "2026-05-09T08:00:00+08:00"
draft = false
title = "The Constraint Cascade: A Diagnostic Taxonomy for AI Governance Failure"
description = "AI governance lacks a diagnostic vocabulary for locating failure within the deployment architecture. When a language-model agent produces harm, existing frameworks ask whether the model or the user is at fault—a binary..."
summary = "AI governance lacks a diagnostic vocabulary for locating failure within the deployment architecture. When a language-model agent produces harm, existing frameworks ask whether the model or the user is at fault—a binary..."
categories = ['Academic Papers']
venue = 'AIES 2026'
disciplines = ['AI Governance', 'Law']
tags = ["AI governance", "diagnostic taxonomy", "constraint cascade", "structural audit", "Dual Certificates"]
translationKey = "constraint-cascade"
ShowToc = true
ShowPostNavLinks = false
+++

## Abstract

AI governance lacks a diagnostic vocabulary for locating failure within the deployment architecture. When a language-model agent produces harm, existing frameworks ask whether the model or the user is at fault—a binary that collapses four structurally distinct layers of constraint into an uninformative dyad. We introduce the Constraint Cascade, a four-layer diagnostic taxonomy that partitions LLM deployment into Environment (L1), Interface (L2), Algorithm & Weights (L3), and Strategic Authority (L4). Between L2 and L3 lies an epistemic boundary: *Dual Certificates* proves mathematically that output-only observation cannot recover internal state, establishing that the governance reviewer sees only what crosses this boundary, not the architecture that produced it. Rather than treating safety operations as a separate layer, the Cascade models them as distributed system properties maintained by human labor at "friction seams" between layers, where misalignment costs are absorbed along strict power gradients. Three cross-layer failure patterns—Override, Contamination, and Compression—are defined and illustrated across four real-world cases spanning the complete *mens rea* spectrum. The Cascade provides governance institutions with a structural vocabulary for diagnostic auditing, separating the question of *which layer failed* from the downstream legal question of *who bears responsibility*.

## Contents

- [Introduction](/en/posts/constraint-cascade/introduction/)
- [The Four-Layer Constraint Cascade](/en/posts/constraint-cascade/the-four-layer-constraint-cascade/)
- [Cross-Layer Failure Patterns and the Labor That Absorbs Them](/en/posts/constraint-cascade/cross-layer-failure-patterns/)
- [Four Cases One Diagnostic Structure](/en/posts/constraint-cascade/four-cases-one-diagnostic-structure/)
- [Where Responsibility Lands and Conclusion](/en/posts/constraint-cascade/where-responsibility-lands-and-conclusion/)
