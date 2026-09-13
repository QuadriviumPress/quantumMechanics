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
- infer three empirical rules that a quantum model must reproduce;
- explain why spin is not adequately modeled as a tiny classical arrow;
- distinguish ideal probabilities from finite-sample frequencies; and
- design analyzer sequences that test competing physical explanations.

## 1.1 An experiment before a formalism

Quantum mechanics is easiest to trust when it is built from a real experiment
rather than handed down as a set of postulates. We start with one of the
simplest experiments in physics, first performed by Otto Stern and Walther
Gerlach in 1922. Their goal was modest by today's standards—to see whether an
atom's magnetism points in only a few special directions, or in any direction
at all. The answer turned out to force a complete rethinking of what it means
for a particle to have a definite orientation.

The apparatus is easy to picture. An oven vaporizes silver and lets atoms
escape through a small opening; slits downstream select a narrow, well-defined
beam, so that every atom entering the apparatus travels the same direction
with the same speed. This **collimated beam** then passes between the shaped
poles of a magnet before striking a glass detection screen. The magnet is
built so that the field is much stronger near one pole than the other, which
is the one design choice that makes the whole experiment work.

To see why, picture each atom as carrying a tiny bar magnet, described by a
**magnetic moment** vector $\boldsymbol\mu$—the same quantity that tells a
compass needle which way to twist. Like a compass needle, its energy depends
on its orientation relative to the external field $\mathbf B$: aligned with
the field is low energy, anti-aligned is high energy, and every angle in
between interpolates smoothly. This is captured by the potential energy

```{math}
:label: magnetic-energy
U=-\boldsymbol\mu\cdot\mathbf B.
```

A *uniform* field only twists such a dipole, since the force on one "pole" of
the magnet is canceled by the opposite force on the other; the atom feels a
torque but no net push. A push appears only if the field strength itself
changes from one side of the atom to the other—that is, only if the field has
a gradient. For a gradient along $z$, the net force on the atom is

```{math}
:label: sg-force
F_z=-\frac{\partial U}{\partial z}
    \approx \mu_z\frac{\partial B_z}{\partial z}.
```

This equation is the entire principle behind the device: an atom is deflected
by an amount proportional to $\mu_z$, the component of its magnetic moment
along the field gradient. A stronger $\mu_z$ means a larger deflection, a
reversed $\mu_z$ means deflection the other way, and the magnet effectively
converts an otherwise invisible internal property into a visible displacement
on the screen.

Now ask what a classical magnet predicts. Nothing in classical physics singles
out any direction for $\boldsymbol\mu$ to point, so an oven full of atoms
should produce moments pointing every which way, with $\mu_z=\mu\cos\theta$
taking every value between $-\mu$ and $+\mu$ as $\theta$ ranges over all
orientations. Equation {eq}`sg-force` then predicts a continuous spread of
deflections: a narrow input beam should fan out into one smeared, continuous
band on the screen, dense in the middle and thinning toward the edges. Instead,
Stern and Gerlach saw exactly two separated spots, with nothing in between. We
label them $z+$ and $z-$.

:::{note} What the apparatus measures
A Stern–Gerlach analyzer does not simply reveal the location of a pre-existing
little arrow. It couples an internal degree of freedom to the atom's path. The
spatial separation makes two possible outcomes visible at the detector.
:::

The clean, two-spot pattern says that the relevant component of the atom's
intrinsic angular momentum—called **spin**—is not a continuously variable
quantity at all. Whatever axis the magnet happens to be built along, only two
outcomes ever occur, never a value in between. For a spin-$\tfrac12$ system
such as silver's unpaired outer electron, the measured $z$ component of spin
angular momentum has only the two values

```{math}
:label: sz-values
S_z=+\frac{\hbar}{2}\quad\text{or}\quad S_z=-\frac{\hbar}{2}.
```

This restriction to two outcomes, regardless of the analyzer's orientation, is
the first genuinely quantum fact in this book, and everything that follows is
an attempt to build a theory around it.

We abbreviate an analyzer oriented along $z$ as $\mathrm{SG}_z$. Blocking one
exit turns the device into a **preparation apparatus** rather than a mere
measuring one: passing only the $z+$ beam discards every atom that would have
been recorded as $z-$, leaving a beam in which every transmitted atom shares
the same, definite $z+$ condition. This shift in role—the same physical device
used first to measure, then to prepare—is worth remembering, because it recurs
throughout the chapter.

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
oriented at any angle $\mathbf b$ relative to a preparation axis $\mathbf a$,
and it is natural to guess that the probability of recovering the original
outcome should fall off smoothly as $\mathbf b$ tilts away from $\mathbf a$. A
classical guess, by analogy with a projected vector, might be that the
probability varies as $\cos\alpha$. Experiment instead gives, for a beam
prepared spin-up along $\mathbf a$ and analyzed along $\mathbf b$,

