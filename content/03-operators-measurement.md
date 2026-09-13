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
building a fresh pair of basis kets each time. It is more efficient—and more
revealing—to package "the measurement of spin along some axis" into a single
mathematical object that acts on state vectors and hands back the possible
outcomes together with the states that make each outcome certain. That object
is a linear operator, and a physical observable is represented by a Hermitian
linear operator: one equal to its own conjugate transpose, a property that
Section 3.8 shows is exactly what guarantees real, physically sensible
measurement outcomes. For spin $\tfrac12$, it is convenient to introduce the
Pauli matrices

```{math}
:label: pauli-matrices
\sigma_x=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
\sigma_y=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\qquad
\sigma_z=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
```

The spin operators are

```{math}
:label: spin-pauli
\hat S_j=\frac{\hbar}{2}\sigma_j,
\qquad j\in\{x,y,z\}.
```

Hermiticity, $\hat A^\dagger=\hat A$, guarantees real eigenvalues and permits
an orthonormal eigenbasis. These are exactly the properties required of ideal
measurement outcomes.

For example,

```{math}
\hat S_z|+z\rangle=+\frac{\hbar}{2}|+z\rangle,
\qquad
\hat S_z|-z\rangle=-\frac{\hbar}{2}|-z\rangle.
```

The possible measured values are the eigenvalues, not the diagonal entries in
an arbitrary representation.

### One apparatus, three mathematical objects

For an ideal measurement, it helps to keep three related objects distinct:

| Laboratory meaning | Mathematical object | For $S_z$ |
| --- | --- | --- |
| A possible detector reading | eigenvalue | $+\hbar/2$ or $-\hbar/2$ |
| A state that makes that reading certain | eigenket | $|+z\rangle$ or $|-z\rangle$ |
| The test for membership in that outcome state | projector | $|\pm z\rangle\langle\pm z|$ |

The observable operator packages all three pieces of information. Solving its
eigenvalue equation

```{math}
\hat A|a_n\rangle=a_n|a_n\rangle
```

extracts the possible readings and the corresponding definite-outcome states.
The prepared ket $|\psi\rangle$ need not be one of those eigenkets. Instead, its
projections onto them determine the outcome probabilities.

## 3.2 Constructing an operator from its measurement states

An operator that represents a measurement can be built directly out of the
outcome states themselves, using a tool already implicit in Chapter 2's
resolution of the identity: the **projector**, an operator that takes an
arbitrary state and returns its component along one particular direction in
state space, discarding the rest. Define the projectors

```{math}
:label: z-projectors
\hat P_{z+}=|+z\rangle\langle+z|,
\qquad
\hat P_{z-}=|-z\rangle\langle-z|.
```

They satisfy $\hat P^2=\hat P$, $\hat P^\dagger=\hat P$, and
$\hat P_{z+}\hat P_{z-}=0$. Completeness gives
$\hat P_{z+}+\hat P_{z-}=\hat I$.

The spectral decomposition of $\hat S_z$ is

```{math}
:label: sz-spectral
\hat S_z=
+\frac{\hbar}{2}\hat P_{z+}
-\frac{\hbar}{2}\hat P_{z-}.
```

More generally, if a Hermitian observable $\hat A$ has nondegenerate
eigenstates $|a_n\rangle$ and eigenvalues $a_n$, then

```{math}
:label: spectral-general
\hat A=\sum_n a_n|a_n\rangle\langle a_n|.
```

This expression cleanly separates the possible values from the state
projectors associated with those values.

### Example 3.1: construct $\hat S_x$

Using equation {eq}`x-states`,

```{math}
\hat S_x=\frac{\hbar}{2}
\left(|+x\rangle\langle+x|-|-x\rangle\langle-x|\right)
=\frac{\hbar}{2}\begin{pmatrix}0&1\\1&0\end{pmatrix}.
```

The last matrix is written in the $z$ basis. In the $x$ basis, the same operator
is diagonal.

Conversely, if the matrix of an observable is known, its eigenvectors identify
the analyzer states. This two-way connection is worth practicing:

```{math}
\text{measurement states and values}
\quad\longleftrightarrow\quad
\text{Hermitian operator}.
```

The operator is not an additional physical substance carried by the atom. It
is the linear map that encodes a particular experimental question.

## 3.3 Measurement probabilities and state update

For a system prepared in $|\psi\rangle$, the probability of result $a_n$ is

```{math}
:label: projective-born
P(a_n)=|\langle a_n|\psi\rangle|^2
=\langle\psi|\hat P_n|\psi\rangle,
\qquad
\hat P_n=|a_n\rangle\langle a_n|.
```

