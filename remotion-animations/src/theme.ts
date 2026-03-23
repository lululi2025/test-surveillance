// EnGenius Brand Colors & Theme
export const COLORS = {
  deepPurple: "#291734",
  brandBlue: "#03A9F4",
  actionOrange: "#FFA200",
  successGreen: "#4CAF50",
  alertRed: "#EA3D56",
  darkNavy: "#0d1b2a",
  darkBg: "#1a1a2e",
  white: "#FFFFFF",
  textMuted: "rgba(255,255,255,0.5)",
  textSecondary: "rgba(255,255,255,0.7)",
  textPrimary: "rgba(255,255,255,0.95)",
};

export const FONT = "Manrope, system-ui, sans-serif";

// All compositions: 1920x1080, 30fps, ~8 second loops
export const WIDTH = 960;
export const HEIGHT = 640;
export const FPS = 30;
export const DURATION_SECONDS = 8;
export const DURATION_FRAMES = FPS * DURATION_SECONDS;

export const dashboardBg = `linear-gradient(135deg, ${COLORS.darkBg} 0%, ${COLORS.darkNavy} 100%)`;
