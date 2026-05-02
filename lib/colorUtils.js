/**
 * Convert a hex color string to rgba(r, g, b, opacity).
 * Supports 3-char (#rgb) and 6-char (#rrggbb) hex codes.
 */
const FALLBACK_HEX = "#78a535";

export function hexToRgba(hex, opacity = 1) {
  if (!hex || typeof hex !== "string") {
    const c = FALLBACK_HEX.replace("#", "");
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (clean.length !== 6) return hexToRgba(FALLBACK_HEX, opacity);

  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return hexToRgba(FALLBACK_HEX, opacity);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Generate a full set of CSS custom property declarations from a primary hex color.
 */
export function buildThemeCSSVars(primaryHex) {
  const hex = primaryHex || FALLBACK_HEX;
  return `
    --primary: ${hex};
    --color-primary: ${hex};
    --primary-hover: ${hexToRgba(hex, 0.82)};
    --primary-light: ${hexToRgba(hex, 0.12)};
    --primary-section-bg: ${hexToRgba(hex, 0.06)};
    --primary-rgb: ${hexToRgb(hex)};
  `.trim();
}

function hexToRgb(hex) {
  let clean = (hex || "").replace("#", "");
  if (clean.length === 3) clean = clean.split("").map((c) => c + c).join("");
  if (clean.length !== 6) return "120, 165, 53";
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
