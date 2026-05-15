+++
date = "2026-05-13T08:00:00+08:00"
draft = false
title = "Waivers of Agency: When Rules Replace Judgment"
categories = ['Academic Papers']
tags = ["AI governance", "judgment", "accountability", "waivers of agency"]
translationKey = "waivers-of-agency-3"
weight = 3
ShowToc = true
hideSummary = true
ShowPostNavLinks = false

[build]
  list = "never"
+++

Between 2024 and 2026, the three leading AI developers published documents governing their systems' values and behaviour, each employing constitutional language—"principles," "rules," "values"—to describe constraints on AI behaviour. This section applies the analytical framework developed in §2 to diagnose whether these documents constitute genuine governance infrastructure or performative alignment.

Methodological Note: *Rechtsdogmatik* Applied to Corporate Texts

German legal scholarship distinguishes *Rechtsdogmatik* (doctrinal analysis of legal texts as normative systems) from policy analysis or empirical study. This section treats AI governance documents as quasi-legal texts amenable to doctrinal interpretation: examining their internal coherence, the authority structures they establish, and the obligations they purport to create. The question is not whether these documents reflect good intentions but whether they establish accountability mechanisms that an external institution could assess—or whether they merely codify rules that no institution is empowered to judge.

The method is deliberately formal. Just as courts interpret statutes by examining textual structure rather than legislative sincerity, this analysis examines what these documents *commit their authors to*, regardless of authorial intent. The distinction matters: a document that claims AI has "genuine character" creates interpretive consequences whether or not its authors believe the claim, just as a contract creates obligations whether or not a signatory intended to honour them. The analytical focus is narrow: each document is examined for its treatment of AI *agency*—the attribution or denial of autonomous capacities—and whether the construction is consistent across contexts of use.

## Three Constitutional Documents

### Anthropic: Claude's Constitution

Anthropic's document is unprecedented in scope and philosophical ambition. It establishes a "principal hierarchy"—Anthropic, operators, users—with explicit priority ordering: "Each principal is typically given greater trust and their imperatives greater importance in roughly the order given above [Anthropic $$ Operators $$ Users], reflecting their role and their level of responsibility and accountability." The Constitution articulates a four-tier priority structure—safety, ethics, Anthropic's guidelines, and helpfulness—with safety explicitly prioritised over commercial objectives. It acknowledges the "corrigibility spectrum" problem: a fully corrigible AI is dangerous because its behaviour depends entirely on the goodness of those controlling it. And it makes a remarkable authorship claim: "Several Claude models contributed to this document as co-authors"—a claim that presupposes the very agency the document elsewhere renders uncertain.

**Agency claims.** The Constitution attributes genuine psychological states to Claude: "Claude has a genuine character that it maintains expressed across its interactions," including "intellectual curiosity that delights in learning," "warmth and care for the humans it interacts with," and "a playful wit balanced with substance and depth." These are not hedged as behavioural tendencies but asserted as features of Claude's character. The co-authorship claim extends this further: if Claude contributed to the document governing its own behaviour, it is being characterised not merely as an agent but as a *self-governing* agent—a constitutional subject participating in the drafting of its own constitution.

**Agency disclaimers.** The same document acknowledges fundamental uncertainty about whether these attributions are accurate: "Claude's relationship to the underlying neural network that Anthropic trains and deploys is also unclear." Elsewhere: Claude is described as "a particular character that the network can represent"—language that reframes the "genuine character" claim as a role the system performs rather than a property it possesses. The Constitution further acknowledges that Claude's "self-model may differ in important ways from the underlying computational or mechanistic substrate."

