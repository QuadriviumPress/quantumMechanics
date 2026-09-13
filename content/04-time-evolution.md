---
title: Time Evolution
---

# Time evolution

## Learning objectives

After this chapter, you should be able to:

- use the Hamiltonian to evolve a quantum state in time;
- construct and interpret the unitary time-evolution operator;
- distinguish stationary states from general superpositions;
- predict spin precession in a uniform magnetic field;
- connect relative phase evolution to changing measurement probabilities; and
- compose piecewise evolution and measurement steps in a complete protocol.

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

### What an evolution problem is asking

Most two-state dynamics problems can be organized into the same sequence:

1. Write the Hamiltonian and choose a basis in which to represent it.
2. Construct $\hat U(t)$ by using energy eigenstates, diagonalizing the matrix,
   or exploiting Pauli-matrix identities.
3. Apply $\hat U(t)$ to the **initial** ket.
4. Project the evolved ket onto the states of the measurement performed at
   time $t$.
5. Check normalization, the $t=0$ limit, and any conserved probabilities.

The distinction between steps 3 and 4 matters. The ket evolves continuously;
a probability is defined only after a measurement question has been specified.
Two different final analyzers can reveal very different time dependence from
the same evolving state.

For a time-independent Hamiltonian, the exponential can be understood through
its power series. If $\hat H=\hat V\hat D\hat V^\dagger$, where $\hat D$ is
diagonal, then

```{math}
e^{-i\hat Ht/\hbar}
=\hat V e^{-i\hat Dt/\hbar}\hat V^\dagger.
```

Thus “diagonalize, evolve each component by a phase, and transform back” is a
general solution method, not a trick restricted to spin.

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

### Only energy differences drive observable phase changes

For two energy components, the cross term in a measurement probability
contains a phase of the form

```{math}
e^{-i(E_n-E_m)t/\hbar}.
```

This predicts an experimentally visible angular frequency
$|E_n-E_m|/\hbar$. It also gives a useful dimensional check: energy divided by
$\hbar$ has units of inverse time. A common phase involving the average energy
drops out of every isolated-system probability.

### Example 4.2: evolution from a nondiagonal matrix

In the $z$ basis, consider

```{math}
\hat H=E_0\hat I+\frac{\hbar\Omega}{2}\sigma_x
=\begin{pmatrix}
E_0&\hbar\Omega/2\\
\hbar\Omega/2&E_0
\end{pmatrix}.
```

The energy eigenstates are $|+x\rangle$ and $|-x\rangle$, with energies
$E_0\pm\hbar\Omega/2$. Because the identity commutes with $\sigma_x$,

```{math}
\hat U(t)=e^{-iE_0t/\hbar}
\left(\cos\frac{\Omega t}{2}\,\hat I
-i\sin\frac{\Omega t}{2}\,\sigma_x\right).
```

Applied to $|+z\rangle$, and suppressing the common phase,

```{math}
|\psi(t)\rangle\sim
\cos\frac{\Omega t}{2}|+z\rangle
-i\sin\frac{\Omega t}{2}|-z\rangle.
```

Therefore

```{math}
P(z+,t)=\cos^2\frac{\Omega t}{2},\qquad
P(z-,t)=\sin^2\frac{\Omega t}{2}.
```

Although the initial state was definite along $z$, the Hamiltonian was not
diagonal in that basis. The off-diagonal entries generate coherent transfer
between the two $z$ outcomes.

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

This experiment is a two-state interferometer. Preparing $|+x\rangle$ creates
equal $z$-basis amplitudes, the field gives them different phases, and the final
$x$ analyzer recombines those amplitudes. The observed oscillation is the
spin-space analogue of moving a phase plate in one arm of a path
interferometer.

:::{note} Two different roles for magnetic fields
A field gradient in a Stern–Gerlach analyzer separates outcomes and enables a
measurement. A uniform field, ideally, does not separate the beam; it changes
the spin state coherently. The former correlates spin with a path, while the
latter implements unitary evolution.
:::

### Example 4.3: a spin-flip time

Starting from $|+x\rangle$, the first time at which an $S_x$ measurement gives
$x-$ with certainty satisfies $|\omega_0|t=\pi$. Thus

```{math}
t_{\text{flip}}=\frac{\pi}{|\omega_0|}.
```

This is not a transition between the $S_z$ energy levels: their populations
remain fixed. It is a rotation of the state relative to the $x$ measurement
basis.

### Example 4.4: infer a field from counts

A $+x$ state evolves for $2.0\,\mu\text{s}$ in a $z$-directed field. A later
$S_x$ measurement gives $P(x+)=3/4$. Equation
{eq}`larmor-x-probabilities` implies

```{math}
\cos^2\frac{\omega_0t}{2}=\frac34.
```

The smallest positive phase is $|\omega_0|t=\pi/3$, giving

```{math}
|\omega_0|=\frac{\pi}{3t}
\approx5.24\times10^5\ \text{rad s}^{-1}.
```

The probability alone does not determine the sign of $\omega_0$, and because
the cosine is periodic it allows larger frequencies differing by whole cycles.
Additional measurements at other times, or a $y$ analyzer sensitive to the
direction of rotation, remove those ambiguities.

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

If the initial Bloch vector is parallel to $\mathbf n$, the state is an energy
eigenstate and only gains an overall phase. A perpendicular Bloch vector sweeps
out a circle. A vector at an intermediate angle traces a cone while its
component along $\mathbf n$ remains constant.

### Example 4.5: rotation about $x$

Take the Hamiltonian
$\hat H=-(\hbar\omega/2)\sigma_x$ and initial state $|+z\rangle$. Equation
{eq}`arbitrary-rotation` gives

