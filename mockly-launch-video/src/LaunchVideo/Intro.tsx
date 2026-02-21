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
