import React from "react";
import { interpolate } from "remotion";
import { FONT } from "../theme";

export const glassPanelStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.86)",
  border: "1px solid rgba(13,27,42,0.08)",
  boxShadow: "0 18px 44px rgba(13,27,42,0.10)",
  backdropFilter: "blur(14px)",
};

export const fadeUp = (
  progress: number,
  distance = 18,
): React.CSSProperties => ({
  opacity: progress,
  transform: `translateY(${interpolate(progress, [0, 1], [distance, 0])}px)`,
});

export const StageCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      ...glassPanelStyle,
      position: "relative",
      width: "100%",
      height: "100%",
      borderRadius: 30,
      overflow: "hidden",
      background:
        "radial-gradient(circle at 14% 14%, rgba(3,169,244,0.13), transparent 18%), radial-gradient(circle at 84% 18%, rgba(255,162,0,0.08), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,251,255,0.98) 100%)",
      fontFamily: FONT,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 14,
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.65)",
      }}
    />
    {children}
  </div>
);

export const CaptionLine: React.FC<{
  text: string;
  accent: string;
}> = ({ text, accent }) => (
  <div
    style={{
      position: "absolute",
      left: 28,
      right: 28,
      bottom: 24,
      minHeight: 72,
      padding: "18px 22px",
      borderRadius: 22,
      background: "rgba(255,255,255,0.94)",
      border: "1px solid rgba(13,27,42,0.08)",
      boxShadow: "0 16px 34px rgba(13,27,42,0.08)",
      display: "flex",
      alignItems: "center",
      gap: 16,
    }}
  >
    <div
      style={{
        width: 34,
        height: 4,
        borderRadius: 999,
        background: accent,
        flexShrink: 0,
      }}
    />
    <div
      style={{
        color: accent,
        fontSize: 28,
        fontWeight: 800,
        lineHeight: 1.1,
      }}
    >
      {text}
    </div>
  </div>
);

export const IconTile: React.FC<{
  x: number;
  y: number;
  size?: number;
  radius?: number;
  icon: React.ReactNode;
  progress: number;
  fill: string;
  border?: string;
}> = ({ x, y, size = 110, radius = 28, icon, progress, fill, border }) => (
  <div
    style={{
      ...glassPanelStyle,
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: radius,
      background: fill,
      border: border ?? "1px solid rgba(13,27,42,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...fadeUp(progress, 16),
    }}
  >
    {icon}
  </div>
);

export const PulseRing: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  scale: number;
  opacity: number;
}> = ({ x, y, size, color, scale, opacity }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: "50%",
      border: `3px solid ${color}`,
      transform: `scale(${scale})`,
      opacity,
    }}
  />
);
