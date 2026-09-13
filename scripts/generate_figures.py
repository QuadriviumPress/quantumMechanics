#!/usr/bin/env python3
"""Generate the pedagogical SVG figures used in Chapters 1--4.

The drawings intentionally use only Matplotlib and NumPy.  Keeping every
figure in one script makes line weights, colors, typography, and export
settings consistent across the book.
"""

from __future__ import annotations

from pathlib import Path
import os

os.environ.setdefault("MPLCONFIGDIR", "/tmp/quantum-mechanics-mpl")

import matplotlib as mpl
import matplotlib.pyplot as plt
from matplotlib.patches import Arc, Circle, FancyArrowPatch, FancyBboxPatch, Polygon, Rectangle
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "images" / "figures"

INK = "#172033"
MUTED = "#637083"
PURPLE = "#5b4bb7"
PURPLE_LIGHT = "#ded9f5"
TEAL = "#168a8a"
TEAL_LIGHT = "#d5eeee"
CORAL = "#d85c54"
CORAL_LIGHT = "#f7dedb"
GOLD = "#d69b2d"
GOLD_LIGHT = "#f8eccf"
PAPER = "#fbfaf7"
PANEL = "#ffffff"
GRID = "#d8dde5"

mpl.rcParams.update(
    {
        "font.family": "DejaVu Sans",
        "font.size": 11,
        "text.color": INK,
        "axes.labelcolor": INK,
        "axes.edgecolor": INK,
        "xtick.color": INK,
        "ytick.color": INK,
        "axes.titleweight": "bold",
        "axes.titlesize": 13,
        "figure.facecolor": PAPER,
        "axes.facecolor": PAPER,
        "savefig.facecolor": PAPER,
        "svg.fonttype": "none",
        "svg.hashsalt": "quadrivium-quantum-mechanics",
        "lines.solid_capstyle": "round",
        "lines.solid_joinstyle": "round",
    }
)


def new_figure(width: float = 10.5, height: float = 4.8):
    return plt.figure(figsize=(width, height), layout="constrained")


def finish(fig, filename: str):
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / filename
    fig.savefig(
        path,
        format="svg",
        bbox_inches="tight",
        pad_inches=0.08,
        metadata={"Date": None, "Creator": "QuadriviumPress figure generator"},
    )
    plt.close(fig)
    print(path.relative_to(ROOT))


def clean(ax, xlim=(0, 10), ylim=(0, 6)):
    ax.set_xlim(*xlim)
    ax.set_ylim(*ylim)
    ax.set_aspect("equal")
    ax.axis("off")


def rounded(ax, xy, width, height, text="", fc=PANEL, ec=GRID, lw=1.4, fontsize=10, radius=0.12):
    box = FancyBboxPatch(
        xy,
        width,
        height,
        boxstyle=f"round,pad=0.04,rounding_size={radius}",
        facecolor=fc,
        edgecolor=ec,
        linewidth=lw,
    )
    ax.add_patch(box)
    if text:
        ax.text(xy[0] + width / 2, xy[1] + height / 2, text.replace(r"\n", "\n"), ha="center", va="center", fontsize=fontsize)
    return box


def arrow(ax, start, end, color=INK, lw=1.8, style="-|>", mutation=12, connectionstyle="arc3"):
    patch = FancyArrowPatch(
        start,
        end,
        arrowstyle=style,
        mutation_scale=mutation,
        linewidth=lw,
        color=color,
        connectionstyle=connectionstyle,
        shrinkA=0,
        shrinkB=0,
    )
    ax.add_patch(patch)
    return patch


def panel_label(ax, label: str, title: str):
    ax.text(0.01, 0.98, label, transform=ax.transAxes, ha="left", va="top", color=PURPLE, weight="bold")
    ax.text(0.08, 0.98, title, transform=ax.transAxes, ha="left", va="top", weight="bold")


def analyzer(ax, center, axis="z", scale=1.0):
    x, y = center
    w, h = 1.0 * scale, 1.35 * scale
    rounded(ax, (x - w / 2, y - h / 2), w, h, fc=PURPLE_LIGHT, ec=PURPLE, lw=1.7)
    ax.text(x, y + 0.16 * scale, "SG", ha="center", va="center", color=PURPLE, weight="bold", fontsize=10 * scale)
    ax.text(x, y - 0.23 * scale, f"${axis}$", ha="center", va="center", color=PURPLE, fontsize=11 * scale)
    return w, h


def beam(ax, points, color=INK, lw=2.0, dashed=False, alpha=1.0):
    xs, ys = zip(*points)
    ax.plot(xs, ys, color=color, lw=lw, ls="--" if dashed else "-", alpha=alpha)


