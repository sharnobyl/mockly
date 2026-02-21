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
        <div style={{ width: 24, height: 24, color: "#fff" }}>✉</div>
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
