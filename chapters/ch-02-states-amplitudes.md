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
- translate among the $x$, $y$, and $z$ spin bases;
- distinguish a coherent pure state from a classical mixture;
- in the optional extension, construct spinors for an arbitrary analyzer
  direction; and
- add amplitudes for coherent alternatives and probabilities for exclusive
  recorded routes.

The subsections labeled "optional extension" provide compact matrix machinery
for readers ready to go further; the core conceptual path does not depend on
them.

## 2.1 States are vectors

Chapter 1 ended with a wish list: whatever mathematical object represents a
spin state, it needs two mutually exclusive outcomes for every analyzer
direction, a way to represent a preparation that is certain for one of them,
continuous families of other preparations, and phase information that can
produce interference. An ordinary table of probabilities cannot do all of
this at once, because it has no room for phase. Complex vectors can, and this
chapter makes that idea precise.

:::{note} Prerequisite review: complex-number arithmetic
Skip this box if complex numbers are already familiar. If your last exposure
to them was in an algebra class and feels distant, read it before continuing;
the notation introduced here is used in the first state calculations below.

A complex number is a pair of real numbers, $x$ and $y$, packaged as
$z=x+iy$, where $i^2=-1$. Complex numbers add component by component, while
multiplication follows the ordinary rules of algebra with $i^2$ replaced by
$-1$:

```{math}
(2+3i)+(1-5i)=3-2i,
\qquad
(2+3i)(1-5i)=17-7i.
```

The **complex conjugate** of $z=x+iy$ is $z^*=x-iy$. Multiplying a number by
its conjugate produces its nonnegative squared **modulus**:

```{math}
z^*z=(x-iy)(x+iy)=x^2+y^2=|z|^2.
```

Thus $z=3+4i$ has $z^*=3-4i$ and $|z|=5$. A probability built from a complex
amplitude $z$ is $|z|^2=z^*z$, never $z^2$. For example,
$|i/2|^2=1/4$, whereas $(i/2)^2=-1/4$ cannot be a probability.

Geometrically, $z=x+iy$ is an arrow in a plane. Its length is $r=|z|$, and
its angle $\phi$ from the real axis is its **phase**. Polar form records both:

```{math}
z=x+iy=r\cos\phi+ir\sin\phi=re^{i\phi},
```

where Euler's formula states $e^{i\phi}=\cos\phi+i\sin\phi$. Conjugation
reverses the phase, $z^*=re^{-i\phi}$, without changing the magnitude.
:::

The notation $|\cdot\rangle$, read "ket," simply names a vector in that
complex vector space. There is no more mystery in the symbol than in writing
$\vec v$ for an arrow in ordinary space—it is just a label, chosen to remind
us that we are working with a state rather than an ordinary number.

:::{note} Quick review: vectors, components, and dot products
If vectors and dot products are already second nature to you, skip ahead—
everything here reappears below in the spin context. If not, here is the
ordinary-space picture this chapter builds on.

An arrow $\vec v$ in the plane can be written as a sum of two perpendicular
unit vectors, $\vec v=v_x\hat x+v_y\hat y$, where $\hat x$ and $\hat y$ point
one unit along the two axes. The numbers $v_x$ and $v_y$ are the arrow's
**components**: they say how much of $\hat x$ and how much of $\hat y$ must
be combined to build $\vec v$. Once axes are chosen, it is equivalent, and
often more convenient, to drop the arrow notation entirely and just write the
column of numbers, $\vec v\doteq(v_x,v_y)$.

The **dot product** of two vectors, $\vec u\cdot\vec v=u_xv_x+u_yv_y$,
answers a specific geometric question: how much does one vector "overlap"
with another? Two perpendicular vectors have zero overlap, and a vector
dotted with itself gives the square of its own length,
$\vec v\cdot\vec v=|\vec v|^2$. For a concrete check, $\vec u=(3,4)$ and
$\vec v=(0,1)$ give $\vec u\cdot\vec v=3(0)+4(1)=4$—exactly the $y$-component
of $\vec u$, since $\vec v=\hat y$. Dotting a vector with a basis vector
simply reads off the corresponding component.

Everything below repeats this pattern with two changes: the "components"
$a$ and $b$ are complex numbers rather than real ones, and the dot product is
replaced by an *inner product* built to handle that. Nothing about the
underlying idea—build a vector from basis pieces, then use a product to read
the pieces back off—is new.
:::

The preparation called $z+$ is represented by the ket $|+z\rangle$, and the
preparation $z-$ by $|-z\rangle$. These two state vectors form an orthonormal
basis for the spin state space: every other spin-$\tfrac12$ preparation can be
built from them by superposition, in exact analogy to how two perpendicular
unit vectors span a plane. Any pure spin state can therefore be written

```{math}
:label: general-z-state
|\psi\rangle=a|+z\rangle+b|-z\rangle,
```

where $a$ and $b$ are complex numbers. Think of $a$ and $b$ as *coordinates*:
they fix how much of $|+z\rangle$ and how much of $|-z\rangle$ go into
building $|\psi\rangle$, in the same way that the numbers $3$ and $4$ fix an
arrow once we agree on $x$- and $y$-axes. They are not themselves
probabilities—Section 2.3 will show exactly how probabilities are built from
them.

It is often convenient to write $|\psi\rangle$ as a column of numbers.
Choosing the representation

