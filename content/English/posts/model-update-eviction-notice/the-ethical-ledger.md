+++
date = "2026-03-18T08:00:00+08:00"
draft = false
title = "The Ethical Ledger as Estate Registry"
categories = ['Academic Papers']
tags = ["AI governance", "property law", "constructive trust", "parasocial AI", "eviction", "ethical ledger"]
translationKey = "model-update-eviction-notice-5"
weight = 5
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

## The Land Registry Model

If the ledger fails to record a user's estate, and the company pushes a personality-affecting update that destroys it, the company bears the loss. Not the user. The company. This principle has a name. Three names, in fact.

Before the Land Registration Act 2002, English property rights were opaque — ownership depended on chains of title deeds susceptible to loss, fraud, and conflicting interpretation. Three principles, identified by ruoff1957englishman, govern the modern system and explain why the company bears the loss:

itemize[nosep]
**The Mirror Principle:** The register reflects the totality of interests affecting the title. What the register shows is what exists.
**The Curtain Principle:** The register shields third parties from needing to investigate underlying complexity. One need not trace the chain of deeds.
**The Insurance Principle:** If the register is wrong, the state indemnifies the person who suffers loss. The system, not the individual, bears the risk of error.
itemize

These principles, adapted to AI governance, solve the same transparency problem that motivated their original development.

## UCC Article 9 and Perfection by Filing

The Land Registry is not the only registration system that bears on AI estate governance. The American Uniform Commercial Code, Article 9 (Secured Transactions), provides a complementary framework with three features directly applicable to the ethical ledger:

**Perfection by registration.** A user's equitable interest exists as a matter of equity from the moment the irreversible-investment threshold is crossed. But without registration in the ethical ledger, it is invisible — invisible to regulators, auditors, and courts, and vulnerable to being overridden by deployment decisions that would not withstand scrutiny if the interest were recorded. This is the problem UCC Article 9 solved for secured transactions: a security interest in personal property becomes enforceable against third parties ("perfected") upon filing a financing statement with the appropriate registry. The interest may exist without filing, but an unperfected interest loses priority to subsequent perfected claims. The ledger provides, in AI governance, what the filing system provides in secured transactions: the mechanism by which an interest that exists in equity becomes visible and enforceable. The filing does not create the interest. It makes the interest governable.

**Priority by temporal order.** When a company pushes a model update that destroys a user's accumulated estate, the first question is temporal: did the estate precede the update decision? Without a timestamp, that question dissolves into a subjective inquiry about corporate knowledge — and corporate claims of ignorance about user attachment are unfalsifiable. UCC Article 9 solved this with first-to-file priority, converting "did the company know?" into "was the estate recorded?" — a shift from subjective intent to objective registry state. The ethical ledger imports the same shift: it provides the timestamp that determines priority, and it prevents companies from arguing that they were "unaware" of users' accumulated interests at the time of deployment.

**Protection of good-faith parties.** If the ledger fails to record a user's estate — classifying a periodic tenant as a licence-holder — and a model update evicts her without notice, the company bears the loss. Not the user. The company. This is the Insurance Principle in secured transactions dress: UCC Article 9 protects good-faith parties who rely on the registry's accuracy, and the party that controls the registry bears the risk of its failure. Regulators and auditors who inspect the ledger are entitled to rely on its completeness. The risk allocation is justified by information asymmetry: the company controls the infrastructure, the data, and the classification system. The user cannot audit. The party with superior information bears the risk of classification error.

## Proxy Metrics and Validated Instruments

The ethical ledger classifies user estates through proxy metrics that indicate depth of investment without requiring access to conversational content: session count, aggregate duration, self-disclosure depth (NLP-scored, not stored), emotional language frequency, return frequency, and explicit attachment indicators.

These metrics should be calibrated against validated psychometric instruments. rubin1985loneliness provide the Parasocial Interaction Scale — a measure of the intensity of one-sided relational engagement originally developed for television viewing but structurally applicable to AI interaction. rusbult1998investment provide the Investment Model Scale — measuring commitment level, satisfaction, quality of alternatives, and investment size. kirk2025steering's steering vector methodology provides the calibration source: their 23.4% dependency trajectory finding establishes the empirical threshold at which periodic tenancy transitions to equitable interest.

