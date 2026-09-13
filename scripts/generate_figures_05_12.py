#!/usr/bin/env python3
"""Generate the pedagogical SVG figures used in Chapters 5--12."""

from __future__ import annotations

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Circle, FancyBboxPatch, Polygon, Rectangle

from generate_figures import (
    CORAL,
    CORAL_LIGHT,
    GOLD,
    GOLD_LIGHT,
    GRID,
    INK,
    MUTED,
    PANEL,
    PAPER,
    PURPLE,
    PURPLE_LIGHT,
    TEAL,
    TEAL_LIGHT,
    arrow,
    clean,
    finish as base_finish,
    new_figure,
    OUT,
    panel_label,
    rounded,
)


def finish(fig, filename: str):
    """Export through the shared style, then normalize Matplotlib whitespace."""
    base_finish(fig, filename)
    path = OUT / filename
    normalized = "\n".join(line.rstrip() for line in path.read_text().splitlines()) + "\n"
    path.write_text(normalized)


def plot_style(ax, xlabel=None, ylabel=None):
    ax.spines[["top", "right"]].set_visible(False)
    ax.grid(color=GRID, lw=0.8, alpha=0.85)
    if xlabel:
        ax.set_xlabel(xlabel)
    if ylabel:
        ax.set_ylabel(ylabel)


def circuit_gate(ax, x, y, label, color=PURPLE, width=0.7, height=0.7):
    rounded(ax, (x - width / 2, y - height / 2), width, height, label, fc=PANEL, ec=color, lw=1.7, fontsize=10)


def fig_tensor_product():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.5), layout="constrained")
    ax = axes[0]
    clean(ax, (0, 7), (0, 5))
    panel_label(ax, "A", "Two local spaces make four joint basis states")
    rounded(ax, (0.25, 1.45), 1.35, 2.0, r"system $A$\n$|0\rangle_A$\n$|1\rangle_A$", fc=TEAL_LIGHT, ec=TEAL)
    ax.text(1.95, 2.45, r"$\otimes$", fontsize=20, color=PURPLE, ha="center", va="center")
    rounded(ax, (2.3, 1.45), 1.35, 2.0, r"system $B$\n$|0\rangle_B$\n$|1\rangle_B$", fc=CORAL_LIGHT, ec=CORAL)
    arrow(ax, (3.8, 2.45), (4.45, 2.45), color=INK)
    states = [("00", 4.55, 2.75), ("01", 5.7, 2.75), ("10", 4.55, 1.6), ("11", 5.7, 1.6)]
    for label, x, y in states:
        rounded(ax, (x, y), 0.95, 0.82, rf"$|{label}\rangle$", fc=PURPLE_LIGHT, ec=PURPLE, fontsize=10)
    ax.text(5.6, 4.1, r"$2\times2=4$ dimensions", ha="center", color=MUTED, weight="bold")

    ax = axes[1]
    panel_label(ax, "B", "Factorization versus entanglement")
    product = np.outer([0.8, 0.6], [0.6, 0.8])
    bell = np.array([[1 / np.sqrt(2), 0], [0, 1 / np.sqrt(2)]])
    for data, left, title in ((product, 0.25, "product"), (bell, 3.7, "Bell state")):
        for i in range(2):
            for j in range(2):
                alpha = 0.16 + 0.82 * data[i, j]
                ax.add_patch(Rectangle((left + j, 1.25 + (1 - i)), 0.88, 0.88, fc=PURPLE, ec=PANEL, alpha=alpha))
                ax.text(left + j + 0.44, 1.69 + (1 - i), f"{data[i,j]:.2f}" if data[i, j] else "0", ha="center", va="center", color=INK)
        ax.text(left + 0.94, 3.58, title, ha="center", weight="bold", color=TEAL if title == "product" else PURPLE)
        ax.text(left - 0.08, 2.66, r"$A=0$", ha="right", va="center", fontsize=9)
        ax.text(left - 0.08, 1.66, r"$A=1$", ha="right", va="center", fontsize=9)
        ax.text(left + 0.44, 1.08, r"$B=0$", ha="center", va="top", fontsize=9)
        ax.text(left + 1.44, 1.08, r"$B=1$", ha="center", va="top", fontsize=9)
    ax.text(2.75, 2.2, r"$\ne$", ha="center", va="center", fontsize=20, color=CORAL)
    ax.text(2.75, 0.58, "the Bell coefficient array\ncannot be written as an outer product", ha="center", color=MUTED, fontsize=9)
    clean(ax, (0, 6.5), (0, 5))
    finish(fig, "ch05-tensor-product-space.svg")


def fig_bell_chsh():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.3), layout="constrained")
    ax = axes[0]
    clean(ax, (-1.2, 1.2), (-1.15, 1.2))
    ax.add_patch(Circle((0, 0), 0.92, fc=PANEL, ec=GRID, lw=1.4))
    settings = [(0, r"$\mathbf{a}$", TEAL), (90, r"$\mathbf{a}'$", TEAL), (45, r"$\mathbf{b}$", CORAL), (-45, r"$\mathbf{b}'$", CORAL)]
    for deg, label, color in settings:
        ang = np.deg2rad(deg)
        arrow(ax, (0, 0), (0.82 * np.cos(ang), 0.82 * np.sin(ang)), color=color, lw=2.4, mutation=13)
        ax.text(1.02 * np.cos(ang), 1.02 * np.sin(ang), label, ha="center", va="center", color=color, weight="bold")
    ax.text(0, -1.08, r"optimal coplanar settings differ by $45^\circ$", ha="center", color=MUTED, fontsize=9)
    ax.set_title("Analyzer geometry for maximal CHSH violation")
    ax = axes[1]
    values = [2, 2 * np.sqrt(2), 4]
    labels = ["local\nhidden variables", "quantum\nmechanics", "algebraic\nmaximum"]
    colors = [MUTED, PURPLE, GOLD]
    bars = ax.bar(range(3), values, color=colors, width=0.64)
    ax.set_ylim(0, 4.35)
    ax.set_ylabel(r"maximum $|S|$")
    ax.set_xticks(range(3), labels)
    ax.set_yticks([0, 1, 2, 2 * np.sqrt(2), 4], ["0", "1", "2", r"$2\sqrt{2}$", "4"])
    plot_style(ax)
    for bar, value in zip(bars, values):
        ax.text(bar.get_x() + bar.get_width() / 2, value + 0.1, f"{value:.3g}", ha="center", weight="bold", color=bar.get_facecolor())
    ax.set_title("Quantum correlations occupy a precise middle ground")
    finish(fig, "ch05-bell-chsh-bounds.svg")


