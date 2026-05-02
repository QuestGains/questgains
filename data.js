// QuestGains v2.13 data module
// Updated alongside v2.13 hero portrait feature pack.
// Static app data split from the original monolithic HTML file.

const exDB = [
  {
    "id": 1,
    "name": "Push-Up",
    "muscles": "Chest, Triceps, Core",
    "type": "bodyweight",
    "description": "A classic upper-body press that builds chest, arm, and trunk strength using only bodyweight.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/0.jpg",
    "cues": [
      "Keep your body in a straight line.",
      "Lower chest under control.",
      "Drive through palms and brace your core."
    ]
  },
  {
    "id": 2,
    "name": "Air Squat",
    "muscles": "Quads, Glutes, Core",
    "type": "bodyweight",
    "description": "A foundational leg movement that improves lower-body strength, mobility, and balance.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/1.jpg",
    "cues": [
      "Keep chest tall.",
      "Sit hips back and down.",
      "Drive knees out and stand tall."
    ]
  },
  {
    "id": 3,
    "name": "Plank",
    "muscles": "Core, Shoulders, Glutes",
    "type": "bodyweight",
    "description": "An isometric core staple that teaches full-body tension and trunk stability.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/1.jpg",
    "cues": [
      "Squeeze glutes and abs.",
      "Keep forearms pressing down.",
      "Avoid sagging hips."
    ]
  },
  {
    "id": 4,
    "name": "Walking Lunge",
    "muscles": "Quads, Glutes, Hamstrings",
    "type": "bodyweight",
    "description": "A unilateral lower-body exercise that trains coordination and leg strength.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/1.jpg",
    "cues": [
      "Step long enough for a vertical shin.",
      "Lower under control.",
      "Push through the front foot."
    ]
  },
  {
    "id": 5,
    "name": "Pull-Up",
    "muscles": "Lats, Biceps, Upper Back",
    "type": "gym",
    "description": "A powerful vertical pulling move for back and arm strength.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pullups/0.jpg",
    "cues": [
      "Start from a dead hang.",
      "Pull elbows toward ribs.",
      "Keep chin neutral and chest proud."
    ]
  },
  {
    "id": 6,
    "name": "Barbell Bench Press",
    "muscles": "Chest, Triceps, Front Delts",
    "type": "gym",
    "description": "A foundational barbell press used to build upper-body pushing strength.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg",
    "cues": [
      "Set shoulders back on the bench.",
      "Lower bar to mid-chest.",
      "Press up with feet planted."
    ]
  },
  {
    "id": 7,
    "name": "Barbell Back Squat",
    "muscles": "Quads, Glutes, Core",
    "type": "gym",
    "description": "A king-tier strength exercise for total lower-body development.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/0.jpg",
    "cues": [
      "Brace before you descend.",
      "Keep knees tracking over toes.",
      "Drive up through midfoot."
    ]
  },
  {
    "id": 8,
    "name": "Romanian Deadlift",
    "muscles": "Hamstrings, Glutes, Back",
    "type": "gym",
    "description": "A hinge pattern that targets posterior-chain strength and control.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
    "cues": [
      "Push hips back.",
      "Keep bar close to legs.",
      "Stop when hamstrings are loaded."
    ]
  },
  {
    "id": 9,
    "name": "Seated Cable Row",
    "muscles": "Upper Back, Lats, Biceps",
    "type": "gym",
    "description": "A controlled horizontal pull that builds the upper back and improves posture.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/0.jpg",
    "cues": [
      "Sit tall.",
      "Pull handle toward lower ribs.",
      "Control the return."
    ]
  },
  {
    "id": 10,
    "name": "Dumbbell Shoulder Press",
    "muscles": "Shoulders, Triceps, Upper Chest",
    "type": "gym",
    "description": "An overhead press that builds shoulder size and stability.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shoulder_Press/0.jpg",
    "cues": [
      "Brace your torso.",
      "Press dumbbells overhead in a smooth path.",
      "Avoid shrugging excessively."
    ]
  },
  {
    "id": 11,
    "name": "Lat Pulldown",
    "muscles": "Lats, Biceps, Mid Back",
    "type": "gym",
    "description": "A machine-based pulling movement that helps build vertical pulling strength.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/0.jpg",
    "cues": [
      "Lean back slightly.",
      "Pull bar to upper chest.",
      "Let arms fully extend at the top."
    ]
  },
  {
    "id": 12,
    "name": "Glute Bridge",
    "muscles": "Glutes, Hamstrings, Core",
    "type": "bodyweight",
    "description": "A hip-extension movement that strengthens glutes and teaches pelvic control.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butt_Lift_Bridge/0.jpg",
    "cues": [
      "Drive through heels.",
      "Squeeze glutes at the top.",
      "Keep ribs down."
    ]
  }
];

const plDB = [
  {
    "id": 1,
    "name": "Beginner Strength Quest",
    "desc": "3 days per week focused on movement quality and foundational strength.",
    "weekly": [
      {
        "day": "Monday",
        "exercises": "Air Squat, Push-Up, Glute Bridge, Plank"
      },
      {
        "day": "Wednesday",
        "exercises": "Walking Lunge, Push-Up, Plank, Pull-Up practice"
      },
      {
        "day": "Friday",
        "exercises": "Air Squat, Glute Bridge, Push-Up, Light conditioning"
      }
    ]
  },
  {
    "id": 2,
    "name": "Gym Hero Hypertrophy Split",
    "desc": "4-day split for building muscle with basic gym equipment.",
    "weekly": [
      {
        "day": "Monday",
        "exercises": "Bench Press, Shoulder Press, Push-Up, Triceps finisher"
      },
      {
        "day": "Tuesday",
        "exercises": "Back Squat, Romanian Deadlift, Walking Lunge, Core"
      },
      {
        "day": "Thursday",
        "exercises": "Lat Pulldown, Seated Cable Row, Pull-Up, Biceps finisher"
      },
      {
        "day": "Saturday",
        "exercises": "Bench Press variation, Squat variation, Plank, Conditioning"
      }
    ]
  },
  {
    "id": 3,
    "name": "Athlete Power Builder",
    "desc": "Full-body training for speed, strength, and recovery.",
    "weekly": [
      {
        "day": "Monday",
        "exercises": "Back Squat, Push-Up, Pull-Up, Plank"
      },
      {
        "day": "Wednesday",
        "exercises": "Romanian Deadlift, Shoulder Press, Walking Lunge, Core"
      },
      {
        "day": "Friday",
        "exercises": "Bench Press, Cable Row, Glute Bridge, Sprints or bike"
      }
    ]
  }
];

