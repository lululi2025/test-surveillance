import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { FacePortrait, CarRearView } from "./SvgIcons";

// Animated scan line
const ScanLine: React.FC<{
  progress: number;
  height: number;
  color: string;
}> = ({ progress, height, color }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: interpolate(progress, [0, 1], [0, height]),
      height: 2,
      background: `linear-gradient(90deg, transparent 0%, ${color}40 20%, ${color} 50%, ${color}40 80%, transparent 100%)`,
      boxShadow: `0 0 24px ${color}60, 0 0 4px ${color}`,
    }}
  />
);

// Biometric scan grid overlay
const BiometricGrid: React.FC<{
  color: string;
  opacity: number;
}> = ({ color, opacity }) => (
  <svg
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity,
    }}
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {/* Horizontal lines */}
    {[20, 40, 60, 80].map((y) => (
      <line key={y} x1="0" y1={y} x2="100" y2={y} stroke={color} strokeWidth="0.3" opacity={0.3} />
    ))}
    {/* Vertical lines */}
    {[20, 40, 60, 80].map((x) => (
      <line key={x} x1={x} y1="0" x2={x} y2="100" stroke={color} strokeWidth="0.3" opacity={0.3} />
    ))}
  </svg>
);

export const FacialRecLPR: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // --- LEFT PANEL: Facial Recognition ---
  const facePhase = frame % durationInFrames;
  const faceScanProgress = interpolate(facePhase, [0, 90], [0, 1], {
    extrapolateRight: "clamp",
  });
  const faceDetected = facePhase > 70;
  const faceResultOpacity = interpolate(facePhase, [85, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const faceBoxScale = spring({
    frame: Math.max(0, facePhase - 70),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // --- RIGHT PANEL: License Plate Recognition ---
  const lprPhase = (frame + 40) % durationInFrames;
  const lprScanProgress = interpolate(lprPhase, [0, 100], [0, 1], {
    extrapolateRight: "clamp",
  });
  const lprDetected = lprPhase > 80;
  const lprResultOpacity = interpolate(lprPhase, [95, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const panelStyle: React.CSSProperties = {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.4)",
  };

  const panelLabelStyle: React.CSSProperties = {
    position: "absolute",
    top: 14,
    left: 16,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    color: COLORS.textSecondary,
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.darkBg} 0%, ${COLORS.darkNavy} 100%)`,
        fontFamily: FONT,
        padding: 24,
        display: "flex",
        gap: 20,
      }}
    >
      {/* LEFT: Facial Recognition */}
      <div style={panelStyle}>
        <div style={panelLabelStyle}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: faceDetected ? COLORS.successGreen : COLORS.brandBlue,
              boxShadow: faceDetected ? `0 0 6px ${COLORS.successGreen}` : "none",
            }}
          />
          Facial Recognition
        </div>

        {/* Biometric grid */}
        <BiometricGrid color={COLORS.brandBlue} opacity={faceDetected ? 0.15 : 0.3} />

        {/* Face SVG */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <FacePortrait width={130} />

          {/* Detection box with corner markers */}
          {faceDetected && (
            <div
              style={{
                position: "absolute",
                top: -12,
                left: -16,
                width: 162,
                height: 210,
                transform: `scale(${faceBoxScale})`,
              }}
            >
              {[
                { top: 0, left: 0, borderTop: `3px solid ${COLORS.successGreen}`, borderLeft: `3px solid ${COLORS.successGreen}` },
                { top: 0, right: 0, borderTop: `3px solid ${COLORS.successGreen}`, borderRight: `3px solid ${COLORS.successGreen}` },
                { bottom: 0, left: 0, borderBottom: `3px solid ${COLORS.successGreen}`, borderLeft: `3px solid ${COLORS.successGreen}` },
                { bottom: 0, right: 0, borderBottom: `3px solid ${COLORS.successGreen}`, borderRight: `3px solid ${COLORS.successGreen}` },
              ].map((style, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: 18,
                    height: 18,
                    ...style,
                  }}
                />
              ))}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: `1px solid ${COLORS.successGreen}30`,
                  borderRadius: 4,
                }}
              />
            </div>
          )}
        </div>

        {/* Scan line */}
        {!faceDetected && (
          <div style={{ position: "absolute", inset: 0 }}>
            <ScanLine progress={faceScanProgress} height={520} color={COLORS.brandBlue} />
          </div>
        )}

        {/* Recognition Result */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 16,
            right: 16,
            background: "rgba(0,0,0,0.65)",
            borderRadius: 12,
            padding: "14px 18px",
            opacity: faceResultOpacity,
            border: `1px solid ${COLORS.successGreen}35`,
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: COLORS.successGreen,
                boxShadow: `0 0 10px ${COLORS.successGreen}80`,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 10,
                  color: COLORS.successGreen,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}
              >
                Match Found
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: COLORS.white,
                  fontWeight: 700,
                  marginTop: 3,
                }}
              >
                John D. — Employee
              </div>
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: COLORS.successGreen,
              }}
            >
              97%
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: License Plate Recognition */}
      <div style={panelStyle}>
        <div style={panelLabelStyle}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: lprDetected ? COLORS.brandBlue : COLORS.actionOrange,
              boxShadow: lprDetected ? `0 0 6px ${COLORS.brandBlue}` : "none",
            }}
          />
          License Plate Recognition
        </div>

        {/* Biometric grid */}
        <BiometricGrid color={COLORS.actionOrange} opacity={lprDetected ? 0.1 : 0.25} />

        {/* Car rear SVG */}
        <div
          style={{
            position: "absolute",
            top: "42%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CarRearView width={240} plateText="ABC-1234" />

          {/* Detection box around plate */}
          {lprDetected && (
            <div
              style={{
                position: "absolute",
                bottom: 22,
                left: "50%",
                transform: "translateX(-50%)",
                width: 118,
                height: 42,
                border: `2px solid ${COLORS.brandBlue}`,
                borderRadius: 4,
                boxShadow: `0 0 16px ${COLORS.brandBlue}40, inset 0 0 8px ${COLORS.brandBlue}15`,
              }}
            />
          )}
        </div>

        {/* Scan line */}
        {!lprDetected && (
          <div style={{ position: "absolute", inset: 0 }}>
            <ScanLine progress={lprScanProgress} height={520} color={COLORS.actionOrange} />
          </div>
        )}

        {/* LPR Result */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 16,
            right: 16,
            background: "rgba(0,0,0,0.65)",
            borderRadius: 12,
            padding: "14px 18px",
            opacity: lprResultOpacity,
            border: `1px solid ${COLORS.brandBlue}35`,
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: COLORS.brandBlue,
                boxShadow: `0 0 10px ${COLORS.brandBlue}80`,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 10,
                  color: COLORS.brandBlue,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}
              >
                Plate Recognized
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  marginTop: 3,
                  letterSpacing: 3,
                }}
              >
                ABC-1234
              </div>
            </div>
            <div
              style={{
                fontSize: 11,
                color: COLORS.textSecondary,
                background: "rgba(255,255,255,0.08)",
                padding: "4px 10px",
                borderRadius: 6,
                fontWeight: 600,
              }}
            >
              Registered • VIP
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
