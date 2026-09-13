---
title: States and Probability Amplitudes
---

# States and probability amplitudes

## Learning objectives

After this chapter, you should be able to:

- represent a spin-$\tfrac12$ state using kets and column matrices;
- expand a state in any orthonormal basis;
- normalize a state and apply the Born rule;
- calculate selected routes through sequential analyzers;
- distinguish relative phase from overall phase;
- translate among the $x$, $y$, and $z$ spin bases; and
- distinguish a coherent pure state from a classical mixture.

## 2.1 States are vectors

The preparation called $z+$ is represented by the ket $|+z\rangle$ and the
preparation $z-$ by $|-z\rangle$. These two state vectors form an orthonormal
basis for the spin state space. Any pure spin state can therefore be written

```{math}
:label: general-z-state
|\psi\rangle=a|+z\rangle+b|-z\rangle,
```

where $a$ and $b$ are complex numbers. They are coordinates of the state in the
$z$ basis; they are not probabilities.

Choosing the column representation

```{math}
:label: z-basis-columns
|+z\rangle\doteq
\begin{pmatrix}1\\0\end{pmatrix},\qquad
|-z\rangle\doteq
\begin{pmatrix}0\\1\end{pmatrix},
```

gives $|\psi\rangle\doteq(a,b)^{\mathsf T}$. The symbol $\doteq$ means
“represented in the chosen basis.” A ket is an abstract vector; a column matrix
is its representation after a basis has been selected.

This distinction is the same one used for an ordinary geometric vector. The
arrow in space is not identical to the list of three numbers used to represent
it; changing coordinate axes changes the numbers but not the arrow. Likewise,
a spin ket does not change when we rewrite it in the $x$ basis instead of the
$z$ basis.

### Superposition is a physical principle

Because states are vectors, linear combinations of states are also allowed
states. This **superposition principle** is stronger than saying that the atom
is secretly in one state or the other. In

```{math}
|\psi\rangle=a|+z\rangle+b|-z\rangle,
```

the complex coefficients preserve phase information that can affect a later
measurement. A classical mixture in which a fraction $|a|^2$ of atoms is
prepared in $z+$ and the rest in $z-$ does not, in general, make the same
predictions. We will make that comparison explicit in Section 2.8.

## 2.2 Bras and inner products

The bra corresponding to $|\psi\rangle$ is its Hermitian conjugate,

```{math}
\langle\psi|=a^*\langle+z|+b^*\langle-z|
\doteq \begin{pmatrix}a^*&b^*\end{pmatrix}.
```

The basis is orthonormal:

```{math}
:label: z-orthonormality
\langle+z|+z\rangle=\langle-z|-z\rangle=1,
\qquad
\langle+z|-z\rangle=\langle-z|+z\rangle=0.
```

Consequently,

```{math}
:label: norm-state
\langle\psi|\psi\rangle=|a|^2+|b|^2.
```

A physical pure state is normalized, so $|a|^2+|b|^2=1$. If a nonzero vector
$|v\rangle$ is not normalized, the corresponding normalized state is

```{math}
|\psi\rangle=\frac{|v\rangle}{\sqrt{\langle v|v\rangle}}.
```

### Example 2.1: normalization

Normalize $|v\rangle=2|+z\rangle+(1+i)|-z\rangle$. Its squared norm is
$4+|1+i|^2=6$, hence

```{math}
|\psi\rangle=\frac{1}{\sqrt6}
\left(2|+z\rangle+(1+i)|-z\rangle\right).
```

### Inner-product habits

Three small rules prevent most early algebra errors:

```{math}
\langle\phi|\psi\rangle=\langle\psi|\phi\rangle^*,
```

```{math}
\langle\phi|(a|u\rangle+b|v\rangle)
=a\langle\phi|u\rangle+b\langle\phi|v\rangle,
```

and

```{math}
(a\langle u|+b\langle v|)|\psi\rangle
=a\langle u|\psi\rangle+b\langle v|\psi\rangle.
```

