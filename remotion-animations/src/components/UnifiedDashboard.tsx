import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { CameraIcon, GatewayIcon, SwitchIcon } from "./SvgIcons";
import { CaptionLine, IconTile, PulseRing, StageCard } from "./AppleSimpleMotion";

const SCENE_FRAMES = 80;

export const UnifiedDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = frame < SCENE_FRAMES ? 0 : frame < SCENE_FRAMES * 2 ? 1 : 2;
  const sceneProgress = spring({
    frame: frame - scene * SCENE_FRAMES,
    fps,
    config: { damping: 18, stiffness: 110 },
  });

  const lineProgress = interpolate(sceneProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
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
              x={170}
              y={112}
              size={132}
              icon={<CameraIcon size={48} color={COLORS.brandBlue} />}
              fill="rgba(255,255,255,0.96)"
              progress={sceneProgress}
            />
            <IconTile
              x={414}
              y={112}
              size={132}
              icon={<SwitchIcon size={50} color={COLORS.successGreen} />}
              fill="rgba(255,255,255,0.96)"
              progress={interpolate(sceneProgress, [0.18, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <IconTile
              x={658}
              y={112}
              size={132}
              icon={<GatewayIcon size={50} color={COLORS.actionOrange} />}
              fill="rgba(255,255,255,0.96)"
              progress={interpolate(sceneProgress, [0.36, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <svg width="100%" height="100%" viewBox="0 0 960 640" style={{ position: "absolute", inset: 0 }}>
              <line x1="302" y1="178" x2="414" y2="178" stroke="rgba(3,169,244,0.18)" strokeWidth="6" strokeLinecap="round" />
              <line x1="546" y1="178" x2="658" y2="178" stroke="rgba(255,162,0,0.18)" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <CaptionLine text="See cameras, network, and power together." accent={COLORS.brandBlue} />
          </>
        ) : scene === 1 ? (
          <>
            <IconTile
              x={170}
              y={112}
              size={132}
              icon={<CameraIcon size={48} color={COLORS.alertRed} />}
              fill="rgba(255,255,255,0.96)"
              border={`2px solid rgba(234,61,86,0.28)`}
              progress={sceneProgress}
            />
            <IconTile
              x={414}
              y={112}
              size={132}
              icon={<SwitchIcon size={50} color={COLORS.brandBlue} />}
              fill="rgba(255,255,255,0.96)"
              progress={interpolate(sceneProgress, [0.1, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <IconTile
              x={658}
              y={112}
              size={132}
              icon={<GatewayIcon size={50} color={COLORS.actionOrange} />}
              fill="rgba(255,255,255,0.96)"
              progress={interpolate(sceneProgress, [0.2, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <svg width="100%" height="100%" viewBox="0 0 960 640" style={{ position: "absolute", inset: 0 }}>
              <line x1="302" y1="178" x2="414" y2="178" stroke="rgba(16,32,51,0.10)" strokeWidth="6" strokeLinecap="round" />
              <line x1="546" y1="178" x2="658" y2="178" stroke="rgba(16,32,51,0.10)" strokeWidth="6" strokeLinecap="round" />
              <line x1="302" y1="178" x2={interpolate(lineProgress, [0, 0.55], [302, 546], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} y2="178" stroke={COLORS.actionOrange} strokeWidth="7" strokeLinecap="round" />
              <circle cx={interpolate(lineProgress, [0, 1], [302, 658], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} cy="178" r="10" fill={COLORS.actionOrange} />
            </svg>
            <PulseRing
              x={686}
              y={150}
              size={78}
              color="rgba(255,162,0,0.20)"
              scale={interpolate(sceneProgress, [0.55, 1], [0.8, 1.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              opacity={0.34}
            />
            <CaptionLine text="Trace issues across the full stack." accent={COLORS.actionOrange} />
          </>
        ) : (
          <>
            <IconTile
              x={170}
              y={112}
              size={132}
              icon={<CameraIcon size={48} color={COLORS.successGreen} />}
              fill="rgba(255,255,255,0.96)"
              border={`2px solid rgba(76,175,80,0.28)`}
              progress={sceneProgress}
            />
            <IconTile
              x={414}
              y={112}
              size={132}
              icon={<SwitchIcon size={50} color={COLORS.brandBlue} />}
              fill="rgba(255,255,255,0.96)"
              progress={interpolate(sceneProgress, [0.1, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <IconTile
              x={658}
              y={112}
              size={132}
              icon={<GatewayIcon size={50} color={COLORS.successGreen} />}
              fill="rgba(255,255,255,0.96)"
              border={`2px solid rgba(76,175,80,0.28)`}
              progress={interpolate(sceneProgress, [0.2, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <svg width="100%" height="100%" viewBox="0 0 960 640" style={{ position: "absolute", inset: 0 }}>
              <line x1="302" y1="178" x2="414" y2="178" stroke={COLORS.successGreen} strokeWidth="7" strokeLinecap="round" />
              <line x1="546" y1="178" x2="658" y2="178" stroke={COLORS.successGreen} strokeWidth="7" strokeLinecap="round" />
              <circle cx={interpolate(lineProgress, [0, 1], [302, 658], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} cy="178" r="10" fill={COLORS.successGreen} />
            </svg>
            <PulseRing
              x={198}
              y={140}
              size={88}
              color="rgba(76,175,80,0.20)"
              scale={interpolate(sceneProgress, [0.35, 1], [0.8, 1.28], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              opacity={0.34}
            />
            <CaptionLine text="Recover remotely from one place." accent={COLORS.successGreen} />
          </>
        )}
      </StageCard>
    </AbsoluteFill>
  );
};
