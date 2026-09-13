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

Quantum mechanics is easiest to trust when it grows out of a real experiment,
rather than being handed to you as a list of abstract postulates. So this book
begins with one of the simplest experiments in physics: the one performed by
Otto Stern and Walther Gerlach in 1922. Their question was simple. Does an
atom's magnetism point in only a few special directions, or can it point
anywhere at all? The answer they found was strange enough to force physicists
to rethink what it even means for a particle to have a direction.

Picture the apparatus in three stages. First, an oven heats a sample of silver
until atoms boil off as a vapor. Second, that vapor escapes through a narrow
opening, and a pair of slits downstream blocks every atom except those
traveling in one exact direction at one exact speed; what emerges is a
**collimated beam**, meaning every atom in it moves the same way. Third, this
beam passes between the shaped poles of a magnet and then strikes a glass
screen, where each atom leaves a visible mark.

One feature of the magnet matters more than any other: its poles are shaped so
that the field is much stronger near one pole than the other. Without this
asymmetry the experiment would show nothing interesting, as the next few
paragraphs will make clear.

To see why the asymmetry matters, picture each atom as a tiny bar magnet,
described by a **magnetic moment** vector $\boldsymbol\mu$—the same quantity
that tells a compass needle which way to twist. Just like a compass needle,
the atom's energy depends on how $\boldsymbol\mu$ is oriented relative to the
external field $\mathbf B$: lined up with the field is low energy, opposed to
the field is high energy, and every angle in between interpolates smoothly.
In symbols,

```{math}
:label: magnetic-energy
U=-\boldsymbol\mu\cdot\mathbf B.
```

A *uniform* field, however, cannot push the atom anywhere—it can only twist
it. The force pulling one "pole" of the tiny magnet forward is exactly
canceled by the force pushing the other pole backward, so the atom feels a
torque but no net force. A push appears only when the field itself is
stronger on one side of the atom than the other, that is, only when the field
has a *gradient*. For a gradient along the $z$ direction, the net force on the
atom works out to

```{math}
:label: sg-force
F_z=-\frac{\partial U}{\partial z}
    \approx \mu_z\frac{\partial B_z}{\partial z}.
```

Equation {eq}`sg-force` is the whole operating principle of the device. It
says that each atom is pushed by an amount proportional to $\mu_z$, the
component of its magnetic moment along the gradient direction. A larger
$\mu_z$ means a larger deflection; a reversed $\mu_z$ means deflection the
other way. In short, the magnet turns an otherwise invisible internal
property of the atom—its magnetic orientation—into something we can see
directly: a spot's position on the screen.

Now we can ask what classical physics predicts for the result. Nothing in
classical physics picks out a preferred direction for $\boldsymbol\mu$, so the
atoms boiling off the oven should have their magnetic moments pointing every
which way. That means $\mu_z=\mu\cos\theta$ should take every value between
$-\mu$ and $+\mu$, depending on each atom's orientation angle $\theta$.
Combined with equation {eq}`sg-force`, this predicts a continuous smear of
deflections on the screen: one broad band, dense in the middle and thinning
toward the edges.

That is not what Stern and Gerlach saw. Instead of a smear, they saw exactly
two separated spots, with nothing in between. We label these two outcomes
$z+$ and $z-$.

:::{figure} ../images/figures/ch01-stern-gerlach-apparatus.svg
:name: fig-sg-apparatus
:alt: A silver-atom oven, collimating slits, and a field-gradient magnet send atoms to a detector. The classical prediction is a continuous smear, while the observed pattern has two distinct spots labeled z plus and z minus.
:width: 100%

The Stern–Gerlach apparatus converts the spin component along the field
gradient into a visible deflection. The decisive observation is not merely a
deflected beam, but two discrete spots in place of the classical smear.
:::

:::{note} What the apparatus measures
A Stern–Gerlach analyzer does not simply reveal the location of a
pre-existing little arrow. It couples an internal degree of freedom to the
atom's path, and the resulting spatial separation is what makes two possible
outcomes visible at the detector.
:::

