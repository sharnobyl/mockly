# Mockly Launch Video v2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Revise the Mockly launch video with enhanced color/font cycling, scrolling card showcase with cat images, and full social media platform UI replicas.

**Architecture:** Replaces Transformations scene with color/font cycling + cat images, adds new ScrollingCards scene, replaces ExportShowcase with SocialShowcase (full platform replicas), updates CTA with blur background.

**Tech Stack:** Remotion, React, TypeScript, external images from cataas.com

**Design Doc:** `docs/plans/2025-02-21-mockly-launch-video-v2-design.md`

---

## Task 1: Fix SocialCard image positioning

**Files:**
- Modify: `mockly-launch-video/src/components/SocialCard.tsx`

**Step 1: Add inset and imageAspectRatio props to SocialCard**

Update the interface and update the image section to match the app's exact positioning:

```tsx
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SocialCardProps {
  name?: string;
  handle?: string;
  headline?: string;
  body?: string;
  bgColor?: string;
  nameColor?: string;
  handleColor?: string;
  headlineColor?: string;
  bodyColor?: string;
  showImage?: boolean;
  imageUrl?: string;
  width?: number;
  height?: number;
  avatarInitials?: string;
  showVerified?: boolean;
  verifiedColor?: string;
  animated?: boolean;
  scale?: number;
  inset?: number;
  imageAspectRatio?: number;
  fontFamily?: string;
}

export const SocialCard: React.FC<SocialCardProps> = ({
  name = "Mockly",
  handle = "@mockly.app",
  headline = "Create beautiful social cards",
  body = "Design Twitter/X-style social cards in seconds.",
  bgColor = "#000000",
  nameColor = "#ffffff",
  handleColor = "#999999",
  headlineColor = "#ffffff",
  bodyColor = "#e0e0e0",
  showImage = false,
  imageUrl,
  width = 400,
  height,
  avatarInitials = "M",
  showVerified = true,
  verifiedColor = "#499aea",
  animated = false,
  scale = 1,
  inset = 10,
  imageAspectRatio = 16 / 9,
  fontFamily = "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered animations when animated
  const avatarScale = animated
    ? spring({ frame, fps, config: { damping: 12, stiffness: 200 } })
    : 1;

  const nameOpacity = animated
    ? interpolate(frame, [10, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  const handleOpacity = animated
    ? interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  const headlineOpacity = animated
    ? interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  const bodyOpacity = animated
    ? interpolate(frame, [40, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  const imageOpacity = animated
    ? interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  // Calculate image dimensions like the app does
  const imageWidth = width - inset * 2;
  const imageHeight = Math.round(imageWidth / imageAspectRatio);
  const imageBorderRadius = Math.max(4, Math.min(16, inset + 2));

  const cardStyle: React.CSSProperties = {
    width,
    height: height || "auto",
    backgroundColor: bgColor,
    borderRadius: 16,
    overflow: "hidden",
    transform: `scale(${scale})`,
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    fontFamily,
  };

  return (
    <div style={cardStyle}>
      <div style={{ padding: 22 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          {/* Avatar */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: verifiedColor,
              transform: `scale(${avatarScale})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {avatarInitials}
          </div>

          {/* Name and handle */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span
                style={{
                  fontSize: 14.5,
                  fontWeight: 700,
                  color: nameColor,
                  opacity: nameOpacity,
                }}
              >
                {name}
              </span>
              {showVerified && (
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 22 22"
                  fill="none"
                  style={{ opacity: nameOpacity }}
                >
                  <circle cx="11" cy="11" r="11" fill={verifiedColor} />
                  <path
                    d="M7 11.5L10 14.5L15 8.5"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span
              style={{
                fontSize: 13,
                color: handleColor,
                opacity: handleOpacity,
              }}
            >
              {handle}
            </span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: headlineColor,
            marginBottom: 10,
            lineHeight: 1.3,
            opacity: headlineOpacity,
          }}
        >
          {headline}
        </div>

        {/* Body */}
        <div
          style={{
            fontSize: 14.5,
            color: bodyColor,
            lineHeight: 1.55,
            opacity: bodyOpacity,
          }}
        >
          {body}
        </div>
      </div>

      {/* Image - positioned like the actual app */}
      {showImage && (
        <div
          style={{
            width: imageWidth,
            height: imageHeight,
            backgroundColor: imageUrl ? "transparent" : "#1a1a2e",
            opacity: imageOpacity,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: `0 ${inset}px ${inset}px`,
            borderRadius: imageBorderRadius,
            overflow: "hidden",
          }}
        >
          {imageUrl ? (
            <img src={imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ color: verifiedColor, fontSize: 24, fontWeight: 700 }}>
              Your Image
            </span>
          )}
        </div>
      )}
    </div>
  );
};
```

**Step 2: Commit**

```bash
git add mockly-launch-video/src/components/SocialCard.tsx
git commit -m "fix: update SocialCard image positioning to match app"
```

---

## Task 2: Create shared constants file

**Files:**
- Create: `mockly-launch-video/src/constants.ts`

**Step 1: Create constants for colors, fonts, and card data**

```tsx
// Color palette for card variations
export const COLORS = [
  { bg: '#000000', text: '#ffffff', handle: '#999999', name: 'Black' },
  { bg: '#ffffff', text: '#1a1a1a', handle: '#666666', name: 'White' },
  { bg: '#eae4d3', text: '#2d2d2d', handle: '#666666', name: 'Beige' },
  { bg: '#2d49b9', text: '#ffffff', handle: '#b8c9e8', name: 'Blue' },
  { bg: '#c94a4a', text: '#ffffff', handle: '#e8b8b8', name: 'Red' },
  { bg: '#4a4a4a', text: '#ffffff', handle: '#999999', name: 'Grey' },
  { bg: '#7d8c69', text: '#ffffff', handle: '#c5cdb8', name: 'Sage' },
  { bg: '#1a1a2e', text: '#ffffff', handle: '#8c8c9e', name: 'Dark Blue' },
  { bg: '#f5e6d3', text: '#3d3d3d', handle: '#7a7a7a', name: 'Cream' },
  { bg: '#2d8c6e', text: '#ffffff', handle: '#a8d4c5', name: 'Teal' },
];

