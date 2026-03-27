import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { CaptionLine, StageCard, glassPanelStyle } from "./AppleSimpleMotion";

const SCENE_FRAMES = 120;

const Bar: React.FC<{
  x: number;
  height: number;
  progress: number;
  color: string;
}> = ({ x, height, progress, color }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      bottom: 134,
      width: 84,
      height: interpolate(progress, [0, 1], [0, height]),
      borderRadius: 24,
      background: color,
      boxShadow: `0 12px 24px ${color}22`,
    }}
  />
);

export const CompetitorComparison: React.FC = () => {
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
            <Bar x={170} height={122} progress={sceneProgress} color={COLORS.brandBlue} />
            <Bar
              x={324}
              height={174}
              progress={interpolate(sceneProgress, [0.12, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              color="rgba(158,167,179,0.84)"
            />
            <Bar
              x={478}
              height={248}
              progress={interpolate(sceneProgress, [0.24, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              color="rgba(109,211,199,0.84)"
            />
            <Bar
              x={632}
              height={286}
              progress={interpolate(sceneProgress, [0.36, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              color="rgba(255,122,89,0.82)"
            />
            <CaptionLine text="Save more over five years." accent={COLORS.brandBlue} />
          </>
        ) : scene === 1 ? (
          <>
            {[0, 1, 2, 3].map((col) => (
              <div
                key={col}
                style={{
                  position: "absolute",
                  left: 150 + col * 170,
                  top: 132,
                  width: 96,
                  height: 260,
                  borderRadius: 28,
                  ...glassPanelStyle,
                  overflow: "hidden",
                }}
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: 20,
                      right: 20,
                      bottom: 26 + i * 42,
                      height: 22,
                      borderRadius: 999,
                      background:
                        col === 0
                          ? `rgba(3,169,244,${0.18 + i * 0.04})`
                          : `rgba(255,162,0,${0.18 + i * 0.06})`,
                      opacity:
                        col === 0
                          ? interpolate(sceneProgress, [0, 1], [0, i < 2 ? 1 : 0.35])
                          : interpolate(sceneProgress, [0.16 + col * 0.05, 1], [0, 1], {
                              extrapolateLeft: "clamp",
                              extrapolateRight: "clamp",
                            }),
                    }}
                  />
                ))}
              </div>
            ))}
            <CaptionLine text="Avoid forced license costs." accent={COLORS.actionOrange} />
          </>
        ) : (
          <>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  ...glassPanelStyle,
                  position: "absolute",
                  left: 148 + i * 220,
                  top: 168,
                  width: 184,
                  height: 148,
                  borderRadius: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: interpolate(sceneProgress, [i * 0.12, 1], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 22,
                    background:
                      i === 0
                        ? "rgba(3,169,244,0.14)"
                        : i === 1
                          ? "rgba(76,175,80,0.14)"
                          : "rgba(255,162,0,0.14)",
                  }}
                />
              </div>
            ))}
            <svg width="100%" height="100%" viewBox="0 0 960 640" style={{ position: "absolute", inset: 0 }}>
              <line x1="332" y1="242" x2="368" y2="242" stroke="rgba(3,169,244,0.18)" strokeWidth="6" strokeLinecap="round" />
              <line x1="552" y1="242" x2="588" y2="242" stroke="rgba(76,175,80,0.18)" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <CaptionLine text="Keep cloud, AI, and edge storage together." accent={COLORS.successGreen} />
          </>
        )}
      </StageCard>
    </AbsoluteFill>
  );
};
