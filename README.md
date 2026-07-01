# AXON.

**Future your Performance.**

AXON. is an AI-driven future apparel laboratory — a brand that engineers clothing, footwear, and accessories from **biodata** at the threshold of departure. Every garment begins with the body's own signal (movement, force, cadence, breath), captured and translated into engineered structure through AI. Not costume — the real thing: the first apparel you pack for the Moon, the first shoes that touch Mars.

This repository is the **complete brand build** — strategy, product system, commercial film, flagship spatial design, and the live web platform — produced through a multi-agent Claude Code workflow.

---

## Brand DNA

1. **Biodata Intelligence** — Every piece begins with the body's own data. The garment knows you before you wear it.
2. **Departure Ready** — Engineered for real departure, not a look.
3. **Void + Light Architecture** — Deep darkness (`#0A0A0C`) is the primary environment; light is architectural (rings, portals, edge glow). Signal red-orange (`#E94520`) supplies human warmth at 5% max.
4. **Clinical Poet tone** — Formal, restrained awe. Short sentences. Never hype.
5. **Computational Craft** — Parametric structures, 3D-printed components, generative patterns, visible data.
6. **Singular Solitude** — Single figures in vast dark, runway-scale stages.

**Design tokens** live in [`brand/color_system.css`](brand/color_system.css).
Type: Monument Extended (display) · Neue Montreal (body) · Söhne Mono (technical).

---

## Repository Structure

| Path | Contents |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Project context + brand DNA — **read first**, shared read-only guardrails for every agent |
| [`brand_brief.md`](brand_brief.md) | Full creative brief — vision, audience, values, positioning |
| [`brand/`](brand/) | Brand strategy, visual identity, tone guide, naming system, CSS design tokens |
| [`product/`](product/) | Collection overview + product specs (Transit Shell, Terrain Boot, Mission Kit), biodata spec, materials tech |
| [`ux/`](ux/) | Journey map, biodata experience, spatial + digital UX |
| [`film/`](film/) | Commercial storyboards, shot list, motion spec, generated scene art + Python image-gen scripts |
| [`spatial/`](spatial/) | Flagship retail design — Blender models (`.blend`), renders, HTML layouts, facade/interior references |
| [`moodboard/`](moodboard/) · [`storyboard/`](storyboard/) | Moodboard + storyboard briefs |
| [`web/`](web/) | Brand website (`index.html`, `style.css`, `script.js`) + `web/deploy/` production build |
| [`dashboard.html`](dashboard.html) | Live agent-team status dashboard (fed by `dashboard_feed.json`) |
| [`.claude/`](.claude/) | Slash-command agent definitions + scraping/launch tooling |

---

## The Web Platform (`web/deploy/`)

The deployable site, including interactive experiences:

- **`index.html`** — Landing page
- **`nerve001/`** — Nerve 001 product experience
- **`floorplan/`**, **`structure/`** — Interactive flagship floorplan + lattice structure studies
- **`customize/`** — **Nerve 001 customizer**: a Three.js 3D configurator that generates footwear from biodata, backed by Supabase and a local Python dev server with an image-generation save endpoint.

### Run the customizer locally

```bash
cd web/deploy/customize
python3 server.py
# open http://localhost:8000/customize.html
```

`server.py` serves the app and exposes endpoints for listing reference shoes, saving generated images, and proxying image generation. Configure Supabase in `customize/supabase-config.js`.

### Serve the main site

```bash
cd web/deploy
python3 -m http.server 8000
# open http://localhost:8000
```

---

## Multi-Agent Workflow

AXON. is built by a team of specialized Claude Code agents, each owning one folder and reading the shared brand guardrails in `CLAUDE.md` before working. Invoke them as slash commands:

| Command | Team | Owns |
|---|---|---|
| `/team-leader` | Team Leader | Oversight, workflow, brand QA |
| `/brand-strategy` | Brand Strategy | `brand/` |
| `/product-design` | Product Design | `product/` |
| `/ux-design` | UX Design | `ux/` |
| `/commercial-film` | Commercial Film | `film/` |
| `/spatial-design` | Spatial Design | `spatial/` |
| `/web-platform` | Web Platform | `web/` |

Supporting tools live in `.claude/tools/` (`launch-agents.sh`, image + screenshot scrapers). [`LAUNCH_PROMPT.md`](LAUNCH_PROMPT.md) is the kickoff prompt for a fresh build session.

**Ground rules:** each team writes only to its own folder; root files (`CLAUDE.md`, `brand_brief.md`) are read-only; all file output is in English; `.md` files are living foundations, not ceilings.

---

## Product Naming System

Products are organized into engineering tiers (see [`brand/naming_system.md`](brand/naming_system.md)):

- **PROTOCOL** — foundational engineered basics; texture from aggregated anonymized biodata
- **TRANSIT** — performance shells; the architecture between body and environment
- **SIGNAL** — fully biodata-engineered, departure-grade pieces

The first collection — **DEPARTURE 001** — is seven pieces mapped across all three tiers.

---

*AXON. — precise, restrained, engineered at the threshold of departure.*
