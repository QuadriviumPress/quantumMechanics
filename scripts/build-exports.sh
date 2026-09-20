#!/usr/bin/env bash
#
# Build every printable edition of *Quantum Mechanics* into exports/.
#
#   quantum-mechanics.pdf           the whole book, worked solutions included
#   quantum-mechanics-student.pdf   the whole book, exercises but no solutions
#   quantum-mechanics.docx          the complete edition as a Word document
#   ch-NN-<slug>.pdf                one standalone offprint per chapter
#
# Usage:  scripts/build-exports.sh [book|student|chapters|docx|all]
#         npm run build:exports            (all of it)
#         npm run build:pdf                (the two book PDFs only)
#
# Requires: Node 22 + npm 10, a TeX Live with XeLaTeX and latexmk, and Inkscape
# (MyST converts SVG figures to PDF with it and with nothing else). The DOCX
# additionally needs pandoc and poppler-utils; ImageMagick is an optional local
# fallback for rasterization. See README.md.
#
# Two environment variables steer plugins/export.mjs; neither is set for the
# website build, where the plugin is inert:
#
#   MYST_PRINT      full | student   which edition, and whether solutions appear
#   MYST_SITE_URL   base URL         only for the offprints, where a "see
#                                    Chapter 7" has no Chapter 7 to jump to and
#                                    should point at the website instead
set -euo pipefail

cd "$(dirname "$0")/.."

TARGET="${1:-all}"
SITE_URL="${MYST_SITE_URL:-https://quadriviumpress.github.io/quantumMechanics}"
OUT="exports"

# MyST writes the book to the single `output:` named in myst.yml, so the two
# editions are built one after the other and the file is renamed in between.
BOOK="$OUT/quantum-mechanics.pdf"

step() { printf '\n\033[1m==> %s\033[0m\n' "$1"; }

build_book() {
  step "Complete edition (worked solutions included)"
  # --tex rather than --pdf: the export is `pdf+tex`, so this still produces the
  # PDF, and it leaves behind the .tex that the DOCX is built from. Passing no
  # files would also rebuild every offprint.
  # MYST_SITE_URL is emptied, not just left alone: CI exports it for the
  # offprint step, and inheriting it here would push the book's own
  # chapter cross-references out to the web instead of jumping within the PDF.
  MYST_PRINT=full MYST_SITE_URL= npx myst build --tex
}

build_student() {
  step "Student edition (exercises without solutions)"
  MYST_PRINT=student MYST_SITE_URL= npx myst build --tex
  mv "$BOOK" "$OUT/quantum-mechanics-student.pdf"
}

build_chapters() {
  step "Chapter offprints"
  # Built separately from the book, and only with MYST_SITE_URL set: an offprint
  # holds one chapter, so its cross-chapter references have to leave the file.
  # Setting this while building the book would send the book's own internal
  # links out to the web as well.
  MYST_PRINT=full MYST_SITE_URL="$SITE_URL" npx myst build --pdf chapters/*.md
}

build_docx() {
  # Always rebuild the .tex first. Both editions write to the same directory, so
  # whichever ran last owns it -- and a Word file silently missing all
  # solutions is not a failure anyone would notice.
  build_book
  step "Word edition"
  python3 scripts/tex-to-docx.py
}

case "$TARGET" in
  book)     build_book ;;
  student)  build_student ;;
  chapters) build_chapters ;;
  docx)     build_docx ;;
  pdf)      build_student; build_book ;;
  all)
    # Student first: both editions are written to the one `output:` path in
    # myst.yml, so the complete edition has to be the last thing to claim it.
    build_student
    build_docx
    build_chapters
    node scripts/export-metadata.mjs write
    ;;
  *)
    echo "usage: $0 [book|student|chapters|docx|pdf|all]" >&2
    exit 2
    ;;
esac

step "Done"
ls -lh "$OUT"/*.pdf "$OUT"/*.docx 2>/dev/null | awk '{printf "  %-52s %s\n", $9, $5}'
