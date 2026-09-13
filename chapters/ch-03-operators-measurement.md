---
title: Operators and Measurement
---

# Operators and measurement

## Learning objectives

After this chapter, you should be able to:

- represent observables by Hermitian operators;
- calculate eigenvalues, eigenvectors, and spectral decompositions;
- apply the Born rule and the projection postulate;
- compute expectation values and uncertainties;
- use commutators to diagnose incompatible observables; and
- reconstruct a spin state from component-measurement statistics;
- use Pauli-matrix identities to simplify spin calculations; and
- represent pure states, mixtures, and unread measurements with density
  operators.

## 3.1 Observables as operators

Chapter 2 treated $S_z$, $S_x$, and every other spin component separately,
building a fresh pair of basis kets each time we wanted to ask a new
question. That approach works, but it is repetitive: the same idea—"measure
spin along some axis"—kept reappearing with different labels attached. It is
both more efficient and more revealing to package that whole idea into a
single mathematical object, called an **operator**, that acts on a state
vector and hands back the possible outcomes together with the states that
make each outcome certain.

:::{note} Quick review: matrices, eigenvectors, and eigenvalues
Skip this box if diagonalizing a matrix is already routine for you.

A matrix acting on a column vector is a rule for turning one vector into
another—in general, rotating and rescaling it into some new direction.
Remarkably, for almost any square matrix, a few special input vectors are
*not* redirected at all: the matrix sends each of them straight back along
its own original direction, merely stretched or shrunk by some factor. Such
a vector is called an **eigenvector** of the matrix, and the stretching
factor is its **eigenvalue**.

For a concrete, purely mathematical example with no physics attached yet,
take the real matrix

```{math}
M=\begin{pmatrix}3&1\\1&3\end{pmatrix}.
```

Acting on the column $(1,1)$ gives $(4,4)=4\,(1,1)$: the same direction,
scaled by $4$. Acting on $(1,-1)$ gives $(2,-2)=2\,(1,-1)$: the same
direction again, this time scaled by $2$. Try this on almost any other
vector, say $(1,0)$, and the result, $(3,1)$, points in a genuinely new
direction rather than merely rescaling $(1,0)$. So $(1,1)$ and $(1,-1)$ are
eigenvectors of $M$, with eigenvalues $4$ and $2$ respectively—and, for this
particular $M$, essentially the only directions with this special property.

This is exactly the mathematical structure a measurement needs. An
eigenvector is a preparation for which "applying the operator" returns a
definite, predictable multiple of the same state, rather than mixing it into
something new—and the multiple it returns by is the number a measurement
would report. Sections 3.1–3.2 make this identification precise for spin,
where the vectors involved are complex kets rather than real columns like
$(1,1)$.
:::

A physical observable is represented by a **Hermitian** linear operator: one
equal to its own conjugate transpose. Section 3.8 will show exactly why this
property is what guarantees real, physically sensible measurement outcomes;
for now, treat it as the defining requirement an operator must satisfy to
represent something measurable. For spin $\tfrac12$, it is convenient to
introduce the Pauli matrices

```{math}
:label: pauli-matrices
\sigma_x=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
\sigma_y=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\qquad
\sigma_z=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
```

The spin operators are built directly from them:

```{math}
:label: spin-pauli
\hat S_j=\frac{\hbar}{2}\sigma_j,
\qquad j\in\{x,y,z\}.
```

Hermiticity, written $\hat A^\dagger=\hat A$, guarantees two things at once:
real eigenvalues, and an orthonormal eigenbasis. These are exactly the two
properties we need from an ideal measurement—real numbers on a meter, and a
definite state associated with each possible reading.

For example, applying $\hat S_z$ to the two basis kets just returns them,
scaled by the corresponding measured value:

```{math}
\hat S_z|+z\rangle=+\frac{\hbar}{2}|+z\rangle,
\qquad
\hat S_z|-z\rangle=-\frac{\hbar}{2}|-z\rangle.
```

It is worth stressing what the possible measured values actually are: they
are the **eigenvalues** of the operator, not just any numbers that happen to
appear when we write out its matrix in some basis.

### One apparatus, three mathematical objects

For an ideal measurement, it helps to keep three related objects distinct,
since students often blur them together at first:

| Laboratory meaning | Mathematical object | For $S_z$ |
| --- | --- | --- |
| A possible detector reading | eigenvalue | $+\hbar/2$ or $-\hbar/2$ |
| A state that makes that reading certain | eigenket | $|+z\rangle$ or $|-z\rangle$ |
| The test for membership in that outcome state | projector | $|\pm z\rangle\langle\pm z|$ |

The observable operator packages all three pieces of information into one
object. Solving its eigenvalue equation

```{math}
\hat A|a_n\rangle=a_n|a_n\rangle
```

extracts the possible readings $a_n$ and the corresponding definite-outcome
states $|a_n\rangle$ in one stroke. The prepared state $|\psi\rangle$ need
not itself be one of those eigenkets—in general it will not be. Instead, its
*projections* onto them are what determine the outcome probabilities, as the
next section makes precise.

## 3.2 Constructing an operator from its measurement states

We can build an operator representing a measurement directly out of its
outcome states, using a tool already implicit in Chapter 2's resolution of
the identity: the **projector**. A projector is an operator that takes an
arbitrary state, extracts its component along one particular direction in
state space, and discards the rest. Define the projectors

```{math}
:label: z-projectors
\hat P_{z+}=|+z\rangle\langle+z|,
\qquad
\hat P_{z-}=|-z\rangle\langle-z|.
```

