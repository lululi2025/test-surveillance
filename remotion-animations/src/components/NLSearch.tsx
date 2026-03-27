import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { CameraIcon, SearchIcon } from "./SvgIcons";
import { CaptionLine, IconTile, PulseRing, StageCard, glassPanelStyle } from "./AppleSimpleMotion";

const SCENE_FRAMES = 80;

const SearchBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div
    style={{
      ...glassPanelStyle,
      position: "absolute",
      left: 112,
      top: 116,
      width: 736,
      height: 88,
      borderRadius: 28,
      display: "flex",
      alignItems: "center",
      padding: "0 28px",
      gap: 18,
      opacity: progress,
      transform: `translateY(${interpolate(progress, [0, 1], [18, 0])}px)`,
    }}
  >
    <SearchIcon size={30} color={COLORS.brandBlue} />
    <div
      style={{
        flex: 1,
        height: 12,
        borderRadius: 999,
        background: "linear-gradient(90deg, rgba(3,169,244,0.16) 0%, rgba(76,175,80,0.14) 45%, rgba(255,162,0,0.14) 100%)",
      }}
    />
    <div
      style={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: COLORS.brandBlue,
        boxShadow: `0 0 0 8px ${COLORS.brandBlue}18`,
      }}
    />
  </div>
);

const ResultCard: React.FC<{
  x: number;
  y: number;
  progress: number;
}> = ({ x, y, progress }) => (
  <div
    style={{
      ...glassPanelStyle,
      position: "absolute",
      left: x,
      top: y,
      width: 176,
      height: 122,
      borderRadius: 24,
      padding: 14,
      opacity: progress,
      transform: `translateY(${interpolate(progress, [0, 1], [18, 0])}px)`,
    }}
  >
    <div
      style={{
        width: "100%",
        height: 72,
        borderRadius: 16,
        background: "linear-gradient(180deg, rgba(239,246,251,0.98) 0%, rgba(249,252,255,0.98) 100%)",
        border: "1px solid rgba(13,27,42,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CameraIcon size={34} color={COLORS.brandBlue} />
    </div>
    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
      <div style={{ flex: 1, height: 8, borderRadius: 999, background: "rgba(16,32,51,0.10)" }} />
      <div style={{ width: 42, height: 8, borderRadius: 999, background: "rgba(76,175,80,0.18)" }} />
    </div>
  </div>
);

export const NLSearch: React.FC = () => {
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
          "radial-gradient(circle at 10% 10%, rgba(3,169,244,0.08), transparent 22%), radial-gradient(circle at 86% 12%, rgba(255,162,0,0.06), transparent 18%), linear-gradient(180deg, #F7FBFF 0%, #FFFFFF 100%)",
        fontFamily: FONT,
        overflow: "hidden",
        padding: 28,
      }}
    >
      <StageCard>
        {scene === 0 ? (
          <>
            <SearchBar progress={sceneProgress} />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  ...glassPanelStyle,
                  position: "absolute",
                  left: 182 + i * 188,
                  top: 252,
                  width: 144,
                  height: 54,
                  borderRadius: 18,
                  opacity: interpolate(sceneProgress, [0.14 + i * 0.12, 0.48 + i * 0.12], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              />
            ))}
            <CaptionLine text="Ask with natural language." accent={COLORS.brandBlue} />
          </>
        ) : scene === 1 ? (
          <>
            <SearchBar progress={1} />
            {[0, 1, 2, 3].map((i) => (
              <ResultCard
                key={i}
                x={94 + (i % 2) * 208 + Math.floor(i / 2) * 208}
                y={242}
                progress={interpolate(sceneProgress, [0.08 + i * 0.08, 0.36 + i * 0.08], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}
              />
            ))}
            <PulseRing
              x={414}
              y={114}
              size={112}
              color="rgba(3,169,244,0.18)"
              scale={interpolate(sceneProgress, [0, 1], [0.8, 1.25])}
              opacity={0.34}
            />
            <CaptionLine text="Let AI narrow the footage fast." accent={COLORS.successGreen} />
          </>
        ) : (
          <>
            <div
              style={{
                ...glassPanelStyle,
                position: "absolute",
                left: 104,
                top: 148,
                width: 752,
                height: 192,
                borderRadius: 28,
                padding: 22,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 94,
                  borderRadius: 22,
                  background: "linear-gradient(180deg, rgba(239,246,251,0.98) 0%, rgba(249,252,255,0.98) 100%)",
                  border: "1px solid rgba(13,27,42,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CameraIcon size={42} color={COLORS.brandBlue} />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 32,
                  right: 32,
                  bottom: 24,
                  height: 10,
                  borderRadius: 999,
                  background: "rgba(16,32,51,0.08)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: interpolate(sceneProgress, [0, 1], [42, 598]),
                  bottom: 20,
                  width: 90,
                  height: 18,
                  borderRadius: 999,
                  background: COLORS.successGreen,
                  boxShadow: `0 0 0 8px rgba(76,175,80,0.14)`,
                }}
              />
            </div>
            <CaptionLine text="Jump straight to the right clip." accent={COLORS.successGreen} />
          </>
        )}
      </StageCard>
    </AbsoluteFill>
  );
};