If $a_n$ is obtained in an ideal nondegenerate measurement, the state
immediately after the measurement is $|a_n\rangle$ up to an overall phase. This
is the **projection postulate**. Before the result is known, the theory supplies
a probability distribution; after selection of a result, it supplies a new
preparation.

### A reusable measurement workflow

Given a prepared state and an observable:

1. Diagonalize the observable if its eigenvalues and normalized eigenkets are
   not already known.
2. Build the projector $\hat P_n$ for each distinct outcome.
3. Compute $P(a_n)=\langle\psi|\hat P_n|\psi\rangle$ and check that the
   probabilities sum to one.
4. If an outcome is selected, apply its projector and normalize.
5. Use the resulting state—not the original state—for any later measurement.

This workflow is the operator form of tracing a route through sequential
Stern–Gerlach analyzers.

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

The operator method has recovered the half-angle rule, while also identifying
the exact state prepared when the $+\mathbf n$ result is selected.

For a degenerate result, several orthogonal states share one eigenvalue. If
$\hat P_n$ projects onto that entire eigenspace, the normalized post-measurement
state is

```{math}
:label: degenerate-projection
|\psi'\rangle=
\frac{\hat P_n|\psi\rangle}
{\sqrt{\langle\psi|\hat P_n|\psi\rangle}}.
```

The denominator is the square root of the probability for that outcome.

For a one-dimensional outcome space, applying the projector makes
repeatability transparent:

```{math}
\hat P_n\left(
\frac{\hat P_n|\psi\rangle}
{\sqrt{\langle\psi|\hat P_n|\psi\rangle}}
\right)
=\frac{\hat P_n|\psi\rangle}
{\sqrt{\langle\psi|\hat P_n|\psi\rangle}},
```

because $\hat P_n^2=\hat P_n$. A second immediate measurement therefore finds
the same outcome with certainty. The empirical repeatability of Chapter 1 is
built into the projector algebra.

## 3.4 Expectation values

A single measurement returns one eigenvalue, chosen randomly according to the
Born-rule probabilities. It is also useful to ask what the *average* reading
would be over many repetitions of the same preparation and measurement—a
number a laboratory can compare directly to a meter that reports a running
mean. The expectation value is that ensemble average predicted for many
identically prepared systems:

```{math}
:label: expectation
\langle A\rangle
=\sum_n a_nP(a_n)
=\langle\psi|\hat A|\psi\rangle.
```

It need not be a possible result of a single measurement. For spin $\tfrac12$,
$\langle S_z\rangle=0$ is possible for an ensemble even though no individual
$S_z$ measurement returns zero.

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

The complete result is

```{math}
:label: bloch-expectation
\langle\mathbf S\rangle
=\frac{\hbar}{2}
(\sin\theta\cos\phi,\sin\theta\sin\phi,\cos\theta).
```

The Bloch vector points along the expectation value of spin, but this does not
mean every component simultaneously has that value.

### Expectation values as state tomography

For a spin-$\tfrac12$ pure state, the three mean Pauli components determine the
Bloch vector:

```{math}
\mathbf r=(\langle\sigma_x\rangle,
\langle\sigma_y\rangle,
\langle\sigma_z\rangle).
```

Experimentally, each component is obtained from counts. If $N_{x+}$ and
$N_{x-}$ are measured on identically prepared members of an ensemble, then

```{math}
\langle\sigma_x\rangle
\approx\frac{N_{x+}-N_{x-}}{N_{x+}+N_{x-}},
```

with analogous expressions for $y$ and $z$. Separate subensembles are required
because the three components cannot all be measured sharply on the same atom.
Reconstructing a state from a collection of measurement statistics is called
**quantum-state tomography**.

For a pure state, $|\mathbf r|=1$. Values with $|\mathbf r|<1$ describe mixed
states; the completely unpolarized mixture has $\mathbf r=0$. Thus “zero mean
spin” does not by itself mean that every measurement returns zero—zero is not
even an allowed result for a spin-$\tfrac12$ component.

## 3.5 Variance and uncertainty

The variance of $A$ is

```{math}
:label: variance
(\Delta A)^2
=\left\langle(\hat A-\langle A\rangle)^2\right\rangle
=\langle\hat A^2\rangle-\langle\hat A\rangle^2.
```

For every spin component, $\hat S_j^2=(\hbar^2/4)\hat I$. Thus a $z+$ state has

```{math}
\Delta S_z=0,
\qquad
\Delta S_x=\Delta S_y=\frac{\hbar}{2}.
```

Zero uncertainty means the state is an eigenstate of the observable. It does
not mean that all observables are simultaneously sharp.