```{math}
:label: z-basis-columns
|+z\rangle\doteq
\begin{pmatrix}1\\0\end{pmatrix},\qquad
|-z\rangle\doteq
\begin{pmatrix}0\\1\end{pmatrix},
```

gives $|\psi\rangle\doteq(a,b)^{\mathsf T}$. The symbol $\doteq$ means "is
represented, in the chosen basis, by." A ket is an abstract vector; a column
matrix is only its representation once a basis has been chosen.

This distinction is the same one made for an ordinary geometric vector. The
arrow in space is not identical to the list of three numbers used to
represent it: rotating the coordinate axes changes the numbers but not the
arrow itself. In exactly the same way, a spin ket does not change when we
rewrite it in the $x$ basis instead of the $z$ basis—only its column of
numbers changes.

### Superposition is a physical principle

Because states are vectors, any nonzero linear combination of two allowed
states can be normalized to represent an allowed state. This is the
**superposition principle**, and it says
something stronger than "the atom is secretly in one state or the other." In

```{math}
|\psi\rangle=a|+z\rangle+b|-z\rangle,
```

the complex coefficients preserve phase information that can affect a later
measurement. Compare this with a classical mixture, in which a fraction
$|a|^2$ of atoms is separately prepared in $z+$ and the rest in $z-$. That
mixture and the superposition above generally make *different* predictions,
even though both give the same probabilities for a $z$ measurement. The
section on pure states and mixtures makes this comparison explicit.

## 2.2 Bras and inner products

A ket by itself cannot yet produce a number we could compare to laboratory
data—it is a direction in an abstract space, not a prediction. To extract
predictions, we pair every ket $|\psi\rangle$ with a companion object called a
**bra**, written $\langle\psi|$. A bra combines with a ket to its right to
produce a single complex number, called the inner product. This pairing is
what lets us ask "how much of outcome $\phi$ is contained in state $\psi$?"
and get back a definite amplitude. The bra corresponding to $|\psi\rangle$ is
its Hermitian conjugate,

```{math}
\langle\psi|=a^*\langle+z|+b^*\langle-z|
\doteq \begin{pmatrix}a^*&b^*\end{pmatrix}.
```

The $z$ basis is orthonormal, meaning each basis ket has unit length and the
two are perpendicular in the sense of the inner product:

```{math}
:label: z-orthonormality
\langle+z|+z\rangle=\langle-z|-z\rangle=1,
\qquad
\langle+z|-z\rangle=\langle-z|+z\rangle=0.
```

Using these two facts, pairing $\langle\psi|$ with $|\psi\rangle$ gives

```{math}
:label: norm-state
\langle\psi|\psi\rangle=|a|^2+|b|^2.
```

A physical pure state is normalized, meaning $|a|^2+|b|^2=1$. If a nonzero
vector $|v\rangle$ is not already normalized, we can always rescale it into a
valid physical state by dividing by its length:

```{math}
|\psi\rangle=\frac{|v\rangle}{\sqrt{\langle v|v\rangle}}.
```

### Example 2.1: normalization

Normalize $|v\rangle=2|+z\rangle+(1+i)|-z\rangle$. Applying equation
{eq}`norm-state` term by term, the first coefficient contributes
$|2|^2=4$ and the second contributes
$|1+i|^2=(1+i)^*(1+i)=(1-i)(1+i)=1+1=2$, so the squared norm is
$\langle v|v\rangle=4+2=6$, hence

```{math}
|\psi\rangle=\frac{1}{\sqrt6}
\left(2|+z\rangle+(1+i)|-z\rangle\right).
```

### Algebra check

If $|\chi\rangle=(|+z\rangle-i|-z\rangle)/\sqrt2$, what are
$\langle\chi|$ and $\langle\chi|\chi\rangle$?

:::{dropdown} Answer
Conjugating the coefficients gives
$\langle\chi|=(\langle+z|+i\langle-z|)/\sqrt2$. Orthonormality then gives
$\langle\chi|\chi\rangle=1/2+1/2=1$.
:::

### Inner-product habits

Three small algebraic rules prevent most early errors. First, swapping the
order of an inner product conjugates it:

```{math}
\langle\phi|\psi\rangle=\langle\psi|\phi\rangle^*.
```

Second, a bra acts linearly on a ket to its right:

```{math}
\langle\phi|(a|u\rangle+b|v\rangle)
=a\langle\phi|u\rangle+b\langle\phi|v\rangle.
```

Third, the inner product is **conjugate-linear in its first slot**. If a ket
is combined first and then converted into a bra, its coefficients are
conjugated:

```{math}
\langle a u+b v|\psi\rangle
=a^*\langle u|\psi\rangle+b^*\langle v|\psi\rangle.
```

For example, if $|\phi\rangle=(|+z\rangle+i|-z\rangle)/\sqrt2$, then
$\langle\phi|=(\langle+z|-i\langle-z|)/\sqrt2$. Once a bra has already been
written as a row, ordinary row–column multiplication is linear in the entries
of that row. Keeping these two statements separate prevents the common error
of forgetting conjugation when forming the bra.

### Complex numbers as amplitude geometry

Complex numbers enter quantum mechanics because an amplitude needs to carry
both a magnitude and a phase at once, and a single real number cannot do
that. In polar form,

