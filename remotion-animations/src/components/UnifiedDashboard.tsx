import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { CameraIcon, GatewayIcon, SwitchIcon } from "./SvgIcons";

// Camera feed card
const CameraFeed: React.FC<{
  name: string;
  index: number;
  frame: number;
}> = ({ name, index, frame }) => (
  <div
    style={{
      background: `linear-gradient(135deg, #1e2d3d, #15202b)`,
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.1)",
      padding: 12,
      position: "relative",
      aspectRatio: "16/9",
      display: "flex",
      alignItems: "flex-end",
      overflow: "hidden",
    }}
  >
    {/* Subtle scene content */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(${135 + index * 30}deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)`,
      }}
    />
    {/* Camera icon watermark */}
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity: 0.08,
      }}
    >
      <CameraIcon size={60} color={COLORS.white} />
    </div>
    {/* LIVE indicator */}
    <div
      style={{
        position: "absolute",
        top: 8,
        left: 10,
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "rgba(0,0,0,0.5)",
        padding: "3px 8px",
        borderRadius: 4,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: COLORS.alertRed,
          opacity: Math.sin(frame * 0.3 + index) > 0 ? 1 : 0.3,
        }}
      />
      <span
        style={{
          fontSize: 9,
          color: COLORS.white,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        LIVE
      </span>
    </div>
    {/* Time overlay */}
    <div
      style={{
        position: "absolute",
        top: 8,
        right: 10,
        fontSize: 9,
        fontFamily: "monospace",
        color: COLORS.textMuted,
        background: "rgba(0,0,0,0.5)",
        padding: "3px 6px",
        borderRadius: 4,
      }}
    >
      14:23:0{index}
    </div>
    <div
      style={{
        fontSize: 10,
        color: COLORS.textSecondary,
        fontWeight: 600,
        zIndex: 1,
      }}
    >
      {name}
    </div>
  </div>
);

// Network device node
const NetworkNode: React.FC<{
  x: number;
  y: number;
  icon: React.ReactNode;
  label: string;
  color: string;
}> = ({ x, y, icon, label, color }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
    }}
  >
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: 12,
        background: `${color}12`,
        border: `1px solid ${color}30`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
    <span
      style={{
        fontSize: 9,
        color: COLORS.textSecondary,
        fontWeight: 600,
        textAlign: "center",
        maxWidth: 75,
      }}
    >
      {label}
    </span>
  </div>
);

// PDU outlet
const PDUOutlet: React.FC<{
  index: number;
  watts: number;
  active: boolean;
}> = ({ index, watts, active }) => (
  <div
    style={{
      background: active ? `${COLORS.successGreen}0A` : "rgba(255,255,255,0.03)",
      borderRadius: 10,
      padding: "12px 8px",
      border: `1px solid ${active ? COLORS.successGreen + "25" : "rgba(255,255,255,0.05)"}`,
      textAlign: "center",
    }}
  >
    <div
      style={{ fontSize: 9, color: COLORS.textMuted, marginBottom: 6 }}
    >
      Port {index + 1}
    </div>
    <div
      style={{
        fontSize: 16,
        fontWeight: 700,
        color: active ? COLORS.successGreen : COLORS.textMuted,
      }}
    >
      {active ? `${watts}W` : "—"}
    </div>
    <div
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: active ? COLORS.successGreen : "rgba(255,255,255,0.12)",
        boxShadow: active ? `0 0 6px ${COLORS.successGreen}60` : "none",
        margin: "8px auto 0",
      }}
    />
  </div>
);

export const UnifiedDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const phase = frame % durationInFrames;

  const tabIndex = phase < 80 ? 0 : phase < 160 ? 1 : 2;

  const tabTransition = (targetTab: number) => {
    const startFrame = targetTab * 80;
    return interpolate(phase, [startFrame, startFrame + 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  // First tab starts fully visible
  const tab0Opacity = tabIndex === 0 ? 1 : 0;

  const tabs = ["Live Cameras", "Network Topology", "Smart PDU"];

  // Alert notification
  const alertFrame = 50;
  const alertVisible = phase > alertFrame && phase < 75;
  const alertSpring = spring({
    frame: Math.max(0, phase - alertFrame),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.darkBg} 0%, ${COLORS.darkNavy} 100%)`,
        fontFamily: FONT,
        overflow: "hidden",
        padding: "20px 28px",
        display: "flex",
        flexDirection: "column" as const,
      }}
    >
      {/* Dashboard header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: `${COLORS.brandBlue}18`,
              border: `1px solid ${COLORS.brandBlue}25`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
              <path
                d="M10 28 Q4 28 4 22 Q4 16 10 16 Q10 8 20 8 Q28 8 30 14 Q36 14 36 20 Q36 28 30 28 Z"
                fill={`${COLORS.brandBlue}40`}
                stroke={COLORS.brandBlue}
                strokeWidth="2"
              />
            </svg>
          </div>
          <span
            style={{ fontSize: 15, fontWeight: 700, color: COLORS.textPrimary }}
          >
            EnGenius Cloud
          </span>
          <span
            style={{ fontSize: 11, color: COLORS.textMuted, marginLeft: 4 }}
          >
            Dashboard
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: COLORS.successGreen,
              boxShadow: `0 0 6px ${COLORS.successGreen}60`,
            }}
          />
          <span
            style={{ fontSize: 11, color: COLORS.successGreen, fontWeight: 500 }}
          >
            All Systems Online
          </span>
        </div>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 18,
          background: "rgba(0,0,0,0.3)",
          borderRadius: 10,
          padding: 3,
        }}
      >
        {tabs.map((tab, i) => (
          <div
            key={tab}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "10px 0",
              fontSize: 12,
              fontWeight: tabIndex === i ? 700 : 500,
              color: tabIndex === i ? COLORS.white : COLORS.textMuted,
              background: tabIndex === i ? COLORS.brandBlue : "transparent",
              borderRadius: 8,
              letterSpacing: 0.3,
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Content panels */}
      <div
        style={{
          flex: 1,
          background: "rgba(0,0,0,0.2)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.05)",
          padding: 16,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Tab 0: Live Cameras */}
        {tabIndex === 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              opacity: phase < 80 ? 1 : 0,
            }}
          >
            <CameraFeed name="Lobby — ECC500" index={0} frame={frame} />
            <CameraFeed name="Entrance — ECC120" index={1} frame={frame} />
            <CameraFeed name="Parking — ECC100" index={2} frame={frame} />
            <CameraFeed name="Warehouse — ECC500" index={3} frame={frame} />
          </div>
        )}

        {/* Tab 1: Network Topology */}
        {tabIndex === 1 && (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              opacity: tabTransition(1),
            }}
          >
            {/* Connection lines */}
            <svg
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            >
              {/* Animated data flow dots */}
              {[0, 1].map((lineIdx) => {
                const dotProgress = ((frame * 2 + lineIdx * 40) % 60) / 60;
                const startX = 435;
                const startY = 65;
                const endX = lineIdx === 0 ? 230 : 640;
                const endY = 180;
                const dx = interpolate(dotProgress, [0, 1], [startX, endX]);
                const dy = interpolate(dotProgress, [0, 1], [startY, endY]);
                return (
                  <circle
                    key={lineIdx}
                    cx={dx}
                    cy={dy}
                    r={3}
                    fill={COLORS.brandBlue}
                    opacity={0.6}
                  />
                );
              })}
              {/* Router to switches */}
              <line x1={435} y1={65} x2={230} y2={180} stroke={COLORS.brandBlue} strokeWidth={1.5} opacity={0.25} />
              <line x1={435} y1={65} x2={640} y2={180} stroke={COLORS.brandBlue} strokeWidth={1.5} opacity={0.25} />
              {/* Switches to cameras */}
              <line x1={230} y1={225} x2={100} y2={320} stroke={COLORS.successGreen} strokeWidth={1} opacity={0.2} />
              <line x1={230} y1={225} x2={310} y2={320} stroke={COLORS.successGreen} strokeWidth={1} opacity={0.2} />
              <line x1={640} y1={225} x2={560} y2={320} stroke={COLORS.successGreen} strokeWidth={1} opacity={0.2} />
              <line x1={640} y1={225} x2={740} y2={320} stroke={COLORS.successGreen} strokeWidth={1} opacity={0.2} />
            </svg>

            <NetworkNode x={410} y={20} icon={<GatewayIcon size={32} color={COLORS.brandBlue} />} label="Security Gateway" color={COLORS.brandBlue} />
            <NetworkNode x={205} y={160} icon={<SwitchIcon size={32} color={COLORS.brandBlue} />} label="Switch Floor 1" color={COLORS.brandBlue} />
            <NetworkNode x={615} y={160} icon={<SwitchIcon size={32} color={COLORS.brandBlue} />} label="Switch Floor 2" color={COLORS.brandBlue} />
            <NetworkNode x={75} y={300} icon={<CameraIcon size={28} color={COLORS.successGreen} />} label="ECC500" color={COLORS.successGreen} />
            <NetworkNode x={285} y={300} icon={<CameraIcon size={28} color={COLORS.successGreen} />} label="ECC120" color={COLORS.successGreen} />
            <NetworkNode x={535} y={300} icon={<CameraIcon size={28} color={COLORS.successGreen} />} label="ECC100" color={COLORS.successGreen} />
            <NetworkNode x={715} y={300} icon={<CameraIcon size={28} color={COLORS.successGreen} />} label="ECC500" color={COLORS.successGreen} />
          </div>
        )}

        {/* Tab 2: Smart PDU */}
        {tabIndex === 2 && (
          <div style={{ opacity: tabTransition(2) }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <span
                style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}
              >
                PDU-01 — Server Room
              </span>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: COLORS.brandBlue,
                    }}
                  >
                    847W
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: COLORS.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                    }}
                  >
                    Total Power
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: COLORS.successGreen,
                    }}
                  >
                    6/8
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: COLORS.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                    }}
                  >
                    Active Ports
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 10,
              }}
            >
              <PDUOutlet index={0} watts={125} active />
              <PDUOutlet index={1} watts={230} active />
              <PDUOutlet index={2} watts={85} active />
              <PDUOutlet index={3} watts={0} active={false} />
              <PDUOutlet index={4} watts={180} active />
              <PDUOutlet index={5} watts={92} active />
              <PDUOutlet index={6} watts={135} active />
              <PDUOutlet index={7} watts={0} active={false} />
            </div>
          </div>
        )}
      </div>

      {/* Tab indicator dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginTop: 14,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: tabIndex === i ? 22 : 8,
              height: 8,
              borderRadius: 4,
              background:
                tabIndex === i ? COLORS.brandBlue : "rgba(255,255,255,0.12)",
            }}
          />
        ))}
      </div>

      {/* Alert toast */}
      {alertVisible && (
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            background: "rgba(0,0,0,0.88)",
            borderRadius: 12,
            padding: "11px 18px",
            border: `1px solid ${COLORS.successGreen}35`,
            boxShadow: `0 4px 24px rgba(0,0,0,0.5)`,
            display: "flex",
            alignItems: "center",
            gap: 10,
            transform: `translateX(${interpolate(alertSpring, [0, 1], [320, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: `${COLORS.successGreen}18`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8 L6.5 11.5 L13 4.5" stroke={COLORS.successGreen} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div
              style={{ fontSize: 12, fontWeight: 600, color: COLORS.textPrimary }}
            >
              ECC500-Lobby reconnected
            </div>
            <div style={{ fontSize: 10, color: COLORS.textMuted }}>
              Just now
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