def draw_bloch(ax, vector=(0.65, 0.35, 0.68), label=r"$|\psi\rangle$", trail=False):
    """Draw a readable 2-D projection of a Bloch sphere."""
    clean(ax, (-1.35, 1.35), (-1.2, 1.35))
    ax.add_patch(Circle((0, 0), 1, facecolor=PANEL, edgecolor=GRID, lw=1.5))
    ax.add_patch(Arc((0, 0), 2, 0.62, theta1=0, theta2=180, color=GRID, lw=1.0, ls="--"))
    ax.add_patch(Arc((0, 0), 2, 0.62, theta1=180, theta2=360, color=GRID, lw=1.0))
    ax.plot([0, 0], [-1.08, 1.12], color=MUTED, lw=1.1)
    ax.plot([-1.05, 1.05], [0, 0], color=GRID, lw=1.0)
    ax.plot([-0.76, 0.76], [-0.30, 0.30], color=GRID, lw=1.0)
    ax.text(0.04, 1.13, r"$+z$", ha="left", va="bottom", color=MUTED)
    ax.text(0.04, -1.1, r"$-z$", ha="left", va="top", color=MUTED)
    ax.text(1.08, 0, r"$+x$", ha="left", va="center", color=MUTED)
    ax.text(-0.8, -0.34, r"$+y$", ha="right", va="top", color=MUTED)
    x, y, z = vector
    px = x - 0.32 * y
    py = z + 0.13 * y
    if trail:
        phi = np.linspace(0, 2 * np.pi, 250)
        ax.plot(np.cos(phi), 0.15 * np.sin(phi), color=TEAL, lw=2.0, alpha=0.8)
        arrow(ax, (0.6, 0.12), (0.2, 0.16), color=TEAL, connectionstyle="arc3,rad=0.28")
    arrow(ax, (0, 0), (px, py), color=PURPLE, lw=2.8, mutation=15)
    ax.text(px + 0.06, py + 0.06, label, color=PURPLE, weight="bold")


def fig_sg_apparatus():
    fig = new_figure(11, 5.2)
    ax = fig.add_subplot(111)
    clean(ax, (0, 14), (0, 6.2))
    # Oven and collimator
    rounded(ax, (0.25, 2.25), 1.25, 1.65, "Ag\noven", fc=GOLD_LIGHT, ec=GOLD, lw=1.7)
    for x in (2.1, 2.45):
        ax.add_patch(Rectangle((x, 1.9), 0.12, 2.35, facecolor=MUTED, edgecolor="none"))
        ax.add_patch(Rectangle((x, 2.94), 0.12, 0.28, facecolor=PAPER, edgecolor="none"))
    beam(ax, [(1.5, 3.07), (4.0, 3.07)], color=GOLD, lw=2.2)
    ax.text(2.28, 4.48, "collimating slits", ha="center", color=MUTED)
    # Magnet
    ax.add_patch(Polygon([[4.0, 4.45], [6.25, 4.45], [5.7, 3.55], [4.25, 3.55]], closed=True, fc=PURPLE_LIGHT, ec=PURPLE, lw=1.6))
    ax.add_patch(Polygon([[4.0, 1.7], [6.25, 1.7], [5.7, 2.6], [4.25, 2.6]], closed=True, fc=PURPLE_LIGHT, ec=PURPLE, lw=1.6))
    ax.text(5.12, 4.02, "N", ha="center", va="center", color=PURPLE, weight="bold")
    ax.text(5.12, 2.12, "S", ha="center", va="center", color=PURPLE, weight="bold")
    arrow(ax, (5.12, 3.50), (5.12, 2.66), color=PURPLE, lw=2.0)
    ax.text(5.36, 3.08, r"$\nabla B_z$", va="center", color=PURPLE)
    ax.text(5.12, 5.0, "field-gradient magnet", ha="center", weight="bold")
    # Split beams and detector
    beam(ax, [(5.72, 3.12), (8.35, 4.12)], color=TEAL, lw=2.3)
    beam(ax, [(5.72, 3.02), (8.35, 2.02)], color=CORAL, lw=2.3)
    ax.add_patch(Rectangle((8.35, 1.1), 0.18, 4.0, fc=INK, ec=INK))
    ax.scatter([8.47, 8.47], [4.12, 2.02], s=135, color=[TEAL, CORAL], edgecolors=PANEL, linewidths=1.5, zorder=5)
    ax.text(8.08, 4.42, r"$z+$", color=TEAL, ha="right", weight="bold")
    ax.text(8.08, 1.72, r"$z-$", color=CORAL, ha="right", weight="bold")
    ax.text(8.45, 5.28, "detector", ha="center", weight="bold")
    # Prediction inset
    rounded(ax, (9.25, 0.55), 4.35, 5.05, fc=PANEL, ec=GRID)
    ax.text(11.42, 5.25, "screen pattern", ha="center", va="center", weight="bold")
    ax.text(10.35, 4.70, "classical", ha="center", color=MUTED, weight="bold")
    ax.text(12.55, 4.70, "observed", ha="center", color=PURPLE, weight="bold")
    # classical smear
    yy = np.linspace(1.45, 4.2, 100)
    density = 0.26 + 0.48 * (1 - ((yy - 2.82) / 1.38) ** 2)
    ax.fill_betweenx(yy, 10.35 - density / 2, 10.35 + density / 2, color=MUTED, alpha=0.26)
    ax.plot([9.88, 10.82], [1.25, 1.25], color=MUTED, lw=1)
    ax.text(10.35, 0.88, "continuous smear", ha="center", color=MUTED, fontsize=9)
    # observed dots
    rng = np.random.default_rng(7)
    for yc, color in ((3.75, TEAL), (1.9, CORAL)):
        ax.scatter(12.55 + rng.normal(0, 0.12, 42), yc + rng.normal(0, 0.13, 42), s=10, color=color, alpha=0.72)
    ax.text(12.55, 0.88, "two discrete spots", ha="center", color=PURPLE, fontsize=9)
    finish(fig, "ch01-stern-gerlach-apparatus.svg")


