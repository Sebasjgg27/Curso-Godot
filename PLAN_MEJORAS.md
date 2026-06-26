# Plan de mejora — Godot Interactive Guide
**Objetivo:** que cualquier persona que no sepa NADA pueda entender, **verificar su propio aprendizaje**, y vivir la guía como un juego.
**Fecha:** 26 jun 2026 · Basado en preview real del sitio + auditoría de código.

---

## 0) Hallazgo de despliegue (leer primero)
Al previsualizar la URL pública `sebasjgg27.github.io/godot-interactive-guide`, **el contenido nuevo "🔰 En palabras simples" NO aparece todavía**. Eso significa que GitHub Pages está sirviendo una rama sin el commit de contenido (o hay caché de CDN).

**Acción:** confirmá en GitHub → Settings → Pages **desde qué rama publica** (probablemente `main`). El contenido vive en `improve-guide`. Hay que mergear esa rama a la que publica Pages y esperar 1–2 min. Sin esto, nada de lo nuevo se ve online.

---

## 1) Bugs, errores y contradicciones encontrados

### 🔴 Errores técnicos (código que un principiante copiaría mal)
| # | Dónde | Problema | Corrección |
|---|-------|----------|------------|
| 1 | GDScript → Variables (tabla "Tipos") | `NodePath` aparece como `@"../Player"`. El `@` **no** es prefijo de NodePath. | Usar `^"../Player"` (NodePath) o `"../Player"`. El `@` es para anotaciones; `&` para StringName. |
| 2 | GDScript → Clases y POO | `func to_string()` no es llamado automáticamente al convertir a texto. | Renombrar a `func _to_string()` (con guion bajo) para que `str()`/`print()` lo usen. |
| 3 | Sistemas → Save/Load | `JSON.parse_string` puede devolver `null` y el ejemplo no valida el tipo antes de indexar `data["..."]`. | Validar `if typeof(data) != TYPE_DICTIONARY: return false`. |

### 🟠 Contradicciones de contenido
| # | Dónde | Contradicción |
|---|-------|---------------|
| 4 | "Conocimientos previos recomendados" | Pide como **requisito** "uso básico del editor Godot: crear proyecto, añadir nodos, ejecutar escena"… pero la **sección 00 enseña exactamente eso**. Para un principiante total es desalentador y contradictorio. → Reformular como "no necesitás saber nada del editor; lo aprendés en la sección 00". |
| 5 | Idioma mezclado | La guía es para hispanohablantes, pero hay bloques en **inglés**: el subtítulo del hero ("A dark course index for Godot 4…") y **toda la sección "Build the Game"** (títulos, subtítulos, "enter phase", "Moment/Filesystem", checkpoints). Rompe la promesa de guía en español. |
| 6 | Hero / Blueprint | La tarjeta dice "Blueprint — **8 phases**" pero hay **9 fases** (0 a 8). |
| 7 | Versión de Godot | "Requisitos: Godot **4.3+**" vs "Descargar Godot **4.x**" vs badge "Godot 4.x". Unificar a 4.3+ (porque el contenido usa `TileMapLayer`, que es 4.3+). |
| 8 | Naming | Se mezcla `TileMap` y `TileMapLayer` en diagramas y tablas (p. ej. Vector2i "(TileMap)"). El tip lo aclara, pero conviene ser consistente. |

### 🟡 Detalles funcionales (de las features nuevas)
- Las flechas ←/→ navegan de página aun cuando el foco está en una opción de quiz (puede sorprender). Sugerencia: ignorar ←/→ si el foco está dentro de un `.quiz`.
- El TOC genera IDs de encabezado por `sección+índice`; dos páginas de la misma sección podrían repetir un id. Riesgo bajo (solo se ve la página activa), pero conviene incluir el nombre de página en el id.
- El buscador ahora indexa ~700 caracteres del cuerpo (incluye el texto "En palabras simples"): bien para hallar conceptos, pero vigilar que no genere ruido.

> Nota: la prueba funcional automatizada (jsdom) pasa **17/17 sin errores de consola**. Los puntos de arriba son de contenido/UX, no fallas de ejecución.

---

## 2) Comprensión para alguien que no sabe NADA

**Principio:** cada página debe responder, en este orden: *¿qué es? ¿por qué me importa? ¿cómo se ve? ¿cómo sé que funcionó?*