The two-spot pattern tells us something remarkable: whatever internal
property of the atom is responsible for this deflection, it is not
continuously variable. That property is the atom's intrinsic angular
momentum, called **spin**. No matter which axis we build the magnet along, an
analyzer measuring spin along that axis ever produces only two outcomes—never
a value in between. For a spin-$\tfrac12$ particle such as silver's unpaired
outer electron, the measured $z$ component of spin angular momentum can only
be

```{math}
:label: sz-values
S_z=+\frac{\hbar}{2}\quad\text{or}\quad S_z=-\frac{\hbar}{2}.
```

This restriction—only two outcomes, no matter how the analyzer is
oriented—is the first genuinely quantum fact in this book. Everything that
follows is an attempt to build a mathematical theory around it.

From now on we abbreviate an analyzer oriented along $z$ as $\mathrm{SG}_z$.
Something useful happens if we place a physical block in front of one of its
two exits. Say we block the $z-$ exit and let only the $z+$ beam through.
Every atom that makes it past the block is now guaranteed to have been
recorded as $z+$—so the same device that just *measured* spin has become a
device that *prepares* it. This dual role, one physical apparatus used first
as a measurement and then as a preparation, will come up again and again in
this chapter, so it is worth fixing firmly in mind now.

### Reading the experiment from left to right

To talk about these experiments precisely, it helps to separate every one of
them into three stages:

1. A **preparation** specifies how the incoming ensemble was made. A source by
   itself may be unpolarized; a source followed by a filter prepares a
   selected spin state.
2. A **transformation** changes the state without yet recording a spin
   result. Examples include a uniform magnetic field or a coherent path
   recombiner.
3. A **measurement** ends in macroscopically distinguishable records, such as
   counts at the two exits of an analyzer.

This vocabulary heads off a common confusion. The symbol $z+$ gets used for
three different things: an outcome recorded at a detector, the physical exit
path leading to that detector, and the *state* that gets prepared when we
select that path. Context usually makes clear which meaning is intended, but
keep in mind that these are three related, not identical, ideas.

In the laboratory, what we actually observe are raw counts: some atoms land
in the $z+$ spot, some in the $z-$ spot. If $N_+$ and $N_-$ are the numbers of
atoms detected at the two exits, the measured relative frequencies are

```{math}
f_+=\frac{N_+}{N_++N_-},\qquad
f_-=\frac{N_-}{N_++N_-}.
```

Quantum theory predicts the probabilities that these frequencies approach
after many repetitions of the same experiment. It does not, in general,
predict which exit any one particular atom will take.

## 1.2 Repeatability

Here is the simplest possible follow-up experiment: put a *second*
$\mathrm{SG}_z$ analyzer right after the first one, oriented along the same
$z$ axis, and keep only the atoms that came out of the first analyzer's $z+$
exit. What happens at the second analyzer?

The answer is unambiguous: every atom that enters the second analyzer leaves
through its $z+$ exit. None comes out $z-$.

:::{admonition} Rule 1: repeatability
:class: tip
An immediate repetition of the same ideal measurement returns the same result
with certainty.
:::

This tells us that the first analyzer did more than sort atoms into two
piles. Selecting the $z+$ output prepared something new: a beam in which
every atom is now *definite* for a repeated $S_z$ measurement, meaning that
measuring it again along $z$ can no longer produce a surprise.

Repeatability also gives us an operational definition of the label
$|+z\rangle$, which will be introduced formally in Chapter 2: it means the
preparation that produces $z+$ with certainty when immediately analyzed along
$z$. We do not need to imagine what the atom is "really doing" between
devices in order to define the state reproducibly.

### Example 1.1: counting atoms

A source sends $12{,}000$ atoms into $\mathrm{SG}_z$. The source has no
preferred orientation, so half emerge from each exit on average. The $z-$
exit is blocked, and the $z+$ beam enters a second $\mathrm{SG}_z$.

