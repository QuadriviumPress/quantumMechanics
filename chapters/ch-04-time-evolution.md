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
- compose piecewise evolution and measurement steps in a complete protocol;
- translate controlled field pulses into Bloch-sphere rotations; and
- predict a Ramsey interference signal.

## 4.1 The dynamical postulate

Every chapter so far has treated the spin state as something that only
changes at the instant of a measurement. Between measurements, we have simply
left the state alone. That gap needs to be filled: real experiments involve
waiting time, traveling atoms, and applied fields, and the state must be
doing *something* during all of that. This chapter supplies the missing
piece. Between measurements, the state of an isolated system evolves
according to the **time-dependent Schrödinger equation**,

```{math}
:label: tdse
i\hbar\frac{d}{dt}|\psi(t)\rangle=\hat H(t)|\psi(t)\rangle.
```

The Hamiltonian $\hat H$ is the observable associated with energy, and it
plays a second role here as the *generator* of time evolution—the object
that tells the state how to change from one instant to the next. Equation
{eq}`tdse` is a first-order differential equation for a vector, which means
specifying the initial state $|\psi(0)\rangle$ and the Hamiltonian $\hat
H(t)$ is enough to determine the state at every later time.

When the Hamiltonian does not depend on time, this differential equation has
an explicit solution:

```{math}
:label: evolution-operator
|\psi(t)\rangle=\hat U(t)|\psi(0)\rangle,
\qquad
\hat U(t)=e^{-i\hat Ht/\hbar}.
```

Because $\hat H$ is Hermitian, the operator $\hat U$ built from it is
automatically **unitary**: $\hat U^\dagger\hat U=\hat I$. This single fact has
an important consequence. It guarantees that a state's normalization never
drifts as it evolves:

```{math}
\langle\psi(t)|\psi(t)\rangle
=\langle\psi(0)|\hat U^\dagger\hat U|\psi(0)\rangle=1.
```

So unitary evolution preserves normalization and, more generally, every
inner product between two evolving states. It is worth pausing on something
that can feel paradoxical at first: this evolution is completely
*deterministic*, even though the measurement outcomes it eventually leads to
are probabilistic. Nothing random happens while the state simply evolves;
randomness enters only at the moment of measurement.

### What an evolution problem is asking

Most two-state dynamics problems, however different they look on the
surface, can be organized into the same five-step sequence:

1. Write the Hamiltonian and choose a basis in which to represent it.
2. Construct $\hat U(t)$ by using energy eigenstates, diagonalizing the
   matrix, or exploiting Pauli-matrix identities.
3. Apply $\hat U(t)$ to the **initial** ket.
4. Project the evolved ket onto the states of the measurement performed at
   time $t$.
5. Check normalization, the $t=0$ limit, and any conserved probabilities.

The distinction between steps 3 and 4 is the single most common source of
error in this material, so it is worth stating plainly: the ket evolves
continuously under $\hat U(t)$, but a *probability* is only ever defined
once a measurement question has been specified. Two different choices of
final analyzer can reveal very different time dependence from the very same
evolving state, so step 4 cannot be skipped or guessed.

For a time-independent Hamiltonian, the exponential in step 2 can always be
understood through its power series, which is most useful once $\hat H$ has
been diagonalized. If $\hat H=\hat V\hat D\hat V^\dagger$, with $\hat D$
diagonal, then

```{math}
e^{-i\hat Ht/\hbar}
=\hat V e^{-i\hat Dt/\hbar}\hat V^\dagger.
```

In words: diagonalize the Hamiltonian, let each diagonal component evolve by
its own simple phase, and transform back to the original basis. This is a
completely general method for solving the Schrödinger equation, not a trick
that happens to work only for spin.

## 4.2 Energy eigenstates and phases

Let $|E_n\rangle$ satisfy the time-independent eigenvalue equation

```{math}
:label: energy-eigenproblem
\hat H|E_n\rangle=E_n|E_n\rangle.
```

Because the evolution operator is built from the exponential of $\hat H$, it
acts especially simply on one of $\hat H$'s own eigenstates:

```{math}
:label: stationary-evolution
|E_n,t\rangle=e^{-iE_nt/\hbar}|E_n\rangle.
```

Only an overall phase changes here, and Chapter 2 established that an
overall phase never affects any measurement probability. For this reason, an
energy eigenstate is called a **stationary state**: every time-independent
measurement probability computed from it stays exactly constant, even though
the ket itself is visibly changing.

