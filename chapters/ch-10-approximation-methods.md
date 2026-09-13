---
title: Approximation Methods
---

# Approximation methods

## Learning objectives

After this chapter, you should be able to:

- calculate first- and second-order stationary perturbation corrections;
- handle a perturbation inside a degenerate subspace;
- apply the variational principle to estimate a ground-state energy;
- identify the semiclassical regime and use WKB connection ideas;
- calculate first-order transition amplitudes from a time-dependent
  perturbation; and
- judge an approximation using dimensionless parameters and limiting cases.

## 10.1 Why approximations are part of the theory

Exactly solvable Hamiltonians are rare. Real atoms interact with fields and
other particles; real wells are not perfectly square; and most coupled
differential equations do not have closed-form solutions. Approximation
methods are controlled ways to retain the most important physics.

```{phet} atomic-interactions
:label: fig:ch10-atomic-interactions-sim

The interaction between two real atoms is not a square well or a harmonic
oscillator; it is closer to the Lennard-Jones potential this simulation
plots. Adjust the atom types and separation and watch the force and potential
energy curves change shape—exactly the kind of realistic potential the
methods below are built to handle without an exact solution.
```

Before calculating, identify a dimensionless small or large parameter. An
answer labeled “first order” is useful only when omitted terms are expected to
be smaller. After calculating, check normalization, units, symmetry, and the
limit in which the perturbation disappears.

This chapter develops five complementary tools. Stationary perturbation theory
(Sections 10.2–10.3) corrects the energies and states of a Hamiltonian that is
close to one already solved. The variational principle (Section 10.4) needs no
such reference Hamiltonian at all, only a plausible guess for the shape of a
ground state. WKB (Section 10.5) exploits a different smallness—a slowly
varying potential rather than a weak one—and applies even when no nearby
solvable problem exists. Time-dependent perturbation theory (Section 10.6)
answers a different question altogether: not "what is the corrected energy"
but "what is the probability of a transition." Section 10.7 collects these
into a single decision procedure. None of the five methods is a substitute for
solving the Schrödinger equation exactly; each is a controlled bookkeeping
scheme for what happens when an exact solution is out of reach.

## 10.2 Nondegenerate stationary perturbation theory

Let

```{math}
\hat H=\hat H_0+\lambda\hat V,
```

where $\hat H_0|n^{(0)}\rangle=E_n^{(0)}|n^{(0)}\rangle$ is solved and
$\lambda$ tracks order. Expand

```{math}
E_n=E_n^{(0)}+\lambda E_n^{(1)}
+\lambda^2E_n^{(2)}+\cdots
```

and similarly for the ket. Matching powers of $\lambda$ gives

```{math}
:label: first-order-energy
E_n^{(1)}=\langle n^{(0)}|\hat V|n^{(0)}\rangle,
```

```{math}
:label: first-order-state
|n^{(1)}\rangle
=\sum_{m\ne n}|m^{(0)}\rangle
\frac{\langle m^{(0)}|\hat V|n^{(0)}\rangle}
{E_n^{(0)}-E_m^{(0)}},
```

and

```{math}
:label: second-order-energy
E_n^{(2)}
=\sum_{m\ne n}
\frac{|\langle m^{(0)}|\hat V|n^{(0)}\rangle|^2}
{E_n^{(0)}-E_m^{(0)}}.
```

The first energy correction is the perturbing potential averaged in the
unperturbed state. State mixing is large when a coupling matrix element is
large or an energy denominator is small.

### Example 10.1: a two-level perturbation

Take

```{math}
\hat H_0=\frac{\Delta}{2}\sigma_z,\qquad
\hat V=g\sigma_x,\qquad |g|\ll|\Delta|.
```

The diagonal matrix elements of $\hat V$ vanish, so both first-order energy
shifts vanish. For the upper level,

```{math}
E_+^{(2)}=\frac{g^2}{\Delta},
```

