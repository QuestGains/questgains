// QuestGains v2.13 application logic
// v2.13 update: CSS pixel-art hero portraits in the Hero tab.

const DEFAULT_CHARACTER = {
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
  weeklyQuestLog: {}
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
let currentTab = 4;
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
    nightwarden: 'violet',
    threadstrike: 'amber',
    auramancer: 'cyan'
  };
  return map[heroId] || null;
}

function getLeaderboardPlayers() {
  const me = {
    id: 'you',
    name: 'You',
    level: character.level || 1,
    xp: character.xp || 0,
    workoutsThisWeek: getCurrentWeekWorkoutEntries().length,
    isUser: true
  };
  const rivals = lbD.map((user, index) => ({
    ...user,
    id: user.id || `lb-${index + 1}`,
    workoutsThisWeek: user.workoutsThisWeek || Math.max(2, 8 - index)
  }));
  return [me, ...rivals].sort((a, b) => b.xp - a.xp).map((entry, index) => ({ ...entry, rank: index + 1 }));
}

function getRivalPlayer() {
  const players = getLeaderboardPlayers().filter((entry) => !entry.isUser);
  if (!players.length) return null;
  const top = players[0];
  character.rivalId = top.id;
  return top;
}

function checkRivalOvertake(previousXP) {
  const rival = getRivalPlayer();
  if (!rival) return;
  if ((previousXP || 0) <= rival.xp && (character.xp || 0) > rival.xp) {
    showAchievement('👊', 'Rival Crushed!', `You overtook ${rival.name}! New rival assigned.`);
    character.rivalId = rival.id;
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
  gearItems.forEach((item) => {
    if ((character.unlockedGear || []).includes(item.id)) return;
    let unlock = false;
    if (item.id === 'warriors_belt' && totalWorkouts >= 5) unlock = true;
    if (item.id === 'champions_wristband' && totalSets >= 20) unlock = true;
    if (item.id === 'iron_boots' && (character.cardioLog?.length || 0) >= 3) unlock = true;
    if (item.id === 'focus_helm' && (character.totalQuestsClaimed || 0) >= 10) unlock = true;
    if (item.id === 'recovery_cape' && (character.totalRecoveryLogs || 0) >= 5) unlock = true;
    if (item.id === 'protein_gauntlets' && (character.totalMealsEver || 0) >= 15) unlock = true;
    if (item.id === 'endurance_amulet' && (character.currentStreak || 0) >= 7) unlock = true;
    if (item.id === 'shadow_gloves' && questProgress.jumpstartCompleted.length >= jumpstartQuests.length) unlock = true;
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
  button.textContent = character.soundEnabled === false ? '🔇' : '🔊';
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
  return Math.round(xp * (character.comboMultiplier || 1.0));
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

  if (perk && perk.type === 'xp_multiplier') {
    finalXP *= perk.value;
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
  const perk = getActivePerk();
  return perk && perk.type === type ? perk.value : 0;
}

function awardXP(baseXP, context = 'generic') {
  const previousXP = character.xp || 0;
  const comboXP = applyCombo(baseXP);
  const finalXP = applyXPMultiplier(comboXP, context);
  character.xp += finalXP;
  SoundFX.play('xp');
  checkRivalOvertake(previousXP);
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

  if (n === 0) renderLibrary();
  if (n === 1) renderCurrentSession();
  if (n === 2) renderPlans();
  if (n === 3) renderProgress();
  if (n === 4) renderHero();
  if (n === 5) renderQuests();
  if (n === 6) renderLeaderboard();
  if (n === 7) renderNutrition();
  if (n === 8) renderMealLogger();
  if (n === 9) renderUnitConverter(false);
  if (n === 10) renderWorkoutHistory();
  if (n === 11) renderCardio();
}
window.showTab = showTab;

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

function showExerciseDetail(id) {
  const exercise = exDB.find((entry) => entry.id === id);
  if (!exercise) return;
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
  document.getElementById('exercise-modal').classList.remove('hidden');
}

window.hideModal = function hideModal() {
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
  const exercise = exDB[Math.floor(Math.random() * exDB.length)];
  currentSession.push({ exercise, sets: [] });
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

  let baseXP = 50 + getFlatPerkBonus('workout_xp_bonus') + getGearBonus('workout_xp_bonus');
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
  alert([`Session saved! +${earnedXP} XP 🔥`, ...messages].join('\n'));
  renderCurrentSession();
  showTab(3);
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

function renderProgress() {
  const strengthEntries = getStrengthEntries();
  const weightEntries = getWeightEntries();
  const labelSet = Array.from(new Set([...strengthEntries.map((point) => point.date), ...weightEntries.map((point) => point.date)])).sort();

  const ctx = document.getElementById('progress-chart');
  if (window.myChart) window.myChart.destroy();
  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labelSet.map((label) => getDisplayDate(label)),
      datasets: [
        {
          label: 'Strength',
          data: labelSet.map((label) => {
            const match = [...strengthEntries].reverse().find((point) => point.date === label);
            return match ? match.strength : null;
          }),
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.15)',
          fill: false,
          tension: 0.3,
          spanGaps: true
        },
        {
          label: 'Body Weight',
          data: labelSet.map((label) => {
            const match = [...weightEntries].reverse().find((point) => point.date === label);
            return match ? match.weight : null;
          }),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.15)',
          fill: false,
          tension: 0.3,
          spanGaps: true
        }
      ]
    },
    options: {
      plugins: { legend: { labels: { color: '#d1d5db' } } },
      scales: {
        x: { grid: { color: '#1f2937' }, ticks: { color: '#d1d5db' } },
        y: { grid: { color: '#333' }, ticks: { color: '#d1d5db' } }
      }
    }
  });

  const workoutCount = workoutLog.length;
  document.getElementById('pr-list').innerHTML = `<div class="text-green-400">Push-ups: ${20 + workoutCount} reps</div><div class="text-green-400">Squats: ${35 + workoutCount} reps</div>`;

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
  character.oneRMs[key] = value;
  character.oneRMsLastUpdated = new Date().toDateString();
  checkProgressAchievements();
  saveData();
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
  const gearSection = document.getElementById('hero-gear-section');
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
    themeSelector.innerHTML = `<div class="text-sm font-semibold text-green-400 mb-3">Themes</div><div class="flex flex-wrap gap-3">${appThemes.map((theme) => {
      const unlocked = (character.unlockedThemes || []).includes(theme.id);
      return `<button type="button" class="theme-swatch ${unlocked ? '' : 'locked'} ${character.activeTheme === theme.id ? 'active' : ''}" style="background:${unlocked ? theme.primary : '#4b5563'}" onclick="selectTheme('${theme.id}')" title="${theme.name} — ${theme.unlockCondition}"></button>`;
    }).join('')}</div><div class="text-xs text-gray-400 mt-3">Locked themes unlock by completing core hero paths.</div>`;
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
  heroRoster.forEach((hero) => {
    const unlockedNodes = getUnlockedNodeIds(hero.id);
    const card = document.createElement('button');
    card.className = `character-card bg-gradient-to-br ${hero.color.from} ${hero.color.to} ${selectedHeroId === hero.id ? 'active' : ''}`;
    card.innerHTML = `
      <div class="character-card-overlay">
        <div class="flex items-start justify-between gap-3 mb-2">
          <div class="text-2xl leading-none hero-card-icon">${hero.icon}</div>
          <span class="${getFactionLabelClass(hero.faction)}">${hero.faction.toUpperCase()}</span>
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

  if (gearSection) {
    gearSection.innerHTML = `<div class="text-sm font-semibold text-green-400 mb-3">⚔️ Gear</div><div class="gear-grid">${gearItems.map((item) => {
      const unlocked = (character.unlockedGear || []).includes(item.id);
      const equipped = (character.equippedGear || []).includes(item.id);
      const action = !unlocked
        ? `<div class="text-xs text-gray-400 mt-3">🔒 ${item.unlockCondition}</div>`
        : `<button onclick="toggleGearEquip('${item.id}')" class="skill-node-btn ${equipped ? 'unlock-btn' : 'equip-btn'} mt-3">${equipped ? 'Unequip' : 'Equip'}</button>`;
      return `<div class="gear-card ${!unlocked ? 'locked' : ''} ${equipped ? 'equipped' : ''}"><div class="text-3xl">${item.icon}</div><div class="font-bold mt-2">${item.name}</div><div class="text-xs text-gray-400 mt-1">${item.desc}</div><div class="text-xs text-green-400 mt-2">${item.perk}</div>${action}</div>`;
    }).join('')}</div><div class="text-xs text-gray-400 mt-3">Equip up to 2 items at once.</div>`;
  }

  updateHeader();
}

window.selectHero = function selectHero(heroId) {
  selectedHeroId = heroId;
  renderHero();
};

window.unlockHeroNode = function unlockHeroNode(heroId, nodeId) {
  triggerButtonClickSound();
  const hero = getHeroById(heroId);
  if (!hero) return;

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
  const autoVerified = type === 'daily' || type === 'weekly';
  const claimable = !autoVerified || honorSystem || isQuestClaimable(type, quest.id);
  const progressLabel = autoVerified && !honorSystem ? getQuestProgressLabel(type, quest.id) : '';
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
  currentQuestSubTab = n;
  document.querySelectorAll('#screen5 button[id^="quest-sub"]').forEach((button) => button.classList.remove('subtab-active'));
  document.getElementById(`quest-sub${n}`).classList.add('subtab-active');
  renderQuests();
};

window.claimJumpstart = function claimJumpstart(id) {
  triggerButtonClickSound();
  if (!questProgress.jumpstartCompleted.includes(id)) {
    questProgress.jumpstartCompleted.push(id);
    character.totalQuestsClaimed = (character.totalQuestsClaimed || 0) + 1;
    character.weeklyQuestLog[getCurrentWeekStamp()] = (character.weeklyQuestLog[getCurrentWeekStamp()] || 0) + 1;
    const earnedXP = awardXP(100 + getFlatPerkBonus('quest_xp_bonus') + getGearBonus('quest_xp_bonus'), 'quest');
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
    const earnedXP = awardXP(baseXP + getFlatPerkBonus('quest_xp_bonus') + getGearBonus('quest_xp_bonus'), 'quest');
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
    const earnedXP = awardXP(baseXP + getFlatPerkBonus('quest_xp_bonus') + getGearBonus('quest_xp_bonus'), 'quest');
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
    const earnedXP = awardXP(baseXP + getFlatPerkBonus('quest_xp_bonus') + getGearBonus('quest_xp_bonus') + getGearBonus('personal_quest_bonus'), 'quest');
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

function renderLeaderboard() {
  const container = document.getElementById('leaderboard-list');
  container.innerHTML = '';
  const players = getLeaderboardPlayers();
  const rival = getRivalPlayer();
  if (rival) {
    const gap = Math.max(0, rival.xp - (character.xp || 0));
    const myWorkouts = getCurrentWeekWorkoutEntries().length;
    const rivalCard = document.createElement('div');
    rivalCard.className = 'rival-card';
    rivalCard.innerHTML = `<div class="text-sm font-semibold text-red-300 mb-2">Your Rival</div><div class="flex items-start justify-between gap-3"><div><div class="text-xl font-black text-white">${rival.name}</div><div class="text-sm text-gray-300">Level ${rival.level} • ${rival.xp.toLocaleString()} XP</div></div><button onclick="startRivalChallenge()" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-2xl text-sm font-medium">Challenge</button></div><div class="text-sm text-gray-300 mt-3">Gap: ${gap > 0 ? `You are ${gap.toLocaleString()} XP behind ${rival.name}` : `You are ahead of ${rival.name}`}</div><div class="text-sm text-gray-400 mt-2">This week: ${rival.name} logged ${rival.workoutsThisWeek} workouts. You logged ${myWorkouts}.</div>${character.rivalChallengeStart ? `<div class="text-xs text-green-400 mt-3">Challenge active since ${getDisplayDate(character.rivalChallengeStart)} • Goal XP: ${character.rivalChallengeGoalXP}</div>` : ''}`;
    container.appendChild(rivalCard);
  }
  players.forEach((user) => {
    const div = document.createElement('div');
    div.className = 'bg-gray-900 p-4 rounded-3xl flex items-center justify-between';
    div.innerHTML = `<div class="flex items-center gap-4"><div class="text-2xl font-bold text-green-400 w-8">#${user.rank}</div><div><div class="font-semibold">${user.name}</div><div class="text-green-400 text-sm">Level ${user.level}</div></div></div><div class="text-right"><div class="text-xl font-bold">${user.xp.toLocaleString()} XP</div></div>`;
    container.appendChild(div);
  });
}

window.startRivalChallenge = function startRivalChallenge() {
  const rival = getRivalPlayer();
  if (!rival) return;
  character.rivalId = rival.id;
  character.rivalChallengeStart = getTodayStamp();
  character.rivalChallengeGoalXP = rival.xp + 1;
  saveData();
  renderLeaderboard();
  alert(`Challenge accepted. Beat ${rival.name} within 7 days.`);
};

window.refreshLeaderboard = function refreshLeaderboard() {
  lbD.sort(() => Math.random() - 0.5);
  lbD.forEach((user, index) => { user.rank = index + 1; user.id = user.id || `lb-${index + 1}`; user.workoutsThisWeek = user.workoutsThisWeek || Math.max(2, 8 - index); });
  renderLeaderboard();
  alert('Leaderboard refreshed with new heroes! 🔥');
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
      div.innerHTML = `<div><span class="font-semibold">${meal.name}</span> × ${meal.quantity}g</div><div class="text-green-400">${meal.calories} cal</div>`;
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

  let earnedXP = awardXP(20 + getFlatPerkBonus('meal_xp_bonus') + getGearBonus('meal_xp_bonus'), 'meal');
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

function renderUnitConverter(resetResult = true) {
  populateFoodSelect('converter-food-select', nDB, true);
  if (resetResult) document.getElementById('converter-result').innerHTML = '';
}

window.filterConverterSelect = function filterConverterSelect() {
  const searchTerm = document.getElementById('converter-search').value.toLowerCase().trim();
  const filtered = nDB.filter((food) => food.name.toLowerCase().includes(searchTerm));
  populateFoodSelect('converter-food-select', filtered, true);
};

window.convertUnits = function convertUnits() {
  const foodId = document.getElementById('converter-food-select').value;
  if (!foodId) return alert('Please select a food');

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

  const earnedXP = awardXP(30 + getGearBonus('cardio_xp_bonus'), 'cardio');
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
  showTab(0);
  console.log(`%c✅ QuestGains v2.12 loaded — ${heroRoster.length} legends, ${getUnlockedNodeCount()} nodes unlocked.`, 'color:#22c55e; font-size:18px; font-weight:bold');
};
