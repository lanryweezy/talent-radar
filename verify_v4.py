import asyncio
import os
from playwright.async_api import async_playwright
import time
import subprocess

async def run_verification():
    # 1. Kill any existing processes
    print("🧹 Cleaning up old processes...")
    subprocess.run("kill $(lsof -t -i :3000) 2>/dev/null || true", shell=True)
    subprocess.run("kill $(lsof -t -i :8000) 2>/dev/null || true", shell=True)
    time.sleep(2)

    # 2. Start Backend & Frontend
    print("🚀 Starting Backend...")
    backend_proc = subprocess.Popen(
        ["python3", "backend/main.py"],
        env={**os.environ, "PORT": "8000"},
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    print("🚀 Starting Frontend...")
    frontend_proc = subprocess.Popen(
        ["npm", "run", "dev"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    # Wait for services to be ready
    print("⏳ Waiting for services to initialize...")
    time.sleep(15)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        try:
            # 1. Home Page - Check the "Science of Global Discovery" headline
            print("📸 Verifying Home Page...")
            await page.goto("http://localhost:3000")
            await page.wait_for_selector("text=The Science of Global Discovery")
            await page.screenshot(path="/home/jules/verification/screenshots/v4_home.png")

            # 2. Dashboard - Check "Market Intelligence" and stats
            print("📸 Verifying Dashboard...")
            await page.goto("http://localhost:3000/dashboard")
            await page.wait_for_selector("text=Market Intelligence")
            # Wait for AI predictions to load
            await page.wait_for_selector("text=AI Prediction Engine")
            await page.screenshot(path="/home/jules/verification/screenshots/v4_dashboard.png")

            # 3. Artist Profile - Check Archetypes and Talent Score
            print("📸 Verifying Artist Profile...")
            # Navigate to the first artist in the trending list or mock one
            await page.goto("http://localhost:3000/artist/trending_artist_0")
            await page.wait_for_selector("text=Strategic Intel")
            await page.wait_for_selector("text=Talent Score")
            await page.screenshot(path="/home/jules/verification/screenshots/v4_artist_profile.png")

            # 4. Market Analytics - Check Heatmap
            print("📸 Verifying Market Analytics...")
            await page.goto("http://localhost:3000/analytics")
            await page.wait_for_selector("text=Regional Cultural Heat")
            await page.screenshot(path="/home/jules/verification/screenshots/v4_analytics.png")

            print("✅ Verification Successful!")

        except Exception as e:
            print(f"❌ Verification failed: {e}")
            await page.screenshot(path="/home/jules/verification/screenshots/v4_error.png")
        finally:
            await browser.close()
            backend_proc.kill()
            frontend_proc.kill()

if __name__ == "__main__":
    if not os.path.exists("/home/jules/verification/screenshots"):
        os.makedirs("/home/jules/verification/screenshots")
    asyncio.run(run_verification())