About $6{,}000$ atoms reach the second analyzer, and all $6{,}000$ leave its
$z+$ exit. Statistical fluctuations affect the first split, but an ideal
repeat measurement does not create a second 50–50 split.

```{openlyceum} SternGerlach
:label: fig:ch01-stern-gerlach-sim

Assemble your own chain of ovens, analyzers, and counters, fire spin-$\tfrac12$
or spin-$1$ atoms through it, and watch Monte Carlo counts accumulate next to
the analytic prediction. Rebuild the repeated-analyzer setup from Example 1.1
before reading on, then try chaining analyzers at other angles.
```

## 1.3 Incompatible questions

Repeating a measurement along the *same* axis gave a simple, if important,
result: nothing changes. The next natural question is what happens if we
measure along a *different* axis instead. Prepare a $z+$ beam as before, but
this time send it into $\mathrm{SG}_x$, an analyzer whose field gradient
points along $x$ rather than $z$. The output divides equally:

```{math}
:label: zx-probabilities
P(x+\mid z+)=P(x-\mid z+)=\frac12.
```

So a $z+$ preparation is not definite for $S_x$: knowing that an atom is
$z+$ tells us nothing about which way it will go in $\mathrm{SG}_x$. Here is
the more surprising part. Keep only the $x+$ output of that measurement, and
send those atoms into a *third* analyzer, this one measuring $S_z$ again. If
the atom really still had a definite $z$ value all along, we should recover
$z+$ with certainty, exactly as in Section 1.2. Instead, both $z$ outcomes now
occur with equal probability, as if the intervening $x$ measurement had erased
what we thought we already knew:

```{math}
z+\longrightarrow x+\longrightarrow
\begin{cases}
z+ & \text{with probability }1/2,\\
z- & \text{with probability }1/2.
\end{cases}
```

This is the key point: measuring $S_x$ changed what we could predict about
$S_z$, even though nothing directly measured $S_z$ in between. It is tempting
to imagine that the atom secretly carried definite values for *both* $S_z$
and $S_x$ the whole time, and that each analyzer simply reads off the value
it happens to be built to detect. The experiment rules this out. If both
values were fixed all along, the final $S_z$ measurement should still return
$z+$ with certainty—but it does not.

:::{admonition} Rule 2: incompatibility
:class: tip
Preparing a definite value of one spin component generally produces uncertain
outcomes for a different component. An intervening measurement can erase the
predictive certainty established by an earlier preparation.
:::

:::{figure} ../images/figures/ch01-analyzer-chains.svg
:name: fig-analyzer-chains
:alt: Two Stern–Gerlach analyzer chains. Repeating a z measurement after preparing z plus gives z plus with certainty. Selecting x plus between the preparation and final z measurement produces equal z plus and z minus probabilities.
:width: 100%

Aligned analyzers repeat a definite result, whereas an intervening analyzer
along an incompatible axis replaces that certainty with a new preparation.
The diagrams are read from left to right, just like the laboratory sequence.
:::

### What "disturbance" does and does not explain

One might try to rescue the classical picture by blaming the middle analyzer:
perhaps it simply jostles the atom around and scrambles its $z$ value by
brute mechanical force. But the data rule this out too. If the middle
analyzer were merely adding random noise, we would expect its own $S_x$
result to be unreliable on repetition. Instead, the $x+$ selection is
perfectly repeatable: send those atoms through a second $\mathrm{SG}_x$
analyzer, and every one of them comes out $x+$ again. The middle analyzer has
not scrambled anything at all. It has replaced one definite, repeatable
quantity ($S_z$) with a different definite, repeatable quantity ($S_x$).

Order matters here in a way that has no classical analogue. Compare

```{math}
z+\longrightarrow z+\longrightarrow x
```

with

```{math}
z+\longrightarrow x+\longrightarrow z.
```

In the first sequence, repeating the $z$ measurement changes nothing, so the
final $x$ analyzer still sees a 50–50 split, exactly as it would from a fresh
$z+$ beam. In the second sequence, the intervening $x+$ selection changes the
outcome seen by the final $z$ analyzer, turning certainty into a 50–50 split.
Chapter 3 will express this order dependence precisely, as a statement about
products of noncommuting matrices.

