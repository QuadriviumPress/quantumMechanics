---
title: One-Dimensional Wave Mechanics
---

# One-dimensional wave mechanics

## Learning objectives

After this chapter, you should be able to:

- solve the time-independent Schrödinger equation in regions of constant
  potential;
- impose boundary and matching conditions;
- distinguish bound states from scattering states;
- calculate spectra and wavefunctions for the infinite square well;
- use probability current to interpret reflection and transmission;
- explain tunneling through a classically forbidden region; and
- describe the harmonic oscillator with ladder operators.

## 7.1 Schrödinger's equation in position space

Chapter 6 developed the position representation in the abstract: operators
become differential expressions, and a ket becomes a wavefunction. This
chapter puts that machinery to work on the simplest possible setting, a
single spatial dimension, where boundary conditions and matching conditions
turn into concrete, solvable calculations. For one nonrelativistic particle
of mass $m$ in a potential $V(x,t)$,

```{math}
:label: coordinate-tdse
i\hbar\frac{\partial\psi}{\partial t}
=\left[-\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2}
+V(x,t)\right]\psi(x,t).
```

If $V$ is time independent, a separated solution
$\psi(x,t)=u(x)e^{-iEt/\hbar}$ obeys

```{math}
:label: one-dimensional-tise
-\frac{\hbar^2}{2m}\frac{d^2u}{dx^2}+V(x)u(x)=Eu(x).
```

This is an eigenvalue equation for the Hamiltonian. A normalizable energy
eigenfunction changes only by an overall phase, so its probability density is
stationary.

The local behavior of a solution depends entirely on the sign of $E-V$:

- if $E>V$, solutions oscillate with
  $k=\sqrt{2m(E-V)}/\hbar$;
- if $E<V$, solutions grow or decay exponentially with
  $\kappa=\sqrt{2m(V-E)}/\hbar$; and
- at abrupt finite changes in $V$, both $u$ and $du/dx$ are continuous.

The last condition follows by integrating the differential equation across an
arbitrarily narrow interval: a finite jump in $V$ cannot produce a
$\delta$-function in $u''$, so $u'$ cannot jump either. Infinite potentials
are the one exception, and it is worth being precise about why. An infinite
wall forces $u=0$ at the wall, but $u'$ *is* allowed to jump there, because
the argument just given assumed a *finite* jump in $V$. An infinitely deep
well is really the limit of an ever-taller finite well, not a literal
potential one can integrate across.

Physically, equation {eq}`one-dimensional-tise` is nothing more than the same
eigenvalue problem introduced abstractly in Chapter 3, specialized to the
position representation of Chapter 6. $\hat H=\hat p^2/2m+V(\hat x)$ acting
on $|\psi\rangle$ becomes a second-order differential operator acting on
$u(x)=\langle x|\psi\rangle$. Nothing new is being postulated here—only the
concrete form that an old postulate takes once a continuous basis is chosen.

## 7.2 The infinite square well

This is the simplest bound-state problem in quantum mechanics, and it is
worth solving completely: every later matching calculation in this chapter
repeats the same basic steps on a harder potential. Let $V=0$ for $0<x<L$
and $V=\infty$ elsewhere. The wavefunction vanishes at $x=0$ and $x=L$.
Inside,

```{math}
u(x)=A\sin kx+B\cos kx.
```

The first boundary gives $B=0$; the second requires $\sin kL=0$. Thus

```{math}
:label: infinite-well-solutions
k_n=\frac{n\pi}{L},\qquad
u_n(x)=\sqrt{\frac2L}\sin\frac{n\pi x}{L},
\qquad n=1,2,3,\ldots
```

and

```{math}
:label: infinite-well-energies
E_n=\frac{n^2\pi^2\hbar^2}{2mL^2}.
```

Boundary conditions have quantized the energy. There is no $n=0$ state: it
would be the zero function and could not be normalized. The nonzero
ground-state energy is required by confinement and the uncertainty
principle—a state squeezed into a region of size $L$ cannot also have
$p=0$, so it cannot have $E=0$.