const heroRoster = [
  {
    id: 'solaris-prime',
    name: 'Solaris Prime',
    tagline: 'A dawn-forged titan who turns discipline into starfire.',
    faction: 'hero',
    color: { from: 'from-amber-500', to: 'to-orange-700' },
    icon: '☀️',
    nodes: [
      { id: 'solaris_sunwake', name: 'Sunwake Pulse', desc: 'Weekend dawns hit harder when your rhythm is locked in.', cost: 1, title: 'Daybreak Initiate', perk: { type: 'weekend_xp_multiplier', value: 2.0, label: 'XP doubled on weekends' } },
      { id: 'solaris_helioguard', name: 'Helio Guard', desc: 'Solar armor hardens your consistency under pressure.', cost: 1, title: 'The Radiant Wall', perk: { type: 'hero_point_bonus', value: 1, label: '+1 Hero Point on level up' } },
      { id: 'solaris_corona_drive', name: 'Corona Drive', desc: 'Burst activity turns chained quest claims into a solar flare.', cost: 2, title: 'Questflare', perk: { type: 'quest_rush_bonus', value: 50, label: '+50 XP bonus for completing 3 quests in one day' } },
      { id: 'solaris_supernova_loop', name: 'Supernova Loop', desc: 'Your growth curve bends around relentless output.', cost: 3, title: 'The Ascendant Sun', perk: { type: 'xp_to_next_reduction', value: 0.08, label: 'Level-ups require 8% less XP' } },
      { id: 'solaris_final_noon', name: 'Final Noon', desc: 'The full furnace state—every action feeds the legend.', cost: 4, title: 'Starheart Paragon', perk: { type: 'xp_multiplier', value: 1.18, label: '+18% XP from every source' } }
    ]
  },
  {
    id: 'nightwarden',
    name: 'Nightwarden',
    tagline: 'A billionaire tactician who weaponized grit, shadows, and data.',
    faction: 'hero',
    color: { from: 'from-slate-700', to: 'to-gray-950' },
    icon: '🦇',
    nodes: [
      { id: 'nightwarden_vigil', name: 'Vigil Protocol', desc: 'The night shift starts with ruthless preparation.', cost: 1, title: 'City Sentinel', perk: { type: 'quest_xp_bonus', value: 8, label: '+8 XP when claiming any quest' } },
      { id: 'nightwarden_belt', name: 'Utility Cache', desc: 'Every workout has the right tool, tempo, and backup plan.', cost: 1, title: 'Prepared Beyond Measure', perk: { type: 'workout_xp_bonus', value: 6, label: '+6 XP per finished workout' } },
      { id: 'nightwarden_dread', name: 'Dread Engine', desc: 'Fear becomes a fuel source instead of a limiter.', cost: 2, title: 'The Unseen Hand', perk: { type: 'xp_multiplier', value: 1.08, label: '+8% XP from every source' } },
      { id: 'nightwarden_orbit', name: 'Orbital Archive', desc: 'Pattern recognition trims waste from every climb.', cost: 3, title: 'Master of Angles', perk: { type: 'xp_to_next_reduction', value: 0.07, label: 'Level-ups require 7% less XP' } },
      { id: 'nightwarden_apex', name: 'Apex Gambit', desc: 'The final contingency—victory engineered before the first move.', cost: 4, title: 'The Dark Strategist', perk: { type: 'hero_point_bonus', value: 2, label: '+2 Hero Points on level up' } }
    ]
  },
  {
    id: 'threadstrike',
    name: 'Threadstrike',
    tagline: 'A fast-talking rooftop prodigy built on reflex and heart.',
    faction: 'hero',
    color: { from: 'from-rose-500', to: 'to-blue-700' },
    icon: '🕸️',
    nodes: [
      { id: 'threadstrike_sling', name: 'Skyline Sling', desc: 'Momentum turns awkward starts into smooth movement.', cost: 1, title: 'Rooftop Rookie', perk: { type: 'workout_xp_bonus', value: 5, label: '+5 XP per finished workout' } },
      { id: 'threadstrike_quip', name: 'Quip Shield', desc: 'Humor keeps pressure from locking up the system.', cost: 1, title: 'Never Cornered', perk: { type: 'meal_xp_bonus', value: 4, label: '+4 XP per meal logged' } },
      { id: 'threadstrike_sense', name: 'Tingle Sense', desc: 'Micro-reactions save energy and sharpen execution.', cost: 2, title: 'The Alert', perk: { type: 'xp_to_next_reduction', value: 0.05, label: 'Level-ups require 5% less XP' } },
      { id: 'threadstrike_arc', name: 'Crosscity Arc', desc: 'Every quest line becomes one long uninterrupted swing.', cost: 3, title: 'Sky Weaver', perk: { type: 'quest_xp_bonus', value: 12, label: '+12 XP when claiming any quest' } },
      { id: 'threadstrike_apex', name: 'Heroic Rebound', desc: 'A bad break only loads the sling for your next launch.', cost: 4, title: 'The Friendly Legend', perk: { type: 'comeback_bonus', value: 2.0, label: '2× XP on first session after a broken streak' } }
    ]
  },
  {
    id: 'iron-vanguard',
    name: 'Iron Vanguard',
    tagline: 'An ego-powered inventor in a living fortress of steel.',
    faction: 'hero',
    color: { from: 'from-red-600', to: 'to-yellow-500' },
    icon: '🤖',
    nodes: [
      { id: 'ironv_core', name: 'Arc Core', desc: 'Power management begins with ruthless energy accounting.', cost: 1, title: 'The Powered One', perk: { type: 'meal_xp_bonus', value: 5, label: '+5 XP per meal logged' } },
      { id: 'ironv_servos', name: 'Servo Assist', desc: 'Repetition gets cleaner when the suit carries the drag.', cost: 1, title: 'Steel Nerves', perk: { type: 'workout_xp_bonus', value: 7, label: '+7 XP per finished workout' } },
      { id: 'ironv_targeting', name: 'Targeting Suite', desc: 'The suit tracks output so closely it flags every new volume record.', cost: 2, title: 'Precision Engine', perk: { type: 'volume_pr_bonus', value: 75, label: '+75 XP when you beat your volume PR' } },
      { id: 'ironv_satlink', name: 'Skyfoundry Link', desc: 'Every completed quest funds the next upgrade cycle.', cost: 3, title: 'Orbital Smith', perk: { type: 'quest_xp_bonus', value: 14, label: '+14 XP when claiming any quest' } },
      { id: 'ironv_omega', name: 'Omega Frame', desc: 'The crown-tech armor that bends the leveling curve.', cost: 4, title: 'The Unbreakable Genius', perk: { type: 'xp_to_next_reduction', value: 0.1, label: 'Level-ups require 10% less XP' } }
    ]
  },
  {
    id: 'stormforged',
    name: 'Stormforged',
    tagline: 'An ancient thunder champion who trains like every rep is an oath.',
    faction: 'hero',
    color: { from: 'from-sky-500', to: 'to-indigo-700' },
    icon: '⚡',
    nodes: [
      { id: 'stormforged_call', name: 'Tempest Call', desc: 'Lightning answers those who move first.', cost: 1, title: 'Storm Touched', perk: { type: 'xp_multiplier', value: 1.05, label: '+5% XP from every source' } },
      { id: 'stormforged_hammer', name: 'Rune Hammer', desc: 'Only truly heavy iron earns the hammer favor.', cost: 1, title: 'Thunder Arm', perk: { type: 'heavy_lifter_bonus', value: 5, label: '+5 XP per set logged above 200 lbs' } },
      { id: 'stormforged_valor', name: 'Valor of Ages', desc: 'Glory favors the one who shows up again and again.', cost: 2, title: 'Oathbound', perk: { type: 'hero_point_bonus', value: 1, label: '+1 Hero Point on level up' } },
      { id: 'stormforged_rift', name: 'Sky Rift Ride', desc: 'Quests chain together in one roaring storm front.', cost: 3, title: 'Cloudbreaker', perk: { type: 'quest_xp_bonus', value: 15, label: '+15 XP when claiming any quest' } },
      { id: 'stormforged_king', name: 'Kingbolt Ascension', desc: 'The battlefield itself rewards your momentum.', cost: 4, title: 'Lord of Thunder', perk: { type: 'xp_multiplier', value: 1.17, label: '+17% XP from every source' } }
    ]
  },
  {
    id: 'goliath-rift',
    name: 'Goliath Rift',
    tagline: 'A volatile colossus whose fury becomes pure forward motion.',
    faction: 'hero',
    color: { from: 'from-emerald-500', to: 'to-lime-800' },
    icon: '🟢',
    nodes: [
      { id: 'goliath_brumble', name: 'Bruteforce Pulse', desc: 'Rage condenses into immediate action.', cost: 1, title: 'The Stirring Mass', perk: { type: 'workout_xp_bonus', value: 6, label: '+6 XP per finished workout' } },
      { id: 'goliath_hide', name: 'Titan Hide', desc: 'The brute heals fast enough to turn recovery into progress.', cost: 1, title: 'Stonehide', perk: { type: 'recovery_xp_bonus', value: 15, label: '+15 XP for logging a recovery check-in' } },
      { id: 'goliath_breaker', name: 'Breaker Roar', desc: 'Progression spikes after every breakthrough effort.', cost: 2, title: 'The Unstoppable', perk: { type: 'xp_multiplier', value: 1.1, label: '+10% XP from every source' } },
      { id: 'goliath_hunger', name: 'Aftershock Hunger', desc: 'Every logged meal feeds the beast and the build.', cost: 3, title: 'Endless Furnace', perk: { type: 'meal_xp_bonus', value: 8, label: '+8 XP per meal logged' } },
      { id: 'goliath_worldfall', name: 'Worldfall Engine', desc: 'Maximum force creates maximum advancement.', cost: 4, title: 'Planetbreaker', perk: { type: 'workout_xp_bonus', value: 18, label: '+18 XP per finished workout' } }
    ]
  },
  {
    id: 'mythara',
    name: 'Mythara',
    tagline: 'A warrior queen who treats discipline like sacred law.',
    faction: 'hero',
    color: { from: 'from-fuchsia-600', to: 'to-amber-500' },
    icon: '🛡️',
    nodes: [
      { id: 'mythara_oath', name: 'Oathsteel', desc: 'A promise kept becomes power stored.', cost: 1, title: 'The Honored', perk: { type: 'quest_xp_bonus', value: 9, label: '+9 XP when claiming any quest' } },
      { id: 'mythara_lasso', name: 'Truth Lash', desc: 'Clarity cuts through excuses and wasted reps.', cost: 1, title: 'Truthbound', perk: { type: 'xp_to_next_reduction', value: 0.05, label: 'Level-ups require 5% less XP' } },
      { id: 'mythara_crown', name: 'War-Crown Bearing', desc: 'A queen of legends grows stronger by mastering many heroic lineages.', cost: 2, title: 'Queen of Resolve', perk: { type: 'hero_collector_multiplier', value: 1.05, label: '+5% XP permanently after unlocking 10 total nodes' } },
      { id: 'mythara_charge', name: 'Amazon Charge', desc: 'Warriors who show up all week earn divine respect.', cost: 3, title: 'Spear of Dawn', perk: { type: 'weekly_dedication_bonus', value: 100, label: '+100 XP for logging 5 workouts in a week' } },
      { id: 'mythara_apotheosis', name: 'Divine March', desc: 'The battlefield crowns those who never kneel.', cost: 4, title: 'The Golden General', perk: { type: 'xp_multiplier', value: 1.16, label: '+16% XP from every source' } }
    ]
  },
  {
    id: 'voltflare',
    name: 'Voltflare',
    tagline: 'A blur of lightning who wins by stacking perfect micro-seconds.',
    faction: 'hero',
    color: { from: 'from-yellow-400', to: 'to-orange-500' },
    icon: '🏃',
    nodes: [
      { id: 'voltflare_step', name: 'Quickstep Circuit', desc: 'Small wins happen faster when hesitation disappears.', cost: 1, title: 'The Fast Start', perk: { type: 'xp_multiplier', value: 1.04, label: '+4% XP from every source' } },
      { id: 'voltflare_reflex', name: 'Reflex Bloom', desc: 'Even your cardio days keep the momentum meter alive.', cost: 1, title: 'Reflex Born', perk: { type: 'cardio_streak_credit', value: 1, label: 'Cardio sessions count toward your workout streak' } },
      { id: 'voltflare_overrun', name: 'Overrun Lane', desc: 'Every quest claim keeps the combo alive.', cost: 2, title: 'Momentum Addict', perk: { type: 'quest_xp_bonus', value: 11, label: '+11 XP when claiming any quest' } },
      { id: 'voltflare_slip', name: 'Slipstream Logic', desc: 'The road to the next level gets shorter at speed.', cost: 3, title: 'The Blur Between', perk: { type: 'xp_to_next_reduction', value: 0.09, label: 'Level-ups require 9% less XP' } },
      { id: 'voltflare_zenith', name: 'Zenith Velocity', desc: 'All systems move in a single electric line.', cost: 4, title: 'Lord of the Last Lap', perk: { type: 'xp_multiplier', value: 1.2, label: '+20% XP from every source' } }
    ]
  },
  {
    id: 'inevitor',
    name: 'Inevitor',
    tagline: 'A cosmic tyrant who believes progress is unavoidable.',
    faction: 'villain',
    color: { from: 'from-violet-700', to: 'to-slate-950' },
    icon: '🪐',
    nodes: [
      { id: 'inevitor_edict', name: 'Doom Edict', desc: 'The plan is written before the battle begins.', cost: 1, title: 'The Certain', perk: { type: 'quest_xp_bonus', value: 10, label: '+10 XP when claiming any quest' } },
      { id: 'inevitor_grip', name: 'Gravity Grip', desc: 'Effort bends the field around your ambition.', cost: 1, title: 'World Hand', perk: { type: 'hero_point_bonus', value: 1, label: '+1 Hero Point on level up' } },
      { id: 'inevitor_balance', name: 'Harsh Balance', desc: 'Waste is removed so advancement becomes clean and cruel.', cost: 2, title: 'The Cold Judge', perk: { type: 'xp_to_next_reduction', value: 0.06, label: 'Level-ups require 6% less XP' } },
      { id: 'inevitor_march', name: 'Endless March', desc: 'Each finished session looks like conquest.', cost: 3, title: 'Breaker of Ages', perk: { type: 'workout_xp_bonus', value: 12, label: '+12 XP per finished workout' } },
      { id: 'inevitor_finality', name: 'Finality Crown', desc: 'The universe itself starts compounding your rise.', cost: 4, title: 'The Inevitable', perk: { type: 'xp_multiplier', value: 1.18, label: '+18% XP from every source' } }
    ]
  },
  {
    id: 'magnetar-reign',
    name: 'Magnetar Reign',
    tagline: 'A magnetic sovereign who turns pressure into control.',
    faction: 'villain',
    color: { from: 'from-cyan-500', to: 'to-slate-800' },
    icon: '🧲',
    nodes: [
      { id: 'magnetar_polar', name: 'Polar Draw', desc: 'You pull progress closer with every decisive action.', cost: 1, title: 'Field Caller', perk: { type: 'meal_xp_bonus', value: 4, label: '+4 XP per meal logged' } },
      { id: 'magnetar_ironwill', name: 'Ironmind Flux', desc: 'The strongest systems start with unshakable focus.', cost: 1, title: 'Iron Will', perk: { type: 'xp_multiplier', value: 1.06, label: '+6% XP from every source' } },
      { id: 'magnetar_lattice', name: 'Lattice Control', desc: 'Your route to the next tier gets mathematically tighter.', cost: 2, title: 'Master of Vectors', perk: { type: 'xp_to_next_reduction', value: 0.06, label: 'Level-ups require 6% less XP' } },
      { id: 'magnetar_siege', name: 'Siege Orbit', desc: 'Quests collapse into your orbit and pay tribute.', cost: 3, title: 'The Shifting Pole', perk: { type: 'quest_xp_bonus', value: 13, label: '+13 XP when claiming any quest' } },
      { id: 'magnetar_apex', name: 'Apex Dominion', desc: 'Absolute control creates permanent momentum.', cost: 4, title: 'The Magnetic King', perk: { type: 'hero_point_bonus', value: 2, label: '+2 Hero Points on level up' } }
    ]
  },
  {
    id: 'red-mirth',
    name: 'Red Mirth',
    tagline: 'A mouthy mercenary who treats chaos like cardio.',
    faction: 'villain',
    color: { from: 'from-red-500', to: 'to-pink-600' },
    icon: '🗡️',
    nodes: [
      { id: 'redmirth_wink', name: 'Wink Reload', desc: 'A little absurdity keeps the grind from turning stale.', cost: 1, title: 'Too Weird to Quit', perk: { type: 'meal_xp_bonus', value: 5, label: '+5 XP per meal logged' } },
      { id: 'redmirth_blades', name: 'Twin Edge Banter', desc: 'Training finishes faster when pain becomes part of the joke.', cost: 1, title: 'The Loud Blade', perk: { type: 'workout_xp_bonus', value: 6, label: '+6 XP per finished workout' } },
      { id: 'redmirth_contract', name: 'Contract Fever', desc: 'Quest claims start stacking like bounties.', cost: 2, title: 'Bounty Ghost', perk: { type: 'quest_xp_bonus', value: 12, label: '+12 XP when claiming any quest' } },
      { id: 'redmirth_regen', name: 'Regen Loop', desc: 'Your recovery logs pay out because healing is part of the bit.', cost: 3, title: 'The Hard Reset', perk: { type: 'recovery_xp_bonus', value: 15, label: '+15 XP for logging a recovery check-in' } },
      { id: 'redmirth_massacre', name: 'Fourth-Wall Massacre', desc: 'You stop playing the system and start farming it.', cost: 4, title: 'Chaos for Hire', perk: { type: 'xp_multiplier', value: 1.17, label: '+17% XP from every source' } }
    ]
  },
  {
    id: 'onyx-koro',
    name: 'Onyx Koro',
    tagline: 'A regal panther king whose discipline is sharper than claws.',
    faction: 'hero',
    color: { from: 'from-slate-900', to: 'to-purple-800' },
    icon: '🐾',
    nodes: [
      { id: 'onyx_rite', name: 'Royal Rite', desc: 'The ritual of preparation becomes an advantage.', cost: 1, title: 'Crowned Hunter', perk: { type: 'meal_xp_bonus', value: 4, label: '+4 XP per meal logged' } },
      { id: 'onyx_stride', name: 'Silent Stride', desc: 'Every rep becomes cleaner, quieter, and more exact.', cost: 1, title: 'The Hidden Prince', perk: { type: 'xp_multiplier', value: 1.05, label: '+5% XP from every source' } },
      { id: 'onyx_vibrance', name: 'Resonance Weave', desc: 'Stored impact returns as usable momentum.', cost: 2, title: 'The Resonant', perk: { type: 'workout_xp_bonus', value: 8, label: '+8 XP per finished workout' } },
      { id: 'onyx_council', name: 'Council of Ancestors', desc: 'Lineage and wisdom shorten the road ahead.', cost: 3, title: 'Keeper of the Line', perk: { type: 'xp_to_next_reduction', value: 0.08, label: 'Level-ups require 8% less XP' } },
      { id: 'onyx_throne', name: 'Midnight Throne', desc: 'The king gets paid extra when recovery is complete and sleep is royal.', cost: 4, title: 'The Vibrant King', perk: { type: 'sleep_champion_bonus', value: 20, label: '+20 XP when you log 8+ hours of sleep' } }
    ]
  },
  {
    id: 'riftmage',
    name: 'Riftmage',
    tagline: 'A dimension-walking mystic who optimizes mind and matter.',
    faction: 'hero',
    color: { from: 'from-purple-600', to: 'to-indigo-900' },
    icon: '🔮',
    nodes: [
      { id: 'riftmage_sigil', name: 'Sigil Wake', desc: 'Focus sharpens when ritual meets intention.', cost: 1, title: 'Apprentice of Gates', perk: { type: 'quest_xp_bonus', value: 9, label: '+9 XP when claiming any quest' } },
      { id: 'riftmage_veil', name: 'Veil Step', desc: 'You slip past wasted effort and poor timing.', cost: 1, title: 'Walker Between', perk: { type: 'xp_to_next_reduction', value: 0.05, label: 'Level-ups require 5% less XP' } },
      { id: 'riftmage_eye', name: 'Third Eye Circuit', desc: 'Arcane awareness rewards every exercise your last session missed.', cost: 2, title: 'Pattern Seer', perk: { type: 'variety_bonus', value: 10, label: '+10 XP per exercise not done in last session' } },
      { id: 'riftmage_tome', name: 'Endless Tome', desc: 'Knowledge creates bonus value from every claim.', cost: 3, title: 'Arcane Archivist', perk: { type: 'quest_xp_bonus', value: 15, label: '+15 XP when claiming any quest' } },
      { id: 'riftmage_mastery', name: 'Dimensional Mastery', desc: 'The climb itself folds to your will.', cost: 4, title: 'The Archmage', perk: { type: 'xp_to_next_reduction', value: 0.11, label: 'Level-ups require 11% less XP' } }
    ]
  },
  {
    id: 'fangshade',
    name: 'Fangshade',
    tagline: 'A feral drifter whose scars only make the engine stronger.',
    faction: 'hero',
    color: { from: 'from-zinc-500', to: 'to-red-900' },
    icon: '🐺',
    nodes: [
      { id: 'fangshade_instinct', name: 'Predator Instinct', desc: 'You move on instinct before the mind can stall.', cost: 1, title: 'The Lone Hunt', perk: { type: 'workout_xp_bonus', value: 7, label: '+7 XP per finished workout' } },
      { id: 'fangshade_grit', name: 'Adamant Grit', desc: 'Pain tolerance becomes progression fuel.', cost: 1, title: 'The Uncut', perk: { type: 'xp_multiplier', value: 1.06, label: '+6% XP from every source' } },
      { id: 'fangshade_heal', name: 'Savage Mend', desc: 'The body resets faster than the world expects.', cost: 2, title: 'Rapidblood', perk: { type: 'meal_xp_bonus', value: 6, label: '+6 XP per meal logged' } },
      { id: 'fangshade_trail', name: 'Blood Trail Focus', desc: 'No level is far when the hunt is personal.', cost: 3, title: 'Relentless Tracker', perk: { type: 'xp_to_next_reduction', value: 0.08, label: 'Level-ups require 8% less XP' } },
      { id: 'fangshade_apex', name: 'Apex Frenzy', desc: 'Once unleashed, your growth rate turns brutal.', cost: 4, title: 'The Bone-Deep', perk: { type: 'workout_xp_bonus', value: 16, label: '+16 XP per finished workout' } }
    ]
  },
  {
    id: 'mad-crown',
    name: 'Mad Crown',
    tagline: 'A theatrical chaos lord who turns disorder into power spikes.',
    faction: 'villain',
    color: { from: 'from-pink-500', to: 'to-purple-900' },
    icon: '🃏',
    nodes: [
      { id: 'madcrown_giggle', name: 'Giggle Gas', desc: 'Chaos peaks when three quests pop in a single day.', cost: 1, title: 'The Smiling Threat', perk: { type: 'quest_rush_bonus', value: 50, label: '+50 XP bonus for completing 3 quests in one day' } },
      { id: 'madcrown_shuffle', name: 'Wildcard Shuffle', desc: 'Erratic energy turns routine into spectacle.', cost: 1, title: 'Chaos Card', perk: { type: 'meal_xp_bonus', value: 5, label: '+5 XP per meal logged' } },
      { id: 'madcrown_blast', name: 'Punchline Blast', desc: 'A messy style still lands with shocking efficiency.', cost: 2, title: 'The Last Laugh', perk: { type: 'xp_multiplier', value: 1.09, label: '+9% XP from every source' } },
      { id: 'madcrown_parade', name: 'Carnival Riot', desc: 'Each finished session feels like a hostile takeover.', cost: 3, title: 'Prince of Disorder', perk: { type: 'workout_xp_bonus', value: 11, label: '+11 XP per finished workout' } },
      { id: 'madcrown_endgame', name: 'Endgame Cackle', desc: 'The whole game bends when chaos becomes deliberate.', cost: 4, title: 'The Scarlet Jester', perk: { type: 'hero_point_bonus', value: 2, label: '+2 Hero Points on level up' } }
    ]
  },
  {
    id: 'emberveil',
    name: 'Emberveil',
    tagline: 'A chakra-lit runner who refuses to stay down.',
    faction: 'hero',
    color: { from: 'from-orange-500', to: 'to-amber-700' },
    icon: '🍥',
    nodes: [
      { id: 'emberveil_spark', name: 'Foxfire Sprint', desc: 'Raw will ignites the first dash toward progress.', cost: 1, title: 'The Unyielding Spark', perk: { type: 'workout_xp_bonus', value: 6, label: '+6 XP per finished workout' } },
      { id: 'emberveil_grin', name: 'Neverdown Grin', desc: 'Setbacks only make the next comeback hit harder.', cost: 1, title: 'The Loud Heart', perk: { type: 'comeback_bonus', value: 2.0, label: '2× XP on first session after a broken streak' } },
      { id: 'emberveil_flow', name: 'Chakra Torrent', desc: 'Energy channels cleanly into every quest you finish.', cost: 2, title: 'Current Walker', perk: { type: 'quest_xp_bonus', value: 11, label: '+11 XP when claiming any quest' } },
      { id: 'emberveil_cloak', name: 'Blazetail Cloak', desc: 'A hotter spirit trims dead distance from your climb.', cost: 3, title: 'Veiled Inferno', perk: { type: 'xp_to_next_reduction', value: 0.08, label: 'Level-ups require 8% less XP' } },
      { id: 'emberveil_horizon', name: 'Horizon Burst', desc: 'At full burn, every action surges with impossible heart.', cost: 4, title: 'The Dawn Vessel', perk: { type: 'xp_multiplier', value: 1.18, label: '+18% XP from every source' } }
    ]
  },
  {
    id: 'astravault',
    name: 'Astravault',
    tagline: 'A skyborn brawler whose power keeps finding another ceiling to break.',
    faction: 'hero',
    color: { from: 'from-sky-400', to: 'to-indigo-700' },
    icon: '☄️',
    nodes: [
      { id: 'astravault_rise', name: 'Meteor Rise', desc: 'The first ascent comes from joy in the fight itself.', cost: 1, title: 'Cloudstep Rookie', perk: { type: 'xp_multiplier', value: 1.04, label: '+4% XP from every source' } },
      { id: 'astravault_core', name: 'Starwell Core', desc: 'Your body stocks endless reserves for the next round.', cost: 1, title: 'The Bright Engine', perk: { type: 'meal_xp_bonus', value: 5, label: '+5 XP per meal logged' } },
      { id: 'astravault_wave', name: 'Nova Palm', desc: 'Every finished workout lands like a shockwave.', cost: 2, title: 'Breaker of Clouds', perk: { type: 'workout_xp_bonus', value: 9, label: '+9 XP per finished workout' } },
      { id: 'astravault_sky', name: 'Skybreak Form', desc: 'Each transformation collapses the gap to the next milestone.', cost: 3, title: 'Ascension Adept', perk: { type: 'xp_to_next_reduction', value: 0.09, label: 'Level-ups require 9% less XP' } },
      { id: 'astravault_infinite', name: 'Infinite Vault', desc: 'Limitless battle hunger compounds all growth.', cost: 4, title: 'The Sunbound Apex', perk: { type: 'xp_multiplier', value: 1.2, label: '+20% XP from every source' } }
    ]
  },
  {
    id: 'crownvolt',
    name: 'Crownvolt',
    tagline: 'A princely rival forged from pride, pressure, and elite output.',
    faction: 'villain',
    color: { from: 'from-indigo-600', to: 'to-blue-900' },
    icon: '👑',
    nodes: [
      { id: 'crownvolt_pride', name: 'Royal Scorn', desc: 'Pride sharpens every quest into a duel you refuse to lose.', cost: 1, title: 'The First Heir', perk: { type: 'quest_xp_bonus', value: 9, label: '+9 XP when claiming any quest' } },
      { id: 'crownvolt_grit', name: 'Elite Pulse', desc: 'Training gets meaner when your standards rise.', cost: 1, title: 'Noble Shock', perk: { type: 'workout_xp_bonus', value: 7, label: '+7 XP per finished workout' } },
      { id: 'crownvolt_rank', name: 'Bloodline Verdict', desc: 'True royalty claims more from every level gained.', cost: 2, title: 'The Unbowed', perk: { type: 'hero_point_bonus', value: 1, label: '+1 Hero Point on level up' } },
      { id: 'crownvolt_surge', name: 'Blue Ascendant', desc: 'Your next tier arrives faster under competitive fury.', cost: 3, title: 'Storm Prince', perk: { type: 'xp_to_next_reduction', value: 0.07, label: 'Level-ups require 7% less XP' } },
      { id: 'crownvolt_final', name: 'Imperial Breaker', desc: 'Elite power peaks when ego and effort align.', cost: 4, title: 'The Thunder Sovereign', perk: { type: 'xp_multiplier', value: 1.17, label: '+17% XP from every source' } }
    ]
  },
  {
    id: 'freelash',
    name: 'Freelash',
    tagline: 'A laughing elastic outlaw chasing the next impossible horizon.',
    faction: 'hero',
    color: { from: 'from-red-500', to: 'to-yellow-600' },
    icon: '🏴‍☠️',
    nodes: [
      { id: 'freelash_stretch', name: 'Wild Stretch', desc: 'Adaptability turns weird angles into easy progress.', cost: 1, title: 'Deckborn Dreamer', perk: { type: 'meal_xp_bonus', value: 4, label: '+4 XP per meal logged' } },
      { id: 'freelash_joy', name: 'Laughing Charge', desc: 'A free spirit counts every run, ride, and sprint toward the streak.', cost: 1, title: 'The Open Tide', perk: { type: 'cardio_streak_credit', value: 1, label: 'Cardio sessions count toward your workout streak' } },
      { id: 'freelash_sail', name: 'Grandline Drive', desc: 'Quest claims stack like islands conquered.', cost: 2, title: 'Storm Sailor', perk: { type: 'quest_xp_bonus', value: 12, label: '+12 XP when claiming any quest' } },
      { id: 'freelash_snap', name: 'Catapult Snap', desc: 'Your body rebounds harder after every session logged.', cost: 3, title: 'The Rubber Raid', perk: { type: 'workout_xp_bonus', value: 11, label: '+11 XP per finished workout' } },
      { id: 'freelash_legend', name: 'Sunwake Corsair', desc: 'Boundless spirit turns adventure into permanent acceleration.', cost: 4, title: 'Captain of Dawn', perk: { type: 'hero_point_bonus', value: 2, label: '+2 Hero Points on level up' } }
    ]
  },
  {
    id: 'gravebulk',
    name: 'Gravebulk',
    tagline: 'A wrath-driven giant who lets rage decide what survives.',
    faction: 'villain',
    color: { from: 'from-lime-600', to: 'to-stone-800' },
    icon: '🧱',
    nodes: [
      { id: 'gravebulk_rumble', name: 'Catacomb Tremor', desc: 'The beast wakes the instant restraint cracks.', cost: 1, title: 'The Buried Threat', perk: { type: 'workout_xp_bonus', value: 8, label: '+8 XP per finished workout' } },
      { id: 'gravebulk_hide', name: 'Siege Flesh', desc: 'Brutal density lets you recover and refuel faster.', cost: 1, title: 'Stonevein', perk: { type: 'meal_xp_bonus', value: 5, label: '+5 XP per meal logged' } },
      { id: 'gravebulk_march', name: 'Ruin March', desc: 'Every quest cleared feels like a wall torn open.', cost: 2, title: 'The Unrelenting', perk: { type: 'quest_xp_bonus', value: 13, label: '+13 XP when claiming any quest' } },
      { id: 'gravebulk_shift', name: 'Titan Husk', desc: 'Transformation shortens the road to the next warpath.', cost: 3, title: 'Breaker Form', perk: { type: 'xp_to_next_reduction', value: 0.09, label: 'Level-ups require 9% less XP' } },
      { id: 'gravebulk_end', name: 'Earthrender Howl', desc: 'Only monstrous loads count when the earth-shaker is fully awake.', cost: 4, title: 'The Last Colossus', perk: { type: 'heavy_lifter_bonus', value: 5, label: '+5 XP per set logged above 200 lbs' } }
    ]
  },
  {
    id: 'razorfen',
    name: 'Razorfen',
    tagline: 'A cold aerial slayer who wastes nothing, not even motion.',
    faction: 'hero',
    color: { from: 'from-teal-500', to: 'to-slate-700' },
    icon: '🗡️',
    nodes: [
      { id: 'razorfen_step', name: 'Wirestep', desc: 'Precision makes every session worth more than it looks.', cost: 1, title: 'The Silent Cut', perk: { type: 'xp_multiplier', value: 1.05, label: '+5% XP from every source' } },
      { id: 'razorfen_breath', name: 'Clean Breach', desc: 'Lean discipline sharpens output without wasted fuel.', cost: 1, title: 'Steel Nerve', perk: { type: 'workout_xp_bonus', value: 6, label: '+6 XP per finished workout' } },
      { id: 'razorfen_mark', name: 'Throatline Focus', desc: 'An exact eye makes quest completion brutally efficient.', cost: 2, title: 'The Finisher', perk: { type: 'quest_xp_bonus', value: 10, label: '+10 XP when claiming any quest' } },
      { id: 'razorfen_spin', name: 'Cyclone Slice', desc: 'Perfect route planning trims every climb.', cost: 3, title: 'Sky Reaper', perk: { type: 'xp_to_next_reduction', value: 0.08, label: 'Level-ups require 8% less XP' } },
      { id: 'razorfen_zero', name: 'Zero Mercy Arc', desc: 'When efficiency peaks, all gains arrive faster.', cost: 4, title: 'Humanity’s Edge', perk: { type: 'xp_multiplier', value: 1.16, label: '+16% XP from every source' } }
    ]
  },
  {
    id: 'brookeflame',
    name: 'Brookeflame',
    tagline: 'A gentle swordsman whose breathing turns calm into lethal rhythm.',
    faction: 'hero',
    color: { from: 'from-cyan-500', to: 'to-emerald-700' },
    icon: '🌊',
    nodes: [
      { id: 'brookeflame_form', name: 'First Current', desc: 'Breath work and sleep quality turn recovery into a weapon.', cost: 1, title: 'River Novice', perk: { type: 'sleep_champion_bonus', value: 20, label: '+20 XP when you log 8+ hours of sleep' } },
      { id: 'brookeflame_kind', name: 'Kindling Mercy', desc: 'A disciplined day is one where all three meals are honored.', cost: 1, title: 'The Warm Blade', perk: { type: 'full_day_logger_bonus', value: 25, label: '+25 XP for logging 3+ meals in one day' } },
      { id: 'brookeflame_cut', name: 'Mistdraw', desc: 'Every finished workout slices cleaner than the last.', cost: 2, title: 'Demon Quietus', perk: { type: 'workout_xp_bonus', value: 8, label: '+8 XP per finished workout' } },
      { id: 'brookeflame_tide', name: 'Tide Lantern', desc: 'Your quests begin flowing together with effortless grace.', cost: 3, title: 'Lantern of Forms', perk: { type: 'quest_xp_bonus', value: 14, label: '+14 XP when claiming any quest' } },
      { id: 'brookeflame_sun', name: 'Sunlit Ninth', desc: 'Perfect breath turns all progress bright and swift.', cost: 4, title: 'The Dawn Breather', perk: { type: 'xp_multiplier', value: 1.17, label: '+17% XP from every source' } }
    ]
  },
  {
    id: 'valorgiant',
    name: 'Valorgiant',
    tagline: 'A smiling colossus built to be the banner everyone runs toward.',
    faction: 'hero',
    color: { from: 'from-yellow-500', to: 'to-red-700' },
    icon: '🦸',
    nodes: [
      { id: 'valorgiant_pose', name: 'Hope Stance', desc: 'Presence alone makes each quest claim more meaningful.', cost: 1, title: 'Beacon Cadet', perk: { type: 'quest_xp_bonus', value: 10, label: '+10 XP when claiming any quest' } },
      { id: 'valorgiant_smile', name: 'Fearless Smile', desc: 'Steady morale increases all XP gains.', cost: 1, title: 'The Bright Standard', perk: { type: 'xp_multiplier', value: 1.06, label: '+6% XP from every source' } },
      { id: 'valorgiant_lift', name: 'Citylift', desc: 'A true symbol of peace rewards a full week of work.', cost: 2, title: 'Peace Bearer', perk: { type: 'weekly_dedication_bonus', value: 100, label: '+100 XP for logging 5 workouts in a week' } },
      { id: 'valorgiant_roar', name: 'Ultra Roar', desc: 'Massive effort shortens the next climb.', cost: 3, title: 'The Last Pillar', perk: { type: 'xp_to_next_reduction', value: 0.08, label: 'Level-ups require 8% less XP' } },
      { id: 'valorgiant_legend', name: 'Banner of Triumph', desc: 'When the symbol stands tall, everyone levels faster.', cost: 4, title: 'The Peace Titan', perk: { type: 'xp_multiplier', value: 1.18, label: '+18% XP from every source' } }
    ]
  },
  {
    id: 'plainstrike',
    name: 'Plainstrike',
    tagline: 'A blank-faced powerhouse so strong the grind barely entertains him.',
    faction: 'hero',
    color: { from: 'from-zinc-300', to: 'to-yellow-500' },
    icon: '👊',
    nodes: [
      { id: 'plainstrike_bare', name: 'Bare Routine', desc: 'Even your baseline workout output is absurd.', cost: 1, title: 'Caped Minimalist', perk: { type: 'workout_xp_bonus', value: 7, label: '+7 XP per finished workout' } },
      { id: 'plainstrike_yawn', name: 'Yawn State', desc: 'Boredom keeps your nutrition simple and consistent.', cost: 1, title: 'The Unimpressed', perk: { type: 'meal_xp_bonus', value: 5, label: '+5 XP per meal logged' } },
      { id: 'plainstrike_walk', name: 'Discount Sprint', desc: 'The fastest route to the next level feels almost unfair.', cost: 2, title: 'Sunday Destroyer', perk: { type: 'xp_to_next_reduction', value: 0.09, label: 'Level-ups require 9% less XP' } },
      { id: 'plainstrike_tap', name: 'Casual Tap', desc: 'Quest claims vanish with one effortless motion.', cost: 3, title: 'Problem Eraser', perk: { type: 'quest_xp_bonus', value: 16, label: '+16 XP when claiming any quest' } },
      { id: 'plainstrike_zero', name: 'Zero Limit Hit', desc: 'Even a casual session can shatter your old volume ceiling.', cost: 4, title: 'The Final Bell', perk: { type: 'volume_pr_bonus', value: 75, label: '+75 XP when you beat your volume PR' } }
    ]
  },
  {
    id: 'duskrender',
    name: 'Duskrender',
    tagline: 'A soul-cutting wanderer split between duty and the beast inside.',
    faction: 'hero',
    color: { from: 'from-orange-600', to: 'to-slate-900' },
    icon: '🗡️',
    nodes: [
      { id: 'duskrender_draw', name: 'Soul Draw', desc: 'A clean unsheathing turns routine into revelation.', cost: 1, title: 'The Substitute Edge', perk: { type: 'xp_multiplier', value: 1.05, label: '+5% XP from every source' } },
      { id: 'duskrender_mask', name: 'Inner Mask', desc: 'The beast lends savage force to finished sessions.', cost: 1, title: 'Hollow Veil', perk: { type: 'workout_xp_bonus', value: 8, label: '+8 XP per finished workout' } },
      { id: 'duskrender_chain', name: 'Boundary Chain', desc: 'Quest rewards hit harder when worlds collide.', cost: 2, title: 'Keeper of Thresholds', perk: { type: 'quest_xp_bonus', value: 13, label: '+13 XP when claiming any quest' } },
      { id: 'duskrender_shun', name: 'Night Crossing', desc: 'Your climb shortens as instincts and discipline merge.', cost: 3, title: 'The Twin-Souled', perk: { type: 'xp_to_next_reduction', value: 0.08, label: 'Level-ups require 8% less XP' } },
      { id: 'duskrender_final', name: 'Black Crescent', desc: 'A final release turns every source of XP vicious.', cost: 4, title: 'The Grave Horizon', perk: { type: 'xp_multiplier', value: 1.19, label: '+19% XP from every source' } }
    ]
  },
  {
    id: 'aegis-ward',
    name: 'Aegis Ward',
    tagline: 'A shield-first patriot who makes discipline look unbreakable.',
    faction: 'hero',
    color: { from: 'from-blue-600', to: 'to-red-700' },
    icon: '🛡️',
    nodes: [
      { id: 'aegis_pledge', name: 'Oath March', desc: 'Each finished quest feels like service rendered well.', cost: 1, title: 'The First Sentinel', perk: { type: 'quest_xp_bonus', value: 9, label: '+9 XP when claiming any quest' } },
      { id: 'aegis_throw', name: 'Starshield Return', desc: 'A well-thrown shield can save a streak from breaking once a week.', cost: 1, title: 'Ricochet Guard', perk: { type: 'streak_shield', value: 1, label: 'One streak miss forgiven per week' } },
      { id: 'aegis_heart', name: 'Serum Heart', desc: 'Standards rise, and so does the reward for leveling.', cost: 2, title: 'The Proven', perk: { type: 'hero_point_bonus', value: 1, label: '+1 Hero Point on level up' } },
      { id: 'aegis_line', name: 'Last Line', desc: 'Resolve removes friction from the road ahead.', cost: 3, title: 'Wall of Liberty', perk: { type: 'xp_to_next_reduction', value: 0.07, label: 'Level-ups require 7% less XP' } },
      { id: 'aegis_union', name: 'Union Standard', desc: 'When conviction hardens, all XP comes faster.', cost: 4, title: 'Captain of the Dawnwatch', perk: { type: 'xp_multiplier', value: 1.16, label: '+16% XP from every source' } }
    ]
  },
  {
    id: 'hexara',
    name: 'Hexara',
    tagline: 'A reality-fracturing mystic who can save the world or unmake it.',
    faction: 'villain',
    color: { from: 'from-rose-600', to: 'to-violet-800' },
    icon: '🔺',
    nodes: [
      { id: 'hexara_whisper', name: 'Probability Whisper', desc: 'Small distortions make daily meals matter more.', cost: 1, title: 'The Flicker Witch', perk: { type: 'meal_xp_bonus', value: 5, label: '+5 XP per meal logged' } },
      { id: 'hexara_curse', name: 'Scarlet Ripple', desc: 'Luck bends so all sources start paying better.', cost: 1, title: 'The Red Hinge', perk: { type: 'xp_multiplier', value: 1.06, label: '+6% XP from every source' } },
      { id: 'hexara_warp', name: 'House of Glass', desc: 'The path to the next tier twists shorter by force.', cost: 2, title: 'World Unseamer', perk: { type: 'xp_to_next_reduction', value: 0.08, label: 'Level-ups require 8% less XP' } },
      { id: 'hexara_chaos', name: 'Chaos Cradle', desc: 'Quest claims rupture reality and return richer.', cost: 3, title: 'The Living Hex', perk: { type: 'quest_xp_bonus', value: 15, label: '+15 XP when claiming any quest' } },
      { id: 'hexara_throne', name: 'Red Dominion', desc: 'At full focus, chance itself multiplies your rise.', cost: 4, title: 'Chaos Incarnate', perk: { type: 'xp_multiplier', value: 1.19, label: '+19% XP from every source' } }
    ]
  },
  {
    id: 'umbrafang',
    name: 'Umbrafang',
    tagline: 'A living void-skin predator that rewards surrender to the dark.',
    faction: 'villain',
    color: { from: 'from-slate-800', to: 'to-black' },
    icon: '🕷️',
    nodes: [
      { id: 'umbrafang_bind', name: 'Black Bind', desc: 'The symbiote rewards food intake that feeds the mass.', cost: 1, title: 'Host Claimed', perk: { type: 'meal_xp_bonus', value: 6, label: '+6 XP per meal logged' } },
      { id: 'umbrafang_lunge', name: 'Predator Lunge', desc: 'Workout finishes become savage bursts of growth.', cost: 1, title: 'The Maw', perk: { type: 'workout_xp_bonus', value: 8, label: '+8 XP per finished workout' } },
      { id: 'umbrafang_hunt', name: 'Rooftop Hunt', desc: 'Every quest you claim tastes like another victim caught.', cost: 2, title: 'Night Devourer', perk: { type: 'quest_xp_bonus', value: 14, label: '+14 XP when claiming any quest' } },
      { id: 'umbrafang_regen', name: 'Tar Regrowth', desc: 'The climb shrinks as the organism adapts.', cost: 3, title: 'Living Shade', perk: { type: 'xp_to_next_reduction', value: 0.08, label: 'Level-ups require 8% less XP' } },
      { id: 'umbrafang_apex', name: 'Abyss Feast', desc: 'The bond reaches full hunger and workout gains spike hard.', cost: 4, title: 'The Last Host', perk: { type: 'workout_xp_bonus', value: 20, label: '+20 XP per finished workout' } }
    ]
  },
  {
    id: 'tideshard',
    name: 'Tideshard',
    tagline: 'A trench-born king who carries the weight of empires in his stride.',
    faction: 'hero',
    color: { from: 'from-cyan-600', to: 'to-blue-800' },
    icon: '🌊',
    nodes: [
      { id: 'tideshard_call', name: 'Deepcall', desc: 'Ocean discipline rewards you every time you eat to recover.', cost: 1, title: 'Reef Heir', perk: { type: 'meal_xp_bonus', value: 4, label: '+4 XP per meal logged' } },
      { id: 'tideshard_trident', name: 'Trident Lift', desc: 'Heavy training echoes through the sea floor.', cost: 1, title: 'Breaker Prince', perk: { type: 'workout_xp_bonus', value: 7, label: '+7 XP per finished workout' } },
      { id: 'tideshard_current', name: 'Current Throne', desc: 'Ocean discipline makes full hydration worth more than usual.', cost: 2, title: 'Lord of Tides', perk: { type: 'hydration_boost', value: 10, label: '+10 XP (instead of +5) for hitting 8/8 water glasses' } },
      { id: 'tideshard_surge', name: 'Maelstrom Surge', desc: 'Rising waters carry all XP gains upward.', cost: 3, title: 'Storm of the Deep', perk: { type: 'xp_multiplier', value: 1.1, label: '+10% XP from every source' } },
      { id: 'tideshard_ocean', name: 'Abyss Crown', desc: 'The entire sea moves with you, cutting the climb down.', cost: 4, title: 'Sovereign of Trenches', perk: { type: 'xp_to_next_reduction', value: 0.11, label: 'Level-ups require 11% less XP' } }
    ]
  },
  {
    id: 'willlume',
    name: 'Willlume',
    tagline: 'A ringbound marshal who builds reality from discipline alone.',
    faction: 'hero',
    color: { from: 'from-emerald-500', to: 'to-green-800' },
    icon: '💍',
    nodes: [
      { id: 'willlume_spark', name: 'Lantern Spark', desc: 'A focused mind amplifies all gains from the start.', cost: 1, title: 'Sector Recruit', perk: { type: 'xp_multiplier', value: 1.05, label: '+5% XP from every source' } },
      { id: 'willlume_wall', name: 'Construct Wall', desc: 'Emerald constructs keep your hydration habits locked in.', cost: 1, title: 'Shield Architect', perk: { type: 'hydration_boost', value: 10, label: '+10 XP (instead of +5) for hitting 8/8 water glasses' } },
      { id: 'willlume_flight', name: 'Vector Flight', desc: 'Quest lines become straight paths when will takes over.', cost: 2, title: 'The Fearless Arc', perk: { type: 'quest_xp_bonus', value: 12, label: '+12 XP when claiming any quest' } },
      { id: 'willlume_oath', name: 'Oath Battery', desc: 'Strong will grants more from every level achieved.', cost: 3, title: 'Ring Marshal', perk: { type: 'hero_point_bonus', value: 2, label: '+2 Hero Points on level up' } },
      { id: 'willlume_sun', name: 'Emerald Sunforge', desc: 'Absolute willpower reduces resistance to your rise.', cost: 4, title: 'The Living Beacon', perk: { type: 'xp_to_next_reduction', value: 0.1, label: 'Level-ups require 10% less XP' } }
    ]
  },
  {
    id: 'thunderion',
    name: 'Thunderion',
    tagline: 'A kid-hearted storm avatar with mythic voltage in every grin.',
    faction: 'hero',
    color: { from: 'from-yellow-400', to: 'to-indigo-700' },
    icon: '⚡',
    nodes: [
      { id: 'thunderion_word', name: 'Skyword', desc: 'The magic phrase ignites bonus value from quests.', cost: 1, title: 'The Chosen Spark', perk: { type: 'quest_xp_bonus', value: 11, label: '+11 XP when claiming any quest' } },
      { id: 'thunderion_laugh', name: 'Lightning Laugh', desc: 'Weekend storms make your gains crackle harder.', cost: 1, title: 'The Bright Bolt', perk: { type: 'weekend_xp_multiplier', value: 2.0, label: 'XP doubled on weekends' } },
      { id: 'thunderion_stride', name: 'Temple Stride', desc: 'Divine footsteps make each workout more rewarding.', cost: 2, title: 'Stormfound', perk: { type: 'workout_xp_bonus', value: 9, label: '+9 XP per finished workout' } },
      { id: 'thunderion_chorus', name: 'Pantheon Chorus', desc: 'Ancient voices ease the climb to the next tier.', cost: 3, title: 'Heaven’s Ward', perk: { type: 'xp_to_next_reduction', value: 0.08, label: 'Level-ups require 8% less XP' } },
      { id: 'thunderion_peak', name: 'Crown of Storms', desc: 'Mythic voltage turns every source of XP radiant.', cost: 4, title: 'The Sevenfold Thunder', perk: { type: 'xp_multiplier', value: 1.18, label: '+18% XP from every source' } }
    ]
  },
  {
    id: 'sunscarab',
    name: 'Sunscarab',
    tagline: 'An ancient storm tyrant who rules with fury and old gods at his back.',
    faction: 'villain',
    color: { from: 'from-amber-600', to: 'to-zinc-900' },
    icon: '𓆣',
    nodes: [
      { id: 'sunscarab_edict', name: 'Desert Edict', desc: 'The first decree strips distance from your rise.', cost: 1, title: 'The Buried King', perk: { type: 'xp_to_next_reduction', value: 0.05, label: 'Level-ups require 5% less XP' } },
      { id: 'sunscarab_zeal', name: 'Sandstorm Zeal', desc: 'Meals become tribute that strengthens the god-body.', cost: 1, title: 'Sunbrand Vessel', perk: { type: 'meal_xp_bonus', value: 5, label: '+5 XP per meal logged' } },
      { id: 'sunscarab_shock', name: 'Ankh Shock', desc: 'Brutal sessions reward the ruthless.', cost: 2, title: 'The First Judgment', perk: { type: 'workout_xp_bonus', value: 10, label: '+10 XP per finished workout' } },
      { id: 'sunscarab_decree', name: 'Black Nile Decree', desc: 'Every quest claim arrives like tribute from the conquered.', cost: 3, title: 'Tyrant of Dust', perk: { type: 'quest_xp_bonus', value: 15, label: '+15 XP when claiming any quest' } },
      { id: 'sunscarab_apex', name: 'Godstorm Descent', desc: 'Every fifth rise unlocks another burst of divine favor.', cost: 4, title: 'The Living Cataclysm', perk: { type: 'level_surge', value: 2, label: 'Double Hero Points every 5th level' } }
    ]
  },
  {
    id: 'dreadvane',
    name: 'Dreadvane',
    tagline: 'A fallen enforcer breathing through iron and regret.',
    faction: 'villain',
    color: { from: 'from-red-700', to: 'to-slate-950' },
    icon: '🫁',
    nodes: [
      { id: 'dreadvane_grip', name: 'Void Grip', desc: 'Forceful discipline makes all gains heavier and faster.', cost: 1, title: 'The Fallen Hand', perk: { type: 'xp_multiplier', value: 1.05, label: '+5% XP from every source' } },
      { id: 'dreadvane_march', name: 'Iron March', desc: 'Every finished session sounds like another armored step.', cost: 1, title: 'The Black Marshal', perk: { type: 'workout_xp_bonus', value: 8, label: '+8 XP per finished workout' } },
      { id: 'dreadvane_command', name: 'Choke Command', desc: 'Quest completions obey the will you impose on them.', cost: 2, title: 'Breaker of Hope', perk: { type: 'quest_xp_bonus', value: 13, label: '+13 XP when claiming any quest' } },
      { id: 'dreadvane_mask', name: 'Ashen Mask', desc: 'Cold control reduces what the next level demands.', cost: 3, title: 'Breath of Ruin', perk: { type: 'xp_to_next_reduction', value: 0.09, label: 'Level-ups require 9% less XP' } },
      { id: 'dreadvane_eclipse', name: 'Eclipse Throne', desc: 'At full darkness, every source yields to your rise.', cost: 4, title: 'The Last Disciple', perk: { type: 'xp_multiplier', value: 1.18, label: '+18% XP from every source' } }
    ]
  },
  {
    id: 'sagebloom',
    name: 'Sagebloom',
    tagline: 'A tiny elder whose calm carries absurd gravitational power.',
    faction: 'hero',
    color: { from: 'from-lime-500', to: 'to-emerald-800' },
    icon: '🍃',
    nodes: [
      { id: 'sagebloom_breath', name: 'Moss Breath', desc: 'Balanced days start with logging every meal the body needs.', cost: 1, title: 'The Quiet Root', perk: { type: 'full_day_logger_bonus', value: 25, label: '+25 XP for logging 3+ meals in one day' } },
      { id: 'sagebloom_tap', name: 'Cane Tap', desc: 'Small steps toward mastery shorten the road ahead.', cost: 1, title: 'Marsh Elder', perk: { type: 'xp_to_next_reduction', value: 0.05, label: 'Level-ups require 5% less XP' } },
      { id: 'sagebloom_wave', name: 'Stillwater Lift', desc: 'Quiet practice improves every workout reward.', cost: 2, title: 'The Gentle Peak', perk: { type: 'workout_xp_bonus', value: 8, label: '+8 XP per finished workout' } },
      { id: 'sagebloom_orbit', name: 'Starroot Counsel', desc: 'Ancient rest wisdom rewards nights that actually restore you.', cost: 3, title: 'The Green Oracle', perk: { type: 'sleep_champion_bonus', value: 20, label: '+20 XP when you log 8+ hours of sleep' } },
      { id: 'sagebloom_grand', name: 'Ancient Bloom', desc: 'The old ways make every source of XP shine brighter.', cost: 4, title: 'Grandmaster of Reeds', perk: { type: 'xp_multiplier', value: 1.17, label: '+17% XP from every source' } }
    ]
  },
  {
    id: 'ironwraith',
    name: 'Ironwraith',
    tagline: 'A visor-helmed hunter who turns contracts into religion.',
    faction: 'villain',
    color: { from: 'from-stone-500', to: 'to-slate-900' },
    icon: '🎯',
    nodes: [
      { id: 'ironwraith_ping', name: 'Target Ping', desc: 'The hunt starts by making each quest claim worth more.', cost: 1, title: 'Contract Initiate', perk: { type: 'quest_xp_bonus', value: 10, label: '+10 XP when claiming any quest' } },
      { id: 'ironwraith_plate', name: 'Beskar Shell', desc: 'Armor turns hard training into dependable gain.', cost: 1, title: 'The Sealed Helm', perk: { type: 'workout_xp_bonus', value: 7, label: '+7 XP per finished workout' } },
      { id: 'ironwraith_cache', name: 'Jetpack Cache', desc: 'A prepared killer eats to recover and move again.', cost: 2, title: 'Sky Tracker', perk: { type: 'meal_xp_bonus', value: 5, label: '+5 XP per meal logged' } },
      { id: 'ironwraith_hunt', name: 'Cold Pursuit', desc: 'No bounty runs long once you lock in.', cost: 3, title: 'The Paid Shadow', perk: { type: 'xp_to_next_reduction', value: 0.08, label: 'Level-ups require 8% less XP' } },
      { id: 'ironwraith_vow', name: 'Hunter’s Creed', desc: 'A true collector of trophies gets paid forever once enough are claimed.', cost: 4, title: 'The Last Bounty King', perk: { type: 'hero_collector_multiplier', value: 1.05, label: '+5% XP permanently after unlocking 10 total nodes' } }
    ]
  },
  {
    id: 'lunabelle',
    name: 'Lunabelle',
    tagline: 'A moonlit guardian who fights with ribbons, love, and impossible nerve.',
    faction: 'hero',
    color: { from: 'from-pink-400', to: 'to-indigo-600' },
    icon: '🌙',
    nodes: [
      { id: 'lunabelle_twirl', name: 'Silver Twirl', desc: 'Weekend moonlight makes every gain sparkle twice as bright.', cost: 1, title: 'Moon Cadet', perk: { type: 'weekend_xp_multiplier', value: 2.0, label: 'XP doubled on weekends' } },
      { id: 'lunabelle_charm', name: 'Heart Charm', desc: 'Joy makes your meal logging easier to keep.', cost: 1, title: 'Ribbon Heart', perk: { type: 'meal_xp_bonus', value: 4, label: '+4 XP per meal logged' } },
      { id: 'lunabelle_beam', name: 'Justice Beam', desc: 'Every quest claim lands with celestial conviction.', cost: 2, title: 'Star Magistrate', perk: { type: 'quest_xp_bonus', value: 13, label: '+13 XP when claiming any quest' } },
      { id: 'lunabelle_guard', name: 'Love Guard', desc: 'Moonlit protection can save one streak from shattering each week.', cost: 3, title: 'The Crescent Shield', perk: { type: 'streak_shield', value: 1, label: 'One streak miss forgiven per week' } },
      { id: 'lunabelle_queen', name: 'Full Moon Verdict', desc: 'Moon power blossoms into a radiant overall boost.', cost: 4, title: 'Queen of Starlight', perk: { type: 'xp_multiplier', value: 1.18, label: '+18% XP from every source' } }
    ]
  },
  {
    id: 'mimicrow',
    name: 'Mimicrow',
    tagline: 'A masked tactician with a stolen answer for every problem.',
    faction: 'hero',
    color: { from: 'from-slate-600', to: 'to-violet-800' },
    icon: '👁️',
    nodes: [
      { id: 'mimicrow_eye', name: 'Borrowed Eye', desc: 'Catalog enough stolen techniques and your whole roster starts paying dividends.', cost: 1, title: 'The Watching Mask', perk: { type: 'hero_collector_multiplier', value: 1.05, label: '+5% XP permanently after unlocking 10 total nodes' } },
      { id: 'mimicrow_copy', name: 'Mirror Script', desc: 'Studying new patterns rewards exercises you did not use last time.', cost: 1, title: 'Archive Ninja', perk: { type: 'variety_bonus', value: 10, label: '+10 XP per exercise not done in last session' } },
      { id: 'mimicrow_storm', name: 'Gray Lightning', desc: 'Every quest you clear looks expertly pre-solved.', cost: 2, title: 'Storm Reader', perk: { type: 'quest_xp_bonus', value: 12, label: '+12 XP when claiming any quest' } },
      { id: 'mimicrow_hush', name: 'Blackfile Hush', desc: 'Masked discipline pays back with more from every level.', cost: 3, title: 'The Quiet Captain', perk: { type: 'hero_point_bonus', value: 2, label: '+2 Hero Points on level up' } },
      { id: 'mimicrow_apex', name: 'One-Eye Dominion', desc: 'Perfect reading of the field multiplies all future gain.', cost: 4, title: 'The Thousandfold Copy', perk: { type: 'xp_multiplier', value: 1.17, label: '+17% XP from every source' } }
    ]
  },
  {
    id: 'voidmonk',
    name: 'Voidmonk',
    tagline: 'A barefoot ascetic who turned emptiness itself into horsepower.',
    faction: 'hero',
    color: { from: 'from-stone-400', to: 'to-stone-700' },
    icon: '🥋',
    nodes: [
      { id: 'voidmonk_fast', name: 'Empty Bowl', desc: 'A stripped-down diet keeps progress quietly efficient.', cost: 1, title: 'The Bare Palm', perk: { type: 'meal_xp_bonus', value: 4, label: '+4 XP per meal logged' } },
      { id: 'voidmonk_step', name: 'Silent Mile', desc: 'Simple movement makes every workout finish worth more.', cost: 1, title: 'Wind Walker', perk: { type: 'workout_xp_bonus', value: 7, label: '+7 XP per finished workout' } },
      { id: 'voidmonk_zen', name: 'Zen Impact', desc: 'Absolute calm increases all XP gains without drama.', cost: 2, title: 'The Unadorned', perk: { type: 'xp_multiplier', value: 1.08, label: '+8% XP from every source' } },
      { id: 'voidmonk_gate', name: 'Open Sky Mind', desc: 'Nothing extra means less resistance on the climb.', cost: 3, title: 'Cloudless Master', perk: { type: 'xp_to_next_reduction', value: 0.09, label: 'Level-ups require 9% less XP' } },
      { id: 'voidmonk_bell', name: 'Final Bell', desc: 'One true strike turns quest rewards downright ridiculous.', cost: 4, title: 'The Quiet End', perk: { type: 'quest_xp_bonus', value: 18, label: '+18 XP when claiming any quest' } }
    ]
  },
  {
    id: 'riftron',
    name: 'Riftron',
    tagline: 'A dimension-armed bruiser who punches holes through every limit in sight.',
    faction: 'hero',
    color: { from: 'from-violet-500', to: 'to-fuchsia-800' },
    icon: '🌀',
    nodes: [
      { id: 'riftron_fold', name: 'Fold Step', desc: 'Warped space gives you more from every workout finished.', cost: 1, title: 'Gate Brawler', perk: { type: 'workout_xp_bonus', value: 6, label: '+6 XP per finished workout' } },
      { id: 'riftron_fuel', name: 'Core Rift Fuel', desc: 'Feeding the reactor turns meals into real progression.', cost: 1, title: 'The Split Engine', perk: { type: 'meal_xp_bonus', value: 5, label: '+5 XP per meal logged' } },
      { id: 'riftron_break', name: 'Limit Rupture', desc: 'Every fifth level tears space wide enough for extra power to spill through.', cost: 2, title: 'Threshold Breaker', perk: { type: 'level_surge', value: 2, label: 'Double Hero Points every 5th level' } },
      { id: 'riftron_lane', name: 'Event Horizon Lane', desc: 'The void shortens your route to the next milestone.', cost: 3, title: 'The Singular Fist', perk: { type: 'xp_to_next_reduction', value: 0.08, label: 'Level-ups require 8% less XP' } },
      { id: 'riftron_star', name: 'Starbreaker Knuckle', desc: 'At full compression, all XP sources detonate upward.', cost: 4, title: 'The Rift Champion', perk: { type: 'xp_multiplier', value: 1.18, label: '+18% XP from every source' } }
    ]
  },
  {
    id: 'wyrmvolt',
    name: 'Wyrmvolt',
    tagline: 'A dragon-blood prodigy who levels like battle is the only language worth speaking.',
    faction: 'hero',
    color: { from: 'from-indigo-500', to: 'to-purple-800' },
    icon: '🐉',
    nodes: [
      { id: 'wyrmvolt_roar', name: 'Royal Roar', desc: 'The first cry draws richer rewards from every quest.', cost: 1, title: 'Dragon Heir', perk: { type: 'quest_xp_bonus', value: 10, label: '+10 XP when claiming any quest' } },
      { id: 'wyrmvolt_scale', name: 'Scale Discipline', desc: 'Harsh standards increase returns from all XP sources.', cost: 1, title: 'The Proud Flame', perk: { type: 'xp_multiplier', value: 1.06, label: '+6% XP from every source' } },
      { id: 'wyrmvolt_drive', name: 'Meteor Drill', desc: 'Training sessions pay like ritual combat.', cost: 2, title: 'Sky Challenger', perk: { type: 'workout_xp_bonus', value: 9, label: '+9 XP per finished workout' } },
      { id: 'wyrmvolt_rise', name: 'Ascendant Crest', desc: 'Competitive fury cuts away wasted climb.', cost: 3, title: 'Stormscale Prince', perk: { type: 'xp_to_next_reduction', value: 0.08, label: 'Level-ups require 8% less XP' } },
      { id: 'wyrmvolt_end', name: 'Emperor Fang', desc: 'At final form, the whole progression curve bows.', cost: 4, title: 'The Crowned Wyrm', perk: { type: 'xp_multiplier', value: 1.19, label: '+19% XP from every source' } }
    ]
  }
];

