---
title: Composite Systems and Entanglement
---

# Composite systems and entanglement

## Learning objectives

After this chapter, you should be able to:

- construct product states and operators with tensor products;
- calculate joint, marginal, and conditional probabilities;
- distinguish separable states from entangled states, including in mixtures;
- use reduced density operators to describe a subsystem;
- predict correlations in Bell states and quantify partial entanglement with
  the Schmidt decomposition;
- explain why entanglement does not enable faster-than-light signaling;
- state the Tsirelson bound and what it does and does not imply about nature;
  and
- analyze simple two-qubit gates and measurement protocols.

## 5.1 Building a joint state space

Chapters 2 through 4 developed a complete quantum description of a single
spin: a two-dimensional complex state space, Hermitian operators for
measurable quantities, and unitary time evolution. But that formalism, on its
own, does not say how to describe *two* spins that were prepared together and
are later measured separately—perhaps in two different laboratories. A first
guess might be that each spin simply carries its own independent ket, and a
joint experiment just reports the two kets' separate predictions side by
side. That guess is sometimes right and sometimes badly wrong, and sorting out
the difference is the subject of this chapter.

The correct joint state space is built from the two one-spin spaces by a
specific mathematical construction called the **tensor product**. It is not
merely "the two spaces considered together": it is a larger space, big enough
to hold every possible correlation between the two spins, including
correlations with no classical counterpart at all. Learning to build this
space, and learning to recognize when a joint state does or does not reduce
to "two independent spins," is the first step toward composite systems of
any size—two electrons, a spin coupled to a field mode, or the
many-particle systems of Chapter 11.

One spin-$\tfrac12$ system has a two-dimensional state space. Two
distinguishable spins require four independent basis states:

```{math}
|+z\rangle_A|+z\rangle_B,\quad
|+z\rangle_A|-z\rangle_B,\quad
|-z\rangle_A|+z\rangle_B,\quad
|-z\rangle_A|-z\rangle_B.
```

The joint space is the tensor product
$\mathcal H_{AB}=\mathcal H_A\otimes\mathcal H_B$. We abbreviate
$|+z\rangle_A|-z\rangle_B$ as $|+z,-z\rangle$ or, for qubits, $|01\rangle$.
In the ordered $z$ basis,

```{math}
|00\rangle\doteq
\begin{pmatrix}1\\0\\0\\0\end{pmatrix},\quad
|01\rangle\doteq
\begin{pmatrix}0\\1\\0\\0\end{pmatrix},\quad
|10\rangle\doteq
\begin{pmatrix}0\\0\\1\\0\end{pmatrix},\quad
|11\rangle\doteq
\begin{pmatrix}0\\0\\0\\1\end{pmatrix}.
```

If $|\psi\rangle_A=a|0\rangle+b|1\rangle$ and
$|\phi\rangle_B=c|0\rangle+d|1\rangle$, then

```{math}
:label: two-product-state
|\psi\rangle_A\otimes|\phi\rangle_B
=ac|00\rangle+ad|01\rangle+bc|10\rangle+bd|11\rangle.
```

Notice that the coefficient array factors into one list for $A$ and one for
$B$. This factorization is the defining feature of a pure **product state**,
and it is exactly what will fail, in Section 5.2, for a state that cannot be
built this way.

### Operators on one subsystem

An operation on $A$ alone is represented by $\hat A\otimes\hat I_B$; an
operation on $B$ alone is $\hat I_A\otimes\hat B$. Operators acting on
different subsystems always commute:

```{math}
[\hat A\otimes\hat I,\hat I\otimes\hat B]=0.
```

Because these operators commute, measurements made on the two distinct
systems can always be assigned one common joint probability distribution,
even when the individual components being measured on either spin, taken
alone, would be incompatible. This is a stronger and more precise statement
than just "the two measurements don't interfere." It says that a single
joint probability distribution can be written down for the two experiments at
all—which is exactly the kind of object that incompatible single-spin
observables (Chapter 3) cannot generally be assigned to begin with.

### Example 5.1: independent preparations

For $|+x\rangle_A|-z\rangle_B$, measurements of $S_z$ on both spins give
$P(0,1)=P(1,1)=1/2$ and zero for the other outcomes. Since the preparation is
a product, its joint probabilities factor:

```{math}
P(a,b)=P_A(a)P_B(b).
```

Learning $B$'s result supplies no new information about $A$. This
factorization is the operational signature of a product state: every joint
question about $A$ and $B$ can be answered by combining two separate
one-spin calculations, and nothing is lost by treating the two laboratories
as running independent experiments on a shared clock.

## 5.2 States that do not factor

Now consider the normalized state

```{math}
:label: bell-phi-plus
|\Phi^+\rangle=\frac{|00\rangle+|11\rangle}{\sqrt2}.
```

Try to write it in the product form of equation {eq}`two-product-state`. If
$ad=bc=0$ while both $ac$ and $bd$ are nonzero, the required single-system
coefficients contradict one another—there is no consistent choice of $a$,
$b$, $c$, $d$ that works. A state like this, which cannot be factored, is
called **entangled**.

A joint $z$ measurement on $|\Phi^+\rangle$ produces $00$ or $11$, each with
probability $1/2$. Each individual outcome is random, yet the two records
always agree. Rewriting the state in the $x$ basis gives

```{math}
|\Phi^+\rangle
=\frac{|+x,+x\rangle+|-x,-x\rangle}{\sqrt2},
```

so the $x$ records also always agree. This is the key point: entanglement is
not merely "both spins were prepared the same way." No assignment of one
definite pure state to each spin separately can reproduce all of these
correlations at once.

The four Bell states form an orthonormal basis:

```{math}
:label: bell-basis
|\Phi^\pm\rangle=\frac{|00\rangle\pm|11\rangle}{\sqrt2},
\qquad
|\Psi^\pm\rangle=\frac{|01\rangle\pm|10\rangle}{\sqrt2}.
```

Relative signs that were invisible in a $z$ measurement become visible once
we switch to another basis, exactly as relative phase did for a single spin
in Chapter 2.

It is worth being precise about what "entangled" means, since the word
invites an all-or-nothing reading it does not deserve. Entanglement is not a
label attached loosely to "the two particles are correlated somehow"; it is
a precise property of the joint state, and it comes in degrees. A state can
fail to factor into a product yet still be much "closer" to a product than
$|\Phi^+\rangle$ is. Section 5.7 makes this quantitative with the Schmidt
decomposition. For now, treat the Bell states as one convenient orthonormal
family of *maximally* entangled states, not as the only entangled states
that exist.

## 5.3 Joint, marginal, and conditional probabilities

For outcome kets $|a\rangle_A$ and $|b\rangle_B$, the joint Born rule is

```{math}
:label: joint-born-rule
P(a,b)=|\langle a,b|\Psi\rangle|^2.
```

The marginal probability for $A$ ignores $B$'s result:

```{math}
P_A(a)=\sum_bP(a,b).
```

If $B=b$ is recorded, the conditional probability is
$P(a|b)=P(a,b)/P_B(b)$ when $P_B(b)\ne0$.

### Example 5.2: analyzers at different angles

Let's apply these three definitions to the most consequential entangled
state in physics: the singlet,

```{math}
:label: singlet-state
|\Psi^-\rangle=\frac{|01\rangle-|10\rangle}{\sqrt2}.
```

Measure $A$ along $\mathbf a$ and $B$ along $\mathbf b$, and assign numerical
results $r,s=\pm1$ to the two outcomes. The joint distribution works out to

```{math}
:label: singlet-joint
P(r,s|\mathbf a,\mathbf b)
=\frac14(1-rs\,\mathbf a\cdot\mathbf b),
```

and the correlation is

```{math}
:label: singlet-correlation
E(\mathbf a,\mathbf b)
=\sum_{r,s}rsP(r,s|\mathbf a,\mathbf b)
=-\mathbf a\cdot\mathbf b.
```

Aligned analyzers always disagree, perpendicular analyzers show no
correlation, and oppositely aligned analyzers always agree, under these
numerical labels. It is worth checking one more feature of equation
{eq}`singlet-joint` directly: summing it over $s$ gives $P_A(r)=1/2$ for
every $r$, independent of $\mathbf a$ or $\mathbf b$. Each side's own
marginal statistics are, on their own, featureless coin flips. All the
physical content lives in how the two records *compare*, not in either
record alone—a point Section 5.4 develops further.

