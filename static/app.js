const MIN_TEMPO = 30;
const MAX_TEMPO = 400;
const TEMPO_STEP = 10;

const LANG_STORAGE_KEY = 'ear-training-lang';
const STRINGS = {
  en: {
    title: 'Ear Training',
    subtitle: 'Intervals',
    mode: 'Mode',
    harmonic: 'Harmonic',
    melodic: 'Melodic',
    tempo: 'Tempo',
    direction: 'Direction',
    ascendent: 'Ascendent',
    descendent: 'Descendent',
    anyDirection: 'Any',
    play: 'Play',
    decreaseTempo: 'Decrease tempo by 10',
    increaseTempo: 'Increase tempo by 10',
    theme: 'Theme',
    lightTheme: 'Light theme',
    darkTheme: 'Dark theme',
    homeSubtitle: 'Choose an exercise',
    intervalName: 'Intervals',
    intervalDesc: 'Identify the interval between two notes',
    back: 'Back',
    range: 'Range',
    withinOctave: 'Within octave',
    beyondOctaveOnly: 'Beyond octave',
    anyRange: 'Any',
    start: 'Start',
    next: 'Next',
    previous: 'Previous',
    interval0: 'Uni',
    interval1: 'm2',
    interval2: 'M2',
    interval3: 'm3',
    interval4: 'M3',
    interval5: 'P4',
    interval6: 'TT',
    interval7: 'P5',
    interval8: 'm6',
    interval9: 'M6',
    interval10: 'm7',
    interval11: 'M7',
    interval12: 'P8',
    interval0Full: 'Unison',
    interval1Full: 'Minor 2nd',
    interval2Full: 'Major 2nd',
    interval3Full: 'Minor 3rd',
    interval4Full: 'Major 3rd',
    interval5Full: 'Perfect 4th',
    interval6Full: 'Tritone',
    interval7Full: 'Perfect 5th',
    interval8Full: 'Minor 6th',
    interval9Full: 'Major 6th',
    interval10Full: 'Minor 7th',
    interval11Full: 'Major 7th',
    interval12Full: 'Perfect 8th',
    allowedIntervals: 'Allowed intervals',
    score: 'Score',
    correctCount: 'Correct',
    wrongCount: 'Wrong',
    debug: 'Debug',
    debugDesc: 'Diagnostics and tests',
    testLowestNote: 'Play lowest note',
    testHighestNote: 'Play highest note',
    customNote: 'Custom note',
    debugMnemonics: 'Interval Song Mnemonics',
    decreaseNote: 'Lower note',
    increaseNote: 'Raise note',
    english: 'English',
    spanish: 'Spanish',
    home: 'Home',
    finish: 'Finish',
    results: 'Results',
    totalTime: 'Total time',
    avgTime: 'Avg per interval',
    accuracy: 'Accuracy',
    chartTitle: 'Per interval',
    historyTitle: 'History',
    tableActual: 'Actual',
    tableGuess: 'Guess',
    tableResult: 'Result',
    tableTime: 'Time',
    noResults: 'No intervals played yet.',
    playMode: 'Game mode',
    modeFree: 'Free',
    modeTimed: 'Timed',
    modeStreak: 'Streak',
    chordName: 'Chords',
    chordDesc: 'Identify the chord type',
    allowedChords: 'Allowed chords',
    chordMajor: 'Major',
    chordMinor: 'Minor',
    chordAugmented: 'Augmented',
    chordDiminished: 'Diminished',
    chordInversions: 'Inversions',
    chordInversionsLabel: 'Include inversions',
    scaleName: 'Scales',
    scaleDesc: 'Identify the scale being played',
    allowedScales: 'Allowed scales',
    bothDirection: 'Both',
    scaleMajor: 'Major',
    scaleNaturalMinor: 'Natural minor',
    scaleHarmonicMinor: 'Harmonic minor',
    scaleMelodicMinor: 'Melodic minor',
    scaleDorian: 'Dorian',
    scalePhrygian: 'Phrygian',
    scaleLydian: 'Lydian',
    scaleMixolydian: 'Mixolydian',
    scaleLocrian: 'Locrian',
    scaleMajorPentatonic: 'Major pentatonic',
    scaleMinorPentatonic: 'Minor pentatonic',
    scaleBlues: 'Blues',
    scaleChromatic: 'Chromatic',
    scaleWholeTone: 'Whole tone',
    scaleDiminishedWH: 'Diminished (W-H)',
    scaleDiminishedHW: 'Diminished (H-W)',
    login: 'Log in',
    register: 'Register',
    logout: 'Log out',
    account: 'Account',
    loggedInAs: 'Logged in as',
    memberSince: 'Member since',
    username: 'Username',
    password: 'Password',
    newUsername: 'New username',
    newPassword: 'New password',
    currentPassword: 'Current password',
    confirmPassword: 'Confirm password',
    errPasswordMismatch: 'Passwords do not match.',
    save: 'Save',
    changeUsername: 'Change username',
    changePassword: 'Change password',
    deleteAccount: 'Delete account',
    deleteWarning: 'This will permanently delete your account and all your saved settings.',
    errInvalidCredentials: 'Invalid username or password.',
    errUsernameTaken: 'That username is already taken.',
    errPasswordTooShort: 'Password must be at least 6 characters.',
    errInvalidUsername: 'Username must be 3–32 characters: letters, digits, _ or -.',
    errInvalidPassword: 'Incorrect password.',
    errNetwork: 'Network error. Please try again.',
    usernameUpdated: 'Username updated.',
    passwordUpdated: 'Password updated.',
    stats: 'Stats',
    statsSubtitle: 'Your progress over time',
    statsLoginPrompt: 'Log in to track your stats across sessions.',
    statsExerciseEmpty: 'No data yet — finish a game to start tracking.',
    statGamesPlayed: 'Games played',
    statTotalGuesses: 'Total guesses',
    statAccuracy: 'Accuracy',
    statTimePlayed: 'Time played',
    statAvgResponse: 'Avg response',
    statBestStreak: 'Longest streak',
    statMostMissed: 'Most missed',
    statBestAt: 'Best at',
    statFirstPlayed: 'First played',
    statLastPlayed: 'Last played',
    statByPlayMode: 'By game mode',
    timeAgoJustNow: 'just now',
    timeAgoMinutes: 'min ago',
    timeAgoHours: 'h ago',
    timeAgoDays: 'd ago',
    controlPanel: 'Control panel',
    controlPanelSubtitle: 'Registered users',
    adminColUsername: 'User',
    adminColCreated: 'Created',
    adminColLastAccess: 'Last access',
    adminColStatus: 'Status',
    adminColActions: 'Actions',
    adminTotalUsers: 'Total users',
    adminNever: 'Never',
    adminStatusActive: 'Active',
    adminStatusLocked: 'Locked',
    adminStatusLockedPermanent: 'Locked (permanent)',
    adminUnlock: 'Unlock',
    adminUntil: 'until',
    adminConnections: 'Recent connections',
    adminColTime: 'Time',
    adminColPath: 'Page',
    adminColUser: 'User',
    adminColIP: 'IP',
    adminColUA: 'Browser',
    adminAnonymous: 'Anonymous',
    adminTotalConnections: 'Total connections',
    errAccountLockedTemporary: 'Account locked. Try again after {time}.',
    errAccountLockedPermanent: 'Account permanently locked. Contact an admin to unlock it.',
    hint: 'Hint',
    hintSlow: 'Slow replay',
    hintArpeggiate: 'Play arpeggiated',
    hintRootPosition: 'Root position',
    hintSong: 'Song mnemonic',
    hintEliminate: 'Eliminate an option',
  },
  es: {
    title: 'Entrenamiento auditivo',
    subtitle: 'Intervalos',
    mode: 'Modo',
    harmonic: 'Armónico',
    melodic: 'Melódico',
    tempo: 'Tempo',
    direction: 'Dirección',
    ascendent: 'Ascendente',
    descendent: 'Descendente',
    anyDirection: 'Cualquiera',
    play: 'Reproducir',
    decreaseTempo: 'Disminuir tempo en 10',
    increaseTempo: 'Aumentar tempo en 10',
    theme: 'Tema',
    lightTheme: 'Tema claro',
    darkTheme: 'Tema oscuro',
    homeSubtitle: 'Elige un ejercicio',
    intervalName: 'Intervalos',
    intervalDesc: 'Identifica el intervalo entre dos notas',
    back: 'Volver',
    range: 'Rango',
    withinOctave: 'Hasta octava',
    beyondOctaveOnly: 'Más de octava',
    anyRange: 'Cualquiera',
    start: 'Comenzar',
    next: 'Siguiente',
    previous: 'Anterior',
    interval0: 'Uní',
    interval1: '2m',
    interval2: '2M',
    interval3: '3m',
    interval4: '3M',
    interval5: '4J',
    interval6: 'TT',
    interval7: '5J',
    interval8: '6m',
    interval9: '6M',
    interval10: '7m',
    interval11: '7M',
    interval12: '8J',
    interval0Full: 'Unísono',
    interval1Full: '2ª menor',
    interval2Full: '2ª Mayor',
    interval3Full: '3ª menor',
    interval4Full: '3ª Mayor',
    interval5Full: '4ª Justa',
    interval6Full: 'Tritono',
    interval7Full: '5ª Justa',
    interval8Full: '6ª menor',
    interval9Full: '6ª Mayor',
    interval10Full: '7ª menor',
    interval11Full: '7ª Mayor',
    interval12Full: '8ª Justa',
    allowedIntervals: 'Intervalos permitidos',
    score: 'Puntuación',
    correctCount: 'Aciertos',
    wrongCount: 'Errores',
    debug: 'Depuración',
    debugDesc: 'Diagnóstico y pruebas',
    testLowestNote: 'Reproducir nota más grave',
    testHighestNote: 'Reproducir nota más aguda',
    customNote: 'Nota personalizada',
    debugMnemonics: 'Canciones mnemónicas de intervalos',
    decreaseNote: 'Bajar nota',
    increaseNote: 'Subir nota',
    english: 'Inglés',
    spanish: 'Español',
    home: 'Inicio',
    finish: 'Terminar',
    results: 'Resultados',
    totalTime: 'Tiempo total',
    avgTime: 'Promedio por intervalo',
    accuracy: 'Precisión',
    chartTitle: 'Por intervalo',
    historyTitle: 'Historial',
    tableActual: 'Real',
    tableGuess: 'Respuesta',
    tableResult: 'Resultado',
    tableTime: 'Tiempo',
    noResults: 'Aún no se han reproducido intervalos.',
    playMode: 'Modo de juego',
    modeFree: 'Libre',
    modeTimed: 'Por tiempo',
    modeStreak: 'Racha',
    chordName: 'Acordes',
    chordDesc: 'Identifica el tipo de acorde',
    allowedChords: 'Acordes permitidos',
    chordMajor: 'Mayor',
    chordMinor: 'Menor',
    chordAugmented: 'Aumentado',
    chordDiminished: 'Disminuido',
    chordInversions: 'Inversiones',
    chordInversionsLabel: 'Incluir inversiones',
    scaleName: 'Escalas',
    scaleDesc: 'Identifica la escala que se está reproduciendo',
    allowedScales: 'Escalas permitidas',
    bothDirection: 'Ambas',
    scaleMajor: 'Mayor',
    scaleNaturalMinor: 'Menor natural',
    scaleHarmonicMinor: 'Menor armónica',
    scaleMelodicMinor: 'Menor melódica',
    scaleDorian: 'Dórica',
    scalePhrygian: 'Frigia',
    scaleLydian: 'Lidia',
    scaleMixolydian: 'Mixolidia',
    scaleLocrian: 'Locria',
    scaleMajorPentatonic: 'Pentatónica mayor',
    scaleMinorPentatonic: 'Pentatónica menor',
    scaleBlues: 'Blues',
    scaleChromatic: 'Cromática',
    scaleWholeTone: 'Tonos enteros',
    scaleDiminishedWH: 'Disminuida (T-S)',
    scaleDiminishedHW: 'Disminuida (S-T)',
    login: 'Iniciar sesión',
    register: 'Registrarse',
    logout: 'Cerrar sesión',
    account: 'Cuenta',
    loggedInAs: 'Conectado como',
    memberSince: 'Miembro desde',
    username: 'Usuario',
    password: 'Contraseña',
    newUsername: 'Nuevo usuario',
    newPassword: 'Nueva contraseña',
    currentPassword: 'Contraseña actual',
    confirmPassword: 'Confirmar contraseña',
    errPasswordMismatch: 'Las contraseñas no coinciden.',
    save: 'Guardar',
    changeUsername: 'Cambiar usuario',
    changePassword: 'Cambiar contraseña',
    deleteAccount: 'Eliminar cuenta',
    deleteWarning: 'Esto eliminará permanentemente tu cuenta y todos los ajustes guardados.',
    errInvalidCredentials: 'Usuario o contraseña incorrectos.',
    errUsernameTaken: 'Ese nombre de usuario ya existe.',
    errPasswordTooShort: 'La contraseña debe tener al menos 6 caracteres.',
    errInvalidUsername: 'El usuario debe tener entre 3 y 32 caracteres: letras, dígitos, _ o -.',
    errInvalidPassword: 'Contraseña incorrecta.',
    errNetwork: 'Error de red. Inténtalo de nuevo.',
    usernameUpdated: 'Usuario actualizado.',
    passwordUpdated: 'Contraseña actualizada.',
    stats: 'Estadísticas',
    statsSubtitle: 'Tu progreso a lo largo del tiempo',
    statsLoginPrompt: 'Inicia sesión para guardar tus estadísticas entre sesiones.',
    statsExerciseEmpty: 'Aún no hay datos — termina una partida para empezar a registrar.',
    statGamesPlayed: 'Partidas jugadas',
    statTotalGuesses: 'Respuestas totales',
    statAccuracy: 'Precisión',
    statTimePlayed: 'Tiempo jugado',
    statAvgResponse: 'Tiempo de respuesta medio',
    statBestStreak: 'Mejor racha',
    statMostMissed: 'Más fallado',
    statBestAt: 'Mejor en',
    statFirstPlayed: 'Primera vez',
    statLastPlayed: 'Última partida',
    statByPlayMode: 'Por modo de juego',
    timeAgoJustNow: 'justo ahora',
    timeAgoMinutes: 'min',
    timeAgoHours: 'h',
    timeAgoDays: 'd',
    controlPanel: 'Panel de control',
    controlPanelSubtitle: 'Usuarios registrados',
    adminColUsername: 'Usuario',
    adminColCreated: 'Creado',
    adminColLastAccess: 'Último acceso',
    adminColStatus: 'Estado',
    adminColActions: 'Acciones',
    adminTotalUsers: 'Total de usuarios',
    adminNever: 'Nunca',
    adminStatusActive: 'Activa',
    adminStatusLocked: 'Bloqueada',
    adminStatusLockedPermanent: 'Bloqueada (permanente)',
    adminUnlock: 'Desbloquear',
    adminUntil: 'hasta',
    adminConnections: 'Conexiones recientes',
    adminColTime: 'Hora',
    adminColPath: 'Página',
    adminColUser: 'Usuario',
    adminColIP: 'IP',
    adminColUA: 'Navegador',
    adminAnonymous: 'Anónimo',
    adminTotalConnections: 'Total de conexiones',
    errAccountLockedTemporary: 'Cuenta bloqueada. Inténtalo de nuevo después de {time}.',
    errAccountLockedPermanent: 'Cuenta bloqueada permanentemente. Contacta a un administrador para desbloquearla.',
    hint: 'Pista',
    hintSlow: 'Reproducción lenta',
    hintArpeggiate: 'Reproducir arpegiado',
    hintRootPosition: 'Posición fundamental',
    hintSong: 'Canción mnemónica',
    hintEliminate: 'Eliminar una opción',
  },
};