```{math}
:label: empirical-angle-rule
P(+\mathbf b\mid+\mathbf a)=\cos^2\frac{\alpha}{2},\qquad
P(-\mathbf b\mid+\mathbf a)=\sin^2\frac{\alpha}{2},
```

where $\alpha$ is the angle between $\mathbf a$ and $\mathbf b$. Notice the
half-angle: this is not a minor detail but an early hint that spin does not
transform like an ordinary arrow in space, since rotating the analyzer by a
full $360^\circ$ around some axis will turn out to bring a spin state back to
itself only after picking up a sign along the way. Equation
{eq}`empirical-angle-rule` also contains the cases already discussed as
special cases: aligned analyzers ($\alpha=0$) give certainty, oppositely
aligned analyzers ($\alpha=180^\circ$) give the opposite outcome with
certainty, and perpendicular analyzers ($\alpha=90^\circ$) give equal
probabilities—matching the $x$-versus-$z$ result above. Chapter 2 will derive
this half-angle law from state vectors rather than take it as an empirical
summary.

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
P(z+\mid+\mathbf n)=\frac34,\qquad
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

## 1.8 From probabilities to laboratory data

Equations such as {eq}`empirical-angle-rule` predict probabilities, whereas a
real experiment produces integer counts. The link between the two is
statistical. If the preparation and analyzer are held fixed and $N$ independent
atoms are recorded, the number $N_+$ at the positive exit fluctuates around
$Np_+$, where

```{math}
p_+=\cos^2\frac{\alpha}{2}.
```

For ideal independent trials, the count follows a binomial distribution. Its
standard deviation is

```{math}
:label: binomial-count-width
\sigma_{N_+}=\sqrt{Np_+(1-p_+)},
```

and the measured frequency $f_+=N_+/N$ has standard deviation

```{math}
:label: binomial-frequency-width
\sigma_{f_+}=\sqrt{\frac{p_+(1-p_+)}{N}}.
```

The $1/\sqrt N$ dependence matters. Recording four times as many atoms reduces
the typical frequency fluctuation by only a factor of two. Quantum theory does
not predict that every batch divides in exactly the theoretical ratio; it
predicts the distribution of results from which those batches are drawn.

### Example 1.4: is a split consistent with the angle rule?

A $z+$ source is analyzed along an axis $60^\circ$ from $+z$. Among
$N=1{,}000$ detected atoms, $N_+=735$ leave the positive exit. The ideal
prediction is $p_+=3/4$, so the expected count and its standard deviation are

```{math}
Np_+=750,
\qquad
\sigma_{N_+}=\sqrt{1000\left(\frac34\right)\left(\frac14\right)}
\approx13.7.
```

The observed count is $15$ below the mean, about $1.1$ standard deviations.
Such a difference is ordinary statistical variation, not persuasive evidence
against the angle rule. By contrast, a persistent discrepancy that grows in
statistical significance as more data are collected suggests imperfect
preparation, a misaligned analyzer, unequal detector efficiencies, or a failure
of the model.

:::{note} Counts require an experimental model
The binomial formulas assume independent trials, stable preparation, and equal
detection conditions for the two exits. Background events, missed atoms, beam
drift, and detector dead time can all change the count statistics. “The data
look noisy” is not an explanation until the sources of noise are identified
and tested.
:::

### Estimating an unknown analyzer angle

The same experiment can be used in reverse. For a known $z+$ input and an
analyzer known to lie between $0$ and $\pi$ from $+z$, the observed positive
frequency estimates the angle:

```{math}
:label: angle-from-frequency
\alpha_{\mathrm{est}}=2\cos^{-1}\sqrt{f_+}.
```

If $81\%$ of a large sample exits through $+\mathbf n$, then
$\alpha_{\mathrm{est}}=2\cos^{-1}(0.9)\approx51.7^\circ$. Counts can therefore
characterize an apparatus as well as test a prepared state. In later chapters,
this reversal of viewpoint becomes quantum-state tomography: known analyzers
are used to infer an unknown preparation.

## 1.9 Experiments that separate competing explanations

A useful experiment does more than exhibit an effect; it distinguishes between
models that otherwise make the same prediction. A single $z$ analyzer is not
enough to distinguish a quantum state from a classical population of atoms
carrying fixed $z$ labels. Sequential analyzers are powerful because competing
stories cease to agree.