### Analyzers at a general angle

So far we have only compared axes at $0^\circ$ and $90^\circ$. What happens
at angles in between? Nothing stops us from building an analyzer tilted at
any angle relative to the preparation axis, and it seems reasonable to guess
that the probability of recovering the original outcome should fall off
smoothly as the analyzer tilts away from the preparation axis. If spin
behaved like an ordinary arrow, we might guess that this probability varies
as $\cos\alpha$, matching the projection of one vector onto another.
Experiment gives a different, and at first surprising, answer. For a beam
prepared spin-up along $\mathbf a$ and analyzed along $\mathbf b$, separated
by angle $\alpha$,

```{math}
:label: empirical-angle-rule
P(+\mathbf b\mid+\mathbf a)=\cos^2\frac{\alpha}{2},\qquad
P(-\mathbf b\mid+\mathbf a)=\sin^2\frac{\alpha}{2}.
```

Notice the *half*-angle, $\alpha/2$, rather than $\alpha$ itself. This is not
a typo or a minor detail—it is an early hint that spin does not transform
like an ordinary arrow in space. An ordinary arrow returns to itself after a
$360^\circ$ rotation. A spin state, as Chapter 4 will show, returns to itself
only after picking up an overall minus sign along the way, and needs a full
$720^\circ$ rotation to return exactly unchanged. The half-angle in equation
{eq}`empirical-angle-rule` is the first fingerprint of that fact.

It is worth checking that this formula reproduces everything found so far.
At $\alpha=0^\circ$ (aligned analyzers), $\cos^2(0)=1$: certainty of
recovering the same outcome, matching Section 1.2. At $\alpha=180^\circ$
(oppositely aligned analyzers), $\cos^2(90^\circ)=0$: certainty of the
*opposite* outcome. At $\alpha=90^\circ$ (perpendicular analyzers, like $x$
versus $z$), $\cos^2(45^\circ)=1/2$: an equal split, matching Section 1.3.
Equation {eq}`empirical-angle-rule` is therefore not a separate new rule; it
is the general law that contains every case already found as a special case.
For now we treat it as an empirical summary of the data. Chapter 2 will derive
it from the mathematics of state vectors.

:::{figure} ../images/figures/ch01-half-angle-rule.svg
:name: fig-half-angle-rule
:alt: Two analyzer axes separated by angle alpha beside a graph. The probability for the plus outcome decreases from one to zero as alpha goes from zero to 180 degrees, while the minus probability increases from zero to one; both are one half at 90 degrees.
:width: 100%

The half-angle rule smoothly joins repeatability at $0^\circ$, equal splitting
at $90^\circ$, and certain reversal at $180^\circ$. At every angle the two
exclusive probabilities add to one.
:::

### Example 1.2: three analyzer directions

A $z+$ beam passes through an analyzer whose axis $\mathbf n$ is $60^\circ$
from $+z$, and only the $+\mathbf n$ output is retained. That beam is then
measured along $z$. This means applying equation {eq}`empirical-angle-rule`
twice in a row, using the *selected* output of the first analyzer as the
input to the second.

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
reach the final $z-$ detector; the remaining quarter was blocked at the
middle analyzer. Conditional probabilities must be multiplied along a
selected path.

## 1.4 Recombining alternatives

Every experiment so far has ended with a measurement: an atom lands in one
detector or another, and that is the end of the story. What happens if,
instead of recording which path an atom took, we let two paths recombine
before anything is measured?

Imagine a carefully built device that splits a $z+$ beam into two separate
paths, one associated with $x+$ and one with $x-$, and then brings the two
paths back together—coherently, without ever revealing which path a given
atom traveled. Remarkably, the recombined beam turns out to be back in the
original $z+$ state, exactly as if the device had never touched it. But if we
block *either* path, so that only atoms from the other path get through, the
later $S_z$ statistics change completely.