let currentUser = null;
let currentUserCreatedAt = null;

function applyLanguage(lang) {
  const t = STRINGS[lang] || STRINGS.en;
  document.documentElement.lang = lang;
  document.title = t.title;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (t[k] !== undefined) el.textContent = t[k];
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const k = el.dataset.i18nAriaLabel;
    if (t[k] !== undefined) el.setAttribute('aria-label', t[k]);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const k = el.dataset.i18nTitle;
    if (t[k] !== undefined) el.setAttribute('title', t[k]);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const k = el.dataset.i18nPlaceholder;
    if (t[k] !== undefined) el.setAttribute('placeholder', t[k]);
  });
  if (typeof formatAbsoluteDate === 'function') {
    const createdEl = document.getElementById('stats-created');
    if (createdEl) createdEl.textContent = formatAbsoluteDate(currentUserCreatedAt) || '';
  }
  try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) {}
}

function getInitialLang() {
  try {
    const param = new URLSearchParams(location.search).get('lang');
    if (param && STRINGS[param]) {
      localStorage.setItem(LANG_STORAGE_KEY, param);
      const url = new URL(location.href);
      url.searchParams.delete('lang');
      history.replaceState(null, '', url.pathname + (url.search === '?' ? '' : url.search));
      return param;
    }
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && STRINGS[stored]) return stored;
  } catch (e) {}
  return 'en';
}

const initialLang = getInitialLang();
const initialLangRadio = document.querySelector(`input[name="lang"][value="${initialLang}"]`);
if (initialLangRadio) initialLangRadio.checked = true;
applyLanguage(initialLang);
document.querySelectorAll('input[name="lang"]').forEach(r => {
  r.addEventListener('change', () => applyLanguage(r.value));
});

const THEME_STORAGE_KEY = 'ear-training-theme';
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch (e) {}
}
const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
const initialThemeRadio = document.querySelector(`input[name="theme"][value="${initialTheme}"]`);
if (initialThemeRadio) initialThemeRadio.checked = true;
document.querySelectorAll('input[name="theme"]').forEach(r => {
  r.addEventListener('change', () => applyTheme(r.value));
});

const MODE_ICONS = {
  free:   '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  timed:  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>',
  streak: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
};

const ROUTES = {
  '/': 'view-home',
  '/interval-recognition': 'view-interval',
  '/interval-recognition/play': 'view-game',
  '/interval-recognition/results': 'view-results',
  '/chord-recognition': 'view-chord',
  '/chord-recognition/play': 'view-game',
  '/chord-recognition/results': 'view-results',
  '/scale-recognition': 'view-scale',
  '/scale-recognition/play': 'view-game',
  '/scale-recognition/results': 'view-results',
  '/debug': 'view-debug',
  '/account': 'view-account',
  '/stats': 'view-stats',
  '/admin': 'view-admin',
};

// Static metadata about the scales the user can recognise. The key matches
// the server's scale name; `i18n` is the label key used by STRINGS for
// localisation.
const SCALE_I18N_KEY = {
  major:            'scaleMajor',
  natural_minor:    'scaleNaturalMinor',
  harmonic_minor:   'scaleHarmonicMinor',
  melodic_minor:    'scaleMelodicMinor',
  dorian:           'scaleDorian',
  phrygian:         'scalePhrygian',
  lydian:           'scaleLydian',
  mixolydian:       'scaleMixolydian',
  locrian:          'scaleLocrian',
  major_pentatonic: 'scaleMajorPentatonic',
  minor_pentatonic: 'scaleMinorPentatonic',
  blues:            'scaleBlues',
  chromatic:        'scaleChromatic',
  whole_tone:       'scaleWholeTone',
  diminished_wh:    'scaleDiminishedWH',
  diminished_hw:    'scaleDiminishedHW',
};
const SCALE_KEYS = Object.keys(SCALE_I18N_KEY);

function exerciseBasePath(ex) {
  if ((ex || gameState.exercise) === 'chord') return '/chord-recognition';
  if ((ex || gameState.exercise) === 'scale') return '/scale-recognition';
  return '/interval-recognition';
}

function showRoute(path) {
  if ((path === '/debug' || path === '/admin') && currentUser !== 'admin') {
    // Admin-only screens — bounce non-admins back home.
    return navigate('/');
  }
  const viewId = ROUTES[path] || ROUTES['/'];
  // Only the config or play paths identify the exercise; /results inherits
  // whatever exercise the player just finished (so the route exists for each
  // exercise even though the view is shared).
  if (path === '/chord-recognition' || path === '/chord-recognition/play') {
    gameState.exercise = 'chord';
  } else if (path === '/scale-recognition' || path === '/scale-recognition/play') {
    gameState.exercise = 'scale';
  } else if (path === '/interval-recognition' || path === '/interval-recognition/play') {
    gameState.exercise = 'interval';
  }

  document.querySelectorAll('.view').forEach(el => {
    el.hidden = (el.id !== viewId);
  });

  if (viewId === 'view-game') {
    syncExerciseUI();
    resetGameState();
    playCurrentGroup();
    startGameTimer();
  } else {
    stopCurrentAudio();
    stopGameTimer();
  }
  if (viewId === 'view-results') {
    syncExerciseUI();
    renderResults();
  }
  if (viewId === 'view-stats') {
    renderStatsPage();
  }
  if (viewId === 'view-admin') {
    renderAdminPage();
  }
  window.scrollTo(0, 0);
}

function syncExerciseUI() {
  const ex = gameState.exercise;
  const intervalGrid = document.getElementById('interval-answers');
  const chordGrid = document.getElementById('chord-answers');
  const scaleGrid = document.getElementById('scale-answers');
  if (intervalGrid) intervalGrid.hidden = ex !== 'interval';
  if (chordGrid)    chordGrid.hidden = ex !== 'chord';
  if (scaleGrid)    scaleGrid.hidden = ex !== 'scale';
  const titleEl = document.getElementById('game-title');
  if (titleEl) {
    const lang = document.documentElement.lang || 'en';
    const key = ex === 'chord' ? 'chordName' : ex === 'scale' ? 'scaleName' : 'intervalName';
    titleEl.dataset.i18n = key;
    titleEl.textContent = (STRINGS[lang] || STRINGS.en)[key];
  }
  // Rewrite the shared game-view / results-view navigation routes so back
  // and finish land on the matching exercise's config / results pages.
  const base = exerciseBasePath(ex);
  const gameBack = document.querySelector('#view-game .back-btn');
  if (gameBack) gameBack.dataset.route = base;
  const gameFinish = document.getElementById('game-finish');
  if (gameFinish) gameFinish.dataset.route = `${base}/results`;
  const resultsBack = document.querySelector('#view-results .back-btn');
  if (resultsBack) resultsBack.dataset.route = base;
}

function navigate(path) {
  if (window.location.pathname !== path) {
    history.pushState({}, '', path);
  }
  showRoute(path);
}

document.querySelectorAll('[data-route]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    navigate(el.dataset.route);
  });
});

window.addEventListener('popstate', () => showRoute(window.location.pathname));

const tempoNumber = document.getElementById('tempo-number');
const tempoMinus = document.getElementById('tempo-minus');
const tempoPlus = document.getElementById('tempo-plus');
const melodicControls = document.getElementById('melodic-controls');
const modeInputs = document.querySelectorAll('input[name="mode"]');

function setTempo(v) {
  if (isNaN(v) || v < MIN_TEMPO) v = MIN_TEMPO;
  else if (v > MAX_TEMPO) v = MAX_TEMPO;
  tempoNumber.value = v;
}

function currentMode() {
  return document.querySelector('input[name="mode"]:checked').value;
}

function currentDirection() {
  return document.querySelector('input[name="direction"]:checked').value;
}

function updateMelodicVisibility() {
  melodicControls.classList.toggle('hidden', currentMode() === 'harmonic');
}
modeInputs.forEach(r => r.addEventListener('change', updateMelodicVisibility));
updateMelodicVisibility();

tempoNumber.addEventListener('change', () => {
  setTempo(parseInt(tempoNumber.value, 10));
});
tempoMinus.addEventListener('click', () => {
  setTempo((parseInt(tempoNumber.value, 10) || MIN_TEMPO) - TEMPO_STEP);
});
tempoPlus.addEventListener('click', () => {
  setTempo((parseInt(tempoNumber.value, 10) || MIN_TEMPO) + TEMPO_STEP);
});

