# Mockly Launch Video Redesign

## Overview

A 15-18 second video showcasing Mockly's ability to create platform-optimized social cards. Dark theme matching the actual app UI.

## Color Palette

- **Background:** `#1e1e1e` (app's main bg)
- **Surface:** `#2d2d2d` (panels/controls)
- **Accent:** `#2d49b9` (buttons, verified badge)
- **Text:** `#e0e0e0` (primary), `#8c8c8c` (muted)
- **Card demo:** Black cards with white text (as seen in the app)

## Scene Structure

| Scene | Frames (30fps) | Duration | Description |
|-------|----------------|----------|-------------|
| **1. Intro** | 0-90 | 0-3s | "Introducing Mockly" text reveal, then "by Hot Off The Patent Press" badge fades in below |
| **2. Card Reveal** | 90-180 | 3-6s | Single card fades in (dark card matching app style: black bg, avatar, name, verified, headline, body text) |
| **3. Transformations** | 180-360 | 6-12s | Card demonstrates capabilities: colors shift, text changes, image appears, then **splits into 5 cards** showing Twitter/Instagram/LinkedIn/Story/OG presets side by side |
| **4. Export Showcase** | 360-510 | 12-17s | Cards animate into device mockups (phone showing Instagram feed, desktop showing LinkedIn/Facebook/Reddit posts) |
| **5. CTA** | 510-540 | 17-18s | "Try it free at mockly.app" with logo |

**Total: 540 frames @ 30fps = 18 seconds**

## Scene Details

### Scene 1: Intro (0-90 frames)

- Dark background (#1e1e1e) from start
- "Introducing" fades in first (subtle, muted color)
- "Mockly" appears with spring animation, accent color (#2d49b9) on "ly"
- "by Hot Off The Patent Press" badge fades in below after slight delay
- Clean, minimal, professional

### Scene 2: Card Reveal (90-180 frames)

- Single card fades/springs in from center
- Card matches actual app style:
  - Black background (#000000)
  - White text for name (#ffffff)
  - Gray handle (#999999)
  - Blue verified badge (#499aea - note: this is the tick color, slightly different from accent)
  - Avatar with initials "M"
  - Headline and body text
- Staggered reveal: avatar → name/handle → headline → body

### Scene 3: Transformations (180-360 frames)

Phase 1 - Color Shift (180-240):
- Card background color smoothly transitions (black → dark blue → gradient → back to black)
- Text colors adjust accordingly

Phase 2 - Text Changes (240-280):
- Headline text morphs to different content
- Body text updates
- Shows the customization capability

Phase 3 - Image Appears (280-300):
- Image placeholder fills with an actual image
- Rounded corners appear

Phase 4 - Split to Presets (300-360):
- Center card "duplicates" with spring animation
- 5 cards spread out showing different platform presets:
  - Twitter (516px wide, auto height)
  - Instagram (600x600 square)
  - LinkedIn (700px wide)
  - Story (400x711 tall)
  - OG Image (800x418 wide)
- Labels appear below each card
- Brief moment showing all 5 in a row

### Scene 4: Export Showcase (360-510 frames)

- Cards animate into device mockups:
  - Phone mockup: Instagram-style feed with card embedded as a post
  - Desktop browser mockup: Tab bar visible showing LinkedIn/Facebook/Reddit, card shown as shared link preview
- Smooth transitions between mockups
- Emphasizes "export anywhere" message

### Scene 5: CTA (510-540 frames)

- "Try it free" text appears
- "mockly.app" URL with accent styling
- Small Mockly logo
- Fade out or hold

## Technical Notes

- Use `spring()` for natural, bouncy animations
- Use `interpolate()` for smooth color/value transitions
- Cards in Scene 3 should use `layout="none"` for Sequences to allow absolute positioning
- Device mockups can be SVG-based for crisp scaling
- Font: Syne for headlines, DM Sans for body (matching app)

## Files to Create/Modify

1. `src/LaunchVideo.tsx` - Update scene timing and structure
2. `src/LaunchVideo/Intro.tsx` - New intro scene
3. `src/LaunchVideo/CardReveal.tsx` - Single card with app styling
4. `src/LaunchVideo/Transformations.tsx` - Color/text/image changes + split effect
5. `src/LaunchVideo/ExportShowcase.tsx` - Device mockups with cards
6. `src/LaunchVideo/CTA.tsx` - Update existing CTA
7. `src/Root.tsx` - Update default colors and duration
