#!/usr/bin/env python3
"""Generate realistic fitness exercise images using xAI Grok image generation."""

import os
import json
import time
import urllib.request
import urllib.error
import sys

XAI_KEY = os.environ.get('XAI_API_KEY')
OUTPUT_DIR = "/data/.openclaw/workspace/questgains/exercise-images"

EXERCISES = [
    ("90_90_Hip_Stretch", "Professional fitness photography, realistic photo: person sitting on gym floor in 90/90 hip stretch position, both legs bent at 90-degree angles, front leg to side and back leg behind, upright torso. Light gray studio background, athletic wear. Clear exercise form demonstration."),
    ("Battle_Ropes", "Professional fitness photography, realistic photo: athletic person standing at a gym holding two battle ropes, ropes in motion creating waves, wide athletic stance with bent knees. Industrial gym background. Fitness website quality image."),
    ("Bear_Crawl", "Professional fitness photography, realistic photo: person in bear crawl position on gym floor, on hands and toes, knees hovering just 2 inches off the ground, flat back, neutral spine, looking down. Clean gym flooring background. Exercise form demonstration."),
    ("Box_Jump", "Professional fitness photography, realistic photo: athletic person mid-air jumping onto a wooden plyometric box at a CrossFit gym, explosive upward jump, arms swinging forward for momentum. Gym background. Fitness photography."),
    ("Box_Step_Up", "Professional fitness photography, realistic photo: person performing box step-up exercise, one foot planted firmly on top of a plyo box, other foot stepping up, controlled athletic movement. Clean gym background. Fitness demonstration."),
    ("Burpee", "Professional fitness photography, realistic photo: athletic person at the jump phase of a burpee exercise, airborne with arms reaching overhead, full body extension, explosive jump. Clean gym or studio background. Fitness photography."),
    ("Cable_Curl", "Professional fitness photography, realistic photo: person doing standing bicep curl with cable machine at gym, single cable attachment in hand, arm curled to shoulder, cable pulley system visible in background. Gym setting. Fitness demonstration."),
    ("Cat_Cow", "Professional fitness photography, realistic photo: person on hands and knees on a yoga mat doing cat-cow stretch, spine in neutral position transitioning between arch and round. Clean studio background with natural light. Yoga/fitness demonstration."),
    ("Clean_and_Jerk", "Professional fitness photography, realistic photo: strong weightlifter performing barbell clean and jerk, barbell held overhead with locked arms, feet in split jerk position, powerful athletic pose. Olympic weightlifting gym background."),
    ("Close_Grip_Bench_Press", "Professional fitness photography, realistic photo: person lying on weight bench doing close-grip bench press, barbell held with narrow hand placement close together, bar near chest at bottom of movement. Gym background with squat rack."),
    ("Couch_Stretch", "Professional fitness photography, realistic photo: person performing couch stretch, rear knee on floor, rear foot elevated against wall, front foot forward, torso upright, deep hip flexor and quad stretch. Gym or home background."),
    ("Doorway_Chest_Stretch", "Professional fitness photography, realistic photo: person standing in a doorway performing chest stretch, both forearms pressed against door frame at shoulder height, body leaning forward to stretch pectoral muscles. Clean interior background."),
    ("Hang_Clean", "Professional fitness photography, realistic photo: athlete performing barbell hang clean exercise, bar starting at hip height, explosive hip drive pulling bar upward, mid-pull position. Weightlifting platform background. Sports photography."),
    ("High_Knees", "Professional fitness photography, realistic photo: person running in place performing high knees exercise, one knee driven up to hip height, arms pumping, athletic running form, dynamic motion. Clean gym or studio background."),
    ("Hip_Flexor_Stretch", "Professional fitness photography, realistic photo: person in deep kneeling lunge hip flexor stretch, rear knee on mat, front foot forward, torso upright with slight back extension, hands on front knee. Gym or studio background."),
    ("Jump_Lunge", "Professional fitness photography, realistic photo: person mid-air during jump lunge exercise, legs split in lunge position while completely airborne, arms extended for balance. Clean gym background. Athletic motion photography."),
    ("Jump_Squat", "Professional fitness photography, realistic photo: athletic person airborne during a squat jump, feet off the ground at peak of jump, arms reaching overhead or extended, explosive movement. Clean gym or studio background."),
    ("Jumping_Jacks", "Professional fitness photography, realistic photo: person mid-jump in jumping jacks exercise, arms raised wide overhead, legs apart at peak of jump. Clean bright studio background. Fitness demonstration photography."),
    ("Landmine_Press", "Professional fitness photography, realistic photo: person performing landmine press exercise at gym, one end of barbell anchored in floor sleeve, pressing the other end upward at an angle with one arm overhead. Gym background with equipment."),
    ("Leg_Extension", "Professional fitness photography, realistic photo: person seated on leg extension machine at gym, legs fully extended forward against padded roller, quad exercise, machine frame visible. Gym background with equipment."),
    ("Medicine_Ball_Slam", "Professional fitness photography, realistic photo: athletic person slamming a medicine ball forcefully toward the gym floor, ball at waist height on downswing, explosive full-body movement, powerful athletic stance. Gym background."),
    ("Nordic_Curl", "Professional fitness photography, realistic photo: person performing nordic hamstring curl, kneeling on padded mat with ankles secured under barbell or pad, upper body lowering toward floor under control, nearly parallel to ground. Gym floor."),
    ("Pallof_Press", "Professional fitness photography, realistic photo: person performing Pallof press at cable machine, standing sideways to cable stack, arms pressing cable attachment straight out in front of chest, anti-rotation core exercise. Gym background."),
    ("Pigeon_Pose", "Professional fitness photography, realistic photo: person in yoga pigeon pose on mat, front leg bent with shin on floor, rear leg extended straight back, torso upright, deep hip external rotation stretch. Clean yoga studio or gym background."),
    ("Plate_Front_Raise", "Professional fitness photography, realistic photo: person standing at gym holding a circular weight plate with both hands, arms raised straight out in front to shoulder height, front deltoid exercise. Gym background with equipment."),
    ("Power_Snatch", "Professional fitness photography, realistic photo: strong weightlifter performing barbell power snatch, bar held overhead with wide grip and locked arms, partial squat receiving position, explosive athletic movement. Weightlifting gym background."),
    ("Push_Press", "Professional fitness photography, realistic photo: person performing barbell push press, bar locked out overhead with fully extended arms, slight leg drive visible, standing in gym. Clean gym background. Fitness photography."),
    ("Renegade_Row", "Professional fitness photography, realistic photo: person in plank position with two dumbbells on gym floor, rowing one dumbbell up to hip while other arm supports, strong core engaged, flat back. Gym floor view."),
    ("Single_Leg_Press", "Professional fitness photography, realistic photo: person on leg press machine at gym performing single-leg press, one foot on platform pushing weight, other leg off to side, quad/glute exercise. Gym background with machine."),
    ("Single_Leg_RDL", "Professional fitness photography, realistic photo: person performing single-leg Romanian deadlift with dumbbell, standing on one leg, torso hinged forward at hip, other leg extended behind for balance, dumbbell hanging. Clean gym background."),
    ("Skater_Jump", "Professional fitness photography, realistic photo: athletic person mid-air in lateral skater jump, one leg extended out to side, opposite arm reaching across toward landing foot, explosive lateral bound. Gym or studio background."),
    ("Skull_Crusher", "Professional fitness photography, realistic photo: person lying on weight bench performing skull crusher tricep exercise, EZ bar or barbell held above and lowering toward forehead, elbows pointed up. Gym background."),
    ("Thoracic_Rotation", "Professional fitness photography, realistic photo: person lying on side on yoga mat performing thoracic rotation stretch, knees stacked at 90 degrees, top arm rotating open toward ceiling for spinal mobility. Clean gym floor or mat."),
    ("Thruster", "Professional fitness photography, realistic photo: athlete performing barbell thruster, rising from squat position and pressing barbell overhead in one continuous movement, bar locked out above head. CrossFit gym background."),
    ("Tuck_Jump", "Professional fitness photography, realistic photo: person completely airborne in tuck jump, knees pulled up tightly to chest at peak of explosive jump, arms reaching forward for balance. Clean gym or studio background. Athletic motion photography."),
    ("Turkish_Get_Up", "Professional fitness photography, realistic photo: person beginning kettlebell Turkish get-up, lying on back on gym floor, one arm pressing kettlebell straight up toward ceiling, other arm on floor for support. Gym floor view."),
]