while $E_-^{(2)}=-g^2/\Delta$. Expanding the exact eigenvalues
$\pm\sqrt{\Delta^2/4+g^2}$ confirms these results. Comparison with an exact
answer is an excellent way to understand an approximation's domain.

:::{figure} ../images/figures/ch10-perturbative-level-shifts.svg
:name: fig-perturbative-level-shifts
:alt: A weak off-diagonal coupling pushes a two-level system's upper and lower energies apart at second order. A graph compares the exact upper energy with its second-order approximation, showing agreement only at small coupling.
:width: 100%

Off-diagonal coupling produces level repulsion even when the first-order
diagonal shifts vanish. The truncated series follows the exact answer only
while the coupling remains small relative to the unperturbed gap.
:::

### Selection rules save work

If symmetry forces $\langle m|\hat V|n\rangle=0$, that state does not appear
in the corresponding sum. For example, an odd perturbation has zero diagonal
matrix element in a parity eigenstate, so its first-order energy shift
vanishes. A zero correction often expresses symmetry, not absence of a
physical effect at every order.

### Concept check 10.1

Can a first-order correction vanish while the exact energy still changes?

:::{dropdown} Answer
Yes. Symmetry may make the diagonal matrix element zero while second- and
higher-order corrections remain.
:::

### Example 10.2: an anharmonic correction that grows with the state

Take the harmonic oscillator of Chapter 7,
$\hat H_0=\hbar\omega(\hat a^\dagger\hat a+\tfrac12)$, perturbed by a quartic
term $\hat V=\hat x^4$ with strength $\lambda$, so $\hat H=\hat H_0+\lambda\hat
x^4$. Writing $\hat x=\sqrt{\hbar/(2m\omega)}\,(\hat a+\hat a^\dagger)$ and
expanding $(\hat a+\hat a^\dagger)^4$, only terms that return to $|n\rangle$
survive the diagonal matrix element, and their combinatorics give

```{math}
:label: quartic-shift
E_n^{(1)}=\lambda\langle n|\hat x^4|n\rangle
=\frac{3\lambda\hbar^2}{4m^2\omega^2}\left(2n^2+2n+1\right).
```

Two features are worth pausing on. First, unlike Example 10.1, no diagonal
matrix element vanishes here—the quartic term is even, like the unperturbed
potential, so nothing forbids a first-order shift. Second, and more
important, the correction is not a fixed small number: it grows quadratically
with $n$. A denominator or matrix element being "small" is a statement about
one particular calculation, not a permanent property of $\lambda$.

:::{caution} A small coupling is not a small correction at every level
Fix $\lambda$ as small as you like. Equation {eq}`quartic-shift` shows
$E_n^{(1)}$ growing like $n^2$, while the unperturbed level spacing $\hbar
\omega$ stays fixed. For large enough $n$, $E_n^{(1)}$ eventually becomes
comparable to $\hbar\omega$ itself, and first-order perturbation theory can no
longer be trusted there even though it worked well for the low-lying levels
with the very same $\lambda$. "The perturbation is weak" must be checked
against the specific state being corrected, not asserted once for the whole
spectrum.
:::

### Concept check 10.2

For the quartic oscillator of Example 10.2, does making $\lambda$ smaller
guarantee that first-order perturbation theory is accurate for every level
$n$?

:::{dropdown} Answer
No. Equation {eq}`quartic-shift` grows like $n^2$ for fixed $\lambda$, so for
any nonzero $\lambda$ there is always some large enough $n$ at which the
correction rivals the level spacing $\hbar\omega$. Making $\lambda$ smaller
only pushes that breakdown to higher $n$; it does not remove it.
:::

## 10.3 Degenerate perturbation theory

Equation {eq}`first-order-state` fails when a denominator vanishes: dividing
by $E_n^{(0)}-E_m^{(0)}=0$ is not a small correction but a breakdown of the
expansion. Whenever two or more unperturbed states share an energy, the
zeroth-order states are not yet uniquely determined—any combination within the
degenerate subspace is equally an eigenstate of $\hat H_0$—and the
perturbation itself must be used to select the right combination before a
first-order energy shift means anything. Within a
degenerate subspace, first diagonalize the matrix

