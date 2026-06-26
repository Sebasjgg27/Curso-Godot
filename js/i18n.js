/* ============================================================
   i18n — lightweight runtime EN/ES toggle (single page)
   English is the default; Spanish is the original fallback.
   Translatable blocks are tagged with data-t="<index>" in index.html.
   The Spanish source is read from the DOM and cached; English comes
   from the T map below. Untranslated indexes fall back to Spanish.
   ============================================================ */
(function () {
  'use strict';
  var KEY = 'gdscript-guide-lang';

  /* Breadcrumb / section + page name maps (cover ALL sections) */
  var SECTION_EN = {
    'Guía de Estudio': 'Study Guide', 'Introducción': 'Introduction',
    'GDScript Bases': 'GDScript Basics', 'Nodos y Escenas': 'Nodes & Scenes',
    'Jugador 2D': '2D Player', 'Metroidvania': 'Metroidvania',
    'Pixel Art': 'Pixel Art', 'Sistemas': 'Systems',
    'Referencia': 'Reference', 'Build the Game': 'Build the Game'
  };
  var PAGE_EN = {
    'Cómo usar esta guía': 'How to use this guide', 'Ruta de aprendizaje': 'Learning Path',
    'Errores comunes': 'Common Mistakes', 'Próximos pasos': 'Next Steps',
    'El Entorno': 'The Environment', 'Instalación': 'Installation', 'Editor': 'Editor',
    'Variables y Tipos': 'Variables & Types', 'Funciones': 'Functions',
    'Control de Flujo': 'Control Flow', 'Arrays y Diccionarios': 'Arrays & Dictionaries',
    'Clases y POO': 'Classes & OOP', 'Árbol de Nodos': 'Node Tree', 'Señales': 'Signals',
    'Grupos': 'Groups', 'Instancias': 'Instances', 'CharacterBody2D': 'CharacterBody2D',
    'Input & Movimiento': 'Input & Movement', 'Animaciones': 'Animations', 'Cámara 2D': '2D Camera',
    'Diseño de Salas': 'Room Design', 'TileMap 2D': 'TileMap 2D',
    'Sistema de Habilidades': 'Ability System', 'Enemigos & IA': 'Enemies & AI',
    'Transiciones': 'Transitions', 'Config Proyecto': 'Project Config',
    'AnimatedSprite2D': 'AnimatedSprite2D', 'Luces 2D': '2D Lights', 'Shaders Pixel': 'Pixel Shaders',
    'Save/Load': 'Save/Load', 'HUD & UI': 'HUD & UI', 'Audio': 'Audio', 'Autoloads': 'Autoloads',
    'Cheat Sheet': 'Cheat Sheet', 'Patrones comunes': 'Common Patterns', 'Recursos externos': 'External Resources'
  };

  /* index -> English innerHTML (markup preserved). */
  var T = {
    0: 'Complete interactive guide',
    1: 'Learn <span class="accent">GDScript</span><br/>Build your <span class="accent2">Metroidvania</span>',
    2: 'A dark course index for Godot 4: reference material stays functional, while action moments become poster-scale brutalist markers.',
    3: '<span class="dim">//</span> How to use this guide',
    4: '🎯 Level',
    5: '⏱️ Estimated time',
    6: '📦 Requirements',
    7: '📋 Recommended prior knowledge',
    8: 'You do not need to be a programming expert, but it helps to be comfortable with these basics:',
    9: '<strong>Programming logic</strong> — variables, conditionals, loops, functions.',
    10: '<strong>Basic object orientation</strong> — what a class, a method and a property are.',
    11: '<strong>Basic technical English</strong> — Godot\'s official documentation is in English.',
    12: '<strong>No prior Godot editor knowledge needed</strong> — you learn it from scratch in section 00 (install, create a project and run a scene).',
    13: '🧠 Recommended study method',
    14: 'To get the most out of this guide, follow this workflow in every section:',
    15: '💡 Tips to learn faster',
    16: 'Tip',
    17: 'Detail',
    18: '<code>Code-Only mode</code>',
    19: 'Toggle ▶ in the top bar to show only the code, free of distractions.',
    20: '<code>Saved progress</code>',
    21: 'The guide remembers your progress in the browser (localStorage). You can close it and continue later.',
    22: '<code>Sidebar</code>',
    23: 'Use the file tree to navigate between sections. Each section collapses and expands.',
    24: '<code>Copy + Paste</code>',
    25: 'Every code block has a "Copy" button. Use it to take the code into Godot.',
    26: '<code>Your own project</code>',
    27: 'Do not just follow the guide. Build your own game while you learn.',
    28: '⚠️ Common beginner mistakes',
    29: '<strong>❌ Not reading the documentation</strong> — When something does not work, check the <a href="https://docs.godotengine.org/" style="color:var(--cyan)" target="_blank">official documentation</a>.',
    30: '<strong>❌ Writing code without understanding it</strong> — Do not copy-paste without reading. Every line has a purpose.',
    31: '<strong>❌ Skipping the fundamentals</strong> — Do not jump to the Metroidvania section before mastering GDScript basics.',
    32: '<strong>❌ Not experimenting</strong> — The best way to learn is to break things and fix them.',
    33: '<strong>❌ Comparing yourself to others</strong> — Everyone learns at their own pace. Enjoy the process.',
    34: '<strong>📌 Remember:</strong> This guide is designed to be <strong>interactive</strong>. It is not a book to read passively. Click, navigate, answer quizzes, tick checklists. Active learning is 10× more effective.',
    35: 'Next: Learning Path →',
    36: '<span class="dim">//</span> Learning Path',
    37: 'This guide is organized into <strong>9 sections</strong> that build knowledge progressively. Follow the recommended order for the best experience.',
    38: '🗺️ Course map',
    39: 'Section',
    40: 'Difficulty',
    41: 'Time',
    42: 'What you will learn',
    43: '<code>00</code>',
    44: '<strong>Introduction</strong>',
    45: '<span style="color:var(--green)">🟢 Basic</span>',
    46: '30 min',
    47: 'What Godot is, installation, the editor interface',
    48: '<code>01</code>',
    49: '<strong>GDScript Basics</strong>',
    50: '<span style="color:var(--green)">🟢 Basic</span>',
    51: '2–3 h',
    52: 'Variables, functions, control flow, arrays, OOP',
    53: '<code>02</code>',
    54: '<strong>Nodes & Scenes</strong>',
    55: '<span style="color:var(--green)">🟢 Basic</span>',
    56: '1–2 h',
    57: 'Scene tree, signals, groups, instancing',
    58: '<code>03</code>',
    59: '<strong>2D Player</strong>',
    60: '<span style="color:var(--yellow)">🟡 Medium</span>',
    61: '3–4 h',
    62: 'CharacterBody2D, input, animation, camera',
    63: '<code>04</code>',
    64: '<strong>Metroidvania</strong>',
    65: '<span style="color:var(--red)">🔴 Advanced</span>',
    66: '4–6 h',
    67: 'Rooms, tilemaps, abilities, enemies, transitions',
    68: '<code>05</code>',
    69: '<strong>Pixel Art</strong>',
    70: '<span style="color:var(--yellow)">🟡 Medium</span>',
    71: '2–3 h',
    72: 'Pixel-art configuration, sprites, lights, shaders',
    73: '<code>06</code>',
    74: '<strong>Systems</strong>',
    75: '<span style="color:var(--yellow)">🟡 Medium</span>',
    76: '2–3 h',
    77: 'Save/Load, HUD, audio, autoloads',
    78: '<code>07</code>',
    79: '<strong>Reference</strong>',
    80: '<span style="color:var(--green)">🟢 Basic</span>',
    81: '1 h',
    82: 'Cheat sheet, common patterns, external resources',
    83: '<code>08</code>',
    84: '<strong>Build the Game</strong>',
    85: '<span style="color:var(--red)">🔴 Advanced</span>',
    86: '6–8 h',
    87: 'A complete blueprint to build your Metroidvania',
    88: '📈 Recommended progression',
    89: 'Each section assumes you already master the previous ones. Do not skip sections — knowledge is cumulative:',
    90: '<strong>🎯 Final goal:</strong> By completing this guide you will have a <strong>working 2D Metroidvania</strong> in Godot 4, with fluid movement, connected rooms, abilities, enemies, saving, menus and more. All ready to export and share.',
    91: '← Previous: Methodology',
    92: 'Next: Common Mistakes →',
    93: '<span class="dim">//</span> Common beginner mistakes',
    94: 'These are the most frequent mistakes when learning Godot 4 and GDScript. Recognizing them will save you hours of debugging.',
    95: '⚠️ 1. Not multiplying by delta',
    96: 'The most common mistake. If you move an object without using <code>delta</code>, the movement will differ on each screen (60 fps vs 144 fps).',
    97: '⚠️ 2. Using get_node() with hard-coded paths',
    98: 'Calling <code>$Node</code> every frame is inefficient. Also, if you rename the node, the code breaks.',
    99: '⚠️ 3. Not disconnecting signals',
    100: 'If you connect a signal in code but never disconnect it when leaving the scene, you get "null instance" errors or duplicated behavior.',
    101: '⚠️ 4. One giant script',
    102: 'Putting all the game logic in a single file makes the code impossible to maintain. Godot is designed for node composition.',
    103: '<strong>Rule of thumb:</strong> If a script exceeds 200–300 lines, split its behavior into specialized child nodes (HealthComponent, MovementController, etc.).',
    104: '⚠️ 5. Not using type hints',
    105: 'GDScript 2.0 supports optional static typing. Skipping it means losing autocompletion, compile-time error detection and performance.',
    106: '📌 Quick summary',
    107: 'Mistake',
    108: 'Fix',
    109: 'Not multiplying by delta',
    110: 'Always <code>movement * delta</code>',
    111: 'get_node() every frame',
    112: 'Use <code>@onready var</code>',
    113: 'Signals left connected',
    114: 'Disconnect in <code>_exit_tree()</code>',
    115: 'Monolithic scripts',
    116: 'Node composition',
    117: 'No type hints',
    118: 'Always type variables and functions',
    119: '<code>_process</code> for movement',
    120: 'Use <code>_physics_process</code>',
    121: 'Forgetting <code>move_and_slide()</code>',
    122: 'Call it after setting <code>velocity</code>',
    123: '<strong>💡 Tip:</strong> Enable the <code>UNTYPED_DECLARATION</code> and <code>UNSAFE_PROPERTY_ACCESS</code> warnings in Godot\'s Project Settings so the editor flags untyped code automatically.',
    124: '← Previous: Learning Path',
    125: 'Next: Next Steps →',
    126: '<span class="dim">//</span> Next steps',
    127: '🚀 What to do after the guide?',
    128: 'Congratulations on getting this far! You now have a solid foundation in Godot 4 and GDScript. Now you can take your learning to the next level:',
    129: '📘 Official documentation',
    130: '🎥 GDQuest',
    131: '📦 Asset Library',
    132: '🎮 Itch.io + Godot',
    133: '🏗️ Projects to practice',
    134: 'Project',
    135: 'Difficulty',
    136: 'Concepts to apply',
    137: '<strong>Simple platformer</strong>',
    138: '<span style="color:var(--green)">🟢 Easy</span>',
    139: 'CharacterBody2D, TileMap, animations, cameras',
    140: '<strong>Top-down shooter</strong>',
    141: '<span style="color:var(--yellow)">🟡 Medium</span>',
    142: 'Input, areas, collisions, enemy spawning, pools',
    143: '<strong>2D Roguelike</strong>',
    144: '<span style="color:var(--red)">🔴 Hard</span>',
    145: 'Procedural generation, rooms, items, permadeath',
    146: '<strong>Full Metroidvania</strong>',
    147: '<span style="color:var(--red)">🔴 Hard</span>',
    148: 'Everything you learned + map, dialogue, bosses, menus',
    149: '<strong>Game jam game</strong>',
    150: '<span style="color:var(--yellow)">🟡 Medium</span>',
    151: 'Small scope, iterate fast, publish on Itch.io',
    152: '🌐 Community and resources',
    153: '<strong>🔹 Godot Discord (Hispano)</strong> — Spanish-speaking community to solve doubts.',
    154: '<strong>🔹 r/godot</strong> — active subreddit with tutorials, assets and showcases.',
    155: '<strong>🔹 Godot Contributors Chat</strong> — the official Godot developers chat.',
    156: '<strong>🔹 Twitter/X #GodotEngine</strong> — follow creators and stay up to date.',
    157: '📚 Recommended books',
    158: '<strong>"Godot 4 Game Development Projects"</strong> — Chris Bradfield (Packt).',
    159: '<strong>"Godot 4: Aplicaciones y juegos"</strong> — Antonio Cervilla (Marcombo).',
    160: '<strong>"GDQuest Godot 4 Guides"</strong> — free at gdquest.com.',
    161: '📝 Checklist for your next game',
    162: '<span class="check-box"></span> Define the concept and core mechanic',
    163: '<span class="check-box"></span> Build a playable prototype in 1 week',
    164: '<span class="check-box"></span> Design 3 complete levels',
    165: '<span class="check-box"></span> Implement a save system',
    166: '<span class="check-box"></span> Create a main menu and game over',
    167: '<span class="check-box"></span> Add sound effects and music',
    168: '<span class="check-box"></span> Playtest with 3 people',
    169: '<span class="check-box"></span> Publish on Itch.io',
    170: '<strong>💪 The journey continues:</strong> Learning Godot is an ongoing process. The best way to improve is to <strong>build</strong>. Start small, finish projects, share your work. The next great indie game could be yours!',
    171: '← Previous: Common Mistakes',
    172: 'Start the course →',
    173: 'Welcome <span class="dim">// The Godot environment</span>',
    174: '🔰 In simple words',
    175: 'A <strong>game engine</strong> is a program that already solves the hard parts of making a game: drawing images on screen, detecting collisions, playing sounds and applying physics. Godot is one of those engines, free and open source. Instead of programming everything from scratch, you build your game by combining pieces (the <strong>nodes</strong>) and writing small instructions in <strong>GDScript</strong>, a language designed to be easy to read. You do not need any prior game-dev experience to start.',
    176: '<strong>Analogy:</strong> think of Godot as a fully equipped kitchen: the oven, the knives and the pots are there. You bring the recipe (your code) and the ingredients (images and sounds).',
    177: 'Godot 4 is an open-source game engine with its own language called <strong>GDScript</strong>, designed to be readable, fast and tightly integrated with the editor. Its syntax is similar to Python but with optional typing and direct access to the engine.',
    178: 'No licenses',
    179: 'Godot is 100% free and open. No royalties, no commercial restrictions.',
    180: 'Simple GDScript',
    181: 'Python-like syntax. Optional static typing for better performance.',
    182: 'Native 2D',
    183: 'A 2D system completely separate from 3D, with its own TileMap, physics and shaders.',
    184: 'Signals (Events)',
    185: 'A signal system for communication between nodes without tight coupling.',
    186: 'Node tree (Scene Tree)',
    187: 'In Godot, everything is a <strong>node</strong>. Nodes are organized into hierarchical <strong>scenes</strong>. A scene can be instanced inside another, like prefabs.',
    188: '<strong>💡 Tip:</strong> In Godot 4.3+ the <code class="inline">TileMap</code> node was replaced by <code class="inline">TileMapLayer</code>. Each layer is a separate node, which allows finer per-layer control.',
    189: 'Installation <span class="dim">// Project setup</span>',
    190: '🔰 In simple words',
    191: 'Installing Godot is simpler than most programs: there is no installer — you download <strong>a single file</strong> and open it. The first thing you will do is create a <strong>project</strong>, which is just the folder where your game will live. Everything you create is stored inside it.',
    192: '⚠️ Choose a path <strong>without spaces or accents</strong> (for example <code class="inline">C:/godot/my_game</code>): some systems get confused by unusual characters in the path.',
    193: '<strong>Analogy:</strong> creating a project is like opening a fresh, empty folder for a piece of work: there is nothing yet, but it is the place where you will keep everything.',
    194: 'Download and installation',
    195: 'Godot 4 requires no installation. It is a portable executable. Download it from <strong>godotengine.org</strong>. Choose the <strong>standard</strong> version (not .NET unless you need C#).',
    196: '<span class="cb"></span>Download Godot 4.3 or later from godotengine.org',
    197: '<span class="cb"></span>Create a project folder (no spaces or accents in the path)',
    198: '<span class="cb"></span>Open Godot → New Project → select the folder',
    199: '<span class="cb"></span>Choose the "Mobile" or "Forward+" renderer (Forward+ for advanced shaders)',
    200: '<span class="cb"></span>Create the first scene: Node2D as the root',
    201: '<span class="cb"></span>Save the scene as <code class="inline">main.tscn</code>',
    202: 'Pixel-art configuration',
    203: 'Before making any sprite, configure the project for pixel art:',
    204: '<strong>⚠️ Important:</strong> If you do not set <code class="inline">Nearest</code> as the texture filter, sprites will be antialiased and look blurry when scaled.',
    205: 'The Editor <span class="dim">// Key areas</span>',
    206: '🔰 In simple words',
    207: 'The <strong>editor</strong> is the Godot window where you build the game. It is divided into <strong>areas</strong>, each with a job: one shows the pieces of your scene, another their properties, another the code, another the files. It looks like a lot at first, but in practice you always use the same three or four.',
    208: '<strong>Analogy:</strong> like a car dashboard: there are many buttons, but you drive with the wheel, the pedals and the gear stick. You discover the rest over time.',
    209: 'Areas of the Godot editor',
    210: 'Area',
    211: 'Description',
    212: 'Shortcut',
    213: '<strong>Scene Tree</strong>',
    214: 'Node tree of the active scene',
    215: '<strong>Inspector</strong>',
    216: 'Properties of the selected node',
    217: '<strong>FileSystem</strong>',
    218: 'Project files (res://)',
    219: '<strong>Viewport 2D</strong>',
    220: 'Visual preview and editing',
    221: '<code>F1</code>',
    222: '<strong>Script Editor</strong>',
    223: 'GDScript code editor',
    224: '<code>F3</code> / <code>Ctrl+`</code>',
    225: '<strong>Output</strong>',
    226: 'print messages and errors',
    227: '<strong>Debugger</strong>',
    228: 'Breakpoints, variables, profiler',
    229: '<code>F5</code> game',
    230: 'Essential shortcuts',
    231: 'Action',
    232: 'Shortcut',
    233: 'Run game',
    234: '<code>F5</code>',
    235: 'Run current scene',
    236: '<code>F6</code>',
    237: 'Pause game',
    238: '<code>F7</code>',
    239: 'Go to the selected node\'s script',
    240: '<code>Ctrl+Alt+S</code>',
    241: 'Autocomplete',
    242: '<code>Ctrl+Space</code>',
    243: 'Duplicate node',
    244: '<code>Ctrl+D</code>',
    245: 'Instance scene',
    246: '<code>Ctrl+Shift+A</code>',
    247: 'Save all',
    248: '<code>Ctrl+Shift+S</code>',
    249: '<span class="nav-dir">Next →</span> <span>Variables & Types</span>',
    296: '<span class="nav-dir">← Previous</span> <span>Godot Editor</span>',
    297: '<span class="nav-dir">Next →</span> <span>Node Tree</span>',
    318: '<span class="nav-dir">← Previous</span> <span>Classes & OOP</span>',
    319: '<span class="nav-dir">Next →</span> <span>2D Player</span>',
    364: '<span class="nav-dir">← Previous</span> <span>Instances</span>',
    365: '<span class="nav-dir">Next →</span> <span>Metroidvania</span>',
    391: '<span class="nav-dir">← Previous</span> <span>2D Camera</span>',
    392: '<span class="nav-dir">Next →</span> <span>Pixel Art</span>',
    436: '<span class="nav-dir">← Previous</span> <span>Transitions</span>',
    437: '<span class="nav-dir">Next →</span> <span>Systems</span>',
    456: '<span class="nav-dir">← Previous</span> <span>Pixel Shaders</span>',
    457: '<span class="nav-dir">Next →</span> <span>Reference</span>',
    526: '<span class="nav-dir">← Previous</span> <span>Autoloads</span>',
    527: '<span class="nav-dir">Next →</span> <span>Blueprint</span>'
  };

  var esCache = {};
  var current = 'en';

  function els() { return document.querySelectorAll('[data-t]'); }

  function cacheES() {
    els().forEach(function (el) {
      var i = el.getAttribute('data-t');
      if (!(i in esCache)) esCache[i] = el.innerHTML;
    });
  }

  function translateBreadcrumb(lang) {
    var sec = document.getElementById('bc-section');
    var pg = document.getElementById('bc-page');
    if (sec && lang === 'en' && SECTION_EN[sec.textContent.trim()]) {
      sec.dataset.es = sec.dataset.es || sec.textContent;
      sec.textContent = SECTION_EN[sec.textContent.trim()];
    } else if (sec && lang === 'es' && sec.dataset.es) {
      sec.textContent = sec.dataset.es;
    }
    if (pg && lang === 'en' && PAGE_EN[pg.textContent.trim()]) {
      pg.dataset.es = pg.dataset.es || pg.textContent;
      pg.textContent = PAGE_EN[pg.textContent.trim()];
    } else if (pg && lang === 'es' && pg.dataset.es) {
      pg.textContent = pg.dataset.es;
    }
  }

  function apply(lang) {
    current = lang;
    els().forEach(function (el) {
      var i = el.getAttribute('data-t');
      var en = T[i];
      el.innerHTML = (lang === 'en' && en != null) ? en : esCache[i];
    });
    document.documentElement.lang = lang;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    translateBreadcrumb(lang);
    updateButton();
  }

  function toggle() { apply(current === 'en' ? 'es' : 'en'); }

  var btn;
  function buildButton() {
    var bar = document.querySelector('.fab-toolbar');
    btn = document.createElement('button');
    btn.className = 'fab fab-lang';
    btn.id = 'fab-lang';
    btn.addEventListener('click', toggle);
    if (bar) bar.insertBefore(btn, bar.firstChild);
    else document.body.appendChild(btn);
    updateButton();
  }
  function updateButton() {
    if (!btn) return;
    // show the language you can switch TO
    var to = current === 'en' ? 'ES' : 'EN';
    btn.textContent = to;
    btn.title = current === 'en' ? 'Cambiar a español' : 'Switch to English';
    btn.setAttribute('aria-label', btn.title);
  }

  // Re-translate breadcrumb after each navigation (navigate is wrapped by app/extensions)
  if (typeof window.navigate === 'function' && !window.__i18nNavWrapped) {
    var orig = window.navigate;
    window.navigate = function () {
      var r = orig.apply(this, arguments);
      try { translateBreadcrumb(current); } catch (e) {}
      return r;
    };
    window.__i18nNavWrapped = true;
  }

  function init() {
    try {
      cacheES();
      buildButton();
      var saved = null;
      try { saved = localStorage.getItem(KEY); } catch (e) {}
      apply(saved || 'en');
    } catch (e) {
      console.error('i18n init error:', e);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
