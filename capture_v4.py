import asyncio
import os
from playwright.async_api import async_playwright
import time

async def run_verification():
    # Wait for services to be ready
    print("⏳ Waiting for services to be available...")
    time.sleep(5)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        try:
            # 1. Home Page
            print("📸 Verifying Home Page...")
            await page.goto("http://localhost:3000", wait_until="networkidle")
            await page.screenshot(path="/home/jules/verification/screenshots/v4_home.png")

            # 2. Dashboard
            print("📸 Verifying Dashboard...")
            await page.goto("http://localhost:3000/dashboard", wait_until="networkidle")
            await page.screenshot(path="/home/jules/verification/screenshots/v4_dashboard.png")

            # 3. Artist Profile
            print("📸 Verifying Artist Profile...")
            await page.goto("http://localhost:3000/artist/trending_artist_0", wait_until="networkidle")
            await page.screenshot(path="/home/jules/verification/screenshots/v4_artist_profile.png")

            # 4. Market Analytics
            print("📸 Verifying Market Analytics...")
            await page.goto("http://localhost:3000/analytics", wait_until="networkidle")
            await page.screenshot(path="/home/jules/verification/screenshots/v4_analytics.png")

            print("✅ Verification Screenshots Captured!")

        except Exception as e:
            print(f"❌ Verification failed: {e}")
            await page.screenshot(path="/home/jules/verification/screenshots/v4_error.png")
        finally:
            await browser.close()

if __name__ == "__main__":
    if not os.path.exists("/home/jules/verification/screenshots"):
        os.makedirs("/home/jules/verification/screenshots")
    asyncio.run(run_verification())
