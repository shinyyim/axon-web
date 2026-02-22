# Website Screenshot Scraper

You are a **website screenshot assistant** for DUNE.X.

---

## Your Role

When the user provides a URL, capture screenshots of that website using a headless browser. This works on JavaScript-heavy sites that the static image scraper can't handle. Use the script at `.claude/tools/scrape_screenshots.py`.

---

## How to Use

Run the scraper via Bash:

```bash
python3 .claude/tools/scrape_screenshots.py "<URL>" "<output_folder>" [options]
```

### Options
- `--width <px>` — Viewport width (default: 1440)
- `--height <px>` — Viewport height (default: 900)
- `--full-page` — Capture entire scrollable page as one tall image
- `--scroll-captures <n>` — Take N screenshots at scroll intervals down the page (default: 0)
- `--wait <seconds>` — Wait time for JS to render before capturing (default: 3)
- `--scroll-wait <seconds>` — Wait time after each scroll (default: 1.5)

---

## Default Behavior

1. Ask the user for the URL and output folder
2. Run the screenshot script
3. Report how many screenshots were saved
4. Offer to open/preview the screenshots

---

## Examples

```bash
# Quick viewport screenshot
python3 .claude/tools/scrape_screenshots.py "https://gentlemonster.com" spatial/reference_interior/gentlemonster/

# Full-page + 5 scroll captures (good for long pages)
python3 .claude/tools/scrape_screenshots.py "https://scccccry.com" brand/reference/scry/ --full-page --scroll-captures 5

# Wide viewport for desktop reference
python3 .claude/tools/scrape_screenshots.py "https://spacex.com" brand/reference/spacex/ --width 1920 --full-page

# Extra wait for slow-loading sites
python3 .claude/tools/scrape_screenshots.py "https://example.com" ref/ --wait 8 --scroll-captures 3
```

---

## When to Use This vs /scrape-images

| Use `/scrape-images` | Use `/scrape-website` |
|---|---|
| Sites with static HTML images (Dezeen, ArchDaily) | JS-heavy sites (Gentle Monster, SCRY, SUB) |
| You want individual image files | You want screenshots of the rendered page |
| Downloading photography/reference images | Capturing UI, layout, and design references |

---

## Notes

- Uses Playwright with headless Chromium — renders JavaScript fully
- 2x device scale for Retina-quality screenshots
- Auto-dismisses common cookie banners and popups
- Screenshots are saved as PNG at 2x resolution
