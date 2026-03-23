import React from "react";
import { COLORS } from "../theme";

// ─── Person Silhouette (Walking) ─────────────────────────────
export const PersonSilhouette: React.FC<{
  color?: string;
  width?: number;
  legAngle?: number;
}> = ({ color = "rgba(255,255,255,0.75)", width = 40, legAngle = 0 }) => {
  const h = width * 2.2;
  return (
    <svg width={width} height={h} viewBox="0 0 60 132" fill="none">
      {/* Head */}
      <circle cx="30" cy="14" r="12" fill={color} />
      {/* Neck */}
      <rect x="26" y="24" width="8" height="6" rx="2" fill={color} />
      {/* Torso */}
      <path
        d="M18 30 Q18 28 22 28 L38 28 Q42 28 42 30 L44 68 Q44 72 40 72 L20 72 Q16 72 16 68 Z"
        fill={color}
        opacity={0.95}
      />
      {/* Left arm */}
      <path
        d="M18 34 Q14 34 12 38 L6 56 Q4 60 8 62 L10 62 Q14 60 16 56 L20 42"
        fill={color}
        opacity={0.8}
        transform={`rotate(${legAngle * 0.6}, 18, 38)`}
      />
      {/* Right arm */}
      <path
        d="M42 34 Q46 34 48 38 L54 56 Q56 60 52 62 L50 62 Q46 60 44 56 L40 42"
        fill={color}
        opacity={0.8}
        transform={`rotate(${-legAngle * 0.6}, 42, 38)`}
      />
      {/* Left leg */}
      <path
        d="M22 70 L18 100 Q17 106 20 108 L24 108 Q26 108 26 104 L28 76"
        fill={color}
        opacity={0.85}
        transform={`rotate(${legAngle}, 25, 72)`}
      />
      {/* Right leg */}
      <path
        d="M38 70 L42 100 Q43 106 40 108 L36 108 Q34 108 34 104 L32 76"
        fill={color}
        opacity={0.85}
        transform={`rotate(${-legAngle}, 35, 72)`}
      />
      {/* Backpack hint */}
      <rect x="20" y="32" width="4" height="20" rx="2" fill={color} opacity={0.3} />
    </svg>
  );
};

// ─── Vehicle (Side view, sedan) ──────────────────────────────
export const VehicleSide: React.FC<{
  color?: string;
  width?: number;
  wheelRotation?: number;
}> = ({ color = "rgba(255,255,255,0.6)", width = 120, wheelRotation = 0 }) => {
  const h = width * 0.5;
  return (
    <svg width={width} height={h} viewBox="0 0 200 100" fill="none">
      {/* Body */}
      <path
        d="M20 65 L20 50 Q20 46 24 46 L176 46 Q180 46 180 50 L180 65 Q180 70 176 70 L24 70 Q20 70 20 65 Z"
        fill={color}
        opacity={0.9}
      />
      {/* Cabin / windows */}
      <path
        d="M52 46 L68 22 Q70 18 76 18 L130 18 Q136 18 138 22 L152 46"
        fill={color}
        opacity={0.5}
      />
      {/* Window divider */}
      <line x1="108" y1="18" x2="105" y2="46" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
      {/* Front window */}
      <path
        d="M56 44 L70 24 Q72 20 76 20 L104 20 L102 44 Z"
        fill="rgba(100,180,255,0.15)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
      />
      {/* Rear window */}
      <path
        d="M110 20 L130 20 Q134 20 136 24 L148 44 L108 44 Z"
        fill="rgba(100,180,255,0.15)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
      />
      {/* Headlight */}
      <rect x="174" y="50" width="8" height="10" rx="2" fill="rgba(255,220,100,0.6)" />
      {/* Tail light */}
      <rect x="18" y="50" width="6" height="10" rx="2" fill="rgba(234,61,86,0.5)" />
      {/* Bumpers */}
      <rect x="14" y="62" width="172" height="4" rx="2" fill={color} opacity={0.4} />
      {/* Front wheel */}
      <g transform={`rotate(${wheelRotation}, 156, 70)`}>
        <circle cx="156" cy="70" r="16" fill="rgba(30,30,40,0.9)" stroke={color} strokeWidth="2" />
        <circle cx="156" cy="70" r="6" fill="rgba(60,60,70,0.8)" />
        {/* Spokes */}
        <line x1="156" y1="58" x2="156" y2="62" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="156" y1="78" x2="156" y2="82" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="144" y1="70" x2="148" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="164" y1="70" x2="168" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      </g>
      {/* Rear wheel */}
      <g transform={`rotate(${wheelRotation}, 48, 70)`}>
        <circle cx="48" cy="70" r="16" fill="rgba(30,30,40,0.9)" stroke={color} strokeWidth="2" />
        <circle cx="48" cy="70" r="6" fill="rgba(60,60,70,0.8)" />
        <line x1="48" y1="58" x2="48" y2="62" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="48" y1="78" x2="48" y2="82" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="36" y1="70" x2="40" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="56" y1="70" x2="60" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      </g>
    </svg>
  );
};

