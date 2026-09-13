---
title: Identical Particles
---

# Identical particles

## Learning objectives

After this chapter, you should be able to:

- explain why exchanging identical particles cannot create a new observable
  configuration;
- construct symmetric boson and antisymmetric fermion states;
- apply the Pauli exclusion principle;
- show that the permutation operator's eigenvalues force every species into a
  bosonic or a fermionic sector;
- build two-particle Slater determinants;
- distinguish exchange effects from ordinary forces, including the direct and
  exchange energies behind Hund's rule;
- use occupation-number notation; and
- connect quantum statistics to atomic structure and to degeneracy pressure in
  many-body and astrophysical systems.

## 11.1 Indistinguishability is physical

Every measurement discussed so far has involved distinguishable degrees of
freedom: two separately labeled spins, or a single particle at a definite
location. Real matter is built from many particles of the same species, and
every electron in the universe has exactly the same mass, charge, and spin.
This chapter asks what changes when the objects being described are
fundamentally identical—not merely similar, but interchangeable in
principle—and shows that the answer is not a new force or interaction. It is a
restriction on which states of several particles are allowed to occur at all.

:::{note} Quick review: two very different meanings of "can't tell them apart"
Skip this box if it is already clear why quantum indistinguishability is a
new postulate and not just an admission of experimental sloppiness.

Take two identical classical billiard balls, prepared at positions $x_1$ and
$x_2$ at some initial time. Even if the balls are manufactured to agree in
every measurable respect—same mass, same color, same everything—classical
mechanics still assigns each ball its own continuous trajectory. An observer
who tracks both trajectories without blinking always knows which ball
started at $x_1$: "ball 1" and "ball 2" remain meaningful labels for the rest
of the experiment, even though no measurement performed on either ball
*alone*, after the fact, could ever tell them apart. Classical
indistinguishability is a practical limit on bookkeeping, not a limit built
into the state itself—nothing in the mathematics prevents assigning
permanent labels; only our patience for tracking them runs out.

Quantum mechanics removes even that in-principle handle. A wavefunction does
not follow a single sharp trajectory: two identical particles' wave packets
can spread out and genuinely overlap, so that there is no fact of the
matter, even in principle, about which particle is "the one that started on
the left." There is no hidden trajectory that an all-seeing observer could
have followed instead. This is why the rest of this chapter treats exchange
symmetry as a postulate about which *states* are physically allowed to
occur—equation {eq}`exchange-symmetry` below—rather than as a statement
about the limits of measurement. Working out the consequences of that one
difference is the entire content of this chapter.
:::

For two distinguishable particles, a product wavefunction can assign
$\psi_a$ to particle 1 and $\psi_b$ to particle 2:

```{math}
\Psi(1,2)=\psi_a(1)\psi_b(2).
```

For identical particles, the labels 1 and 2 are bookkeeping devices, not
measurable properties. Exchanging them cannot change any probability:

```{math}
|\Psi(2,1)|^2=|\Psi(1,2)|^2.
```

In three spatial dimensions, consistency permits two fundamental exchange
rules:

```{math}
:label: exchange-symmetry
\Psi(2,1)=+\Psi(1,2)\quad\text{(bosons)},
\qquad
\Psi(2,1)=-\Psi(1,2)\quad\text{(fermions)}.
```

Particles with integer spin are bosons; particles with half-integer spin are
fermions. This spin–statistics connection is a result of relativistic quantum
field theory and is taken as an empirical rule in nonrelativistic mechanics.

### Concept check 11.1

Is an antisymmetric wavefunction itself an observable negative probability?

:::{dropdown} Answer
No. Exchange changes an amplitude's sign. Probabilities remain nonnegative,
but the sign changes interference with the exchanged amplitude.
:::

### The permutation operator

The fact that only the squared magnitude of $\Psi$ is constrained suggests
introducing a definite operator for exchange itself, rather than reasoning
about probabilities alone. Define the **permutation operator** $\hat P_{12}$
by its action on any two-particle wavefunction,

```{math}
:label: permutation-operator
\hat P_{12}\Psi(1,2)=\Psi(2,1).
```

Relabeling which coordinate is read first and which second is applied twice
by $\hat P_{12}^2$, and doing so must return the original function unchanged:

```{math}
\hat P_{12}^2=\hat I.
```

