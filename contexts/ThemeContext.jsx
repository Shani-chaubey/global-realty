"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const ThemeContext = createContext({
  primaryColor: "#dc3545",
  setPrimaryColor: () => {},
});

export function ThemeProvider({ children, initialColor }) {
  const [primaryColor, setPrimaryColorState] = useState(initialColor || "#dc3545");

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