They satisfy three properties worth checking directly from the definition:
$\hat P^2=\hat P$ (projecting twice does nothing new), $\hat P^\dagger=\hat
P$ (each is Hermitian), and $\hat P_{z+}\hat P_{z-}=0$ (the two outcomes are
mutually exclusive). Completeness, from Chapter 2, gives
$\hat P_{z+}+\hat P_{z-}=\hat I$.

Combining the eigenvalues with their projectors reconstructs the full
operator. The spectral decomposition of $\hat S_z$ is

```{math}
:label: sz-spectral
\hat S_z=
+\frac{\hbar}{2}\hat P_{z+}
-\frac{\hbar}{2}\hat P_{z-}.
```

More generally, if a Hermitian observable $\hat A$ has nondegenerate
eigenstates $|a_n\rangle$ and eigenvalues $a_n$, the same pattern holds for
any number of outcomes:

```{math}
:label: spectral-general
\hat A=\sum_n a_n|a_n\rangle\langle a_n|.
```

This expression cleanly separates two pieces of information that are easy to
conflate: the possible *values* $a_n$, and the state *projectors* associated
with those values.

### Example 3.1: construct $\hat S_x$

Using equation {eq}`x-states`,

```{math}
\hat S_x=\frac{\hbar}{2}
\left(|+x\rangle\langle+x|-|-x\rangle\langle-x|\right)
=\frac{\hbar}{2}\begin{pmatrix}0&1\\1&0\end{pmatrix}.
```

The last matrix is written in the $z$ basis. In the $x$ basis, the same
operator is diagonal—a reminder that "the matrix of an operator" always means
the matrix *in a particular basis*, never an absolute property of the
operator alone.

This construction also runs in reverse: if the matrix of an observable is
already known, its eigenvectors identify the corresponding analyzer states.
This two-way connection is worth practicing in both directions:

```{math}
\text{measurement states and values}
\quad\longleftrightarrow\quad
\text{Hermitian operator}.
```

Keep in mind what the operator is *not*. It is not an additional physical
substance carried around by the atom. It is simply the linear map that
encodes one particular experimental question—nothing more, and nothing less.

## 3.3 Measurement probabilities and state update

For a system prepared in $|\psi\rangle$, the probability of obtaining result
$a_n$ follows directly from the Born rule of Chapter 2, now written using the
projector language just introduced:

```{math}
:label: projective-born
P(a_n)=|\langle a_n|\psi\rangle|^2
=\langle\psi|\hat P_n|\psi\rangle,
\qquad
\hat P_n=|a_n\rangle\langle a_n|.
```

If $a_n$ is obtained in an ideal nondegenerate measurement, the state
immediately after the measurement is $|a_n\rangle$, up to an overall phase.
This is the **projection postulate**: before the result is known, the theory
supplies a probability distribution over outcomes; the instant a result is
selected, that same theory supplies a new preparation to use going forward.

### A reusable measurement workflow

Given a prepared state and an observable, the same five steps apply every
time:

1. Diagonalize the observable if its eigenvalues and normalized eigenkets
   are not already known.
2. Build the projector $\hat P_n$ for each distinct outcome.
3. Compute $P(a_n)=\langle\psi|\hat P_n|\psi\rangle$ and check that the
   probabilities sum to one.
4. If an outcome is selected, apply its projector and normalize the result.
5. Use the resulting state—not the original state—for any later
   measurement.

:::{figure} ../images/figures/ch03-projective-measurement-workflow.svg
:name: fig-projective-measurement-workflow
:alt: An incoming state enters an observable represented by a spectral sum. The process branches into plus and minus outcomes with projector probabilities, and each selected branch prepares the corresponding eigenstate.
:width: 100%

A projective measurement does two jobs. Its spectral projectors determine the
probabilities of the possible records, and a selected record supplies the
state used in every later step.
:::

This workflow is nothing more than the operator version of tracing a route
through sequential Stern–Gerlach analyzers, which Chapter 1 did by hand and
Chapter 2 did with explicit amplitudes.

### Example 3.2: measure along a tilted axis

Let $\mathbf n=(\sin\theta,0,\cos\theta)$ lie in the $xz$ plane. In the $z$
basis,

```{math}
\hat S_{\mathbf n}
=\frac{\hbar}{2}
\begin{pmatrix}
\cos\theta&\sin\theta\\
\sin\theta&-\cos\theta
\end{pmatrix}.
```

Its normalized $+$ eigenket can be chosen as

```{math}
|+\mathbf n\rangle
=\begin{pmatrix}\cos(\theta/2)\\\sin(\theta/2)\end{pmatrix}.
```

For a $z+$ input,

```{math}
P(+\mathbf n\mid z+)
=\langle+z|\hat P_{\mathbf n+}|+z\rangle
=|\langle+\mathbf n|+z\rangle|^2
=\cos^2\frac{\theta}{2}.
```

The operator method has recovered the same half-angle rule found empirically
in Chapter 1, while also identifying the exact state prepared once the
$+\mathbf n$ result is selected—something the earlier probability-tree
approach could not supply on its own.

For a degenerate result, several orthogonal states share one eigenvalue. If
$\hat P_n$ projects onto that entire eigenspace, the normalized
post-measurement state generalizes to

```{math}
:label: degenerate-projection
|\psi'\rangle=
\frac{\hat P_n|\psi\rangle}
{\sqrt{\langle\psi|\hat P_n|\psi\rangle}}.
```

The denominator here is just the square root of the probability for that
outcome, ensuring $|\psi'\rangle$ comes out properly normalized.

