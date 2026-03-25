import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { AlertBellIcon, CameraIcon, GatewayIcon, SwitchIcon } from "./SvgIcons";

const enter = (progress: number, y = 18) => ({
  opacity: progress,
  transform: `translateY(${interpolate(progress, [0, 1], [y, 0])}px)`,
});

const whiteCard: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid rgba(13,27,42,0.08)",
  borderRadius: 28,
  boxShadow: "0 24px 60px rgba(13,27,42,0.08)",
};

const TitleBlock: React.FC<{ kicker: string; title: string }> = ({ kicker, title }) => (
  <div>
    <div
      style={{
        color: COLORS.brandBlue,
        fontSize: 12,
        fontWeight: 800,
        letterSpacing: 1.8,
        textTransform: "uppercase",
        marginBottom: 10,
      }}
    >
      {kicker}
    </div>
    <div
      style={{
        color: "#102033",
        fontSize: 30,
        fontWeight: 800,
        lineHeight: 1.1,
        maxWidth: 700,
      }}
    >
      {title}
    </div>
  </div>
);

const Chip: React.FC<{
  label: string;
  color: string;
}> = ({ label, color }) => (
  <div
    style={{
      padding: "10px 16px",
      borderRadius: 999,
      background: color,
      color: "#102033",
      fontSize: 14,
      fontWeight: 700,
      border: "1px solid rgba(13,27,42,0.08)",
    }}
  >
    {label}
  </div>
);

const SceneCard: React.FC<{
  label: string;
  title: string;
  accent: string;
}> = ({ label, title, accent }) => (
  <div
    style={{
      ...whiteCard,
      padding: 24,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: 220,
    }}
  >
    <div
      style={{
        color: "rgba(16,32,51,0.5)",
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: 1.4,
        marginBottom: 12,
      }}
    >
      {label}
    </div>
    <div
      style={{
        color: accent,
        fontSize: 30,
        fontWeight: 800,
        lineHeight: 1.12,
      }}
    >
      {title}
    </div>
  </div>
);