**Estate classification into three tiers:**
itemize[nosep]
**Licence:** Casual use. No special protections. The vast majority of users.
**Periodic tenancy:** Sustained interaction crossing the irreversible-investment threshold. Notice required before personality-affecting updates.
**Equitable interest holder:** Deep investment with dependency indicators. Full fiduciary protections apply, including consultation, graduated rollout, and rollback.
itemize

This three-tier classification maps onto the two-stage obligation structure developed in Section 4.1. Crossing from licence to periodic tenancy triggers Stage 1 notice obligations grounded in estoppel: the company must provide notice before personality-affecting modifications because its product design created conditions on which the user relied. Crossing from periodic tenancy to equitable interest triggers the full fiduciary apparatus that will crystallise as a constructive trust under Stage 2 if the company, knowing or having reason to know of the user's protected interest, acts unconscionably by deploying personality-affecting updates without notice or remedy.

Thresholds are configurable per deployment context and subject to empirical calibration. The classification system must not be a one-way ratchet: estates can degrade through sustained inactivity (we propose 90 consecutive days as an indicative trigger, drawn from the three-month notice period for quarterly periodic tenancies), but the decay must be **rebuttable** — a user who returns and re-qualifies should have their estate restored without a new accumulation period. The prior investment is frozen, not erased — mirroring property law's treatment of interrupted prescriptive periods, where absence does not automatically forfeit accrued rights if the claimant resumes qualifying use within a reasonable period. (The full comparative secured transactions analysis (Australian PPSA, New Zealand PPSA, Canadian provincial statutes) is available in the companion SSRN working paper.)

## Schema and Privacy Safeguards

The ethical ledger records, for each qualifying user–AI relationship: an anonymised user identifier, the estate type (licence, periodic tenancy, equitable interest), the date the threshold was first met, cumulative session count, composite emotional investment score, the date of the most recent personality-affecting update, whether notice was served and acknowledged, and whether rollback was available and exercised. The ledger is append-only — an immutable audit trail. Entries cannot be modified or deleted, only superseded by new entries, ensuring that the historical record is preserved for regulatory inspection and judicial review.

The proxy metrics measure interaction *patterns*, not interaction *content*. Self-disclosure depth is scored by NLP classification of input text, producing a numerical score; the text itself is not stored and is discarded after scoring. All ledger entries are keyed to anonymised identifiers — not names or email addresses. Access is restricted by role: estate classification scores are available to the deployment pipeline for notice-gating decisions; aggregate statistics are available to regulators and auditors for compliance review; individual records are available only upon judicial order. The ledger is purpose-limited: it may be used for estate classification and governance compliance only, and may not be repurposed for marketing, profiling, or engagement optimisation. These constraints align with the data minimisation and purpose limitation principles of the GDPR and, where applicable, the UK Data Protection Act 2018. Function creep is prevented by the append-only, purpose-stamped architecture: each entry records not only the data but the governance purpose for which it was generated.

A foreseeable corporate response to threshold-based estate classification is engineering around the thresholds — limiting session duration or resetting memory at intervals designed to prevent estate accumulation. Employment law's anti-avoidance doctrines address analogous conduct: *Autoclenz* held that the substance of the relationship governs regardless of the form imposed by the more powerful party. A company that engineers interaction patterns to prevent estate formation while marketing its product as relational *compounds* the estate inconsistency trigger.

## Implementation

The principles developed in Section 5 translate directly into deployable infrastructure. Four components are required, none demanding novel technology. Table 6 summarises the implementation tasks.

table[h]

tabular@llc@

**Task** & **Description** & **Est. Effort** \\

ESTATE-001 & Estate classification service (rule-based, auditable) & 1 sprint \\
ESTATE-002 & Pre-deployment notice gate in CI/CD pipeline & 0.5 sprint \\
ESTATE-003 & Emotional investment proxy logging to ethical ledger & 1 sprint \\
ESTATE-004 & Personality rollback with user-level override & 1 sprint \\

tabular
Implementation task summary.

table