The coefficients are conjugated when a ket is converted to a bra, not when a
bra acts linearly on a ket. For example, if
$|\phi\rangle=(|+z\rangle+i|-z\rangle)/\sqrt2$, then
$\langle\phi|=(\langle+z|-i\langle-z|)/\sqrt2$.

## 2.3 The Born rule

The amplitude for obtaining $z+$ from $|\psi\rangle$ is
$\langle+z|\psi\rangle=a$. The probability is the squared magnitude of that
amplitude:

```{math}
:label: born-z
P(z+\mid\psi)=|\langle+z|\psi\rangle|^2=|a|^2,
\qquad
P(z-\mid\psi)=|b|^2.
```

This is the **Born rule**. The order matters in the amplitude: the bra labels
the possible measurement outcome, and the ket labels the prepared state.

Because the basis is complete,

```{math}
:label: completeness-z
|+z\rangle\langle+z|+|-z\rangle\langle-z|=\hat I.
```

Inserting this identity into any ket reproduces its basis expansion. For
example,

```{math}
|\psi\rangle
=\hat I|\psi\rangle
=|+z\rangle\langle+z|\psi\rangle
 +|-z\rangle\langle-z|\psi\rangle.
```

Thus the expansion coefficients are precisely the amplitudes for the basis
outcomes.

### A probability calculation in four steps

For any ideal spin measurement, the same workflow applies:

1. Write the prepared ket and the outcome ket in a common basis.
2. Hermitian-conjugate the outcome ket to make the bra.
3. Form the amplitude $\langle\text{outcome}|\text{prepared}\rangle$.
4. Take its squared magnitude and check that all exclusive outcome
   probabilities sum to one.

The amplitude is generally complex and need not lie between zero and one. Only
its squared magnitude is a probability. Keeping the amplitude until the last
step is essential whenever alternatives will later be recombined.

### Example 2.2: one complex amplitude

Prepare

```{math}
|\psi\rangle=\frac{1}{\sqrt3}|+z\rangle
+i\sqrt{\frac23}|-z\rangle
```

and ask for the probability of $y+$. From equation {eq}`y-states`,

```{math}
\langle+y|=\frac{1}{\sqrt2}(\langle+z|-i\langle-z|).
```

Therefore

```{math}
\langle+y|\psi\rangle
=\frac{1}{\sqrt2}\left(\frac{1}{\sqrt3}
+\sqrt{\frac23}\right)
=\frac{1+\sqrt2}{\sqrt6},
```

and

```{math}
P(y+)=\frac{(1+\sqrt2)^2}{6}
=\frac{3+2\sqrt2}{6}.
```

The complementary probability is
$P(y-)=(3-2\sqrt2)/6$, so the sum is one. The sign from conjugating $i$ in the
$y+$ ket is physically consequential here.

## 2.4 Changing the question means changing the basis

The experimental 50–50 results for a $z+$ state measured along $x$ are produced
by

```{math}
:label: x-states
|+x\rangle=\frac{1}{\sqrt2}\left(|+z\rangle+|-z\rangle\right),
\qquad
|-x\rangle=\frac{1}{\sqrt2}\left(|+z\rangle-|-z\rangle\right).
```

Similarly, a consistent phase convention for the $y$ basis is

```{math}
:label: y-states
|+y\rangle=\frac{1}{\sqrt2}\left(|+z\rangle+i|-z\rangle\right),
\qquad
|-y\rangle=\frac{1}{\sqrt2}\left(|+z\rangle-i|-z\rangle\right).
```

Check, for instance,

```{math}
P(x+\mid z+)=|\langle+x|+z\rangle|^2
=\left|\frac{1}{\sqrt2}\right|^2=\frac12.
```

To express $|\psi\rangle$ in the $x$ basis, insert the $x$-basis completeness
relation:

```{math}
|\psi\rangle
=|+x\rangle\langle+x|\psi\rangle
 +|-x\rangle\langle-x|\psi\rangle.
```

No physical state has changed. Only its coordinates have changed.

