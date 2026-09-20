#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
cp -a scripts images "$work/"
original="$PWD/images"
cd "$work"
export MPLCONFIGDIR="$work/.matplotlib"

python3 - <<'PY'
import matplotlib
if matplotlib.__version__ != "3.11.1":
    raise SystemExit(
        f"Matplotlib 3.11.1 is required for deterministic SVGs; found {matplotlib.__version__}. "
        "Install requirements-figures.txt first."
    )
PY

python3 scripts/generate_figures.py
python3 scripts/generate_figures_05_12.py

if ! diff -qr "$original" images; then
  echo "Generated figures are stale. Regenerate them and commit the updated images." >&2
  exit 1
fi
echo "Generated figures match their committed outputs."
