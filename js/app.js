/* ============================================================
   NAVIGATION & STATE
   ============================================================ */
const STORAGE_KEY = 'gdscript-guide-state-v3';
const PAGES = {
  study: {
    pages: ['Cómo usar esta guía', 'Ruta de aprendizaje', 'Errores comunes', 'Próximos pasos'],
    title: 'Guía de Estudio'
  },
  intro: {
    pages: ['El Entorno', 'Instalación', 'Editor'],
    title: 'Introducción'
  },
  gdscript: {
    pages: ['Variables y Tipos', 'Funciones', 'Control de Flujo', 'Arrays y Diccionarios', 'Clases y POO'],
    title: 'GDScript Bases'
  },
  nodes: {
    pages: ['Árbol de Nodos', 'Señales', 'Grupos', 'Instancias'],
    title: 'Nodos y Escenas'
  },
  player: {
    pages: ['CharacterBody2D', 'Input & Movimiento', 'Animaciones', 'Cámara 2D'],
    title: 'Jugador 2D'
  },
  metroidvania: {
    pages: ['Diseño de Salas', 'TileMap 2D', 'Sistema de Habilidades', 'Enemigos & IA', 'Transiciones'],
    title: 'Metroidvania'
  },
  pixelart: {
    pages: ['Config Proyecto', 'AnimatedSprite2D', 'Luces 2D', 'Shaders Pixel'],
    title: 'Pixel Art'
  },
  sistemas: {
    pages: ['Save/Load', 'HUD & UI', 'Audio', 'Autoloads'],
    title: 'Sistemas'
  },
  reference: {
    pages: ['Cheat Sheet', 'Patrones comunes', 'Recursos externos'],
    title: 'Referencia'
  },
  build: {
    pages: ['Blueprint'],
    title: 'Build the Game'
  }
};

const QUIZZES = {
  study: {
    q: '¿Cuál es la mejor forma de aprender con esta guía?',
    options: [
      ['Solo leer el código', false],
      ['Leer, modificar y construir tu proyecto en paralelo', true],
      ['Memorizar cada función', false],
      ['Saltar directo a la sección Build', false]
    ],
    ok: 'Leer, modificar el código de ejemplo y construir tu propio proyecto es la forma más efectiva.',
    ko: 'La combinación de lectura + modificación + proyecto propio es lo que realmente funciona.'
  },
  intro: {
    q: '¿Qué nodo raíz es el más apropiado para una escena 2D normal?',
    options: [
      ['Node2D', true],
      ['ViewportTexture', false],
      ['AudioStreamPlayer', false],
      ['Control', false]
    ],
    ok: 'Node2D es la base 2D. Mantiene transformación espacial y sirve como raíz limpia.',
    ko: 'La respuesta correcta es Node2D.'
  },
  gdscript: {
    q: '¿Qué anotación expone una variable en el Inspector?',
    options: [
      ['@onready', false],
      ['@export', true],
      ['@signal', false],
      ['@static', false]
    ],
    ok: '@export expone la variable en el Inspector.',
    ko: 'La respuesta correcta es @export.'
  },
  nodes: {
    q: '¿Qué sistema de Godot desacopla eventos entre nodos?',
    options: [
      ['Groups', false],
      ['Signals', true],
      ['Autoloads', false],
      ['Resources', false]
    ],
    ok: 'Signals permiten comunicación sin acoplamiento fuerte.',
    ko: 'La respuesta correcta es Signals.'
  },
  player: {
    q: '¿Dónde debe ir el movimiento del jugador?',
    options: [
      ['_ready()', false],
      ['_process()', false],
      ['_physics_process()', true],
      ['_input()', false]
    ],
    ok: '_physics_process() es el lugar correcto para movimiento y física.',
    ko: 'La respuesta correcta es _physics_process().'
  },
  metroidvania: {
    q: '¿Qué autoload carga y descarga salas?',
    options: [
      ['GameManager', false],
      ['RoomManager', true],
      ['SaveSystem', false],
      ['AbilitySystem', false]
    ],
    ok: 'RoomManager coordina la navegación de salas.',
    ko: 'La respuesta correcta es RoomManager.'
  },
  pixelart: {
    q: '¿Qué filtro evita blur en sprites pixel art?',
    options: [
      ['Linear', false],
      ['Anisotropic', false],
      ['Nearest', true],
      ['Bilinear', false]
    ],
    ok: 'Nearest mantiene bordes duros y evita filtrado.',
    ko: 'La respuesta correcta es Nearest.'
  },
  sistemas: {
    q: '¿Qué ruta es apropiada para guardar partidas en Godot?',
    options: [
      ['res://', false],
      ['user://', true],
      ['root://', false],
      ['tmp://', false]
    ],
    ok: 'user:// apunta al almacenamiento de usuario, no al paquete de proyecto.',
    ko: 'La respuesta correcta es user://.'
  },
  reference: {
    q: '¿Qué método libera un nodo al final del frame?',
    options: [
      ['queue_free()', true],
      ['free()', false],
      ['remove_child()', false],
      ['destroy()', false]
    ],
    ok: 'queue_free() libera el nodo de forma segura al final del frame.',
    ko: 'La respuesta correcta es queue_free().'
  },
  build: {
    q: 'Al pulsar F6 en la fase de setup, ¿qué debe pasar?',
    options: [
      ['La cámara hace zoom', false],
      ['El personaje cae con gravedad y se detiene en el suelo', true],
      ['Se abre el export preset', false],
      ['Se generan los shaders', false]
    ],
    ok: 'El checkpoint de setup es física básica funcionando sin errores.',
    ko: 'La respuesta correcta es que el personaje caiga y colisione con el suelo.'
  }
};