```{math}
V_{ab}=\langle a^{(0)}|\hat V|b^{(0)}\rangle.
```

Its eigenvectors are the correct zeroth-order combinations, and its
eigenvalues are their first-order energy shifts.

### Example 10.3: splitting a degenerate pair

Suppose $|1\rangle$ and $|2\rangle$ both have energy $E_0$, and within their
subspace

```{math}
\hat V\doteq
\begin{pmatrix}
\epsilon&v\\
v^*&\epsilon
\end{pmatrix}.
```

The shifts are $\epsilon\pm|v|$. If $v=|v|e^{i\chi}$, corresponding normalized
states can be chosen as

```{math}
\frac{|1\rangle\pm e^{-i\chi}|2\rangle}{\sqrt2}.
```

The perturbation both selects a preferred basis and lifts the degeneracy.

## 10.4 The variational principle

Sections 10.2 and 10.3 both correct a Hamiltonian that is already close to a
solved one. The variational principle needs no such reference Hamiltonian: it
converts a guess about the general shape of a ground state directly into a
number, at the price of no longer knowing how close that number is to the
truth without further work.

For a Hamiltonian bounded below, any normalized trial state obeys

```{math}
:label: variational-bound
E_{\mathrm{trial}}
=\langle\psi_{\mathrm{trial}}|\hat H|\psi_{\mathrm{trial}}\rangle
\ge E_0.
```

Expanding the trial state in exact energy eigenstates proves the result:
$E_{\mathrm{trial}}=\sum_n|c_n|^2E_n\ge E_0$. Varying parameters in a sensible
trial family gives the best upper bound available within that family.

### Example 10.4: estimate a confined ground state

For a one-dimensional Hamiltonian

```{math}
\hat H=\frac{\hat p^2}{2m}+a|x|,
```

choose the normalized Gaussian

```{math}
\psi_b(x)=\frac{1}{(\pi b^2)^{1/4}}e^{-x^2/(2b^2)}.
```

Its energy is

```{math}
E(b)=\frac{\hbar^2}{4mb^2}+\frac{ab}{\sqrt\pi}.
```

Minimizing $E(b)$ balances localization kinetic energy against potential
energy and determines both an energy upper bound and an approximate spatial
scale. Dimensional analysis already predicts
$b\sim(\hbar^2/ma)^{1/3}$.

:::{figure} ../images/figures/ch10-variational-energy.svg
:name: fig-variational-energy
:alt: Kinetic energy decreases with trial width while potential energy increases. Their sum has a minimum marked as the best state within the trial family, remaining above the exact ground-state energy.
:width: 100%

Variational optimization balances competing costs: a narrow state pays high
kinetic energy, while a broad state samples more potential energy. The minimum
is the best upper bound supplied by the chosen family, not necessarily the
exact ground energy.
:::

The variational method is safest for the ground state. The reason is worth
making explicit rather than taken on faith. Expanding any normalized trial
state in the exact eigenbasis, $|\psi_{\mathrm{trial}}\rangle=\sum_nc_n|n
\rangle$, gives $E_{\mathrm{trial}}=\sum_n|c_n|^2E_n$, a weighted average of
*all* the exact energies with nonnegative weights summing to one. Such an
average can never fall below the smallest term $E_0$, which is exactly
equation {eq}`variational-bound`. There is no equally automatic bound relative
to the first excited energy $E_1$: nothing stops a trial state from having
some overlap $|c_0|^2>0$ with the true ground state, which pulls
$E_{\mathrm{trial}}$ below $E_1$ without violating anything. Excited-state
estimates therefore require trial functions built to be exactly orthogonal to
the true ground state—typically enforced by symmetry, such as parity or a
node structure, rather than by numerically minimizing overlap. If the exact
ground state is not fully known, an excited-state trial function orthogonal
only to an *approximate* ground state offers no guaranteed bound at all.

