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
  },
  {
    "id": 13,
    "name": "Incline Dumbbell Press",
    "muscles": "Upper Chest, Front Delts, Triceps",
    "type": "gym",
    "description": "This angled pressing variation emphasizes the upper chest while still loading the shoulders and triceps. It helps build balanced pressing strength and fuller chest development.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Incline_Bench_Press/0.jpg",
    "cues": [
      "Set your shoulders down and back.",
      "Lower the dumbbells with elbows slightly tucked.",
      "Press up without losing the bench angle."
    ]
  },
  {
    "id": 14,
    "name": "Decline Bench Press",
    "muscles": "Lower Chest, Triceps, Front Delts",
    "type": "gym",
    "description": "The decline bench press targets the lower chest through a slightly different pressing path than flat benching. It can help round out chest strength and reduce shoulder strain for some lifters.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Decline_Bench_Press/0.jpg",
    "cues": [
      "Lock your body into the bench.",
      "Lower the bar to the lower chest.",
      "Press smoothly while keeping wrists stacked."
    ]
  },
  {
    "id": 15,
    "name": "Dumbbell Flyes",
    "muscles": "Chest, Front Delts, Biceps",
    "type": "gym",
    "description": "Dumbbell flyes train the chest through a wide arc and create a strong stretch under control. They are useful for chest hypertrophy and better mind-muscle connection.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Flyes/0.jpg",
    "cues": [
      "Keep a soft bend in your elbows.",
      "Open wide until you feel a chest stretch.",
      "Bring the bells together by squeezing your chest."
    ]
  },
  {
    "id": 16,
    "name": "Cable Crossover",
    "muscles": "Chest, Front Delts, Serratus",
    "type": "gym",
    "description": "Cable crossovers keep tension on the chest through the full range of motion. They are excellent for isolation work, control, and finishing a chest session.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crossover/0.jpg",
    "cues": [
      "Set your torso tall with a slight lean.",
      "Bring handles together in a hugging arc.",
      "Pause briefly in the squeeze."
    ]
  },
  {
    "id": 17,
    "name": "Chest Dip",
    "muscles": "Chest, Triceps, Front Delts",
    "type": "gym",
    "description": "A chest dip uses bodyweight and torso angle to bias the chest during a deep pressing motion. It builds serious pressing strength and lower-chest development when performed under control.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Dips/0.jpg",
    "cues": [
      "Lean slightly forward.",
      "Lower until shoulders stay comfortable.",
      "Drive back up without swinging."
    ]
  },
  {
    "id": 18,
    "name": "Pec Deck Machine",
    "muscles": "Chest, Front Delts, Serratus",
    "type": "gym",
    "description": "The pec deck isolates the chest with a fixed path that makes it easy to focus on clean contractions. It works well for hypertrophy and controlled high-rep work.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pec_Deck_Fly/0.jpg",
    "cues": [
      "Set the seat so handles align with your chest.",
      "Keep shoulders down as you close the arms.",
      "Control the stretch on the way back."
    ]
  },
  {
    "id": 19,
    "name": "Push-Up Wide Grip",
    "muscles": "Chest, Front Delts, Triceps",
    "type": "bodyweight",
    "description": "A wider push-up stance increases chest involvement and challenges shoulder control. It is a simple bodyweight variation for building pressing volume anywhere.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide_Push-Up/0.jpg",
    "cues": [
      "Place hands wider than shoulder width.",
      "Keep ribs down and body straight.",
      "Lower with control and press hard."
    ]
  },
  {
    "id": 20,
    "name": "Incline Barbell Press",
    "muscles": "Upper Chest, Front Delts, Triceps",
    "type": "gym",
    "description": "This barbell press shifts emphasis toward the upper chest while allowing heavier loading than many dumbbell options. It is a staple for building top-end pressing strength and upper-chest size.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press/0.jpg",
    "cues": [
      "Set your upper back tight on the bench.",
      "Lower the bar to the upper chest.",
      "Press up while keeping elbows under the bar."
    ]
  },
  {
    "id": 21,
    "name": "Landmine Press",
    "muscles": "Upper Chest, Shoulders, Triceps",
    "type": "gym",
    "description": "The landmine press blends vertical and horizontal pressing in a shoulder-friendly arc. It builds pressing power, shoulder stability, and athletic upper-body strength.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shoulder_Press/0.jpg",
    "cues": [
      "Brace your core before you press.",
      "Drive the bar up and slightly forward.",
      "Avoid arching through the low back."
    ]
  },
  {
    "id": 22,
    "name": "Svend Press",
    "muscles": "Chest, Front Delts, Triceps",
    "type": "gym",
    "description": "The Svend press keeps constant inward tension on the chest by squeezing a plate through the press. It is a useful accessory for chest activation and high-tension hypertrophy work.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Svend_Press/0.jpg",
    "cues": [
      "Crush the plate between your palms.",
      "Press straight out without losing tension.",
      "Keep shoulders relaxed and chest lifted."
    ]
  },
  {
    "id": 23,
    "name": "Deadlift",
    "muscles": "Glutes, Hamstrings, Back",
    "type": "gym",
    "description": "The deadlift is a foundational full-body hinge that trains posterior-chain strength and total-body tension. It carries over to athleticism, lifting mechanics, and raw strength development.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/0.jpg",
    "cues": [
      "Set the bar close to your shins.",
      "Brace hard and push the floor away.",
      "Lock out by standing tall, not leaning back."
    ]
  },
  {
    "id": 24,
    "name": "T-Bar Row",
    "muscles": "Mid Back, Lats, Biceps",
    "type": "gym",
    "description": "The T-bar row is a heavy horizontal pull that builds thickness through the mid-back and lats. It is ideal for loading the upper back with a stable pulling pattern.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/T-Bar_Row/0.jpg",
    "cues": [
      "Hinge and keep your chest proud.",
      "Pull the handle toward your lower chest.",
      "Control the lowering phase."
    ]
  },
  {
    "id": 25,
    "name": "Single-Arm Dumbbell Row",
    "muscles": "Lats, Mid Back, Biceps",
    "type": "gym",
    "description": "This unilateral row helps build lat size while exposing side-to-side imbalances. It also teaches better scapular control and trunk stability during pulling.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_One-Arm_Row/0.jpg",
    "cues": [
      "Support yourself solidly on the bench.",
      "Drive your elbow back toward the hip.",
      "Avoid twisting your torso."
    ]
  },
  {
    "id": 26,
    "name": "Chest-Supported Row",
    "muscles": "Mid Back, Rhomboids, Lats",
    "type": "gym",
    "description": "A chest-supported row removes much of the lower-back demand so the upper back can do the work. It is excellent for clean back training and hypertrophy.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Supported_Dumbbell_Row/0.jpg",
    "cues": [
      "Keep your chest glued to the pad.",
      "Row elbows back under control.",
      "Squeeze the shoulder blades without shrugging."
    ]
  },
  {
    "id": 27,
    "name": "Inverted Row",
    "muscles": "Upper Back, Lats, Biceps",
    "type": "bodyweight",
    "description": "The inverted row is a bodyweight pull that strengthens the back, arms, and trunk in a scalable way. It is great for improving rowing mechanics and progressing toward tougher pulling work.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Inverted_Row/0.jpg",
    "cues": [
      "Keep your body straight like a plank.",
      "Pull your chest to the bar.",
      "Lower with full control."
    ]
  },
  {
    "id": 28,
    "name": "Face Pull",
    "muscles": "Rear Delts, Upper Back, Rotator Cuff",
    "type": "gym",
    "description": "Face pulls strengthen the rear shoulders and upper back while supporting healthier shoulder mechanics. They are a go-to movement for posture, balance, and shoulder resilience.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Face_Pull/0.jpg",
    "cues": [
      "Pull the rope toward eye level.",
      "Lead with elbows high and wide.",
      "Rotate hands back as you finish."
    ]
  },
  {
    "id": 29,
    "name": "Good Morning",
    "muscles": "Hamstrings, Glutes, Lower Back",
    "type": "gym",
    "description": "The good morning trains the hinge pattern with a strong focus on hamstrings, glutes, and spinal erectors. It builds posterior-chain strength and reinforces bracing under load.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Good_Morning/0.jpg",
    "cues": [
      "Unlock the knees slightly.",
      "Push hips back while keeping the spine neutral.",
      "Stand tall by driving hips forward."
    ]
  },
  {
    "id": 30,
    "name": "Hyperextension",
    "muscles": "Lower Back, Glutes, Hamstrings",
    "type": "gym",
    "description": "Hyperextensions strengthen the spinal erectors and glutes through controlled hip extension. They are useful for back endurance, posterior-chain development, and hinge assistance.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hyperextension/0.jpg",
    "cues": [
      "Set the pad below your hips.",
      "Move through the hips instead of rounding your back.",
      "Finish in a straight line."
    ]
  },
  {
    "id": 31,
    "name": "Rack Pull",
    "muscles": "Upper Back, Glutes, Hamstrings",
    "type": "gym",
    "description": "Rack pulls overload the top portion of the deadlift and let you handle heavier weights from an elevated position. They are effective for lockout strength and upper-back density.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Rack_Pull/0.jpg",
    "cues": [
      "Set the pins just below or above the knee.",
      "Brace hard before lifting.",
      "Stand tall without jerking the bar."
    ]
  },
  {
    "id": 32,
    "name": "Meadows Row",
    "muscles": "Lats, Rear Delts, Mid Back",
    "type": "gym",
    "description": "The Meadows row uses a landmine setup to challenge the lats and upper back through a unique pulling angle. It is excellent for unilateral back growth and grip-intensive work.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/0.jpg",
    "cues": [
      "Hinge and keep your hips square.",
      "Pull the bar toward your hip.",
      "Avoid shrugging at the top."
    ]
  },
  {
    "id": 33,
    "name": "Straight-Arm Pulldown",
    "muscles": "Lats, Teres Major, Triceps",
    "type": "gym",
    "description": "This cable movement isolates shoulder extension and teaches the lats to drive without much elbow flexion. It is a strong accessory for back width and lat awareness.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Straight-Arm_Pulldown/0.jpg",
    "cues": [
      "Keep arms long with a soft elbow bend.",
      "Pull the bar to your thighs.",
      "Let the lats control the return."
    ]
  },
  {
    "id": 34,
    "name": "Renegade Row",
    "muscles": "Core, Lats, Shoulders",
    "type": "gym",
    "description": "The renegade row combines anti-rotation core work with unilateral rowing strength. It challenges stability, shoulder control, and total-body tension in one move.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/0.jpg",
    "cues": [
      "Set a wide base with the feet.",
      "Row without twisting your hips.",
      "Press the planted hand hard into the floor."
    ]
  },
  {
    "id": 35,
    "name": "Arnold Press",
    "muscles": "Shoulders, Triceps, Upper Chest",
    "type": "gym",
    "description": "The Arnold press moves through a larger arc than a standard shoulder press, training the delts through rotation and flexion. It is useful for shoulder hypertrophy and pressing control.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Arnold_Dumbbell_Press/0.jpg",
    "cues": [
      "Start palms facing you.",
      "Rotate smoothly as you press overhead.",
      "Lower with the same controlled path."
    ]
  },
  {
    "id": 36,
    "name": "Lateral Raise",
    "muscles": "Side Delts, Upper Traps, Supraspinatus",
    "type": "gym",
    "description": "Lateral raises isolate the side delts to help build broader shoulders and balanced shoulder development. They work best with control, tension, and moderate load.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Lateral_Raise/0.jpg",
    "cues": [
      "Lead with the elbows.",
      "Raise to about shoulder height.",
      "Avoid swinging the weight up."
    ]
  },
  {
    "id": 37,
    "name": "Front Raise",
    "muscles": "Front Delts, Upper Chest, Serratus",
    "type": "gym",
    "description": "Front raises isolate shoulder flexion and emphasize the anterior delts. They are useful when building pressing support and shoulder size.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Front_Raise/0.jpg",
    "cues": [
      "Lift with control in front of the body.",
      "Keep ribs down and torso still.",
      "Lower slowly without dropping the weight."
    ]
  },
  {
    "id": 38,
    "name": "Rear Delt Fly",
    "muscles": "Rear Delts, Rhomboids, Upper Back",
    "type": "gym",
    "description": "Rear delt flyes target the often-neglected back side of the shoulder. They improve posture, shoulder balance, and upper-back detail when done with strict form.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Rear_Delt_Fly/0.jpg",
    "cues": [
      "Hinge and keep your neck neutral.",
      "Open the arms wide without shrugging.",
      "Squeeze the rear delts at the top."
    ]
  },
  {
    "id": 39,
    "name": "Upright Row",
    "muscles": "Side Delts, Upper Traps, Front Delts",
    "type": "gym",
    "description": "The upright row trains the shoulders and traps through a vertical pulling path. It can build upper-body size when performed with a range of motion that feels comfortable.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Upright_Row/0.jpg",
    "cues": [
      "Keep the bar close to your body.",
      "Lead up with your elbows.",
      "Stop before shoulder discomfort appears."
    ]
  },
  {
    "id": 40,
    "name": "Barbell Overhead Press",
    "muscles": "Shoulders, Triceps, Upper Chest",
    "type": "gym",
    "description": "The barbell overhead press is a classic standing strength lift for the shoulders and triceps. It also demands strong bracing and efficient full-body coordination.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Standing_Military_Press/0.jpg",
    "cues": [
      "Squeeze glutes and brace your abs.",
      "Press the bar in a straight path overhead.",
      "Move your head through at the top."
    ]
  },
  {
    "id": 41,
    "name": "Cable Lateral Raise",
    "muscles": "Side Delts, Upper Traps, Supraspinatus",
    "type": "gym",
    "description": "Cable lateral raises keep tension on the side delts from start to finish. They are excellent for clean shoulder isolation and controlled hypertrophy work.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Lateral_Raise/0.jpg",
    "cues": [
      "Stand tall with the cable slightly behind you.",
      "Raise out to the side without shrugging.",
      "Pause briefly at shoulder height."
    ]
  },
  {
    "id": 42,
    "name": "Behind-the-Neck Press",
    "muscles": "Shoulders, Triceps, Upper Traps",
    "type": "gym",
    "description": "This overhead press variation places the bar behind the head and heavily challenges shoulder mobility and control. It should be used only with appropriate mobility and careful technique.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Behind_The_Neck_Press/0.jpg",
    "cues": [
      "Use only a pain-free range.",
      "Keep your ribcage stacked over the hips.",
      "Press straight up without craning the neck."
    ]
  },
  {
    "id": 43,
    "name": "Plate Front Raise",
    "muscles": "Front Delts, Upper Chest, Serratus",
    "type": "gym",
    "description": "Using a plate for front raises creates a simple, steady shoulder challenge through the front delts. It is a solid accessory for controlled shoulder hypertrophy.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shoulder_Press/0.jpg",
    "cues": [
      "Hold the plate firmly at chest level.",
      "Raise to shoulder height without leaning back.",
      "Lower under control."
    ]
  },
  {
    "id": 44,
    "name": "Band Pull-Apart",
    "muscles": "Rear Delts, Rhomboids, Mid Traps",
    "type": "bodyweight",
    "description": "Band pull-aparts train the rear shoulders and upper back with light but constant tension. They are great for posture, warm-ups, and balancing pressing-heavy programs.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Pull_Apart/0.jpg",
    "cues": [
      "Hold the band at shoulder height.",
      "Pull hands apart by moving through the upper back.",
      "Keep shoulders down and neck relaxed."
    ]
  },
  {
    "id": 45,
    "name": "Barbell Curl",
    "muscles": "Biceps, Forearms, Brachialis",
    "type": "gym",
    "description": "The barbell curl is a straightforward mass-builder for the biceps and forearms. It allows steady loading and helps build stronger elbow flexors over time.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/0.jpg",
    "cues": [
      "Keep elbows near your sides.",
      "Curl without swinging your torso.",
      "Lower the bar slowly."
    ]
  },
  {
    "id": 46,
    "name": "Hammer Curl",
    "muscles": "Brachialis, Biceps, Forearms",
    "type": "gym",
    "description": "Hammer curls use a neutral grip to emphasize the brachialis and forearms while still training the biceps. They help build thicker-looking arms and stronger grip support.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/0.jpg",
    "cues": [
      "Keep palms facing each other.",
      "Curl with the elbows pinned.",
      "Squeeze at the top without twisting."
    ]
  },
  {
    "id": 47,
    "name": "Concentration Curl",
    "muscles": "Biceps, Brachialis, Forearms",
    "type": "gym",
    "description": "Concentration curls isolate one arm at a time and reduce momentum, making the biceps work hard through a strict range. They are excellent for focused arm hypertrophy and symmetry.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bicep_Curl/0.jpg",
    "cues": [
      "Brace the elbow against the inner thigh.",
      "Curl slowly and squeeze hard.",
      "Lower all the way to full extension."
    ]
  },
  {
    "id": 48,
    "name": "EZ-Bar Curl",
    "muscles": "Biceps, Forearms, Brachialis",
    "type": "gym",
    "description": "The EZ-bar curl offers a wrist-friendly grip while still allowing solid biceps loading. It is a staple arm-builder for strength and size.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/EZ-Bar_Curl/0.jpg",
    "cues": [
      "Use the grip that feels best on your wrists.",
      "Keep your upper arms still.",
      "Control the negative."
    ]
  },
  {
    "id": 49,
    "name": "Preacher Curl",
    "muscles": "Biceps, Brachialis, Forearms",
    "type": "gym",
    "description": "Preacher curls place the arm on a pad to limit cheating and emphasize the biceps through a strict curl pattern. They are excellent for controlled arm growth.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Preacher_Curl/0.jpg",
    "cues": [
      "Keep your upper arm fixed on the pad.",
      "Curl smoothly without jerking.",
      "Extend fully while staying in control."
    ]
  },
  {
    "id": 50,
    "name": "Cable Curl",
    "muscles": "Biceps, Forearms, Brachialis",
    "type": "gym",
    "description": "Cable curls keep consistent tension on the biceps across the full range of motion. They are useful for high-quality arm volume and a strong contraction.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/0.jpg",
    "cues": [
      "Stand tall with elbows set by your sides.",
      "Curl through the hands, not the shoulders.",
      "Let the cable pull you into a full stretch."
    ]
  },
  {
    "id": 51,
    "name": "Tricep Pushdown",
    "muscles": "Triceps, Forearms, Shoulders",
    "type": "gym",
    "description": "The tricep pushdown isolates elbow extension with stable cable resistance. It is a staple for building triceps size, lockout strength, and arm definition.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown/0.jpg",
    "cues": [
      "Pin elbows to your sides.",
      "Press the handle down until arms are straight.",
      "Avoid letting shoulders roll forward."
    ]
  },
  {
    "id": 52,
    "name": "Skull Crusher",
    "muscles": "Triceps, Forearms, Shoulders",
    "type": "gym",
    "description": "Skull crushers challenge the triceps through a deep elbow-flexion range while lying on a bench. They are highly effective for triceps hypertrophy and stronger pressing assistance.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg",
    "cues": [
      "Keep upper arms mostly vertical.",
      "Lower the bar with control toward the forehead or behind it.",
      "Extend hard without flaring the elbows."
    ]
  },
  {
    "id": 53,
    "name": "Close-Grip Bench Press",
    "muscles": "Triceps, Chest, Front Delts",
    "type": "gym",
    "description": "This bench variation narrows the grip to shift more work toward the triceps while still training pressing strength. It is a strong compound lift for bigger arms and better lockout power.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg",
    "cues": [
      "Use a grip just inside shoulder width.",
      "Lower the bar under control.",
      "Press while keeping elbows tucked."
    ]
  },
  {
    "id": 54,
    "name": "Diamond Push-Up",
    "muscles": "Triceps, Chest, Front Delts",
    "type": "bodyweight",
    "description": "Diamond push-ups use a narrow hand position to increase triceps demand. They build pressing endurance, arm strength, and bodyweight control.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/0.jpg",
    "cues": [
      "Place hands close beneath the chest.",
      "Keep elbows tracking back.",
      "Maintain a straight body line."
    ]
  },
  {
    "id": 55,
    "name": "Tricep Dip",
    "muscles": "Triceps, Chest, Front Delts",
    "type": "bodyweight",
    "description": "Tricep dips focus on elbow extension and bodyweight pressing strength. They can be an effective arm-builder when shoulder position and range stay controlled.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pullups/0.jpg",
    "cues": [
      "Keep shoulders down away from ears.",
      "Lower only as far as you can control.",
      "Drive through the palms to lock out."
    ]
  },
  {
    "id": 56,
    "name": "Overhead Tricep Extension",
    "muscles": "Triceps, Shoulders, Forearms",
    "type": "gym",
    "description": "The overhead tricep extension lengthens the long head of the triceps under load. It is useful for fuller triceps development and better overhead pressing support.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_One-Arm_Triceps_Extension/0.jpg",
    "cues": [
      "Keep elbows pointing mostly forward.",
      "Lower behind the head with control.",
      "Extend fully without arching your back."
    ]
  },
  {
    "id": 57,
    "name": "Front Squat",
    "muscles": "Quads, Glutes, Core",
    "type": "gym",
    "description": "The front squat shifts the load to the front of the body, increasing quad demand and upright posture requirements. It builds leg strength, core stiffness, and clean squat mechanics.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/0.jpg",
    "cues": [
      "Keep elbows high in the rack position.",
      "Sit down between your hips.",
      "Drive up with chest tall."
    ]
  },
  {
    "id": 58,
    "name": "Bulgarian Split Squat",
    "muscles": "Quads, Glutes, Hamstrings",
    "type": "gym",
    "description": "This rear-foot-elevated split squat builds unilateral leg strength, balance, and hip stability. It is a brutal but effective tool for quads and glutes.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/0.jpg",
    "cues": [
      "Keep most of your weight on the front leg.",
      "Lower straight down under control.",
      "Drive through the whole front foot."
    ]
  },
  {
    "id": 59,
    "name": "Leg Press",
    "muscles": "Quads, Glutes, Hamstrings",
    "type": "gym",
    "description": "The leg press allows heavy lower-body training with more external support than a squat. It is great for building leg size and accumulating volume safely.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/0.jpg",
    "cues": [
      "Keep your low back against the pad.",
      "Lower until your knees and hips stay comfortable.",
      "Drive the platform away without locking out hard."
    ]
  },
  {
    "id": 60,
    "name": "Hack Squat",
    "muscles": "Quads, Glutes, Hamstrings",
    "type": "gym",
    "description": "Hack squats create a fixed squatting path that heavily challenges the quads. They are a powerful hypertrophy tool for lower-body growth.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hack_Squat/0.jpg",
    "cues": [
      "Set feet where your knees track well.",
      "Descend under control without bouncing.",
      "Push through midfoot to stand."
    ]
  },
  {
    "id": 61,
    "name": "Leg Extension",
    "muscles": "Quads, Rectus Femoris, Vastus Medialis",
    "type": "gym",
    "description": "The leg extension isolates the quads through knee extension and is easy to load for high-rep work. It is useful for quad hypertrophy and finishing lower-body sessions.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/0.jpg",
    "cues": [
      "Align the machine joint with your knee.",
      "Extend smoothly to a strong squeeze.",
      "Lower without letting the weight crash."
    ]
  },
  {
    "id": 62,
    "name": "Leg Curl",
    "muscles": "Hamstrings, Calves, Glutes",
    "type": "gym",
    "description": "Leg curls isolate knee flexion and directly train the hamstrings. They help build balanced leg strength and support healthier knees.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
    "cues": [
      "Keep hips pressed into the pad.",
      "Curl with control to a full squeeze.",
      "Lower slowly to full length."
    ]
  },
  {
    "id": 63,
    "name": "Standing Calf Raise",
    "muscles": "Calves, Soleus, Tibialis Posterior",
    "type": "gym",
    "description": "Standing calf raises emphasize the gastrocnemius while training ankle strength and lower-leg endurance. They are a staple for stronger calves and improved push-off power.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/0.jpg",
    "cues": [
      "Drop into a full stretch at the bottom.",
      "Rise as high as possible onto the toes.",
      "Pause briefly at the top."
    ]
  },
  {
    "id": 64,
    "name": "Seated Calf Raise",
    "muscles": "Soleus, Calves, Tibialis Posterior",
    "type": "gym",
    "description": "The seated calf raise biases the soleus because the knee stays bent. It is useful for complete calf development and ankle stability.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Calf_Raise/0.jpg",
    "cues": [
      "Keep the balls of your feet planted on the platform.",
      "Lower under control into a stretch.",
      "Drive up through the big toe."
    ]
  },
  {
    "id": 65,
    "name": "Sumo Deadlift",
    "muscles": "Glutes, Adductors, Hamstrings",
    "type": "gym",
    "description": "The sumo deadlift uses a wider stance to emphasize the hips, glutes, and adductors. It can suit lifters who are strongest with a more upright pulling position.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
    "cues": [
      "Set feet wide with toes turned out.",
      "Pull the slack out of the bar before lifting.",
      "Push the floor apart as you stand."
    ]
  },
  {
    "id": 66,
    "name": "Goblet Squat",
    "muscles": "Quads, Glutes, Core",
    "type": "gym",
    "description": "Holding a dumbbell or kettlebell at the chest makes the goblet squat a great teaching and conditioning lift. It reinforces upright posture, depth, and lower-body strength.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Goblet_Squat/0.jpg",
    "cues": [
      "Keep the weight close to your chest.",
      "Sit down between your knees.",
      "Stand tall without collapsing forward."
    ]
  },
  {
    "id": 67,
    "name": "Step-Up",
    "muscles": "Quads, Glutes, Hamstrings",
    "type": "gym",
    "description": "Step-ups build single-leg strength and coordination while closely mimicking athletic and daily movement patterns. They are effective for glutes, quads, and balance.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/0.jpg",
    "cues": [
      "Use a box height you can control.",
      "Drive through the working leg.",
      "Avoid pushing excessively off the trailing foot."
    ]
  },
  {
    "id": 68,
    "name": "Nordic Curl",
    "muscles": "Hamstrings, Glutes, Calves",
    "type": "bodyweight",
    "description": "Nordic curls are an advanced hamstring exercise that overloads the lowering phase using bodyweight. They build resilient hamstrings and strong knee-flexion strength.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
    "cues": [
      "Keep hips extended throughout.",
      "Lower as slowly as possible.",
      "Use hands lightly to catch yourself if needed."
    ]
  },
  {
    "id": 69,
    "name": "Hip Thrust",
    "muscles": "Glutes, Hamstrings, Core",
    "type": "gym",
    "description": "Hip thrusts train powerful hip extension with a strong glute emphasis. They are one of the most effective movements for glute size, strength, and sprint carryover.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/0.jpg",
    "cues": [
      "Set your upper back firmly on the bench.",
      "Drive through the heels.",
      "Finish with ribs down and glutes squeezed."
    ]
  },
  {
    "id": 70,
    "name": "Sissy Squat",
    "muscles": "Quads, Hip Flexors, Core",
    "type": "bodyweight",
    "description": "The sissy squat isolates the quads by allowing the knees to travel forward while the torso leans back. It is a demanding bodyweight option for quad strength and tendon tolerance.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/0.jpg",
    "cues": [
      "Hold onto support if needed.",
      "Let knees travel forward under control.",
      "Keep tension through the quads the whole time."
    ]
  },
  {
    "id": 71,
    "name": "Single-Leg RDL",
    "muscles": "Hamstrings, Glutes, Core",
    "type": "gym",
    "description": "The single-leg Romanian deadlift trains unilateral hinging, balance, and posterior-chain control. It is excellent for glute and hamstring strength with added stability demands.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
    "cues": [
      "Keep hips square to the floor.",
      "Reach the back leg long behind you.",
      "Stand up by driving the planted foot down."
    ]
  },
  {
    "id": 72,
    "name": "Crunch",
    "muscles": "Rectus Abdominis, Obliques, Hip Flexors",
    "type": "bodyweight",
    "description": "Crunches train spinal flexion and let you directly target the abdominal wall. They are a simple way to build core awareness and midline endurance.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "cues": [
      "Press your low back gently into the floor.",
      "Curl the ribs toward the pelvis.",
      "Avoid yanking on the neck."
    ]
  },
  {
    "id": 73,
    "name": "Bicycle Crunch",
    "muscles": "Rectus Abdominis, Obliques, Hip Flexors",
    "type": "bodyweight",
    "description": "Bicycle crunches combine trunk flexion and rotation to challenge the abs and obliques. They are a strong bodyweight option for dynamic core work.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "cues": [
      "Rotate through the ribcage, not just the elbows.",
      "Extend one leg fully at a time.",
      "Move smoothly instead of rushing."
    ]
  },
  {
    "id": 74,
    "name": "Russian Twist",
    "muscles": "Obliques, Rectus Abdominis, Hip Flexors",
    "type": "bodyweight",
    "description": "Russian twists emphasize rotational control and oblique endurance. They help build a stronger, more coordinated trunk when done with posture and control.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Russian_Twist/0.jpg",
    "cues": [
      "Stay tall through the chest.",
      "Rotate the torso side to side.",
      "Keep the movement controlled, not sloppy."
    ]
  },
  {
    "id": 75,
    "name": "Leg Raise",
    "muscles": "Lower Abs, Hip Flexors, Obliques",
    "type": "bodyweight",
    "description": "Leg raises challenge the lower portion of the abdominal wall and the hip flexors while resisting pelvic tilt. They are effective for trunk control and hanging-core progressions.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "cues": [
      "Keep your low back from arching.",
      "Raise the legs under control.",
      "Lower slowly without losing tension."
    ]
  },
  {
    "id": 76,
    "name": "Dead Bug",
    "muscles": "Core, Deep Abs, Hip Flexors",
    "type": "bodyweight",
    "description": "The dead bug teaches bracing and limb movement while keeping the trunk stable. It is one of the best drills for foundational core control and spinal position.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dead_Bug/0.jpg",
    "cues": [
      "Flatten the ribs gently toward the floor.",
      "Move opposite arm and leg slowly.",
      "Only go as far as you can stay braced."
    ]
  },
  {
    "id": 77,
    "name": "Ab Wheel Rollout",
    "muscles": "Core, Lats, Shoulders",
    "type": "gym",
    "description": "Ab wheel rollouts create a long-lever anti-extension challenge that lights up the entire trunk. They are highly effective for building strong, resilient core tension.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "cues": [
      "Squeeze glutes before rolling out.",
      "Keep ribs down and spine neutral.",
      "Pull back in without letting the hips sag."
    ]
  },
  {
    "id": 78,
    "name": "Cable Crunch",
    "muscles": "Rectus Abdominis, Obliques, Serratus",
    "type": "gym",
    "description": "Cable crunches add load to trunk flexion and let you progressively train the abs. They are useful for direct abdominal hypertrophy and controlled core strength.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crunch/0.jpg",
    "cues": [
      "Lock the hips in place.",
      "Curl the ribcage down toward the floor.",
      "Let the abs, not the arms, drive the motion."
    ]
  },
  {
    "id": 79,
    "name": "Side Plank",
    "muscles": "Obliques, Glutes, Shoulders",
    "type": "bodyweight",
    "description": "The side plank trains lateral trunk stability and helps strengthen the obliques and glute medius. It is excellent for core balance and anti-side-bending strength.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "cues": [
      "Stack shoulders and hips.",
      "Drive the floor away with the forearm.",
      "Keep the body in one straight line."
    ]
  },
  {
    "id": 80,
    "name": "Mountain Climber",
    "muscles": "Core, Hip Flexors, Shoulders",
    "type": "bodyweight",
    "description": "Mountain climbers blend core stability with fast lower-body action for a conditioning effect. They build trunk control, shoulder endurance, and elevated heart rate.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "cues": [
      "Start in a strong plank.",
      "Drive knees in without bouncing the hips.",
      "Keep hands pressing firmly into the floor."
    ]
  },
  {
    "id": 81,
    "name": "Hollow Body Hold",
    "muscles": "Core, Hip Flexors, Quads",
    "type": "bodyweight",
    "description": "The hollow body hold teaches full-body tension and anti-extension strength. It is a valuable core drill for gymnastics control, lifting bracing, and midline endurance.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "cues": [
      "Press your low back into the floor.",
      "Reach long through fingers and toes.",
      "Only lower limbs as far as you can stay tight."
    ]
  },
  {
    "id": 82,
    "name": "Power Clean",
    "muscles": "Glutes, Quads, Traps",
    "type": "gym",
    "description": "The power clean is an explosive Olympic lift that trains rapid force production from the floor to the shoulders. It develops power, coordination, and athletic extension.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
    "cues": [
      "Stay over the bar through the first pull.",
      "Explode through hips, knees, and ankles.",
      "Catch fast with elbows high."
    ]
  },
  {
    "id": 83,
    "name": "Hang Clean",
    "muscles": "Glutes, Quads, Traps",
    "type": "gym",
    "description": "The hang clean starts above the floor, making it a strong tool for training explosive extension and a quick rack position. It helps athletes build power with less setup complexity than a full clean.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
    "cues": [
      "Load the hips from the hang.",
      "Jump the bar up with violent extension.",
      "Punch elbows through to the catch."
    ]
  },
  {
    "id": 84,
    "name": "Power Snatch",
    "muscles": "Glutes, Traps, Shoulders",
    "type": "gym",
    "description": "The power snatch is a fast full-body lift that moves the bar from the floor to overhead in one motion. It trains speed, timing, and explosive coordination.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
    "cues": [
      "Keep the bar close throughout.",
      "Finish tall before pulling under.",
      "Catch overhead with active shoulders."
    ]
  },
  {
    "id": 85,
    "name": "Clean and Jerk",
    "muscles": "Quads, Glutes, Shoulders",
    "type": "gym",
    "description": "The clean and jerk combines a powerful clean with an overhead jerk for full-body power expression. It develops explosive strength, coordination, and overhead stability.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
    "cues": [
      "Secure the clean before rushing the jerk.",
      "Dip straight and drive hard upward.",
      "Punch under the bar to a stable lockout."
    ]
  },
  {
    "id": 86,
    "name": "Push Press",
    "muscles": "Shoulders, Triceps, Quads",
    "type": "gym",
    "description": "The push press uses leg drive to help move heavier loads overhead than a strict press. It builds total-body power and transfers well to athletic overhead work.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shoulder_Press/0.jpg",
    "cues": [
      "Dip straight down a few inches.",
      "Drive hard through the legs.",
      "Finish with the bar stacked overhead."
    ]
  },
  {
    "id": 87,
    "name": "Thruster",
    "muscles": "Quads, Shoulders, Glutes",
    "type": "gym",
    "description": "A thruster combines a front squat and overhead press into one demanding full-body movement. It is excellent for power endurance, conditioning, and total-body coordination.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/0.jpg",
    "cues": [
      "Stay upright in the squat.",
      "Drive straight from the legs into the press.",
      "Use one smooth motion from bottom to top."
    ]
  },
  {
    "id": 88,
    "name": "Box Jump",
    "muscles": "Quads, Glutes, Calves",
    "type": "gym",
    "description": "Box jumps train explosive lower-body power and landing mechanics. They are a staple plyometric drill for speed, reactivity, and athletic confidence.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/0.jpg",
    "cues": [
      "Load the hips before exploding.",
      "Land softly with knees tracking well.",
      "Step down instead of rebounding when appropriate."
    ]
  },
  {
    "id": 89,
    "name": "Broad Jump",
    "muscles": "Glutes, Hamstrings, Quads",
    "type": "bodyweight",
    "description": "The broad jump develops horizontal power, coordination, and forceful hip extension. It is a simple but highly athletic movement for lower-body explosiveness.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/0.jpg",
    "cues": [
      "Swing arms back to load.",
      "Jump forward explosively.",
      "Stick the landing with control."
    ]
  },
  {
    "id": 90,
    "name": "Kettlebell Swing",
    "muscles": "Glutes, Hamstrings, Core",
    "type": "gym",
    "description": "The kettlebell swing is a ballistic hinge that trains power, conditioning, and posterior-chain endurance. It teaches strong hip snap and efficient force transfer.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg",
    "cues": [
      "Hinge, do not squat the bell.",
      "Snap the hips forward hard.",
      "Let the bell float from hip power."
    ]
  },
  {
    "id": 91,
    "name": "Turkish Get-Up",
    "muscles": "Shoulders, Core, Glutes",
    "type": "gym",
    "description": "The Turkish get-up moves from floor to standing while keeping a weight overhead, demanding full-body control. It improves shoulder stability, coordination, and movement awareness.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kettlebell_Sumo_High_Pull/0.jpg",
    "cues": [
      "Keep eyes on the weight.",
      "Move one step at a time.",
      "Maintain a locked-out and stable shoulder."
    ]
  },
  {
    "id": 92,
    "name": "Farmer's Walk",
    "muscles": "Grip, Traps, Core",
    "type": "gym",
    "description": "Farmer's walks train loaded carrying strength, grip endurance, and postural control. They are one of the best simple movements for total-body resilience.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Farmers_Walk/0.jpg",
    "cues": [
      "Stand tall with shoulders packed.",
      "Take short, controlled steps.",
      "Do not let the weights swing you around."
    ]
  },
  {
    "id": 93,
    "name": "Sled Push",
    "muscles": "Quads, Glutes, Calves",
    "type": "gym",
    "description": "The sled push builds leg drive and conditioning with minimal eccentric stress. It is excellent for athletes, power development, and brutally effective work capacity.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sled_Push/0.jpg",
    "cues": [
      "Keep your body leaning as one line.",
      "Drive knees forward with each step.",
      "Push continuously instead of stuttering."
    ]
  },
  {
    "id": 94,
    "name": "Battle Ropes",
    "muscles": "Shoulders, Core, Arms",
    "type": "gym",
    "description": "Battle ropes train upper-body conditioning and trunk stiffness through repeated powerful waves. They are effective for athletic conditioning and shoulder endurance.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/0.jpg",
    "cues": [
      "Stay athletic in your stance.",
      "Create crisp waves with the ropes.",
      "Keep the core braced as you move."
    ]
  },
  {
    "id": 95,
    "name": "Medicine Ball Slam",
    "muscles": "Core, Lats, Shoulders",
    "type": "gym",
    "description": "Medicine ball slams train aggressive trunk flexion, upper-body power, and conditioning. They are a great way to express speed and intent safely.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "cues": [
      "Reach tall before the slam.",
      "Drive the ball down with your whole body.",
      "Catch or reset with a neutral spine."
    ]
  },
  {
    "id": 96,
    "name": "Burpee",
    "muscles": "Chest, Quads, Core",
    "type": "bodyweight",
    "description": "Burpees combine a squat, plank, and jump into a demanding conditioning exercise. They build work capacity, coordination, and full-body grit.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/0.jpg",
    "cues": [
      "Move with a strong rhythm.",
      "Land softly on the jump.",
      "Keep the plank position tight between reps."
    ]
  },
  {
    "id": 97,
    "name": "Bear Crawl",
    "muscles": "Shoulders, Core, Quads",
    "type": "bodyweight",
    "description": "Bear crawls create contralateral coordination while heavily challenging the shoulders and trunk. They are useful for athletic movement quality and conditioning.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "cues": [
      "Keep knees hovering just off the floor.",
      "Move opposite hand and foot together.",
      "Stay quiet through the hips."
    ]
  },
  {
    "id": 98,
    "name": "Pallof Press",
    "muscles": "Obliques, Core, Glutes",
    "type": "gym",
    "description": "The Pallof press trains anti-rotation core strength by resisting the pull of a band or cable. It is excellent for trunk control and safer rotational strength training.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Crunch/0.jpg",
    "cues": [
      "Stand tall with ribs stacked.",
      "Press straight out without twisting.",
      "Hold briefly and breathe under tension."
    ]
  },
  {
    "id": 99,
    "name": "Single-Leg Press",
    "muscles": "Quads, Glutes, Hamstrings",
    "type": "gym",
    "description": "Single-leg pressing trains each leg independently and helps address asymmetries in strength and control. It is a useful machine option for unilateral lower-body volume.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/0.jpg",
    "cues": [
      "Keep hips level on the seat.",
      "Lower under control through a safe range.",
      "Drive evenly through the working foot."
    ]
  },
  {
    "id": 100,
    "name": "Hip Flexor Stretch",
    "muscles": "Hip Flexors, Quads, Glutes",
    "type": "bodyweight",
    "description": "This stretch opens the front of the hip and can reduce stiffness created by sitting or heavy lower-body training. It supports healthier pelvic position and smoother hip extension.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/0.jpg",
    "cues": [
      "Tuck the pelvis slightly under.",
      "Squeeze the glute of the trailing leg.",
      "Ease forward until you feel the front hip open."
    ]
  },
  {
    "id": 101,
    "name": "Pigeon Pose",
    "muscles": "Glutes, Hip Rotators, Hip Flexors",
    "type": "bodyweight",
    "description": "Pigeon pose stretches the glutes and deep hip rotators while encouraging hip mobility. It can help restore movement quality after running, squatting, or long periods of sitting.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "cues": [
      "Square the hips as much as possible.",
      "Support the front hip if needed.",
      "Breathe and relax into the stretch."
    ]
  },
  {
    "id": 102,
    "name": "World's Greatest Stretch",
    "muscles": "Hip Flexors, Hamstrings, Thoracic Spine",
    "type": "bodyweight",
    "description": "This multi-position drill opens the hips, hamstrings, and upper back in one sequence. It is a strong warm-up tool for improving global movement quality.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Worlds_Greatest_Stretch/0.jpg",
    "cues": [
      "Step long into the lunge.",
      "Reach and rotate through the upper back.",
      "Move slowly through each position."
    ]
  },
  {
    "id": 103,
    "name": "Cat-Cow",
    "muscles": "Spine, Core, Shoulders",
    "type": "bodyweight",
    "description": "Cat-cow improves spinal awareness and gentle mobility through flexion and extension. It is useful in warm-ups, recovery work, and restoring quality breathing positions.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "cues": [
      "Move one vertebra at a time.",
      "Match the motion with your breathing.",
      "Do not force the range."
    ]
  },
  {
    "id": 104,
    "name": "Thoracic Rotation",
    "muscles": "Thoracic Spine, Obliques, Shoulders",
    "type": "bodyweight",
    "description": "Thoracic rotation drills improve upper-back mobility and make overhead and rotational movement cleaner. They can reduce compensation through the lower back and shoulders.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
    "cues": [
      "Keep hips mostly still.",
      "Rotate from the upper back.",
      "Exhale as you open into the range."
    ]
  },
  {
    "id": 105,
    "name": "Couch Stretch",
    "muscles": "Hip Flexors, Quads, Core",
    "type": "bodyweight",
    "description": "The couch stretch aggressively opens the quads and hip flexors, especially after heavy leg training or long sitting. It is a valuable mobility drill for restoring front-side hip length.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/0.jpg",
    "cues": [
      "Keep the ribcage stacked over the pelvis.",
      "Squeeze the glute to deepen the stretch.",
      "Do not crank into pain."
    ]
  },
  {
    "id": 106,
    "name": "90/90 Hip Stretch",
    "muscles": "Hip Rotators, Glutes, Adductors",
    "type": "bodyweight",
    "description": "The 90/90 position trains internal and external hip rotation in a grounded posture. It is excellent for hip mobility, control, and smoother squatting mechanics.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/0.jpg",
    "cues": [
      "Sit tall through the spine.",
      "Keep both knees heavy to the floor.",
      "Hinge forward gently over the front leg."
    ]
  },
  {
    "id": 107,
    "name": "Doorway Chest Stretch",
    "muscles": "Chest, Front Delts, Biceps",
    "type": "bodyweight",
    "description": "This stretch opens the chest and front shoulders, which often tighten up from pressing and desk posture. It supports better posture and freer overhead movement.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pushups/0.jpg",
    "cues": [
      "Place the forearm lightly on the frame.",
      "Step through until you feel the chest open.",
      "Keep the shoulder relaxed and down."
    ]
  },
  {
    "id": 108,
    "name": "Box Step-Up",
    "muscles": "Quads, Glutes, Hamstrings",
    "type": "bodyweight",
    "description": "Box step-ups build lower-body endurance and elevate heart rate without the impact of jumping. They are a practical conditioning move for legs and work capacity.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/0.jpg",
    "cues": [
      "Stand tall on top of the box.",
      "Drive through the working leg.",
      "Keep a steady rhythm."
    ]
  },
  {
    "id": 109,
    "name": "Jump Squat",
    "muscles": "Quads, Glutes, Calves",
    "type": "bodyweight",
    "description": "Jump squats combine lower-body strength and plyometric intent in a simple bodyweight drill. They build power, speed, and conditioning at the same time.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/0.jpg",
    "cues": [
      "Load the hips before takeoff.",
      "Explode straight up.",
      "Land softly and absorb the force."
    ]
  },
  {
    "id": 110,
    "name": "Jump Lunge",
    "muscles": "Quads, Glutes, Hamstrings",
    "type": "bodyweight",
    "description": "Jump lunges train unilateral leg power and coordination while driving the heart rate up fast. They are demanding but effective for athletic conditioning.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/0.jpg",
    "cues": [
      "Start from a strong split stance.",
      "Switch legs in the air under control.",
      "Land softly into the next rep."
    ]
  },
  {
    "id": 111,
    "name": "High Knees",
    "muscles": "Hip Flexors, Quads, Calves",
    "type": "bodyweight",
    "description": "High knees are a fast conditioning drill that improves rhythm, foot speed, and hip flexor drive. They are useful in warm-ups, intervals, and athletic prep.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/0.jpg",
    "cues": [
      "Stay tall through the torso.",
      "Drive knees up quickly.",
      "Pump the arms with the legs."
    ]
  },
  {
    "id": 112,
    "name": "Jumping Jacks",
    "muscles": "Shoulders, Calves, Quads",
    "type": "bodyweight",
    "description": "Jumping jacks provide a low-skill conditioning option that raises heart rate and coordinates the whole body. They are effective for warm-ups, circuits, and general movement.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/0.jpg",
    "cues": [
      "Keep a light bounce on the feet.",
      "Reach overhead with relaxed shoulders.",
      "Stay rhythmic and controlled."
    ]
  },
  {
    "id": 113,
    "name": "Tuck Jump",
    "muscles": "Quads, Glutes, Core",
    "type": "bodyweight",
    "description": "Tuck jumps train explosive vertical power and reactive coordination. They are useful for athletic pop, fast force production, and conditioning.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Squat/0.jpg",
    "cues": [
      "Jump tall before tucking.",
      "Bring knees up with a braced core.",
      "Land softly and reset if needed."
    ]
  },
  {
    "id": 114,
    "name": "Lateral Bound",
    "muscles": "Glutes, Quads, Adductors",
    "type": "bodyweight",
    "description": "Lateral bounds develop side-to-side power, deceleration, and athletic balance. They are especially useful for field and court athletes.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lateral_Bound/0.jpg",
    "cues": [
      "Push hard off the outside leg.",
      "Stick the landing before rebounding.",
      "Keep the knee aligned over the foot."
    ]
  },
  {
    "id": 115,
    "name": "Skater Jump",
    "muscles": "Glutes, Quads, Calves",
    "type": "bodyweight",
    "description": "Skater jumps train lateral movement, single-leg stability, and conditioning in one athletic drill. They help build coordination and power in the frontal plane.",
    "image": "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lateral_Bound/0.jpg",
    "cues": [
      "Leap side to side with control.",
      "Reach the trailing leg behind you.",
      "Land softly and own each rep."
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
  { id: 'titans_pauldrons', name: "Titan's Pauldrons", icon: '🪨', desc: 'Stone-forged armor for relentless lifters.', perk: '+8% XP on all gym exercises', stat: 'gym_xp_bonus', value: 8, unlockCondition: 'Complete 10 gym workouts' },
  { id: 'windrunners_boots', name: "Windrunner's Boots", icon: '💨', desc: 'Feather-light steps, brutal pace.', perk: '+25 XP per cardio session', stat: 'cardio_xp_bonus', value: 25, unlockCondition: 'Log 5 cardio sessions' },
  { id: 'mystic_headband', name: 'Mystic Headband', icon: '🎯', desc: 'Focus sharp enough to pierce fate.', perk: '+15% XP on all quests', stat: 'quest_xp_bonus_percent', value: 15, unlockCondition: 'Claim 20 quests total' },
  { id: 'dragon_scale_vest', name: 'Dragon Scale Vest', icon: '🐲', desc: 'Scaled mail that refuses collapse.', perk: "Combo streak can't drop below 3×", stat: 'combo_floor', value: 3, unlockCondition: 'Reach a 14-day streak' },
  { id: 'alchemists_flask', name: "Alchemist's Flask", icon: '⚗️', desc: 'Every sip becomes fuel.', perk: '+10 XP per glass of water logged', stat: 'water_xp_bonus', value: 10, unlockCondition: 'Hit 8/8 water 5 days' },
  { id: 'storm_bracers', name: 'Storm Bracers', icon: '⚡', desc: 'Channel the surge of each level-up.', perk: 'Level-up grants +3 Hero Points instead of 2', stat: 'hero_points_per_level', value: 3, unlockCondition: 'Reach Level 10' },
  { id: 'phantom_cloak', name: 'Phantom Cloak', icon: '👁️', desc: 'The night is your training ground.', perk: '+20% XP on all actions between 10 PM and 6 AM', stat: 'night_owl_bonus', value: 0.20, unlockCondition: 'Log a workout after 10 PM' },
  { id: 'iron_will_band', name: 'Iron Will Band', icon: '💎', desc: 'Resolve that bends every quest to your will.', perk: 'Personal quest XP +50%', stat: 'personal_quest_bonus_percent', value: 50, unlockCondition: 'Complete 3 personal quests' },
  { id: 'berserkers_gauntlets', name: "Berserker's Gauntlets", icon: '🔥', desc: 'They hunger for punishing high-rep sets.', perk: '+5 XP per set logged over 10 reps', stat: 'high_rep_set_bonus', value: 5, unlockCondition: 'Log 50 sets total' },
  { id: 'oracles_lens', name: "Oracle's Lens", icon: '🔭', desc: 'See the next threat before it awakens.', perk: 'See next boss 3 days early', stat: 'boss_preview_days', value: 3, unlockCondition: 'Defeat 3 boss battles' },
  { id: 'gravity_boots', name: 'Gravity Boots', icon: '🌑', desc: 'Every leg day feels heavier and pays better.', perk: 'Leg exercises yield +10% XP', stat: 'leg_xp_bonus', value: 10, unlockCondition: 'Complete 5 leg workouts' },
  { id: 'healing_totem', name: 'Healing Totem', icon: '🏺', desc: 'Recovery rituals blessed by old powers.', perk: 'Recovery check-ins grant +25 XP', stat: 'recovery_xp_bonus', value: 25, unlockCondition: 'Log recovery 10 times' },
  { id: 'champions_crown', name: "Champion's Crown", icon: '👑', desc: 'A crown for milestone conquerors.', perk: '+100 XP when you reach a new level milestone (5, 10, 15...)', stat: 'level_milestone_xp_bonus', value: 100, unlockCondition: 'Reach Level 15' },
  { id: 'shadow_step_wraps', name: 'Shadow Step Wraps', icon: '🌫️', desc: 'Move unseen, accelerate the streak.', perk: 'Streak bonus activates 1 day sooner', stat: 'streak_bonus_early', value: 1, unlockCondition: 'Hit a 10-day streak' },
  { id: 'arcane_scroll', name: 'Arcane Scroll of Records', icon: '📜', desc: 'Every record is written in gold.', perk: '+50 XP bonus whenever you log a new 1RM PR', stat: 'pr_xp_bonus', value: 50, unlockCondition: 'Log at least one chest, back, and shoulder exercise in your history' },
  { id: 'phoenix_feather', name: 'Phoenix Feather', icon: '🪶', desc: 'Rise harder after every fall.', perk: 'Comeback bonus doubles to 4× XP', stat: 'comeback_bonus_multiplier', value: 4, unlockCondition: 'Have your streak broken and return within 48 hours' },
  { id: 'warriors_seal', name: "Warrior's Seal", icon: '🏅', desc: 'Marked for those who train beyond routine.', perk: '+20 XP for every new exercise tried', stat: 'new_exercise_bonus', value: 20, unlockCondition: 'Try 20 different exercises' },
  { id: 'time_wardens_watch', name: "Time Warden's Watch", icon: '⏱️', desc: 'Master rest, master the fight.', perk: 'Rest timer completion grants +5 XP', stat: 'rest_timer_bonus', value: 5, unlockCondition: 'Complete 25 rest timers' },
  { id: 'vitality_ring', name: 'Vitality Ring', icon: '💍', desc: 'Reward for nights that truly restore.', perk: 'Logging sleep 8+ hours 3 days in a row grants +50 XP bonus', stat: 'sleep_streak_bonus', value: 50, unlockCondition: 'Log sleep 8+ hours 5 times' },
  { id: 'legendary_belt_of_gains', name: 'Legendary Belt of Gains', icon: '🏆', desc: 'The final relic of a completed arsenal.', perk: 'All XP sources +5% permanently', stat: 'all_xp_bonus', value: 5, unlockCondition: 'Equip all 8 original gear pieces at least once' },
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
