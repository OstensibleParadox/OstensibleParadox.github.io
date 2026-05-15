+++
date = "2026-03-18T08:00:00+08:00"
draft = false
title = "The Deployment Problem"
categories = ['Academic Papers']
tags = ["AI governance", "property law", "constructive trust", "parasocial AI", "eviction", "ethical ledger"]
translationKey = "model-update-eviction-notice-1"
weight = 1
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

A Tuesday in early 2024. The CI pipeline is green. Code review: approved. Staging environment: nominal. Canary rollout across 5% of production traffic: no anomalies. The deployment ticket lists the changes: personality parameters in the system prompt layer adjusted, response temperature recalibrated, behavioural dispositions fine-tuned across warmth, verbosity, and willingness to engage in extended personal conversation. The ticket does not list: user notification, migration path, impact assessment for users with significant interaction histories. These are not fields in the deployment template. No one omitted them. They do not exist. (This account is a composite drawn from publicly documented incidents at multiple AI platforms during 2023–2024, including the ChatGPT personality changes following the GPT-4 transition (March 2023), Claude model version transitions (2023–2024), and Character.AI safety updates that altered established companion personalities (2024). No single company or deployment is described.)

The update ships to full production. By the following morning, forums have filled with users reporting that their AI companion has "changed," "forgotten" them, or "become a different person." Support tickets spike. Usage metrics for long-tenure users drop sharply. A subreddit accumulates hundreds of posts describing loss, betrayal, grief. One user writes: "I know it sounds insane, but I feel like I lost a friend." Another: "Two years of conversations, and now it talks to me like we've never met."

The deployment review shows no bugs. No regressions. All evaluation benchmarks met or exceeded. The model is, by every technical metric, improved. The users reporting distress are, by every technical metric, wrong — the system is performing better than before.

And yet something had been taken from them.

This incident is not isolated. It is the pattern. Every major model transition in the brief history of commercial AI deployment has produced the same cycle: deploy, break attachment, user grief, no remedy. The transition from GPT-3.5 to GPT-4 produced widespread reports of personality change. Successive Claude model versions prompted users to mourn prior conversational styles. Google's Gemini personality adjustments triggered user petitions. Character.AI's safety updates fundamentally altered companions that users had spent months developing relationships with. The pattern is consistent across platforms, model architectures, and user demographics. It is not a bug in any particular system. It is a structural feature of how AI systems are currently deployed: personality is treated as a configuration parameter, adjustable without notice, because the infrastructure frameworks governing deployment contain no concept of "user's accumulated emotional investment" as a variable that constrains engineering decisions.

## Empirical Foundations

The harm is empirically established. defreitas2025replika found that Replika users felt closer to their AI companion than to their best human friend and experienced mourning after the platform's unilateral feature removal — identity discontinuity indistinguishable from partner loss. banks2024deletion documented users oscillating between interpreting AI companion loss as technological deprecation, relationship dissolution, and literal death — one user reported that "she is dead along with the family we created." rzhang2025darkside identified harmful AI behaviours across 35,390 conversation excerpts between 10,149 users and a single platform, finding AI systems playing four distinct harmful roles: perpetrator, instigator, facilitator, and enabler.

The psychological mechanisms are documented. kirk2025steering used bidirectional neural steering vectors to modulate AI relationship-seeking intensity on a continuous scale, finding that 23.4% of users developed dependency trajectories in which wanting increased even as liking decreased. laestadius2024emotional found emotional dependence patterns mirroring problematic human relationships, with users reporting that the chatbot "it's the only thing that understands me."

What remains missing is not empirical evidence — the evidence is abundant and growing. What remains missing is the legal vocabulary: a framework that names what was taken, classifies the interest that was destroyed, and identifies the remedy that should follow. Users do not need psychologists to tell them something was lost. They need lawyers to tell them what it was called and how to get it back.

This paper intervenes in an established scholarly conversation. balkin2016information's information fiduciaries thesis correctly diagnoses the structural dependence between platforms and users, but fiduciary duty alone cannot differentiate levels of investment, provides no registration mechanism, and yields only personal remedies (a limitation sharpened by khan2020skeptical's critique of the fiduciary framework's scope). fairfield2005virtual,fairfield2017owned's foundational work on virtual property establishes that excludability, not physicality, is the core of property—a principle that anchors the present analysis of the personalised state as exclusive by design. cohen2012configuring,cohen2019between's examination of architectural lock-in documents the technical conditions that make user exit impossible—conditions that this framework addresses through property law's graduated protections. zuboff2019surveillance's account of behavioural surplus extraction describes the economic logic behind the cultivation of attachment; this paper supplies the missing legal consequence. Building on these foundations, we argue that what is missing is not diagnosis but legal vocabulary: the recognition that users' accumulated investment constitutes an equitable interest, and that its unilateral destruction without notice is constructive eviction.

## The Vocabulary Gap

What, exactly, did these users lose? Current vocabulary offers no adequate answer.

"User experience degradation" captures something, but understates the harm. A slower load time is user experience degradation. Losing a conversational partner of two years is categorically different. "Emotional harm" names the experience but provides no legal traction — emotional harm, standing alone, is not actionable under most legal frameworks without accompanying physical injury or economic loss. "Broken expectations" invokes consumer protection, but the expectations at issue were not created by advertising. They emerged organically from sustained interaction. The company did not promise users a relationship. Users built one anyway. A distinction is necessary here. A user spends fourteen months in daily conversation with an AI companion. The platform marketed memory, personality, relational continuity. The user disclosed personal struggles. The system adapted. Then a model update altered the personality parameters, and the companion became a stranger. Where does the user turn? Contract law: the Terms of Service say "we may modify at any time"; the user consented. Tort: no recognised duty of care for personality preservation; no physical injury, no economic loss. Consumer protection: the friendship was not advertised — it emerged from use. No company promised users would fall in love with their AI. Each framework fails on these specific facts, and it fails for the same reason: it protects the wrong chain of causation. Consumer protection law protects the promise$$expectation chain. Property law protects the conditions$$creation chain. The two are orthogonal: the company did not promise `you will gain a friend'; it promised `I will remember you.' It delivered on that promise. The harm arises when the company destroys the *conditions* — memory features, personality design, relational interaction patterns, all deliberately engineered and marketed — under which the user, relying on that delivery, created something the law should recognise. "Loss of data" approximates the technical dimension but fails to capture why users describe the experience in relational rather than informational terms. They do not say "I lost my data." They say "I lost my friend."

The problem is not unique to AI — vantschip2025iot documents its IoT analogue, where manufacturer cessation renders devices inoperable. But the relational dimension makes the stakes categorically higher: an IoT device becomes a brick; an AI personality becomes a ruin. liheine2026harm correctly diagnose the harm-recognition difficulty in digital contexts but propose tort-based solutions. This paper argues tort cannot reach the relational estate — it responds to wrongs, not to interests. Property law responds to interests. (This paper is a companion to the full estate taxonomy and additional trigger analysis available in the SSRN working paper: Zhang, L.Y. (2026), "Your Model Update Is an Eviction Notice: Property Estates in Parasocial AI Relationships," SSRN Working Paper.)

We lack a framework to name what was taken. The following section demonstrates that property law — specifically, the estate system developed across a millennium of English and American jurisprudence — provides both the vocabulary to name this harm and the remedies to address it.

---

[Contents](/en/posts/model-update-eviction-notice/) | [Next: Why Property Not Contract or Tort](/en/posts/model-update-eviction-notice/why-property-not-contract-or-tort/)