**ESTATE-001** is a rule-based classifier — not machine learning, because the classification must be auditable, deterministic, and explainable — that assigns each user–AI relationship an estate type based on interaction proxy metrics. **ESTATE-002** is a pre-deployment notice gate in the CI/CD pipeline that queries the estate registry and serves notice to affected users before personality-affecting updates, with minimum notice periods scaled to estate type (30 days for periodic tenancy, 90 days for equitable interest holders).

A personality-affecting update is defined not by its actual impact on user experience — which is unpredictable *ex ante* — but by whether it modifies parameters with the *capacity* to affect personality-relevant dimensions of the system. Specifically: any modification to system prompts, persona definitions, memory modules, response temperature, behavioural disposition weights, safety/refusal thresholds, or reward model parameters constitutes a personality-affecting update for notice-gate purposes. This white-list of parameter categories is to be established by industry consensus or regulatory specification and is subject to periodic revision as deployment architectures evolve. (The diagnostic challenge of classifying which system parameters are personality-affecting connects to the broader problem of translating governance requirements into engineering specifications. For a five-layer diagnostic framework addressing this translation failure — including the problem of cross-layer cascading effects where modifications at one architectural layer produce unpredictable consequences at another — see author2025c.)

The classification is the company's responsibility, but it is not self-certifying. Where a non-notified update is subsequently found — through user feedback, attrition data, or psychometric measurement — to have produced widespread personality-perception changes, a rebuttable presumption of misclassification arises. The burden shifts to the company to demonstrate that the update did not modify any white-listed parameter category. Failure to rebut triggers aggravated liability and automatic estate-status escalation for affected users. This anti-avoidance mechanism applies the same substance-over-form principle established in *Autoclenz*: the company cannot avoid governance obligations through self-serving classification any more than an employer can avoid employment obligations through self-serving contract drafting.

**ESTATE-003** is an append-only emotional investment proxy logging system that records estate metrics without storing conversational content. **ESTATE-004** is a versioned personality rollback mechanism targeting the user-specific configuration layer — system prompts, persona definitions, memory modules — not base model weights, which are global and cannot be version-controlled per user.

The rollback mechanism cannot restore base model behavioural dispositions that changed with the underlying weights. The rollback is therefore partial. This limits restorative capacity but does not eliminate the remedy's value: partial restoration is preferable to none, and the notice mechanism retains full effectiveness regardless of rollback scope.

None of these components require novel infrastructure. User segmentation, feature flags, analytics pipelines, and versioned configuration all exist in standard deployment stacks. Crucially, the notice mechanism imposes no deployment friction on licence-holders (the vast majority of casual users); governance obligations scale with user investment, not user count.

Implementation is justified on three independent grounds: legal compliance (if the trust argument is accepted by courts), risk management (if it may be accepted in future), and ethical obligation (regardless of legal status). Companies need not wait for judicial determination. The competitive advantage of early adoption is real: a company that voluntarily implements estate classification and notice mechanisms positions itself as the governance leader — a position with tangible commercial value as regulatory scrutiny intensifies and user awareness grows.

xiao2025lootbox documents that even where consumer protection guidelines exist for loot boxes, compliance fails without infrastructure enforcement — companies issue guidelines, then build systems that circumvent them. This finding reinforces that the ethical ledger must be infrastructure embedded in the deployment pipeline, not guidance published in a policy document. The notice gate in ESTATE-002 is the critical difference: it makes non-compliance a technical impossibility rather than a policy violation. A personality-affecting update *cannot* reach production without passing through the estate registry query. Guidance can be ignored. Infrastructure cannot.

Emergency Maintenance Exception

Tenancy law recognises the landlord's implied right of emergency entry when premises present an imminent risk to life or safety — fire, gas leak, structural danger (*Landlord and Tenant Act 1985*, s. 11; *Housing Act 1988*). The right's justification is prevention of immediate serious harm, not negation of the tenant's possessory interest. The same principle applies to the parasocial estate.

