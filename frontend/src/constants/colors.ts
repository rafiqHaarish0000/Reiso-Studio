export const colors = {
  bg0: "#050507",
  bg1: "#09090C",
  panel: "#0D0D11",
  textPrimary: "#F5F5F2",
  textSecondary: "#A4A4AA",
  textMuted: "#66666D",
  border: "rgba(255,255,255,0.14)",
  borderSubtle: "rgba(255,255,255,0.08)",
  gridLine: "rgba(255,255,255,0.09)",
  separator: "rgba(255,255,255,0.25)",
  // Reiso accents — restrained blue + violet only
  cyan: "#1EA7FF",
  electricBlue: "#168DFF",
  deepBlue: "#1638FF",
  violet: "#5B35FF",
  purple: "#713DFF",
  magenta: "#713DFF",
  pink: "#D62CFF",
  coral: "#FF586A",
  warmOrange: "#FF8A45",
  warmYellow: "#FFD15C",
  // Signature gradient (used selectively)
  gradient:
    "linear-gradient(120deg, #1EA7FF 0%, #168DFF 45%, #5B35FF 100%)",
} as const;

export type Colors = typeof colors;