### Concept check 4.1

Can a stationary state have a time-dependent ket?

:::{dropdown} Answer
Yes. Its ket acquires the phase $e^{-iEt/\hbar}$. The state is called
stationary because this overall phase leaves all time-independent
measurement probabilities unchanged.
:::

A general initial state need not be a single energy eigenstate—it can be any
superposition of them,

```{math}
|\psi(0)\rangle=\sum_n c_n|E_n\rangle,
```

and by linearity of the Schrödinger equation, each term simply evolves on
its own:

```{math}
:label: energy-expansion-evolution
|\psi(t)\rangle=\sum_n c_ne^{-iE_nt/\hbar}|E_n\rangle.
```

Here is the key qualitative difference from a single stationary state: the
energy probabilities $|c_n|^2$ stay constant, but the *relative* phases
between different terms evolve, at angular frequencies $(E_n-E_m)/\hbar$ set
by the energy differences. Any observable that mixes different energy
eigenstates can therefore vary in time, even though no individual energy
probability ever does.

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

The energy probabilities remain one half at all times. But in a basis built
from coherent sums of $|E_+\rangle$ and $|E_-\rangle$—such as the $x$ or $y$
basis for a spin system—the corresponding probabilities oscillate with
frequency $\omega$.

### Only energy differences drive observable phase changes

For two energy components, the cross term in any measurement probability
contains a phase of the form

```{math}
e^{-i(E_n-E_m)t/\hbar}.
```

This predicts an experimentally visible angular frequency
$|E_n-E_m|/\hbar$—a useful fact to remember, since it also gives a quick
dimensional check: energy divided by $\hbar$ has units of inverse time, as an
angular frequency should. A common phase built from, say, the *average*
energy of two levels drops out of every isolated-system probability, exactly
like the overall phase discussed in Section 4.1.

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

Notice what is happening here: the initial state was definite along $z$, but
the Hamiltonian was *not* diagonal in the $z$ basis. It is exactly this
mismatch—the off-diagonal entries connecting $|+z\rangle$ and
$|-z\rangle$—that drives coherent transfer between the two $z$ outcomes over
time.

## 4.3 Spin in a uniform magnetic field

We now specialize the general machinery above to the physical situation that
will occupy the rest of this chapter: a spin in a magnetic field. A magnetic
moment in a uniform field has Hamiltonian

```{math}
:label: magnetic-hamiltonian
\hat H=-\hat{\boldsymbol\mu}\cdot\mathbf B,
```

the same energy expression introduced in Chapter 1, now promoted to an
operator. For a spin-$\tfrac12$ particle whose magnetic moment is
proportional to its spin, write $\hat{\boldsymbol\mu}=\gamma\hat{\mathbf S}$,
where $\gamma$ is the gyromagnetic ratio. For $\mathbf B=B_0\hat{\mathbf z}$,
this becomes

```{math}
:label: z-field-hamiltonian
\hat H=-\gamma B_0\hat S_z
=-\frac{\hbar\omega_0}{2}\sigma_z,
\qquad \omega_0=\gamma B_0.
```

The sign of $\omega_0$ depends on the sign convention chosen for $\gamma$.
Keeping track of that sign carefully, rather than dropping it, avoids
silently reversing the direction of precession later on.

Because $\sigma_z^2=\hat I$, its exponential can be evaluated directly from
the power series, without any diagonalization step:

```{math}
:label: pauli-exponential
e^{i\omega_0t\sigma_z/2}
=\cos\frac{\omega_0t}{2}\,\hat I
+i\sin\frac{\omega_0t}{2}\,\sigma_z.
```

In the $z$ basis, where $\hat H$ is already diagonal, this is simply

```{math}
\hat U(t)=
\begin{pmatrix}
e^{i\omega_0t/2}&0\\
0&e^{-i\omega_0t/2}
\end{pmatrix}.
```

### Concept check 4.2

A spin begins in $|+z\rangle$ in a uniform $z$-directed field. Does it
precess into $|-z\rangle$?

:::{dropdown} Answer
No. It is an energy eigenstate and gains only an overall phase. A state with
a component transverse to the field has a Bloch vector that visibly
precesses.
:::

## 4.4 Larmor precession