// Font families for cycling
export const FONTS = [
  "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  "Georgia, serif",
  "'Syne', sans-serif",
  "'Courier New', monospace",
];

// Sample headlines for scrolling cards
export const HEADLINES = [
  "Create beautiful social cards",
  "Share your story",
  "Make an impression",
  "Stand out online",
  "Design made simple",
  "Cards in seconds",
  "Your brand, your way",
  "Perfect for creators",
  "Social media ready",
  "Professional results",
  "Quick and easy",
  "Stunning visuals",
  "Boost engagement",
  "Share everywhere",
  "Make it yours",
  "Create with ease",
  "Beautiful designs",
  "Simple. Fast. Free.",
  "Your content, elevated",
  "Design without limits",
];

// Sample body text for scrolling cards
export const BODIES = [
  "Design stunning cards in seconds.",
  "Perfect for social media.",
  "No design skills needed.",
  "Export to any platform.",
  "Customize everything.",
  "Free and easy to use.",
  "Professional results.",
  "Share your content beautifully.",
  "Make your posts pop.",
  "The fastest way to create.",
];

// Cat image URLs (using cataas.com)
export const getCatImageUrl = (id: number): string =>
  `https://cataas.com/cat?width=400&height=225&random=${id}`;
```

**Step 2: Commit**

```bash
git add mockly-launch-video/src/constants.ts
git commit -m "feat: add shared constants for colors, fonts, and card data"
```

---

## Task 3: Rewrite Transformations scene for color/font cycling

**Files:**
- Modify: `mockly-launch-video/src/LaunchVideo/Transformations.tsx`

**Step 1: Replace with color/font cycling implementation**

```tsx
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { SocialCard } from "../components/SocialCard";
import { COLORS, FONTS, getCatImageUrl } from "../constants";