// ─── Face Portrait (Front view, biometric style) ─────────────
export const FacePortrait: React.FC<{
  color?: string;
  width?: number;
}> = ({ color = "rgba(255,255,255,0.55)", width = 140 }) => {
  const h = width * 1.4;
  return (
    <svg width={width} height={h} viewBox="0 0 140 196" fill="none">
      {/* Hair */}
      <ellipse cx="70" cy="48" rx="48" ry="46" fill={color} opacity={0.35} />
      {/* Head */}
      <ellipse cx="70" cy="62" rx="42" ry="52" fill={color} opacity={0.6} />
      {/* Left eye socket */}
      <ellipse cx="52" cy="58" rx="10" ry="6" fill="rgba(0,0,0,0.25)" />
      {/* Right eye socket */}
      <ellipse cx="88" cy="58" rx="10" ry="6" fill="rgba(0,0,0,0.25)" />
      {/* Left iris */}
      <circle cx="52" cy="58" r="4" fill="rgba(100,180,255,0.4)" />
      <circle cx="52" cy="58" r="2" fill="rgba(0,0,0,0.5)" />
      {/* Right iris */}
      <circle cx="88" cy="58" r="4" fill="rgba(100,180,255,0.4)" />
      <circle cx="88" cy="58" r="2" fill="rgba(0,0,0,0.5)" />
      {/* Eyebrows */}
      <path d="M40 48 Q52 42 62 48" stroke={color} strokeWidth="2.5" fill="none" opacity={0.5} />
      <path d="M78 48 Q88 42 100 48" stroke={color} strokeWidth="2.5" fill="none" opacity={0.5} />
      {/* Nose */}
      <path d="M66 62 Q70 78 74 62" stroke={color} strokeWidth="1.5" fill="none" opacity={0.35} />
      <path d="M62 78 Q70 84 78 78" stroke={color} strokeWidth="1.5" fill="none" opacity={0.3} />
      {/* Mouth */}
      <path d="M56 92 Q70 102 84 92" stroke={color} strokeWidth="2" fill="none" opacity={0.4} />
      <path d="M60 92 Q70 96 80 92" stroke={color} strokeWidth="1" fill="none" opacity={0.2} />
      {/* Jaw line */}
      <path d="M30 72 Q30 112 70 118 Q110 112 110 72" stroke={color} strokeWidth="1" fill="none" opacity={0.15} />
      {/* Neck */}
      <rect x="58" y="114" width="24" height="18" rx="6" fill={color} opacity={0.4} />
      {/* Shoulders */}
      <path
        d="M30 132 Q30 128 40 126 L100 126 Q110 128 110 132 L116 160 Q116 164 112 164 L28 164 Q24 164 24 160 Z"
        fill={color}
        opacity={0.35}
      />
      {/* Biometric grid dots on face */}
      {[
        [44, 50], [96, 50],    // outer brow
        [52, 58], [88, 58],    // eyes
        [70, 72],              // nose tip
        [56, 92], [84, 92],    // mouth corners
        [70, 96],              // chin center
        [36, 70], [104, 70],   // cheek
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill={COLORS.brandBlue} opacity={0.5} />
      ))}
      {/* Biometric connection lines */}
      <path d="M52 58 L70 72 L88 58" stroke={COLORS.brandBlue} strokeWidth="0.8" fill="none" opacity={0.2} />
      <path d="M56 92 L70 72 L84 92" stroke={COLORS.brandBlue} strokeWidth="0.8" fill="none" opacity={0.2} />
    </svg>
  );
};

