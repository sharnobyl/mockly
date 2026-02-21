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