This projector construction also makes repeatability, Chapter 1's first
empirical rule, mathematically transparent. For a one-dimensional outcome
space,

```{math}
\hat P_n\left(
\frac{\hat P_n|\psi\rangle}
{\sqrt{\langle\psi|\hat P_n|\psi\rangle}}
\right)
=\frac{\hat P_n|\psi\rangle}
{\sqrt{\langle\psi|\hat P_n|\psi\rangle}},
```

because $\hat P_n^2=\hat P_n$. Reading this equation in words: applying the
same projector a second time changes nothing. A second immediate measurement
therefore finds the same outcome with certainty. This is an important
**consistency check** on the projection postulate: once ideal measurement has
been modeled by a projector update, repeatability follows from idempotence.
The algebra does not derive the update rule from the Born rule; the update
itself remains part of the ideal-measurement postulate motivated by the
experiments of Chapter 1.

```{phet} quantum-measurement
:screen: 2
:sim-name: Quantum Measurement: Spin
:label: fig:ch03-quantum-measurement-spin-sim

Prepare a spin-$\tfrac12$ state, choose an analyzer orientation $\mathbf n$,
and watch the projection postulate act: a Bloch-sphere readout shows the
prepared state collapse to $|\pm\mathbf n\rangle$ the instant a result is
recorded. Reproduce Example 3.2 by tilting the analyzer to angle $\theta$ from
a $z+$ preparation and comparing the displayed probability with
$\cos^2(\theta/2)$.
```

## 3.4 Expectation values

A single measurement returns one eigenvalue, chosen randomly according to
the Born-rule probabilities. It is also useful to ask a different question:
what would the *average* reading be, over many repetitions of the same
preparation and measurement? This is a number a laboratory can compare
directly to a meter that reports a running mean, rather than a single
random outcome. We call it the **expectation value**, and it is the ensemble
average predicted for many identically prepared systems:

```{math}
:label: expectation
\langle A\rangle
=\sum_n a_nP(a_n)
=\langle\psi|\hat A|\psi\rangle.
```

An important subtlety: the expectation value need not itself be a possible
result of any single measurement. For spin $\tfrac12$, $\langle
S_z\rangle=0$ is a perfectly good ensemble average even though no individual
$S_z$ measurement can ever return zero—every single measurement returns
$+\hbar/2$ or $-\hbar/2$.

### Example 3.3: mean spin

Let $|\psi\rangle=a|+z\rangle+b|-z\rangle$. Then

```{math}
\langle S_z\rangle
=\frac{\hbar}{2}\left(|a|^2-|b|^2\right).
```

For the Bloch-sphere state of equation {eq}`bloch-state`, this becomes

```{math}
\langle S_z\rangle=\frac{\hbar}{2}\cos\theta.
```

Repeating the same calculation for $\langle S_x\rangle$ and $\langle
S_y\rangle$ gives the complete result

```{math}
:label: bloch-expectation
\langle\mathbf S\rangle
=\frac{\hbar}{2}
(\sin\theta\cos\phi,\sin\theta\sin\phi,\cos\theta).
```

So the Bloch vector points along the expectation value of spin. Be careful
not to overread this: it does not mean every component simultaneously *has*
that value in any single measurement, only that this is the value each
component averages to.

### Expectation values as state tomography

For a spin-$\tfrac12$ pure state, the three mean Pauli components together
determine the Bloch vector completely:

```{math}
\mathbf r=(\langle\sigma_x\rangle,
\langle\sigma_y\rangle,
\langle\sigma_z\rangle).
```

Each component is measured experimentally from counts, not read off
directly. If $N_{x+}$ and $N_{x-}$ are the numbers measured on identically
prepared members of an ensemble, then

```{math}
\langle\sigma_x\rangle
\approx\frac{N_{x+}-N_{x-}}{N_{x+}+N_{x-}},
```

with analogous expressions for $y$ and $z$. Three *separate* subensembles
are required, one per axis, because the three spin components cannot all be
measured sharply on the same atom—measuring one disturbs what can be known
about the others. The general process of reconstructing a state from a
collection of measurement statistics like this is called **quantum-state
tomography**.

For a pure state, $|\mathbf r|=1$ exactly. Values with $|\mathbf r|<1$
describe mixed states, which Section 3.10 introduces properly; the
completely unpolarized mixture sits at $\mathbf r=0$. So "zero mean spin"
does not, by itself, mean that every measurement returns zero—indeed, zero
is not even an allowed result for a single spin-$\tfrac12$ component
measurement.

## 3.5 Variance and uncertainty

Just as the expectation value captures the *center* of a distribution of
outcomes, we also want a number that captures its *spread*. The variance of
$A$ is defined, as in ordinary statistics, by

```{math}
:label: variance
(\Delta A)^2
=\left\langle(\hat A-\langle A\rangle)^2\right\rangle
=\langle\hat A^2\rangle-\langle\hat A\rangle^2.
```

For every spin component, $\hat S_j^2=(\hbar^2/4)\hat I$, a fact that follows
directly from $\sigma_j^2=\hat I$. Applying this to a $z+$ state gives

```{math}
\Delta S_z=0,
\qquad
\Delta S_x=\Delta S_y=\frac{\hbar}{2}.
```

Zero uncertainty means exactly one thing: the state is an eigenstate of the
observable in question. It does *not* mean that all observables are
simultaneously sharp—here $S_z$ is perfectly definite while $S_x$ and $S_y$
are maximally spread.

### Concept check 3.1

If $\langle S_z\rangle=0$, must the state have a definite value of $S_x$?