### Basis-change matrices

The same calculation can be organized as a matrix transformation. If
$[\psi]_z=(a,b)^{\mathsf T}$, then its $x$-basis column is

```{math}
:label: z-to-x-change
[\psi]_x=
\begin{pmatrix}
\langle+x|+z\rangle&\langle+x|-z\rangle\\
\langle-x|+z\rangle&\langle-x|-z\rangle
\end{pmatrix}
[\psi]_z
=\frac{1}{\sqrt2}
\begin{pmatrix}1&1\\1&-1\end{pmatrix}
[\psi]_z.
```

The rows are the $x$ basis bras written in $z$ coordinates. This change-of-basis
matrix is unitary, so it preserves normalization. Reading its entries as inner
products also makes clear that a basis change does not represent a physical
Stern–Gerlach measurement: no outcome has been selected and the abstract ket
has not been disturbed.

### Example 2.3: probabilities in another basis

For

```{math}
|\psi\rangle=\frac{\sqrt3}{2}|+z\rangle+\frac{i}{2}|-z\rangle,
```

the $x+$ amplitude is

```{math}
\langle+x|\psi\rangle
=\frac{1}{\sqrt2}\left(\frac{\sqrt3}{2}+\frac{i}{2}\right).
```

Therefore $P(x+)=\tfrac12$ and $P(x-)=\tfrac12$. The same state has unequal
$z$ probabilities, $3/4$ and $1/4$. Probabilities belong to a state–measurement
pair, not to the state alone.

## 2.5 Sequential measurements with amplitudes

The vector formalism now reproduces the analyzer chains of Chapter 1. If $+a$
is prepared, $+b$ is selected, and $+c$ is finally detected, the probability
for that selected route is

```{math}
:label: sequential-selected-route
P(+c,+b\mid+a)
=|\langle+c|+b\rangle|^2
 |\langle+b|+a\rangle|^2.
```

The two factors multiply because the first measurement prepares $|+b\rangle$
for the second stage. It would be incorrect to replace them with
$|\langle+c|+a\rangle|^2$: the intervening selected measurement matters.

### Example 2.4: a three-stage analyzer problem

A $z+$ beam enters $\mathrm{SG}_x$. The $x+$ output is retained and sent into
$\mathrm{SG}_y$. What fraction of the original beam emerges as $y-$?

The route probability is

```{math}
P(y-,x+\mid z+)
=|\langle-y|+x\rangle|^2
 |\langle+x|+z\rangle|^2.
```

Using the basis kets,

```{math}
\langle+x|+z\rangle=\frac1{\sqrt2},\qquad
\langle-y|+x\rangle=\frac{1+i}{2}.
```

Both squared magnitudes are $1/2$, so one quarter of the original $z+$ beam
reaches the $y-$ detector. Notice that the second amplitude is complex even
though its probability is simple.

:::{note} Selected paths versus coherent paths
Equation {eq}`sequential-selected-route` applies when the intermediate result is
recorded or filtered, so the state is updated. If intermediate alternatives
remain coherent and are recombined, their **amplitudes** must be added before
squaring. The apparatus determines which calculation is appropriate.
:::

## 2.6 Relative and overall phase

Multiplying a ket by an overall phase does not change any probability:

```{math}
|\psi'\rangle=e^{i\gamma}|\psi\rangle,
\qquad
|\langle\phi|\psi'\rangle|^2
=|e^{i\gamma}|^2|\langle\phi|\psi\rangle|^2.
```

The kets $|\psi\rangle$ and $e^{i\gamma}|\psi\rangle$ represent the same pure
physical state. A **relative phase**, however, changes interference. Compare

```{math}
\frac{|+z\rangle+|-z\rangle}{\sqrt2}=|+x\rangle
\quad\text{with}\quad
\frac{|+z\rangle-|-z\rangle}{\sqrt2}=|-x\rangle.
```

Both give 50–50 probabilities in the $z$ basis, yet an $S_x$ measurement
distinguishes them perfectly.