The infinite well is the simplest model of confinement, and its qualitative
lessons reappear whenever a particle is trapped: quantum dots, particles in
optical lattices, and nucleons in a schematic nuclear well are all discussed
using the same vocabulary of quantized levels and a nonzero ground-state
energy. One more pattern is worth noting now, because it will recur for
every bound-state problem in this chapter: the integer $n-1$ counts the
number of interior nodes of $u_n$. More nodes means more curvature, and more
curvature means higher energy, since curvature is exactly what converts
potential energy into kinetic energy in equation {eq}`one-dimensional-tise`.

### Example 7.1: a superposition in the well

Suppose

```{math}
\psi(x,0)=\frac{u_1(x)+u_2(x)}{\sqrt2}.
```

Then

```{math}
\psi(x,t)=\frac{1}{\sqrt2}
\left[u_1(x)e^{-iE_1t/\hbar}+u_2(x)e^{-iE_2t/\hbar}\right].
```

The energy probabilities stay $1/2$, but the position density contains an
interference term proportional to
$\cos[(E_2-E_1)t/\hbar]$. A superposition of stationary states need not itself
have a stationary density.

### Concept check 7.1

Why is $\psi(x,t)=u_n(x)e^{-iE_nt/\hbar}$ called stationary if it depends on
time?

:::{dropdown} Answer
Its time dependence is an overall phase, so $|\psi|^2$ and every
time-independent observable distribution are constant.
:::

## 7.3 General bound states

A bound state is normalizable and localized. For potentials approaching
constants at infinity, bound-state energies lie below the asymptotic
potential, so the wavefunction decays exponentially outside the classically
allowed region.

Several qualitative facts are useful before solving anything further:

- one-dimensional bound-state energies are nondegenerate;
- the ground state has no interior nodes;
- higher states have successively more nodes; and
- for an even potential, eigenstates can be chosen with even or odd parity.

The nondegeneracy claim deserves a moment's justification, and it is special
to one dimension specifically. Two independent solutions of a second-order
ordinary differential equation at the same $E$ would be related by their
Wronskian. Normalizability at both infinities forces that Wronskian to
vanish, which in turn forces the two solutions to be proportional to one
another—so there is really only one independent bound state at that energy.
Chapter 8 will show that this argument fails in three dimensions, where
rotational symmetry routinely produces several independent states at one
energy.

:::{note} Quantization is a boundary-value result
The differential equation alone permits solutions at many energies. Discrete
energies arise when normalizability and boundary conditions can be satisfied
only for selected values.
:::

### The finite square well

For a finite square well, oscillatory interior solutions must be matched to
decaying exterior solutions. The matching conditions produce transcendental
equations rather than the simple integer rule of the infinite well. The
finite well has only finitely many bound states, and each leaks into the
classically forbidden region.

Let $V(x)=-V_0$ for $|x|<L/2$ and $V(x)=0$ for $|x|>L/2$, with $-V_0<E<0$.
Inside, the wavefunction oscillates with
$k=\sqrt{2m(E+V_0)}/\hbar$; outside, it decays with
$\kappa=\sqrt{-2mE}/\hbar$. Because the well is symmetric about $x=0$, every
bound state can be chosen even or odd, and it is enough to match at $x=L/2$
and use the symmetry to fix the other boundary automatically. Matching $u$
and $u'$ gives

```{math}
:label: finite-well-even
k\tan\frac{kL}{2}=\kappa
\qquad\text{(even states)},
```

```{math}
:label: finite-well-odd
k\cot\frac{kL}{2}=-\kappa
\qquad\text{(odd states)}.
```

Neither equation can be solved in closed form, but both are constrained by
energy conservation, $k^2+\kappa^2=2mV_0/\hbar^2$, which is independent of
$E$. In terms of the dimensionless variables $\xi=kL/2$ and $\eta=\kappa
L/2$, this constraint is the quarter circle

```{math}
:label: finite-well-circle
\xi^2+\eta^2=z_0^2,
\qquad
z_0\equiv\frac{L}{2}\frac{\sqrt{2mV_0}}{\hbar},
```