// Scale recognition has its own independent tempo input (scales typically run
// faster than melodic interval drills, so the default and last-used value are
// stored separately from the interval tempo).
const scaleTempoNumber = document.getElementById('scale-tempo-number');
const scaleTempoMinus = document.getElementById('scale-tempo-minus');
const scaleTempoPlus = document.getElementById('scale-tempo-plus');

function setScaleTempo(v) {
  if (!scaleTempoNumber) return;
  if (isNaN(v) || v < MIN_TEMPO) v = MIN_TEMPO;
  else if (v > MAX_TEMPO) v = MAX_TEMPO;
  scaleTempoNumber.value = v;
}
scaleTempoNumber?.addEventListener('change', () => {
  setScaleTempo(parseInt(scaleTempoNumber.value, 10));
});
scaleTempoMinus?.addEventListener('click', () => {
  setScaleTempo((parseInt(scaleTempoNumber.value, 10) || MIN_TEMPO) - TEMPO_STEP);
});
scaleTempoPlus?.addEventListener('click', () => {
  setScaleTempo((parseInt(scaleTempoNumber.value, 10) || MIN_TEMPO) + TEMPO_STEP);
});

function captureAllowedIntervals() {
  const out = [];
  document.querySelectorAll('.interval-toggle[aria-pressed="true"]').forEach(btn => {
    out.push(parseInt(btn.dataset.interval, 10));
  });
  return out.length ? out : Array.from({ length: 13 }, (_, i) => i);
}

function captureAllowedScales() {
  const out = [];
  document.querySelectorAll('.scale-toggle[aria-pressed="true"]').forEach(btn => {
    if (btn.dataset.scale) out.push(btn.dataset.scale);
  });
  return out.length ? out : SCALE_KEYS.slice();
}

const CHORD_KEYS = ['major', 'minor', 'augmented', 'diminished'];

function captureAllowedChords() {
  const out = [];
  document.querySelectorAll('.chord-toggle[aria-pressed="true"]').forEach(btn => {
    if (btn.dataset.chord) out.push(btn.dataset.chord);
  });
  return out.length ? out : CHORD_KEYS.slice();
}

document.querySelectorAll('.chord-toggle[data-chord]').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOn = btn.getAttribute('aria-pressed') === 'true';
    if (isOn) {
      const onCount = document.querySelectorAll('.chord-toggle[data-chord][aria-pressed="true"]').length;
      if (onCount <= 2) return;
    }
    btn.setAttribute('aria-pressed', isOn ? 'false' : 'true');
  });
});

const chordInversionsBtn = document.getElementById('chord-inversions-btn');
if (chordInversionsBtn) {
  chordInversionsBtn.addEventListener('click', () => {
    const isOn = chordInversionsBtn.getAttribute('aria-pressed') === 'true';
    chordInversionsBtn.setAttribute('aria-pressed', isOn ? 'false' : 'true');
  });
}

document.querySelectorAll('.interval-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOn = btn.getAttribute('aria-pressed') === 'true';
    if (isOn) {
      const onCount = document.querySelectorAll('.interval-toggle[aria-pressed="true"]').length;
      if (onCount <= 2) return;
    }
    btn.setAttribute('aria-pressed', isOn ? 'false' : 'true');
  });
});

document.querySelectorAll('.scale-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOn = btn.getAttribute('aria-pressed') === 'true';
    if (isOn) {
      const onCount = document.querySelectorAll('.scale-toggle[aria-pressed="true"]').length;
      if (onCount <= 1) return;  // keep at least one selectable scale
    }
    btn.setAttribute('aria-pressed', isOn ? 'false' : 'true');
  });
});

function buildExerciseParams() {
  const mode = currentMode();
  const range = document.querySelector('input[name="range"]:checked').value;
  const params = new URLSearchParams({ mode });
  params.set('range', range);
  if (mode === 'melodic') {
    params.set('tempo', tempoNumber.value);
    params.set('direction', currentDirection());
  }
  const allowed = gameState.allowedIntervals || captureAllowedIntervals();
  params.set('allowed', allowed.join(','));
  return params;
}

function buildScaleParams() {
  const params = new URLSearchParams();
  params.set('tempo', scaleTempoNumber ? scaleTempoNumber.value : '160');
  const dir = document.querySelector('input[name="scale-direction"]:checked');
  params.set('direction', dir ? dir.value : 'any');
  const allowed = gameState.allowedScales || captureAllowedScales();
  params.set('allowed', allowed.join(','));
  return params;
}

const gamePlayBtn = document.getElementById('game-play');
const gamePrevBtn = document.getElementById('game-prev');
const gameNextBtn = document.getElementById('game-next');
const scoreCorrectEl = document.getElementById('score-correct');
const scoreWrongEl = document.getElementById('score-wrong');

function updateScore() {
  scoreCorrectEl.textContent = gameState.score.correct;
  scoreWrongEl.textContent = gameState.score.wrong;
}

const gameState = {
  exercise: 'interval',
  groups: [],
  currentIndex: 0,
  isPlaying: false,
  currentAudio: null,
  playGen: 0,
  score: { correct: 0, wrong: 0 },
  playMode: 'free',
  timerStartedAt: null,
  timerEndedAt: null,
  streakEnded: false,
};

const TIMED_DURATION_MS = 60_000;
let timerIntervalId = null;

function capturePlayMode() {
  let name = 'play-mode';
  if (gameState.exercise === 'chord') name = 'chord-play-mode';
  else if (gameState.exercise === 'scale') name = 'scale-play-mode';
  const r = document.querySelector(`input[name="${name}"]:checked`);
  return r ? r.value : 'free';
}

function makeEmptyGroup() {
  return {
    audioUrl: null,
    played: false,
    interval: null,
    chord: null,
    scale: null,
    correctAnswer: null,
    notes: null,
    rootNotes: null,
    mode: null,
    userGuess: null,
    unlockOffset: 0,
    guessUnlockedOnce: false,
    showStaff: false,
    firstHeardAt: null,
    guessedAt: null,
    playCount: 0,
    eliminated: [],
  };
}

function resetGameState() {
  stopCurrentAudio();
  gameState.groups.forEach(g => { if (g.audioUrl) URL.revokeObjectURL(g.audioUrl); });
  gameState.groups = [makeEmptyGroup()];
  gameState.currentIndex = 0;
  gameState.isPlaying = false;
  gameState.guessUnlocked = false;
  gameState.suppressUpdate = false;
  gameState.allowedIntervals = captureAllowedIntervals();
  gameState.allowedScales = captureAllowedScales();
  gameState.allowedChords = captureAllowedChords();
  gameState.chordInversions = document.getElementById('chord-inversions-btn')?.getAttribute('aria-pressed') === 'true';
  gameState.score = { correct: 0, wrong: 0 };
  gameState.startTime = Date.now();
  gameState.playMode = capturePlayMode();
  gameState.timerStartedAt = null;
  gameState.timerEndedAt = null;
  gameState.streakEnded = false;
  gameState.statsUploaded = false;
  updateScore();
  updateAllButtons();
}

