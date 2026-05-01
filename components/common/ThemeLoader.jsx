"use client";
import { useEffect } from "react";
import { hexToRgba } from "@/lib/colorUtils";

function applyThemeColor(hex) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", hex);
  root.style.setProperty("--primary", hex);
  root.style.setProperty("--primary-hover", hexToRgba(hex, 0.82));
  root.style.setProperty("--primary-light", hexToRgba(hex, 0.12));
  root.style.setProperty("--primary-section-bg", hexToRgba(hex, 0.06));
}

export default function ThemeLoader({ initialColor = "#dc3545" }) {
  useEffect(() => {
    applyThemeColor(initialColor);

    async function loadTheme() {
      try {
        const res = await fetch("/api/site-config", { cache: "no-store" });
        const data = await res.json();
        const color = data?.data?.primaryColor || initialColor;
        applyThemeColor(color);
      } catch {
        applyThemeColor(initialColor);
      }
    }

    loadTheme();
  }, [initialColor]);

  return null;
}
