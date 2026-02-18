# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mockly is a browser-based social card creator that produces Twitter/X-style social media cards. The entire application is a single HTML file with no build step, dependencies, or server.

## Running the Application

Open `mockly.html` directly in a browser. No server required.

```bash
open mockly.html
```

## Architecture

**Single-file application**: All HTML, CSS, and JavaScript live in `mockly.html`. There is no build system, bundler, or package.json.

**State management**: Global JavaScript variables in the single `<script>` tag:
- `avatarDataURL` / `cardImgDataURL` — Base64 data URLs for uploaded images
- `imgPosition` — One of: `"bottom"`, `"top"`, `"inline"`
- `imgRatio` — One of: `"16/9"`, `"4/3"`, `"1/1"`, `"9/16"`

All other settings are read directly from form inputs on each `liveUpdate()` call.

**Export pipeline**: Uses `html-to-image` library (CDN) at 4× pixel ratio for retina-quality exports. Google Fonts CSS is inlined at runtime to avoid CORS issues with the export library.

## Key Functions

| Function | Purpose |
|----------|---------|
| `liveUpdate()` | Re-renders the card preview from all form inputs |
| `exportCard(fmt)` | Exports card as PNG or JPEG download |
| `copyCard()` | Copies card to clipboard via Clipboard API |
| `makeInitialsAvatar()` | Generates canvas-based fallback avatar from initials |

## Platform Presets

Defined in `PLATFORM_PRESETS` object: Twitter (516×auto), Instagram (600×600), LinkedIn (700×auto), Story (400×711), OG Image (800×418).
