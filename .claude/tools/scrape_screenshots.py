#!/usr/bin/env python3
"""
DUNE.X Website Screenshot Scraper
Captures full-page and viewport screenshots of websites using a headless browser.
Works on JavaScript-heavy sites (Gentle Monster, SCRY, etc.)

Usage:
    python3 .claude/tools/scrape_screenshots.py <url> [output_folder] [options]

Examples:
    python3 .claude/tools/scrape_screenshots.py "https://gentlemonster.com" spatial/reference/
    python3 .claude/tools/scrape_screenshots.py "https://example.com" ref/ --full-page --scroll-captures 5
    python3 .claude/tools/scrape_screenshots.py "https://example.com" ref/ --width 1920 --wait 5
"""

import argparse
import sys
import time
from pathlib import Path
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright


def sanitize_name(url: str) -> str:
    """Create a clean base name from URL."""
    parsed = urlparse(url)
    name = parsed.netloc.replace("www.", "").replace(".", "_")
    path = parsed.path.strip("/").replace("/", "_")
    if path:
        name += f"_{path}"
    # Clean up
    name = name[:80]
    return name


def capture_screenshots(
    url: str,
    output: Path,
    width: int = 1440,
    height: int = 900,
    full_page: bool = False,
    scroll_captures: int = 0,
    wait: float = 3.0,
    scroll_wait: float = 1.5,
):
    """Capture screenshots of a URL."""

    output.mkdir(parents=True, exist_ok=True)
    base_name = sanitize_name(url)
    saved = []

    print(f"\n  Launching headless browser...")
    print(f"  URL: {url}")
    print(f"  Viewport: {width}x{height}")
    print()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": width, "height": height},
            device_scale_factor=2,
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        )
        page = context.new_page()

        # Navigate
        try:
            page.goto(url, wait_until="networkidle", timeout=30000)
        except Exception:
            try:
                page.goto(url, wait_until="load", timeout=30000)
            except Exception as e:
                print(f"  Error loading page: {e}")
                browser.close()
                return saved

        # Wait for JS content to render
        print(f"  Waiting {wait}s for content to render...")
        time.sleep(wait)

        # Dismiss cookie banners / popups
        for selector in [
            "button:has-text('Accept')",
            "button:has-text('OK')",
            "button:has-text('Close')",
            "button:has-text('Got it')",
            "[class*='cookie'] button",
            "[class*='popup'] button",
            "[class*='modal'] button[class*='close']",
        ]:
            try:
                el = page.query_selector(selector)
                if el and el.is_visible():
                    el.click()
                    time.sleep(0.5)
                    break
            except Exception:
                pass

        # 1. Viewport screenshot (what you see on load)
        vp_path = output / f"{base_name}_viewport.png"
        page.screenshot(path=str(vp_path))
        size_kb = vp_path.stat().st_size / 1024
        print(f"  [1] Viewport screenshot saved ({size_kb:.0f}KB)")
        saved.append(vp_path)

        # 2. Full-page screenshot
        if full_page:
            fp_path = output / f"{base_name}_fullpage.png"
            page.screenshot(path=str(fp_path), full_page=True)
            size_kb = fp_path.stat().st_size / 1024
            print(f"  [2] Full-page screenshot saved ({size_kb:.0f}KB)")
            saved.append(fp_path)

        # 3. Scroll captures — screenshot at intervals down the page
        if scroll_captures > 0:
            total_height = page.evaluate("document.body.scrollHeight")
            scroll_step = total_height / (scroll_captures + 1)

            for i in range(1, scroll_captures + 1):
                scroll_y = int(scroll_step * i)
                page.evaluate(f"window.scrollTo(0, {scroll_y})")
                time.sleep(scroll_wait)

                sc_path = output / f"{base_name}_scroll_{i:02d}.png"
                page.screenshot(path=str(sc_path))
                size_kb = sc_path.stat().st_size / 1024
                pct = int((scroll_y / total_height) * 100)
                print(f"  [{i+2}] Scroll {pct}% screenshot saved ({size_kb:.0f}KB)")
                saved.append(sc_path)

        browser.close()

    return saved


def main():
    parser = argparse.ArgumentParser(description="Capture website screenshots with headless browser")
    parser.add_argument("url", help="URL to screenshot")
    parser.add_argument("output", nargs="?", default="screenshots/", help="Output folder (default: screenshots/)")
    parser.add_argument("--width", type=int, default=1440, help="Viewport width (default: 1440)")
    parser.add_argument("--height", type=int, default=900, help="Viewport height (default: 900)")
    parser.add_argument("--full-page", action="store_true", help="Capture full-page screenshot (entire scrollable area)")
    parser.add_argument("--scroll-captures", type=int, default=0, help="Number of scroll-position screenshots (default: 0)")
    parser.add_argument("--wait", type=float, default=3.0, help="Seconds to wait for JS to render (default: 3)")
    parser.add_argument("--scroll-wait", type=float, default=1.5, help="Seconds to wait after each scroll (default: 1.5)")

    args = parser.parse_args()
    output = Path(args.output)

    saved = capture_screenshots(
        url=args.url,
        output=output,
        width=args.width,
        height=args.height,
        full_page=args.full_page,
        scroll_captures=args.scroll_captures,
        wait=args.wait,
        scroll_wait=args.scroll_wait,
    )

    print(f"\n  Done. Saved {len(saved)} screenshots to {output.resolve()}\n")


if __name__ == "__main__":
    main()