For an arbitrary component $S_{\mathbf n}$ in a pure state with Bloch vector
$\mathbf r$, the two possible outcomes immediately give

```{math}
:label: spin-direction-moments
\langle S_{\mathbf n}\rangle
=\frac{\hbar}{2}\mathbf n\cdot\mathbf r,
\qquad
\Delta S_{\mathbf n}
=\frac{\hbar}{2}\sqrt{1-(\mathbf n\cdot\mathbf r)^2}.
```

The uncertainty vanishes when the analyzer points along or opposite the Bloch
vector and is maximal for every perpendicular direction. This makes
uncertainty a property of a state relative to a specified measurement, not a
property of the state alone.

## 3.6 Commutators and incompatibility

Chapter 1 showed experimentally that measuring $S_x$ then $S_z$ gives a
different final distribution than measuring $S_z$ then $S_x$: order matters
for incompatible observables. The operator language captures this order
dependence in a single algebraic object. The commutator of two operators is

```{math}
[\hat A,\hat B]=\hat A\hat B-\hat B\hat A.
```

The Pauli matrices imply

```{math}
:label: spin-commutator
[\hat S_x,\hat S_y]=i\hbar\hat S_z,
```

with cyclic permutations for the other pairs. The order of operations matters.
This algebra is the mathematical counterpart of the sequential-analyzer
behavior from Chapter 1.

For any state,

```{math}
:label: robertson
\Delta A\,\Delta B\geq
\frac12\left|\langle[\hat A,\hat B]\rangle\right|.
```

In a $z+$ state, equation {eq}`robertson` gives
$\Delta S_x\Delta S_y\geq\hbar^2/4$; both uncertainties equal $\hbar/2$, so
the bound is saturated.

:::{warning} A common misreading
An uncertainty relation describes the spread of outcomes for ensembles prepared
in the same state. It is not merely a statement about poor instruments or a
careless observer.
:::

Noncommutation is closely related to analyzer order, but one should not equate
an operator product directly with “perform one projective measurement and then
the other.” A selected sequence also includes state update. For example, the
route probability for $z+\rightarrow x+\rightarrow z-$ is

```{math}
\|\hat P_{z-}\hat P_{x+}|+z\rangle\|^2=\frac14.
```

Reversing the two projectors changes the physical route being described. The
projector product keeps both the ordering and the conditional selection
explicit.

## 3.7 Operators along an arbitrary direction

For a unit vector
$\mathbf n=(\sin\theta\cos\phi,\sin\theta\sin\phi,\cos\theta)$, define

```{math}
:label: spin-n
\hat S_{\mathbf n}=\mathbf n\cdot\hat{\mathbf S}
=\frac{\hbar}{2}\mathbf n\cdot\boldsymbol\sigma.
```

Its eigenvalues are $\pm\hbar/2$. Its $+$ eigenstate is the Bloch-sphere state
in equation {eq}`bloch-state`, up to an overall phase. The compact identity

```{math}
(\mathbf n\cdot\boldsymbol\sigma)^2=\hat I
```

makes the eigenvalues immediate.

The associated outcome projectors can be written without first finding the
eigenvectors:

```{math}
:label: direction-projectors
\hat P_{\mathbf n\pm}
=\frac12(\hat I\pm\mathbf n\cdot\boldsymbol\sigma).
```

They sum to the identity and satisfy
$(\mathbf n\cdot\boldsymbol\sigma)\hat P_{\mathbf n\pm}
=\pm\hat P_{\mathbf n\pm}$. For a state with Bloch vector $\mathbf r$,
equation {eq}`direction-projectors` yields the compact probability rule

```{math}
:label: bloch-direction-probability
P(\pm\mathbf n)=\frac12(1\pm\mathbf n\cdot\mathbf r).
```

This is the operator version of equation {eq}`bloch-overlap` and is useful even
for mixed states, whose Bloch vectors lie inside the sphere.

## 3.8 Why Hermitian operators have the needed structure

The mathematical requirements on an observable are closely tied to the
laboratory meaning of a measurement. Suppose

```{math}
\hat A|a\rangle=a|a\rangle
```

for a normalized eigenket. Taking the inner product with $\langle a|$ gives

```{math}
a=\langle a|\hat A|a\rangle.
```

For a Hermitian operator,

```{math}
\langle a|\hat A|a\rangle^*
=\langle a|\hat A^\dagger|a\rangle
=\langle a|\hat A|a\rangle,
```

so $a=a^*$ and the eigenvalue is real. Detector readings can therefore be real
numbers with physical units.