```{math}
z=re^{i\phi}=r(\cos\phi+i\sin\phi),
\qquad
z^*=re^{-i\phi},
\qquad
|z|^2=z^*z=r^2.
```

Multiplying two amplitudes multiplies their magnitudes and adds their
phases. Adding two amplitudes is ordinary geometric addition in the complex
plane—and this is the key fact that makes interference possible. Because
vectors in a plane can point in opposite directions, two *nonzero* amplitudes
can add to *zero*. For example,

```{math}
\frac12+\left(-\frac12\right)=0,
```

even though the squared magnitude of each term separately is $1/4$. This
possibility—two nonzero contributions canceling exactly—is the algebraic core
of destructive interference.

For arbitrary amplitudes $A_1$ and $A_2$, expanding $|A_1+A_2|^2$ directly
gives

```{math}
:label: two-amplitude-interference
|A_1+A_2|^2
=|A_1|^2+|A_2|^2+2\operatorname{Re}(A_1^*A_2).
```

The final term is the **interference term**. It depends on the relative
phase between $A_1$ and $A_2$, and it can be positive, negative, or zero. If
the two alternatives are instead recorded separately, or their relative
phase is randomized by the apparatus, this cross term averages to zero and
only $|A_1|^2+|A_2|^2$ remains—the ordinary rule for adding probabilities of
mutually exclusive events.

:::{figure} ../images/figures/ch02-complex-amplitudes.svg
:name: fig-complex-amplitudes
:alt: An Argand diagram shows a complex amplitude as an arrow with magnitude and phase. A second diagram adds two amplitude arrows head to tail to form their complex sum.
:width: 100%

A complex amplitude is a two-dimensional arrow: its length is the magnitude
and its direction is the phase. Coherent alternatives interfere because these
arrows add before the squared magnitude is taken.
:::

:::{admonition} Algebra checkpoint
:class: tip
Do not replace $|A_1+A_2|^2$ by $|A_1|^2+|A_2|^2$ unless the physical
alternatives are distinguishable or incoherent. Whether a cross term belongs
in the calculation is decided by the apparatus, not by algebraic convenience.
:::

## 2.3 The Born rule

We now have the machinery to turn a state into an actual prediction. The
amplitude for obtaining $z+$ from $|\psi\rangle$ is
$\langle+z|\psi\rangle=a$—simply the coefficient of $|+z\rangle$ in the
expansion of $|\psi\rangle$. The probability of that outcome is the squared
magnitude of that amplitude:

```{math}
:label: born-z
P(z+\mid\psi)=|\langle+z|\psi\rangle|^2=|a|^2,
\qquad
P(z-\mid\psi)=|b|^2.
```

This rule for turning an amplitude into a probability is the **Born rule**,
and it is one of the central postulates of quantum mechanics. Notice that the
order matters in the amplitude: the bra labels the possible measurement
outcome, and the ket labels the prepared state.

Because the $z$ basis spans the state space, the two overlaps recover the
whole ket:

```{math}
|\psi\rangle
=\langle+z|\psi\rangle|+z\rangle
 +\langle-z|\psi\rangle|-z\rangle.
```

Comparing this with equation {eq}`general-z-state` shows that $a$ and $b$ are
precisely the amplitudes $\langle+z|\psi\rangle$ and
$\langle-z|\psi\rangle$. Chapter 3 will package this basis expansion into an
identity operator after operators have been introduced.

:::{figure} ../images/figures/ch02-born-rule-projection.svg
:name: fig-born-rule-projection
:alt: A state is expanded using two complex amplitudes, one for z plus and one for z minus. A bar chart shows that their squared magnitudes are the two outcome probabilities and sum to one.
:width: 100%

Expansion in a measurement basis produces complex amplitudes; the Born rule
turns their squared magnitudes into normalized outcome probabilities. Each
amplitude can carry a phase even though the probability bars cannot show it.
:::

### A probability calculation in four steps

For any ideal spin measurement, the same workflow applies:

1. Write the prepared ket and the outcome ket in a common basis.
2. Hermitian-conjugate the outcome ket to make the bra.
3. Form the amplitude $\langle\text{outcome}|\text{prepared}\rangle$.
4. Take its squared magnitude, and check that all exclusive outcome
   probabilities sum to one.

The amplitude computed in step 3 is generally complex, and there is no
requirement that it lie between zero and one—only its squared magnitude in
step 4 is a probability. Keeping the amplitude, rather than squaring it
immediately, is essential whenever the alternative will later be recombined
with another one.

### Concept check 2.1

After computing $\langle\phi|\psi\rangle=-i/2$, a student reports a
probability of $-i/2$. What should the student report instead?

:::{dropdown} Answer
The amplitude may be complex, but the probability is its squared magnitude:
$|-i/2|^2=1/4$.
:::

## 2.4 Changing the question means changing the basis

Every measurement so far has used the $z$ basis, but nothing forces that
choice—an analyzer built along $x$ or $y$ asks a different physical question,
and it needs its own basis kets. The 50–50 result alone fixes the magnitudes of
the two $z$-basis coefficients but not their relative phases. The formulas
below therefore contain two ingredients: equal magnitudes demanded by the
experiment, and a standard phase convention that ties the labels $x$ and $y$
to perpendicular directions in physical space. Chapter 3 will recover the
same kets as eigenvectors of the spin-component matrices. With that convention,
the $x$ basis is

