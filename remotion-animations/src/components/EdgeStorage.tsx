import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { CameraIcon, CloudIcon, StorageIcon } from "./SvgIcons";
import { CaptionLine, IconTile, PulseRing, StageCard } from "./AppleSimpleMotion";

const SCENE_FRAMES = 80;

const PacketDot: React.FC<{
  progress: number;
  startX: number;
  endX: number;
  y: number;
  color: string;
}> = ({ progress, startX, endX, y, color }) => (
  <div
    style={{
      position: "absolute",
      left: interpolate(progress, [0, 1], [startX, endX]),
      top: y,
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: color,
      boxShadow: `0 0 0 6px ${color}22`,
    }}
  />
);

export const EdgeStorage: React.FC = () => {
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
            <IconTile
              x={154}
              y={156}
              size={150}
              icon={<CameraIcon size={56} color={COLORS.brandBlue} />}
              fill="rgba(255,255,255,0.96)"
              progress={sceneProgress}
            />
            <IconTile
              x={420}
              y={156}
              size={150}
              icon={<StorageIcon size={58} color={COLORS.successGreen} />}
              fill="rgba(255,255,255,0.96)"
              progress={interpolate(sceneProgress, [0.22, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <svg width="100%" height="100%" viewBox="0 0 960 640" style={{ position: "absolute", inset: 0 }}>
              <line x1="304" y1="231" x2="420" y2="231" stroke="rgba(76,175,80,0.20)" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <PacketDot
              progress={interpolate(sceneProgress, [0.26, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              startX={304}
              endX={420}
              y={225}
              color={COLORS.successGreen}
            />
            <CaptionLine text="Record to the camera first." accent={COLORS.successGreen} />
          </>
        ) : scene === 1 ? (
          <>
            <IconTile
              x={124}
              y={156}
              size={142}
              icon={<CameraIcon size={52} color={COLORS.brandBlue} />}
              fill="rgba(255,255,255,0.96)"
              progress={sceneProgress}
            />
            <IconTile
              x={394}
              y={156}
              size={142}
              icon={<StorageIcon size={54} color={COLORS.successGreen} />}
              fill="rgba(255,255,255,0.96)"
              progress={interpolate(sceneProgress, [0.12, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <IconTile
              x={664}
              y={156}
              size={142}
              icon={<CloudIcon size={54} color={COLORS.actionOrange} />}
              fill="rgba(255,255,255,0.96)"
              progress={interpolate(sceneProgress, [0.24, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <svg width="100%" height="100%" viewBox="0 0 960 640" style={{ position: "absolute", inset: 0 }}>
              <line x1="266" y1="227" x2="394" y2="227" stroke="rgba(76,175,80,0.18)" strokeWidth="6" strokeLinecap="round" />
              <line x1="536" y1="227" x2="664" y2="227" stroke="rgba(255,162,0,0.16)" strokeWidth="6" strokeLinecap="round" />
            </svg>
            {[0, 0.24, 0.48].map((delay, index) => (
              <PacketDot
                key={index}
                progress={interpolate(sceneProgress, [delay, Math.min(delay + 0.36, 1)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
                startX={536}
                endX={664}
                y={221 + index * 12}
                color={COLORS.actionOrange}
              />
            ))}
            <CaptionLine text="Sync only what matters to the cloud." accent={COLORS.actionOrange} />
          </>
        ) : (
          <>
            {[0, 1, 2].map((i) => (
              <IconTile
                key={i}
                x={110 + i * 190}
                y={148 + (i % 2) * 26}
                size={126}
                icon={<CameraIcon size={44} color={COLORS.brandBlue} />}
                fill="rgba(255,255,255,0.96)"
                progress={interpolate(sceneProgress, [i * 0.12, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              />
            ))}
            {[0, 1, 2].map((i) => (
              <IconTile
                key={`s${i}`}
                x={174 + i * 190}
                y={248 + (i % 2) * 26}
                size={92}
                radius={24}
                icon={<StorageIcon size={34} color={COLORS.successGreen} />}
                fill="rgba(255,255,255,0.94)"
                progress={interpolate(sceneProgress, [0.16 + i * 0.12, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              />
            ))}
            <IconTile
              x={688}
              y={176}
              size={146}
              icon={<CloudIcon size={54} color={COLORS.brandBlue} />}
              fill="rgba(255,255,255,0.96)"
              progress={interpolate(sceneProgress, [0.3, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <PulseRing
              x={714}
              y={202}
              size={96}
              color="rgba(3,169,244,0.18)"
              scale={interpolate(sceneProgress, [0.4, 1], [0.8, 1.24], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              opacity={0.34}
            />
            <CaptionLine text="Keep storage simple and resilient." accent={COLORS.brandBlue} />
          </>
        )}
      </StageCard>
    </AbsoluteFill>
  );
};
