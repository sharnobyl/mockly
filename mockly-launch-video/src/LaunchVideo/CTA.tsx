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
