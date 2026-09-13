---
title: Stern–Gerlach Experiments
---

# Stern–Gerlach experiments

## Learning objectives

After this chapter, you should be able to:

- describe preparation, analysis, and detection in a Stern–Gerlach experiment;
- predict qualitative outcomes of sequential analyzers;
- distinguish an incoherent mixture from a coherent quantum state;
- infer three empirical rules that a quantum model must reproduce; and
- explain why spin is not adequately modeled as a tiny classical arrow.

## 1.1 An experiment before a formalism

Send a collimated beam of neutral silver atoms through a nonuniform magnetic
field. A classical magnetic dipole with moment $\boldsymbol\mu$ has potential
energy

```{math}
:label: magnetic-energy
U=-\boldsymbol\mu\cdot\mathbf B,
```

so a field gradient exerts a force. For a gradient along $z$,

```{math}
:label: sg-force
F_z=-\frac{\partial U}{\partial z}
    \approx \mu_z\frac{\partial B_z}{\partial z}.
```

If atomic magnetic moments could point in arbitrary directions, a narrow input
beam would spread into a continuous band. Instead, two separated traces appear.
We label them $z+$ and $z-$.

:::{note} What the apparatus measures
A Stern–Gerlach analyzer does not simply reveal the location of a pre-existing
little arrow. It couples an internal degree of freedom to the atom's path. The
spatial separation makes two possible outcomes visible at the detector.
:::

For a spin-$\tfrac12$ system, the measured $z$ component has only the values

```{math}
:label: sz-values
S_z=+\frac{\hbar}{2}\quad\text{or}\quad S_z=-\frac{\hbar}{2}.
```

We abbreviate an analyzer oriented along $z$ as $\mathrm{SG}_z$. Blocking one
exit turns the device into a **preparation apparatus**. Passing only the $z+$
beam prepares every transmitted atom in the same $z+$ condition.

## 1.2 Repeatability

Place a second $\mathrm{SG}_z$ analyzer after a first analyzer and retain only
the first $z+$ output. Every atom leaving the second analyzer exits through
$z+$; none exits through $z-$.

:::{admonition} Rule 1: repeatability
:class: tip
An immediate repetition of the same ideal measurement returns the same result
with certainty.
:::

The first analyzer has not merely sorted atoms. Selection of an outcome has
prepared a state that is definite for a repeated $S_z$ measurement.

### Example 1.1: counting atoms

A source sends $12{,}000$ atoms into $\mathrm{SG}_z$. The source has no preferred
orientation, so half emerge from each exit on average. The $z-$ exit is blocked,
and the $z+$ beam enters a second $\mathrm{SG}_z$.

About $6{,}000$ atoms reach the second analyzer, and all $6{,}000$ leave its
$z+$ exit. Statistical fluctuations affect the first split, but an ideal repeat
measurement does not create a second 50–50 split.

## 1.3 Incompatible questions

Now prepare $z+$ and send the atoms into $\mathrm{SG}_x$, whose field gradient
defines the $x$ direction. The output divides equally:

```{math}
:label: zx-probabilities
P(x+\mid z+)=P(x-\mid z+)=\frac12.
```

The $z+$ preparation is therefore not definite with respect to $S_x$. More
surprisingly, retain the $x+$ output and measure $S_z$ again. Both $z$ outcomes
now occur with equal probability.

```{math}
z+\longrightarrow x+\longrightarrow
\begin{cases}
z+ & \text{with probability }1/2,\\
z- & \text{with probability }1/2.
\end{cases}
```

The intervening $S_x$ measurement changes what can be predicted about $S_z$.
It is not consistent to say that the atom always possessed definite but unknown
values of both components and that each analyzer merely read its assigned one.

:::{admonition} Rule 2: incompatibility
:class: tip
Preparing a definite value of one spin component generally produces uncertain
outcomes for a different component. An intervening measurement can erase the
predictive certainty established by an earlier preparation.
:::

## 1.4 Recombining alternatives

Suppose a carefully designed device separates a $z+$ input into $x+$ and $x-$
paths and later recombines those paths coherently. If neither path reveals which
alternative occurred, the recombined beam can recover the original $z+$ state.
Blocking either path changes the later $S_z$ statistics.

This observation rules out the idea that the two paths always behave like two
ordinary sub-beams whose detected counts should simply be added. Quantum theory
assigns a complex **amplitude** to each indistinguishable alternative. The
amplitudes add first; their squared magnitude gives a probability.

:::{admonition} Rule 3: interference of alternatives
:class: tip
When alternatives are indistinguishable, add their probability amplitudes. When
a measurement makes the alternatives distinguishable, add their probabilities.
:::

This distinction will later become the difference between a coherent
superposition and an incoherent mixture.

## 1.5 A minimal model

The experimental facts suggest a compact theory:

- A preparation is represented by a **state**.
- A measurement has a discrete set of possible results.
- A state assigns an amplitude, not directly a probability, to each result.
- Measurement both produces a result and prepares a corresponding output state.
- Different analyzer orientations represent different, sometimes incompatible,
  physical questions.

For spin $\tfrac12$, two independent states suffice to describe every possible
pure spin state. We will represent them by vectors in a two-dimensional complex
vector space. The word “two-dimensional” refers to state space, not ordinary
physical space.

## 1.6 What spin is—and is not

Spin carries angular momentum and often a magnetic moment, but it is intrinsic:
it is not modeled successfully as a rigid sphere rotating about an axis. A
classical picture predicts continuously variable components, whereas the
apparatus gives two outcomes for every chosen axis. The name *spin* is useful,
but the experiments—not the name—determine its quantum meaning.

### Concept check 1.1

A $z+$ beam enters $\mathrm{SG}_x$. The $x-$ exit is blocked, and the transmitted
$x+$ beam enters another $\mathrm{SG}_x$. What fraction of the original $z+$
beam reaches the final $x+$ detector?

:::{dropdown} Answer
One half. The first $x$ measurement transmits half the atoms into $x+$. Repeating
the $S_x$ measurement then returns $x+$ with certainty.
:::

### Concept check 1.2

Why is a 50–50 collection of separately prepared $x+$ and $x-$ atoms not
automatically equivalent to a coherent recombination of the two paths?

:::{dropdown} Answer
The collection records mutually exclusive preparations and is an incoherent
mixture. A coherent recombination preserves the relative phase between the two
amplitudes, so later probabilities can contain interference terms.
:::

## Summary

- A Stern–Gerlach analyzer correlates a spin component with one of two paths.
- Filtering an output prepares a repeatable state for that component.
- Orthogonal spin components are incompatible: preparing one makes another
  uncertain.
- Indistinguishable alternatives interfere through complex amplitudes.
- A spin-$\tfrac12$ state requires a two-dimensional complex state space.

## Exercises

1. An unpolarized beam of $20{,}000$ atoms passes through $\mathrm{SG}_z$; the
   $z+$ output then passes through $\mathrm{SG}_x$. Estimate the counts in the
   two final outputs.
2. Predict the possible final outcomes and their probabilities for
   $z+\rightarrow x-\rightarrow z$.
3. Insert a second $\mathrm{SG}_x$ after the $x-$ selection in Exercise 2. Explain
   why its result differs qualitatively from the final $S_z$ result.
4. A student says, “The first $S_z$ analyzer tells us which atoms were already
   pointing up.” Identify two observations in this chapter that this classical
   explanation fails to capture.
5. Explain operationally what must be changed to turn a spin analyzer into a
   state-preparation apparatus.
6. Design a sequence of ideal analyzers that begins with $z+$ and has a final
   $z-$ detection probability of $1/2$. Give at least two sequences and explain
   them.