:::{dropdown} Answer
No. Every equatorial Bloch-sphere state has $\langle S_z\rangle=0$, but only
two of them, $|+x\rangle$ and $|-x\rangle$, have definite $S_x$.
:::

### Concept check 3.2

Can an expectation value lie outside the range of an observable's
eigenvalues?

:::{dropdown} Answer
No. It is a probability-weighted average of the eigenvalues. It can lie
between them, even when that intermediate value cannot occur in one
measurement.
:::

For an arbitrary component $S_{\mathbf n}$ in a pure state with Bloch vector
$\mathbf r$, the two possible outcomes immediately give both the mean and the
spread in closed form:

```{math}
:label: spin-direction-moments
\langle S_{\mathbf n}\rangle
=\frac{\hbar}{2}\mathbf n\cdot\mathbf r,
\qquad
\Delta S_{\mathbf n}
=\frac{\hbar}{2}\sqrt{1-(\mathbf n\cdot\mathbf r)^2}.
```

The uncertainty vanishes precisely when the analyzer points along or
opposite the Bloch vector, and it is maximal for every direction
perpendicular to it. This is the cleanest way to see that uncertainty is a
property of a *state relative to a specified measurement*—not some intrinsic
fuzziness of the state considered alone.

### Concept check 3.3

A student calculates $\Delta S_z=0$ in a state $|\psi\rangle$. What can be
concluded about $|\psi\rangle$?

:::{dropdown} Answer
It must be an eigenstate of $\hat S_z$, so it is $|+z\rangle$ or $|-z\rangle$
up to an overall phase. The calculation does not imply zero uncertainty for
$S_x$ or $S_y$; each of those uncertainties is $\hbar/2$.
:::

## 3.6 Commutators and incompatibility

Chapter 1 showed experimentally that measuring $S_x$ then $S_z$ gives a
different final distribution than measuring $S_z$ then $S_x$: order matters
for incompatible observables. We now want a single algebraic object that
captures this order-dependence directly, without having to redo the
Stern–Gerlach bookkeeping every time. The **commutator** of two operators is

```{math}
[\hat A,\hat B]=\hat A\hat B-\hat B\hat A.
```

If $\hat A$ and $\hat B$ commute, the order in which we apply them makes no
difference; if the commutator is nonzero, order matters. It is worth
multiplying the Pauli matrices out by hand once, so that the result is not
taken purely on faith. Using equation {eq}`pauli-matrices`,

```{math}
\sigma_x\sigma_y=
\begin{pmatrix}0&1\\1&0\end{pmatrix}
\begin{pmatrix}0&-i\\i&0\end{pmatrix}
=\begin{pmatrix}i&0\\0&-i\end{pmatrix}
=i\sigma_z,
```

while multiplying in the opposite order gives

```{math}
\sigma_y\sigma_x=
\begin{pmatrix}0&-i\\i&0\end{pmatrix}
\begin{pmatrix}0&1\\1&0\end{pmatrix}
=\begin{pmatrix}-i&0\\0&i\end{pmatrix}
=-i\sigma_z.
```

The two products are not equal—already a direct demonstration that matrix
multiplication need not commute—and their difference is
$\sigma_x\sigma_y-\sigma_y\sigma_x=2i\sigma_z$. Inserting
$\hat S_j=(\hbar/2)\sigma_j$ from equation {eq}`spin-pauli` then gives

```{math}
:label: spin-commutator
[\hat S_x,\hat S_y]
=\left(\frac{\hbar}{2}\right)^2(2i\sigma_z)
=i\hbar\left(\frac{\hbar}{2}\sigma_z\right)
=i\hbar\hat S_z,
```

with cyclic permutations for the other pairs, obtained by the same steps
with $x\to y\to z\to x$ relabeled throughout. This nonzero commutator is the
precise algebraic counterpart of the sequential-analyzer behavior observed
in Chapter 1.

The commutator also controls how sharply two observables can be
simultaneously known. For any state,

```{math}
:label: robertson
\Delta A\,\Delta B\geq
\frac12\left|\langle[\hat A,\hat B]\rangle\right|.
```

In a $z+$ state, equation {eq}`robertson` gives
$\Delta S_x\Delta S_y\geq\hbar^2/4$; both uncertainties equal $\hbar/2$, so
the bound is saturated exactly—there is no slack left.

The right-hand side is **state dependent**. A nonzero commutator operator does
not guarantee a positive numerical lower bound in every state. For example,
in $|+z\rangle$,

```{math}
\langle[\hat S_x,\hat S_z]\rangle
=-i\hbar\langle S_y\rangle=0,
```

so Robertson gives only $\Delta S_x\Delta S_z\geq0$. The observables are still
incompatible; this particular bound is merely uninformative for this state.
Indeed $\Delta S_z=0$ and $\Delta S_x=\hbar/2$. Noncommutation is an operator
statement, whereas the numerical lower bound also depends on the preparation.

:::{warning} A common misreading
An uncertainty relation describes the spread of outcomes for ensembles
prepared in the same state. It is not merely a statement about poor
instruments or a careless observer.
:::

Noncommutation is closely related to analyzer order, but be careful not to
equate an operator product directly with "perform one projective measurement
and then the other." A selected sequence also includes a state update in
between, which the bare commutator does not track by itself. For example, the
route probability for $z+\rightarrow x+\rightarrow z-$ is

```{math}
\|\hat P_{z-}\hat P_{x+}|+z\rangle\|^2=\frac14.
```

Reversing the two projectors changes the physical route being described—it
answers a different experimental question, not just a reordered version of
the same one. The projector product keeps both the ordering and the
conditional selection explicit, which the commutator alone does not.

