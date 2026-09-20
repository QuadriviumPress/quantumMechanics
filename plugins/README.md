# MyST plugins

Five plugins address the same problem: the website can do things paper cannot,
and the book still has to survive PDF, Word, Markdown, and browser printing.

- [`simulation.mjs`](simulation.mjs) — embeds a running browser simulation on
  the website and falls back to a screenshot, a caption, and a link everywhere
  else. Provides `{simulation}`, `{openlyceum}`, `{phet}`, `{phet-legacy}`.
- [`animation.mjs`](animation.mjs) — embeds a local looping canvas page and
  falls back to a static figure. Provides `{animation}` (alias `{anim}`).
- [`video.mjs`](video.mjs) — embeds YouTube or Vimeo through a privacy-conscious
  player and falls back to a poster plus durable source link. Provides `{video}`.
- [`h5p.mjs`](h5p.mjs) — embeds the book's self-hosted, auto-graded chapter
  activities and retains the written question as a static fallback. Provides
  `{h5p}`. See [`../h5p/README.md`](../h5p/README.md) for how to add one.
- [`export.mjs`](export.mjs) — rewrites the node types no export renderer
  handles into ones every renderer handles. Inert unless `MYST_PRINT` is set.

All four media plugins are registered in [`../myst.yml`](../myst.yml):

```yaml
project:
  plugins:
    - plugins/animation.mjs
    - plugins/video.mjs
    - plugins/h5p.mjs
    - plugins/simulation.mjs
    - plugins/export.mjs
  static_files:
    - animations
    - .generated/h5p
site:
  options:
    style: css/custom.css
```

The fallback's CSS lives in `../css/custom.css` rather than a separate
stylesheet, because `site.options.style` accepts only one file. See the
interactive-media section near the bottom of that file if you need to change
an aspect-ratio rule.

Edits to a `.mjs` plugin do **not** hot-reload. Restart `myst start` after
changing it. Run `npm test` to exercise the plugin tests under `tests/`.

# The simulation plugin

## Usage

````markdown
```{openlyceum} SternGerlach
:label: fig:ch01-stern-gerlach-sim

Assemble analyzers, magnets, and counters, then compare Monte Carlo counts
against the analytic prediction.
```
````

The figure is numbered and cross-referenced like any other:
`@fig:ch01-stern-gerlach-sim`.

Four directives, one implementation:

| Directive | Argument | Resolves to |
|---|---|---|
| `{openlyceum}` | repository name | `https://openlyceum.github.io/<Repo>/` |
| `{phet}` | simulation name | `https://phet.colorado.edu/sims/html/<sim>/latest/<sim>_<locale>.html` |
| `{phet-legacy}` | simulation name, or `project/sim` | `https://phet.colorado.edu/sims/cheerpj/<project>/latest/<project>.html?simulation=<sim>` |
| `{simulation}` (alias `{sim}`) | a URL, or `provider:name` | whatever you give it |

## PhET's Java simulations

A few topics in this book — bound states in a well, barrier tunneling — have
no HTML5 PhET simulation, only the original Java one. PhET still publishes
those, run in the browser by [CheerpJ](https://cheerpj.com/), and
`{phet-legacy}` addresses them:

````markdown
```{phet-legacy} quantum-tunneling
```
````

A CheerpJ sim downloads a Java runtime before its first paint — tens of
seconds on a cold cache — and it is mouse-only: neither touch nor keyboard
navigation works the way it does in an HTML5 sim. Prefer `{phet}` or
`{openlyceum}` wherever either has something equivalent.

## Options

| Option | Default | Notes |
|---|---|---|
| `width` | `100%` | **Percentages only.** The theme mangles `px` values. |
| `aspect` | `1024:618` (OpenLyceum), `768:504` (PhET), `4:3` (PhET legacy) | Other ratios need a matching rule in `custom.css`. |
| `placeholder` | provider screenshot | Relative to the `.md` file, `/`-prefixed for the project root, or a URL. Use **PNG or JPEG**. |
| `no-placeholder` | — | Drop the static fallback entirely. |
| `alt` | derived | Alternative text for the fallback image. |
| `title` | derived | Accessible title for the iframe. |
| `align` | `center` | `left`, `center`, `right`. |
| `label` | — | Makes the figure cross-referenceable. |
| `class` | — | Extra classes on the simulation frame. |
| `enumerated` | — | Whether the figure is numbered. |
| `params` | — | Raw query string, e.g. `snapToGrid=true&gridSpacing=2`. |
| `screens` | — | `?screens=` — restrict to particular screens. |
| `screen` | — | `?initialScreen=` — which screen to open on. |
| `locale` | `en` | SceneryStack reads `?locale=`; PhET puts it in the filename. |
| `sim-name` | the id made readable | Display name — caption link, iframe title, and alt text. |
| `link-text` | the simulation name | Text of the caption link. |
| `no-link` | — | Suppress the caption link. |

`{phet}` simulations with more than one screen (`quantum-measurement` has
three) are selected with `:screen:`, e.g. `:screen: 3` for its Bloch Sphere
screen. Screens are 1-indexed in the order PhET's own tab bar shows them.

## How the fallback works

A simulation is a JavaScript application, so it can only ever *run* on the
website. Each directive emits **both** an `iframe` node and a plain `image`
node as siblings inside one `figure` container. The website hides the image
and shows the iframe; `custom.css`'s `@media print` rule flips that around for
a browser print, so a printed page gets the screenshot instead of a blank
rectangle. The caption always ends with a link to the live simulation.

## Screenshots

`{openlyceum}` uses `Baton/screenshots/<Repo>.png`, a capture of the running
simulation kept current by Baton's own refresh workflow — not the generic PWA
splash image each simulation also publishes at `screenshots/wide.png`.

`{phet}` uses `<sim>-600.png`, the largest size PhET publishes. `{phet-legacy}`
uses the same name from the project directory rather than from `sims/html`.

Both are remote URLs. MyST downloads and caches them into `_build/`, so a
repeat build works offline, but the *first* build after adding a new
simulation needs network access.

## Adding a provider

`PROVIDERS` at the top of `simulation.mjs` is a plain object. An entry needs a
`resolve( id, options )` returning the simulation URL and a screenshot URL,
plus the frame's aspect ratio:

```js
myhost: {
  label: 'My Host',
  aspect: '16:9',
  resolve( id, opts ) {
    return {
      url: `https://example.org/sims/${ id }/${ buildQuery( {}, opts.params ) }`,
      placeholder: `https://example.org/sims/${ id }/thumb.png`
    };
  }
}
```

If the aspect ratio is not already covered in `custom.css`, add a rule for it
there. These URL patterns are conventions of the hosts, not contracts — if
OpenLyceum or PhET changes its Pages layout, `PROVIDERS` is the only thing to
update.

# The animation plugin

A bare animation id resolves to `/animations/<id>.html`. Supply a print-safe
fallback with `:figure:`; when the fallback follows the default
`/images/<id>.svg` convention the option may be omitted.

````markdown
```{animation} ch03-standing-wave-formation
:figure: /images/ch03-standing-wave-formation.svg
:label: fig:ch03-standing-wave-formation
:alt: A standing wave builds from two counter-propagating traveling waves.

