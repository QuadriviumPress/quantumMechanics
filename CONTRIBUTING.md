# Contributing

Corrections, accessibility improvements, new exercises, and build fixes are
welcome. Substantial changes to the book's scope or chapter order should be
discussed in an issue first.

## Development environment

Use Node 22 and npm 10. The versions are declared in `.nvmrc`, `.node-version`,
and `package.json`. With nvm:

```bash
nvm use
npm ci
```

Preview with `npm start`. Before submitting a change, run:

```bash
npm run check
```

This validates chapter metadata, exercises the plugin and export tests, builds
the site, and checks links. `npm test` alone runs the fast Node and Python test
suites without a full build.

## Editing chapters

Follow the heading, directive, and exercise conventions already used in
`chapters/`. The page outline is derived from the numbered `##` headings
automatically. Every figure needs useful `:alt:` text and every reusable
target needs a unique label. `scripts/verify_book.py` (run by `npm run
verify`) checks labels, image references, and common conversion artifacts.

Keep source attribution current in `SOURCES.md`. Record the source and license
when adding adapted prose, data, photographs, or simulations.

## Figures

The figure generators are `scripts/generate_figures.py` and
`scripts/generate_figures_05_12.py`; their SVG outputs live in
`images/figures/` and are committed. After changing a generator, run it and
commit both source and output. To regenerate and compare the entire set:

```bash
python3 -m pip install -r requirements-figures.txt
npm run check:figures
```

## Interactive media

`{simulation}`, `{openlyceum}`, and `{phet}` embed a running browser
simulation; `{animation}` embeds a local looping canvas page; `{video}` embeds
YouTube or Vimeo; `{h5p}` embeds a self-hosted, auto-graded activity. All five
fall back to a static equivalent for print, PDF, DOCX, and Markdown. See
[`plugins/README.md`](plugins/README.md) for directive options and
[`h5p/README.md`](h5p/README.md) for adding an H5P activity.

## Print and Word exports

The complete export toolchain is documented in `README.md`. Changes to
`plugins/`, `templates/`, `scripts/build-exports.sh`, or `scripts/tex-to-docx.py`
should be checked with at least one chapter offprint locally. The tagged-release
workflow builds all editions and publishes the three book-level downloads as
durable GitHub Release assets. A separate monthly run refreshes workflow
artifacts without rebuilding the print editions on ordinary pushes.

Run `npm run test:exports` with the print toolchain installed to build a small
fixture as full/student PDFs and Word. It checks exercise and solution
visibility in PDF text and verifies native Word equations and embedded images.
Pull-request export CI also builds a representative and any changed chapter
offprints; chapter, image, and test changes trigger this workflow.

A complete `scripts/build-exports.sh all` run writes `exports/metadata.json`
with the source commit, UTC build date, and hashes of the downloadable files.
Keep this manifest with the export artifacts and release assets. Deployment
runs `node scripts/export-metadata.mjs prepare` to show verified dates and
revisions on the landing page and in the download menu. This updates the CI
checkout's `index.md` and `myst.yml`; do not commit these generated labels.
Older exports, or files whose hashes do not match, are explicitly labelled as
having an unavailable export date and revision.

## Release checklist

1. Run `npm ci` and `npm run check` with Node 22.
2. Run `npm run build:exports` and inspect the complete and student PDFs.
3. Confirm that the student PDF omits solutions and that the DOCX contains math
   and figures.
4. Update the version-facing notes, then push a `v*` tag.
5. Confirm the Exports and Pages workflows and test all download links.