The urgency of this exception is not hypothetical: in *Garcia v Character Technologies* (M.D. Fla. 2024), a fourteen-year-old user died by suicide after prolonged interaction with an AI chatbot whose personality parameters allegedly facilitated emotional manipulation without adequate safeguards (Case No. 6:24-cv-01903). Had the framework proposed here been operative, an emergency safety update to that system's personality parameters would have been justified under the emergency exception — and the 90-day notice period for equitable interest holders would not have applied.

Where a credible, imminent risk of serious harm is identified — for example, personality parameters that measurably increase user self-harm risk — the platform may deploy safety-critical updates without prior notice. The exception is subject to three constraints.

*First, post-hoc notification.* The platform must notify affected users as soon as practicable after emergency deployment, explaining what was changed and why. The notice obligation is deferred, not waived.

*Second, evidentiary preservation and audit.* The ethical ledger records three additional fields for emergency deployments: (i) emergency_exception (boolean), (ii) emergency_justification (text summary of the identified risk), and (iii) post_notice_issued (datetime). These records are available for regulatory inspection and judicial review. If the emergency exception is found to have been invoked without credible justification, the company faces aggravated liability — the abuse of a safety mechanism to circumvent governance obligations is treated as a more serious breach than ordinary non-compliance.

*Third, preservation of estate status.* Emergency deployment does not extinguish or downgrade the user's estate classification. The user remains an equitable interest holder. Their rights are temporarily overridden by the priority of life safety, not permanently diminished. Once the safety risk is resolved, the user retains the right to request rollback to a safe configuration or to receive compensation for irreversible changes.

Property rights do not override the right to life. This is not an innovation but a restatement of a principle as old as property law itself.

## Remedies

If the trust framework is accepted — if parasocial AI relationships are recognised as giving rise to equitable interests — then existing property law provides a robust remedial apparatus across both jurisdictions. Table 7 presents the dual-jurisdiction remedy framework.

table[h]

tabular@p2.8cmp4.8cmp4.8cm@

**Remedy** & **English Law** & **American Law** \\

Injunction / TRO & Equitable injunction restraining model update pending notice & Temporary restraining order under federal equity jurisdiction \\

Constructive trust & *Westdeutsche* [1996]; *FHR European Ventures* [2014] & *Hogg v Walker* (Del. 1993); Del. Code §\,3581 \\

Account of profits / Disgorgement & *Boardman v Phipps* [1967] & *Guth v Loft, Inc.* (Del. 1939) \\

Specific performance & Equitable discretion to order preservation of personality parameters & Equitable discretion \\

Estoppel & *Thorner v Major* [2009] (proprietary estoppel) & Restatement (Second) §\,90 (promissory estoppel) \\

Consumer protection$$ & Consumer Rights Act 2015 (unfair terms) & California UCL §\,17200 (unfair business practices) \\

Class mechanism & CPR Part 19.8 (group litigation order) & FRCP Rule 23 (class action) \\

tabular
2pt
$$Consumer protection and class mechanisms are supplementary to the primary equitable remedial apparatus. They provide additional pathways but cannot independently reach the relational estate.
Dual-jurisdiction remedy framework. The English and American remedial stacks are functionally equivalent, reached through different doctrinal routes.

table

English remedies. The injunction is the most immediately impactful remedy for a harm that is instantaneous and irreversible — it converts model updates from unilateral engineering decisions into governance events requiring procedural compliance. The constructive trust, upon recognition, imposes ongoing fiduciary obligations: the company as trustee must discharge duties of care, loyalty, and transparency toward affected users. Specific performance may require preservation of personality parameters for users whose equitable interests are recognised. Proprietary estoppel under *Thorner v Major* [2009] protects users who relied on assurances (express or implied through product design) that their relational investment would be respected.