function formatClock(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function startGameTimer() {
  const timerEl = document.getElementById('game-timer');
  if (!timerEl) return;
  if (gameState.playMode === 'free') {
    timerEl.hidden = true;
    return;
  }
  timerEl.hidden = false;
  timerEl.classList.remove('timed-low', 'frozen');
  gameState.timerStartedAt = Date.now();
  gameState.timerEndedAt = null;
  tickGameTimer();
  if (timerIntervalId) clearInterval(timerIntervalId);
  timerIntervalId = setInterval(tickGameTimer, 250);
}

function stopGameTimer() {
  if (timerIntervalId) clearInterval(timerIntervalId);
  timerIntervalId = null;
}

function tickGameTimer() {
  const timerEl = document.getElementById('game-timer');
  const valueEl = document.getElementById('game-timer-value');
  if (!timerEl || !valueEl) return;
  const now = gameState.timerEndedAt || Date.now();
  const elapsed = now - (gameState.timerStartedAt || now);

  if (gameState.playMode === 'timed') {
    const remaining = Math.max(0, TIMED_DURATION_MS - elapsed);
    valueEl.textContent = formatClock(remaining);
    timerEl.classList.toggle('timed-low', remaining > 0 && remaining < 10_000);
    if (remaining <= 0) {
      stopGameTimer();
      navigate(`${exerciseBasePath()}/results`);
    }
  } else if (gameState.playMode === 'streak') {
    valueEl.textContent = formatClock(elapsed);
    timerEl.classList.toggle('frozen', gameState.streakEnded);
  }
}

function stopCurrentAudio() {
  if (gameState.currentAudio) {
    gameState.currentAudio.pause();
    gameState.currentAudio = null;
  }
  gameState.isPlaying = false;
  gameState.playGen++;
}

function intervalClass(semitones) {
  if (semitones == null || semitones < 0) return null;
  if (semitones === 0) return 0;
  return ((semitones - 1) % 12) + 1;
}

function updateGameButtons() {
  if (gameState.suppressUpdate) return;
  const g = gameState.groups[gameState.currentIndex];
  gamePlayBtn.disabled = false;
  gamePrevBtn.disabled = gameState.currentIndex === 0;
  gameNextBtn.disabled = g.userGuess == null
    || (gameState.playMode === 'streak' && gameState.streakEnded);
}

function updateGuessButtons() {
  if (gameState.suppressUpdate) return;
  const g = gameState.groups[gameState.currentIndex];
  const guessed = g.userGuess != null;
  const correct = g.correctAnswer != null ? String(g.correctAnswer) : null;
  const lockedByPlayback = gameState.isPlaying && !gameState.guessUnlocked;

  if (gameState.exercise === 'chord') {
    document.querySelectorAll('.chord-btn').forEach(btn => {
      const val = btn.dataset.chord;
      btn.classList.remove('guess-correct', 'guess-wrong', 'guess-eliminated');
      if (guessed) {
        btn.disabled = true;
        if (val === correct) btn.classList.add('guess-correct');
        else if (val === g.userGuess) btn.classList.add('guess-wrong');
      } else if (g.eliminated && g.eliminated.includes(val)) {
        btn.disabled = true;
        btn.classList.add('guess-eliminated');
      } else {
        btn.disabled = lockedByPlayback;
      }
    });
    return;
  }

  if (gameState.exercise === 'scale') {
    const allowed = gameState.allowedScales || [];
    document.querySelectorAll('.scale-btn').forEach(btn => {
      const val = btn.dataset.scale;
      btn.classList.remove('guess-correct', 'guess-wrong', 'guess-disabled', 'guess-eliminated');
      if (!allowed.includes(val)) {
        btn.disabled = true;
        btn.classList.add('guess-disabled');
        return;
      }
      if (guessed) {
        btn.disabled = true;
        if (val === correct) btn.classList.add('guess-correct');
        else if (val === g.userGuess) btn.classList.add('guess-wrong');
      } else if (g.eliminated && g.eliminated.includes(val)) {
        btn.disabled = true;
        btn.classList.add('guess-eliminated');
      } else {
        btn.disabled = lockedByPlayback;
      }
    });
    return;
  }

  const allowed = gameState.allowedIntervals || [];
  document.querySelectorAll('.guess-btn').forEach(btn => {
    const val = btn.dataset.interval;
    btn.classList.remove('guess-correct', 'guess-wrong', 'guess-disabled', 'guess-eliminated');
    if (!allowed.includes(parseInt(val, 10))) {
      btn.disabled = true;
      btn.classList.add('guess-disabled');
      return;
    }
    if (guessed) {
      btn.disabled = true;
      if (val === correct) btn.classList.add('guess-correct');
      else if (val === g.userGuess) btn.classList.add('guess-wrong');
    } else if (g.eliminated && g.eliminated.includes(val)) {
      btn.disabled = true;
      btn.classList.add('guess-eliminated');
    } else {
      btn.disabled = lockedByPlayback;
    }
  });
}

function updateAllButtons() {
  updateGameButtons();
  updateGuessButtons();
  updateStaff();
  updateHintState();
}

const staffEl = document.getElementById('staff');

// MIDI -> VexFlow note key (e.g. 60 -> 'c/4', 61 -> 'c#/4').
const VF_NOTE_LETTERS = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
function midiToVfKey(midi) {
  const semitone = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${VF_NOTE_LETTERS[semitone]}/${octave}`;
}

// Diatonic position helper: each white-key letter maps to an index, and
// the full diatonic index = octave*7 + letter. Difference between two
// of these is the diatonic step distance, which is how VexFlow positions
// notes on the staff (one position per line/space).
const LETTER_OF_SEMITONE = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
const SEMITONE_OF_LETTER = [0, 2, 4, 5, 7, 9, 11];   // C, D, E, F, G, A, B
const LETTER_NAMES = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

function diatonicIndex(midi) {
  const s = ((midi % 12) + 12) % 12;
  return Math.floor(midi / 12) * 7 + LETTER_OF_SEMITONE[s];
}

// Chord interval recipes (semitones from root). Must match the server's
// CHORD_TYPES, but here used only for enharmonic spelling on the score.
const CHORD_INTERVALS = {
  major:      [0, 4, 7],
  minor:      [0, 3, 7],
  augmented:  [0, 4, 8],
  diminished: [0, 3, 6],
};

// Spell a triad as stacked thirds: root letter, +2 letter steps for the
// third, +4 letter steps for the fifth — with accidentals chosen to make
// the semitone counts match the chord-type intervals. This is the only
// musically-correct way to notate a diminished chord like F° as F-Ab-Cb
// rather than the enharmonic mess F-G#-B.
function spellChordNotes(rootMidi, chordType) {
  const intervals = CHORD_INTERVALS[chordType];
  if (!intervals) return null;
  const rootSemi = ((rootMidi % 12) + 12) % 12;
  const rootLetter = LETTER_OF_SEMITONE[rootSemi];

  return intervals.map((step, k) => {
    const targetMidi = rootMidi + step;
    const targetLetter = (rootLetter + 2 * k) % 7;
    // Find the octave where this letter's natural MIDI is within ±6 semitones
    // of the target.
    let octave = Math.floor(targetMidi / 12) - 1;
    let naturalMidi = (octave + 1) * 12 + SEMITONE_OF_LETTER[targetLetter];
    while (naturalMidi - targetMidi > 6) { octave--; naturalMidi -= 12; }
    while (targetMidi - naturalMidi > 6) { octave++; naturalMidi += 12; }
    const diff = targetMidi - naturalMidi;  // -2..+2
    const acc = diff === 0 ? '' : (diff > 0 ? '#'.repeat(diff) : 'b'.repeat(-diff));
    return {
      letter: LETTER_NAMES[targetLetter],
      accidental: acc,
      octave,
      key: `${LETTER_NAMES[targetLetter]}${acc}/${octave}`,
    };
  });
}

function renderStaff(notes, mode, chordType) {
  if (!staffEl || !window.VexFlow || !notes || notes.length < 2) return;
  staffEl.innerHTML = '';

  const VF = window.VexFlow;
  const { Renderer, Stave, StaveNote, Accidental, Formatter } = VF;

  const avg = notes.reduce((a, b) => a + b, 0) / notes.length;
  const clef = avg >= 60 ? 'treble' : 'bass';

  // Figure out how far above/below the staff our notes reach, in staff
  // positions (1 position = line OR space; +4 = top line, -4 = bottom line).
  const middleMidi = clef === 'treble' ? 71 : 50;          // B4 / D3
  const refDia = diatonicIndex(middleMidi);
  const positions = notes.map(m => diatonicIndex(m) - refDia);
  const maxPos = Math.max(0, ...positions);
  const minPos = Math.min(0, ...positions);

  // VexFlow stave geometry (defaults):
  //   - The `y` passed to `new Stave(x, y, w)` is the TOP of the bounding box,
  //     not the top staff line. The stave reserves `space_above_staff_ln × 10
  //     = 40 px` ABOVE the top line for the clef and other above-staff content,
  //     and another 40 px BELOW the bottom line. The five staff lines occupy
  //     40 px in between. Total reserved bbox height = 120 px.
  //   - Each diatonic staff position = 5 px (one position = line OR space).
  const STEP_PX = 5;
  const VF_SPACE_ABOVE = 40;
  const VF_SPACE_BELOW = 40;
  const VF_STAFF_HEIGHT = 40;
  const NOTEHEAD_PAD = 10;

  const aboveLedger = Math.max(0, maxPos - 4) * STEP_PX;
  const belowLedger = Math.max(0, -minPos - 4) * STEP_PX;
  // staveY pushes the bbox top down only if our notes need more headroom
  // than VexFlow's built-in space_above region provides.
  const staveY = Math.max(0, aboveLedger + NOTEHEAD_PAD - VF_SPACE_ABOVE);
  // Below the bottom line: at least VF's built-in space, plus extra for any
  // ledger lines / notes below the staff.
  const belowTotal = Math.max(VF_SPACE_BELOW, belowLedger + NOTEHEAD_PAD);
  const height = staveY + VF_SPACE_ABOVE + VF_STAFF_HEIGHT + belowTotal;

  const renderer = new Renderer(staffEl, Renderer.Backends.SVG);
  // Width must grow with the number of notes so a scale (8–26 notes) gets
  // enough horizontal room for VexFlow's Formatter to space them legibly.
  // Chords / 2-note intervals still get the original 240 px.
  const isMelodicSeq = mode === 'melodic' && notes.length > 2;
  const width = isMelodicSeq ? Math.max(240, 70 + notes.length * 30) : 240;
  renderer.resize(width, height);
  const ctx = renderer.getContext();
  // Match the surrounding text color (works in both light and dark themes).
  const fg = getComputedStyle(staffEl).color || '#000';
  ctx.setFillStyle(fg);
  ctx.setStrokeStyle(fg);

  const stave = new Stave(0, staveY, width - 4);
  stave.addClef(clef);
  stave.setContext(ctx).draw();

  // VexFlow sets width/height attrs but no viewBox — without a viewBox,
  // CSS scaling (max-width: 100% + height: auto) clips content. Add one
  // so the whole rendered area scales together.
  const svgChild = staffEl.querySelector('svg');
  if (svgChild) {
    svgChild.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svgChild.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  }

  // For melodic exercises render the notes as a sequence (half notes).
  // For chord / harmonic render a single chord (whole note with multiple keys).
  const isChord = mode !== 'melodic';
  let staveNotes;
  if (isChord) {
    const sortedNotes = notes.slice().sort((a, b) => a - b);
    // Prefer proper triad spelling (stacked thirds) when we know the chord
    // type; fall back to sharps-only spelling for everything else.
    const spelling = chordType
      ? spellChordNotes(sortedNotes[0], chordType)
      : null;
    let keys, accidentals;
    if (spelling) {
      keys = spelling.map(n => n.key);
      accidentals = spelling.map(n => n.accidental);
    } else {
      keys = sortedNotes.map(midiToVfKey);
      accidentals = keys.map(k => k.includes('#') ? '#' : '');
    }
    const chord = new StaveNote({ keys, duration: 'w', clef });
    accidentals.forEach((acc, i) => {
      if (acc) chord.addModifier(new Accidental(acc), i);
    });
    staveNotes = [chord];
  } else {
    staveNotes = notes.map(m => {
      const key = midiToVfKey(m);
      const sn = new StaveNote({ keys: [key], duration: 'h', clef });
      if (key.includes('#')) sn.addModifier(new Accidental('#'), 0);
      return sn;
    });
  }

  Formatter.FormatAndDraw(ctx, stave, staveNotes);
}

function updateStaff() {
  if (gameState.suppressUpdate) return;
  if (!staffEl) return;
  const g = gameState.groups[gameState.currentIndex];
  if (g.userGuess != null && g.notes && g.showStaff) {
    renderStaff(g.notes, g.mode || 'melodic', g.chord);
    staffEl.hidden = false;
  } else {
    staffEl.hidden = true;
    staffEl.innerHTML = '';
  }
}

async function playCurrentGroup() {
  // Interrupt any in-flight play (also bumps playGen so the old one becomes a no-op).
  if (gameState.currentAudio) {
    gameState.currentAudio.pause();
    gameState.currentAudio = null;
  }
  stopHintAudio();
  const myGen = ++gameState.playGen;
  gameState.isPlaying = true;
  gameState.guessUnlocked = false;
  gameState.groups[gameState.currentIndex].playCount++;
  updateAllButtons();
  try {
    const g = gameState.groups[gameState.currentIndex];
    if (!g.audioUrl) {
      let r;
      if (gameState.exercise === 'chord') {
        // Chords always play simultaneously; no tempo, no per-note unlock delay.
        g.mode = 'harmonic';
        g.unlockOffset = 0;
        const allowed = gameState.allowedChords || captureAllowedChords();
        const chordParams = new URLSearchParams({
          allowed: allowed.join(','),
          inversions: gameState.chordInversions ? '1' : '0',
        });
        r = await fetch(`/chord/exercise?${chordParams}`);
        const chordHeader = r.headers.get('X-Chord');
        if (chordHeader) {
          g.chord = chordHeader;
          g.correctAnswer = chordHeader;
        }
      } else if (gameState.exercise === 'scale') {
        // Scales play melodically but the user is allowed to commit as soon
        // as the first note sounds, so we keep unlockOffset at 0.
        g.mode = 'melodic';
        g.unlockOffset = 0;
        const params = buildScaleParams();
        r = await fetch(`/scale/exercise?${params}`);
        const scaleHeader = r.headers.get('X-Scale');
        if (scaleHeader) {
          g.scale = scaleHeader;
          g.correctAnswer = scaleHeader;
        }
      } else {
        const params = buildExerciseParams();
        const mode = params.get('mode');
        const tempo = parseInt(params.get('tempo') || '120', 10);
        g.mode = mode;
        g.unlockOffset = (mode === 'harmonic') ? 0 : 60 / tempo;
        r = await fetch(`/exercise?${params}`);
        const intervalHeader = r.headers.get('X-Interval');
        if (intervalHeader != null) {
          g.interval = parseInt(intervalHeader, 10);
          g.correctAnswer = String(intervalClass(g.interval));
        }
      }
      const notesHeader = r.headers.get('X-Notes');
      if (notesHeader) g.notes = notesHeader.split(',').map(n => parseInt(n, 10));
      const rootNotesHeader = r.headers.get('X-Root-Notes');
      if (rootNotesHeader) g.rootNotes = rootNotesHeader.split(',').map(n => parseInt(n, 10));
      const blob = await r.blob();
      g.audioUrl = URL.createObjectURL(blob);
    }
    if (!g.firstHeardAt) g.firstHeardAt = Date.now();
    if (myGen !== gameState.playGen) return;
    const audio = new Audio(g.audioUrl);
    gameState.currentAudio = audio;
    const unlockGuesses = () => {
      if (myGen !== gameState.playGen) return;
      if (!gameState.guessUnlocked) {
        gameState.guessUnlocked = true;
        g.guessUnlockedOnce = true;
        updateGuessButtons();
      }
    };
    audio.addEventListener('play', () => {
      const offset = g.guessUnlockedOnce ? 0 : (g.unlockOffset || 0);
      if (offset <= 0) unlockGuesses();
      else setTimeout(unlockGuesses, offset * 1000);
    });
    await new Promise((resolve) => {
      audio.addEventListener('ended', resolve);
      audio.addEventListener('error', resolve);
      audio.addEventListener('pause', resolve);
      audio.play().catch(resolve);
    });
    if (myGen === gameState.playGen) g.played = true;
  } finally {
    if (myGen === gameState.playGen) {
      gameState.isPlaying = false;
      gameState.currentAudio = null;
      updateAllButtons();
    }
  }
}

gamePlayBtn.addEventListener('click', playCurrentGroup);

function advanceToNextGroup() {
  stopCurrentAudio();
  let isNewGroup = false;
  if (gameState.currentIndex < gameState.groups.length - 1) {
    gameState.currentIndex++;
    gameState.groups[gameState.currentIndex].showStaff = true;
  } else {
    gameState.groups.push(makeEmptyGroup());
    gameState.currentIndex = gameState.groups.length - 1;
    isNewGroup = true;
  }
  updateAllButtons();
  if (isNewGroup) playCurrentGroup();
}

gameNextBtn.addEventListener('click', advanceToNextGroup);

gamePrevBtn.addEventListener('click', () => {
  stopCurrentAudio();
  if (gameState.currentIndex > 0) {
    gameState.currentIndex--;
    gameState.groups[gameState.currentIndex].showStaff = true;
  }
  updateAllButtons();
});

const CORRECT_GUESS_LINGER_MS = 200;
function handleGuess(answerValue) {
  const g = gameState.groups[gameState.currentIndex];
  if (g.userGuess != null) return;
  g.userGuess = String(answerValue);
  g.guessedAt = Date.now();
  const wasCorrect = g.userGuess === String(g.correctAnswer);
  if (wasCorrect) {
    gameState.score.correct++;
  } else {
    gameState.score.wrong++;
    g.showStaff = true;
    if (gameState.playMode === 'streak' && !gameState.streakEnded) {
      gameState.streakEnded = true;
      gameState.timerEndedAt = Date.now();
    }
  }
  updateScore();
  updateAllButtons();

  if (wasCorrect) {
    gameState.suppressUpdate = true;
    advanceToNextGroup();
    setTimeout(() => {
      gameState.suppressUpdate = false;
      updateAllButtons();
    }, CORRECT_GUESS_LINGER_MS);
  }
}

document.querySelectorAll('.guess-btn').forEach(btn => {
  btn.addEventListener('click', () => handleGuess(btn.dataset.interval));
});
document.querySelectorAll('.chord-btn').forEach(btn => {
  btn.addEventListener('click', () => handleGuess(btn.dataset.chord));
});
document.querySelectorAll('.scale-btn').forEach(btn => {
  btn.addEventListener('click', () => handleGuess(btn.dataset.scale));
});

// ---- Hint system --------------------------------------------------------

let hintAudio = null;

function stopHintAudio() {
  if (hintAudio) {
    hintAudio.pause();
    hintAudio = null;
  }
  if (hintSongLabelEl) hintSongLabelEl.hidden = true;
}

const hintContainerEl  = document.getElementById('hint-container');
const hintBtnEl        = document.getElementById('hint-btn');
const hintMenuEl       = document.getElementById('hint-menu');
const hintSlowEl       = document.getElementById('hint-slow');
const hintArpEl        = document.getElementById('hint-arpeggiate');
const hintRootEl       = document.getElementById('hint-root');
const hintSongEl       = document.getElementById('hint-song');
const hintSongLabelEl  = document.getElementById('hint-song-label');
const hintElimEl       = document.getElementById('hint-eliminate');

function activeOptionCount() {
  if (gameState.exercise === 'chord') return (gameState.allowedChords || []).length;
  if (gameState.exercise === 'scale') return (gameState.allowedScales || []).length;
  return (gameState.allowedIntervals || []).length;
}

function updateHintState() {
  if (!hintContainerEl) return;
  const g = gameState.groups[gameState.currentIndex];
  const show = g.playCount >= 2 && g.userGuess == null;
  hintContainerEl.hidden = !show;
  if (!show) {
    hintMenuEl.hidden = true;
    hintBtnEl.setAttribute('aria-expanded', 'false');
    return;
  }
  hintSlowEl.hidden = gameState.exercise === 'chord';
  hintArpEl.hidden  = gameState.exercise !== 'chord';
  hintRootEl.hidden = !(gameState.exercise === 'chord' && gameState.chordInversions);
  const ic = parseInt(g.correctAnswer, 10);
  hintSongEl.hidden = gameState.exercise !== 'interval' || ic === 0 || isNaN(ic);
  hintElimEl.disabled = (activeOptionCount() - g.eliminated.length) <= 2;
}

hintBtnEl.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = !hintMenuEl.hidden;
  hintMenuEl.hidden = open;
  hintBtnEl.setAttribute('aria-expanded', String(!open));
});

