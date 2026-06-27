// QuestGains v2.14 application logic
// v2.14 update: Fix default tab to Home (was Library). Re-render home after cloud load.

const DEFAULT_CHARACTER = {
  heroName: '',
  level: 1,
  xp: 0,
  xpToNext: 100,
  strength: 12,
  endurance: 12,
  mobility: 10,
  core: 12,
  heroPoints: 0,
  unlockedCharacters: {},
  activeCharId: null,
  activeNodeId: null,
  equippedTitle: null,
  currentStreak: 0,
  lastActiveDate: null,
  streakShieldUsed: null,
  streakBroken: false,
  calorieGoal: 2000,
  proteinGoal: 150,
  badges: [],
  oneRMs: {
    bench: 0,
    squat: 0,
    deadlift: 0,
    ohp: 0
  },
  oneRMsLastUpdated: null,
  waterGoal: 8,
  waterToday: 0,
  waterDate: null,
  waterRewardedDate: null,
  weightUnit: 'lbs',
  templates: [],
  lastSessionVolume: {},
  weeklyVolume: {},
  weeklyVolumeWeek: null,
  recoveryLog: [],
  cardioLog: [],
  questsClaimedToday: 0,
  questsClaimedDate: null,
  totalLevels: 0,
  volumePR: 0,
  mealsLoggedToday: 0,
  fullDayBonusDate: null,
  totalNodesUnlocked: 0,
  weeklyDedicationBonusWeek: null,
  progressTabVisitedDate: null,
  restTimerUsedToday: false,
  restTimerDate: null,
  aiSuggestUsedThisWeek: 0,
  aiSuggestWeek: null,
  soundEnabled: true,
  comboStreak: 0,
  comboDate: null,
  comboMultiplier: 1.0,
  achievements: [],
  totalMealsLogged: 0,
  unlockedGear: [],
  equippedGear: [],
  totalQuestsClaimed: 0,
  totalRecoveryLogs: 0,
  totalMealsEver: 0,
  heroClass: null,
  unlockedThemes: ['default'],
  activeTheme: 'default',
  rivalId: null,
  rivalChallengeStart: null,
  rivalChallengeGoalXP: null,
  weeklyMealLog: {},
  weeklyQuestLog: {},
  heroTabVisited: false,
  libraryTabVisited: false,
  exerciseModalOpened: false,
  planModalOpened: false,
  leaderboardTabVisited: false,
  aiSuggestTotal: 0,
  notificationsEnabled: false,
  notificationPermissionAsked: false
};

const savedCharacter = JSON.parse(localStorage.getItem('character')) || {};
let character = {
  ...DEFAULT_CHARACTER,
  ...savedCharacter,
  unlockedCharacters: savedCharacter.unlockedCharacters || {},
  activeCharId: savedCharacter.activeCharId || savedCharacter.activePath || null,
  activeNodeId: savedCharacter.activeNodeId || null,
  equippedTitle: savedCharacter.equippedTitle || null,
  currentStreak: savedCharacter.currentStreak || 0,
  lastActiveDate: savedCharacter.lastActiveDate || null,
  streakShieldUsed: savedCharacter.streakShieldUsed || null,
  streakBroken: savedCharacter.streakBroken || false,
  calorieGoal: savedCharacter.calorieGoal || 2000,
  proteinGoal: savedCharacter.proteinGoal || 150,
  badges: savedCharacter.badges || [],
  oneRMs: {
    ...DEFAULT_CHARACTER.oneRMs,
    ...(savedCharacter.oneRMs || {})
  },
  oneRMsLastUpdated: savedCharacter.oneRMsLastUpdated || null,
  waterGoal: savedCharacter.waterGoal || 8,
  waterToday: savedCharacter.waterToday || 0,
  waterDate: savedCharacter.waterDate || null,
  waterRewardedDate: savedCharacter.waterRewardedDate || null,
  weightUnit: savedCharacter.weightUnit || 'lbs',
  templates: savedCharacter.templates || [],
  lastSessionVolume: savedCharacter.lastSessionVolume || {},
  weeklyVolume: savedCharacter.weeklyVolume || {},
  weeklyVolumeWeek: savedCharacter.weeklyVolumeWeek || null,
  recoveryLog: savedCharacter.recoveryLog || [],
  cardioLog: savedCharacter.cardioLog || JSON.parse(localStorage.getItem('cardioLog')) || [],
  questsClaimedToday: savedCharacter.questsClaimedToday || 0,
  questsClaimedDate: savedCharacter.questsClaimedDate || null,
  totalLevels: savedCharacter.totalLevels || 0,
  volumePR: savedCharacter.volumePR || 0,
  mealsLoggedToday: savedCharacter.mealsLoggedToday || 0,
  fullDayBonusDate: savedCharacter.fullDayBonusDate || null,
  totalNodesUnlocked: savedCharacter.totalNodesUnlocked || 0,
  weeklyDedicationBonusWeek: savedCharacter.weeklyDedicationBonusWeek || null,
  progressTabVisitedDate: savedCharacter.progressTabVisitedDate || null,
  restTimerUsedToday: savedCharacter.restTimerUsedToday || false,
  restTimerDate: savedCharacter.restTimerDate || null,
  aiSuggestUsedThisWeek: savedCharacter.aiSuggestUsedThisWeek || 0,
  aiSuggestWeek: savedCharacter.aiSuggestWeek || null,
  soundEnabled: savedCharacter.soundEnabled !== false,
  comboStreak: savedCharacter.comboStreak || 0,
  comboDate: savedCharacter.comboDate || null,
  comboMultiplier: savedCharacter.comboMultiplier || 1.0,
  achievements: savedCharacter.achievements || [],
  totalMealsLogged: savedCharacter.totalMealsLogged || 0,
  unlockedGear: savedCharacter.unlockedGear || [],
  equippedGear: (savedCharacter.equippedGear || []).slice(0, 2),
  totalQuestsClaimed: savedCharacter.totalQuestsClaimed || 0,
  totalRecoveryLogs: savedCharacter.totalRecoveryLogs || 0,
  totalMealsEver: savedCharacter.totalMealsEver || 0,
  heroClass: Object.prototype.hasOwnProperty.call(savedCharacter, 'heroClass') ? savedCharacter.heroClass : null,
  unlockedThemes: savedCharacter.unlockedThemes || ['default'],
  activeTheme: savedCharacter.activeTheme || 'default',
  rivalId: savedCharacter.rivalId || null,
  rivalChallengeStart: savedCharacter.rivalChallengeStart || null,
  rivalChallengeGoalXP: savedCharacter.rivalChallengeGoalXP || null,
  weeklyMealLog: savedCharacter.weeklyMealLog || {},
  weeklyQuestLog: savedCharacter.weeklyQuestLog || {}
};

if (!savedCharacter.unlockedCharacters && savedCharacter.activePath && Array.isArray(savedCharacter.unlockedNodes)) {
  character.unlockedCharacters[savedCharacter.activePath] = [...savedCharacter.unlockedNodes];
}

let workoutLog = JSON.parse(localStorage.getItem('workoutLog')) || [];
let progressHistory = JSON.parse(localStorage.getItem('progressHistory')) || [];
let currentSession = [];
let todaysMeals = JSON.parse(localStorage.getItem('todaysMeals')) || [];
let cardioLog = JSON.parse(localStorage.getItem('cardioLog')) || character.cardioLog || [];
let questProgress = JSON.parse(localStorage.getItem('questProgress')) || {
  jumpstartCompleted: [],
  dailyCompleted: [],
  dailyLastDate: null,
  weeklyCompleted: [],
  weeklyLastWeek: null,
  personalCompleted: [],
  bossDefeatedWeek: null
};
let currentQuestSubTab = 0;
let currentTab = 13;
let restTimerInterval = null;
let selectedHeroId = character.activeCharId || (heroRoster[0] ? heroRoster[0].id : null);
let openSetFormIndex = null;
let workoutSuggestionMeta = { note: '', focusMuscles: [] };
let currentRecoveryState = {
  sleep: 7,
  energy: 3,
  soreness: 2
};

window.currentUserId = null;

function buildCharacterState(source = {}) {
  const nextCharacter = {
    ...DEFAULT_CHARACTER,
    ...source,
    unlockedCharacters: source.unlockedCharacters || {},
    activeCharId: source.activeCharId || source.activePath || null,
    activeNodeId: source.activeNodeId || null,
    equippedTitle: source.equippedTitle || null,
    currentStreak: source.currentStreak || 0,
    lastActiveDate: source.lastActiveDate || null,
    streakShieldUsed: source.streakShieldUsed || null,
    streakBroken: source.streakBroken || false,
    calorieGoal: source.calorieGoal || 2000,
    proteinGoal: source.proteinGoal || 150,
    badges: source.badges || [],
    oneRMs: {
      ...DEFAULT_CHARACTER.oneRMs,
      ...(source.oneRMs || {})
    },
    oneRMsLastUpdated: source.oneRMsLastUpdated || null,
    waterGoal: source.waterGoal || 8,
    waterToday: source.waterToday || 0,
    waterDate: source.waterDate || null,
    waterRewardedDate: source.waterRewardedDate || null,
    weightUnit: source.weightUnit || 'lbs',
    templates: source.templates || [],
    lastSessionVolume: source.lastSessionVolume || {},
    weeklyVolume: source.weeklyVolume || {},
    weeklyVolumeWeek: source.weeklyVolumeWeek || null,
    recoveryLog: source.recoveryLog || [],
    cardioLog: source.cardioLog || [],
    questsClaimedToday: source.questsClaimedToday || 0,
    questsClaimedDate: source.questsClaimedDate || null,
    totalLevels: source.totalLevels || 0,
    volumePR: source.volumePR || 0,
    mealsLoggedToday: source.mealsLoggedToday || 0,
    fullDayBonusDate: source.fullDayBonusDate || null,
    totalNodesUnlocked: source.totalNodesUnlocked || 0,
    weeklyDedicationBonusWeek: source.weeklyDedicationBonusWeek || null,
    progressTabVisitedDate: source.progressTabVisitedDate || null,
    restTimerUsedToday: source.restTimerUsedToday || false,
    restTimerDate: source.restTimerDate || null,
    aiSuggestUsedThisWeek: source.aiSuggestUsedThisWeek || 0,
    aiSuggestWeek: source.aiSuggestWeek || null,
    soundEnabled: source.soundEnabled !== false,
    comboStreak: source.comboStreak || 0,
    comboDate: source.comboDate || null,
    comboMultiplier: source.comboMultiplier || 1.0,
    achievements: source.achievements || [],
    totalMealsLogged: source.totalMealsLogged || 0,
    unlockedGear: source.unlockedGear || [],
    equippedGear: (source.equippedGear || []).slice(0, 2),
    totalQuestsClaimed: source.totalQuestsClaimed || 0,
    totalRecoveryLogs: source.totalRecoveryLogs || 0,
    totalMealsEver: source.totalMealsEver || 0,
    heroClass: Object.prototype.hasOwnProperty.call(source, 'heroClass') ? source.heroClass : null,
    unlockedThemes: source.unlockedThemes || ['default'],
    activeTheme: source.activeTheme || 'default',
    rivalId: source.rivalId || null,
    rivalChallengeStart: source.rivalChallengeStart || null,
    rivalChallengeGoalXP: source.rivalChallengeGoalXP || null,
    weeklyMealLog: source.weeklyMealLog || {},
    weeklyQuestLog: source.weeklyQuestLog || {}
  };

  if (!source.unlockedCharacters && source.activePath && Array.isArray(source.unlockedNodes)) {
    nextCharacter.unlockedCharacters[source.activePath] = [...source.unlockedNodes];
  }

  return nextCharacter;
}

function getQuestGainsData() {
  character.cardioLog = cardioLog;
  character.totalNodesUnlocked = getUnlockedNodeCount();

  return {
    character,
    workoutLog,
    progressHistory,
    todaysMeals,
    questProgress,
    cardioLog
  };
}

function clearQuestGainsLocalData() {
  ['character', 'workoutLog', 'progressHistory', 'todaysMeals', 'questProgress', 'cardioLog'].forEach((key) => localStorage.removeItem(key));
}

function applyQuestGainsCloudState(payload = {}) {
  const importedCharacter = payload.character || {};
  character = buildCharacterState(importedCharacter);
  workoutLog = Array.isArray(payload.workoutLog) ? payload.workoutLog : [];
  cardioLog = Array.isArray(payload.cardioLog) ? payload.cardioLog : character.cardioLog || [];
  progressHistory = Array.isArray(payload.progressHistory) ? payload.progressHistory : [];
  todaysMeals = Array.isArray(payload.todaysMeals) ? payload.todaysMeals : [];
  questProgress = payload.questProgress || {
    jumpstartCompleted: [],
    dailyCompleted: [],
    dailyLastDate: null,
    weeklyCompleted: [],
    weeklyLastWeek: null,
    personalCompleted: [],
    bossDefeatedWeek: null
  };
  questProgress.bossDefeatedWeek = questProgress.bossDefeatedWeek || null;
  character.cardioLog = cardioLog;
  character.totalNodesUnlocked = getUnlockedNodeCount();
  selectedHeroId = character.activeCharId || (heroRoster[0] ? heroRoster[0].id : null);
  currentSession = [];
  workoutSuggestionMeta = { note: '', focusMuscles: [] };
  openSetFormIndex = null;

  syncWaterTracker();
  syncMealTracker();
  syncDailyTrackingFlags();
  syncWeeklyTrackingFlags();
  SoundFX.enabled = character.soundEnabled !== false;
  applyTheme(character.activeTheme || 'default');
  saveData();
  updateHeader();
  populateFoodSelect('meal-food-select', nDB, false);
  renderUnitConverter();
  renderClassSelection();
  showTab(currentTab);
  // If home is active, ensure it re-renders with fresh cloud data
  if (currentTab === 13) {
    renderHome();
    // Belt-and-suspenders: re-render after a tick to catch any late DOM updates
    setTimeout(renderHome, 300);
  }
}

window.getQuestGainsData = getQuestGainsData;
window.applyQuestGainsCloudState = applyQuestGainsCloudState;
window.clearQuestGainsLocalData = clearQuestGainsLocalData;

function normalizeExtendedState() {
  character.unlockedGear = Array.from(new Set(character.unlockedGear || []));
  character.equippedGear = Array.from(new Set(character.equippedGear || [])).filter((id) => character.unlockedGear.includes(id)).slice(0, 2);
  character.unlockedThemes = Array.from(new Set(['default', ...((character.unlockedThemes || []))]));
  if (!character.unlockedThemes.includes(character.activeTheme || 'default')) character.activeTheme = 'default';
  if (typeof character.heroClass === 'undefined') character.heroClass = null;
  character.weeklyMealLog = character.weeklyMealLog || {};
  character.weeklyQuestLog = character.weeklyQuestLog || {};
  questProgress.bossDefeatedWeek = questProgress.bossDefeatedWeek || null;
}

function saveData() {
  normalizeExtendedState();
  const snapshot = getQuestGainsData();
  localStorage.setItem('character', JSON.stringify(snapshot.character));
  localStorage.setItem('workoutLog', JSON.stringify(snapshot.workoutLog));
  localStorage.setItem('progressHistory', JSON.stringify(snapshot.progressHistory));
  localStorage.setItem('todaysMeals', JSON.stringify(snapshot.todaysMeals));
  localStorage.setItem('questProgress', JSON.stringify(snapshot.questProgress));
  localStorage.setItem('cardioLog', JSON.stringify(snapshot.cardioLog));

  if (window.currentUserId) {
    if (typeof window.saveUserDataDebounced === 'function') {
      window.saveUserDataDebounced(window.currentUserId, snapshot);
    }
  }
}

function getTodayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function getDisplayDate(dateString) {
  if (!dateString) return '—';
  const parsed = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateString;
  return parsed.toLocaleDateString();
}

function getDaysBetween(dateA, dateB) {
  const first = new Date(`${dateA}T00:00:00`);
  const second = new Date(`${dateB}T00:00:00`);
  if (Number.isNaN(first.getTime()) || Number.isNaN(second.getTime())) return null;
  return Math.round((second - first) / 86400000);
}

function getDistanceUnit() {
  return character.weightUnit === 'kg' ? 'km' : 'miles';
}

function getCurrentWeekStamp() {
  return getWeekStampForDate(getTodayStamp());
}


function getWeekNumber(date = new Date()) {
  const current = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = current.getUTCDay() || 7;
  current.setUTCDate(current.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(current.getUTCFullYear(), 0, 1));
  return Math.ceil((((current - yearStart) / 86400000) + 1) / 7);
}

function getCurrentBossBattle() {
  return bossBattles[getWeekNumber() % bossBattles.length];
}

function getGearItemById(id) {
  return gearItems.find((item) => item.id === id) || null;
}

function getGearBonus(stat) {
  return (character.equippedGear || []).reduce((sum, gearId) => {
    const item = getGearItemById(gearId);
    return sum + ((item && item.stat === stat) ? (Number(item.value) || 0) : 0);
  }, 0);
}

function normalizeStackingBonus(stat, value) {
  const numericValue = Number(value) || 0;
  if (stat === 'xp_multiplier' && numericValue > 1) {
    return numericValue - 1;
  }
  return numericValue;
}

function getTotalBonus(stat) {
  let total = 0;
  const titlePerk = getActivePerk();
  if (titlePerk && titlePerk.type === stat) {
    total += normalizeStackingBonus(stat, titlePerk.value);
  }
  (character.equippedGear || []).forEach((gearId) => {
    const item = gearItems.find((g) => g.id === gearId);
    if (item && item.stat === stat) {
      total += normalizeStackingBonus(stat, item.value);
    }
  });
  return total;
}

function getClassMeta() {
  return heroClasses.find((entry) => entry.id === character.heroClass) || null;
}

function getClassBonus(xp, context) {
  if (!character.heroClass) return xp;
  const cls = character.heroClass;
  if (cls === 'warrior' && context === 'workout') return Math.round(xp * 1.15);
  if (cls === 'rogue' && (context === 'cardio' || context === 'streak')) return Math.round(xp * 1.20);
  if (cls === 'mage' && (context === 'meal' || context === 'quest')) return Math.round(xp * 1.15);
  if (cls === 'paladin') return Math.round(xp * 1.10);
  return xp;
}

function applyTheme(themeId) {
  const theme = appThemes.find((entry) => entry.id === themeId) || appThemes[0];
  const root = document.documentElement;
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-bg', theme.bg);
  character.activeTheme = theme.id;
}

function unlockTheme(themeId) {
  if (!themeId) return;
  character.unlockedThemes = character.unlockedThemes || ['default'];
  if (character.unlockedThemes.includes(themeId)) return;
  const theme = appThemes.find((entry) => entry.id === themeId);
  if (!theme) return;
  character.unlockedThemes.push(themeId);
  showAchievement('🎨', 'Theme Unlocked!', `${theme.name} — ${theme.unlockCondition}`);
}

function getHeroThemeForHero(heroId) {
  const map = {
    'solaris-prime': 'crimson',
    'nightwarden':   'violet',
    'threadstrike':  'amber',
    'mythara':       'cyan',
    'voltflare':     'electric',
    'iron-vanguard': 'steel',
    'stormforged':   'storm',
    'goliath-rift':  'bronze',
    'inevitor':      'indigo',
  };
  return map[heroId] || null;
}

// Leaderboard state
let _lbCurrentTab = 'alltime';
let _cachedRival = null; // { uid, username, xp, level }

function getRivalFromStorage() {
  try {
    const raw = localStorage.getItem('qg_rival');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveRivalToStorage(rivalData) {
  localStorage.setItem('qg_rival', JSON.stringify(rivalData));
  _cachedRival = rivalData;
}

function getRivalPlayer() {
  return _cachedRival || getRivalFromStorage();
}

function checkRivalOvertake(previousXP) {
  const rival = getRivalPlayer();
  if (!rival) return;
  if ((previousXP || 0) <= rival.xp && (character.xp || 0) > rival.xp) {
    showAchievement('👊', 'Rival Crushed!', `You overtook ${rival.username || rival.name}!`);
  }
}

function getBossProgress() {
  const boss = getCurrentBossBattle();
  const currentWeek = getCurrentWeekStamp();
  const weeklyMeals = character.weeklyMealLog?.[currentWeek] || 0;
  const weeklyQuests = character.weeklyQuestLog?.[currentWeek] || 0;
  const workoutCount = getCurrentWeekWorkoutEntries().length;
  const cardioCount = cardioLog.filter((entry) => getWeekStampForDate(entry.date) === currentWeek).length;
  const activityDays = new Set([
    ...getCurrentWeekWorkoutEntries().map((entry) => entry.date),
    ...cardioLog.filter((entry) => getWeekStampForDate(entry.date) === currentWeek).map((entry) => entry.date),
    ...(character.recoveryLog || []).filter((entry) => getWeekStampForDate(entry.date) === currentWeek).map((entry) => entry.date),
    ...Array.from({ length: weeklyMeals > 0 ? 1 : 0 }, () => getTodayStamp())
  ]).size;
  const progressMap = {
    iron_golem: { current: workoutCount, goal: 5 },
    shadow_wraith: { current: activityDays, goal: 7 },
    protein_hydra: { current: weeklyMeals, goal: 21 },
    cardio_specter: { current: cardioCount, goal: 3 },
    quest_overlord: { current: weeklyQuests, goal: 8 }
  };
  return { boss, ...(progressMap[boss.id] || { current: 0, goal: 1 }) };
}

function checkGearUnlocks() {
  const totalWorkouts = workoutLog.length;
  const totalSets = workoutLog.reduce((sum, s) => sum + ((s.session || []).reduce((ss, ex) => ss + ((ex.sets || []).length), 0)), 0);
  const cardioSessions = character.cardioLog?.length || 0;
  const uniqueExercisesTried = new Set(workoutLog.flatMap((entry) => (entry.session || []).map((exercise) => exercise.exerciseId || exercise.name))).size;
  const recoverySleepWins = (character.recoveryLog || []).filter((entry) => Number(entry.sleep) >= 8).length;
  const gymWorkoutCount = workoutLog.filter((entry) => (entry.session || []).some((exercise) => {
    const dbExercise = exDB.find((item) => item.id === exercise.exerciseId);
    return dbExercise?.type === 'gym';
  })).length;
  const legWorkoutCount = workoutLog.filter((entry) => (entry.session || []).some((exercise) => {
    const dbExercise = exDB.find((item) => item.id === exercise.exerciseId);
    return String(dbExercise?.muscles || '').toLowerCase().includes('quad') || String(dbExercise?.muscles || '').toLowerCase().includes('glute') || String(dbExercise?.muscles || '').toLowerCase().includes('hamstring') || String(dbExercise?.muscles || '').toLowerCase().includes('calf');
  })).length;
  const muscleHistory = workoutLog.reduce((set, entry) => {
    (entry.session || []).forEach((exercise) => {
      const dbExercise = exDB.find((item) => item.id === exercise.exerciseId) || exercise.exercise;
      String(dbExercise?.muscles || '').split(',').map((muscle) => muscle.trim().toLowerCase()).forEach((muscle) => {
        if (muscle) set.add(muscle);
      });
    });
    return set;
  }, new Set());
  const hasChestHistory = Array.from(muscleHistory).some((muscle) => muscle.includes('chest'));
  const hasBackHistory = Array.from(muscleHistory).some((muscle) => muscle.includes('back') || muscle.includes('lat'));
  const hasShoulderHistory = Array.from(muscleHistory).some((muscle) => muscle.includes('shoulder') || muscle.includes('delt'));
  const hasLateNightWorkout = workoutLog.some((entry) => {
    const display = String(entry.displayDate || '');
    const dateTime = entry.dateTime || entry.completedAt || null;
    const parsed = dateTime ? new Date(dateTime) : new Date(display);
    return !Number.isNaN(parsed.getTime()) && parsed.getHours() >= 22;
  });

  gearItems.forEach((item) => {
    if ((character.unlockedGear || []).includes(item.id)) return;
    let unlock = false;
    if (item.id === 'warriors_belt' && totalWorkouts >= 5) unlock = true;
    if (item.id === 'champions_wristband' && totalSets >= 20) unlock = true;
    if (item.id === 'iron_boots' && cardioSessions >= 3) unlock = true;
    if (item.id === 'focus_helm' && (character.totalQuestsClaimed || 0) >= 10) unlock = true;
    if (item.id === 'recovery_cape' && (character.totalRecoveryLogs || 0) >= 5) unlock = true;
    if (item.id === 'protein_gauntlets' && (character.totalMealsEver || 0) >= 15) unlock = true;
    if (item.id === 'endurance_amulet' && (character.currentStreak || 0) >= 7) unlock = true;
    if (item.id === 'shadow_gloves' && questProgress.jumpstartCompleted.length >= jumpstartQuests.length) unlock = true;
    if (item.id === 'titans_pauldrons' && gymWorkoutCount >= 10) unlock = true;
    if (item.id === 'windrunners_boots' && cardioSessions >= 5) unlock = true;
    if (item.id === 'mystic_headband' && (character.totalQuestsClaimed || 0) >= 20) unlock = true;
    if (item.id === 'dragon_scale_vest' && (character.currentStreak || 0) >= 14) unlock = true;
    if (item.id === 'storm_bracers' && (character.level || 1) >= 10) unlock = true;
    if (item.id === 'berserkers_gauntlets' && totalSets >= 50) unlock = true;
    if (item.id === 'gravity_boots' && legWorkoutCount >= 5) unlock = true;
    if (item.id === 'healing_totem' && (character.totalRecoveryLogs || 0) >= 10) unlock = true;
    if (item.id === 'champions_crown' && (character.level || 1) >= 15) unlock = true;
    if (item.id === 'shadow_step_wraps' && (character.currentStreak || 0) >= 10) unlock = true;
    if (item.id === 'phantom_cloak' && hasLateNightWorkout) unlock = true;
    if (item.id === 'arcane_scroll' && hasChestHistory && hasBackHistory && hasShoulderHistory) unlock = true;
    if (item.id === 'warriors_seal' && uniqueExercisesTried >= 20) unlock = true;
    if (item.id === 'vitality_ring' && recoverySleepWins >= 5) unlock = true;
    if (unlock) {
      character.unlockedGear.push(item.id);
      showAchievement('⚔️', 'Gear Unlocked!', `${item.name} — ${item.perk}`);
    }
  });
}

function hasUnlockedPerkType(type) {
  return heroRoster.some((hero) => {
    const unlockedNodes = getUnlockedNodeIds(hero.id);
    return hero.nodes.some((node) => unlockedNodes.includes(node.id) && node.perk?.type === type);
  });
}

function getPassivePerkValue(type) {
  return hasUnlockedPerkType(type)
    ? Math.max(...heroRoster.flatMap((hero) => hero.nodes.filter((node) => node.perk?.type === type).map((node) => Number(node.perk?.value) || 0)), 0)
    : 0;
}

function syncQuestClaimTracker() {
  const today = getTodayStamp();
  if (character.questsClaimedDate !== today) {
    character.questsClaimedDate = today;
    character.questsClaimedToday = 0;
  }
}

function syncMealTracker() {
  const today = getTodayStamp();
  if (character.fullDayBonusDate !== today) {
    character.mealsLoggedToday = 0;
  }
}

function syncDailyTrackingFlags() {
  const today = new Date().toDateString();
  if (character.restTimerDate !== today) {
    character.restTimerUsedToday = false;
    character.restTimerDate = today;
  }
}

const LEVELUP_QUOTES = [
  "The weak give up. You level up.",
  "Another level. Another version of you.",
  "Pain is temporary. XP is forever.",
  "Your character grows stronger. So do you.",
  "Heroes aren't born. They grind.",
  "The leaderboard remembers.",
  "Every rep counts. Every level matters.",
  "Stronger than yesterday.",
  "The grind never lies.",
  "Legends don't skip leg day."
];

const SoundFX = {
  ctx: null,
  enabled: true,

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      this.ctx = null;
    }
  },

  play(type) {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    switch (type) {
      case 'xp': this._tone(880, 0.1, 'sine', 0.3); break;
      case 'levelup': this._fanfare(); break;
      case 'quest':
        this._tone(660, 0.15, 'sine', 0.5);
        setTimeout(() => this._tone(880, 0.15, 'sine', 0.3), 150);
        break;
      case 'click': this._tone(440, 0.05, 'sine', 0.1); break;
      case 'unlock': this._tone(523, 0.1, 'triangle', 0.4); break;
      case 'achievement': this._fanfare(); break;
      default: break;
    }
  },

  _tone(freq, duration, type, volume) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + duration);
  },

  _fanfare() {
    [[523, 0], [659, 0.1], [784, 0.2], [1047, 0.35]].forEach(([freq, time]) => {
      setTimeout(() => this._tone(freq, 0.3, 'sine', 0.4), time * 1000);
    });
  }
};