```{phet-legacy} bound-states
:label: fig:ch10-bound-states-variational-sim

Build a well and read off its ground-state energy directly, then compare that
exact number against the trial-Gaussian estimate from equation
{eq}`variational-bound`—the same simulation introduced for the finite well in
Chapter 7, now used to check a variational guess rather than to explore an
exactly solvable potential.
```

### Concept check 10.3

Why is a variational energy below a known exact ground energy a warning?

:::{dropdown} Answer
For a normalized trial state and the correct Hamiltonian it is impossible.
Such a result signals an algebra, normalization, boundary-condition, or
numerical error.
:::

## 10.5 The WKB approximation

The variational principle traded a small parameter for a guessed function
shape. WKB reintroduces a small parameter, but a geometric one: not a weak
coupling, but a potential that varies slowly compared with the local de
Broglie wavelength. Write a stationary wavefunction locally as

```{math}
\psi(x)=A(x)e^{iS(x)/\hbar}.
```

When the potential varies slowly over a local wavelength, the leading
semiclassical solution in an allowed region is

```{math}
:label: wkb-allowed
\psi(x)\approx\frac{1}{\sqrt{p(x)}}
\left[C_+e^{(i/\hbar)\int^x p(x')dx'}
+C_-e^{-(i/\hbar)\int^x p(x')dx'}\right],
```

where $p(x)=\sqrt{2m[E-V(x)]}$. In a forbidden region, set
$\kappa(x)=\sqrt{2m[V(x)-E]}/\hbar$ to obtain growing and decaying
exponentials.

Across a broad forbidden region $x_1<x<x_2$, the leading tunneling factor is

```{math}
:label: wkb-tunneling
T\sim\exp\left[-2\int_{x_1}^{x_2}\kappa(x)\,dx\right].
```

For bound motion between two smooth turning points, connection formulas give

```{math}
:label: wkb-quantization
\int_{x_1}^{x_2}p(x)\,dx
=\left(n+\frac12\right)\pi\hbar.
```

WKB fails near a turning point if used without connection formulas and fails
when the potential changes substantially within one wavelength.

:::{figure} ../images/figures/ch10-wkb-turning-points.svg
:name: fig-wkb-turning-points
:alt: A smooth potential crosses a horizontal energy line at two turning points. Between them the WKB wavefunction oscillates with changing wavelength; outside them it decays exponentially in classically forbidden regions.
:width: 100%

Turning points divide oscillatory, classically allowed motion from exponential,
forbidden behavior. Connection formulas—not the separate local expressions—are
what carry one approximation smoothly into the other.
:::

### Concept check 10.4

Does WKB require high total energy in every problem?

:::{dropdown} Answer
No. It requires the wavelength to vary slowly on the wavelength scale. High
energy often helps, but slowly varying potentials can also create a valid
semiclassical regime.
:::

### Example 10.5: the quantum bouncer

A particle of mass $m$ rests above an impenetrable floor under a uniform
downward force $F$: $V(x)=Fx$ for $x>0$ and $V(x)=\infty$ for $x<0$. This
potential has only one smooth classical turning point, at $x_t=E/F$; the other
boundary is not a turning point at all but a hard wall, where the exact
wavefunction must vanish outright rather than decay smoothly.

Equation {eq}`wkb-quantization` was derived for two smooth turning points,
each contributing a connection-formula phase of $\pi/4$. Standard
connection-formula analysis shows that a hard wall contributes $\pi/2$
instead, since the wave is forced to a node exactly at the wall rather than
merely turning around over an extended region. Replacing one $\pi/4$ by
$\pi/2$ changes the quantization condition to

```{math}
:label: bouncer-quantization
\int_0^{x_t}p(x)\,dx=\left(n+\frac34\right)\pi\hbar,
\qquad n=0,1,2,\ldots
```