export const Transformations: React.FC = () => {
  const frame = useCurrentFrame();

  // Each color lasts ~25 frames (180 frames / 7 colors ≈ 25)
  const colorDuration = 25;
  const colorCount = COLORS.length;

  // Calculate current color index (cycle through colors)
  const colorProgress = frame / colorDuration;
  const colorIndex = Math.floor(colorProgress) % colorCount;
  const nextColorIndex = (colorIndex + 1) % colorCount;

  // Interpolation progress within current color
  const colorBlend = colorProgress % 1;

  // Get current and next colors
  const currentColor = COLORS[colorIndex];
  const nextColor = COLORS[nextColorIndex];

  // Cycle fonts every 45 frames
  const fontDuration = 45;
  const fontIndex = Math.floor(frame / fontDuration) % FONTS.length;
  const nextFontIndex = (fontIndex + 1) % FONTS.length;
  const fontBlend = (frame / fontDuration) % 1;

  // Use current font (fonts don't blend well, so switch at midpoint)
  const currentFont = fontBlend < 0.5 ? FONTS[fontIndex] : FONTS[nextFontIndex];

  // Cat image changes every 30 frames
  const imageId = Math.floor(frame / 30) + 1;
  const imageUrl = getCatImageUrl(imageId);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1e1e1e",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SocialCard
        name="Mockly"
        handle="@mockly.app"
        headline="Create beautiful social cards"
        body="Design stunning cards with custom colors and fonts."
        bgColor={currentColor.bg}
        nameColor={currentColor.text}
        handleColor={currentColor.handle}
        headlineColor={currentColor.text}
        bodyColor={currentColor.text}
        showImage={true}
        imageUrl={imageUrl}
        width={420}
        animated={false}
        scale={0.85}
        fontFamily={currentFont}
      />
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo/Transformations.tsx
git commit -m "feat: rewrite Transformations for color/font cycling with cat images"
```

---

## Task 4: Create ScrollingCards scene component

**Files:**
- Create: `mockly-launch-video/src/LaunchVideo/ScrollingCards.tsx`

**Step 1: Create scrolling cards showcase**

```tsx
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { SocialCard } from "../components/SocialCard";
import { COLORS, HEADLINES, BODIES, getCatImageUrl } from "../constants";

// Generate 20 unique cards
const generateCards = () => {
  const cards = [];
  for (let i = 0; i < 20; i++) {
    cards.push({
      id: i,
      color: COLORS[i % COLORS.length],
      headline: HEADLINES[i % HEADLINES.length],
      body: BODIES[i % BODIES.length],
      imageUrl: getCatImageUrl(i + 1),
    });
  }
  return cards;
};

const CARDS = generateCards();

interface ScrollingRowProps {
  cards: typeof CARDS;
  direction: "left" | "right";
  rowWidth: number;
  y: number;
  speed: number;
}

const ScrollingRow: React.FC<ScrollingRowProps> = ({
  cards,
  direction,
  rowWidth,
  y,
  speed
}) => {
  const frame = useCurrentFrame();

  // Calculate scroll offset based on direction
  const scrollAmount = frame * speed;
  const offset = direction === "right"
    ? scrollAmount % rowWidth
    : -scrollAmount % rowWidth;

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: -rowWidth,
        width: rowWidth * 3,
        display: "flex",
        gap: 16,
        transform: `translateX(${offset}px)`,
      }}
    >
      {/* Repeat cards 3 times for seamless loop */}
      {[...cards, ...cards, ...cards].map((card, index) => (
        <SocialCard
          key={`${card.id}-${index}`}
          name="Mockly"
          handle="@mockly.app"
          headline={card.headline}
          body={card.body}
          bgColor={card.color.bg}
          nameColor={card.color.text}
          handleColor={card.color.handle}
          headlineColor={card.color.text}
          bodyColor={card.color.text}
          showImage={true}
          imageUrl={card.imageUrl}
          width={180}
          animated={false}
          scale={0.6}
        />
      ))}
    </div>
  );
};