def fig_entangling_gate():
    fig = new_figure(10.8, 4.1)
    ax = fig.add_subplot(111)
    clean(ax, (0, 13), (0, 4.6))
    for y, label in ((3.15, r"qubit $A$: $|0\rangle$"), (1.45, r"qubit $B$: $|0\rangle$")):
        ax.plot([0.5, 12.45], [y, y], color=INK, lw=1.4)
        ax.text(0.42, y, label, ha="right", va="center", color=MUTED)
    circuit_gate(ax, 3.1, 3.15, "$H$", GOLD)
    ax.add_patch(Circle((6.1, 3.15), 0.1, fc=INK, ec=INK))
    ax.plot([6.1, 6.1], [1.45, 3.15], color=INK, lw=1.6)
    ax.add_patch(Circle((6.1, 1.45), 0.34, fc=PANEL, ec=INK, lw=1.5))
    ax.plot([5.88, 6.32], [1.45, 1.45], color=INK, lw=1.4)
    ax.plot([6.1, 6.1], [1.23, 1.67], color=INK, lw=1.4)
    arrow(ax, (1.7, 3.9), (2.55, 3.35), color=GOLD, connectionstyle="arc3,rad=-0.12")
    ax.text(1.75, 4.05, "create superposition", ha="center", color=GOLD, weight="bold")
    arrow(ax, (6.1, 3.78), (6.1, 3.37), color=PURPLE)
    ax.text(6.1, 4.05, "correlate alternatives", ha="center", color=PURPLE, weight="bold")
    rounded(ax, (8.0, 0.55), 4.15, 3.5, fc=PANEL, ec=GRID)
    states = [(r"$|00\rangle$", 0.5, TEAL), (r"$|01\rangle$", 0, MUTED), (r"$|10\rangle$", 0, MUTED), (r"$|11\rangle$", 0.5, CORAL)]
    for i, (label, prob, color) in enumerate(states):
        y = 3.35 - i * 0.72
        ax.text(8.3, y, label, va="center")
        ax.add_patch(Rectangle((9.25, y - 0.16), 2.25 * prob, 0.32, fc=color, ec="none"))
        ax.text(11.7, y, f"$P={prob:g}$", ha="right", va="center", color=color)
    ax.text(10.08, 3.78, r"output $|\Phi^+\rangle$", ha="center", weight="bold", color=PURPLE)
    ax.text(4.55, 0.34, r"$|00\rangle\;\to\;( |00\rangle+|10\rangle )/\sqrt{2}\;\to\;( |00\rangle+|11\rangle )/\sqrt{2}$", ha="center", color=MUTED)
    finish(fig, "ch05-entangling-gate-circuit.svg")


def fig_continuous_born():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.2), layout="constrained")
    x = np.linspace(-4, 4, 600)
    density = np.exp(-x**2 / 1.8) / np.sqrt(1.8 * np.pi)
    ax = axes[0]
    ax.plot(x, density, color=PURPLE, lw=3)
    mask = (x >= -1.25) & (x <= 1.0)
    ax.fill_between(x[mask], density[mask], color=TEAL, alpha=0.55)
    ax.axvline(-1.25, color=TEAL, lw=1.2, ls="--")
    ax.axvline(1.0, color=TEAL, lw=1.2, ls="--")
    ax.text(-1.25, -0.025, "$a$", ha="center", va="top", color=TEAL)
    ax.text(1.0, -0.025, "$b$", ha="center", va="top", color=TEAL)
    ax.text(-0.12, 0.24, r"area $=P(a\leq x\leq b)$", ha="center", color=TEAL, weight="bold")
    ax.set(xlim=(-4, 4), ylim=(0, 0.48), xlabel="$x$", ylabel=r"density $|\psi(x)|^2$")
    ax.set_yticks([])
    plot_style(ax)
    ax.set_title("Finite probability is area under a density")
    ax = axes[1]
    widths = np.array([1.5, 0.75, 0.3, 0.12])
    probs = 1 - np.exp(-widths / 0.8)
    ax.plot(widths, probs, color=PURPLE, lw=2.6)
    ax.scatter(widths, probs, color=TEAL, s=45, zorder=4)
    ax.plot([0, 1.6], [0, 0], color=INK, lw=1)
    ax.set(xlim=(0, 1.6), ylim=(-0.03, 0.9), xlabel="detector interval width", ylabel="probability in interval")
    plot_style(ax)
    ax.annotate("an exact point\nhas zero probability", xy=(0, 0), xytext=(0.55, 0.25), color=CORAL, ha="center", arrowprops={"arrowstyle": "->", "color": CORAL})
    ax.set_title("Density at a point is not probability at a point")
    finish(fig, "ch06-continuous-born-rule.svg")


def fig_fourier_uncertainty():
    fig, axes = plt.subplots(2, 2, figsize=(10.8, 6.1), sharex="col", layout="constrained")
    x = np.linspace(-5, 5, 700)
    p = np.linspace(-5, 5, 700)
    for row, sigma in enumerate((0.65, 1.65)):
        psi2 = np.exp(-x**2 / (2 * sigma**2)) / (np.sqrt(2 * np.pi) * sigma)
        sigma_p = 1 / (2 * sigma)
        phi2 = np.exp(-p**2 / (2 * sigma_p**2)) / (np.sqrt(2 * np.pi) * sigma_p)
        axes[row, 0].plot(x, psi2, color=TEAL, lw=2.8)
        axes[row, 0].fill_between(x, psi2, color=TEAL_LIGHT)
        axes[row, 1].plot(p, phi2, color=CORAL, lw=2.8)
        axes[row, 1].fill_between(p, phi2, color=CORAL_LIGHT)
        axes[row, 0].text(0.97, 0.82, "narrow $x$" if row == 0 else "broad $x$", transform=axes[row, 0].transAxes, ha="right", color=TEAL, weight="bold")
        axes[row, 1].text(0.97, 0.82, "broad $p$" if row == 0 else "narrow $p$", transform=axes[row, 1].transAxes, ha="right", color=CORAL, weight="bold")
        for ax in axes[row]:
            ax.set_yticks([])
            plot_style(ax)
    axes[0, 0].set_title(r"position density $|\psi(x)|^2$")
    axes[0, 1].set_title(r"momentum density $|\phi(p)|^2$")
    axes[1, 0].set_xlabel("$x$")
    axes[1, 1].set_xlabel("$p$")
    fig.text(0.5, -0.01, r"Fourier partners trade width: for a minimum-uncertainty Gaussian, $\Delta x\,\Delta p=\hbar/2$", ha="center", color=PURPLE, weight="bold")
    finish(fig, "ch06-fourier-uncertainty.svg")