const jumpstartQuests = [
  {
    "id": 1,
    "name": "Finish your first workout session",
    "xp": 100
  },
  {
    "id": 2,
    "name": "Log your first meal",
    "xp": 100
  },
  {
    "id": 3,
    "name": "Visit the Hero tab and inspect a legend",
    "xp": 100
  },
  {
    "id": 4,
    "name": "Open the Progress tab",
    "xp": 100
  },
  {
    "id": 5,
    "name": "Browse the Exercise Library",
    "xp": 100
  },
  {
    "id": 6,
    "name": "Click on any exercise to view its form cues",
    "xp": 100
  },
  {
    "id": 7,
    "name": "Open a Training Plan",
    "xp": 100
  },
  {
    "id": 8,
    "name": "Log a meal with the Meal Logger",
    "xp": 100
  },
  {
    "id": 9,
    "name": "Check the Leaderboard",
    "xp": 100
  },
  {
    "id": 10,
    "name": "Use the AI Suggest Workout button",
    "xp": 100
  }
];

const dailyQuests = [
  {
    "id": 1,
    "name": "Drink water before training",
    "xp": 25
  },
  {
    "id": 2,
    "name": "Complete one workout set",
    "xp": 25
  },
  {
    "id": 3,
    "name": "Log one food item",
    "xp": 25
  },
  {
    "id": 4,
    "name": "Stretch for 5 minutes",
    "xp": 25
  },
  {
    "id": 5,
    "name": "Finish a full workout session",
    "xp": 50
  },
  {
    "id": 6,
    "name": "Log at least 3 meals today",
    "xp": 50
  },
  {
    "id": 7,
    "name": "Review your progress chart",
    "xp": 25
  },
  {
    "id": 8,
    "name": "Use the rest timer at least once",
    "xp": 25
  }
];