export const ScrollingCards: React.FC = () => {
  const frame = useCurrentFrame();

  // Split cards into 4 rows
  const row1 = CARDS.slice(0, 5);
  const row2 = CARDS.slice(5, 10);
  const row3 = CARDS.slice(10, 15);
  const row4 = CARDS.slice(15, 20);

  // Calculate row width (5 cards * card width + gaps)
  const cardWidth = 180 * 0.6; // scaled width
  const gap = 16;
  const rowWidth = (cardWidth + gap) * 5;

  // Speed for scrolling (pixels per frame)
  const speed = 2;

  // Vertical positions for 4 rows
  const rowHeight = 200;
  const startY = 100;

  // Blur for CTA overlay
  const showBlur = frame >= 120; // Local frame 120 = global frame 480

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1e1e1e",
        overflow: "hidden",
        filter: showBlur ? "blur(8px)" : "none",
      }}
    >
      {/* Row 1 - scrolling right */}
      <ScrollingRow
        cards={row1}
        direction="right"
        rowWidth={rowWidth}
        y={startY}
        speed={speed}
      />

      {/* Row 2 - scrolling left */}
      <ScrollingRow
        cards={row2}
        direction="left"
        rowWidth={rowWidth}
        y={startY + rowHeight}
        speed={speed}
      />

      {/* Row 3 - scrolling right */}
      <ScrollingRow
        cards={row3}
        direction="right"
        rowWidth={rowWidth}
        y={startY + rowHeight * 2}
        speed={speed}
      />

      {/* Row 4 - scrolling left */}
      <ScrollingRow
        cards={row4}
        direction="left"
        rowWidth={rowWidth}
        y={startY + rowHeight * 3}
        speed={speed}
      />
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo/ScrollingCards.tsx
git commit -m "feat: add ScrollingCards scene with 4-row scrolling showcase"
```

---

## Task 5: Create SocialShowcase scene component

**Files:**
- Create: `mockly-launch-video/src/LaunchVideo/SocialShowcase.tsx`

**Step 1: Create full platform UI replicas**

```tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SocialCard } from "../components/SocialCard";

// Instagram UI Component
const InstagramUI: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#000",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Instagram Header */}
    <div
      style={{
        padding: "12px 16px",
        borderBottom: "1px solid #262626",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "#fff" }}>
        Instagram
      </div>
      {/* Icons */}
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ width: 24, height: 24, color: "#fff" }}>♡</div>
        <div style={{ width: 24, height: 24, color: "#fff">✉</div>
      </div>
    </div>

    {/* Stories row */}
    <div
      style={{
        padding: "12px 16px",
        borderBottom: "1px solid #262626",
        display: "flex",
        gap: 16,
      }}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              padding: 2,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "#333",
              }}
            />
          </div>
          <span style={{ fontSize: 10, color: "#fff" }}>user{i}</span>
        </div>
      ))}
    </div>

    {/* Feed Post */}
    <div style={{ flex: 1, overflow: "hidden" }}>
      {/* Post header */}
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "#2d49b9",
          }}
        />
        <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>mockly.app</span>
      </div>

      {/* Post image (card) */}
      <div style={{ padding: "0 16px" }}>
        <SocialCard
          name="Mockly"
          handle="@mockly.app"
          headline="Create beautiful cards"
          body="Perfect for Instagram."
          bgColor="#000000"
          showImage={true}
          imageUrl="https://cataas.com/cat?width=400&height=225&random=insta"
          width={280}
          animated={false}
          scale={0.7}
        />
      </div>

      {/* Post actions */}
      <div style={{ padding: "12px 16px", display: "flex", gap: 16 }}>
        <span style={{ fontSize: 24, color: "#fff" }}>♡</span>
        <span style={{ fontSize: 24, color: "#fff" }}>💬</span>
        <span style={{ fontSize: 24, color: "#fff" }}>✈</span>
      </div>
    </div>

    {/* Bottom nav */}
    <div
      style={{
        borderTop: "1px solid #262626",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: 24, color: "#fff" }}>🏠</span>
      <span style={{ fontSize: 24, color: "#fff" }}>🔍</span>
      <span style={{ fontSize: 24, color: "#fff" }}>➕</span>
      <span style={{ fontSize: 24, color: "#fff" }}>🎬</span>
      <span style={{ fontSize: 24, color: "#fff" }}>👤</span>
    </div>
  </div>
);