def fig_analyzer_chains():
    fig, axes = plt.subplots(2, 1, figsize=(10.5, 5.4), layout="constrained")
    for ax in axes:
        clean(ax, (0, 12), (0, 3.2))
    ax = axes[0]
    panel_label(ax, "A", "Repeat the same question")
    rounded(ax, (0.35, 1.0), 1.5, 1.05, r"prepare\n$z+$", fc=TEAL_LIGHT, ec=TEAL)
    analyzer(ax, (3.25, 1.52), "z", 0.8)
    analyzer(ax, (6.3, 1.52), "z", 0.8)
    beam(ax, [(1.85, 1.52), (2.85, 1.52)], color=TEAL)
    beam(ax, [(3.65, 1.52), (5.9, 1.52)], color=TEAL)
    beam(ax, [(6.7, 1.52), (9.0, 1.52)], color=TEAL)
    rounded(ax, (9.0, 1.0), 2.3, 1.05, r"$z+$ with certainty\n$P=1$", fc=TEAL_LIGHT, ec=TEAL)
    ax.plot([3.65, 4.5], [1.2, 0.55], color=CORAL, lw=1.5, ls="--")
    ax.text(4.58, 0.5, r"$z-$: $P=0$", color=CORAL, va="center")
    ax = axes[1]
    panel_label(ax, "B", "Ask an incompatible question in between")
    rounded(ax, (0.35, 1.0), 1.5, 1.05, r"prepare\n$z+$", fc=TEAL_LIGHT, ec=TEAL)
    analyzer(ax, (3.25, 1.52), "x", 0.8)
    analyzer(ax, (6.3, 1.52), "z", 0.8)
    beam(ax, [(1.85, 1.52), (2.85, 1.52)], color=TEAL)
    beam(ax, [(3.65, 1.52), (5.9, 1.52)], color=PURPLE)
    ax.text(4.75, 1.78, r"select $x+$", ha="center", color=PURPLE, weight="bold")
    beam(ax, [(6.7, 1.52), (8.25, 2.18)], color=TEAL)
    beam(ax, [(6.7, 1.52), (8.25, 0.86)], color=CORAL)
    rounded(ax, (8.25, 1.76), 2.25, 0.75, r"$z+$: $P=1/2$", fc=TEAL_LIGHT, ec=TEAL)
    rounded(ax, (8.25, 0.48), 2.25, 0.75, r"$z-$: $P=1/2$", fc=CORAL_LIGHT, ec=CORAL)
    ax.text(11.0, 1.52, "certainty\nis lost", ha="center", va="center", color=MUTED, fontsize=10)
    finish(fig, "ch01-analyzer-chains.svg")


def fig_angle_rule():
    fig, axes = plt.subplots(1, 2, figsize=(10.5, 4.2), gridspec_kw={"width_ratios": [1.0, 1.8]}, layout="constrained")
    ax = axes[0]
    clean(ax, (-1.2, 1.3), (-1.15, 1.2))
    ax.plot([0, 0], [-0.95, 1.0], color=GRID, lw=1.2)
    arrow(ax, (0, 0), (0, 0.92), color=TEAL, lw=2.8, mutation=15)
    alpha = np.deg2rad(60)
    arrow(ax, (0, 0), (0.92 * np.sin(alpha), 0.92 * np.cos(alpha)), color=PURPLE, lw=2.8, mutation=15)
    ax.add_patch(Arc((0, 0), 0.85, 0.85, theta1=30, theta2=90, color=GOLD, lw=2.0))
    ax.text(0.28, 0.47, r"$\alpha$", color=GOLD, weight="bold")
    ax.text(-0.08, 1.04, r"preparation $\mathbf{a}$", ha="center", color=TEAL, weight="bold")
    ax.text(0.92, 0.50, r"analyzer $\mathbf{b}$", ha="left", color=PURPLE, weight="bold")
    ax.text(0, -0.95, "only the angle between axes matters", ha="center", color=MUTED, fontsize=9)
    ax = axes[1]
    degrees = np.linspace(0, 180, 361)
    radians = np.deg2rad(degrees)
    ax.plot(degrees, np.cos(radians / 2) ** 2, color=TEAL, lw=3, label=r"$P(+\mathbf{b}\mid+\mathbf{a})$")
    ax.plot(degrees, np.sin(radians / 2) ** 2, color=CORAL, lw=3, label=r"$P(-\mathbf{b}\mid+\mathbf{a})$")
    for x in (0, 90, 180):
        ax.axvline(x, color=GRID, lw=1, zorder=0)
    ax.scatter([0, 90, 180], [1, 0.5, 0], color=TEAL, s=40, zorder=5)
    ax.scatter([0, 90, 180], [0, 0.5, 1], color=CORAL, s=40, zorder=5)
    ax.set(xlim=(0, 180), ylim=(-0.03, 1.03), xlabel=r"angle $\alpha$ between analyzer axes", ylabel="probability")
    ax.set_xticks([0, 45, 90, 135, 180], [r"$0^\circ$", r"$45^\circ$", r"$90^\circ$", r"$135^\circ$", r"$180^\circ$"])
    ax.set_yticks([0, 0.5, 1])
    ax.grid(axis="y", color=GRID, lw=0.8)
    ax.spines[["top", "right"]].set_visible(False)
    ax.legend(frameon=False, loc="center left")
    finish(fig, "ch01-half-angle-rule.svg")