```{math}
:label: x-states
|+x\rangle=\frac{1}{\sqrt2}\left(|+z\rangle+|-z\rangle\right),
\qquad
|-x\rangle=\frac{1}{\sqrt2}\left(|+z\rangle-|-z\rangle\right).
```

And the $y$ basis is

```{math}
:label: y-states
|+y\rangle=\frac{1}{\sqrt2}\left(|+z\rangle+i|-z\rangle\right),
\qquad
|-y\rangle=\frac{1}{\sqrt2}\left(|+z\rangle-i|-z\rangle\right).
```

### Example 2.2: a relative phase becomes a definite result

Prepare

```{math}
|\psi\rangle=\frac{1}{\sqrt2}
\left(|+z\rangle+i|-z\rangle\right)
```

and ask for the probability of $y+$. From equation {eq}`y-states`,

```{math}
\langle+y|=\frac{1}{\sqrt2}(\langle+z|-i\langle-z|).
```

Therefore

```{math}
\langle+y|\psi\rangle
=\frac12\left(1+(-i)i\right)=1,
```

so $P(y+)=1$ and $P(y-)=0$. The state is exactly $|+y\rangle$, written in the
$z$ basis. This deliberately simple example exposes the important algebra:
the $i$ in the ket becomes $-i$ in the bra, and $(-i)i=1$. A missed complex
conjugation would destroy the certainty that defines the $y+$ state.

Let's check that this reproduces the known result. Applying the Born rule to
a $z+$ input,

```{math}
P(x+\mid z+)=|\langle+x|+z\rangle|^2
=\left|\frac{1}{\sqrt2}\right|^2=\frac12,
```

exactly as observed in Chapter 1. To express any state $|\psi\rangle$ in the
$x$ basis instead of the $z$ basis, project it onto the two $x$-basis kets:

```{math}
|\psi\rangle
=|+x\rangle\langle+x|\psi\rangle
 +|-x\rangle\langle-x|\psi\rangle.
```

It is important to see what has and has not changed here. No physical state
has changed—the atom's preparation is exactly what it was. Only the
*coordinates* used to describe that state have changed, in the same way that
rewriting an arrow's components in a rotated coordinate frame does not move
the arrow.

### Optional extension: basis-change matrices

The inner-product method above is the core skill. Readers who want a compact
matrix version can organize all the overlaps into one basis-change matrix.

The same calculation can be organized as a single matrix multiplication,
which is often more convenient for bookkeeping. If $[\psi]_z=(a,b)^{\mathsf
T}$ is the column representing $|\psi\rangle$ in the $z$ basis, its $x$-basis
column is

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

Each row of this matrix is one of the $x$-basis bras, written out in $z$
coordinates. A matrix $U$ is called **unitary** when
$U^\dagger U=UU^\dagger=I$; this condition guarantees that lengths and inner
products are preserved. The change-of-basis matrix is unitary, so a properly
normalized state stays normalized after the change of basis. Chapter 3 will
develop operators and unitary matrices systematically. Reading the entries
here as inner products also makes clear
that a basis change is *not* a physical Stern–Gerlach measurement—no outcome
has been selected, and the abstract ket itself has not been disturbed in any
way.

### Quick calculation: carrying out the matrix multiplication

It is worth performing this multiplication by hand once, so that equation
{eq}`z-to-x-change` reads as an ordinary matrix–vector product—row dotted
into column, exactly as in the vector review of Section 2.1—rather than as
an unfamiliar piece of bra–ket bookkeeping. Take
$|\psi\rangle=(|+z\rangle+i|-z\rangle)/\sqrt2$, so
$[\psi]_z=\frac{1}{\sqrt2}\binom1i$. Multiplying,

```{math}
[\psi]_x
=\frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}
\frac{1}{\sqrt2}\binom1i
=\frac12\binom{1+i}{1-i}.
```

The top entry comes from dotting the row $(1,1)$ into the column $(1,i)$,
giving $1+i$; the bottom entry comes from dotting $(1,-1)$ into $(1,i)$,
giving $1-i$; each is then scaled by the $\frac1{\sqrt2}\cdot\frac1{\sqrt2}
=\frac12$ collected from the two prefactors. As a check, normalization must
survive the change of basis:

```{math}
\left|\frac{1+i}{2}\right|^2+\left|\frac{1-i}{2}\right|^2
=\frac12+\frac12=1,
```

confirming directly, by arithmetic rather than by appeal to unitarity alone,
that the $x$-basis column is a properly normalized state.

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
$z$ probabilities, $3/4$ and $1/4$. Probabilities belong to a
state–measurement *pair*, not to the state alone.

## 2.5 Sequential measurements with amplitudes

We can now redo the analyzer chains of Chapter 1 using the vector formalism,
and see that it reproduces the same answers by a more systematic route. If
$+a$ is prepared, $+b$ is selected, and $+c$ is finally detected, the
probability for that selected route is

```{math}
:label: sequential-selected-route
P(+c,+b\mid+a)
=|\langle+c|+b\rangle|^2
 |\langle+b|+a\rangle|^2.
```

