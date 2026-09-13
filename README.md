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