:::{figure} ../images/figures/ch03-measurement-order.svg
:name: fig-measurement-order
:alt: Two analyzer sequences begin from the same y plus state. Selecting z plus and then x plus leaves a final x plus state, while selecting x plus and then z plus leaves a final z plus state. Each selected route has probability one quarter.
:width: 100%

Reversing two selected measurements reverses which eigenstate is prepared
last. Even when the displayed routes happen to have equal probabilities, their
final states differ: $\hat P_x\hat P_z$ and $\hat P_z\hat P_x$ are not the same
operation.
:::

## 3.7 Operators along an arbitrary direction

For a unit vector
$\mathbf n=(\sin\theta\cos\phi,\sin\theta\sin\phi,\cos\theta)$, define the
spin component along that direction as

```{math}
:label: spin-n
\hat S_{\mathbf n}=\mathbf n\cdot\hat{\mathbf S}
=\frac{\hbar}{2}\mathbf n\cdot\boldsymbol\sigma.
```

Its eigenvalues are $\pm\hbar/2$, for any choice of $\mathbf n$—a fact
consistent with Chapter 1's observation that every analyzer, no matter how
it is oriented, gives exactly two outcomes. Its $+$ eigenstate is the
Bloch-sphere state in equation {eq}`bloch-state`, up to an overall phase. The
compact identity

```{math}
(\mathbf n\cdot\boldsymbol\sigma)^2=\hat I
```

makes the eigenvalues immediate, without any further diagonalization.

The associated outcome projectors can be written down directly, without
first solving for the eigenvectors at all:

```{math}
:label: direction-projectors
\hat P_{\mathbf n\pm}
=\frac12(\hat I\pm\mathbf n\cdot\boldsymbol\sigma).
```

They sum to the identity, as any pair of complementary projectors must, and
satisfy $(\mathbf n\cdot\boldsymbol\sigma)\hat P_{\mathbf n\pm}
=\pm\hat P_{\mathbf n\pm}$. For a state with Bloch vector $\mathbf r$,
equation {eq}`direction-projectors` yields a compact probability rule that
is often faster to use than working with explicit eigenkets:

```{math}
:label: bloch-direction-probability
P(\pm\mathbf n)=\frac12(1\pm\mathbf n\cdot\mathbf r).
```

This is the operator version of equation {eq}`bloch-overlap`, and it remains
useful even for *mixed* states, whose Bloch vectors lie strictly inside the
sphere rather than on its surface.

## 3.8 Why Hermitian operators have the needed structure

Section 3.1 asserted that Hermiticity guarantees real eigenvalues and
orthogonal eigenstates. It is worth proving both claims directly, since they
are the entire justification for representing observables by Hermitian
operators in the first place, rather than by some other kind of matrix.

Suppose

```{math}
\hat A|a\rangle=a|a\rangle
```

for a normalized eigenket. Taking the inner product with $\langle a|$ gives

```{math}
a=\langle a|\hat A|a\rangle.
```

For a Hermitian operator, complex-conjugating this expression and using
$\hat A^\dagger=\hat A$ gives

```{math}
\langle a|\hat A|a\rangle^*
=\langle a|\hat A^\dagger|a\rangle
=\langle a|\hat A|a\rangle,
```

so $a=a^*$, meaning the eigenvalue is real. This is precisely what we need:
detector readings can be real numbers with physical units, not complex
quantities with no direct meter reading.

Now let $|a\rangle$ and $|b\rangle$ have distinct eigenvalues $a$ and $b$.
Hermiticity gives

```{math}
\langle a|\hat A|b\rangle=b\langle a|b\rangle
```

but also, moving $\hat A$ to act on the bra instead,

```{math}
\langle a|\hat A|b\rangle=a\langle a|b\rangle.
```

Subtracting these two expressions for the same quantity gives
$(a-b)\langle a|b\rangle=0$. If $a\ne b$, the only way this can hold is
$\langle a|b\rangle=0$: states belonging to distinct ideal outcomes are
automatically orthogonal. In a degenerate eigenspace, where several states
share one eigenvalue, orthonormal eigenvectors can still be chosen within
that subspace, but the measurement outcome alone does not identify which
particular vector within it was present.

Together these two facts give the finite-dimensional spectral theorem: every
Hermitian operator has an orthonormal eigenbasis, and can be written

```{math}
\hat A=\sum_n a_n\hat P_n,
```

where $\hat P_n$ projects onto the full eigenspace belonging to the distinct
value $a_n$. The nondegenerate formula already used in equation
{eq}`spectral-general` is just the special case $\hat P_n=|a_n\rangle\langle
a_n|$, where each eigenspace happens to be one-dimensional.

### Example 3.4: diagonalize a two-state observable

Consider

```{math}
\hat A=
\begin{pmatrix}
2&1-i\\
1+i&4
\end{pmatrix}.
```

The matrix is Hermitian because its off-diagonal entries are complex
conjugates of each other. Its characteristic equation is

```{math}
\det(\hat A-\lambda\hat I)
=(2-\lambda)(4-\lambda)-2
=\lambda^2-6\lambda+6=0,
```

so the possible outcomes are the real values
$\lambda_\pm=3\pm\sqrt3$—real, exactly as Hermiticity guaranteed in advance.

A quick check catches most sign or arithmetic errors before going any
further: the sum of the eigenvalues must equal the trace of $\hat A$, and
their product must equal its determinant. Here
$\lambda_++\lambda_-=6=2+4=\operatorname{Tr}\hat A$, and
$\lambda_+\lambda_-=(3+\sqrt3)(3-\sqrt3)=9-3=6$, which indeed matches the
determinant computed above, $2\cdot4-|1-i|^2=8-2=6$. Both checks pass, so it
is safe to proceed.

