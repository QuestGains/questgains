#!/usr/bin/env python3
"""Generate realistic fitness exercise images using DALL-E 3 via OpenAI API."""

import os
import json
import time
import urllib.request
import urllib.error
import http.client
import sys

API_KEY = os.environ.get("OPENAI_API_KEY", "")
OUTPUT_DIR = "/data/.openclaw/workspace/questgains/exercise-images"

EXERCISES = [
    ("90_90_Hip_Stretch", "Professional fitness photography: person sitting on gym floor in 90/90 hip stretch position, both legs bent at 90 degrees, back leg behind, front leg to side, upright posture. Clean white/light gray studio background, athletic wear, clear form demonstration. Realistic photo quality."),
    ("Battle_Ropes", "Professional fitness photography: athletic person holding battle ropes at a gym, waves in motion, powerful stance with wide feet, bent knees. Industrial gym background with dim lighting. Real person, realistic photo quality, fitness website style."),
    ("Bear_Crawl", "Professional fitness photography: person in bear crawl position on gym floor, on hands and toes, knees hovering 2 inches off ground, flat back, neutral spine. Clean gym background, athletic wear. Realistic photo quality, clear exercise form demonstration."),
    ("Box_Jump", "Professional fitness photography: athletic person mid-air jumping onto a wooden plyo box in a gym, explosive jump, arms swinging forward, peak of jump. Clean gym background, athletic wear. Realistic photo quality, fitness website style."),
    ("Box_Step_Up", "Professional fitness photography: person stepping up onto a plyo box with one foot planted on top, other foot about to lift, controlled movement. Clean gym background, athletic wear. Realistic photo quality, fitness exercise demonstration."),
    ("Burpee", "Professional fitness photography: athletic person in the jump phase of a burpee, airborne with arms overhead, full extension. Clean gym or studio background, athletic wear. Realistic photo quality, clear form demonstration."),
    ("Cable_Curl", "Professional fitness photography: person doing bicep curl with cable machine at gym, cable pulley system visible, arm curled up, focused form. Gym background with equipment. Realistic photo quality, fitness demonstration style."),
    ("Cat_Cow", "Professional fitness photography: person on hands and knees in yoga cat-cow stretch on a yoga mat, back arched or rounded, neutral position. Clean studio or gym background. Realistic photo quality, clear form demonstration."),
    ("Clean_and_Jerk", "Professional fitness photography: strong athlete performing barbell clean and jerk, bar held overhead at full extension, feet apart in split or squat position. Weightlifting gym background. Realistic photo quality, sports photography style."),
    ("Close_Grip_Bench_Press", "Professional fitness photography: person lying on bench press, barbell lowered to chest with narrow hand grip, chest workout. Gym background with equipment. Realistic photo quality, clear exercise form demonstration."),
    ("Couch_Stretch", "Professional fitness photography: person in couch stretch position, rear knee on floor, back foot elevated against wall, deep hip flexor stretch, upright torso. Gym or studio background. Realistic photo quality."),
    ("Doorway_Chest_Stretch", "Professional fitness photography: person standing in a doorway, both arms pressed against door frame at shoulder height, body leaning forward into chest stretch. Clean interior background. Realistic photo quality, fitness demonstration."),
    ("Hang_Clean", "Professional fitness photography: athlete performing barbell hang clean, bar at hip height, powerful hip extension, pulling bar upward. Weightlifting gym background with platform. Realistic photo quality, sports photography."),
    ("High_Knees", "Professional fitness photography: person running in place with high knees, one knee driven up to waist height, athletic running form, dynamic motion. Clean gym or studio background. Realistic photo quality."),
    ("Hip_Flexor_Stretch", "Professional fitness photography: person in deep lunge hip flexor stretch, rear knee on ground, front foot forward, torso upright, hands on front knee. Clean gym or studio background. Realistic photo quality."),
    ("Jump_Lunge", "Professional fitness photography: person mid-air during jump lunge, legs split in lunge position while airborne, arms for balance. Clean gym background. Realistic photo quality, athletic motion shot."),
    ("Jump_Squat", "Professional fitness photography: athletic person jumping during squat jump, airborne with legs slightly bent, arms overhead, explosive movement. Clean gym or studio background. Realistic photo quality."),
    ("Jumping_Jacks", "Professional fitness photography: person mid-jump in jumping jacks, arms raised overhead and wide, legs apart in the air. Clean studio background. Realistic photo quality, fitness demonstration."),
    ("Landmine_Press", "Professional fitness photography: person pressing barbell landmine at a gym, one end of bar anchored in corner or sleeve, pressing other end overhead at angle, single arm. Gym background. Realistic photo quality."),
    ("Leg_Extension", "Professional fitness photography: person using leg extension machine at gym, legs extended forward against pad, seated position, quad exercise. Gym background with equipment. Realistic photo quality."),
    ("Medicine_Ball_Slam", "Professional fitness photography: athletic person slamming medicine ball to the floor, ball at waist level on the way down, powerful stance, full body engagement. Gym background. Realistic photo quality."),
    ("Nordic_Curl", "Professional fitness photography: person in nordic hamstring curl position, kneeling with ankles anchored under pad or bar, torso lowering toward floor, upper body nearly parallel to ground. Gym floor. Realistic photo quality."),
    ("Pallof_Press", "Professional fitness photography: person performing Pallof press at cable machine, arms pressing cable attachment straight out in front of body, anti-rotation core exercise, cable to one side. Gym background. Realistic photo quality."),
    ("Pigeon_Pose", "Professional fitness photography: person in yoga pigeon pose on a mat, front leg bent with shin on floor, rear leg extended back, torso upright or lowered forward, deep hip stretch. Clean studio or gym background. Realistic photo quality."),
    ("Plate_Front_Raise", "Professional fitness photography: person raising a weight plate with straight arms out in front, plate at shoulder height, standing upright. Gym background. Realistic photo quality, fitness demonstration."),
    ("Power_Snatch", "Professional fitness photography: strong athlete performing barbell power snatch, bar overhead in locked out position, partial squat, wide grip. Weightlifting gym background. Realistic photo quality, sports photography."),
    ("Push_Press", "Professional fitness photography: person pressing barbell overhead in push press, bar locked out above head, legs slightly bent in dip then extended, standing position. Gym background. Realistic photo quality."),
    ("Renegade_Row", "Professional fitness photography: person in plank position on two dumbbells, rowing one dumbbell up to hip while maintaining plank, strong core engaged. Gym floor. Realistic photo quality, fitness demonstration."),
    ("Single_Leg_Press", "Professional fitness photography: person on leg press machine with one foot on platform doing single leg press, other leg off, controlled movement. Gym background with machine. Realistic photo quality."),
    ("Single_Leg_RDL", "Professional fitness photography: person doing single leg Romanian deadlift with dumbbell, one leg extended behind for balance, torso hinged forward, dumbbell hanging down. Clean gym background. Realistic photo quality."),
    ("Skater_Jump", "Professional fitness photography: person mid-air in lateral skater jump, one leg extended to side, opposite hand reaching down toward ground, athletic lateral bound. Clean gym or studio background. Realistic photo quality."),
    ("Skull_Crusher", "Professional fitness photography: person lying on bench doing skull crusher exercise with barbell or EZ bar, bar lowered toward forehead, elbows pointed up. Gym background. Realistic photo quality."),
    ("Thoracic_Rotation", "Professional fitness photography: person lying on side on ground doing thoracic spine rotation stretch, knees stacked and bent, top arm rotating open toward ceiling. Clean gym floor or mat. Realistic photo quality."),
    ("Thruster", "Professional fitness photography: athlete performing barbell thruster, rising from squat into overhead press in one fluid motion, bar locked out overhead. Gym background. Realistic photo quality, fitness photography."),
    ("Tuck_Jump", "Professional fitness photography: person in air during tuck jump, knees pulled up to chest, fully airborne, explosive jump. Clean gym or studio background. Realistic photo quality, motion shot."),
    ("Turkish_Get_Up", "Professional fitness photography: person performing kettlebell Turkish get-up, lying on ground with one arm pressing kettlebell straight up, beginning the movement. Gym floor or mat. Realistic photo quality, fitness demonstration."),
]

