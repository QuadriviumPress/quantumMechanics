---
title: States and Probability Amplitudes
---

# States and probability amplitudes

## Learning objectives

After this chapter, you should be able to:

- represent a spin-$\tfrac12$ state using kets and column matrices;
- expand a state in any orthonormal basis;
- normalize a state and apply the Born rule;
- distinguish relative phase from overall phase; and
- translate among the $x$, $y$, and $z$ spin bases.

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

### Example 2.2: probabilities in another basis

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

## 2.5 Relative and overall phase

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

## 2.6 The Bloch-sphere coordinates

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

## Summary

- A ket is an abstract state vector; its column depends on the chosen basis.
- Inner products produce amplitudes, and squared magnitudes produce
  probabilities.
- An orthonormal basis resolves the identity and supplies expansion
  coefficients.
- Overall phase is unobservable, while relative phase controls interference.
- Every pure spin-$\tfrac12$ state corresponds to a point on the Bloch sphere.

## Exercises

1. Normalize $(3,4i)^{\mathsf T}$ and find the probabilities of $z+$ and $z-$.
2. Verify directly that the two states in equation {eq}`x-states` are normalized
   and orthogonal.
3. Write $|+z\rangle$ and $|-z\rangle$ in the $x$ basis.
4. Calculate all four quantities $|\langle\pm y|\pm x\rangle|^2$. Interpret the
   result as a sequence of analyzers.
5. For the state in Example 2.2, calculate $P(y+)$ and $P(y-)$. Explain why the
   relative phase matters here although it did not affect the $x$ probabilities.
6. Show that equation {eq}`bloch-state` is normalized. Identify the Bloch-sphere
   angles for the six states $|\pm x\rangle$, $|\pm y\rangle$, and
   $|\pm z\rangle$.
7. Give two normalized kets that have identical $z$ probabilities but are
   orthogonal to one another.
8. Prove that replacing both basis kets by phase-shifted basis kets changes the
   column coordinates but not any measurement probability.
