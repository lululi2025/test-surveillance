import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { CarRearView, FacePortrait, SearchIcon } from "./SvgIcons";
import { CaptionLine, IconTile, PulseRing, StageCard, glassPanelStyle } from "./AppleSimpleMotion";

const SCENE_FRAMES = 80;

const ScanPanel: React.FC<{
  left: number;
  top: number;
  width: number;
  height: number;
  progress: number;
  child: React.ReactNode;
  color: string;
}> = ({ left, top, width, height, progress, child, color }) => (
  <div
    style={{
      ...glassPanelStyle,
      position: "absolute",
      left,
      top,
      width,
      height,
      borderRadius: 28,
      overflow: "hidden",
      background: "linear-gradient(180deg, rgba(252,254,255,0.98) 0%, rgba(245,249,253,0.98) 100%)",
    }}
  >
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {child}
    </div>
    <div
      style={{
        position: "absolute",
        left: 18,
        right: 18,
        top: interpolate(progress, [0, 1], [24, height - 24]),
        height: 2,
        borderRadius: 999,
        background: color,
        opacity: 0.6,
      }}
    />
  </div>
);

export const FacialRecLPR: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = frame < SCENE_FRAMES ? 0 : frame < SCENE_FRAMES * 2 ? 1 : 2;
  const sceneProgress = spring({
    frame: frame - scene * SCENE_FRAMES,
    fps,
    config: { damping: 18, stiffness: 110 },
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 12% 12%, rgba(3,169,244,0.08), transparent 22%), radial-gradient(circle at 86% 16%, rgba(255,162,0,0.07), transparent 18%), linear-gradient(180deg, #F7FBFF 0%, #FFFFFF 100%)",
        fontFamily: FONT,
        overflow: "hidden",
        padding: 28,
      }}
    >
      <StageCard>
        {scene === 0 ? (
          <>
            <ScanPanel
              left={106}
              top={86}
              width={310}
              height={276}
              progress={sceneProgress}
              color={COLORS.brandBlue}
              child={<FacePortrait width={158} color="rgba(16,32,51,0.42)" />}
            />
            <IconTile
              x={530}
              y={138}
              size={134}
              icon={<SearchIcon size={42} color={COLORS.brandBlue} />}
              fill="rgba(255,255,255,0.94)"
              progress={interpolate(sceneProgress, [0.2, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />
            <PulseRing
              x={552}
              y={160}
              size={90}
              color="rgba(3,169,244,0.18)"
              scale={interpolate(sceneProgress, [0.22, 1], [0.8, 1.2], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              opacity={0.35}
            />
            <CaptionLine text="Match faces in seconds." accent={COLORS.brandBlue} />
          </>
        ) : scene === 1 ? (
          <>
            <ScanPanel
              left={106}
              top={86}
              width={430}
              height={276}
              progress={sceneProgress}
              color={COLORS.actionOrange}
              child={<CarRearView width={250} plateText="ABC-1234" color="rgba(16,32,51,0.40)" />}
            />
            <div
              style={{
                position: "absolute",
                left: 232,
                top: 244,
                width: 178,
                height: 48,
                borderRadius: 16,
                border: `2px solid ${COLORS.actionOrange}`,
                boxShadow: `0 0 0 8px rgba(255,162,0,0.08)`,
              }}
            />
            <CaptionLine text="Find license plates just as fast." accent={COLORS.actionOrange} />
          </>
        ) : (
          <>
            <IconTile
              x={122}
              y={158}
              size={138}
              icon={<FacePortrait width={76} color="rgba(16,32,51,0.36)" />}
              fill="rgba(255,255,255,0.94)"
              progress={sceneProgress}
            />
            <IconTile
              x={352}
              y={158}
              size={138}
              icon={<SearchIcon size={44} color={COLORS.successGreen} />}
              fill="rgba(255,255,255,0.94)"
              progress={interpolate(sceneProgress, [0.16, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />
            <IconTile
              x={582}
              y={158}
              size={138}
              icon={<CarRearView width={96} plateText="" color="rgba(16,32,51,0.38)" />}
              fill="rgba(255,255,255,0.94)"
              progress={interpolate(sceneProgress, [0.3, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />
            <svg width="100%" height="100%" viewBox="0 0 960 640" style={{ position: "absolute", inset: 0 }}>
              <line x1="260" y1="227" x2="352" y2="227" stroke="rgba(3,169,244,0.18)" strokeWidth="6" strokeLinecap="round" />
              <line x1="490" y1="227" x2="582" y2="227" stroke="rgba(76,175,80,0.20)" strokeWidth="6" strokeLinecap="round" />
              <circle cx={interpolate(sceneProgress, [0, 0.5], [260, 490], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} cy="227" r="10" fill={COLORS.successGreen} />
            </svg>
            <CaptionLine text="Search one timeline for both." accent={COLORS.successGreen} />
          </>
        )}
      </StageCard>
    </AbsoluteFill>
  );
};
