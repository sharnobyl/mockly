# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

This is a Remotion project for creating Mockly's launch video. Mockly is a browser-based social card creator that produces Twitter/X-style social media cards. The main app lives at `../index.html`.

## Running the Project

```bash
npm run dev      # Start Remotion studio at localhost:3000
npm run render   # Render video to out/mockly-launch.mp4
```

## Architecture

**Remotion**: React framework for programmatic video creation. Components render at specific frames, animations use `spring()` and `interpolate()` from the `remotion` package.

**Key concepts:**
- `useCurrentFrame()` - Get current frame number
- `useVideoConfig()` - Get fps, duration, dimensions
- `spring()` - Physics-based animations
- `interpolate()` - Map frame ranges to values
- `<Sequence>` - Shift time for child components
- `<AbsoluteFill>` - Full-screen positioned container

## Video Structure

**Main composition:** `LaunchVideo` (420 frames @ 30fps = 14 seconds)

| Scene | Frames | Time | Component |
|-------|--------|------|-----------|
| Logo reveal | 0-90 | 0-3s | `Logo.tsx` |
| Tagline | 60-150 | 2-5s | `Tagline.tsx` |
| Card demo | 150-270 | 5-9s | `CardDemo.tsx` |
| Features | 270-360 | 9-12s | `Features.tsx` |
| CTA | 360-420 | 12-14s | `CTA.tsx` |

## Brand Colors

- **Primary:** `#1a1a2e` (dark blue-black)
- **Accent:** `#499aea` (bright blue - verification tick color)
- **Background:** `#ffffff` (white)

## File Structure

```
src/
├── Root.tsx           # Composition registration
├── LaunchVideo.tsx    # Main video component with scene sequencing
├── LaunchVideo/       # Scene components
│   ├── Logo.tsx       # Animated logo icon + text
│   ├── Tagline.tsx    # "Create beautiful social cards in seconds"
│   ├── CardDemo.tsx   # Animated card being built element-by-element
│   ├── Features.tsx   # 4-feature grid with staggered entrance
│   └── CTA.tsx        # "Try it now" with mockly.app
└── index.ts           # Entry point
```

## Common Tasks

**Adjust timing:** Edit frame numbers in `LaunchVideo.tsx` Sequence components

**Change colors:** Update `defaultProps` in `Root.tsx` or pass props to individual components

**Add new scene:** Create component in `LaunchVideo/`, add Sequence in `LaunchVideo.tsx`

**Export for social:** Change width/height in Root.tsx (e.g., 1080x1920 for Stories/Reels)

## Mockly App Reference

The actual Mockly app is a single HTML file (`../index.html`) with:
- Avatar upload
- Name/handle/title/body text inputs
- Image upload with position/ratio options
- Platform presets (Twitter, Instagram, LinkedIn, Story, OG)
- Export as PNG/JPEG or copy to clipboard