document.addEventListener('click', (e) => {
  if (hintContainerEl && !hintContainerEl.contains(e.target)) {
    hintMenuEl.hidden = true;
    if (hintBtnEl) hintBtnEl.setAttribute('aria-expanded', 'false');
  }
});

async function playHintAudio(url) {
  stopCurrentAudio();
  stopHintAudio();
  hintMenuEl.hidden = true;
  hintBtnEl.setAttribute('aria-expanded', 'false');
  const audio = new Audio(url);
  hintAudio = audio;
  try {
    await new Promise((resolve) => {
      audio.addEventListener('ended', resolve);
      audio.addEventListener('error', resolve);
      audio.addEventListener('pause', resolve);
      audio.play().catch(resolve);
    });
  } finally {
    if (hintAudio === audio) hintAudio = null;
    URL.revokeObjectURL(url);
  }
}

async function doSlowReplay() {
  const g = gameState.groups[gameState.currentIndex];
  if (!g.notes) return;
  const params = new URLSearchParams({ type: gameState.exercise, notes: g.notes.join(',') });
  if (gameState.exercise === 'interval') {
    const t = document.getElementById('tempo-number');
    params.set('tempo', t ? t.value : '120');
  } else if (gameState.exercise === 'scale') {
    const t = document.getElementById('scale-tempo-number');
    params.set('tempo', t ? t.value : '160');
  }
  const r = await fetch(`/hint?${params}`);
  const blob = await r.blob();
  await playHintAudio(URL.createObjectURL(blob));
}

async function doArpeggiate() {
  const g = gameState.groups[gameState.currentIndex];
  if (!g.notes) return;
  const params = new URLSearchParams({ type: 'chord', notes: g.notes.join(',') });
  const r = await fetch(`/hint?${params}`);
  const blob = await r.blob();
  await playHintAudio(URL.createObjectURL(blob));
}

async function doRootPosition() {
  const g = gameState.groups[gameState.currentIndex];
  if (!g.rootNotes) return;
  const params = new URLSearchParams({ type: 'chord', notes: g.rootNotes.join(','), simultaneous: '1' });
  const r = await fetch(`/hint?${params}`);
  if (!r.ok) return;
  const blob = await r.blob();
  await playHintAudio(URL.createObjectURL(blob));
}

function doEliminate() {
  const g = gameState.groups[gameState.currentIndex];
  if (!g.correctAnswer) return;
  let pool;
  if (gameState.exercise === 'chord') {
    pool = (gameState.allowedChords || []).filter(v => v !== g.correctAnswer && !g.eliminated.includes(v));
  } else if (gameState.exercise === 'scale') {
    pool = (gameState.allowedScales || []).filter(v => v !== g.correctAnswer && !g.eliminated.includes(v));
  } else {
    pool = (gameState.allowedIntervals || []).map(String).filter(v => v !== String(g.correctAnswer) && !g.eliminated.includes(v));
  }
  if (!pool.length) return;
  g.eliminated.push(pool[Math.floor(Math.random() * pool.length)]);
  hintMenuEl.hidden = true;
  hintBtnEl.setAttribute('aria-expanded', 'false');
  updateAllButtons();
}

async function doSongMnemonic() {
  const g = gameState.groups[gameState.currentIndex];
  if (!g.notes) return;
  const params = new URLSearchParams({ type: 'interval_song', notes: g.notes.join(',') });
  const r = await fetch(`/hint?${params}`);
  if (!r.ok) return;
  const songName = r.headers.get('X-Song-Name') || '';
  const blob = await r.blob();
  if (hintSongLabelEl && songName) {
    hintSongLabelEl.textContent = `♫ ${songName}`;
    hintSongLabelEl.hidden = false;
  }
  await playHintAudio(URL.createObjectURL(blob));
  if (hintSongLabelEl) hintSongLabelEl.hidden = true;
}

hintSlowEl.addEventListener('click', () => doSlowReplay());
hintArpEl.addEventListener('click', () => doArpeggiate());
hintRootEl.addEventListener('click', () => doRootPosition());
hintSongEl.addEventListener('click', () => doSongMnemonic());
hintElimEl.addEventListener('click', () => doEliminate());

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
function midiToName(midi) {
  return NOTE_NAMES[midi % 12] + (Math.floor(midi / 12) - 1);
}

fetch('/debug/info').then(r => r.json()).then(info => {
  const lo = document.getElementById('lowest-note-suffix');
  const hi = document.getElementById('highest-note-suffix');
  if (lo && Number.isFinite(info.lowest)) lo.textContent = ` (${midiToName(info.lowest)})`;
  if (hi && Number.isFinite(info.highest)) hi.textContent = ` (${midiToName(info.highest)})`;
}).catch(() => {});

const noteSlider = document.getElementById('note-slider');
const noteMinus = document.getElementById('note-minus');
const notePlus = document.getElementById('note-plus');
const noteNameEl = document.getElementById('note-name');
const debugCustomPlay = document.getElementById('debug-custom-play');

function setCustomNote(midi) {
  if (!noteSlider) return;
  const min = parseInt(noteSlider.min, 10);
  const max = parseInt(noteSlider.max, 10);
  if (isNaN(midi)) midi = min;
  midi = Math.max(min, Math.min(max, midi));
  noteSlider.value = String(midi);
  if (noteNameEl) noteNameEl.textContent = `${midiToName(midi)} (${midi})`;
  if (debugCustomPlay) debugCustomPlay.dataset.notes = String(midi);
}

if (noteSlider) {
  setCustomNote(parseInt(noteSlider.value, 10));
  noteSlider.addEventListener('input', () => setCustomNote(parseInt(noteSlider.value, 10)));
  noteMinus.addEventListener('click', () => setCustomNote(parseInt(noteSlider.value, 10) - 1));
  notePlus.addEventListener('click', () => setCustomNote(parseInt(noteSlider.value, 10) + 1));
}

document.querySelectorAll('[data-notes]').forEach(btn => {
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    try {
      const r = await fetch(`/debug/notes?notes=${encodeURIComponent(btn.dataset.notes)}`);
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      await new Promise((resolve) => {
        audio.addEventListener('ended', resolve);
        audio.addEventListener('error', resolve);
        audio.play().catch(resolve);
      });
      URL.revokeObjectURL(url);
    } finally {
      btn.disabled = false;
    }
  });
});

// Build interval song mnemonic table in the debug view.
// Song names must be kept in sync with INTERVAL_SONG_MNEMONICS in main.py.
(function buildDebugMnemonics() {
  const container = document.getElementById('debug-mnemonics-container');
  if (!container) return;
  const ROOT = 60; // C4 — fixed root for debug playback
  const ROWS = [
    [1,  'Minor 2nd',   'Jaws',                 'Joy to the World'],
    [2,  'Major 2nd',   'Happy Birthday',        'Mary Had a Little Lamb'],
    [3,  'Minor 3rd',   'Greensleeves',          'Brahms Lullaby'],
    [4,  'Major 3rd',   'Oh When the Saints',    "Beethoven's 5th"],
    [5,  'Perfect 4th', 'Here Comes the Bride',  'Born to Be Wild'],
    [6,  'Tritone',     'Maria',                 'The Simpsons'],
    [7,  'Perfect 5th', 'Star Wars',             'The Flintstones'],
    [8,  'Minor 6th',   'The Entertainer',       'Love Story'],
    [9,  'Major 6th',   'My Bonnie',             'My Bonnie'],
    [10, 'Minor 7th',   'Somewhere',             'Somewhere'],
    [11, 'Major 7th',   'Take On Me',            'I Love You'],
    [12, 'Perfect 8th', 'Over the Rainbow',      'Deep River'],
  ];
  const playSvg = '<svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  ROWS.forEach(([ic, label, ascName, descName]) => {
    const row = document.createElement('div');
    row.className = 'debug-mnemonic-row';
    const nameEl = document.createElement('span');
    nameEl.className = 'debug-mnemonic-label';
    nameEl.textContent = label;
    row.appendChild(nameEl);
    [['↑', ascName, `${ROOT},${ROOT + ic}`], ['↓', descName, `${ROOT + ic},${ROOT}`]].forEach(([arrow, song, notes]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'debug-mnemonic-btn';
      btn.dataset.mnemonicNotes = notes;
      btn.innerHTML = `${playSvg}<span>${arrow} ${song}</span>`;
      row.appendChild(btn);
    });
    container.appendChild(row);
  });

  let activeMnemonicAudio = null;
  container.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-mnemonic-notes]');
    if (!btn || btn.disabled) return;
    if (activeMnemonicAudio) { activeMnemonicAudio.pause(); activeMnemonicAudio = null; }
    btn.disabled = true;
    try {
      const params = new URLSearchParams({ type: 'interval_song', notes: btn.dataset.mnemonicNotes });
      const r = await fetch(`/hint?${params}`);
      if (!r.ok) return;
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      activeMnemonicAudio = audio;
      await new Promise((resolve) => {
        audio.addEventListener('ended', resolve);
        audio.addEventListener('error', resolve);
        audio.addEventListener('pause', resolve);
        audio.play().catch(resolve);
      });
      URL.revokeObjectURL(url);
    } finally {
      if (activeMnemonicAudio && activeMnemonicAudio.paused) activeMnemonicAudio = null;
      btn.disabled = false;
    }
  });
})();

