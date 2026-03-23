import React from "react";
import { Composition } from "remotion";
import { EdgeAIDetection } from "./components/EdgeAIDetection";
import { FacialRecLPR } from "./components/FacialRecLPR";
import { CustomAlertRules } from "./components/CustomAlertRules";
import { EdgeStorage } from "./components/EdgeStorage";
import { NLSearch } from "./components/NLSearch";
import { UnifiedDashboard } from "./components/UnifiedDashboard";
import { CompetitorComparison } from "./components/CompetitorComparison";
import { WIDTH, HEIGHT, FPS, DURATION_FRAMES } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EdgeAIDetection"
        component={EdgeAIDetection}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="FacialRecLPR"
        component={FacialRecLPR}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="CustomAlertRules"
        component={CustomAlertRules}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="EdgeStorage"
        component={EdgeStorage}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="NLSearch"
        component={NLSearch}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="UnifiedDashboard"
        component={UnifiedDashboard}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="CompetitorComparison"
        component={CompetitorComparison}
        durationInFrames={360}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