To find the eigenvector for $\lambda_+$, write $|\lambda_+\rangle=(v_1,v_2)$
and use either row of $(\hat A-\lambda_+\hat I)|\lambda_+\rangle=0$—the two
rows are not independent equations once $\lambda_+$ is an exact root, so
either one alone determines the ratio $v_2/v_1$. The second row reads
$(1+i)v_1+(4-\lambda_+)v_2=0$, so

```{math}
v_2=-\frac{1+i}{4-\lambda_+}v_1
=-\frac{1+i}{1-\sqrt3}v_1.
```

Choosing $v_1=1$ gives a squared norm

```{math}
1+\left|\frac{1+i}{\sqrt3-1}\right|^2=3+\sqrt3,
```

so one normalized eigenket is

```{math}
|\lambda_+\rangle
=\frac{1}{\sqrt{3+\sqrt3}}
\begin{pmatrix}
1\\[2pt]
\dfrac{1+i}{\sqrt3-1}
\end{pmatrix}.
```

For $\lambda_-=3-\sqrt3$, the second row instead gives
$v_2=-(1+i)/(1+\sqrt3)$ when $v_1=1$. Its squared norm is
$3-\sqrt3$, so

```{math}
|\lambda_-\rangle
=\frac{1}{\sqrt{3-\sqrt3}}
\begin{pmatrix}
1\\[2pt]
-\dfrac{1+i}{1+\sqrt3}
\end{pmatrix}.
```

Before trusting the result, check the inner product. The product of the two
lower components before normalization is

```{math}
\left(\frac{1+i}{\sqrt3-1}\right)^*
\left(-\frac{1+i}{1+\sqrt3}\right)=-1,
```

which cancels the product $1^*1$ of the upper components. Thus
$\langle\lambda_+|\lambda_-\rangle=0$. We have now completed the full
workflow: find the eigenvalues, solve for each component ratio, normalize,
and check orthogonality. Hermiticity told us in advance that the roots would
be real and that such an orthonormal eigenbasis must exist.

## 3.9 The Pauli algebra as a calculation tool

Many spin calculations become much shorter once a few Pauli-matrix
identities are available, so it is worth collecting them here as tools
rather than rederiving them from scratch each time. Direct multiplication of
the matrices in equation {eq}`pauli-matrices` gives

```{math}
:label: pauli-product
\sigma_i\sigma_j
=\delta_{ij}\hat I+i\sum_k\epsilon_{ijk}\sigma_k.
```

Here $\delta_{ij}$ is one when the indices agree and zero otherwise, while
$\epsilon_{ijk}$ supplies the sign associated with a cyclic ordering of
$x,y,z$. Packaging all nine possible products into a single vector identity
gives

```{math}
:label: pauli-vector-product
(\mathbf a\cdot\boldsymbol\sigma)
(\mathbf b\cdot\boldsymbol\sigma)
=(\mathbf a\cdot\mathbf b)\hat I
+i(\mathbf a\times\mathbf b)\cdot\boldsymbol\sigma.
```

Setting $\mathbf a=\mathbf b=\mathbf n$ immediately recovers
$(\mathbf n\cdot\boldsymbol\sigma)^2=\hat I$ for a unit vector, without any
further calculation. Subtracting the same formula with $\mathbf a$ and
$\mathbf b$ exchanged—and using $\mathbf b\times\mathbf a=-\mathbf
a\times\mathbf b$—gives the commutator for components along two arbitrary
directions:

```{math}
:label: arbitrary-spin-commutator
[\hat S_{\mathbf a},\hat S_{\mathbf b}]
=i\hbar\,\hat{\mathbf S}\cdot(\mathbf a\times\mathbf b).
```

Parallel components commute, since their cross product vanishes; perpendicular
components have the largest possible commutator magnitude. In this way, the
vector geometry of analyzer directions is encoded directly in the operator
algebra, rather than needing to be checked case by case.

### Example 3.5: two projectors in succession

Using equation {eq}`direction-projectors`,

```{math}
\hat P_{\mathbf b+}\hat P_{\mathbf a+}
=\frac14\left[
(1+\mathbf a\cdot\mathbf b)\hat I
+(\mathbf a+\mathbf b)\cdot\boldsymbol\sigma
+i(\mathbf b\times\mathbf a)\cdot\boldsymbol\sigma
\right].
```

The imaginary cross-product term changes sign if the order is reversed, so
the two operators are identical only for parallel or antiparallel axes—any
other pair of directions gives an order-dependent result. Acting on
$|+\mathbf a\rangle$ and taking the squared norm yields
$(1+\mathbf a\cdot\mathbf b)/2$, recovering the analyzer angle rule while
also retaining the post-selected output state, something the bare
probability number alone would not do.

## 3.10 Density operators and unread measurements

A ket describes a *pure* preparation: every atom in the ensemble was
prepared exactly the same way. But real experiments sometimes involve a
classical mixture of different preparations—an ensemble in which state
$|\psi_j\rangle$ occurs with classical probability $w_j$. This is represented
by the **density operator**

```{math}
:label: density-ensemble
\hat\rho=\sum_j w_j|\psi_j\rangle\langle\psi_j|,
\qquad
w_j\geq0,\quad\sum_jw_j=1.
```

