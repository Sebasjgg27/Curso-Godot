# Godot Interactive Guide

**An interactive, hands-on guide to building a complete 2D Metroidvania in Godot 4 with GDScript.**
Built as a 100% static single-page app (no frameworks, no build step), with a terminal-style UI, course-like sections, per-section quizzes, beginner explainers, global search, and a 9-phase build blueprint.

> 🌐 **Live:** https://sebasjgg27.github.io/godot-interactive-guide
> 🌍 **Languages:** English (default) · Español (toggle in the toolbar)
> 📄 **License:** MIT

---

## 🎯 Scope — this is a **2D-focused** guide

This guide is intentionally about **2D game development with Godot 4**. Everything is oriented toward shipping a real 2D action‑platformer (Metroidvania):

- GDScript fundamentals (variables, functions, control flow, collections, OOP)
- The node/scene model and signals
- `CharacterBody2D` platforming, input, animation and `Camera2D`
- Rooms, `TileMapLayer`, abilities, enemy AI and room transitions
- Pixel-art pipeline: import settings, `AnimatedSprite2D`, 2D lights and 2D shaders
- Game systems: save/load, HUD, audio and autoloads

> **Out of scope:** 3D rendering, 3D physics and 3D-specific workflows. The concepts (nodes, signals, GDScript, autoloads) transfer to 3D, but every example here targets 2D.

**Target audience:** beginners with little or no programming background, up to intermediate developers who want a structured 2D project blueprint. Every concept page opens with a plain-language *"In simple words"* explainer and an everyday analogy.

---

## 📚 Course structure (9 sections + study guide)

| # | Section | Level | What you build |
|---|---------|-------|----------------|
| ★ | **Study Guide** | — | Methodology, learning path, common mistakes, next steps |
| 00 | **Introduction** | 🟢 | What Godot is, install, the editor |
| 01 | **GDScript Basics** | 🟢 | Variables, functions, control flow, arrays/dictionaries, OOP |
| 02 | **Nodes & Scenes** | 🟢 | Scene tree, signals, groups, instancing |
| 03 | **2D Player** | 🟡 | `CharacterBody2D`, input map, animation, camera |
| 04 | **Metroidvania** | 🔴 | Rooms, `TileMapLayer`, abilities, enemy AI, transitions |
| 05 | **Pixel Art** | 🟡 | Project config, `AnimatedSprite2D`, 2D lights, 2D shaders |
| 06 | **Systems** | 🟡 | Save/Load, HUD, audio, autoloads |
| 07 | **Reference** | 🟢 | Cheat sheet, common patterns, external resources |
| 08 | **Build the Game** | 🔴 | A 9-phase blueprint (0–8) to assemble and export your game |

## ✨ Features

- **Beginner-first explainers** — every technical page starts with a plain-language box + analogy.
- **Per-section quizzes** with instant feedback.
- **Global search** (`Ctrl/Cmd+K` or `/`) indexing every page and concept.
- **Keyboard navigation** — `←`/`→` between pages, `Esc`, `?` help, `T` table of contents.
- **Auto table of contents** and **reading-time** estimate per page.
- **Code-Only mode** to strip prose and read just the code.
- **9-phase build blueprint** with node diagrams, file timelines and testing checkpoints.
- **Progress saved** in `localStorage`.
- **Accessibility** — keyboard-operable tree/quizzes, focus-visible, ARIA live regions.
- **Terminal/brutalist dark theme.**

## 🛠️ Tech stack

Vanilla **HTML5 + CSS3 + JavaScript** — no frameworks, no bundler, no npm.

```
index.html            # all page content
css/style.css         # base theme
css/extensions.css    # search, toolbar, TOC, beginner boxes, i18n
js/app.js             # navigation, state, quizzes, build phases (data inline)
js/extensions.js      # search, shortcuts, TOC, reading time, a11y, language toggle
```

## 🚀 Run locally

```bash
git clone https://github.com/Sebasjgg27/godot-interactive-guide.git
cd godot-interactive-guide
python3 -m http.server 8080   # then open http://localhost:8080
```

(Opening `index.html` directly also works, since there is no build step.)

## 🤝 Contributing

PRs welcome — fixes, new 2D content, examples, diagrams or translations.

- **New content:** add a `<div id="page-Your Page">` in `index.html` and register the page in `PAGES` in `js/app.js`.
- **Styles:** reuse the existing CSS variables in `css/style.css` / `css/extensions.css`.
- **Logic:** navigation, quizzes and the build blueprint live in `js/app.js`; UX features in `js/extensions.js`.
- Keep examples **2D and Godot 4.3+** (the content uses `TileMapLayer`).

---

## 🇪🇸 Resumen en español

Guía interactiva para construir un **Metroidvania 2D completo en Godot 4** con GDScript. Está **enfocada en desarrollo 2D** (no cubre 3D): fundamentos de GDScript, nodos y señales, `CharacterBody2D`, tilemaps, pixel art, luces y shaders 2D, y sistemas (guardado, HUD, audio, autoloads), más un blueprint de 9 fases para armar y exportar tu juego.

La página está en **inglés por defecto** con un **interruptor a español** en la barra de herramientas. Cada página técnica abre con un recuadro *"En palabras simples"* pensado para quien no sabe nada de programación.

---

Made for the Godot community. If it helped you, drop a ⭐.