def fig_packet_spreading():
    fig = new_figure(10.8, 4.6)
    ax = fig.add_subplot(111)
    x = np.linspace(-4, 11, 900)
    times = [(0, 0.7, 0.0, TEAL), (1, 1.15, 3.0, PURPLE), (2, 1.85, 6.0, CORAL)]
    for i, (t, width, center, color) in enumerate(times):
        density = np.exp(-(x - center) ** 2 / (2 * width**2)) / (np.sqrt(2 * np.pi) * width)
        offset = i * 0.44
        ax.plot(x, density + offset, color=color, lw=2.8)
        ax.fill_between(x, offset, density + offset, color=color, alpha=0.14)
        ax.text(-3.8, offset + 0.12, rf"$t={t}t_0$", color=color, weight="bold")
        ax.annotate(rf"$\Delta x={width:.2g}\sigma$", xy=(center + width, offset + 0.15), xytext=(center + width + 1.2, offset + 0.28), color=color, arrowprops={"arrowstyle": "->", "color": color})
    ax.plot([-4, 11], [0, 0], color=INK, lw=1)
    arrow(ax, (-0.1, 1.55), (6.5, 1.55), color=GOLD, lw=2.4)
    ax.text(3.2, 1.66, r"center moves at $v_g=p_0/m$", ha="center", color=GOLD, weight="bold")
    ax.set(xlim=(-4, 11), ylim=(-0.03, 1.85), xlabel="$x$")
    ax.set_yticks([])
    ax.spines[["top", "right", "left"]].set_visible(False)
    ax.set_title("A free packet moves and spreads while its momentum distribution stays fixed")
    finish(fig, "ch06-free-packet-spreading.svg")


def fig_infinite_well():
    fig = new_figure(10.8, 5.4)
    ax = fig.add_subplot(111)
    x = np.linspace(0, 1, 600)
    ax.plot([0, 0, 1, 1], [9.8, 0, 0, 9.8], color=INK, lw=2.4)
    colors = [TEAL, PURPLE, CORAL]
    for n, color in zip((1, 2, 3), colors):
        energy = n**2
        wave = 0.58 * np.sin(n * np.pi * x)
        ax.hlines(energy, 0, 1, color=GRID, lw=1.2)
        ax.plot(x, energy + wave, color=color, lw=2.6)
        ax.text(1.05, energy, rf"$E_{n}\propto {n**2}$", va="center", color=color, weight="bold")
        nodes = np.arange(1, n) / n
        ax.scatter(nodes, np.full_like(nodes, energy), color=INK, s=20, zorder=5)
        ax.text(-0.06, energy, rf"$n={n}$", ha="right", va="center", color=color)
    ax.text(0.5, 10.1, r"$V=\infty$", ha="center", color=MUTED)
    ax.text(0, -0.35, "$0$", ha="center")
    ax.text(1, -0.35, "$L$", ha="center")
    ax.set(xlim=(-0.18, 1.45), ylim=(-0.65, 10.55))
    ax.axis("off")
    ax.set_title("Boundary conditions select discrete energies; state $n$ has $n-1$ interior nodes")
    finish(fig, "ch07-infinite-well-spectrum.svg")


def fig_finite_well_intersections():
    fig = new_figure(10.8, 5.2)
    ax = fig.add_subplot(111)
    z0 = 4.0
    xi = np.linspace(0.002, z0, 2400)
    circle = np.sqrt(np.maximum(z0**2 - xi**2, 0))
    ax.plot(xi, circle, color=INK, lw=2.8, label=r"energy constraint $\xi^2+\eta^2=z_0^2$")

    even = xi * np.tan(xi)
    odd = -xi / np.tan(xi)
    even_mask = (even >= 0) & (even <= z0 + 0.2)
    odd_mask = (odd >= 0) & (odd <= z0 + 0.2)
    ax.plot(xi, np.where(even_mask, even, np.nan), color=TEAL, lw=2.3,
            label=r"even: $\eta=\xi\tan\xi$")
    ax.plot(xi, np.where(odd_mask, odd, np.nan), color=PURPLE, lw=2.3,
            label=r"odd: $\eta=-\xi\cot\xi$")

    # Locate sign changes against the circle on each visible branch.
    for curve, mask, color in ((even, even_mask, TEAL), (odd, odd_mask, PURPLE)):
        difference = curve - circle
        valid_pairs = mask[:-1] & mask[1:] & np.isfinite(difference[:-1]) & np.isfinite(difference[1:])
        crossings = np.where(valid_pairs & (difference[:-1] * difference[1:] <= 0))[0]
        for index in crossings:
            x_cross = (xi[index] + xi[index + 1]) / 2
            y_cross = np.sqrt(z0**2 - x_cross**2)
            ax.scatter([x_cross], [y_cross], s=70, color=color, edgecolor="white", linewidth=1.2, zorder=5)

    for threshold, label in ((np.pi / 2, r"$\pi/2$"), (np.pi, r"$\pi$")):
        ax.axvline(threshold, color=GRID, lw=1, ls="--")
        ax.text(threshold, -0.22, label, ha="center", va="top", color=MUTED)
    ax.text(3.55, 2.25, r"$z_0=4$", color=INK, weight="bold")
    ax.set(xlim=(0, 4.15), ylim=(0, 4.25), xlabel=r"interior wave number $\xi=kL/2$", ylabel=r"decay constant $\eta=\kappa L/2$")
    plot_style(ax)
    ax.legend(frameon=False, loc="upper right", fontsize=9)
    ax.set_title("Each curve–circle intersection is one finite-well bound state")
    finish(fig, "ch07-finite-well-intersections.svg")


def fig_tunneling_barrier():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.3), layout="constrained")
    ax = axes[0]
    x = np.linspace(-3, 7, 1200)
    V = np.where((x >= 0) & (x <= 3), 1.0, 0.0)
    ax.plot(x, V, color=INK, lw=2.2)
    ax.hlines(0.58, -3, 7, color=GOLD, lw=1.4, ls="--")
    ax.text(-2.8, 0.62, "$E<V_0$", color=GOLD)
    left = x < 0
    mid = (x >= 0) & (x <= 3)
    right = x > 3
    psi = np.zeros_like(x)
    psi[left] = 0.23 * np.sin(5 * x[left]) + 0.51
    psi[mid] = 0.25 * np.exp(-0.72 * x[mid]) + 0.26
    psi[right] = 0.029 * np.sin(5 * x[right] - 1.0) + 0.26
    ax.plot(x, psi, color=PURPLE, lw=2.2)
    ax.fill_between(x[mid], 0.0, 1.0, color=PURPLE_LIGHT, alpha=0.55)
    arrow(ax, (-2.6, 0.86), (-1.2, 0.86), color=TEAL)
    arrow(ax, (4.4, 0.43), (5.8, 0.43), color=CORAL)
    ax.text(-1.9, 0.94, "incident + reflected", ha="center", color=TEAL)
    ax.text(5.1, 0.50, "transmitted", ha="center", color=CORAL)
    ax.set(xlim=(-3, 7), ylim=(-0.04, 1.18), xlabel="$x$")
    ax.set_yticks([0, 0.58, 1], ["0", "$E$", "$V_0$"])
    plot_style(ax)
    ax.set_title("The amplitude decays through a forbidden region")
    ax = axes[1]
    ka = np.linspace(0, 5, 400)
    T = np.exp(-2 * ka)
    ax.semilogy(ka, T, color=PURPLE, lw=3)
    ax.fill_between(ka, T, 1e-5, color=PURPLE_LIGHT, alpha=0.55)
    ax.set(xlim=(0, 5), ylim=(1e-5, 1.1), xlabel=r"barrier thickness $\kappa a$", ylabel="transmission $T$")
    ax.grid(color=GRID, which="both", lw=0.8)
    ax.spines[["top", "right"]].set_visible(False)
    ax.text(2.65, 2e-2, r"$T\propto e^{-2\kappa a}$", color=PURPLE, weight="bold", rotation=-29)
    ax.set_title("Transmission is exponentially sensitive to width")
    finish(fig, "ch07-tunneling-barrier.svg")


