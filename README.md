# Quantum Mechanics

*Quantum Mechanics: A Spins-First, Experimental Approach* is an open
undergraduate textbook by QuadriviumPress. It develops quantum theory from
Stern–Gerlach experiments, state vectors, and matrix mechanics before moving to
continuous wavefunctions.

The textbook contains twelve chapters:

1. Stern–Gerlach experiments
2. States and probability amplitudes
3. Operators and measurement
4. Time evolution
5. Composite systems and entanglement
6. Position and momentum representations
7. One-dimensional wave mechanics
8. Three-dimensional wave mechanics
9. Angular momentum
10. Approximation methods
11. Identical particles
12. Modern quantum applications

## Build

Node.js 22 and npm 10 are recommended.

```bash
npm install
npm run start
npm run verify
npm run build
```

Use `npm ci` for an exact installation from the lockfile. The production site
is written to `_build/html`.

## Figures

The original SVG diagrams for all twelve chapters are generated with
Matplotlib. To regenerate them,
create a Python environment, install the small figure-only dependency set, and
run the generator:

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements-figures.txt
.venv/bin/python scripts/generate_figures.py
.venv/bin/python scripts/generate_figures_05_12.py
```

The script writes deterministic, editable SVG files to `images/figures/`.

## Interactive simulations

Chapters embed running browser simulations with the `{openlyceum}`, `{phet}`,
`{phet-legacy}`, or `{simulation}` directives, supplied by
[`plugins/simulation.mjs`](plugins/simulation.mjs):

````markdown
```{openlyceum} SternGerlach
:label: fig:ch01-stern-gerlach-sim

Assemble analyzers, magnets, and counters, then compare Monte Carlo counts
with the analytic prediction.
```
````

On the website this is the live simulation. In print or any other export that
cannot run JavaScript, the same figure becomes a screenshot with its caption
and a link to the running version. See [`plugins/README.md`](plugins/README.md)
for the full option list and [`SOURCES.md`](SOURCES.md) for which simulation
appears in which chapter.

## Contributing

Corrections, accessibility improvements, exercises, and original interactive
activities are welcome. Do not submit copied prose, figures, or problems from
commercial textbooks. New material should identify its sources and respect
their licenses.

## License

The textbook content is licensed under the [Creative Commons Attribution-
ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/).
Template and build-tool code retained from the Opinionated MyST Markdown Book
Template remains available under the MIT License in `LICENSE`.