With $p(x)=\sqrt{2m(E-Fx)}$, substituting $u=E-Fx$ gives

```{math}
\int_0^{E/F}\sqrt{2m(E-Fx)}\,dx=\frac{2\sqrt{2m}}{3F}E^{3/2}.
```

Solving equation {eq}`bouncer-quantization` for $E$ gives

```{math}
:label: bouncer-energy
E_n=\left[\frac{9\pi^2\hbar^2F^2}{8m}\left(n+\frac34\right)^2\right]^{1/3},
\qquad n=0,1,2,\ldots
```

so $E_n\propto(F^2\hbar^2n^2)^{1/3}$ for large $n$. Two features distinguish
this spectrum from the harmonic oscillator of Chapter 7: the energies grow as
$n^{2/3}$ rather than linearly, so the fractional level spacing
$(E_{n+1}-E_n)/E_n$ *shrinks* as $n$ grows instead of staying fixed. WKB
reaches this result without ever constructing the bouncer's exact
Airy-function wavefunction—a genuine payoff of the method beyond the
textbook-symmetric wells where an exact solution is available for comparison.

### Concept check 10.5

Why isn't the quantum bouncer's quantization condition the same
$(n+\tfrac12)\pi\hbar$ rule used for the harmonic oscillator?

:::{dropdown} Answer
The oscillator has two smooth classical turning points, each contributing a
connection-formula phase of $\pi/4$, for a total of $\pi/2$. The bouncer has
one smooth turning point and one hard wall; the wall enforces an exact node
and contributes $\pi/2$ by itself, for the same total phase but a different
split, giving the $(n+\tfrac34)\pi\hbar$ condition of equation
{eq}`bouncer-quantization`.
:::

## 10.6 Time-dependent perturbations

Stationary perturbation theory and the variational method both estimate
properties of energy eigenstates. Time-dependent perturbation theory asks a
different kind of question: given a system prepared in one eigenstate of
$\hat H_0$, with what probability does a time-dependent coupling later find it
in another? Let

```{math}
\hat H(t)=\hat H_0+\lambda\hat V(t).
```

Starting in $|i\rangle$, the first-order amplitude to find $|f\rangle$ is

```{math}
:label: first-order-transition
c_f^{(1)}(t)
=-\frac{i}{\hbar}\int_0^t
e^{i\omega_{fi}t'}
\langle f|\hat V(t')|i\rangle\,dt',
\qquad
\omega_{fi}=\frac{E_f-E_i}{\hbar}.
```

### Example 10.6: a coupling switched on and held constant

The simplest case is a time-independent matrix element $V_{fi}=\langle f|\hat
V|i\rangle$ switched on suddenly at $t=0$ and left constant afterward. Equation
{eq}`first-order-transition` then integrates directly:

```{math}
c_f^{(1)}(T)=-\frac{i}{\hbar}V_{fi}
\int_0^Te^{i\omega_{fi}t'}\,dt'
=-\frac{V_{fi}}{\hbar}\,\frac{e^{i\omega_{fi}T}-1}{\omega_{fi}}.
```

Taking $|c_f^{(1)}(T)|^2$ and using
$|e^{i\theta}-1|^2=2-2\cos\theta=4\sin^2(\theta/2)$ gives

```{math}
:label: constant-transition-probability
P_{i\to f}(T)=\frac{|V_{fi}|^2}{\hbar^2}\,
\frac{\sin^2(\omega_{fi}T/2)}{(\omega_{fi}/2)^2}.
```

At exact resonance, $\omega_{fi}=0$, this reduces to
$P_{i\to f}(T)=|V_{fi}|^2T^2/\hbar^2$: the probability grows without bound as
$T^2$, a reminder that first-order perturbation theory is itself only a
short-time approximation and must break down—by unitarity, $P$ cannot exceed
one—before $T$ grows too large. Away from resonance, equation
{eq}`constant-transition-probability` oscillates in $T$ without growing,
confined between $0$ and $4|V_{fi}|^2/(\hbar\omega_{fi})^2$.