## 5.4 Reduced states

Suppose an experimenter has access only to spin $A$, and never touches spin
$B$ at all—perhaps $B$ has been carried off to a distant laboratory. What can
that experimenter predict, given only the full joint state $\hat\rho_{AB}$?
The answer is captured by the **reduced density operator**,

```{math}
:label: partial-trace
\hat\rho_A=\operatorname{Tr}_B(\hat\rho_{AB}),
```

where the partial trace sums over any orthonormal basis of $B$. For
$|\Phi^+\rangle$, working through this trace gives

```{math}
\hat\rho_A=\hat\rho_B=\frac12\hat I.
```

The joint state is pure, but each subsystem, considered alone, is maximally
mixed. This is not ordinary ignorance about which pre-existing Bell
component actually occurred; the coherence that makes $|\Phi^+\rangle$ a pure
state resides in joint off-diagonal terms such as $|00\rangle\langle11|$,
which the reduced state at $A$ alone cannot see.

If $B$ is measured in the $z$ basis and $0$ is selected, $A$ is
conditionally prepared in $|0\rangle$. If $B$ instead measures in the $x$
basis and selects $+x$, $A$ is conditionally prepared in $|+x\rangle$. Yet
before learning which setting was used, or what its outcome was, an observer
at $A$ still assigns exactly $\hat I/2$—no matter what choice is made at $B$.

:::{important} Correlation is not a signal
Changing the analyzer at $B$ changes how joint data are sorted after the two
records are compared. It does not change $A$'s local marginal probabilities.
Entanglement therefore creates correlations stronger than classical
factorization but cannot transmit a controllable message without an ordinary
communication channel.
:::

This is a general feature, not a special property of $|\Phi^+\rangle$: for
*any* joint state, the reduced density operator
$\hat\rho_A=\operatorname{Tr}_B(\hat\rho_{AB})$ used to predict $A$'s local
statistics does not depend on which measurement, if any, is later performed
at $B$. Choosing a different analyzer at $B$—or none at all—only changes how
an already-fixed set of joint records can be sorted into subsets once the
two sides compare notes; it cannot change the unconditional distribution of
$A$'s own outcomes.

### Concept check 5.1

If $\hat\rho_A=\hat I/2$, does that mean the spin at $A$ is definitely
unpolarized and uncorrelated with $B$?

:::{dropdown} Answer
No. The reduced state $\hat\rho_A$ fixes only $A$'s own unconditional
statistics; it says nothing about whether $A$'s results agree, disagree, or
vary independently with $B$'s. All four Bell states, the Werner state of
Section 5.8 at every mixing parameter, and the classical mixture
$\hat\rho_{\mathrm{class}}$ of Section 5.8 all give $\hat\rho_A=\hat I/2$
despite having very different—or no—correlations with $B$. Correlation is a
joint-state property; the reduced state has already thrown that information
away.
:::

## 5.5 Bell's test of local hidden variables

A local hidden-variable model supposes that a measurement's result is
determined by information carried along from the shared source, and that a
setting freely chosen at one station cannot affect the result recorded at a
distant one. One experimentally useful constraint on any such model is the
CHSH inequality. For two settings $\mathbf a,\mathbf a'$ at $A$ and
$\mathbf b,\mathbf b'$ at $B$, define

```{math}
:label: chsh
S=E(\mathbf a,\mathbf b)+E(\mathbf a,\mathbf b')
+E(\mathbf a',\mathbf b)-E(\mathbf a',\mathbf b').
```

Every local hidden-variable model of this type satisfies $|S|\le2$. For the
singlet, suitable coplanar settings separated by $45^\circ$ instead give
$|S|=2\sqrt2$. Quantum theory violates the classical bound while still
preserving the no-signaling marginal probabilities from Section 5.4.

The conclusion this supports is precise, and it is worth stating carefully:
the observed correlations cannot be reproduced by local models in which
every result is fixed by shared pre-existing variables, independent of the
later settings. Bell tests do not show that experimenters can send
information backward in time or faster than light—Section 5.4 already ruled
that out on its own.

### The Tsirelson bound