def fig_harmonic_oscillator():
    fig = new_figure(10.8, 5.6)
    ax = fig.add_subplot(111)
    x = np.linspace(-3.5, 3.5, 800)
    V = 0.42 * x**2
    ax.plot(x, V, color=INK, lw=2.4)
    gauss = np.exp(-x**2 / 2)
    waves = [gauss, np.sqrt(2) * x * gauss, (2 * x**2 - 1) * gauss / np.sqrt(2)]
    colors = [TEAL, PURPLE, CORAL]
    for n, (wave, color) in enumerate(zip(waves, colors)):
        E = n + 0.5
        wave = 0.34 * wave / np.max(np.abs(wave))
        ax.hlines(E, -np.sqrt(E / 0.42), np.sqrt(E / 0.42), color=GRID, lw=1)
        ax.plot(x, E + wave, color=color, lw=2.5)
        ax.text(3.55, E, rf"$E_{n}=({n}+1/2)\hbar\omega$", va="center", color=color)
    ax.annotate(r"equal spacing $\hbar\omega$", xy=(2.25, 1.0), xytext=(2.25, 1.95), ha="center", color=GOLD, arrowprops={"arrowstyle": "<->", "color": GOLD})
    ax.set(xlim=(-3.8, 5.15), ylim=(-0.08, 4.5), xlabel="$x$", ylabel="energy")
    ax.set_yticks([])
    ax.spines[["top", "right"]].set_visible(False)
    ax.set_title("The oscillator combines equally spaced levels with successively nodal wavefunctions")
    finish(fig, "ch07-harmonic-oscillator.svg")


def fig_box_degeneracy():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.5), layout="constrained")
    ax = axes[0]
    clean(ax, (0, 6), (0, 5))
    panel_label(ax, "A", "Cubic symmetry")
    for i, state in enumerate(((1, 1, 2), (1, 2, 1), (2, 1, 1))):
        x = 0.35 + i * 1.85
        rounded(ax, (x, 1.55), 1.5, 1.45, rf"$({state[0]},{state[1]},{state[2]})$\n$E\propto6$", fc=PURPLE_LIGHT, ec=PURPLE)
    ax.plot([0.7, 5.3], [3.62, 3.62], color=TEAL, lw=3)
    ax.text(3.0, 3.82, "one threefold-degenerate energy", ha="center", color=TEAL, weight="bold")
    ax = axes[1]
    clean(ax, (0, 6), (0, 5))
    panel_label(ax, "B", "Stretch one side: $L_z>L_x=L_y$")
    levels = [(1.75, r"$(1,1,2)$", TEAL), (2.65, r"$(1,2,1)$", CORAL), (2.65, r"$(2,1,1)$", PURPLE)]
    for i, (y, label, color) in enumerate(levels):
        x0 = 0.65 if i == 0 else 3.1 if i == 1 else 3.1
        x1 = 2.65 if i == 0 else 5.15
        if i == 2:
            continue
        ax.plot([x0, x1], [y, y], color=color, lw=3)
        ax.text((x0 + x1) / 2, y + 0.22, label if i == 0 else r"$(1,2,1),(2,1,1)$", ha="center", color=color)
    arrow(ax, (2.95, 3.75), (1.65, 2.05), color=TEAL)
    arrow(ax, (3.05, 3.75), (4.1, 2.95), color=CORAL)
    ax.text(3.0, 4.0, "broken symmetry splits the level", ha="center", weight="bold", color=MUTED)
    finish(fig, "ch08-box-degeneracy.svg")


def fig_hydrogen_structure():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.6), layout="constrained")
    ax = axes[0]
    r = np.linspace(0, 8, 600)
    point = np.exp(-2 * r)
    radial_1s = 4 * r**2 * np.exp(-2 * r)
    radial_1s /= radial_1s.max()
    radial_2p = r**4 * np.exp(-r)
    radial_2p /= radial_2p.max()
    ax.plot(r, point, color=MUTED, lw=2, ls="--", label=r"$|\psi_{1s}|^2$")
    ax.plot(r, radial_1s, color=TEAL, lw=2.8, label=r"$P_{1s}(r)$")
    ax.plot(r, radial_2p, color=PURPLE, lw=2.8, label=r"$P_{2p}(r)$")
    ax.axvline(1, color=TEAL, lw=1, ls=":")
    ax.axvline(4, color=PURPLE, lw=1, ls=":")
    ax.text(1, 1.04, r"$a_0$", ha="center", color=TEAL)
    ax.text(4, 1.04, r"$4a_0$", ha="center", color=PURPLE)
    ax.set(xlim=(0, 8), ylim=(0, 1.13), xlabel=r"radius $r/a_0$", ylabel="relative density")
    ax.set_yticks([])
    plot_style(ax)
    ax.legend(frameon=False)
    ax.set_title("Shell volume moves the most probable radius away from the origin")
    ax = axes[1]
    clean(ax, (-2.5, 2.5), (-2.25, 2.25))
    th = np.linspace(0, 2 * np.pi, 400)
    for sign, color in ((1, TEAL), (-1, CORAL)):
        cx = sign * 0.82
        ax.fill(cx + sign * 0.85 * np.cos(th) ** 3, 0.95 * np.sin(th), color=color, alpha=0.55, ec=color)
    ax.plot([0, 0], [-1.6, 1.6], color=GRID, lw=1)
    ax.plot([-2.0, 2.0], [0, 0], color=GRID, lw=1)
    ax.scatter([0], [0], color=GOLD, s=75, zorder=5)
    ax.text(0, -1.9, "angular node", ha="center", color=MUTED)
    ax.text(0, 1.92, r"a real $2p$ orbital: probability lobes, not a trajectory", ha="center", weight="bold")
    ax.set_title("Angular structure supplies shape and nodes")
    finish(fig, "ch08-hydrogen-radial-and-orbital.svg")