const BUILD_PHASES = [
  {
    key: 'setup',
    num: '0',
    label: 'Setup',
    title: 'Foundation / Project Boot',
    subtitle: 'Cold blue. Create the root scene, project settings, and first player loop.',
    theme: 'setup',
    diagramTitle: 'Scene diagram',
    diagram: [
      { x: 210, y: 20, w: 110, h: 34, label: 'World', type: 'Node2D', root: true },
      { x: 46, y: 92, w: 120, h: 34, label: 'Player', type: 'PackedScene', kind: 'child' },
      { x: 198, y: 92, w: 122, h: 34, label: 'Camera2D', type: 'child' },
      { x: 360, y: 92, w: 108, h: 34, label: 'Ground', type: 'StaticBody2D', kind: 'child' },
      { x: 48, y: 168, w: 120, h: 34, label: 'Script', type: 'Player.gd', kind: 'child' }
    ],
    links: [
      [0, 1], [0, 2], [0, 3], [1, 4]
    ],
    timeline: [
      ['Start', 'main.tscn only'],
      ['End', 'main.tscn + Player.tscn + Player.gd + Input Map']
    ],
    assets: [
      ['SPRITE HERE', 'Player 32x32 PNG, 4 frames, nearest filter, transparent background.'],
      ['SPRITE HERE', 'Ground tile 16x16 PNG, loopable edges, lossless import.']
    ],
    checkpoint: 'Press F6. The player must fall with gravity, collide with the ground, and stop. If not, verify the collision shape and the physics code.',
    codeFile: 'player.gd',
    codeLang: 'GDScript',
    code: `extends CharacterBody2D
class_name Player

@export var speed := 160.0
const GRAVITY := 980.0

func _physics_process(delta: float) -> void:
    if not is_on_floor():
        velocity.y += GRAVITY * delta
    velocity.x = Input.get_axis("move_left", "move_right") * speed
    if Input.is_action_just_pressed("jump") and is_on_floor():
        velocity.y = -340.0
    move_and_slide()`,
    reference: ['Node2D', 'CharacterBody2D', '_physics_process', 'move_and_slide']
  },
  {
    key: 'movement',
    num: '1',
    label: 'Movement',
    title: 'Input / Jump Feel',
    subtitle: 'Terminal green. Add coyote time, input map, and animation state switching.',
    theme: 'movement',
    diagramTitle: 'Node order',
    diagram: [
      { x: 220, y: 18, w: 100, h: 34, label: 'Player', type: 'CharacterBody2D', root: true },
      { x: 54, y: 96, w: 118, h: 34, label: 'Sprite', type: 'AnimatedSprite2D', kind: 'child' },
      { x: 204, y: 96, w: 118, h: 34, label: 'Collision', type: 'CollisionShape2D', kind: 'child' },
      { x: 354, y: 96, w: 116, h: 34, label: 'Input', type: 'Actions', kind: 'child' }
    ],
    links: [[0, 1], [0, 2], [0, 3]],
    timeline: [['Start', 'Player.gd from setup'], ['End', 'Player.gd + Input Map + animation states']],
    assets: [['SPRITE HERE', 'Spritesheet 64x32, 4 run frames, 4 idle frames, import as SpriteFrames.']],
    checkpoint: 'Press F6 and verify left/right input, jump buffering, and coyote time. If the jump feels sticky, inspect delta handling and floor checks.',
    codeFile: 'input_movement.gd',
    codeLang: 'GDScript',
    code: `@export var coyote_time := 0.12
@export var jump_buffer := 0.10
var coyote_timer := 0.0
var buffer_timer := 0.0

func _physics_process(delta: float) -> void:
    if is_on_floor():
        coyote_timer = coyote_time
    else:
        coyote_timer -= delta

    if Input.is_action_just_pressed("jump"):
        buffer_timer = jump_buffer
    else:
        buffer_timer -= delta

    if buffer_timer > 0.0 and coyote_timer > 0.0:
        velocity.y = -340.0
        buffer_timer = 0.0
        coyote_timer = 0.0`,
    reference: ['Input Map', 'coyote_time', 'jump_buffer', 'velocity']
  },
  {
    key: 'world',
    num: '2',
    label: 'World',
    title: 'Rooms / Tile Grid',
    subtitle: 'Earth brown. Build the room structure, tile layers, and streaming room manager.',
    theme: 'world',
    diagramTitle: 'Room stack',
    diagram: [
      { x: 220, y: 18, w: 100, h: 34, label: 'World', type: 'Node2D', root: true },
      { x: 54, y: 96, w: 130, h: 34, label: 'RoomManager', type: 'Autoload', kind: 'child' },
      { x: 212, y: 96, w: 116, h: 34, label: 'TileMap', type: 'TileMapLayer', kind: 'child' },
      { x: 356, y: 96, w: 112, h: 34, label: 'Door', type: 'Area2D', kind: 'child' }
    ],
    links: [[0, 1], [0, 2], [0, 3]],
    timeline: [['Start', 'Main scene only'], ['End', 'rooms/ + tiles/ + autoload room manager']],
    assets: [['SPRITE HERE', 'Tileset atlas 16x16 or 32x32, lossless PNG, repeat disabled.']],
    checkpoint: 'Press F6. The player should spawn inside a room, hit tile collisions, and survive room transitions without teleport glitches.',
    codeFile: 'RoomManager.gd',
    codeLang: 'GDScript',
    code: `extends Node
class_name RoomManager

var current_room: Node = null

func load_room(path: String, spawn_point: String = "default") -> void:
    if current_room:
        current_room.queue_free()
        await get_tree().process_frame
    current_room = load(path).instantiate()
    get_tree().current_scene.add_child(current_room)`,
    reference: ['TileMapLayer', 'load()', 'instantiate()', 'queue_free()']
  },
  {
    key: 'states',
    num: '3',
    label: 'States',
    title: 'State Machine / Signals',
    subtitle: 'Electric violet. Give the player readable states and event-driven damage flow.',
    theme: 'states',
    diagramTitle: 'Behavior graph',
    diagram: [
      { x: 220, y: 18, w: 100, h: 34, label: 'Player', type: 'State machine', root: true },
      { x: 44, y: 96, w: 112, h: 34, label: 'Idle', type: 'State', kind: 'child' },
      { x: 180, y: 96, w: 112, h: 34, label: 'Run', type: 'State', kind: 'child' },
      { x: 316, y: 96, w: 118, h: 34, label: 'Jump', type: 'State', kind: 'child' },
      { x: 180, y: 168, w: 132, h: 34, label: 'health_changed', type: 'signal', kind: 'child' }
    ],
    links: [[0, 1], [0, 2], [0, 3], [0, 4]],
    timeline: [['Start', 'Movement loop exists'], ['End', 'Player.gd + signals + HUD events']],
    assets: [['SPRITE HERE', 'State icons 24x24 optional, transparent PNG, one per state.']],
    checkpoint: 'Press F6 and trigger a hit. The player should react, the state should change, and the HUD must update without direct coupling.',
    codeFile: 'PlayerStates.gd',
    codeLang: 'GDScript',
    code: `signal health_changed(value: int)

enum State { IDLE, RUN, JUMP, FALL, HURT }
var state: State = State.IDLE

func take_damage(amount: int) -> void:
    health = max(0, health - amount)
    health_changed.emit(health)`,
    reference: ['signal', 'enum', 'emit()', 'State']
  },
  {
    key: 'danger',
    num: '4',
    label: 'Danger',
    title: 'Enemies / Hazards',
    subtitle: 'Deep red. Add enemies, spikes, and readable failure states.',
    theme: 'danger',
    diagramTitle: 'Threat tree',
    diagram: [
      { x: 220, y: 18, w: 100, h: 34, label: 'Enemy', type: 'CharacterBody2D', root: true },
      { x: 52, y: 96, w: 106, h: 34, label: 'AI', type: 'State machine', kind: 'child' },
      { x: 182, y: 96, w: 108, h: 34, label: 'Hitbox', type: 'Area2D', kind: 'child' },
      { x: 314, y: 96, w: 122, h: 34, label: 'Spike', type: 'Hazard', kind: 'child' }
    ],
    links: [[0, 1], [0, 2], [0, 3]],
    timeline: [['Start', 'Player damage exists'], ['End', 'enemy_base.gd + hazards + death feedback']],
    assets: [['SPRITE HERE', 'Enemy sprite sheet 32x32, 6 frames patrol, 4 frames hurt.']],
    checkpoint: 'Press F6. Enemies must patrol or chase, hazards must damage the player, and death should be explicit instead of silent.',
    codeFile: 'enemy_base.gd',
    codeLang: 'GDScript',
    code: `extends CharacterBody2D

func _physics_process(delta: float) -> void:
    if not is_on_floor():
        velocity.y += 980.0 * delta
    move_and_slide()`,
    reference: ['Area2D', 'move_and_slide()', 'take_damage()', 'queue_free()']
  },
  {
    key: 'interconnect',
    num: '5',
    label: 'Interconnection',
    title: 'Save / HUD / Audio',
    subtitle: 'Deep cyan. Connect the experience into a single usable loop.',
    theme: 'interconnect',
    diagramTitle: 'System bus',
    diagram: [
      { x: 220, y: 18, w: 100, h: 34, label: 'GameManager', type: 'autoload', root: true },
      { x: 48, y: 96, w: 118, h: 34, label: 'SaveSystem', type: 'autoload', kind: 'child' },
      { x: 196, y: 96, w: 110, h: 34, label: 'HUD', type: 'CanvasLayer', kind: 'child' },
      { x: 336, y: 96, w: 122, h: 34, label: 'AudioManager', type: 'autoload', kind: 'child' }
    ],
    links: [[0, 1], [0, 2], [0, 3]],
    timeline: [['Start', 'Core gameplay loop'], ['End', 'autoloads + save files + UI feedback']],
    assets: [['SPRITE HERE', 'HUD icons 16x16 in a PNG atlas, transparent background.']],
    checkpoint: 'Press F6, then save and reload. The room state, health, and abilities should come back after a refresh or reload.',
    codeFile: 'SaveSystem.gd',
    codeLang: 'GDScript',
    code: `const SAVE_PATH := "user://savegame.json"

func save(data: Dictionary) -> void:
    var file := FileAccess.open(SAVE_PATH, FileAccess.WRITE)
    file.store_string(JSON.stringify(data))

func load_game() -> Dictionary:
    if not FileAccess.file_exists(SAVE_PATH):
        return {}`,
    reference: ['user://', 'Autoload', 'FileAccess', 'JSON.stringify()']
  },
  {
    key: 'progression',
    num: '6',
    label: 'Progression',
    title: 'Abilities / Doors',
    subtitle: 'Golden energy. Expand the map with gated abilities and readable unlocks.',
    theme: 'progression',
    diagramTitle: 'Unlock flow',
    diagram: [
      { x: 220, y: 18, w: 100, h: 34, label: 'AbilitySystem', type: 'autoload', root: true },
      { x: 48, y: 96, w: 120, h: 34, label: 'Double Jump', type: 'unlock', kind: 'child' },
      { x: 190, y: 96, w: 108, h: 34, label: 'Dash', type: 'unlock', kind: 'child' },
      { x: 320, y: 96, w: 126, h: 34, label: 'DoorTrigger', type: 'Area2D', kind: 'child' }
    ],
    links: [[0, 1], [0, 2], [0, 3]],
    timeline: [['Start', 'Save/load works'], ['End', 'abilities + locked doors + checkpoints']],
    assets: [['SPRITE HERE', 'Power-up sprite 24x24, 1 frame or 4-frame sparkle, PNG.']],
    checkpoint: 'Press F6. You should be able to unlock an ability, reopen the save, and see a door react to the unlock state.',
    codeFile: 'AbilitySystem.gd',
    codeLang: 'GDScript',
    code: `var abilities := {
    "double_jump": false,
    "dash": false
}

func unlock(name: String) -> void:
    if abilities.has(name):
        abilities[name] = true`,
    reference: ['Dictionary', 'Autoload', 'ability_unlocked', 'DoorTrigger']
  },
  {
    key: 'polish',
    num: '7',
    label: 'Polish',
    title: 'Camera / FX / Shader Layer',
    subtitle: 'White over black. Add impact, flash, screenshake, and visual clarity.',
    theme: 'polish',
    diagramTitle: 'Finish layer',
    diagram: [
      { x: 220, y: 18, w: 100, h: 34, label: 'Camera2D', type: 'follow', root: true },
      { x: 54, y: 96, w: 116, h: 34, label: 'Shake', type: 'Tween', kind: 'child' },
      { x: 198, y: 96, w: 118, h: 34, label: 'Flash', type: 'Shader', kind: 'child' },
      { x: 344, y: 96, w: 116, h: 34, label: 'Particles', type: 'FX', kind: 'child' }
    ],
    links: [[0, 1], [0, 2], [0, 3]],
    timeline: [['Start', 'Playable loop exists'], ['End', 'camera shake + flash shader + clean feedback']],
    assets: [['SPRITE HERE', 'Hit flash texture or shader-driven white overlay, no network dependency.']],
    checkpoint: 'Press F6 after taking damage. The screen should flash, the camera should move with intention, and the result should feel punchy.',
    codeFile: 'camera2d.gd',
    codeLang: 'GDScript',
    code: `func shake(strength: float, duration: float) -> void:
    var tween := create_tween()
    tween.tween_property(self, "offset", Vector2.ZERO, duration)`,
    reference: ['Camera2D', 'create_tween()', 'ShaderMaterial', 'CanvasLayer']
  },
  {
    key: 'export',
    num: '8',
    label: 'Export',
    title: 'Ship / macOS Package',
    subtitle: 'Metallic silver. Final checks, export presets, and a release checklist.',
    theme: 'export',
    diagramTitle: 'Release pipeline',
    diagram: [
      { x: 220, y: 18, w: 100, h: 34, label: 'Project', type: 'clean', root: true },
      { x: 50, y: 96, w: 110, h: 34, label: 'Export', type: 'Preset', kind: 'child' },
      { x: 186, y: 96, w: 116, h: 34, label: 'QA', type: 'F6 / refresh', kind: 'child' },
      { x: 332, y: 96, w: 128, h: 34, label: 'Archive', type: 'zip/dmg', kind: 'child' }
    ],
    links: [[0, 1], [0, 2], [0, 3]],
    timeline: [['Start', 'All gameplay systems complete'], ['End', 'export preset + release build + QA pass']],
    assets: [['SPRITE HERE', 'App icon 1024x1024 PNG, sRGB, no transparency issues.']],
    checkpoint: 'Press F6 one last time. If anything fails here, stop and fix it before exporting. Shipping broken builds is the most expensive bug.',
    codeFile: 'export.cfg',
    codeLang: 'Config',
    code: `[preset.0]
name="macOS"
platform="macOS"
export_path="dist/Game.app"

[preset.0.options]
application/name="Your Game"
application/icon="res://icon.png"`,
    reference: ['Export Preset', 'App icon', 'QA pass', 'dist/']
  }
];

