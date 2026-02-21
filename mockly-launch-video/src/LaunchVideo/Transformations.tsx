import {
  AbsoluteFill,
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

  // Get current color
  const currentColor = COLORS[colorIndex];

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
