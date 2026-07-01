# AXON.

> **Future your Performance.**

[![Live Demo](https://img.shields.io/badge/Live-axon--web--beta.vercel.app-E94520?style=for-the-badge)](https://axon-web-beta.vercel.app)
&nbsp;
![Three.js](https://img.shields.io/badge/Three.js-3D%20configurator-0A0A0C?style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-backend-3ECF8E?style=for-the-badge)
![Built with Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code%20agents-8A63D2?style=for-the-badge)

AXON. is an AI-driven future apparel laboratory — a brand that engineers clothing, footwear, and accessories from **biodata** at the threshold of departure. Every garment begins with the body's own signal (movement, force, cadence, breath), captured and translated into engineered structure through AI. Not costume — the real thing: the first apparel you pack for the Moon, the first shoes that touch Mars.

This repository is the **complete brand build** — strategy, product system, commercial film, flagship spatial design, and a live web platform — produced end to end by a team of specialized **Claude Code agents**.

---

## ▸ Live

**→ [axon-web-beta.vercel.app](https://axon-web-beta.vercel.app)** — deployed on Vercel.

The landing site, the DEPARTURE 001 collection, interactive flagship studies (floorplan + lattice structure), and the Nerve 001 product experience — all in the Void + Light design language.

## ▸ Nerve 001 Customizer — the interactive centerpiece

A **Three.js 3D configurator that generates footwear from biodata.** You feed in the body's signal and the shoe is engineered in real time in the browser.

- **Three.js** — real-time 3D configurator in the browser
- **Supabase** — backend for reference shoes and saved configurations
- **Python dev server** (`server.py`) — serves the app and exposes endpoints to list reference shoes, **save generated images**, and proxy image generation

```bash
# Run the customizer locally
cd web/deploy/customize
python3 server.py
# open http://localhost:8000/customize.html
# (configure Supabase in customize/supabase-config.js)
```

```bash
# Serve the main site
cd web/deploy
python3 -m http.server 8000
# open http://localhost:8000
```

## ▸ Built by 7 specialized Claude Code agents

AXON. is produced by a team of agents, **each owning exactly one folder** and reading the shared brand guardrails in [`CLAUDE.md`](CLAUDE.md) before working. Invoke them as slash commands:

| Command | Team | Owns |
|---|---|---|
| `/team-leader` | Team Leader | Oversight, workflow, brand QA |
| `/brand-strategy` | Brand Strategy | [`brand/`](brand/) |
| `/product-design` | Product Design | [`product/`](product/) |
| `/ux-design` | UX Design | [`ux/`](ux/) |
| `/commercial-film` | Commercial Film | [`film/`](film/) |
| `/spatial-design` | Spatial Design | [`spatial/`](spatial/) |
| `/web-platform` | Web Platform | [`web/`](web/) |

**Ground rules:** each team writes only to its own folder; root files (`CLAUDE.md`, `brand_brief.md`) are read-only guardrails; all output is in English. Supporting tools live in `.claude/tools/` (`launch-agents.sh`, image + screenshot scrapers); [`LAUNCH_PROMPT.md`](LAUNCH_PROMPT.md) kicks off a fresh build session. A live [`dashboard.html`](dashboard.html) shows agent-team status, fed by `dashboard_feed.json`.

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

## Product Naming System

Products are organized into engineering tiers (see [`brand/naming_system.md`](brand/naming_system.md)):

- **PROTOCOL** — foundational engineered basics; texture from aggregated anonymized biodata
- **TRANSIT** — performance shells; the architecture between body and environment
- **SIGNAL** — fully biodata-engineered, departure-grade pieces

The first collection — **DEPARTURE 001** — is seven pieces mapped across all three tiers.

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

*AXON. — precise, restrained, engineered at the threshold of departure.*