const visited = new Set();
const TOTAL_PAGES = Object.values(PAGES).reduce((s, v) => s + v.pages.length, 0);
const sectionTitles = Object.fromEntries(Object.entries(PAGES).map(([key, value]) => [key, value.title]));
const buildSectionId = 'section-build';

let currentSection = 'intro';
let currentPage = 'El Entorno';
let buildPhase = 0;
let lastState = null;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function saveState() {
  const payload = {
    currentSection,
    currentPage,
    buildPhase,
    codeOnly: document.body.classList.contains('code-only'),
    visited: [...visited],
    openSections: [...document.querySelectorAll('.tree-section.open')].map(el => el.dataset.section),
    checks: [...document.querySelectorAll('.checklist li.done')].map(li => li.dataset.persistKey || li.textContent.trim())
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
}

function updateProgress() {
  const pct = Math.round((visited.size / TOTAL_PAGES) * 100);
  document.getElementById('progress-text').textContent = pct + '%';
  document.getElementById('progress-fill').style.width = pct + '%';
}

function setFlash() {
  document.body.classList.add('flash-transition');
  window.setTimeout(() => {
    document.body.classList.remove('flash-transition');
  }, 160);
}

function syncBuildPhase() {
  document.querySelectorAll('.build-phase-shell').forEach((el, i) => {
    el.classList.toggle('active', i === buildPhase);
  });
  document.querySelectorAll('.phase-switcher button').forEach((btn, i) => {
    btn.classList.toggle('active', i === buildPhase);
  });
  document.querySelectorAll('.build-phase-card').forEach((card, i) => {
    card.classList.toggle('active', i === buildPhase);
  });
}

function setActiveSidebarItem(pageName) {
  const items = [...document.querySelectorAll('.tree-item')];
  items.forEach(i => i.classList.remove('active'));
  const target = items.find(i => {
    const text = i.textContent.trim();
    const fn = i.getAttribute('onclick') || '';
    return fn.includes(`'${pageName}'`) || fn.includes(`"${pageName}"`) || text.includes(pageName);
  });
  if (target) {
    target.classList.add('active');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
    });
  }
}

