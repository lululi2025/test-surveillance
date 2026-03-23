import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../theme";

type CompetitorCard = {
  name: string;
  company: string;
  accent: string;
  price: string;
  storage: string;
  ai: string;
  cloud: string;
  note: string;
};

type ScoreRow = {
  label: string;
  eng: number;
  verkada: number;
  meraki: number;
  ubiquiti: number;
};

type TcoRow = {
  company: string;
  value: number;
  accent: string;
  label: string;
};

const competitors: CompetitorCard[] = [
  {
    name: "ECC100 / ECC120",
    company: "EnGenius",
    accent: COLORS.brandBlue,
    price: "$149 - $199",
    storage: "256GB onboard",
    ai: "Edge AI + NPU",
    cloud: "Basic free",
    note: "No forced NVR",
  },
  {
    name: "CD42 / CD53",
    company: "Verkada",
    accent: "#FF7A59",
    price: "$999 - $1,999",
    storage: "256GB / 30-day bundle",
    ai: "Strong AI search",
    cloud: "Mandatory license",
    note: "Closed ecosystem",
  },
  {
    name: "MV Series",
    company: "Meraki",
    accent: "#6DD3C7",
    price: "$803 - $1,269",
    storage: "256GB / 1TB",
    ai: "ML analytics",
    cloud: "Mandatory license",
    note: "License expiry risk",
  },
  {
    name: "G5 / G5 Pro",
    company: "Ubiquiti",
    accent: "#9EA7B3",
    price: "$129 - $499",
    storage: "External UNVR needed",
    ai: "Basic AI detection",
    cloud: "No recurring fee",
    note: "Local NVR dependency",
  },
];

const scoreRows: ScoreRow[] = [
  { label: "Hardware Value", eng: 96, verkada: 48, meraki: 44, ubiquiti: 77 },
  { label: "License Freedom", eng: 98, verkada: 12, meraki: 8, ubiquiti: 88 },
  { label: "Open Integration", eng: 94, verkada: 14, meraki: 10, ubiquiti: 42 },
  { label: "Edge Storage", eng: 92, verkada: 84, meraki: 80, ubiquiti: 18 },
  { label: "Unified Cloud Stack", eng: 95, verkada: 55, meraki: 90, ubiquiti: 60 },
];

const tcoRows: TcoRow[] = [
  { company: "EnGenius", value: 18450, accent: COLORS.brandBlue, label: "$18.45K" },
  { company: "Ubiquiti", value: 24647, accent: "#7E8794", label: "$24.65K" },
  { company: "Meraki", value: 92450, accent: "#6DD3C7", label: "$92.45K" },
  { company: "Verkada", value: 104900, accent: "#FF7A59", label: "$104.9K" },
];

const sceneRange = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 18, end - 18, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

const Background: React.FC = () => (
  <>
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 20% 10%, rgba(3,169,244,0.24), transparent 30%), radial-gradient(circle at 84% 18%, rgba(255,162,0,0.16), transparent 22%), linear-gradient(135deg, #09111f 0%, #0c1726 38%, #11233b 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        opacity: 0.08,
      }}
    />
  </>
);

