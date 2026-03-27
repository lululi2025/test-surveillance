import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { CameraIcon, CloudIcon, PersonSilhouette, VehicleSide } from "./SvgIcons";
import { CaptionLine, IconTile, PulseRing, StageCard, fadeUp, glassPanelStyle } from "./AppleSimpleMotion";

const SCENE_FRAMES = 80;

const DetectionFrame: React.FC<{
  personProgress: number;
  vehicleProgress: number;
  active: boolean;
}> = ({ personProgress, vehicleProgress, active }) => {
  const personX = interpolate(personProgress, [0, 1], [128, 220]);
  const carX = interpolate(vehicleProgress, [0, 1], [520, 406]);

  return (
    <div
      style={{
        ...glassPanelStyle,
        position: "absolute",
        left: 58,
        top: 72,
        width: 560,
        height: 300,
        borderRadius: 30,
        overflow: "hidden",
        background:
          "linear-gradient(180deg, rgba(238,246,251,0.98) 0%, rgba(250,252,255,0.98) 100%)",
      }}
    >
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 50 + i * 38,
            height: 1,
            background: "rgba(16,32,51,0.04)",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          left: 60,
          bottom: 46,
          width: 440,
          height: 2,
          background: "rgba(16,32,51,0.08)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: personX,
          top: 138,
          transform: "translate(-50%, -50%)",
        }}
      >
        <PersonSilhouette width={38} color="rgba(16,32,51,0.58)" legAngle={Math.sin(personProgress * 10) * 10} />
        {active && (
          <div
            style={{
              position: "absolute",
              left: -10,
              top: -8,
              width: 58,
              height: 96,
              borderRadius: 14,
              border: `2px solid ${COLORS.successGreen}`,
              boxShadow: `0 0 0 8px rgba(76,175,80,0.08)`,
            }}
          />
        )}
      </div>

      <div
        style={{
          position: "absolute",
          left: carX,
          top: 204,
          transform: "translate(-50%, -50%)",
        }}
      >
        <VehicleSide width={150} color="rgba(16,32,51,0.44)" wheelRotation={vehicleProgress * 180} />
        {active && (
          <div
            style={{
              position: "absolute",
              left: 10,
              top: 4,
              width: 126,
              height: 54,
              borderRadius: 16,
              border: `2px solid ${COLORS.brandBlue}`,
              boxShadow: `0 0 0 8px rgba(3,169,244,0.08)`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export const EdgeAIDetection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = frame < SCENE_FRAMES ? 0 : frame < SCENE_FRAMES * 2 ? 1 : 2;
  const sceneProgress = spring({
    frame: frame - scene * SCENE_FRAMES,
    fps,
    config: { damping: 18, stiffness: 110 },
  });

  const personProgress = interpolate(sceneProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const vehicleProgress = interpolate(sceneProgress, [0.12, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
        {scene < 2 ? (
          <DetectionFrame
            personProgress={personProgress}
            vehicleProgress={vehicleProgress}
            active={scene === 1}
          />
        ) : null}

        {scene === 0 ? (
          <>
            <IconTile
              x={690}
              y={116}
              icon={<CameraIcon size={42} color={COLORS.brandBlue} />}
              fill="rgba(255,255,255,0.92)"
              progress={sceneProgress}
            />
            <IconTile
              x={690}
              y={246}
              icon={<div style={{ display: "flex", gap: 10, alignItems: "center" }}><PersonSilhouette width={22} color={COLORS.successGreen} /><VehicleSide width={60} color={COLORS.brandBlue} /></div>}
              fill="rgba(255,255,255,0.92)"
              progress={interpolate(sceneProgress, [0.18, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />
            <CaptionLine text="See people and vehicles instantly." accent={COLORS.brandBlue} />
          </>
        ) : scene === 1 ? (
          <>
            <PulseRing
              x={204}
              y={124}
              size={70}
              color="rgba(76,175,80,0.24)"
              scale={interpolate(sceneProgress, [0, 1], [0.7, 1.25])}
              opacity={0.35}
            />
            <PulseRing
              x={418}
              y={178}
              size={150}
              color="rgba(3,169,244,0.18)"
              scale={interpolate(sceneProgress, [0, 1], [0.8, 1.08])}
              opacity={0.28}
            />
            <CaptionLine text="Track activity where it happens." accent={COLORS.successGreen} />
          </>
        ) : (
          <>
            <IconTile
              x={112}
              y={162}
              size={124}
              icon={<CameraIcon size={48} color={COLORS.brandBlue} />}
              fill="rgba(255,255,255,0.94)"
              progress={sceneProgress}
            />
            <IconTile
              x={360}
              y={162}
              size={124}
              icon={<div style={{ width: 44, height: 44, borderRadius: 16, background: "rgba(76,175,80,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.successGreen, fontSize: 20, fontWeight: 800 }}>AI</div>}
              fill="rgba(255,255,255,0.94)"
              progress={interpolate(sceneProgress, [0.14, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />
            <IconTile
              x={610}
              y={162}
              size={124}
              icon={<CloudIcon size={48} color={COLORS.actionOrange} />}
              fill="rgba(255,255,255,0.94)"
              progress={interpolate(sceneProgress, [0.28, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />
            <svg width="100%" height="100%" viewBox="0 0 960 640" style={{ position: "absolute", inset: 0 }}>
              <line x1="236" y1="224" x2="360" y2="224" stroke="rgba(3,169,244,0.22)" strokeWidth="6" strokeLinecap="round" />
              <line x1="484" y1="224" x2="610" y2="224" stroke="rgba(255,162,0,0.18)" strokeWidth="6" strokeLinecap="round" />
              <circle cx={interpolate(sceneProgress, [0, 0.45], [236, 484], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} cy="224" r="10" fill={COLORS.brandBlue} />
              <circle cx={interpolate(sceneProgress, [0.45, 1], [484, 610], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} cy="224" r="10" fill={COLORS.actionOrange} />
            </svg>
            <CaptionLine text="Process events right at the edge." accent={COLORS.actionOrange} />
          </>
        )}
      </StageCard>
    </AbsoluteFill>
  );
};
