# Mockly Launch Video v2 Fixes Design

**Date:** 2025-02-21
**Status:** Approved

## Problem Statement

After reviewing the video on both desktop and mobile, several issues were identified:
1. Scene 2→3 transition feels forced (hard cut, no visual continuity)
2. Cards in SocialShowcase (Instagram/LinkedIn/Facebook) are poorly positioned
3. LinkedIn should be desktop version, not mobile
4. ScrollingCards are too thin/cramped
5. All elements appear too small on mobile devices

## Design Changes

### Global Change: Scale Up 2x

All card components and UI elements scaled up ~2x for better mobile visibility:
- SocialCard widths: 400-600px range (up from 200-400px)
- SocialShowcase containers: 720-900px (up from 360-480px)
- Font sizes: Proportionally larger throughout

### Scene 3: Transformations Transition (frames 180-360)

**New animation sequence:**
- Frames 180-210 (1s): 8 cards fly in simultaneously from 8 directions (top, bottom, left, right, 4 corners) with spring animations
- Frames 210-240 (1s): Cards settle into a loose grid pattern around the center
- Frames 240-360 (4s): Central card begins color/font cycling while surrounding cards fade out

**Card size:** `width={500}` (up from 420)

### Scene 4: SocialShowcase (frames 360-510)

**Platforms:**
- **Instagram (mobile):** Container `width={540}`, card `width={380}`, mobile UI with stories row, feed post, bottom nav
- **LinkedIn (desktop):** Container `width={900}`, card `width={500}`, widescreen layout with left sidebar, main feed area
- **Facebook:** Removed entirely

**Animation:** Instagram slides in first, then LinkedIn slides in from right as Instagram exits left.

### Scene 5: ScrollingCards (frames 360-540)

**Changes:**
- 2 rows instead of 4 (top row scrolls right, bottom row scrolls left)
- Card size: `width={400}`, `scale={1}` (no scaling)
- 10 unique cards per row for visual variety

### Scene 6: CTA (frames 480-540)

**Changes:**
- "Try it free" text: `fontSize={72}` (up from 48)
- URL badge: scaled up proportionally
- Blur effect on 2-row ScrollingCards background

## File Changes

| File | Change |
|------|--------|
| `Transformations.tsx` | Rewrite with 8-direction card entrance animation |
| `SocialShowcase.tsx` | Redesign LinkedIn as desktop, remove Facebook, fix card sizing |
| `ScrollingCards.tsx` | Reduce to 2 rows, increase card width to 400, remove scale |
| `CTA.tsx` | Increase font sizes for mobile visibility |

## Scene Timeline

| Scene | Frames | Duration | Component |
|-------|--------|----------|-----------|
| Intro | 0-90 | 3s | Intro |
| Card Reveal | 90-180 | 3s | CardReveal |
| Transformations | 180-360 | 6s | Transformations (new animation) |
| ScrollingCards | 360-540 | 6s | ScrollingCards (2 rows) |
| SocialShowcase | 360-510 | 5s | SocialShowcase (Instagram + LinkedIn desktop) |
| CTA | 480-540 | 2s | CTA over blurred ScrollingCards |
