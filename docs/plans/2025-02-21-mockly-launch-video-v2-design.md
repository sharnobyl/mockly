# Mockly Launch Video v2 Design

## Overview

Revised 18-second video with enhanced color cycling, scrolling card showcase, and realistic social media replicas.

## Scene Structure

| Scene | Frames | Duration | Description |
|-------|--------|----------|-------------|
| **1. Intro** | 0-90 | 0-3s | "Introducing Mockly" + badge (unchanged) |
| **2. CardReveal** | 90-180 | 3-6s | Single card with staggered animations (unchanged) |
| **3. Color/Font Cycle** | 180-360 | 6-12s | Card cycles through colors, fonts, with cat images |
| **4. Scrolling Cards** | 360-540 | 12-18s | 20 cards in 4 rows, alternating scroll directions |
| **5. Social Showcase** | 360-510 | 12-17s | Instagram → LinkedIn → Facebook replicas (overlapping) |
| **6. CTA** | 480-540 | 16-18s | Pops up over blurred scrolling cards |

## Scene Details

### Scene 3: Color/Font Cycle (180-360 frames)

**Color sequence (each ~20 frames):**
1. Black (`#000000`) → White text
2. White (`#ffffff`) → Black text
3. Beige (`#eae4d3`) → Dark text
4. Blue (`#2d49b9`) → White text
5. Red (`#c94a4a`) → White text
6. Grey (`#4a4a4a`) → White text
7. Sage green (`#7d8c69`) → White text

**Font cycling:**
- System UI → Georgia (serif) → Syne → DM Sans

**Image:** Each card includes cat image from `https://cataas.com/cat?width=400&height=225`

### Scene 4: Scrolling Cards (360-540 frames)

**Layout:** 4 rows × 5 cards = 20 cards total

**Scroll directions:**
- Row 1 & 3: scroll right continuously
- Row 2 & 4: scroll left continuously

**Card variety:**
- Random color combinations from curated palette
- Different headlines/body text
- Cat images: `https://cataas.com/cat?width=400&height=225&random=[id]`

### Scene 5: Social Media Replicas (360-510 frames)

**Instagram replica:**
- Full Instagram UI: header with logo/search, story row, feed post with Mockly card
- Slides in from right (frames 360-380)
- Visible until frame 430

**LinkedIn replica:**
- Full LinkedIn UI: header with nav, feed post with Mockly card as link preview
- Slides in from right while Instagram slides out left (frames 410-430)
- Visible until frame 470

**Facebook replica:**
- Full Facebook UI: header with nav, feed post with Mockly card
- Slides in from right while LinkedIn slides out left (frames 450-470)
- Visible until frame 510

### Scene 6: CTA (480-540 frames)

- Background: Scrolling cards continue with CSS blur filter
- "Try it free" + mockly.app badge fades in centered
- Mockly logo below

## SocialCard Image Fix

Match the actual app's image positioning:

```css
/* From app's styleSlot function */
width: cardWidth - (inset * 2);  /* e.g., 516 - 20 = 496px */
height: width / aspectRatio;     /* 16:9 = 496 / 1.78 = 279px */
margin: 0 {inset}px {inset}px;   /* 0 10px 10px for bottom */
border-radius: min(16, inset + 2); /* min(16, 12) = 12px */
overflow: hidden;
```

Default values from app:
- `inset: 10`
- `aspectRatio: 16/9`
- Image position: bottom

## Cat Image URLs

Use cataas.com with random parameter to get different images:
- `https://cataas.com/cat?width=400&height=225&random=1`
- `https://cataas.com/cat?width=400&height=225&random=2`
- etc.

## Color Palette for Random Cards

```javascript
const COLORS = [
  { bg: '#000000', text: '#ffffff', name: 'Black' },
  { bg: '#ffffff', text: '#1a1a1a', name: 'White' },
  { bg: '#eae4d3', text: '#2d2d2d', name: 'Beige' },
  { bg: '#2d49b9', text: '#ffffff', name: 'Blue' },
  { bg: '#c94a4a', text: '#ffffff', name: 'Red' },
  { bg: '#4a4a4a', text: '#ffffff', name: 'Grey' },
  { bg: '#7d8c69', text: '#ffffff', name: 'Sage' },
  { bg: '#1a1a2e', text: '#ffffff', name: 'Dark Blue' },
  { bg: '#f5e6d3', text: '#3d3d3d', name: 'Cream' },
  { bg: '#2d8c6e', text: '#ffffff', name: 'Teal' },
];
```

## Fonts Array

```javascript
const FONTS = [
  "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  "Georgia, serif",
  "'Syne', sans-serif",
  "'Courier New', monospace",
];
```

## Files to Modify

1. `src/components/SocialCard.tsx` - Fix image positioning with inset/aspect ratio
2. `src/LaunchVideo/Transformations.tsx` - Rewrite for color/font cycling with cat images
3. `src/LaunchVideo/ScrollingCards.tsx` - New component for 4-row scrolling showcase
4. `src/LaunchVideo/SocialShowcase.tsx` - New component with full platform UI replicas
5. `src/LaunchVideo/CTA.tsx` - Add blur background effect
6. `src/LaunchVideo.tsx` - Update scene structure