Equation {eq}`chsh` shows that quantum mechanics *can* exceed the classical
bound of $2$—but it cannot exceed it arbitrarily. One can show that for the
singlet, and more generally for any quantum state and any choice of
$\pm1$-valued observables, $|S|\le2\sqrt2\approx2.828$. This number is the
**Tsirelson bound**. The coplanar, $45^\circ$-separated setting above is not
a lucky combination that happens to violate the classical bound; it is the
specific configuration that *saturates* the strongest violation quantum
mechanics allows.

That quantum correlations stop at $2\sqrt2$, rather than climbing all the
way to the logically largest conceivable value of $4$, is itself a
substantive fact about nature, not a bookkeeping accident. Hypothetical
"post-quantum" correlations reaching all the way to $|S|=4$, called
Popescu–Rohrlich boxes, are mathematically consistent with the no-signaling
constraint of Section 5.4—each individual marginal can still come out
exactly $1/2$—yet no quantum state realizes them. Quantum mechanics is more
correlated than any classical local theory can be, but less correlated than
logical consistency alone would permit.

### Example 5.3: a setting that does not reveal a violation

A $2\sqrt2$ violation requires a specific relationship between the four
analyzer directions; it does not happen automatically for any four
directions we might pick. Suppose instead the four directions are chosen
$22.5^\circ$ apart in sequence: $\theta_{\mathbf a}=0^\circ$,
$\theta_{\mathbf b}=22.5^\circ$, $\theta_{\mathbf a'}=45^\circ$,
$\theta_{\mathbf b'}=67.5^\circ$. Using
$E(\mathbf a,\mathbf b)=-\cos(\theta_{\mathbf a}-\theta_{\mathbf b})$ from
equation {eq}`singlet-correlation`,

```{math}
S=-\cos(22.5^\circ)-\cos(67.5^\circ)-\cos(22.5^\circ)+\cos(22.5^\circ)
=-\cos(22.5^\circ)-\cos(67.5^\circ)
\approx-1.31.
```

Here $|S|\approx1.31$, well below even the classical bound of $2$. The very
same singlet, analyzed with a different—equally legitimate—choice of four
directions, shows no sign of any nonclassical correlation at all.
Demonstrating a Bell violation is therefore an experiment-design problem as
much as a fact about the state: the directions must be chosen, as in the
$45^\circ$ configuration above, to make the classical and quantum
predictions disagree as sharply as possible. This is the same lesson
Chapter 1 drew from sequential Stern–Gerlach analyzers: a single measurement
rarely distinguishes rival explanations, and a well-chosen combination is
needed to force them apart.

### Concept check 5.2

Could a future theory find correlations stronger than quantum mechanics's
$2\sqrt2$, while still forbidding faster-than-light signaling?

:::{dropdown} Answer
Logically, yes: no-signaling alone only forbids $S$ from being used to send a
controllable message, and mathematical correlations (Popescu–Rohrlich boxes)
exist that reach the algebraic maximum $|S|=4$ while keeping every local
marginal exactly $1/2$. Quantum mechanics happens to stop at $2\sqrt2$. That
intermediate value—more correlated than any classical local theory, less
correlated than logical consistency alone would allow—is a specific,
falsifiable feature of quantum theory, not a generic consequence of
forbidding signaling.
:::

## 5.6 Creating entanglement with gates

In quantum-information notation, the Hadamard gate is

```{math}
\hat H_{\mathrm q}=\frac1{\sqrt2}
\begin{pmatrix}1&1\\1&-1\end{pmatrix},
```

and the controlled-NOT gate acts as
$|a,b\rangle\mapsto|a,b\oplus a\rangle$. Starting from $|00\rangle$,

```{math}
|00\rangle
\xrightarrow{\hat H_{\mathrm q}\otimes\hat I}
\frac{|00\rangle+|10\rangle}{\sqrt2}
\xrightarrow{\mathrm{CNOT}}
\frac{|00\rangle+|11\rangle}{\sqrt2}.
```

The Hadamard creates a superposition in $A$; the controlled operation then
correlates each alternative with a distinguishable state of $B$. A
reversible unitary process has produced a pure entangled state, with no
measurement involved anywhere.

This last point deserves emphasis: entanglement is created by ordinary
unitary evolution acting on a product input, just as a beam splitter
followed by a phase shift can entangle two photons, or a spin–spin
interaction term in a Hamiltonian can entangle two initially independent
spins. Chapter 4's rotations and this section's entangling gates are the
same kind of mathematical object—unitary operators—differing only in how
many subsystems they act on jointly.

```{openlyceum} QubitSketch
:label: fig:ch05-qubitsketch-entangling-sim

Drag a Hadamard gate onto qubit $A$ and a controlled-NOT between $A$ and $B$
to build the circuit above. Watch the two Bloch spheres and the joint-state
amplitudes update live, and confirm that measuring $A$ instantly fixes what a
later measurement of $B$ will find.
```

## 5.7 Schmidt decomposition and amount of entanglement

Section 5.2 promised a precise, quantitative way to say "how entangled" a
state is. Every pure state of two finite systems can be expressed in
suitable local orthonormal bases as

```{math}
:label: schmidt-decomposition
|\Psi\rangle=\sum_{k=1}^{r}\sqrt{\lambda_k}
\,|u_k\rangle_A|v_k\rangle_B,
\qquad
\lambda_k\ge0,\quad\sum_k\lambda_k=1.
```

This is the **Schmidt decomposition**. The number $r$ of nonzero
coefficients is the Schmidt rank. A pure state is a product exactly when
$r=1$; it is entangled precisely when $r>1$. The two reduced density
operators share the same nonzero eigenvalues $\lambda_k$:

```{math}
\hat\rho_A=\sum_k\lambda_k|u_k\rangle\langle u_k|,
\qquad
\hat\rho_B=\sum_k\lambda_k|v_k\rangle\langle v_k|.
```

For two qubits, the state

```{math}
|\Psi_\eta\rangle
=\cos\eta\,|00\rangle+\sin\eta\,|11\rangle,
\qquad 0\le\eta\le\frac{\pi}{4},
```

is already written in Schmidt form. At $\eta=0$ it is a product. At
$\eta=\pi/4$ its coefficients are equal and each subsystem is maximally
mixed—the fully entangled case.

A single number summarizing pure-state entanglement is the entropy of
either reduced state:

```{math}
:label: entanglement-entropy
S(\rho_A)=-\operatorname{Tr}(\hat\rho_A\log_2\hat\rho_A)
=-\sum_k\lambda_k\log_2\lambda_k.
```

It is zero for a product state and exactly one bit for a maximally entangled
pair of qubits. This entropy quantifies joint information that is present
in the pair as a whole but absent from either subsystem taken alone.

### Example 5.4: a partially entangled state

Not every entangled state is maximally entangled. Take

```{math}
|\psi\rangle=\sqrt{\frac34}\,|00\rangle+\sqrt{\frac14}\,|11\rangle,
```

already in Schmidt form with $\lambda_1=3/4$, $\lambda_2=1/4$ (compare
equation {eq}`schmidt-decomposition`; this is the $\eta=30^\circ$ member of
the $|\Psi_\eta\rangle$ family above). It does not factor: no choice of
single-system amplitudes reproduces both nonzero coefficients while leaving
the $|01\rangle$ and $|10\rangle$ coefficients zero, so the state is
entangled. Its reduced state is

```{math}
\hat\rho_A=\frac34|0\rangle\langle0|+\frac14|1\rangle\langle1|,
```

which has $\operatorname{Tr}(\hat\rho_A^2)=9/16+1/16=5/8<1$: $A$ alone is
mixed, confirming the entanglement directly. Its entropy is

```{math}
S(\hat\rho_A)=-\frac34\log_2\frac34-\frac14\log_2\frac14\approx0.811\ \text{bit},
```

less than the $1$ bit of a Bell state. So this state is entangled,
verifiably so, and yet quantifiably "less entangled" than $|\Phi^+\rangle$—
exactly the kind of statement the all-or-nothing language of Section 5.2
could not make precise, but the Schmidt decomposition now can.

### Example 5.5: conditional states in a rotated basis

Write $|\Phi^+\rangle$ as

```{math}
|\Phi^+\rangle
=\frac{|+y,-y\rangle+|-y,+y\rangle}{\sqrt2}.
```

The $y$ records always disagree, even though the $z$ and $x$ records always
agree. Suppose $B$ obtains $+y$. Applying
$\hat I\otimes|+y\rangle\langle+y|$ and normalizing leaves $A$ in
$|-y\rangle$. The joint state determines this conditional preparation
exactly, while the outcome itself is still random. Changing basis reveals a
different correlation pattern without changing the entangled state one bit.

## 5.8 Entanglement, mixtures, and correlation

Correlation alone does not prove entanglement, and it is worth seeing a
clean example where it does not. The mixed state

```{math}
\hat\rho_{\mathrm{class}}
=\frac12|00\rangle\langle00|+\frac12|11\rangle\langle11|
```

has perfect agreement in $z$, just like $|\Phi^+\rangle$. But it lacks the
off-diagonal $|00\rangle\langle11|$ coherence that made $|\Phi^+\rangle$
special. Rewriting $\hat\rho_{\mathrm{class}}$ in the $x$ basis shows that
its $x$ outcomes are completely uncorrelated, whereas the Bell state remains
perfectly correlated there too.

A mixed state is called **separable** if it can be written

```{math}
\hat\rho_{\mathrm{sep}}=\sum_jw_j
\hat\rho_A^{(j)}\otimes\hat\rho_B^{(j)}.
```

Such states can still contain shared classical randomness, but nothing more.
Entangled mixed states cannot be written this way. Bell-inequality violation
certifies entanglement when it occurs, but some entangled mixed states do
not violate any particular Bell test—the choice of measurement matters.

A cleaner illustration of the boundary between separable and entangled is
the **Werner state**,

```{math}
:label: werner-state
\hat\rho_W=p\,|\Phi^+\rangle\langle\Phi^+|+(1-p)\frac{\hat I}{4},
\qquad 0\le p\le1,
```

a mixture of the maximally entangled $|\Phi^+\rangle$ with the maximally
mixed two-qubit background $\hat I/4$, which carries no correlation at all.
At $p=0$ this is two independent, fully random spins; at $p=1$ it is the
pure Bell state. One can show, by direct application of the separable-state
definition above, that $\hat\rho_W$ is separable for $p\le1/3$ and entangled
for $p>1/3$. Mixing in only a little of the entangled state, small $p$,
leaves a separable and therefore classically explicable mixture; only past a
specific threshold does the joint state actually require entanglement to
describe it. "How entangled" a mixed state is, in other words, is not simply
proportional to how much of an entangled state was mixed in.

Curiously, the reduced state $\hat\rho_A=\operatorname{Tr}_B(\hat\rho_W)
=\hat I/2$ for every value of $p$: local measurements at $A$ alone cannot
distinguish any Werner state from any other, entangled or not. Whether
$\hat\rho_W$ is entangled is a fact about the joint state that no amount of
data collected at $A$ alone, or at $B$ alone, can ever reveal.

### Concept check 5.3

The reduced states of $\hat\rho_{\mathrm{class}}$, $|\Phi^+\rangle$, and
every Werner state $\hat\rho_W$ are all $\hat I/2$. Does this mean
"entangled" is not a meaningful physical distinction, since it cannot be
measured locally?

:::{dropdown} Answer
It means entanglement is a property of the *joint* state, not of either
local marginal, so it cannot be certified from $A$'s data or $B$'s data
considered separately. It remains an operationally meaningful and
experimentally testable distinction: comparing the two players' records
after the fact—as in the CHSH statistic of Section 5.5, or the raw joint
probabilities of Section 5.3—distinguishes them perfectly well. "Not locally
measurable" is not the same as "not physically real"; it simply identifies
which experiments are capable of detecting it.
:::

Local unitary operations can rotate the Schmidt bases, but they cannot
change the Schmidt coefficients, the reduced-state purity, or the
entanglement entropy. Creating or destroying entanglement genuinely requires
an interaction, a joint measurement, or discarding information into an
external system—no amount of purely local fiddling will do it.

:::{note} Beyond two subsystems
Three or more entangled qubits raise questions this two-qubit chapter
deliberately sets aside. The state $(|000\rangle+|111\rangle)/\sqrt2$, for
example, does not factor, yet—as you can check by tracing out any one
qubit—every *pair* of its three qubits is left in exactly the unentangled
mixture $\hat\rho_{\mathrm{class}}$ of this section. The three-qubit
correlations are entirely genuinely tripartite; no two of the three qubits
are entangled with each other at all. This is an instance of **monogamy of
entanglement**: a qubit maximally entangled with one partner has none left
over to share with a third. Multipartite entanglement is a rich subject in
its own right and is not developed further here.
:::

### Concept check 5.4

Is $(|00\rangle+|01\rangle)/\sqrt2$ entangled?

:::{dropdown} Answer
No. It factors as $|0\rangle_A(|0\rangle_B+|1\rangle_B)/\sqrt2
=|0\rangle_A|+x\rangle_B$.
:::

### Concept check 5.5

For $|\Phi^+\rangle$, does measuring $B$ create a random result at $A$?

:::{dropdown} Answer
The joint state already predicts correlated records. Conditioning on $B$'s
record changes the state used for predictions at $A$, but without that
record $A$'s local results remain 50--50. No controllable local change
identifies whether or how $B$ was measured.
:::

### Concept check 5.6

Can two different pure joint states have the same reduced state for $A$?

:::{dropdown} Answer
Yes. All four Bell states give $\hat\rho_A=\hat I/2$. Local statistics do not
contain all information in a joint state.
:::

## Summary

- Composite state spaces are tensor products, and their dimensions multiply.
- Product states factor into subsystem states; entangled states do not.
- Joint probabilities can contain perfect correlations while each marginal
  distribution remains random.
- A partial trace gives the state relevant to local measurements.
- Bell correlations violate a bound obeyed by local hidden-variable models
  but do not permit faster-than-light signaling, and quantum mechanics
  itself never exceeds the Tsirelson bound $2\sqrt2$.
- Superposition followed by a controlled gate can create entanglement.
- Entanglement is quantitative, not binary: Schmidt coefficients and
  entanglement entropy measure how far a state is from a product, and mixed
  states such as the Werner state are entangled only above a threshold
  mixing parameter.

## Exercises

1. Expand $|+x\rangle_A|+y\rangle_B$ in the joint $z$ basis.
2. Determine which states factor:
   $(|00\rangle-|10\rangle)/\sqrt2$,
   $(|00\rangle+|11\rangle)/\sqrt2$, and
   $(|00\rangle+|01\rangle+|10\rangle+|11\rangle)/2$.
3. Calculate all joint $z$ probabilities for each Bell state.
4. Rewrite $|\Phi^-\rangle$ in the $x$ basis and describe its correlations.
5. For the singlet, use equation {eq}`singlet-joint` with an angle of
   $60^\circ$ to find all four joint probabilities.
6. Compute $\hat\rho_A$ and the entanglement entropy for
   $\sqrt{2/5}|00\rangle+\sqrt{3/5}|11\rangle$. Is $A$ pure?
7. Show that a product pure state has a pure reduced density operator.
8. Prove from equation {eq}`singlet-joint` that both local marginal
   distributions are $1/2$ for every pair of settings.
9. Use singlet correlations to evaluate the CHSH expression for directions
   with planar angles $0^\circ,90^\circ,45^\circ,-45^\circ$.
10. Write the $4\times4$ matrix of CNOT in the ordered computational basis and
    verify its action on all four basis kets.
11. Start with each computational basis state, apply Hadamard to $A$ and then
    CNOT, and identify the resulting Bell state.
12. Explain why the phrase “each entangled spin has a definite but unknown
    state” fails for $|\Phi^+\rangle$ when both $z$ and $x$ correlations are
    considered.
13. Find the reduced density operators and entanglement entropy of
    $\cos\eta|00\rangle+\sin\eta|11\rangle$.
14. Verify the $y$-basis expansion in Example 5.5 and its anticorrelations.
15. Compare all joint $x$ probabilities of $\hat\rho_{\mathrm{class}}$ and
    $|\Phi^+\rangle$.
16. Prove that applying $\hat U_A\otimes\hat U_B$ does not change the
    eigenvalues of either reduced density operator.
17. For the singlet, evaluate $E(\mathbf a,\mathbf b)$ at relative angles
    $30^\circ$ and $150^\circ$, and explain the sign of each result in terms of
    typical agreement or disagreement between the two records.
18. Derive the elementary classical CHSH bound directly: for any four numbers
    $A,A',B,B'\in\{+1,-1\}$, show that
    $AB+AB'+A'B-A'B'=A(B+B')+A'(B-B')$, and that this expression cannot exceed
    $2$ in magnitude because $B+B'$ and $B-B'$ cannot both be nonzero.
19. Verify the arithmetic of Example 5.3 by direct substitution into equation
    {eq}`singlet-correlation`, and find one nearby setting—a small deviation
    from the $45^\circ$-spaced configuration of Section 5.5—that still
    violates the classical bound of $2$.
20. Show that the reduced state $\hat\rho_A$ of the Werner state
    {eq}`werner-state` equals $\hat I/2$ for every value of $p$, by computing
    the partial trace of both terms separately.
21. For $p=1/2$, decide whether the Werner state is separable or entangled and
    justify your answer using the threshold stated in Section 5.8.
22. Verify that the two-qubit reduced state of the GHZ state
    $(|000\rangle+|111\rangle)/\sqrt2$, obtained by tracing out any one qubit,
    equals $\hat\rho_{\mathrm{class}}$ from Section 5.8. Explain why this shows
    the pairwise correlations contain no entanglement even though the
    three-qubit state does not factor.
23. Two spins are prepared independently, each in $|+z\rangle$, so the joint
    state is a product. If $A$ is measured along $\mathbf a$ and $B$ along
    $\mathbf b$, find $E(\mathbf a,\mathbf b)$ and show that the resulting CHSH
    combination cannot exceed the classical bound of $2$ for any four
    settings.
24. A student claims that because $\hat\rho_A=\hat I/2$ for $|\Phi^+\rangle$,
    the two spins "must actually be independently random, like a coin flip on
    each side." Using the CHSH violation of Section 5.5, explain precisely
    what is wrong with this claim.
25. Show that applying a local phase gate $\hat S\otimes\hat I$, with
    $\hat S=\operatorname{diag}(1,i)$, to $|\Phi^+\rangle$ changes the state
    but not its Schmidt coefficients or entanglement entropy.
26. Construct the two-qubit state produced by applying CNOT (control $A$,
    target $B$) to $|+x\rangle_A|0\rangle_B$, and show it is a Bell state.
27. Compute the entanglement entropy for Schmidt coefficients
    $\lambda_1=0.9,\lambda_2=0.1$ and compare it with the $0.811$-bit result of
    Example 5.4. Which state is closer to a product state, and does the
    entropy order match your intuition?
28. For a general two-qubit pure state written in Schmidt form with
    $\lambda_1=\cos^2\eta$, $\lambda_2=\sin^2\eta$, argue from the shape of
    $-\lambda\log_2\lambda-(1-\lambda)\log_2(1-\lambda)$ as a function of
    $\lambda\in[0,1]$ that the entanglement entropy is maximized at
    $\eta=\pi/4$ and vanishes at $\eta=0$ or $\pi/2$.
29. Two experimentalists share $10{,}000$ singlet pairs and measure CHSH
    correlations using the optimal $45^\circ$-spaced settings of Section 5.5.
    Each correlation estimate is subject to the same $1/\sqrt N$ statistical
    fluctuation discussed in Chapter 1. Estimate the order of magnitude of the
    statistical uncertainty in $S$, and explain why a modest violation just
    above $2$, rather than any positive excess at all, is needed before ruling
    out statistical fluctuation as an explanation.
30. Explain, in your own words, why "the two spins are entangled" and "the two
    spins are correlated" are not synonyms, using $\hat\rho_{\mathrm{class}}$
    and $|\Phi^+\rangle$ as your two contrasting examples.
31. A colleague proposes building a faster-than-light telegraph by having $A$
    choose to measure in the $z$ basis to send a "$0$" and the $x$ basis to
    send a "$1$," using a shared $|\Phi^+\rangle$ pair with $B$ far away.
    Using the results of Sections 5.3 and 5.4, explain specifically what $B$
    would need to do to detect which basis $A$ used, and why the attempt
    fails.
32. Using the definition of a separable mixed state in Section 5.8, verify
    explicitly that $\hat\rho_{\mathrm{class}}=\tfrac12|00\rangle\langle00|
    +\tfrac12|11\rangle\langle11|$ has the separable form
    $\sum_jw_j\hat\rho_A^{(j)}\otimes\hat\rho_B^{(j)}$, and identify the
    weights $w_j$ and single-qubit states explicitly.
