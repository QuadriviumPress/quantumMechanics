# MyST plugins

[`simulation.mjs`](simulation.mjs) embeds a running browser simulation on the
website and falls back to a screenshot, a caption, and a link everywhere else
(print, and any future non-HTML export). It provides four directives:
`{simulation}`, `{openlyceum}`, `{phet}`, `{phet-legacy}`.

Registered in [`../myst.yml`](../myst.yml):

```yaml
project:
  plugins:
    - plugins/simulation.mjs
site:
  options:
    style: css/custom.css
```

The fallback's CSS lives in `../css/custom.css` rather than a separate
stylesheet, because `site.options.style` accepts only one file. See the
"simulation" section near the bottom of that file if you need to change an
aspect-ratio rule.

Edits to a `.mjs` plugin do **not** hot-reload. Restart `myst start` after
changing it. Run `npm test` to exercise `tests/simulation.test.mjs` against
it.

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
