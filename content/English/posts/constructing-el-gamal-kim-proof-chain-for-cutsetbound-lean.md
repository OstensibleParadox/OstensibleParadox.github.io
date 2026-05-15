+++
date = '2026-05-15T10:00:00+08:00'
draft = false
title = 'Constructing El Gamal & Kim Proof Chain for CutSetBound.lean'
translationKey = 'constructing-el-gamal-kim-proof-chain'
+++

# Reconstructing the Relay Channel: Modernizing the Cut-set Bound and Degraded Capacity Proofs

When aiming to "extract dependencies and compress proof chains," few starting points are as effective as the core results from Chapter 16 of El Gamal and Kim: the **cut-set upper bound for general discrete memoryless relay channels** and the **capacity theorem for physically degraded relay channels**. These results, originating from the landmark 1979 Cover–El Gamal paper, hold immense historical significance but carry a structural "debt" that allows for substantial modernization and simplification.

### Why Reconstruct?
The achievability proof in the original 1979 paper relies on a "random partition + ambiguity set intersection" strategy. While elegant for its time, it is no longer the shortest path to the result.

If our goal is simply to reach the same Decode–Forward rate, we can employ a more direct "降维打击" (dimensionality reduction) through **regular encoding and backward decoding**. This approach entirely eliminates the need for random partitioning, binning analysis, and the lengthy Slepian–Wolf style derivations. Simultaneously, the converse can be modularized into three clear steps: two applications of Fano's inequality, a causal Markov chain argument, and a single-letterization lemma via concavity.

The core logic of this reconstruction is that degradedness is not a prerequisite for achievability. The Decode–Forward construction holds for general relay channels; the degradedness assumption is only required in the final step of the converse to tighten the bound.

### Selecting Theorems: Where is the Room for Compression?
Within the landscape of network information theory, I have selected several candidates for modular reconstruction. The criterion is not just the fame of the conclusion, but the potential for the proof chain to be further abstracted and streamlined.

| Candidate Theorem | Text Location | Core Statement | Simplification Potential |
| :--- | :--- | :--- | :--- |
| **Capacity of Physically Degraded Relay Channels** | §16.4, p.386 | $C = \max \min \{I(X_1;Y_2|X_2), I(X_1,X_2;Y_3)\}$ | **Very High**. Backward decoding directly replaces the cumbersome binning proof. |
| **Cut-set Bound for General Relay Channels** | §16.2, p.384 | The outer bound for capacity | **High**. Causality arguments can be modularized without coupling to specific coding schemes. |
| **Gel'fand–Pinsker Theorem** | §7.6, p.178 | Capacity with non-causal state information at the encoder | **High**. The auxiliary variable selection and Csiszár sum identity offer excellent room for abstraction. |

### Reorganizing the Logical Chain
We compress the entire proof into the following logical path:

1.  **The Two-Cut Converse**:
    *   **Cut 1**: At the receiver, using Fano's inequality to bound $I(X_1, X_2; Y_3)$.
    *   **Cut 2**: In an "enhanced" system where the relay's observations are shared, bounding $I(X_1; Y_2, Y_3 | X_2)$.
    *   This relies only on Fano, causality, and memorylessness—no degradedness required.
2.  **Achievability via Backward Decoding**:
    *   Utilize block-Markov superposition coding.
    *   The relay decodes forward (block-by-block), while the destination decodes backward.
    *   The "magic" of backward decoding is that once the next block's message is known, the current block's decision becomes a standard single-user problem, bypassing the need for binning.
3.  **Specializing to Degraded Channels**:
    *   Introduce the physical degradedness Markov chain $X_1 \to (X_2, Y_2) \to Y_3$.
    *   The second cut's mutual information term collapses, closing the gap between the upper and lower bounds.

### Next Steps: Toward Formalization
The current proof draft is mathematically closed. The remaining refinements involve a detailed bookkeeping of the $\delta(\varepsilon)$ terms in the typicality analysis and a formalization of the notation for extending the three-node model to general time-expanded Directed Acyclic Graphs (DAGs).

For formal verification projects like Lean, the most elegant path is to decompose this into three independent lemmas: the **Two-Cut Converse Lemma**, the **Backward Decoding Achievability Lemma**, and the **Additive Decomposition for Orthogonal Networks**. This represents the purest and most modular form of these classic information-theoretic results.
