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
  // Reiso logo-inspired accents
  cyan: "#10DDF4",
  electricBlue: "#0878FF",
  deepBlue: "#1638FF",
  violet: "#711EFF",
  purple: "#A718FF",
  magenta: "#F01CFF",
  pink: "#FF2EA6",
  coral: "#FF586A",
  warmOrange: "#FF8A45",
  warmYellow: "#FFD15C",
  // Signature gradient (used selectively, ~10% of UI)
  gradient:
    "linear-gradient(120deg, #10DDF4 0%, #0878FF 20%, #3F2BFF 40%, #9C1DFF 58%, #FF24B8 75%, #FF655D 88%, #FFD15C 100%)",
} as const;

export type Colors = typeof colors;
