+++
date = "2026-05-13T08:00:00+08:00"
draft = false
title = "Veil-Piercing as Institutional Judgment"
categories = ['Academic Papers']
tags = ["AI governance", "judgment", "accountability", "waivers of agency"]
translationKey = "waivers-of-agency-4"
weight = 4
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

## The Doctrine and Its Non-Algorithmic Character

The philosophical analysis of §2 established that rules cannot determine their own application, and the doctrinal analysis of §3 demonstrated that AI companies exploit this gap through strategic oscillation between incompatible agency claims. The question becomes: what institutional mechanism can supply the missing judgment? This section argues that the anti-formalist logic of corporate veil-piercing—operationalised through four governance-specific triggers as procedural openers—provides such a mechanism, and that its deliberately non-algorithmic character is the source of its institutional value, not a deficiency.

The "waivers of agency" pattern diagnosed in §3 is not merely analogous to abuse of corporate form—it is a cognate form of it, united by the logic of evasion and risk transfer. In both settings, a formal structure is deployed not to organise legitimate activity but to frustrate existing obligations: the company retains control and profit while externalising harm onto parties who lack the information to attribute it. When AI companies disclaim agency in liability contexts while claiming it in marketing contexts, they use ontological ambiguity to achieve exactly this result. That is why veil-piercing doctrine transfers. The English Supreme Court's distinction in *Prest v. Petrodel Resources* between "concealment" (uncovering who truly controls an entity) and "evasion" (preventing a corporate structure from frustrating existing obligations) provides the doctrinal grammar: the triggers below identify concealment and evasion patterns specific to AI governance. The American "alter ego" tradition, exemplified by *Walkovszky v. Carlton*'s paradigm of multiple thinly capitalised shells operated as a single enterprise, supplies the further element of structural fragmentation designed to externalise risk.

What matters for AI governance is a structural feature of the doctrine: it is *deliberately non-algorithmic*. No single factor is dispositive; courts assess the totality of circumstances. A precise algorithmic test would reproduce exactly the vulnerability that §2 diagnosed: companies would engineer compliance with specified thresholds while continuing to abuse the corporate form. Jonsen and Toulmin rehabilitate casuistry—case-by-case moral reasoning—as better suited to contextually sensitive judgment than universal rules. The four triggers proposed here function as casuistic paradigms: not rules that determine outcomes, but procedural openers that trigger exceptional disclosure, independent audit, adverse inference, or burden shift—borrowing veil-piercing's anti-formalist logic to design evidence-and-scrutiny thresholds for AI governance.

The anti-formalist logic is already being exercised. In *Information Commissioner v. Clearview AI Inc.*, Clearview invoked jurisdictional immunity—claiming no UK establishment and no UK customers—while continuing to process UK residents' biometric data. The Upper Tribunal looked through this formal posture to the operational reality of processing, confirmed the ICO's enforcement jurisdiction under UK GDPR Article 3(2), and remanded for substantive determination. The case exemplifies the institutional move the trigger framework generalises: looking past formal corporate posture to assess whether formal architecture fragments accountability while substantive processing continues unabated. It also illustrates both dimensions of the structural gap diagnosed in §2.2: formal rules that fail to constrain harmful processing, and formal rules actively deployed to evade the accountability that *phronesis* demands.

## Four Triggers as Procedural Openers

The framework proposes four criteria that open exceptional scrutiny—not automatic piercing conditions, but procedural thresholds triggering enhanced disclosure, independent audit, adverse inference, or burden shift. Each maps to existing legal frameworks, allowing case law development rather than requiring novel jurisprudence. Each illustrates the paper's central thesis: rules specify the threshold, but judgment determines whether it has been crossed.

The obvious worry: if companies can game rules, they can reverse-engineer triggers into compliance checklists. This risk is real but structurally distinct from regulatory capture (§6). Regulatory capture subverts the rule-maker; trigger gaming targets the rule's content. The framework's defence is procedural rather than substantive: triggers open a door to judicial inquiry but do not determine its outcome. Once the door opens, courts deploy evidence-based tools—discovery of internal records, adverse inference from absent documentation, sanctions for inconsistent representations across contexts—that make gaming costly even when attempted. A company that reverse-engineers its marketing copy to avoid Trigger 3 while retaining the underlying oscillation in investor communications and litigation posture creates the cross-contextual inconsistency that adversarial discovery is designed to surface. The triggers are, by design, resistant to the formalism they diagnose: they invite scrutiny rather than prescribing outcomes.

### Trigger 1: Structural or Jurisdictional Evasion

**Definition:** A high-risk system is deployed or structured so that formal architecture fragments accountability while substantive control, revenue, and go-live authority remain concentrated.

