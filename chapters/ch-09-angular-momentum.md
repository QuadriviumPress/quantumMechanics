---
title: Angular Momentum
---

# Angular momentum

## Learning objectives

After this chapter, you should be able to:

- use the angular-momentum commutation relations and ladder operators;
- identify allowed $j,m$ values and measurement probabilities;
- distinguish orbital and intrinsic angular momentum;
- connect orbital eigenstates with spherical harmonics;
- add two angular momenta using coupled and uncoupled bases;
- construct the singlet and triplet states of two spin-$\tfrac12$ systems;
- recover the Pauli matrices of Chapter 3 as the spin-$\tfrac12$ case of the
  general ladder construction; and
- build explicit Clebsch–Gordan coefficients for coupling orbital and spin
  angular momentum.

## 9.1 The angular-momentum algebra

Chapters 1 through 4 introduced spin operationally, through Stern–Gerlach
outcomes, and represented a spin-$\tfrac12$ system's observables by
$\hat{\mathbf S}=\tfrac{\hbar}{2}\boldsymbol\sigma$. That construction was
built directly from the two-outcome apparatus; nothing in it referred to
orbital motion. This chapter asks a more general question: what mathematical
structure makes something "an angular momentum" in quantum mechanics at all?
The answer is not a formula like $\mathbf r\times\mathbf p$—that expression
reappears in Section 9.3, but only as one particular example—but a set of
commutation relations. Anything obeying them, whatever its physical origin,
inherits the entire apparatus developed below: discrete eigenvalues, ladder
operators, and the role of generating rotations. Spin qualifies; so does
orbital motion; so, as Section 9.4 shows, does any sum of angular momenta.

An angular momentum $\hat{\mathbf J}$ is, by definition, any vector operator
whose Cartesian components satisfy

```{math}
:label: angular-commutators
[\hat J_x,\hat J_y]=i\hbar\hat J_z
```

and cyclic permutations. This is exactly the same kind of relation already
proved directly from the Pauli matrices in Chapter 3, equation
{eq}`spin-commutator`: $[\hat S_x,\hat S_y]=i\hbar\hat S_z$. What is new here
is the direction of the logic. Chapter 3 started from a concrete
$2\times2$ matrix representation and *derived* the commutator. This chapter
runs the argument in reverse: it starts from the commutator alone, treated as
the defining property of "an angular momentum," and derives everything
else—the allowed eigenvalues, the ladder construction, even the existence of
representations other than spin-$\tfrac12$—from that one algebraic fact.
Nothing below assumes any particular matrix size in advance.

Before deriving anything from this relation, it is
worth checking that it is physically plausible. Take an ordinary object—a
book, a phone—and rotate it $90^\circ$ about $x$ and then $90^\circ$ about
$y$. Now reset it, and perform the same two rotations in the opposite order.
The final orientations differ. Finite rotations about different axes simply
do not commute, and equation {eq}`angular-commutators` is the quantum
statement of the corresponding infinitesimal fact: the generators of
rotations about different axes cannot commute either. Section 9.3 makes this
connection exact.

Its squared magnitude,

```{math}
\hat J^2=\hat J_x^2+\hat J_y^2+\hat J_z^2,
```

commutes with every component. This is not an additional assumption; it
follows from equation {eq}`angular-commutators` alone. For example,

```{math}
[\hat J^2,\hat J_z]
=[\hat J_x^2,\hat J_z]+[\hat J_y^2,\hat J_z]
=\hat J_x[\hat J_x,\hat J_z]+[\hat J_x,\hat J_z]\hat J_x
+\hat J_y[\hat J_y,\hat J_z]+[\hat J_y,\hat J_z]\hat J_y,
```

and substituting $[\hat J_x,\hat J_z]=-i\hbar\hat J_y$ and
$[\hat J_y,\hat J_z]=i\hbar\hat J_x$ makes every term cancel in pairs. The same
pattern holds for $\hat J_x$ and $\hat J_y$ by the cyclic symmetry of the
algebra. Because $\hat J^2$ commutes with each component, we may choose
simultaneous eigenstates of $\hat J^2$ and any one component—conventionally
$\hat J_z$:

```{math}
:label: jm-eigenvalues
\hat J^2|j,m\rangle
=\hbar^2j(j+1)|j,m\rangle,\qquad
\hat J_z|j,m\rangle=\hbar m|j,m\rangle.
```

The allowed values are

```{math}
j=0,\frac12,1,\frac32,\ldots,\qquad
m=-j,-j+1,\ldots,j.
```