Recall that the trace of an operator is the sum of its diagonal entries in
any orthonormal basis—the result does not depend on which basis is chosen.
(This is the same fact used as a check in Example 3.4: the trace, computed
from the diagonal entries, equals the sum of the eigenvalues, computed from
an entirely different calculation.) A density operator is always Hermitian,
has trace one, and has no negative eigenvalues. In this language, probabilities and expectation values take
compact forms that work for pure states and mixtures alike:

```{math}
:label: density-predictions
P(a_n)=\operatorname{Tr}(\hat\rho\hat P_n),
\qquad
\langle A\rangle=\operatorname{Tr}(\hat\rho\hat A).
```

For a pure state, $\hat\rho=|\psi\rangle\langle\psi|$ and
$\hat\rho^2=\hat\rho$, so $\operatorname{Tr}(\hat\rho^2)=1$. A genuine
mixture instead has $\operatorname{Tr}(\hat\rho^2)<1$. This **purity** test
gives a single number that tells pure states and mixtures apart, and it does
not depend on which basis we use to compute it.

Every spin-$\tfrac12$ density operator, pure or mixed, can be written in
Bloch-vector form:

```{math}
:label: density-bloch
\hat\rho=\frac12(\hat I+\mathbf r\cdot\boldsymbol\sigma),
\qquad |\mathbf r|\leq1.
```

Pure states lie exactly on the surface of the Bloch sphere, where
$|\mathbf r|=1$; mixed states lie strictly inside it. The completely
unpolarized state $\hat\rho=\hat I/2$ sits at the very center, $\mathbf
r=0$, and predicts equal probabilities for every possible analyzer
orientation.

### Example 3.6: tomography from three analyzer settings

Suppose three equal subensembles produce

```{math}
P(x+)=0.80,\qquad P(y+)=0.10,\qquad P(z+)=0.50.
```

Since $r_j=P(j+)-P(j-)=2P(j+)-1$ for each axis,

```{math}
\mathbf r=(0.60,-0.80,0).
```

Its length is exactly one, so this idealized data describes a pure
equatorial state. A representative ket reproducing it is

```{math}
|\psi\rangle
=\frac{1}{\sqrt2}\left(|+z\rangle
+e^{i\phi}|-z\rangle\right),
\qquad
e^{i\phi}=0.60-0.80i.
```

In a real experiment, finite-sample noise means the reconstructed vector may
come out slightly outside the unit sphere, with $|\mathbf r|$ marginally
greater than one. A statistically sound tomography method then finds the
nearest physically allowed density operator, rather than trying to interpret
$|\mathbf r|>1$ as if it described a valid quantum state.

### An outcome ignored is not a measurement undone

Here is a question that trips up many students on first encounter: if an
ideal measurement occurs but nobody looks at the result, has anything
changed? The answer is yes—and understanding why is one of the more
important lessons in this chapter. If an ideal projective measurement
occurs but its result is not retained, the post-measurement ensemble is

```{math}
:label: unread-measurement
\hat\rho'=\sum_n\hat P_n\hat\rho\hat P_n.
```

For an initial $|+x\rangle$ state followed by an unread $S_z$ measurement,

```{math}
\hat\rho'
=\hat P_{z+}|+x\rangle\langle+x|\hat P_{z+}
+\hat P_{z-}|+x\rangle\langle+x|\hat P_{z-}
=\frac12\hat P_{z+}+\frac12\hat P_{z-}
=\frac12\hat I.
```

Notice what happened to the off-diagonal $z$-basis terms: they have
disappeared entirely. As a direct consequence, a later $S_x$ measurement is
now 50–50, even though no observer ever actually used the intermediate
result. Discarding a record after the fact is not the same as preventing
that record from being created in the first place. It is the physical
correlation that made the alternatives distinguishable—not anyone's act of
reading it—that destroyed the interference. This is exactly the distinction
the quantum-coin-toss simulation of Chapter 2 makes tangible: a coin that has
decohered into a fixed outcome behaves just like $\hat\rho'$ above, no matter
whether that outcome has been read yet.

:::{figure} ../images/figures/ch03-unread-measurement.svg
:name: fig-unread-measurement
:alt: Three Bloch spheres show an initial x plus state, the two possible selected z outcomes, and the completely mixed state at the center when those outcomes are pooled and unread.
:width: 100%

An $S_z$ measurement sends each member of the ensemble to a pole. Keeping the
outcome selects one pole; pooling the outcomes leaves no net Bloch vector and
removes the transverse coherence of the initial $|+x\rangle$ state.
:::

### Concept check 3.4

Can the same density operator arise from different preparation recipes?

:::{dropdown} Answer
Yes. For example, equal mixtures of $z+$ and $z-$, of $x+$ and $x-$, or of
$y+$ and $y-$ all give $\hat I/2$. No measurement on the spin alone can
distinguish preparation recipes that produce the same density operator.
:::

### Concept check 3.5

An unread $S_z$ measurement is made on a $z+$ state. Does its density
operator change?

:::{dropdown} Answer
No. Equation {eq}`unread-measurement` returns
$\hat P_{z+}\hat\rho\hat P_{z+}=\hat\rho$ and a zero contribution from the
other projector. The state was already definite for the measured observable.
:::

By contrast, if the result $a_n$ *is* retained, the conditional density
operator is

```{math}
:label: conditional-density-update
\hat\rho_n'
=\frac{\hat P_n\hat\rho\hat P_n}
{\operatorname{Tr}(\hat\rho\hat P_n)}.
```

Equations {eq}`unread-measurement` and {eq}`conditional-density-update`
distinguish two common laboratory instructions that are easy to conflate in
words but behave quite differently: "measure and forget the result" versus
"measure and select one result."

## Summary