Exchanging labels also cannot change the inner product of any two
wavefunctions built the same way, so $\hat P_{12}$ is unitary; combined with
$\hat P_{12}^2=\hat I$, this makes it Hermitian as well
($\hat P_{12}^\dagger=\hat P_{12}^{-1}=\hat P_{12}$). An eigenvalue $\lambda$ of
$\hat P_{12}$ must then satisfy $\lambda^2=1$, so $\lambda=\pm1$: exchange has
exactly two possible eigenvalues, and the mathematics permits no others.

For identical particles, the Hamiltonian cannot contain any term that treats
"particle 1" differently from "particle 2," since the two share every
intrinsic property and enter every interaction symmetrically. Consequently

```{math}
[\hat H,\hat P_{12}]=0,
```

so energy eigenstates can always be chosen to be simultaneous eigenstates of
$\hat P_{12}$. Nature realizes only one of the two eigenvalues for a given
species—$+1$ for every observed boson, $-1$ for every observed fermion, never
a mixture and never an intermediate value. This is the substance behind
equation {eq}`exchange-symmetry`: it is less an independent postulate about
wavefunctions than a statement of which permutation eigenvalue a given kind of
particle occupies, a choice forced to be one of only two possibilities by the
operator argument just given.

### Concept check 11.2

Why does $[\hat H,\hat P_{12}]=0$ for identical particles, and what does it
let us conclude about energy eigenstates?

:::{dropdown} Answer
The Hamiltonian of identical particles cannot contain any term that treats
"particle 1" differently from "particle 2," since the two share every
intrinsic property. Because $\hat H$ and $\hat P_{12}$ commute, energy
eigenstates can be chosen to also be eigenstates of $\hat P_{12}$, with
eigenvalue $+1$ (bosons) or $-1$ (fermions). A given species is always found
with one eigenvalue, never a mixture.
:::

## 11.2 Symmetrized two-particle states

If one particle occupies $a$ and the other $b$, with orthonormal one-particle
states, the allowed states are

```{math}
:label: symmetric-antisymmetric-states
|\Psi_+\rangle
=\frac{|a\rangle_1|b\rangle_2+|b\rangle_1|a\rangle_2}{\sqrt2},
```

```{math}
|\Psi_-\rangle
=\frac{|a\rangle_1|b\rangle_2-|b\rangle_1|a\rangle_2}{\sqrt2}.
```

The first is bosonic and the second fermionic. Neither factors into a state for
particle 1 and a state for particle 2. Exchange symmetry creates correlations
even without an interaction potential. Both combinations still live inside the
same two-particle tensor-product space built for distinguishable spins in
Chapter 5; what is new is that, once the particles are identical, an
unsymmetrized product such as $|a\rangle_1|b\rangle_2$ alone is no longer a
physically allowed state, because it implicitly—and wrongly—asserts which
particle is in which state.

If $a=b$, the antisymmetric expression vanishes. Two identical fermions cannot
occupy the same complete one-particle state:

:::{admonition} Pauli exclusion principle
:class: important
No two identical fermions may occupy the same one-particle quantum state.
:::

Any number of bosons may occupy one state. This difference produces radically
different collective behavior: it is ultimately why bosonic and fermionic
matter organize into such different phases at low temperature, a theme this
chapter returns to in Section 11.6.

### Example 11.1: position detection

For orbitals $\psi_a(x)$ and $\psi_b(x)$, the joint detection density is

```{math}
|\Psi_\pm(x_1,x_2)|^2
=\frac12\left[
|\psi_a(x_1)\psi_b(x_2)|^2
+|\psi_b(x_1)\psi_a(x_2)|^2
\pm2\operatorname{Re}
\{\psi_a^*(x_1)\psi_b^*(x_2)\psi_b(x_1)\psi_a(x_2)\}
\right].
```

The last term is an exchange-interference term. For fermions, the density
vanishes at $x_1=x_2$ when the internal spin states are also identical. This
“exchange hole” does not require a repulsive force. The same cross term
reappears, with the opposite role, once *energies* rather than mere detection
probabilities are computed in Section 11.3: there it becomes the exchange
integral responsible for Hund's rule.

:::{figure} ../images/figures/ch11-exchange-interference.svg
:name: fig-exchange-interference
:alt: Joint-position heat maps compare symmetric and antisymmetric two-particle amplitudes. Bosons show enhanced probability along equal detector coordinates, while fermions have a dark exchange hole along that diagonal.
:width: 100%

Direct and exchanged alternatives are physically indistinguishable, so their
amplitudes interfere. The plus sign enhances coincidence for bosons; the minus
sign forces the fermionic density to zero when the complete one-particle states
coincide.
:::