Section 9.2 derives this restriction rather than simply asserting it. For
fixed $j$, the space has dimension $2j+1$. Measuring $J_z$ in an arbitrary
state in that space returns one of the $2j+1$ values $\hbar m$.

### Concept check 9.1

If $J^2=2\hbar^2$, what values can a measurement of $J_z$ return?

:::{dropdown} Answer
$j(j+1)=2$ gives $j=1$, so $m=-1,0,1$ and the possible values are
$-\hbar,0,\hbar$.
:::

### Concept check 9.2

Does $m=0$ imply zero angular momentum?

:::{dropdown} Answer
No. It means only that the selected $z$ component is zero. For $j>0$, the
magnitude remains $\hbar\sqrt{j(j+1)}$.
:::

## 9.2 Ladder operators

Define

```{math}
\hat J_\pm=\hat J_x\pm i\hat J_y.
```

These are not Hermitian—$\hat J_+^\dagger=\hat J_-$—so they do not represent
directly measurable quantities. Their role is purely constructive: acting with
$\hat J_+$ or $\hat J_-$ on an eigenstate produces another eigenstate with $m$
shifted by exactly one unit, which is what lets us build an entire
$j$-multiplet from a single state. The commutators

```{math}
[\hat J_z,\hat J_\pm]=\pm\hbar\hat J_\pm
```

show that $\hat J_\pm|j,m\rangle$ has $m$ shifted by one: applying $\hat J_z$
to $\hat J_\pm|j,m\rangle$ and using the commutator gives eigenvalue
$\hbar(m\pm1)$.

To fix the normalization—and, along the way, to see *why* the ladder must
terminate—compute the squared norm of $\hat J_+|j,m\rangle$ directly. Start
by multiplying out the product $\hat J_-\hat J_+$ term by term, exactly as
you would expand $(a-ib)(a+ib)$ for ordinary numbers:

```{math}
\hat J_-\hat J_+
=(\hat J_x-i\hat J_y)(\hat J_x+i\hat J_y)
=\hat J_x^2+i\hat J_x\hat J_y-i\hat J_y\hat J_x-i^2\hat J_y^2
=\hat J_x^2+\hat J_y^2+i[\hat J_x,\hat J_y].
```

The only difference from ordinary numbers is that $\hat J_x\hat J_y$ and
$\hat J_y\hat J_x$ do not cancel, since $\hat J_x$ and $\hat J_y$ do not
commute—their difference is exactly the commutator $[\hat J_x,\hat J_y]$
that survives in the last term. Substituting
$[\hat J_x,\hat J_y]=i\hbar\hat J_z$ from equation
{eq}`angular-commutators` and $\hat J_x^2+\hat J_y^2=\hat J^2-\hat J_z^2$
then gives

```{math}
\hat J_-\hat J_+
=\hat J^2-\hat J_z^2+i(i\hbar\hat J_z)
=\hat J^2-\hat J_z^2-\hbar\hat J_z.
```

Therefore

```{math}
\big\|\hat J_+|j,m\rangle\big\|^2
=\langle j,m|\hat J_-\hat J_+|j,m\rangle
=\hbar^2\big[j(j+1)-m(m+1)\big].
```

A squared norm can never be negative, so $j(j+1)-m(m+1)\ge0$ for every
physically realized $m$. Equality—a state that $\hat J_+$ annihilates—occurs
exactly when $m=j$, not before and not after. This is the actual reason the
ladder "must terminate": it is forced by the non-negativity of a norm, the
same kind of argument used throughout this book to rule out states that a
formula might otherwise seem to allow. The analogous calculation with
$\hat J_+\hat J_-=\hat J^2-\hat J_z^2+\hbar\hat J_z$ shows that $\hat J_-$
annihilates a state exactly at $m=-j$. Together these fix both ends of the
ladder, and since each application of $\hat J_-$ changes $m$ by exactly one,
they force the number of steps from $m=j$ down to $m=-j$—namely $2j$—to be a
non-negative integer. That is precisely the statement that $j$ itself must be
an integer or a half-integer. Normalizing the resulting states gives

```{math}
:label: angular-ladder
\hat J_\pm|j,m\rangle
=\hbar\sqrt{j(j+1)-m(m\pm1)}
\,|j,m\pm1\rangle.
```

:::{figure} ../images/figures/ch09-angular-momentum-ladder.svg
:name: fig-angular-momentum-ladder
:alt: Five horizontal rungs represent the m values from minus 2 through plus 2 for j equals 2. Raising and lowering arrows connect adjacent rungs and stop at the top and bottom states.
:width: 100%

