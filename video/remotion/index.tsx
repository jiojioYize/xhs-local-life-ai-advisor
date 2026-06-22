import React from "react";
import { Composition, registerRoot } from "remotion";
import { AdvisorDemoVideo } from "./src/AdvisorDemoVideo";

const Root = () => (
  <Composition
    id="AdvisorDemoVideo"
    component={AdvisorDemoVideo}
    durationInFrames={1200}
    fps={30}
    width={1080}
    height={1920}
  />
);

registerRoot(Root);