let levelUpOverlayTimeout = null;
let achievementToastTimeout = null;

function updateSoundToggleButton() {
  const button = document.getElementById('sound-toggle-btn');
  if (!button) return;
  const icon = button.querySelector('span:first-child') || button;
  icon.textContent = character.soundEnabled === false ? '🔇' : '🔊';
  button.setAttribute('aria-label', character.soundEnabled === false ? 'Enable sound' : 'Disable sound');
}

window.toggleSound = function toggleSound() {
  character.soundEnabled = character.soundEnabled === false;
  SoundFX.enabled = character.soundEnabled;
  updateSoundToggleButton();
  saveData();
  if (character.soundEnabled) SoundFX.play('click');
};

function triggerButtonClickSound() {
  SoundFX.play('click');
}

function applyCombo(xp) {
  let totalXP = Math.round(xp * (character.comboMultiplier || 1.0));
  const hour = new Date().getHours();
  const hasNightOwlBonus = (character.equippedGear || []).some((gearId) => {
    const item = getGearItemById(gearId);
    return item?.stat === 'night_owl_bonus';
  });
  if (hasNightOwlBonus && (hour >= 22 || hour <= 5)) {
    totalXP = Math.round(totalXP * 1.20);
  }
  return totalXP;
}

function updateCombo() {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (character.comboDate === today) return;

  if (character.comboDate === yesterday) {
    character.comboStreak = (character.comboStreak || 0) + 1;
  } else if (character.comboDate !== today) {
    character.comboStreak = 1;
  }

  character.comboDate = today;
  character.comboMultiplier = Math.min(3.0, 1.0 + ((character.comboStreak || 1) - 1) * 0.1);
  saveData();
}

function showAchievement(icon, name, desc) {
  const toast = document.getElementById('achievement-toast');
  if (!toast) return;
  document.getElementById('achievement-icon').textContent = icon;
  document.getElementById('achievement-name').textContent = name;
  document.getElementById('achievement-desc').textContent = desc;
  toast.classList.remove('hidden');
  toast.style.animation = 'none';
  void toast.offsetHeight;
  toast.style.animation = 'slideDown 0.4s ease forwards';
  SoundFX.play('achievement');
  if (achievementToastTimeout) clearTimeout(achievementToastTimeout);
  achievementToastTimeout = setTimeout(() => {
    toast.style.animation = 'slideUp 0.4s ease forwards';
    setTimeout(() => toast.classList.add('hidden'), 400);
  }, 3000);
}

function unlockAchievement(id, icon, name, desc) {
  character.achievements = character.achievements || [];
  if (character.achievements.includes(id)) return false;
  character.achievements.push(id);
  saveData();
  showAchievement(icon, name, desc);
  return true;
}

function checkProgressAchievements() {
  if (workoutLog.length >= 1) unlockAchievement('first_workout', '🩸', 'First Blood', 'Complete your first workout session');
  if ((character.level || 0) >= 5) unlockAchievement('level_5', '⚡', 'Rising Hero', 'Reached Level 5');
  if ((character.level || 0) >= 10) unlockAchievement('level_10', '🎖️', 'Veteran', 'Reached Level 10');
  if ((character.currentStreak || 0) >= 7) unlockAchievement('streak_7', '🔥', 'On Fire', '7 days straight');
  if ((character.totalMealsLogged || 0) >= 10) unlockAchievement('meals_10', '🍽️', 'Fueled Up', 'Log 10 meals');
  if ((character.totalNodesUnlocked || 0) >= 1) unlockAchievement('first_node', '✨', 'Power Awakens', 'Unlock your first skill node');
  if ((character.comboMultiplier || 1) >= 3) unlockAchievement('combo_3x', '💪', 'Unstoppable', 'Hit a 3× XP combo streak');
  const oneRMLogged = Object.values(character.oneRMs || {}).some((value) => Number(value) > 0);
  if (oneRMLogged) unlockAchievement('first_1rm', '🏋️', 'Iron Numbers', 'Log your first 1RM PR');
}

function renderLevelUpConfetti() {
  const confetti = document.getElementById('levelup-confetti');
  if (!confetti) return;
  const colors = ['#22c55e', '#3b82f6', '#facc15', '#f97316', '#ec4899', '#a855f7'];
  confetti.innerHTML = '';
  for (let index = 0; index < 20; index += 1) {
    const piece = document.createElement('div');
    piece.className = 'levelup-confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDuration = `${2.2 + Math.random() * 1.8}s`;
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.appendChild(piece);
  }
}

function showLevelUpOverlay(level, heroPoints) {
  const overlay = document.getElementById('levelup-overlay');
  if (!overlay) return;
  document.getElementById('levelup-number').textContent = String(level);
  document.getElementById('levelup-title').textContent = `You earned ${heroPoints} Hero Points`;
  document.getElementById('levelup-subtitle').textContent = LEVELUP_QUOTES[(Math.max(level, 1) - 1) % LEVELUP_QUOTES.length];
  renderLevelUpConfetti();
  overlay.classList.remove('hidden');
  SoundFX.play('levelup');
  if (levelUpOverlayTimeout) clearTimeout(levelUpOverlayTimeout);
  levelUpOverlayTimeout = setTimeout(() => {
    closeLevelUpOverlay();
  }, 4000);
}

window.closeLevelUpOverlay = function closeLevelUpOverlay() {
  const overlay = document.getElementById('levelup-overlay');
  if (overlay) overlay.classList.add('hidden');
  if (levelUpOverlayTimeout) {
    clearTimeout(levelUpOverlayTimeout);
    levelUpOverlayTimeout = null;
  }
};

function syncWeeklyTrackingFlags() {
  const currentWeek = getCurrentWeekStamp();
  if (character.aiSuggestWeek !== currentWeek) {
    character.aiSuggestWeek = currentWeek;
    character.aiSuggestUsedThisWeek = 0;
  }
}

function tryUseStreakShield() {
  const activePerk = getActivePerk();
  const activeShield = activePerk && activePerk.type === 'streak_shield' ? activePerk.value : 0;
  const gearShield = getGearBonus('streak_shield');
  const shieldCharges = Math.max(activeShield, gearShield);
  if (!shieldCharges) return false;
  const currentWeek = getCurrentWeekStamp();
  const used = character.streakShieldUsed && character.streakShieldUsed.week === currentWeek ? character.streakShieldUsed.count : 0;
  if (used >= shieldCharges) return false;
  character.streakShieldUsed = { week: currentWeek, count: used + 1 };
  alert('🛡️ Streak Shield activated! Your streak is protected.');
  return true;
}

function updateActivityStreak(options = {}) {
  const { allowShield = false } = options;
  const today = getTodayStamp();
  if (character.lastActiveDate === today) return;
  const dayGap = character.lastActiveDate ? getDaysBetween(character.lastActiveDate, today) : null;
  if (dayGap === 1) {
    character.currentStreak = (character.currentStreak || 0) + 1;
    character.streakBroken = false;
  } else if (dayGap !== null && dayGap > 1) {
    if (allowShield && tryUseStreakShield()) {
      character.lastActiveDate = today;
      return;
    }
    character.currentStreak = 1;
    character.streakBroken = true;
  } else {
    character.currentStreak = 1;
  }
  character.lastActiveDate = today;
}

function syncWaterTracker() {
  const today = getTodayStamp();
  if (character.waterDate !== today) {
    character.waterToday = 0;
    character.waterDate = today;
  }
}

function updateHeader() {
  document.getElementById('level').textContent = character.level;
  document.getElementById('xp').textContent = character.xp;
  document.getElementById('xp-next').textContent = character.xpToNext;
  document.getElementById('hero-points').textContent = character.heroPoints || 0;
  document.getElementById('hero-points-display').textContent = character.heroPoints || 0;
  const streakEl = document.getElementById('header-streak');
  if (streakEl) streakEl.textContent = `${character.currentStreak || 0} day streak`;
  const comboEl = document.getElementById('header-combo');
  if (comboEl) {
    if ((character.comboStreak || 0) >= 3) {
      comboEl.textContent = `🔥 ${(character.comboMultiplier || 1).toFixed(1).replace('.0', '')}× Combo`;
    } else {
      comboEl.textContent = `${character.comboStreak || 0} combo day${(character.comboStreak || 0) === 1 ? '' : 's'}`;
    }
  }
  updateSoundToggleButton();
  updateNotifButton();
  updateTrialBanner();
}

function updateTrialBanner() {
  const banner = document.getElementById('trial-banner');
  if (!banner) return;
  const appShell = document.getElementById('app-shell');

  if (typeof window.isProUser !== 'function') {
    banner.classList.add('hidden');
    if (appShell) appShell.style.paddingTop = '';
    return;
  }

  const daysLeft = typeof window.getTrialDaysRemaining === 'function' ? window.getTrialDaysRemaining() : 0;
  const trialExpired = typeof window.isTrialExpired === 'function' ? window.isTrialExpired() : false;

  if (window.isProUser() && daysLeft > 0) {
    // Active trial
    banner.className = 'fixed top-0 left-0 right-0 z-[85] text-center py-2 px-4 text-sm font-semibold bg-green-600 text-white';
    banner.innerHTML = `🎉 Pro Trial: ${daysLeft} day${daysLeft === 1 ? '' : 's'} remaining — <button onclick="window.openUpgradeFlow('monthly')" class="underline hover:text-green-200">Upgrade to keep access</button>`;
    banner.classList.remove('hidden');
    if (appShell) appShell.style.paddingTop = '36px';
  } else if (trialExpired) {
    // Trial expired, not Pro
    banner.className = 'fixed top-0 left-0 right-0 z-[85] text-center py-2 px-4 text-sm font-semibold bg-red-700 text-white';
    banner.innerHTML = `Your trial has ended — <button onclick="window.openUpgradeFlow('monthly')" class="underline hover:text-red-200">Upgrade to keep Pro features</button>`;
    banner.classList.remove('hidden');
    if (appShell) appShell.style.paddingTop = '36px';
  } else {
    banner.classList.add('hidden');
    if (appShell) appShell.style.paddingTop = '';
  }
}

function getHeroById(heroId) {
  return heroRoster.find((hero) => hero.id === heroId) || null;
}

function getUnlockedNodeIds(heroId) {
  return character.unlockedCharacters[heroId] || [];
}

function getUnlockedNodeCount() {
  return Object.values(character.unlockedCharacters || {}).reduce((sum, nodes) => sum + nodes.length, 0);
}

function getActivePerk() {
  if (!character.activeCharId || !character.activeNodeId) return null;
  const hero = getHeroById(character.activeCharId);
  if (!hero) return null;
  const node = hero.nodes.find((entry) => entry.id === character.activeNodeId);
  return node ? node.perk : null;
}

function getActivePerkNode() {
  if (!character.activeCharId || !character.activeNodeId) return null;
  const hero = getHeroById(character.activeCharId);
  if (!hero) return null;
  return hero.nodes.find((entry) => entry.id === character.activeNodeId) || null;
}

function applyXPMultiplier(baseXP, context = 'generic') {
  let finalXP = baseXP;
  const perk = getActivePerk();
  const today = new Date();
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;
  const stackedMultiplier = getTotalBonus('xp_multiplier');

  if (stackedMultiplier > 0) {
    finalXP *= (1 + stackedMultiplier);
  }

  if (perk && perk.type === 'weekend_xp_multiplier' && isWeekend) {
    finalXP *= perk.value;
  }

  const collectorMultiplier = getPassivePerkValue('hero_collector_multiplier');
  if (collectorMultiplier > 0 && (character.totalNodesUnlocked || 0) >= 10) {
    finalXP *= collectorMultiplier;
  }

  if (getGearBonus('streak_double_day') > 0 && (character.currentStreak || 0) >= getGearBonus('streak_double_day')) {
    finalXP *= 2;
  }

  return getClassBonus(Math.round(finalXP), context);
}

function getFlatPerkBonus(type) {
  return getTotalBonus(type);
}

function awardXP(baseXP, context = 'generic') {
  const previousXP = character.xp || 0;
  const comboXP = applyCombo(baseXP);
  const finalXP = applyXPMultiplier(comboXP, context);
  character.xp += finalXP;
  SoundFX.play('xp');
  checkRivalOvertake(previousXP);
  // Weekly XP tracking (for leaderboard) — fire-and-forget
  if (window.currentUserId && typeof window.incrementWeeklyXP === 'function') {
    window.incrementWeeklyXP(window.currentUserId, finalXP);
  }
  return finalXP;
}

function sumVolumeMap(volumeMap) {
  return Object.values(volumeMap || {}).reduce((sum, value) => sum + (Number(value) || 0), 0);
}

function getWorkoutCountForWeek(weekStamp) {
  return workoutLog.filter((entry) => getWeekStampForDate(entry.date) === weekStamp).length;
}

function getQuestRushBonusXP() {
  syncQuestClaimTracker();
  character.questsClaimedToday = (character.questsClaimedToday || 0) + 1;
  const perk = getActivePerk();
  if (perk && perk.type === 'quest_rush_bonus' && character.questsClaimedToday === 3) {
    const bonusXP = awardXP(perk.value);
    alert(`⚡ Quest Rush! Bonus XP for 3 quests today! (+${bonusXP} XP)`);
    return bonusXP;
  }
  return 0;
}

function levelUp() {
  while (character.xp >= character.xpToNext) {
    const heroPointBonus = getFlatPerkBonus('hero_point_bonus');
    const xpReduction = getFlatPerkBonus('xp_to_next_reduction');
    let earnedHeroPoints = 2 + heroPointBonus;

    character.level += 1;
    character.totalLevels = (character.totalLevels || 0) + 1;
    character.xp -= character.xpToNext;
    const nextBase = Math.floor(character.xpToNext * 1.3);
    character.xpToNext = Math.max(50, Math.floor(nextBase * (1 - xpReduction)));
    character.strength += 3;
    character.endurance += 3;
    character.mobility += 2;
    character.core += 2;

    const surgePerk = getActivePerk();
    if (surgePerk && surgePerk.type === 'level_surge' && character.level % 5 === 0) {
      earnedHeroPoints += surgePerk.value;
    }

    character.heroPoints = (character.heroPoints || 0) + earnedHeroPoints;
    showLevelUpOverlay(character.level, earnedHeroPoints);
    checkProgressAchievements();
  }
}

/**
 * Injects a full-screen paywall overlay over a tab's content if user is not Pro.
 * Removes the overlay if user IS Pro (so Pro users see content normally).
 */
function applyProGateOverlay(screenNum, featureName) {
  const screen = document.getElementById(`screen${screenNum}`);
  if (!screen) return;
  // Remove any existing overlay
  const existing = screen.querySelector('.pro-gate-overlay');
  if (existing) existing.remove();

  if (typeof window.isProUser === 'function' && !window.isProUser()) {
    const overlay = document.createElement('div');
    overlay.className = 'pro-gate-overlay absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-950/95 rounded-3xl p-6 text-center';
    overlay.innerHTML = `
      <div class="text-4xl mb-3">👑</div>
      <div class="text-lg font-bold text-white mb-1">${featureName}</div>
      <div class="text-sm text-gray-400 mb-5">This feature requires QuestGains Pro</div>
      <button onclick="window.showPaywall('${featureName}')" class="bg-green-500 hover:bg-green-400 px-6 py-3 rounded-2xl font-bold text-gray-950">Unlock with Pro</button>
    `;
    screen.style.position = 'relative';
    screen.appendChild(overlay);
  }
}

function showTab(n) {
  currentTab = n;
  document.querySelectorAll('.tab-screen').forEach((screen) => screen.classList.add('hidden'));
  document.getElementById(`screen${n}`).classList.remove('hidden');
  document.querySelectorAll('button[id^="tab"]').forEach((button) => button.classList.remove('tab-active'));
  document.getElementById(`tab${n}`).classList.add('tab-active');

  if (n === 3) {
    character.progressTabVisitedDate = new Date().toDateString();
    saveData();
  }
  if (n === 4 && !character.heroTabVisited) {
    character.heroTabVisited = true;
    saveData();
  }
  if (n === 0 && !character.libraryTabVisited) {
    character.libraryTabVisited = true;
    saveData();
  }
  if (n === 6 && !character.leaderboardTabVisited) {
    character.leaderboardTabVisited = true;
    saveData();
  }

  if (n === 0) renderLibrary();
  if (n === 1) renderCurrentSession();
  if (n === 2) { renderPlans(); }
  if (n === 3) renderProgress();
  if (n === 4) renderHero();
  if (n === 5) renderQuests();
  if (n === 6) renderLeaderboard();
  if (n === 7) { renderNutrition(); }
  if (n === 8) { renderMealLogger(); }
  if (n === 9) renderUnitConverter(false);
  if (n === 10) renderWorkoutHistory();
  if (n === 11) { renderCardio(); }
  if (n === 12) renderGearTab();
  if (n === 13) renderHome();
  if (n === 14) renderProScreen();
}

// Safety re-render: if home screen elements are empty after 1.5s, re-render
function scheduleHomeRerender() {
  setTimeout(() => {
    const statsEl = document.getElementById('home-stats');
    const questsEl = document.getElementById('home-daily-quests');
    if (statsEl && questsEl && (!statsEl.innerHTML.trim() || !questsEl.innerHTML.trim())) {
      renderHome();
    }
  }, 1500);
}

// ── Home Tab ───────────────────────────────────────────────────────────────
function renderHome() {
  const greetingEl = document.getElementById('home-greeting');
  const statsEl = document.getElementById('home-stats');
  const dailyQuestsEl = document.getElementById('home-daily-quests');
  const quickStatsEl = document.getElementById('home-quick-stats');
  if (!greetingEl) return;

  // Greeting
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const heroName = character.heroName || character.name || 'Hero';
  const level = character.level || 1;
  const xp = character.xp || 0;
  const xpToNext = character.xpToNext || 100;
  const pct = Math.min(100, Math.round((xp / xpToNext) * 100));

  greetingEl.innerHTML = `
    <div class="bg-gradient-to-br from-green-900/40 to-gray-900 border border-green-800/30 rounded-3xl p-5">
      <div class="flex items-start justify-between gap-2 mb-1">
        <div class="text-2xl font-black text-white">${timeOfDay}, ${heroName}! 👊</div>
        <button onclick="toggleHeroNameEditor()" class="text-gray-500 hover:text-green-400 text-xs mt-1 shrink-0">✏️ Edit</button>
      </div>
      <div class="text-sm text-green-400 mb-3">Level ${level} • ${xp.toLocaleString()} XP</div>
      <div class="w-full bg-gray-800 rounded-full h-2">
        <div class="bg-green-500 h-2 rounded-full transition-all" style="width:${pct}%"></div>
      </div>
      <div class="text-xs text-gray-400 mt-1">${xp.toLocaleString()} / ${xpToNext.toLocaleString()} XP to next level</div>
    </div>
  `;

  // Stat cards
  const streak = character.streak || 0;
  const totalWorkouts = workoutLog.length || 0;
  const heroPoints = character.heroPoints || 0;
  statsEl.innerHTML = [
    { icon: '🔥', label: 'Streak', value: `${streak}d` },
    { icon: '🏋️', label: 'Workouts', value: totalWorkouts },
    { icon: '⚡', label: 'Hero Pts', value: heroPoints },
  ].map((s) => `
    <div class="bg-gray-900 rounded-3xl p-3 text-center">
      <div class="text-2xl mb-1">${s.icon}</div>
      <div class="text-lg font-bold text-white">${s.value}</div>
      <div class="text-xs text-gray-400">${s.label}</div>
    </div>
  `).join('');

  // Today's daily quests (up to 4)
  const completed = questProgress.dailyCompleted || [];
  const pending = dailyQuests.filter((q) => !completed.includes(q.id)).slice(0, 4);
  if (pending.length) {
    dailyQuestsEl.innerHTML = pending.map((q) => `
      <div class="flex items-center justify-between bg-gray-800 rounded-2xl px-4 py-3">
        <div class="text-sm font-medium text-white">${q.name}</div>
        <div class="text-green-400 text-xs font-bold ml-3 shrink-0">+${q.xp} XP</div>
      </div>
    `).join('');
  } else {
    dailyQuestsEl.innerHTML = '<p class="text-green-400 text-sm text-center py-2">✅ All daily quests complete!</p>';
  }

  // Quick stats
  const lastWorkout = workoutLog.length ? workoutLog[workoutLog.length - 1] : null;
  const lastDate = lastWorkout ? (lastWorkout.date || 'Unknown') : 'None yet';
  const weekEntries = getCurrentWeekWorkoutEntries ? getCurrentWeekWorkoutEntries() : [];
  quickStatsEl.innerHTML = [
    { label: 'Last workout', value: lastDate },
    { label: 'This week', value: `${weekEntries.length} session${weekEntries.length !== 1 ? 's' : ''}` },
    { label: 'Total XP earned', value: `${xp.toLocaleString()} XP` },
  ].map((s) => `
    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-400">${s.label}</span>
      <span class="text-white font-medium">${s.value}</span>
    </div>
  `).join('');
}
window.showTab = showTab;

