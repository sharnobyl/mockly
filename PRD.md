# Mockly — Product Requirements Document

**Version:** 1.0
**Date:** February 2026
**Status:** In Development
**Platform:** Web — single HTML file, no dependencies

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Goals & Non-Goals](#2-goals--non-goals)
3. [User Stories](#3-user-stories)
4. [Feature Specifications](#4-feature-specifications)
5. [Export & Rendering](#5-export--rendering)
6. [Known Issues & Resolutions](#6-known-issues--resolutions)
7. [Technical Architecture](#7-technical-architecture)
8. [UI Layout](#8-ui-layout)
9. [Acceptance Criteria](#9-acceptance-criteria)
10. [Future Considerations](#10-future-considerations)
11. [Glossary](#appendix-glossary)

---

## 1. Product Overview

Mockly is a browser-based social card creator that enables users to design, customise, and export styled social media cards that mimic the visual language of Twitter/X posts. The tool runs entirely as a single HTML file with no server, no backend, and no external dependencies at runtime — making it trivially distributable and portable.

The core value proposition is speed and fidelity: a user should be able to go from a blank card to a pixel-perfect, export-ready social image in under two minutes, without needing design skills or access to tools like Figma or Canva.

---

## 2. Goals & Non-Goals

### 2.1 Goals

- Enable non-designers to produce professional-looking social cards that match the visual style of Twitter/X posts.
- Support export in multiple formats (PNG, JPEG, clipboard) suitable for direct publishing.
- Give power users fine-grained control over sizing, typography, layout, and image treatment.
- Ensure that what is seen in the live preview is exactly what gets exported — pixel-for-pixel fidelity.
- Keep the entire tool self-contained in a single HTML file with no build step, no npm install, and no runtime server.

### 2.2 Non-Goals

- Animation or video export.
- Multi-card templates or batch generation.
- Cloud save, user accounts, or sharing links.
- Mobile-first editing UI (desktop browser is the primary target).
- Support for platforms other than Twitter/X in visual language (though size presets exist for others).

---

## 3. User Stories

| # | As a... | I want to... | So that... | Priority |
|---|---------|-------------|------------|----------|
| US-01 | Content creator | Customise the name, handle, and avatar | The card looks like it came from my account | Must Have |
| US-02 | Content creator | Write a bold headline and multi-paragraph body text | I can convey a full story in one image | Must Have |
| US-03 | Content creator | Upload a card image and control where it appears | The card looks rich and visual like a real tweet | Must Have |
| US-04 | Content creator | Download the card as a PNG or JPEG | I can post it directly to social media | Must Have |
| US-05 | Content creator | Copy the card to my clipboard | I can paste it directly into tools like Slack or email | Must Have |
| US-06 | Power user | Control the width and height of the card | I can target different platform dimensions | Must Have |
| US-07 | Power user | Select a platform preset (Twitter, Instagram, LinkedIn, etc.) | I don't have to manually enter pixel dimensions | Must Have |
| US-08 | Power user | Choose the image position — top, bottom, or inline | The card layout matches what I have in mind | Must Have |
| US-09 | Power user | Set the image aspect ratio (16:9, 4:3, 1:1, 9:16) | The image crop matches the platform convention | Must Have |
| US-10 | Power user | Toggle rounded corners on the image and control the inset depth | The image looks embedded like a tweet card rather than flush | Must Have |
| US-11 | Power user | Change the background and text colour | I can match my brand or create visual contrast | Must Have |
| US-12 | Power user | Choose a font family | The card has the right typographic tone | Should Have |
| US-13 | Power user | Control the card corner radius | I can make the card look sharp or pill-shaped | Should Have |
| US-14 | Any user | See a live preview that exactly matches the export | I'm not surprised when the downloaded image differs | Must Have |
| US-15 | Any user | Upload my own avatar photo | The card uses my real profile image | Must Have |
| US-16 | Any user | See an initials-based avatar as a fallback | The card still looks complete without a photo upload | Should Have |
| US-17 | Any user | Toggle the Twitter verified badge on/off and pick blue or gold | I can match the verified status I want to portray | Should Have |

---

## 4. Feature Specifications

### 4.1 Profile Section

The profile section sits at the top of every card and contains the avatar, display name, handle, and verified badge. It mirrors the visual layout of a Twitter/X profile header.

#### 4.1.1 Avatar

- User can upload any image file (PNG, JPG, GIF, WebP) from their device.
- Image is displayed as a 40×40px circle with cover-crop fit.
- If no image is uploaded, a fallback avatar is automatically generated using the user's initials, drawn on a canvas using the current background and text colours.
- Once uploaded, the button label changes to show the filename with a green confirmation tick.

#### 4.1.2 Display Name

- Free-text input. Updates the card in real time.
- Rendered bold at 14.5px in the selected font.

#### 4.1.3 Handle

- Free-text input. Should conventionally begin with `@`.
- Rendered at 60% opacity below the display name.

#### 4.1.4 Verified Badge

- Three states: **Blue** (Twitter standard), **Gold** (Twitter organisations/legacy), **None**.
- Rendered as an SVG circle with a checkmark, sized to 16×16px, positioned inline with the display name.

---

### 4.2 Content Section

#### 4.2.1 Headline

- Single-line text input. Displayed as bold 18px text at the top of the card body.
- Long headlines wrap across multiple lines with a 1.3 line-height.

#### 4.2.2 Body Text

- Multi-line textarea. Each newline creates a separate paragraph.
- Paragraphs render at 14.5px, 1.55 line-height, 88% opacity.
- Empty lines are ignored — only non-empty lines produce paragraphs.

---

### 4.3 Card Image

#### 4.3.1 Upload

- User uploads any image file from their device via a dashed-border upload button.
- Image is stored as a data URL in memory. No file is sent to a server.
- Button label updates on upload to confirm the filename.

#### 4.3.2 Position

| Option | Behaviour |
|--------|-----------|
| **Bottom** (default) | Image appears below the text content, flush with or inset from the card bottom |
| **Top** | Image appears above the text content, flush with or inset from the card top |
| **Inline** | Image appears between the body text and the bottom of the card-inner padding area |

#### 4.3.3 Aspect Ratio

| Preset | Ratio | Use Case |
|--------|-------|----------|
| 16:9 | 1.78 | Landscape banner |
| 4:3 | 1.33 | Standard |
| 1:1 | 1.00 | Square |
| 9:16 | 0.56 | Portrait / Story |

The image height is computed from the active slot width divided by the selected ratio. Cover-crop is applied — the image always fills the slot with no letterboxing or pillarboxing.

#### 4.3.4 Rounded Corners

- When enabled, the image slot gets a `border-radius` that scales proportionally with the inset value.
- When disabled, the image is flush with the slot edges (square corners).

#### 4.3.5 Image Inset

A slider from 0 to 24px controls how deeply the image is set in from the card edges.

| Value | Effect |
|-------|--------|
| 0px | Image bleeds edge-to-edge — no margin |
| 10px (default) | Balanced inset, natural on most cards |
| 24px | Deeply embedded, resembling a Twitter link card preview |

The inset applies as margin on the sides and top/bottom depending on image position. Corner radius of the image scales up with inset to remain visually proportional.

> **Note:** The inset slider is only visually meaningful when rounded corners are enabled. At inset 0 with rounded corners off, the image is indistinguishable from a flush image.

---

### 4.4 Canvas Size & Platform Presets

#### 4.4.1 Manual Size Controls

- **Width slider:** 300–900px. Controls the card preview width directly.
- **Height slider:** 0–900px. When set to 0, the card auto-sizes to fit its content. When set to any positive value, the card is fixed at that height and overflowing content is clipped.
- Both dimensions are shown numerically alongside their sliders.

#### 4.4.2 Platform Presets

| Preset | Width | Height | Use Case |
|--------|-------|--------|----------|
| Twitter/X | 516px | Auto | Standard tweet image card |
| Instagram | 600px | 600px | Square post format |
| LinkedIn | 700px | Auto | Article/post image |
| Story | 400px | 711px | Instagram/TikTok 9:16 story |
| OG Image | 800px | 418px | Open Graph meta image (~1.91:1) |

> **Note:** Manually adjusting the sliders after selecting a preset deselects the preset button.

---

### 4.5 Style Controls

| Control | Type | Effect |
|---------|------|--------|
| Background Colour | Colour picker | Applies to the entire card background |
| Text Colour | Colour picker | Applies to all text and the initials avatar |
| Font Family | Dropdown | System UI, Georgia, Courier New, Syne, DM Sans — applied card-wide |
| Corner Radius | Slider 0–40px | Controls the card's outer `border-radius` |

---

## 5. Export & Rendering

### 5.1 Export Formats

| Format | Trigger | Quality | Notes |
|--------|---------|---------|-------|
| PNG | Download PNG button | Lossless | Best for text-heavy cards; larger file size |
| JPEG | Download JPEG button | 92% | Smaller file; slight compression artefacts on text edges |
| Clipboard | Copy to Clipboard button | PNG (lossless) | Uses Clipboard API; requires modern browser (Chrome/Edge). Shows toast on success or failure. |

### 5.2 Rendering Architecture

Export fidelity is the single most critical technical constraint of this product. The approach must guarantee that the exported image is pixel-for-pixel identical to the live DOM preview.

The export pipeline works as follows:

1. When an export is triggered, the renderer calls `getBoundingClientRect()` on every visible element in the card DOM — avatar, name, handle, verified icon, headline, each body paragraph, and each image slot.
2. These positions are expressed relative to the card's own top-left corner.
3. A 2× retina-scale HTML Canvas is created matching the card's rendered dimensions.
4. The card background is drawn as a rounded rectangle using the card's current `borderRadius`.
5. Each element is painted onto the canvas at its exact DOM position × 2 (the retina scale factor).
6. Text wrapping is replicated by measuring the canvas context at the same font/size as the DOM, breaking lines at the same pixel width reported by `getBoundingClientRect()`.
7. Images (avatar and card image) are drawn with cover-crop logic: the source image is cropped to fill the destination rectangle without letterboxing.
8. The canvas is serialised to the requested format and either downloaded or written to the clipboard.

> **Note:** All uploaded images are stored as data URLs (base64), which means they are always available to the canvas renderer without CORS restrictions. External image URLs are not supported.

### 5.3 Export Scale

All exports are rendered at **2× the preview resolution** (retina scale). A card displayed at 516px wide in the browser will export as a 1032px wide PNG. This ensures the output is sharp on high-DPI displays and meets the minimum resolution requirements of most social platforms.

---

## 6. Known Issues & Resolutions

| Issue | Root Cause | Resolution | Status |
|-------|-----------|------------|--------|
| Export did not match preview — wrong text size, avatar size, and layout | The original canvas renderer was a completely independent re-implementation that recalculated all dimensions from scratch. Differences in font metrics, line-height, and padding between the canvas calculation and the DOM cascaded into a visually different result. | Replaced the canvas renderer entirely with a DOM-position-based approach using `getBoundingClientRect()`. The canvas now reads exact pixel positions from the live DOM rather than recalculating them. | ✅ Resolved |
| Body paragraph text invisible in both preview and export | `#display-body` was missing `class="card-text"`. The CSS rule `.card-text p` therefore never matched the paragraph elements, leaving them with no font-size, line-height, or opacity styling. | Added `class="card-text"` to the `#display-body` element in the HTML template. | ✅ Resolved |
| Downloaded images failed silently when a card image was uploaded | `html2canvas` (the original export library) cannot access locally-uploaded images due to browser CORS security restrictions. | Removed `html2canvas` entirely. Replaced with a custom canvas renderer that operates on data URLs, which are always same-origin. | ✅ Resolved |
| Image inset used hardcoded 10px margin regardless of slider value | Template literals in the Python replacement script were escaped incorrectly (`\`` instead of `` ` ``) causing the JS to execute literal backtick strings rather than template expressions. | Fixed escaped template literal strings in the JS. | ✅ Resolved |

---

## 7. Technical Architecture

### 7.1 Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| UI Framework | Vanilla HTML/CSS/JS | Zero build step; single file; maximum portability |
| Fonts | Google Fonts (DM Sans, Syne) | Loaded via `<link>` tag; cached by browser |
| Export | Native HTML Canvas API | No third-party library; full control; CORS-safe with data URLs |
| Image storage | `FileReader` → data URL | All images live in memory as base64; no server required |
| Clipboard | `navigator.clipboard.write()` | Native API; requires HTTPS or localhost; graceful error toast on failure |

### 7.2 File Structure

The entire product is a single file: `card-creator.html`. There are no external JS files, no CSS files, no build artifacts, and no `package.json`. The file can be opened directly in any modern browser by double-clicking it.

### 7.3 State Management

All state is held in JavaScript variables in the global scope of the single `<script>` tag:

| Variable | Type | Description |
|----------|------|-------------|
| `avatarDataURL` | `string \| null` | Base64 data URL of the uploaded avatar, or `null` |
| `cardImgDataURL` | `string \| null` | Base64 data URL of the uploaded card image, or `null` |
| `imgPosition` | `string` | One of `"bottom"`, `"top"`, `"inline"` |
| `imgRatio` | `string` | One of `"16/9"`, `"4/3"`, `"1/1"`, `"9/16"` |

All other settings (colours, font, width, height, inset, radius, verified, text fields) are read directly from their form inputs on every `liveUpdate()` call and on every export.

> **Note:** Because there is no persistent state layer, refreshing the page resets all values to defaults. This is intentional for the MVP.

---

## 8. UI Layout

### 8.1 Two-Panel Layout

The application uses a fixed two-panel CSS grid layout that fills 100vh:

- **Left panel** (370px fixed): Scrollable controls sidebar with all inputs.
- **Right panel** (remaining width): Centred preview area with a checkerboard background indicating the canvas boundary.
- **Header bar** (52px): Application name and version badge, spanning full width.

### 8.2 Controls Panel Organisation

Controls are grouped into labelled sections in this order:

1. Platform Presets — quick-select buttons for common sizes
2. Canvas Size — width and height sliders
3. Profile — avatar upload, name, handle, verified badge
4. Content — headline, body text textarea
5. Card Image — image upload, position toggle, aspect ratio toggle, rounded corners checkbox, inset slider
6. Style — background colour, text colour, font family, corner radius
7. Export — three export buttons (PNG, JPEG, Clipboard)

### 8.3 Design Language

The controls panel uses a dark-mode aesthetic (`--bg: #0f0f13`, `--surface: #1a1a22`) with an indigo/pink accent gradient. The preview area sits on a repeating checkerboard pattern to make the card boundary clearly visible. Upload buttons use a dashed border that turns green when a file is loaded. Active toggle buttons highlight in the accent indigo colour.

---

## 9. Acceptance Criteria

| ID | Criterion | How to Verify |
|----|-----------|---------------|
| AC-01 | Export matches preview exactly in layout, text wrapping, image position, and colours | Side-by-side comparison of browser preview and downloaded PNG at same viewport width |
| AC-02 | PNG download works after uploading a local image | Upload image → Download PNG → file opens correctly |
| AC-03 | JPEG download produces a smaller file than PNG for the same card | Download both formats → compare file sizes |
| AC-04 | Clipboard copy shows success toast and image pastes correctly in Slack | Copy → open Slack → Cmd/Ctrl+V → image appears |
| AC-05 | Platform presets snap width/height correctly | Click each preset → verify w/h values match spec table |
| AC-06 | Image position toggles work correctly in both preview and export | Set each position → download PNG → verify image placement |
| AC-07 | All four aspect ratios produce correctly proportioned image slots | Set each ratio → verify slot height = width ÷ ratio |
| AC-08 | Inset slider at 0 produces a flush image with no margin | Set inset to 0 → verify image touches card edges |
| AC-09 | Initials avatar renders when no avatar is uploaded | Clear avatar → verify initials appear in correct colours |
| AC-10 | Body text paragraphs render at correct size and opacity in both preview and export | Enter multi-line body → verify all paragraphs visible in downloaded PNG |
| AC-11 | Auto-height card grows to fit content; fixed-height card clips overflow | Toggle height slider between 0 and 400px → verify behaviour |
| AC-12 | The entire tool works offline after initial font load | Disable network → reload from file → use tool → export |

---

## 10. Future Considerations

### 10.1 Persistence
- Auto-save card state to `localStorage` so refreshing the page restores the last session.
- Named card slots — save up to N card configurations and switch between them.

### 10.2 Content
- Engagement metrics row (likes, retweets, replies) to make the card look more like a real tweet.
- Quote-tweet embed block — a nested card within the card.
- Timestamp display (e.g. "11:32 AM · Feb 18, 2026").

### 10.3 Multi-Image
- Support for Twitter-style image grids: 2 images side-by-side, 3-image grid, 4-image grid.

### 10.4 Templates
- Pre-built card templates (e.g. "Breaking News", "Product Launch", "Stat Card") that pre-fill content and style.

### 10.5 Typography
- Independent font size sliders for headline and body text.
- Text alignment control (left, centre).

### 10.6 Export
- SVG export for lossless scalability.
- Batch export: generate multiple size variants from one card definition in a single click.

### 10.7 Drag-to-Reorder
- Allow the user to drag elements within the card (e.g. move the image above/below text by dragging rather than using the toggle button).

---

## Appendix: Glossary

| Term | Definition |
|------|-----------|
| **Card** | The styled social media image produced by Mockly, visually mimicking a Twitter/X post. |
| **Preview** | The live DOM rendering of the card visible in the right panel of the UI. |
| **Export** | The act of generating a raster image (PNG or JPEG) from the card and downloading or copying it. |
| **Cover-crop** | An image sizing mode where the image is scaled to completely fill a rectangle while preserving aspect ratio, cropping any overflow from the centre. |
| **Data URL** | A base64-encoded representation of a file embedded directly in a string, used here to store uploaded images without a server. |
| **Inset** | The margin distance between the card edges and the image slot, measured in CSS pixels. |
| **Retina scale** | The 2× pixel density multiplier applied during canvas export to produce sharp images on high-DPI screens. |
| **`getBoundingClientRect()`** | A browser DOM API that returns the exact pixel position and size of an element relative to the viewport, used as the source of truth for the export renderer. |
| **Platform preset** | A one-click configuration that sets the card width and height to match a specific social platform's recommended image dimensions. |
