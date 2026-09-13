---
title: Operators and Measurement
---

# Operators and measurement

## Learning objectives

After this chapter, you should be able to:

- represent observables by Hermitian operators;
- calculate eigenvalues, eigenvectors, and spectral decompositions;
- apply the Born rule and the projection postulate;
- compute expectation values and uncertainties; and
- use commutators to diagnose incompatible observables.

## 3.1 Observables as operators

A physical observable is represented by a Hermitian linear operator. For spin
$\tfrac12$, it is convenient to introduce the Pauli matrices

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

## 3.2 Constructing an operator from its measurement states

Define the projectors

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

## 3.4 Expectation values

The expectation value is the ensemble average predicted for many identically
prepared systems:

```{math}
:label: expectation
\langle A\rangle
=\sum_n a_nP(a_n)
=\langle\psi|\hat A|\psi\rangle.
```

It need not be a possible result of a single measurement. For spin $\tfrac12$,
$\langle S_z\rangle=0$ is possible for an ensemble even though no individual
$S_z$ measurement returns zero.

### Example 3.2: mean spin

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

## 3.6 Commutators and incompatibility

The commutator of two operators is

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

## Summary

- Hermitian operators represent observables; their eigenvalues are possible
  outcomes and their eigenvectors are definite-outcome states.
- Projectors give both outcome probabilities and post-measurement states.
- An expectation value is an ensemble mean, not generally a single outcome.
- Variance quantifies the spread of repeated measurements on identically
  prepared systems.
- Noncommuting observables encode order dependence and uncertainty relations.

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