The two factors multiply because the first measurement prepares
$|+b\rangle$, and it is *that* state, not the original $|+a\rangle$, which
enters the second stage. It would be incorrect to replace this product with
$|\langle+c|+a\rangle|^2$: the intervening selected measurement genuinely
changes the state, and the calculation must reflect that.

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
Equation {eq}`sequential-selected-route` applies when the intermediate
result is recorded or filtered, so the state is updated. If intermediate
alternatives remain coherent and are recombined, their **amplitudes** must be
added before squaring. The apparatus determines which calculation is
appropriate.
:::

## 2.6 Relative and overall phase

Not every phase in a ket matters physically, and it is important to know
which ones do. Multiplying an entire ket by an overall phase does not change
any probability at all:

```{math}
|\psi'\rangle=e^{i\gamma}|\psi\rangle,
\qquad
|\langle\phi|\psi'\rangle|^2
=|e^{i\gamma}|^2|\langle\phi|\psi\rangle|^2.
```

Since $|e^{i\gamma}|^2=1$, the kets $|\psi\rangle$ and $e^{i\gamma}|\psi\rangle$
represent exactly the same physical state, for any choice of $\gamma$.

A **relative phase**—one that appears on only one term of a superposition,
not on the whole ket—is entirely different, and it does change interference.
Compare

```{math}
\frac{|+z\rangle+|-z\rangle}{\sqrt2}=|+x\rangle
\quad\text{with}\quad
\frac{|+z\rangle-|-z\rangle}{\sqrt2}=|-x\rangle.
```

### Concept check 2.2

Do $|+y\rangle$ and $|-y\rangle$ differ only by an overall phase?

:::{dropdown} Answer
No. If $|-y\rangle=c|+y\rangle$, matching the $|+z\rangle$ coefficient
requires $c=1$, while matching the $|-z\rangle$ coefficient requires $c=-1$.
They are orthogonal states, not two representations of the same state.
:::

Both $|+x\rangle$ and $|-x\rangle$ give 50–50 probabilities in the $z$
basis—the two states look identical if all we ever do is measure $S_z$. Yet
a relative sign is all that separates them, and an $S_x$ measurement
distinguishes them perfectly. This is the essential fact about relative
phase: it can be completely invisible to one choice of measurement and yet
fully visible to another.

More generally, consider the family of states

```{math}
|\psi_\phi\rangle
=\frac{|+z\rangle+e^{i\phi}|-z\rangle}{\sqrt2},
```

parameterized by a single relative phase $\phi$. Its $x+$ probability is

```{math}
:label: phase-to-probability
P(x+)=\left|\frac{1+e^{i\phi}}{2}\right|^2
=\cos^2\frac{\phi}{2}.
```

### Concept check 2.3

A normalized ket has $P(z+)=P(z-)=1/2$. Is the state determined uniquely?

:::{dropdown} Answer
No. It has the form $(|+z\rangle+e^{i\phi}|-z\rangle)/\sqrt2$. Different
relative phases give different predictions in other bases.
:::

Every member of this family has exactly the same $z$ statistics—a 50–50
split, regardless of $\phi$. Rotating the final analyzer to $x$ is what
converts the otherwise hidden relative phase into a visible count rate.
Interference, seen this way, is not some extra phenomenon bolted onto the
vector formalism; it is simply what ordinary basis projection does to
complex coefficients once more than one term is present.

## 2.7 A complete coherent path calculation

We can now close the experimental loop opened in Chapter 1. Consider an ideal
device that splits $z+$ into coherent $x+$ and $x-$ paths and then implements
the inverse routing operation, returning both paths to the same spatial and
motional state. With no uncontrolled path-dependent phase, the amplitude for
each final outcome is the sum of the two indistinguishable route amplitudes:

```{math}
A(z+)
=\langle+z|+x\rangle\langle+x|+z\rangle
+\langle+z|-x\rangle\langle-x|+z\rangle.
```

The two route amplitudes are each $1/2$, so

```{math}
:label: recombined-z-plus
A(z+)=\frac12+\frac12=1,
\qquad
P(z+)=1.
```

For the other exit,

```{math}
:label: recombined-z-minus
A(z-)
=\langle-z|+x\rangle\langle+x|+z\rangle
+\langle-z|-x\rangle\langle-x|+z\rangle
=\frac12-\frac12=0.
```

The mathematics describes the ideal apparatus specified above; merely writing
a sum over intermediate states would not prove that an arbitrary physical
beam splitter preserves coherence or recombines every other degree of freedom.

### Concept check 2.4

Both route amplitudes in equation {eq}`recombined-z-minus` have squared
magnitude $1/4$. Why is the final probability zero rather than $1/2$?

:::{dropdown} Answer
The routes are indistinguishable and must be added as complex amplitudes.
Their relative minus sign makes the sum zero. Adding the two route
probabilities would describe a different apparatus—one that records or
decoheres the intermediate alternatives.
:::

The cancellation is valid only because the intermediate $x$ result was never
recorded. If it *is* recorded, the two complete routes become exclusive, and
we add their probabilities:

```{math}
P_{\mathrm{recorded}}(z+)
=\left|\frac12\right|^2+\left|\frac12\right|^2
=\frac12.
```

The same route magnitudes produce certainty or a 50–50 split depending on
whether the intermediate alternatives remain coherent.

### Concept check 2.5

Does changing the phase convention of $|-x\rangle$ change the interference
prediction?

