---
title: Export regression fixture
label: smoke-chapter
---

## Equations and figures

Inline energy $E=mc^2$ and a displayed fraction:

$$
\frac{1}{2}mv^2
$$

```{figure} plot.pdf
:alt: A horizontal rule representing a test plot

Rasterized PDF figure.
```

```{simulation} https://example.test/simulation
:placeholder: /images/simulation-placeholder.png
:title: Export test simulation

Simulation fallback caption.
```

```{exercise} Retained exercise
:label: smoke-exercise

ExerciseSentinel: calculate the energy.
```

````{solution} smoke-exercise

SolutionSentinel: use the energy equation.

```{figure} plot.pdf
:alt: The solution plot

A figure inside a solution must survive the full export.
```
````