- Hermitian operators represent observables; their eigenvalues are possible
  outcomes and their eigenvectors are definite-outcome states.
- Projectors give both outcome probabilities and post-measurement states.
- An expectation value is an ensemble mean, not generally a single outcome.
- Variance quantifies the spread of repeated measurements on identically
  prepared systems.
- Noncommuting observables encode order dependence and uncertainty
  relations.
- Projector products describe selected routes through sequential
  measurements.
- The three mean Pauli components reconstruct a spin state's Bloch vector.
- Hermiticity guarantees real outcomes and orthogonal eigenspaces for
  distinct outcomes.
- Density operators describe pure states and mixtures in one framework;
  unread measurements remove coherence in the measured basis.

## Exercises

1. Find the eigenvalues and normalized eigenvectors of each Pauli matrix.
2. Verify the projector properties for $\hat P_{x+}$ and $\hat P_{x-}$ using
   explicit $z$-basis matrices.
3. For $|\psi\rangle=(|+z\rangle+i|-z\rangle)/\sqrt2$, calculate
   $\langle S_x\rangle$, $\langle S_y\rangle$, and $\langle S_z\rangle$.
4. Calculate $[\hat S_y,\hat S_z]$ by direct matrix multiplication.
5. Show that $(\mathbf n\cdot\boldsymbol\sigma)^2=\hat I$ for any unit vector
   $\mathbf n$.
6. Derive the projectors
   $\hat P_{\mathbf n\pm}=(\hat I\pm\mathbf n\cdot\boldsymbol\sigma)/2$.
7. A state gives $P(x+)=3/4$. Find $\langle S_x\rangle$ and $\Delta S_x$ without
   first finding a ket.
8. Give an example showing that $\langle\hat A\hat B\rangle$ and
   $\langle\hat B\hat A\rangle$ can differ. Explain how the commutator measures
   the difference.
9. For $\mathbf n=(\sqrt3/2,0,1/2)$, write the $z$-basis matrix of
   $\hat S_{\mathbf n}$ and verify the proposed $|+\mathbf n\rangle$
   eigenvector in Example 3.2.
10. Starting with $|+z\rangle$, calculate the state and probability associated
    with the selected route $z+\rightarrow y-\rightarrow x+\rightarrow z-$
    using a product of projectors.
11. An ensemble produces counts $(N_{x+},N_{x-})=(750,250)$,
    $(N_{y+},N_{y-})=(500,500)$, and
    $(N_{z+},N_{z-})=(933,67)$ on three equal subensembles. Estimate its Bloch
    vector and decide whether the data are approximately consistent with a pure
    state.
12. Derive equation {eq}`spin-direction-moments` from the two outcome
    probabilities in equation {eq}`bloch-direction-probability`.
13. Prove all three projector properties for equation
    {eq}`direction-projectors`: Hermiticity, idempotence, and orthogonality of
    the $+$ and $-$ projectors.
14. Compare the two route probabilities
    $\|\hat P_{z+}\hat P_{x+}|+z\rangle\|^2$ and
    $\|\hat P_{x+}\hat P_{z+}|+z\rangle\|^2$. Explain why they answer different
    experimental questions even though they contain the same two projectors.
15. For Example 3.4, verify both eigenvalue equations with the normalized
    eigenkets given in the text, then reconstruct $\hat A$ from its spectral
    decomposition.
16. Derive equation {eq}`pauli-vector-product` by expanding both dot products
    and using equation {eq}`pauli-product`.
17. Use equation {eq}`arbitrary-spin-commutator` to calculate the commutator
    of components along $\mathbf a=(1,1,0)/\sqrt2$ and
    $\mathbf b=(0,1,1)/\sqrt2$.
18. Find the density matrix and purity for a mixture containing $z+$ with
    probability $3/4$ and $z-$ with probability $1/4$. Draw or describe its
    Bloch vector.
19. Show from equation {eq}`density-bloch` that
    $\operatorname{Tr}(\hat\rho^2)=(1+|\mathbf r|^2)/2$.
20. Verify every line of the unread-measurement calculation for an initial
    $|+x\rangle$ state using explicit $2\times2$ matrices.
21. An initial $|+y\rangle$ state undergoes an unread $S_x$ measurement. Find
    the final density matrix and predict subsequent $x$, $y$, and $z$
    statistics.
22. A detector selects $+\mathbf n$ from a mixed input
    $\hat\rho=(\hat I+r\sigma_z)/2$. Use equation
    {eq}`conditional-density-update` to show that the transmitted ensemble is
    the pure state $|+\mathbf n\rangle$, provided the transmission probability
    is nonzero.

## Selected exercise guidance

Use these answers only after making a complete attempt.

:::{dropdown} Exercise 3
The state is $|+y\rangle$, so
$(\langle S_x\rangle,\langle S_y\rangle,\langle S_z\rangle)
=(0,\hbar/2,0)$.
:::

:::{dropdown} Exercise 7
$\langle S_x\rangle=(\hbar/2)(3/4-1/4)=\hbar/4$. Since
$\langle S_x^2\rangle=\hbar^2/4$,
$\Delta S_x=\sqrt3\hbar/4$.
:::

:::{dropdown} Exercise 11
The estimated Bloch vector is
$\mathbf r=(0.500,0,0.866)$. Its length is approximately one, so the idealized
counts are consistent with a nearly pure state.
:::

:::{dropdown} Exercise 18

```{math}
\hat\rho=\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix},\qquad
\operatorname{Tr}(\hat\rho^2)=\frac58,
```

and its Bloch vector is $(0,0,1/2)$.
:::
