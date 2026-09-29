# AGENTS.md

## Standard

This book follows the [QuadriviumPress MyST baseline](https://github.com/QuadriviumPress/bindery/blob/main/doc/myst-baseline.md) and the [presentation skill](https://github.com/QuadriviumPress/bindery/blob/main/skills/quadrivium-myst-presentation/SKILL.md).

## Commands

```bash
npm run check:toolchain
npm run h5p:prepare
npm run prestart
npm run start
npm run prebuild
npm run build
npm run precheck
npm run verify
npm run check
npm run check:figures
npm run check:project
npm run test
npm run test:exports
npm run build:exports
npm run build:pdf
npm run build:chapters
npm run build:docx
npm run figures
```

`npm run check` is the production-equivalent verification and HTML build.

## Intentional differences

- `check:toolchain` and `h5p:prepare` support H5P. `prestart` and `prebuild` run both. There is no `h5p:generate` or `h5p:check`.
- `verify` runs H5P prepare, `python3 scripts/verify_book.py`, `check:project`, and `npm test`, so `check` can stay `npm run verify && myst build --html --strict --check-links`.
- `figures` regenerates chapter figures. `check:figures`, `check:project`, `test:exports`, `build:exports`, `build:pdf`, `build:chapters`, and `build:docx` cover figures, project metadata, and print editions.
- `check:project` checks that the website table of contents and the print export list the same chapter files, and that every figure has alternative text.
- `devDependencies` includes `fflate`.
- `scripts/setup-pwa.mjs` deletes the duplicate `/build/h5p` copy MyST emits and marks H5P iframes `loading="lazy"`.

## Presentation gap

Exercises are a plain numbered list under `## Exercises`, and partial answers use a `{dropdown}` titled Exercise N. The export plugin's `{exercise}` / `{solution}` rewrite is unused on purpose. Switching to those directives is deferred.
