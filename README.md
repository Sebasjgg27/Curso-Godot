# Godot Interactive Guide 🇪🇸

**Una guía interactiva de Godot 4 / GDScript** — construida como una SPA (Single Page Application) 100% estática, con temática tipo terminal, secciones estilo curso, ejercicios integrados y más.

> 🌐 **Live:** [Sebasjgg27.github.io/godot-interactive-guide](https://Sebasjgg27.github.io/godot-interactive-guide)

---

## 🎯 ¿Qué es?

Godot Interactive Guide es un recurso de aprendizaje **gratuito, offline-friendly** que cubre desde los fundamentos de Godot 4 hasta conceptos avanzados como shaders, autoloads, señales personalizadas y exportación multiplataforma.

Todo el contenido está en español y está diseñado para ser leído de principio a fin, o usado como referencia rápida.

## ✨ Características

| Característica | Descripción |
|---|---|
| 📚 **Secciones progresivas** | De "Introducción" a "Publicación", cada sección tiene páginas numeradas. |
| 🎮 **Ejercicios integrados** | Preguntas interactivas al final de cada sección para reforzar lo aprendido. |
| 🏗️ **Plan de construcción** | 5 fases para desarrollar un Metroidvania 2D desde cero. |
| ⭐ **Guía de estudio** | Metodología, ruta de aprendizaje, errores comunes y próximos pasos. |
| 🔗 **Vínculos a recursos** | Documentación oficial, GDQuest, Asset Library, plantillas y más. |
| 🌙 **Tema oscuro** | Interfaz tipo terminal con alta legibilidad. |

## 📑 Contenido

1. **Introducción** — Qué es Godot, instalación, el editor.
2. **GDScript** — Sintaxis básica, variables, funciones, tipos, señales.
3. **Nodos y Escenas** — Árbol de escenas, herencia, instanciación.
4. **Físicas** — CharacterBody2D, Area2D, colisiones, capas.
5. **Interfaz** — Control, contenedores, temas, señales de UI.
6. **Animación** — AnimationPlayer, AnimationTree, blend trees.
7. **Audio** — AudioStreamPlayer, buses, efectos, reproducción 2D/3D.
8. **Persistencia** — ConfigFile, Resource, guardado/carga.
9. **Shaders** — Shaders visuales, parámetros, tiempo.
10. **Plugins** — EditorPlugin, InspectorPlugin, autoloads.
11. **Publicación** — Exportación, plataformas, optimización.
12. **🏗️ Plan de Construcción** — 5 fases para tu Metroidvania.
13. **★ Guía de Estudio** — Cómo usar esta guía, ruta de aprendizaje, errores comunes, próximos pasos.

## 🛠️ Stack técnico

- **HTML5** + **CSS3** (variables, animaciones, flexbox)
- **JavaScript** vanilla (sin frameworks, sin dependencias)
- **Google Fonts** (JetBrains Mono + Inter)
- Sin build tools, sin bundlers, sin npm

## 🚀 Uso local

```bash
# Clonar
git clone https://github.com/Sebasjgg27/godot-interactive-guide.git

# Abrir (no necesita servidor)
open godot-interactive-guide/index.html
```

O simplemente servilo con cualquier servidor HTTP estático:

```bash
python3 -m http.server 8080
# o
npx serve .
```

## 🤝 Contribuir

¡Toda contribución es bienvenida! Ya sea corrigiendo un typo, agregando contenido, mejorando el diseño o traduciendo secciones.

### Cómo contribuir

1. Hacé un fork del repositorio.
2. Cread una rama para tu cambio (`git checkout -b mejora/contenido`).
3. Hacé tus cambios y commiteá (`git commit -m "Agrega sección de partículas"`).
4. Push a tu fork (`git push origin mejora/contenido`).
5. Abrí un Pull Request.

### Guías

- **Contenido nuevo**: Agregá un nuevo `<div id="page-Tu página">` en `index.html` y añadí la página al array en `PAGES` dentro de `js/app.js`.
- **Estilos**: Todos los estilos están en `css/style.css`. Usá las variables CSS existentes para mantener consistencia.
- **JavaScript**: Toda la lógica está en `js/app.js`. Las funciones de navegación, quizzes y blueprints están modularizadas por sección.
- **Traducciones**: Si querés traducir secciones a otro idioma, abrí un issue primero para coordinar.

### Ideas para contribuir

- [ ] Agregar más ejercicios interactivos (arrastrar y soltar, completar código)
- [ ] Traducir secciones a inglés
- [ ] Agregar ejemplos visuales (capturas, diagramas)
- [ ] Soporte para modo claro
- [ ] Barra de búsqueda
- [ ] Progreso de lectura (localStorage)

## 📄 Licencia

MIT — hacé lo que quieras con este proyecto. Si te sirvió, regalale una ⭐ al repo.

---

Hecho con ❤️ para la comunidad hispanohablante de Godot.
