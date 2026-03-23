import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { CameraIcon, CloudIcon, StorageIcon } from "./SvgIcons";

// Data packet dot flowing along a path
const DataPacket: React.FC<{
  progress: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  size?: number;
}> = ({ progress, startX, startY, endX, endY, color, size = 8 }) => {
  const x = interpolate(progress, [0, 1], [startX, endX]);
  const y = interpolate(progress, [0, 1], [startY, endY]);
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 14px ${color}80`,
        opacity: progress > 0.02 && progress < 0.98 ? 1 : 0,
      }}
    />
  );
};

// Node box with SVG icon
const NodeBox: React.FC<{
  x: number;
  y: number;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  color: string;
  active?: boolean;
  blinking?: boolean;
  frame: number;
}> = ({ x, y, icon, label, sublabel, color, active, blinking, frame }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 180,
      height: 130,
      background: "rgba(0,0,0,0.5)",
      borderRadius: 16,
      border: `1.5px solid ${active ? color + "60" : "rgba(255,255,255,0.08)"}`,
      boxShadow: active ? `0 0 24px ${color}18` : "none",
      backdropFilter: "blur(8px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    }}
  >
    {/* Status dot */}
    {blinking && (
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: COLORS.alertRed,
          boxShadow: `0 0 8px ${COLORS.alertRed}`,
          opacity: Math.sin(frame * 0.4) > 0 ? 1 : 0.15,
        }}
      />
    )}
    {/* Icon */}
    <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {icon}
    </div>
    <div
      style={{
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.textPrimary,
        textAlign: "center",
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontSize: 11,
        color: COLORS.textMuted,
        textAlign: "center",
      }}
    >
      {sublabel}
    </div>
  </div>
);

export const EdgeStorage: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const phase = frame % durationInFrames;

  // Three phases:
  // Phase 1 (0–80): Recording normally (green, online)
  // Phase 2 (80–160): Connection lost, local recording (red, offline)
  // Phase 3 (160–240): Reconnected, syncing (blue, syncing)
  const isOnline = phase < 80 || phase >= 160;
  const isOffline = phase >= 80 && phase < 160;
  const isSyncing = phase >= 160;

  const lineColor = isOffline
    ? COLORS.alertRed
    : isSyncing
      ? COLORS.brandBlue
      : COLORS.successGreen;

  const statusText = isOffline
    ? "Connection Lost — Edge Recording"
    : isSyncing
      ? "Reconnected — Syncing Footage"
      : "Online — Live Upload";

  // Node positions
  const cameraX = 60;
  const cameraY = 255;
  const cloudX = 390;
  const cloudY = 255;
  const storageX = 720;
  const storageY = 255;

  // Data packets
  const packetSpeed = 30;
  const packet1 = interpolate(
    (phase * 2) % packetSpeed,
    [0, packetSpeed],
    [0, 1]
  );
  const packet2 = interpolate(
    ((phase * 2 + 15) % packetSpeed),
    [0, packetSpeed],
    [0, 1]
  );
  const syncPacket1 = interpolate(
    ((phase - 160) * 2) % packetSpeed,
    [0, packetSpeed],
    [0, 1]
  );
  const syncPacket2 = interpolate(
    (((phase - 160) * 2 + 15) % packetSpeed),
    [0, packetSpeed],
    [0, 1]
  );

  // Local storage fill animation
  const storageFill = isOffline
    ? interpolate(phase, [80, 160], [0.2, 0.85], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : isSyncing
      ? interpolate(phase, [160, 230], [0.85, 0.1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0.05;

  const phaseLabel = isOffline
    ? "2 / 3 — Offline Storage"
    : isSyncing
      ? "3 / 3 — Cloud Sync"
      : "1 / 3 — Live Recording";

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.darkBg} 0%, ${COLORS.darkNavy} 100%)`,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      {/* Phase label */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: COLORS.textMuted,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          {phaseLabel}
        </div>
      </div>

      {/* Connection Lines */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        {/* Camera → Cloud */}
        <line
          x1={cameraX + 180}
          y1={cameraY + 65}
          x2={cloudX}
          y2={cloudY + 65}
          stroke={isOffline ? COLORS.alertRed : COLORS.successGreen}
          strokeWidth={2}
          strokeDasharray={isOffline ? "8 8" : "none"}
          opacity={0.35}
        />
        {/* Cloud → Storage */}
        <line
          x1={cloudX + 180}
          y1={cloudY + 65}
          x2={storageX}
          y2={storageY + 65}
          stroke={isSyncing ? COLORS.brandBlue : "rgba(255,255,255,0.1)"}
          strokeWidth={2}
          strokeDasharray={isSyncing ? "none" : "8 8"}
          opacity={0.35}
        />
        {/* X mark when offline */}
        {isOffline && (
          <>
            <line x1={300} y1={305} x2={320} y2={325} stroke={COLORS.alertRed} strokeWidth={3} strokeLinecap="round" />
            <line x1={320} y1={305} x2={300} y2={325} stroke={COLORS.alertRed} strokeWidth={3} strokeLinecap="round" />
          </>
        )}
      </svg>

      {/* Data packets - Camera to Cloud (when online, not syncing) */}
      {isOnline && !isSyncing && (
        <>
          <DataPacket progress={packet1} startX={cameraX + 180} startY={cameraY + 65} endX={cloudX} endY={cloudY + 65} color={COLORS.successGreen} />
          <DataPacket progress={packet2} startX={cameraX + 180} startY={cameraY + 65} endX={cloudX} endY={cloudY + 65} color={COLORS.successGreen} size={6} />
        </>
      )}

      {/* Data packets - syncing */}
      {isSyncing && phase >= 165 && (
        <>
          <DataPacket progress={syncPacket1} startX={cameraX + 180} startY={cameraY + 65} endX={cloudX} endY={cloudY + 65} color={COLORS.brandBlue} />
          <DataPacket progress={syncPacket2} startX={cloudX + 180} startY={cloudY + 65} endX={storageX} endY={storageY + 65} color={COLORS.brandBlue} size={6} />
        </>
      )}

      {/* Camera Node */}
      <NodeBox
        x={cameraX}
        y={cameraY}
        icon={<CameraIcon size={44} color={isOffline ? COLORS.actionOrange : COLORS.successGreen} />}
        label="ECC500 Camera"
        sublabel={isOffline ? "Edge Recording..." : "Live Stream"}
        color={isOffline ? COLORS.actionOrange : COLORS.successGreen}
        active
        blinking={isOffline}
        frame={frame}
      />

      {/* Cloud Node */}
      <NodeBox
        x={cloudX}
        y={cloudY}
        icon={<CloudIcon size={44} color={isOffline ? COLORS.alertRed : COLORS.successGreen} />}
        label="EnGenius Cloud"
        sublabel={isOffline ? "Unreachable" : "Connected"}
        color={isOffline ? COLORS.alertRed : COLORS.successGreen}
        active={!isOffline}
        blinking={false}
        frame={frame}
      />

      {/* Storage Node */}
      <NodeBox
        x={storageX}
        y={storageY}
        icon={<StorageIcon size={44} color={storageFill > 0.7 ? COLORS.actionOrange : COLORS.brandBlue} />}
        label="Edge Storage"
        sublabel={`${Math.round(storageFill * 100)}% Used`}
        color={storageFill > 0.7 ? COLORS.actionOrange : COLORS.brandBlue}
        active={isOffline || isSyncing}
        blinking={false}
        frame={frame}
      />

      {/* Storage bar */}
      <div
        style={{
          position: "absolute",
          left: storageX + 20,
          top: storageY + 112,
          width: 140,
          height: 6,
          borderRadius: 3,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${storageFill * 100}%`,
            height: "100%",
            borderRadius: 3,
            background: storageFill > 0.7 ? COLORS.actionOrange : COLORS.brandBlue,
            boxShadow: `0 0 8px ${storageFill > 0.7 ? COLORS.actionOrange : COLORS.brandBlue}40`,
          }}
        />
      </div>

      {/* Status Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            borderRadius: 12,
            padding: "11px 26px",
            border: `1px solid ${lineColor}25`,
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: lineColor,
              boxShadow: `0 0 10px ${lineColor}80`,
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.textPrimary,
              letterSpacing: 0.5,
            }}
          >
            {statusText}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