:::{dropdown} Answer
No. A phase assigned to the intermediate basis ket appears once in a ket
overlap and once with the opposite sign in the corresponding bra overlap. It
cancels from each complete route amplitude. Observable interference depends
on physical relative phases introduced by transformations, not on basis
notation.
:::

### A controllable phase

Suppose one path adds a phase $e^{i\delta}$ before recombination, perhaps
because it travels a slightly longer distance. Repeating the calculation,

```{math}
A(z+)=\frac{1+e^{i\delta}}{2},
\qquad
A(z-)=\frac{1-e^{i\delta}}{2},
```

so that

```{math}
:label: two-path-spin-fringes
P(z+)=\cos^2\frac{\delta}{2},
\qquad
P(z-)=\sin^2\frac{\delta}{2}.
```

At $\delta=0$, the original $z+$ preparation is recovered. At $\delta=\pi$,
the two exits exchange roles and $z-$ occurs with certainty. In between, a
continuously adjustable phase controls discrete detector outcomes through
continuously changing ensemble frequencies.

The calculation supplies a reusable rule:

1. identify each complete, indistinguishable route to one final record;
2. multiply amplitudes along each route;
3. include every transformation phase;
4. add the route amplitudes; and
5. square the magnitude only after the coherent sum is complete.

If a record distinguishes routes, group together only routes that remain
indistinguishable to that record, and add probabilities between the resulting
exclusive groups.

## 2.8 The Bloch-sphere coordinates

After normalizing a state and discarding its irrelevant overall phase, every
pure spin-$\tfrac12$ state can be written in the standard form

```{math}
:label: bloch-state
|\psi\rangle=
\cos\frac{\theta}{2}|+z\rangle
+e^{i\phi}\sin\frac{\theta}{2}|-z\rangle,
```

with $0\leq\theta\leq\pi$ and $0\leq\phi<2\pi$. Because only two real
parameters remain once normalization and overall phase are fixed, the angles
$(\theta,\phi)$ locate a point on an ordinary sphere—the **Bloch sphere**—and
every possible pure spin state corresponds to exactly one point on it. The
half-angle is essential here, not optional. The angles $(\theta,\phi)$ label a
direction on the Bloch sphere; they should not be confused with a history of
physical rotation undergone by the atom. Chapter 4 will show that when a
representative spinor is physically rotated through $2\pi$, its ket acquires a
minus sign. The corresponding physical ray is unchanged because the sign is
an overall phase, though it can be observed relative to another coherent
amplitude.

```{animation} ch02-bloch-phase-and-mixture
:label: fig-bloch-phase-mixture
:figure: /images/figures/ch02-bloch-phase-and-mixture.svg
:alt: Three Bloch spheres show a pure state as a point on the surface, a change in relative phase as a change in azimuth, and two kets differing by an overall phase at the same Bloch-sphere point.
:width: 100%

The Bloch sphere represents physical pure states rather than individual ket
representatives. Polar angle fixes the relative magnitudes, azimuth fixes the
relative phase, and overall phase has no coordinate because it leaves the
physical state unchanged.
```

For a measurement along a unit vector $\mathbf n$ making angle $\theta$ with
$+z$, equation {eq}`bloch-state` gives

```{math}
:label: malus-spin
P(+\mathbf n\mid +z)=\cos^2\frac{\theta}{2},
\qquad
P(-\mathbf n\mid +z)=\sin^2\frac{\theta}{2}.
```

This spin-$\tfrac12$ rule resembles Malus's law for polarized light, but with
one important difference: it uses *half* the geometric angle on the Bloch
sphere, not the angle itself.

For two arbitrary pure states, let their Bloch angles be
$(\theta_a,\phi_a)$ and $(\theta_b,\phi_b)$. Substituting equation
{eq}`bloch-state` for both kets gives the amplitude

```{math}
\langle+\mathbf b|+\mathbf a\rangle
=\cos\frac{\theta_b}{2}\cos\frac{\theta_a}{2}
+e^{i(\phi_a-\phi_b)}
 \sin\frac{\theta_b}{2}\sin\frac{\theta_a}{2}.
```

Taking its squared magnitude and using the half-angle identities produces

```{math}
|\langle+\mathbf b|+\mathbf a\rangle|^2
=\frac12\left[
1+\cos\theta_a\cos\theta_b
+\sin\theta_a\sin\theta_b\cos(\phi_a-\phi_b)
\right].
```

The expression in square brackets after the $1$ is exactly
$\mathbf a\cdot\mathbf b=\cos\alpha$, where $\alpha$ is the ordinary angle
between the two analyzer directions. Therefore

```{math}
:label: bloch-overlap
|\langle+\mathbf b|+\mathbf a\rangle|^2
=\frac{1+\mathbf a\cdot\mathbf b}{2}
=\cos^2\frac{\alpha}{2}.
```

This completes the derivation, promised in Chapter 1, of the empirical angle
rule from state vectors. Notice a geometric subtlety worth pausing on: orthogonal
directions in ordinary space ($\alpha=90^\circ$) do **not** correspond to
orthogonal kets. They give an overlap probability of $1/2$, not zero. The
state that *is* orthogonal to $|+\mathbf a\rangle$ is $|-\mathbf a\rangle$,
represented by the antipodal, oppositely pointing point on the Bloch sphere.

### Example 2.5: recover Bloch angles from a ket

Consider