More generally, write an equatorial state as

```{math}
|\psi_\phi\rangle
=\frac{|+z\rangle+e^{i\phi}|-z\rangle}{\sqrt2}.
```

Its $x+$ probability is

```{math}
:label: phase-to-probability
P(x+)=\left|\frac{1+e^{i\phi}}{2}\right|^2
=\cos^2\frac{\phi}{2}.
```

All members of this family have the same $z$ statistics. Rotating the final
analyzer to $x$ converts the otherwise hidden relative phase into a count rate.
Interference is therefore not an extra phenomenon added to the vector
formalism; it is what ordinary basis projection does to complex coefficients.

## 2.7 The Bloch-sphere coordinates

After normalization and removal of an irrelevant overall phase, every pure
spin-$\tfrac12$ state can be written

```{math}
:label: bloch-state
|\psi\rangle=
\cos\frac{\theta}{2}|+z\rangle
+e^{i\phi}\sin\frac{\theta}{2}|-z\rangle,
```

with $0\leq\theta\leq\pi$ and $0\leq\phi<2\pi$. The angles locate a point on
the Bloch sphere. The half-angle is essential: spinors acquire a minus sign
under a $2\pi$ rotation, although that overall sign does not change the physical
state of an isolated spin.

For a measurement along a unit vector $\mathbf n$ making angle $\theta$ with
$+z$, equation {eq}`bloch-state` gives

```{math}
:label: malus-spin
P(+\mathbf n\mid +z)=\cos^2\frac{\theta}{2},
\qquad
P(-\mathbf n\mid +z)=\sin^2\frac{\theta}{2}.
```

This spin-$\tfrac12$ rule resembles Malus's law for polarization, but uses half
the geometric angle on the Bloch sphere.

For two arbitrary pure states pointing along unit vectors $\mathbf a$ and
$\mathbf b$, their overlap obeys

```{math}
:label: bloch-overlap
|\langle+\mathbf b|+\mathbf a\rangle|^2
=\frac{1+\mathbf a\cdot\mathbf b}{2}
=\cos^2\frac{\alpha}{2}.
```

This derives the empirical angle rule from Chapter 1. Orthogonal directions in
ordinary space ($\alpha=90^\circ$) do **not** correspond to orthogonal kets;
they give an overlap probability of $1/2$. The state orthogonal to
$|+\mathbf a\rangle$ is $|-\mathbf a\rangle$, represented by the antipodal
point on the Bloch sphere.

### Example 2.5: recover Bloch angles from a ket

Consider

```{math}
|\chi\rangle=\frac{\sqrt3}{2}|+z\rangle-\frac{i}{2}|-z\rangle.
```

Comparison with equation {eq}`bloch-state` gives
$\cos(\theta/2)=\sqrt3/2$, so $\theta=\pi/3$. The relative phase is
$e^{i\phi}=-i$, so one convenient choice is $\phi=3\pi/2$. The state therefore
lies $60^\circ$ from $+z$ and points toward negative $y$.

## 2.8 Pure states and mixtures

A pure state assigns one ket to every member of an ideally prepared ensemble.
Now compare the coherent state $|+x\rangle$ with an ensemble prepared by
flipping a fair classical coin and producing $z+$ on heads and $z-$ on tails.
Both preparations give

```{math}
P(z+)=P(z-)=\frac12.
```

They differ under an $x$ measurement. The coherent $|+x\rangle$ state gives
$x+$ with certainty. For the coin-toss ensemble, half of the atoms began in
$z+$ and half in $z-$; each subensemble gives 50–50 $x$ results. The combined
statistics remain 50–50.

No single ket represents that classical mixture. A later chapter will
introduce the density operator, which describes both cases:

```{math}
\hat\rho_{\mathrm{coh}}=|+x\rangle\langle+x|
=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix},
```

whereas

```{math}
\hat\rho_{\mathrm{mix}}
=\frac12|+z\rangle\langle+z|
+\frac12|-z\rangle\langle-z|
=\frac12\begin{pmatrix}1&0\\0&1\end{pmatrix}.
```