os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_image(exercise_name, prompt, retries=3):
    """Generate an image using xAI and return the URL."""
    url = "https://api.x.ai/v1/images/generations"
    headers = {
        "Authorization": f"Bearer {XAI_KEY}",
        "Content-Type": "application/json",
    }
    body = json.dumps({
        "model": "grok-imagine-image",
        "prompt": prompt,
        "n": 1,
        "response_format": "url",
    }).encode("utf-8")

    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, data=body, headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = json.loads(resp.read())
                return data["data"][0]["url"]
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="replace")
            print(f"  HTTP {e.code} error for {exercise_name}: {err_body[:300]}", flush=True)
            if e.code == 429:
                wait = 15 * (attempt + 1)
                print(f"  Rate limited. Waiting {wait}s...", flush=True)
                time.sleep(wait)
            elif attempt < retries - 1:
                time.sleep(5)
            else:
                return None
        except Exception as ex:
            print(f"  Error for {exercise_name}: {ex}", flush=True)
            if attempt < retries - 1:
                time.sleep(5)
            else:
                return None

def download_image(url, filepath, retries=3):
    """Download image from URL and save to filepath."""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=60) as resp:
                data = resp.read()
                with open(filepath, "wb") as f:
                    f.write(data)
            return True
        except Exception as ex:
            print(f"  Download error (attempt {attempt+1}): {ex}", flush=True)
            if attempt < retries - 1:
                time.sleep(3)
    return False