### Concept check 11.3

Does an exchange hole prove that two fermions repel through a new force?

:::{dropdown} Answer
No. It can occur even for a Hamiltonian with no interaction between the
particles. It is a correlation required by antisymmetry.
:::

## 11.3 Spin and spatial symmetry

The **complete** state—including space and spin—must have the required exchange
symmetry. For two electrons it must be antisymmetric. This requirement
multiplies rather than adds the constraints on the two factors: it is the
product of the spatial part and the spin part, together, that must change sign
under exchange, so a symmetric spatial factor demands an antisymmetric spin
factor, and an antisymmetric spatial factor demands a symmetric spin factor.

The singlet spin state is antisymmetric:

```{math}
\chi_{00}
=\frac{|+z,-z\rangle-|-z,+z\rangle}{\sqrt2}.
```

It must be multiplied by a symmetric spatial wavefunction. The three triplet
spin states are symmetric and must be paired with antisymmetric spatial
wavefunctions.

### Example 11.2: two electrons in a well

In the lowest-energy configuration, both electrons can occupy the same spatial
orbital $u_1(x)$ only if their spin state is the singlet. The spatial product
$u_1(x_1)u_1(x_2)$ is symmetric, and symmetric space times antisymmetric spin
is antisymmetric overall.

If the spin state is a triplet, the spatial part must be antisymmetric, so one
electron must occupy a higher orbital:

```{math}
\Psi_{\mathrm{space}}
=\frac{u_1(x_1)u_2(x_2)-u_2(x_1)u_1(x_2)}{\sqrt2}.
```

Exclusion therefore affects energy even when the Hamiltonian contains no
spin-dependent term.

:::{figure} ../images/figures/ch11-spin-space-symmetry.svg
:name: fig-spin-space-symmetry
:alt: A mapping shows that an antisymmetric electron spin singlet must pair with symmetric space and may share a spatial orbital, while a symmetric spin triplet must pair with antisymmetric space and requires different orbitals.
:width: 100%

Only the symmetry of the complete two-electron state is fixed. Spin and space
therefore compensate: the singlet permits shared spatial occupation, whereas
the triplet forces an antisymmetric spatial factor with an exchange hole.
:::

### Concept check 11.4

Can two electrons occupy the same spatial orbital?

:::{dropdown} Answer
Yes, if their combined spin state is antisymmetric—the singlet. They do not
occupy the same complete spin-orbital.
:::

### Direct and exchange energies

Example 11.2 already shows that the singlet and triplet configurations differ
in spatial symmetry before any interaction between the electrons is even
switched on. Once the electrons repel one another through a Coulomb
interaction $V$, this symmetry difference feeds directly into the energy.
Evaluating $\langle V\rangle$ in the symmetric or antisymmetric spatial pair
state of equation {eq}`symmetric-antisymmetric-states` splits the result into
a piece that would be present even for distinguishable particles and a piece
that survives only because of exchange:

```{math}
:label: direct-exchange-energy
E_\pm=\langle u_1u_2|\hat V|u_1u_2\rangle
\pm\langle u_1u_2|\hat V|u_2u_1\rangle
\equiv J\pm K.
```

Here $J$ is the **direct** (Coulomb) integral—the ordinary electrostatic
repulsion between two classical-looking charge distributions $|u_1|^2$ and
$|u_2|^2$—and $K$ is the **exchange** integral, built from the same cross term
already encountered in Example 11.1, now weighted by the interaction rather
than left as a bare interference term in a detection probability. The $+$ sign
belongs to the symmetric spatial state, paired with the antisymmetric spin
singlet; the $-$ sign belongs to the antisymmetric spatial state, paired with
a symmetric spin triplet.

For a repulsive Coulomb interaction, $K$ is typically positive. The triplet
configuration then lies **lower** in energy than the singlet configuration
built from the same pair of orbitals, even though the Hamiltonian contains no
spin-dependent term at all: the triplet's antisymmetric spatial wavefunction
already keeps the two electrons farther apart on average—the exchange hole of
Example 11.1—which lowers their mutual repulsion. This is the microscopic
origin of **Hund's first rule**: for a given electron configuration, the term
with the largest total spin usually has the lowest energy, because parallel
spins force the spatial wavefunction to keep electrons apart and reduce their
Coulomb repulsion. No new force is required, and none was invented—only the
antisymmetry postulate together with an ordinary repulsive interaction.