For fixed $j$, the ladder operators move only among the $2j+1$ allowed
component values. Their action vanishes at $m=\pm j$, so the ladder cannot
continue beyond its two physical endpoints.
:::

The transverse components follow from

```{math}
\hat J_x=\frac{\hat J_++\hat J_-}{2},\qquad
\hat J_y=\frac{\hat J_+-\hat J_-}{2i}.
```

### Example 9.1: a $j=1$ measurement

Let

```{math}
|\psi\rangle=\frac12|1,1\rangle
+\frac{i}{\sqrt2}|1,0\rangle
+\frac12|1,-1\rangle.
```

The $J_z$ probabilities are $1/4,1/2,1/4$, so
$\langle J_z\rangle=0$ and
$\langle J_z^2\rangle=\hbar^2/2$. Hence
$\Delta J_z=\hbar/\sqrt2$. Every term has the same $j$, so a measurement of
$J^2$ gives $2\hbar^2$ with certainty.

### Example 9.2: recovering the Pauli matrices

For $j=\tfrac12$, the ladder relations should reproduce the Pauli-matrix spin
operators of Chapter 3—after all, spin-$\tfrac12$ is nothing but the
$j=\tfrac12$ representation of the same algebra. Order the two basis states as
$|\tfrac12,\tfrac12\rangle$ then $|\tfrac12,-\tfrac12\rangle$. Equation
{eq}`angular-ladder` gives

```{math}
\hat J_+\big|\tfrac12,-\tfrac12\big\rangle
=\hbar\sqrt{\tfrac34-\big(-\tfrac12\big)\big(\tfrac12\big)}
\,\big|\tfrac12,\tfrac12\big\rangle
=\hbar\big|\tfrac12,\tfrac12\big\rangle,
\qquad
\hat J_+\big|\tfrac12,\tfrac12\big\rangle=0,
```

and, by the same formula with the lower sign,
$\hat J_-|\tfrac12,\tfrac12\rangle=\hbar|\tfrac12,-\tfrac12\rangle$ and
$\hat J_-|\tfrac12,-\tfrac12\rangle=0$. In matrix form,

```{math}
\hat J_+\doteq\hbar\begin{pmatrix}0&1\\0&0\end{pmatrix},\qquad
\hat J_-\doteq\hbar\begin{pmatrix}0&0\\1&0\end{pmatrix}.
```

Combining these through $\hat J_x=(\hat J_++\hat J_-)/2$,
$\hat J_y=(\hat J_+-\hat J_-)/2i$, and
$\hat J_z|\tfrac12,\pm\tfrac12\rangle=\pm(\hbar/2)|\tfrac12,\pm\tfrac12\rangle$
gives

```{math}
\hat J_x=\frac{\hbar}{2}
\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
\hat J_y=\frac{\hbar}{2}
\begin{pmatrix}0&-i\\i&0\end{pmatrix},\qquad
\hat J_z=\frac{\hbar}{2}
\begin{pmatrix}1&0\\0&-1\end{pmatrix},
```

which is exactly $\hat{\mathbf J}=(\hbar/2)\boldsymbol\sigma$ with the Pauli
matrices defined in Chapter 3. Nothing about spin was
assumed beyond $j=\tfrac12$: the entire matrix structure of spin-$\tfrac12$
observables, including the noncommutativity that drove Chapters 2 through 4,
is a special case of the abstract ladder construction.

### Concept check 9.3

A calculation of $\langle j,m|\hat J_-\hat J_+|j,m\rangle$ for some candidate
$m$ in the range $-j\le m\le j$ comes out negative. What does this signal?

:::{dropdown} Answer
An error. The quantity equals $\hbar^2[j(j+1)-m(m+1)]$, which is a squared
norm and cannot be negative for any $m$ in the physical range; it reaches zero
only at the top of the ladder, $m=j$. A negative result means an arithmetic
slip, not a new physical possibility.
:::

## 9.3 Orbital angular momentum

For motion in space,

```{math}
\hat{\mathbf L}=\hat{\mathbf r}\times\hat{\mathbf p}.
```

This is the historical origin of the name "angular momentum," and it is one
concrete realization of the abstract algebra of Section 9.1: substituting the
canonical commutator $[\hat x,\hat p]=i\hbar$ (Chapter 6) into the components
of $\hat{\mathbf r}\times\hat{\mathbf p}$ shows directly that they satisfy
equation {eq}`angular-commutators`. In spherical coordinates,

```{math}
\hat L_z=-i\hbar\frac{\partial}{\partial\phi},
```