// ─── Car Rear View (for LPR) ─────────────────────────────────
export const CarRearView: React.FC<{
  color?: string;
  width?: number;
  plateText?: string;
}> = ({ color = "rgba(255,255,255,0.5)", width = 220, plateText = "ABC-1234" }) => {
  const h = width * 0.7;
  return (
    <svg width={width} height={h} viewBox="0 0 220 154" fill="none">
      {/* Main body */}
      <path
        d="M20 90 L20 60 Q20 56 24 56 L196 56 Q200 56 200 60 L200 90 Q200 100 196 104 L24 104 Q20 100 20 90 Z"
        fill={color}
        opacity={0.5}
      />
      {/* Roof / cabin */}
      <path
        d="M48 56 L60 20 Q62 14 68 14 L152 14 Q158 14 160 20 L172 56"
        fill={color}
        opacity={0.35}
      />
      {/* Rear window */}
      <path
        d="M54 52 L64 24 Q66 18 72 18 L148 18 Q154 18 156 24 L166 52 Z"
        fill="rgba(100,180,255,0.1)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />
      {/* Left tail light */}
      <rect x="22" y="62" width="32" height="14" rx="4" fill={`${COLORS.alertRed}50`} />
      <rect x="24" y="64" width="12" height="10" rx="2" fill={`${COLORS.alertRed}70`} />
      {/* Right tail light */}
      <rect x="166" y="62" width="32" height="14" rx="4" fill={`${COLORS.alertRed}50`} />
      <rect x="182" y="64" width="12" height="10" rx="2" fill={`${COLORS.alertRed}70`} />
      {/* License plate */}
      <rect x="60" y="82" width="100" height="32" rx="4" fill="rgba(255,255,255,0.88)" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
      <rect x="64" y="86" width="92" height="24" rx="2" fill="rgba(255,255,255,0.95)" />
      <text
        x="110"
        y="104"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="16"
        fontWeight="bold"
        fill="#1a1a2e"
        letterSpacing="3"
      >
        {plateText}
      </text>
      {/* Bumper */}
      <rect x="16" y="106" width="188" height="8" rx="3" fill={color} opacity={0.3} />
      {/* Exhaust */}
      <rect x="60" y="112" width="20" height="6" rx="3" fill="rgba(80,80,90,0.4)" />
      <rect x="140" y="112" width="20" height="6" rx="3" fill="rgba(80,80,90,0.4)" />
      {/* Wheels */}
      <ellipse cx="36" cy="114" rx="18" ry="10" fill="rgba(30,30,40,0.6)" />
      <ellipse cx="184" cy="114" rx="18" ry="10" fill="rgba(30,30,40,0.6)" />
    </svg>
  );
};