os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_image(exercise_name, prompt, retries=3):
    """Generate an image using DALL-E 3 and return the URL."""
    url = "https://api.openai.com/v1/images/generations"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    body = json.dumps({
        "model": "dall-e-3",
        "prompt": prompt,
        "n": 1,
        "size": "1024x1024",
        "quality": "standard",
        "style": "natural",
    }).encode("utf-8")

    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, data=body, headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = json.loads(resp.read())
                return data["data"][0]["url"]
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="replace")
            print(f"  HTTP {e.code} error for {exercise_name}: {err_body[:200]}", flush=True)
            if e.code == 429:
                wait = 20 * (attempt + 1)
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
                with open(filepath, "wb") as f:
                    f.write(resp.read())
            return True
        except Exception as ex:
            print(f"  Download error (attempt {attempt+1}): {ex}", flush=True)
            if attempt < retries - 1:
                time.sleep(3)
    return False

success = []
failed = []

print(f"Starting generation of {len(EXERCISES)} exercise images...", flush=True)
print(f"Output dir: {OUTPUT_DIR}", flush=True)
print("=" * 60, flush=True)

for i, (name, prompt) in enumerate(EXERCISES, 1):
    filepath = os.path.join(OUTPUT_DIR, f"{name}.jpg")
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
    
    # Brief pause between requests to avoid rate limits
    if i < len(EXERCISES):
        time.sleep(2)

print("=" * 60, flush=True)
print(f"\nResults: {len(success)} succeeded, {len(failed)} failed", flush=True)
print(f"\nSuccessful images:", flush=True)
for name, path in success:
    print(f"  ✓ {path}", flush=True)

if failed:
    print(f"\nFailed:", flush=True)
    for name in failed:
        print(f"  ✗ {name}", flush=True)