:::{caution} Not a universal rule
Hund's first rule is a reliable guide for filling atomic subshells, but $J$
and $K$ depend on the specific orbitals involved, and their ranking can differ
in other systems—some excited-state configurations and some molecular orbitals
reverse it. Treat $E_\pm=J\pm K$ as the correct general structure, and check
the sign of $K$ case by case rather than assuming it.
:::

### Concept check 11.5

Using $E_\pm=J\pm K$, explain why the triplet configuration of two electrons in
different orbitals is usually lower in energy than the singlet configuration
built from the same orbitals.

:::{dropdown} Answer
The triplet's symmetric spin state forces an antisymmetric spatial
wavefunction, which already vanishes when the two electrons coincide—the
exchange hole. This keeps the electrons farther apart on average and lowers
their mutual Coulomb repulsion, giving the triplet energy $J-K$, with $K>0$
typically, below the singlet's $J+K$. No spin-dependent force is needed, only
antisymmetry combined with ordinary repulsion.
:::

## 11.4 Slater determinants

For $N$ identical fermions in orthonormal one-particle spin-orbitals
$\chi_1,\ldots,\chi_N$, an antisymmetric state is

```{math}
:label: slater-determinant
\Psi(1,\ldots,N)
=\frac{1}{\sqrt{N!}}
\begin{vmatrix}
\chi_1(1)&\chi_2(1)&\cdots&\chi_N(1)\\
\chi_1(2)&\chi_2(2)&\cdots&\chi_N(2)\\
\vdots&\vdots&\ddots&\vdots\\
\chi_1(N)&\chi_2(N)&\cdots&\chi_N(N)
\end{vmatrix}.
```

Exchanging two particle labels swaps two rows and changes the sign. If two
spin-orbitals are identical, two columns coincide and the determinant is zero.
Both antisymmetry and exclusion are built into this one object.

A single Slater determinant is often a useful starting approximation for
many-electron atoms and molecules. General correlated fermion states require
superpositions of determinants.

:::{note} A determinant is a model, not a postulate
Writing a many-electron state as one Slater determinant—the Hartree–Fock
approximation—is a computational choice, not an additional physical law. It
exactly enforces antisymmetry, but by construction it cannot capture
correlation beyond exchange: the extent to which electrons of unlike spin
still avoid each other because of their mutual Coulomb repulsion. Better
approximations combine several Slater determinants.
:::

## 11.5 Occupation-number notation

When particle labels carry no physical meaning, it is often clearer to state
how many particles occupy each one-particle mode:

```{math}
|n_1,n_2,n_3,\ldots\rangle.
```

For fermions, $n_j=0$ or $1$. For bosons,
$n_j=0,1,2,\ldots$. Creation and annihilation operators change occupations.
For a bosonic mode,

```{math}
\hat a^\dagger|n\rangle=\sqrt{n+1}|n+1\rangle,\qquad
\hat a|n\rangle=\sqrt n|n-1\rangle,
```

with $[\hat a,\hat a^\dagger]=1$. Fermionic operators instead anticommute:

```{math}
\{\hat c_i,\hat c_j^\dagger\}=\delta_{ij},\qquad
\{\hat c_i,\hat c_j\}=0.
```

The relation $(\hat c_i^\dagger)^2=0$ is exclusion in operator form.

For each mode, the **number operator**

```{math}
:label: number-operator
\hat n_j=\hat a_j^\dagger\hat a_j\quad\text{(bosons)},
\qquad
\hat n_j=\hat c_j^\dagger\hat c_j\quad\text{(fermions)}
```

counts how many particles occupy mode $j$, since $\hat n_j|n_j\rangle
=n_j|n_j\rangle$ in either case. Summing over all modes gives the
total-number operator $\hat N=\sum_j\hat n_j$. Section 11.1 argued that
"particle 1" and "particle 2" are not physically meaningful labels;
occupation-number notation makes that argument precise by never introducing
such labels at all. It is $\hat N$, not any single-particle identity, that is
the well-defined observable.

## 11.6 Consequences for matter

Electrons fill atomic orbitals subject to exclusion. Including spin, an orbital
specified by $(n,\ell,m)$ holds at most two electrons, with opposite spin
labels. Shell structure and the periodic table emerge from this filling
together with Coulomb interactions and energy splittings. Within a given
subshell, the exchange energy of Section 11.3 further determines how electrons
distribute among degenerate orbitals: Hund's rule predicts that electrons
first occupy separate orbitals with parallel spins, maximizing the (typically
positive) exchange energy $K$, before any orbital is doubly occupied.