def fig_hydrogen_transitions():
    fig = new_figure(10.8, 5.0)
    ax = fig.add_subplot(111)
    clean(ax, (0, 12), (0, 6.2))
    cols = {"s": 1.4, "p": 5.0, "d": 8.6}
    levels = [(1, "s", 0.8), (2, "s", 2.6), (2, "p", 2.6), (3, "s", 3.65), (3, "p", 3.65), (3, "d", 3.65), (4, "p", 4.35), (4, "d", 4.35)]
    for n, l, y in levels:
        x = cols[l]
        ax.plot([x - 0.75, x + 0.75], [y, y], color=INK, lw=2.2)
        ax.text(x, y + 0.14, f"${n}{l}$", ha="center", fontsize=9)
    for l, x in cols.items():
        ax.text(x, 5.3, rf"$\ell={['s','p','d'].index(l)}$  ({l})", ha="center", color=PURPLE, weight="bold")
    # Allowed dipole arrows change l by one.
    arrow(ax, (4.75, 4.25), (2.0, 2.68), color=TEAL, lw=2.2)
    arrow(ax, (8.35, 3.57), (5.6, 2.68), color=TEAL, lw=2.2)
    arrow(ax, (4.7, 3.55), (2.0, 0.92), color=TEAL, lw=2.2)
    # Forbidden same-parity example.
    arrow(ax, (8.15, 3.85), (2.0, 2.82), color=CORAL, lw=1.8, style="-|>")
    ax.text(5.35, 3.38, r"$3d\to2s$: $\Delta\ell=-2$", color=CORAL, ha="center")
    ax.plot([5.0, 5.55], [3.02, 3.52], color=CORAL, lw=3)
    ax.plot([5.0, 5.55], [3.52, 3.02], color=CORAL, lw=3)
    rounded(ax, (9.45, 0.72), 2.05, 2.0, r"electric dipole\nallowed:\n$\Delta\ell=\pm1$\n$\Delta m=0,\pm1$", fc=TEAL_LIGHT, ec=TEAL)
    ax.text(6, 5.82, "Energy conservation sets the photon frequency; symmetry sets the transition strength", ha="center", weight="bold")
    finish(fig, "ch08-hydrogen-selection-rules.svg")


def fig_angular_ladder():
    fig = new_figure(9.6, 5.2)
    ax = fig.add_subplot(111)
    clean(ax, (0, 10), (0, 6.2))
    ms = np.arange(-2, 3)
    ys = 0.8 + (ms + 2) * 1.05
    for m, y in zip(ms, ys):
        ax.plot([3.0, 6.8], [y, y], color=INK, lw=2)
        ax.text(2.65, y, rf"$|2,{m}\rangle$", ha="right", va="center", color=PURPLE)
        ax.text(7.05, y, rf"$J_z={m}\hbar$", va="center", color=MUTED)
    for i in range(4):
        strength = np.sqrt(2 * 3 - ms[i] * (ms[i] + 1))
        arrow(ax, (4.35, ys[i] + 0.08), (4.35, ys[i + 1] - 0.08), color=TEAL, lw=1.2 + 0.45 * strength)
        arrow(ax, (5.45, ys[i + 1] - 0.08), (5.45, ys[i] + 0.08), color=CORAL, lw=1.2 + 0.45 * strength)
    ax.text(4.35, 5.85, r"$J_+$", ha="center", color=TEAL, weight="bold")
    ax.text(5.45, 5.85, r"$J_-$", ha="center", color=CORAL, weight="bold")
    ax.text(4.9, 0.22, r"the ladder terminates at $m=\pm j$ because the next-step norm is zero", ha="center", color=MUTED)
    ax.set_title(r"A fixed $j=2$ multiplet contains $2j+1=5$ component eigenstates")
    finish(fig, "ch09-angular-momentum-ladder.svg")


def fig_angular_addition():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.5), layout="constrained")
    ax = axes[0]
    clean(ax, (-0.7, 3.8), (-0.7, 3.5))
    v1 = np.array([2.3, 0.45])
    v2 = np.array([0.65, 1.55])
    arrow(ax, (0, 0), v1, color=TEAL, lw=2.8, mutation=15)
    arrow(ax, v1, v1 + v2, color=CORAL, lw=2.8, mutation=15)
    arrow(ax, (0, 0), v1 + v2, color=PURPLE, lw=3.2, mutation=16)
    ax.text(1.2, 0.06, r"$\mathbf{J}_1$", color=TEAL, weight="bold")
    ax.text(2.95, 1.2, r"$\mathbf{J}_2$", color=CORAL, weight="bold")
    ax.text(1.5, 1.25, r"$\mathbf{J}$", color=PURPLE, weight="bold")
    ax.text(1.55, -0.5, r"$|j_1-j_2|\leq j\leq j_1+j_2$", ha="center", color=MUTED)
    ax.set_title("The triangle rule constrains possible totals")
    ax = axes[1]
    clean(ax, (0, 7), (0, 5))
    rounded(ax, (0.25, 1.65), 1.65, 1.4, r"$\ell=1$\n3 states", fc=TEAL_LIGHT, ec=TEAL)
    ax.text(2.2, 2.35, r"$\otimes$", fontsize=18, color=PURPLE, ha="center")
    rounded(ax, (2.55, 1.65), 1.65, 1.4, r"$s=1/2$\n2 states", fc=CORAL_LIGHT, ec=CORAL)
    arrow(ax, (4.35, 2.35), (4.85, 2.35), color=INK)
    rounded(ax, (4.85, 2.65), 1.75, 1.05, r"$j=3/2$\n4 states", fc=PURPLE_LIGHT, ec=PURPLE)
    rounded(ax, (4.85, 1.0), 1.75, 1.05, r"$j=1/2$\n2 states", fc=GOLD_LIGHT, ec=GOLD)
    ax.text(3.5, 0.45, r"dimension check: $3\times2=4+2$", ha="center", color=MUTED, weight="bold")
    ax.set_title("Uncoupled states reorganize into complete multiplets")
    finish(fig, "ch09-angular-momentum-addition.svg")


def fig_singlet_triplet():
    fig = new_figure(10.8, 4.9)
    ax = fig.add_subplot(111)
    clean(ax, (0, 12), (0, 5.7))
    ax.text(2.9, 5.15, r"triplet: $j=1$", ha="center", color=TEAL, weight="bold", fontsize=13)
    triplets = [
        (4.25, r"$m=+1:\ |\uparrow\uparrow\rangle$"),
        (3.05, r"$m=0:\ (|\uparrow\downarrow\rangle+|\downarrow\uparrow\rangle)/\sqrt{2}$"),
        (1.85, r"$m=-1:\ |\downarrow\downarrow\rangle$"),
    ]
    for y, text_ in triplets:
        ax.plot([0.7, 5.1], [y, y], color=TEAL, lw=2.5)
        ax.text(2.9, y + 0.18, text_, ha="center", va="bottom", fontsize=9)
    arrow(ax, (1.35, 4.1), (1.35, 3.2), color=CORAL, mutation=10)
    arrow(ax, (1.35, 2.9), (1.35, 2.0), color=CORAL, mutation=10)
    ax.text(1.7, 3.02, r"$J_-$", ha="left", va="top", color=CORAL)
    ax.text(8.75, 5.15, r"singlet: $j=0$", ha="center", color=CORAL, weight="bold", fontsize=13)
    ax.plot([6.55, 10.95], [3.05, 3.05], color=CORAL, lw=2.5)
    ax.text(8.75, 3.25, r"$m=0:\ (|\uparrow\downarrow\rangle-|\downarrow\uparrow\rangle)/\sqrt{2}$", ha="center", va="bottom", fontsize=9)
    rounded(ax, (6.5, 0.65), 4.5, 1.1, r"$|\uparrow\downarrow\rangle$ gives\n$j=1$ or $j=0$, each with $P=1/2$", fc=PURPLE_LIGHT, ec=PURPLE, fontsize=10)
    ax.text(6, 5.58, "Four product states reorganize into a three-state multiplet and a one-state multiplet", ha="center", weight="bold")
    finish(fig, "ch09-singlet-triplet.svg")