def fig_coherent_paths():
    fig, axes = plt.subplots(2, 1, figsize=(10.5, 5.4), layout="constrained")
    for ax in axes:
        clean(ax, (0, 12), (0, 3.0))
    for ax, coherent in zip(axes, (True, False)):
        title = "Paths remain indistinguishable" if coherent else "A path record makes alternatives distinguishable"
        panel_label(ax, "A" if coherent else "B", title)
        rounded(ax, (0.3, 0.95), 1.5, 0.95, r"prepare $z+$", fc=TEAL_LIGHT, ec=TEAL)
        rounded(ax, (2.55, 0.95), 1.15, 0.95, "split", fc=PURPLE_LIGHT, ec=PURPLE)
        beam(ax, [(1.8, 1.43), (2.55, 1.43)], color=INK)
        beam(ax, [(3.7, 1.43), (5.25, 2.25), (7.1, 1.43)], color=TEAL)
        beam(ax, [(3.7, 1.43), (5.25, 0.61), (7.1, 1.43)], color=CORAL)
        ax.text(5.2, 2.45, r"$x+$ amplitude", ha="center", color=TEAL)
        ax.text(5.2, 0.25, r"$x-$ amplitude", ha="center", color=CORAL)
        if not coherent:
            ax.add_patch(Circle((5.25, 2.25), 0.17, fc=GOLD, ec=INK, lw=1.0))
            ax.add_patch(Circle((5.25, 0.61), 0.17, fc=GOLD, ec=INK, lw=1.0))
            ax.text(6.05, 2.72, "path record", ha="center", color=GOLD, weight="bold", fontsize=9)
        rounded(ax, (7.1, 0.95), 1.35, 0.95, "recombine", fc=PURPLE_LIGHT, ec=PURPLE)
        beam(ax, [(8.45, 1.43), (9.15, 1.43)], color=INK)
        if coherent:
            rounded(ax, (9.15, 0.95), 2.35, 0.95, r"recover $z+$\n$P(z+)=1$", fc=TEAL_LIGHT, ec=TEAL)
            ax.text(6.15, 1.43, "+", color=PURPLE, weight="bold", fontsize=16, ha="center", va="center")
        else:
            rounded(ax, (9.15, 0.95), 2.35, 0.95, r"no interference\n$P(z+)=1/2$", fc=GOLD_LIGHT, ec=GOLD)
            ax.text(6.15, 1.43, "probabilities", color=MUTED, fontsize=8, ha="center", va="center")
    finish(fig, "ch01-coherent-recombination.svg")


def fig_complex_amplitude():
    fig, axes = plt.subplots(1, 2, figsize=(10.5, 4.5), layout="constrained")
    ax = axes[0]
    ax.axhline(0, color=INK, lw=1)
    ax.axvline(0, color=INK, lw=1)
    z = 1.6 + 1.15j
    arrow(ax, (0, 0), (z.real, z.imag), color=PURPLE, lw=3, mutation=16)
    ax.plot([z.real, z.real], [0, z.imag], color=GRID, ls="--")
    ax.plot([0, z.real], [z.imag, z.imag], color=GRID, ls="--")
    ax.add_patch(Arc((0, 0), 0.95, 0.95, theta1=0, theta2=np.degrees(np.angle(z)), color=GOLD, lw=2))
    ax.text(0.55, 0.14, r"phase $\phi$", color=GOLD)
    ax.text(0.84, 0.75, r"magnitude $|c|$", color=PURPLE, rotation=35, ha="center")
    ax.text(z.real + 0.08, z.imag + 0.08, r"$c=|c|e^{i\phi}$", color=PURPLE, weight="bold")
    ax.set(xlim=(-0.35, 2.3), ylim=(-0.35, 1.75), xlabel="real part", ylabel="imaginary part")
    ax.spines[["top", "right", "left", "bottom"]].set_visible(False)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_aspect("equal")
    ax.set_title("One amplitude carries two kinds of information")
    ax = axes[1]
    phases = [0.25, 2.25]
    colors = [TEAL, CORAL]
    labels = [r"$c_1$", r"$c_2$"]
    vectors = []
    for ph, color, label in zip(phases, colors, labels):
        v = np.array([np.cos(ph), np.sin(ph)])
        vectors.append(v)
        arrow(ax, (0, 0), v, color=color, lw=2.6, mutation=15)
        ax.text(*(v * 1.12), label, color=color, weight="bold", ha="center", va="center")
    total = vectors[0] + vectors[1]
    arrow(ax, (0, 0), total, color=PURPLE, lw=3.2, mutation=16)
    ax.plot([vectors[0][0], total[0]], [vectors[0][1], total[1]], color=CORAL, ls="--", alpha=0.8)
    ax.plot([vectors[1][0], total[0]], [vectors[1][1], total[1]], color=TEAL, ls="--", alpha=0.8)
    ax.text(total[0] - 0.08, total[1] + 0.14, r"$c_1+c_2$", color=PURPLE, weight="bold", ha="center")
    ax.axhline(0, color=GRID, lw=0.8)
    ax.axvline(0, color=GRID, lw=0.8)
    ax.set(xlim=(-1.2, 1.7), ylim=(-0.5, 1.7))
    ax.set_aspect("equal")
    ax.axis("off")
    ax.set_title("Interference is vector addition in the complex plane")
    finish(fig, "ch02-complex-amplitudes.svg")