// ─── Camera Icon (Dome style, EnGenius-inspired) ─────────────
export const CameraIcon: React.FC<{
  color?: string;
  size?: number;
}> = ({ color = COLORS.brandBlue, size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    {/* Dome */}
    <path d="M8 24 Q8 10 20 8 Q32 10 32 24" fill={`${color}30`} stroke={color} strokeWidth="1.5" />
    {/* Base ring */}
    <ellipse cx="20" cy="24" rx="14" ry="4" fill={`${color}20`} stroke={color} strokeWidth="1" />
    {/* Lens */}
    <circle cx="20" cy="18" r="5" fill={`${color}40`} stroke={color} strokeWidth="1.5" />
    <circle cx="20" cy="18" r="2" fill={color} opacity={0.8} />
    {/* IR LED */}
    <circle cx="13" cy="18" r="1.5" fill={`${COLORS.alertRed}60`} />
    <circle cx="27" cy="18" r="1.5" fill={`${COLORS.alertRed}60`} />
    {/* Mount */}
    <rect x="17" y="28" width="6" height="6" rx="1" fill={`${color}40`} />
  </svg>
);

// ─── Cloud Icon ──────────────────────────────────────────────
export const CloudIcon: React.FC<{
  color?: string;
  size?: number;
}> = ({ color = COLORS.brandBlue, size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path
      d="M10 28 Q4 28 4 22 Q4 16 10 16 Q10 8 20 8 Q28 8 30 14 Q36 14 36 20 Q36 28 30 28 Z"
      fill={`${color}25`}
      stroke={color}
      strokeWidth="1.5"
    />
    {/* Upload arrow */}
    <path d="M20 17 L20 26" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 21 L20 17 L24 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Storage Icon ────────────────────────────────────────────
export const StorageIcon: React.FC<{
  color?: string;
  size?: number;
}> = ({ color = COLORS.brandBlue, size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    {/* Drive body */}
    <rect x="6" y="10" width="28" height="20" rx="3" fill={`${color}25`} stroke={color} strokeWidth="1.5" />
    {/* Disk platters */}
    <circle cx="20" cy="20" r="7" fill={`${color}15`} stroke={color} strokeWidth="1" />
    <circle cx="20" cy="20" r="3" fill={`${color}30`} />
    <circle cx="20" cy="20" r="1" fill={color} />
    {/* Activity LED */}
    <circle cx="30" cy="14" r="1.5" fill={COLORS.successGreen} />
    {/* Label area */}
    <rect x="9" y="26" width="10" height="2" rx="1" fill={`${color}30`} />
  </svg>
);

// ─── Router / Gateway Icon ───────────────────────────────────
export const GatewayIcon: React.FC<{
  color?: string;
  size?: number;
}> = ({ color = COLORS.brandBlue, size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    {/* Box */}
    <rect x="4" y="14" width="32" height="16" rx="3" fill={`${color}25`} stroke={color} strokeWidth="1.5" />
    {/* Antenna left */}
    <line x1="12" y1="14" x2="8" y2="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="4" r="2" fill={color} opacity={0.6} />
    {/* Antenna right */}
    <line x1="28" y1="14" x2="32" y2="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="32" cy="4" r="2" fill={color} opacity={0.6} />
    {/* Ports */}
    <rect x="8" y="24" width="4" height="3" rx="0.5" fill={`${color}50`} />
    <rect x="14" y="24" width="4" height="3" rx="0.5" fill={`${color}50`} />
    <rect x="20" y="24" width="4" height="3" rx="0.5" fill={`${color}50`} />
    <rect x="26" y="24" width="4" height="3" rx="0.5" fill={`${color}50`} />
    {/* LEDs */}
    <circle cx="10" cy="19" r="1.5" fill={COLORS.successGreen} />
    <circle cx="16" cy="19" r="1.5" fill={COLORS.successGreen} />
    <circle cx="22" cy="19" r="1.5" fill={COLORS.successGreen} opacity={0.3} />
  </svg>
);

// ─── Switch Icon ─────────────────────────────────────────────
export const SwitchIcon: React.FC<{
  color?: string;
  size?: number;
}> = ({ color = COLORS.brandBlue, size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    {/* Slim box */}
    <rect x="2" y="16" width="36" height="12" rx="2" fill={`${color}25`} stroke={color} strokeWidth="1.5" />
    {/* Ports (8 ports) */}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <rect key={i} x={5 + i * 4} y="22" width="3" height="3.5" rx="0.5" fill={`${color}50`} />
    ))}
    {/* LEDs */}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <circle key={i} cx={6.5 + i * 4} cy="20" r="1" fill={i < 5 ? COLORS.successGreen : `${color}20`} />
    ))}
  </svg>
);

// ─── Search / Magnifying Glass Icon ──────────────────────────
export const SearchIcon: React.FC<{
  color?: string;
  size?: number;
}> = ({ color = COLORS.brandBlue, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="2" />
    <line x1="15" y1="15" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    {/* AI sparkle */}
    <path d="M8 7 L9 9 L11 8 L9 9 L10 11 L9 9 L7 10 L9 9 Z" fill={color} opacity={0.5} />
  </svg>
);

// ─── Bell / Alert Icon ───────────────────────────────────────
export const AlertBellIcon: React.FC<{
  color?: string;
  size?: number;
}> = ({ color = COLORS.alertRed, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3 C8 3 5 6 5 10 L5 15 L3 17 L3 18 L21 18 L21 17 L19 15 L19 10 C19 6 16 3 12 3 Z"
      fill={`${color}30`}
      stroke={color}
      strokeWidth="1.5"
    />
    <path d="M9 18 Q9 22 12 22 Q15 22 15 18" fill={color} opacity={0.5} />
    {/* Clapper */}
    <circle cx="12" cy="3" r="1.5" fill={color} />
  </svg>
);