const weeklyQuests = [
  {
    "id": 1,
    "name": "Finish 3 workouts this week",
    "xp": 100
  },
  {
    "id": 2,
    "name": "Hit your protein goal 4 days",
    "xp": 125
  },
  {
    "id": 3,
    "name": "Improve a lift or rep PR",
    "xp": 150
  },
  {
    "id": 4,
    "name": "Take one full recovery day",
    "xp": 75
  },
  {
    "id": 5,
    "name": "Log meals every day this week",
    "xp": 150
  },
  {
    "id": 6,
    "name": "Try an exercise you've never logged before",
    "xp": 100
  },
  {
    "id": 7,
    "name": "Complete 5 workout sessions this week",
    "xp": 200
  },
  {
    "id": 8,
    "name": "Use the AI Suggest Workout feature twice",
    "xp": 75
  }
];

const personalQuests = [
  {
    "id": 1,
    "name": "Reach Level 5",
    "xp": 250
  },
  {
    "id": 2,
    "name": "Log 10 meals",
    "xp": 200
  },
  {
    "id": 3,
    "name": "Complete every node in one Hero legend",
    "xp": 300
  },
  {
    "id": 4,
    "name": "Finish 20 workout sessions",
    "xp": 400
  },
  {
    "id": 5,
    "name": "Reach Level 10",
    "xp": 500
  },
  {
    "id": 6,
    "name": "Log 50 meals total",
    "xp": 350
  },
  {
    "id": 7,
    "name": "Unlock every node for 5 Hero legends",
    "xp": 750
  },
  {
    "id": 8,
    "name": "Finish 50 workout sessions",
    "xp": 600
  },
  {
    "id": 9,
    "name": "Reach Level 25",
    "xp": 1000
  },
  {
    "id": 10,
    "name": "Claim all Jumpstart quests",
    "xp": 250
  }
];

