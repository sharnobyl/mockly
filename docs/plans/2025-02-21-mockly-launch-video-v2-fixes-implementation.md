# Mockly Launch Video v2 Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix visual issues in the launch video - scale up all elements 2x for mobile visibility, improve scene transitions, redesign LinkedIn as desktop, and reduce ScrollingCards to 2 rows.

**Architecture:** Modify 4 scene components with scaled-up dimensions and improved animations. Transformations gets 8-direction card entrance. SocialShowcase gets desktop LinkedIn and loses Facebook. ScrollingCards reduced to 2 rows with wider cards. CTA gets larger fonts.

**Tech Stack:** Remotion, React, TypeScript

**Design Doc:** `docs/plans/2025-02-21-mockly-launch-video-v2-fixes-design.md`

---

## Task 1: Rewrite Transformations with 8-direction card entrance

**Files:**
- Modify: `mockly-launch-video/src/LaunchVideo/Transformations.tsx`

**Step 1: Replace Transformations with new animation**

```tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SocialCard } from "../components/SocialCard";
import { COLORS, FONTS, getCatImageUrl } from "../constants";

// 8 directions for card entrance
const CARD_POSITIONS = [
  { x: -800, y: 0, name: "left" },
  { x: 800, y: 0, name: "right" },
  { x: 0, y: -600, name: "top" },
  { x: 0, y: 600, name: "bottom" },
  { x: -600, y: -400, name: "topLeft" },
  { x: 600, y: -400, name: "topRight" },
  { x: -600, y: 400, name: "bottomLeft" },
  { x: 600, y: 400, name: "bottomRight" },
];

// Final grid positions (loose grid around center)
const GRID_POSITIONS = [
  { x: -350, y: -200 },
  { x: 350, y: -200 },
  { x: 0, y: -280 },
  { x: -350, y: 200 },
  { x: 350, y: 200 },
  { x: 0, y: 280 },
  { x: -200, y: 0 },
  { x: 200, y: 0 },
];

export const Transformations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Cards fly in from 8 directions (frames 0-30)
  const entranceDuration = 30;
  const entranceProgress = spring({
    frame: Math.min(frame, entranceDuration),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Phase 2: Cards settle into grid (frames 30-60)
  const settleStart = 30;
  const settleProgress = spring({
    frame: frame - settleStart,
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  // Phase 3: Surrounding cards fade out (frames 60-90)
  const fadeOutStart = 60;
  const surroundingOpacity = interpolate(
    frame,
    [fadeOutStart, fadeOutStart + 30],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 4: Central card color cycling (frames 90-180)
  const cycleFrame = frame - 90;
  const colorDuration = 20;
  const colorIndex = Math.floor(cycleFrame / colorDuration) % COLORS.length;
  const currentColor = COLORS[colorIndex];

  const fontDuration = 35;
  const fontIndex = Math.floor(cycleFrame / fontDuration) % FONTS.length;
  const nextFontIndex = (fontIndex + 1) % FONTS.length;
  const fontBlend = (cycleFrame / fontDuration) % 1;
  const currentFont = fontBlend < 0.5 ? FONTS[fontIndex] : FONTS[nextFontIndex];

  const imageId = Math.floor(cycleFrame / 25) + 1;
  const imageUrl = getCatImageUrl(imageId);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1e1e1e",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 8 surrounding cards (fade out in phase 3) */}
      {CARD_POSITIONS.map((pos, index) => {
        const gridPos = GRID_POSITIONS[index];
        const x = interpolate(entranceProgress, [0, 1], [pos.x, gridPos.x]);
        const y = interpolate(entranceProgress, [0, 1], [pos.y, gridPos.y]);

        return (
          <div
            key={pos.name}
            style={{
              position: "absolute",
              transform: `translate(${x}px, ${y}px)`,
              opacity: surroundingOpacity,
            }}
          >
            <SocialCard
              name="Mockly"
              handle="@mockly.app"
              headline="Create beautiful cards"
              body="Design stunning social cards."
              bgColor={COLORS[index % COLORS.length].bg}
              nameColor={COLORS[index % COLORS.length].text}
              handleColor={COLORS[index % COLORS.length].handle}
              headlineColor={COLORS[index % COLORS.length].text}
              bodyColor={COLORS[index % COLORS.length].text}
              showImage={true}
              imageUrl={getCatImageUrl(index + 10)}
              width={280}
              animated={false}
              scale={0.7}
            />
          </div>
        );
      })}

      {/* Central card (stays throughout, starts cycling in phase 4) */}
      <div style={{ position: "absolute", zIndex: 10 }}>
        <SocialCard
          name="Mockly"
          handle="@mockly.app"
          headline="Create beautiful social cards"
          body="Design stunning cards with custom colors and fonts."
          bgColor={frame >= 90 ? currentColor.bg : "#000000"}
          nameColor={frame >= 90 ? currentColor.text : "#ffffff"}
          handleColor={frame >= 90 ? currentColor.handle : "#999999"}
          headlineColor={frame >= 90 ? currentColor.text : "#ffffff"}
          bodyColor={frame >= 90 ? currentColor.text : "#e0e0e0"}
          showImage={true}
          imageUrl={frame >= 90 ? imageUrl : getCatImageUrl(0)}
          width={500}
          animated={false}
          scale={1}
          fontFamily={frame >= 90 ? currentFont : undefined}
        />
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo/Transformations.tsx
git commit -m "feat: add 8-direction card entrance animation to Transformations"
```

