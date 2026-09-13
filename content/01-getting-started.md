---
title: Getting started
---

# Getting started

Organize each chapter as a Markdown file in `content/`. Add it to the `toc` in
`myst.yml`, and MyST will include it in the book navigation.

## Write with MyST

MyST supports familiar Markdown plus roles and directives for technical
publishing. For example, an equation can carry a reusable label:

```{math}
:label: eq-energy
E = mc^2
```

You can refer back to {eq}`eq-energy` without manually maintaining its number.

:::{note}
Keep source files small enough to review comfortably. One file per chapter is a
good default; split unusually long chapters into sections when that helps.
:::
