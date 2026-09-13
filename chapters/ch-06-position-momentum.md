---
title: Position and Momentum Representations
---

# Position and momentum representations

## Learning objectives

After this chapter, you should be able to:

- interpret a wavefunction as the coordinates of a state in a continuous
  basis;
- normalize wavefunctions and calculate position probabilities;
- represent position and momentum operators in coordinate space;
- transform between position and momentum representations;
- use commutators to derive translations and uncertainty bounds; and
- calculate expectation values for continuous observables.

## 6.1 From discrete labels to a continuum

Every chapter so far has worked with a spin's *discrete* state space: two
basis kets, a handful of amplitudes, sums instead of integrals. A particle's
position, by contrast, can take a continuum of values, and this chapter
extends the same logic that worked for spin to that continuous setting.
Spin states already taught us the key idea: a ket is abstract, and a column
of numbers is only its representation in some chosen basis. Position simply
uses a basis with a continuous label instead of a discrete one. The
generalized ket $|x\rangle$ represents an ideal position outcome, and the
position-space **wavefunction** is defined exactly as an amplitude was for
spin:

```{math}
:label: position-wavefunction
\psi(x)=\langle x|\psi\rangle.
```

:::{note} Quick review: from a discrete sum to a continuous integral
Skip this box if replacing a sum with an integral already feels natural.

For spin, completeness read $\sum_n|n\rangle\langle n|=\hat I$, a *finite*
sum over two labels. Position has a continuous label $x$ in place of a
discrete index $n$, and turning a sum into its continuum analogue always
follows the same two-step recipe: chop the line into narrow bins of width
$\Delta x$, write a Riemann sum over those bins, and then let
$\Delta x\to0$ so the sum becomes an integral. Schematically, if
$|x_n\rangle$ denotes an approximately normalized state built from the
amplitude within a bin of width $\Delta x$ centered on $x_n=n\,\Delta x$,

```{math}
\sum_n|x_n\rangle\langle x_n|\,\Delta x
\ \xrightarrow[\ \Delta x\to0\ ]{}\
\int_{-\infty}^{\infty}|x\rangle\langle x|\,dx.
```

The factor of $\Delta x$ is not optional bookkeeping: it is exactly what
keeps the sum finite as the bins are made infinitely narrow, and it is what
turns into $dx$ under the integral sign. That same factor is also why an
orthonormality condition that used to be a simple $1$ or $0$—the Kronecker
delta $\delta_{mn}$—must turn into something that blows up at coincidence
and vanishes elsewhere just fast enough to cancel a factor of $dx$: the
Dirac delta function introduced next. Everything below follows from taking
this limit seriously, rather than treating $|x\rangle$ as though it obeyed
the same finite normalization already familiar from $|+z\rangle$.
:::

The completeness relation, which for spin was a finite sum over two basis
kets, becomes an integral over the continuum of possible positions:

```{math}
:label: position-completeness
\int_{-\infty}^{\infty}|x\rangle\langle x|\,dx=\hat I,
```

so that

```{math}
|\psi\rangle=\int_{-\infty}^{\infty}\psi(x)|x\rangle\,dx.
```

The basis is **delta-normalized**:

```{math}
\langle x|x'\rangle=\delta(x-x').
```

The Dirac delta is not an ordinary finite function; it is defined entirely
by its effect inside an integral:

```{math}
\int f(x')\delta(x'-x)\,dx'=f(x).
```

One consequence follows immediately: ideal position kets are not
normalizable physical states at all. Real preparations are wave packets of
finite width, as Section 6.5 develops in detail.

It helps to see directly why an ordinary finite function cannot play the
role of $\langle x|x'\rangle$, rather than simply asserting it. Suppose
instead that $\langle x|x'\rangle=g(x-x')$ for some bounded function $g$.
Completeness would then require

```{math}
\langle x'|\psi\rangle=\int g(x'-x)\psi(x)\,dx
```