def fig_born_projection():
    fig, axes = plt.subplots(1, 2, figsize=(10.5, 4.6), layout="constrained")
    ax = axes[0]
    clean(ax, (-0.5, 4.5), (-0.45, 3.3))
    arrow(ax, (0, 0), (3.4, 0), color=TEAL, lw=2.2)
    arrow(ax, (0, 0), (0, 2.65), color=CORAL, lw=2.2)
    theta = np.deg2rad(38)
    tip = (3.3 * np.cos(theta), 3.3 * np.sin(theta))
    arrow(ax, (0, 0), tip, color=PURPLE, lw=3.2, mutation=17)
    ax.plot([tip[0], tip[0]], [0, tip[1]], color=GRID, ls="--")
    ax.plot([0, tip[0]], [tip[1], tip[1]], color=GRID, ls="--")
    ax.text(3.55, 0, r"$|+z\rangle$", color=TEAL, va="center", weight="bold")
    ax.text(0, 2.82, r"$|-z\rangle$", color=CORAL, ha="center", weight="bold")
    ax.text(tip[0] + 0.12, tip[1] + 0.1, r"$|\psi\rangle$", color=PURPLE, weight="bold")
    ax.text(tip[0] / 2, -0.28, r"$c_+=\langle+z|\psi\rangle$", color=TEAL, ha="center")
    ax.text(-0.08, tip[1] / 2, r"$c_-$", color=CORAL, ha="right", va="center")
    ax.set_title("Inner products give amplitudes")
    ax = axes[1]
    probs = [np.cos(theta) ** 2, np.sin(theta) ** 2]
    bars = ax.bar([0, 1], probs, width=0.62, color=[TEAL, CORAL])
    ax.set_xticks([0, 1], [r"$z+$", r"$z-$"])
    ax.set_ylim(0, 1.05)
    ax.set_ylabel("probability")
    ax.set_yticks([0, 0.5, 1])
    ax.grid(axis="y", color=GRID, lw=0.8)
    ax.spines[["top", "right"]].set_visible(False)
    for bar, p, formula in zip(bars, probs, [r"$|c_+|^2$", r"$|c_-|^2$"]):
        ax.text(bar.get_x() + bar.get_width() / 2, p + 0.04, formula, ha="center", color=bar.get_facecolor(), weight="bold")
    ax.text(0.5, 0.91, r"$|c_+|^2+|c_-|^2=1$", transform=ax.transAxes, ha="center", color=MUTED)
    ax.set_title("The Born rule turns amplitudes into probabilities")
    finish(fig, "ch02-born-rule-projection.svg")


def fig_bloch_phase_mixture():
    fig, axes = plt.subplots(1, 3, figsize=(11, 4.1), layout="constrained")
    draw_bloch(axes[0], (0.72, 0.45, 0.52), r"$|\psi\rangle$")
    axes[0].set_title("A pure state\nis a surface point")
    draw_bloch(axes[1], (-0.55, 0.72, 0.0), r"$\phi$")
    axes[1].add_patch(Arc((0, 0), 1.05, 0.36, theta1=0, theta2=138, color=GOLD, lw=2.0))
    axes[1].set_title("Relative phase\nsets the azimuth")
    draw_bloch(axes[2], (0.28, -0.15, 0.20), r"$\mathbf{r}$")
    # Replace the arrow end emphasis with an interior cloud.
    rng = np.random.default_rng(3)
    axes[2].scatter(rng.normal(0.1, 0.16, 28), rng.normal(0.08, 0.13, 28), s=12, color=PURPLE, alpha=0.18)
    axes[2].set_title("A mixed state\nlies inside the sphere")
    fig.text(0.5, -0.015, r"overall phase moves no Bloch vector; relative phase and mixture do", ha="center", color=MUTED)
    finish(fig, "ch02-bloch-phase-and-mixture.svg")