Viewed as a function of $\omega_{fi}$ at fixed $T$, equation
{eq}`constant-transition-probability` is a single central peak of height
$|V_{fi}|^2T^2/\hbar^2$ and width (first zero) at
$|\omega_{fi}|=2\pi/T$, surrounded by decaying side lobes—the same
$\operatorname{sinc}^2$ line shape that appears in single-slit diffraction.
The peak narrows as $1/T$ while its height grows as $T^2$; a longer
observation window makes the transition simultaneously more probable at exact
resonance and more sharply selective in energy. This time–frequency trade-off
is what allows the discrete result of this example to reproduce the smooth,
irreversible-looking rate of equation {eq}`golden-rule` once many closely
spaced final states are summed over.

### Concept check 10.6

Does making the interaction time $T$ longer in Example 10.6 make a transition
more or less selective in energy?

:::{dropdown} Answer
More selective. The peak of equation {eq}`constant-transition-probability`
narrows in $\omega_{fi}$ as $1/T$ even as its height grows as $T^2$. In the
limit of very long $T$ this sharply peaked, narrow function is what allows a
sum over many closely spaced final states to collapse into the
energy-conserving rate of Fermi's golden rule, equation {eq}`golden-rule`.
:::

An oscillating perturbation contains phases $e^{\pm i\omega t}$. The integral
grows most strongly when the driving frequency is near
$|\omega_{fi}|$: resonance is constructive accumulation of transition
amplitude over time.

For a long interaction and a dense set of final states, the transition rate
often takes the form

```{math}
:label: golden-rule
\Gamma_{i\to f}
=\frac{2\pi}{\hbar}|V_{fi}|^2\rho(E_f),
```

known as Fermi's golden rule. The density of available final states
$\rho(E_f)$ matters alongside the coupling strength.

## 10.7 Choosing and checking a method

Use stationary perturbation theory for weak changes to known discrete
eigenstates, degenerate perturbation theory when small denominators signal a
degenerate subspace, the variational method for ground-state bounds, WKB for
slowly varying potentials or semiclassical tunneling, and time-dependent
perturbation theory for weakly driven transitions.

An approximation should report:

1. the parameter assumed small or large;
2. the order retained;
3. the symmetry restrictions used;
4. the range where the expression is expected to work; and
5. at least one independent check.

## Summary

- Perturbation theory organizes corrections in powers of a small coupling, but
  "small" must be checked state by state: a fixed coupling can produce an
  arbitrarily large correction at a high enough quantum number.
- Degenerate spaces must be diagonalized before nondegenerate formulas apply.
- The variational principle gives an upper bound to the ground energy for any
  normalized trial state; the same guarantee does not extend to excited
  states without enforced orthogonality to the true ground state.
- WKB describes slowly varying waves, semiclassical quantization, and
  exponential tunneling; a hard wall and a smooth turning point contribute
  different phases to the same connection formula.
- Time-dependent perturbations create transitions by coherent amplitude
  accumulation, especially near resonance, and a longer interaction time
  trades a broader, weaker response for a narrower, more resonance-selective
  one.
- Every approximation needs an explicit control parameter and validity check.

## Exercises

1. Derive equations {eq}`first-order-energy` and
   {eq}`first-order-state` by matching first powers of $\lambda$.
2. Expand the exact eigenvalues in Example 10.1 through fourth order in
   $g/\Delta$.
3. For an infinite well perturbed by $V_1(x)=\epsilon x/L$, calculate the
   first-order energy shift.
4. Use parity to decide which matrix elements connect even and odd states for
   even and odd perturbations.
5. Diagonalize the matrix in Example 10.3 and verify its phase-dependent
   eigenvectors.
6. Minimize the trial energy in Example 10.4 and give the numerical coefficient
   multiplying its natural energy scale.
7. Prove the variational bound by expanding a normalized trial state in exact
   eigenstates.