The matrix above shows that a $z+$ or $z-$ state, being an eigenstate of
$\hat H$, only picks up a phase and never changes. To see the field actually
*do* something visible, we need a state with some component transverse to
$z$. Prepare $|+x\rangle=(|+z\rangle+|-z\rangle)/\sqrt2$ and let it evolve in
the $z$-directed field. Then

```{math}
:label: x-precession-state
|\psi(t)\rangle=\frac{1}{\sqrt2}
\left(e^{i\omega_0t/2}|+z\rangle
+e^{-i\omega_0t/2}|-z\rangle\right).
```

After removing an overall phase, the relative phase between the two terms is
$e^{-i\omega_0t}$—and Chapter 2 already showed exactly what a relative phase
like this does to measurement probabilities in a different basis. The
probabilities for a later $S_x$ measurement are

```{math}
:label: larmor-x-probabilities
P(x+,t)=\cos^2\frac{\omega_0t}{2},
\qquad
P(x-,t)=\sin^2\frac{\omega_0t}{2}.
```

Meanwhile $P(z+)=P(z-)=1/2$ at every time $t$—the $z$-basis populations never
change at all. Geometrically, the Bloch vector simply rotates around the $z$
axis at the Larmor angular frequency $|\omega_0|$. This is the general
pattern worth remembering: dynamics changes a *relative phase*, and it is
the choice of final analyzer that converts an otherwise hidden phase into a
measurable probability.

### Concept check 4.3

A spin in a $z$-directed field always has
$P(z+)=P(z-)=1/2$. Must its state be constant in time?

:::{dropdown} Answer
No. Its relative phase may evolve even while its $z$ probabilities remain
fixed. An $x$ or $y$ analyzer can reveal that phase evolution through
changing counts. A single measurement basis does not provide complete state
information.
:::

This experiment is worth recognizing as a two-state interferometer, in the
same spirit as the recombination experiments of Chapters 1 and 2. Preparing
$|+x\rangle$ creates two equal $z$-basis amplitudes, the field gives them
different phases as time passes, and the final $x$ analyzer recombines those
amplitudes into an interference pattern. The observed oscillation is the
spin-space analogue of moving a phase plate through one arm of an ordinary
path interferometer.

:::{note} Two different roles for magnetic fields
A field gradient in a Stern–Gerlach analyzer separates outcomes and enables
a measurement. A uniform field, ideally, does not separate the beam; it
changes the spin state coherently. The former correlates spin with a path,
while the latter implements unitary evolution.
:::

### Example 4.3: a spin-flip time

Starting from $|+x\rangle$, the first time at which an $S_x$ measurement
gives $x-$ with certainty satisfies $|\omega_0|t=\pi$. Thus

```{math}
t_{\text{flip}}=\frac{\pi}{|\omega_0|}.
```

It is worth being precise about what this is *not*: it is not a transition
between the $S_z$ energy levels, since their populations remain fixed
throughout. It is a rotation of the state relative to the $x$ measurement
basis—the energy eigenstates are untouched; only the relative phase between
them has advanced by $\pi$.

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

Two ambiguities remain, and it is worth noticing both. The probability alone
does not determine the *sign* of $\omega_0$, since $\cos^2$ cannot
distinguish clockwise from counterclockwise rotation. And because the cosine
is periodic, this same data is also consistent with larger frequencies
differing by whole cycles. Additional measurements at other times, or a $y$
analyzer sensitive to the direction of rotation, remove these ambiguities.

## 4.5 A field in an arbitrary direction

Everything so far assumed the field points along $z$. For a constant field
along an arbitrary unit vector $\mathbf n$,

```{math}
\hat H=-\frac{\hbar\omega}{2}\mathbf n\cdot\boldsymbol\sigma.
```

Since $(\mathbf n\cdot\boldsymbol\sigma)^2=\hat I$—the same identity used in
Chapter 3—the same power-series trick used for $\sigma_z$ generalizes
immediately:

```{math}
:label: arbitrary-rotation
\hat U(t)=
\cos\frac{\omega t}{2}\,\hat I
+i\sin\frac{\omega t}{2}\,\mathbf n\cdot\boldsymbol\sigma.
```

This operator rotates the Bloch vector around $\mathbf n$, and it also
reveals why the exponent naturally involves a *half*-angle, echoing the
half-angle rule from Chapter 1. A $2\pi$ spatial rotation gives
$\hat U=-\hat I$, and only a $4\pi$ rotation returns the ket to exactly
itself. That minus sign after $2\pi$ is an overall phase for one isolated
evolving path, so it has no effect by itself—but it becomes observable
through interference with a second, unrotated path.

