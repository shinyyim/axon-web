#!/usr/bin/env python3
"""
DUNE.X Image Scraper
Scrapes images from a web page and saves them to a local folder.

Usage:
    python tools/scrape_images.py <url> [output_folder] [--min-size 200] [--limit 50] [--ext jpg,png,webp]

Examples:
    python tools/scrape_images.py "https://example.com/gallery" film/reference/
    python tools/scrape_images.py "https://example.com" spatial/reference/ --min-size 400 --limit 20
    python tools/scrape_images.py "https://example.com" --ext jpg,png
"""

import argparse
import os
import re
import sys
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote

import requests
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO


HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}


def get_image_urls(url: str) -> list[dict]:
    """Scrape all image URLs from a web page."""
    print(f"\n  Fetching page: {url}")

    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"  Error fetching page: {e}")
        sys.exit(1)

    soup = BeautifulSoup(resp.text, "html.parser")
    images = []
    seen = set()

    # 1. <img> tags — src and srcset
    for img in soup.find_all("img"):
        for attr in ("src", "data-src", "data-lazy-src", "data-original"):
            src = img.get(attr)
            if src:
                full = urljoin(url, src)
                if full not in seen:
                    seen.add(full)
                    alt = img.get("alt", "")
                    images.append({"url": full, "alt": alt})

        # srcset parsing
        srcset = img.get("srcset", "") or img.get("data-srcset", "")
        if srcset:
            for entry in srcset.split(","):
                parts = entry.strip().split()
                if parts:
                    full = urljoin(url, parts[0])
                    if full not in seen:
                        seen.add(full)
                        images.append({"url": full, "alt": img.get("alt", "")})

    # 2. <source> tags (inside <picture>)
    for source in soup.find_all("source"):
        srcset = source.get("srcset", "")
        if srcset:
            for entry in srcset.split(","):
                parts = entry.strip().split()
                if parts:
                    full = urljoin(url, parts[0])
                    if full not in seen:
                        seen.add(full)
                        images.append({"url": full, "alt": ""})

    # 3. Background images in inline styles
    style_pattern = re.compile(r'url\(["\']?(.*?)["\']?\)')
    for tag in soup.find_all(style=True):
        for match in style_pattern.findall(tag["style"]):
            full = urljoin(url, match)
            if full not in seen and any(ext in full.lower() for ext in (".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif")):
                seen.add(full)
                images.append({"url": full, "alt": ""})

    # 4. <a> tags linking directly to images
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if any(ext in href.lower() for ext in (".jpg", ".jpeg", ".png", ".webp", ".avif")):
            full = urljoin(url, href)
            if full not in seen:
                seen.add(full)
                images.append({"url": full, "alt": a.get_text(strip=True)[:60]})

    # 5. Open Graph and meta images
    for meta in soup.find_all("meta"):
        content = meta.get("content", "")
        prop = meta.get("property", "") or meta.get("name", "")
        if "image" in prop.lower() and content:
            full = urljoin(url, content)
            if full not in seen:
                seen.add(full)
                images.append({"url": full, "alt": f"meta:{prop}"})

    return images


def filter_images(images: list[dict], extensions: list[str]) -> list[dict]:
    """Filter images by file extension."""
    if not extensions:
        return images

    filtered = []
    for img in images:
        parsed = urlparse(img["url"])
        path = unquote(parsed.path).lower()
        if any(path.endswith(f".{ext}") for ext in extensions):
            filtered.append(img)
    return filtered


def download_image(url: str, output_path: Path, min_size: int) -> bool:
    """Download a single image. Returns True if saved successfully."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15, stream=True)
        resp.raise_for_status()

        content_type = resp.headers.get("content-type", "")
        if "image" not in content_type and not any(ext in url.lower() for ext in (".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif")):
            return False

        data = resp.content

        # Check image dimensions
        try:
            img = Image.open(BytesIO(data))
            w, h = img.size
            if w < min_size and h < min_size:
                return False
        except Exception:
            pass  # If PIL can't read it, still save it

        output_path.write_bytes(data)
        return True

    except Exception:
        return False


def sanitize_filename(url: str, index: int) -> str:
    """Create a clean filename from URL."""
    parsed = urlparse(url)
    path = unquote(parsed.path)
    name = Path(path).name

    # Clean up the name
    name = re.sub(r'[^\w\-_.]', '_', name)

    if not name or name == "_" or len(name) > 120:
        ext = Path(path).suffix or ".jpg"
        name = f"image_{index:03d}{ext}"

    return name


def main():
    parser = argparse.ArgumentParser(description="Scrape images from a web page")
    parser.add_argument("url", help="URL of the page to scrape")
    parser.add_argument("output", nargs="?", default="scraped_images/", help="Output folder (default: scraped_images/)")
    parser.add_argument("--min-size", type=int, default=200, help="Minimum image dimension in px (default: 200)")
    parser.add_argument("--limit", type=int, default=50, help="Max images to download (default: 50)")
    parser.add_argument("--ext", type=str, default="", help="Filter by extension, comma-separated (e.g. jpg,png,webp)")
    parser.add_argument("--delay", type=float, default=0.3, help="Delay between downloads in seconds (default: 0.3)")

    args = parser.parse_args()

    output = Path(args.output)
    output.mkdir(parents=True, exist_ok=True)

    extensions = [e.strip().lower().lstrip(".") for e in args.ext.split(",") if e.strip()] if args.ext else []

    # Step 1: Find images
    images = get_image_urls(args.url)
    print(f"  Found {len(images)} image URLs on page")

    # Step 2: Filter by extension
    if extensions:
        images = filter_images(images, extensions)
        print(f"  After extension filter ({', '.join(extensions)}): {len(images)}")

    # Step 3: Apply limit
    images = images[:args.limit]

    # Step 4: Download
    saved = 0
    skipped = 0

    print(f"\n  Downloading up to {len(images)} images to {output}/\n")

    for i, img_info in enumerate(images):
        url = img_info["url"]
        filename = sanitize_filename(url, i)
        filepath = output / filename

        # Skip if already exists
        if filepath.exists():
            print(f"  [{i+1:3d}] SKIP (exists) {filename}")
            skipped += 1
            continue

        success = download_image(url, filepath, args.min_size)

        if success:
            saved += 1
            size_kb = filepath.stat().st_size / 1024
            print(f"  [{i+1:3d}] OK   {filename} ({size_kb:.0f}KB)")
        else:
            print(f"  [{i+1:3d}] SKIP (too small or failed) {Path(urlparse(url).path).name[:50]}")

        time.sleep(args.delay)

    print(f"\n  Done. Saved {saved} images, skipped {skipped + len(images) - saved - skipped}.")
    print(f"  Output: {output.resolve()}\n")


if __name__ == "__main__":
    main()