and the simultaneous eigenfunctions of $\hat L^2$ and $\hat L_z$ are the
spherical harmonics:

```{math}
\hat L^2Y_\ell^m=\hbar^2\ell(\ell+1)Y_\ell^m,\qquad
\hat L_zY_\ell^m=\hbar mY_\ell^m.
```

For orbital motion, single-valued spatial wavefunctions require integer
$\ell=0,1,2,\ldots$. The reason is direct: a wavefunction must return to the
same value after $\phi\to\phi+2\pi$, and $e^{im\phi}$ does that only for
integer $m$, hence integer $\ell$. The intrinsic spin label $s$ may also be
half-integer,
precisely because spin is never built from a spatial wavefunction's dependence
on $\phi$ in the first place—it is defined directly by the abstract algebra of
Section 9.1, with no analogue of "returning to the same value" to enforce.
Both $\hat{\mathbf L}$ and $\hat{\mathbf S}$ obey the same operator algebra,
but spin is not generated by a particle orbiting around an internal path.

A state with sharp $L$ and $L_z$ but indefinite $L_x,L_y$ is often drawn as a
static cone, which makes that indefiniteness look like mere ignorance of a
vector sitting still somewhere on it. The classical system that gets the
geometry right is not static at all.

```{openlyceum} Precession
:label: fig:ch09-precession-sim

A spinning top under gravity: the torque stays perpendicular to $\vec L$, so
steady precession changes the direction of the angular momentum without
changing either its magnitude or its vertical component, walking the vector
around the cone at fixed polar angle exactly as $L_x$ and $L_y$ remain
indefinite while $L$ and $L_z$ stay sharp. This is the same equation of
motion behind the Larmor precession of Chapter 4—a magnetic moment in a field
in place of a top in gravity.
```

### Rotation generators

A rotation through angle $\alpha$ about $\mathbf n$ is

```{math}
:label: angular-rotation
\hat R_{\mathbf n}(\alpha)
=e^{-i\alpha\mathbf n\cdot\hat{\mathbf J}/\hbar}.
```

This is the precise sense in which angular momentum "generates" rotations,
foreshadowed by the noncommuting-rotations argument in Section 9.1: expanding
the exponential to first order in $\alpha$ gives
$\hat R_{\mathbf n}(\alpha)\approx\hat I-i\alpha\,\mathbf n\cdot\hat{\mathbf
J}/\hbar$, so $\hat{\mathbf J}$ is literally the infinitesimal generator, and
composing two small rotations about different axes reproduces
$[\hat J_x,\hat J_y]=i\hbar\hat J_z$ to leading order. For spin $\tfrac12$,
$\hat{\mathbf J}=\hbar\boldsymbol\sigma/2$ and this reduces to the rotation
operator of Chapter 4. Angular momentum is the generator of rotations for
every quantum system.

A striking consequence follows immediately from equation
{eq}`angular-rotation`. A full $2\pi$ rotation about any axis $\mathbf n$
gives $\hat R_{\mathbf n}(2\pi)=e^{-2\pi i\hat J_z/\hbar}$ once evaluated on an
eigenbasis, and acting on $|j,m\rangle$ this is simply the phase $e^{-2\pi
im}$. For integer $j$ (hence integer $m$) this equals $+1$: a full turn
returns the state unchanged, matching classical intuition. For half-integer
$j$, $m$ is also half-integer and $e^{-2\pi im}=-1$: the state acquires an
overall minus sign after one full turn and needs a second full turn to return
to itself. This is not an experimental defect. It is a genuine prediction of
treating spin as a $j=\tfrac12$ angular momentum, and it has been confirmed
directly with neutron interferometry.

### Concept check 9.4

Orbital angular momentum requires integer $\ell$. Does this mean every total
angular momentum encountered in this chapter must be an integer?

:::{dropdown} Answer
No. The integer restriction in this section applies specifically to a spatial
wavefunction's single-valuedness under $\phi\to\phi+2\pi$. Spin is not built
from such a wavefunction, so it can be half-integer, and any system built by
adding an odd number of half-integer spins—Sections 9.4 through 9.6—can have
half-integer total $j$ as well.
:::

## 9.4 Adding two angular momenta

For subsystems with $\hat{\mathbf J}_1$ and $\hat{\mathbf J}_2$, define

```{math}
\hat{\mathbf J}=\hat{\mathbf J}_1+\hat{\mathbf J}_2.
```

