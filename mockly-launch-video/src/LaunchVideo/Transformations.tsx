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