const lbD = [
  {
    "rank": 1,
    "name": "NovaLifter",
    "level": 19,
    "xp": 18450
  },
  {
    "rank": 2,
    "name": "IronAlex",
    "level": 17,
    "xp": 16220
  },
  {
    "rank": 3,
    "name": "ShadowRep",
    "level": 16,
    "xp": 15110
  },
  {
    "rank": 4,
    "name": "BenchWizard",
    "level": 15,
    "xp": 14080
  },
  {
    "rank": 5,
    "name": "SpeedCore",
    "level": 14,
    "xp": 13340
  },
  {
    "rank": 6,
    "name": "ProteinKnight",
    "level": 13,
    "xp": 12420
  },
  {
    "rank": 7,
    "name": "SquatTitan",
    "level": 12,
    "xp": 11775
  },
  {
    "rank": 8,
    "name": "MysticMacros",
    "level": 11,
    "xp": 10980
  }
];


const gearItems = [
  { id: 'warriors_belt', name: "Warrior's Belt", icon: '🪖', desc: 'Forged in battle.', perk: '+5% workout XP', stat: 'workout_xp_bonus', value: 5, unlockCondition: 'Complete 5 workout sessions' },
  { id: 'champions_wristband', name: "Champion's Wristband", icon: '⌚', desc: 'Worn by legends.', perk: '+10 XP per set', stat: 'set_xp_bonus', value: 10, unlockCondition: 'Log 20 sets total' },
  { id: 'iron_boots', name: 'Iron Boots', icon: '🥾', desc: 'Never stop moving.', perk: '+15 XP per cardio session', stat: 'cardio_xp_bonus', value: 15, unlockCondition: 'Complete 3 cardio sessions' },
  { id: 'focus_helm', name: 'Focus Helm', icon: '⛑️', desc: 'Clarity under pressure.', perk: '+10 XP per quest claimed', stat: 'quest_xp_bonus', value: 10, unlockCondition: 'Claim 10 quests total' },
  { id: 'recovery_cape', name: 'Recovery Cape', icon: '🦸', desc: 'Rest is part of the grind.', perk: 'Streak Shield: 2 misses/week', stat: 'streak_shield', value: 2, unlockCondition: 'Log a recovery check-in 5 times' },
  { id: 'protein_gauntlets', name: 'Protein Gauntlets', icon: '🧤', desc: 'Feed the machine.', perk: '+5 XP per meal logged', stat: 'meal_xp_bonus', value: 5, unlockCondition: 'Log 15 meals total' },
  { id: 'endurance_amulet', name: 'Endurance Amulet', icon: '📿', desc: 'The will to continue.', perk: '7-day streak = 2× XP day', stat: 'streak_double_day', value: 7, unlockCondition: 'Hit a 7-day streak' },
  { id: 'shadow_gloves', name: 'Shadow Gloves', icon: '🖤', desc: 'Strike from the dark.', perk: '+20 XP on personal quests', stat: 'personal_quest_bonus', value: 20, unlockCondition: 'Complete all Jumpstart quests' },
];