// ── Pro / Account Screen ───────────────────────────────────────────────────
let _selectedPlan = 'annual'; // default selection

window.showProScreen = function showProScreen() {
  currentTab = 14;
  document.querySelectorAll('.tab-screen').forEach((s) => s.classList.add('hidden'));
  document.getElementById('screen14').classList.remove('hidden');
  document.querySelectorAll('button[id^="tab"]').forEach((b) => b.classList.remove('tab-active'));
  renderProScreen();
  const backBtn = document.getElementById('pro-back-btn');
  if (backBtn) backBtn.onclick = () => showTab(4);
};

window.selectPlan = function selectPlan(plan) {
  _selectedPlan = plan;
  document.querySelectorAll('.plan-option').forEach((el) => {
    el.classList.remove('border-green-500', 'border-yellow-500');
    el.classList.add('border-transparent');
  });
  const target = document.getElementById(`plan-${plan}`);
  if (target) {
    const highlight = plan === 'founding' ? 'border-yellow-500' : 'border-green-500';
    target.classList.remove('border-transparent');
    target.classList.add(highlight);
  }
  const upgradeBtn = document.getElementById('pro-upgrade-btn');
  if (upgradeBtn) {
    const labels = { monthly: 'Subscribe — 1 Month · $4.99', annual: 'Subscribe — 1 Year · $39.99', founding: 'Become a Founding Member — $2.99/mo' };
    upgradeBtn.textContent = labels[plan] || 'Upgrade to Pro';
  }
};

async function renderProScreen() {
  const statusCard = document.getElementById('pro-status-content');
  const planSelector = document.getElementById('pro-plan-selector');
  const manageSection = document.getElementById('pro-manage-section');
  const trialBtn = document.getElementById('pro-trial-btn');
  const heroPropBtn = document.getElementById('hero-pro-btn');
  if (!statusCard) return;

  const isPro = typeof window.isProUser === 'function' && window.isProUser();
  const isFounding = typeof window.isFoundingMember === 'function' && window.isFoundingMember();
  const trialDays = typeof window.getTrialDaysRemaining === 'function' ? window.getTrialDaysRemaining() : 0;
  const trialExpired = typeof window.isTrialExpired === 'function' && window.isTrialExpired();

  // isTrial = isProUser() true but only because of free trial, not a paid subscription
  const isTrial = trialDays > 0 && !_isSavedPaidSubscriber();
  if (isPro) {
    const planLabel = isFounding ? '👑 Founding Member'
      : isTrial ? `🎉 Free Trial — ${trialDays} day${trialDays !== 1 ? 's' : ''} left`
      : '✅ QuestGains Pro';
    statusCard.innerHTML = `
      <div class="text-center py-2">
        <div class="text-3xl mb-2">${isFounding ? '👑' : isTrial ? '🎉' : '✅'}</div>
        <div class="text-lg font-bold text-green-400">${planLabel}</div>
        <div class="text-sm text-gray-400 mt-1">${isTrial ? 'Free trial active — upgrade to keep access' : 'You have full Pro access'}</div>
      </div>`;
    if (planSelector) {
      // Show plan selector for trial users so they can upgrade
      if (isTrial) planSelector.classList.remove('hidden');
      else planSelector.classList.add('hidden');
    }
    // Manage section: on native iOS always show for any pro/trial/founding user —
    // it opens iOS Settings path, not Stripe. On web, hide for trial/founding
    // users who have no Stripe customer.
    if (manageSection) {
      const onNativeIOS = !!(window.webkit && window.webkit.messageHandlers &&
        (window.webkit.messageHandlers['sign-in-with-apple'] ||
         window.webkit.messageHandlers['open-subscriptions']));
      if (onNativeIOS) {
        manageSection.classList.remove('hidden'); // always show on iOS
      } else if (isTrial || isFounding) {
        manageSection.classList.add('hidden');    // no Stripe customer on web trial
      } else {
        manageSection.classList.remove('hidden');
      }
    }
    if (heroPropBtn) heroPropBtn.textContent = isTrial ? '🎉 Free Trial Active' : '👑 Pro Member';
  } else {
    statusCard.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="text-2xl">${trialExpired ? '⏰' : '🆓'}</div>
        <div>
          <div class="text-sm font-bold text-white">${trialExpired ? 'Trial Expired' : 'Free Plan'}</div>
          <div class="text-xs text-gray-400">${trialExpired ? 'Upgrade to restore full access' : 'Upgrade anytime to unlock everything'}</div>
        </div>
      </div>`;
    if (planSelector) planSelector.classList.remove('hidden');
    if (manageSection) manageSection.classList.add('hidden');
    if (trialBtn) {
      if (!trialExpired) {
        trialBtn.classList.remove('hidden');
      } else {
        trialBtn.classList.add('hidden');
      }
    }
  }

  const foundingEl = document.getElementById('plan-founding');
  const slotsEl = document.getElementById('pro-founding-slots');
  if (foundingEl && typeof window.getFoundingMemberCount === 'function') {
    const count = await window.getFoundingMemberCount();
    const slotsLeft = Math.max(0, 500 - count);
    // On native iOS, hide founding plan — no IAP product ID exists until v1.1.
    // Only show on web (Stripe path).
    const onNativeIOSForFounding = !!(window.webkit && window.webkit.messageHandlers &&
      (window.webkit.messageHandlers['sign-in-with-apple'] ||
       window.webkit.messageHandlers['open-subscriptions']));
    if (!onNativeIOSForFounding && slotsLeft > 0 && (!isPro || isTrial)) {
      foundingEl.classList.remove('hidden');
      if (slotsEl) slotsEl.textContent = `Only ${slotsLeft} founding spots remaining — locked forever`;
    } else {
      foundingEl.classList.add('hidden');
    }
  }

  selectPlan(_selectedPlan);
}

window.startProCheckout = function startProCheckout() {
  if (typeof window.openUpgradeFlow === 'function') {
    window.openUpgradeFlow(_selectedPlan);
  }
};

window.startProTrial = async function startProTrial() {
  const uid = window.currentUserId;
  if (!uid) { alert('Please sign in first.'); return; }
  if (typeof window.startTrial === 'function') {
    await window.startTrial(uid);
    alert('🎉 Your 14-day Pro trial has started! Enjoy full access.');
    if (typeof window.updateHeader === 'function') window.updateHeader();
    renderProScreen();
  }
};

window.toggleThemePanel = function toggleThemePanel() {
  const panel = document.getElementById('theme-panel');
  const arrow = document.getElementById('theme-arrow');
  if (!panel) return;
  const open = panel.classList.toggle('hidden');
  if (arrow) arrow.style.transform = open ? '' : 'rotate(180deg)';
};

window.toggleHeroNameEditor = function toggleHeroNameEditor() {
  const editor = document.getElementById('home-name-editor');
  const input = document.getElementById('hero-name-input');
  if (!editor) return;
  const isHidden = editor.classList.toggle('hidden');
  if (!isHidden && input) {
    input.value = character.heroName || '';
    input.focus();
  }
};

window.saveHeroName = function saveHeroName() {
  const input = document.getElementById('hero-name-input');
  if (!input) return;
  const name = input.value.trim();
  if (!name) return;
  if (typeof window.containsProfanityInUsername === 'function' && window.containsProfanityInUsername(name)) {
    alert('That name is not allowed. Please choose a different one.');
    return;
  }
  character.heroName = name;
  saveData();
  document.getElementById('home-name-editor').classList.add('hidden');
  renderHome();
};

function getMuscleList(exercise) {
  return String(exercise?.muscles || '').split(',').map((part) => part.trim()).filter(Boolean);
}

function formatWeight(weight, unit) {
  if (!weight) return unit === 'kg' ? 'Bodyweight' : 'Bodyweight';
  const rounded = Math.round(weight * 100) / 100;
  return `${rounded} ${unit}`;
}

function formatSetLine(set, index, exercise) {
  const bodyweightLabel = (!set.weight && exercise?.type === 'bodyweight') ? 'Bodyweight' : formatWeight(set.weight, set.unit || character.weightUnit || 'lbs');
  return `Set ${index + 1}: ${set.reps} reps × ${bodyweightLabel}`;
}

function formatCompactSetLine(set, index) {
  const load = !set.weight ? 'Bodyweight' : `${set.weight} ${set.unit || character.weightUnit || 'lbs'}`;
  return `Set ${index + 1}: ${set.reps} × ${load}`;
}

function renderLibrary(filtered = exDB) {
  const container = document.getElementById('exercise-list');
  container.innerHTML = '';
  filtered.forEach((exercise) => {
    const div = document.createElement('div');
    div.className = 'bg-gray-900 p-4 rounded-3xl cursor-pointer hover:bg-gray-800 transition-colors';
    div.innerHTML = `<div class="font-semibold text-lg">${exercise.name}</div><div class="text-green-400 text-sm">Builds: ${exercise.muscles}</div><div class="text-gray-400 text-xs mt-1">${exercise.description.substring(0, 110)}...</div>`;
    div.onclick = () => showExerciseDetail(exercise.id);
    container.appendChild(div);
  });
}

window.filterExercises = function filterExercises() {
  const filter = document.getElementById('equipment-filter').value;
  const searchEl = document.getElementById('exercise-search');
  const searchTerm = searchEl ? searchEl.value.toLowerCase().trim() : '';
  let filtered = exDB;
  if (filter !== 'all') filtered = filtered.filter((exercise) => exercise.type === filter);
  if (searchTerm) {
    filtered = filtered.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchTerm) ||
      exercise.muscles.toLowerCase().includes(searchTerm)
    );
  }
  renderLibrary(filtered);
};

let exerciseImageInterval = null;

function showExerciseDetail(id) {
  const exercise = exDB.find((entry) => entry.id === id);
  if (!exercise) return;
  if (!character.exerciseModalOpened) { character.exerciseModalOpened = true; saveData(); }
  document.getElementById('modal-name').textContent = exercise.name;
  document.getElementById('modal-muscles').textContent = `Builds: ${exercise.muscles}`;
  document.getElementById('modal-main-image').src = exercise.image;
  const cuesList = document.getElementById('modal-cues');
  cuesList.innerHTML = '';
  exercise.cues.forEach((cue) => {
    const li = document.createElement('li');
    li.textContent = `→ ${cue}`;
    cuesList.appendChild(li);
  });
  const plateInput = document.getElementById('plate-target-weight');
  const plateUnit = document.getElementById('plate-unit-label');
  const plateResult = document.getElementById('plate-result');
  if (plateInput) plateInput.value = '';
  if (plateUnit) plateUnit.textContent = character.weightUnit;
  if (plateResult) plateResult.innerHTML = '<div class="text-gray-400">Enter a target barbell weight to see the plates per side.</div>';
  document.getElementById('plate-calculator-panel').dataset.exerciseId = String(exercise.id);

  clearInterval(exerciseImageInterval);
  exerciseImageInterval = null;
  const imgEl = document.getElementById('modal-main-image');

  imgEl.src = exercise.image;

  if (exercise.image.includes('/exercise-images/')) {
    // AI-generated images — cycle between _1.jpg and _2.jpg phase images if they exist
    const baseUrl = exercise.image.replace(/\.jpg$/, '');
    const frame1 = baseUrl + '_1.jpg';
    const frame2 = baseUrl + '_2.jpg';
    // Show main image first, then test if phase images exist
    const testImg = new Image();
    testImg.onload = () => {
      // Phase images exist — cycle: main → _1 → _2 → main
      const frames = [exercise.image, frame1, frame2];
      let frame = 0;
      exerciseImageInterval = setInterval(() => {
        frame = (frame + 1) % frames.length;
        imgEl.src = frames[frame];
      }, 2500);
    };
    testImg.onerror = () => {
      // No phase images — just show the main image statically
      clearInterval(exerciseImageInterval);
    };
    testImg.src = frame1;
  } else {
    // yuhonas free-exercise-db format — try cycling between frame 0 and 1
    const baseUrl = exercise.image.replace(/\/\d+\.jpg$/, '');
    let frame = 0;
    const testImg = new Image();
    testImg.onload = () => {
      exerciseImageInterval = setInterval(() => {
        frame = (frame + 1) % 2;
        imgEl.src = `${baseUrl}/${frame}.jpg`;
      }, 2500);
    };
    testImg.onerror = () => {};
    testImg.src = `${baseUrl}/1.jpg`;
  }

  document.getElementById('exercise-modal').classList.remove('hidden');
}

window.hideModal = function hideModal() {
  clearInterval(exerciseImageInterval);
  exerciseImageInterval = null;
  document.getElementById('exercise-modal').classList.add('hidden');
};

function renderPlans() {
  const container = document.getElementById('plans-list');
  container.innerHTML = '';

  const templatesSection = document.createElement('div');
  templatesSection.className = 'bg-gray-900 p-4 rounded-3xl';
  templatesSection.innerHTML = `
    <div class="flex items-center justify-between gap-3 mb-3">
      <div>
        <div class="text-lg font-semibold">My Templates</div>
        <div class="text-xs text-gray-400">Build reusable workouts from your favorite exercises.</div>
      </div>
      <button onclick="toggleTemplateForm()" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-2xl text-sm font-medium">Create Template</button>
    </div>
    <div id="template-form-wrap" class="hidden border border-gray-800 rounded-3xl p-4 mb-4">
      <input id="template-name" type="text" placeholder="Template name" class="w-full bg-gray-800 text-white p-3 rounded-2xl mb-3">
      <div id="template-exercise-options" class="template-checkbox-list mb-3"></div>
      <button onclick="saveTemplate()" class="w-full bg-green-600 hover:bg-green-700 py-3 rounded-2xl text-sm font-medium">Save Template</button>
    </div>
    <div id="template-list" class="space-y-3"></div>
  `;
  container.appendChild(templatesSection);

  const optionsWrap = templatesSection.querySelector('#template-exercise-options');
  optionsWrap.innerHTML = exDB.map((exercise) => `
    <label class="template-option">
      <input type="checkbox" value="${exercise.id}" class="mr-2">
      <span>${exercise.name}</span>
      <span class="text-xs text-gray-500 block">${exercise.muscles}</span>
    </label>
  `).join('');

  const templateList = templatesSection.querySelector('#template-list');
  if (!character.templates.length) {
    templateList.innerHTML = '<div class="text-sm text-gray-400">No templates yet. Build your first one above.</div>';
  } else {
    templateList.innerHTML = character.templates.map((template) => `
      <div class="bg-gray-800 p-4 rounded-3xl">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="font-semibold text-white">${template.name}</div>
            <div class="text-xs text-green-400 mt-1">${template.exercises.map((exercise) => exercise.name).join(', ')}</div>
          </div>
          <button onclick="deleteTemplate('${template.id}')" class="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-2xl text-xs">Delete</button>
        </div>
        <button onclick="startTemplateWorkout('${template.id}')" class="mt-4 w-full bg-green-600 hover:bg-green-700 py-3 rounded-2xl text-sm font-medium">Start Workout</button>
      </div>
    `).join('');
  }

  plDB.forEach((plan) => {
    const div = document.createElement('div');
    div.className = 'bg-gray-900 p-5 rounded-3xl cursor-pointer hover:bg-gray-800 transition-colors';
    div.innerHTML = `<div class="font-semibold text-lg">${plan.name}</div><div class="text-green-400 text-sm mt-1">${plan.desc}</div>`;
    div.onclick = () => showPlanDetail(plan);
    container.appendChild(div);
  });
}

window.toggleTemplateForm = function toggleTemplateForm() {
  const wrap = document.getElementById('template-form-wrap');
  if (!wrap) return;
  wrap.classList.toggle('hidden');
};

window.saveTemplate = function saveTemplate() {
  const name = document.getElementById('template-name').value.trim();
  const selectedIds = Array.from(document.querySelectorAll('#template-exercise-options input:checked')).map((input) => Number(input.value));
  if (!name) return alert('Give your template a name.');
  if (typeof window.containsProfanityInUsername === 'function' && window.containsProfanityInUsername(name)) {
    return alert('That template name is not allowed. Please choose a different one.');
  }
  if (!selectedIds.length) return alert('Select at least one exercise.');

  const exercises = exDB.filter((exercise) => selectedIds.includes(exercise.id));
  character.templates.unshift({
    id: `tpl-${Date.now()}`,
    name,
    exercises
  });
  saveData();
  renderPlans();
  alert(`Saved template: ${name}`);
};

window.deleteTemplate = function deleteTemplate(templateId) {
  character.templates = (character.templates || []).filter((template) => template.id !== templateId);
  saveData();
  renderPlans();
};

window.startTemplateWorkout = function startTemplateWorkout(templateId) {
  const template = (character.templates || []).find((entry) => entry.id === templateId);
  if (!template) return;
  currentSession = template.exercises.map((exercise) => ({ exercise, sets: [] }));
  workoutSuggestionMeta = {
    note: `📋 Loaded template: ${template.name}`,
    focusMuscles: []
  };
  openSetFormIndex = null;
  showTab(1);
};

function showPlanDetail(plan) {
  if (!character.planModalOpened) { character.planModalOpened = true; saveData(); }
  document.getElementById('plan-modal-name').textContent = plan.name;
  document.getElementById('plan-modal-desc').textContent = plan.desc;
  const container = document.getElementById('plan-weekly-schedule');
  container.innerHTML = '<h3 class="font-semibold text-green-400 mb-4">Weekly Schedule</h3>';
  plan.weekly.forEach((day) => {
    const div = document.createElement('div');
    div.className = 'bg-gray-800 p-4 rounded-2xl';
    div.innerHTML = `<div class="font-medium">${day.day}</div><div class="text-gray-300 text-sm mt-1">${day.exercises}</div>`;
    container.appendChild(div);
  });
  document.getElementById('plan-modal').classList.remove('hidden');
}

window.hidePlanModal = function hidePlanModal() {
  document.getElementById('plan-modal').classList.add('hidden');
};

function getRecentSessions(days) {
  const today = getTodayStamp();
  return workoutLog.filter((entry) => {
    const gap = getDaysBetween(entry.date, today);
    return gap !== null && gap <= days;
  });
}

function collectMusclesFromSessions(sessions, maxGap = Infinity) {
  const today = getTodayStamp();
  const muscles = new Set();
  sessions.forEach((entry) => {
    const gap = getDaysBetween(entry.date, today);
    if (gap === null || gap > maxGap) return;
    (entry.session || []).forEach((item) => {
      getMuscleList(item.exercise).forEach((muscle) => muscles.add(muscle));
    });
  });
  return muscles;
}

function pickBalancedExercises(pool, targetCount = 4) {
  const picks = [];
  const usedMuscles = new Set();
  const remaining = [...pool];

  while (remaining.length && picks.length < targetCount) {
    let selectedIndex = remaining.findIndex((exercise) => getMuscleList(exercise).every((muscle) => !usedMuscles.has(muscle)));
    if (selectedIndex === -1) selectedIndex = 0;
    const [exercise] = remaining.splice(selectedIndex, 1);
    picks.push(exercise);
    getMuscleList(exercise).forEach((muscle) => usedMuscles.add(muscle));
  }

  return picks.slice(0, targetCount);
}

function getBalancedBeginnerSelection() {
  const categories = {
    push: (exercise) => /Chest|Triceps|Shoulders|Front Delts|Upper Chest/i.test(exercise.muscles),
    pull: (exercise) => /Lats|Back|Biceps|Upper Back|Mid Back/i.test(exercise.muscles),
    legs: (exercise) => /Quads|Glutes|Hamstrings/i.test(exercise.muscles),
    core: (exercise) => /Core/i.test(exercise.muscles)
  };
  const picks = [];
  Object.values(categories).forEach((matcher) => {
    const found = exDB.find((exercise) => matcher(exercise) && !picks.find((picked) => picked.id === exercise.id));
    if (found) picks.push(found);
  });
  while (picks.length < 4) {
    const next = exDB.find((exercise) => !picks.find((picked) => picked.id === exercise.id));
    if (!next) break;
    picks.push(next);
  }
  return picks.slice(0, 4);
}

window.suggestWorkout = function suggestWorkout() {
  syncWeeklyTrackingFlags();
  character.aiSuggestWeek = getCurrentWeekStamp();
  character.aiSuggestUsedThisWeek = (character.aiSuggestUsedThisWeek || 0) + 1;
  character.aiSuggestTotal = (character.aiSuggestTotal || 0) + 1;
  const recentSessions = getRecentSessions(3);
  let pickedExercises = [];

  if (!recentSessions.length) {
    pickedExercises = getBalancedBeginnerSelection();
    workoutSuggestionMeta = {
      note: '🤖 Suggested based on your recent training — focusing on push, pull, legs, and core',
      focusMuscles: ['Push', 'Pull', 'Legs', 'Core']
    };
  } else {
    const recentMuscles = collectMusclesFromSessions(recentSessions, 3);
    const stricterPool = exDB.filter((exercise) => getMuscleList(exercise).every((muscle) => !recentMuscles.has(muscle)));
    let pool = stricterPool;

    if (pool.length < 4) {
      const veryRecentMuscles = collectMusclesFromSessions(recentSessions, 1);
      pool = exDB.filter((exercise) => getMuscleList(exercise).every((muscle) => !veryRecentMuscles.has(muscle)));
    }

    if (pool.length < 4) {
      pool = [...exDB];
    }

    pickedExercises = pickBalancedExercises(pool, 4);
    const focusMuscles = Array.from(new Set(pickedExercises.flatMap((exercise) => getMuscleList(exercise)))).slice(0, 4);
    workoutSuggestionMeta = {
      note: `🤖 Suggested based on your recent training — focusing on ${focusMuscles.join(', ')}`,
      focusMuscles
    };
  }

  currentSession = pickedExercises.map((exercise) => ({ exercise, sets: [] }));
  openSetFormIndex = null;
  saveData();
  renderCurrentSession();
  showTab(1);
  alert('Adaptive workout loaded.');
};

window.addExerciseToSession = function addExerciseToSession() {
  openExerciseSearchModal();
};

// ── Exercise Search Modal ──────────────────────────────────────────────────
let exerciseSearchFilter = '';

window.openExerciseSearchModal = function openExerciseSearchModal() {
  const modal = document.getElementById('exercise-search-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  const input = document.getElementById('exercise-search-input');
  if (input) { input.value = ''; input.focus(); }
  exerciseSearchFilter = '';
  // reset chips
  document.querySelectorAll('.exercise-filter-chip').forEach((c) => {
    c.classList.toggle('active', c.dataset.filter === '');
  });
  renderExerciseSearchResults();
};

window.closeExerciseSearchModal = function closeExerciseSearchModal() {
  const modal = document.getElementById('exercise-search-modal');
  if (modal) modal.classList.add('hidden');
};

window.setExerciseFilter = function setExerciseFilter(filter) {
  exerciseSearchFilter = filter;
  document.querySelectorAll('.exercise-filter-chip').forEach((c) => {
    c.classList.toggle('active', c.dataset.filter === filter);
  });
  renderExerciseSearchResults();
};

window.renderExerciseSearchResults = function renderExerciseSearchResults() {
  const container = document.getElementById('exercise-search-results');
  if (!container) return;
  const query = (document.getElementById('exercise-search-input')?.value || '').toLowerCase().trim();

  const results = exDB.filter((ex) => {
    const matchesType = !exerciseSearchFilter || (ex.type || '').toLowerCase() === exerciseSearchFilter;
    const matchesQuery = !query ||
      (ex.name || '').toLowerCase().includes(query) ||
      (ex.muscles || '').toLowerCase().includes(query);
    return matchesType && matchesQuery;
  });

  if (!results.length) {
    container.innerHTML = '<p class="text-gray-500 text-sm text-center py-6">No exercises found. Try a different search.</p>';
    return;
  }

  container.innerHTML = results.map((ex) => `
    <div class="exercise-search-row" onclick="pickExerciseFromSearch(${ex.id})">
      <div>
        <div class="text-sm font-semibold text-white">${ex.name}</div>
        <div class="text-xs text-green-400 mt-0.5">${ex.muscles}</div>
      </div>
      <span class="text-xs text-gray-500 capitalize ml-3 shrink-0">${ex.type || ''}</span>
    </div>
  `).join('');
};

window.pickExerciseFromSearch = function pickExerciseFromSearch(id) {
  const exercise = exDB.find((ex) => ex.id === id);
  if (!exercise) return;
  currentSession.push({ exercise, sets: [] });
  closeExerciseSearchModal();
  renderCurrentSession();
};

function renderRecoveryButtons(containerId, selectedValue, type) {
  const symbols = type === 'energy' ? ['💀', '😴', '😐', '💪', '🔥'] : ['😀', '🙂', '😐', '😣', '🔥'];
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = symbols.map((emoji, index) => `
    <button onclick="setRecoveryValue('${type}', ${index + 1})" class="recovery-pill ${selectedValue === index + 1 ? 'active' : ''}">${emoji}</button>
  `).join('');
}

function renderCurrentSession() {
  const noteEl = document.getElementById('suggestion-note');
  const warningEl = document.getElementById('recovery-warning');
  const sleepValue = document.getElementById('sleep-value');
  const sleepSlider = document.getElementById('recovery-sleep');
  const distanceLabel = document.getElementById('cardio-distance-unit');

  if (noteEl) {
    noteEl.innerHTML = workoutSuggestionMeta.note ? `<div class="bg-blue-900/30 border border-blue-700/40 rounded-3xl p-3 text-sm text-blue-100">${workoutSuggestionMeta.note}</div>` : '';
  }

  if (sleepSlider) sleepSlider.value = currentRecoveryState.sleep;
  if (sleepValue) sleepValue.textContent = `${currentRecoveryState.sleep}h`;
  if (distanceLabel) distanceLabel.textContent = getDistanceUnit();
  renderRecoveryButtons('energy-buttons', currentRecoveryState.energy, 'energy');
  renderRecoveryButtons('soreness-buttons', currentRecoveryState.soreness, 'soreness');
  if (warningEl) {
    warningEl.innerHTML = currentRecoveryState.soreness >= 4 ? '<div class="text-amber-300 text-sm mt-3">⚠️ High soreness detected — consider a lighter session today</div>' : '';
  }

  const container = document.getElementById('current-session');
  container.innerHTML = currentSession.length ? '' : '<p class="text-gray-400 text-center py-8">No exercises yet — add some!</p>';

  currentSession.forEach((item, index) => {
    const setLines = (item.sets || []).map((set, setIndex) => `<div class="text-sm text-gray-300">${formatSetLine(set, setIndex, item.exercise)}</div>`).join('');
    const unit = character.weightUnit || 'lbs';
    const bodyweightHint = item.exercise.type === 'bodyweight' ? '<div class="text-xs text-gray-400 mt-2">0 weight = Bodyweight</div>' : '';
    const formVisible = openSetFormIndex === index;
    const div = document.createElement('div');
    div.className = 'bg-gray-800 p-4 rounded-3xl';
    div.innerHTML = `
      <div class="flex justify-between items-start gap-3">
        <div>
          <div class="font-semibold">${item.exercise.name}</div>
          <div class="text-xs text-gray-400">${item.exercise.muscles}</div>
          <div class="text-xs text-green-400 mt-1">Sets logged: ${(item.sets || []).length}</div>
        </div>
        <button onclick="toggleSetForm(${index})" class="text-xs bg-green-600 hover:bg-green-700 px-4 py-2 rounded-2xl">Log Set + Rest</button>
      </div>
      <div class="mt-3 space-y-2">${setLines || '<div class="text-sm text-gray-500">No sets logged yet.</div>'}</div>
      ${formVisible ? `
        <div class="inline-set-form mt-4">
          <div class="grid grid-cols-2 gap-3">
            <input id="set-reps-${index}" type="number" min="1" value="10" class="bg-gray-900 text-white p-3 rounded-2xl" placeholder="Reps">
            <input id="set-weight-${index}" type="number" min="0" step="0.5" value="0" class="bg-gray-900 text-white p-3 rounded-2xl" placeholder="Weight">
          </div>
          <div class="flex items-center justify-between gap-3 mt-3 flex-wrap">
            <div class="unit-toggle-wrap">
              <button onclick="setWeightUnit('lbs', ${index})" class="unit-pill ${unit === 'lbs' ? 'active' : ''}">lbs</button>
              <button onclick="setWeightUnit('kg', ${index})" class="unit-pill ${unit === 'kg' ? 'active' : ''}">kg</button>
            </div>
            <button onclick="saveSet(${index})" class="bg-green-500 hover:bg-green-600 px-4 py-3 rounded-2xl text-sm font-medium">Save Set</button>
          </div>
          ${bodyweightHint}
        </div>
      ` : ''}
    `;
    container.appendChild(div);
  });
}

window.toggleSetForm = function toggleSetForm(index) {
  openSetFormIndex = openSetFormIndex === index ? null : index;
  renderCurrentSession();
};

window.setWeightUnit = function setWeightUnit(unit) {
  character.weightUnit = unit;
  saveData();
  renderCurrentSession();
};

window.saveSet = function saveSet(index) {
  const repsInput = document.getElementById(`set-reps-${index}`);
  const weightInput = document.getElementById(`set-weight-${index}`);
  const reps = Math.max(1, parseInt(repsInput?.value || '10', 10));
  const weight = Math.max(0, parseFloat(weightInput?.value || '0'));
  const unit = character.weightUnit || 'lbs';

  currentSession[index].sets = currentSession[index].sets || [];
  currentSession[index].sets.push({ reps, weight, unit });
  openSetFormIndex = null;
  renderCurrentSession();
  showRestTimer();
};

function formatTimer(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function showRestTimer() {
  clearInterval(restTimerInterval);
  restTimerInterval = null;
  const duration = parseInt(document.getElementById('rest-duration')?.value || '90', 10);
  document.getElementById('rest-modal').classList.remove('hidden');
  document.getElementById('timer-display').textContent = formatTimer(duration);
}

window.hideRestTimer = function hideRestTimer() {
  clearInterval(restTimerInterval);
  restTimerInterval = null;
  document.getElementById('rest-modal').classList.add('hidden');
  const duration = parseInt(document.getElementById('rest-duration')?.value || '90', 10);
  document.getElementById('timer-display').textContent = formatTimer(duration);
};

window.startRestTimer = function startRestTimer() {
  clearInterval(restTimerInterval);
  const today = new Date().toDateString();
  character.restTimerUsedToday = true;
  character.restTimerDate = today;
  saveData();
  let time = parseInt(document.getElementById('rest-duration')?.value || '90', 10);
  const display = document.getElementById('timer-display');
  display.textContent = formatTimer(time);

  restTimerInterval = setInterval(() => {
    time -= 1;
    display.textContent = formatTimer(Math.max(time, 0));
    if (time <= 0) {
      clearInterval(restTimerInterval);
      restTimerInterval = null;
      hideRestTimer();
      alert('Rest complete. Back to work.');
    }
  }, 1000);
};

function calculateSessionVolume(sessionItems) {
  return (sessionItems || []).reduce((volume, item) => {
    const muscles = getMuscleList(item.exercise);
    (item.sets || []).forEach((set) => {
      const contribution = (Number(set.reps) || 0) * (Number(set.weight) || 0);
      muscles.forEach((muscle) => {
        volume[muscle] = (volume[muscle] || 0) + contribution;
      });
    });
    return volume;
  }, {});
}

function mergeVolumeMaps(base, addition) {
  const merged = { ...(base || {}) };
  Object.entries(addition || {}).forEach(([muscle, value]) => {
    merged[muscle] = (merged[muscle] || 0) + value;
  });
  return merged;
}

function getWeekStampForDate(dateString) {
  const now = new Date(`${dateString}T00:00:00`);
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now - oneJan) / 86400000);
  return `${now.getFullYear()}-W${Math.ceil((days + oneJan.getDay() + 1) / 7)}`;
}

function recalculateWeeklyVolume(currentWeek) {
  let totals = {};
  workoutLog.forEach((entry) => {
    if (getWeekStampForDate(entry.date) !== currentWeek) return;
    totals = mergeVolumeMaps(totals, entry.volume || calculateSessionVolume(entry.session || []));
  });
  character.weeklyVolume = totals;
  character.weeklyVolumeWeek = currentWeek;
}

window.finishSession = function finishSession() {
  triggerButtonClickSound();
  if (currentSession.length === 0) return alert('Add at least one exercise!');
  const hasAnySets = currentSession.some((item) => (item.sets || []).length > 0);
  if (!hasAnySets) return alert('Log at least one set before finishing the session.');

  updateActivityStreak({ allowShield: true });
  updateCombo();
  const previousSession = workoutLog[0] || null;
  const sessionCopy = currentSession.map((item) => ({
    exercise: item.exercise,
    sets: [...(item.sets || [])]
  }));
  const sessionVolume = calculateSessionVolume(sessionCopy);
  const totalSessionVolume = sumVolumeMap(sessionVolume);
  const entry = {
    date: getTodayStamp(),
    displayDate: new Date().toLocaleDateString(),
    dateTime: new Date().toISOString(),
    session: sessionCopy,
    volume: sessionVolume
  };
  workoutLog.unshift(entry);
  progressHistory.push({ date: getTodayStamp(), strength: character.strength + currentSession.length });

  character.lastSessionVolume = sessionVolume;
  const currentWeek = getWeekStampForDate(entry.date);
  if (character.weeklyVolumeWeek !== currentWeek) {
    character.weeklyVolume = {};
  }
  recalculateWeeklyVolume(currentWeek);

  let baseXP = 50 + getTotalBonus('workout_xp_bonus');
  const messages = [];
  const activePerk = getActivePerk();

  if (activePerk && activePerk.type === 'comeback_bonus' && character.streakBroken) {
    baseXP = Math.round(baseXP * activePerk.value);
    character.streakBroken = false;
    messages.push('🔥 Comeback Bonus! XP doubled for returning!');
  }

  if (activePerk && activePerk.type === 'variety_bonus' && previousSession) {
    const lastExercises = new Set((previousSession.session || []).map((item) => item.exercise?.name).filter(Boolean));
    const uniqueCount = sessionCopy.reduce((count, item) => count + (lastExercises.has(item.exercise?.name) ? 0 : 1), 0);
    if (uniqueCount > 0) {
      baseXP += activePerk.value * uniqueCount;
      messages.push(`🧠 Variety Bonus! +${activePerk.value * uniqueCount} XP from ${uniqueCount} fresh exercise${uniqueCount === 1 ? '' : 's'}.`);
    }
  }

  if (activePerk && activePerk.type === 'heavy_lifter_bonus') {
    const threshold = character.weightUnit === 'kg' ? 90 : 200;
    const qualifyingSets = sessionCopy.reduce((count, item) => count + (item.sets || []).filter((set) => {
      const setUnit = set.unit || character.weightUnit || 'lbs';
      const weight = Number(set.weight) || 0;
      return setUnit === 'kg' ? weight >= 90 : weight >= 200;
    }).length, 0);
    if (qualifyingSets > 0) {
      baseXP += activePerk.value * qualifyingSets;
      messages.push(`🏋️ Heavy Lifter Bonus! +${activePerk.value * qualifyingSets} XP from ${qualifyingSets} heavy set${qualifyingSets === 1 ? '' : 's'} above ${threshold} ${character.weightUnit}.`);
    }
  }

  if (activePerk && activePerk.type === 'volume_pr_bonus' && totalSessionVolume > (character.volumePR || 0)) {
    if ((character.volumePR || 0) > 0) {
      baseXP += activePerk.value;
      messages.push('📈 Volume PR! New personal record!');
    }
    character.volumePR = totalSessionVolume;
  }

  const workoutCountThisWeek = getWorkoutCountForWeek(currentWeek);
  if (activePerk && activePerk.type === 'weekly_dedication_bonus' && workoutCountThisWeek === 5 && character.weeklyDedicationBonusWeek !== currentWeek) {
    baseXP += activePerk.value;
    character.weeklyDedicationBonusWeek = currentWeek;
    messages.push(`📆 Weekly Dedication Bonus! +${activePerk.value} XP for workout #5 this week.`);
  }

  const setBonus = getGearBonus('set_xp_bonus') * sessionCopy.reduce((sum, item) => sum + ((item.sets || []).length), 0);
  if (setBonus > 0) {
    baseXP += setBonus;
    messages.push(`⌚ Set Bonus! +${setBonus} XP from equipped gear.`);
  }

  const earnedXP = awardXP(baseXP, 'workout');

  checkGearUnlocks();
  saveData();
  levelUp();
  checkProgressAchievements();
  saveData();
  updateHeader();
  currentSession = [];
  openSetFormIndex = null;
  workoutSuggestionMeta = { note: '', focusMuscles: [] };
  scheduleStreakReminder();
  showVictoryCard(sessionCopy, earnedXP, messages);
  renderCurrentSession();
  showTab(3);
};