def fig_perturbation_levels():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.5), layout="constrained")
    ax = axes[0]
    clean(ax, (0, 6), (0, 5))
    for y, label in ((1.45, r"$E_-^{(0)}$"), (3.45, r"$E_+^{(0)}$")):
        ax.plot([0.45, 2.0], [y, y], color=INK, lw=2.2)
        ax.text(0.25, y, label, ha="right", va="center")
    ax.plot([4.0, 5.55], [1.05, 1.05], color=CORAL, lw=2.8)
    ax.plot([4.0, 5.55], [3.85, 3.85], color=TEAL, lw=2.8)
    arrow(ax, (2.15, 2.45), (3.75, 2.45), color=PURPLE)
    ax.text(2.95, 2.72, r"off-diagonal coupling $g$", ha="center", color=PURPLE)
    ax.text(4.75, 4.12, r"$E_+^{(0)}+g^2/\Delta$", ha="center", color=TEAL)
    ax.text(4.75, 0.72, r"$E_-^{(0)}-g^2/\Delta$", ha="center", color=CORAL)
    ax.text(3.0, 4.65, "level repulsion appears at second order", ha="center", weight="bold")
    ax.set_title("A weak coupling mixes states and pushes levels apart")
    ax = axes[1]
    g = np.linspace(0, 0.8, 400)
    exact = np.sqrt(0.25 + g**2)
    approx = 0.5 + g**2
    ax.plot(g, exact, color=PURPLE, lw=3, label="exact")
    ax.plot(g, approx, color=GOLD, lw=2.4, ls="--", label="second order")
    ax.axvspan(0, 0.3, color=TEAL_LIGHT, alpha=0.65)
    ax.text(0.15, 1.02, "controlled\nregime", transform=ax.get_xaxis_transform(), ha="center", va="bottom", color=TEAL, weight="bold")
    ax.set(xlim=(0, 0.8), ylim=(0.48, 1.02), xlabel=r"coupling $g/\Delta$", ylabel=r"upper energy $E_+/\Delta$")
    plot_style(ax)
    ax.legend(frameon=False)
    ax.set_title("An expansion must be checked against its domain")
    finish(fig, "ch10-perturbative-level-shifts.svg")


def fig_variational_balance():
    fig = new_figure(10.8, 4.7)
    ax = fig.add_subplot(111)
    b = np.linspace(0.32, 3.2, 600)
    kinetic = 1 / (4 * b**2)
    potential = b / np.sqrt(np.pi)
    total = kinetic + potential
    idx = np.argmin(total)
    ax.plot(b, kinetic, color=CORAL, lw=2.3, label=r"localization cost $\propto1/b^2$")
    ax.plot(b, potential, color=TEAL, lw=2.3, label=r"potential cost $\propto b$")
    ax.plot(b, total, color=PURPLE, lw=3.2, label=r"trial energy $E(b)$")
    ax.scatter([b[idx]], [total[idx]], color=GOLD, s=85, zorder=5)
    ax.annotate("best state in this trial family", xy=(b[idx], total[idx]), xytext=(1.75, 1.75), color=GOLD, weight="bold", arrowprops={"arrowstyle": "->", "color": GOLD})
    ax.axhline(0.8086, color=INK, lw=1.3, ls="--")
    ax.text(2.55, 0.84, r"exact $E_0$ lies below every trial value", color=MUTED, ha="center")
    ax.set(xlim=(0.3, 3.2), ylim=(0, 2.35), xlabel="trial width $b$", ylabel="energy")
    plot_style(ax)
    ax.legend(frameon=False, loc="upper right")
    ax.set_title("Variational minimization balances competing energy costs")
    finish(fig, "ch10-variational-energy.svg")


def fig_wkb_regions():
    fig = new_figure(10.8, 5.0)
    ax = fig.add_subplot(111)
    x = np.linspace(-4.5, 4.5, 1000)
    V = 0.12 * x**2 + 0.28
    E = 1.2
    xt = np.sqrt((E - 0.28) / 0.12)
    ax.plot(x, V, color=INK, lw=2.5)
    ax.axhline(E, color=GOLD, lw=2, ls="--")
    ax.axvline(-xt, color=MUTED, lw=1, ls=":")
    ax.axvline(xt, color=MUTED, lw=1, ls=":")
    ax.fill_between(x, V, E, where=V < E, color=TEAL_LIGHT, alpha=0.7)
    ax.fill_between(x, E, V, where=V > E, color=CORAL_LIGHT, alpha=0.7)
    # Schematic wave with changing wavelength in the allowed region.
    allowed = np.abs(x) <= xt
    phase = np.cumsum(np.sqrt(np.maximum(E - V, 0))) * (x[1] - x[0]) * 12
    wave = E + 0.16 * np.sin(phase) / np.maximum(E - V, 0.08) ** 0.2
    ax.plot(x[allowed], wave[allowed], color=PURPLE, lw=2)
    left = x < -xt
    right = x > xt
    ax.plot(x[left], E + 0.16 * np.exp(1.4 * (x[left] + xt)), color=CORAL, lw=2)
    ax.plot(x[right], E + 0.16 * np.exp(-1.4 * (x[right] - xt)), color=CORAL, lw=2)
    ax.text(0, 0.5, "classically allowed\noscillatory WKB", ha="center", color=TEAL, weight="bold")
    ax.text(-3.75, 1.65, "forbidden\nexponential", ha="center", color=CORAL, weight="bold")
    ax.text(3.75, 1.65, "forbidden\nexponential", ha="center", color=CORAL, weight="bold")
    for s in (-1, 1):
        ax.text(s * xt, 0.05, rf"$x_{1 if s < 0 else 2}$", ha="center", color=MUTED)
    ax.text(3.95, E + 0.07, "$E$", color=GOLD, weight="bold")
    ax.set(xlim=(-4.5, 4.5), ylim=(0, 2.9), xlabel="$x$", ylabel="$V(x)$")
    ax.set_yticks([])
    ax.spines[["top", "right"]].set_visible(False)
    ax.set_title("Turning points connect oscillatory and exponential semiclassical regions")
    finish(fig, "ch10-wkb-turning-points.svg")


