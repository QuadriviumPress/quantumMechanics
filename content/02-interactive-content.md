---
title: Interactive content
---

# Interactive content

MyST can render code cells and rich scientific content. This starter keeps the
toolchain lightweight, while leaving room to add Jupyter kernels or custom
plugins when your book needs them.

## A small example

```{code-block} python
:caption: A short Python example

def triangular_number(n):
    return n * (n + 1) // 2

print(triangular_number(10))
```

The deployed site is also a Progressive Web App. After a reader visits pages,
the service worker retains them for offline reading. The offline screen covers
pages that have not yet been cached.