function formatDuration(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  if (m >= 1) return `${m}m ${sec}s`;
  return `${s}s`;
}
function formatShortSeconds(ms) {
  return `${(Math.max(0, ms) / 1000).toFixed(1)}s`;
}
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function intervalShort(cls) {
  const lang = document.documentElement.lang || 'en';
  const t = STRINGS[lang] || STRINGS.en;
  return t[`interval${cls}`] || String(cls);
}

function answerKeysForExercise() {
  if (gameState.exercise === 'chord') {
    return ['major', 'minor', 'augmented', 'diminished'];
  }
  if (gameState.exercise === 'scale') {
    return SCALE_KEYS.slice();
  }
  return Array.from({ length: 13 }, (_, i) => String(i));
}

function answerLabelForExercise(key) {
  return labelForKey(gameState.exercise, key);
}

function renderResults() {
  uploadGameStats();
  const content = document.getElementById('results-content');
  if (!content) return;
  const lang = document.documentElement.lang || 'en';

  const totalMs = Date.now() - (gameState.startTime || Date.now());
  const guessed = gameState.groups.filter(g => g.userGuess != null && g.interval != null);
  const total = guessed.length;
  const correct = gameState.score.correct;
  const wrong = gameState.score.wrong;
  const accuracyPct = total ? Math.round(100 * correct / total) : 0;
  const timedGroups = guessed.filter(g => g.firstHeardAt && g.guessedAt);
  const avgMs = timedGroups.length
    ? timedGroups.reduce((a, g) => a + (g.guessedAt - g.firstHeardAt), 0) / timedGroups.length
    : 0;

  // Per-answer-class counts (interval class or chord type)
  const classCounts = [];
  for (const key of answerKeysForExercise()) {
    let cc = 0, cw = 0;
    guessed.forEach(g => {
      if (String(g.correctAnswer) !== key) return;
      if (g.userGuess === key) cc++;
      else cw++;
    });
    if (cc + cw > 0) classCounts.push({ cls: key, correct: cc, wrong: cw });
  }
  const maxCount = Math.max(1, ...classCounts.map(d => d.correct + d.wrong));

  let html = '';

  // Stats summary
  html += `<div class="results-stats">
    <div class="stat"><span class="stat-label" data-i18n="totalTime">Total time</span><span class="stat-value">${escapeHtml(formatDuration(totalMs))}</span></div>
    <div class="stat"><span class="stat-label" data-i18n="avgTime">Avg per interval</span><span class="stat-value">${total ? escapeHtml(formatShortSeconds(avgMs)) : '—'}</span></div>
    <div class="stat"><span class="stat-label" data-i18n="correctCount">Correct</span><span class="stat-value correct">${correct}</span></div>
    <div class="stat"><span class="stat-label" data-i18n="wrongCount">Wrong</span><span class="stat-value wrong">${wrong}</span></div>
    <div class="stat"><span class="stat-label" data-i18n="accuracy">Accuracy</span><span class="stat-value">${total ? accuracyPct + '%' : '—'}</span></div>
  </div>`;

  if (classCounts.length) {
    html += `<h2 class="results-section" data-i18n="chartTitle">Per interval</h2>`;
    html += `<div class="results-chart">`;
    classCounts.forEach(d => {
      const cw = (d.correct / maxCount) * 100;
      const ww = (d.wrong / maxCount) * 100;
      html += `<div class="chart-row">
        <span class="chart-label">${escapeHtml(answerLabelForExercise(d.cls))}</span>
        <div class="chart-bar-track">
          ${d.correct > 0 ? `<span class="chart-bar correct" style="width: ${cw}%"></span>` : ''}
          ${d.wrong > 0 ? `<span class="chart-bar wrong" style="width: ${ww}%"></span>` : ''}
        </div>
        <span class="chart-counts"><span class="ok">${d.correct}</span> · <span class="ko">${d.wrong}</span></span>
      </div>`;
    });
    html += `</div>`;
  }

  if (guessed.length) {
    html += `<h2 class="results-section" data-i18n="historyTitle">History</h2>`;
    html += `<div class="results-table-wrap"><table class="results-table">
      <thead><tr>
        <th>#</th>
        <th data-i18n="tableActual">Actual</th>
        <th data-i18n="tableGuess">Guess</th>
        <th data-i18n="tableResult">Result</th>
        <th data-i18n="tableTime">Time</th>
      </tr></thead><tbody>`;
    gameState.groups.forEach((g, i) => {
      if (g.userGuess == null) return;
      const actualKey = String(g.correctAnswer);
      const isCorrect = g.userGuess === actualKey;
      const t = (g.firstHeardAt && g.guessedAt) ? formatShortSeconds(g.guessedAt - g.firstHeardAt) : '—';
      html += `<tr>
        <td>${i + 1}</td>
        <td>${escapeHtml(answerLabelForExercise(actualKey))}</td>
        <td>${escapeHtml(answerLabelForExercise(g.userGuess))}</td>
        <td>${isCorrect ? '<span class="result-correct">✓</span>' : '<span class="result-wrong">✗</span>'}</td>
        <td>${escapeHtml(t)}</td>
      </tr>`;
    });
    html += `</tbody></table></div>`;
  } else {
    html += `<p class="results-empty" data-i18n="noResults">No intervals played yet.</p>`;
  }

  content.innerHTML = html;
  // Apply localizations to the newly-rendered nodes
  applyLanguage(lang);
}

// ====================================================================
// Stats: per-game upload + stats page rendering
// ====================================================================

function buildStatsPayload() {
  const exercise = gameState.exercise || 'interval';
  const guessed = gameState.groups.filter(g => g.userGuess != null && g.correctAnswer != null);
  if (!guessed.length) return null;
  const totalGuesses = guessed.length;
  let totalCorrect = 0;
  let totalTimeMs = 0;
  const perClass = {};
  let streak = 0, longestStreak = 0;
  for (const g of guessed) {
    const correct = String(g.userGuess) === String(g.correctAnswer);
    const cls = String(g.correctAnswer);
    if (!perClass[cls]) perClass[cls] = { correct: 0, wrong: 0, timeMs: 0 };
    if (correct) {
      totalCorrect++;
      perClass[cls].correct++;
      streak++;
      if (streak > longestStreak) longestStreak = streak;
    } else {
      perClass[cls].wrong++;
      streak = 0;
    }
    if (g.firstHeardAt && g.guessedAt) {
      const dt = g.guessedAt - g.firstHeardAt;
      totalTimeMs += dt;
      perClass[cls].timeMs += dt;
    }
  }
  return {
    exercise,
    totalGuesses,
    totalCorrect,
    totalTimeMs,
    longestStreak,
    perClass,
    playMode: gameState.playMode || 'free',
  };
}

async function uploadGameStats() {
  if (!currentUser) return;
  if (gameState.statsUploaded) return;
  const payload = buildStatsPayload();
  if (!payload) return;
  gameState.statsUploaded = true;
  try {
    await fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (e) { /* best-effort */ }
}

function formatTimeAgo(epochSeconds) {
  if (!epochSeconds) return '—';
  const lang = document.documentElement.lang || 'en';
  const t = STRINGS[lang] || STRINGS.en;
  const diff = Math.max(0, Date.now() / 1000 - epochSeconds);
  if (diff < 45) return t.timeAgoJustNow;
  if (diff < 3600) return `${Math.round(diff / 60)} ${t.timeAgoMinutes}`;
  if (diff < 86400) return `${Math.round(diff / 3600)} ${t.timeAgoHours}`;
  return `${Math.round(diff / 86400)} ${t.timeAgoDays}`;
}

function exerciseTitle(exercise) {
  const lang = document.documentElement.lang || 'en';
  const t = STRINGS[lang] || STRINGS.en;
  if (exercise === 'chord') return t.chordName;
  if (exercise === 'scale') return t.scaleName;
  return t.intervalName;
}

function labelForKey(exercise, key) {
  const lang = document.documentElement.lang || 'en';
  const t = STRINGS[lang] || STRINGS.en;
  if (exercise === 'chord') {
    return t[`chord${key.charAt(0).toUpperCase() + key.slice(1)}`] || key;
  }
  if (exercise === 'scale') {
    const i18nKey = SCALE_I18N_KEY[key];
    return (i18nKey && t[i18nKey]) || key;
  }
  return t[`interval${key}`] || String(key);
}

function findExtreme(perClass, isBetter, minAttempts = 3) {
  let best = null;
  for (const [k, v] of Object.entries(perClass || {})) {
    const total = (v.correct || 0) + (v.wrong || 0);
    if (total < minAttempts) continue;
    const acc = v.correct / total;
    if (best === null || isBetter(acc, best.acc)) {
      best = { key: k, acc, total };
    }
  }
  return best;
}

function renderExerciseStatsSection(exercise, s) {
  const lang = document.documentElement.lang || 'en';
  const t = STRINGS[lang] || STRINGS.en;
  const games = s.gamesFinished || 0;
  if (games === 0) {
    return `<section class="stats-section">
      <h2>${escapeHtml(exerciseTitle(exercise))}</h2>
      <p class="results-empty" data-i18n="statsExerciseEmpty">${t.statsExerciseEmpty}</p>
    </section>`;
  }
  const total = s.totalGuesses || 0;
  const correct = s.totalCorrect || 0;
  const wrong = Math.max(0, total - correct);
  const acc = total ? Math.round(100 * correct / total) : 0;
  const totalMs = s.totalTimeMs || 0;
  const avgMs = total ? totalMs / total : 0;
  const streak = s.longestStreak || 0;
  const worst = findExtreme(s.perClass, (a, b) => a < b);
  const best = findExtreme(s.perClass, (a, b) => a > b);

  // Per-class chart (correct + wrong totals)
  const rows = [];
  const counted = Object.entries(s.perClass || {}).filter(([_, v]) => (v.correct + v.wrong) > 0);
  const maxCount = Math.max(1, ...counted.map(([_, v]) => v.correct + v.wrong));
  // Keep stable order across renders: numeric ascending, fallback alpha.
  counted.sort((a, b) => {
    const na = parseInt(a[0], 10), nb = parseInt(b[0], 10);
    if (!isNaN(na) && !isNaN(nb)) return na - nb;
    return a[0].localeCompare(b[0]);
  });
  counted.forEach(([k, v]) => {
    const cw = (v.correct / maxCount) * 100;
    const ww = (v.wrong / maxCount) * 100;
    rows.push(`<div class="chart-row">
      <span class="chart-label">${escapeHtml(labelForKey(exercise, k))}</span>
      <div class="chart-bar-track">
        ${v.correct > 0 ? `<span class="chart-bar correct" style="width: ${cw}%"></span>` : ''}
        ${v.wrong > 0 ? `<span class="chart-bar wrong" style="width: ${ww}%"></span>` : ''}
      </div>
      <span class="chart-counts"><span class="ok">${v.correct}</span> · <span class="ko">${v.wrong}</span></span>
    </div>`);
  });

  // Per-play-mode breakdown
  const modes = ['free', 'timed', 'streak'];
  const modeRows = modes
    .map(m => [m, s.byPlayMode && s.byPlayMode[m]])
    .filter(([m, b]) => b && b.games)
    .map(([m, b]) => {
      const modeTotal = (b.correct || 0) + (b.wrong || 0);
      const modeAcc = modeTotal ? Math.round(100 * b.correct / modeTotal) : 0;
      const modeKey = 'mode' + m.charAt(0).toUpperCase() + m.slice(1);
      return `<div><span class="label">${escapeHtml(t[modeKey] || m)}</span> <span class="value">${b.games} · ${modeAcc}%</span></div>`;
    }).join('');

  const extras = `<div class="stats-extras">
    ${worst ? `<div><span class="label">${t.statMostMissed}:</span> <span class="value">${escapeHtml(labelForKey(exercise, worst.key))} (${Math.round(worst.acc*100)}%)</span></div>` : ''}
    ${best  ? `<div><span class="label">${t.statBestAt}:</span> <span class="value">${escapeHtml(labelForKey(exercise, best.key))} (${Math.round(best.acc*100)}%)</span></div>` : ''}
    ${s.firstPlayedAt ? `<div><span class="label">${t.statFirstPlayed}:</span> <span class="value">${formatTimeAgo(s.firstPlayedAt)}</span></div>` : ''}
    ${s.lastPlayedAt  ? `<div><span class="label">${t.statLastPlayed}:</span>  <span class="value">${formatTimeAgo(s.lastPlayedAt)}</span></div>` : ''}
    ${modeRows}
  </div>`;

  return `<section class="stats-section">
    <h2>${escapeHtml(exerciseTitle(exercise))}</h2>
    <div class="results-stats">
      <div class="stat"><span class="stat-label">${t.statGamesPlayed}</span><span class="stat-value">${games}</span></div>
      <div class="stat"><span class="stat-label">${t.statTotalGuesses}</span><span class="stat-value">${total}</span></div>
      <div class="stat"><span class="stat-label">${t.statAccuracy}</span><span class="stat-value">${acc}%</span></div>
      <div class="stat"><span class="stat-label">${t.statTimePlayed}</span><span class="stat-value">${escapeHtml(formatDuration(totalMs))}</span></div>
      <div class="stat"><span class="stat-label">${t.statAvgResponse}</span><span class="stat-value">${escapeHtml(formatShortSeconds(avgMs))}</span></div>
      <div class="stat"><span class="stat-label">${t.statBestStreak}</span><span class="stat-value">${streak}</span></div>
    </div>
    ${rows.length ? `<div class="results-chart">${rows.join('')}</div>` : ''}
    ${extras}
  </section>`;
}

async function renderStatsPage() {
  const content = document.getElementById('stats-content');
  if (!content) return;
  const memberSinceEl = document.getElementById('stats-member-since');
  if (memberSinceEl) memberSinceEl.hidden = !currentUser || !currentUserCreatedAt;
  const createdEl = document.getElementById('stats-created');
  if (createdEl) createdEl.textContent = formatAbsoluteDate(currentUserCreatedAt) || '';
  if (!currentUser) {
    const lang = document.documentElement.lang || 'en';
    content.innerHTML = `<p class="results-empty" data-i18n="statsLoginPrompt">${(STRINGS[lang] || STRINGS.en).statsLoginPrompt}</p>`;
    applyLanguage(lang);
    return;
  }
  let stats = {};
  try {
    const r = await fetch('/api/stats');
    const j = await r.json();
    stats = j.stats || {};
  } catch (e) { /* show empty */ }
  const sections = ['interval', 'chord', 'scale']
    .map(ex => renderExerciseStatsSection(ex, stats[ex] || { gamesFinished: 0 }))
    .join('');
  content.innerHTML = sections;
  applyLanguage(document.documentElement.lang || 'en');
}

function formatAbsoluteDateTime(epochSeconds) {
  if (!epochSeconds) return null;
  const d = new Date(epochSeconds * 1000);
  const lang = document.documentElement.lang || 'en';
  try {
    return d.toLocaleString(lang === 'es' ? 'es-ES' : 'en-GB', {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });
  } catch (_) {
    return d.toISOString().replace('T', ' ').slice(0, 16);
  }
}

function formatAbsoluteDate(epochSeconds) {
  if (!epochSeconds) return null;
  const d = new Date(epochSeconds * 1000);
  const lang = document.documentElement.lang || 'en';
  try {
    return d.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', {
      year: 'numeric', month: 'short', day: '2-digit',
    });
  } catch (_) {
    return d.toISOString().slice(0, 10);
  }
}