def fig_exchange_interference():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.6), layout="constrained")
    q = np.linspace(-3, 3, 220)
    x1, x2 = np.meshgrid(q, q)
    a1 = np.exp(-(x1 + 0.8) ** 2 / 1.7)
    b1 = np.exp(-(x1 - 0.8) ** 2 / 1.7)
    a2 = np.exp(-(x2 + 0.8) ** 2 / 1.7)
    b2 = np.exp(-(x2 - 0.8) ** 2 / 1.7)
    plus = (a1 * b2 + b1 * a2) ** 2
    minus = (a1 * b2 - b1 * a2) ** 2
    for ax, data, title, color in ((axes[0], plus, "Bosons: exchanged amplitudes add", TEAL), (axes[1], minus, "Fermions: exchanged amplitudes subtract", CORAL)):
        ax.imshow(data, origin="lower", extent=(-3, 3, -3, 3), cmap="Purples", aspect="equal")
        ax.plot([-3, 3], [-3, 3], color=color, lw=2, ls="--")
        ax.set(xlabel=r"detector coordinate $x_1$", ylabel=r"detector coordinate $x_2$")
        ax.set_title(title)
    axes[0].text(0, 0.18, "enhanced\ncoincidence", ha="center", va="center", color=TEAL, weight="bold")
    axes[1].text(0, 0.18, "exchange hole", ha="center", va="center", color=CORAL, weight="bold")
    finish(fig, "ch11-exchange-interference.svg")


def fig_spin_space_symmetry():
    fig = new_figure(10.8, 4.6)
    ax = fig.add_subplot(111)
    clean(ax, (0, 12), (0, 5.2))
    ax.text(6, 4.72, "Two-electron total state must be antisymmetric", ha="center", weight="bold", color=PURPLE, fontsize=13)
    rounded(ax, (0.35, 2.45), 3.05, 1.35, "spin singlet\nantisymmetric", fc=CORAL_LIGHT, ec=CORAL, fontsize=11)
    rounded(ax, (0.35, 0.45), 3.05, 1.35, "spin triplet\nsymmetric", fc=TEAL_LIGHT, ec=TEAL, fontsize=11)
    ax.text(3.85, 3.12, "$\times$", fontsize=18, ha="center")
    ax.text(3.85, 1.12, "$\times$", fontsize=18, ha="center")
    rounded(ax, (4.35, 2.45), 3.05, 1.35, "space\nsymmetric", fc=TEAL_LIGHT, ec=TEAL, fontsize=11)
    rounded(ax, (4.35, 0.45), 3.05, 1.35, "space\nantisymmetric", fc=CORAL_LIGHT, ec=CORAL, fontsize=11)
    arrow(ax, (7.55, 3.12), (8.2, 3.12), color=INK)
    arrow(ax, (7.55, 1.12), (8.2, 1.12), color=INK)
    rounded(ax, (8.2, 2.45), 3.35, 1.35, "same spatial orbital\nallowed", fc=GOLD_LIGHT, ec=GOLD, fontsize=11)
    rounded(ax, (8.2, 0.45), 3.35, 1.35, "different orbitals\nrequired", fc=PANEL, ec=PURPLE, fontsize=11)
    finish(fig, "ch11-spin-space-symmetry.svg")


