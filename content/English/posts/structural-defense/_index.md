+++
date = "2026-05-08T08:00:00+08:00"
draft = false
title = "The Structural Defense: A Cascade Methodology for AI Legal Attribution"
description = "Courts confronting AI harm face a doctrinal bottleneck. The behavioral inference chain that products liability law has relied upon since *Greenman v. Yuba Power Products*—from observed malfunction to inferred defect to..."
summary = "Courts confronting AI harm face a doctrinal bottleneck. The behavioral inference chain that products liability law has relied upon since *Greenman v. Yuba Power Products*—from observed malfunction to inferred defect to..."
categories = ['Academic Papers']
venue = 'ECUPL Commissioned Paper'
disciplines = ['AI Law', 'Tort Law']
tags = ["AI governance", "legal attribution", "products liability", "constraint cascade", "structural defense"]
translationKey = "structural-defense"
ShowToc = true
ShowPostNavLinks = false
+++

## Abstract

Courts confronting AI harm face a doctrinal bottleneck. The behavioral inference chain that products liability law has relied upon since *Greenman v. Yuba Power Products*—from observed malfunction to inferred defect to allocated liability—presupposes that output observation can isolate the architectural location of a defect. *Dual Certificates* proves mathematically that it cannot: output-only observation underdetermines internal state, meaning identical behavioral evidence can be produced by defects at structurally distinct layers of the deployment architecture. The Restatement (Third) of Torts §3 Malfunction Doctrine resolves the first-order problem—behavioral failure proves *a* defect exists—but cannot resolve the second: which §2 category (manufacturing, design, or warning defect) the failure belongs to, because classification requires isolating the defect's architectural location. This Article introduces the Constraint Cascade methodology: a four-layer diagnostic taxonomy (Environment, Interface, Algorithm & Weights, Strategic Authority) that maps each architectural layer to a specific liability doctrine, enabling courts to classify AI defects by structural location rather than behavioral inference. Four cases spanning the complete *mens rea* spectrum are diagnosed through the Cascade, and a procedural framework is proposed for resolving the §3$$§2 classification bottleneck through structural discovery. The Article further argues that the law's reliance on behavioral inference is a category error: human legal paradigms presuppose inaccessible mental states and therefore depend on external behavior, but AI internal states are structurally auditable, making behavioral proxies unnecessary—and affirmatively misleading—where structural access is available. The methodology is built on U.S. tort architecture (Restatement Third) with extensibility to cross-jurisdictional frameworks (EU AI Act, China's CAC regulations) sketched in conclusion.

## Contents

- [Introduction: The Bankruptcy of the Behaviorist Consensus](/en/posts/structural-defense/introduction/)
- [The Constraint Cascade as a Legal Diagnostic](/en/posts/structural-defense/constraint-cascade-legal-diagnostic/)
- [The §3 Malfunction Doctrine Bottleneck and Its Resolution](/en/posts/structural-defense/s3-malfunction-doctrine-bottleneck/)
- [Applying the Methodology: Four Cases](/en/posts/structural-defense/applying-methodology-four-cases/)
- [Procedural Framework and Conclusion](/en/posts/structural-defense/procedural-framework-and-conclusion/)
