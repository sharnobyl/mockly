import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  Sequence,
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
