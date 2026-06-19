#!/usr/bin/env python3
"""Generate 7 new realistic fitness exercise images using DALL-E 3."""

import os
import json
import time
import urllib.request
import urllib.error

API_KEY = os.environ.get("OPENAI_API_KEY", "")
OUTPUT_DIR = "/data/.openclaw/workspace/questgains/exercise-images"

EXERCISES = [
    ("Decline_Bench_Press", "Professional fitness photography: muscular person lying on a declined bench press, gripping a barbell with both hands, lowering the barbell toward the lower chest, decline angle clearly visible, proper powerlifting form. Clean gym background with equipment visible. Athletic wear, realistic photo quality similar to a fitness website."),
    ("Chest_Dip", "Professional fitness photography: athletic person performing chest dips on parallel bars at a gym, leaning slightly forward to target chest muscles, arms bent at 90 degrees, elbows flared out, proper dip form. Clean gym background. Athletic wear, realistic photo quality similar to a fitness website."),
    ("Incline_Barbell_Press", "Professional fitness photography: person lying on an inclined bench at 45 degrees, pressing a loaded barbell upward with both hands, proper incline bench press form, upper chest workout. Clean gym background with squat rack visible. Athletic wear, realistic photo quality similar to a fitness website."),
    ("Hyperextension", "Professional fitness photography: person on a hyperextension bench (Roman chair), body folded at the hips, extending back up to a straight position, hands behind head or crossed on chest, lower back extension exercise. Clear gym background. Athletic wear, realistic photo quality similar to a fitness website."),
    ("Front_Raise", "Professional fitness photography: person standing upright holding a dumbbell in one hand, raising it straight out in front of the body to shoulder height, arm fully extended, proper front deltoid raise form. Clean light gray or white studio background. Athletic wear, realistic photo quality similar to a fitness website."),
    ("Rear_Delt_Fly", "Professional fitness photography: person bent over at 90 degrees at the hips, holding dumbbells in both hands, raising arms out to the sides with slight elbow bend in a rear delt fly motion, targeting posterior deltoids. Clean gym background. Athletic wear, realistic photo quality similar to a fitness website."),
    ("Upright_Row", "Professional fitness photography: person standing upright holding a barbell with a narrow overhand grip, pulling the barbell straight up along the body to chin level, elbows flared out and higher than the bar, proper upright row form. Clean gym background. Athletic wear, realistic photo quality similar to a fitness website."),
]

os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_image(exercise_name, prompt, retries=3):
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

print(f"Generating {len(EXERCISES)} exercise images...", flush=True)
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