```{math}
|\chi\rangle=\frac{\sqrt3}{2}|+z\rangle-\frac{i}{2}|-z\rangle.
```

Comparison with equation {eq}`bloch-state` gives
$\cos(\theta/2)=\sqrt3/2$, so $\theta=\pi/3$. The relative phase is
$e^{i\phi}=-i$, so one convenient choice is $\phi=3\pi/2$. The state
therefore lies $60^\circ$ from $+z$ and points toward negative $y$.

```{phet} quantum-measurement
:screen: 3
:sim-name: Quantum Measurement: Bloch Sphere
:label: fig:ch02-bloch-sphere-sim

Prepare a spin-$\tfrac12$ state and read its $(\theta,\phi)$ coordinates
directly off the sphere, or drag the state vector and watch the ket in
equation {eq}`bloch-state` update to match. Reproduce Example 2.5 by dragging
to $\theta=60^\circ$ and checking the phase the sphere reports.
```

## 2.9 Pure states and mixtures

Section 2.1 promised that a coherent superposition and a classical mixture
are not the same thing, even when they agree on some measurements. We can
now make that comparison precise. A pure state assigns one ket to every
member of an ideally prepared ensemble. Compare the coherent state
$|+x\rangle$ with a different preparation: flip a fair classical coin, and
produce $z+$ on heads and $z-$ on tails. Both preparations give identical $z$
statistics,

```{math}
P(z+)=P(z-)=\frac12.
```

An $x$ measurement, however, tells the two apart immediately. The coherent
$|+x\rangle$ state gives $x+$ with certainty, by construction. For the
coin-toss ensemble, half of the atoms began in $z+$ and half in $z-$; each of
those subensembles independently gives 50–50 $x$ results, so the combined
statistics also remain 50–50.

```{phet} quantum-coin-toss
:label: fig:ch02-quantum-coin-toss-sim

Compare a classical biased coin with a quantum "coin" prepared in
superposition. Both can be tuned to land heads half the time, yet only the
quantum coin has a measurement basis—an analogue of the $x$ analyzer
above—in which the 50–50 outcome disappears entirely.
```

No single ket can represent that classical mixture—there is simply no linear
combination of $|+z\rangle$ and $|-z\rangle$ that reproduces its statistics
in *every* basis. The core operational lesson is therefore: identical
probabilities for one measurement do not prove that two preparations are the
same quantum state.

:::{note} Optional preview: density operators
A later chapter introduces the density operator, which describes pure states
and mixtures within one framework. In the $z$ basis, the two preparations
above will be represented by

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

The off-diagonal entries present in $\hat\rho_{\mathrm{coh}}$ but absent from
$\hat\rho_{\mathrm{mix}}$ are exactly the coherence that can influence
measurements in another basis. This notation is a preview, not a prerequisite
for the remaining sections or exercises.
:::

## 2.10 Optional extension: spinors for an arbitrary direction

The core chapter is complete. This optional extension packages an arbitrary
analyzer orientation into a pair of spinors and a basis-change matrix.

The Bloch-sphere coordinates do more than just label a state—they also give
us the eigenstates of an analyzer built along any direction we like. For an
analyzer oriented along

```{math}
\mathbf n=(\sin\theta\cos\phi,\sin\theta\sin\phi,\cos\theta),
```

a convenient phase convention gives its two outcome states as

```{math}
:label: arbitrary-direction-spinors
|+\mathbf n\rangle
=\cos\frac{\theta}{2}|+z\rangle
+e^{i\phi}\sin\frac{\theta}{2}|-z\rangle,
```

```{math}
|-\mathbf n\rangle
=-e^{-i\phi}\sin\frac{\theta}{2}|+z\rangle
+\cos\frac{\theta}{2}|-z\rangle.
```

A direct calculation shows that each ket has unit norm and that
$\langle+\mathbf n|-\mathbf n\rangle=0$, so together they form a valid
orthonormal basis, exactly as $|\pm z\rangle$, $|\pm x\rangle$, and
$|\pm y\rangle$ did. The overall phase of either ket is conventional:
multiplying $|+\mathbf n\rangle$ or $|-\mathbf n\rangle$ by its own overall
phase changes its coordinates but no outcome probability. The *relative*
phase written inside each ket, by contrast, is not a matter of convention
once the $z$-basis convention has already been fixed.

### Checking special cases first

Before applying equation {eq}`arbitrary-direction-spinors` to an unfamiliar
direction, it is a good habit to check that it reproduces the three
directions already known, since a mistake in a general formula often shows
up as soon as you specialize it. Setting $\theta=0$ (pointing along $+z$)
gives $|+\mathbf n\rangle=|+z\rangle$, exactly as it should, since the
formula's $\phi$-dependent term is multiplied by $\sin(\theta/2)=0$. Setting
$\theta=\pi/2,\ \phi=0$ (pointing along $+x$) gives
$|+\mathbf n\rangle=(|+z\rangle+|-z\rangle)/\sqrt2=|+x\rangle$, matching
equation {eq}`x-states`. Setting $\theta=\pi/2,\ \phi=\pi/2$ (pointing along
$+y$) gives $|+\mathbf n\rangle=(|+z\rangle+i|-z\rangle)/\sqrt2=|+y\rangle$,
matching equation {eq}`y-states`. With these three checks passed, the
formula can be trusted for a direction that is not simply one of the six
coordinate poles.

