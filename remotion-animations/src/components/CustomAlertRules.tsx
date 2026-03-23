import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { PersonSilhouette, AlertBellIcon } from "./SvgIcons";

export const CustomAlertRules: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const phase = frame % durationInFrames;

  // Intruder movement: enters from left, crosses into restricted zone
  const intruderX = interpolate(phase, [30, 150], [-30, 520], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const intruderY = interpolate(phase, [30, 150], [380, 260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const intruderVisible = phase > 25 && phase < 220;
  const legAngle = Math.sin(frame * 0.35) * 15;

  // Restricted zone boundary
  const zoneX = 340;
  const zoneY = 120;
  const zoneW = 520;
  const zoneH = 380;

  // Has intruder crossed into zone?
  const inZone = intruderX > zoneX;

  // Zone pulse when breached
  const zonePulse = inZone
    ? interpolate(Math.sin(frame * 0.4), [-1, 1], [0.3, 0.8])
    : 0.15;

  // Alert notification pop
  const alertTriggerFrame = 100;
  const alertVisible = phase > alertTriggerFrame && phase < 220;
  const alertSlide = spring({
    frame: Math.max(0, phase - alertTriggerFrame),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const alertDismiss = interpolate(phase, [200, 220], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Time display
  const seconds = Math.floor(phase / fps);
  const timeStr = `22:47:${String(seconds + 3).padStart(2, "0")}`;

  // Person color transitions to red when in zone
  const personColor = inZone
    ? `rgba(234, 61, 86, 0.8)`
    : "rgba(255,255,255,0.75)";

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.darkBg} 0%, ${COLORS.darkNavy} 100%)`,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      {/* Surveillance grid */}
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

      {/* Restricted Zone */}
      <div
        style={{
          position: "absolute",
          left: zoneX,
          top: zoneY,
          width: zoneW,
          height: zoneH,
          border: `2px dashed ${COLORS.alertRed}`,
          borderRadius: 8,
          background: `rgba(234, 61, 86, ${zonePulse * 0.1})`,
        }}
      >
        {/* Zone label */}
        <div
          style={{
            position: "absolute",
            top: -30,
            left: 0,
            background: COLORS.alertRed,
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "5px 14px",
            borderRadius: "8px 8px 0 0",
            letterSpacing: 1.5,
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 12 }}>⚠</span> Restricted Area
        </div>

        {/* Zone corners */}
        {[
          { top: -2, left: -2, borderTop: `3px solid ${COLORS.alertRed}`, borderLeft: `3px solid ${COLORS.alertRed}` },
          { top: -2, right: -2, borderTop: `3px solid ${COLORS.alertRed}`, borderRight: `3px solid ${COLORS.alertRed}` },
          { bottom: -2, left: -2, borderBottom: `3px solid ${COLORS.alertRed}`, borderLeft: `3px solid ${COLORS.alertRed}` },
          { bottom: -2, right: -2, borderBottom: `3px solid ${COLORS.alertRed}`, borderRight: `3px solid ${COLORS.alertRed}` },
        ].map((style, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 22,
              height: 22,
              ...style,
            }}
          />
        ))}
      </div>

      {/* Intruder figure (SVG) */}
      {intruderVisible && (
        <div style={{ position: "absolute", left: intruderX, top: intruderY }}>
          <PersonSilhouette width={36} color={personColor} legAngle={legAngle} />

          {/* Detection box when in zone */}
          {inZone && (
            <div
              style={{
                position: "absolute",
                top: -10,
                left: -10,
                width: 56,
                height: 96,
                border: `2px solid ${COLORS.alertRed}`,
                borderRadius: 4,
                boxShadow: `0 0 16px ${COLORS.alertRed}35`,
              }}
            >
              {/* Corner brackets */}
              {[
                { top: -1, left: -1, borderTop: `3px solid ${COLORS.alertRed}`, borderLeft: `3px solid ${COLORS.alertRed}` },
                { top: -1, right: -1, borderTop: `3px solid ${COLORS.alertRed}`, borderRight: `3px solid ${COLORS.alertRed}` },
                { bottom: -1, left: -1, borderBottom: `3px solid ${COLORS.alertRed}`, borderLeft: `3px solid ${COLORS.alertRed}` },
                { bottom: -1, right: -1, borderBottom: `3px solid ${COLORS.alertRed}`, borderRight: `3px solid ${COLORS.alertRed}` },
              ].map((style, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: 10,
                    height: 10,
                    ...style,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Alert Notification Toast */}
      {alertVisible && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 310,
            background: "rgba(0,0,0,0.88)",
            borderRadius: 14,
            padding: "16px 20px",
            border: `1px solid ${COLORS.alertRed}50`,
            boxShadow: `0 8px 36px rgba(0,0,0,0.6), 0 0 0 1px ${COLORS.alertRed}15`,
            backdropFilter: "blur(12px)",
            transform: `translateX(${interpolate(alertSlide, [0, 1], [340, 0])}px)`,
            opacity: alertDismiss,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `${COLORS.alertRed}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <AlertBellIcon size={22} color={COLORS.alertRed} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: COLORS.alertRed,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}
              >
                Intrusion Alert
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: COLORS.textPrimary,
                  marginTop: 5,
                  lineHeight: 1.5,
                }}
              >
                Person detected in restricted area
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.textMuted,
                  marginTop: 6,
                }}
              >
                CAM-01 • Warehouse B • Just now
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HUD - bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 20,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            borderRadius: 10,
            padding: "9px 16px",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontFamily: "monospace",
              color: COLORS.textSecondary,
            }}
          >
            {timeStr}
          </span>
          <div
            style={{
              width: 1,
              height: 14,
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <span
            style={{
              fontSize: 11,
              color: COLORS.actionOrange,
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            After Hours
          </span>
        </div>

        {inZone && (
          <div
            style={{
              background: `${COLORS.alertRed}15`,
              borderRadius: 10,
              padding: "9px 16px",
              border: `1px solid ${COLORS.alertRed}35`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: COLORS.alertRed,
                boxShadow: `0 0 8px ${COLORS.alertRed}`,
                opacity: Math.sin(frame * 0.5) > 0 ? 1 : 0.3,
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: COLORS.alertRed,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              Zone Breach
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
