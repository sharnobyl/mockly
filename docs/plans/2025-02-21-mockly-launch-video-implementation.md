# Mockly Launch Video Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Mockly launch video with dark theme matching the app UI, showcasing card customization and multi-platform export capabilities.

**Architecture:** 5-scene video structure with Intro → CardReveal → Transformations → ExportShowcase → CTA. Uses Remotion's spring animations and interpolate for smooth transitions. Cards match the actual app's dark styling.

**Tech Stack:** Remotion, React, TypeScript, spring/interpolate animations

**Design Doc:** `docs/plans/2025-02-21-mockly-launch-video-redesign.md`

---

## Task 1: Update Root.tsx with new duration and colors

**Files:**
- Modify: `mockly-launch-video/src/Root.tsx`

**Step 1: Update composition settings**

Change duration from 420 to 540 frames (18 seconds) and update default colors to match app:

```tsx
import { Composition } from "remotion";
import { LaunchVideo, launchVideoSchema } from "./LaunchVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LaunchVideo"
        component={LaunchVideo}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
        schema={launchVideoSchema}
        defaultProps={{
          primaryColor: "#1e1e1e",
          accentColor: "#2d49b9",
          backgroundColor: "#1e1e1e",
        }}
      />
    </>
  );
};
```

**Step 2: Verify with Remotion Studio**

Run: `cd mockly-launch-video && npm run dev`
Expected: Studio opens, video shows 18s duration in UI

**Step 3: Commit**

```bash
git add mockly-launch-video/src/Root.tsx
git commit -m "feat: update video duration to 18s and match app color scheme"
```

---

## Task 2: Create shared SocialCard component

**Files:**
- Create: `mockly-launch-video/src/components/SocialCard.tsx`

