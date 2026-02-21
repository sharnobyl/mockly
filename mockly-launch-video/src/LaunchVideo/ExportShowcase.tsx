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
                  <div style={{ color: "#666", fontSize: 12 }}>2h - Global</div>
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
