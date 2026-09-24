export const spacing = {
  headerHeight: 92,
  headerHPadding: 36,
  heroWidth: 1072,
  heroHeight: 566,
  pageHPadding: 36,
} as const;

export const breakpoints = {
  mobile: 640,
  tablet: 1024,
} as const;

export type Breakpoint = "mobile" | "tablet" | "desktop";
