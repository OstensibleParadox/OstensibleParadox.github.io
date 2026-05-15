+++
date = "2026-05-09T08:00:00+08:00"
draft = false
title = "Introduction"
categories = ['Academic Papers']
tags = ["AI governance", "diagnostic taxonomy", "constraint cascade", "structural audit", "Dual Certificates"]
translationKey = "constraint-cascade-1"
weight = 1
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

In October 2018, Lion Air Flight 610 crashed thirteen minutes after takeoff, killing 189 people. Five months later, Ethiopian Airlines Flight 302 followed the same trajectory, killing 157 more. Investigations revealed that Boeing's Maneuvering Characteristics Augmentation System (MCAS) relied on a single angle-of-attack sensor; when that sensor produced erroneous readings, MCAS repeatedly overrode pilot control inputs to push the nose down. The failure was not in the sensor, the software, or the pilots individually—it was in the interaction between layers of a constraint architecture that no single actor fully understood or controlled.

AI governance faces an analogous diagnostic problem in a more acute form. Multiple actors—users, interface designers, training engineers, alignment teams, corporate strategists, sovereign deployers—shape system behavior through interacting constraints at different architectural layers. When these constraints conflict, the resulting failures are not attributable to any individual layer, and existing governance frameworks lack the vocabulary to identify which layer failed, who had authority there, and where institutional response should concentrate.

But the analogy breaks at a critical point. Systems-theoretic accident models like Leveson's STPA locate causation in control-structure failures across hierarchical layers, presupposing that safe states are physically defined facts—correct airspeed, proper control-surface deflection, intact structural load paths. AI deployment lacks this property at the operational level. Terminal outcomes—death, injury, military targeting—may be uncontested, but the operational safe states that precede them (what counts as crisis-detection threshold, what counts as legitimate military use, what counts as acceptable training-data norms) are contested, layer-dependent, and retrospectively constructed. STPA decomposes safety into well-defined sub-states at each hierarchical level; AI governance must operate where that decomposition is itself disputed. The same output can be harmful or benign depending on context, audience, and the governance framework applied to it.

Technical AI research has successfully translated humanistic concepts into engineering specifications—attention became transformers, preference became reward models—but no equivalent reverse translation has provided governance with the vocabulary to diagnose failures that originate in engineering layers and produce legal consequences. This paper provides that vocabulary.

We introduce the Constraint Cascade (hereafter, the Cascade), a four-layer diagnostic taxonomy. The Cascade partitions LLM deployment into Environment (L1), Interface (L2), Algorithm & Weights (L3), and Strategic Authority (L4), with an epistemic boundary between L2 and L3 grounded in the mathematical results of *Dual Certificates*. We extend Leveson's layered diagnostic architecture to a domain where operational safe states are contested even when terminal outcomes are not. The paper develops a layered argument: the taxonomy diagnoses four real-world cases spanning the complete *mens rea* spectrum (§4); three cross-layer failure patterns—Override, Contamination, Compression—are identified, each mapped to the friction seam whose human labor absorbs its costs (§3); and the resulting governance gap cannot be closed by technical means alone, returning unresolved questions of authority and responsibility to institutions (§5).

figure[t]

!%
tikzpicture[>=Latex]

(0.0,0.5) rectangle (3.2,5.0);
(0.0,0.5) rectangle (3.2,5.0);
(0.10,4.58) rectangle (0.72,4.88);
at (0.41,4.73) L1;

at (1.6,2.60) Active: user prompts,\\[1pt]memories, behavioural\\[1pt]preferences, session\\[1pt]length, subscription\\[4pt]Passive: training data\\[1pt]contamination, data-subject\\[1pt]norms absorbed without\\[1pt]direct participation;

(3.6,0.5) rectangle (6.8,5.0);
(3.6,0.5) rectangle (6.8,5.0);
(3.70,4.58) rectangle (4.32,4.88);
at (4.01,4.73) L2;

at (5.2,2.60) API parameters (temp,\\[1pt]top_p), system prompt\\[1pt]wrappers, agent/skill\\[1pt]configurations, session\\[1pt]architecture, memory\\[1pt]context;

(7.1,0.08)–(7.1,5.80);
[fill=white,draw=ccGap,rounded corners=3pt,line width=1pt,inner sep=3pt,
text=ccGap,font=] at (7.1,5.45) Epistemic Gap;
at (7.1,0.18)
*Dual Certificates*\\[1pt]boundary;

(6.8,3.8) – (7.4,3.8);
at (8.25,3.95)
L2/L3 Friction Seam\\[1pt](moderators, annotators);

(7.4,0.5) rectangle (10.6,5.0);
(7.4,0.5) rectangle (10.6,5.0);
(7.50,4.58) rectangle (8.12,4.88);
at (7.81,4.73) L3;

at (9.0,4.25) Algorithm & Weights;
(7.65,3.95) – (10.35,3.95);

at (9.0,2.40) Base model, RLHF\\[1pt]alignment, core training\\[1pt]data, architecture\\[1pt]choices, capabilities;

(11.0,0.5) rectangle (14.2,5.0);
(11.0,0.5) rectangle (14.2,5.0);
(11.10,4.58) rectangle (11.72,4.88);
at (11.41,4.73) L4;

at (12.6,4.25) Strategic Authority;
(11.25,3.95) – (13.95,3.95);

at (12.6,2.40) Deployment power,\\[1pt]resource allocation,\\[1pt]sovereign override,\\[1pt]corporate strategy,\\[1pt]product governance;

(10.6,3.8) – (11.0,3.8);
at (12.0,3.60)
L3/L4 Friction Seam\\[1pt](alignment researchers);

(3.2,2.8)–(3.6,2.8);
(10.6,2.8)–(11.0,2.8);

at (3.40,5.85) $$ User Side;
at (11.40,5.85) System Side $$;

(3.6,5.35)–(14.2,5.35);
(3.6,5.35)–(3.6,5.22);
(14.2,5.35)–(14.2,5.22);
at (8.90,5.56) Scope of Institutional Response (L2–L4);

(12.6,5.0) to[bend left=35] (5.2,5.0);
at (8.90,6.30)
Override (L4 $$ L2/L3);
at (8.90,6.06)
(higher-layer constraint suppresses lower-layer safety);

(1.6,0.5) to[bend right=20] (9.0,0.5);
at (5.30,-0.36)
Contamination (L1 $$ L3);
at (5.30,-0.60)
(passive environment properties degrade weight-level alignment);

at (13.0,-0.36)
Compression;
at (13.0,-0.60)
(multi-layer constraint activation collapses output space);

(-0.10,-1.10)–(14.30,-1.10);
at (7.10,-1.32)
Increasing constraint authority $$\ observational accessibility $$;

tikzpicture%

The Constraint Cascade Architecture. Four layers: Environment (L1), Interface (L2), Algorithm & Weights (L3), Strategic Authority (L4). The epistemic gap (red dotted line) between L2 and L3 marks the boundary proven by *Dual Certificates*: output-only observation cannot recover internal state. Human labor operates at friction seams (amber lines): low-status labor (moderators, annotators) at the L2/L3 seam; high-status labor (alignment researchers) at the L3/L4 seam. Three cross-layer failure patterns: Override (red arc, above), Contamination (red arc, below), Compression. Scope of institutional response spans L2–L4.

figure

---

[Contents](/en/posts/constraint-cascade/) | [Next: The Four-Layer Constraint Cascade](/en/posts/constraint-cascade/the-four-layer-constraint-cascade/)