---

## Task 2: Redesign SocialShowcase with desktop LinkedIn

**Files:**
- Modify: `mockly-launch-video/src/LaunchVideo/SocialShowcase.tsx`

**Step 1: Replace with Instagram mobile + LinkedIn desktop**

```tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SocialCard } from "../components/SocialCard";

// Instagram UI Component (scaled up 2x)
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
        padding: "24px 32px",
        borderBottom: "2px solid #262626",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 48, fontWeight: 800, color: "#fff" }}>
        Instagram
      </div>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ fontSize: 48, color: "#fff" }}>♡</div>
        <div style={{ fontSize: 48, color: "#fff" }}>✉</div>
      </div>
    </div>

    {/* Stories row */}
    <div
      style={{
        padding: "24px 32px",
        borderBottom: "2px solid #262626",
        display: "flex",
        gap: 32,
      }}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              padding: 4,
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
          <span style={{ fontSize: 20, color: "#fff" }}>user{i}</span>
        </div>
      ))}
    </div>

    {/* Feed Post */}
    <div style={{ flex: 1, overflow: "hidden", padding: "16px 32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 16 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "#2d49b9",
          }}
        />
        <span style={{ color: "#fff", fontSize: 28, fontWeight: 600 }}>mockly.app</span>
      </div>

      <SocialCard
        name="Mockly"
        handle="@mockly.app"
        headline="Create beautiful cards"
        body="Perfect for Instagram."
        bgColor="#000000"
        showImage={true}
        imageUrl="https://cataas.com/cat?width=400&height=225&random=insta"
        width={380}
        animated={false}
        scale={1}
      />

      <div style={{ padding: "24px 0", display: "flex", gap: 32 }}>
        <span style={{ fontSize: 48, color: "#fff" }}>♡</span>
        <span style={{ fontSize: 48, color: "#fff" }}>💬</span>
        <span style={{ fontSize: 48, color: "#fff" }}>✈</span>
      </div>
    </div>

    {/* Bottom nav */}
    <div
      style={{
        borderTop: "2px solid #262626",
        padding: "24px 48px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: 48, color: "#fff" }}>🏠</span>
      <span style={{ fontSize: 48, color: "#fff" }}>🔍</span>
      <span style={{ fontSize: 48, color: "#fff" }}>➕</span>
      <span style={{ fontSize: 48, color: "#fff" }}>🎬</span>
      <span style={{ fontSize: 48, color: "#fff" }}>👤</span>
    </div>
  </div>
);

// LinkedIn Desktop UI Component
const LinkedInDesktopUI: React.FC = () => (
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
        padding: "16px 48px",
        backgroundColor: "#1a1a1a",
        borderBottom: "2px solid #333",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 700, color: "#0a66c2" }}>
        linkedin
      </div>
      <div style={{ display: "flex", gap: 48, color: "#666", fontSize: 24 }}>
        <span>Home</span>
        <span>My Network</span>
        <span>Jobs</span>
        <span>Messaging</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#2d49b9" }} />
        <div style={{ width: 300, height: 36, backgroundColor: "#333", borderRadius: 8 }} />
      </div>
    </div>

    {/* Main content with sidebar */}
    <div style={{ flex: 1, display: "flex", padding: 32, gap: 32, overflow: "hidden" }}>
      {/* Left sidebar */}
      <div style={{ width: 280, flexShrink: 0 }}>
        <div
          style={{
            backgroundColor: "#242424",
            borderRadius: 16,
            padding: 24,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#2d49b9",
              margin: "0 auto 16px",
            }}
          />
          <div style={{ textAlign: "center", color: "#fff", fontSize: 24, fontWeight: 600 }}>
            Mockly
          </div>
          <div style={{ textAlign: "center", color: "#666", fontSize: 18 }}>
            Social Card Creator
          </div>
        </div>
      </div>

      {/* Main feed */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            backgroundColor: "#242424",
            borderRadius: 16,
            padding: 24,
          }}
        >
          {/* Post header */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: "#2d49b9",
              }}
            />
            <div>
              <div style={{ color: "#fff", fontSize: 28, fontWeight: 600 }}>Mockly</div>
              <div style={{ color: "#666", fontSize: 20 }}>2h · 🌐</div>
            </div>
          </div>

          {/* Post text */}
          <p style={{ color: "#e0e0e0", fontSize: 26, marginBottom: 20, lineHeight: 1.4 }}>
            Check out our new social card creator! Create stunning cards for any platform.
          </p>

          {/* Card preview */}
          <SocialCard
            name="Mockly"
            handle="@mockly.app"
            headline="Share everywhere"
            body="Perfect for LinkedIn and beyond."
            bgColor="#000000"
            showImage={true}
            imageUrl="https://cataas.com/cat?width=400&height=225&random=linkedin"
            width={500}
            animated={false}
            scale={1}
          />

          {/* Engagement */}
          <div style={{ display: "flex", gap: 32, marginTop: 24, color: "#666", fontSize: 22 }}>
            <span>👍 42</span>
            <span>💬 5 comments</span>
            <span>📤 12 shares</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const SocialShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Instagram: frames 0-80 (local)
  const instagramOpacity = interpolate(frame, [0, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const instagramExitProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const instagramTranslateX = interpolate(instagramExitProgress, [0, 1], [0, -1200]);

  // LinkedIn: frames 60-150 (local)
  const linkedinEnterProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const linkedinTranslateX = interpolate(linkedinEnterProgress, [0, 1], [1200, 0]);
  const linkedinOpacity = interpolate(frame, [60, 80], [0, 1], {
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
          width: 540,
          height: 960,
          transform: `translateX(${frame < 60 ? 0 : instagramTranslateX}px)`,
          opacity: instagramOpacity,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
      >
        <InstagramUI />
      </div>

      {/* LinkedIn Desktop */}
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 800,
          transform: `translateX(${linkedinTranslateX}px)`,
          opacity: linkedinOpacity,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
      >
        <LinkedInDesktopUI />
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo/SocialShowcase.tsx
git commit -m "feat: redesign SocialShowcase with desktop LinkedIn, remove Facebook"
```

