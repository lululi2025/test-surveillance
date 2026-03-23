import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { PersonSilhouette, VehicleSide } from "./SvgIcons";

// Bounding box component for detected objects
const DetectionBox: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  confidence: number;
  color: string;
  opacity: number;
}> = ({ x, y, w, h, label, confidence, color, opacity }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      opacity,
    }}
  >
    {/* Corner brackets */}
    {[
      { top: 0, left: 0, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
      { top: 0, right: 0, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` },
      { bottom: 0, left: 0, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
      { bottom: 0, right: 0, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` },
    ].map((style, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          width: 12,
          height: 12,
          ...style,
        }}
      />
    ))}
    {/* Thin border */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        border: `1px solid ${color}40`,
        borderRadius: 2,
      }}
    />
    {/* Label tag */}
    <div
      style={{
        position: "absolute",
        top: -24,
        left: -1,
        background: color,
        color: "#fff",
        fontSize: 11,
        fontFamily: FONT,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: "4px 4px 4px 0",
        whiteSpace: "nowrap",
        boxShadow: `0 2px 8px ${color}40`,
      }}
    >
      {label} {Math.round(confidence * 100)}%
    </div>
  </div>
);

// Tripwire line
const TripwireLine: React.FC<{ y: number; crossed: boolean; frame: number }> = ({
  y,
  crossed,
  frame,
}) => {
  const glow = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.5, 1]);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: y,
          height: 2,
          background: crossed ? COLORS.alertRed : COLORS.actionOrange,
          opacity: glow * 0.8,
          boxShadow: crossed
            ? `0 0 16px ${COLORS.alertRed}80`
            : `0 0 10px ${COLORS.actionOrange}60`,
        }}
      />
      {/* Dashed guide lines */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: y - 1,
          height: 0,
          borderTop: `1px dashed ${crossed ? COLORS.alertRed : COLORS.actionOrange}30`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 62,
          top: y - 22,
          fontSize: 10,
          fontFamily: FONT,
          fontWeight: 700,
          color: COLORS.actionOrange,
          textTransform: "uppercase",
          letterSpacing: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 8 }}>▼</span> Tripwire Zone
      </div>
    </>
  );
};

export const EdgeAIDetection: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Person walking across (left to right)
  const personProgress = interpolate(
    frame % durationInFrames,
    [0, durationInFrames],
    [0, 1]
  );
  const personX = interpolate(personProgress, [0, 1], [-40, 920]);
  const personY = 260;
  const personCrossedTripwire = personY + 88 > 340;
  const legAngle = Math.sin(frame * 0.35) * 18;

  // Vehicle driving (right to left, delayed)
  const vehicleDelay = 60;
  const vehicleFrame = Math.max(0, (frame % durationInFrames) - vehicleDelay);
  const vehicleProgress = interpolate(
    vehicleFrame,
    [0, durationInFrames - vehicleDelay],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const vehicleX = interpolate(vehicleProgress, [0, 1], [980, -140]);
  const vehicleY = 370;
  const wheelRotation = frame * 8;

  // Detection box tracking
  const personDetected = personProgress > 0.08 && personProgress < 0.92;
  const vehicleDetected = vehicleProgress > 0.05 && vehicleProgress < 0.9;

  // Counter animation
  const crossCount = Math.floor(
    interpolate(frame, [0, durationInFrames], [8, 15], {
      extrapolateRight: "clamp",
    })
  );

  // HUD flicker
  const hudOpacity = interpolate(Math.sin(frame * 0.3), [-1, 1], [0.75, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.darkBg} 0%, ${COLORS.darkNavy} 100%)`,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      {/* Surveillance grid lines */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`h${i}`}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: i * 80,
            height: 1,
            background: "rgba(255,255,255,0.03)",
          }}
        />
      ))}
      {[...Array(12)].map((_, i) => (
        <div
          key={`v${i}`}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: i * 80,
            width: 1,
            background: "rgba(255,255,255,0.03)",
          }}
        />
      ))}

      {/* Tripwire */}
      <TripwireLine y={340} crossed={personCrossedTripwire} frame={frame} />

      {/* Person (SVG) */}
      <div style={{ position: "absolute", left: personX, top: personY }}>
        <PersonSilhouette width={40} legAngle={legAngle} />
      </div>
      {personDetected && (
        <DetectionBox
          x={personX - 6}
          y={personY - 10}
          w={52}
          h={100}
          label="Person"
          confidence={0.94}
          color={COLORS.successGreen}
          opacity={1}
        />
      )}

      {/* Vehicle (SVG) */}
      {vehicleProgress > 0 && (
        <div
          style={{
            position: "absolute",
            left: vehicleX,
            top: vehicleY,
            transform: "scaleX(-1)", // flip for driving right-to-left
          }}
        >
          <VehicleSide width={120} wheelRotation={wheelRotation} />
        </div>
      )}
      {vehicleDetected && (
        <DetectionBox
          x={vehicleX - 4}
          y={vehicleY - 6}
          w={128}
          h={68}
          label="Vehicle"
          confidence={0.89}
          color={COLORS.brandBlue}
          opacity={1}
        />
      )}

      {/* HUD Overlay - Top */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 20,
          right: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: hudOpacity,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: COLORS.alertRed,
              boxShadow: `0 0 6px ${COLORS.alertRed}`,
              opacity: Math.sin(frame * 0.4) > 0 ? 1 : 0.3,
            }}
          />
          <span
            style={{
              color: COLORS.white,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            CAM-01 | LIVE
          </span>
        </div>
        <span
          style={{
            color: COLORS.textSecondary,
            fontSize: 12,
            fontFamily: "monospace",
          }}
        >
          2592 × 1944 | 30fps
        </span>
      </div>

      {/* HUD Overlay - Bottom Stats */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 20,
          right: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {/* Counter */}
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            borderRadius: 10,
            padding: "10px 18px",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: COLORS.textMuted,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 4,
            }}
          >
            Tripwire Count
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.actionOrange,
            }}
          >
            {crossCount}
          </div>
        </div>

        {/* Detection stats */}
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { label: "Persons", value: personDetected ? "1" : "0", color: COLORS.successGreen },
            { label: "Vehicles", value: vehicleDetected ? "1" : "0", color: COLORS.brandBlue },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              style={{
                background: "rgba(0,0,0,0.6)",
                borderRadius: 10,
                padding: "8px 16px",
                backdropFilter: "blur(8px)",
                border: `1px solid ${value !== "0" ? color + "30" : "rgba(255,255,255,0.08)"}`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  color: COLORS.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
