#!/usr/bin/env bash
# Fetch print editions produced by exports.yml (or the latest release fallback)
# so myst.yml `downloads:` entries resolve when the HTML site is built.
set -euo pipefail

# `gh` requires GH_TOKEN; Actions exposes GITHUB_TOKEN by default.
export GH_TOKEN="${GH_TOKEN:-${GITHUB_TOKEN:-}}"

mkdir -p exports

run_id=$(gh run list \
  --repo "$GITHUB_REPOSITORY" \
  --workflow exports.yml \
  --status success \
  --limit 1 \
  --json databaseId \
  --jq '.[0].databaseId // empty')

artifact_dir=$(mktemp -d)
if [ -n "$run_id" ]; then
  artifacts_ok=true
  for name in quantum-mechanics-exports quantum-mechanics-docx; do
    gh run download "$run_id" \
      --repo "$GITHUB_REPOSITORY" \
      --name "$name" \
      --dir "$artifact_dir" \
      || artifacts_ok=false
  done
  if [ "$artifacts_ok" = true ] \
    && [ -f "$artifact_dir/quantum-mechanics.pdf" ] \
    && [ -f "$artifact_dir/quantum-mechanics-student.pdf" ] \
    && [ -f "$artifact_dir/quantum-mechanics.docx" ]; then
    mv "$artifact_dir"/* exports/
    rm -rf "$artifact_dir"
    echo "Fetched exports from latest Exports workflow run $run_id"
    exit 0
  fi
fi
rm -rf "$artifact_dir"

release_dir=$(mktemp -d)
if gh release download --repo "$GITHUB_REPOSITORY" \
  --pattern 'quantum-mechanics.pdf' \
  --pattern 'quantum-mechanics-student.pdf' \
  --pattern 'quantum-mechanics.docx' \
  --dir "$release_dir" \
  && [ -f "$release_dir/quantum-mechanics.pdf" ] \
  && [ -f "$release_dir/quantum-mechanics-student.pdf" ] \
  && [ -f "$release_dir/quantum-mechanics.docx" ]; then
  gh release download --repo "$GITHUB_REPOSITORY" \
    --pattern 'metadata.json' --dir "$release_dir" || true
  mv "$release_dir"/* exports/
  rm -rf "$release_dir"
  echo "Fetched exports from latest GitHub release"
  exit 0
fi
rm -rf "$release_dir"

echo "::warning::No complete export set was found. Run the Exports workflow once to populate the site's PDF and Word downloads."