The off-diagonal entries retain the coherence that can influence measurements
in another basis. For now, the operational lesson is enough: identical
probabilities for one measurement do not prove that two preparations are the
same quantum state.

### Concept check 2.1

Do $|+y\rangle$ and $|-y\rangle$ differ only by an overall phase?

:::{dropdown} Answer
No. If $|-y\rangle=c|+y\rangle$, matching the $|+z\rangle$ coefficient requires
$c=1$, while matching the $|-z\rangle$ coefficient requires $c=-1$. They are
orthogonal states, not two representations of the same state.
:::

### Concept check 2.2

A normalized ket has $P(z+)=P(z-)=1/2$. Is the state determined uniquely?

:::{dropdown} Answer
No. It has the form $(|+z\rangle+e^{i\phi}|-z\rangle)/\sqrt2$. Different
relative phases give different predictions in other bases.
:::

### Concept check 2.3

After computing $\langle\phi|\psi\rangle=-i/2$, a student reports a probability
of $-i/2$. What should the student report instead?

:::{dropdown} Answer
The amplitude may be complex, but the probability is its squared magnitude:
$|-i/2|^2=1/4$.
:::

## Summary

- A ket is an abstract state vector; its column depends on the chosen basis.
- Inner products produce amplitudes, and squared magnitudes produce
  probabilities.
- An orthonormal basis resolves the identity and supplies expansion
  coefficients.
- Overall phase is unobservable, while relative phase controls interference.
- Every pure spin-$\tfrac12$ state corresponds to a point on the Bloch sphere.
- A selected intermediate result resets the state used in subsequent
  amplitudes, while unobserved coherent alternatives must be added at the
  amplitude level.
- A coherent superposition and a classical mixture can agree in one basis and
  disagree in another.

## Exercises

1. Normalize $(3,4i)^{\mathsf T}$ and find the probabilities of $z+$ and $z-$.
2. Verify directly that the two states in equation {eq}`x-states` are normalized
   and orthogonal.
3. Write $|+z\rangle$ and $|-z\rangle$ in the $x$ basis.
4. Calculate all four quantities $|\langle\pm y|\pm x\rangle|^2$. Interpret the
   result as a sequence of analyzers.
5. For the state in Example 2.3, calculate $P(y+)$ and $P(y-)$. Explain why the
   relative phase matters here although it did not affect the $x$ probabilities.
6. Show that equation {eq}`bloch-state` is normalized. Identify the Bloch-sphere
   angles for the six states $|\pm x\rangle$, $|\pm y\rangle$, and
   $|\pm z\rangle$.
7. Give two normalized kets that have identical $z$ probabilities but are
   orthogonal to one another.
8. Prove that replacing both basis kets by phase-shifted basis kets changes the
   column coordinates but not any measurement probability.
9. Use equation {eq}`z-to-x-change` to express
   $(|+z\rangle+i|-z\rangle)/\sqrt2$ in the $x$ basis. Check the norm before and
   after the transformation.
10. A $y+$ beam enters $\mathrm{SG}_z$; the $z-$ output is retained and sent to
    $\mathrm{SG}_x$. Calculate the probability for every complete detected
    route from the original beam.
11. Derive equation {eq}`phase-to-probability` and find $P(x-)$ without doing a
    second inner-product calculation.
12. Find the Bloch angles $(\theta,\phi)$ for the normalized ket
    $(1,\sqrt3 i)^{\mathsf T}/2$. What spin direction does it represent?
13. Show explicitly that $\hat\rho_{\mathrm{coh}}$ predicts certainty for $x+$
    while $\hat\rho_{\mathrm{mix}}$ predicts probability $1/2$, using
    $P(x+)=\langle+x|\hat\rho|+x\rangle$.
14. Construct two physically different ensembles that give identical $z$
    statistics. Specify one additional analyzer orientation that distinguishes
    them, and calculate the predicted probabilities.