def fig_measurement_workflow():
    fig = new_figure(10.8, 4.4)
    ax = fig.add_subplot(111)
    clean(ax, (0, 13), (0, 5))
    rounded(ax, (0.25, 1.78), 2.0, 1.25, r"incoming state\n$|\psi\rangle$", fc=PURPLE_LIGHT, ec=PURPLE)
    rounded(ax, (3.15, 1.55), 2.15, 1.7, r"observable\n$\hat A=\sum_n a_n\hat P_n$", fc=GOLD_LIGHT, ec=GOLD)
    arrow(ax, (2.25, 2.4), (3.15, 2.4), color=INK)
    # Branches
    arrow(ax, (5.3, 2.4), (6.6, 3.65), color=TEAL)
    arrow(ax, (5.3, 2.4), (6.6, 1.15), color=CORAL)
    rounded(ax, (6.6, 3.05), 2.45, 1.2, r"outcome $a_+$\n$P_+=\langle\psi|\hat P_+|\psi\rangle$", fc=TEAL_LIGHT, ec=TEAL, fontsize=9.5)
    rounded(ax, (6.6, 0.55), 2.45, 1.2, r"outcome $a_-$\n$P_-=\langle\psi|\hat P_-|\psi\rangle$", fc=CORAL_LIGHT, ec=CORAL, fontsize=9.5)
    arrow(ax, (9.05, 3.65), (10.0, 3.65), color=TEAL)
    arrow(ax, (9.05, 1.15), (10.0, 1.15), color=CORAL)
    rounded(ax, (10.0, 3.05), 2.5, 1.2, r"selected state\n$|a_+\rangle$", fc=PANEL, ec=TEAL)
    rounded(ax, (10.0, 0.55), 2.5, 1.2, r"selected state\n$|a_-\rangle$", fc=PANEL, ec=CORAL)
    ax.text(7.8, 4.62, "probability", ha="center", color=MUTED, weight="bold")
    ax.text(11.25, 4.62, "state update", ha="center", color=MUTED, weight="bold")
    finish(fig, "ch03-projective-measurement-workflow.svg")


def fig_noncommuting_order():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.5), layout="constrained")
    sequences = [
        (axes[0], "A", r"select $z+$, then select $x+$", "z", "x", r"$|+x\rangle$", TEAL),
        (axes[1], "B", r"select $x+$, then select $z+$", "x", "z", r"$|+z\rangle$", CORAL),
    ]
    for ax, lab, title, first, second, final_state, color in sequences:
        clean(ax, (0, 7), (0, 5))
        panel_label(ax, lab, title)
        rounded(ax, (0.12, 1.85), 1.25, 1.0, r"prepare\n$|+y\rangle$", fc=PURPLE_LIGHT, ec=PURPLE)
        analyzer(ax, (2.12, 2.35), first, 0.72)
        analyzer(ax, (4.02, 2.35), second, 0.72)
        beam(ax, [(1.37, 2.35), (1.76, 2.35)], color=INK)
        beam(ax, [(2.48, 2.35), (3.66, 2.35)], color=PURPLE)
        beam(ax, [(4.38, 2.35), (5.02, 2.35)], color=color)
        ax.text(3.07, 2.68, f"select ${first}+$", ha="center", color=PURPLE, fontsize=9)
        ax.text(4.68, 2.68, f"select ${second}+$", ha="center", color=color, fontsize=9)
        rounded(ax, (5.02, 1.85), 1.7, 1.0, f"final state\n{final_state}", fc=TEAL_LIGHT if color == TEAL else CORAL_LIGHT, ec=color, fontsize=10)
        ax.text(3.42, 1.05, r"route probability $=\frac{1}{4}$", ha="center", color=MUTED, fontsize=9)
    fig.text(0.5, -0.015, r"the last selected outcome prepares the final state: $\hat P_x\hat P_z\ne\hat P_z\hat P_x$", ha="center", color=PURPLE, weight="bold")
    finish(fig, "ch03-measurement-order.svg")


def fig_unread_measurement():
    fig, axes = plt.subplots(1, 3, figsize=(11, 4.2), layout="constrained")
    titles = ["Before measurement", "Outcome selected", "Outcome unread"]
    subtitles = [r"$\rho=|+x\rangle\langle+x|$", r"$z+$ or $z-$", r"$\rho'=\hat I/2$"]
    vectors = [(1, 0, 0), (0, 0, 1), (0.02, 0, 0.02)]
    for i, (ax, title, subtitle, vec) in enumerate(zip(axes, titles, subtitles, vectors)):
        draw_bloch(ax, vec, r"$+x$" if i == 0 else (r"$z+$" if i == 1 else r"$\mathbf{r}=0$"))
        if i == 1:
            arrow(ax, (0, 0), (0, -0.94), color=CORAL, lw=2.5, mutation=14)
            ax.text(0.06, -0.86, r"$z-$", color=CORAL, weight="bold")
        if i == 2:
            axes[i].scatter([0], [0], s=85, color=PURPLE, zorder=6)
        ax.set_title(title)
        ax.text(0.5, -0.08, subtitle, transform=ax.transAxes, ha="center", va="top", color=MUTED, fontsize=9)
    arrow(axes[0], (1.28, 0.0), (1.34, 0.0), color=INK)
    fig.text(0.5, -0.02, "discarding the record removes the transverse coherence, not the measurement interaction", ha="center", color=MUTED)
    finish(fig, "ch03-unread-measurement.svg")


