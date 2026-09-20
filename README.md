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

Node.js 22 and npm 10 are recommended (`nvm use` if you have nvm; see
`.nvmrc`).

```bash
npm install
npm run start     # preview
npm run build     # static site in _build/html/
npm run verify    # toolchain check, H5P tree, metadata checks
npm run check     # verify, tests, HTML, and links
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
`npm run check:figures` regenerates them into a scratch copy and diffs against
the committed set, with the exact Matplotlib version pinned in
`requirements-figures.txt`.

## Interactive media

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

Short local canvas figures use `{animation}`, YouTube/Vimeo material uses
`{video}`, and self-hosted auto-graded chapter activities use `{h5p}`. All
three follow the same live-on-the-web, static-in-print contract as
simulations. See [`plugins/README.md`](plugins/README.md) and
[`h5p/README.md`](h5p/README.md) for usage.

## Print and Word editions

The website is the primary edition, but the same source builds a printable
book, a set of chapter offprints, and a Word document — all into `exports/`,
which is not committed.

```bash
npm run build:exports    # everything below; duration depends on the TeX toolchain
npm run build:pdf        # the two book PDFs only
npm run build:chapters   # the twelve chapter offprints only
npm run build:docx       # the Word edition only
```

| File | What it is |
|---|---|
| `quantum-mechanics.pdf` | The whole book, worked solutions included |
| `quantum-mechanics-student.pdf` | The whole book, exercises but no solutions |
| `quantum-mechanics.docx` | The complete edition as a Word document |
| `ch-NN-<slug>.pdf` | One standalone offprint per chapter |

Beyond Node, the print build needs a TeX Live install with XeLaTeX, Inkscape
(MyST converts SVG figures to PDF with it and with nothing else), and, for the
Word edition, pandoc and poppler-utils:

```bash
sudo apt-get install -y --no-install-recommends \
  inkscape latexmk texlive-xetex texlive-latex-base texlive-latex-recommended \
  texlive-latex-extra texlive-fonts-recommended texlive-plain-generic \
  pandoc poppler-utils
```

Exports are built by
[`.github/workflows/exports.yml`](.github/workflows/exports.yml), which runs on
`v*` tags, monthly, and on demand — not on every push, since installing
TeX Live and running XeLaTeX is comparatively expensive. Tagged builds publish
the book-level files as durable GitHub Release assets; monthly builds refresh
the workflow artifacts. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
prefers the most recent successful export artifacts and falls back to the
latest release if those artifacts are missing or expired, so ordinary pushes
to `main` build HTML only. Development and release procedures are collected in
[`CONTRIBUTING.md`](CONTRIBUTING.md).

This book's chapters currently write exercises as a plain numbered list rather
than `{exercise}`/`{solution}` directives, so
[`plugins/export.mjs`](plugins/export.mjs)'s rewriting of those two node types
is presently a no-op; its `{margin}`, `{dropdown}`, and cross-reference
handling still applies.

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
