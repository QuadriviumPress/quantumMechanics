# Self-hosted H5P exercises

Static files only. No h5p.com account, no self-hosted H5P server (WordPress,
Drupal, Moodle), no database. A question is a folder of JSON; the player is a
vendored JavaScript library; `embed.html` glues the two together in an iframe.
`plugins/h5p.mjs` documents the MyST-facing side of this; this file documents
the content itself. The contents of this directory are **authoring inputs**, not
the directory shipped verbatim to readers.

```
h5p/
  embed.html       generic loader: reads ?id=<content-id> from its own URL
  player/           vendored h5p-standalone runtime (the H5P core, as a client-side player)
  libraries/        catalog of unpacked H5P content-type libraries
  packages/         optional standard .h5p packages, named <content-id>.h5p
  content/
    <id>/
      h5p.json       content metadata: title, main library, dependency versions
      content/
        content.json  the question text and answer choices
.generated/h5p/     generated runtime tree; ignored by Git
```

`npm run h5p:prepare` reads every activity's dependency metadata, follows the
dependencies recursively, and writes `.generated/h5p/`. It accepts both the
unpacked activities under `content/` and standard packages under `packages/`.
Only the union of libraries required by those activities is emitted, and
documentation, tests, package-manager files, and other development material are
left behind. `myst.yml` publishes that generated tree at `/h5p/...` regardless
of where a chapter page that embeds it lives.

No activities are authored yet — `content/` and `packages/` do not exist until
the first one is added. `npm run h5p:prepare` requires at least one activity to
produce a non-empty tree; run it after adding your first activity, not before.

## Why this layout

[`h5p-standalone`](https://github.com/tunapanda/h5p-standalone) plays H5P
content without a server, but it still needs the actual content-type code
(`H5P.MultiChoice`, `H5P.TrueFalse`, `H5P.DragQuestion`, …) and their recursive
dependencies. The build-time packager provides that without limiting the book
to a fixed set of content types: adding an activity automatically expands the
generated library union. Each library is still emitted once and shared by every
activity, rather than being duplicated inside every `content/<id>/`.

## Adding an activity

The simplest prototype workflow is to export a standard `.h5p` file from an
H5P authoring tool and put it in `packages/`. Its filename (without `.h5p`) is
the content id used by the directive:

```
h5p/packages/ch04-quality-factor.h5p
```

The package may use any H5P content type and may bundle its libraries. Run
`npm run h5p:prepare`; the packager imports its content and makes any newly
required libraries available to all activities. A missing dependency or a
duplicate content id fails the build rather than producing a broken exercise.

Activities may also be maintained as unpacked JSON, which is convenient for
small hand-authored questions and readable diffs:

1. Pick an id, e.g. `ch04-quality-factor`, matching the chapter it belongs to.
2. Create `content/<id>/h5p.json`:

   ```json
   {
     "title": "A short human-readable title",
     "language": "en",
     "mainLibrary": "H5P.MultiChoice",
     "embedTypes": ["iframe"],
     "license": "CC BY-NC-SA",
     "licenseVersion": "4.0",
     "preloadedDependencies": [
       { "machineName": "jQuery.ui", "majorVersion": 1, "minorVersion": 10 },
       { "machineName": "H5P.Components", "majorVersion": 1, "minorVersion": 0 },
       { "machineName": "H5P.Transition", "majorVersion": 1, "minorVersion": 0 },
       { "machineName": "H5P.FontIcons", "majorVersion": 1, "minorVersion": 0 },
       { "machineName": "FontAwesome", "majorVersion": 4, "minorVersion": 5 },
       { "machineName": "H5P.JoubelUI", "majorVersion": 1, "minorVersion": 3 },
       { "machineName": "H5P.Question", "majorVersion": 1, "minorVersion": 5 },
       { "machineName": "H5P.MultiChoice", "majorVersion": 1, "minorVersion": 16 }
     ]
   }
   ```

   Dependencies do not have to be flattened: the packager follows dependency
   declarations in each selected library's `library.json`. They do have to be
   available either in `libraries/` or inside one of the `.h5p` packages.

3. Create `content/<id>/content/content.json`:

   ```json
   {
     "question": "<p>Question text, as HTML.</p>",
     "answers": [
       { "text": "<div>Correct choice</div>", "correct": true },
       { "text": "<div>Distractor</div>", "correct": false }
     ],
     "behaviour": {
       "enableRetry": true,
       "enableSolutionsButton": true,
       "singlePoint": true,
       "randomAnswers": true,
       "showSolutionsRequiresInput": true,
       "autoCheck": false,
       "passPercentage": 100,
       "showScorePoints": true
     }
   }
   ```

   Only `question` and `answers` are read by `H5P.MultiChoice` itself; every
   other field (`behaviour`, the button labels, …) has a built-in English
   default, kept explicit here only where it differs from that default.

4. Reference it from a chapter with `{h5p}` (see `../plugins/README.md`) and
   write a static equivalent in the directive body for print, PDF, DOCX, and
   Markdown readers, e.g.:

   ````markdown
   :::{h5p} ch04-quality-factor
   Multiple choice. Question text goes here.

   (A) Correct choice
   (B) Distractor
   :::
   ````

5. Run `npm run h5p:prepare` (or `npm start`, which runs it automatically),
   open the chapter, and check that the activity renders and behaves correctly
   before committing.

If a book later settles on a standard set of per-chapter review questions, a
`scripts/generate-h5p-quizzes.mjs` batch generator (as used in `modernPhysics`
and `physicsOfMusic`) can regenerate `content/chNN-chapter-review/` folders and
their in-chapter fallback text together from one source of truth. That
generator is book-specific — it encodes each book's own questions — so it is
written per book rather than copied.

## Where the vendored code came from

- `player/` is the `dist/` folder of `h5p-standalone@3.8.2`
  (`npm view h5p-standalone version` to check for a newer one; re-copy
  `node_modules/h5p-standalone/dist/` over `player/` to update it).
- The libraries currently in `libraries/` were fetched with the official
  [`h5p-cli`](https://github.com/h5p/h5p-cli) toolkit, which clones each
  content type and its dependencies straight from the `h5p` GitHub
  organization (`h5p core && h5p setup h5p-multi-choice`). Standard `.h5p`
  packages can contribute additional libraries, so experimenting with another
  content type does not require changing the player or the MyST plugin.

| Library | Version |
|---|---|
| H5P.MultiChoice | 1.16 |
| H5P.QuestionSet | 1.21 |
| H5P.TrueFalse | 1.8 |
| H5P.DragText | 1.10 |
| H5P.Blanks | 1.14 |
| H5P.MarkTheWords | 1.11 |
| H5P.Image | 1.1 |
| H5P.Video | 1.6 |
| H5P.TextUtilities | 1.3 |
| H5P.Question | 1.5 |
| H5P.JoubelUI | 1.3 |
| H5P.Components | 1.0 |
| H5P.Transition | 1.0 |
| H5P.FontIcons | 1.0 |
| FontAwesome | 4.5 |
| jQuery.ui | 1.10 |