def fig_energy_phase():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.5), layout="constrained")
    ax = axes[0]
    clean(ax, (-0.2, 5.2), (-0.3, 4.3))
    ax.hlines([1.0, 3.2], 0.4, 4.8, colors=[CORAL, TEAL], lw=3)
    ax.text(0.15, 3.2, r"$E_+$", ha="right", va="center", color=TEAL, weight="bold")
    ax.text(0.15, 1.0, r"$E_-$", ha="right", va="center", color=CORAL, weight="bold")
    arrow(ax, (4.25, 1.05), (4.25, 3.15), color=PURPLE, lw=2.2)
    ax.text(4.48, 2.1, r"$\Delta E$", color=PURPLE, va="center", weight="bold")
    for x, phase in zip((1.2, 2.55, 3.8), (0.2, 1.0, 1.8)):
        ax.add_patch(Circle((x, 3.2), 0.34, fc=PANEL, ec=TEAL, lw=1.6))
        arrow(ax, (x, 3.2), (x + 0.28 * np.cos(phase), 3.2 + 0.28 * np.sin(phase)), color=TEAL, lw=1.6, mutation=8)
        ax.add_patch(Circle((x, 1.0), 0.34, fc=PANEL, ec=CORAL, lw=1.6))
        arrow(ax, (x, 1.0), (x + 0.28 * np.cos(phase / 3), 1.0 + 0.28 * np.sin(phase / 3)), color=CORAL, lw=1.6, mutation=8)
    ax.text(2.5, 3.83, "phase advances faster", ha="center", color=TEAL)
    ax.text(2.5, 0.28, "phase advances slower", ha="center", color=CORAL)
    ax.set_title("Each energy component has its own phase clock")
    ax = axes[1]
    t = np.linspace(0, 2 * np.pi, 500)
    ax.plot(t, 0.5 * np.ones_like(t), color=TEAL, lw=2.6, label=r"$P(E_+)=P(E_-)$")
    ax.plot(t, np.cos(t / 2) ** 2, color=PURPLE, lw=3, label="probability in a mixing basis")
    ax.set(xlim=(0, 2 * np.pi), ylim=(-0.03, 1.03), xlabel=r"relative phase $\Delta E\,t/\hbar$", ylabel="probability")
    ax.set_xticks([0, np.pi, 2 * np.pi], ["0", r"$\pi$", r"$2\pi$"])
    ax.set_yticks([0, 0.5, 1])
    ax.grid(axis="y", color=GRID, lw=0.8)
    ax.spines[["top", "right"]].set_visible(False)
    ax.legend(frameon=False, loc="upper right", fontsize=9)
    ax.set_title("Fixed populations can hide evolving relative phase")
    finish(fig, "ch04-energy-phase-evolution.svg")


def fig_larmor():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.6), layout="constrained")
    draw_bloch(axes[0], (0.15, 0.98, 0), r"$|\psi(t)\rangle$", trail=True)
    axes[0].annotate(r"$\mathbf{B}=B_0\hat{\mathbf{z}}$", xy=(0, 0.82), xytext=(-1.25, 1.15), color=PURPLE, weight="bold", arrowprops={"arrowstyle": "->", "color": PURPLE})
    axes[0].set_title("The Bloch vector precesses about the field")
    ax = axes[1]
    phase = np.linspace(0, 2 * np.pi, 500)
    ax.plot(phase, np.cos(phase / 2) ** 2, color=TEAL, lw=3, label=r"$P(x+)$")
    ax.plot(phase, np.sin(phase / 2) ** 2, color=CORAL, lw=3, label=r"$P(x-)$")
    ax.plot(phase, 0.5 * np.ones_like(phase), color=PURPLE, lw=2, ls="--", label=r"$P(z\pm)$")
    ax.set(xlim=(0, 2 * np.pi), ylim=(-0.03, 1.03), xlabel=r"Larmor phase $|\omega_0|t$", ylabel="probability")
    ax.set_xticks([0, np.pi / 2, np.pi, 3 * np.pi / 2, 2 * np.pi], ["0", r"$\pi/2$", r"$\pi$", r"$3\pi/2$", r"$2\pi$"])
    ax.set_yticks([0, 0.5, 1])
    ax.grid(axis="y", color=GRID, lw=0.8)
    ax.spines[["top", "right"]].set_visible(False)
    ax.legend(frameon=False, ncol=3, loc="upper center", fontsize=9)
    ax.set_title("The analyzer basis decides whether motion is visible")
    finish(fig, "ch04-larmor-precession.svg")