Now let $|a\rangle$ and $|b\rangle$ have distinct eigenvalues $a$ and $b$.
Hermiticity gives

```{math}
\langle a|\hat A|b\rangle=b\langle a|b\rangle
```

but also

```{math}
\langle a|\hat A|b\rangle=a\langle a|b\rangle.
```

Thus $(a-b)\langle a|b\rangle=0$. If $a\ne b$, then
$\langle a|b\rangle=0$: states belonging to distinct ideal outcomes are
orthogonal. In a degenerate eigenspace, orthonormal eigenvectors can be chosen,
but the measurement outcome by itself does not identify which vector within
that subspace was present.

These facts lead to the finite-dimensional spectral theorem: a Hermitian
operator has an orthonormal eigenbasis and can be written

```{math}
\hat A=\sum_n a_n\hat P_n,
```

where $\hat P_n$ projects onto the full eigenspace belonging to the distinct
value $a_n$. The nondegenerate formula in equation {eq}`spectral-general` is
the special case $\hat P_n=|a_n\rangle\langle a_n|$.

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
conjugates. Its characteristic equation is

```{math}
\det(\hat A-\lambda\hat I)
=(2-\lambda)(4-\lambda)-2
=\lambda^2-6\lambda+6=0,
```

so the possible outcomes are the real values
$\lambda_\pm=3\pm\sqrt3$. Solving
$(\hat A-\lambda_\pm\hat I)|\lambda_\pm\rangle=0$ and normalizing produces
orthogonal eigenkets. Even before doing that last algebra, Hermiticity tells us
that the roots must be real and that a unitary change of basis can diagonalize
the operator.

## 3.9 The Pauli algebra as a calculation tool

Direct multiplication of the matrices in equation {eq}`pauli-matrices` gives

```{math}
:label: pauli-product
\sigma_i\sigma_j
=\delta_{ij}\hat I+i\sum_k\epsilon_{ijk}\sigma_k.
```

Here $\delta_{ij}$ is one when the indices agree and zero otherwise, while
$\epsilon_{ijk}$ supplies the sign associated with a cyclic ordering of
$x,y,z$. A vector form packages all nine products:

```{math}
:label: pauli-vector-product
(\mathbf a\cdot\boldsymbol\sigma)
(\mathbf b\cdot\boldsymbol\sigma)
=(\mathbf a\cdot\mathbf b)\hat I
+i(\mathbf a\times\mathbf b)\cdot\boldsymbol\sigma.
```

Setting $\mathbf a=\mathbf b=\mathbf n$ immediately gives
$(\mathbf n\cdot\boldsymbol\sigma)^2=\hat I$ for a unit vector. Subtracting the
same formula with $\mathbf a$ and $\mathbf b$ exchanged gives

```{math}
:label: arbitrary-spin-commutator
[\hat S_{\mathbf a},\hat S_{\mathbf b}]
=i\hbar\,\hat{\mathbf S}\cdot(\mathbf a\times\mathbf b).
```

Parallel components commute; perpendicular components have the largest
commutator magnitude. The vector geometry of analyzer directions is therefore
encoded directly in the operator algebra.

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

The imaginary cross-product term changes sign if the order is reversed. The
operators are identical only for parallel or antiparallel axes. Acting on
$|+\mathbf a\rangle$ and taking the squared norm yields
$(1+\mathbf a\cdot\mathbf b)/2$, recovering the analyzer angle rule while
retaining the post-selected output state.

## 3.10 Density operators and unread measurements

A ket describes a pure preparation. An ensemble in which state $|\psi_j\rangle$
is prepared with classical probability $w_j$ is represented by the **density
operator**

```{math}
:label: density-ensemble
\hat\rho=\sum_j w_j|\psi_j\rangle\langle\psi_j|,
\qquad
w_j\geq0,\quad\sum_jw_j=1.
```

The trace of an operator is the sum of its diagonal entries in any orthonormal
basis. A density operator is Hermitian, has trace one, and has no negative
eigenvalues. Probabilities and expectation values take the compact forms

```{math}
:label: density-predictions
P(a_n)=\operatorname{Tr}(\hat\rho\hat P_n),
\qquad
\langle A\rangle=\operatorname{Tr}(\hat\rho\hat A).
```

For a pure state, $\hat\rho=|\psi\rangle\langle\psi|$ and
$\hat\rho^2=\hat\rho$, so $\operatorname{Tr}(\hat\rho^2)=1$. A genuine mixture
has $\operatorname{Tr}(\hat\rho^2)<1$. This **purity** test is basis
independent.

Every spin-$\tfrac12$ density operator can be written

