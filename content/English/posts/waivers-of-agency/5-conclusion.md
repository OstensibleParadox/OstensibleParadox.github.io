+++
date = "2026-05-13T08:00:00+08:00"
draft = false
title = "Rules Without Judgment and Conclusion"
categories = ['Academic Papers']
tags = ["AI governance", "judgment", "accountability", "waivers of agency"]
translationKey = "waivers-of-agency-5"
weight = 5
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

Three major jurisdictions have enacted substantial AI governance architectures, each demonstrating sophisticated rule-systems coupled with underdeveloped mechanisms for judging their application.

The EU AI Act (Regulation 2024/1689) constitutes the most elaborate rule-system yet enacted for AI governance —four-tiered risk classification, conformity assessments, prohibited practices, and human oversight requirements for high-risk systems. Yet the European Commission's withdrawal of the AI Liability Directive (AILD) in February 2025 removed the mechanism that would have enabled institutional judgment in intermediate cases. The AI Act regulates *before* deployment; the revised Product Liability Directive (Directive 2024/2853) provides strict liability when defective products cause harm. The AILD would have addressed the gap between these: fault-based liability for systems that comply with regulatory requirements yet cause harm through foreseeable but unregulated pathways. Its withdrawal leaves no mechanism for judging whether compliance was genuine or performative, a problem compounded by the "reasonably foreseeable use" standard applied to systems whose uses are, by design, unforeseeable. The framework's relevance is illustrated by the Dutch SyRI case. The System Risk Indication, a welfare fraud detection algorithm deployed across multiple municipalities, complied with its enabling legislation and satisfied formal data protection requirements. The District Court of The Hague struck it down in February 2020 on European Convention on Human Rights grounds—a judgment, not a rule application—finding that the system's opacity and absence of effective redress mechanisms constituted a disproportionate interference with the right to private life. No conformity assessment or risk classification would have produced this outcome. It required a court to exercise the contextual, situated assessment that AI governance systematically lacks. SyRI's domain—welfare benefit eligibility determination—falls squarely within Annex III, Category 5(a) of the AI Act. The case thus illustrates the framework's relevance to the Act's risk classification architecture: a system that would today be classified as high-risk, that complied with its enabling legislation, and that was struck down not by a conformity assessment but by a court exercising contextual judgment.

China's *Interim Administrative Measures for Generative AI Services* constitute the most comprehensive existing lifecycle documentation requirement, imposing obligations spanning training data governance, content labelling, security assessments, and acceptance of inspection. But the limitation lies not in the rules' comprehensiveness but in their enforcement: compliance operates exclusively through administrative channels, and administrative inspection operates on rule-following logic that companies can satisfy formally while hollowing out substantively. The veil-piercing framework differs critically: it envisions lifecycle documentation as evidentiary infrastructure subject to adversarial judicial scrutiny, not as a regulatory checkbox.

The UK's Data (Use and Access) Act 2025 attempts to mandate judgment directly, replacing the Data Protection Act 2018's prohibition on solely automated decisions with a "meaningful human involvement" standard—in effect, an attempt to legislate *phronesis*. The literature on meaningful human control has demonstrated that such requirements, without institutional backstops, are systematically reducible to formal performance. Without a veil-piercing backstop, "meaningful" becomes another rule to be gamed.

Australia's Royal Commission into the Robodebt Scheme reached the same conclusion through a different legal tradition. Examining an automated welfare debt recovery system that unlawfully averaged income across periods to generate 470,000 erroneous debts, the Commission recommended independent expert review of the business rules and algorithms underlying automated decisions, establishment of a body to monitor and audit automated decision-making processes, and mandatory transparency about where and how automation is used. These recommendations—arrived at without reference to AI alignment discourse—converge with the procedural-opener framework proposed here: across jurisdictions and legal traditions, the institutional response to automated decision-making consistently demands external judgment rather than internal compliance.

The pattern is consistent. The EU constructed the most elaborate rule-system in global AI governance and then withdrew the instrument that would have supplied judgment over its application. China mandates the most detailed documentation but channels enforcement exclusively through administrative rule-checking. The UK attempted to mandate judgment itself but without institutional infrastructure to verify the mandate's substance. Veil-piercing doctrine provides what regulation alone cannot: a non-algorithmic, adversarial process through which courts can determine whether corporate compliance is genuine or performative.

## Institutional Preconditions and Capture

The framework presupposes institutional capacities—independent judiciary, adversarial litigation, regulatory independence—unevenly distributed across jurisdictions. Where these prerequisites are absent, the accountability structure proposed in §4 may not function as designed, and transplanting it wholesale into jurisdictions with different legal epistemologies risks reproducing the pattern it diagnoses: imposing rules about judgment without exercising judgment about local conditions. The framework's honest contribution is a diagnosis, not a universal solution: that the gap between rules and judgment is where corporate power operates, with the institutional response necessarily varying across legal traditions.

The second limitation cuts in the opposite direction. Even where institutional capacity exists, large AI companies possess resources to game any governance system—the historical pattern of regulatory capture documented across industries from finance to pharmaceuticals. But this objection, properly understood, is an argument *for* judgment-based governance rather than against it. Rule-based systems are what large companies can game most effectively: they produce documentation that meets formal requirements while evading substantive accountability. Situated human evaluation—courts applying veil-piercing standards through case-by-case assessment, regulatory bodies empowered to look beyond formal compliance—is harder to capture than a rulebook. The waivers-of-agency pattern diagnosed in §3 thrives in rule-governed spaces. Judgment, by its nature, can attend to the gap between form and substance.

The objection from corporate capture is real but not decisive. Principled corporate action remains possible—recent cases demonstrate as much —but the framework proposed here does not rely on the hope that such individuals will always occupy positions of power. Its institutional contribution is to make the costs of performative alignment—veil-piercing exposure, adversarial discovery of internal records, mandated remediation—sufficiently high that genuine compliance becomes the path of least resistance rather than the path of individual heroism.

## Conclusion: Judgment All the Way Down

A prominent framing of this debate presents the issue as a choice between automating judgment and replacing biased judgment with rules. The framing is mistaken. The problem is not whether rules or judgment should win, but how institutions should govern the gap between rules and their application.

The "waivers of agency" pattern supplies the empirical symptom: companies claim agency when selling systems and disclaim it when liability arrives—a form of jurisdictional overreach that borrows the grammar of constitutional governance without accepting its constraints. Veil-piercing doctrine supplies the institutional response. Its non-algorithmic structure gives courts a way to distinguish genuine from performative compliance without pretending that another checklist can solve the problem.

The proposal is limited by uneven institutional capacity and the risk of capture. But those are limitations of a particular remedy, not of the diagnosis. And the remedy must practise what it preaches: if the triggers proposed in §4 ever harden into a compliance checklist—if "avoiding Trigger 3" becomes as formulaic as "publishing an AI constitution"—the framework will have reproduced the pathology it diagnoses. The safeguard is structural: triggers open inquiry, they do not conclude it, and judicial reasoning remains subject to appeal, critique, and revision. Rules tell us what to look for; judgment tells us whether we have found it. AI governance has elaborated the former. It now needs institutions capable of the latter.

---

[Previous: Veil-Piercing as Institutional Judgment](/en/posts/waivers-of-agency/4-veil-piercing/) | [Contents](/en/posts/waivers-of-agency/)