---

## Task 3: Update ScrollingCards to 2 rows with wider cards

**Files:**
- Modify: `mockly-launch-video/src/LaunchVideo/ScrollingCards.tsx`

**Step 1: Update to 2 rows with width=400, scale=1**

```tsx
import {
  AbsoluteFill,
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
        gap: 24,
        transform: `translateX(${offset}px)`,
      }}
    >
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
          width={400}
          animated={false}
          scale={1}
        />
      ))}
    </div>
  );
};

export const ScrollingCards: React.FC = () => {
  const frame = useCurrentFrame();

  // Split cards into 2 rows (10 cards each)
  const row1 = CARDS.slice(0, 10);
  const row2 = CARDS.slice(10, 20);

  // Calculate row width (10 cards * card width + gaps)
  const cardWidth = 400;
  const gap = 24;
  const rowWidth = (cardWidth + gap) * 10;

  // Speed for scrolling (pixels per frame)
  const speed = 3;

  // Vertical positions for 2 rows (centered)
  const rowHeight = 400;
  const startY = 140;

  // Blur for CTA overlay
  const showBlur = frame >= 120;

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
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo/ScrollingCards.tsx
git commit -m "feat: update ScrollingCards to 2 rows with wider cards"
```

---

## Task 4: Scale up CTA fonts for mobile visibility

**Files:**
- Modify: `mockly-launch-video/src/LaunchVideo/CTA.tsx`

**Step 1: Update font sizes**

Change the following values in CTA.tsx:
- `fontSize: 48` → `fontSize: 72`
- `fontSize: 32` → `fontSize: 48`
- `fontSize: 20` → `fontSize: 32`
- `marginBottom: 24` → `marginBottom: 36`
- `padding: "16px 40px"` → `padding: "24px 60px"`
- `marginTop: 40` → `marginTop: 60`

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
            fontSize: 72,
            fontWeight: 700,
            color: "#e0e0e0",
            marginBottom: 36,
            fontFamily: "'Syne', sans-serif",
          }}
        >
          Try it free
        </div>

        {/* URL badge */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            color: "#1e1e1e",
            padding: "24px 60px",
            backgroundColor: "#2d49b9",
            borderRadius: 60,
            display: "inline-block",
          }}
        >
          mockly.app
        </div>

        {/* Logo */}
        <div
          style={{
            marginTop: 60,
            fontSize: 32,
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
git commit -m "feat: scale up CTA fonts for mobile visibility"
```

---

## Task 5: Run TypeScript check and verify in Remotion Studio

**Step 1: Run TypeScript check**

Run: `cd mockly-launch-video && npx tsc --noEmit`
Expected: No errors

**Step 2: Open Remotion Studio and verify each scene**

Run: `cd mockly-launch-video && npm run dev`

Verify in browser at http://localhost:3000:
- Frame 180-210: 8 cards fly in from all directions
- Frame 210-240: Cards settle into grid
- Frame 240-360: Central card color cycles, others fade out
- Frame 360-510: Instagram mobile (scaled up), LinkedIn desktop slides in
- Frame 360-540: 2 rows of wider cards scrolling
- Frame 480-540: CTA with larger fonts over blurred background

**Step 3: Commit**

```bash
git add -A
git commit -m "fix: verify all scene updates in Remotion Studio"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Transformations 8-direction entrance | `Transformations.tsx` |
| 2 | SocialShowcase desktop LinkedIn | `SocialShowcase.tsx` |
| 3 | ScrollingCards 2 rows, width=400 | `ScrollingCards.tsx` |
| 4 | CTA scaled-up fonts | `CTA.tsx` |
| 5 | TypeScript check + verification | All files |