Each subsystem might be two different particles' spins, or one particle's
orbital and spin angular momenta, or the total angular momenta of two larger
subsystems already built from more elementary pieces; the algebra does not
care which. The **uncoupled basis** diagonalizes
$\hat J_1^2,\hat J_{1z},\hat J_2^2,\hat J_{2z}$ and is written
$|j_1,m_1;j_2,m_2\rangle$. It is the natural basis for describing the two
subsystems separately. The **coupled basis** diagonalizes
$\hat J_1^2,\hat J_2^2,\hat J^2,\hat J_z$ and is written
$|j_1,j_2;j,m\rangle$. It is the natural basis whenever a physical interaction
or a measurement cares about the *total* angular momentum rather than the two
parts individually—a spin–orbit coupling being the leading example, taken up
in Section 9.6.

The possible totals obey the triangle rule:

```{math}
:label: angular-triangle
j=|j_1-j_2|,|j_1-j_2|+1,\ldots,j_1+j_2.
```

:::{tip} Why a range of totals, and why these particular endpoints?
If $\hat{\mathbf J}_1$ and $\hat{\mathbf J}_2$ behaved like two ordinary
classical arrows of fixed lengths $j_1$ and $j_2$, their vector sum could
range anywhere from $j_1+j_2$ (the two arrows pointing the same way) down to
$|j_1-j_2|$ (the two arrows pointing as oppositely as their lengths allow),
depending on the angle between them. The quantum triangle rule reproduces
exactly this classical range of possible total lengths, even though no
single state has both $\hat{\mathbf J}_1$ and $\hat{\mathbf J}_2$ pointing in
a sharp direction at once. What quantum mechanics adds is that only the
values in equation {eq}`angular-triangle`—spaced one unit apart, never a
continuum—are actually realized, and that a *given* pair of subsystem
states does not have one fixed total $j$; it is generally a superposition
over several allowed values, as Example 9.4 makes concrete below.
:::

In every term of a coupled-state expansion, $m=m_1+m_2$, since
$\hat J_z=\hat J_{1z}+\hat J_{2z}$. The coefficients connecting the two bases
are **Clebsch–Gordan coefficients**. They are not arbitrary: each coupled
state is built, as in the example below, by starting from the unique state of
maximum $m$ and applying $\hat J_-=\hat J_{1-}+\hat J_{2-}$ repeatedly, exactly
as one builds any $j$-multiplet from its top state.

A useful check on any such construction is dimension counting: the uncoupled
basis has $(2j_1+1)(2j_2+1)$ states, and the coupled basis, summing the
multiplicities $(2j+1)$ over the triangle-rule range of $j$, must total the
same number. This bookkeeping catches many errors before a single coefficient
is computed.

:::{figure} ../images/figures/ch09-angular-momentum-addition.svg
:name: fig-angular-momentum-addition
:alt: Two angular-momentum vectors add head to tail under the triangle rule. A second panel shows three orbital states times two spin states reorganizing into a four-state j equals three halves multiplet and a two-state j equals one half multiplet.
:width: 100%

The triangle rule lists the allowed total magnitudes, while dimension counting
checks that the coupled multiplets account for every uncoupled product state.
For $\ell=1$ and $s=1/2$, six states become a quadruplet and a doublet.
:::

### Example 9.3: coupling orbital motion and spin