This kills a natural but wrong guess: that the two paths behave like two
ordinary, independent sub-beams, so that whatever happens to the recombined
beam should just be the sum of what happens along each path separately.
Quantum theory instead assigns a complex number—a **probability
amplitude**—to each indistinguishable alternative. When alternatives are
indistinguishable, we add the amplitudes *first*, and only afterward take the
squared magnitude to get a probability.

:::{admonition} Rule 3: interference of alternatives
:class: tip
When alternatives are indistinguishable, add their probability amplitudes.
When a measurement makes the alternatives distinguishable, add their
probabilities.
:::

This distinction will later become the difference between a coherent
superposition and an incoherent mixture.

The word **coherently** carries real experimental content. The apparatus
must preserve a stable relation between the phases accumulated on the two
paths. If vibrations, stray fields, or a path detector randomize that
relation, the interference washes out even when nobody reads the detector.
What matters is whether a durable physical record could distinguish the
alternatives, not whether a person happens to look.

One can summarize the alternatives with two limiting arrangements:

- **Both paths open and recombined:** add the two complex amplitudes,
  including their relative phase, and then square the magnitude.
- **Paths detected separately or phase-randomized:** square the magnitudes
  for the alternatives separately and then add the probabilities.

:::{figure} ../images/figures/ch01-coherent-recombination.svg
:name: fig-coherent-recombination
:alt: Two path experiments. With no path record, x plus and x minus amplitudes recombine coherently and recover z plus with certainty. With path records, interference is lost and the final z plus probability is one half.
:width: 100%

Recombination restores the original state only while the two alternatives
remain coherent. A durable path record changes the calculation from adding
amplitudes to adding probabilities, even if nobody reads the record.
:::

This is why "half the atoms went through each arm" is not a complete
description of the coherent experiment. The path amplitudes can cancel at one
output and reinforce at another, even though each open arm alone sends atoms
to both outputs.

## 1.5 A minimal model

We now have three empirical rules—repeatability, incompatibility, and
interference—plus the half-angle probability law. Before building a full
mathematical theory, it helps to state in plain language exactly what that
theory needs to accomplish:

- A preparation is represented by a **state**.
- A measurement has a discrete set of possible results.
- A state assigns an amplitude, not directly a probability, to each result.
- Measurement both produces a result and prepares a corresponding output
  state.
- Different analyzer orientations represent different, sometimes
  incompatible, physical questions.

For spin $\tfrac12$, two independent states suffice to describe every
possible pure spin state. We will represent them by vectors in a
two-dimensional complex vector space. The word "two-dimensional" refers to
state space, not ordinary physical space.

### From laboratory rules to mathematical demands

Let's translate the experimental facts directly into mathematical
requirements. Whatever structure we build, it needs:

- two mutually exclusive outcomes for each analyzer direction;
- a way to represent a preparation that is certain for one outcome;
- continuous families of other preparations, because the analyzer direction
  varies continuously;
- a rule that produces normalized probabilities;
- an update rule after an outcome is selected; and
- phase information capable of describing coherent recombination.

An ordinary list of two probabilities, say $(1/2,1/2)$, cannot do this job: it
records the *weight* of each alternative but throws away the *phase* that
controls interference. A pair of **complex** numbers can do both at once,
since a complex number naturally carries both a magnitude and a phase. This
is exactly why Chapter 2 introduces state vectors with complex-number
coefficients—called kets—before ever writing down a wavefunction.

## 1.6 What spin is—and is not

The name "spin" invites a picture: a tiny sphere spinning on its axis, like a
planet. That picture is a useful crutch for the imagination, but it is not
literally correct, and taking it too literally leads to wrong predictions.
Spin does carry angular momentum, and often a magnetic moment, which is
exactly why it interacts with the field in a Stern–Gerlach apparatus in the
first place. But a rigid, rotating sphere would have a magnetic-moment
component that varies continuously as its axis tilts—precisely the smooth
spread that classical physics predicted and that the apparatus did *not*
show. The name "spin" is a historical label; it is the experiments, not the
name, that tell us what spin actually is.

