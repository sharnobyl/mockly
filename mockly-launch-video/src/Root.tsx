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