Watch the two traveling waves interfere to build the standing pattern.
```
````

The local pages are copied without content hashing through
`project.static_files`, which preserves their module imports. `BASE_URL` is
applied to iframe URLs for subpath deployments. Useful options are `figure`,
`no-figure`, `width`, `aspect`, `title`, `alt`, `label`, and `class`. The
shared canvas helpers used to build a page (`animlib.js`, `animlib.css`,
`priority-scenes.js`) live in `../animations/lib/`.

No animation pages exist in `animations/` yet beyond the shared `lib/`
helpers — this book has not authored one. Add `animations/<id>.html` and its
static fallback in `images/` before using the directive.

# The video plugin

YouTube posters are derived automatically; Vimeo requires an explicit
`:poster:` because its oEmbed thumbnail URL cannot be inferred offline.

````markdown
```{video} https://www.youtube.com/watch?v=uva6gBEpfDY
:video-title: Stern-Gerlach Experiment Explained
:label: fig:ch01-stern-gerlach-video
:alt: An animation traces silver atoms splitting into two beams in a magnetic field.

A short explainer with a print-safe poster and source link.
```
````

The iframe uses `youtube-nocookie.com`; the caption always links to the original
watch page. Options include `poster`, `video-title`, `link-text`, `width`,
`aspect`, `title`, `alt`, `label`, and `class`.

# The export plugin

`myst-to-tex` renders a fixed set of node types and reports anything else as
`Unhandled LaTeX conversion for node of "<type>"` — then drops it. This book's
current chapters write exercises as a plain numbered list rather than
`:::{exercise}` directives, so the plugin's exercise/solution rewriting is
currently inert for them; the types it does rewrite unconditionally are:

| Node | Written as | Without the plugin |
|---|---|---|
| `exercise` | `:::{exercise}` (not yet used in this book's chapters) | every directive-based exercise vanishes |
| `solution` | `:::{solution}` (not yet used in this book's chapters) | every directive-based solution vanishes |
| `aside` | `:::{margin}` | every margin note vanishes |
| `details` | `:::{dropdown}` | every dropdown body vanishes |
| `iframe` | the simulation/animation/video/h5p directives | intended — the sibling screenshot carries it |

Since a plugin cannot supply a renderer, `export.mjs` rewrites those nodes into
ones the renderer already understands, and only while an export is being built:

| Node | Becomes |
|---|---|
| `exercise` | a bold **Exercise 4.1** run-in title, a `\label`, then the body |
| `solution` | the same, indented — or nothing at all, in the student edition |
| `aside` | a `blockquote`, which the template styles as a tinted rule |
| `details` | the summary as a bold lead-in, then the body, always open |
| `iframe` | removed |
| `link` (cross-page) | `\hyperref` into the PDF, or a link back to the website |

## Editions

Two environment variables steer it. Neither is set for `myst start` or
`myst build --html`, where the plugin returns immediately.

| Variable | Values | Effect |
|---|---|---|
| `MYST_PRINT` | `full`, `student` | Which edition. `student` drops all solutions. Unset means the website — the plugin does nothing. |
| `MYST_SITE_URL` | a base URL | Only for chapter offprints. An offprint holds one chapter, so its "see Chapter 7" references leave the file and point at the website. Leave unset for the whole book, where the jump should stay inside the PDF. |

`../scripts/build-exports.sh` sets both correctly for each artifact; prefer it
to calling `myst build` by hand.

## Cross-references in the PDF

The book's cross-chapter references resolve to a `link` node carrying both the
target's identifier and its *website* URL. Left alone, `myst-to-tex` writes the
URL — a dead relative path in a PDF. `export.mjs` rewrites them to
`\hyperref`, and puts a matching `\label` at the top of each chapter, taken
from that file's own frontmatter. (`{numref}` and `{eq}` references are
`crossReference` nodes, not links; those already come out as `\ref` and are
left alone.)