Couple $j_1=\ell=1$ (a $p$ electron's orbital angular momentum) with
$j_2=s=\tfrac12$ (its spin). The triangle rule allows $j=\tfrac32$ and
$j=\tfrac12$, and the dimension check confirms
$(2\cdot1+1)(2\cdot\tfrac12+1)=6=(2\cdot\tfrac32+1)+(2\cdot\tfrac12+1)=4+2$.
Abbreviate the spin states $|\tfrac12,\pm\tfrac12\rangle$ as
$|{\uparrow}\rangle,|{\downarrow}\rangle$.

The top state is unique, since only one uncoupled combination reaches the
maximum $m=\tfrac32$:

```{math}
\big|\tfrac32,\tfrac32\big\rangle=|1,1\rangle|{\uparrow}\rangle.
```

Lowering with $\hat J_-=\hat L_-+\hat S_-$ and equation {eq}`angular-ladder`
gives $\hat J_-|\tfrac32,\tfrac32\rangle=\hbar\sqrt3\,|\tfrac32,\tfrac12\rangle$
on the left, while on the right $\hat L_-|1,1\rangle=\hbar\sqrt2\,|1,0\rangle$
and $\hat S_-|{\uparrow}\rangle=\hbar|{\downarrow}\rangle$, so

```{math}
\hbar\sqrt3\,\big|\tfrac32,\tfrac12\big\rangle
=\hbar\sqrt2\,|1,0\rangle|{\uparrow}\rangle+\hbar\,|1,1\rangle|{\downarrow}\rangle,
```

Dividing both sides by the common factor $\hbar\sqrt3$ isolates the ket on
the left and turns the two right-hand coefficients into the Clebsch–Gordan
numbers themselves:

```{math}
\big|\tfrac32,\tfrac12\big\rangle
=\frac{\sqrt2}{\sqrt3}\,|1,0\rangle|{\uparrow}\rangle
+\frac{1}{\sqrt3}\,|1,1\rangle|{\downarrow}\rangle,
```

giving

```{math}
:label: cg-example-1
\big|\tfrac32,\tfrac12\big\rangle
=\sqrt{\tfrac23}\,|1,0\rangle|{\uparrow}\rangle
+\sqrt{\tfrac13}\,|1,1\rangle|{\downarrow}\rangle.
```

Repeating the same lowering step (Exercise 18 asks you to check this instead
by lowering from the bottom of the ladder) produces

```{math}
\big|\tfrac32,-\tfrac12\big\rangle
=\sqrt{\tfrac23}\,|1,0\rangle|{\downarrow}\rangle
+\sqrt{\tfrac13}\,|1,-1\rangle|{\uparrow}\rangle,
\qquad
\big|\tfrac32,-\tfrac32\big\rangle=|1,-1\rangle|{\downarrow}\rangle.
```

At $m=\tfrac12$, the uncoupled basis has two states,
$|1,0\rangle|{\uparrow}\rangle$ and $|1,1\rangle|{\downarrow}\rangle$; equation
{eq}`cg-example-1` uses one combination, and the state orthogonal to it must be
the $j=\tfrac12$ state at the same $m$, since $j=\tfrac32$ and $j=\tfrac12$
are the only totals the triangle rule allows. Choosing the conventional phase
(the coefficient of the state with the larger $m_1$ taken positive),

```{math}
:label: cg-example-2
\big|\tfrac12,\tfrac12\big\rangle
=\sqrt{\tfrac23}\,|1,1\rangle|{\downarrow}\rangle
-\sqrt{\tfrac13}\,|1,0\rangle|{\uparrow}\rangle,
\qquad
\big|\tfrac12,-\tfrac12\big\rangle
=\sqrt{\tfrac13}\,|1,0\rangle|{\downarrow}\rangle
-\sqrt{\tfrac23}\,|1,-1\rangle|{\uparrow}\rangle.
```

Equations {eq}`cg-example-1` and {eq}`cg-example-2` give the Clebsch–Gordan
coefficients for $\ell=1$ coupled with $s=\tfrac12$; the same six coefficients
reappear throughout atomic fine structure (Section 9.6) and in any $p$-orbital
spin–orbit problem.

### Concept check 9.5

Why does coupling $\ell=1$ with $s=\tfrac12$ produce one quadruplet
($j=\tfrac32$) and one doublet ($j=\tfrac12$), rather than, say, two doublets
with a state left over?

:::{dropdown} Answer
Dimension counting fixes it: the six uncoupled product states must reorganize
into complete $j$-multiplets. The triangle rule permits only $j=\tfrac32$ and
$j=\tfrac12$, and $(2\cdot\tfrac32+1)+(2\cdot\tfrac12+1)=4+2=6$ exactly
accounts for all six states, with no other combination of allowed $j$ values
doing so.
:::

## 9.5 Two spin-one-half systems

The highest state is uniquely

```{math}
|1,1\rangle=|+z,+z\rangle.
```

Applying the total lowering operator
$\hat J_-=\hat S_{1-}+\hat S_{2-}$ gives

```{math}
|1,0\rangle
=\frac{|+z,-z\rangle+|-z,+z\rangle}{\sqrt2}.
```

A second lowering gives $|1,-1\rangle=|-z,-z\rangle$. These three symmetric
states form the $j=1$ **triplet**. The remaining orthogonal state is

```{math}
:label: spin-singlet
|0,0\rangle
=\frac{|+z,-z\rangle-|-z,+z\rangle}{\sqrt2},
```

the antisymmetric $j=0$ **singlet**.

It is worth pausing to recognize these states: equation {eq}`spin-singlet`
is exactly the entangled state $|\Psi^-\rangle$ from Chapter 5, and
$|1,0\rangle$ above is exactly $|\Psi^+\rangle$. Chapter 5 introduced them as
the states with the strongest possible nonclassical correlations between two
separated spins, without yet having a name for *why* nature singles out
precisely this pair of combinations. This section supplies that reason: the
singlet and the $m=0$ triplet state are not an arbitrary choice of entangled
states—they are exactly the states of definite *total* angular momentum,
$j=0$ and $j=1$ respectively, that a rotationally symmetric interaction
between two spins naturally produces and conserves. Entanglement and the
addition of angular momentum turn out to be two views of the same
construction for a two-spin system.

### Example 9.4: measuring total spin

The product state $|+z,-z\rangle$ is not an eigenstate of $\hat J^2$. Inverting
the coupled-basis relations,

```{math}
|+z,-z\rangle
=\frac{|1,0\rangle+|0,0\rangle}{\sqrt2}.
```

A total-spin measurement therefore gives $j=1$ or $j=0$, each with probability
$1/2$, while $J_z=0$ is certain.

:::{figure} ../images/figures/ch09-singlet-triplet.svg
:name: fig-singlet-triplet
:alt: The four product states of two spin-one-half systems reorganize into a three-rung j equals 1 triplet and a one-state j equals 0 singlet. The product state spin up spin down is shown as an equal superposition of the m equals zero triplet and singlet.
:width: 100%

Coupling two spin-$1/2$ systems produces one symmetric triplet and one
antisymmetric singlet. A product state with opposite component values has a
definite $J_z$ but not a definite total $J^2$.
:::

### Concept check 9.6

Why is the singlet unchanged by applying the same spatial rotation to both
spins?

:::{dropdown} Answer
It has total $j=0$, so every component of total angular momentum annihilates
it. Equation {eq}`angular-rotation` therefore acts as the identity on the
singlet.
:::

## 9.6 Coupling in atoms

An electron has orbital angular momentum $\hat{\mathbf L}$ and spin
$\hat{\mathbf S}$. Their total is
$\hat{\mathbf J}=\hat{\mathbf L}+\hat{\mathbf S}$, with

```{math}
j=\ell\pm\frac12
```

except that $\ell=0$ permits only $j=1/2$—consistent with the triangle rule of
Section 9.4 applied to $j_1=\ell$ and $j_2=\tfrac12$. Example 9.3 constructed
the explicit coupled states for $\ell=1$; the same lowering construction works
for any $\ell$. A spin–orbit interaction is proportional to
$\hat{\mathbf L}\cdot\hat{\mathbf S}$. Since

```{math}
:label: ls-identity
\hat{\mathbf L}\cdot\hat{\mathbf S}
=\frac12(\hat J^2-\hat L^2-\hat S^2),
```

its energy shifts are simplest in the coupled basis: on a state $|j,m\rangle$
built from fixed $\ell$ and $s=\tfrac12$,

```{math}
:label: ls-general
\big\langle\hat{\mathbf L}\cdot\hat{\mathbf S}\big\rangle
=\frac{\hbar^2}{2}\Big[j(j+1)-\ell(\ell+1)-\tfrac34\Big],
\qquad j=\ell\pm\frac12.
```

This is a general lesson: choose a basis that diagonalizes the dominant terms
of the Hamiltonian and the measurement being asked about.

### Example 9.5: fine-structure splitting of a $p$ level

Apply equation {eq}`ls-general` to $\ell=1$. For $j=\tfrac32$,

```{math}
\big\langle\hat{\mathbf L}\cdot\hat{\mathbf S}\big\rangle
=\frac{\hbar^2}{2}\Big[\frac{15}{4}-2-\frac34\Big]=\frac{\hbar^2}{2},
```

while for $j=\tfrac12$,

```{math}
\big\langle\hat{\mathbf L}\cdot\hat{\mathbf S}\big\rangle
=\frac{\hbar^2}{2}\Big[\frac34-2-\frac34\Big]=-\hbar^2.
```

For a spin–orbit coupling of the usual (positive) sign, the energy shift is
proportional to $\langle\hat{\mathbf L}\cdot\hat{\mathbf S}\rangle$, so the
$j=\tfrac32$ level is pushed up and the $j=\tfrac12$ level is pushed down: a
single unperturbed $p$ level splits into two, with $j=\tfrac32$ higher. This
is the same splitting pattern responsible for the sodium D-line doublet, where
the $3p$ level's $j=\tfrac32$ and $j=\tfrac12$ components acquire slightly
different energies and hence emit at two closely spaced wavelengths.

## Summary

- Angular momentum is defined by its commutation algebra, not by any single
  formula; $\mathbf r\times\mathbf p$ and $\tfrac{\hbar}{2}\boldsymbol\sigma$
  are two realizations of the same structure.
- Angular momentum has simultaneous eigenstates of $J^2$ and one component.
- A non-negative-norm argument, not a separate postulate, forces the ladder
  to terminate and fixes the allowed $j,m$ values.
- Ladder operators generate all $m$ states for a fixed $j$, and for
  $j=\tfrac12$ they exactly reproduce the Pauli matrices.
- Orbital and spin angular momentum share an algebra but have different
  physical origins; only orbital motion is restricted to integer values.
- Quantum rotations are generated by angular momentum, and half-integer $j$
  states pick up a sign under a full $2\pi$ rotation.
- Coupled and uncoupled bases organize the addition of angular momenta, with
  Clebsch–Gordan coefficients connecting them.
- Two spin-one-half systems combine into a symmetric triplet and an antisymmetric
  singlet; orbital and spin angular momentum combine into fine-structure
  multiplets with a predictable splitting pattern.

## Exercises

1. Use equation {eq}`angular-ladder` to build the matrix of $\hat J_x$ for
   $j=1$.
2. Calculate $\langle J_x\rangle$ in the state of Example 9.1.
3. Show that $[\hat J^2,\hat J_z]=0$ from the component commutators.
4. Verify that $Y_\ell^m\propto e^{im\phi}$ follows from the $L_z$ equation.
5. List the allowed total $j$ values for $j_1=1$ and $j_2=3/2$ and verify the
   dimensions on both sides.
6. Derive all triplet states by lowering from $|1,1\rangle$.
7. Verify directly that the singlet has zero total $J_z$, $J_+$, and $J_-$.
8. Find probabilities for total $j$ and $m$ in $|-z,+z\rangle$.
9. For $\ell=2$ and $s=1/2$, find the eigenvalues of
   $\hat{\mathbf L}\cdot\hat{\mathbf S}$ for both allowed $j$ values.
10. Explain why measuring $S_{1z}$ on the singlet destroys certainty in a
    subsequent total-spin measurement.
11. Show that a $2\pi$ rotation acts differently on integer-$j$ and
    half-integer-$j$ kets.
12. Construct projectors onto the singlet and triplet subspaces using
    $\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$.
13. Derive $\hat J_+\hat J_-=\hat J^2-\hat J_z^2+\hbar\hat J_z$ and use it to
    find the norm of $\hat J_-|j,m\rangle$, confirming it matches the
    lowering case of equation {eq}`angular-ladder`.
14. Using the $2\times2$ matrices from Example 9.2, compute
    $\hat J_x^2+\hat J_y^2+\hat J_z^2$ directly and verify it equals
    $\tfrac34\hbar^2\hat I$, consistent with $j=\tfrac12$.
15. Using the $j=1$ matrix for $\hat J_x$ found in Exercise 1, construct
    $\hat J_y$ and $\hat J_z$ in the same basis and verify
    $[\hat J_x,\hat J_y]=i\hbar\hat J_z$ explicitly.
16. Verify that the four $j=\tfrac32$ states and two $j=\tfrac12$ states of
    Example 9.3 are normalized and mutually orthogonal.
17. A $p$ electron is prepared in $|j=\tfrac32,m=\tfrac12\rangle$. Find the
    probability that a measurement of $L_z$ returns $0$.
18. Starting instead from
    $|j=\tfrac32,-\tfrac32\rangle=|1,-1\rangle|{\downarrow}\rangle$ in
    Example 9.3 and raising with $\hat J_+$, rederive
    $|j=\tfrac32,-\tfrac12\rangle$ and confirm it agrees with the result found
    by lowering from the top.
19. For an $f$ electron ($\ell=3$), list the allowed $j$ values and use
    equation {eq}`ls-general` to find $\langle\hat{\mathbf L}\cdot\hat{\mathbf
    S}\rangle$ for each.
20. Show that the two values found in Example 9.5 both follow from equation
    {eq}`ls-general` evaluated at $j=\ell\pm\tfrac12$ with $\ell=1$.
21. Explain why the non-negative-norm argument behind Concept check 9.3
    constrains $j$ itself, and not merely the range of $m$ available once $j$
    is fixed.
22. A $2\pi$ rotation about an arbitrary axis is applied to a $j=\tfrac32$
    state. State the result and compare it with the $j=1$ and $j=\tfrac12$
    cases.
23. Two electrons occupy a $p$ subshell, so $\ell_1=\ell_2=1$. Use the
    triangle rule to list the allowed values of their total orbital angular
    momentum $L$.
24. A beam of atoms with $j=2$ has all five $m$ outcomes equally likely.
    Find $\langle J_z\rangle$ and $\langle J_z^2\rangle$.