and the bound states are exactly the intersections of this circle with the
curves $\eta=\xi\tan\xi$ (even) and $\eta=-\xi\cot\xi$ (odd) in the first
quadrant. The dimensionless number $z_0$ measures the well's "strength": how
many oscillations the interior wavefunction can complete before decay must
take over.

This picture, without any further algebra, already answers the two
questions that matter most:

- **A one-dimensional well always binds at least one state.** As $\xi\to0$,
  $\xi\tan\xi\to0$, so the even branch always starts at the origin and rises
  to meet the circle of any radius $z_0>0$. However shallow or narrow the
  well, there is always exactly one even, nodeless bound state. This is a
  genuinely one-dimensional fact; shallow three-dimensional wells can fail
  to bind anything at all.
- **New states appear at regular intervals of $z_0$.** The tangent branch
  diverges at $\xi=\pi/2,3\pi/2,\ldots$ and the cotangent branch changes
  sign there, so a new branch of the even curve enters the first quadrant
  every time $z_0$ passes a multiple of $\pi$, and a new branch of the odd
  curve enters every time $z_0$ passes an odd multiple of $\pi/2$. The
  total bound-state count is therefore
  ```{math}
  :label: finite-well-count
  N=\left\lfloor\frac{2z_0}{\pi}\right\rfloor+1,
  ```
  alternating even, odd, even, odd, $\ldots$ as $z_0$ grows, and matching
  the evenly spaced infinite-well spectrum of equation
  {eq}`infinite-well-energies` for the lowest levels only once $z_0\gg1$;
  the topmost bound state, barely below $E=0$, always looks qualitatively
  different—loosely bound with a long decaying tail.

### Example 7.3: counting bound states

Take a well with $z_0=4$. Since $\pi/2\approx1.57$, $\pi\approx3.14$, and
$3\pi/2\approx4.71$, the value $z_0=4$ has passed the first two thresholds
but not the third: one even branch exists from $z_0>0$, a second even
branch appears once $z_0>\pi$, and one odd branch appears once
$z_0>\pi/2$, while the second odd branch (threshold $3\pi/2$) has not yet
appeared. Equation {eq}`finite-well-count` confirms this directly:
$N=\lfloor 8/\pi\rfloor+1=\lfloor2.55\rfloor+1=3$. This well supports
exactly three bound states: two even and one odd.

```{phet-legacy} bound-states
:label: fig:ch07-bound-states-sim

Set up a finite well and drag its width and depth to change $z_0$, watching
bound states appear at the thresholds equation {eq}`finite-well-count`
predicts. The same sim's other potential shapes carry forward to the
harmonic oscillator later in this chapter and to the variational estimates of
Chapter 10.
```

### Concept check 7.2

Does a shallow, narrow finite well always fail to bind a particle if $V_0$ is
small enough?

:::{dropdown} Answer
No. Equation {eq}`finite-well-count` gives $N\ge1$ for every $z_0>0$: a
one-dimensional attractive well of any strength binds at least one even,
nodeless state. Only in higher dimensions can an arbitrarily weak well fail
to bind anything.
:::

## 7.4 Scattering from a step

Bound states are only half the story: a particle with enough energy to
escape to infinity produces a **scattering state** instead, and the relevant
questions become "how much reflects?" and "how much transmits?" rather than
"what are the allowed energies?" Consider a particle incident from the left
on

```{math}
V(x)=
\begin{cases}
0,&x<0,\\
V_0,&x>0.
\end{cases}
```

For $E>V_0$, write

```{math}
u_I=e^{ik_1x}+r e^{-ik_1x},\qquad
u_{II}=t e^{ik_2x},
```

where $k_1=\sqrt{2mE}/\hbar$ and
$k_2=\sqrt{2m(E-V_0)}/\hbar$. Matching $u$ and $u'$ at $x=0$ gives

```{math}
r=\frac{k_1-k_2}{k_1+k_2},
\qquad
t=\frac{2k_1}{k_1+k_2}.
```

Even though $E>V_0$, reflection occurs because the wavelength changes
abruptly. The amplitude $|t|^2$ is not by itself the transmission
probability when the speeds differ, as Section 7.5 makes precise.