function showVictoryCard(session, xpEarned, messages) {
  document.getElementById('vc-date').textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const activeHero = (typeof heroRoster !== 'undefined') && character.activeCharId
    ? heroRoster.find(h => h.id === character.activeCharId) : null;
  const portraitEl = document.getElementById('vc-portrait');
  if (activeHero) {
    document.getElementById('vc-hero-name').textContent = activeHero.name;
    const spriteHtml = getSpriteImg(activeHero, 'small');
    portraitEl.innerHTML = spriteHtml || `<span style="font-size:2rem">${activeHero.icon || '🦸'}</span>`;
  } else {
    document.getElementById('vc-hero-name').textContent = 'No Hero Selected';
    portraitEl.innerHTML = '<span style="font-size:2rem">🦸</span>';
  }

  document.getElementById('vc-title').textContent = character.equippedTitle || 'Hero';
  document.getElementById('vc-level').textContent = character.level;
  document.getElementById('vc-xp-earned').textContent = `+${xpEarned} XP Earned`;

  const totalExercises = session.length;
  const totalSets = session.reduce((s, item) => s + (item.sets || []).length, 0);
  const totalVolume = session.reduce((s, item) =>
    s + (item.sets || []).reduce((ss, set) => ss + (set.reps || 0) * (set.weight || 0), 0), 0);

  document.getElementById('vc-exercises').textContent = totalExercises;
  document.getElementById('vc-sets').textContent = totalSets;
  document.getElementById('vc-volume').textContent = totalVolume >= 1000
    ? (totalVolume / 1000).toFixed(1) + 'k' : totalVolume || '—';

  const streak = character.currentStreak || 0;
  const streakSection = document.getElementById('vc-streak-section');
  if (streak > 0) {
    document.getElementById('vc-streak').textContent = `🔥 ${streak} Day Streak`;
    streakSection.classList.remove('hidden');
  } else {
    streakSection.classList.add('hidden');
  }

  document.getElementById('victory-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  SoundFX.play('levelup');
}

window.closeVictoryCard = function() {
  document.getElementById('victory-overlay').classList.add('hidden');
  document.body.style.overflow = '';
};

window.shareVictoryCard = function() {
  const classEmoji = { warrior: '⚔️', rogue: '🗡️', mage: '🔮', paladin: '🛡️' };
  const emoji = classEmoji[character.heroClass] || '🦸';
  const streak = character.currentStreak || 0;
  const text = `Just earned my Victory Card on QuestGains! ${emoji} Level ${character.level}${streak > 0 ? ` · 🔥 ${streak} day streak` : ''}\n\nLevel up your fitness: questgains.github.io/questgains`;
  if (navigator.share) {
    navigator.share({ title: 'QuestGains Victory Card', text, url: 'https://questgains.github.io/questgains' }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text).then(() => alert('Copied to clipboard! Paste to share.')).catch(() => alert(text));
  }
};

function getStrengthEntries() {
  return progressHistory.filter((point) => typeof point.strength === 'number');
}

function getWeightEntries() {
  return progressHistory.filter((point) => typeof point.weight === 'number');
}

function renderVolumeSummary(map, emptyLabel) {
  const entries = Object.entries(map || {}).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return `<div class="text-sm text-gray-400">${emptyLabel}</div>`;
  return entries.map(([muscle, total]) => `<div class="flex justify-between text-sm"><span>${muscle}</span><span class="font-semibold">${Math.round(total).toLocaleString()} ${character.weightUnit}</span></div>`).join('');
}

function getMuscleVolumeThisWeek() {
  const weekStamp = getWeekStampForDate(getTodayStamp());
  const muscleVolume = {};
  workoutLog.forEach((entry) => {
    if (getWeekStampForDate(entry.date) !== weekStamp) return;
    (entry.session || []).forEach((item) => {
      const muscles = (item.exercise?.muscles || '').split(',').map((m) => m.trim());
      const sets = item.sets || [];
      const vol = sets.reduce((sum, s) => sum + ((s.reps || 0) * (s.weight || 0)), 0);
      muscles.forEach((m) => {
        if (m) muscleVolume[m] = (muscleVolume[m] || 0) + vol;
      });
    });
  });
  return muscleVolume;
}

function renderMuscleBreakdown() {
  const container = document.getElementById('muscle-breakdown');
  if (!container) return;
  const muscleVolume = getMuscleVolumeThisWeek();
  const entries = Object.entries(muscleVolume).sort((a, b) => b[1] - a[1]);

  if (!entries.length) {
    container.innerHTML = '<div class="text-sm text-gray-400">Log a workout to see your muscle breakdown</div>';
    return;
  }

  const maxVolume = Math.max(...entries.map(([, volume]) => volume), 0);
  container.innerHTML = entries.map(([muscle, volume], index) => {
    const width = maxVolume > 0 ? Math.max(4, (volume / maxVolume) * 100) : 0;
    const fillClass = index === 0 ? 'bg-green-500' : 'bg-green-400/60';
    return `
      <div>
        <div class="flex items-center justify-between text-sm mb-1">
          <span class="text-white">${muscle}</span>
          <span class="text-gray-300">${volume > 0 ? `${Math.round(volume).toLocaleString()} ${character.weightUnit}` : 'No data'}</span>
        </div>
        <div class="h-3 bg-gray-800 rounded-full overflow-hidden">
          <div class="h-full ${fillClass} rounded-full" style="width:${width}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

function getRecentRecoverySummary() {
  const today = getTodayStamp();
  const entries = (character.recoveryLog || []).filter((entry) => {
    const gap = getDaysBetween(entry.date, today);
    return gap !== null && gap <= 6;
  });
  if (!entries.length) return 'No recovery check-ins yet.';
  const avgSleep = entries.reduce((sum, entry) => sum + (Number(entry.sleep) || 0), 0) / entries.length;
  const avgEnergy = entries.reduce((sum, entry) => sum + (Number(entry.energy) || 0), 0) / entries.length;
  return `Last 7 days: avg sleep ${avgSleep.toFixed(1)}h • avg energy ${avgEnergy.toFixed(1)}/5 across ${entries.length} check-in${entries.length === 1 ? '' : 's'}.`;
}

function getWeeklyVolumeByMuscle(weeksBack = 6) {
  const weeks = [];
  const now = new Date();
  for (let i = weeksBack - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * 7);
    weeks.push(getWeekStampForDate(d.toISOString().split('T')[0]));
  }
  const muscleSet = new Set();
  const volumeByWeek = {};
  weeks.forEach(w => { volumeByWeek[w] = {}; });
  workoutLog.forEach(entry => {
    const ws = getWeekStampForDate(entry.date);
    if (!volumeByWeek[ws]) return;
    (entry.session || []).forEach(item => {
      const muscles = (item.exercise?.muscles || '').split(',').map(m => m.trim()).filter(Boolean);
      const vol = (item.sets || []).reduce((s, set) => s + (set.reps || 0) * (set.weight || 0), 0);
      muscles.forEach(m => {
        muscleSet.add(m);
        volumeByWeek[ws][m] = (volumeByWeek[ws][m] || 0) + vol;
      });
    });
  });
  return { weeks, volumeByWeek, muscles: Array.from(muscleSet).sort() };
}

const MUSCLE_COLORS = [
  '#22c55e','#3b82f6','#f59e0b','#ef4444','#a855f7',
  '#06b6d4','#f97316','#ec4899','#84cc16','#14b8a6'
];

function renderProgress() {
  const weightEntries = getWeightEntries();
  const { weeks, volumeByWeek, muscles } = getWeeklyVolumeByMuscle(6);
  const weekLabels = weeks.map(w => {
    const parts = w.split('-W');
    return `W${parts[1]}`;
  });

  const ctx = document.getElementById('progress-chart');
  if (window.myChart) window.myChart.destroy();

  const hasVolumeData = muscles.length > 0;

  if (hasVolumeData) {
    const datasets = muscles.slice(0, 8).map((muscle, i) => ({
      label: muscle,
      data: weeks.map(w => volumeByWeek[w][muscle] || 0),
      backgroundColor: MUSCLE_COLORS[i % MUSCLE_COLORS.length] + '99',
      borderColor: MUSCLE_COLORS[i % MUSCLE_COLORS.length],
      borderWidth: 2,
      borderRadius: 4,
    }));

    // Add body weight as a line on secondary axis if data exists
    if (weightEntries.length > 0) {
      datasets.push({
        label: 'Body Weight (lbs)',
        data: weeks.map(w => {
          const weekStart = new Date(w.split('-W')[0], 0, 1 + (parseInt(w.split('-W')[1]) - 1) * 7);
          const match = [...weightEntries].reverse().find(e => getWeekStampForDate(e.date) === w);
          return match ? match.weight : null;
        }),
        type: 'line',
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        borderDash: [4,4],
        fill: false,
        tension: 0.3,
        spanGaps: true,
        yAxisID: 'y2',
        pointRadius: 4,
      });
    }

    window.myChart = new Chart(ctx, {
      type: 'bar',
      data: { labels: weekLabels, datasets },
      options: {
        plugins: { legend: { labels: { color: '#d1d5db', boxWidth: 12 } } },
        scales: {
          x: { stacked: true, grid: { color: '#1f2937' }, ticks: { color: '#d1d5db' } },
          y: { stacked: true, grid: { color: '#333' }, ticks: { color: '#d1d5db', callback: v => v >= 1000 ? (v/1000).toFixed(1)+'k' : v } },
          y2: { position: 'right', display: weightEntries.length > 0, grid: { drawOnChartArea: false }, ticks: { color: '#3b82f6' } }
        }
      }
    });
  } else {
    // No workout data yet — show body weight only if available, else placeholder
    const weightLabels = weightEntries.map(e => getDisplayDate(e.date));
    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: weightLabels.length ? weightLabels : ['No data'],
        datasets: [{
          label: 'Body Weight (lbs)',
          data: weightEntries.map(e => e.weight),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.15)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        plugins: { legend: { labels: { color: '#d1d5db' } } },
        scales: {
          x: { grid: { color: '#1f2937' }, ticks: { color: '#d1d5db' } },
          y: { grid: { color: '#333' }, ticks: { color: '#d1d5db' } }
        }
      }
    });
  }

  // Chart label
  const chartLabel = document.getElementById('progress-chart-label');
  if (chartLabel) {
    chartLabel.textContent = hasVolumeData
      ? '📊 Weekly Volume by Muscle Group (lbs lifted) — last 6 weeks'
      : '📊 Body Weight Over Time';
  }

  const workoutCount = workoutLog.length;
  document.getElementById('pr-list').innerHTML = `<div class="text-green-400">Total Sessions: ${workoutCount}</div><div class="text-green-400">Total Sets: ${workoutLog.reduce((s,e) => s + (e.session||[]).reduce((ss,x) => ss+(x.sets||[]).length,0),0)}</div>`;

  document.getElementById('1rm-list').innerHTML = `
    <div class="space-y-3">
      ${renderOneRMRow('Bench Press', 'bench')}
      ${renderOneRMRow('Squat', 'squat')}
      ${renderOneRMRow('Deadlift', 'deadlift')}
      ${renderOneRMRow('Overhead Press', 'ohp')}
    </div>
  `;

  const weightSummary = document.getElementById('weight-summary');
  if (weightEntries.length > 0) {
    const firstWeight = weightEntries[0].weight;
    const currentWeight = weightEntries[weightEntries.length - 1].weight;
    const delta = Math.round((currentWeight - firstWeight) * 10) / 10;
    const deltaText = `${delta > 0 ? '+' : ''}${delta} lbs`;
    weightSummary.innerHTML = `<div class="font-semibold text-blue-400">Current Weight: ${currentWeight} lbs</div><div class="text-sm text-gray-300">Change since first entry: ${deltaText}</div>`;
  } else {
    weightSummary.innerHTML = '<div class="text-sm text-gray-400">No body-weight entries yet.</div>';
  }

  document.getElementById('recovery-summary').innerHTML = `
    <div class="text-sm text-gray-300">${getRecentRecoverySummary()}</div>
  `;
  document.getElementById('volume-last-session').innerHTML = renderVolumeSummary(character.lastSessionVolume, 'No completed sessions with tracked volume yet.');
  document.getElementById('volume-weekly').innerHTML = renderVolumeSummary(character.weeklyVolume, 'No weekly volume yet.');
  renderMuscleBreakdown();
}

function renderOneRMRow(label, key) {
  const value = character.oneRMs[key] || 0;
  return `
    <div class="bg-gray-800 rounded-2xl p-3">
      <div class="flex items-center justify-between gap-3 mb-2">
        <div>
          <div class="font-semibold text-white">${label}</div>
          <div class="text-xs text-gray-400">Saved: <span class="text-green-400">${value > 0 ? `${value} lbs` : 'Not set'}</span></div>
        </div>
      </div>
      <div class="flex gap-2">
        <input id="1rm-${key}" type="number" min="0" value="${value || ''}" placeholder="lbs" class="flex-1 bg-gray-900 text-white px-3 py-2 rounded-2xl text-sm">
        <button onclick="saveOneRM('${key}')" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-2xl text-sm font-medium">Save</button>
      </div>
    </div>
  `;
}

window.saveOneRM = function saveOneRM(key) {
  triggerButtonClickSound();
  const input = document.getElementById(`1rm-${key}`);
  const value = Math.max(0, parseFloat(input.value) || 0);
  const previousValue = Number(character.oneRMs[key]) || 0;
  const prBonus = getTotalBonus('pr_xp_bonus');
  character.oneRMs[key] = value;
  character.oneRMsLastUpdated = new Date().toDateString();

  if (value > previousValue && prBonus > 0) {
    character.xp += prBonus;
    showAchievement('📜', 'PR Bonus!', `+${prBonus} XP from Arcane Scroll`);
  }

  levelUp();
  checkProgressAchievements();
  saveData();
  updateHeader();
  renderProgress();
  alert(`Saved ${key.toUpperCase()} 1RM: ${value > 0 ? `${value} lbs` : 'Not set'}`);
};

window.logWeight = function logWeight() {
  const input = document.getElementById('weight-input');
  const weight = Math.round((parseFloat(input.value) || 0) * 10) / 10;
  if (!weight || weight <= 0) return alert('Enter a valid body weight in lbs.');

  progressHistory.push({ date: getTodayStamp(), weight });
  saveData();
  renderProgress();
  input.value = '';
  alert(`Logged body weight: ${weight} lbs`);
};

window.setRecoveryValue = function setRecoveryValue(type, value) {
  currentRecoveryState[type] = value;
  renderCurrentSession();
};

window.updateSleepValue = function updateSleepValue() {
  const value = parseInt(document.getElementById('recovery-sleep').value || '7', 10);
  currentRecoveryState.sleep = value;
  const sleepValue = document.getElementById('sleep-value');
  if (sleepValue) sleepValue.textContent = `${value}h`;
};

window.logRecovery = function logRecovery() {
  const sleep = parseInt(document.getElementById('recovery-sleep').value || '7', 10);
  currentRecoveryState.sleep = sleep;
  updateActivityStreak();
  character.recoveryLog = character.recoveryLog || [];
  character.recoveryLog.unshift({
    date: getTodayStamp(),
    sleep: currentRecoveryState.sleep,
    energy: currentRecoveryState.energy,
    soreness: currentRecoveryState.soreness
  });
  character.recoveryLog = character.recoveryLog.slice(0, 30);
  character.totalRecoveryLogs = (character.totalRecoveryLogs || 0) + 1;

  let earnedXP = 0;
  const messages = ['Recovery check-in saved.'];
  const activePerk = getActivePerk();
  if (activePerk && activePerk.type === 'recovery_xp_bonus') {
    const bonusXP = awardXP(activePerk.value);
    earnedXP += bonusXP;
    messages.push(`🛌 Recovery XP Bonus! +${bonusXP} XP`);
  }
  if (activePerk && activePerk.type === 'sleep_champion_bonus' && sleep >= 8) {
    const bonusXP = awardXP(activePerk.value);
    earnedXP += bonusXP;
    messages.push(`😴 Sleep Champion! +${bonusXP} XP for 8+ hours of sleep!`);
  }

  checkGearUnlocks();
  saveData();
  levelUp();
  saveData();
  updateHeader();
  renderCurrentSession();
  alert(messages.join('\n'));
};

window.calculatePlates = function calculatePlates() {
  const input = document.getElementById('plate-target-weight');
  const result = document.getElementById('plate-result');
  const unit = character.weightUnit || 'lbs';
  const target = parseFloat(input.value || '0');
  const barWeight = unit === 'kg' ? 20 : 45;
  const plates = unit === 'kg' ? [20, 15, 10, 5, 2.5, 1.25] : [45, 35, 25, 10, 5, 2.5];

  if (!target || target < barWeight) {
    result.innerHTML = '<div class="text-amber-300">Not possible with standard plates</div>';
    return;
  }

  const perSideTarget = (target - barWeight) / 2;
  if (perSideTarget < 0 || Math.abs(perSideTarget * 100 - Math.round(perSideTarget * 100)) > 0.001) {
    result.innerHTML = '<div class="text-amber-300">Not possible with standard plates</div>';
    return;
  }

  let remaining = Math.round(perSideTarget * 100) / 100;
  const stack = [];

  plates.forEach((plate) => {
    let count = 0;
    while (remaining + 1e-9 >= plate) {
      remaining = Math.round((remaining - plate) * 100) / 100;
      count += 1;
    }
    if (count) stack.push(`${plate}${unit} × ${count}`);
  });

  if (remaining > 0.001) {
    result.innerHTML = '<div class="text-amber-300">Not possible with standard plates</div>';
    return;
  }

  result.innerHTML = `<div class="text-sm text-green-300">${barWeight} ${unit} bar → each side: ${stack.join(', ')} = ${target} ${unit} total</div>`;
};

function getFactionLabelClass(faction) {
  return faction === 'villain' ? 'faction-badge villain' : 'faction-badge hero';
}


function getHeroColor(hero) {
  const colorMap = {
    'from-red-600': '#dc2626',
    'from-orange-600': '#ea580c',
    'from-yellow-500': '#eab308',
    'from-green-600': '#16a34a',
    'from-blue-600': '#2563eb',
    'from-purple-600': '#9333ea',
    'from-pink-600': '#db2777',
    'from-indigo-600': '#4f46e5',
    'from-cyan-600': '#0891b2',
    'from-teal-600': '#0d9488',
    'from-slate-700': '#334155',
    'from-gray-700': '#374151',
    'from-zinc-800': '#27272a',
    'from-rose-600': '#e11d48',
    'from-violet-600': '#7c3aed',
    'from-amber-600': '#d97706',
    'from-amber-500': '#f59e0b',
    'from-orange-500': '#f97316',
    'from-yellow-400': '#facc15',
    'from-green-500': '#22c55e',
    'from-blue-500': '#3b82f6',
    'from-purple-500': '#a855f7',
    'from-pink-500': '#ec4899',
    'from-indigo-500': '#6366f1',
    'from-cyan-500': '#06b6d4',
    'from-teal-500': '#14b8a6',
    'from-emerald-500': '#10b981',
    'from-fuchsia-600': '#c026d3',
    'from-lime-500': '#84cc16',
    'from-lime-600': '#65a30d',
    'from-pink-400': '#f472b6',
    'from-red-500': '#ef4444',
    'from-red-700': '#b91c1c',
    'from-rose-500': '#f43f5e',
    'from-sky-400': '#38bdf8',
    'from-sky-500': '#0ea5e9',
    'from-slate-600': '#475569',
    'from-slate-800': '#1e293b',
    'from-slate-900': '#0f172a',
    'from-stone-400': '#a8a29e',
    'from-stone-500': '#78716c',
    'from-violet-500': '#8b5cf6',
    'from-violet-700': '#6d28d9',
    'from-zinc-300': '#d4d4d8',
    'from-zinc-500': '#71717a'
  };

  return colorMap[hero?.color?.from] || '#22c55e';
}

function getSpriteImg(hero, size = 'large') {
  const spriteMap = {
    'solaris-prime': 'sprite-solaris-prime.png',
    'nightwarden': 'sprite-nightwarden.png',
    'threadstrike': 'sprite-threadstrike.png',
    'iron-vanguard': 'sprite-iron-vanguard.png',
    'stormforged': 'sprite-stormforged.png',
    'goliath-rift': 'sprite-goliath-rift.png',
    'mythara': 'sprite-mythara.png',
    'voltflare': 'sprite-voltflare.png',
    'inevitor': 'sprite-inevitor.png',
    'magnetar-reign': 'sprite-magnetar-reign.png',
    'red-mirth': 'sprite-red-mirth-v2.png',
    'onyx-koro': 'sprite-onyx-koro.png',
    'riftmage': 'sprite-riftmage.png',
    'fangshade': 'sprite-fangshade.png',
    'mad-crown': 'sprite-mad-crown.png',
    'emberveil': 'sprite-emberveil.png',
    'astravault': 'sprite-astravault.png',
    'crownvolt': 'sprite-crownvolt.png',
    'freelash': 'sprite-freelash.png',
    'gravebulk': 'sprite-gravebulk.png',
    'razorfen': 'sprite-razorfen.png',
    'brookeflame': 'sprite-brookeflame.png',
    'valorgiant': 'sprite-valorgiant.png',
    'plainstrike': 'sprite-plainstrike.png',
    'duskrender': 'sprite-duskrender.png',
    'aegis-ward': 'sprite-aegis-ward.png',
    'hexara': 'sprite-hexara.png',
    'umbrafang': 'sprite-umbrafang.png',
    'tideshard': 'sprite-tideshard.png',
    'willlume': 'sprite-willlume.png',
    'thunderion': 'sprite-thunderion.png',
    'sunscarab': 'sprite-sunscarab.png',
    'dreadvane': 'sprite-dreadvane.png',
    'sagebloom': 'sprite-sagebloom.png',
    'ironwraith': 'sprite-ironwraith.png',
    'lunabelle': 'sprite-lunabelle.png',
    'mimicrow': 'sprite-mimicrow.png',
    'voidmonk': 'sprite-voidmonk.png',
    'riftron': 'sprite-riftron.png',
    'wyrmvolt': 'sprite-wyrmvolt.png'
  };

  const filename = spriteMap[hero?.id] || null;
  const sizeClass = size === 'large' ? 'sprite-large' : 'sprite-small';

  if (!filename) {
    return `<div class="sprite-fallback ${sizeClass}" style="--sprite-color: ${getHeroColor(hero)}"></div>`;
  }

  return `<img src="https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/${filename}" alt="${hero.name}" class="pixel-portrait ${sizeClass}" style="--hero-color: ${getHeroColor(hero)}">`;
}

function renderHero() {
  const titleBar = document.getElementById('equipped-title-bar');
  const heroGrid = document.getElementById('hero-character-grid');
  const heroDetail = document.getElementById('hero-skill-tree-panel');
  const classDisplay = document.getElementById('hero-class-display');
  const themeSelector = document.getElementById('hero-theme-selector');
  const activeNode = getActivePerkNode();

  if (activeNode) {
    titleBar.innerHTML = `<div class="text-sm text-gray-300">⚡ Currently: <span class="text-white font-bold">${character.equippedTitle || activeNode.title}</span></div><div class="text-green-400 text-sm mt-1">${activeNode.perk.label}</div>`;
  } else {
    titleBar.innerHTML = '<div class="text-sm text-gray-300">⚡ Currently: <span class="text-white font-bold">No title equipped.</span></div><div class="text-gray-400 text-sm mt-1">Unlock a node and equip its title to activate a perk.</div>';
  }

  const heroStreak = document.getElementById('hero-streak');
  if (heroStreak) heroStreak.textContent = `🔥 ${character.currentStreak || 0} Day Streak • ${(character.comboMultiplier || 1).toFixed(1).replace('.0', '')}× Combo`;
  const classMeta = getClassMeta();
  if (classDisplay) {
    classDisplay.innerHTML = classMeta
      ? `<div class="text-sm font-semibold text-green-400 mb-1">Class</div><div class="text-white font-bold">${classMeta.icon} ${classMeta.name}</div><div class="text-xs text-gray-400 mt-1">${classMeta.bonus}</div>`
      : '<div class="text-sm text-gray-400">Choose a class to activate a passive XP bonus.</div>';
  }
  if (themeSelector) {
    themeSelector.innerHTML = `
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm font-semibold text-green-400">Themes</span>
        <button type="button" onclick="toggleThemePanel()" class="flex items-center gap-1 text-xs text-gray-400 hover:text-green-400 transition-colors">
          <span>Details</span>
          <span id="theme-arrow" class="text-lg leading-none transition-transform duration-200">▼</span>
        </button>
      </div>
      <div class="flex flex-wrap gap-3 mb-3">
        ${appThemes.map((theme) => {
          const unlocked = (character.unlockedThemes || []).includes(theme.id);
          const isActive = character.activeTheme === theme.id;
          return `<button type="button" class="theme-swatch ${unlocked ? '' : 'locked'} ${isActive ? 'active' : ''}" style="background:${unlocked ? theme.primary : '#4b5563'}" onclick="selectTheme('${theme.id}')" title="${theme.name}"></button>`;
        }).join('')}
      </div>
      <div id="theme-panel" class="hidden">
        <div class="space-y-2">
          ${appThemes.filter(t => t.hero).map((theme) => {
            const unlocked = (character.unlockedThemes || []).includes(theme.id);
            const isActive = character.activeTheme === theme.id;
            const heroNodes = character.unlockedCharacters?.[theme.hero]?.length || 0;
            const totalNodes = theme.nodes || 5;
            const pct = Math.min(100, Math.round((heroNodes / totalNodes) * 100));
            return `
              <div class="flex items-center gap-3 text-xs">
                <div class="w-3 h-3 rounded-full shrink-0 ${unlocked ? 'ring-1 ring-white/30' : 'opacity-40'}" style="background:${theme.primary}"></div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between mb-0.5">
                    <span class="${unlocked ? 'text-white' : 'text-gray-400'}">${theme.name}</span>
                    <span class="${unlocked ? 'text-green-400' : 'text-gray-500'}">${unlocked ? (isActive ? '✓ Active' : 'Unlocked') : `${heroNodes}/${totalNodes} nodes`}</span>
                  </div>
                  ${!unlocked ? `<div class="w-full bg-gray-800 rounded-full h-1"><div class="h-1 rounded-full transition-all" style="width:${pct}%;background:${theme.primary}"></div></div>
                  <div class="text-gray-600 mt-0.5">Unlock: Complete ${theme.heroName}'s path</div>` : ''}
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  }
  checkProgressAchievements();

  const badgesContainer = document.getElementById('hero-badges');
  if (badgesContainer) {
    if ((character.badges || []).length === 0) {
      badgesContainer.innerHTML = '<p class="text-sm text-gray-400">No badges yet — complete Personal Achievements to earn them.</p>';
    } else {
      badgesContainer.innerHTML = character.badges.map((badge) => `<span class="achievement-badge">✅ ${badge}</span>`).join('');
    }
  }

  heroGrid.innerHTML = '';
  heroRoster.forEach((hero, heroIndex) => {
    const unlockedNodes = getUnlockedNodeIds(hero.id);
    const isProGated = heroIndex >= 5 && typeof window.isProUser === 'function' && !window.isProUser();
    const card = document.createElement('button');
    card.className = `character-card bg-gradient-to-br ${hero.color.from} ${hero.color.to} ${selectedHeroId === hero.id ? 'active' : ''}`;
    card.innerHTML = `
      <div class="character-card-overlay">
        <div class="flex items-start justify-between gap-3 mb-2">
          <div class="text-2xl leading-none hero-card-icon">${hero.icon}</div>
          <div class="flex items-center gap-1">
            ${isProGated ? '<span class="text-xs font-bold bg-yellow-500 text-gray-950 px-1.5 py-0.5 rounded-full">👑 PRO</span>' : ''}
            <span class="${getFactionLabelClass(hero.faction)}">${hero.faction.toUpperCase()}</span>
          </div>
        </div>
        <div class="pixel-sprite-container small">
          ${getSpriteImg(hero, 'small')}
        </div>
        <div class="mt-2">
          <div class="font-bold text-lg leading-tight">${hero.name}</div>
          <div class="text-xs text-gray-200 mt-1">${hero.tagline}</div>
        </div>
        <div class="mt-4 text-xs text-white/90">Progress: <span class="font-bold">${unlockedNodes.length}/${hero.nodes.length}</span> nodes unlocked</div>
      </div>
    `;
    card.onclick = () => selectHero(hero.id);
    heroGrid.appendChild(card);
  });

  const hero = getHeroById(selectedHeroId) || heroRoster[0];
  if (!hero) {
    heroDetail.innerHTML = '';
    updateHeader();
    return;
  }

  const unlockedNodes = getUnlockedNodeIds(hero.id);
  const nextNodeIndex = hero.nodes.findIndex((node) => !unlockedNodes.includes(node.id));

  heroDetail.innerHTML = `
    <div class="skill-tree-header bg-gradient-to-br ${hero.color.from} ${hero.color.to}">
      <div class="skill-tree-header-overlay">
        <div class="skill-tree-header-top">
          <span class="${getFactionLabelClass(hero.faction)}">${hero.faction.toUpperCase()}</span>
          <div class="hero-detail-icon">${hero.icon}</div>
        </div>
        <div class="pixel-sprite-container">
          ${getSpriteImg(hero, 'large')}
        </div>
        <div class="text-center mt-2">
          <h3 class="text-2xl font-bold">${hero.name}</h3>
          <p class="text-sm text-gray-100 mt-2">${hero.tagline}</p>
        </div>
        <div class="mt-4 text-sm text-white/90 text-center">Unlock the full chain to become <span class="font-semibold">${hero.name}</span>'s final form.</div>
      </div>
    </div>
    <div class="skill-tree-chain mt-5">
      ${hero.nodes.map((node, index) => {
        const unlocked = unlockedNodes.includes(node.id);
        const isAvailable = !unlocked && index === nextNodeIndex;
        const isEquipped = character.activeCharId === hero.id && character.activeNodeId === node.id;
        const connectorUnlocked = index > 0 && unlockedNodes.includes(hero.nodes[index - 1].id) && (unlocked || isAvailable);
        return `
          <div class="skill-node-wrap">
            ${index > 0 ? `<div class="skill-connector ${connectorUnlocked ? 'unlocked' : ''}"></div>` : ''}
            <div class="skill-node ${unlocked ? 'unlocked' : isAvailable ? 'available' : 'locked'} ${isEquipped ? 'equipped' : ''}">
              <div class="skill-node-top">
                <span class="skill-node-cost">${node.cost} pts</span>
                ${isEquipped ? '<span class="skill-node-equipped">ACTIVE</span>' : ''}
              </div>
              <div class="skill-node-name">${node.name}</div>
              <div class="skill-node-title">${node.title}</div>
              <div class="skill-node-desc">${node.desc}</div>
              <div class="skill-node-perk">${node.perk.label}</div>
              <div class="skill-node-actions">
                ${unlocked ? `<button onclick="equipTitle('${hero.id}', '${node.id}')" class="skill-node-btn equip-btn">${isEquipped ? 'Equipped' : 'Equip Title'}</button>` : ''}
                ${isAvailable ? `<button onclick="unlockHeroNode('${hero.id}', '${node.id}')" class="skill-node-btn unlock-btn" ${character.heroPoints < node.cost ? 'disabled' : ''}>Unlock (${node.cost} pts)</button>` : ''}
                ${!unlocked && !isAvailable ? '<div class="skill-node-locked-label">Locked</div>' : ''}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Render username settings section
  if (typeof window.renderUsernameSettings === 'function') {
    window.renderUsernameSettings();
  }

  updateHeader();
}

function renderGearTab() {
  const container = document.getElementById('screen12');
  if (!container) return;

  const unlockedCount = (character.unlockedGear || []).length;
  const equippedCount = (character.equippedGear || []).length;

  container.innerHTML = `
    <div class="flex items-center justify-between gap-3 mb-4">
      <div>
        <h2 class="text-xl font-semibold">🛡️ Gear</h2>
        <div class="text-xs text-gray-400 mt-1">Equip up to 2 items at once.</div>
      </div>
      <div class="text-right text-xs text-gray-400">
        <div>Unlocked: <span class="text-green-400 font-semibold">${unlockedCount}/${gearItems.length}</span></div>
        <div>Equipped: <span class="text-blue-400 font-semibold">${equippedCount}/2</span></div>
      </div>
    </div>
    <div class="gear-grid">
      ${gearItems.map((item) => {
        const unlocked = (character.unlockedGear || []).includes(item.id);
        const equipped = (character.equippedGear || []).includes(item.id);
        const action = !unlocked
          ? `<div class="text-xs text-gray-400 mt-3">🔒 ${item.unlockCondition}</div>`
          : `<button onclick="toggleGearEquip('${item.id}')" class="skill-node-btn ${equipped ? 'unlock-btn' : 'equip-btn'} mt-3">${equipped ? 'Unequip' : 'Equip'}</button>`;
        return `<div class="gear-card ${!unlocked ? 'locked' : ''} ${equipped ? 'equipped' : ''}"><div class="text-3xl">${item.icon}</div><div class="font-bold mt-2">${item.name}</div><div class="text-xs text-gray-400 mt-1">${item.desc}</div><div class="text-xs text-green-400 mt-2">${item.perk}</div>${action}</div>`;
      }).join('')}
    </div>
  `;
}

window.selectHero = function selectHero(heroId) {
  selectedHeroId = heroId;
  renderHero();
};

window.unlockHeroNode = function unlockHeroNode(heroId, nodeId) {
  triggerButtonClickSound();
  const hero = getHeroById(heroId);
  if (!hero) return;

  // Gate: heroes at index 5+ require Pro
  const heroIndex = heroRoster.findIndex(h => h.id === heroId);
  if (heroIndex >= 5 && typeof window.isProUser === 'function' && !window.isProUser()) {
    window.showPaywall('Hero Skill Trees');
    return;
  }

  const node = hero.nodes.find((entry) => entry.id === nodeId);
  if (!node) return;

  const unlockedNodes = getUnlockedNodeIds(heroId);
  const nextNode = hero.nodes.find((entry) => !unlockedNodes.includes(entry.id));
  if (!nextNode || nextNode.id !== nodeId) return alert('Unlock nodes in order.');
  if ((character.heroPoints || 0) < node.cost) return alert('Not enough Hero Points.');

  character.heroPoints -= node.cost;
  character.unlockedCharacters[heroId] = [...unlockedNodes, nodeId];
  character.totalNodesUnlocked = getUnlockedNodeCount();
  selectedHeroId = heroId;

  if (!character.activeCharId || !character.activeNodeId) {
    character.activeCharId = heroId;
    character.activeNodeId = nodeId;
    character.equippedTitle = node.title;
  }

  if (character.unlockedCharacters[heroId].length >= hero.nodes.length) {
    unlockTheme(getHeroThemeForHero(heroId));
  }

  SoundFX.play('unlock');
  checkProgressAchievements();
  saveData();
  renderHero();
  alert(`Unlocked ${node.name}! Title earned: ${node.title}`);
};

window.equipTitle = function equipTitle(heroId, nodeId) {
  triggerButtonClickSound();
  const hero = getHeroById(heroId);
  if (!hero) return;

  const unlockedNodes = getUnlockedNodeIds(heroId);
  if (!unlockedNodes.includes(nodeId)) return alert('Unlock the node first.');

  const node = hero.nodes.find((entry) => entry.id === nodeId);
  if (!node) return;

  character.activeCharId = heroId;
  character.activeNodeId = nodeId;
  character.equippedTitle = node.title;
  selectedHeroId = heroId;
  saveData();
  renderHero();
  alert(`⚡ Equipped: ${node.title}`);
};

window.selectTheme = function selectTheme(themeId) {
  // Gate non-default themes for free users
  if (themeId !== 'default' && typeof window.isProUser === 'function' && !window.isProUser()) {
    window.showPaywall('Themes');
    return;
  }
  if (!(character.unlockedThemes || []).includes(themeId)) return;
  applyTheme(themeId);
  saveData();
  renderHero();
};

window.toggleGearEquip = function toggleGearEquip(gearId) {
  if (!(character.unlockedGear || []).includes(gearId)) return;
  character.equippedGear = character.equippedGear || [];
  if (character.equippedGear.includes(gearId)) {
    character.equippedGear = character.equippedGear.filter((id) => id !== gearId);
  } else {
    if (character.equippedGear.length >= 2) return alert('You can equip up to 2 gear items at once.');
    character.equippedGear.push(gearId);
  }
  saveData();
  renderHero();
  renderGearTab();
};

window.resetSkillTree = function resetSkillTree() {
  if (confirm('Reset the hero roster? This clears all unlocked nodes and unequips your current title.')) {
    character.unlockedCharacters = {};
    character.activeCharId = null;
    character.activeNodeId = null;
    character.equippedTitle = null;
    character.totalNodesUnlocked = 0;
    saveData();
    renderHero();
    updateHeader();
  }
};

function getTodayWorkoutEntries() {
  const today = getTodayStamp();
  return workoutLog.filter((entry) => entry.date === today);
}

function getTodayWorkoutSetCount() {
  return getTodayWorkoutEntries().reduce((total, entry) => total + (entry.session || []).reduce((sum, item) => sum + ((item.sets || []).length), 0), 0);
}

function getCurrentWeekWorkoutEntries() {
  const currentWeek = getCurrentWeekStamp();
  return workoutLog.filter((entry) => getWeekStampForDate(entry.date) === currentWeek);
}

function getCurrentWeekWorkoutDates() {
  return new Set(getCurrentWeekWorkoutEntries().map((entry) => entry.date).filter(Boolean));
}

function hasRecoveryDayThisWeek() {
  const daysIntoWeek = new Date().getDay();
  if (daysIntoWeek < 1) return false;
  return getCurrentWeekWorkoutDates().size < 7;
}

function hasUpdatedOneRMThisWeek() {
  if (!character.oneRMsLastUpdated) return false;
  const updatedAt = new Date(character.oneRMsLastUpdated);
  if (Number.isNaN(updatedAt.getTime())) return false;
  return getWeekStampForDate(updatedAt.toISOString().slice(0, 10)) === getCurrentWeekStamp();
}

function hasNewExerciseThisWeek() {
  const currentWeek = getCurrentWeekStamp();
  const previousExercises = new Set();
  const currentWeekExercises = new Set();

  workoutLog.forEach((entry) => {
    const target = getWeekStampForDate(entry.date) === currentWeek ? currentWeekExercises : previousExercises;
    (entry.session || []).forEach((item) => {
      const name = item.exercise?.name;
      if (name) target.add(name);
    });
  });

  return Array.from(currentWeekExercises).some((name) => !previousExercises.has(name));
}

function isHonorSystem(type, questId) {
  const honorSystemIds = {
    daily: [4],
    weekly: [2, 5]
  };
  return (honorSystemIds[type] || []).includes(questId);
}

function isDailyQuestComplete(questId) {
  syncDailyTrackingFlags();
  syncWaterTracker();
  const todaysMealsCount = todaysMeals.length;
  const todayWorkoutEntries = getTodayWorkoutEntries();
  const todaySetCount = getTodayWorkoutSetCount();
  switch (questId) {
    case 1:
      return (character.waterToday || 0) >= 1 && todayWorkoutEntries.length >= 1;
    case 2:
      return todaySetCount > 0;
    case 3:
      return todaysMealsCount >= 1;
    case 5:
      return todayWorkoutEntries.length >= 1;
    case 6:
      return todaysMealsCount >= 3;
    case 7:
      return character.progressTabVisitedDate === new Date().toDateString();
    case 8:
      return character.restTimerUsedToday === true && character.restTimerDate === new Date().toDateString();
    default:
      return false;
  }
}

function isWeeklyQuestComplete(questId) {
  syncWeeklyTrackingFlags();
  const currentWeekWorkouts = getCurrentWeekWorkoutEntries();
  switch (questId) {
    case 1:
      return currentWeekWorkouts.length >= 3;
    case 3:
      return hasUpdatedOneRMThisWeek();
    case 4:
      return hasRecoveryDayThisWeek();
    case 6:
      return hasNewExerciseThisWeek();
    case 7:
      return currentWeekWorkouts.length >= 5;
    case 8:
      return (character.aiSuggestUsedThisWeek || 0) >= 2;
    default:
      return false;
  }
}

function hasCompletedHeroLegend() {
  if (!character.unlockedCharacters || typeof heroRoster === 'undefined') return false;
  return heroRoster.some(hero => {
    const unlocked = character.unlockedCharacters[hero.id] || [];
    return hero.nodes && unlocked.length >= hero.nodes.length;
  });
}

function countCompletedHeroLegends() {
  if (!character.unlockedCharacters || typeof heroRoster === 'undefined') return 0;
  return heroRoster.filter(hero => {
    const unlocked = character.unlockedCharacters[hero.id] || [];
    return hero.nodes && unlocked.length >= hero.nodes.length;
  }).length;
}

function isJumpstartQuestComplete(questId) {
  switch(questId) {
    case 1: return workoutLog.length >= 1;
    case 2: return (character.totalMealsEver || 0) >= 1;
    case 3: return character.heroTabVisited === true;
    case 4: return character.progressTabVisitedDate !== null;
    case 5: return character.libraryTabVisited === true;
    case 6: return character.exerciseModalOpened === true;
    case 7: return character.planModalOpened === true;
    case 8: return (character.totalMealsEver || 0) >= 1;
    case 9: return character.leaderboardTabVisited === true;
    case 10: return (character.aiSuggestTotal || 0) >= 1;
    default: return false;
  }
}

function isPersonalQuestComplete(questId) {
  switch(questId) {
    case 1: return character.level >= 5;
    case 2: return (character.totalMealsEver || 0) >= 10;
    case 3: return hasCompletedHeroLegend();
    case 4: return workoutLog.length >= 20;
    case 5: return character.level >= 10;
    case 6: return (character.totalMealsEver || 0) >= 50;
    case 7: return countCompletedHeroLegends() >= 5;
    case 8: return workoutLog.length >= 50;
    case 9: return character.level >= 25;
    case 10: return (questProgress.jumpstartCompleted || []).length >= jumpstartQuests.length;
    default: return false;
  }
}

function getPersonalQuestProgress(questId) {
  switch(questId) {
    case 1: return `Level ${character.level} / 5`;
    case 2: return `${Math.min(character.totalMealsEver || 0, 10)} / 10 meals`;
    case 3: return hasCompletedHeroLegend() ? '✓ Legend completed' : 'Complete all nodes for one hero';
    case 4: return `${Math.min(workoutLog.length, 20)} / 20 workouts`;
    case 5: return `Level ${character.level} / 10`;
    case 6: return `${Math.min(character.totalMealsEver || 0, 50)} / 50 meals`;
    case 7: return `${Math.min(countCompletedHeroLegends(), 5)} / 5 legends`;
    case 8: return `${Math.min(workoutLog.length, 50)} / 50 workouts`;
    case 9: return `Level ${character.level} / 25`;
    case 10: return `${(questProgress.jumpstartCompleted || []).length} / ${jumpstartQuests.length} jumpstart quests`;
    default: return '';
  }
}

function getQuestProgressLabel(type, questId) {
  if (type === 'daily') {
    syncWaterTracker();
    const todaysMealsCount = todaysMeals.length;
    const todayWorkoutEntries = getTodayWorkoutEntries();
    const todaySetCount = getTodayWorkoutSetCount();
    switch (questId) {
      case 1:
        return (character.waterToday || 0) >= 1 && todayWorkoutEntries.length >= 1 ? '✓ Water + session done today' : '💧 Log water + complete a session';
      case 2:
        return todaySetCount > 0 ? '✓ Sets logged today' : '0 sets logged today';
      case 3:
        return `${Math.min(todaysMealsCount, 1)} / 1 meals logged`;
      case 5:
        return todayWorkoutEntries.length >= 1 ? '✓ Session complete' : 'No session today';
      case 6:
        return `${Math.min(todaysMealsCount, 3)} / 3 meals`;
      case 7:
        return character.progressTabVisitedDate === new Date().toDateString() ? '✓ Progress reviewed today' : 'Open Progress tab today';
      case 8:
        return character.restTimerUsedToday === true && character.restTimerDate === new Date().toDateString() ? '✓ Rest timer used today' : 'Rest timer not used yet';
      default:
        return '';
    }
  }

  if (type === 'weekly') {
    const workoutCount = getCurrentWeekWorkoutEntries().length;
    switch (questId) {
      case 1:
        return `${Math.min(workoutCount, 3)} / 3 workouts`;
      case 3:
        return hasUpdatedOneRMThisWeek() ? '✓ PR improved this week' : 'Update a 1RM this week to complete';
      case 4:
        return hasRecoveryDayThisWeek() ? 'Rest day this week: ✓' : 'No rest day logged yet';
      case 6:
        return hasNewExerciseThisWeek() ? '✓ New exercise found' : 'Not yet';
      case 7:
        return `${Math.min(workoutCount, 5)} / 5 workouts`;
      case 8:
        return `${Math.min(character.aiSuggestUsedThisWeek || 0, 2)} / 2 uses this week`;
      default:
        return '';
    }
  }

  return '';
}

function isQuestClaimable(type, questId) {
  if (isHonorSystem(type, questId)) return true;
  if (type === 'daily') return isDailyQuestComplete(questId);
  if (type === 'weekly') return isWeeklyQuestComplete(questId);
  return true;
}

function renderQuests() {
  const container = document.getElementById('quest-content');
  container.innerHTML = '';

  if (currentQuestSubTab === 0) {
    container.innerHTML = '<h3 class="font-semibold mb-3 text-green-400">🚀 Jumpstart Quests (100 XP each)</h3>';
    jumpstartQuests.forEach((quest) => appendQuestCard(container, quest, questProgress.jumpstartCompleted, `claimJumpstart(${quest.id})`, 'jumpstart'));
  } else if (currentQuestSubTab === 1) {
    const today = new Date().toDateString();
    if (questProgress.dailyLastDate !== today) {
      questProgress.dailyCompleted = [];
      questProgress.dailyLastDate = today;
      saveData();
    }
    container.innerHTML = '<h3 class="font-semibold mb-3 text-green-400">📅 Daily Quests (25 XP each)</h3>';
    dailyQuests.forEach((quest) => appendQuestCard(container, quest, questProgress.dailyCompleted, `claimDaily(${quest.id})`, 'daily'));
  } else if (currentQuestSubTab === 2) {
    const weekNum = getWeekStampForDate(getTodayStamp());
    if (questProgress.weeklyLastWeek !== weekNum) {
      questProgress.weeklyCompleted = [];
      questProgress.weeklyLastWeek = weekNum;
      saveData();
    }
    container.innerHTML = '<h3 class="font-semibold mb-3 text-green-400">📆 Weekly Quests</h3>';
    weeklyQuests.forEach((quest) => appendQuestCard(container, quest, questProgress.weeklyCompleted, `claimWeekly(${quest.id})`, 'weekly'));
  } else if (currentQuestSubTab === 3) {
    container.innerHTML = '<h3 class="font-semibold mb-3 text-green-400">🏅 Personal Achievements</h3>';
    personalQuests.forEach((quest) => appendQuestCard(container, quest, questProgress.personalCompleted, `claimPersonal(${quest.id})`, 'personal'));
  } else if (currentQuestSubTab === 4) {
    const { boss, current, goal } = getBossProgress();
    const rewardGear = getGearItemById(boss.rewardGear);
    const defeated = questProgress.bossDefeatedWeek === getCurrentWeekStamp();
    const pct = Math.min((current / goal) * 100, 100);
    container.innerHTML = `<div class="boss-card"><div class="flex items-start justify-between gap-3"><div><div class="text-5xl">${boss.icon}</div><div class="text-2xl font-black mt-3">${boss.name}</div><div class="text-xs text-red-300 mt-1">${boss.difficulty}</div></div><div class="text-right text-xs text-gray-400">Weekly Boss</div></div><p class="text-sm text-gray-300 mt-4">${boss.desc}</p><div class="mt-4 text-sm text-white">Requirement: ${boss.requirement}</div><div class="macro-progress-track mt-3"><div class="macro-progress-fill bg-red-500" style="width:${pct}%"></div></div><div class="flex items-center justify-between text-xs text-gray-400 mt-2"><span>${current} / ${goal}</span><span>${Math.round(pct)}%</span></div><div class="mt-4 text-sm text-green-400">Reward: ${boss.rewardXP} XP${rewardGear ? ` + ${rewardGear.name}` : ''}</div>${defeated ? '<div class="mt-4 rounded-2xl bg-green-500/15 border border-green-500/30 px-4 py-3 text-green-300 font-semibold">DEFEATED ✓</div>' : `<button onclick="claimBossBattle()" class="mt-4 w-full bg-red-600 hover:bg-red-700 py-3 rounded-2xl font-semibold ${current >= goal ? '' : 'opacity-50 cursor-not-allowed'}" ${current >= goal ? '' : 'disabled'}>Defeat!</button>`}</div>`;
  }
}

function appendQuestCard(container, quest, completedList, clickAction, type = 'generic') {
  const completed = completedList.includes(quest.id);
  const honorSystem = isHonorSystem(type, quest.id);
  const autoVerified = type === 'daily' || type === 'weekly' || type === 'jumpstart' || type === 'personal';
  let claimable;
  if (!autoVerified || honorSystem) {
    claimable = true;
  } else if (type === 'jumpstart') {
    claimable = isJumpstartQuestComplete(quest.id);
  } else if (type === 'personal') {
    claimable = isPersonalQuestComplete(quest.id);
  } else {
    claimable = isQuestClaimable(type, quest.id);
  }
  let progressLabel = '';
  if (autoVerified && !honorSystem) {
    if (type === 'personal') {
      progressLabel = getPersonalQuestProgress(quest.id);
    } else {
      progressLabel = getQuestProgressLabel(type, quest.id);
    }
  }
  const statusMarkup = completed
    ? '<span class="text-green-400 text-xs">✓ Done</span>'
    : claimable
      ? `<button onclick="${clickAction}" class="bg-green-500 px-4 py-1 rounded-2xl text-xs">Claim</button>`
      : '<span class="bg-gray-700 text-gray-300 px-4 py-1 rounded-2xl text-xs">Not yet</span>';
  const detailsMarkup = progressLabel ? `<div class="text-xs ${claimable ? 'text-green-400' : 'text-gray-400'} mt-1">${progressLabel}</div>` : '';
  const div = document.createElement('div');
  div.className = `p-4 rounded-3xl flex justify-between items-center gap-3 ${completed ? 'bg-green-900/30 line-through' : 'bg-gray-900'}`;
  div.innerHTML = `
    <div>
      <div>${quest.name}</div>
      ${detailsMarkup}
    </div>
    <div class="flex items-center gap-2 shrink-0"><span class="text-green-400 font-bold">${quest.xp} XP</span>${statusMarkup}</div>
  `;
  container.appendChild(div);
}

window.showQuestSubTab = function showQuestSubTab(n) {
  // Tabs 0 (Jumpstart), 3 (Personal), 4 (Boss) are Pro-only; Weekly (2) is free
  const proOnlyTabs = [0, 3, 4];
  if (proOnlyTabs.includes(n) && typeof window.isProUser === 'function' && !window.isProUser()) {
    const tabNames = { 0: 'Jumpstart Quests', 2: 'Weekly Quests', 3: 'Personal Achievements', 4: 'Boss Battles' };
    window.showPaywall(tabNames[n] || 'Pro Quests');
    return;
  }
  currentQuestSubTab = n;
  document.querySelectorAll('#screen5 button[id^="quest-sub"]').forEach((button) => button.classList.remove('subtab-active'));
  document.getElementById(`quest-sub${n}`).classList.add('subtab-active');
  renderQuests();
};

window.claimJumpstart = function claimJumpstart(id) {
  if (!isJumpstartQuestComplete(id)) return;
  triggerButtonClickSound();
  if (!questProgress.jumpstartCompleted.includes(id)) {
    questProgress.jumpstartCompleted.push(id);
    character.totalQuestsClaimed = (character.totalQuestsClaimed || 0) + 1;
    character.weeklyQuestLog[getCurrentWeekStamp()] = (character.weeklyQuestLog[getCurrentWeekStamp()] || 0) + 1;
    const earnedXP = awardXP(100 + getTotalBonus('quest_xp_bonus'), 'quest');
    const rushBonusXP = getQuestRushBonusXP();
    SoundFX.play('quest');
    checkGearUnlocks();
    saveData();
    levelUp();
    checkProgressAchievements();
    saveData();
    updateHeader();
    alert(`🎉 Jumpstart quest completed! +${earnedXP + rushBonusXP} XP`);
    renderQuests();
  }
};

window.claimDaily = function claimDaily(id) {
  triggerButtonClickSound();
  if (!isQuestClaimable('daily', id)) {
    alert('This daily quest is not complete yet.');
    return;
  }
  if (!questProgress.dailyCompleted.includes(id)) {
    questProgress.dailyCompleted.push(id);
    const quest = dailyQuests.find((entry) => entry.id === id);
    const baseXP = quest ? quest.xp : 25;
    character.totalQuestsClaimed = (character.totalQuestsClaimed || 0) + 1;
    character.weeklyQuestLog[getCurrentWeekStamp()] = (character.weeklyQuestLog[getCurrentWeekStamp()] || 0) + 1;
    const earnedXP = awardXP(baseXP + getTotalBonus('quest_xp_bonus'), 'quest');
    const rushBonusXP = getQuestRushBonusXP();
    SoundFX.play('quest');
    checkGearUnlocks();
    saveData();
    levelUp();
    checkProgressAchievements();
    saveData();
    updateHeader();
    alert(`🎉 Daily quest completed! +${earnedXP + rushBonusXP} XP`);
    renderQuests();
  }
};

window.claimWeekly = function claimWeekly(id) {
  triggerButtonClickSound();
  if (!isQuestClaimable('weekly', id)) {
    alert('This weekly quest is not complete yet.');
    return;
  }
  if (!questProgress.weeklyCompleted.includes(id)) {
    questProgress.weeklyCompleted.push(id);
    const quest = weeklyQuests.find((entry) => entry.id === id);
    const baseXP = quest ? quest.xp : 0;
    character.totalQuestsClaimed = (character.totalQuestsClaimed || 0) + 1;
    character.weeklyQuestLog[getCurrentWeekStamp()] = (character.weeklyQuestLog[getCurrentWeekStamp()] || 0) + 1;
    const earnedXP = awardXP(baseXP + getTotalBonus('quest_xp_bonus'), 'quest');
    const rushBonusXP = getQuestRushBonusXP();
    SoundFX.play('quest');
    checkGearUnlocks();
    saveData();
    levelUp();
    checkProgressAchievements();
    saveData();
    updateHeader();
    alert(`🎉 Weekly quest completed! +${earnedXP + rushBonusXP} XP`);
    renderQuests();
  }
};

window.claimPersonal = function claimPersonal(id) {
  if (!isPersonalQuestComplete(id)) return;
  triggerButtonClickSound();
  if (!questProgress.personalCompleted.includes(id)) {
    questProgress.personalCompleted.push(id);
    const quest = personalQuests.find((entry) => entry.id === id);
    const baseXP = quest ? quest.xp : 0;
    if (quest && !character.badges.includes(quest.name)) {
      character.badges.push(quest.name);
    }
    character.totalQuestsClaimed = (character.totalQuestsClaimed || 0) + 1;
    character.weeklyQuestLog[getCurrentWeekStamp()] = (character.weeklyQuestLog[getCurrentWeekStamp()] || 0) + 1;
    const earnedXP = awardXP(baseXP + getTotalBonus('quest_xp_bonus') + getGearBonus('personal_quest_bonus'), 'quest');
    const rushBonusXP = getQuestRushBonusXP();
    SoundFX.play('quest');
    checkGearUnlocks();
    saveData();
    levelUp();
    checkProgressAchievements();
    saveData();
    updateHeader();
    renderHero();
    alert(`🏆 Personal achievement unlocked! +${earnedXP + rushBonusXP} XP`);
    renderQuests();
  }
};

window.claimBossBattle = function claimBossBattle() {
  triggerButtonClickSound();
  const { boss, current, goal } = getBossProgress();
  const week = getCurrentWeekStamp();
  if (questProgress.bossDefeatedWeek === week) return;
  if (current < goal) return alert('Boss requirement not met yet.');
  questProgress.bossDefeatedWeek = week;
  const rewardGear = getGearItemById(boss.rewardGear);
  if (rewardGear && !(character.unlockedGear || []).includes(rewardGear.id)) {
    character.unlockedGear.push(rewardGear.id);
  }
  const earnedXP = awardXP(boss.rewardXP, 'quest');
  showAchievement(boss.icon, 'Boss Defeated!', `${boss.name} fell. +${earnedXP} XP`);
  checkGearUnlocks();
  saveData();
  levelUp();
  saveData();
  updateHeader();
  renderQuests();
};

// ── LEADERBOARD (Live Firestore) ──────────────────────────────────────────────

function showLeaderboardTab(tab) {
  _lbCurrentTab = tab;
  const allBtn = document.getElementById('lb-tab-alltime');
  const wkBtn = document.getElementById('lb-tab-weekly');
  const frBtn = document.getElementById('lb-tab-friends');
  const lbList = document.getElementById('leaderboard-list');
  const frPanel = document.getElementById('friends-lb-panel');
  const lbFooter = document.getElementById('lb-footer');
  const active = 'subtab-active flex-1 py-2 rounded-3xl text-sm font-medium';
  const inactive = 'tab-bar-btn flex-1 py-2 rounded-3xl text-sm font-medium';
  if (allBtn) allBtn.className = tab === 'alltime' ? active : inactive;
  if (wkBtn) wkBtn.className = tab === 'weekly' ? active : inactive;
  if (frBtn) frBtn.className = tab === 'friends' ? active : inactive;
  if (tab === 'friends') {
    if (lbList) lbList.classList.add('hidden');
    if (frPanel) frPanel.classList.remove('hidden');
    if (lbFooter) lbFooter.classList.add('hidden');
    if (typeof window.renderFriendsLeaderboard === 'function') window.renderFriendsLeaderboard();
    if (typeof window.renderFriendRequests === 'function') window.renderFriendRequests();
  } else {
    if (lbList) lbList.classList.remove('hidden');
    if (frPanel) frPanel.classList.add('hidden');
    if (lbFooter) lbFooter.classList.remove('hidden');
    renderLeaderboard();
  }
}
window.showLeaderboardTab = showLeaderboardTab;

function renderRivalCard() {
  const container = document.getElementById('rival-card-container');
  if (!container) return;
  const rival = getRivalPlayer();
  if (!rival) {
    container.innerHTML = '';
    return;
  }
  const myXP = character.xp || 0;
  const gap = myXP - rival.xp;
  const gapText = gap > 0
    ? `You are <strong>${gap.toLocaleString()} XP ahead</strong> of ${rival.username}`
    : gap < 0
    ? `You are <strong>${Math.abs(gap).toLocaleString()} XP behind</strong> ${rival.username}`
    : `Tied with ${rival.username}`;
  const challengeInfo = character.rivalChallengeStart
    ? `<div class="text-xs text-green-400 mt-2">⚔️ Challenge active since ${getDisplayDate(character.rivalChallengeStart)} • Goal: ${(character.rivalChallengeGoalXP || 0).toLocaleString()} XP</div>`
    : '';
  container.innerHTML = `
    <div class="rival-card">
      <div class="text-sm font-semibold text-red-300 mb-2">⚔️ Your Rival</div>
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="text-xl font-black text-white">${rival.username}</div>
          <div class="text-sm text-gray-300">Level ${rival.level} • ${rival.xp.toLocaleString()} XP</div>
        </div>
        <button onclick="startRivalChallenge()" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-2xl text-sm font-medium">Challenge</button>
      </div>
      <div class="text-sm text-gray-300 mt-3">${gapText}</div>
      ${challengeInfo}
    </div>`;
}

async function renderLeaderboard() {
  const container = document.getElementById('leaderboard-list');
  if (!container) return;

  // Render rival card
  renderRivalCard();

  // Loading state
  container.innerHTML = '<div class="text-center text-gray-400 py-8">Loading…</div>';

  try {
    const db = window.db;
    if (!db) throw new Error('No Firestore');

    const myUid = window.currentUserId;
    const myUsername = window.currentUsername || localStorage.getItem('qg_username') || 'You';
    let entries = [];

    if (_lbCurrentTab === 'alltime') {
      // All-Time: sort users by total XP
      const snap = await db.collection('users').orderBy('character.xp', 'desc').limit(50).get();
      entries = snap.docs.map((doc) => {
        const data = doc.data();
        return {
          uid: doc.id,
          username: data?.profile?.username || '—',
          xp: data?.character?.xp || 0,
          level: data?.character?.level || 1,
          isUser: doc.id === myUid
        };
      });
    } else {
      // Weekly: read weeklyXP sub-collection for current week
      const weekKey = typeof window.getISOWeekKey === 'function' ? window.getISOWeekKey() : 'unknown';
      // We need to query the subcollection — Firestore doesn't support cross-collection
      // queries on sub-collections directly, so we do a collectionGroup query.
      const snap = await db.collectionGroup('weeklyXP')
        .where(window.firebase.firestore.FieldPath.documentId(), '==', weekKey)
        .orderBy(window.firebase.firestore.FieldPath.documentId())
        .get().catch(() => null);

      // fallback: collectionGroup with documentId filter may not work without composite index
      // Use manual approach: get users, then check weeklyXP per user (not ideal at scale,
      // but works for small user bases — leaderboard shows what we have)
      if (!snap || snap.empty) {
        // Try collectionGroup without filter, get all for this week
        const cgSnap = await db.collectionGroup('weeklyXP').limit(200).get().catch(() => null);
        if (cgSnap && !cgSnap.empty) {
          const weekEntries = [];
          cgSnap.forEach((doc) => {
            if (doc.id === weekKey) {
              const uid = doc.ref.parent.parent.id;
              weekEntries.push({ uid, xp: doc.data()?.xp || 0 });
            }
          });
          // Fetch user profiles for ranking
          const enriched = await Promise.all(weekEntries.map(async (e) => {
            try {
              const userDoc = await db.collection('users').doc(e.uid).get();
              const data = userDoc.data() || {};
              return {
                uid: e.uid,
                username: data?.profile?.username || '—',
                xp: e.xp,
                level: data?.character?.level || 1,
                isUser: e.uid === myUid
              };
            } catch { return null; }
          }));
          entries = enriched.filter(Boolean);
        }
      } else {
        // snap has results
        const weekEntries = [];
        snap.forEach((doc) => {
          const uid = doc.ref.parent.parent.id;
          weekEntries.push({ uid, xp: doc.data()?.xp || 0 });
        });
        const enriched = await Promise.all(weekEntries.map(async (e) => {
          try {
            const userDoc = await db.collection('users').doc(e.uid).get();
            const data = userDoc.data() || {};
            return {
              uid: e.uid,
              username: data?.profile?.username || '—',
              xp: e.xp,
              level: data?.character?.level || 1,
              isUser: e.uid === myUid
            };
          } catch { return null; }
        }));
        entries = enriched.filter(Boolean);
      }

      // Always include current user in weekly (with their local weekly XP)
      const alreadyHasMe = entries.some((e) => e.uid === myUid);
      if (!alreadyHasMe && myUid) {
        // Get local weekly XP from Firestore
        try {
          const myWeekDoc = await db.collection('users').doc(myUid).collection('weeklyXP').doc(weekKey).get();
          const myWeekXP = myWeekDoc.exists ? (myWeekDoc.data()?.xp || 0) : 0;
          entries.push({
            uid: myUid,
            username: myUsername,
            xp: myWeekXP,
            level: character.level || 1,
            isUser: true
          });
        } catch { /* skip */ }
      }
    }

    // Sort descending by XP
    entries.sort((a, b) => b.xp - a.xp);

    if (entries.length === 0) {
      container.innerHTML = '<div class="text-center text-gray-400 py-8">No data yet — complete workouts to appear here!</div>';
      return;
    }

    container.innerHTML = '';
    entries.forEach((user, idx) => {
      const rank = idx + 1;
      const isMe = user.isUser || user.uid === myUid;
      const div = document.createElement('div');
      div.className = `p-4 rounded-3xl flex items-center justify-between ${isMe ? 'bg-green-900/40 border border-green-500/30' : 'bg-gray-900'}`;
      const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
      div.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="text-2xl font-bold ${isMe ? 'text-green-400' : 'text-gray-400'} w-10">${rankEmoji}</div>
          <div>
            <div class="font-semibold ${isMe ? 'text-green-300' : 'text-white'}">${user.username}${isMe ? ' (You)' : ''}</div>
            <div class="${isMe ? 'text-green-400' : 'text-gray-400'} text-sm">Level ${user.level}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-xl font-bold">${user.xp.toLocaleString()} XP</div>
        </div>`;
      container.appendChild(div);
    });
  } catch (err) {
    console.error('renderLeaderboard error:', err);
    container.innerHTML = '<div class="text-center text-gray-400 py-8">Could not load leaderboard. Check your connection.</div>';
  }
}

window.startRivalChallenge = function startRivalChallenge() {
  const rival = getRivalPlayer();
  if (!rival) return;
  character.rivalId = rival.uid || rival.id || null;
  character.rivalChallengeStart = getTodayStamp();
  character.rivalChallengeGoalXP = rival.xp + 1;
  saveData();
  renderRivalCard();
  alert(`Challenge accepted! Beat ${rival.username} (${rival.xp.toLocaleString()} XP) within 7 days.`);
};

// Rival search box toggle
window.showRivalSearch = function showRivalSearch() {
  if (typeof window.isProUser === 'function' && !window.isProUser()) {
    window.showPaywall('Rival System');
    return;
  }
  const box = document.getElementById('rival-search-box');
  if (box) box.classList.toggle('hidden');
};

// Search by username and set as rival
window.searchAndSetRival = async function searchAndSetRival() {
  const input = document.getElementById('rival-username-input');
  const errorEl = document.getElementById('rival-search-error');
  if (!input || !errorEl) return;
  const username = input.value.trim();
  errorEl.textContent = '';
  if (!username) { errorEl.textContent = 'Enter a username.'; return; }
  if (username.toLowerCase() === (window.currentUsername || '').toLowerCase()) {
    errorEl.textContent = 'You cannot rival yourself.';
    return;
  }
  errorEl.textContent = 'Searching…';
  try {
    const result = await window.findUserByUsername(username);
    if (!result) { errorEl.textContent = 'User not found.'; return; }
    saveRivalToStorage(result);
    character.rivalId = result.uid;
    saveData();
    document.getElementById('rival-search-box').classList.add('hidden');
    input.value = '';
    errorEl.textContent = '';
    renderRivalCard();
    alert(`${result.username} is now your rival! 🔥`);
  } catch (err) {
    console.error('searchAndSetRival error:', err);
    errorEl.textContent = 'Error searching. Try again.';
  }
};

// Random rival: query for users within ±20% of current XP
window.setRandomRival = async function setRandomRival() {
  if (typeof window.isProUser === 'function' && !window.isProUser()) {
    window.showPaywall('Rival System');
    return;
  }
  const db = window.db;
  if (!db) { alert('Not connected to Firebase.'); return; }
  const myXP = character.xp || 0;
  const myUid = window.currentUserId;
  const low = Math.floor(myXP * 0.8);
  const high = Math.ceil(myXP * 1.2);
  try {
    // Query users with XP in range
    const snap = await db.collection('users')
      .where('character.xp', '>=', low)
      .where('character.xp', '<=', high)
      .limit(20)
      .get();
    const candidates = [];
    snap.forEach((doc) => {
      if (doc.id === myUid) return;
      const data = doc.data();
      const username = data?.profile?.username;
      if (!username) return;
      candidates.push({
        uid: doc.id,
        username,
        xp: data?.character?.xp || 0,
        level: data?.character?.level || 1
      });
    });
    if (candidates.length === 0) {
      alert('No rivals found near your XP level yet. Try again later!');
      return;
    }
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    saveRivalToStorage(pick);
    character.rivalId = pick.uid;
    saveData();
    renderRivalCard();
    alert(`${pick.username} (${pick.xp.toLocaleString()} XP) is your new random rival! 🎲`);
  } catch (err) {
    console.error('setRandomRival error:', err);
    alert('Error finding rival. Check connection.');
  }
};

// Legacy — kept for compat but replaced by live data
window.refreshLeaderboard = function refreshLeaderboard() {
  renderLeaderboard();
};

function renderNutrition(foodList = nDB) {
  syncWaterTracker();
  const container = document.getElementById('nutrition-list');
  const waterStatus = document.getElementById('water-status');
  const waterButtons = document.getElementById('water-buttons');

  if (waterStatus) {
    waterStatus.textContent = `💧 ${character.waterToday || 0} / ${character.waterGoal || 8} glasses today`;
  }

  if (waterButtons) {
    waterButtons.innerHTML = '';
    const goal = character.waterGoal || 8;
    for (let i = 1; i <= goal; i += 1) {
      const filled = i <= (character.waterToday || 0);
      const button = document.createElement('button');
      button.className = `water-drop ${filled ? 'filled' : ''}`;
      button.textContent = '💧';
      button.onclick = () => setWaterIntake(i);
      waterButtons.appendChild(button);
    }
  }

  container.innerHTML = '';
  foodList.forEach((food) => {
    const div = document.createElement('div');
    div.className = 'bg-gray-900 p-4 rounded-3xl cursor-pointer hover:bg-gray-800 transition-colors';
    div.innerHTML = `<div class="font-semibold text-lg">${food.name}</div><div class="text-green-400 text-sm">Contributes: ${food.contributes}</div><div class="text-gray-400 text-xs mt-1">${food.calories} cal • ${food.protein} g protein per 100 g</div>`;
    div.onclick = () => showNutritionDetail(food);
    container.appendChild(div);
  });
}

window.setWaterIntake = function setWaterIntake(value) {
  syncWaterTracker();
  const previous = character.waterToday || 0;
  character.waterToday = previous === value ? value - 1 : value;
  character.waterDate = getTodayStamp();

  if (character.waterToday >= (character.waterGoal || 8) && character.waterRewardedDate !== character.waterDate) {
    const hydrationPerk = getActivePerk();
    const waterXP = hydrationPerk && hydrationPerk.type === 'hydration_boost' ? hydrationPerk.value : 5;
    const earnedXP = awardXP(waterXP);
    character.waterRewardedDate = character.waterDate;
    levelUp();
    alert(`Hydration goal hit! +${earnedXP} XP 💧`);
  }

  saveData();
  updateHeader();
  renderNutrition();
};

function showNutritionDetail(food) {
  document.getElementById('nutrition-modal-name').textContent = food.name;
  document.getElementById('nutrition-modal-contributes').innerHTML = `<strong>Key Nutrients:</strong> ${food.contributes}`;
  document.getElementById('nutrition-modal-benefit').textContent = `${food.benefit} Per 100 g: ${food.calories} calories and ${food.protein} g protein.`;
  document.getElementById('nutrition-modal').classList.remove('hidden');
}

window.hideNutritionModal = function hideNutritionModal() {
  document.getElementById('nutrition-modal').classList.add('hidden');
};

window.filterNutrition = function filterNutrition() {
  const searchTerm = document.getElementById('nutrition-search').value.toLowerCase().trim();
  const filteredFoods = nDB.filter((food) => food.name.toLowerCase().includes(searchTerm));
  const container = document.getElementById('nutrition-list');
  if (filteredFoods.length === 0) {
    container.innerHTML = '<p class="text-gray-400 text-center py-8">No matching foods found. Try a different search!</p>';
    return;
  }
  renderNutrition(filteredFoods);
};

window.saveMacroGoals = function saveMacroGoals() {
  triggerButtonClickSound();
  const calorieGoal = Math.max(1, parseInt(document.getElementById('calorie-goal').value || '2000', 10));
  const proteinGoal = Math.max(1, parseInt(document.getElementById('protein-goal').value || '150', 10));
  character.calorieGoal = calorieGoal;
  character.proteinGoal = proteinGoal;
  saveData();
  renderMealLogger();
  alert('Macro goals saved.');
};

function renderProgressBar(current, goal, colorClass) {
  const percent = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  const overGoal = current > goal;
  return `
    <div class="macro-progress-track">
      <div class="macro-progress-fill ${overGoal ? 'bg-red-500' : colorClass}" style="width:${percent}%"></div>
    </div>
  `;
}

function renderMealLogger() {
  const calorieGoalInput = document.getElementById('calorie-goal');
  const proteinGoalInput = document.getElementById('protein-goal');
  if (calorieGoalInput) calorieGoalInput.value = character.calorieGoal || 2000;
  if (proteinGoalInput) proteinGoalInput.value = character.proteinGoal || 150;

  const container = document.getElementById('meal-log-list');
  container.innerHTML = '';

  if (todaysMeals.length === 0) {
    container.innerHTML = '<p class="text-gray-400 text-center py-8">No meals logged yet. Add one above!</p>';
  } else {
    todaysMeals.forEach((meal) => {
      const div = document.createElement('div');
      div.className = 'bg-gray-900 p-4 rounded-3xl flex justify-between items-center';
      div.innerHTML = `<div><span class="font-semibold">${meal.name}</span> × ${meal.quantity}g</div><div class="text-right"><div class="text-green-400 text-sm">${meal.calories} cal</div><div class="text-blue-400 text-xs">${(meal.protein || 0).toFixed(1)}g protein</div></div>`;
      container.appendChild(div);
    });
  }

  const totalCal = todaysMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = todaysMeals.reduce((sum, meal) => sum + meal.protein, 0);
  const calorieGoal = character.calorieGoal || 2000;
  const proteinGoal = character.proteinGoal || 150;
  document.getElementById('meal-totals').innerHTML = `
    <div class="flex justify-between mb-2"><span>Total Calories</span><span class="font-bold">${totalCal} cal</span></div>
    <div class="flex justify-between mb-4"><span>Total Protein</span><span class="font-bold">${totalProtein.toFixed(1)} g</span></div>
    <div class="text-sm mb-1">Calories: ${totalCal.toLocaleString()} / ${calorieGoal.toLocaleString()} cal</div>
    ${renderProgressBar(totalCal, calorieGoal, 'bg-green-500')}
    <div class="text-sm mt-4 mb-1">Protein: ${totalProtein.toFixed(1)}g / ${proteinGoal.toLocaleString()}g</div>
    ${renderProgressBar(totalProtein, proteinGoal, 'bg-blue-500')}
  `;
}

function populateFoodSelect(selectId, filteredFoods = nDB, includePlaceholder = false) {
  const select = document.getElementById(selectId);
  select.innerHTML = includePlaceholder ? '<option value="">Select a food...</option>' : '';

  if (filteredFoods.length === 0) {
    const opt = document.createElement('option');
    opt.textContent = 'No matching foods';
    opt.value = '';
    select.appendChild(opt);
    return;
  }

  filteredFoods.forEach((food) => {
    const opt = document.createElement('option');
    opt.value = food.id;
    opt.textContent = food.name;
    select.appendChild(opt);
  });
}

function addMeal() {
  triggerButtonClickSound();
  const select = document.getElementById('meal-food-select');
  const quantity = parseFloat(document.getElementById('meal-quantity').value);
  if (!select.value) return alert('Please select a food');
  if (!quantity || quantity <= 0) return alert('Enter a valid quantity in grams');

  const food = nDB.find((entry) => String(entry.id) === String(select.value));
  if (!food) return;

  syncMealTracker();
  updateActivityStreak({ allowShield: true });
  updateCombo();
  const scaledCal = Math.round(food.calories * (quantity / 100));
  const scaledProtein = Math.round(food.protein * (quantity / 100) * 10) / 10;
  todaysMeals.push({ name: food.name, quantity, calories: scaledCal, protein: scaledProtein });
  character.mealsLoggedToday = (character.mealsLoggedToday || 0) + 1;
  character.totalMealsLogged = (character.totalMealsLogged || 0) + 1;
  character.totalMealsEver = (character.totalMealsEver || 0) + 1;
  character.weeklyMealLog[getCurrentWeekStamp()] = (character.weeklyMealLog[getCurrentWeekStamp()] || 0) + 1;

  let earnedXP = awardXP(20 + getTotalBonus('meal_xp_bonus'), 'meal');
  const activePerk = getActivePerk();
  const messages = [`✅ Logged ${food.name} (${quantity}g) — +${earnedXP} XP!`];
  if (activePerk && activePerk.type === 'full_day_logger_bonus' && character.mealsLoggedToday >= 3 && character.fullDayBonusDate !== getTodayStamp()) {
    const bonusXP = awardXP(activePerk.value);
    character.fullDayBonusDate = getTodayStamp();
    earnedXP += bonusXP;
    messages.push(`🍽️ Full Day Logger! +${bonusXP} XP for logging 3 meals today!`);
  }

  checkGearUnlocks();
  saveData();
  levelUp();
  checkProgressAchievements();
  saveData();
  updateHeader();
  scheduleStreakReminder();
  renderMealLogger();
  document.getElementById('meal-quantity').value = '';
  alert(messages.join('\n'));
}
window.addMeal = addMeal;

window.filterMealSelect = function filterMealSelect() {
  const searchTerm = document.getElementById('meal-search').value.toLowerCase().trim();
  const filtered = nDB.filter((food) => food.name.toLowerCase().includes(searchTerm));
  populateFoodSelect('meal-food-select', filtered, false);
};

let converterSelectedFoodId = null;

function renderUnitConverter(resetResult = true) {
  if (resetResult) {
    document.getElementById('converter-result').innerHTML = '';
    document.getElementById('converter-search').value = '';
    document.getElementById('converter-food-list').innerHTML = '';
    document.getElementById('converter-panel').classList.add('hidden');
    converterSelectedFoodId = null;
  }
}

window.renderConverterFoodList = function renderConverterFoodList() {
  const searchTerm = document.getElementById('converter-search').value.toLowerCase().trim();
  const listEl = document.getElementById('converter-food-list');
  if (!searchTerm) { listEl.innerHTML = ''; return; }
  const filtered = nDB.filter(f => f.name.toLowerCase().includes(searchTerm)).slice(0, 8);
  if (!filtered.length) {
    listEl.innerHTML = '<p class="text-gray-400 text-sm text-center py-3">No matching foods</p>';
    return;
  }
  listEl.innerHTML = filtered.map(f => `
    <div onclick="selectConverterFood(${f.id})" class="bg-gray-900 p-3 rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors flex justify-between items-center">
      <div class="font-medium">${f.name}</div>
      <div class="text-xs text-gray-400">${f.calories} cal · ${f.protein}g pro</div>
    </div>
  `).join('');
};

window.selectConverterFood = function selectConverterFood(id) {
  converterSelectedFoodId = id;
  const food = nDB.find(f => f.id === id);
  if (!food) return;
  document.getElementById('converter-search').value = food.name;
  document.getElementById('converter-food-list').innerHTML = '';
  document.getElementById('converter-selected-food').textContent = '📦 ' + food.name;
  document.getElementById('converter-panel').classList.remove('hidden');
  document.getElementById('converter-result').innerHTML = '';
};

window.convertUnits = function convertUnits() {
  const foodId = converterSelectedFoodId;
  if (!foodId) return alert('Please search and select a food first');

  const amount = parseFloat(document.getElementById('converter-amount').value) || 100;
  const fromUnit = document.getElementById('converter-from-unit').value;
  const food = nDB.find((entry) => String(entry.id) === String(foodId));
  if (!food) return;

  let grams = amount;
  if (fromUnit === 'oz') grams = amount * 28.35;
  if (fromUnit === 'cup') grams = amount * 240;
  if (fromUnit === 'tbsp') grams = amount * 15;
  if (fromUnit === 'tsp') grams = amount * 5;
  if (fromUnit === 'ml') grams = amount;

  const oz = (grams / 28.35).toFixed(1);
  const cups = (grams / 240).toFixed(2);
  const tbsp = (grams / 15).toFixed(1);
  const tsp = (grams / 5).toFixed(1);
  const ml = grams.toFixed(0);
  const scaledCal = Math.round(food.calories * (grams / 100));
  const scaledProtein = Math.round(food.protein * (grams / 100) * 10) / 10;

  document.getElementById('converter-result').innerHTML = `<div class="text-green-400 font-semibold mb-2">${food.name} — ${amount} ${fromUnit}</div><div class="grid grid-cols-2 gap-2 text-sm"><div><strong>Grams:</strong> ${grams.toFixed(0)} g</div><div><strong>Ounces:</strong> ${oz} oz</div><div><strong>Cups:</strong> ${cups} cups</div><div><strong>Tablespoons:</strong> ${tbsp} tbsp</div><div><strong>Teaspoons:</strong> ${tsp} tsp</div><div><strong>ml:</strong> ${ml} ml</div></div><div class="mt-4 pt-4 border-t border-gray-700"><div class="font-semibold">Nutrition for this amount:</div><div class="flex justify-between"><span>Calories</span><span class="font-bold">${scaledCal} cal</span></div><div class="flex justify-between"><span>Protein</span><span class="font-bold">${scaledProtein} g</span></div></div>`;
};

function renderWorkoutHistory() {
  const container = document.getElementById('history-list');
  if (!container) return;

  if (workoutLog.length === 0) {
    container.innerHTML = '<div class="bg-gray-900 p-5 rounded-3xl text-gray-400 text-center">No history yet</div>';
    return;
  }

  container.innerHTML = workoutLog.map((entry) => {
    const exercises = (entry.session || []).map((item) => `
      <div class="bg-gray-800/60 rounded-2xl p-3">
        <div class="font-semibold text-white">${item.exercise.name}</div>
        <div class="mt-2 space-y-1">
          ${(item.sets || []).map((set, setIndex) => `<div class="text-sm text-gray-300">${formatCompactSetLine(set, setIndex)}</div>`).join('') || '<div class="text-sm text-gray-500">No set data</div>'}
        </div>
      </div>
    `).join('');
    return `
      <div class="history-card bg-gray-900 p-5 rounded-3xl">
        <div class="flex items-center justify-between mb-3 gap-3">
          <div class="font-semibold text-white">${entry.displayDate || getDisplayDate(entry.date)}</div>
          <div class="text-xs text-green-400">${(entry.session || []).length} exercise${(entry.session || []).length === 1 ? '' : 's'}</div>
        </div>
        <div class="space-y-3">${exercises}</div>
      </div>
    `;
  }).join('');
}

window.logCardio = function logCardio() {
  triggerButtonClickSound();
  const type = document.getElementById('cardio-type').value;
  const duration = parseInt(document.getElementById('cardio-duration').value || '0', 10);
  const distanceValue = document.getElementById('cardio-distance').value;
  const notes = document.getElementById('cardio-notes').value.trim();
  if (!duration || duration <= 0) return alert('Enter a valid cardio duration.');
  if (notes && typeof window.containsProfanityInUsername === 'function' && window.containsProfanityInUsername(notes)) {
    return alert('Your cardio notes contain inappropriate content. Please revise.');
  }

  const activePerk = getActivePerk();
  if (activePerk && activePerk.type === 'cardio_streak_credit') {
    updateActivityStreak({ allowShield: true });
  }
  const entry = {
    date: getTodayStamp(),
    type,
    duration,
    distance: distanceValue ? Math.max(0, parseFloat(distanceValue)) : null,
    unit: getDistanceUnit(),
    notes
  };
  cardioLog.unshift(entry);
  character.cardioLog = cardioLog;

  const earnedXP = awardXP(30 + getTotalBonus('cardio_xp_bonus'), 'cardio');
  checkGearUnlocks();
  saveData();
  levelUp();
  saveData();
  updateHeader();
  document.getElementById('cardio-duration').value = '';
  document.getElementById('cardio-distance').value = '';
  document.getElementById('cardio-notes').value = '';
  renderCardio();
  alert(`Cardio logged! +${earnedXP} XP`);
};

function renderCardio() {
  const unit = getDistanceUnit();
  const label = document.getElementById('cardio-distance-label');
  if (label) label.textContent = unit;
  const history = document.getElementById('cardio-history');
  if (!history) return;

  if (!cardioLog.length) {
    history.innerHTML = '<div class="bg-gray-900 p-4 rounded-3xl text-gray-400 text-center">No cardio sessions logged yet.</div>';
    return;
  }

  history.innerHTML = cardioLog.map((entry) => `
    <div class="bg-gray-900 p-4 rounded-3xl">
      <div class="flex justify-between items-center gap-3">
        <div>
          <div class="font-semibold">${entry.type}</div>
          <div class="text-xs text-gray-400">${getDisplayDate(entry.date)}</div>
        </div>
        <div class="text-sm text-green-400">${entry.duration} min</div>
      </div>
      <div class="text-sm text-gray-300 mt-2">${entry.distance ? `${entry.distance} ${entry.unit}` : 'Distance not logged'}</div>
      ${entry.notes ? `<div class="text-xs text-gray-500 mt-2">${entry.notes}</div>` : ''}
    </div>
  `).join('');
}

window.exportData = function exportData() {
  if (typeof window.isProUser === 'function' && !window.isProUser()) {
    window.showPaywall('Data Export');
    return;
  }
  const payload = {
    exportDate: new Date().toISOString(),
    character,
    workoutLog,
    cardioLog,
    progressHistory,
    todaysMeals,
    questProgress
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `questgains-backup-${getTodayStamp()}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

window.triggerImport = function triggerImport() {
  document.getElementById('import-file').click();
};

window.importData = function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      if (!payload.character || !payload.workoutLog || !payload.progressHistory) {
        throw new Error('Missing required data blocks.');
      }
      const importedCharacter = payload.character || {};
      character = {
        ...DEFAULT_CHARACTER,
        ...importedCharacter,
        unlockedCharacters: importedCharacter.unlockedCharacters || {},
        oneRMs: {
          ...DEFAULT_CHARACTER.oneRMs,
          ...(importedCharacter.oneRMs || {})
        },
        oneRMsLastUpdated: importedCharacter.oneRMsLastUpdated || null,
        templates: importedCharacter.templates || [],
        lastSessionVolume: importedCharacter.lastSessionVolume || {},
        weeklyVolume: importedCharacter.weeklyVolume || {},
        weeklyVolumeWeek: importedCharacter.weeklyVolumeWeek || null,
        recoveryLog: importedCharacter.recoveryLog || [],
        cardioLog: importedCharacter.cardioLog || payload.cardioLog || [],
        streakShieldUsed: importedCharacter.streakShieldUsed || null,
        streakBroken: importedCharacter.streakBroken || false,
        questsClaimedToday: importedCharacter.questsClaimedToday || 0,
        questsClaimedDate: importedCharacter.questsClaimedDate || null,
        totalLevels: importedCharacter.totalLevels || 0,
        volumePR: importedCharacter.volumePR || 0,
        mealsLoggedToday: importedCharacter.mealsLoggedToday || 0,
        fullDayBonusDate: importedCharacter.fullDayBonusDate || null,
        totalNodesUnlocked: importedCharacter.totalNodesUnlocked || 0,
        weeklyDedicationBonusWeek: importedCharacter.weeklyDedicationBonusWeek || null,
        progressTabVisitedDate: importedCharacter.progressTabVisitedDate || null,
        restTimerUsedToday: importedCharacter.restTimerUsedToday || false,
        restTimerDate: importedCharacter.restTimerDate || null,
        aiSuggestUsedThisWeek: importedCharacter.aiSuggestUsedThisWeek || 0,
        aiSuggestWeek: importedCharacter.aiSuggestWeek || null,
        soundEnabled: importedCharacter.soundEnabled !== false,
        comboStreak: importedCharacter.comboStreak || 0,
        comboDate: importedCharacter.comboDate || null,
        comboMultiplier: importedCharacter.comboMultiplier || 1.0,
        achievements: importedCharacter.achievements || [],
        totalMealsLogged: importedCharacter.totalMealsLogged || 0,
        unlockedGear: importedCharacter.unlockedGear || [],
        equippedGear: (importedCharacter.equippedGear || []).slice(0, 2),
        totalQuestsClaimed: importedCharacter.totalQuestsClaimed || 0,
        totalRecoveryLogs: importedCharacter.totalRecoveryLogs || 0,
        totalMealsEver: importedCharacter.totalMealsEver || 0,
        heroClass: Object.prototype.hasOwnProperty.call(importedCharacter, 'heroClass') ? importedCharacter.heroClass : null,
        unlockedThemes: importedCharacter.unlockedThemes || ['default'],
        activeTheme: importedCharacter.activeTheme || 'default',
        rivalId: importedCharacter.rivalId || null,
        rivalChallengeStart: importedCharacter.rivalChallengeStart || null,
        rivalChallengeGoalXP: importedCharacter.rivalChallengeGoalXP || null,
        weeklyMealLog: importedCharacter.weeklyMealLog || {},
        weeklyQuestLog: importedCharacter.weeklyQuestLog || {}
      };
      workoutLog = payload.workoutLog || [];
      cardioLog = payload.cardioLog || character.cardioLog || [];
      progressHistory = payload.progressHistory || [];
      todaysMeals = payload.todaysMeals || [];
      questProgress = payload.questProgress || questProgress;
      questProgress.bossDefeatedWeek = questProgress.bossDefeatedWeek || null;
      character.cardioLog = cardioLog;
      character.totalNodesUnlocked = getUnlockedNodeCount();
      selectedHeroId = character.activeCharId || (heroRoster[0] ? heroRoster[0].id : null);
      currentSession = [];
      workoutSuggestionMeta = { note: '', focusMuscles: [] };
      openSetFormIndex = null;
      applyTheme(character.activeTheme || 'default');
      saveData();
      updateHeader();
      renderClassSelection();
      showTab(3);
      alert('Backup imported successfully.');
    } catch (error) {
      alert(`Import failed: ${error.message}`);
    } finally {
      event.target.value = '';
    }
  };
  reader.readAsText(file);
};

function renderClassSelection() {
  const overlay = document.getElementById('class-overlay');
  const grid = document.getElementById('class-grid');
  const confirmBtn = document.getElementById('confirm-class-btn');
  if (!overlay || !grid || !confirmBtn) return;
  const selected = window.pendingHeroClass || character.heroClass || null;
  grid.innerHTML = heroClasses.map((heroClass) => `
    <button type="button" class="class-card bg-gradient-to-br ${heroClass.color} ${selected === heroClass.id ? 'selected' : ''}" onclick="selectHeroClass('${heroClass.id}')">
      <div class="text-4xl">${heroClass.icon}</div>
      <div class="text-xl font-bold mt-3">${heroClass.name}</div>
      <div class="text-sm text-white/90 mt-2">${heroClass.desc}</div>
      <div class="text-xs text-green-100 mt-3">${heroClass.bonus}</div>
    </button>
  `).join('');
  confirmBtn.disabled = !selected || !!character.heroClass;
  overlay.classList.toggle('hidden', !!character.heroClass);
}

window.selectHeroClass = function selectHeroClass(classId) {
  if (character.heroClass) return;
  window.pendingHeroClass = classId;
  renderClassSelection();
};

window.confirmHeroClass = function confirmHeroClass() {
  if (character.heroClass || !window.pendingHeroClass) return;
  character.heroClass = window.pendingHeroClass;
  saveData();
  renderClassSelection();
  renderHero();
  showAchievement('⚔️', 'Class Chosen!', `${getClassMeta()?.icon || ''} ${getClassMeta()?.name || ''}`.trim());
};

// ============================================================
// BARCODE SCANNER
// ============================================================

let scannerStream = null;
let scannerInterval = null;

window.openBarcodeScanner = async function() {
  if (typeof window.isProUser === 'function' && !window.isProUser()) {
    window.showPaywall('Barcode Scanner');
    return;
  }
  const modal = document.getElementById('scanner-modal');
  const video = document.getElementById('scanner-video');
  const status = document.getElementById('scanner-status');
  modal.classList.remove('hidden');
  status.textContent = 'Starting camera...';
  try {
    scannerStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    video.srcObject = scannerStream;
    await video.play();
    status.textContent = 'Align barcode in the frame';
    startBarcodeDetection(video, status);
  } catch(err) {
    status.textContent = 'Camera access denied. Please allow camera access in browser settings.';
  }
};

function startBarcodeDetection(video, statusEl) {
  if ('BarcodeDetector' in window) {
    const detector = new BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39'] });
    scannerInterval = setInterval(async () => {
      try {
        const barcodes = await detector.detect(video);
        if (barcodes.length > 0) {
          clearInterval(scannerInterval);
          scannerInterval = null;
          const code = barcodes[0].rawValue;
          statusEl.textContent = `Found: ${code} — Looking up...`;
          SoundFX.play('quest');
          await lookupBarcode(code, statusEl);
        }
      } catch(e) {}
    }, 500);
  } else if (window.ZXing) {
    // ZXing fallback — works on Safari/iOS PWA
    statusEl.textContent = 'Align barcode in the frame';
    const hints = new Map();
    const formats = [
      ZXing.BarcodeFormat.EAN_13,
      ZXing.BarcodeFormat.EAN_8,
      ZXing.BarcodeFormat.UPC_A,
      ZXing.BarcodeFormat.UPC_E,
      ZXing.BarcodeFormat.CODE_128,
      ZXing.BarcodeFormat.CODE_39,
    ];
    hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats);
    const reader = new ZXing.MultiFormatReader();
    reader.setHints(hints);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let zxingActive = true;

    // Store cleanup ref on scannerInterval slot so closeBarcodeScanner works
    const zxingLoop = setInterval(() => {
      if (!zxingActive || !video.readyState || video.readyState < 2) return;
      try {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const luminance = new ZXing.RGBLuminanceSource(imgData.data, canvas.width, canvas.height);
        const bitmap = new ZXing.BinaryBitmap(new ZXing.HybridBinarizer(luminance));
        const result = reader.decode(bitmap);
        if (result) {
          zxingActive = false;
          clearInterval(zxingLoop);
          scannerInterval = null;
          const code = result.getText();
          statusEl.textContent = `Found: ${code} — Looking up...`;
          SoundFX.play('quest');
          lookupBarcode(code, statusEl);
        }
      } catch (e) {
        // NotFoundException is normal when no barcode in frame — suppress
      }
    }, 300);
    scannerInterval = zxingLoop;
  } else {
    // No scanning support at all — manual only
    statusEl.textContent = 'Camera scanning unavailable. Use the manual entry below.';
    const videoEl = document.getElementById('scanner-video');
    if (videoEl) videoEl.closest('.relative')?.classList.add('hidden');
    document.querySelector('#scanner-modal > p')?.classList.add('hidden');
    const manualEl = document.getElementById('manual-barcode-input');
    if (manualEl) manualEl.focus();
  }
}

window.submitManualBarcode = async function submitManualBarcode() {
  const input = document.getElementById('manual-barcode-input');
  const statusEl = document.getElementById('scanner-status');
  if (!input || !statusEl) return;
  const code = input.value.trim().replace(/\D/g, '');
  if (!code) { statusEl.textContent = 'Please enter a barcode number.'; return; }
  statusEl.textContent = `Looking up ${code}...`;
  input.value = '';
  await lookupBarcode(code, statusEl);
};

async function lookupBarcode(barcode, statusEl) {
  try {
    const resp = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await resp.json();
    if (data.status !== 1 || !data.product) {
      statusEl.textContent = 'Product not found. Try searching manually.';
      setTimeout(() => closeBarcodeScanner(), 2500);
      return;
    }
    const p = data.product;
    const name = p.product_name || p.product_name_en || 'Unknown Product';
    const brand = p.brands || '';

    // Serving size — prefer serving data, fall back to 100g
    const servingQty = parseFloat(p.serving_quantity) || 100;
    const servingLabel = p.serving_size || `${servingQty}g`;

    // Nutrition per serving if available, else scale from per-100g
    const hasServingData = p.nutriments?.['energy-kcal_serving'] != null;
    let caloriesPer, proteinPer, carbsPer, fatPer, basisLabel, basisQty;

    if (hasServingData) {
      caloriesPer = Math.round(p.nutriments['energy-kcal_serving'] || 0);
      proteinPer = Math.round((p.nutriments['proteins_serving'] || 0) * 10) / 10;
      carbsPer = Math.round((p.nutriments['carbohydrates_serving'] || 0) * 10) / 10;
      fatPer = Math.round((p.nutriments['fat_serving'] || 0) * 10) / 10;
      basisLabel = `per serving (${servingLabel})`;
      basisQty = servingQty;
    } else {
      // Fall back to per-100g and scale to serving size
      const cal100 = p.nutriments?.['energy-kcal_100g'] || p.nutriments?.['energy-kcal'] || 0;
      const pro100 = p.nutriments?.['proteins_100g'] || 0;
      const carb100 = p.nutriments?.['carbohydrates_100g'] || 0;
      const fat100 = p.nutriments?.['fat_100g'] || 0;
      caloriesPer = Math.round(cal100 * servingQty / 100);
      proteinPer = Math.round(pro100 * servingQty / 100 * 10) / 10;
      carbsPer = Math.round(carb100 * servingQty / 100 * 10) / 10;
      fatPer = Math.round(fat100 * servingQty / 100 * 10) / 10;
      basisLabel = `per serving (${servingLabel})`;
      basisQty = servingQty;
    }

    // Store per-100g values for scaling when user changes qty
    const cal100g = Math.round(p.nutriments?.['energy-kcal_100g'] || p.nutriments?.['energy-kcal'] || (caloriesPer / servingQty * 100));
    const pro100g = Math.round((p.nutriments?.['proteins_100g'] || (proteinPer / servingQty * 100)) * 10) / 10;

    closeBarcodeScanner();
    showScannedFoodConfirmation({
      name, brand, caloriesPer, proteinPer, carbsPer, fatPer,
      basisLabel, basisQty, servingLabel, servingQty,
      cal100g, pro100g
    });
  } catch(err) {
    statusEl.textContent = 'Lookup failed. Check your connection and try again.';
    setTimeout(() => closeBarcodeScanner(), 2500);
  }
}

function showScannedFoodConfirmation(food) {
  document.getElementById('scan-confirm')?.remove();
  const div = document.createElement('div');
  div.id = 'scan-confirm';
  div.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 w-11/12 max-w-sm bg-gray-900 border border-green-500/40 rounded-3xl p-4 z-[140] shadow-xl';
  const subtitle = food.brand ? `<div class="text-xs text-gray-500 mb-1">${food.brand}</div>` : '';
  const foodJson = JSON.stringify(food).replace(/\"/g, '&quot;');
  div.innerHTML = `
    <div class="text-green-400 font-semibold mb-1">📷 ${food.name}</div>
    ${subtitle}
    <div class="text-xs text-gray-400 mb-1">${food.basisLabel}:</div>
    <div class="text-sm text-white mb-3">${food.caloriesPer} cal · ${food.proteinPer}g protein · ${food.carbsPer}g carbs · ${food.fatPer}g fat</div>
    <div class="flex gap-2 items-center mb-1">
      <label class="text-xs text-gray-400 flex-shrink-0">Amount (g):</label>
      <input id="scan-qty" type="number" value="${food.servingQty}" min="1" class="flex-1 bg-gray-800 text-white p-2 rounded-2xl text-sm">
    </div>
    <div class="text-xs text-gray-500 mb-3">Default = 1 serving (${food.servingLabel}). Change to log a different amount.</div>
    <div class="flex gap-2">
      <button onclick="logScannedFood(${foodJson})" class="flex-1 bg-green-500 hover:bg-green-600 py-2 rounded-2xl text-sm font-bold">+ Log Meal</button>
      <button onclick="document.getElementById('scan-confirm').remove()" class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-2xl text-sm">Cancel</button>
    </div>
  `;
  document.body.appendChild(div);
}

window.logScannedFood = function(food) {
  const qty = parseFloat(document.getElementById('scan-qty')?.value) || food.servingQty || 100;
  const scaledCal = Math.round((food.cal100g || food.calories || 0) * (qty / 100));
  const scaledProtein = Math.round((food.pro100g || food.protein || 0) * (qty / 100) * 10) / 10;
  todaysMeals.push({ name: food.name + ' (scanned)', quantity: qty, calories: scaledCal, protein: scaledProtein });
  const xpBase = applyCombo(getClassBonus(20, 'meal') + getTotalBonus('meal_xp_bonus'));
  character.xp += xpBase;
  character.totalMealsEver = (character.totalMealsEver || 0) + 1;
  saveData();
  levelUp();
  updateHeader();
  renderMealLogger();
  checkGearUnlocks();
  document.getElementById('scan-confirm')?.remove();
  showAchievement('📷', 'Meal Scanned!', `Logged ${food.name}`);
  SoundFX.play('xp');
};

window.closeBarcodeScanner = function() {
  clearInterval(scannerInterval);
  scannerInterval = null;
  if (scannerStream) {
    scannerStream.getTracks().forEach(t => t.stop());
    scannerStream = null;
  }
  const video = document.getElementById('scanner-video');
  if (video) video.srcObject = null;
  document.getElementById('scanner-modal')?.classList.add('hidden');
};

// ============================================================
// PUSH NOTIFICATIONS
// ============================================================

function sendNotification(title, body, icon, tag) {
  icon = icon || './logo.png';
  tag = tag || 'questgains';
  if (!character.notificationsEnabled) return;
  if (Notification.permission !== 'granted') return;
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification(title, { body, icon, tag, badge: './favicon.png', vibrate: [200, 100, 200] });
    });
  } else {
    try { new Notification(title, { body, icon, tag }); } catch(e) {}
  }
}

function scheduleStreakReminder() {
  const existingId = parseInt(localStorage.getItem('streak-reminder-timeout') || '0');
  if (existingId) clearTimeout(existingId);
  if (!character.notificationsEnabled) return;
  if ((character.currentStreak || 0) < 1) return;
  const now = new Date();
  const tonight = new Date(now);
  tonight.setHours(20, 0, 0, 0);
  if (tonight <= now) return;
  const msUntil = tonight.getTime() - now.getTime();
  const tid = setTimeout(() => {
    const todayEntries = workoutLog.filter(e => e.date === getTodayStamp());
    const meals = JSON.parse(localStorage.getItem('todaysMeals') || '[]');
    if (todayEntries.length === 0 && meals.length === 0) {
      sendNotification(
        '🔥 Streak at risk!',
        `You're on a ${character.currentStreak}-day streak. Log something before midnight to keep it alive.`,
        './logo.png', 'streak-reminder'
      );
    }
  }, msUntil);
  localStorage.setItem('streak-reminder-timeout', String(tid));
}

function scheduleBossNotification() {
  if (!character.notificationsEnabled) return;
  if (typeof bossBattles === 'undefined') return;
  const lastBossWeek = localStorage.getItem('last-boss-notif-week');
  const currentWeek = getWeekStampForDate(getTodayStamp());
  if (lastBossWeek === currentWeek) return;
  localStorage.setItem('last-boss-notif-week', currentWeek);
  const idx = Math.abs(parseInt(currentWeek.split('-W')[1] || '0')) % bossBattles.length;
  const boss = bossBattles[idx];
  if (boss) {
    setTimeout(() => {
      sendNotification(`⚔️ New Boss: ${boss.name}`, `${boss.desc} Reward: ${boss.rewardXP} XP.`, './logo.png', 'boss-battle');
    }, 3000);
  }
}

function updateNotifButton() {
  const btn = document.getElementById('notif-btn');
  if (!btn) return;
  const enabled = character.notificationsEnabled && Notification.permission === 'granted';
  const icon = btn.querySelector('span:first-child') || btn;
  icon.textContent = enabled ? '🔔' : '🔕';
  btn.title = enabled ? 'Notifications on — tap to disable' : 'Notifications off — tap to enable';
}

window.toggleNotifications = async function() {
  if (!('Notification' in window)) { alert('Your browser does not support notifications.'); return; }
  if (Notification.permission === 'denied') {
    alert('Notifications are blocked. Please enable them in your browser or phone settings, then try again.');
    return;
  }
  if (Notification.permission !== 'granted') {
    const result = await Notification.requestPermission();
    if (result !== 'granted') return;
  }
  character.notificationsEnabled = !character.notificationsEnabled;
  character.notificationPermissionAsked = true;
  saveData();
  updateNotifButton();
  if (character.notificationsEnabled) {
    sendNotification('🔔 Notifications enabled', 'You\'ll get streak reminders and boss battle alerts.');
    scheduleStreakReminder();
    scheduleBossNotification();
  }
};

window.onload = function onLoad() {
  SoundFX.init();
  syncWaterTracker();
  syncMealTracker();
  syncDailyTrackingFlags();
  syncWeeklyTrackingFlags();
  applyTheme(character.activeTheme || 'default');
  saveData();
  updateHeader();
  renderLibrary();
  populateFoodSelect('meal-food-select', nDB, false);
  renderUnitConverter();
  renderHero();
  renderClassSelection();
  checkProgressAchievements();
  showTab(13);
  scheduleHomeRerender();
  // Notifications init
  scheduleBossNotification();
  if (character.notificationsEnabled) scheduleStreakReminder();
  // Auto-ask permission after first workout (politely, once)
  if (!character.notificationPermissionAsked && workoutLog.length >= 1 && 'Notification' in window && Notification.permission === 'default') {
    setTimeout(async () => {
      const result = await Notification.requestPermission();
      character.notificationPermissionAsked = true;
      if (result === 'granted') {
        character.notificationsEnabled = true;
        sendNotification('🔔 QuestGains', 'Notifications enabled! You\'ll get streak reminders and boss alerts.', './logo.png');
        scheduleStreakReminder();
      }
      saveData();
      updateNotifButton();
    }, 4000);
  }
  console.log(`%c✅ QuestGains v2.14 loaded — ${heroRoster.length} legends, ${getUnlockedNodeCount()} nodes unlocked.`, 'color:#22c55e; font-size:18px; font-weight:bold');
};

// ─── Delete Account ───────────────────────────────────────────────────────────
window.confirmDeleteAccount = async function() {
  const confirmed = confirm('Are you sure you want to permanently delete your account? This cannot be undone. All your data, XP, and progress will be lost.');
  if (!confirmed) return;
  const confirmed2 = confirm('Last chance — delete your QuestGains account permanently?');
  if (!confirmed2) return;
  try {
    const user = window.firebase?.auth?.()?.currentUser;
    if (!user) { alert('Not logged in.'); return; }
    const uid = user.uid;
    const db = window.db;
    // Remove Firestore data
    if (db) {
      const username = window.currentUsername || localStorage.getItem('qg_username');
      if (username) await db.collection('usernames').doc(username.toLowerCase()).delete().catch(() => {});
      await db.collection('users').doc(uid).delete().catch(() => {});
    }
    // Clear local storage
    localStorage.clear();
    // Delete Firebase Auth account
    await user.delete();
    alert('Your account has been permanently deleted.');
    window.location.reload();
  } catch (err) {
    console.error('Delete account error:', err);
    if (err.code === 'auth/requires-recent-login') {
      alert('For security, please sign out and sign back in, then try deleting your account again.');
    } else {
      alert('Error deleting account. Please email support@questgains.com and we will delete it within 30 days.');
    }
  }
};
