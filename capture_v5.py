import asyncio
import os
from playwright.async_api import async_playwright
import time

async def capture_v5():
    # Services are already running in background
    print("📸 Starting Capture...")

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        try:
            # 1. Home
            print("Home...")
            await page.goto("http://localhost:3000", wait_until="load")
            await page.screenshot(path="/home/jules/verification/screenshots/v5_home_final.png")

            # 2. Dashboard
            print("Dashboard...")
            await page.goto("http://localhost:3000/dashboard", wait_until="load")
            # Wait for any text from our cards
            await page.wait_for_selector("text=Intelligence Base", timeout=15000)
            await page.screenshot(path="/home/jules/verification/screenshots/v5_dashboard_final.png")

            # 3. Artist Profile
            print("Artist Profile Data...")
            await page.goto("http://localhost:3000/artist/trending_artist_0", wait_until="load")
            # Wait for tab content
            await page.wait_for_selector("text=Executive Summary", timeout=15000)
            await page.screenshot(path="/home/jules/verification/screenshots/v5_artist_profile_final.png")

            # 4. Analytics
            print("Analytics Hub...")
            await page.goto("http://localhost:3000/analytics", wait_until="load")
            await page.wait_for_selector("text=Regional Cultural Heat", timeout=15000)
            await page.screenshot(path="/home/jules/verification/screenshots/v5_analytics_hub_final.png")

            print("✅ Captured Successfully!")

        except Exception as e:
            print(f"❌ Capture failed: {e}")
            await page.screenshot(path="/home/jules/verification/screenshots/v5_capture_error.png")
        finally:
            await browser.close()

if __name__ == "__main__":
    if not os.path.exists("/home/jules/verification/screenshots"):
        os.makedirs("/home/jules/verification/screenshots")
    asyncio.run(capture_v5())
