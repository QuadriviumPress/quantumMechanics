#!/usr/bin/env python3
"""Build a small real PDF/Word fixture and inspect the delivered content."""
from pathlib import Path
import os
import shutil
import subprocess
import tempfile
import zipfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]


def main():
    for tool in ("xelatex", "latexmk", "pandoc", "pdftoppm", "pdftotext"):
        if not shutil.which(tool):
            raise SystemExit(f"Export smoke test requires {tool}; see README.md's print toolchain.")
    with tempfile.TemporaryDirectory(prefix="quantum-mechanics-export-") as directory:
        work = Path(directory)
        shutil.copytree(ROOT / "templates", work / "templates")
        shutil.copytree(ROOT / "plugins", work / "plugins")
        shutil.copy(ROOT / "tests/fixtures/exports/chapter.md", work / "chapter.md")
        (work / "images").mkdir()
        shutil.copy(ROOT / "images/simulation-placeholder.png", work / "images")
        (work / "plot.tex").write_text(
            r"\documentclass{article}\pagestyle{empty}\begin{document}\rule{4cm}{2pt}\end{document}"
        )
        subprocess.run(["xelatex", "-interaction=nonstopmode", "-halt-on-error", "plot.tex"], cwd=work, check=True, stdout=subprocess.DEVNULL)
        (work / "myst.yml").write_text("""version: 1
project:
  title: Export regression fixture
  authors:
    - name: Quantum Mechanics
  plugins:
    - plugins/simulation.mjs
    - plugins/export.mjs
  exports:
    - id: book
      format: pdf+tex
      template: ./templates/book
      output: exports/smoke.pdf
      articles:
        - file: chapter.md
          level: 0
  toc:
    - file: chapter.md
""")
        for edition in ("student", "full"):
            env = {**os.environ, "MYST_PRINT": edition, "MYST_SITE_URL": ""}
            subprocess.run([str(ROOT / "node_modules/.bin/myst"), "build", "--tex"], cwd=work, env=env, check=True)
            text = subprocess.check_output(["pdftotext", str(work / "exports/smoke.pdf"), "-"], text=True)
            assert "ExerciseSentinel" in text, "PDF lost the exercise"
            assert ("SolutionSentinel" in text) == (edition == "full"), f"Wrong solution visibility in {edition} PDF"
            assert "Simulation fallback caption" in text, "PDF lost simulation caption"
        masters = list((work / "exports").glob("**/smoke.tex"))
        assert len(masters) == 1, f"Expected one master TeX file, found {masters}"
        output = work / "smoke.docx"
        subprocess.run(["python3", str(ROOT / "scripts/tex-to-docx.py"), "--tex-dir", str(masters[0].parent), "--master", "smoke.tex", "--output", str(output)], check=True)
        with zipfile.ZipFile(output) as archive:
            document = ET.fromstring(archive.read("word/document.xml"))
            ns = {"m": "http://schemas.openxmlformats.org/officeDocument/2006/math", "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
            assert len(document.findall(".//m:oMath", ns)) >= 2, "Word lost native equations"
            assert document.find(".//m:f", ns) is not None, "Word fraction is not native OMML"
            assert len(document.findall(".//w:drawing", ns)) >= 3, "Word lost figures"
            text = "".join(document.itertext())
            assert "ExerciseSentinel" in text and "SolutionSentinel" in text, "Word lost exercise or solution"
            assert len([name for name in archive.namelist() if name.startswith("word/media/")]) >= 2, "Word images were not embedded"
        print("Export smoke test passed: student/full PDFs and Word equations, figures, and solutions.")


if __name__ == "__main__":
    main()