### Concept check 7.3

Can a particle reflect from an upward step when $E>V_0$?

:::{dropdown} Answer
Yes. Matching waves of different wavelengths produces a reflected amplitude.
Classical certainty of transmission is not the quantum prediction.
:::

### Total reflection below the step

Now suppose $E<V_0$. Region II no longer oscillates; normalizability as
$x\to\infty$ forces the purely decaying solution
$u_{II}=Ce^{-\kappa x}$, with $\kappa=\sqrt{2m(V_0-E)}/\hbar$. Matching $u$
and $u'$ at $x=0$ as before gives

```{math}
:label: step-below-reflection
r=\frac{ik_1+\kappa}{ik_1-\kappa}.
```

Both numerator and denominator have the same magnitude
$\sqrt{k_1^2+\kappa^2}$, so $|r|=1$ exactly: every particle reflects,
exactly as a classical particle would. What is *not* classical is that
$u_{II}$ is nonzero. The wavefunction penetrates into the classically
forbidden region with an exponentially decaying tail, even though the
probability current carried by a purely real exponential vanishes
identically,

```{math}
j_{II}=\frac{\hbar}{2mi}
\left(u_{II}^*u_{II}'-u_{II}u_{II}^{*\prime}\right)=0,
```

since $u_{II}$ and $u_{II}'$ differ only by the real factor $-\kappa$. No
probability leaks away to $x=+\infty$; it only visits the forbidden region
and returns, consistent with $R=1$.

Writing $r$ in polar form exposes a reflection *phase shift* with no
classical analogue. If $\kappa\to\infty$ (an infinitely high step, i.e. an
infinite wall), $r\to-1$: the familiar node-forcing hard-wall reflection.
For finite $\kappa$, the phase interpolates continuously between this
hard-wall value and $r\to+1$ as $E\to V_0^-$—which matches the $E>V_0$
formula for $r$ evaluated at $k_2\to0$, so the two regimes join smoothly at
threshold even though their functional forms look unrelated.

### Example 7.4: how a soft wall differs from a hard one