def fig_pulse_order():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.3), layout="constrained")
    data = [
        (axes[0], "A", r"$R_x(\pi/2)$ then $R_y(\pi/2)$", r"$+z$", r"$-y$", TEAL),
        (axes[1], "B", r"$R_y(\pi/2)$ then $R_x(\pi/2)$", r"$+z$", r"$+x$", CORAL),
    ]
    for ax, lab, title, start, end, color in data:
        clean(ax, (0, 8), (0, 4.5))
        panel_label(ax, lab, title)
        rounded(ax, (0.25, 1.65), 1.4, 1.0, start, fc=PURPLE_LIGHT, ec=PURPLE, fontsize=13)
        rounded(ax, (2.35, 1.65), 1.55, 1.0, r"first\n$\pi/2$ pulse", fc=GOLD_LIGHT, ec=GOLD)
        rounded(ax, (4.6, 1.65), 1.55, 1.0, r"second\n$\pi/2$ pulse", fc=GOLD_LIGHT, ec=GOLD)
        rounded(ax, (6.7, 1.65), 1.0, 1.0, end, fc=TEAL_LIGHT if color == TEAL else CORAL_LIGHT, ec=color, fontsize=13)
        arrow(ax, (1.65, 2.15), (2.35, 2.15), color=INK)
        arrow(ax, (3.9, 2.15), (4.6, 2.15), color=INK)
        arrow(ax, (6.15, 2.15), (6.7, 2.15), color=color)
        ax.text(4.0, 0.8, "same pulses, different order", ha="center", color=MUTED)
    fig.text(0.5, -0.02, r"matrix products follow time from right to left, and generally $R_yR_x\ne R_xR_y$", ha="center", color=PURPLE, weight="bold")
    finish(fig, "ch04-pulse-order.svg")


def fig_ramsey():
    fig, axes = plt.subplots(2, 1, figsize=(10.8, 6.3), gridspec_kw={"height_ratios": [1, 1.2]}, layout="constrained")
    ax = axes[0]
    clean(ax, (0, 13), (0, 3.3))
    stages = [
        (0.25, 1.15, 1.55, r"prepare\n$|+z\rangle$", PURPLE_LIGHT, PURPLE),
        (2.35, 1.15, 1.65, r"$R_y(\pi/2)$\nsplit amplitudes", GOLD_LIGHT, GOLD),
        (4.55, 1.15, 3.2, r"free evolution $T$\naccumulate phase $\delta T$", TEAL_LIGHT, TEAL),
        (8.3, 1.15, 1.75, r"$R_y(-\pi/2)$\nrecombine", GOLD_LIGHT, GOLD),
        (10.6, 1.15, 1.95, r"measure $S_z$\nread out phase", CORAL_LIGHT, CORAL),
    ]
    for x, y, w, label, fc, ec in stages:
        rounded(ax, (x, y), w, 1.0, label, fc=fc, ec=ec, fontsize=9.5)
    for (x1, _, w1, *_), (x2, *_) in zip(stages[:-1], stages[1:]):
        arrow(ax, (x1 + w1, 1.65), (x2, 1.65), color=INK, mutation=11)
    ax.text(6.15, 2.65, "phase is hidden here", ha="center", color=TEAL, weight="bold")
    ax.text(11.58, 0.52, "population fringe", ha="center", color=CORAL, weight="bold")
    ax = axes[1]
    phase = np.linspace(-2 * np.pi, 2 * np.pi, 600)
    plus = np.cos(phase / 2) ** 2
    minus = 1 - plus
    ax.plot(phase, plus, color=TEAL, lw=3, label=r"$P(z+)$")
    ax.plot(phase, minus, color=CORAL, lw=2.5, label=r"$P(z-)$")
    ax.fill_between(phase, 0.5, plus, color=PURPLE_LIGHT, alpha=0.45)
    ax.set(xlim=(-2 * np.pi, 2 * np.pi), ylim=(-0.03, 1.03), xlabel=r"accumulated phase $\delta T$", ylabel="measured probability")
    ax.set_xticks([-2 * np.pi, -np.pi, 0, np.pi, 2 * np.pi], [r"$-2\pi$", r"$-\pi$", "0", r"$\pi$", r"$2\pi$"])
    ax.set_yticks([0, 0.5, 1])
    ax.grid(axis="y", color=GRID, lw=0.8)
    ax.spines[["top", "right"]].set_visible(False)
    ax.legend(frameon=False, ncol=2, loc="upper right")
    finish(fig, "ch04-ramsey-sequence.svg")


def main():
    figures = [
        fig_sg_apparatus,
        fig_analyzer_chains,
        fig_angle_rule,
        fig_coherent_paths,
        fig_complex_amplitude,
        fig_born_projection,
        fig_bloch_phase_mixture,
        fig_measurement_workflow,
        fig_noncommuting_order,
        fig_unread_measurement,
        fig_energy_phase,
        fig_larmor,
        fig_pulse_order,
        fig_ramsey,
    ]
    for make_figure in figures:
        make_figure()
    print(f"Generated {len(figures)} SVG figures in {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