There is a second way the arrow picture fails, beyond just the two discrete
outcomes. A classical arrow pointing at a known angle $\alpha$ to the
analyzer would have a projected component proportional to $\cos\alpha$, and
that component would vary continuously as $\alpha$ varies. Real spin does not
do this: the outcome is always $\pm\hbar/2$, and the angle only controls how
*often* each outcome occurs, through equation {eq}`empirical-angle-rule`.

One more warning about pictures. Chapter 2 introduces the Bloch sphere, which
looks like a sphere covered in little arrows. Resist the urge to picture each
arrow as a literal miniature compass needle sitting inside the particle. Each
arrow is shorthand for an entire preparation recipe and the statistics it
produces—not a claim that the particle contains a tiny spinning pointer.

## 1.7 A systematic way to predict analyzer chains

Until the vector formalism is available, a short operational recipe is
enough for ideal sequential measurements:

1. Identify the state entering the first analyzer. If the source is
   unpolarized, the first analyzer produces equal counts.
2. At each analyzer, measure the angle from the **most recently selected
   preparation axis**, not necessarily from the original axis.
3. Use equation {eq}`empirical-angle-rule` for each branch.
4. Multiply conditional probabilities along one branch; add probabilities
   only when mutually exclusive detected branches are pooled.
5. If paths are recombined coherently, stop using this probability-tree
   recipe. Amplitudes and their phases are then required.

### Example 1.3: keep all branches straight

An unpolarized source sends $16{,}000$ atoms into $\mathrm{SG}_z$. The $z+$
exit is selected, then the $x-$ exit of an $\mathrm{SG}_x$ analyzer is
selected, and finally both exits of $\mathrm{SG}_z$ are counted.

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

A $z+$ beam enters $\mathrm{SG}_x$. The $x-$ exit is blocked, and the
transmitted $x+$ beam enters another $\mathrm{SG}_x$. What fraction of the
original $z+$ beam reaches the final $x+$ detector?

:::{dropdown} Answer
One half. The first $x$ measurement transmits half the atoms into $x+$.
Repeating the $S_x$ measurement then returns $x+$ with certainty.
:::

### Concept check 1.2

Why is a 50–50 collection of separately prepared $x+$ and $x-$ atoms not
automatically equivalent to a coherent recombination of the two paths?

:::{dropdown} Answer
The collection records mutually exclusive preparations and is an incoherent
mixture. A coherent recombination preserves the relative phase between the
two amplitudes, so later probabilities can contain interference terms.
:::

### Concept check 1.3

A $z+$ beam is analyzed along an axis $\mathbf n$ only $10^\circ$ from $+z$.
One student predicts exactly $z+$ because the axes are nearly aligned;
another predicts a 50–50 split because the axes are different. What does the
experiment predict?

:::{dropdown} Answer
Neither. The probability of $+\mathbf n$ is
$\cos^2(5^\circ)\approx0.9924$, while the probability of $-\mathbf n$ is about
$0.0076$. Quantum outcomes are discrete, but their probabilities vary
continuously with analyzer orientation.
:::

## 1.8 From probabilities to laboratory data

Equations such as {eq}`empirical-angle-rule` predict probabilities, whereas a
real experiment produces integer counts. The link between the two is
statistical. If the preparation and analyzer are held fixed and $N$
independent atoms are recorded, the number $N_+$ at the positive exit
fluctuates around $Np_+$, where

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

The $1/\sqrt N$ dependence matters. Recording four times as many atoms
reduces the typical frequency fluctuation by only a factor of two. Quantum
theory does not predict that every batch divides in exactly the theoretical
ratio; it predicts the distribution of results from which those batches are
drawn.

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
preparation, a misaligned analyzer, unequal detector efficiencies, or a
failure of the model.

:::{note} Counts require an experimental model
The binomial formulas assume independent trials, stable preparation, and
equal detection conditions for the two exits. Background events, missed
atoms, beam drift, and detector dead time can all change the count
statistics. "The data look noisy" is not an explanation until the sources of
noise are identified and tested.
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
characterize an apparatus as well as test a prepared state. In later
chapters, this reversal of viewpoint becomes quantum-state tomography: known
analyzers are used to infer an unknown preparation.

