/**
 * Convert a hex color string to rgba(r, g, b, opacity).
 * Supports 3-char (#rgb) and 6-char (#rrggbb) hex codes.
 */
export function hexToRgba(hex, opacity = 1) {
  if (!hex || typeof hex !== "string") return `rgba(220, 53, 69, ${opacity})`;

  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (clean.length !== 6) return `rgba(220, 53, 69, ${opacity})`;

  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(220, 53, 69, ${opacity})`;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Generate a full set of CSS custom property declarations from a primary hex color.
 */
export function buildThemeCSSVars(primaryHex) {
  const hex = primaryHex || "#dc3545";
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
  if (clean.length !== 6) return "220, 53, 69";
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