```{math}
:label: density-bloch
\hat\rho=\frac12(\hat I+\mathbf r\cdot\boldsymbol\sigma),
\qquad |\mathbf r|\leq1.
```

Pure states lie on the surface of the Bloch sphere, where $|\mathbf r|=1$.
Mixed states lie inside it. The completely unpolarized state
$\hat\rho=\hat I/2$ lies at the center and predicts equal probabilities for
every analyzer orientation.

### Example 3.6: tomography from three analyzer settings

Suppose three equal subensembles produce

```{math}
P(x+)=0.80,\qquad P(y+)=0.10,\qquad P(z+)=0.50.
```

Since $r_j=P(j+)-P(j-)=2P(j+)-1$,

```{math}
\mathbf r=(0.60,-0.80,0).
```

Its length is one, so the idealized data describe a pure equatorial state. A
representative ket is

```{math}
|\psi\rangle
=\frac{1}{\sqrt2}\left(|+z\rangle
+e^{i\phi}|-z\rangle\right),
\qquad
e^{i\phi}=0.60-0.80i.
```

Real experimental frequencies may yield a reconstructed vector slightly
outside the unit sphere because of finite-sample noise. A statistically sound
tomography method then finds the nearest physical density operator instead of
interpreting $|\mathbf r|>1$ as a possible quantum state.

### An outcome ignored is not a measurement undone

If an ideal projective measurement occurs but its result is not retained, the
post-measurement ensemble is

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

The off-diagonal $z$-basis terms have disappeared. A later $S_x$ measurement is
therefore 50--50, even though no observer used the intermediate result.
Discarding a record is not equivalent to preventing the record from being
created. The physical correlation that made the alternatives distinguishable
is what removed their interference.

If the result $a_n$ is retained, the conditional density operator is

```{math}
:label: conditional-density-update
\hat\rho_n'
=\frac{\hat P_n\hat\rho\hat P_n}
{\operatorname{Tr}(\hat\rho\hat P_n)}.
```

Equations {eq}`unread-measurement` and
{eq}`conditional-density-update` distinguish two common laboratory
instructions: “measure and forget the result” versus “measure and select one
result.”

### Concept check 3.4

Can the same density operator arise from different preparation recipes?

:::{dropdown} Answer
Yes. For example, equal mixtures of $z+$ and $z-$, of $x+$ and $x-$, or of
$y+$ and $y-$ all give $\hat I/2$. No measurement on the spin alone can
distinguish preparation recipes that produce the same density operator.
:::

### Concept check 3.5

An unread $S_z$ measurement is made on a $z+$ state. Does its density operator
change?

:::{dropdown} Answer
No. Equation {eq}`unread-measurement` returns
$\hat P_{z+}\hat\rho\hat P_{z+}=\hat\rho$ and a zero contribution from the
other projector. The state was already definite for the measured observable.
:::

### Concept check 3.1

If $\langle S_z\rangle=0$, must the state have a definite value of $S_x$?

:::{dropdown} Answer
No. Every equatorial Bloch-sphere state has $\langle S_z\rangle=0$, but only two
of them, $|+x\rangle$ and $|-x\rangle$, have definite $S_x$.
:::

### Concept check 3.2

Can an expectation value lie outside the range of an observable's eigenvalues?

:::{dropdown} Answer
No. It is a probability-weighted average of the eigenvalues. It can lie between
them, even when that intermediate value cannot occur in one measurement.
:::

### Concept check 3.3

A student calculates $\Delta S_z=0$ in a state $|\psi\rangle$. What can be
concluded about $|\psi\rangle$?

:::{dropdown} Answer
It must be an eigenstate of $\hat S_z$, so it is $|+z\rangle$ or $|-z\rangle$
up to an overall phase. The calculation does not imply zero uncertainty for
$S_x$ or $S_y$; each of those uncertainties is $\hbar/2$.
:::

## Summary

- Hermitian operators represent observables; their eigenvalues are possible
  outcomes and their eigenvectors are definite-outcome states.
- Projectors give both outcome probabilities and post-measurement states.
- An expectation value is an ensemble mean, not generally a single outcome.
- Variance quantifies the spread of repeated measurements on identically
  prepared systems.
- Noncommuting observables encode order dependence and uncertainty relations.
- Projector products describe selected routes through sequential measurements.
- The three mean Pauli components reconstruct a spin state's Bloch vector.
- Hermiticity guarantees real outcomes and orthogonal eigenspaces for distinct
  outcomes.
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
15. Complete Example 3.4 by finding normalized eigenkets for both eigenvalues.
    Verify their orthogonality directly.
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
