---
title: Time Evolution
---

# Time evolution

## Learning objectives

After this chapter, you should be able to:

- use the Hamiltonian to evolve a quantum state in time;
- construct and interpret the unitary time-evolution operator;
- distinguish stationary states from general superpositions;
- predict spin precession in a uniform magnetic field; and
- connect relative phase evolution to changing measurement probabilities.

## 4.1 The dynamical postulate

Between measurements, the state of an isolated system evolves according to the
time-dependent Schrödinger equation,

```{math}
:label: tdse
i\hbar\frac{d}{dt}|\psi(t)\rangle=\hat H(t)|\psi(t)\rangle.
```

The Hamiltonian $\hat H$ is the observable associated with energy and the
generator of time evolution. Equation {eq}`tdse` is a first-order differential
equation for a vector. Specifying $|\psi(0)\rangle$ and $\hat H(t)$ determines
the later state.

When the Hamiltonian is independent of time,

```{math}
:label: evolution-operator
|\psi(t)\rangle=\hat U(t)|\psi(0)\rangle,
\qquad
\hat U(t)=e^{-i\hat Ht/\hbar}.
```

Because $\hat H$ is Hermitian, $\hat U$ is unitary:
$\hat U^\dagger\hat U=\hat I$. Consequently,

```{math}
\langle\psi(t)|\psi(t)\rangle
=\langle\psi(0)|\hat U^\dagger\hat U|\psi(0)\rangle=1.
```

Unitary evolution preserves normalization and all inner products. It is
deterministic even though measurement outcomes are probabilistic.

## 4.2 Energy eigenstates and phases

Let $|E_n\rangle$ satisfy

```{math}
:label: energy-eigenproblem
\hat H|E_n\rangle=E_n|E_n\rangle.
```

The exponential operator acts simply on an energy eigenstate:

```{math}
:label: stationary-evolution
|E_n,t\rangle=e^{-iE_nt/\hbar}|E_n\rangle.
```

Only an overall phase changes, so every time-independent measurement
probability remains constant. For this reason an energy eigenstate is called a
**stationary state**.

A general initial state

```{math}
|\psi(0)\rangle=\sum_n c_n|E_n\rangle
```

evolves as

```{math}
:label: energy-expansion-evolution
|\psi(t)\rangle=\sum_n c_ne^{-iE_nt/\hbar}|E_n\rangle.
```

The energy probabilities $|c_n|^2$ are constant, but relative phases evolve at
angular frequencies $(E_n-E_m)/\hbar$. Observables that mix different energy
eigenstates can therefore vary in time.

### Example 4.1: a two-level superposition

Suppose $E_+>E_-$ and

```{math}
|\psi(0)\rangle=\frac{|E_+\rangle+|E_-\rangle}{\sqrt2}.
```

Removing the physically irrelevant common phase $e^{-iE_-t/\hbar}$ gives the
equivalent representative

```{math}
|\psi(t)\rangle\sim
\frac{e^{-i\omega t}|E_+\rangle+|E_-\rangle}{\sqrt2},
\qquad
\omega=\frac{E_+-E_-}{\hbar}.
```

The energy probabilities remain one half. In a basis containing coherent sums
of $|E_+\rangle$ and $|E_-\rangle$, the probabilities oscillate with frequency
$\omega$.

## 4.3 Spin in a uniform magnetic field

A magnetic moment in a uniform field has Hamiltonian

```{math}
:label: magnetic-hamiltonian
\hat H=-\hat{\boldsymbol\mu}\cdot\mathbf B.
```

For a spin-$\tfrac12$ particle whose magnetic moment is proportional to spin,
write $\hat{\boldsymbol\mu}=\gamma\hat{\mathbf S}$, where $\gamma$ is the
gyromagnetic ratio. For $\mathbf B=B_0\hat{\mathbf z}$,

```{math}
:label: z-field-hamiltonian
\hat H=-\gamma B_0\hat S_z
=-\frac{\hbar\omega_0}{2}\sigma_z,
\qquad \omega_0=\gamma B_0.
```

The sign of $\omega_0$ depends on the sign convention for $\gamma$. Keeping it
signed avoids silently changing the direction of precession.

Because $\sigma_z^2=\hat I$, its exponential can be evaluated without
diagonalization:

```{math}
:label: pauli-exponential
e^{i\omega_0t\sigma_z/2}
=\cos\frac{\omega_0t}{2}\,\hat I
+i\sin\frac{\omega_0t}{2}\,\sigma_z.
```

In the $z$ basis this is

```{math}
\hat U(t)=
\begin{pmatrix}
e^{i\omega_0t/2}&0\\
0&e^{-i\omega_0t/2}
\end{pmatrix}.
```

## 4.4 Larmor precession

Prepare $|+x\rangle=(|+z\rangle+|-z\rangle)/\sqrt2$ and let it evolve in the
$z$-directed field. Then

```{math}
:label: x-precession-state
|\psi(t)\rangle=\frac{1}{\sqrt2}
\left(e^{i\omega_0t/2}|+z\rangle
+e^{-i\omega_0t/2}|-z\rangle\right).
```

After removal of an overall phase, the relative phase is $e^{-i\omega_0t}$.
The probabilities for a later $S_x$ measurement are

```{math}
:label: larmor-x-probabilities
P(x+,t)=\cos^2\frac{\omega_0t}{2},
\qquad
P(x-,t)=\sin^2\frac{\omega_0t}{2}.
```