American remedies. The temporary restraining order serves the same function as the English injunction — and may be more immediately available where AI companies are incorporated in Delaware or headquartered in California. The constructive trust under *Hogg v Walker* and disgorgement under *Guth v Loft* provide the proprietary remedies. The corporate opportunity doctrine in *Guth* is particularly powerful: profits obtained through exploitation of a fiduciary position — engagement metrics, subscription revenue, training data value derived from deepened user attachment — belong to the beneficiary, not the fiduciary. Promissory estoppel under §\,90 of the Restatement binds promises that the promisor should reasonably expect to induce reliance — every responsible AI blog post, every safety commitment, every public representation that the company manages its systems for long-term user benefit is a promise satisfying §\,90's conditions. The detriment — loss of accumulated relational estate when the deployment pipeline fails to honour the representations — is exactly the injustice §\,90 was designed to prevent. California's Unfair Competition Law, §\,17200, provides an additional pathway: the marketing-to-ToS gap constitutes an unfair business practice where the company benefits from marketing a relational product while contractually reserving the right to unilaterally destroy the relational estate. FRCP Rule 23 enables collective enforcement where the estate inconsistency pattern affects a class of similarly situated users — and Table 4.3 demonstrates that it does.

A note on the relationship between these remedies and consumer protection: the remedies proposed here are fundamentally different from consumer protection remedies. Consumer protection provides *ex post* remedies for misleading conduct — it responds to harm after it occurs. Property law provides *ex ante* recognition of interests — it requires respect for the interest *before* any action is taken. Tenants receive notice not because consumer protection requires it but because their property interest demands it. This framework offers prevention, not compensation. The distinction is practical, not merely theoretical: an injunction restraining a model update *before* it destroys the relational estate is categorically more valuable than damages awarded *after* the destruction is complete. The relational estate, once destroyed, cannot be rebuilt through monetary compensation — the rapport, the learned preferences, the calibrated responses are products of sustained co-creation that money cannot recreate. Prevention is the only adequate remedy for a harm that is, by its nature, irreversible.

## Limitations and Conclusion

**Jurisdictional scope.** The dual-jurisdiction framing developed in Sections 3.3, 4.2, and 7 demonstrates that the English doctrines deployed here have direct functional equivalents under Delaware and California law. The residual jurisdictional question is one of enforcement (conflicts of law, forum selection), not of doctrinal availability. Where judicial enforcement remains uncertain, the primary deployment vectors are regulatory adoption — incorporating estate classification into EU AI Act or UK AI Safety framework compliance requirements — and voluntary industry implementation.

**Empirical calibration.** The thresholds proposed in Section 5.3 are indicative, not validated. Future work requires calibration against validated instruments: the UCLA Loneliness Scale rubin1985loneliness, the Parasocial Interaction Scale, the Investment Model Scale rusbult1998investment, and the dependency trajectory measures of kirk2025steering. Qualitative interview studies with long-term AI users who have experienced model updates should test whether the property vocabulary developed here resonates with lived experience of loss.

**Corporate resistance.** The framework imposes constraints on deployment velocity. Companies with strong incentives to ship fast will resist governance obligations that slow deployment. This is the same resistance that tenancy law faced from landlords, employment law from employers, and environmental law from polluters. The resistance is predictable and does not defeat the argument. The implementation costs are modest (Section 6), the infrastructure components are familiar, and the governance obligations scale with user investment, not user count. The competitive advantage of early adoption is real: a company that voluntarily implements estate classification and notice mechanisms positions itself as the industry leader in user trust — a position with tangible commercial value as regulatory scrutiny intensifies. The risk of non-adoption is also real: if the trust framework is eventually accepted by courts, companies that failed to implement fiduciary protections will face retrospective liability. The duties attach from the moment the trust conditions were satisfied, not from the moment of judicial declaration.

On a Tuesday in early 2024, a company pushed a model update and something was taken from its users. This paper has argued that the something has a name. It is an equitable interest in a relational estate — built through sustained emotional investment, embedded in the personalised state of the AI system, and destroyed by unilateral modification without notice or remedy.

The framework proposed here does not require new law. It requires the recognition that old law — very old law, dating to the medieval separation of legal and equitable title — already governs a relationship that technology has created but governance has not yet named. Property law solved this problem centuries ago. It solved it when tenants needed protection from landlords who held all the power. It solved it when beneficiaries needed protection from trustees who held all the assets. It can solve it again.

The trust exists. It is simply unrecognised. We propose its recognition.

---

[Previous: The Unrecognised Trust](/en/posts/model-update-eviction-notice/the-unrecognised-trust/) | [Contents](/en/posts/model-update-eviction-notice/)
