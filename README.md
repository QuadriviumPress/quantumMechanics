# Opinionated MyST Markdown Book Template

An enhanced starter for publishing an interactive online book with
[MyST Markdown](https://mystmd.org/). It favors a small set of conventions that
make authoring, testing, and deployment predictable from the first commit.

## Features

- Ready-to-use `content/`, `img/`, `css/`, and `scripts/` structure
- MyST book configuration with sensible metadata and navigation defaults
- Reproducible Node 22 toolchain with `mystmd` pinned to `1.10.1`
- Pull-request CI that validates and builds the complete site
- Automatic GitHub Pages deployment on every push to `main`
- Progressive Web App manifest, installable icons, standalone reading mode,
  and offline access for previously visited pages
- Sample equations, directives, cross-references, and code blocks

## Use this template

1. Select **Use this template** on GitHub and create a repository.
2. Clone your new repository.
3. Install dependencies and start the live preview:

   ```bash
   git clone https://github.com/YOUR-ACCOUNT/YOUR-BOOK.git
   cd YOUR-BOOK
   npm install
   npm run start
   ```

4. Replace the placeholder title, author, description, and `github` value in
   `myst.yml`.
5. Replace the sample pages and add every new page to `project.toc`.
6. In **Settings → Pages**, choose **GitHub Actions** as the source.

No `gh-pages` branch is needed: the deployment workflow publishes the generated
`_build/html` artifact directly through GitHub Pages.

## Build

```bash
npm install
npm run start
npm run verify
npm run build
```

The production site is written to `_build/html`. Set `BASE_URL` when testing a
project-site deployment locally:

```bash
BASE_URL=/YOUR-BOOK npm run build
```

Use `npm ci` in CI and whenever you want an exact install from the lockfile.

## Project structure

| Path | Purpose |
| --- | --- |
| `myst.yml` | Book metadata, table of contents, and theme configuration |
| `content/` | Main book content in MyST Markdown |
| `img/` | Logos, figures, and other source images |
| `css/` | Book-specific styles |
| `scripts/` | Validation and post-build PWA tooling |
| `pwa/` | Offline fallback and service worker source |
| `.github/workflows/ci.yml` | Pull-request validation and build |
| `.github/workflows/deploy.yml` | Build and GitHub Pages deployment |

## Opinionated conventions

- Keep content under `content/` and explicitly list reading order in `myst.yml`.
- Commit `package-lock.json`; use local npm scripts instead of a global MyST install.
- Treat warnings and build failures as changes to resolve before merging.
- Give figures useful filenames and accessible alternative text.
- Update the sample branding before publishing a real book.
- Cache only pages a reader visits; do not promise that an unvisited book is
  available offline.

## PWA behavior

`npm run build` runs MyST and then `scripts/setup-pwa.mjs`. The script derives
the app name and description from `myst.yml`, generates 192 px and 512 px icons,
copies the service worker, and injects the manifest and registration into every
HTML page. It respects `BASE_URL`, including GitHub Pages project paths.

Browsers control whether and when an install prompt appears. PWA features require
HTTPS in production (GitHub Pages provides it) or `localhost` during development.

## Contributing

Issues and pull requests that improve the starter without making it
book-specific are welcome.

The template code is available under the [MIT License](LICENSE). Choose and
document an appropriate content license for your own book in `myst.yml`.