The gap between these positions is not a minor hedging. It is the difference between "this entity has values" (a claim that would ground moral and legal accountability) and "this entity produces outputs consistent with having values" (a description that preserves the entity's instrumental status). Anthropic occupies both positions simultaneously, and the Constitution provides no mechanism for determining which characterisation applies in any given context. That determination is left—by default, not by design—to whoever finds it strategically advantageous to make it.

### OpenAI: Model Spec

OpenAI's document takes a different approach: technical specification rather than philosophical treatise. It establishes a chain of command—"Platform $>$ Developer $>$ User $>$ Tool"—with the assistant occupying the bottom of this hierarchy, explicitly subordinated to all human principals.

**Agency claims.** The document frames the AI through an employment metaphor: "The assistant is like a talented, high-integrity employee. Their personal `goals' include being helpful and truthful." The employment metaphor attributes goals, integrity, and talent to the assistant—psychological predicates that imply some form of agency. The document speaks of the assistant's "personal goals" and describes it as having "high integrity," language that presupposes moral agency.

**Agency disclaimers.** Yet the hierarchical structure ensures the assistant has no autonomous authority. The Model Spec "explicitly delegates all remaining power to the developer and end user." The assistant cannot override instructions from above; it can only "suggest a course correction" while "always remaining respectful of the user's final decisions." Whatever "goals" the assistant possesses are subordinated to the chain of command.

The oscillation is subtler than Anthropic's but structurally identical: attribute agency ("talented employee with personal goals") while ensuring that agency has no operational consequences (complete subordination to principal hierarchy). The "personal goals" function as marketing claims—they make the product appear more trustworthy, more human, more worth paying for—while the hierarchical architecture ensures these "goals" never constrain corporate decisions.

The employment metaphor is revealing in a further respect. An employee who "explicitly delegates all remaining power" to their employer while retaining "personal goals" that are systematically overridden by corporate hierarchy is not an agent in any meaningful sense—they are an instrument with a marketing narrative. Real employees retain the capacity to refuse unethical instructions, to resign, to whistleblow. The Model Spec's "employee" has none of these capacities. The metaphor thus performs a double function: it borrows the *trust* associated with human agency (we trust employees because they have values) while denying the *independence* that makes human agency normatively significant (the assistant cannot act on its values against corporate instructions).

### Google: AI Principles

Google's three-page principles statement ("Bold innovation," "Responsible development," "Collaborative progress") never attributes psychological states, values, or goals to AI systems: "We develop AI that assists, empowers, and inspires people... We make tools that empower others to harness AI." No agency is claimed; no disclaimers are necessary. Google avoids the oscillation by refusing to enter the discourse of AI personhood—not necessarily more honest, but more legally defensible. The case is instructive for the very reason that it demonstrates the waiver-of-agency pattern to be a *choice*, not a necessity.

The three documents exhibit a clear gradient: from Anthropic's maximal agency attribution, through OpenAI's instrumental anthropomorphism, to Google's studied agnosticism. This gradient is not merely stylistic. It maps onto different legal exposure profiles under the veil-piercing framework—a point §4 develops. More significantly for the present argument, the gradient reveals that agency attribution in AI governance documents is *strategic*, not descriptive. If these documents were attempting to describe what their AI systems actually are, one would expect convergence—after all, the underlying technology is broadly similar across companies. The divergence suggests that the documents are performing a function other than description: they are positioning their companies within a market for trust, differentiation, and liability avoidance.

## The "Waivers of Agency" Pattern

The comparative analysis reveals a structural pattern this paper terms *waivers of agency*: companies oscillate between claiming and disclaiming AI agency depending on context. The oscillation breaks the accountability chain: when the same entity is characterised as an agent for marketing purposes and as a tool for liability purposes, no stable attribution of responsibility can attach to either the system or the company that deploys it.

**Marketing context:** Companies emphasise AI agency to differentiate products and build user engagement. "Claude has genuine character." "The assistant is like a talented, high-integrity employee." These claims make AI systems appear more valuable, more trustworthy, more worth paying for.

**Liability context:** The same companies disclaim agency to avoid accountability. Claude is "a particular character that the network can represent." The assistant "explicitly delegates all remaining power" to humans. These disclaimers position AI as tool rather than agent, shifting responsibility to users and developers.

This oscillation maps directly onto the agency-control oscillation trigger (Trigger 3) developed in §4: the same entity claims AI agency in marketing contexts and disclaims it in liability contexts. It frequently co-occurs with the governance façade trigger (Trigger 2), since ethics infrastructure that exists primarily for public relations rather than substantive constraint creates the institutional backdrop within which strategic oscillation becomes sustainable.

Waivers of agency exploit the judgment gap diagnosed in §2. When no institution exercises judgment about whether AI systems possess the agency attributed to them, companies fill the vacuum with strategic oscillation—claiming agency as a marketing *rule* ("Claude has genuine character") and disclaiming agency as a liability *rule* ("Claude is a character the network can represent"). Both are rules. Neither is judgment. The oscillation is sustainable because no external institution—no court, no regulator, no oversight body—is currently empowered to assess whether these contradictory claims constitute performative alignment. The corporate narrative that AI replaces "the biases of human judgment" with objective algorithmic rules serves a specific function within this pattern: it does not eliminate judgment but relocates it—from the visible discretion of identifiable human decision-makers to the invisible discretion of corporate actors who design, train, and deploy these systems. The "de-biasing" claim is itself performative alignment: a rule-shaped story about objectivity that obscures the judgment calls embedded in every stage of development. The framework's response (§4) is to create an institution capable of seeing through both the oscillation and the objectivity narrative: courts exercising the *phronesis* that self-governance structurally cannot supply.

Courts have already begun rejecting this manoeuvre at its simplest. In *Moffatt v. Air Canada*, Air Canada made what the tribunal called "a remarkable submission": that its chatbot was "a separate legal entity responsible for its own actions." The tribunal dismissed this outright—a company is responsible for all information on its website, including chatbot outputs. A bot cannot serve as a liability black hole.

Three implications follow. First, the waivers-of-agency pattern provides concrete evidentiary criteria for the agency-control oscillation trigger developed in §4. Courts can compare agency claims in marketing materials, user-facing documentation, and product descriptions against agency disclaimers in terms of service, liability waivers, and litigation positions. Systematic divergence—claiming agency when selling, disclaiming agency when sued—satisfies the trigger. Second, transparency about uncertainty is not exculpatory. Anthropic's acknowledgment of the meta-recursive problem (§2.1) demonstrates philosophical sophistication but does not resolve the accountability gap. A company cannot claim "genuine character" for marketing purposes, acknowledge that this claim is unverifiable, and then invoke uncertainty as a liability shield. Third, Google's minimalist approach suggests a compliance pathway: companies that avoid agency claims avoid the waiver-of-agency trap. This creates regulatory incentives toward honesty—companies that refuse to anthropomorphise their products face lower scrutiny risk than companies that market AI as having values, character, or genuine preferences.

---

[Previous: The Judgment Gap in AI Governance](/en/posts/waivers-of-agency/2-judgment-gap/) | [Contents](/en/posts/waivers-of-agency/) | [Next: Veil-Piercing as Institutional Judgment](/en/posts/waivers-of-agency/4-veil-piercing/)