Three geometric cases are worth visualizing separately. If the initial Bloch
vector is parallel to $\mathbf n$, the state is an energy eigenstate and
gains only an overall phase, never changing direction. If it starts
perpendicular to $\mathbf n$, it sweeps out a full circle around $\mathbf n$.
At any intermediate angle, it traces a cone around $\mathbf n$, with its
component along $\mathbf n$ staying fixed throughout.

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
$|-z\rangle$ up to phase. It is worth emphasizing that equal $z$ populations
halfway through the rotation do not mean coherence has been lost—the state
is still a perfectly definite pure state, just one pointing along a
different axis.

## 4.6 Measurement interrupts unitary evolution

So far we have evolved a state continuously and only asked about
measurement at the very end. Real experimental protocols often measure,
select an outcome, and then let the resulting state evolve further—and it is
important to know exactly how to handle that. Suppose the spin evolves until
time $t_1$, when $S_x$ is measured. Just before the measurement,

```{math}
|\psi(t_1)\rangle=\hat U(t_1)|\psi(0)\rangle.
```

The outcome probabilities follow from projecting this state onto
$|\pm x\rangle$, exactly as in Chapter 3. If the result is $x+$, the state
used for all subsequent evolution is $|+x\rangle$ itself, not the
pre-measurement superposition:

```{math}
|\psi(t>t_1)\rangle=\hat U(t,t_1)|+x\rangle.
```

Unitary evolution and ideal projective measurement are two genuinely
distinct parts of the model, governed by different rules, and confusing them
leads to a common mistake: continuing to evolve the *pre*-measurement
superposition after a definite outcome has already been selected, as if the
measurement had never happened.

### Example 4.6: a complete prepare–evolve–measure protocol

A spin is prepared in $|+x\rangle$, evolves in a $z$-directed field for a
time $t_1=\pi/(2|\omega_0|)$, and is measured along $x$. Suppose the $x-$
outcome is selected. The same field then acts for another time
$t_2=\pi/(2|\omega_0|)$ before a final $S_x$ measurement.

Just before the intermediate measurement,
$P(x+)=P(x-)=1/2$. Selecting $x-$ prepares $|-x\rangle$—it does not leave the
earlier phase-evolved ket in place, per the rule just stated. Starting fresh
from $|-x\rangle$, another quarter-period of evolution produces equal final
$x$ probabilities. So the probability for either final result, *conditional*
on having selected the $x-$ branch, is $1/2$. The probability for the
*complete* route starting from the original preparation must also include
the probability of the intermediate selection itself, giving $1/4$ overall.

## 4.7 Constants in the Hamiltonian

Adding a constant energy $E_0$ to every state changes the Hamiltonian to
$\hat H'=\hat H+E_0\hat I$. Because $E_0\hat I$ commutes with anything, the
corresponding evolution operator factors cleanly:

```{math}
\hat U'(t)=e^{-iE_0t/\hbar}\hat U(t).
```

Every state acquires exactly the same overall phase from this shift, so
isolated-system probabilities are completely unchanged. This confirms a
pattern seen throughout the chapter: it is energy *differences*, not an
arbitrary choice for the zero of energy, that control observable relative
phases.

## 4.8 Time-dependent Hamiltonians

Every result so far assumed a time-independent Hamiltonian, which is what
let us write $\hat U(t)=e^{-i\hat Ht/\hbar}$ so simply. If $\hat H$ instead
changes with time, that simple exponential formula no longer applies, and the
evolution operator must instead be defined through its own differential
equation:

```{math}
:label: evolution-operator-equation
i\hbar\frac{d\hat U(t,t_0)}{dt}
=\hat H(t)\hat U(t,t_0),
\qquad \hat U(t_0,t_0)=\hat I.
```

If the Hamiltonians at different times all commute with each other, the
solution still takes a simple exponential form, just with an integral in
place of a product:

```{math}
\hat U(t,t_0)=
\exp\left[-\frac{i}{\hbar}
\int_{t_0}^{t}\hat H(t')\,dt'\right].
```