**Step 1: Create reusable card component**

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

  const cardStyle: React.CSSProperties = {
    width,
    height: height || "auto",
    backgroundColor: bgColor,
    borderRadius: 16,
    overflow: "hidden",
    transform: `scale(${scale})`,
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
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

      {/* Image */}
      {showImage && (
        <div
          style={{
            width: "100%",
            height: 180,
            backgroundColor: "#1a1a2e",
            opacity: imageOpacity,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 10px 10px",
            borderRadius: 8,
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

**Step 2: Verify component renders**

Run: `cd mockly-launch-video && npm run dev`
Expected: No TypeScript errors

**Step 3: Commit**

```bash
git add mockly-launch-video/src/components/SocialCard.tsx
git commit -m "feat: add shared SocialCard component matching app styling"
```

---

## Task 3: Create Intro scene component

**Files:**
- Create: `mockly-launch-video/src/LaunchVideo/Intro.tsx`

**Step 1: Create Intro component**

```tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Introducing" fade in
  const introducingOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Mockly" spring animation
  const mocklyScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  const mocklyOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "ly" accent color
  const lyHue = interpolate(frame, [30, 60], [210, 230], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge fade in
  const badgeOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeY = interpolate(frame, [50, 70], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1e1e1e",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Introducing text */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 500,
          color: "#8c8c8c",
          marginBottom: 16,
          opacity: introducingOpacity,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "1px",
        }}
      >
        Introducing
      </div>

      {/* Mockly logo text */}
      <div
        style={{
          fontSize: 96,
          fontWeight: 800,
          fontFamily: "'Syne', sans-serif",
          transform: `scale(${mocklyScale})`,
          opacity: mocklyOpacity,
          letterSpacing: "-3px",
        }}
      >
        <span style={{ color: "#ffffff" }}>Mock</span>
        <span style={{ color: `hsl(${lyHue}, 65%, 45%)` }}>ly</span>
      </div>

      {/* Badge */}
      <div
        style={{
          marginTop: 32,
          padding: "8px 20px",
          backgroundColor: "#2d49b9",
          borderRadius: 99,
          fontSize: 12,
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "1px",
          textTransform: "uppercase",
          opacity: badgeOpacity,
          transform: `translateY(${badgeY}px)`,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        by Hot Off The Patent Press
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Verify in Remotion Studio**

Run: `cd mockly-launch-video && npm run dev`
Expected: Intro scene shows text animations correctly

**Step 3: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo/Intro.tsx
git commit -m "feat: add Intro scene with text reveal animations"
```

---

## Task 4: Create CardReveal scene component

**Files:**
- Create: `mockly-launch-video/src/LaunchVideo/CardReveal.tsx`

**Step 1: Create CardReveal component**

```tsx
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SocialCard } from "../components/SocialCard";

export const CardReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card entrance
  const cardScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1e1e1e",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ transform: `scale(${cardScale * 0.9})` }}>
        <SocialCard
          name="Mockly"
          handle="@mockly.app"
          headline="Create beautiful social cards"
          body="Design Twitter/X-style social cards in seconds. Customize colors, fonts, images, and layout."
          showImage={false}
          width={450}
          animated={true}
        />
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Verify in Remotion Studio**

Run: `cd mockly-launch-video && npm run dev`
Expected: Card reveals with staggered element animations

**Step 3: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo/CardReveal.tsx
git commit -m "feat: add CardReveal scene with staggered card animations"
```

---

## Task 5: Create Transformations scene component

**Files:**
- Create: `mockly-launch-video/src/LaunchVideo/Transformations.tsx`

**Step 1: Create Transformations component with color shifts and split effect**

```tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SocialCard } from "../components/SocialCard";

const PRESETS = [
  { name: "Twitter", width: 280, height: "auto" as const, label: "Twitter/X" },
  { name: "Instagram", width: 200, height: 200, label: "Instagram" },
  { name: "LinkedIn", width: 320, height: "auto" as const, label: "LinkedIn" },
  { name: "Story", width: 140, height: 250, label: "Story" },
  { name: "OG", width: 360, height: 188, label: "OG Image" },
];

export const Transformations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Color shift (0-60 local frames)
  const bgHue = interpolate(
    frame,
    [0, 30, 60],
    [0, 220, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const bgColor = frame < 60
    ? `hsl(${bgHue}, 50%, 5%)`
    : "#000000";

  // Phase 2: Text changes (60-100 local frames)
  const textPhase = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headline = textPhase > 0.5
    ? "Customize everything"
    : "Create beautiful social cards";

  const body = textPhase > 0.5
    ? "Colors, fonts, images - make it yours."
    : "Design Twitter/X-style social cards in seconds.";

  // Phase 3: Image appears (100-120 local frames)
  const showImage = frame >= 100;
  const imageOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: Split to presets (120-180 local frames)
  const splitProgress = spring({
    frame: frame - 120,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const showSplit = frame >= 120;

  // Single card position (before split)
  const singleCardX = interpolate(splitProgress, [0, 1], [0, -600], {
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
      {!showSplit ? (
        // Single transforming card
        <div style={{ transform: `translateX(${singleCardX}px)` }}>
          <SocialCard
            name="Mockly"
            handle="@mockly.app"
            headline={headline}
            body={body}
            bgColor={bgColor}
            showImage={showImage}
            width={420}
            animated={false}
            scale={0.85}
          />
        </div>
      ) : (
        // Split into presets
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            transform: `scale(${0.55})`,
          }}
        >
          {PRESETS.map((preset, index) => {
            const delay = index * 5;
            const cardScale = spring({
              frame: frame - 120 - delay,
              fps,
              config: { damping: 12, stiffness: 100 },
            });

            const labelOpacity = interpolate(
              frame,
              [150 + delay, 165 + delay],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={preset.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  transform: `scale(${cardScale})`,
                }}
              >
                <SocialCard
                  name="Mockly"
                  handle="@mockly.app"
                  headline="Perfect for every platform"
                  body="Export in any size."
                  width={preset.width}
                  height={preset.height === "auto" ? undefined : preset.height}
                  showImage={true}
                  animated={false}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#8c8c8c",
                    opacity: labelOpacity,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {preset.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
```

**Step 2: Verify in Remotion Studio**

Run: `cd mockly-launch-video && npm run dev`
Expected: Card transforms colors, text, shows image, then splits into 5 presets

**Step 3: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo/Transformations.tsx
git commit -m "feat: add Transformations scene with color shift and split effect"
```

---

## Task 6: Create ExportShowcase scene component

**Files:**
- Create: `mockly-launch-video/src/LaunchVideo/ExportShowcase.tsx`

**Step 1: Create ExportShowcase with device mockups**

```tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SocialCard } from "../components/SocialCard";

// Phone mockup SVG component
const PhoneMockup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: 280,
      height: 560,
      backgroundColor: "#1a1a1a",
      borderRadius: 40,
      padding: 12,
      border: "3px solid #333",
      position: "relative",
    }}
  >
    {/* Notch */}
    <div
      style={{
        position: "absolute",
        top: 8,
        left: "50%",
        transform: "translateX(-50%)",
        width: 80,
        height: 24,
        backgroundColor: "#000",
        borderRadius: 12,
      }}
    />
    {/* Screen */}
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        borderRadius: 28,
        overflow: "hidden",
        paddingTop: 36,
      }}
    >
      {children}
    </div>
  </div>
);

