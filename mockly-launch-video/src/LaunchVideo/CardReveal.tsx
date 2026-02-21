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