Meanwhile $P(z+)=P(z-)=1/2$ at all times. The Bloch vector rotates around the
$z$ axis at the Larmor angular frequency $|\omega_0|$. Dynamics changes a
relative phase, and the choice of final analyzer converts that phase into a
measurable probability.

:::{note} Two different roles for magnetic fields
A field gradient in a Stern–Gerlach analyzer separates outcomes and enables a
measurement. A uniform field, ideally, does not separate the beam; it changes
the spin state coherently. The former correlates spin with a path, while the
latter implements unitary evolution.
:::

### Example 4.2: a spin-flip time

Starting from $|+x\rangle$, the first time at which an $S_x$ measurement gives
$x-$ with certainty satisfies $|\omega_0|t=\pi$. Thus

```{math}
t_{\text{flip}}=\frac{\pi}{|\omega_0|}.
```

This is not a transition between the $S_z$ energy levels: their populations
remain fixed. It is a rotation of the state relative to the $x$ measurement
basis.

## 4.5 A field in an arbitrary direction

For a constant field along the unit vector $\mathbf n$,

```{math}
\hat H=-\frac{\hbar\omega}{2}\mathbf n\cdot\boldsymbol\sigma.
```

Since $(\mathbf n\cdot\boldsymbol\sigma)^2=\hat I$,

```{math}
:label: arbitrary-rotation
\hat U(t)=
\cos\frac{\omega t}{2}\,\hat I
+i\sin\frac{\omega t}{2}\,\mathbf n\cdot\boldsymbol\sigma.
```

This operator rotates the Bloch vector around $\mathbf n$. It also reveals why
the exponent uses a half-angle. A $2\pi$ spatial rotation gives
$\hat U=-\hat I$; a $4\pi$ rotation returns the ket itself. The minus sign after
$2\pi$ is an overall phase for one isolated path, but it can be observed through
interference with an unrotated path.

## 4.6 Measurement interrupts unitary evolution

Suppose the spin evolves until time $t_1$, when $S_x$ is measured. Before the
measurement,

```{math}
|\psi(t_1)\rangle=\hat U(t_1)|\psi(0)\rangle.
```

The outcome probabilities follow from projections onto $|\pm x\rangle$. If the
result is $x+$, subsequent evolution begins from $|+x\rangle$:

```{math}
|\psi(t>t_1)\rangle=\hat U(t,t_1)|+x\rangle.
```

Unitary evolution and ideal projective measurement are distinct parts of the
model. Confusing them leads to a common mistake: evolving the pre-measurement
superposition after a definite outcome has already been selected.

## 4.7 Constants in the Hamiltonian

Adding a constant energy $E_0$ to every state changes the Hamiltonian to
$\hat H'=\hat H+E_0\hat I$. The corresponding evolution is

```{math}
\hat U'(t)=e^{-iE_0t/\hbar}\hat U(t).
```

Every state acquires the same overall phase, so isolated-system probabilities
are unchanged. Energy differences, rather than an arbitrary zero of energy,
control observable relative phases.

### Concept check 4.1

Can a stationary state have a time-dependent ket?

:::{dropdown} Answer
Yes. Its ket acquires the phase $e^{-iEt/\hbar}$. The state is called stationary
because this overall phase leaves all time-independent measurement probabilities
unchanged.
:::

### Concept check 4.2

A spin begins in $|+z\rangle$ in a uniform $z$-directed field. Does it precess
into $|-z\rangle$?

:::{dropdown} Answer
No. It is an energy eigenstate and gains only an overall phase. A state with a
component transverse to the field has a Bloch vector that visibly precesses.
:::

## Summary

- The Hamiltonian generates deterministic, unitary evolution between
  measurements.
- Energy eigenstates acquire only overall phases and are stationary.
- Superpositions acquire changing relative phases set by energy differences.
- A uniform magnetic field rotates a spin state; a field gradient can analyze
  it.
- Larmor precession converts phase evolution into oscillating measurement
  probabilities.
- Adding a constant to every energy changes only an unobservable overall phase.

## Exercises

1. Starting from equation {eq}`tdse`, show directly that the norm of a state is
   constant when $\hat H$ is Hermitian.
2. A two-level system has energies $0$ and $\epsilon$. Evolve the initial state
   $(|E_0\rangle+i|E_1\rangle)/\sqrt2$ and find the probability of returning to
   the initial state at time $t$.
3. Derive equation {eq}`pauli-exponential` by separating the exponential power
   series into even and odd powers.
4. Derive equation {eq}`larmor-x-probabilities` from equation
   {eq}`x-precession-state` using inner products.
5. For the same evolving state, calculate $P(y+,t)$ and identify the direction
   of precession for positive $\omega_0$ under the conventions used here.
6. Find the earliest time at which a spin initially in $|+z\rangle$ becomes
   $|-z\rangle$ under a uniform field in the $+x$ direction.
7. Prove that equation {eq}`arbitrary-rotation` is unitary.
8. An $S_x$ measurement is made halfway through a full Larmor period and its
   $x+$ result is selected. Describe the state immediately before and after the
   measurement, then find $P(x+)$ one quarter-period later.
9. Show that adding $E_0\hat I$ to a Hamiltonian cannot affect the expectation
   value of any time-independent observable in an isolated system.