const bossBattles = [
  { id: 'iron_golem', name: 'The Iron Golem', icon: '🗿', desc: 'A titan of stone and will. Prove your discipline.', requirement: '5 workouts this week', rewardXP: 500, rewardGear: 'warriors_belt', difficulty: 'Hard' },
  { id: 'shadow_wraith', name: 'Shadow Wraith', icon: '👻', desc: 'It feeds on the sedentary. Move or be consumed.', requirement: '7 days of activity this week', rewardXP: 750, rewardGear: 'recovery_cape', difficulty: 'Legendary' },
  { id: 'protein_hydra', name: 'The Protein Hydra', icon: '🐉', desc: 'Three heads. Three meals a day.', requirement: 'Log 21 meals this week', rewardXP: 400, rewardGear: 'protein_gauntlets', difficulty: 'Medium' },
  { id: 'cardio_specter', name: 'Cardio Specter', icon: '💨', desc: 'Faster than your excuses.', requirement: '3 cardio sessions this week', rewardXP: 350, rewardGear: 'iron_boots', difficulty: 'Medium' },
  { id: 'quest_overlord', name: 'Quest Overlord', icon: '👑', desc: 'Demands tribute. Complete 8 quests this week.', requirement: '8 quests claimed this week', rewardXP: 600, rewardGear: 'focus_helm', difficulty: 'Hard' },
];