8. Apply equation {eq}`wkb-quantization` to the harmonic oscillator and
   recover its exact energies.
9. Show that equation {eq}`wkb-tunneling` reduces to the exponential part of
   the rectangular-barrier result.
10. Redo the calculation of Example 10.6 for a matrix element that is switched
    on at $t=0$ and switched off again at $t=T/2$, remaining zero afterward.
    Find $c_f^{(1)}(t)$ for $t>T/2$ and compare $|c_f^{(1)}|^2$ with equation
    {eq}`constant-transition-probability` evaluated at the same total
    "on" time.
11. State which approximation method is best suited to four scenarios:
    a weak Stark shift, a ground energy of an anharmonic well, alpha decay, and
    weak resonant light absorption.
12. Identify a dimensionless validity parameter for each method used in this
    chapter.
13. Verify equation {eq}`quartic-shift` for $n=0$ and $n=1$ directly, by
    expanding $(\hat a+\hat a^\dagger)^4$ in normal-ordered form and evaluating
    each surviving term between $\langle n|$ and $|n\rangle$.
14. For fixed small $\lambda$ in Example 10.2, find the quantum number $n^*$ at
    which $E_n^{(1)}$ first becomes comparable to the unperturbed spacing
    $\hbar\omega$. Explain why $n^*$ depends on $\lambda$ even though $\lambda$
    is "small" by assumption.
15. A perturbation $\hat V=\mu\hat x$ (linear, not quadratic) is added to the
    harmonic oscillator. Show that first-order perturbation theory predicts a
    zero energy shift at every level, then find the exact shifted spectrum by
    completing the square in the full Hamiltonian, and explain why the
    "vanishing" first-order result is not a contradiction.
16. Using the eigenstate-expansion argument of Section 10.4, explain why no
    two normalized trial states can both give an expectation value strictly
    below the true ground energy $E_0$ of the same Hamiltonian.
17. Give a concrete example of a trial state that is exactly orthogonal to an
    *approximate* (numerically obtained, not exact) ground state, and explain
    why minimizing its energy need not bound the true first excited energy
    from above.
18. Derive the classical turning point $x_t=E/F$ and the WKB integral for the
    quantum bouncer of Example 10.5, and confirm both the quantization
    condition {eq}`bouncer-quantization` and the resulting scaling
    $E_n\propto(F^2\hbar^2n^2)^{1/3}$.
19. Compare the quantum-bouncer energies at $n=0$ and $n=10$ using equation
    {eq}`bouncer-energy`: by what factor does the energy increase? Does the
    fractional spacing $(E_{n+1}-E_n)/E_n$ grow or shrink with $n$?
20. Explain, in terms of the boundary condition on the wavefunction, why a
    hard wall and a smooth classical turning point contribute different
    phases to a WKB connection formula.
21. Starting from equation {eq}`first-order-transition`, rederive equation
    {eq}`constant-transition-probability`, and show that it reduces to
    $P_{i\to f}(T)\approx|V_{fi}|^2T^2/\hbar^2$ in the limit
    $\omega_{fi}T\ll1$.
22. Show that the peak value of equation {eq}`constant-transition-probability`
    grows as $T^2$ while its width in $\omega_{fi}$ shrinks as $1/T$, so that
    the area under the peak approaches a constant. Explain in one sentence how
    this supports treating the transition rate as time-independent once many
    closely spaced final states are summed, as in equation {eq}`golden-rule`.
23. A perturbation is switched on with a smooth ramp instead of the abrupt
    step used in Example 10.6. Without repeating the full integral, explain
    qualitatively how a smoother switch-on changes the side lobes of the
    $\operatorname{sinc}^2$ line shape far from resonance.
24. For each of the five methods developed in this chapter, write one sentence
    describing the physical situation where it is the natural first method to
    try, and a second sentence describing a warning sign—in the setup or in
    the answer—that the method has been pushed past its domain of validity.
