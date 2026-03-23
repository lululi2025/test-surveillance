import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONT } from "../theme";
import { SearchIcon } from "./SvgIcons";

const SEARCH_QUERY = "person with backpack near entrance";

const RESULTS = [
  { cam: "CAM-01 Lobby", time: "Today 14:23", conf: "96%" },
  { cam: "CAM-03 Entrance", time: "Today 14:18", conf: "94%" },
  { cam: "CAM-01 Lobby", time: "Today 11:05", conf: "91%" },
  { cam: "CAM-07 Gate B", time: "Yesterday 17:42", conf: "87%" },
];

export const NLSearch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const phase = frame % durationInFrames;

  const typedChars = Math.floor(
    interpolate(phase, [10, 90], [0, SEARCH_QUERY.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displayedText = SEARCH_QUERY.slice(0, typedChars);
  const cursorVisible = Math.sin(frame * 0.3) > 0 && phase < 100;
  const typingDone = phase >= 90;
  const searching = phase >= 95 && phase < 125;
  const searchDots = ".".repeat(((Math.floor(phase / 8)) % 3) + 1);
  const resultDelays = [125, 135, 145, 155];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.darkBg} 0%, ${COLORS.darkNavy} 100%)`,
        fontFamily: FONT,
        overflow: "hidden",
        padding: "40px 60px",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: `${COLORS.brandBlue}15`,
            border: `1px solid ${COLORS.brandBlue}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchIcon size={22} color={COLORS.brandBlue} />
        </div>
        <div>
          <div
            style={{ fontSize: 16, fontWeight: 700, color: COLORS.textPrimary }}
          >
            AI-Powered Video Search
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted }}>
            Search footage using natural language
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div
        style={{
          background: "rgba(0,0,0,0.4)",
          borderRadius: 14,
          padding: "16px 20px",
          border: `1px solid ${
            typingDone ? COLORS.brandBlue + "50" : "rgba(255,255,255,0.08)"
          }`,
          boxShadow: typingDone
            ? `0 0 24px ${COLORS.brandBlue}12`
            : "none",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <SearchIcon size={18} color={COLORS.textMuted} />
        <div style={{ flex: 1 }}>
          <span
            style={{
              fontSize: 15,
              color: COLORS.textPrimary,
              fontWeight: 400,
            }}
          >
            {displayedText}
          </span>
          {cursorVisible && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 18,
                background: COLORS.brandBlue,
                marginLeft: 1,
                verticalAlign: "text-bottom",
                borderRadius: 1,
              }}
            />
          )}
          {typedChars === 0 && (
            <span style={{ color: COLORS.textMuted, fontSize: 15 }}>
              Describe what you're looking for...
            </span>
          )}
        </div>
        {typingDone && (
          <div
            style={{
              background: COLORS.brandBlue,
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              padding: "7px 18px",
              borderRadius: 8,
              letterSpacing: 0.5,
            }}
          >
            Search
          </div>
        )}
      </div>

      {/* Searching indicator */}
      {searching && (
        <div
          style={{
            textAlign: "center",
            color: COLORS.brandBlue,
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: `2px solid ${COLORS.brandBlue}30`,
              borderTopColor: COLORS.brandBlue,
              transform: `rotate(${frame * 12}deg)`,
            }}
          />
          Analyzing footage with AI{searchDots}
        </div>
      )}

      {/* Results header */}
      {phase > 125 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
            opacity: interpolate(phase, [125, 135], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{ fontSize: 13, fontWeight: 600, color: COLORS.textSecondary }}
          >
            {RESULTS.length} matches found
          </span>
          <span style={{ fontSize: 11, color: COLORS.textMuted }}>
            Sorted by relevance
          </span>
        </div>
      )}

      {/* Result Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {RESULTS.map((result, i) => {
          const appear = spring({
            frame: Math.max(0, phase - resultDelays[i]),
            fps,
            config: { damping: 15, stiffness: 80 },
          });
          if (phase < resultDelays[i]) return null;

          return (
            <div
              key={i}
              style={{
                background: "rgba(0,0,0,0.3)",
                borderRadius: 12,
                padding: "14px 18px",
                border: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: appear,
                transform: `translateY(${interpolate(appear, [0, 1], [20, 0])}px)`,
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  width: 100,
                  height: 60,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${COLORS.darkNavy}, ${COLORS.deepPurple})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.06)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Play button */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid rgba(255,255,255,0.8)",
                      borderTop: "6px solid transparent",
                      borderBottom: "6px solid transparent",
                      marginLeft: 2,
                    }}
                  />
                </div>
                {/* Mini person detection box */}
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 28,
                    width: 16,
                    height: 30,
                    border: `1px solid ${COLORS.successGreen}70`,
                    borderRadius: 2,
                  }}
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.textPrimary,
                    marginBottom: 4,
                  }}
                >
                  {result.cam}
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>
                  {result.time}
                </div>
              </div>

              {/* Confidence */}
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: COLORS.successGreen,
                  }}
                >
                  {result.conf}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: COLORS.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  match
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