function openSidebarSection(sectionKey) {
  document.querySelectorAll('.tree-section').forEach(ts => {
    if (ts.dataset.section === sectionKey) {
      ts.classList.add('open');
    }
  });
}

function navigate(sectionKey, sectionTitle, pageName, options = {}) {
  const sec = document.getElementById('section-' + sectionKey);
  if (!sec) return;

  document.querySelectorAll('.section').forEach(s => s.classList.remove('active-section'));
  sec.classList.add('active-section');

  const sData = PAGES[sectionKey];
  if (sData) {
    sData.pages.forEach(p => {
      const el = document.getElementById('page-' + p);
      if (el) el.style.display = p === pageName ? 'block' : 'none';
    });
  }

  document.getElementById('bc-section').textContent = sectionTitle;
  document.getElementById('bc-page').textContent = pageName;

  currentSection = sectionKey;
  currentPage = pageName;

  if (sectionKey === 'build' && options.noSync !== true) {
    buildPhase = typeof options.phase === 'number' ? options.phase : buildPhase;
    syncBuildPhase();
  }

  openSidebarSection(sectionKey);
  setActiveSidebarItem(pageName);

  if (options.flash !== false) {
    setFlash();
  }

  if (sec) {
    sec.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  closeSidebar();

  visited.add(sectionKey + ':' + pageName);
  updateProgress();

  if (!options.skipSave) saveState();
}

function toggleSection(el) {
  const section = el.parentElement;
  section.classList.toggle('open');
  saveState();
}

function renderQuiz(sectionKey) {
  const quiz = QUIZZES[sectionKey];
  if (!quiz) return '';
  const options = quiz.options.map(([label, correct], index) => `
    <div class="quiz-opt" onclick="answer(this, ${correct})"><span>${String.fromCharCode(65 + index)}</span> ${label}</div>
  `).join('');
  return `
    <div class="quiz" data-quiz="${sectionKey}">
      <div class="quiz-q">${escapeHtml(quiz.q)}</div>
      <div class="quiz-options">${options}</div>
      <div class="quiz-feedback"></div>
    </div>
  `;
}

function injectQuizzes() {
  Object.keys(QUIZZES).forEach(sectionKey => {
    const section = document.getElementById('section-' + sectionKey);
    if (!section || sectionKey === 'build') return;
    const footer = section.querySelector('.nav-footer');
    if (!footer || section.querySelector('.quiz')) return;
    footer.insertAdjacentHTML('beforebegin', renderQuiz(sectionKey));
  });
}

function makeNodeDiagram(phase) {
  const width = 520;
  const height = 230;
  const nodes = phase.diagram.map((node, index) => {
    const cls = node.root ? 'node-box node-root' : 'node-box node-child';
    const x = node.x;
    const y = node.y;
    return `
      <g class="node-hit" tabindex="0" transform="translate(${x},${y})">
        <rect class="${cls}" rx="10" ry="10" width="${node.w}" height="${node.h}"></rect>
        <text class="node-label" x="12" y="18">${escapeHtml(node.label)}</text>
        <text class="node-type" x="12" y="28">${escapeHtml(node.type)}</text>
      </g>
    `;
  }).join('');
  const lines = phase.links.map(([a, b]) => {
    const from = phase.diagram[a];
    const to = phase.diagram[b];
    const x1 = from.x + from.w / 2;
    const y1 = from.y + from.h;
    const x2 = to.x + to.w / 2;
    const y2 = to.y;
    return `<path class="node-link" d="M ${x1} ${y1} C ${x1} ${y1 + 22}, ${x2} ${y2 - 18}, ${x2} ${y2}"></path>`;
  }).join('');
  return `
    <svg class="node-diagram" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(phase.diagramTitle)}">
      <rect x="0" y="0" width="${width}" height="${height}" fill="rgba(13,17,23,.24)"></rect>
      ${lines}
      ${nodes}
    </svg>
  `;
}

function makeTimeline(rows) {
  return `
    <table class="timeline">
      <thead><tr><th>Moment</th><th>Filesystem</th></tr></thead>
      <tbody>
        ${rows.map(([a, b]) => `<tr><td>${escapeHtml(a)}</td><td>${escapeHtml(b)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;
}

function makeAssets(assets) {
  return `<div class="phase-assets">${assets.map(([title, desc]) => `
    <div class="asset-slot"><strong>${escapeHtml(title)}</strong>${escapeHtml(desc)}</div>
  `).join('')}</div>`;
}

function makeReference(refs) {
  return `<div class="phase-reference">${refs.map(ref => `<button type="button" class="ref-chip" onclick="navigate('reference','Referencia','Cheat Sheet')">${escapeHtml(ref)}</button>`).join('')}</div>`;
}

function makeCodeBlock(fileName, lang, code) {
  return `
    <div class="code-block">
      <div class="code-block-header">
        <span class="lang">${escapeHtml(lang)}</span>
        <span class="file-name">${escapeHtml(fileName)}</span>
        <button class="copy-btn" onclick="copyCode(this)">Copiar</button>
      </div>
      <pre><code>${escapeHtml(code)}</code></pre>
    </div>
  `;
}

function renderBuildSection() {
  const mount = document.getElementById('build-mount');
  if (!mount) return;

  mount.innerHTML = `
    <div class="section-header" data-divider="BLUEPRINT">
      <span class="section-number">08</span>
      <div>
        <div class="section-title">Build the Game <span class="dim">// Blueprint</span></div>
      </div>
    </div>
    <p>Three layers: a brutalist index, a phase-by-phase blueprint, and a quick reference per phase. Hover the index items to change the atmosphere and click into a specific phase.</p>
    <div class="build-index">
      ${BUILD_PHASES.map((phase, index) => `
        <div class="build-phase-card" data-phase="${String(index).padStart(2, '0')}" onclick="setBuildPhase(${index}, { openSection: true })">
          <div>
            <div class="build-phase-label">${escapeHtml(phase.label)}</div>
            <div class="build-phase-sub">${escapeHtml(phase.subtitle)}</div>
          </div>
          <div class="build-phase-go">enter phase</div>
        </div>
      `).join('')}
    </div>
    <div class="phase-switcher">
      ${BUILD_PHASES.map((phase, index) => `<button type="button" onclick="setBuildPhase(${index}, { openSection: true })">${String(index).padStart(2, '0')} ${escapeHtml(phase.label)}</button>`).join('')}
    </div>
    ${BUILD_PHASES.map((phase, index) => `
      <div class="build-phase-shell" id="build-phase-${index}" data-theme="${phase.theme}">
        <div class="phase-head" data-num="${String(index).padStart(2, '0')}">
          <h3>${escapeHtml(phase.title)}</h3>
          <p>${escapeHtml(phase.subtitle)}</p>
        </div>
        <div class="build-phase-grid">
          <div class="phase-panel">
            <h4>${escapeHtml(phase.diagramTitle)}</h4>
            ${makeNodeDiagram(phase)}
            <h4>File timeline</h4>
            ${makeTimeline(phase.timeline)}
            <h4>Asset slots</h4>
            ${makeAssets(phase.assets)}
          </div>
          <div class="phase-panel">
            <h4>Testing checkpoint</h4>
            <p>${escapeHtml(phase.checkpoint)}</p>
            <h4>The code</h4>
            ${makeCodeBlock(phase.codeFile, phase.codeLang, phase.code)}
            <h4>Quick reference</h4>
            ${makeReference(phase.reference)}
          </div>
        </div>
      </div>
    `).join('')}
    <div class="nav-footer">
      <button class="nav-btn" onclick="navigate('reference','Referencia','Recursos externos')">
        <span class="nav-dir">← Anterior</span>
        <span>Referencia</span>
      </button>
      <div></div>
    </div>
    ${renderQuiz('build')}
  `;

  setBuildPhase(lastState && typeof lastState.buildPhase === 'number' ? lastState.buildPhase : buildPhase, { persist: false });
}

function setBuildPhase(index, options = {}) {
  buildPhase = Math.max(0, Math.min(BUILD_PHASES.length - 1, index));
  syncBuildPhase();
  if (options.openSection) {
    navigate('build', 'Build the Game', 'Blueprint', { flash: true, skipSave: false, phase: buildPhase, noSync: true });
  }
  if (options.persist !== false) saveState();
}

function replaceNodeDiagrams() {
  const diagrams = [
    `
      <svg class="node-diagram" viewBox="0 0 520 220" role="img" aria-label="Scene tree diagram">
        <rect width="520" height="220" fill="rgba(13,17,23,.18)"></rect>
        <path class="node-link" d="M 260 54 C 260 76, 120 82, 120 100"></path>
        <path class="node-link" d="M 260 54 C 260 76, 260 82, 260 100"></path>
        <path class="node-link" d="M 260 54 C 260 76, 400 82, 400 100"></path>
        <g class="node-hit" transform="translate(206,20)"><rect class="node-box node-root" rx="10" ry="10" width="108" height="34"></rect><text class="node-label" x="12" y="18">World</text><text class="node-type" x="12" y="28">Node2D</text></g>
        <g class="node-hit" transform="translate(64,100)"><rect class="node-box node-child" rx="10" ry="10" width="112" height="34"></rect><text class="node-label" x="12" y="18">Player</text><text class="node-type" x="12" y="28">CharacterBody2D</text></g>
        <g class="node-hit" transform="translate(202,100)"><rect class="node-box node-child" rx="10" ry="10" width="116" height="34"></rect><text class="node-label" x="12" y="18">TileMap</text><text class="node-type" x="12" y="28">TileMapLayer</text></g>
        <g class="node-hit" transform="translate(350,100)"><rect class="node-box node-child" rx="10" ry="10" width="120" height="34"></rect><text class="node-label" x="12" y="18">Camera2D</text><text class="node-type" x="12" y="28">Camera2D</text></g>
      </svg>
    `,
    `
      <svg class="node-diagram" viewBox="0 0 520 220" role="img" aria-label="Player diagram">
        <rect width="520" height="220" fill="rgba(13,17,23,.18)"></rect>
        <path class="node-link" d="M 260 54 C 260 76, 92 82, 92 100"></path>
        <path class="node-link" d="M 260 54 C 260 76, 228 82, 228 100"></path>
        <path class="node-link" d="M 260 54 C 260 76, 364 82, 364 100"></path>
        <g class="node-hit" transform="translate(206,20)"><rect class="node-box node-root" rx="10" ry="10" width="108" height="34"></rect><text class="node-label" x="12" y="18">Player</text><text class="node-type" x="12" y="28">CharacterBody2D</text></g>
        <g class="node-hit" transform="translate(40,100)"><rect class="node-box node-child" rx="10" ry="10" width="104" height="34"></rect><text class="node-label" x="12" y="18">Sprite</text><text class="node-type" x="12" y="28">AnimatedSprite2D</text></g>
        <g class="node-hit" transform="translate(186,100)"><rect class="node-box node-child" rx="10" ry="10" width="90" height="34"></rect><text class="node-label" x="12" y="18">Body</text><text class="node-type" x="12" y="28">Collision</text></g>
        <g class="node-hit" transform="translate(320,100)"><rect class="node-box node-child" rx="10" ry="10" width="108" height="34"></rect><text class="node-label" x="12" y="18">SFX</text><text class="node-type" x="12" y="28">AudioStreamPlayer2D</text></g>
      </svg>
    `,
    `
      <svg class="node-diagram" viewBox="0 0 520 220" role="img" aria-label="Lighting diagram">
        <rect width="520" height="220" fill="rgba(13,17,23,.18)"></rect>
        <path class="node-link" d="M 260 54 C 260 76, 104 82, 104 100"></path>
        <path class="node-link" d="M 260 54 C 260 76, 260 82, 260 100"></path>
        <path class="node-link" d="M 260 54 C 260 76, 404 82, 404 100"></path>
        <g class="node-hit" transform="translate(206,20)"><rect class="node-box node-root" rx="10" ry="10" width="108" height="34"></rect><text class="node-label" x="12" y="18">World</text><text class="node-type" x="12" y="28">Node2D</text></g>
        <g class="node-hit" transform="translate(50,100)"><rect class="node-box node-child" rx="10" ry="10" width="108" height="34"></rect><text class="node-label" x="12" y="18">CanvasModulate</text><text class="node-type" x="12" y="28">ambient</text></g>
        <g class="node-hit" transform="translate(198,100)"><rect class="node-box node-child" rx="10" ry="10" width="124" height="34"></rect><text class="node-label" x="12" y="18">TorchLight</text><text class="node-type" x="12" y="28">PointLight2D</text></g>
        <g class="node-hit" transform="translate(344,100)"><rect class="node-box node-child" rx="10" ry="10" width="112" height="34"></rect><text class="node-label" x="12" y="18">PlayerLight</text><text class="node-type" x="12" y="28">PointLight2D</text></g>
      </svg>
    `
  ];

  document.querySelectorAll('.node-tree').forEach((el, index) => {
    if (diagrams[index]) el.innerHTML = diagrams[index];
  });
}

function restoreChecklistState(state) {
  const done = new Set((state && state.checks) || []);
  document.querySelectorAll('.checklist li').forEach(li => {
    const key = li.dataset.persistKey || li.textContent.trim();
    if (done.has(key)) {
      li.classList.add('done');
      const cb = li.querySelector('.cb');
      if (cb) cb.textContent = '✓';
    }
    li.dataset.persistKey = key;
  });
}

function toggleCodeOnly(enabled) {
  document.body.classList.toggle('code-only', enabled);
  saveState();
}

function answer(el, correct) {
  const opts = el.closest('.quiz-options').querySelectorAll('.quiz-opt');
  opts.forEach(o => (o.style.pointerEvents = 'none'));
  el.classList.add(correct ? 'correct' : 'wrong');

  const fb = el.closest('.quiz').querySelector('.quiz-feedback');
  fb.classList.add('show');
  if (correct) {
    fb.classList.add('ok');
    fb.textContent = 'Correcto. ' + (QUIZZES[el.closest('.quiz').dataset.quiz]?.ok || '');
  } else {
    fb.classList.add('ko');
    fb.textContent = 'No es correcto. ' + (QUIZZES[el.closest('.quiz').dataset.quiz]?.ko || '');
    opts.forEach(o => {
      if (o.getAttribute('onclick') && o.getAttribute('onclick').includes('true')) {
        o.classList.add('correct');
      }
    });
  }
}

function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  const text = pre.innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copiado';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copiar';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    btn.textContent = 'Error';
    setTimeout(() => {
      btn.textContent = 'Copiar';
    }, 2000);
  });
}