const Header: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 34,
      left: 48,
      right: 48,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    }}
  >
    <div>
      <div
        style={{
          color: COLORS.brandBlue,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 2.5,
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        TOC Competitor Comparison
      </div>
      <div
        style={{
          color: COLORS.textPrimary,
          fontSize: 34,
          lineHeight: 1.1,
          fontWeight: 800,
          maxWidth: 560,
        }}
      >
        EnGenius vs. Cloud Camera Competitors
      </div>
    </div>
    <div
      style={{
        textAlign: "right",
        color: COLORS.textMuted,
        fontSize: 12,
        lineHeight: 1.5,
      }}
    >
      Source: Cloud Camera Spec & Comparison
      <br />
      Plus 5-year TCO from market research
    </div>
  </div>
);

const IntroCards: React.FC<{ frame: number }> = ({ frame }) => (
  <div
    style={{
      position: "absolute",
      left: 48,
      right: 48,
      top: 150,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 18,
      opacity: sceneRange(frame, 0, 100),
    }}
  >
    {competitors.map((card, index) => {
      const appear = spring({
        frame: frame - index * 8,
        fps: 30,
        config: { damping: 14, stiffness: 95 },
      });
      const translateY = interpolate(appear, [0, 1], [38, 0]);
      return (
        <div
          key={card.company}
          style={{
            background:
              card.company === "EnGenius"
                ? "linear-gradient(180deg, rgba(3,169,244,0.22), rgba(3,169,244,0.08))"
                : "rgba(8, 14, 25, 0.72)",
            border: `1px solid ${
              card.company === "EnGenius"
                ? "rgba(3,169,244,0.45)"
                : "rgba(255,255,255,0.08)"
            }`,
            borderRadius: 24,
            padding: 22,
            minHeight: 290,
            transform: `translateY(${translateY}px) scale(${0.96 + appear * 0.04})`,
            boxShadow:
              card.company === "EnGenius"
                ? "0 18px 40px rgba(3,169,244,0.18)"
                : "0 12px 30px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
              borderRadius: 999,
              background: `${card.accent}22`,
              color: card.company === "EnGenius" ? COLORS.white : card.accent,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            {card.company}
          </div>
          <div
            style={{
              color: COLORS.textPrimary,
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 12,
              lineHeight: 1.15,
            }}
          >
            {card.name}
          </div>
          <div
            style={{
              display: "grid",
              gap: 10,
              color: COLORS.textSecondary,
              fontSize: 14,
              lineHeight: 1.45,
            }}
          >
            <div>Price: {card.price}</div>
            <div>Storage: {card.storage}</div>
            <div>AI: {card.ai}</div>
            <div>Cloud: {card.cloud}</div>
          </div>
          <div
            style={{
              marginTop: 18,
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              color:
                card.company === "EnGenius"
                  ? COLORS.brandBlue
                  : COLORS.textMuted,
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {card.note}
          </div>
        </div>
      );
    })}
  </div>
);

const ScoreBoard: React.FC<{ frame: number }> = ({ frame }) => (
  <div
    style={{
      position: "absolute",
      left: 48,
      right: 48,
      top: 152,
      opacity: sceneRange(frame, 90, 215),
      transform: `translateY(${interpolate(frame, [90, 130], [20, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })}px)`,
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr 1fr 1fr 1fr",
        gap: 14,
        alignItems: "center",
        marginBottom: 16,
        color: COLORS.textMuted,
        fontSize: 13,
        letterSpacing: 1.2,
        textTransform: "uppercase",
      }}
    >
      <div>Strategic Dimension</div>
      <div>EnGenius</div>
      <div>Verkada</div>
      <div>Meraki</div>
      <div>Ubiquiti</div>
    </div>
    {scoreRows.map((row, index) => {
      const reveal = spring({
        frame: frame - 95 - index * 6,
        fps: 30,
        config: { damping: 15, stiffness: 100 },
      });
      return (
        <div
          key={row.label}
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr 1fr 1fr 1fr",
            gap: 14,
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              color: COLORS.textPrimary,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {row.label}
          </div>
          {[
            { value: row.eng, color: COLORS.brandBlue, glow: true },
            { value: row.verkada, color: "#FF7A59" },
            { value: row.meraki, color: "#6DD3C7" },
            { value: row.ubiquiti, color: "#AAB2BC" },
          ].map((item, innerIndex) => (
            <div
              key={innerIndex}
              style={{
                position: "relative",
                height: 42,
                borderRadius: 14,
                background: "rgba(255,255,255,0.06)",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: `${item.value * reveal}%`,
                  background: `linear-gradient(90deg, ${item.color}, ${item.color}99)`,
                  boxShadow: item.glow
                    ? `0 0 28px ${item.color}55`
                    : "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 14px",
                  color: COLORS.white,
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                <span>Score</span>
                <span>{Math.round(item.value * reveal)}</span>
              </div>
            </div>
          ))}
        </div>
      );
    })}
    <div
      style={{
        marginTop: 20,
        color: COLORS.textSecondary,
        fontSize: 14,
        lineHeight: 1.5,
        maxWidth: 760,
      }}
    >
      EnGenius stands out by combining onboard storage, open RTSP / ONVIF
      expansion, free Basic cloud management, and a unified networking +
      surveillance dashboard.
    </div>
  </div>
);

const TcoChart: React.FC<{ frame: number }> = ({ frame }) => {
  const chartOpacity = sceneRange(frame, 200, 360);
  const maxValue = Math.max(...tcoRows.map((row) => row.value));
  const savingsVsVerkada = Math.round((1 - 18450 / 104900) * 1000) / 10;
  const savingsVsMeraki = Math.round((1 - 18450 / 92450) * 1000) / 10;

  return (
    <div
      style={{
        position: "absolute",
        left: 48,
        right: 48,
        top: 162,
        opacity: chartOpacity,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 18,
        }}
      >
        <div>
          <div
            style={{
              color: COLORS.textPrimary,
              fontSize: 28,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            5-Year TCO Comparison
          </div>
          <div
            style={{
              color: COLORS.textSecondary,
              fontSize: 15,
              maxWidth: 720,
              lineHeight: 1.5,
            }}
          >
            Based on a 50-camera deployment model from the market research
            report. EnGenius stays lowest by removing forced cloud licensing and
            external NVR overhead.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          {[
            `Save ${savingsVsVerkada}% vs Verkada`,
            `Save ${savingsVsMeraki}% vs Meraki`,
          ].map((badge) => (
            <div
              key={badge}
              style={{
                padding: "12px 16px",
                borderRadius: 999,
                background: "rgba(3,169,244,0.14)",
                border: "1px solid rgba(3,169,244,0.3)",
                color: COLORS.brandBlue,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 18,
          alignItems: "end",
          height: 300,
          marginTop: 24,
        }}
      >
        {tcoRows.map((row, index) => {
          const grow = spring({
            frame: frame - 210 - index * 7,
            fps: 30,
            config: { damping: 16, stiffness: 90 },
          });
          const height = interpolate(
            grow,
            [0, 1],
            [0, (row.value / maxValue) * 250]
          );
          return (
            <div
              key={row.company}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: 12,
                height: "100%",
              }}
            >
              <div
                style={{
                  color: row.company === "EnGenius" ? COLORS.brandBlue : COLORS.white,
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                {row.label}
              </div>
              <div
                style={{
                  height,
                  borderRadius: "22px 22px 8px 8px",
                  background: `linear-gradient(180deg, ${row.accent}, ${row.accent}88)`,
                  boxShadow:
                    row.company === "EnGenius"
                      ? `0 0 36px ${row.accent}50`
                      : "none",
                }}
              />
              <div
                style={{
                  color: COLORS.textPrimary,
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {row.company}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CompetitorComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 60, mass: 1.2 },
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      <Background />
      <Header />

      <div
        style={{
          position: "absolute",
          top: 118,
          left: 48,
          width: 150,
          height: 4,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${COLORS.brandBlue}, rgba(3,169,244,0.1))`,
          transform: `scaleX(${0.88 + pulse * 0.12})`,
          transformOrigin: "left center",
        }}
      />

      <IntroCards frame={frame} />
      <ScoreBoard frame={frame} />
      <TcoChart frame={frame} />

      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: COLORS.textMuted,
          fontSize: 12,
          letterSpacing: 0.4,
        }}
      >
        <div>
          Data from `(5)Competitor Comparison` worksheet and
          `market-research_surveillance.md`
        </div>
        <div>EnGenius Cloud Surveillance Launch</div>
      </div>
    </AbsoluteFill>
  );
};