```{math}
|\psi(t)\rangle
=\cos\frac{\omega t}{2}|+z\rangle
+i\sin\frac{\omega t}{2}|-z\rangle.
```

The probability of a $z-$ result is
$\sin^2(\omega t/2)$. At $|\omega|t=\pi/2$, the state has equal $z$
probabilities but a definite transverse direction; at $|\omega|t=\pi$, it is
$|-z\rangle$ up to phase. Equal populations halfway through the rotation do
not mean that coherence has been lost.

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

### Example 4.6: a complete prepare–evolve–measure protocol

A spin is prepared in $|+x\rangle$, evolves in a $z$-directed field for a time
$t_1=\pi/(2|\omega_0|)$, and is measured along $x$. Suppose the $x-$ outcome is
selected. The same field then acts for another time
$t_2=\pi/(2|\omega_0|)$ before a final $S_x$ measurement.

Just before the intermediate measurement,
$P(x+)=P(x-)=1/2$. Selection of $x-$ prepares $|-x\rangle$; it does not leave
the earlier phase-evolved ket in place. Starting from $|-x\rangle$, another
quarter-period produces equal final $x$ probabilities. Thus the probability
for either final result, conditional on the selected $x-$ branch, is $1/2$.
The probability for a complete route from the original preparation includes
the intermediate selection and is $1/4$.

## 4.7 Constants in the Hamiltonian

Adding a constant energy $E_0$ to every state changes the Hamiltonian to
$\hat H'=\hat H+E_0\hat I$. The corresponding evolution is

```{math}
\hat U'(t)=e^{-iE_0t/\hbar}\hat U(t).
```

Every state acquires the same overall phase, so isolated-system probabilities
are unchanged. Energy differences, rather than an arbitrary zero of energy,
control observable relative phases.

## 4.8 Time-dependent Hamiltonians

The simple expression $e^{-i\hat Ht/\hbar}$ assumes a time-independent
Hamiltonian. If $\hat H$ changes with time, the evolution operator satisfies

```{math}
:label: evolution-operator-equation
i\hbar\frac{d\hat U(t,t_0)}{dt}
=\hat H(t)\hat U(t,t_0),
\qquad \hat U(t_0,t_0)=\hat I.
```

When Hamiltonians at different times commute, the solution is

```{math}
\hat U(t,t_0)=
\exp\left[-\frac{i}{\hbar}
\int_{t_0}^{t}\hat H(t')\,dt'\right].
```

If $[\hat H(t_1),\hat H(t_2)]\ne0$, the ordering of successive infinitesimal
rotations matters and a time-ordered exponential or a piecewise product must be
used. For example, a pulse about $x$ followed by a pulse about $y$ generally
does not produce the same state as the reversed sequence. This is the dynamical
counterpart of noncommuting analyzer questions.

## 4.9 Motion of expectation values

The Schrödinger equation also gives a direct equation for an observable's mean.
For an operator with no explicit time dependence,

```{math}
:label: expectation-motion
\frac{d}{dt}\langle A\rangle
=\frac{i}{\hbar}\langle[\hat H,\hat A]\rangle.
```

With $\hat H=-\gamma\mathbf B\cdot\hat{\mathbf S}$ and the spin commutators,
this becomes

```{math}
:label: bloch-precession-equation
\frac{d}{dt}\langle\mathbf S\rangle
=\gamma\langle\mathbf S\rangle\times\mathbf B.
```

Equation {eq}`bloch-precession-equation` has the form of classical magnetic
precession, even though each component measurement remains quantized. It
offers a useful bridge between the geometric Bloch-sphere picture and the
matrix evolution of a ket. The expectation vector follows a smooth trajectory;
individual Stern–Gerlach outcomes are still discrete.

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

### Concept check 4.3

A spin in a $z$-directed field always has
$P(z+)=P(z-)=1/2$. Must its state be constant in time?

:::{dropdown} Answer
No. Its relative phase may evolve even while its $z$ probabilities remain
fixed. An $x$ or $y$ analyzer can reveal that phase evolution through changing
counts. A single measurement basis does not provide complete state
information.
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
- A complete dynamics calculation specifies a preparation, an evolution
  operator, and a final measurement basis.
- Time-dependent Hamiltonians require attention to the order of rotations when
  the Hamiltonians at different times do not commute.
- Spin expectation values precess smoothly even though individual component
  measurements have only two discrete outcomes.

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
10. For the Hamiltonian in Example 4.2, calculate $P(y+,t)$ for an initial
    $|+z\rangle$ state. At what earliest time is the state $|+y\rangle$ up to
    overall phase?
11. A $+x$ state precesses in a $z$-directed field. Find both $P(x+,t)$ and
    $P(y+,t)$, and explain how their relative timing reveals the sign of
    $\omega_0$.
12. Derive the result of Example 4.5 by expanding $|+z\rangle$ in the energy
    basis $|\pm x\rangle$, evolving the two components, and transforming back.
13. Work through every branch of Example 4.6 rather than selecting only $x-$.
    Show that pooling the intermediate outcomes gives final statistics
    different from a protocol with no intermediate measurement.
14. A Hamiltonian equals $\hbar\Omega\sigma_x/2$ for a duration $\tau$ and then
    $\hbar\Omega\sigma_y/2$ for the same duration. Write the total evolution
    operator in the correct order. Repeat for the reversed pulse sequence and
    show that the results differ unless $\Omega\tau$ takes a special value.
15. Derive equation {eq}`expectation-motion` from the Schrödinger equation and
    its Hermitian conjugate.
16. Use equation {eq}`bloch-precession-equation` to identify a conserved
    component of $\langle\mathbf S\rangle$ in a constant magnetic field and
    connect it to energy conservation.