1. **Glosario flotante (recuperar lo perdido).** Palabras como *nodo, escena, signal, delta, tween, autoload, instanciar* deben tener definición al pasar el mouse/tap. Un beginner se traba en el vocabulario, no en la idea.
2. **Código explicado línea por línea (modo "explicame esto").** Botón en cada bloque que muestra comentarios en español encima de las líneas clave. El recuadro 🔰 ya explica el concepto; falta el puente al código.
3. **"Cómo saber que funcionó" en cada snippet.** Hoy solo el Blueprint tiene checkpoints. Llevar ese patrón a TODO ejemplo: *"Apretá F5. Deberías ver `¡Nodo listo!` en Output. Si no aparece, revisá que el script esté adjunto al nodo."*
4. **Objetivos al inicio de cada página.** 1–3 viñetas "Al terminar vas a poder…". (El recuadro 🔰 cubre la mitad; agregar la meta concreta.)
5. **Quitar suposiciones.** Reescribir el bloque de "conocimientos previos" (ver contradicción #4) y traducir todo el inglés (#5).
6. **Primer "Hola Mundo" guiado real.** Un mini-tutorial paso a paso (con capturas o diagramas) antes de la teoría: crear proyecto → nodo → script → `print` → F5. Victoria temprana en 5 minutos.

---

## 3) Sistema para que el aprendiz **verifique** lo que hace
Hoy hay quizzes de opción múltiple, pero nada confirma que *su propio código* esté bien. Tres mecanismos, de menor a mayor esfuerzo:

### Mecanismo A — Retos auto-corregidos (sin ejecutar GDScript)
Tres tipos, todos deterministas y offline:
- **Predecí la salida:** se muestra código, el aprendiz elige/escribe qué imprime. Auto-corrige.
- **Encontrá el bug:** código con 1 error (ej. `function` en vez de `func`); hay que clickear la línea culpable.
- **Completá el código:** huecos rellenables, validados por comparación normalizada (ignora espacios) + alternativas aceptadas.

→ Da feedback inmediato y objetivo. Es la forma más honesta de "verificar" sin runtime.

### Mecanismo B — Verificador estático de GDScript (linter en el navegador)
Un cuadro donde pegás tu código y recibe chequeos: `func` vs `function`, tabs vs espacios mezclados, paréntesis/llaves balanceadas, `:` faltante en `if/func`, `var/const` mal escritos. **No ejecuta** (no es un sandbox): solo valida sintaxis básica y te dice "pasa los chequeos" o señala la línea. Resuelve el "¿quién verifica?" sin servidor.

### Mecanismo C — Checklists verificables dentro de Godot
Para lo que sí requiere correr el juego, listas con criterio objetivo de éxito:
> ☐ Al apretar F6, el personaje cae y se detiene en el piso.
> ☐ Si atraviesa el piso → revisá el `CollisionShape2D`.

Convierte "me funcionó a mí" en "cumplió estos criterios medibles".

---

## 4) La idea "loca": **Modo Metroidvania de Aprendizaje** 🗺️
La guía enseña a hacer un metroidvania… así que **el aprendizaje mismo se vuelve un metroidvania**. Coherencia total con el tema.

**Cómo funciona:**
- **Mapa de salas interconectadas:** cada sección es una *región* y cada página una *sala*. Arrancás con casi todo "en niebla"; al completar salas, el mapa se ilumina (estética pixel/brutalist que ya tenés).
- **XP y niveles:** ganás XP por leer una página, acertar quizzes y pasar retos (Mecanismo A). Subís de nivel: *Novato → Aprendiz → Dev Indie → Game Master*.
- **Puertas con llave (gating opcional):** la "puerta" a la siguiente región se abre al pasar el **reto-jefe** de la sección (un reto del Mecanismo A). Igual que una habilidad abre una puerta en un metroidvania. (Configurable: modo libre vs modo aventura.)
- **Habilidades desbloqueables = funciones de la guía:** dominar "Nodos" desbloquea el glosario avanzado; dominar "Sistemas" desbloquea el modo oscuro/temas, etc. Meta-juego.
- **Logros y medallas:** 🥇 "Cazador de bugs" (pasaste todos los "Encontrá el bug"), 🔥 racha de 3 días, 🏆 "Shipeaste tu juego" al terminar el Blueprint.
- **Jefe final:** la sección Build the Game es el "boss". Completar la checklist del MVP otorga un **certificado descargable** con tu nombre y fecha.
- **Todo en localStorage:** ya existe la base de progreso; se extiende con XP, logros y estado del mapa. Cero backend.
- **Toques de juego (opcionales):** barra de "energía/vida" temática, SFX retro al acertar (con toggle de silencio), animación al "abrir puerta".

**Por qué funciona:** convierte la motivación extrínseca (terminar el curso) en bucle de juego (explorar, desbloquear, coleccionar), y el gating por retos garantiza que **nadie avanza sin demostrar que entendió** — exactamente tu preocupación.

---

## 5) Roadmap sugerido (por fases, de mayor a menor impacto/menor riesgo)

**Fase 1 — Arreglos y verdad (rápido, alto impacto)**
- Corregir errores técnicos #1–3 y contradicciones #4–8.
- Traducir el hero y toda la sección Build al español.
- Desplegar bien en Pages (hallazgo §0).

**Fase 2 — Comprensión total**
- Glosario flotante + "explicame el código" línea por línea.
- "Cómo saber que funcionó" en cada snippet + objetivos por página.
- Mini-tutorial "Hola Mundo" guiado.

**Fase 3 — Verificación**
- Mecanismo A (retos auto-corregidos) en cada sección.
- Mecanismo B (linter estático) y C (checklists en Godot).

**Fase 4 — Modo Metroidvania de Aprendizaje**
- XP, niveles, logros, mapa que se ilumina, gating por reto-jefe, certificado final.

**Fase 5 — Calidad continua**
- Tests automáticos de contenido (que cada quiz/reto tenga 1 respuesta correcta; que no haya links rotos; que el HTML quede balanceado).
- Accesibilidad y rendimiento.

---

### Verificación de este plan
- Preview de contenido: ✅ leído completo (las 9 secciones / 36 páginas).
- Prueba funcional headless: ✅ 17/17, sin errores de consola.
- Bugs/contradicciones: ✅ 8 hallazgos documentados con su corrección.
- Deploy: ⚠️ el contenido nuevo no se ve en la URL pública todavía (acción en §0).