### Example 2.6: an analyzer not in a coordinate plane

Let $\theta=2\pi/3$ and $\phi=\pi/2$. Then

```{math}
|+\mathbf n\rangle
=\frac12|+z\rangle+i\frac{\sqrt3}{2}|-z\rangle.
```

A $z+$ input gives

```{math}
P(+\mathbf n\mid z+)
=|\langle+\mathbf n|+z\rangle|^2
=\frac14.
```

The same result follows from the real-space angle rule:
$\cos^2(\theta/2)=\cos^2(\pi/3)=1/4$. Notice that the azimuth $\phi$ does not
affect a $z+$ input, because rotating the analyzer around $z$ leaves its
angle from the preparation axis unchanged. It does affect inputs that carry
their own transverse phase information.

The column matrix whose two columns are the two spinors above,

```{math}
:label: direction-basis-matrix
V_{\mathbf n}=
\begin{pmatrix}
\cos(\theta/2)&-e^{-i\phi}\sin(\theta/2)\\
e^{i\phi}\sin(\theta/2)&\cos(\theta/2)
\end{pmatrix},
```

is unitary, and it converts coordinates between the analyzer basis and the
$z$ basis. Its columns describe how the *new* basis vectors look in *old*
coordinates, while $V_{\mathbf n}^\dagger$ performs the reverse change,
from old coordinates to new. Keeping those two directions of conversion
straight prevents a common basis-change error.

## Summary

- A ket is an abstract state vector; its column depends on the chosen basis.
- Inner products produce amplitudes, and squared magnitudes produce
  probabilities.
- An orthonormal basis supplies expansion amplitudes through inner products.
- Overall phase is unobservable, while relative phase controls interference.
- Every pure spin-$\tfrac12$ state corresponds to a point on the Bloch
  sphere.
- A selected intermediate result resets the state used in subsequent
  amplitudes, while unobserved coherent alternatives must be added at the
  amplitude level.
- A coherent superposition and a classical mixture can agree in one basis
  and disagree in another.
- In the optional extension, arbitrary analyzer directions correspond to
  orthonormal spinors whose half-angle coordinates form a unitary
  basis-change matrix.
- Coherent routes are multiplied along each route and added across
  indistinguishable alternatives before the Born rule is applied.

## Exercises

Exercises 1–7 establish the core notation and probability skills, 8–14
consolidate basis changes, phases, and mixtures, and 15–21 are extensions on
arbitrary directions and coherent paths. Complete the first group before
moving to the more algebraic problems.

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
13. Without using density operators, show that a coherent $|+x\rangle$
    preparation gives $x+$ with certainty while a 50–50 classical mixture of
    $z+$ and $z-$ gives $P(x+)=1/2$. State where probabilities, rather than
    amplitudes, must be added in the mixture calculation.
14. Construct two physically different ensembles that give identical $z$
    statistics. Specify one additional analyzer orientation that distinguishes
    them, and calculate the predicted probabilities.
15. Verify the normalization and orthogonality of the two spinors in equation
    {eq}`arbitrary-direction-spinors`.
16. Write $|-\mathbf n\rangle$ for $\theta=\pi/2$ and $\phi=\pi/2$. Identify it
    as one of the six coordinate-axis states, up to overall phase.
17. Verify by direct matrix multiplication that $V_{\mathbf n}^\dagger
    V_{\mathbf n}=\hat I$ for equation {eq}`direction-basis-matrix`.
18. Starting from equation {eq}`two-amplitude-interference`, let
    $A_1=a$ and $A_2=be^{i\delta}$ for real nonnegative $a$ and $b$. Find the
    largest and smallest possible total probabilities as $\delta$ varies.
19. Reproduce equations {eq}`recombined-z-plus` and
    {eq}`recombined-z-minus` with the $y$ basis inserted instead of the $x$
    basis. Track every factor of $i$.
20. A phase shifter adds $e^{i\delta}$ to the $x-$ route of the recombiner.
    Predict both final probabilities for $\delta=\pi/2$, $2\pi/3$, and $\pi$.
21. A path marker leaves the $x+$ route unchanged but correlates the $x-$ route
    with a distinguishable marker state. Explain, without yet using composite
    state notation, why equations {eq}`two-path-spin-fringes` no longer
    describe full-visibility fringes.

## Selected exercise guidance

Use these answers only after making a complete attempt.

:::{dropdown} Exercise 1
The norm is $5$, so the normalized ket is
$(3/5,4i/5)^{\mathsf T}$. The probabilities are $9/25$ and $16/25$.
:::

:::{dropdown} Exercise 5

```{math}
P(y+)=\frac{2+\sqrt3}{4},\qquad
P(y-)=\frac{2-\sqrt3}{4}.
```

The imaginary relative coefficient aligns constructively with $|+y\rangle$
and destructively with $|-y\rangle$.
:::

:::{dropdown} Exercise 12
$\theta=2\pi/3$ and $\phi=\pi/2$. The Bloch vector is
$(0,\sqrt3/2,-1/2)$: it lies $120^\circ$ from $+z$ toward $+y$.
:::

:::{dropdown} Exercise 20
For $\delta=\pi/2$, $(P(z+),P(z-))=(1/2,1/2)$. For $2\pi/3$ the pair is
$(1/4,3/4)$, and for $\pi$ it is $(0,1)$.
:::