But if $[\hat H(t_1),\hat H(t_2)]\ne0$ for some pair of times, this shortcut
fails, and the ordering of successive infinitesimal rotations genuinely
matters; a time-ordered exponential or a piecewise product must be used
instead. For example, a pulse about $x$ followed by a pulse about $y$
generally does not produce the same final state as the reversed sequence.
This is the dynamical counterpart of the noncommuting analyzer questions
from Chapter 3.

## 4.9 Motion of expectation values

The Schrödinger equation for the ket also implies a direct equation of
motion for the expectation value of any observable, which is often a faster
route to physical insight than tracking the full ket. For an operator with
no explicit time dependence of its own,

```{math}
:label: expectation-motion
\frac{d}{dt}\langle A\rangle
=\frac{i}{\hbar}\langle[\hat H,\hat A]\rangle.
```

Specializing to $\hat H=-\gamma\mathbf B\cdot\hat{\mathbf S}$ and using the
spin commutators from Chapter 3, this becomes

```{math}
:label: bloch-precession-equation
\frac{d}{dt}\langle\mathbf S\rangle
=\gamma\langle\mathbf S\rangle\times\mathbf B.
```

Equation {eq}`bloch-precession-equation` has exactly the form of classical
magnetic precession, even though each individual component measurement
remains fully quantized, with only two discrete outcomes. It offers a useful
bridge between two pictures developed so far: the geometric Bloch-sphere
picture of Chapter 2, and the explicit matrix evolution of a ket developed
in this chapter. The expectation vector traces out a smooth, classical-looking
trajectory, even though the individual Stern–Gerlach outcomes behind it
remain discrete.

## 4.10 Controlled rotations and pulse language

Laboratory control of a spin is usually described not in terms of a
continuously running field, but in terms of discrete **pulses**—a field
switched on for a controlled duration to produce a specific rotation. A
constant control Hamiltonian applied for a chosen duration implements
exactly such a rotation. Define

```{math}
:label: rotation-operator
\hat R_{\mathbf n}(\alpha)
=\exp\left(-i\frac{\alpha}{2}\mathbf n\cdot\boldsymbol\sigma\right)
=\cos\frac{\alpha}{2}\hat I
-i\sin\frac{\alpha}{2}\mathbf n\cdot\boldsymbol\sigma.
```

For $\hat H=(\hbar\Omega/2)\mathbf n\cdot\boldsymbol\sigma$ applied for time
$\tau$, the rotation angle is $\alpha=\Omega\tau$. Two particular pulses come
up often enough to deserve names: a **$\pi$ pulse** carries a Bloch vector to
the opposite side of its rotation circle, while a **$\pi/2$ pulse** can turn
a definite $z$ state into an equal-amplitude superposition. For example,

```{math}
\hat R_y\left(\frac{\pi}{2}\right)|+z\rangle=|+x\rangle,
\qquad
\hat R_x(\pi)|+z\rangle=-i|-z\rangle.
```

It is worth keeping the factor $-i$ explicit during a multistep calculation,
even though it is only an overall phase at this stage. Dropping it too early
can make a later, genuinely physical relative phase look like a bookkeeping
error, or vice versa.

If an $x$ pulse acts first and a $y$ pulse second, the combined operator is

```{math}
:label: pulse-order
|\psi_{\mathrm f}\rangle
=\hat R_y(\beta)\hat R_x(\alpha)|\psi_{\mathrm i}\rangle.
```

Read this expression from right to left: the earliest operation in time
stands closest to the initial ket. Rotations about different axes generally
do not commute, so reversing the order of these two matrices describes a
genuinely different laboratory sequence, not merely a different way of
writing the same one.

### Example 4.7: pulse order on a prepared spin

Begin in $|+z\rangle$. An $x$-axis $\pi/2$ pulse produces

```{math}
\hat R_x\left(\frac{\pi}{2}\right)|+z\rangle
=\frac{|+z\rangle-i|-z\rangle}{\sqrt2}=|-y\rangle.
```

A subsequent $y$-axis pulse changes this $S_y$ eigenstate only by an overall
phase, since $|-y\rangle$ is already an eigenstate of the rotation axis. In
the reverse order, the first $y$ pulse produces $|+x\rangle$, which the $x$
pulse then changes only by an overall phase, for the same reason. The two
final Bloch vectors, $-y$ and $+x$, are clearly different states. This
geometric shortcut reaches the same conclusion as direct matrix
multiplication, with considerably less arithmetic.

## 4.11 Ramsey interference