// LinkedIn UI Component
const LinkedInUI: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#1a1a1a",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* LinkedIn Header */}
    <div
      style={{
        padding: "12px 24px",
        backgroundColor: "#1a1a1a",
        borderBottom: "1px solid #333",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "#0a66c2" }}>
        linkedin
      </div>
      <div style={{ display: "flex", gap: 20, color: "#666", fontSize: 12 }}>
        <span>Home</span>
        <span>My Network</span>
        <span>Jobs</span>
        <span>Messaging</span>
      </div>
    </div>

    {/* Feed Post */}
    <div style={{ flex: 1, padding: 20, overflow: "hidden" }}>
      <div
        style={{
          backgroundColor: "#242424",
          borderRadius: 12,
          padding: 16,
        }}
      >
        {/* Post header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#2d49b9",
            }}
          />
          <div>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Mockly</div>
            <div style={{ color: "#666", fontSize: 12 }}>2h · 🌐</div>
          </div>
        </div>

        {/* Post text */}
        <p style={{ color: "#e0e0e0", fontSize: 14, marginBottom: 12 }}>
          Check out our new social card creator! Create stunning cards for any platform.
        </p>

        {/* Card preview */}
        <SocialCard
          name="Mockly"
          handle="@mockly.app"
          headline="Share everywhere"
          body="LinkedIn, Facebook, and more..."
          bgColor="#000000"
          showImage={true}
          imageUrl="https://cataas.com/cat?width=400&height=225&random=linkedin"
          width={340}
          animated={false}
          scale={0.6}
        />

        {/* Engagement */}
        <div style={{ display: "flex", gap: 16, marginTop: 12, color: "#666", fontSize: 12 }}>
          <span>👍 42</span>
          <span>💬 5 comments</span>
        </div>
      </div>
    </div>
  </div>
);

// Facebook UI Component
const FacebookUI: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#18191a",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Facebook Header */}
    <div
      style={{
        padding: "12px 24px",
        backgroundColor: "#242526",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#1877f2" }}>
        facebook
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ width: 80, height: 36, backgroundColor: "#3a3b3c", borderRadius: 18 }} />
      </div>
    </div>

    {/* Feed Post */}
    <div style={{ flex: 1, padding: 16, overflow: "hidden" }}>
      <div style={{ backgroundColor: "#242526", borderRadius: 12, padding: 16 }}>
        {/* Post header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "#2d49b9",
            }}
          />
          <div>
            <div style={{ color: "#e4e6eb", fontSize: 15, fontWeight: 600 }}>Mockly</div>
            <div style={{ color: "#8a8d91", fontSize: 12 }}>2h · 🌐</div>
          </div>
        </div>

        {/* Post text */}
        <p style={{ color: "#e4e6eb", fontSize: 15, marginBottom: 12 }}>
          Create beautiful social cards in seconds! Try Mockly today.
        </p>

        {/* Card preview */}
        <SocialCard
          name="Mockly"
          handle="@mockly.app"
          headline="Design made simple"
          body="Share on Facebook and beyond."
          bgColor="#000000"
          showImage={true}
          imageUrl="https://cataas.com/cat?width=400&height=225&random=facebook"
          width={340}
          animated={false}
          scale={0.6}
        />

        {/* Engagement */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, padding: "8px 0", borderTop: "1px solid #3a3b3c" }}>
          <span style={{ color: "#8a8d91", fontSize: 14 }}>👍 128</span>
          <span style={{ color: "#8a8d91", fontSize: 14 }}>💬 24 · 📤 12</span>
        </div>
      </div>
    </div>
  </div>
);

