---
title: Quantum Mechanics
---

# Quantum Mechanics

## A Spins-First, Experimental Approach

Quantum mechanics is not classical mechanics with a layer of uncertainty added.
It is a different framework for connecting preparations, transformations, and
measurements. This book begins where that difference is easiest to see: a beam
of atoms passing through Stern–Gerlach analyzers.

Starting with a two-state system lets us confront the essential ideas before
differential equations obscure them. States are vectors, alternatives combine
through complex amplitudes, observables are operators, and time evolution is
unitary. Wavefunctions will later appear as the coordinates of a state in a
continuous position basis—not as the definition of a quantum state.

:::{important} Guiding question
How can a mathematical theory predict the probabilities of individual outcomes
while making precise, testable predictions for an ensemble of experiments?
:::

## Who this book is for

The intended reader has completed introductory mechanics and electromagnetism,
is comfortable with calculus and complex numbers, and has seen basic matrix
algebra. The necessary linear algebra is reviewed when it first becomes useful.

The text emphasizes four habits:

1. Begin with a physical preparation and a clearly specified measurement.
2. Keep the state, its coordinates, and the physical system distinct.
3. Move deliberately among diagrams, bra–ket notation, and matrices.
4. Check every result against normalization, dimensions, and limiting cases.

## Book structure

The book develops one connected route from two-state experiments to modern
applications.

### Part I: quantum states and dynamics

- [Stern–Gerlach experiments](01-stern-gerlach.md) establish the experimental
  rules that a theory must explain.
- [States and probability amplitudes](02-states-amplitudes.md) introduce kets,
  bases, inner products, and interference.
- [Operators and measurement](03-operators-measurement.md) turn measurement
  outcomes into a general mathematical framework.
- [Time evolution](04-time-evolution.md) develops unitary dynamics and spin
  precession.

### Part II: composite and continuous systems

- [Composite systems and entanglement](05-composite-entanglement.md) introduce
  tensor products, reduced states, Bell correlations, and two-qubit gates.
- [Position and momentum representations](06-position-momentum.md) reinterpret
  wavefunctions as continuous-basis coordinates and develop Fourier duality.
- [One-dimensional wave mechanics](07-one-dimensional-wave-mechanics.md)
  treats bound states, scattering, tunneling, and the harmonic oscillator.
- [Three-dimensional wave mechanics](08-three-dimensional-wave-mechanics.md)
  develops separability, central potentials, and hydrogen.

### Part III: structure and applications

- [Angular momentum](09-angular-momentum.md) develops rotation algebra,
  spherical harmonics, and addition of angular momenta.
- [Approximation methods](10-approximation-methods.md) introduce perturbation
  theory, variational estimates, WKB, and driven transitions.
- [Identical particles](11-identical-particles.md) connect exchange symmetry to
  exclusion, occupation numbers, and the structure of matter.
- [Modern quantum applications](12-modern-applications.md) apply the framework
  to information processing, error correction, sensing, clocks, and
  simulation.

## Conventions

States are normalized kets such as $|\psi\rangle$. Operators carry hats, such
as $\hat S_z$. Unless stated otherwise, spin operators have units of angular
momentum and their eigenvalues contain $\hbar$. Probabilities are dimensionless
and lie between zero and one.

This is an original open textbook inspired by the spins-first teaching
tradition. It does not reproduce the prose, figures, or problems of commercial
texts.