const PlatformGraphic: React.FC<{ progress: number }> = ({ progress }) => {
  const scale = interpolate(progress, [0, 1], [0.92, 1]);

  return (
    <div
      style={{
        ...whiteCard,
        height: "100%",
        padding: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 640,
          height: 360,
        }}
      >
        <svg
          width="640"
          height="360"
          viewBox="0 0 640 360"
          style={{ position: "absolute", inset: 0 }}
        >
          <line x1="320" y1="170" x2="150" y2="90" stroke={COLORS.brandBlue} strokeWidth="4" opacity="0.22" />
          <line x1="320" y1="170" x2="490" y2="90" stroke={COLORS.brandBlue} strokeWidth="4" opacity="0.22" />
          <line x1="320" y1="170" x2="180" y2="280" stroke={COLORS.brandBlue} strokeWidth="4" opacity="0.22" />
          <line x1="320" y1="170" x2="460" y2="280" stroke={COLORS.brandBlue} strokeWidth="4" opacity="0.22" />
        </svg>

        <div
          style={{
            position: "absolute",
            left: 246,
            top: 110,
            width: 148,
            height: 116,
            borderRadius: 28,
            background: "linear-gradient(180deg, #E8F6FF 0%, #F7FBFF 100%)",
            border: "1px solid rgba(3,169,244,0.14)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 14px 28px rgba(3,169,244,0.10)",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 20,
              background: "rgba(3,169,244,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <GatewayIcon size={34} color={COLORS.brandBlue} />
          </div>
          <div style={{ color: "#102033", fontSize: 14, fontWeight: 800 }}>Cloud</div>
        </div>

        {[
          {
            left: 88,
            top: 46,
            icon: <CameraIcon size={30} color={COLORS.successGreen} />,
            label: "Cameras",
            bg: "rgba(76,175,80,0.10)",
          },
          {
            left: 450,
            top: 46,
            icon: (
              <div style={{ color: COLORS.successGreen, fontSize: 18, fontWeight: 800 }}>AP</div>
            ),
            label: "Wi-Fi",
            bg: "rgba(76,175,80,0.10)",
          },
          {
            left: 112,
            top: 238,
            icon: <SwitchIcon size={30} color={COLORS.brandBlue} />,
            label: "Switching",
            bg: "rgba(3,169,244,0.10)",
          },
          {
            left: 432,
            top: 238,
            icon: <GatewayIcon size={30} color={COLORS.actionOrange} />,
            label: "Gateway",
            bg: "rgba(255,162,0,0.12)",
          },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              position: "absolute",
              left: item.left,
              top: item.top,
              width: 120,
              height: 84,
              borderRadius: 24,
              background: "#FFFFFF",
              border: "1px solid rgba(13,27,42,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 12px 24px rgba(13,27,42,0.06)",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 16,
                background: item.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </div>
            <div style={{ color: "#102033", fontSize: 12, fontWeight: 700 }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TraceGraphic: React.FC<{ progress: number; recovered: boolean }> = ({
  progress,
  recovered,
}) => {
  const accent = recovered ? COLORS.successGreen : COLORS.actionOrange;
  const pulseX = interpolate(progress, [0, 1], [320, 504]);
  const pulseY = interpolate(progress, [0, 1], [160, 138]);

  return (
    <div
      style={{
        ...whiteCard,
        height: "100%",
        padding: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative", width: 640, height: 360 }}>
        <svg
          width="640"
          height="360"
          viewBox="0 0 640 360"
          style={{ position: "absolute", inset: 0 }}
        >
          <line x1="148" y1="184" x2="320" y2="160" stroke="rgba(16,32,51,0.12)" strokeWidth="6" strokeLinecap="round" />
          <line x1="320" y1="160" x2="504" y2="138" stroke={accent} strokeWidth="6" strokeLinecap="round" />
          <line x1="504" y1="138" x2="544" y2="230" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.65" />
          <circle cx={pulseX} cy={pulseY} r="10" fill={accent} />
        </svg>

        <div
          style={{
            position: "absolute",
            left: 96,
            top: 136,
            width: 104,
            height: 96,
            borderRadius: 24,
            background: "#FFFFFF",
            border: `2px solid ${recovered ? "rgba(76,175,80,0.28)" : "rgba(234,61,86,0.32)"}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 12px 24px rgba(13,27,42,0.06)",
          }}
        >
          <CameraIcon size={34} color={recovered ? COLORS.successGreen : COLORS.alertRed} />
          <div style={{ color: "#102033", fontSize: 12, fontWeight: 700 }}>Camera</div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 270,
            top: 110,
            width: 108,
            height: 96,
            borderRadius: 24,
            background: "#FFFFFF",
            border: "1px solid rgba(13,27,42,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 12px 24px rgba(13,27,42,0.06)",
          }}
        >
          <SwitchIcon size={34} color={COLORS.brandBlue} />
          <div style={{ color: "#102033", fontSize: 12, fontWeight: 700 }}>Switch</div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 454,
            top: 86,
            width: 116,
            height: 104,
            borderRadius: 24,
            background: "#FFFFFF",
            border: `2px solid ${recovered ? "rgba(76,175,80,0.24)" : "rgba(255,162,0,0.28)"}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 12px 24px rgba(13,27,42,0.06)",
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 18,
              background: recovered ? "rgba(76,175,80,0.12)" : "rgba(255,162,0,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SwitchIcon size={30} color={accent} />
          </div>
          <div style={{ color: "#102033", fontSize: 12, fontWeight: 700 }}>
            Port 18
          </div>
        </div>

        {recovered ? (
          <div
            style={{
              position: "absolute",
              right: 44,
              bottom: 64,
              padding: "12px 18px",
              borderRadius: 999,
              background: "rgba(76,175,80,0.12)",
              color: COLORS.successGreen,
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            Restored
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              right: 36,
              bottom: 58,
              padding: "12px 18px",
              borderRadius: 999,
              background: "rgba(255,162,0,0.12)",
              color: COLORS.actionOrange,
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            Trace
          </div>
        )}
      </div>
    </div>
  );
};

export const UnifiedDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const scene = frame < 80 ? 0 : frame < 160 ? 1 : 2;
  const sceneStart = scene === 0 ? 0 : scene === 1 ? 80 : 160;
  const sceneProgress = spring({
    frame: Math.max(0, frame - sceneStart),
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  const cardCopy =
    scene === 0
      ? {
          label: "One Platform",
          title: "Cameras. Network. Power.",
          accent: COLORS.brandBlue,
        }
      : scene === 1
        ? {
            label: "Find the Issue",
            title: "Switch Floor 2 · Port 18",
            accent: COLORS.actionOrange,
          }
        : {
            label: "Recover Remotely",
            title: "Back Online in 14 Seconds",
            accent: COLORS.successGreen,
          };

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #F7FBFF 0%, #FFFFFF 100%)",
        fontFamily: FONT,
        overflow: "hidden",
        padding: "28px 30px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 10% 10%, rgba(3,169,244,0.10), transparent 22%), radial-gradient(circle at 90% 16%, rgba(255,162,0,0.08), transparent 18%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          ...enter(intro, 20),
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          <TitleBlock
            kicker="EnGenius Cloud"
            title="Cameras, Network, Power. One Login."
          />
          <div style={{ display: "flex", gap: 10 }}>
            <Chip label="Cloud" color="rgba(3,169,244,0.10)" />
            <Chip label={scene === 2 ? "Recovered" : scene === 1 ? "Tracing" : "Online"} color={scene === 2 ? "rgba(76,175,80,0.12)" : scene === 1 ? "rgba(255,162,0,0.12)" : "rgba(3,169,244,0.10)"} />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.9fr 0.82fr",
            gap: 18,
            flex: 1,
          }}
        >
          <div style={enter(sceneProgress)}>
            {scene === 0 ? (
              <PlatformGraphic progress={sceneProgress} />
            ) : scene === 1 ? (
              <TraceGraphic progress={sceneProgress} recovered={false} />
            ) : (
              <TraceGraphic progress={sceneProgress} recovered />
            )}
          </div>

          <div style={enter(sceneProgress, 22)}>
            <SceneCard
              label={cardCopy.label}
              title={cardCopy.title}
              accent={cardCopy.accent}
            />
          </div>
        </div>
      </div>

      {scene === 1 ? (
        <div
          style={{
            position: "absolute",
            top: 112,
            right: 34,
            padding: "14px 18px",
            borderRadius: 20,
            background: "#FFFFFF",
            border: "1px solid rgba(234,61,86,0.16)",
            boxShadow: "0 14px 30px rgba(13,27,42,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            ...enter(sceneProgress, 14),
          }}
        >
          <AlertBellIcon size={18} color={COLORS.alertRed} />
          <div style={{ color: "#102033", fontSize: 12, fontWeight: 800 }}>
            Camera Offline
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
