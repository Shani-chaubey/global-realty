"use client";
import { useEffect } from "react";

export default function ThemeLoader({ initialColor = "#dc3545" }) {
  useEffect(() => {
    async function loadTheme() {
      try {
        const res = await fetch("/api/site-config", { cache: "no-store" });
        const data = await res.json();
        const color = data?.data?.primaryColor || initialColor;
        document.documentElement.style.setProperty("--color-primary", color);
      } catch {
        document.documentElement.style.setProperty("--color-primary", initialColor);
      }
    }
    loadTheme();
  }, [initialColor]);

  return null;
}