We can now assemble everything in this chapter into one of the most
important protocols in atomic physics: a Ramsey sequence, which is really an
interferometer built entirely in a two-state space, using pulses instead of
beamsplitters. The protocol has five steps:

1. prepare $|+z\rangle$;
2. apply $\hat R_y(\pi/2)$ to create $|+x\rangle$;
3. allow free phase evolution for time $T$;
4. apply $\hat R_y(-\pi/2)$; and
5. measure $S_z$.

Represent the free evolution in step 3 by

```{math}
\hat U_{\mathrm{free}}(T)
=\hat R_z(\delta T)
=\begin{pmatrix}
e^{-i\delta T/2}&0\\
0&e^{i\delta T/2}
\end{pmatrix},
```

where $\delta$ is the relative angular frequency in the chosen reference
frame. Combining all five steps, the final state is

```{math}
:label: ramsey-state
|\psi_{\mathrm f}\rangle
=\hat R_y\left(-\frac{\pi}{2}\right)
\hat R_z(\delta T)
\hat R_y\left(\frac{\pi}{2}\right)|+z\rangle.
```

Projecting onto $|\pm z\rangle$ gives the observed fringes

```{math}
:label: ramsey-fringes
P(z+)=\cos^2\frac{\delta T}{2}
=\frac{1+\cos(\delta T)}2,\qquad
P(z-)=\sin^2\frac{\delta T}{2}.
```

It is worth naming what each step contributes: the first pulse creates two
coherent amplitudes out of a single definite state, free evolution changes
their relative phase by an amount set by $\delta$ and $T$, and the second
pulse recombines those two amplitudes so that the final measurement can read
out the accumulated phase as a probability. This is precisely the coherent
path logic first introduced in Chapter 2, now implemented with controlled
rotations rather than physically separated paths.

### Example 4.8: the first fringe minimum

If $|\delta|=2\pi(25\,\mathrm{kHz})$, the first $z+$ minimum occurs at
$|\delta|T=\pi$:

```{math}
T_{\min}=\frac{\pi}{|\delta|}=20\,\mu\mathrm{s}.
```

Scanning $T$ at fixed detuning reveals these oscillations directly. Scanning
the control frequency instead, at fixed $T$, also produces fringes, now as a
function of detuning rather than time. This sensitivity of a simple
probability to a small phase is the operating principle behind atomic clocks
and many modern quantum sensors.

If the accumulated phase varies unpredictably between different trials of
the experiment, averaging over those trials reduces the fringe contrast.
Each individual run may still be perfectly unitary; it is the *pooled*
ensemble that becomes mixed, because its relative phase is no longer
controlled from run to run. Density operators, introduced in Chapter 3, are
exactly the tool needed to distinguish this loss of ensemble coherence from
ordinary, coherent precession.

### Concept check 4.4

Why not measure $S_z$ after the first Ramsey pulse to verify both
alternatives?

:::{dropdown} Answer
That measurement would make the alternatives distinguishable and remove
their coherence. If its outcomes were pooled, the second pulse would yield
equal final $z$ probabilities rather than a full-contrast fringe.
:::

## Summary

- The Hamiltonian generates deterministic, unitary evolution between
  measurements.
- Energy eigenstates acquire only overall phases and are stationary.
- Superpositions acquire changing relative phases set by energy differences.
- A uniform magnetic field rotates a spin state; a field gradient can
  analyze it.
- Larmor precession converts phase evolution into oscillating measurement
  probabilities.
- Adding a constant to every energy changes only an unobservable overall
  phase.
- A complete dynamics calculation specifies a preparation, an evolution
  operator, and a final measurement basis.
- Time-dependent Hamiltonians require attention to the order of rotations
  when the Hamiltonians at different times do not commute.
- Spin expectation values precess smoothly even though individual component
  measurements have only two discrete outcomes.
- Controlled pulses implement rotations whose matrix order follows the
  laboratory sequence from right to left.
- Ramsey sequences turn accumulated relative phase into measurable
  population fringes.

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
17. Verify both pulse actions following equation {eq}`rotation-operator`
    using explicit Pauli matrices.
18. Calculate both pulse orders in Example 4.7 by matrix multiplication.
19. Derive equation {eq}`ramsey-fringes` from equation {eq}`ramsey-state`
    and check $\delta T=0,\pi,2\pi$.
20. Insert an unread $S_z$ measurement after the first Ramsey pulse and use
    density operators to show that both final outcomes have probability $1/2$.