## 1.9 Experiments that separate competing explanations

A useful experiment does more than exhibit an effect; it distinguishes
between models that would otherwise make the same prediction. A single $z$
analyzer, on its own, cannot distinguish a genuine quantum state from a
classical population of atoms carrying fixed $z$ labels—both would give the
same repeatable $z+$ result. Sequential analyzers are powerful precisely
because they force competing stories to disagree.

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
$z+\rightarrow x+\rightarrow z$, however, restores a 50–50 $z$ distribution.
That result conflicts with permanent, merely revealed $z$ labels. The fact
that every analyzer still has only two exits conflicts with a classical
arrow whose projected component can vary continuously. Coherent
recombination then adds a third test: interference depends on a controllable
relative phase that neither classical population model retains.

This pattern is a general method for reasoning in quantum mechanics:

- list the preparations and recorded outcomes without adding an unseen story;
- derive a quantitative prediction from each candidate model;
- choose a sequence for which those predictions differ; and
- repeat enough trials to separate systematic disagreement from count noise.

### Example 1.5: measurement or mere beam splitting?

An ideal device separates a $z+$ input into $x+$ and $x-$ paths. Compare
three arrangements.

- With both paths coherently recombined, a final $z$ analyzer returns $z+$
  with certainty.
- With the $x-$ path blocked, the final analyzer gives $z+$ and $z-$
  equally.
- With a path marker present but both beams physically redirected toward the
  output, the final analyzer again gives the incoherent 50–50 statistics if
  the marker records perfectly distinguishable alternatives.

The last comparison shows why spatial overlap alone is not sufficient for
interference. The relevant condition is whether the alternatives remain
coherent—whether any physical degree of freedom carries usable which-path
information. Chapter 2 will represent this distinction by retaining or
discarding the cross terms between amplitudes.

:::{admonition} Idealization boundary
:class: caution
A textbook Stern–Gerlach recombiner is an ideal coherent device.
Constructing one for massive particles is technically demanding because the
two paths must be redirected without leaving uncontrolled position,
momentum, or phase records. The idealization isolates the quantum logic; it
is not a claim that ordinary laboratory magnets automatically reverse an
analyzer.
:::

### Concept check 1.4

A run with $100$ atoms gives $54$ counts at $x+$ and $46$ at $x-$. Has the
expected 50–50 split failed?

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
quantum theory predicts that selecting $x+$ prepares a new state and makes
the final $z$ result 50–50, whereas a device that merely reads a permanent
$z$ label should not erase it.
:::

## Summary

- A Stern–Gerlach analyzer correlates a spin component with one of two
  paths.
- Filtering an output prepares a repeatable state for that component.
- Orthogonal spin components are incompatible: preparing one makes another
  uncertain.
- Indistinguishable alternatives interfere through complex amplitudes.
- A spin-$\tfrac12$ state requires a two-dimensional complex state space.
- Analyzer chains are sequences of conditional preparations and
  measurements; the most recent selected outcome determines the state
  entering the next device.
- Finite data fluctuate around theoretical probabilities with a
  characteristic scale proportional to $1/\sqrt N$.
- Sequential and coherent-recombination experiments are valuable because
  they force classical and quantum explanations to make different
  predictions.

## Exercises

1. An unpolarized beam of $20{,}000$ atoms passes through $\mathrm{SG}_z$; the
   $z+$ output then passes through $\mathrm{SG}_x$. Estimate the counts in the
   two final outputs.
2. Predict the possible final outcomes and their probabilities for
   $z+\rightarrow x-\rightarrow z$.
3. Insert a second $\mathrm{SG}_x$ after the $x-$ selection in Exercise 2. Explain
   why its result differs qualitatively from the final $S_z$ result.
4. A student says, "The first $S_z$ analyzer tells us which atoms were already
   pointing up." Identify two observations in this chapter that this classical
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
