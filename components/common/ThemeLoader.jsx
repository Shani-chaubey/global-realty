"use client";

import { BRAND_PRIMARY_HEX } from "@/lib/brandPrimary";
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

/**
 * Applies the fixed theme primary so `--color-primary` matches SCSS `--Primary`.
 * (Site color is not read from the database.)
 */
export default function ThemeLoader() {
  useEffect(() => {
    applyThemeColor(BRAND_PRIMARY_HEX);
  }, []);

  return null;
}
