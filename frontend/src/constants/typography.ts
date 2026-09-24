export const fonts = {
  display: "'Space Grotesk', 'Inter', system-ui, -apple-system, sans-serif",
  body: "'Inter', 'Manrope', system-ui, -apple-system, sans-serif",
} as const;

export const typography = {
  reisoDesktop: { fontSize: 168, fontWeight: "800" as const, letterSpacing: -6, lineHeight: 143 },
  studioDesktop: { fontSize: 56, fontWeight: "500" as const, letterSpacing: -2, lineHeight: 56 },
  reisoTablet: { fontSize: 112, fontWeight: "800" as const, letterSpacing: -4, lineHeight: 95 },
  studioTablet: { fontSize: 42, fontWeight: "500" as const, letterSpacing: -1.5, lineHeight: 42 },
  reisoMobile: { fontSize: 74, fontWeight: "800" as const, letterSpacing: -3, lineHeight: 63 },
  studioMobile: { fontSize: 34, fontWeight: "500" as const, letterSpacing: -1, lineHeight: 34 },
  nav: { fontSize: 13, fontWeight: "600" as const, letterSpacing: 1.2 },
  tagline: { fontSize: 13.5 },
  est: { fontSize: 11, letterSpacing: 0.6 },
  description: { fontSize: 15, lineHeight: 17.5 },
  services: { fontSize: 19, fontWeight: "600" as const },
  status: { fontSize: 11.5, letterSpacing: 1 },
} as const;
