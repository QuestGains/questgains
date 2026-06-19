#!/usr/bin/env python3
"""Generate 7 new realistic fitness exercise images using xAI."""

import os
import json
import time
import urllib.request
import urllib.error

XAI_KEY = os.environ.get('XAI_API_KEY')
OUTPUT_DIR = "/data/.openclaw/workspace/questgains/exercise-images"

EXERCISES = [
    ("Decline_Bench_Press", "Professional fitness photography, realistic photo: muscular person lying on a declined bench press at a gym, gripping a barbell with both hands, lowering it toward the lower chest area, decline angle clearly visible, proper powerlifting form, spotted safely. Gym background with equipment. Athletic wear. Clear exercise demonstration."),
    ("Chest_Dip", "Professional fitness photography, realistic photo: athletic person performing chest dips on parallel bars at a gym, leaning slightly forward at the torso to target chest muscles, arms bent at 90 degrees at bottom of movement, elbows flared slightly out. Gym background. Athletic wear. Fitness website quality."),
    ("Incline_Barbell_Press", "Professional fitness photography, realistic photo: person lying on an inclined bench set at 45 degrees, pressing a loaded barbell upward with both hands, proper incline bench press form targeting upper chest, barbell at mid-press position. Gym background with squat rack visible. Athletic wear."),
    ("Hyperextension", "Professional fitness photography, realistic photo: person on a hyperextension bench (Roman chair / back extension bench), hips resting on the pad, body hinging at the hips and extending back up to neutral position, hands behind head or crossed on chest, targeting lower back and glutes. Clean gym background. Athletic wear."),
    ("Front_Raise", "Professional fitness photography, realistic photo: person standing upright at gym holding a dumbbell in one hand, raising it straight out in front of the body to shoulder height with straight arm, front deltoid raise exercise, neutral or pronated grip. Clean light gray studio background. Athletic wear."),
    ("Rear_Delt_Fly", "Professional fitness photography, realistic photo: person bent over at 90 degrees at the hips, holding dumbbells in both hands hanging down, raising arms out to the sides with slight elbow bend in a rear delt fly motion targeting posterior deltoids, back flat and parallel to floor. Clean gym background. Athletic wear."),
    ("Upright_Row", "Professional fitness photography, realistic photo: person standing upright holding a barbell with a close overhand grip, pulling the barbell straight up along the body to chin level, elbows flared out and raised above the bar at the top of the movement, proper upright row form. Clean gym background. Athletic wear."),
]

os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_image(exercise_name, prompt, retries=3):
    url = "https://api.x.ai/v1/images/generations"
    headers = {
        "Authorization": f"Bearer {XAI_KEY}",
        "Content-Type": "application/json",
    }
    body = json.dumps({
        "model": "grok-2-image",
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

print(f"Generating {len(EXERCISES)} exercise images via xAI...", flush=True)
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
        success.append(name)
    else:
        print("FAILED (download)", flush=True)
        failed.append(name)
    
    if i < len(EXERCISES):
        time.sleep(3)

print("=" * 60, flush=True)
print(f"\nResults: {len(success)} succeeded, {len(failed)} failed", flush=True)
for name in success:
    print(f"  ✓ {name}.jpg", flush=True)
if failed:
    print(f"\nFailed:", flush=True)
    for name in failed:
        print(f"  ✗ {name}", flush=True)
