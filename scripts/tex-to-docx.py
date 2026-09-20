#!/usr/bin/env python3
"""Turn the LaTeX export of *Quantum Mechanics* into a Word document.

Why not ``myst build --docx``
-----------------------------
MyST's own DOCX renderer writes every equation as ``Math(MathRun(latex))`` --
the raw LaTeX *string* dropped inside a Word equation field. Word shows
``\\frac{3\\lambda}{d}``, not a fraction, and the only cure is to select each
equation and hit Convert -> Professional by hand. This book has roughly 470
display equations and 6000 inline ones, so that renderer is not usable here.

Pandoc's LaTeX reader converts the same math to OMML, which Word renders and
edits natively. So the DOCX is built from the ``.tex`` that already produced the
PDF -- one source, one set of numbers, one set of cross-references.

Three things have to be fixed up before pandoc will take that file:

1. **The preamble.** Pandoc cannot parse the template's ``\\renewenvironment``
   for quotes, and does not need to: it is asked to read a body, so it is given
   a minimal preamble with no-op stubs for the four spacing commands that
   ``plugins/export.mjs`` emits.
2. **``\\include``.** The book is one master file plus fourteen chapter files.
   They are concatenated here rather than left to pandoc's include handling,
   which resolves paths relative to the working directory.
3. **Figures.** LaTeX takes PDF images; Word cannot display them. Every
   referenced PDF is rasterized to PNG and the reference rewritten.

Usage::

    python3 scripts/tex-to-docx.py [--tex-dir DIR] [--output FILE] [--dpi N]

Run it after ``MYST_PRINT=... myst build --tex``, or let
``scripts/build-exports.sh`` drive it.
"""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

# Stand-ins for the spacing commands plugins/export.mjs brackets each exercise
# and solution with. They carry no content, so pandoc can ignore them entirely --
# but it must know their names, or it stops at the first one.
STUB_COMMANDS = (
    "mystexercisestart",
    "mystexerciseend",
    "mystsolutionstart",
    "mystsolutionend",
)

PREAMBLE = "\n".join(
    [
        r"\documentclass{book}",
        r"\usepackage{amsmath}",
        r"\usepackage{amssymb}",
        r"\usepackage{graphicx}",
        r"\usepackage{hyperref}",
        *[rf"\newcommand{{\{name}}}{{}}" for name in STUB_COMMANDS],
        r"\begin{document}",
        "",
    ]
)


def flatten(master: Path) -> str:
    """Return the document body of *master* with every ``\\include`` resolved."""
    source = master.read_text(encoding="utf-8")
    start = source.index(r"\begin{document}") + len(r"\begin{document}")
    body = source[start : source.rindex(r"\end{document}")]

    def substitute(match: re.Match[str]) -> str:
        included = master.parent / f"{match.group(1)}.tex"
        return included.read_text(encoding="utf-8")

    return re.sub(r"\\include\{([^}]+)\}", substitute, body)


def rasterize(body: str, tex_dir: Path, out_dir: Path, dpi: int) -> str:
    """Convert every PDF figure the body references to PNG, and repoint it.

    Word has no PDF image support: a ``\\includegraphics{...pdf}`` left alone
    lands as an empty frame. The PDFs are themselves conversions of the
    committed SVGs, so going one step further to PNG costs only resolution,
    which *dpi* sets.
    """
    referenced = sorted(set(re.findall(r"\{(files/[^}]+\.pdf)\}", body)))
    if not referenced:
        return body

    # poppler's pdftoppm before ImageMagick: Ubuntu ships an ImageMagick policy
    # that refuses to read PDF at all (it delegates to Ghostscript), so the
    # ImageMagick path works on a developer's machine and silently produces a
    # figureless Word file on a CI runner. pdftoppm has no such policy, renders
    # onto white, and is faster.
    if shutil.which("pdftoppm"):
        command = lambda src, dst: [
            "pdftoppm", "-png", "-singlefile", "-r", str(dpi), str(src), str(dst.with_suffix("")),
        ]
    elif shutil.which("magick") or shutil.which("convert"):
        magick = shutil.which("magick") or shutil.which("convert")
        command = lambda src, dst: [
            magick, "-density", str(dpi), str(src),
            # PDF figures have a transparent background; Word renders that as
            # black unless it is flattened to white first.
            "-background", "white", "-alpha", "remove", "-alpha", "off", str(dst),
        ]
    else:
        raise RuntimeError(
            "PDF figures require pdftoppm (poppler-utils) or ImageMagick."
        )

    (out_dir / "files").mkdir(parents=True, exist_ok=True)
    print(f"  rasterizing {len(referenced)} figures at {dpi} dpi")
    for relative in referenced:
        target = out_dir / relative.replace(".pdf", ".png")
        # Always regenerate: both source contents and requested DPI may change
        # between exports, even when the output filename stays the same.
        target.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(command(tex_dir / relative, target), check=True, capture_output=True)
    for relative in referenced:
        body = body.replace("{" + relative + "}", "{" + relative[:-4] + ".png}")
    return body


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--tex-dir",
        type=Path,
        default=Path("exports/quantum-mechanics_pdf_tex"),
        help="directory holding the MyST LaTeX export (default: %(default)s)",
    )
    parser.add_argument(
        "--master",
        default="quantum-mechanics.tex",
        help="master .tex file inside --tex-dir (default: %(default)s)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("exports/quantum-mechanics.docx"),
        help="Word file to write (default: %(default)s)",
    )
    parser.add_argument(
        "--dpi",
        type=int,
        default=200,
        help="resolution for rasterized figures (default: %(default)s)",
    )
    args = parser.parse_args()
    if args.dpi <= 0:
        parser.error("--dpi must be positive")

    master = args.tex_dir / args.master
    if not master.exists():
        print(f"{master} not found -- run `myst build --tex` first.", file=sys.stderr)
        return 1
    if not shutil.which("pandoc"):
        print("pandoc is not installed; see README.md.", file=sys.stderr)
        return 1

    work = args.tex_dir / "_docx"
    work.mkdir(parents=True, exist_ok=True)

    print(f"Assembling {master} for pandoc")
    body = rasterize(flatten(master), args.tex_dir, work, args.dpi)
    flat = work / "flat.tex"
    flat.write_text(PREAMBLE + body + "\n\\end{document}\n", encoding="utf-8")

    args.output.parent.mkdir(parents=True, exist_ok=True)
    print(f"Converting to {args.output}")
    result = subprocess.run(
        [
            "pandoc",
            "--from=latex",
            "--to=docx",
            "--fail-if-warnings",
            "--toc",
            "--toc-depth=2",
            # Numbered headings, so the Word file's 4.1, 4.2 ... match the PDF's
            # and the website's, which the prose refers to by number.
            "--number-sections",
            # Rasterized figures live in the work directory; the screenshots
            # and photographs, which need no conversion, are still in the export
            # directory. Pandoc silently drops an image it cannot find, so it
            # has to be told about both.
            "--resource-path", f"{work.resolve()}:{args.tex_dir.resolve()}",
            str(flat.name),
            "-o", str(args.output.resolve()),
        ],
        cwd=work,
    )
    if result.returncode:
        return result.returncode

    print(f"Wrote {args.output} ({args.output.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