async function renderAdminPage() {
  const content = document.getElementById('admin-content');
  if (!content) return;
  const lang = document.documentElement.lang || 'en';
  const t = STRINGS[lang] || STRINGS.en;
  let users = [];
  let connections = [];
  try {
    const [usersRes, connRes] = await Promise.all([
      fetch('/api/admin/users'),
      fetch('/api/admin/connections'),
    ]);
    if (!usersRes.ok) {
      content.innerHTML = '';
      return;
    }
    users = (await usersRes.json()).users || [];
    if (connRes.ok) connections = (await connRes.json()).connections || [];
  } catch (e) {
    content.innerHTML = '';
    return;
  }
  const now = Date.now() / 1000;
  const userRows = users.map(u => {
    const created = formatAbsoluteDateTime(u.createdAt) || '—';
    const lastAccess = formatAbsoluteDateTime(u.lastAccessAt) || t.adminNever;
    const tempLocked = !u.permanentlyLocked && (u.lockUntil || 0) > now;
    const locked = u.permanentlyLocked || tempLocked;
    let statusHtml;
    if (u.permanentlyLocked) {
      statusHtml = `<span class="status-badge status-locked">${escapeHtml(t.adminStatusLockedPermanent)}</span>`;
    } else if (tempLocked) {
      const until = formatAbsoluteDateTime(u.lockUntil) || '';
      statusHtml = `<span class="status-badge status-locked">${escapeHtml(t.adminStatusLocked)}</span><span class="status-detail">${escapeHtml(t.adminUntil)} ${escapeHtml(until)}</span>`;
    } else {
      statusHtml = `<span class="status-badge status-active">${escapeHtml(t.adminStatusActive)}</span>`;
    }
    const actionHtml = locked
      ? `<button type="button" class="secondary-btn admin-unlock-btn" data-unlock-user="${escapeHtml(u.username)}">${escapeHtml(t.adminUnlock)}</button>`
      : '';
    return `<tr>
      <td>${escapeHtml(u.username)}</td>
      <td>${escapeHtml(created)}</td>
      <td>${escapeHtml(lastAccess)}</td>
      <td>${statusHtml}</td>
      <td>${actionHtml}</td>
    </tr>`;
  }).join('');
  const connRows = connections.map(c => {
    const ts = formatAbsoluteDateTime(c.ts) || '—';
    const user = c.user ? escapeHtml(c.user) : `<em>${escapeHtml(t.adminAnonymous)}</em>`;
    const ua = escapeHtml((c.ua || '').substring(0, 80));
    return `<tr>
      <td>${escapeHtml(ts)}</td>
      <td>${escapeHtml(c.path || '')}</td>
      <td>${user}</td>
      <td>${escapeHtml(c.ip || '')}</td>
      <td class="admin-ua-cell" title="${escapeHtml(c.ua || '')}">${ua}</td>
    </tr>`;
  }).join('');
  content.innerHTML = `
    <div class="results-stats">
      <div class="stat"><span class="stat-label">${t.adminTotalUsers}</span><span class="stat-value">${users.length}</span></div>
    </div>
    <div class="results-table-wrap"><table class="results-table">
      <thead><tr>
        <th>${t.adminColUsername}</th>
        <th>${t.adminColCreated}</th>
        <th>${t.adminColLastAccess}</th>
        <th>${t.adminColStatus}</th>
        <th>${t.adminColActions}</th>
      </tr></thead>
      <tbody>${userRows}</tbody>
    </table></div>
    <h2 class="admin-section-title">${escapeHtml(t.adminConnections)}</h2>
    <div class="results-stats">
      <div class="stat"><span class="stat-label">${t.adminTotalConnections}</span><span class="stat-value">${connections.length}</span></div>
    </div>
    <div class="results-table-wrap"><table class="results-table admin-conn-table">
      <thead><tr>
        <th>${t.adminColTime}</th>
        <th>${t.adminColPath}</th>
        <th>${t.adminColUser}</th>
        <th>${t.adminColIP}</th>
        <th>${t.adminColUA}</th>
      </tr></thead>
      <tbody>${connRows}</tbody>
    </table></div>`;
  content.querySelectorAll('.admin-unlock-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const target = btn.dataset.unlockUser;
      btn.disabled = true;
      try {
        const r = await fetch('/api/admin/unlock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: target }),
        });
        if (r.ok) await renderAdminPage();
        else btn.disabled = false;
      } catch (e) { btn.disabled = false; }
    });
  });
  applyLanguage(lang);
}

// ====================================================================
// Authentication / settings sync
// ====================================================================

let suppressSettingsSave = false;
let settingsSaveTimer = null;
const SETTINGS_SAVE_DEBOUNCE_MS = 500;

function gatherSettings() {
  const allowedIntervals = Array.from(
    document.querySelectorAll('.interval-toggle[aria-pressed="true"]')
  ).map(b => parseInt(b.dataset.interval, 10)).filter(n => !isNaN(n));
  const allowedScales = Array.from(
    document.querySelectorAll('.scale-toggle[aria-pressed="true"]')
  ).map(b => b.dataset.scale).filter(Boolean);
  return {
    language: document.documentElement.lang || 'en',
    theme: document.documentElement.getAttribute('data-theme') || 'light',
    interval: {
      playMode: document.querySelector('input[name="play-mode"]:checked')?.value || 'free',
      mode: document.querySelector('input[name="mode"]:checked')?.value || 'melodic',
      range: document.querySelector('input[name="range"]:checked')?.value || 'octave',
      direction: document.querySelector('input[name="direction"]:checked')?.value || 'any',
      tempo: parseInt(tempoNumber.value, 10) || 120,
      allowedIntervals,
    },
    chord: {
      playMode: document.querySelector('input[name="chord-play-mode"]:checked')?.value || 'free',
      allowedChords: Array.from(
        document.querySelectorAll('.chord-toggle[data-chord][aria-pressed="true"]')
      ).map(b => b.dataset.chord).filter(Boolean),
      inversions: document.getElementById('chord-inversions-btn')?.getAttribute('aria-pressed') === 'true',
    },
    scale: {
      playMode: document.querySelector('input[name="scale-play-mode"]:checked')?.value || 'free',
      direction: document.querySelector('input[name="scale-direction"]:checked')?.value || 'any',
      tempo: scaleTempoNumber ? (parseInt(scaleTempoNumber.value, 10) || 160) : 160,
      allowedScales,
    },
  };
}

function applySettings(s) {
  if (!s || typeof s !== 'object') return;
  suppressSettingsSave = true;
  try {
    if (s.language && STRINGS[s.language]) {
      const r = document.querySelector(`input[name="lang"][value="${s.language}"]`);
      if (r) r.checked = true;
      applyLanguage(s.language);
    }
    if (s.theme === 'light' || s.theme === 'dark') {
      const r = document.querySelector(`input[name="theme"][value="${s.theme}"]`);
      if (r) r.checked = true;
      applyTheme(s.theme);
    }
    const i = s.interval || {};
    [['play-mode', i.playMode], ['mode', i.mode], ['range', i.range], ['direction', i.direction]].forEach(([name, value]) => {
      if (!value) return;
      const r = document.querySelector(`input[name="${name}"][value="${value}"]`);
      if (r) { r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true })); }
    });
    if (typeof i.tempo === 'number' && !isNaN(i.tempo)) setTempo(i.tempo);
    if (Array.isArray(i.allowedIntervals)) {
      document.querySelectorAll('.interval-toggle').forEach(btn => {
        const v = parseInt(btn.dataset.interval, 10);
        btn.setAttribute('aria-pressed', i.allowedIntervals.includes(v) ? 'true' : 'false');
      });
    }
    if (s.chord && s.chord.playMode) {
      const r = document.querySelector(`input[name="chord-play-mode"][value="${s.chord.playMode}"]`);
      if (r) r.checked = true;
    }
    if (s.chord && Array.isArray(s.chord.allowedChords)) {
      document.querySelectorAll('.chord-toggle[data-chord]').forEach(btn => {
        btn.setAttribute('aria-pressed', s.chord.allowedChords.includes(btn.dataset.chord) ? 'true' : 'false');
      });
    }
    if (s.chord) {
      const invBtn = document.getElementById('chord-inversions-btn');
      if (invBtn) invBtn.setAttribute('aria-pressed', s.chord.inversions ? 'true' : 'false');
    }
    const sc = s.scale || {};
    [['scale-play-mode', sc.playMode], ['scale-direction', sc.direction]].forEach(([name, value]) => {
      if (!value) return;
      const r = document.querySelector(`input[name="${name}"][value="${value}"]`);
      if (r) { r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true })); }
    });
    if (typeof sc.tempo === 'number' && !isNaN(sc.tempo)) setScaleTempo(sc.tempo);
    if (Array.isArray(sc.allowedScales)) {
      document.querySelectorAll('.scale-toggle').forEach(btn => {
        btn.setAttribute('aria-pressed', sc.allowedScales.includes(btn.dataset.scale) ? 'true' : 'false');
      });
    }
  } finally {
    suppressSettingsSave = false;
  }
  syncAllModeButtons();
}

