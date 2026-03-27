import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { AlertBellIcon, PersonSilhouette } from "./SvgIcons";
import { CaptionLine, IconTile, PulseRing, StageCard, glassPanelStyle } from "./AppleSimpleMotion";

const SCENE_FRAMES = 80;

const ZonePreview: React.FC<{
  progress: number;
  mode: "build" | "breach" | "alert";
}> = ({ progress, mode }) => {
  const personX = interpolate(progress, [0, 1], [128, 286]);
  const inZone = mode !== "build" && progress > 0.55;

  return (
    <div
      style={{
        ...glassPanelStyle,
        position: "absolute",
        right: 58,
        top: 88,
        width: 360,
        height: 258,
        borderRadius: 28,
        overflow: "hidden",
        background: "linear-gradient(180deg, rgba(251,253,255,0.98) 0%, rgba(245,249,253,0.98) 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 26,
          top: 36,
          width: 134,
          height: 112,
          borderRadius: 18,
          border: `2px dashed ${mode === "alert" ? COLORS.successGreen : inZone ? COLORS.alertRed : COLORS.actionOrange}`,
          background:
            mode === "alert"
              ? "rgba(76,175,80,0.08)"
              : inZone
                ? "rgba(234,61,86,0.08)"
                : "rgba(255,162,0,0.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: personX,
          top: 170,
          transform: "translate(-50%, -50%)",
        }}
      >
        <PersonSilhouette
          width={38}
          color={
            mode === "alert"
              ? "rgba(76,175,80,0.78)"
              : inZone
                ? "rgba(234,61,86,0.76)"
                : "rgba(16,32,51,0.54)"
          }
          legAngle={Math.sin(progress * 10) * 10}
        />
        {(inZone || mode === "alert") && (
          <div
            style={{
              position: "absolute",
              left: -10,
              top: -8,
              width: 56,
              height: 96,
              borderRadius: 14,
              border: `2px solid ${mode === "alert" ? COLORS.successGreen : COLORS.alertRed}`,
              boxShadow: `0 0 0 8px ${mode === "alert" ? "rgba(76,175,80,0.10)" : "rgba(234,61,86,0.08)"}`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export const CustomAlertRules: React.FC = () => {
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
              x={88}
              y={152}
              icon={<PersonSilhouette width={44} color={COLORS.brandBlue} />}
              fill="rgba(255,255,255,0.94)"
              progress={sceneProgress}
            />
            <IconTile
              x={260}
              y={152}
              icon={<div style={{ width: 46, height: 46, borderRadius: "50%", border: `3px solid ${COLORS.actionOrange}`, position: "relative" }}><div style={{ position: "absolute", left: 21, top: 8, width: 3, height: 16, borderRadius: 3, background: COLORS.actionOrange }} /><div style={{ position: "absolute", left: 21, top: 20, width: 12, height: 3, borderRadius: 3, background: COLORS.actionOrange }} /></div>}
              fill="rgba(255,255,255,0.94)"
              progress={interpolate(sceneProgress, [0.16, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <IconTile
              x={432}
              y={152}
              icon={<div style={{ width: 52, height: 52, borderRadius: 18, border: `2px dashed ${COLORS.alertRed}` }} />}
              fill="rgba(255,255,255,0.94)"
              progress={interpolate(sceneProgress, [0.32, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <IconTile
              x={604}
              y={152}
              icon={<AlertBellIcon size={42} color={COLORS.successGreen} />}
              fill="rgba(255,255,255,0.94)"
              progress={interpolate(sceneProgress, [0.48, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <svg width="100%" height="100%" viewBox="0 0 960 640" style={{ position: "absolute", inset: 0 }}>
              <line x1="198" y1="207" x2="260" y2="207" stroke="rgba(3,169,244,0.18)" strokeWidth="6" strokeLinecap="round" />
              <line x1="370" y1="207" x2="432" y2="207" stroke="rgba(255,162,0,0.18)" strokeWidth="6" strokeLinecap="round" />
              <line x1="542" y1="207" x2="604" y2="207" stroke="rgba(76,175,80,0.20)" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <CaptionLine text="Build the rule you need." accent={COLORS.brandBlue} />
          </>
        ) : scene === 1 ? (
          <>
            <ZonePreview progress={sceneProgress} mode="breach" />
            <PulseRing
              x={730}
              y={120}
              size={84}
              color="rgba(234,61,86,0.20)"
              scale={interpolate(sceneProgress, [0.4, 1], [0.8, 1.25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              opacity={0.34}
            />
            <CaptionLine text="Watch the rule trigger itself." accent={COLORS.alertRed} />
          </>
        ) : (
          <>
            <ZonePreview progress={0.88} mode="alert" />
            <IconTile
              x={120}
              y={164}
              size={152}
              icon={<AlertBellIcon size={56} color={COLORS.successGreen} />}
              fill="rgba(255,255,255,0.96)"
              progress={sceneProgress}
            />
            <PulseRing
              x={154}
              y={198}
              size={84}
              color="rgba(76,175,80,0.22)"
              scale={interpolate(sceneProgress, [0, 1], [0.7, 1.28])}
              opacity={0.36}
            />
            <PulseRing
              x={154}
              y={198}
              size={84}
              color="rgba(76,175,80,0.14)"
              scale={interpolate(sceneProgress, [0, 1], [1, 1.56])}
              opacity={0.26}
            />
            <CaptionLine text="Send alerts the moment it matters." accent={COLORS.successGreen} />
          </>
        )}
      </StageCard>
    </AbsoluteFill>
  );
};
