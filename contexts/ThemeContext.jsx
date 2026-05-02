"use client";
import { BRAND_PRIMARY_HEX } from "@/lib/brandPrimary";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const ThemeContext = createContext({
  primaryColor: BRAND_PRIMARY_HEX,
  setPrimaryColor: () => {},
});

export function ThemeProvider({ children, initialColor }) {
  const [primaryColor, setPrimaryColorState] = useState(
    initialColor || BRAND_PRIMARY_HEX
  );

  const applyColor = useCallback((color) => {
    document.documentElement.style.setProperty("--color-primary", color);
  }, []);

  useEffect(() => {
    applyColor(primaryColor);
  }, [primaryColor, applyColor]);

  const setPrimaryColor = useCallback(
    (color) => {
      setPrimaryColorState(color);
      applyColor(color);
    },
    [applyColor]
  );

  return (
    <ThemeContext.Provider value={{ primaryColor, setPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
