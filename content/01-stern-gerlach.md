---
title: Stern–Gerlach Experiments
---

# Stern–Gerlach experiments

## Learning objectives

After this chapter, you should be able to:

- describe preparation, analysis, and detection in a Stern–Gerlach experiment;
- predict qualitative outcomes of sequential analyzers;
- calculate route probabilities and expected counts for analyzers at arbitrary
  relative angles;
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

### Reading the experiment from left to right

Every experiment in this unit can be separated into three operational stages:

1. A **preparation** specifies how the incoming ensemble was made. A source by
   itself may be unpolarized; a source followed by a filter prepares a selected
   spin state.
2. A **transformation** changes the state without yet recording a spin result.
   Examples include a uniform magnetic field or a coherent path recombiner.
3. A **measurement** ends in macroscopically distinguishable records, such as
   counts at the two exits of an analyzer.

This vocabulary prevents a frequent ambiguity. The symbol $z+$ may name an
outcome at a detector, the exit path associated with that outcome, or the state
prepared by selecting that path. Context will usually distinguish the three,
but they are not literally the same object.

The basic observable data are counts. If $N_+$ and $N_-$ atoms are detected at
the two exits, the measured relative frequencies are

```{math}
f_+=\frac{N_+}{N_++N_-},\qquad
f_-=\frac{N_-}{N_++N_-}.
```

Quantum theory predicts the probabilities approached by these frequencies
over many repetitions. It does not ordinarily predict which exit one
particular atom will take.

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

Repeatability also gives us an operational definition of the label $|+z\rangle$
that will be introduced formally in Chapter 2: it means the preparation that
produces $z+$ with certainty when immediately analyzed along $z$. We do not
need to imagine what the atom is “really doing” between devices in order to
define the state reproducibly.

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

### What “disturbance” does and does not explain

It is tempting to rescue the classical-arrow model by saying that the middle
analyzer physically bumps the atom. But the problem is deeper than uncontrolled
mechanical disturbance. An ideal $\mathrm{SG}_x$ analyzer produces a new state
that is perfectly repeatable for $S_x$ while certainty about $S_z$ is lost.
The device has not merely added random noise; it has replaced one definite
quantum question with another.

The order of analyzers therefore matters. Compare

```{math}
z+\longrightarrow z+\longrightarrow x
```

with

```{math}
z+\longrightarrow x+\longrightarrow z.
```

In the first sequence, the repeated $z$ selection changes nothing before the
final 50–50 $x$ split. In the second, the selected $x+$ result makes the final
$z$ result 50–50. Later we will express this order dependence using products
of noncommuting matrices.

### Analyzers at a general angle

The $x$ and $z$ axes are separated by $90^\circ$, but the apparatus can be
oriented at any angle. If a beam is prepared spin-up along a unit vector
$\mathbf a$ and analyzed along $\mathbf b$, experiment gives

```{math}
:label: empirical-angle-rule
P(+\mathbf b\mid+\mathbf a)=\cos^2\frac{\alpha}{2},\qquad
P(-\mathbf b\mid+\mathbf a)=\sin^2\frac{\alpha}{2},
```

where $\alpha$ is the angle between $\mathbf a$ and $\mathbf b$. This one rule
contains the cases already discussed: aligned analyzers give certainty,
oppositely aligned analyzers give the opposite outcome with certainty, and
perpendicular analyzers give equal probabilities. Chapter 2 will derive this
half-angle law from state vectors rather than take it as an empirical summary.

### Example 1.2: three analyzer directions

A $z+$ beam passes through an analyzer whose axis $\mathbf n$ is $60^\circ$
from $+z$, and only the $+\mathbf n$ output is retained. That beam is then
measured along $z$.

At the middle analyzer,

```{math}
P(+\mathbf n\mid z+)=\cos^2 30^\circ=\frac34.
```

The selected middle output is a new $+\mathbf n$ preparation. Since the angle
back to $+z$ is again $60^\circ$,

```{math}
P(z+\mid+\mathbf n)=\frac34,qquad
P(z-\mid+\mathbf n)=\frac14.
```

Thus $9/16$ of the original atoms reach the final $z+$ detector and $3/16$
reach the final $z-$ detector; the remaining quarter was blocked at the middle
analyzer. Conditional probabilities must be multiplied along a selected path.

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

The word **coherently** carries experimental content. The apparatus must
preserve a stable relation between the phases accumulated on the two paths.
If vibrations, stray fields, or a path detector randomize that relation, the
interference washes out even when nobody reads the detector. What matters is
whether a durable physical record could distinguish the alternatives, not
whether a person happens to look.

One can summarize the alternatives with two limiting arrangements:

- **Both paths open and recombined:** add the two complex amplitudes, including
  their relative phase, and then square the magnitude.
- **Paths detected separately or phase-randomized:** square the magnitudes for
  the alternatives separately and then add the probabilities.

This is why “half the atoms went through each arm” is not a complete
description of the coherent experiment. The path amplitudes can cancel at one
output and reinforce at another even though each open arm alone sends atoms to
both outputs.

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

### From laboratory rules to mathematical demands