success = []
failed = []

# Support resuming - skip already completed files
existing = set()
for f in os.listdir(OUTPUT_DIR):
    if f.endswith(".jpg"):
        name = f[:-4]
        if os.path.getsize(os.path.join(OUTPUT_DIR, f)) > 1000:
            existing.add(name)

if existing:
    print(f"Found {len(existing)} existing images, will skip them.", flush=True)

print(f"Starting generation of {len(EXERCISES)} exercise images...", flush=True)
print(f"Output dir: {OUTPUT_DIR}", flush=True)
print("=" * 60, flush=True)

for i, (name, prompt) in enumerate(EXERCISES, 1):
    filepath = os.path.join(OUTPUT_DIR, f"{name}.jpg")
    
    if name in existing:
        size_kb = os.path.getsize(filepath) // 1024
        print(f"[{i:02d}/{len(EXERCISES)}] {name}... SKIPPED (exists, {size_kb}KB)", flush=True)
        success.append((name, filepath))
        continue
    
    print(f"[{i:02d}/{len(EXERCISES)}] {name}...", end=" ", flush=True)
    
    img_url = generate_image(name, prompt)
    if not img_url:
        print("FAILED (generation)", flush=True)
        failed.append(name)
        continue
    
    ok = download_image(img_url, filepath)
    if ok:
        size_kb = os.path.getsize(filepath) // 1024
        print(f"OK ({size_kb}KB)", flush=True)
        success.append((name, filepath))
    else:
        print("FAILED (download)", flush=True)
        failed.append(name)
    
    # Brief pause between requests
    if i < len(EXERCISES):
        time.sleep(1)

print("=" * 60, flush=True)
print(f"\nResults: {len(success)} succeeded, {len(failed)} failed", flush=True)
print(f"\nSuccessful images:", flush=True)
for name, path in success:
    print(f"  ✓ {path}", flush=True)

if failed:
    print(f"\nFailed:", flush=True)
    for name in failed:
        print(f"  ✗ {name}", flush=True)

# Write summary
summary = {
    "success": [{"name": n, "path": p} for n, p in success],
    "failed": failed,
    "total": len(EXERCISES),
}
with open("/data/.openclaw/workspace/questgains/image_gen_summary.json", "w") as f:
    json.dump(summary, f, indent=2)
print(f"\nSummary written to image_gen_summary.json", flush=True)