to equal $\psi(x')$ for *every* state $|\psi\rangle$. But a bounded kernel
convolves and smooths a function as it integrates against it; it cannot
reproduce the function's exact value at a single point. The only way it
could would be for the kernel to be concentrated entirely at $x=x'$ with
unit weight there, and no ordinary function is simultaneously concentrated at
one point and normalized to integrate to one. Only the singular limit of an
infinitely narrow, infinitely tall spike—the Dirac delta—has the sifting
property we actually need. This is the same logic that made a discrete
basis's Kronecker delta $\delta_{mn}$ work for spin: orthonormality is
exactly what lets us read off a coefficient by taking an inner product. The
continuum version of that same requirement forces delta-function
normalization in place of unit inner products, and it is exactly what
pushes the generalized kets $|x\rangle$ just outside the space of
normalizable states.

:::{note} A generalized basis is a bookkeeping device
No apparatus prepares $|x\rangle$ itself: doing so would require infinite
momentum uncertainty and infinite energy. What is physically prepared are
normalizable wave packets, expressed as superpositions
$\int\psi(x)|x\rangle\,dx$ over the generalized basis. The basis kets earn
their keep by making the expansion coefficients—the wavefunction—easy to
extract via {eq}`position-wavefunction`, exactly as $|+z\rangle,|-z\rangle$
did for spin.
:::

## 6.2 The continuous Born rule

The probability of finding the particle between $a$ and $b$ is

```{math}
:label: continuous-born
P(a\le x\le b)=\int_a^b|\psi(x)|^2\,dx.
```

Normalization requires

```{math}
\int_{-\infty}^{\infty}|\psi(x)|^2\,dx=1.
```

Unlike a discrete probability, $|\psi(x)|^2$ is a probability **density**,
with units of inverse length. This has a striking consequence: the
probability of finding the particle at any one exact point is
zero, even at a point where the density itself is nonzero.

This is a genuine conceptual shift from the spin chapters, not merely a
change of notation. There, $|\langle+z|\psi\rangle|^2$ was already, by
itself, a probability. Here one more step—multiplying by an interval $dx$,
or integrating over a finite range—is required before a number between $0$
and $1$ appears. Forgetting this step is the most common bookkeeping error
when moving from discrete to continuous quantum mechanics: a "large" value
of $|\psi(x)|^2$ at some point says only that a narrow interval there
carries appreciable probability, not that the point itself is likely.

:::{figure} ../images/figures/ch06-continuous-born-rule.svg
:name: fig-continuous-born-rule
:alt: A probability-density curve has the area between positions a and b shaded. A second graph shows that interval probability approaches zero as the detector interval shrinks to an exact point.
:width: 100%

In a continuous measurement, height is a density and area is probability.
Shrinking the detector interval to zero removes its area even when the density
at the selected point remains nonzero.
:::

### Example 6.1: normalize an exponential packet

Let $\psi(x)=Ae^{-\kappa|x|}$ with $\kappa>0$. Because $|x|$ makes the
integrand symmetric about the origin, the integral over the whole line
splits into twice the integral over $x>0$, where $|x|=x$ and the
exponential is easy to integrate directly:

```{math}
1=\int_{-\infty}^\infty|A|^2e^{-2\kappa|x|}\,dx
=2|A|^2\int_0^\infty e^{-2\kappa x}\,dx
=2|A|^2\left[\frac{-e^{-2\kappa x}}{2\kappa}\right]_0^\infty
=\frac{|A|^2}{\kappa},
```

so one convenient choice is $A=\sqrt\kappa$. For $\langle x\rangle$, the
integrand $x|\psi(x)|^2=|A|^2xe^{-2\kappa|x|}$ is an odd function times an
even one, hence odd overall, and an odd function integrated over a range
symmetric about the origin always integrates to zero; so $\langle
x\rangle=0$ without any further calculation. For $\langle x^2\rangle$, the
same even/odd split as before applies, and the standard integral
$\int_0^\infty x^2e^{-2\kappa x}\,dx=2/(2\kappa)^3=1/(4\kappa^3)$ (obtained
by integrating by parts twice, or by differentiating
$\int_0^\infty e^{-sx}dx=1/s$ twice with respect to $s$) gives

```{math}
\langle x^2\rangle
=2\kappa\int_0^\infty x^2e^{-2\kappa x}\,dx
=2\kappa\cdot\frac{1}{4\kappa^3}
=\frac{1}{2\kappa^2}.
```

Thus $\Delta x=\sqrt{\langle x^2\rangle-\langle x\rangle^2}=1/(\sqrt2\kappa)$.

### Concept check 6.1

Is $|\psi(x_0)|^2$ the probability that a position measurement gives exactly
$x_0$?

:::{dropdown} Answer
No. It is a density. A finite probability requires integration over a finite
interval, and the density carries units of inverse length.
:::

```{phet} quantum-wave-interference
:label: fig:ch06-quantum-wave-interference-sim

Send electrons, photons, or atoms one at a time through a double slit and
watch each arrive as a single dot, yet build up the interference pattern
predicted by $|\psi(x)|^2$ over many trials. Cover one slit with a detector
and the pattern collapses to two bands, the continuous-variable version of
Chapter 1's Rule 3.
```

## 6.3 Operators in the position representation

Position acts by multiplication:

```{math}
:label: position-operator
\langle x|\hat x|\psi\rangle=x\psi(x).
```

Momentum acts by differentiation:

```{math}
:label: momentum-position-representation
\langle x|\hat p|\psi\rangle
=-i\hbar\frac{d\psi}{dx}.
```

Apply both operator orders explicitly to an arbitrary
function $\psi(x)$, rather than taking the commutator below on faith. The
term $\hat x\hat p\,\psi$ first differentiates, then multiplies by $x$:

```{math}
\hat x\hat p\,\psi(x)=x\left(-i\hbar\frac{d\psi}{dx}\right)
=-i\hbar\,x\frac{d\psi}{dx}.
```

The term $\hat p\hat x\,\psi$ first multiplies by $x$, then differentiates
the product $x\psi(x)$ using the ordinary product rule:

```{math}
\hat p\hat x\,\psi(x)=-i\hbar\frac{d}{dx}\big(x\psi(x)\big)
=-i\hbar\,\psi(x)-i\hbar\,x\frac{d\psi}{dx}.
```

Subtracting, the term proportional to $d\psi/dx$—the piece generated by the
derivative landing on $\psi$ itself—is identical in both orderings and
cancels exactly, leaving only the extra term the product rule generates
when the derivative instead lands on the factor of $x$:

```{math}
[\hat x,\hat p]\,\psi(x)=\hat x\hat p\,\psi-\hat p\hat x\,\psi
=-i\hbar\,x\frac{d\psi}{dx}
-\left(-i\hbar\,\psi-i\hbar\,x\frac{d\psi}{dx}\right)
=i\hbar\,\psi(x).
```

Since $\psi(x)$ was an arbitrary function, this is an operator identity,
true independent of any particular state:

```{math}
:label: xp-commutator
[\hat x,\hat p]\psi(x)=i\hbar\psi(x),
\qquad [\hat x,\hat p]=i\hbar\hat I.
```

The expectation values are

```{math}
\langle x\rangle=\int\psi^*(x)x\psi(x)\,dx,
\qquad
\langle p\rangle=\int\psi^*(x)
\left(-i\hbar\frac{d}{dx}\right)\psi(x)\,dx.
```

Boundary behavior matters here in a way it did not for spin.

### Quick calculation: integration by parts and the boundary term

Hermiticity of $\hat p$ would require $\langle\phi|\hat p\psi\rangle
=\langle\hat p\phi|\psi\rangle$ for every pair of states $\phi,\psi$. Writing
the left side as an integral and integrating by parts once,

```{math}
\int_{-\infty}^{\infty}\phi^*(x)\left(-i\hbar\frac{d\psi}{dx}\right)dx
=-i\hbar\Big[\phi^*(x)\psi(x)\Big]_{-\infty}^{\infty}
+i\hbar\int_{-\infty}^{\infty}\frac{d\phi^*}{dx}\psi(x)\,dx.
```

The remaining integral on the right is exactly $\langle\hat p\phi|\psi
\rangle$, the quantity Hermiticity requires the left side to equal. So the
two sides agree if and only if the boundary term
$\big[\phi^*\psi\big]_{-\infty}^{\infty}$ vanishes. For any pair of
normalizable wavefunctions on the whole line, both $\phi$ and $\psi$ must
already go to zero as $x\to\pm\infty$ simply for $\int|\phi|^2dx$ and
$\int|\psi|^2dx$ to be finite, so this boundary term vanishes automatically.
It becomes a genuine physical constraint only once the domain has an edge—an
infinite square well's walls, for instance—which is exactly the case
flagged next.

So an operator is not
fully defined by a differential expression alone; its allowed domain of
functions is part of its definition. Chapter 7 will meet this issue
concretely: an infinite square well forces $\psi$ to vanish at the walls,
which is exactly the condition needed to keep $\hat p$ Hermitian on that
domain, while the bare differential expression alone would not guarantee it.

### Concept check 6.2

If $\psi(x)$ is multiplied by the constant phase $e^{i\gamma}$, do
$\langle x\rangle$ or $\langle p\rangle$ change?

:::{dropdown} Answer
No. The phase cancels from all expectation values. A position-dependent
phase, such as $e^{ik_0x}$, can change momentum statistics.
:::

### Example 6.2: phase carries mean momentum

That last remark is worth demonstrating explicitly, since it is easy to
mistake "the phase doesn't matter" for a blanket statement rather than one
about *constant* phase specifically. Let $\psi(x)=f(x)e^{ik_0x}$, where $f$
is real, normalized, and vanishes at infinity. Then

```{math}
\langle p\rangle
=\int f e^{-ik_0x}\left[-i\hbar
\frac{d}{dx}(fe^{ik_0x})\right]dx
=\hbar k_0,
```

because $\int f f'\,dx=0$. The density $|\psi|^2=f^2$ does not reveal
$k_0$ at all; only the spatial phase carries that information. As in the
spin interferometer of Chapter 4, phase information becomes observable only
through a suitable measurement.

## 6.4 Momentum states and Fourier transforms

:::{note} Quick review: what a Fourier transform does
Skip this box if decomposing a function into a superposition of waves
$e^{ikx}$ already feels natural.

Just as a spin state can be built out of two special basis states,
$|+z\rangle$ and $|-z\rangle$, an ordinary function $f(x)$ can be built out
of a continuum of complex "wave" functions $e^{ikx}$, one for every real
wave number $k$, each carrying its own complex weight $c(k)$:

```{math}
f(x)=\int_{-\infty}^{\infty}c(k)\,e^{ikx}\,dk.
```

The **Fourier transform** is simply the rule that reads off the weight
$c(k)$ belonging to each wave number, given $f(x)$, playing exactly the role
that an inner product $\langle+z|\psi\rangle$ played in extracting a
coefficient from a ket. A function that oscillates rapidly in $x$ draws
mostly on large-$|k|$ waves; a function that varies slowly draws mostly on
small-$|k|$ waves; and a function sharply localized in $x$, like a narrow
spike, turns out to require comparable contributions from every wave
number, spread very broadly in $k$. This trade-off, between how localized a
function is in $x$ and how localized its transform is in $k$, is a purely
mathematical fact about waves that has nothing to do with quantum mechanics
yet: it is the same reason a sharply plucked guitar string rings with many
overtones, while a slow, pure tone contains almost only one frequency.

Equations {eq}`momentum-wavefunction` and {eq}`inverse-fourier` below are
exactly this relationship, with the wave number relabeled $p/\hbar$ and the
weight relabeled as the momentum-space wavefunction $\phi(p)$. What is new,
and genuinely quantum, is the physical claim made just after these
equations: that $\phi(p)$ is not merely a bookkeeping coefficient, but a
probability amplitude for an independently measurable physical quantity.
:::

Momentum eigenstates satisfy $\hat p|p\rangle=p|p\rangle$. In position
space,

```{math}
\langle x|p\rangle=\frac{1}{\sqrt{2\pi\hbar}}e^{ipx/\hbar}.
```

The momentum-space wavefunction is

```{math}
:label: momentum-wavefunction
\phi(p)=\langle p|\psi\rangle
=\frac{1}{\sqrt{2\pi\hbar}}
\int_{-\infty}^{\infty}e^{-ipx/\hbar}\psi(x)\,dx,
```

with inverse

```{math}
:label: inverse-fourier
\psi(x)=\frac{1}{\sqrt{2\pi\hbar}}
\int_{-\infty}^{\infty}e^{ipx/\hbar}\phi(p)\,dp.
```

These are basis changes, not dynamical evolution: exactly the same
distinction Chapter 2 drew between rewriting a spin ket in a new basis and
performing an actual measurement. Normalization is preserved either way:
$\int|\psi(x)|^2dx=\int|\phi(p)|^2dp=1$.

A broad packet in position generally requires a narrow range of wave
numbers; a narrow position packet requires many. This Fourier fact underlies
the position–momentum uncertainty relation, and separating what is and is
not quantum here matters. As a mathematical statement about
pairs of Fourier partners, it has no quantum content of its own: it is true
of classical wave pulses too. What quantum mechanics adds is the physical
claim that $\phi(p)$, not merely $\psi(x)$, is a genuine probability
amplitude for an equally real, independently measurable observable. A
classical wave packet's Fourier width is a statement about its mathematical
shape; a quantum wavefunction's Fourier width is simultaneously a statement
about the distribution of a different physical quantity's measured values.

:::{figure} ../images/figures/ch06-fourier-uncertainty.svg
:name: fig-fourier-uncertainty
:alt: Four plots compare Fourier-paired Gaussian densities. A narrow position distribution corresponds to a broad momentum distribution, while a broad position distribution corresponds to a narrow momentum distribution.
:width: 100%

Position and momentum descriptions are Fourier partners. Localizing the same
state more tightly in one representation necessarily spreads it across more
basis states in the other.
:::

```{phet} fourier-making-waves
:screen: 2
:sim-name: Fourier: Making Waves
:label: fig:ch06-fourier-making-waves-sim

Add harmonics one at a time and watch a broad range of wave numbers
synthesize a narrow, localized packet in position, or remove harmonics and
watch the reverse. The spread displayed for each domain is exactly the
trade-off behind equation {eq}`minimum-uncertainty` below.
```

### Concept check 6.3

Does a momentum eigenfunction describe a localized physical particle?

:::{dropdown} Answer
No. Its magnitude is constant over all space and it cannot be normalized in
the ordinary sense. It is a generalized basis state; physical beams are
modeled by normalizable superpositions with a range of momenta.
:::

## 6.5 Gaussian wave packets

A normalized Gaussian centered at $x_0$ with mean wave number $k_0$ can be
written

```{math}
:label: gaussian-packet
\psi(x)=\frac{1}{(2\pi\sigma_x^2)^{1/4}}
\exp\left[-\frac{(x-x_0)^2}{4\sigma_x^2}+ik_0x\right].
```

It has

```{math}
\langle x\rangle=x_0,\quad
\Delta x=\sigma_x,\quad
\langle p\rangle=\hbar k_0,\quad
\Delta p=\frac{\hbar}{2\sigma_x}.
```

Thus

```{math}
:label: minimum-uncertainty
\Delta x\,\Delta p=\frac{\hbar}{2}.
```

The Gaussian saturates the Robertson bound associated with equation
{eq}`xp-commutator`. This uncertainty is not, however, caused by a badly
calibrated position detector kicking the particle around. It describes the spreads found in two genuinely different
ensembles, each prepared identically in the same state, one measured for
position and the other for momentum.

### Why the Gaussian, specifically, saturates the bound

Chapter 3 showed that the general uncertainty relation
$\Delta A\,\Delta B\ge\tfrac12|\langle[\hat A,\hat B]\rangle|$ becomes an
equality precisely when

```{math}
:label: minimum-uncertainty-condition
(\hat A-\langle A\rangle)|\psi\rangle
=i\lambda(\hat B-\langle B\rangle)|\psi\rangle
```

for some real number $\lambda$. It is worth solving this condition
explicitly for $\hat A=\hat x$, $\hat B=\hat p$, to see directly why the
minimizing states turn out to be Gaussian and not some other shape. In the
position representation, with $\langle p\rangle$ momentarily set to zero for
simplicity,

```{math}
(x-\langle x\rangle)\psi(x)
=i\lambda\left(-i\hbar\frac{d\psi}{dx}\right)
=\lambda\hbar\frac{d\psi}{dx},
```

a first-order differential equation with solution

```{math}
\psi(x)\propto
\exp\left[\frac{(x-\langle x\rangle)^2}{2\lambda\hbar}\right].
```

Normalizability requires the exponent to decay, so $\lambda$ must be
negative; writing $\lambda=-2\sigma_x^2/\hbar$ reproduces exactly the
Gaussian profile of equation {eq}`gaussian-packet` (restoring
$\langle p\rangle=\hbar k_0$ simply reinserts the phase $e^{ik_0x}$, which
affects neither $\Delta x$ nor $\Delta p$). No other line shape solves
equation {eq}`minimum-uncertainty-condition`: any state that is not Gaussian
must have $\Delta x\,\Delta p>\hbar/2$ strictly. So Gaussian wave packets,
far from being merely a convenient textbook example, are *the* states of
least joint position–momentum uncertainty: there is no better one to be
found.

### Example 6.3: overlap of two wave packets

How distinguishable are two Gaussian packets prepared with the same width
$\sigma_x$ and mean wave number $k_0$, but different centers $x_1$ and
$x_2$? Their overlap is

```{math}
\langle\psi_2|\psi_1\rangle
=\frac{1}{\sqrt{2\pi\sigma_x^2}}
\int_{-\infty}^{\infty}
\exp\left[-\frac{(x-x_1)^2}{4\sigma_x^2}
-\frac{(x-x_2)^2}{4\sigma_x^2}\right]dx,
```

where the common phase $e^{ik_0x}$ has canceled between $\psi_2^*$ and
$\psi_1$. Writing $\bar x=(x_1+x_2)/2$, the identity
$(x-x_1)^2+(x-x_2)^2=2(x-\bar x)^2+\tfrac12(x_1-x_2)^2$ separates the
exponent into a piece that integrates to the normalization and a piece that
depends only on the separation:

```{math}
:label: packet-overlap
\langle\psi_2|\psi_1\rangle
=\exp\left[-\frac{(x_1-x_2)^2}{8\sigma_x^2}\right].
```

Packets separated by many widths ($|x_1-x_2|\gg\sigma_x$) are nearly
orthogonal and behave as reliably distinguishable preparations; packets
separated by less than a width overlap substantially, and no measurement
can sort individual particles between them with certainty. This is the
continuous counterpart of the Stern–Gerlach statement that only exactly
orthogonal spin states are perfectly distinguishable: here "exactly
orthogonal" is replaced by "infinitely far apart," and any finite
separation always leaves some residual overlap.

### Concept check 6.4

Two Gaussian packets of width $\sigma_x$ are centered $6\sigma_x$ apart. Are
they reliably distinguishable by an ideal position measurement?

:::{dropdown} Answer
Yes, to excellent approximation. Equation {eq}`packet-overlap` gives an
overlap of $\exp(-36/8)=\exp(-4.5)\approx0.011$, so the two states are
nearly orthogonal and a position measurement almost always lands cleanly in
the region associated with the correct packet.
:::

## 6.6 Momentum generates translations

Define the translation operator

```{math}
:label: translation-operator
\hat T(a)=e^{-ia\hat p/\hbar}.
```

Using $\hat p=-i\hbar\,d/dx$, the exponent becomes
$-ia\hat p/\hbar=-a\,d/dx$, so in the position representation the
exponential's defining power series—the same construction reviewed in
Chapter 4 for a matrix exponential, now applied to the differentiation
operator $d/dx$ instead—gives

```{math}
\langle x|\hat T(a)|\psi\rangle
=e^{-a\,d/dx}\psi(x)
=\sum_{n=0}^\infty\frac{(-a)^n}{n!}\frac{d^n\psi}{dx^n}
=\psi(x)-a\,\psi'(x)+\frac{a^2}{2}\,\psi''(x)-\cdots.
```

This is exactly the Taylor series of $\psi(x-a)$ expanded about the point
$x$, so

```{math}
\langle x|\hat T(a)|\psi\rangle=\psi(x-a).
```

The translated packet is centered a distance $a$ to the right: its value at
$x$ equals the old packet's value at $x-a$. Infinitesimally,

```{math}
\hat T(a)\approx\hat I-\frac{ia}{\hbar}\hat p.
```

Momentum is therefore the **generator** of spatial translations, just as
the Hamiltonian is the generator of time translations and spin components
generate rotations. The pattern is always the same: a Hermitian observable
exponentiates into a unitary operator that implements a continuous
symmetry, and the observable's expectation value is conserved exactly when
that symmetry leaves the Hamiltonian unchanged. Chapter 9 will show that
orbital and spin angular momentum generate rotations in precisely this
sense, so that the rotation operators already used for spin in Chapter 4
are a special case of a single unifying structure that also produces
{eq}`translation-operator` here.

Conjugating position by the translation gives

```{math}
\hat T^\dagger(a)\hat x\hat T(a)=\hat x+a\hat I.
```

This operator statement makes the geometry independent of any particular
wavefunction: it is true for every state at once, not just the ones we
happen to write down explicitly.

### Concept check 6.5

Does translating a state by $a$ change the *magnitude* of its momentum-space
wavefunction?

:::{dropdown} Answer
No. Since $\hat T(a)=e^{-ia\hat p/\hbar}$ commutes with $\hat p$, translation
multiplies $\phi(p)$ by the pure phase $e^{-iap/\hbar}$ and leaves
$|\phi(p)|^2$ unchanged. Sliding a packet in space redistributes nothing
among its momentum components; only *where* it is found changes, not *how
fast* it is found to be moving.
:::

## 6.7 Measurement resolution and wave packets

An ideal sharp position measurement uses projectors $|x\rangle\langle x|$
only as a mathematical limit. A detector pixel covering a region $R$
corresponds instead to

```{math}
\hat P_R=\int_R|x\rangle\langle x|\,dx,
\qquad
P(R)=\langle\psi|\hat P_R|\psi\rangle.
```

Selecting that detector outcome produces a state localized to the region,
after normalization. A narrower region generally broadens the momentum
distribution. This is the continuous version of an analyzer preparing an
outcome state, with finite detector resolution replacing an ideal
one-dimensional projector.

:::{caution} An idealized limit is not a recipe
Letting $R$ shrink to a point in $\hat P_R=\int_R|x\rangle\langle x|\,dx$
sends the normalized post-measurement state toward the non-normalizable
$|x\rangle\langle x|/{\langle x|x\rangle}$, which does not exist as an
ordinary quantum state. Real position measurements always have finite
resolution, and it is the finite-resolution projector, not its idealized
limit, that correctly describes a laboratory detector pixel or a particle
track in a bubble chamber.
:::

## 6.8 Free-particle evolution and packet spreading

For $V=0$, each momentum component is an energy eigenstate with
$E(p)=p^2/(2m)$. The momentum wavefunction evolves as

```{math}
\phi(p,t)=e^{-ip^2t/(2m\hbar)}\phi(p,0).
```

Its magnitude is unchanged, so the momentum distribution stays fixed for
all time. The phase, however, is nonlinear in $p$, and transforming back to
position shows that this nonlinear phase causes a packet to spread. For the
minimum-uncertainty Gaussian of equation {eq}`gaussian-packet`,

```{math}
:label: gaussian-spreading
\Delta x(t)
=\sigma_x\sqrt{1+
\left(\frac{\hbar t}{2m\sigma_x^2}\right)^2}.
```

The center, meanwhile, moves classically:

```{math}
\langle x\rangle_t=x_0+\frac{\hbar k_0}{m}t.
```

A narrow initial packet spreads faster than a broad one, because a narrow
packet in position necessarily contains a broader range of momenta—and
therefore a broader range of velocities—than a broad one does.

:::{figure} ../images/figures/ch06-free-packet-spreading.svg
:name: fig-free-packet-spreading
:alt: Three Gaussian probability densities at successive times move to the right while becoming wider and lower. Their centers travel uniformly but their spatial uncertainty increases.
:width: 100%

Free evolution advances the packet center at the group velocity while its
constituent momentum components separate. The fixed momentum spread therefore
appears as a growing position spread.
:::

### Group and phase velocity

A plane-wave component has phase velocity
$v_{\mathrm{ph}}=\omega/k=\hbar k/(2m)$, while the packet envelope itself
travels at the different speed

```{math}
v_{\mathrm g}=\frac{d\omega}{dk}=\frac{\hbar k}{m}=\frac{p}{m}.
```

It is the group velocity that matches the particle's classical velocity.
Confusing the two gives a factor-of-two error for the nonrelativistic
dispersion relation $\omega=\hbar k^2/(2m)$. The phase velocity is not
meaningless—it governs how the fine ripples inside the envelope move—but it
is not what a particle detector downstream registers as "how fast the
particle arrived." Only the envelope carries probability, so only the
envelope's speed should ever be compared with a classical velocity.

## 6.9 Ehrenfest's theorem

For

```{math}
\hat H=\frac{\hat p^2}{2m}+V(\hat x),
```

the expectation-value equation from Chapter 4 gives

```{math}
:label: ehrenfest-equations
\frac{d\langle x\rangle}{dt}=\frac{\langle p\rangle}{m},
\qquad
\frac{d\langle p\rangle}{dt}
=-\left\langle\frac{dV}{dx}\right\rangle.
```

These resemble Hamilton's equations, and it is tempting to conclude that
quantum expectation values always follow classical trajectories. They do
not, in general: $\langle V'(\hat x)\rangle\ne V'(\langle x\rangle)$ except
in special cases. The center of a narrow packet in a slowly varying
potential only *approximately* follows a classical trajectory.

There is one important exception, and the reason it arises deserves a
closer look. For quadratic potentials, the equations close exactly for the
means. The reason is purely algebraic: the discrepancy
$\langle V'(\hat x)\rangle-V'(\langle x\rangle)$ is controlled by the higher
moments of $\hat x-\langle x\rangle$, through a Taylor expansion of $V'$
about $\langle x\rangle$. Every term in that expansion beyond the first
involves at least $\langle(\hat x-\langle x\rangle)^2\rangle$, or a higher
power still. If $V'$ is linear in $x$—equivalently, if $V$ is at most
quadratic—that Taylor expansion has no higher terms at all, and the
mean-value equations close exactly, regardless of how wide the packet is.
For any other potential, this gap is generally nonzero and grows with the
packet's spread.

Ehrenfest's theorem does not turn a quantum state into a classical point.
The packet retains its uncertainties, may spread, and may even split into
reflected and transmitted pieces. Classical behavior emerges only for
suitable states, observables, potentials, and time scales, not as a general
guarantee.

### Example 6.4: constant force

For $V(x)=-Fx$, equation {eq}`ehrenfest-equations` gives

```{math}
\langle p\rangle_t=\langle p\rangle_0+Ft,\qquad
\langle x\rangle_t=\langle x\rangle_0+
\frac{\langle p\rangle_0}{m}t+\frac{F}{2m}t^2.
```

The mean follows the classical constant-acceleration trajectory exactly,
even though the position distribution need not remain narrow.

### Example 6.5: the harmonic oscillator

For $V(x)=\tfrac12m\omega^2x^2$, studied in full in Chapter 7,
$V'(x)=m\omega^2x$ is linear, so equation {eq}`ehrenfest-equations` closes
exactly:

```{math}
\frac{d\langle x\rangle}{dt}=\frac{\langle p\rangle}{m},
\qquad
\frac{d\langle p\rangle}{dt}=-m\omega^2\langle x\rangle.
```

Differentiating the first equation and substituting the second gives

```{math}
\frac{d^2\langle x\rangle}{dt^2}=-\omega^2\langle x\rangle,
```

the classical simple-harmonic equation of motion, satisfied exactly by
$\langle x\rangle_t$ and $\langle p\rangle_t$ for *any* initial state—a
narrow packet, a broad one, or a superposition of many energy eigenstates.
Together with Example 6.4, this shows that exactly classical mean motion is
not a generic feature of quantum dynamics; it is a special consequence of
having a potential no steeper than quadratic. The width of the packet is a
separate question entirely: for the free particle it grows without bound
(equation {eq}`gaussian-spreading`), while a harmonic packet prepared in the
right shape returns periodically to its initial width, oscillating in step
with $\langle x\rangle_t$.

### Concept check 6.6

For the harmonic oscillator, does Ehrenfest's theorem guarantee that a
widely spread-out state behaves like a classical particle in every respect?

:::{dropdown} Answer
No. It guarantees only that the means $\langle x\rangle_t$ and
$\langle p\rangle_t$ trace the exact classical trajectory. The state can
remain highly uncertain, and observables other than these first moments—such
as $\Delta x(t)$ itself—need not follow any classical law.
:::

## 6.10 A representation is not a physical location

In momentum space the same abstract operators act differently:

```{math}
\langle p|\hat p|\psi\rangle=p\phi(p),\qquad
\langle p|\hat x|\psi\rangle=i\hbar\frac{d\phi}{dp}.
```

Nothing has happened to the particle when one changes from $\psi(x)$ to
$\phi(p)$. One has simply changed the basis used to describe the same ket. A
physical position measurement, by contrast, changes conditional predictions
through state update. This distinction is the continuous analogue of
rewriting a spin ket in the $x$ basis versus actually sending it through an
$x$ analyzer.

:::{important} Representation change versus measurement
Computing $\phi(p)=\langle p|\psi\rangle$ from a known $\psi(x)$ is
arithmetic: it uses one fixed state and asks what its coefficients look
like in a different, already-chosen basis. Performing a momentum
measurement is physical: it interacts the system with an apparatus,
produces one random outcome, and updates the state. The two operations can
produce numerically identical-looking distributions $|\phi(p)|^2$—one as a
computed property of the original state, one as a set of relative
frequencies from repeated trials—but only the second involves selecting an
outcome and preparing a new state for whatever comes next.
:::

## Summary

- A wavefunction is a state's coordinate function in the position basis.
- Squared wavefunction magnitude is a probability density.
- Position multiplies by $x$, while momentum differentiates in the position
  representation.
- Position and momentum wavefunctions are Fourier transforms of one another.
- Gaussian packets attain the minimum uncertainty product $\hbar/2$ and are the
  unique states that do so.
- Momentum generates translations, connecting symmetry with observables; the
  same pattern reappears for time evolution and rotations.
- Ehrenfest's theorem closes exactly only when the potential is at most
  quadratic; otherwise it describes an approximate classical trajectory for
  the mean.
- Finite-resolution measurements project onto ranges rather than exact points.

## Exercises

1. Normalize $\psi(x)=A$ on $0<x<L$ and zero elsewhere. Find
   $\langle x\rangle$ and $\Delta x$.
2. For the exponential packet in Example 6.1, find the probability that
   $|x|<1/\kappa$.
3. Verify equation {eq}`xp-commutator` by applying both operator orders to an
   arbitrary differentiable function.
4. Show by integration by parts that $\langle p\rangle$ is real when
   $\psi(x)$ vanishes at infinity.
5. Normalize $xe^{-\kappa x}$ on $x>0$ and zero elsewhere.
6. Find $\langle p\rangle$ for a real, normalized wavefunction that vanishes at
   the boundaries of its domain.
7. Verify the four moments stated for equation {eq}`gaussian-packet`.
8. Fourier transform a Gaussian by completing the square and confirm
   $\Delta p=\hbar/(2\sigma_x)$.
9. Show that $\hat T(a)\hat T(b)=\hat T(a+b)$ and that $\hat T^\dagger(a)
   =\hat T(-a)$.
10. Derive $\hat T^\dagger\hat x\hat T=\hat x+a\hat I$ to first order in $a$
    using the commutator.
11. A detector reports only whether $x<0$ or $x\ge0$. Write its two projectors
    and the conditional wavefunction after the $x\ge0$ result.
12. Explain how two wavefunctions can have identical position densities but
    different momentum distributions. Give an explicit pair.
13. Derive equation {eq}`gaussian-spreading` by evolving the Gaussian in
    momentum space, or verify its short- and long-time limits.
14. Find the time at which the width of a free Gaussian has doubled.
15. Derive both Ehrenfest equations using commutators.
16. Give a potential for which
    $\langle V'(\hat x)\rangle=V'(\langle x\rangle)$ for every state and one for
    which it is generally false.
17. Verify the momentum-space representation of $\hat x$ by differentiating
    the Fourier kernel.
18. Suppose $\langle x|x'\rangle=g(x-x')$ for a bounded function $g$ with
    $\int g(x)\,dx=1$. Show that $\int g(x'-x)\psi(x)\,dx$ generally differs
    from $\psi(x')$ for a wavefunction that varies on the scale over which $g$
    is spread, and explain why only the Dirac-delta limit removes this
    discrepancy for every $\psi$.
19. Using equation {eq}`packet-overlap`, find the separation $|x_1-x_2|$, in
    units of $\sigma_x$, at which $|\langle\psi_2|\psi_1\rangle|^2=\tfrac12$.
20. Repeat the overlap calculation of Example 6.3 for two Gaussian packets
    with the same center but different mean wave numbers $k_1\ne k_2$, and
    show that the result depends on $k_1-k_2$ and $\sigma_x$ in a way that
    parallels equation {eq}`packet-overlap`.
21. Solve equation {eq}`minimum-uncertainty-condition` for $\hat A=\hat x$,
    $\hat B=\hat p$ keeping $\langle p\rangle$ general from the start, and
    confirm that the phase $e^{ik_0x}$ appears with $\langle p\rangle=\hbar
    k_0$.
22. Verify by direct substitution that the harmonic-oscillator Ehrenfest
    equations of Example 6.5 combine to
    $d^2\langle x\rangle/dt^2=-\omega^2\langle x\rangle$.
23. Identify the mathematical feature shared by the free particle and the
    harmonic oscillator that allows Ehrenfest's theorem to close exactly for
    both, and explain why a cubic potential $V(x)=cx^3$ does not share it.
24. A particle is confined with certainty to a finite interval $[0,L]$. Explain
    using the Fourier relation why its momentum-space wavefunction cannot be
    concentrated at a single value of $p$.
25. Verify $\langle x^2\rangle$ and $\langle p^2\rangle$ for the Gaussian
    packet of equation {eq}`gaussian-packet` by direct integration, and confirm
    the stated $\Delta x$ and $\Delta p$.
26. Two Gaussian packets share a center $x_0$ but have different widths
    $\sigma_1$ and $\sigma_2$. Compute their overlap and show that it depends
    only on the ratio $\sigma_1/\sigma_2$.
27. Show that a momentum eigenstate is unchanged in magnitude, up to an overall
    phase, under any translation $\hat T(a)$, and interpret this as the
    statement that momentum eigenstates carry no distinguishing spatial
    location.
28. Show directly from its integral definition that $\hat P_R$ in Section 6.7
    is Hermitian and idempotent ($\hat P_R^2=\hat P_R$).
29. Model a detector pixel of width $\varepsilon$ centered at $x_0$ by
    $\hat P_\varepsilon=\int_{x_0-\varepsilon/2}^{x_0+\varepsilon/2}
    |x\rangle\langle x|\,dx$. Show that $P(R)/\varepsilon\to|\psi(x_0)|^2$ as
    $\varepsilon\to0$, recovering the probability density from a
    finite-resolution measurement.
30. Find the time at which $\Delta x(t)=\sqrt2\,\sigma_x$ for a free Gaussian
    packet, in terms of $m$, $\sigma_x$, and $\hbar$.
31. Compute the group velocity for the relativistic dispersion relation
    $\omega=\sqrt{c^2k^2+(mc^2/\hbar)^2}$, and show that it reduces to $p/m$
    when $\hbar k\ll mc$.
32. A student measures momentum, obtains a result, and then asks for the
    "position-space picture" of the resulting state by Fourier transforming.
    Explain what has and has not been physically established about position by
    this point, contrasting it with an actual position measurement.
33. A real, even wavefunction satisfies $\psi(x)=\psi(-x)$. Using the Fourier
    relation between $\psi$ and $\phi$, show that $\phi(p)$ is real and even,
    and use that fact to show $\langle p\rangle=0$ without evaluating the
    momentum integral directly.
34. Prove that $\hat T(a)$ is unitary directly from its exponential definition
    and the Hermiticity of $\hat p$.