function syncModeButton(radioName, btnId) {
  const checked = document.querySelector(`input[name="${radioName}"]:checked`);
  const mode = checked ? checked.value : 'free';
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.dataset.mode = mode;
  const iconEl = btn.querySelector('.mode-icon');
  if (iconEl) iconEl.innerHTML = MODE_ICONS[mode] || '';
}

function syncAllModeButtons() {
  syncModeButton('play-mode',       'start');
  syncModeButton('chord-play-mode', 'chord-start');
  syncModeButton('scale-play-mode', 'scale-start');
}

function scheduleSettingsSave() {
  if (suppressSettingsSave) return;
  if (!currentUser) return;
  if (settingsSaveTimer) clearTimeout(settingsSaveTimer);
  settingsSaveTimer = setTimeout(async () => {
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: gatherSettings() }),
      });
    } catch (e) { /* ignore — next change will retry */ }
  }, SETTINGS_SAVE_DEBOUNCE_MS);
}

// Catch every form-control change that affects settings.
document.addEventListener('change', (e) => {
  const sel = 'input[name="lang"], input[name="theme"], input[name="mode"], '
            + 'input[name="range"], input[name="direction"], input[name="play-mode"], '
            + 'input[name="chord-play-mode"], input[name="scale-play-mode"], '
            + 'input[name="scale-direction"], #tempo-number, #scale-tempo-number';
  if (e.target instanceof Element && e.target.matches(sel)) scheduleSettingsSave();
});
// Interval-allowed toggles don't fire 'change' events — hook the click.
document.querySelectorAll('.interval-toggle').forEach(btn => {
  btn.addEventListener('click', () => setTimeout(scheduleSettingsSave, 0));
});
document.querySelectorAll('.scale-toggle').forEach(btn => {
  btn.addEventListener('click', () => setTimeout(scheduleSettingsSave, 0));
});
document.querySelectorAll('.chord-toggle').forEach(btn => {
  btn.addEventListener('click', () => setTimeout(scheduleSettingsSave, 0));
});
if (chordInversionsBtn) {
  chordInversionsBtn.addEventListener('click', () => setTimeout(scheduleSettingsSave, 0));
}
// Tempo +/− buttons mutate the number input but don't fire its 'change'.
[
  document.getElementById('tempo-minus'), document.getElementById('tempo-plus'),
  document.getElementById('scale-tempo-minus'), document.getElementById('scale-tempo-plus'),
].forEach(b => {
  if (b) b.addEventListener('click', () => setTimeout(scheduleSettingsSave, 0));
});

// Sync Start button icon/color when play-mode changes.
document.querySelectorAll('input[name="play-mode"], input[name="chord-play-mode"], input[name="scale-play-mode"]').forEach(r => {
  r.addEventListener('change', syncAllModeButtons);
});
syncAllModeButtons();

// ---------- modal / login / register ---------------------------------

const authModal = document.getElementById('auth-modal');
const authBtn = document.getElementById('auth-btn');

function setAuthTab(name) {
  if (!authModal) return;
  authModal.querySelectorAll('.auth-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.authTab === name);
  });
  authModal.querySelectorAll('.auth-form').forEach(f => {
    const active = f.id === `auth-form-${name}`;
    f.hidden = !active;
    f.classList.toggle('active', active);
  });
}

function openAuthModal(tab = 'login') {
  if (!authModal) return;
  authModal.hidden = false;
  setAuthTab(tab);
  authModal.querySelectorAll('.auth-form').forEach(f => f.reset());
  authModal.querySelectorAll('.form-message').forEach(m => {
    m.hidden = true; m.classList.remove('success'); m.textContent = '';
  });
  setTimeout(() => {
    authModal.querySelector('.auth-form:not([hidden]) input[name="username"]')?.focus();
  }, 0);
}
function closeAuthModal() { if (authModal) authModal.hidden = true; }

const authMenu = document.getElementById('auth-menu');
function openAuthMenu() {
  if (!authMenu) return;
  authMenu.hidden = false;
  if (authBtn) authBtn.setAttribute('aria-expanded', 'true');
}
function closeAuthMenu() {
  if (!authMenu) return;
  authMenu.hidden = true;
  if (authBtn) authBtn.setAttribute('aria-expanded', 'false');
}
authBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (currentUser) {
    if (authMenu.hidden) openAuthMenu();
    else closeAuthMenu();
  } else {
    openAuthModal('login');
  }
});
document.addEventListener('click', (e) => {
  if (authMenu && !authMenu.hidden && !authMenu.contains(e.target)) closeAuthMenu();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && authMenu && !authMenu.hidden) closeAuthMenu();
});

async function doLogout() {
  try { await fetch('/auth/logout', { method: 'POST' }); } catch (e) {}
  currentUser = null;
  currentUserCreatedAt = null;
  updateAuthUI();
  navigate('/');
}
document.querySelectorAll('.auth-menu-item').forEach(item => {
  item.addEventListener('click', () => {
    closeAuthMenu();
    if (item.dataset.action === 'account') navigate('/account');
    else if (item.dataset.action === 'stats') navigate('/stats');
    else if (item.dataset.action === 'logout') doLogout();
  });
});
document.querySelectorAll('[data-modal-close]').forEach(el => {
  el.addEventListener('click', closeAuthModal);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && authModal && !authModal.hidden) closeAuthModal();
});
document.querySelectorAll('.auth-tab').forEach(t => {
  t.addEventListener('click', () => setAuthTab(t.dataset.authTab));
});

function errorMessage(codeOrResponse) {
  const lang = document.documentElement.lang || 'en';
  const t = STRINGS[lang] || STRINGS.en;
  const isObj = codeOrResponse && typeof codeOrResponse === 'object';
  const code = isObj ? codeOrResponse.error : codeOrResponse;
  switch (code) {
    case 'invalid_credentials':  return t.errInvalidCredentials;
    case 'username_taken':       return t.errUsernameTaken;
    case 'password_too_short':   return t.errPasswordTooShort;
    case 'invalid_username':     return t.errInvalidUsername;
    case 'invalid_password':     return t.errInvalidPassword;
    case 'account_locked_temporary': {
      const until = isObj ? codeOrResponse.lockedUntil : null;
      const when = formatAbsoluteDateTime(until) || '';
      return t.errAccountLockedTemporary.replace('{time}', when);
    }
    case 'account_locked_permanent': return t.errAccountLockedPermanent;
    default:                     return t.errNetwork;
  }
}

function showFormMessage(form, text, isSuccess = false) {
  const m = form.querySelector('.form-message');
  if (!m) return;
  m.textContent = text;
  m.classList.toggle('success', !!isSuccess);
  m.hidden = false;
}

async function submitAuthForm(form, url) {
  const data = {
    username: form.username.value.trim(),
    password: form.password.value,
  };
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      showFormMessage(form, errorMessage(j));
      return;
    }
    currentUser = j.username;
    currentUserCreatedAt = j.createdAt || null;
    applySettings(j.settings);
    updateAuthUI();
    closeAuthModal();
  } catch (e) {
    showFormMessage(form, errorMessage());
  }
}
document.getElementById('auth-form-login')?.addEventListener('submit', (e) => {
  e.preventDefault();
  submitAuthForm(e.target, '/auth/login');
});
document.getElementById('auth-form-register')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  if (form.password.value !== form.confirmPassword.value) {
    const lang = document.documentElement.lang || 'en';
    showFormMessage(form, (STRINGS[lang] || STRINGS.en).errPasswordMismatch);
    form.confirmPassword.focus();
    return;
  }
  submitAuthForm(form, '/auth/register');
});

// ---------- account page handlers ------------------------------------

document.getElementById('form-change-username')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  try {
    const r = await fetch('/api/account/username', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newUsername: form.newUsername.value.trim(),
        currentPassword: form.currentPassword.value,
      }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { showFormMessage(form, errorMessage(j.error)); return; }
    currentUser = j.username;
    updateAuthUI();
    form.reset();
    const lang = document.documentElement.lang || 'en';
    showFormMessage(form, (STRINGS[lang] || STRINGS.en).usernameUpdated, true);
  } catch (e) { showFormMessage(form, errorMessage()); }
});

document.getElementById('form-change-password')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  try {
    const r = await fetch('/api/account/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword: form.currentPassword.value,
        newPassword: form.newPassword.value,
      }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { showFormMessage(form, errorMessage(j.error)); return; }
    form.reset();
    const lang = document.documentElement.lang || 'en';
    showFormMessage(form, (STRINGS[lang] || STRINGS.en).passwordUpdated, true);
  } catch (e) { showFormMessage(form, errorMessage()); }
});

document.getElementById('form-delete-account')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const lang = document.documentElement.lang || 'en';
  const warning = (STRINGS[lang] || STRINGS.en).deleteWarning;
  if (!confirm(warning)) return;
  try {
    const r = await fetch('/api/account', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: form.currentPassword.value }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { showFormMessage(form, errorMessage(j.error)); return; }
    currentUser = null;
    currentUserCreatedAt = null;
    updateAuthUI();
    navigate('/');
  } catch (e) { showFormMessage(form, errorMessage()); }
});


// ---------- UI sync --------------------------------------------------

function updateAuthUI() {
  if (authBtn) {
    authBtn.dataset.i18nAriaLabel = currentUser ? 'account' : 'login';
    authBtn.classList.toggle('logged-in', !!currentUser);
    const icon = authBtn.querySelector('.auth-icon');
    const initial = authBtn.querySelector('.auth-initial');
    if (icon && initial) {
      if (currentUser) {
        initial.textContent = currentUser[0].toUpperCase();
        initial.hidden = false;
        icon.hidden = true;
      } else {
        initial.hidden = true;
        icon.hidden = false;
      }
    }
  }
  const menuInitial = document.getElementById('auth-menu-initial');
  const menuUsername = document.getElementById('auth-menu-username');
  if (menuInitial) menuInitial.textContent = currentUser ? currentUser[0].toUpperCase() : '';
  if (menuUsername) menuUsername.textContent = currentUser || '';
  const userEl = document.getElementById('account-username');
  if (userEl) userEl.textContent = currentUser || '';
  const debugLink = document.getElementById('debug-link');
  if (debugLink) debugLink.hidden = currentUser !== 'admin';
  const adminLink = document.getElementById('admin-link');
  if (adminLink) adminLink.hidden = currentUser !== 'admin';
  // Refresh aria-labels in the current language
  applyLanguage(document.documentElement.lang || 'en');
}

async function initAuth() {
  try {
    const r = await fetch('/auth/me');
    const j = await r.json().catch(() => ({}));
    if (j.logged_in) {
      currentUser = j.username;
      currentUserCreatedAt = j.createdAt || null;
      applySettings(j.settings);
    }
  } catch (e) { /* offline / network error — proceed anonymously */ }
  updateAuthUI();
}

initAuth();

fetch('/api/version').then(r => r.json()).then(j => {
  const el = document.getElementById('app-version');
  if (el) el.textContent = 'v' + j.version;
}).catch(() => {});

showRoute(window.location.pathname);