export const SocialShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Instagram: frames 0-70 (local)
  const instagramOpacity = interpolate(frame, [0, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const instagramX = spring({
    frame: frame - 50,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const instagramTranslateX = interpolate(instagramX, [0, 1], [0, -800]);

  // LinkedIn: frames 50-120 (local)
  const linkedinEnterProgress = spring({
    frame: frame - 50,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const linkedinTranslateX = interpolate(linkedinEnterProgress, [0, 1], [800, 0]);
  const linkedinOpacity = interpolate(frame, [50, 70, 100, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const linkedinExitProgress = spring({
    frame: frame - 100,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const linkedinExitX = interpolate(linkedinExitProgress, [0, 1], [0, -800]);

  // Facebook: frames 100-150 (local)
  const facebookEnterProgress = spring({
    frame: frame - 90,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const facebookTranslateX = interpolate(facebookEnterProgress, [0, 1], [800, 0]);
  const facebookOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1e1e1e",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Instagram */}
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 640,
          transform: `translateX(${frame < 50 ? 0 : instagramTranslateX}px)`,
          opacity: instagramOpacity,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <InstagramUI />
      </div>

      {/* LinkedIn */}
      <div
        style={{
          position: "absolute",
          width: 480,
          height: 560,
          transform: `translateX(${frame < 100 ? linkedinTranslateX : linkedinExitX}px)`,
          opacity: linkedinOpacity,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <LinkedInUI />
      </div>

      {/* Facebook */}
      <div
        style={{
          position: "absolute",
          width: 480,
          height: 560,
          transform: `translateX(${facebookTranslateX}px)`,
          opacity: facebookOpacity,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <FacebookUI />
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo/SocialShowcase.tsx
git commit -m "feat: add SocialShowcase with full Instagram/LinkedIn/Facebook replicas"
```

---

## Task 6: Update CTA for blur background effect

**Files:**
- Modify: `mockly-launch-video/src/LaunchVideo/CTA.tsx`

**Step 1: Add blur background and children prop**

```tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface CTAProps {
  children?: React.ReactNode;
  showBlur?: boolean;
}

export const CTA: React.FC<CTAProps> = ({ children, showBlur = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle pulse
  const pulse = Math.sin(frame * 0.1) * 0.02 + 1;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: showBlur ? "transparent" : "#1e1e1e",
      }}
    >
      {children}

      <div
        style={{
          textAlign: "center",
          transform: `scale(${scale * pulse})`,
          opacity,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Try it free */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#e0e0e0",
            marginBottom: 24,
            fontFamily: "'Syne', sans-serif",
          }}
        >
          Try it free
        </div>

        {/* URL badge */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            color: "#1e1e1e",
            padding: "16px 40px",
            backgroundColor: "#2d49b9",
            borderRadius: 50,
            display: "inline-block",
          }}
        >
          mockly.app
        </div>

        {/* Logo */}
        <div
          style={{
            marginTop: 40,
            fontSize: 20,
            fontWeight: 800,
            fontFamily: "'Syne', sans-serif",
            color: "#ffffff",
          }}
        >
          Mock<span style={{ color: "#2d49b9" }}>ly</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo/CTA.tsx
git commit -m "feat: update CTA to support blur background with children"
```

---

## Task 7: Update LaunchVideo.tsx with new scene structure

**Files:**
- Modify: `mockly-launch-video/src/LaunchVideo.tsx`
- Delete: `mockly-launch-video/src/LaunchVideo/ExportShowcase.tsx`

**Step 1: Update scene structure**

```tsx
import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  Sequence,
} from "remotion";
import { z } from "zod";
import { Intro } from "./LaunchVideo/Intro";
import { CardReveal } from "./LaunchVideo/CardReveal";
import { Transformations } from "./LaunchVideo/Transformations";
import { ScrollingCards } from "./LaunchVideo/ScrollingCards";
import { SocialShowcase } from "./LaunchVideo/SocialShowcase";
import { CTA } from "./LaunchVideo/CTA";

export const launchVideoSchema = z.object({
  primaryColor: zColor(),
  accentColor: zColor(),
  backgroundColor: zColor(),
});

export const LaunchVideo: React.FC<z.infer<typeof launchVideoSchema>> = ({
  primaryColor = "#1e1e1e",
  accentColor = "#2d49b9",
  backgroundColor = "#1e1e1e",
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {/* Scene 1: Intro (0-90 frames = 0-3s) */}
      <Sequence from={0} durationInFrames={90}>
        <Intro />
      </Sequence>

      {/* Scene 2: Card Reveal (90-180 frames = 3-6s) */}
      <Sequence from={90} durationInFrames={90}>
        <CardReveal />
      </Sequence>

      {/* Scene 3: Color/Font Cycle (180-360 frames = 6-12s) */}
      <Sequence from={180} durationInFrames={180}>
        <Transformations />
      </Sequence>

      {/* Scene 4: Scrolling Cards (360-540 frames = 12-18s) */}
      <Sequence from={360} durationInFrames={180}>
        <ScrollingCards />
      </Sequence>

      {/* Scene 5: Social Showcase (360-510 frames = 12-17s) - overlaps with ScrollingCards */}
      <Sequence from={360} durationInFrames={150}>
        <SocialShowcase />
      </Sequence>

      {/* Scene 6: CTA (480-540 frames = 16-18s) - over blurred ScrollingCards */}
      <Sequence from={480} durationInFrames={60}>
        <CTA>
          <ScrollingCards />
        </CTA>
      </Sequence>
    </AbsoluteFill>
  );
};
```

**Step 2: Remove old ExportShowcase**

```bash
git rm mockly-launch-video/src/LaunchVideo/ExportShowcase.tsx
```

**Step 3: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo.tsx
git commit -m "feat: restructure video with new scene layout and social showcase"
```

---

## Task 8: Final verification and render

**Step 1: Run TypeScript check**

Run: `cd mockly-launch-video && npx tsc --noEmit`
Expected: No errors

**Step 2: Run Remotion Studio to preview**

Run: `cd mockly-launch-video && npm run dev`
Expected: Studio opens, all scenes render correctly

**Step 3: Render the video**

Run: `cd mockly-launch-video && npm run render`
Expected: Video renders to `out/mockly-launch.mp4`

**Step 4: Verify rendered video**

Check:
- Intro: "Introducing Mockly" + badge
- CardReveal: Card with staggered animations
- Transformations: Color cycling through 7 colors, font changes, cat images
- ScrollingCards: 4 rows of 5 cards, alternating scroll directions
- SocialShowcase: Instagram → LinkedIn → Facebook replicas sliding in/out
- CTA: "Try it free" over blurred scrolling cards

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete Mockly launch video v2 with color cycling and social replicas"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Fix SocialCard image positioning | `SocialCard.tsx` |
| 2 | Create shared constants | `constants.ts` |
| 3 | Rewrite Transformations for color/font cycling | `Transformations.tsx` |
| 4 | Create ScrollingCards scene | `ScrollingCards.tsx` |
| 5 | Create SocialShowcase scene | `SocialShowcase.tsx` |
| 6 | Update CTA for blur background | `CTA.tsx` |
| 7 | Update LaunchVideo structure | `LaunchVideo.tsx`, delete `ExportShowcase.tsx` |
| 8 | Final verification and render | Render and test |