The experiments already tell us what the coming mathematics must accomplish.
A suitable model needs:

- two mutually exclusive outcomes for each analyzer direction;
- a way to represent a preparation that is certain for one outcome;
- continuous families of other preparations, because the analyzer direction
  varies continuously;
- a rule that produces normalized probabilities;
- an update rule after an outcome is selected; and
- phase information capable of describing coherent recombination.

Real two-component probability lists are not enough: they retain the weights
of alternatives but lose the phase that controls interference. Two-component
**complex** vectors supply exactly the missing structure. This is the
motivation for introducing kets before wavefunctions.

## 1.6 What spin is—and is not

Spin carries angular momentum and often a magnetic moment, but it is intrinsic:
it is not modeled successfully as a rigid sphere rotating about an axis. A
classical picture predicts continuously variable components, whereas the
apparatus gives two outcomes for every chosen axis. The name *spin* is useful,
but the experiments—not the name—determine its quantum meaning.

A classical arrow also obeys a different angular probability rule. If it
pointed at a known angle $\alpha$ to an analyzer, its projected component would
be proportional to $\cos\alpha$ and would vary continuously. The quantum
apparatus instead returns only $\pm\hbar/2$, with the angle controlling the
relative frequencies through equation {eq}`empirical-angle-rule`. The Bloch
sphere introduced in Chapter 2 looks like a sphere of arrows, but each arrow
labels an entire preparation and its statistics; it is not a claim that the
particle contains a tiny rotating pointer.

## 1.7 A systematic way to predict analyzer chains

Until the vector formalism is available, a short operational recipe is enough
for ideal sequential measurements:

1. Identify the state entering the first analyzer. If the source is
   unpolarized, the first analyzer produces equal counts.
2. At each analyzer, measure the angle from the **most recently selected
   preparation axis**, not necessarily from the original axis.
3. Use equation {eq}`empirical-angle-rule` for each branch.
4. Multiply conditional probabilities along one branch; add probabilities only
   when mutually exclusive detected branches are pooled.
5. If paths are recombined coherently, stop using this probability-tree recipe.
   Amplitudes and their phases are then required.

### Example 1.3: keep all branches straight

An unpolarized source sends $16{,}000$ atoms into $\mathrm{SG}_z$. The $z+$
exit is selected, then the $x-$ exit of an $\mathrm{SG}_x$ analyzer is selected,
and finally both exits of $\mathrm{SG}_z$ are counted.

The expected bookkeeping is

```{math}
16{,}000\xrightarrow{z+}8{,}000
\xrightarrow{x-}4{,}000
\xrightarrow{z}
\begin{cases}
2{,}000&z+,\\
2{,}000&z-.
\end{cases}
```

The final counts are not $4{,}000$ and zero. The state entering the last
analyzer is $x-$, not the earlier $z+$ preparation. Writing the state beneath
each segment of an apparatus sketch is a simple way to avoid this mistake.

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

### Concept check 1.3

A $z+$ beam is analyzed along an axis $\mathbf n$ only $10^\circ$ from $+z$.
One student predicts exactly $z+$ because the axes are nearly aligned; another
predicts a 50–50 split because the axes are different. What does the experiment
predict?

:::{dropdown} Answer
Neither. The probability of $+\mathbf n$ is
$\cos^2(5^\circ)\approx0.9924$, while the probability of $-\mathbf n$ is about
$0.0076$. Quantum outcomes are discrete, but their probabilities vary
continuously with analyzer orientation.
:::

## Summary

- A Stern–Gerlach analyzer correlates a spin component with one of two paths.
- Filtering an output prepares a repeatable state for that component.
- Orthogonal spin components are incompatible: preparing one makes another
  uncertain.
- Indistinguishable alternatives interfere through complex amplitudes.
- A spin-$\tfrac12$ state requires a two-dimensional complex state space.
- Analyzer chains are sequences of conditional preparations and measurements;
  the most recent selected outcome determines the state entering the next
  device.

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
7. A $z+$ beam is sent to an analyzer tilted $120^\circ$ from $+z$. Find both
   output probabilities using equation {eq}`empirical-angle-rule`.
8. An unpolarized beam of $40{,}000$ atoms passes through three analyzers. The
   selected outputs are first $z+$ and then $+\mathbf n$, where $\mathbf n$ is
   $60^\circ$ from $+z$. Both outputs of the final $z$ analyzer are recorded.
   Predict all final counts and account for atoms blocked earlier.
9. Draw probability trees for $z+\rightarrow x+\rightarrow z$ and
   $z+\rightarrow x-\rightarrow z$. If the two selected $x$ beams are later
   pooled incoherently, what are the final $z$ probabilities?
10. A two-path apparatus gives deterministic $z+$ when both paths are open and
    recombined. With either path blocked, the final $z$ analyzer gives both
    results. Explain why adding the two single-path probability distributions
    cannot reproduce the both-open result.
11. Classify each element as preparation, transformation, or measurement:
    an oven source, a $z+$ filter, a uniform magnetic field, an unobserved path
    marker, a coherent recombiner, and a two-channel detector. Some elements
    may play more than one role; explain your choices operationally.