function toggleCheck(li) {
  li.classList.toggle('done');
  const cb = li.querySelector('.cb');
  if (cb) cb.textContent = li.classList.contains('done') ? '✓' : '';
  saveState();
}

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('visible');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('visible');
}

function initSectionLabels() {
  document.querySelectorAll('.section-header').forEach(header => {
    if (!header.dataset.divider) {
      const number = header.querySelector('.section-number');
      header.dataset.divider = number ? `SECTION ${number.textContent.trim()}` : 'SECTION';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    lastState = loadState();
    if (lastState && Array.isArray(lastState.visited)) {
      lastState.visited.forEach(v => visited.add(v));
    }
    if (lastState && typeof lastState.buildPhase === 'number') {
      buildPhase = lastState.buildPhase;
    }

    document.querySelectorAll('.tree-section').forEach(ts => ts.classList.remove('open'));
    const openSections = (lastState && lastState.openSections) || ['intro'];
    openSections.forEach(key => {
      const section = document.querySelector(`.tree-section[data-section="${key}"]`);
      if (section) section.classList.add('open');
    });
    if (!openSections.length) {
      document.querySelector('[data-section="intro"]')?.classList.add('open');
    }

    renderBuildSection();
    replaceNodeDiagrams();
    injectQuizzes();
    initSectionLabels();
    restoreChecklistState(lastState);

    const codeOnly = !!(lastState && lastState.codeOnly);
    const codeToggle = document.getElementById('code-only-toggle');
    if (codeToggle) codeToggle.checked = codeOnly;
    document.body.classList.toggle('code-only', codeOnly);

    const startSection = (lastState && lastState.currentSection && PAGES[lastState.currentSection]) ? lastState.currentSection : 'intro';
    const startPage = (lastState && lastState.currentPage) ? lastState.currentPage : 'El Entorno';
    navigate(startSection, sectionTitles[startSection], startPage, { flash: false, skipSave: true, phase: buildPhase });
    visited.clear();
    if (lastState && Array.isArray(lastState.visited)) {
      lastState.visited.forEach(v => visited.add(v));
    } else {
      visited.add('intro:El Entorno');
    }
    updateProgress();
    saveState();
  } catch (e) {
    console.error('Init error:', e);
  }
});
