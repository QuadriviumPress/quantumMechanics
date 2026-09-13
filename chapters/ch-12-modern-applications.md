---
title: Modern Quantum Applications
---

# Modern quantum applications

## Learning objectives

After this chapter, you should be able to:

- represent quantum logic operations as unitary gates;
- explain no-cloning, teleportation, and superdense coding;
- distinguish decoherence from measurement uncertainty;
- state the purpose of quantum error correction;
- connect two-state dynamics to clocks, magnetic resonance, and sensing;
- illustrate how phase kickback lets a quantum algorithm answer a global
  question about a function with fewer queries than any classical algorithm
  (Deutsch's algorithm); and
- evaluate quantum-technology claims in terms of states, transformations,
  measurements, and resources.

## 12.1 From spin states to qubits

A **qubit** is any controlled two-state quantum system:

```{math}
|\psi\rangle=\alpha|0\rangle+\beta|1\rangle,\qquad
|\alpha|^2+|\beta|^2=1.
```

The physical realization might use spin, atomic energy levels, photon
polarization, superconducting circuits, or another pair of states. Different
hardware has different control and noise, but the same two-dimensional
formalism applies.

Common one-qubit gates include

```{math}
\hat X=\sigma_x,\quad
\hat Z=\sigma_z,\quad
\hat H_{\mathrm q}=\frac1{\sqrt2}
\begin{pmatrix}1&1\\1&-1\end{pmatrix},\quad
\hat S=\begin{pmatrix}1&0\\0&i\end{pmatrix}.
```

They are unitary transformations, not measurements. The $X$ gate exchanges
$|0\rangle$ and $|1\rangle$; $Z$ changes a relative sign; Hadamard converts
between $z$ and $x$ bases; and $S$ adds a quarter-cycle phase.

```{openlyceum} QubitSketch
:label: fig:ch12-qubitsketch-gates-sim

Drag $X$, $Z$, $H$, and $S$ gates onto a single qubit and watch its Bloch
sphere and amplitudes $\alpha,\beta$ update after each one—the same circuit
builder used in Chapter 5 to entangle two qubits, now applied one gate at a
time to a single qubit's state.
```

## 12.2 Circuits and quantum information

A circuit diagram is read in time order. Gates compose as matrix products, and
measurement converts final amplitudes into classical records. A useful
calculation always specifies the input, applies gates in order, and projects in
the stated measurement basis.

### The no-cloning theorem

Suppose one unitary $\hat U$ could copy every unknown state using a single
fixed, fresh ancilla $|0\rangle$:

```{math}
\hat U|\psi\rangle|0\rangle=|\psi\rangle|\psi\rangle,\qquad
\hat U|\phi\rangle|0\rangle=|\phi\rangle|\phi\rangle.
```

Unitary evolution preserves inner products, so the overlap
$\langle\phi|\langle0|\hat U^\dagger\hat U|\psi\rangle|0\rangle$ can be
evaluated two ways. Using $\hat U^\dagger\hat U=\hat I$ gives one value;
substituting the cloning hypothesis gives another:

```{math}
:label: no-cloning-overlap
\langle\phi|\langle0|\hat U^\dagger\hat U|\psi\rangle|0\rangle
=\langle\phi|\psi\rangle,
\qquad
\langle\phi|\langle0|\hat U^\dagger\hat U|\psi\rangle|0\rangle
=\big(\langle\phi|\langle\phi|\big)\big(|\psi\rangle|\psi\rangle\big)
=(\langle\phi|\psi\rangle)^2.
```

Both expressions describe the same quantity, so writing
$x=\langle\phi|\psi\rangle$ turns equation {eq}`no-cloning-overlap` into
$x=x^2$, or $x(x-1)=0$. Only $x=0$ or $x=1$ solves this: a single fixed
$\hat U$ can reproduce the cloning relation for a pair of states that are
already orthogonal or already identical up to normalization, never for a
generic unknown pair with $0<|x|<1$. A device can copy a known orthogonal
basis, such as $|0\rangle,|1\rangle$, but no physical operation perfectly
clones an arbitrary unknown qubit.

No-cloning is not a technological inconvenience. It follows from linearity
alone and protects the distinction between quantum information and an
unknown classical description: if an unknown qubit could always be silently
duplicated, no protocol whose security or correctness depends on that
impossibility could work. It is also why the teleportation protocol below
must destroy the sender's local access to $|\psi\rangle$ as the price of
reconstructing it elsewhere—transmitting quantum information can never mean
copying it.

### Concept check 12.1

Why can a controlled-NOT gate copy $|0\rangle$ and $|1\rangle$ without
violating no-cloning?

:::{dropdown} Answer
No-cloning forbids copying every unknown state. CNOT copies the selected
orthogonal basis, but an input superposition produces entanglement rather than
two independent copies.
:::

## 12.3 Teleportation

Quantum teleportation transfers an unknown qubit state using shared
entanglement and two classical bits. Let qubit 1 contain
$|\psi\rangle=\alpha|0\rangle+\beta|1\rangle$, while qubits 2 and 3 share
$|\Phi^+\rangle$. Reexpressing the three-qubit state in the Bell basis of
qubits 1 and 2 gives

```{math}
:label: teleportation-identity
|\psi\rangle_1|\Phi^+\rangle_{23}
=\frac12\big[
|\Phi^+\rangle_{12}|\psi\rangle_3
+|\Phi^-\rangle_{12}\hat Z|\psi\rangle_3
+|\Psi^+\rangle_{12}\hat X|\psi\rangle_3
+|\Psi^-\rangle_{12}\hat X\hat Z|\psi\rangle_3
\big].
```

A Bell-basis measurement on 1 and 2 gives one of four random outcomes. Sending
its two-bit label allows the holder of qubit 3 to apply the corresponding
correction and recover $|\psi\rangle$.

The original qubit is not copied: the measurement destroys its prior local
state, consistent with no-cloning. The receiver cannot recover $|\psi\rangle$
before the classical message arrives, so teleportation does not send
information faster than light.

:::{figure} ../images/figures/ch12-teleportation-circuit.svg
:name: fig-teleportation-circuit
:alt: A three-wire teleportation circuit prepares a Bell pair on qubits 2 and 3, performs a Bell measurement on the unknown qubit 1 and qubit 2, sends two classical measurement bits, and applies X and Z corrections to recover the state on qubit 3.
:width: 100%

Teleportation relocates a preparation by combining a shared Bell pair with two
classical bits. The Bell measurement removes the sender's local copy, and the
receiver obtains the state only after the outcome-dependent correction.
:::

### Concept check 12.2

Does teleportation eliminate the need to transmit information?

:::{dropdown} Answer
No. It consumes shared entanglement and requires two ordinary classical bits.
Without them, the receiver's local state contains no accessible copy of the
unknown input.
:::

### Example 12.1: a concrete correction

Let $|\psi\rangle=(|0\rangle+i|1\rangle)/\sqrt2$, so $\alpha=1/\sqrt2$ and
$\beta=i/\sqrt2$ in equation {eq}`teleportation-identity`. Suppose the Bell
measurement on qubits 1 and 2 returns the outcome $|\Psi^-\rangle_{12}$.
Immediately afterward—before any correction is applied—qubit 3 is left in

```{math}
\hat X\hat Z|\psi\rangle
=\hat X\left(\frac{|0\rangle-i|1\rangle}{\sqrt2}\right)
=\frac{-i|0\rangle+|1\rangle}{\sqrt2}.
```

This is not $|\psi\rangle$, and by itself it carries no information about
which of the four outcomes occurred at the sender. The two classical bits
naming $|\Psi^-\rangle_{12}$ tell the receiver to undo $\hat X\hat Z$.
Because $\hat X$ and $\hat Z$ do not commute, the order of the correction
matters: applying $\hat X$ and then $\hat Z$,

```{math}
\hat Z\hat X\left(\frac{-i|0\rangle+|1\rangle}{\sqrt2}\right)
=\hat Z\left(\frac{|0\rangle-i|1\rangle}{\sqrt2}\right)
=\frac{|0\rangle+i|1\rangle}{\sqrt2}=|\psi\rangle,
```

exactly recovers the original state. Applying the same two corrections in
the opposite order returns $-|\psi\rangle$ instead—physically
indistinguishable from $|\psi\rangle$, since an overall phase carries no
observable consequence (Chapter 2), but not identical as a vector, so a
careful statement of the protocol fixes one convention. In the vocabulary
that will organize the rest of this chapter (Section 12.9), the
*preparation* reconstructed at qubit 3 depends on both the shared entangled
resource and the classical record of the *measurement* at the sender;
neither the entanglement alone nor the two bits alone would be evidence of a
transferred qubit.

### Concept check 12.3

In Example 12.1, does the sender end up holding a usable copy of
$|\psi\rangle$ after the Bell measurement?

:::{dropdown} Answer
No. The Bell measurement projects qubits 1 and 2 into an entangled two-qubit
outcome state, leaving qubit 1 with no local state that recovers
$|\psi\rangle$. If the sender also retained a usable copy while qubit 3
ended up with $|\psi\rangle$, two independent copies of an unknown state
would exist, contradicting no-cloning.
:::

### Superdense coding

The resource accounting can be reversed. If two parties share a Bell pair, one
party can apply one of $\hat I,\hat X,\hat Z,\hat X\hat Z$ to encode two
classical bits in the joint Bell state, then transmit one qubit. A Bell
measurement recovers the two-bit message. The protocol consumes prior
entanglement plus one transmitted qubit; it does not encode arbitrarily many
bits in one unassisted two-state system.

## 12.4 Decoherence and open systems

Useful quantum behavior depends on controlled relative phases. Unmonitored
degrees of freedom can become correlated with a system:

```{math}
(\alpha|0\rangle+\beta|1\rangle)|E_0\rangle
\longrightarrow
\alpha|0\rangle|E_0'\rangle+\beta|1\rangle|E_1'\rangle.
```

If the environment states become distinguishable and are not observed, tracing
them out suppresses the qubit's off-diagonal density-matrix elements. This is
**decoherence**. It explains the loss of interference in an open subsystem
without requiring a person to inspect the environment.

Two common time scales are:

- $T_1$, energy relaxation toward thermal populations; and
- $T_2$, loss of phase coherence.

:::{figure} ../images/figures/ch12-decoherence-t1-t2.svg
:name: fig-decoherence-t1-t2
:alt: Successively shorter Bloch vectors show transverse coherence shrinking toward the sphere's center. Exponential curves compare energy relaxation with faster phase-coherence loss.
:width: 100%

Decoherence turns a sharp Bloch vector into a shorter mixed-state vector.
$T_1$ tracks population relaxation, while $T_2$ tracks transverse phase
coherence; a device must characterize both rather than quote one lifetime.
:::

Typically $T_2\le2T_1$, and additional low-frequency noise can make it much
shorter. Gate times must be small compared with relevant coherence times, but
that ratio alone does not fully characterize correlated errors, leakage, or
measurement faults.

### Example 12.2: comparing a gate time with coherence times

A two-qubit gate takes $t_{\mathrm{gate}}=200\ \mathrm{ns}$ on a qubit with
$T_1=50\ \mu\mathrm s$ and $T_2=30\ \mu\mathrm s$. Modeling the decay as
simple exponentials $e^{-t/T_1}$ and $e^{-t/T_2}$,

```{math}
e^{-t_{\mathrm{gate}}/T_1}=e^{-0.2/50}\approx0.9960,
\qquad
e^{-t_{\mathrm{gate}}/T_2}=e^{-0.2/30}\approx0.9934.
```

A single gate loses under half a percent of population and about
two-thirds of a percent of coherence—consistent with the qualitative
requirement above. But small per-gate losses compound over a circuit:
after $1{,}000$ such gates run back to back, the coherence factor is roughly
$e^{-1000\times0.00667}\approx e^{-6.7}\approx0.001$, which would destroy
essentially all interference long before $T_2$ is reached in absolute time.
A short ratio $t_{\mathrm{gate}}/T_2$ is necessary for one gate to be
useful, but a circuit of any depth needs many gates, which is exactly why
quantum error correction—not coherence time by itself—is needed to run
long computations. In the language of Section 12.9, decoherence is a
*transformation* imposed by an uncontrolled environment rather than a
chosen one, and its accumulated effect over a circuit is part of the
*evidence* that must be checked against any performance claim.

## 12.5 Quantum error correction

Classical repetition cannot be applied by first cloning an unknown qubit.
Quantum error correction instead encodes one logical state into an entangled
subspace of several physical qubits. Carefully chosen **syndrome measurements**
reveal which error occurred without revealing the logical amplitudes
$\alpha,\beta$.

For example, the three-qubit repetition code maps

```{math}
\alpha|0\rangle+\beta|1\rangle
\longmapsto
\alpha|000\rangle+\beta|111\rangle.
```

Parity checks can locate one bit-flip error, after which a correction restores
the encoded state. This code does not correct phase flips; more complete codes
combine checks for both error types.

### Example 12.3: locating an error without reading the logical state

Take the two stabilizer checks $\hat Z_1\hat Z_2$ and $\hat Z_2\hat Z_3$,
each with eigenvalues $\pm1$. On an uncorrupted codeword
$\alpha|000\rangle+\beta|111\rangle$, both checks return $+1$ regardless of
$\alpha,\beta$: $\hat Z_1\hat Z_2|000\rangle=(+1)(+1)|000\rangle$ and
$\hat Z_1\hat Z_2|111\rangle=(-1)(-1)|111\rangle$, both equal to $+1$ times
the state, and $\hat Z_2\hat Z_3$ behaves the same way.

A bit-flip $\hat X_1$ sends the codeword to
$\alpha|100\rangle+\beta|011\rangle$. Direct evaluation gives
$\hat Z_1\hat Z_2|100\rangle=(-1)(+1)|100\rangle$ and
$\hat Z_1\hat Z_2|011\rangle=(+1)(-1)|011\rangle$: both terms agree on
eigenvalue $-1$, so the syndrome is well defined even though $\alpha,\beta$
are unknown and different for the two terms. Repeating this check for every
single bit flip gives

| error | $\hat Z_1\hat Z_2$ | $\hat Z_2\hat Z_3$ |
|---|---|---|
| none | $+1$ | $+1$ |
| $\hat X_1$ | $-1$ | $+1$ |
| $\hat X_2$ | $-1$ | $-1$ |
| $\hat X_3$ | $+1$ | $-1$ |

Each possibility gives a distinct pair of eigenvalues, so measuring only
these two joint operators—never $\hat Z_1$, $\hat Z_2$, or $\hat Z_3$
individually—identifies which qubit, if any, flipped. The syndrome takes the
same value on the $\alpha|000\rangle$ term and the $\beta|111\rangle$ term of
a corrupted codeword, so this measurement collapses only the error
information and leaves the encoded superposition of $\alpha$ and $\beta$
untouched. Measuring $\hat Z_1$ alone, by contrast, would project each qubit
individually onto $|0\rangle$ or $|1\rangle$ and destroy the logical
superposition outright. This is a measurement engineered to reveal only the
*transformation* that occurred (which error, if any) while leaving the
encoded *preparation* untouched—the same operational split between reading
a result and merely narrowing a preparation that organized Chapter 1.

:::{figure} ../images/figures/ch12-error-correction-syndrome.svg
:name: fig-error-correction-syndrome
:alt: An unknown logical qubit is encoded into three physical qubits, one bit may flip, and two parity measurements branch into four syndromes identifying no error or a flip on qubit 1, 2, or 3 without exposing the logical amplitudes.
:width: 100%

The repetition code stores logical information nonlocally. Two joint parity
checks distinguish the four error locations but take the same values on both
terms of the encoded superposition, so they reveal no information about
$\alpha$ or $\beta$.
:::

### Concept check 12.4

In Example 12.3, a measured syndrome is $(-1,-1)$. Which physical qubit has a
bit flip, and has this measurement revealed anything about $\alpha$ or
$\beta$?

:::{dropdown} Answer
Qubit 2. The table shows $(-1,-1)$ occurs only for the $\hat X_2$ row. The
amplitudes are not revealed: the same syndrome occurs for the
$\alpha|000\rangle$ term and the $\beta|111\rangle$ term of the corrupted
codeword, so the measurement distinguishes only which error occurred, not
the encoded superposition.
:::

Fault tolerance is the architecture that prevents imperfect correction
operations from spreading errors uncontrollably. A scalable device needs
error rates, connectivity, control, decoding, and overhead that together
support logical operations—not merely a large physical qubit count.

### Concept check 12.5

Is a larger number of physical qubits alone evidence of a more capable quantum
computer?

:::{dropdown} Answer
No. Fidelity, connectivity, coherence, leakage, control speed, measurement,
error correction, and algorithmic overhead all affect useful logical
capability.
:::

## 12.6 Quantum computation

A quantum algorithm uses interference so that amplitudes of unwanted answers
cancel while amplitudes of useful outcomes reinforce. Superposition alone does
not provide all answers to a problem: a final measurement returns one classical
record, and the circuit must arrange that useful records have high probability.

Entangling gates plus arbitrary one-qubit rotations form a universal control
set. Computational advantage is problem-dependent. Known examples exploit
structure in integer factoring, quantum simulation, and some search or
linear-algebra tasks; they do not imply a speedup for every computation.

When assessing an algorithmic claim, ask:

1. What input is loaded, and at what cost?
2. Which operations are assumed available?
3. How do time, qubit count, precision, and error-correction overhead scale?
4. What classical baseline is used?
5. What measurement produces the promised answer?

### Example 12.4: Deutsch's algorithm

Let $f:\{0,1\}\to\{0,1\}$ be **constant** ($f(0)=f(1)$) or **balanced**
($f(0)\ne f(1)$), with access to $f$ only through the oracle
$\hat U_f|x\rangle|y\rangle=|x\rangle|y\oplus f(x)\rangle$. Classically,
deciding which case holds requires evaluating $f$ at both inputs. One query
suffices quantum mechanically.

Prepare $|0\rangle|1\rangle$ and apply $\hat H_{\mathrm q}\otimes\hat H_{\mathrm q}$:

```{math}
|0\rangle|1\rangle
\;\longrightarrow\;
\frac{|0\rangle+|1\rangle}{\sqrt2}\cdot\frac{|0\rangle-|1\rangle}{\sqrt2}.
```

Because the second qubit is $(|0\rangle-|1\rangle)/\sqrt2$, applying
$\hat U_f$ to one term $|x\rangle(|0\rangle-|1\rangle)/\sqrt2$ reproduces the
same two-term state up to an overall sign:

```{math}
\hat U_f\,|x\rangle\frac{|0\rangle-|1\rangle}{\sqrt2}
=|x\rangle\frac{|f(x)\rangle-|1\oplus f(x)\rangle}{\sqrt2}
=(-1)^{f(x)}|x\rangle\frac{|0\rangle-|1\rangle}{\sqrt2}.
```

This is **phase kickback**: the oracle leaves the target qubit unchanged and
writes $f(x)$ into a sign attached to $|x\rangle$ instead of into the target
qubit's state. Applying it to both terms gives

```{math}
:label: deutsch-kickback
\frac{(-1)^{f(0)}|0\rangle+(-1)^{f(1)}|1\rangle}{\sqrt2}
\cdot\frac{|0\rangle-|1\rangle}{\sqrt2}.
```

If $f$ is constant, the first factor in equation {eq}`deutsch-kickback` is
$(-1)^{f(0)}(|0\rangle+|1\rangle)/\sqrt2$, an overall phase times
$\hat H_{\mathrm q}|0\rangle$; a final $\hat H_{\mathrm q}$ on the first
qubit returns $|0\rangle$ with certainty. If $f$ is balanced, the first
factor is $\pm(|0\rangle-|1\rangle)/\sqrt2$, an overall phase times
$\hat H_{\mathrm q}|1\rangle$; the final $\hat H_{\mathrm q}$ returns
$|1\rangle$ with certainty. Measuring the first qubit therefore reveals
whether $f$ is constant or balanced—a single global property—after exactly
one query to $\hat U_f$, even though neither $f(0)$ nor $f(1)$ separately
becomes known. That one measured bit is direct *evidence* distinguishing the
two hypotheses, not merely a result consistent with both. Nothing here
followed one branch more than the other with higher probability; the two
branches instead interfered constructively for one final measurement outcome
and destructively for the other, exactly the mechanism named at the start of
this section.

```{openlyceum} QubitSketch
:label: fig:ch12-qubitsketch-deutsch-sim

Build this circuit on two wires: Hadamard both qubits, insert an oracle, then
Hadamard the first qubit again before measuring it. All four possible oracles
are built from gates already in the palette—identity or $X$ on the target
qubit for a constant $f$, and CNOT (with an extra $X$ for the other balanced
case) for a balanced $f$. Confirm the first qubit always reads $0$ for the
constant oracles and $1$ for the balanced ones.
```

### Concept check 12.6

After running Deutsch's algorithm in Example 12.4 and measuring the first
qubit, do we know the value of $f(0)$?

:::{dropdown} Answer
No. Only the global constant-or-balanced property is determined. The
individual values $f(0)$ and $f(1)$ remain unknown from that one run—the
algorithm answers a question about the function as a whole, not about any
particular input.
:::

## 12.7 Clocks, resonance, and sensing

The Ramsey sequence of Chapter 4 compares a controlled oscillator with a
quantum transition frequency. Feedback steers the oscillator toward the center
of the fringe, forming the basis of atomic clocks.

Magnetic resonance uses precession and pulses to infer magnetic fields and
local environments. In nuclear magnetic resonance and magnetic-resonance
imaging, spatially varying fields connect resonance frequency and phase to
position. The measurable signal is an ensemble response, but its building
blocks are the rotations, phases, and projections developed for one spin.

A two-state sensor accumulates phase

```{math}
\phi=\int_0^T\gamma B(t)\,dt.
```

A final analyzer converts $\phi$ into a probability. Sensitivity improves with
phase-accumulation time until decoherence reduces contrast. Pulse sequences
can reject slowly varying unwanted fields or select a narrow frequency band.

### Example 12.5: projection noise

If a binary readout has probability $p$, $N$ independent trials estimate it
with standard deviation

```{math}
\sigma_p=\sqrt{\frac{p(1-p)}{N}}.
```

Near the steepest point of an interference fringe, probability uncertainty
becomes phase uncertainty. Repeating four times as many independent trials
improves this standard quantum scaling by a factor of two. Entangled sensor
states can alter the scaling under ideal conditions, but state preparation,
loss, and decoherence determine whether the advantage survives.

## 12.8 Quantum simulation

Quantum systems are often difficult to simulate classically because the state
space dimension grows exponentially with subsystem count. A controllable
quantum device can encode another Hamiltonian and measure its dynamics.

Two broad strategies are:

- **digital simulation**, which decomposes evolution into gates; and
- **analog simulation**, which engineers a physical Hamiltonian with the same
  relevant structure as the target.

Validation remains essential. Conservation laws, small instances accessible
to classical calculation, symmetry checks, and measurements in multiple bases
help distinguish target physics from control error.

## 12.9 Reading claims with the textbook's framework

Every quantum technology can be analyzed with four questions:

1. **Preparation:** Which density operator is actually produced?
2. **Transformation:** Which Hamiltonian, channel, or gate acts, and for how
   long?
3. **Measurement:** Which observable or generalized detector record is read?
4. **Evidence:** Which statistics distinguish the quantum model from noise or
   a classical alternative?

Terms such as *superposition*, *entanglement*, and *quantum advantage* name
specific mathematical and experimental resources. They should lead to
testable probability distributions, not serve as substitutes for a mechanism.

## Summary

- Qubits are physical two-state systems controlled with unitary gates and
  projective measurements.
- Linearity forbids universal cloning of an unknown state.
- Entanglement plus classical communication enables teleportation and dense
  coding without faster-than-light signaling.
- Decoherence arises when uncontrolled correlations hide phase information
  from a subsystem.
- Error correction protects logical amplitudes by measuring error syndromes
  that reveal which error occurred without collapsing the encoded state.
- Phase kickback lets an oracle mark a global property of a function in the
  phase of a query register, letting interference answer a global question
  with fewer queries than any classical algorithm, as in Deutsch's algorithm.
- Computation, sensing, clocks, resonance, and simulation all use controlled
  preparation, phase evolution, interference, and readout.

## Exercises

1. Find the action of $\hat H_{\mathrm q}$, $\hat S$, and $\hat X$ on each
   computational basis state and on $|+x\rangle$.
2. Show that CNOT applied to
   $(\alpha|0\rangle+\beta|1\rangle)|0\rangle$ does not produce two copies
   unless the first state is a computational-basis state.
3. Derive the teleportation identity by expanding both sides in the
   computational basis.
4. Make a table of the four Bell-measurement outcomes and the receiver's
   correcting gate.
5. Work through superdense coding for all four two-bit messages.
6. Trace out the environment in the decoherence model and show that the
   off-diagonal terms are multiplied by $\langle E_1'|E_0'\rangle$.
7. Show how a single bit flip affects each codeword of the three-qubit
   repetition code and propose parity checks that locate it.
8. Explain why measuring every physical qubit directly would destroy the
   logical superposition even though syndrome measurements need not.
9. For $P=(1+\cos\phi)/2$, find $|dP/d\phi|$ and identify its steepest
   operating points.
10. A sensor has contrast $C$, so
    $P=[1+C\cos(\gamma BT)]/2$. Explain how $C$ and $T$ affect small-field
    sensitivity.
11. Compare the resources consumed by teleportation, superdense coding, and
    direct qubit transmission.
12. Choose one quantum-technology claim and analyze it using the four questions
    in Section 12.9.
13. Suppose a unitary $\hat U$ satisfies the cloning hypothesis for two states
    with $\langle\phi|\psi\rangle=1/\sqrt2$. Show that equation
    {eq}`no-cloning-overlap` requires $1/\sqrt2=1/2$, and state which
    assumption fails.
14. Redo Example 12.1 for the Bell-measurement outcome $|\Phi^-\rangle_{12}$
    instead of $|\Psi^-\rangle_{12}$: find qubit 3's state before correction
    and the operator order that recovers $|\psi\rangle$ exactly.
15. For $T_1=80\ \mu\mathrm s$ and $T_2=45\ \mu\mathrm s$, find the number of
    $150\ \mathrm{ns}$ gates, run back to back, after which the coherence
    factor $e^{-t/T_2}$ first falls below $0.5$.
16. Verify directly, as in Example 12.3, that an $\hat X_3$ error gives the
    syndrome $(+1,-1)$.
17. A phase-flip error $\hat Z_2$ acts on $\alpha|000\rangle+\beta|111\rangle$.
    Show that both stabilizers $\hat Z_1\hat Z_2$ and $\hat Z_2\hat Z_3$ still
    return $+1$, and explain what this implies about the limits of the
    bit-flip code stated in the text.
18. Work through the phase-kickback calculation of Example 12.4 explicitly
    for the balanced assignment $f(0)=1,f(1)=0$, tracking the overall phase,
    and confirm that the first qubit is still measured to be $1$.
19. Suppose the target qubit in Deutsch's algorithm were prepared in
    $|0\rangle$ instead of $|1\rangle$, so no $\hat H_{\mathrm q}|1\rangle$
    state is created. Show that $\hat U_f$ then leaves the target entangled
    with the first qubit's basis states, and explain why the final
    measurement on the first qubit no longer reliably distinguishes constant
    from balanced $f$.
20. The Deutsch–Jozsa algorithm generalizes Example 12.4 to
    $f:\{0,1\}^n\to\{0,1\}$, promised to be constant or balanced, distinguished
    with one query using $n$ query qubits and the same target-qubit trick.
    Explain qualitatively, without a full derivation, why the phase-kickback
    mechanism still applies with $n$ query qubits and why a classical
    deterministic algorithm can require up to $2^{n-1}+1$ queries in the
    worst case.
21. Using the orthonormality of the Bell basis and of
    $\{|\psi\rangle,\hat Z|\psi\rangle,\hat X|\psi\rangle,\hat X\hat Z|\psi\rangle\}$,
    verify that the four terms on the right of equation
    {eq}`teleportation-identity` are mutually orthonormal, and explain why
    this is required for the identity to represent a valid change of basis.
22. A vendor claims a $1{,}000$-physical-qubit device demonstrates
    "exponential quantum advantage" on an optimization problem. Apply the
    four questions of Section 12.9 to list the specific information needed
    before evaluating the claim.
23. Using the per-gate coherence factor from Example 12.2, estimate how many
    gates a device could run before losing half its coherence, and compare
    this with the $1{,}000$-gate estimate already given in the text.
24. Explain, using the vocabulary introduced across Sections 12.3–12.5
    (preparation, transformation, measurement, evidence), what distinguishes
    a genuine demonstration of quantum error correction from one that merely
    shows a syndrome-measurement circuit runs without crashing.