def fig_quantum_statistics_filling():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.8), layout="constrained")
    ax = axes[0]
    clean(ax, (0, 6), (0, 5.2))
    panel_label(ax, "A", "Bosons may share one mode")
    ax.plot([0.8, 5.2], [0.8, 0.8], color=INK, lw=2)
    for i in range(8):
        ax.add_patch(Circle((3.0 + 0.32 * ((i % 3) - 1), 1.12 + 0.46 * (i // 3)), 0.18, fc=TEAL, ec=PANEL, lw=1))
    ax.text(3.0, 3.2, "macroscopic occupation\nof a low-energy state", ha="center", color=TEAL, weight="bold")
    ax = axes[1]
    clean(ax, (0, 6), (0, 5.2))
    panel_label(ax, "B", "Fermions fill distinct states")
    for n in range(5):
        y = 0.7 + n * 0.75
        ax.plot([0.8, 5.2], [y, y], color=GRID if n < 4 else INK, lw=1.5)
        if n < 4:
            ax.add_patch(Circle((2.6, y + 0.17), 0.16, fc=PURPLE, ec=PANEL))
            ax.add_patch(Circle((3.4, y + 0.17), 0.16, fc=CORAL, ec=PANEL))
            ax.text(2.6, y + 0.17, r"$\uparrow$", ha="center", va="center", fontsize=8, color=PANEL)
            ax.text(3.4, y + 0.17, r"$\downarrow$", ha="center", va="center", fontsize=8, color=PANEL)
    ax.plot([0.7, 5.3], [3.55, 3.55], color=GOLD, lw=2, ls="--")
    ax.text(5.05, 3.72, r"$E_F$", ha="right", color=GOLD, weight="bold")
    ax.text(3.0, 4.45, "compression raises the\nhighest occupied momentum", ha="center", color=MUTED)
    finish(fig, "ch11-boson-fermion-filling.svg")


def fig_teleportation():
    fig = new_figure(11, 5.2)
    ax = fig.add_subplot(111)
    clean(ax, (0, 14), (0, 6.2))
    ys = [4.65, 3.15, 1.65]
    labels = [r"1: unknown $|\psi\rangle$", r"2: Alice's Bell qubit", r"3: Bob's Bell qubit"]
    for y, label in zip(ys, labels):
        ax.plot([1.1, 13.25], [y, y], color=INK, lw=1.4)
        ax.text(0.95, y, label, ha="right", va="center", color=MUTED)
    # Bell-pair preparation
    circuit_gate(ax, 2.25, 3.15, "$H$", GOLD)
    ax.add_patch(Circle((3.55, 3.15), 0.09, fc=INK, ec=INK))
    ax.plot([3.55, 3.55], [1.65, 3.15], color=INK, lw=1.5)
    ax.add_patch(Circle((3.55, 1.65), 0.3, fc=PANEL, ec=INK, lw=1.4))
    ax.plot([3.35, 3.75], [1.65, 1.65], color=INK)
    ax.plot([3.55, 3.55], [1.45, 1.85], color=INK)
    ax.text(2.9, 0.72, "shared entanglement", ha="center", color=GOLD, weight="bold")
    # Bell measurement
    ax.add_patch(Circle((5.45, 4.65), 0.09, fc=INK, ec=INK))
    ax.plot([5.45, 5.45], [3.15, 4.65], color=INK, lw=1.5)
    ax.add_patch(Circle((5.45, 3.15), 0.3, fc=PANEL, ec=INK, lw=1.4))
    ax.plot([5.25, 5.65], [3.15, 3.15], color=INK)
    ax.plot([5.45, 5.45], [2.95, 3.35], color=INK)
    circuit_gate(ax, 6.55, 4.65, "$H$", PURPLE)
    for y in ys[:2]:
        ax.add_patch(FancyBboxPatch((7.55, y - 0.28), 0.58, 0.56, boxstyle="round,pad=0.03", fc=CORAL_LIGHT, ec=CORAL, lw=1.5))
        ax.add_patch(Polygon([[7.68, y - 0.08], [8.0, y + 0.12], [7.84, y - 0.18]], closed=True, fc=CORAL, ec=CORAL))
    ax.text(7.85, 5.42, "Bell measurement", ha="center", color=CORAL, weight="bold")
    # Classical feed-forward and corrections
    for y, gate, xgate in ((4.65, "$Z$", 10.6), (3.15, "$X$", 11.7)):
        ax.plot([8.13, xgate], [y, 2.12 if gate == "$Z$" else 1.18], color=CORAL, lw=1.3, ls="--")
        circuit_gate(ax, xgate, 1.65, gate, CORAL)
    rounded(ax, (12.35, 1.18), 1.25, 0.94, r"recover\n$|\psi\rangle$", fc=TEAL_LIGHT, ec=TEAL)
    ax.text(10.7, 0.62, "two classical bits select the correction", ha="center", color=MUTED)
    ax.text(7.05, 5.92, "Teleportation consumes one Bell pair and two classical bits; it does not copy the input", ha="center", weight="bold")
    finish(fig, "ch12-teleportation-circuit.svg")


def fig_decoherence():
    fig, axes = plt.subplots(1, 2, figsize=(10.8, 4.5), layout="constrained")
    ax = axes[0]
    clean(ax, (-1.3, 1.3), (-1.2, 1.3))
    ax.add_patch(Circle((0, 0), 1, fc=PANEL, ec=GRID, lw=1.5))
    ax.plot([0, 0], [-1.05, 1.08], color=MUTED, lw=1)
    ax.plot([-1.05, 1.05], [0, 0], color=GRID, lw=1)
    for length, alpha in ((0.9, 1.0), (0.62, 0.65), (0.3, 0.3)):
        arrow(ax, (0, 0), (length, 0.24 * length), color=PURPLE, lw=2.5, mutation=14)
        ax.add_patch(Circle((length, 0.24 * length), 0.035, fc=PURPLE, ec="none", alpha=alpha))
    ax.text(0.45, 0.55, r"transverse coherence shrinks", ha="center", color=PURPLE, weight="bold")
    ax.text(0.03, 1.1, "$+z$", color=MUTED)
    ax.text(1.08, 0, "$+x$", color=MUTED)
    ax.set_title("Dephasing contracts the Bloch vector")
    ax = axes[1]
    t = np.linspace(0, 4, 500)
    ax.plot(t, np.exp(-t), color=TEAL, lw=3, label=r"population relaxation $e^{-t/T_1}$")
    ax.plot(t, np.exp(-1.6 * t), color=PURPLE, lw=3, label=r"coherence $e^{-t/T_2}$")
    ax.fill_between(t, 0, np.exp(-1.6 * t), color=PURPLE_LIGHT, alpha=0.45)
    ax.set(xlim=(0, 4), ylim=(0, 1.04), xlabel="time in units of $T_1$", ylabel="remaining signal")
    plot_style(ax)
    ax.legend(frameon=False, fontsize=9)
    ax.set_title(r"$T_1$ and $T_2$ describe different losses")
    finish(fig, "ch12-decoherence-t1-t2.svg")


def fig_error_syndrome():
    fig = new_figure(10.8, 5.0)
    ax = fig.add_subplot(111)
    clean(ax, (0, 12), (0, 6))
    rounded(ax, (0.25, 2.35), 2.2, 1.2, r"logical qubit\n$\alpha|0\rangle+\beta|1\rangle$", fc=PURPLE_LIGHT, ec=PURPLE)
    arrow(ax, (2.45, 2.95), (3.05, 2.95), color=INK)
    rounded(ax, (3.05, 2.35), 2.25, 1.2, r"encode\n$\alpha|000\rangle+\beta|111\rangle$", fc=TEAL_LIGHT, ec=TEAL)
    arrow(ax, (5.3, 2.95), (5.9, 2.95), color=INK)
    rounded(ax, (5.9, 2.35), 1.55, 1.2, "one bit\nmay flip", fc=CORAL_LIGHT, ec=CORAL)
    arrow(ax, (7.45, 2.95), (8.05, 2.95), color=INK)
    rounded(ax, (8.05, 2.0), 2.15, 1.9, r"measure only\n$Z_1Z_2$ and $Z_2Z_3$\n(error syndrome)", fc=GOLD_LIGHT, ec=GOLD)
    outcomes = [("(+,+)", "none"), ("(−,+)", "$X_1$"), ("(−,−)", "$X_2$"), ("(+,−)", "$X_3$")]
    for i, (syndrome, error) in enumerate(outcomes):
        y = 5.25 - i * 0.82
        rounded(ax, (10.55, y - 0.31), 1.15, 0.62, syndrome, fc=PANEL, ec=TEAL if i == 0 else CORAL, fontsize=9)
        ax.text(11.12, y - 0.48, error, ha="center", va="top", fontsize=8, color=MUTED)
        arrow(ax, (10.2, 2.95), (10.48, y), color=MUTED, lw=1.0, mutation=8)
    ax.text(6, 5.75, r"The syndrome reveals the error location, never the logical amplitudes $\alpha$ and $\beta$", ha="center", weight="bold", color=PURPLE)
    ax.text(6.95, 0.65, "correct the identified physical qubit and keep the encoded superposition", ha="center", color=MUTED)
    finish(fig, "ch12-error-correction-syndrome.svg")


def main():
    figures = [
        fig_tensor_product,
        fig_bell_chsh,
        fig_entangling_gate,
        fig_continuous_born,
        fig_fourier_uncertainty,
        fig_packet_spreading,
        fig_infinite_well,
        fig_finite_well_intersections,
        fig_tunneling_barrier,
        fig_harmonic_oscillator,
        fig_box_degeneracy,
        fig_hydrogen_structure,
        fig_hydrogen_transitions,
        fig_angular_ladder,
        fig_angular_addition,
        fig_singlet_triplet,
        fig_perturbation_levels,
        fig_variational_balance,
        fig_wkb_regions,
        fig_exchange_interference,
        fig_spin_space_symmetry,
        fig_quantum_statistics_filling,
        fig_teleportation,
        fig_decoherence,
        fig_error_syndrome,
    ]
    for make_figure in figures:
        make_figure()
    print(f"Generated {len(figures)} SVG figures for Chapters 5--12")


if __name__ == "__main__":
    main()