For $\kappa=k_1$ (a step exactly twice the particle's kinetic energy),
equation {eq}`step-below-reflection` gives
$r=(ik_1+k_1)/(ik_1-k_1)=(i+1)/(i-1)=-i$. The reflection probability is
still $|r|^2=1$, but $r=-i=e^{-i\pi/2}$ differs by a quarter cycle from the
$\kappa\to\infty$ hard-wall answer $r=-1=e^{i\pi}$. A detector counting
reflected atoms cannot see this phase directly; an interference experiment
that recombines the reflected wave with another coherent path can.

### Concept check 7.4

For $E<V_0$ at a step, is the probability density zero in the classically
forbidden region?

:::{dropdown} Answer
No. $|u_{II}|^2=|C|^2e^{-2\kappa x}$ is nonzero and decays smoothly. What
vanishes is the probability *current* there, so no probability permanently
escapes to $x\to+\infty$; $R=1$ is still exact.
:::

## 7.5 Probability current

Section 7.4 flagged that $|t|^2$ alone is not the transmission probability
whenever the two regions carry waves of different speed. Here is the tool
that fixes this: equation {eq}`coordinate-tdse` implies the continuity
equation

```{math}
:label: probability-continuity
\frac{\partial|\psi|^2}{\partial t}+\frac{\partial j}{\partial x}=0,
```

where

```{math}
:label: probability-current
j=\frac{\hbar}{2mi}
\left(\psi^*\frac{\partial\psi}{\partial x}
-\psi\frac{\partial\psi^*}{\partial x}\right).
```

For $Ae^{ikx}$, $j=(\hbar k/m)|A|^2$. The step probabilities are correctly
given by *ratios of outgoing to incoming current*, not by ratios of squared
amplitudes:

```{math}
:label: step-rt
R=|r|^2,\qquad
T=\frac{k_2}{k_1}|t|^2,\qquad R+T=1.
```

Probability conservation plays the role here that particle-number
bookkeeping played in Stern–Gerlach chains.

## 7.6 Tunneling through a barrier

Section 7.4 showed total reflection when $E<V_0$ for a step that stays high
forever. What changes if the classically forbidden region has finite width
instead? Let a rectangular barrier have height $V_0>E$ and width $a$. Inside
the barrier, solutions are exponential rather than oscillatory, yet matching
at both boundaries leaves a nonzero transmitted amplitude. The exact
transmission probability is

```{math}
:label: barrier-transmission
T=\left[
1+\frac{V_0^2\sinh^2(\kappa a)}
{4E(V_0-E)}
\right]^{-1},
\qquad
\kappa=\frac{\sqrt{2m(V_0-E)}}{\hbar}.
```

For a thick or high barrier, $\kappa a\gg1$,

```{math}
T\approx
\frac{16E(V_0-E)}{V_0^2}e^{-2\kappa a}.
```

The exponential dependence explains why tunneling is highly sensitive to
barrier width and particle mass. Tunneling does not mean the particle
borrows energy and violates conservation. An energy measurement in the
stationary scattering state still gives $E$; the spatial wavefunction simply
extends through a region where a classical particle of that energy could
not travel.

### Example 7.2: compare two barrier widths

In the thick-barrier regime, increasing $a$ by $\Delta a$ multiplies $T$ by
$e^{-2\kappa\Delta a}$. If $\kappa\Delta a=1$, the transmission falls by
$e^{-2}\approx0.135$. This sensitivity underlies scanning tunneling
microscopy and many decay processes.

```{phet-legacy} quantum-tunneling
:label: fig:ch07-quantum-tunneling-sim

Send a wave packet at a rectangular barrier and adjust its width and height to
see the exponential sensitivity of equation {eq}`barrier-transmission`
directly: a reflected packet, a smaller transmitted one, and no borrowed
energy anywhere. A CheerpJ simulation takes tens of seconds to load on a cold
cache and is mouse-only.
```

### Above the barrier: resonant transmission

Equation {eq}`barrier-transmission` was derived for $E<V_0$, but the same
matching calculation applies for $E>V_0$, where the interior solution
oscillates instead of decaying, with
$k_2=\sqrt{2m(E-V_0)}/\hbar$. Formally replacing $\kappa\to ik_2$—so that
$\sinh(\kappa a)\to i\sin(k_2a)$—turns equation {eq}`barrier-transmission`
into

```{math}
:label: barrier-resonant-transmission
T=\left[1+\frac{V_0^2\sin^2(k_2a)}{4E(E-V_0)}\right]^{-1},
\qquad E>V_0.
```

Unlike the tunneling regime, this transmission is not monotonic in the
barrier width. Whenever $k_2a=n\pi$ for an integer $n$—the barrier width
equals a whole number of half wavelengths of the interior wave—$\sin(k_2a)=0$
and $T=1$: the barrier becomes completely transparent, exactly as an
antireflection coating of the right thickness eliminates reflected light.
Away from these resonances, some reflection persists even though $E>V_0$
classically guarantees transmission. The two formulas meet consistently at
$E=V_0$, where both $\kappa$ and $k_2$ vanish and a careful limit of either
expression gives the finite value $T=[1+mV_0a^2/(2\hbar^2)]^{-1}$ rather
than an ambiguous $0/0$.

:::{tip} One formula, two regimes
Equations {eq}`barrier-transmission` and {eq}`barrier-resonant-transmission`
are the same analytic function of energy, continued across $E=V_0$. Tunneling
and resonant transmission are not two different phenomena; they are the same
matching calculation evaluated on either side of one threshold.
:::

### Concept check 7.5

If a barrier is thick enough that $\kappa a\gg1$, can it ever be perfectly
transparent?

:::{dropdown} Answer
Not for $E<V_0$: $\sinh^2(\kappa a)$ grows without bound, so $T$ only shrinks
with increasing width. Perfect transmission ($T=1$) is a feature of the
$E>V_0$ resonant regime in equation {eq}`barrier-resonant-transmission`, where
the interior wave oscillates rather than decays.
:::

## 7.7 The harmonic oscillator

Every bound state so far was found by directly solving a differential
equation and matching boundary conditions—a fresh calculation for each new
energy level. The harmonic oscillator admits a much slicker, purely
algebraic route that sidesteps this repetition entirely. For

```{math}
\hat H=\frac{\hat p^2}{2m}+\frac12m\omega^2\hat x^2,
```

define

```{math}
\hat a=\sqrt{\frac{m\omega}{2\hbar}}\hat x
+\frac{i}{\sqrt{2m\hbar\omega}}\hat p,\qquad
\hat a^\dagger=\sqrt{\frac{m\omega}{2\hbar}}\hat x
-\frac{i}{\sqrt{2m\hbar\omega}}\hat p.
```

They satisfy $[\hat a,\hat a^\dagger]=1$, and

```{math}
:label: oscillator-hamiltonian
\hat H=\hbar\omega\left(\hat a^\dagger\hat a+\frac12\right).
```

If $\hat N=\hat a^\dagger\hat a$, its eigenstates obey

```{math}
\hat a|n\rangle=\sqrt n\,|n-1\rangle,\qquad
\hat a^\dagger|n\rangle=\sqrt{n+1}\,|n+1\rangle,
```

with

```{math}
:label: oscillator-spectrum
E_n=\hbar\omega\left(n+\frac12\right),\qquad n=0,1,2,\ldots
```

The ground state is defined by $\hat a|0\rangle=0$. In position space this
first-order equation gives a Gaussian, as Example 7.5 works out explicitly.
The ladder method obtains the complete spectrum without solving a new
differential equation for every level: every excited state is reached from
$|0\rangle$ by repeated algebra with $\hat a^\dagger$, rather than by solving
a new second-order boundary-value problem for each $n$ as Sections 7.2–7.4
required.

### Example 7.5: the ground state in position space

Writing $\hat p=-i\hbar\,d/dx$, the condition $\hat a\,\langle x|0\rangle=0$
becomes the first-order equation

```{math}
\sqrt{\frac{m\omega}{2\hbar}}\,x\,u_0(x)
+\sqrt{\frac{\hbar}{2m\omega}}\,\frac{du_0}{dx}=0,
\qquad\text{so}\qquad
\frac{du_0}{u_0}=-\frac{m\omega}{\hbar}x\,dx.
```

Integrating and normalizing gives

```{math}
:label: oscillator-ground-state
u_0(x)=\left(\frac{m\omega}{\pi\hbar}\right)^{1/4}
e^{-m\omega x^2/(2\hbar)}.
```

This is a Gaussian of exactly the form studied in Chapter 6 as a
minimum-uncertainty wave packet, with width $\sigma_x=\sqrt{\hbar/(2m\omega)}$
and zero mean momentum. It therefore saturates $\Delta x\,\Delta p=\hbar/2$,
just like the minimum-uncertainty packets of that chapter. But this
particular Gaussian does *not* spread with time the way a free-particle
packet does: it is an exact energy eigenstate, so
$|\psi(x,t)|^2=|u_0(x)|^2$ is stationary. Confining harmonic forces, unlike
free propagation, can hold a minimum-uncertainty packet in a permanent
balance between spreading and restoring force.

### Concept check 7.6

Why does the oscillator not have $E=0$?

:::{dropdown} Answer
The ground state has $E_0=\hbar\omega/2$. A state with both zero kinetic and
zero potential energy would require exact $p=0$ and $x=0$, contradicting
$[\hat x,\hat p]=i\hbar$.
:::

## Summary

- Stationary wavefunctions solve a Hamiltonian boundary-value problem.
- Confinement produces discrete energies and a nonzero ground-state energy.
- A finite well always binds at least one state, and gains new states at
  regular intervals of its dimensionless strength $z_0$.
- Scattering probabilities are ratios of probability currents; total
  reflection below a step can still carry a nonclassical phase shift and a
  nonzero forbidden-region density.
- Wavefunctions can penetrate forbidden regions and tunnel through finite
  barriers without violating energy conservation, while the same matching
  calculation above a barrier predicts resonant, perfectly transparent
  energies.
- Ladder operators reveal the equally spaced harmonic-oscillator spectrum and
  generate every excited state algebraically from one Gaussian ground state.

## Exercises

1. Derive equations {eq}`infinite-well-solutions` and
   {eq}`infinite-well-energies` from both boundary conditions.
2. Find $\langle x\rangle$ for every infinite-well energy eigenstate by
   symmetry.
3. For $(u_1+u_2)/\sqrt2$, calculate $|\psi(x,t)|^2$ explicitly and identify
   its oscillation period.
4. Show that no two distinct normalizable bound states in one dimension can
   have the same energy by analyzing their Wronskian.
5. Derive $r$ and $t$ for the potential step and verify equation
   {eq}`step-rt`.
6. Calculate the current for $Ae^{ikx}+Be^{-ikx}$.
7. Derive the continuity equation from the Schrödinger equation and its complex
   conjugate.
8. Estimate the change in thick-barrier transmission when the particle mass is
   multiplied by four.
9. Verify $[\hat a,\hat a^\dagger]=1$ from $[\hat x,\hat p]=i\hbar$.
10. Derive equation {eq}`oscillator-hamiltonian`.
11. Show that $\hat a^\dagger|n\rangle$ has energy $E_n+\hbar\omega$.
12. Example 7.5 derives the ground state $u_0(x)$. Apply $\hat a^\dagger$ to
    $u_0(x)$ in position space to find $u_1(x)$ explicitly, and verify by
    direct substitution that it solves equation {eq}`one-dimensional-tise`
    with $E_1=\tfrac32\hbar\omega$.
13. Starting from continuity of $u$ and $u'$ at $x=L/2$, and using the
    symmetry of the well to relate $u(-L/2)$ to $u(L/2)$, derive the even-
    parity condition in equation {eq}`finite-well-even`.
14. Derive the odd-parity condition in equation {eq}`finite-well-odd`
    following the same steps as Exercise 13.
15. For a well with $z_0=7$, find the total number of bound states and how
    many are even and how many are odd.
16. Explain, using the $\xi\to0$ limit of $\xi\tan\xi$, why a one-dimensional
    finite well can never have zero bound states, no matter how small $V_0$
    or $L$ is.
17. Derive equation {eq}`step-below-reflection` by matching $u$ and $u'$ at
    $x=0$ for $E<V_0$.
18. Show directly from equation {eq}`step-below-reflection` that $|r|=1$ for
    every $\kappa>0$, and confirm that $r\to-1$ as $\kappa\to\infty$.
19. Show that the probability current $j_{II}$ vanishes identically for
    $u_{II}=Ce^{-\kappa x}$, for any constant $C$, and explain why this is
    consistent with $R=1$.
20. Derive equation {eq}`barrier-resonant-transmission` from equation
    {eq}`barrier-transmission` by the substitution $\kappa\to ik_2$, and find
    the smallest barrier width $a$ giving $T=1$ for a given $k_2$.
21. Take the limit $E\to V_0$ of equation {eq}`barrier-transmission` carefully
    (expanding $\sinh(\kappa a)\approx\kappa a$) to show that
    $T(E{=}V_0)=[1+mV_0a^2/(2\hbar^2)]^{-1}$, and check that the same value
    follows from equation {eq}`barrier-resonant-transmission` in the limit
    $k_2\to0$.
22. Using the Gaussian ground state of equation {eq}`oscillator-ground-state`,
    calculate $\Delta x$ and $\Delta p$ explicitly and confirm
    $\Delta x\,\Delta p=\hbar/2$.
23. Explain, in terms of Ehrenfest's theorem from Chapter 6, why the mean
    position of an oscillator energy eigenstate is time independent even
    though a classical particle of the same energy oscillates back and forth.
24. Compare the ground-state energy $\hbar\omega/2$ of the harmonic oscillator
    with the ground-state energy of an infinite well of width
    $L=2\sqrt{\hbar/(m\omega)}$ (a rough width match). Which is larger, and
    why might that be expected from the shape of the two potentials near their
    minima?