:::{figure} ../images/figures/ch11-boson-fermion-filling.svg
:name: fig-boson-fermion-filling
:alt: Bosons pile into one low-energy mode. Fermions instead fill separate levels with at most two opposite-spin particles per spatial mode up to a Fermi energy.
:width: 100%

Bosonic occupations can become arbitrarily large in one mode. Exclusion makes
fermions occupy a ladder of distinct states, creating a nonzero Fermi energy—and
therefore pressure—even at zero temperature.
:::

```{phet} build-an-atom
:label: fig:ch11-build-an-atom-sim

Add electrons one at a time and watch them fill shells subject to exclusion,
building up the periodic table's structure orbital by orbital. Try filling a
subshell with parallel spins before doubling any orbital, and check the
result against Hund's rule above.
```

In a macroscopic fermion system, low-energy states fill up to a Fermi energy.
Compression forces particles into higher momentum states even at zero
temperature, producing degeneracy pressure. For bosons, many particles can
accumulate in one mode, enabling coherent phenomena such as Bose–Einstein
condensation.

These are statistical effects rooted in state-space symmetry. They are not
optional corrections applied only when particles collide; they constrain the
allowed state from the start.

### Example 11.3: degeneracy pressure holds up dying stars

Consider $N$ spin-$\tfrac12$ fermions of mass $m$ confined to volume $V$ at
essentially zero temperature. Exclusion forces them to fill distinct momentum
states, two spin orientations per momentum value, up to a Fermi momentum
$p_F$ fixed by counting the occupied states:

```{math}
:label: fermi-momentum
n\equiv\frac NV=\frac{p_F^3}{3\pi^2\hbar^3}
\quad\Longrightarrow\quad
p_F=\hbar\,(3\pi^2n)^{1/3}.
```

The corresponding Fermi energy is

```{math}
:label: fermi-energy
E_F=\frac{p_F^2}{2m}=\frac{\hbar^2}{2m}(3\pi^2n)^{2/3}.
```

Crucially, $E_F$ depends only on the density $n$, not on the temperature:
exclusion alone forces most particles into states of substantial kinetic
energy, and compressing the gas into a smaller volume raises that energy
further. The resulting outward degeneracy pressure exists even at $T=0$,
unlike the pressure of an ordinary classical gas.

For the electron gas inside a white dwarf, a representative density is
$n\sim10^{36}\ \mathrm{m}^{-3}$, giving $p_F\sim3\times10^{-22}\ \mathrm{kg\,
m/s}$ and $E_F\sim0.4\ \mathrm{MeV}$ from equation {eq}`fermi-energy`—already a
sizable fraction of the electron rest energy $m_ec^2\approx0.511\ \mathrm{MeV}$.
Electron degeneracy pressure, not thermal pressure, is what balances gravity in
a white dwarf. Because the electrons are only mildly nonrelativistic at best, a
fully relativistic treatment becomes necessary near the Chandrasekhar mass
limit ($\approx1.4$ solar masses), beyond which electron degeneracy pressure
can no longer support the star; further collapse can produce a neutron star,
supported in turn by neutron degeneracy pressure at far higher density. None of
this requires any interaction beyond exclusion applied to a very dense, very
cold Fermi gas.

### Concept check 11.6

Does the degeneracy pressure of Example 11.3 require a nonzero temperature?

:::{dropdown} Answer
No. Equation {eq}`fermi-energy` depends only on the particle density, not on
temperature. Exclusion alone forces fermions into high-momentum states even at
$T=0$; an ordinary classical gas, by contrast, would exert zero pressure at
zero temperature.
:::

### Distinguishable in practice

Two particles of the same species may behave approximately distinguishably
when their wave packets remain well separated and no experiment recombines
them. Then exchange terms are negligibly small. As wavefunctions overlap,
particle-by-particle labels cease to support correct predictions and the
symmetrized description becomes essential.

## Summary

- Identical-particle labels are not observable, so exchange constrains the
  joint state.
- Boson states are symmetric and fermion states antisymmetric.
- Antisymmetry implies Pauli exclusion and exchange correlations.
- The permutation operator's eigenvalues are restricted to $\pm1$; since
  $[\hat H,\hat P_{12}]=0$ for identical particles, a given species occupies
  one eigenvalue exclusively, fixing it as a boson or a fermion.