// Desktop mockup component
const DesktopMockup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: 600,
      backgroundColor: "#1a1a1a",
      borderRadius: 12,
      overflow: "hidden",
      border: "2px solid #333",
    }}
  >
    {/* Browser chrome */}
    <div
      style={{
        height: 36,
        backgroundColor: "#2d2d2d",
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        gap: 8,
      }}
    >
      {/* Traffic lights */}
      <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
      <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
      <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28ca41" }} />
      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, marginLeft: 16 }}>
        {["LinkedIn", "Facebook", "Reddit"].map((tab) => (
          <div
            key={tab}
            style={{
              padding: "4px 12px",
              backgroundColor: tab === "LinkedIn" ? "#3d3d3d" : "transparent",
              borderRadius: 6,
              fontSize: 11,
              color: "#888",
            }}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
    {/* Content */}
    <div style={{ padding: 20, backgroundColor: "#1e1e1e" }}>{children}</div>
  </div>
);

export const ExportShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone slides in from left
  const phoneX = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const phoneTranslateX = interpolate(phoneX, [0, 1], [-400, 0]);

  // Desktop slides in from right
  const desktopX = spring({
    frame: frame - 30,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const desktopTranslateX = interpolate(desktopX, [0, 1], [400, 0]);

  // "Export anywhere" text
  const textOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1e1e1e",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 40,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: "#ffffff",
          fontFamily: "'Syne', sans-serif",
          opacity: textOpacity,
        }}
      >
        Export anywhere
      </div>

      {/* Device mockups */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* Phone - Instagram */}
        <div style={{ transform: `translateX(${phoneTranslateX}px)` }}>
          <PhoneMockup>
            <div
              style={{
                backgroundColor: "#000",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
            >
              {/* Instagram-style header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                  alignSelf: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: "#2d49b9",
                  }}
                />
                <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>mockly.app</span>
              </div>
              <SocialCard
                name="Mockly"
                handle="@mockly.app"
                headline="Perfect for Instagram"
                body="Square format ready."
                width={200}
                height={200}
                showImage={true}
                animated={false}
                scale={0.9}
              />
            </div>
          </PhoneMockup>
        </div>

        {/* Desktop - LinkedIn */}
        <div style={{ transform: `translateX(${desktopTranslateX}px)` }}>
          <DesktopMockup>
            {/* LinkedIn post mockup */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#2d49b9",
                  }}
                />
                <div>
                  <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Mockly</div>
                  <div style={{ color: "#666", fontSize: 12 }}>2h · 🌐</div>
                </div>
              </div>
              <div style={{ color: "#e0e0e0", fontSize: 14 }}>
                Check out our new social card creator!
              </div>
              <SocialCard
                name="Mockly"
                handle="@mockly.app"
                headline="Share everywhere"
                body="LinkedIn, Facebook, Reddit..."
                width={360}
                showImage={true}
                animated={false}
                scale={0.7}
              />
            </div>
          </DesktopMockup>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Verify in Remotion Studio**

Run: `cd mockly-launch-video && npm run dev`
Expected: Phone and desktop mockups slide in with cards embedded

**Step 3: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo/ExportShowcase.tsx
git commit -m "feat: add ExportShowcase scene with device mockups"
```

---

## Task 7: Update CTA scene component

**Files:**
- Modify: `mockly-launch-video/src/LaunchVideo/CTA.tsx`

**Step 1: Update CTA with new styling**

```tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle pulse
  const pulse = Math.sin(frame * 0.1) * 0.02 + 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1e1e1e",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          transform: `scale(${scale * pulse})`,
          opacity,
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

**Step 2: Verify in Remotion Studio**

Run: `cd mockly-launch-video && npm run dev`
Expected: CTA shows dark theme with accent button

**Step 3: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo/CTA.tsx
git commit -m "feat: update CTA scene with dark theme styling"
```

---

## Task 8: Update LaunchVideo.tsx with new scene structure

**Files:**
- Modify: `mockly-launch-video/src/LaunchVideo.tsx`

**Step 1: Replace scene imports and structure**

```tsx
import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { z } from "zod";
import { Intro } from "./LaunchVideo/Intro";
import { CardReveal } from "./LaunchVideo/CardReveal";
import { Transformations } from "./LaunchVideo/Transformations";
import { ExportShowcase } from "./LaunchVideo/ExportShowcase";
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
  const frame = useCurrentFrame();

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

      {/* Scene 3: Transformations (180-360 frames = 6-12s) */}
      <Sequence from={180} durationInFrames={180}>
        <Transformations />
      </Sequence>

      {/* Scene 4: Export Showcase (360-510 frames = 12-17s) */}
      <Sequence from={360} durationInFrames={150}>
        <ExportShowcase />
      </Sequence>

      {/* Scene 5: CTA (510-540 frames = 17-18s) */}
      <Sequence from={510} durationInFrames={30}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
```

**Step 2: Remove old unused components**

Delete the old scene files that are no longer needed:
- `src/LaunchVideo/Logo.tsx`
- `src/LaunchVideo/Tagline.tsx`
- `src/LaunchVideo/CardDemo.tsx`
- `src/LaunchVideo/Features.tsx`

**Step 3: Verify full video plays**

Run: `cd mockly-launch-video && npm run dev`
Expected: Full 18-second video plays with all 5 scenes in sequence

**Step 4: Commit**

```bash
git add mockly-launch-video/src/LaunchVideo.tsx
git rm mockly-launch-video/src/LaunchVideo/Logo.tsx
git rm mockly-launch-video/src/LaunchVideo/Tagline.tsx
git rm mockly-launch-video/src/LaunchVideo/CardDemo.tsx
git rm mockly-launch-video/src/LaunchVideo/Features.tsx
git commit -m "feat: restructure video with new 5-scene layout"
```

---

## Task 9: Create components directory index

**Files:**
- Create: `mockly-launch-video/src/components/index.ts`

**Step 1: Create barrel export**

```tsx
export * from "./SocialCard";
```

**Step 2: Commit**

```bash
git add mockly-launch-video/src/components/index.ts
git commit -m "feat: add components barrel export"
```

---

## Task 10: Final verification and render

**Step 1: Run full video in Remotion Studio**

Run: `cd mockly-launch-video && npm run dev`
Expected: All scenes play smoothly, no TypeScript errors, transitions look good

**Step 2: Render the video**

Run: `cd mockly-launch-video && npm run render`
Expected: Video renders to `out/mockly-launch.mp4`

**Step 3: Watch the rendered video and verify**

Open the rendered video and check:
- Intro: "Introducing Mockly" + badge appears correctly
- CardReveal: Card animates in with staggered elements
- Transformations: Color shifts, text changes, image appears, split to 5 presets
- ExportShowcase: Phone and desktop mockups slide in with cards
- CTA: "Try it free" + mockly.app badge

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Mockly launch video redesign"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Update Root.tsx | `Root.tsx` |
| 2 | Create SocialCard component | `components/SocialCard.tsx` |
| 3 | Create Intro scene | `LaunchVideo/Intro.tsx` |
| 4 | Create CardReveal scene | `LaunchVideo/CardReveal.tsx` |
| 5 | Create Transformations scene | `LaunchVideo/Transformations.tsx` |
| 6 | Create ExportShowcase scene | `LaunchVideo/ExportShowcase.tsx` |
| 7 | Update CTA scene | `LaunchVideo/CTA.tsx` |
| 8 | Update LaunchVideo.tsx | `LaunchVideo.tsx`, delete old files |
| 9 | Create components index | `components/index.ts` |
| 10 | Final verification | Render and test |