Consider three hypotheses for a beam selected from the $z+$ exit:

1. **Fixed-label hypothesis:** every atom carries permanent values for all
   analyzer directions, and an analyzer only reads the relevant value.
2. **Classical-arrow hypothesis:** every atom carries an ordinary magnetic
   arrow, and the analyzer reports its component along the chosen axis.
3. **Quantum preparation hypothesis:** selecting an outcome prepares a state
   definite for that analyzer, while other components generally remain
   indefinite.

The sequence $z+\rightarrow z$ is compatible with the first and third
hypotheses, so repeatability alone does not decide between them. The sequence
$z+\rightarrow x+\rightarrow z$, however, restores a 50--50 $z$ distribution.
That result conflicts with permanent, merely revealed $z$ labels. The fact that
every analyzer still has only two exits conflicts with a classical arrow whose
projected component can vary continuously. Coherent recombination then adds a
third test: interference depends on a controllable relative phase that neither
classical population model retains.

This pattern is a general method for reasoning in quantum mechanics:

- list the preparations and recorded outcomes without adding an unseen story;
- derive a quantitative prediction from each candidate model;
- choose a sequence for which those predictions differ; and
- repeat enough trials to separate systematic disagreement from count noise.

### Example 1.5: measurement or mere beam splitting?

An ideal device separates a $z+$ input into $x+$ and $x-$ paths. Compare three
arrangements.

- With both paths coherently recombined, a final $z$ analyzer returns $z+$ with
  certainty.
- With the $x-$ path blocked, the final analyzer gives $z+$ and $z-$ equally.
- With a path marker present but both beams physically redirected toward the
  output, the final analyzer again gives the incoherent 50--50 statistics if
  the marker records perfectly distinguishable alternatives.

The last comparison shows why spatial overlap alone is not sufficient for
interference. The relevant condition is whether the alternatives remain
coherent—whether any physical degree of freedom carries usable which-path
information. Chapter 2 will represent this distinction by retaining or
discarding the cross terms between amplitudes.

:::{admonition} Idealization boundary
:class: caution
A textbook Stern--Gerlach recombiner is an ideal coherent device. Constructing
one for massive particles is technically demanding because the two paths must
be redirected without leaving uncontrolled position, momentum, or phase
records. The idealization isolates the quantum logic; it is not a claim that
ordinary laboratory magnets automatically reverse an analyzer.
:::

### Concept check 1.4

A run with $100$ atoms gives $54$ counts at $x+$ and $46$ at $x-$. Has the
expected 50--50 split failed?

:::{dropdown} Answer
No. For $N=100$ and $p=1/2$, the expected standard deviation of the positive
count is $\sqrt{100(1/2)(1/2)}=5$. A count of $54$ is less than one standard
deviation above the mean of $50$ and is entirely typical.
:::

### Concept check 1.5

Why can the sequence $z+\rightarrow x+\rightarrow z$ test more than the
sequence $z+\rightarrow z$?

:::{dropdown} Answer
Both a fixed-label model and quantum theory can imitate immediate
repeatability. They differ after an incompatible intermediate measurement:
quantum theory predicts that selecting $x+$ prepares a new state and makes the
final $z$ result 50--50, whereas a device that merely reads a permanent $z$
label should not erase it.
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
- Finite data fluctuate around theoretical probabilities with a characteristic
  scale proportional to $1/\sqrt N$.
- Sequential and coherent-recombination experiments are valuable because they
  force classical and quantum explanations to make different predictions.

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
12. A $z+$ beam is analyzed $90^\circ$ from its preparation axis. In a run of
    $2{,}500$ atoms, estimate the mean and standard deviation of the $+$ count.
    Is a count of $1{,}290$ surprising on this scale?
13. A large sample prepared in $z+$ gives $f_+=0.64$ at an analyzer whose axis
    is known to lie between $0^\circ$ and $180^\circ$ from $+z$. Estimate the
    angle.
14. Derive equation {eq}`binomial-frequency-width` from equation
    {eq}`binomial-count-width`. Explain why the absolute uncertainty in a count
    grows with $N$ while the uncertainty in a relative frequency shrinks.
15. Design a three-configuration experiment that distinguishes coherent
    recombination, an incoherent mixture of the two paths, and accidental
    blocking of one path. State the qualitative final $z$ statistics expected
    in each configuration.
16. A source drifts so that its intensity falls by $10\%$ during a run. Explain
    why raw output counts could then give a misleading comparison between two
    analyzer settings. Propose a frequency or normalization that reduces the
    problem.
