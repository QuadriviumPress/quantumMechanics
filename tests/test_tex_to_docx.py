import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("converter", Path(__file__).resolve().parents[1] / "scripts/tex-to-docx.py")
converter = importlib.util.module_from_spec(spec)
spec.loader.exec_module(converter)


class ConverterTests(unittest.TestCase):
    def test_missing_include_fails(self):
        with tempfile.TemporaryDirectory() as directory:
            master = Path(directory) / "book.tex"
            master.write_text(r"\begin{document}\include{missing}\end{document}")
            with self.assertRaises(FileNotFoundError):
                converter.flatten(master)

    def test_missing_converter_fails_only_when_needed(self):
        with patch.object(converter.shutil, "which", return_value=None):
            self.assertEqual(converter.rasterize("text", Path("."), Path("."), 200), "text")
            with self.assertRaisesRegex(RuntimeError, "PDF figures require"):
                converter.rasterize(r"\includegraphics{files/plot.pdf}", Path("."), Path("."), 200)

    def test_existing_raster_is_regenerated_and_links_are_preserved(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "files").mkdir()
            (root / "files/plot.png").write_bytes(b"old raster")
            body = r"\includegraphics{files/plot.pdf}\href{https://example.test/book.pdf}{Book}"
            with patch.object(converter.shutil, "which", return_value="/usr/bin/pdftoppm"), patch.object(converter.subprocess, "run") as run:
                result = converter.rasterize(body, root, root, 300)
                run.assert_called_once()
                self.assertIn("300", run.call_args.args[0])
            self.assertIn("{files/plot.png}", result)
            self.assertIn("{https://example.test/book.pdf}", result)