This trigger captures both corporate-structure evasion—deploying via thinly capitalised entities while the parent retains model control and commercial benefit (*Walkovszky*'s multi-shell pattern)—and process-architecture evasion—splitting decision chains so that no single step triggers regulatory thresholds. Evidentiary indicators include: deployment entities lacking independent capitalisation for foreseeable harm remediation; model update authority and safety-exception approvals retained by a controlling entity; and formal process designs that distribute a single automated decision across nominally independent steps. Procedural consequence: penetrative disclosure of the control chain, fund flows, and approval authority, with potential burden shift to the controlling entity.

Trigger 2: Governance Façade

**Definition:** Public governance commitments—principles, ethics boards, alignment constitutions—cannot be shown to have substantively constrained any decision.

This trigger maps onto *Prest*'s "concealment" prong: the formal structure exists but obscures the absence of genuine constraint. Evidentiary indicators include: ethics boards lacking documented veto or modification authority; no internal record of governance review altering a product decision; and cross-referencing of public commitments against internal evaluation, release, or exception-approval records revealing systematic divergence. Whether governance infrastructure is genuine or decorative cannot be established by inspecting charters or counting board meetings; it requires judgment, with corporate records subject to judicial discovery providing the evidentiary basis. Procedural consequence: independent audit access and adverse inference from absent records.

### Trigger 3: Agency-Control Oscillation

**Definition:** The entity claims AI agency in contexts where it benefits the company and disclaims that same agency in contexts where it would create accountability.

This is the core "waivers of agency" pattern diagnosed in §3. Evidentiary indicators include: marketing materials, white papers, or investor communications attributing values, character, or autonomous judgment to the system, contrasted with terms of service, litigation filings, or regulatory submissions characterising the same system as a tool under full human control. The comparison is textual and cross-contextual, not speculative. Procedural consequence: enhanced judicial scrutiny of corporate claims as a unified body of evidence, not as isolated statements.

### Trigger 4: Audit Obstruction

**Definition:** The entity refuses to maintain or provide minimum reviewable records—evaluation suites, version diffs, failure-mode logs, reproducible interpretability experiments—sufficient for external assessment of compliance.

This trigger introduces adverse-presumption logic: the absence of evidence is itself evidence of a governance deficit. Evidentiary indicators include: destruction or non-creation of training and deployment records; blanket trade-secret claims without any alternative disclosure pathway; and inability to reconstruct post hoc the decision chain that produced a contested output. Procedural consequence: adverse presumption of non-compliance and burden shift to the company—paralleling the evidentiary logic of spoliation doctrines.

## Three Case Illustrations

The triggers are not theoretical constructs awaiting future application. Three recent enforcement actions demonstrate that courts and regulatory bodies are already exercising the kind of institutional judgment the framework formalises—and that each maps to a specific trigger.

### SCHUFA Holding (Scoring), C-634/21 (CJEU 2023) — Trigger 1

The CJEU held that automated credit scoring constitutes a "decision based solely on automated processing" under GDPR Article 22(1) when a third party—such as a bank—"strongly relies" on the score to establish, perform, or terminate a contractual relationship. SCHUFA's process design split the decision chain: the score was "merely preparatory," the bank made the "decision." The Court rejected this formal architecture: the structure cannot wash away decisiveness. The case instantiates Trigger 1: formal process architecture fragmenting accountability while substantive automated influence remains concentrated. The institutional response—extending Article 22 protections to cover the score itself—is the penetrative assessment the trigger framework generalises.

### Garante v. OpenAI / ChatGPT (Italy, 2023–26) — Trigger 2

Italy's data protection authority temporarily banned ChatGPT on 31 March 2023, citing unlawful large-scale collection of personal training data, insufficient transparency, absence of effective age verification, and a prior data breach. Follow-up orders demanded specific remedial steps: publish transparency notices, adjust legal-basis representations, implement rights-exercise tools, and introduce age-gate mechanisms. OpenAI's iterative partial-compliance-and-retreat across 2023–2024 culminated in a €15 million fine and a mandated six-month information campaign (December 2024). The Tribunale di Roma subsequently annulled the fine on 18 March 2026, finding that, absent a European establishment, the Garante's jurisdictional reach was narrower than its enforcement assumed. (Tribunale di Roma, judgment no. 4153/2026. Full reasoning not yet published at time of writing.) The annulment does not dissolve the Trigger 2 diagnosis: the enforcement chain—public compliance posture maintained throughout, with no demonstration that governance structures had substantively constrained processing—remains analytically operative regardless of the fine's procedural fate. The case links directly to the Model Spec analysis in §3: the company that "explicitly delegates all remaining power" to developers and users proved unable to demonstrate that its own governance structures had substantively constrained its processing.

### Mobley v. Workday (N.D. Cal., ongoing) — Trigger 3

In *Mobley v. Workday, Inc.*, job applicants allege that Workday's AI-powered screening tools produced discriminatory outcomes across race, age, and disability. Workday argued it was merely a software vendor, not an employer or employment agency subject to anti-discrimination law. The court denied the motion to dismiss on the "agent" theory, finding the plaintiff plausibly alleged that employers "delegated to Workday and its AI screening tools their traditional function of rejecting candidates," and warning that holding otherwise would let employers "delegate discriminatory programs to third-party software to escape liability." The EEOC filed an amicus brief supporting the plaintiff's position. In January 2026, the court granted partial dismissal of certain state-law claims with leave to amend, but denied dismissal of the core federal disparate-impact claims and rejected Workday's argument that the ADEA does not protect job applicants. The structure of the defense instantiates Trigger 3: vendor and employer each disclaim the decisional agency that grounds liability, oscillating between "we control this" and "we don't control this" depending on which framing minimises exposure.

### FTC v. Rite Aid (US 2023) — Trigger 4

The FTC's complaint alleged that Rite Aid deployed AI-powered facial recognition surveillance across hundreds of stores between 2012 and 2020 without evaluating the technology's accuracy, documenting risk assessments, or establishing procedures to monitor and record false-match rates. Alerts—which typically lacked confidence scores—directed employees to "approach and identify" flagged individuals. The resulting consent order banned facial recognition use for five years and mandated a comprehensive information-security and compliance programme under executive oversight. Unfairness attached not because the algorithm was inherently biased, but because the *absence* of governance infrastructure was itself unfair: the company could not demonstrate that it had taken reasonable steps to prevent foreseeable harm. The case instantiates Trigger 4: non-maintenance of reviewable records triggers adverse presumption and mandated remediation.

---

[Previous: Waivers of Agency: When Rules Replace Judgment](/en/posts/waivers-of-agency/3-waivers-of-agency/) | [Contents](/en/posts/waivers-of-agency/) | [Next: Rules Without Judgment and Conclusion](/en/posts/waivers-of-agency/5-conclusion/)