const heroClasses = [
  { id: 'warrior', name: 'Warrior', icon: '⚔️', desc: 'Strength is your weapon. Compound lifts yield bonus XP.', bonus: '+15% XP on strength workouts', color: 'from-red-600 to-orange-700' },
  { id: 'rogue', name: 'Rogue', icon: '🗡️', desc: 'Speed and agility define you. Cardio and streaks power you up.', bonus: '+20% XP on cardio + streak days', color: 'from-purple-600 to-indigo-700' },
  { id: 'mage', name: 'Mage', icon: '🔮', desc: 'Mind over muscle. Nutrition logging and quest completion fuel your magic.', bonus: '+15% XP on meals and quests', color: 'from-blue-600 to-cyan-700' },
  { id: 'paladin', name: 'Paladin', icon: '🛡️', desc: 'Balance in all things. Steady gains, strong recovery, no weakness.', bonus: '+10% XP on everything', color: 'from-yellow-500 to-amber-600' },
];

const appThemes = [
  { id: 'default', name: 'Default', primary: '#22c55e', bg: '#030712', unlockCondition: 'Default — always available' },
  { id: 'crimson', name: 'Crimson Power', primary: '#ef4444', bg: '#1a0000', unlockCondition: 'Complete the Power Path' },
  { id: 'violet', name: 'Shadow Violet', primary: '#a855f7', bg: '#0d001a', unlockCondition: 'Complete the Shadow Path' },
  { id: 'amber', name: 'Speed Amber', primary: '#f59e0b', bg: '#1a0f00', unlockCondition: 'Complete the Speed Path' },
  { id: 'cyan', name: 'Mystic Cyan', primary: '#06b6d4', bg: '#00141a', unlockCondition: 'Complete the Mystic Path' },
];