- For electrons, spatial and spin symmetries combine to give an antisymmetric
  complete state.
- Direct and exchange energies split singlet and triplet configurations
  oppositely, and the sign of the exchange integral underlies Hund's rule.
- Slater determinants enforce fermionic antisymmetry for many particles.
- Occupation numbers replace unphysical particle labels and lead naturally to
  creation, annihilation, and number operators.
- Exclusion alone produces a temperature-independent degeneracy pressure that
  stabilizes white dwarfs and neutron stars against gravitational collapse.

## Exercises

1. Normalize the symmetric and antisymmetric states when $a$ and $b$ are
   orthogonal.
2. Apply the exchange operator twice and explain why its eigenvalues must be
   $\pm1$.
3. Show that the antisymmetric two-particle spatial wavefunction vanishes when
   $x_1=x_2$.
4. Construct all allowed two-electron states when only one spatial orbital is
   available.
5. For two spatial orbitals $a,b$, list the singlet and triplet possibilities
   and their required spatial symmetries.
6. Verify that a two-particle Slater determinant changes sign under exchange.
7. Explain why a determinant vanishes if two occupied spin-orbitals coincide.
8. Write occupation-number states corresponding to two bosons in three modes
   and to two fermions in three modes.
9. Derive $(\hat c_i^\dagger)^2=0$ from the fermionic anticommutation rule.
10. Two noninteracting fermions occupy a one-dimensional infinite well.
    Compare the lowest total energies for a spin singlet and a spin triplet.
11. Explain when two identical particles can be treated approximately as
    distinguishable and how that approximation could fail.
12. Distinguish exchange correlation, Coulomb repulsion, and entanglement in a
    two-electron state.
13. Show directly from $\hat P_{12}\Psi(1,2)=\Psi(2,1)$ that
    $\hat P_{12}^2=\hat I$, and use this to show that its eigenvalues must be
    $\pm1$.
14. For $\hat H=h(1)+h(2)+V(|\mathbf r_1-\mathbf r_2|)$, where $h$ is the same
    one-particle Hamiltonian for both particles, show explicitly that
    $[\hat H,\hat P_{12}]=0$.
15. Using the cross term identified in Example 11.1, explain why it enters the
    two-particle detection density with a plus sign for the symmetric
    (bosonic) spatial state and a minus sign for the antisymmetric (fermionic)
    spatial state, and connect this sign difference to the exchange integral
    $K$ in equation {eq}`direct-exchange-energy`.
16. Rank the singlet and triplet configurations of two electrons in orbitals
    $a\ne b$ from lowest to highest energy, assuming $K>0$, and state which
    configuration Hund's rule predicts for the corresponding real atomic
    ground state.
17. Show that $\hat n_j|n_j\rangle=n_j|n_j\rangle$ follows from the fermionic or
    bosonic operator algebra, and explain why $\hat N=\sum_j\hat n_j$ is a
    meaningful observable even though no individual particle carries a
    meaningful label.
18. Estimate the electron Fermi energy of a white dwarf with electron number
    density $10^{36}\ \mathrm{m}^{-3}$ using equation {eq}`fermi-energy`, and
    compare your result with the electron rest energy $m_ec^2$.
19. Explain why increasing the density of a fermion gas increases its
    degeneracy pressure even at $T=0$, while increasing the pressure of an
    ordinary classical gas at fixed density requires raising its temperature.
20. For three identical fermions distributed among four available
    spin-orbitals, how many distinct Slater determinant states can be formed?
21. Using the exchange-hole picture of Example 11.1, explain why two identical
    fermions with the same spin state are never found at exactly the same
    location, while two identical fermions with opposite spin states can be.
22. A student claims that antisymmetrization matters only for computing
    energies, and that the positions of noninteracting identical fermions are
    otherwise statistically independent. Use Example 11.1 to show that this
    claim is false even with no interaction present.
23. In helium, the ground configuration $1s^2$ admits only a spin singlet, but
    the excited configuration $1s2s$ admits both a singlet and a triplet term,
    with the triplet lying lower in energy (orthohelium below parahelium).
    Explain both halves of this statement using the results of Section 11.3.
24. In the Slater determinant of equation {eq}`slater-determinant`, exclusion
    is enforced by two *columns* coinciding, not two rows. Explain what each
    row and each column of the determinant represents, and why it is
    specifically the column structure, and not the row structure, that
    encodes the Pauli principle.
