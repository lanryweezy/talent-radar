import asyncio
import os
from playwright.async_api import async_playwright
import time
import subprocess

async def run_verification():
    # Kill any existing processes
    print("🧹 Cleaning up old processes...")
    subprocess.run("kill $(lsof -t -i :3000) 2>/dev/null || true", shell=True)
    subprocess.run("kill $(lsof -t -i :8000) 2>/dev/null || true", shell=True)
    time.sleep(2)

    # Start Backend & Frontend
    print("🚀 Starting Backend...")
    # Use standard PYTHONPATH to find backend modules
    env = {**os.environ, "PORT": "8000", "PYTHONPATH": "backend"}
    backend_proc = subprocess.Popen(
        ["python3", "backend/main.py"],
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    print("🚀 Starting Frontend...")
    frontend_proc = subprocess.Popen(
        ["npm", "run", "dev", "--", "-p", "3000"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    # Wait for services to be ready - give more time for compilation
    print("⏳ Waiting for services to initialize (30s)...")
    time.sleep(30)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        try:
            # 1. Home Page
            print("📸 Verifying Home Page...")
            await page.goto("http://localhost:3000", wait_until="networkidle", timeout=60000)
            await page.wait_for_selector("text=Intelligence Engine", timeout=15000)
            await page.screenshot(path="/home/jules/verification/screenshots/v5_home.png")

            # 2. Dashboard
            print("📸 Verifying Dashboard...")
            await page.goto("http://localhost:3000/dashboard", wait_until="networkidle", timeout=60000)
            await page.wait_for_selector("text=Market Intelligence", timeout=15000)
            # Ensure stats cards are rendered
            await page.wait_for_selector("text=Intelligence Base", timeout=15000)
            await page.screenshot(path="/home/jules/verification/screenshots/v5_dashboard.png")

            # 3. Artist Profile - Wait for DATA, not just loader
            print("📸 Verifying Artist Profile Data...")
            await page.goto("http://localhost:3000/artist/trending_artist_0", wait_until="networkidle", timeout=60000)
            # This is key: Wait for a text that only appears AFTER the loader
            await page.wait_for_selector("text=Executive Summary", timeout=30000)
            await page.wait_for_selector("text=Talent Score", timeout=15000)
            # Switch tabs and capture
            await page.click("text=Growth Engine")
            await page.wait_for_selector("text=Acceleration Delta", timeout=15000)
            await page.screenshot(path="/home/jules/verification/screenshots/v5_artist_growth.png")

            await page.click("text=Future Velocity")
            await page.wait_for_selector("text=Breakout Probability", timeout=15000)
            await page.screenshot(path="/home/jules/verification/screenshots/v5_artist_prediction.png")

            # 4. Market Analytics
            print("📸 Verifying Market Analytics Hub...")
            await page.goto("http://localhost:3000/analytics", wait_until="networkidle", timeout=60000)
            await page.wait_for_selector("text=Regional Cultural Heat", timeout=15000)
            await page.wait_for_selector("text=Nigeria", timeout=15000)
            await page.screenshot(path="/home/jules/verification/screenshots/v5_analytics_hub.png")

            print("✅ High-Fidelity Verification Successful!")

        except Exception as e:
            print(f"❌ Verification failed: {e}")
            await page.screenshot(path="/home/jules/verification/screenshots/v5_error.png")
            # Try to capture console logs if possible
        finally:
            await browser.close()
            backend_proc.kill()
            frontend_proc.kill()

if __name__ == "__main__":
    if not os.path.exists("/home/jules/verification/screenshots"):
        os.makedirs("/home/jules/verification/screenshots")
    asyncio.run(run_verification())