const nDB = [
  {
    "id": 1,
    "name": "Chicken breast, roasted",
    "calories": 165,
    "protein": 31,
    "contributes": "Protein",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 2,
    "name": "Turkey breast, roasted",
    "calories": 147,
    "protein": 30,
    "contributes": "Protein",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 3,
    "name": "Lean ground turkey 93%",
    "calories": 176,
    "protein": 24,
    "contributes": "Protein",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 4,
    "name": "Chicken thigh, roasted",
    "calories": 209,
    "protein": 26,
    "contributes": "Protein",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 5,
    "name": "Salmon, Atlantic cooked",
    "calories": 208,
    "protein": 20,
    "contributes": "Protein, Healthy fats",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 6,
    "name": "Tuna, canned in water",
    "calories": 116,
    "protein": 26,
    "contributes": "Protein",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 7,
    "name": "Cod, baked",
    "calories": 105,
    "protein": 23,
    "contributes": "Protein",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 8,
    "name": "Shrimp, cooked",
    "calories": 99,
    "protein": 24,
    "contributes": "Protein",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 9,
    "name": "Tilapia, cooked",
    "calories": 128,
    "protein": 26,
    "contributes": "Protein",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 10,
    "name": "Sardines, canned",
    "calories": 208,
    "protein": 25,
    "contributes": "Protein, Healthy fats",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 11,
    "name": "Egg whole",
    "calories": 143,
    "protein": 13,
    "contributes": "Protein",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 12,
    "name": "Egg whites",
    "calories": 52,
    "protein": 11,
    "contributes": "Protein",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 13,
    "name": "Greek yogurt nonfat",
    "calories": 59,
    "protein": 10,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 14,
    "name": "Cottage cheese low-fat",
    "calories": 82,
    "protein": 11,
    "contributes": "Protein",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 15,
    "name": "Skim milk",
    "calories": 34,
    "protein": 3.4,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 16,
    "name": "2% milk",
    "calories": 50,
    "protein": 3.4,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 17,
    "name": "Cheddar cheese",
    "calories": 403,
    "protein": 25,
    "contributes": "Protein",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 18,
    "name": "Mozzarella part-skim",
    "calories": 254,
    "protein": 24,
    "contributes": "Protein",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 19,
    "name": "Parmesan",
    "calories": 431,
    "protein": 38,
    "contributes": "Protein",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 20,
    "name": "Whey protein powder",
    "calories": 400,
    "protein": 80,
    "contributes": "Protein",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 21,
    "name": "Casein protein powder",
    "calories": 360,
    "protein": 78,
    "contributes": "Protein",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 22,
    "name": "Firm tofu",
    "calories": 144,
    "protein": 17,
    "contributes": "Protein",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 23,
    "name": "Tempeh",
    "calories": 193,
    "protein": 20,
    "contributes": "Protein",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 24,
    "name": "Edamame",
    "calories": 121,
    "protein": 12,
    "contributes": "Protein",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 25,
    "name": "Lentils, cooked",
    "calories": 116,
    "protein": 9,
    "contributes": "Fiber",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 26,
    "name": "Black beans, cooked",
    "calories": 132,
    "protein": 9,
    "contributes": "Fiber",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 27,
    "name": "Chickpeas, cooked",
    "calories": 164,
    "protein": 9,
    "contributes": "Fiber",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 28,
    "name": "Kidney beans, cooked",
    "calories": 127,
    "protein": 8.7,
    "contributes": "Fiber",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 29,
    "name": "Split peas, cooked",
    "calories": 118,
    "protein": 8.3,
    "contributes": "Fiber",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 30,
    "name": "Seitan",
    "calories": 370,
    "protein": 75,
    "contributes": "Protein",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 31,
    "name": "Lean beef sirloin, cooked",
    "calories": 217,
    "protein": 29,
    "contributes": "Protein",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 32,
    "name": "Ground beef 90% lean",
    "calories": 217,
    "protein": 26,
    "contributes": "Protein",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 33,
    "name": "Pork tenderloin, cooked",
    "calories": 143,
    "protein": 26,
    "contributes": "Protein",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 34,
    "name": "Canadian bacon",
    "calories": 146,
    "protein": 21,
    "contributes": "Protein",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 35,
    "name": "Ham, lean roasted",
    "calories": 145,
    "protein": 21,
    "contributes": "Protein",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 36,
    "name": "Bison, cooked",
    "calories": 143,
    "protein": 28,
    "contributes": "Protein",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 37,
    "name": "Venison, cooked",
    "calories": 158,
    "protein": 30,
    "contributes": "Protein",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 38,
    "name": "Turkey jerky",
    "calories": 300,
    "protein": 33,
    "contributes": "Protein",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 39,
    "name": "Beef jerky",
    "calories": 410,
    "protein": 33,
    "contributes": "Protein",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 40,
    "name": "Chicken sausage",
    "calories": 215,
    "protein": 17,
    "contributes": "Protein",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 41,
    "name": "Oats, dry",
    "calories": 389,
    "protein": 16.9,
    "contributes": "Carbs, Fiber",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 42,
    "name": "Brown rice, cooked",
    "calories": 123,
    "protein": 2.7,
    "contributes": "Carbs",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 43,
    "name": "White rice, cooked",
    "calories": 130,
    "protein": 2.4,
    "contributes": "Carbs",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 44,
    "name": "Quinoa, cooked",
    "calories": 120,
    "protein": 4.4,
    "contributes": "Carbs",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 45,
    "name": "Whole wheat pasta, cooked",
    "calories": 149,
    "protein": 5.8,
    "contributes": "Carbs",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 46,
    "name": "White potato, baked",
    "calories": 93,
    "protein": 2.5,
    "contributes": "Carbs",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 47,
    "name": "Sweet potato, baked",
    "calories": 90,
    "protein": 2,
    "contributes": "Carbs",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 48,
    "name": "Russet potato, boiled",
    "calories": 87,
    "protein": 1.9,
    "contributes": "Carbs, Healthy fats",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 49,
    "name": "Whole grain bread",
    "calories": 247,
    "protein": 13,
    "contributes": "Carbs",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 50,
    "name": "Ezekiel bread",
    "calories": 247,
    "protein": 13,
    "contributes": "Carbs",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 51,
    "name": "Bagel, plain",
    "calories": 257,
    "protein": 10,
    "contributes": "Carbs",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 52,
    "name": "Corn tortilla",
    "calories": 218,
    "protein": 5.7,
    "contributes": "Carbs",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 53,
    "name": "Flour tortilla",
    "calories": 304,
    "protein": 8,
    "contributes": "Carbs",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 54,
    "name": "Granola",
    "calories": 471,
    "protein": 10,
    "contributes": "Carbs",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 55,
    "name": "Rice cakes",
    "calories": 387,
    "protein": 8,
    "contributes": "Carbs",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 56,
    "name": "Banana",
    "calories": 89,
    "protein": 1.1,
    "contributes": "Carbs",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 57,
    "name": "Blueberries",
    "calories": 57,
    "protein": 0.7,
    "contributes": "Fiber, Vitamins, minerals, antioxidants",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 58,
    "name": "Strawberries",
    "calories": 32,
    "protein": 0.7,
    "contributes": "Fiber, Vitamins, minerals, antioxidants",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 59,
    "name": "Apple",
    "calories": 52,
    "protein": 0.3,
    "contributes": "Fiber",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 60,
    "name": "Orange",
    "calories": 47,
    "protein": 0.9,
    "contributes": "Fiber, Vitamins, minerals, antioxidants",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 61,
    "name": "Avocado",
    "calories": 160,
    "protein": 2,
    "contributes": "Healthy fats, Vitamins, minerals, antioxidants",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 62,
    "name": "Spinach",
    "calories": 23,
    "protein": 2.9,
    "contributes": "Fiber, Vitamins, minerals, antioxidants",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 63,
    "name": "Broccoli",
    "calories": 35,
    "protein": 2.8,
    "contributes": "Fiber, Vitamins, minerals, antioxidants",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 64,
    "name": "Kale",
    "calories": 49,
    "protein": 4.3,
    "contributes": "Fiber, Vitamins, minerals, antioxidants",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 65,
    "name": "Asparagus",
    "calories": 20,
    "protein": 2.2,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 66,
    "name": "Bell pepper",
    "calories": 31,
    "protein": 1,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 67,
    "name": "Carrots",
    "calories": 41,
    "protein": 0.9,
    "contributes": "Fiber, Vitamins, minerals, antioxidants",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 68,
    "name": "Tomato",
    "calories": 18,
    "protein": 0.9,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 69,
    "name": "Cucumber",
    "calories": 15,
    "protein": 0.7,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 70,
    "name": "Mushrooms",
    "calories": 22,
    "protein": 3.1,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 71,
    "name": "Peanut butter",
    "calories": 588,
    "protein": 25,
    "contributes": "Protein, Healthy fats",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 72,
    "name": "Almond butter",
    "calories": 614,
    "protein": 21,
    "contributes": "Protein, Healthy fats",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 73,
    "name": "Almonds",
    "calories": 579,
    "protein": 21,
    "contributes": "Protein, Healthy fats",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 74,
    "name": "Walnuts",
    "calories": 654,
    "protein": 15,
    "contributes": "Healthy fats",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 75,
    "name": "Pistachios",
    "calories": 560,
    "protein": 20,
    "contributes": "Protein, Healthy fats",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 76,
    "name": "Chia seeds",
    "calories": 486,
    "protein": 17,
    "contributes": "Healthy fats",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 77,
    "name": "Flax seeds",
    "calories": 534,
    "protein": 18,
    "contributes": "Healthy fats",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 78,
    "name": "Pumpkin seeds",
    "calories": 559,
    "protein": 30,
    "contributes": "Protein, Healthy fats",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 79,
    "name": "Sunflower seeds",
    "calories": 584,
    "protein": 21,
    "contributes": "Protein, Healthy fats",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 80,
    "name": "Mixed nuts",
    "calories": 607,
    "protein": 20,
    "contributes": "Protein, Healthy fats",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 81,
    "name": "Olive oil",
    "calories": 884,
    "protein": 0,
    "contributes": "Healthy fats",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 82,
    "name": "Hummus",
    "calories": 166,
    "protein": 7.9,
    "contributes": "Fiber",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 83,
    "name": "Guacamole",
    "calories": 167,
    "protein": 2,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 84,
    "name": "Salsa",
    "calories": 36,
    "protein": 1.5,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 85,
    "name": "Protein bar",
    "calories": 370,
    "protein": 33,
    "contributes": "Protein",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 86,
    "name": "Protein shake ready-to-drink",
    "calories": 80,
    "protein": 15,
    "contributes": "Protein",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 87,
    "name": "Chocolate milk, low-fat",
    "calories": 83,
    "protein": 3.4,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 88,
    "name": "Kefir, plain low-fat",
    "calories": 64,
    "protein": 3.5,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 89,
    "name": "Soy milk, unsweetened",
    "calories": 33,
    "protein": 3.3,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 90,
    "name": "Canned chili with beans",
    "calories": 119,
    "protein": 7.2,
    "contributes": "Fiber",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 91,
    "name": "Chicken noodle soup",
    "calories": 50,
    "protein": 3.2,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 92,
    "name": "Turkey chili",
    "calories": 112,
    "protein": 11,
    "contributes": "Protein",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 93,
    "name": "Grilled chicken wrap",
    "calories": 220,
    "protein": 18,
    "contributes": "Protein",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 94,
    "name": "Caesar salad with chicken",
    "calories": 150,
    "protein": 12,
    "contributes": "Protein",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 95,
    "name": "Overnight oats",
    "calories": 150,
    "protein": 6,
    "contributes": "Carbs, Fiber",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 96,
    "name": "Plain yogurt low-fat",
    "calories": 63,
    "protein": 5.3,
    "contributes": "Vitamins, minerals, antioxidants",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  },
  {
    "id": 97,
    "name": "Skyr, plain",
    "calories": 64,
    "protein": 11,
    "contributes": "Protein",
    "benefit": "Supports muscle repair after hard training and helps you recover for the next session."
  },
  {
    "id": 98,
    "name": "Cottage cheese 2%",
    "calories": 81,
    "protein": 10.5,
    "contributes": "Protein",
    "benefit": "Provides a strong mix of fuel and building blocks so lifts feel steadier and recovery is faster."
  },
  {
    "id": 99,
    "name": "Ricotta part-skim",
    "calories": 174,
    "protein": 11,
    "contributes": "Protein",
    "benefit": "Helps you stay full, hit protein goals, and support strength progress over time."
  },
  {
    "id": 100,
    "name": "String cheese",
    "calories": 286,
    "protein": 25,
    "contributes": "Protein",
    "benefit": "Adds useful nutrients for training energy, hydration, and muscle function during long workouts."
  }
];
