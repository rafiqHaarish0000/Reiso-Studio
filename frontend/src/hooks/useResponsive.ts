import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { breakpoints, type Breakpoint } from "../constants/spacing";

export function getBreakpoint(width: number): Breakpoint {
  if (width <= breakpoints.mobile) return "mobile";
  if (width <= breakpoints.tablet) return "tablet";
  return "desktop";
}

export function useResponsive() {
  const [width, setWidth] = useState(() => Dimensions.get("window").width);

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setWidth(window.width);
    });
    return () => sub?.remove();
  }, []);

  const bp = getBreakpoint(width);
  return {
    width,
    breakpoint: bp,
    isMobile: bp === "mobile",
    isTablet: bp === "tablet",
    isDesktop: bp === "desktop",
  };
}
