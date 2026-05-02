"use client";

import { BRAND_PRIMARY_HEX } from "@/lib/brandPrimary";

function ColorPreview({ color }) {
  return (
    <div>
      <h3
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--bs-body-color, #333)",
          marginBottom: "1rem",
        }}
      >
        Preview (site accent)
      </h3>
      <div className="ap-preview-section">
        <div className="ap-preview-btns">
          <button
            type="button"
            style={{ backgroundColor: color }}
            className="ap-btn-primary"
          >
            Primary Button
          </button>
          <button
            type="button"
            style={{
              color,
              borderColor: color,
              background: "transparent",
              border: "1px solid",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              cursor: "default",
            }}
          >
            Outlined Button
          </button>
          <span
            style={{
              backgroundColor: `${color}33`,
              color,
              padding: "0.25rem 0.75rem",
              fontSize: "0.875rem",
              borderRadius: "9999px",
              fontWeight: 500,
            }}
          >
            Badge
          </span>
        </div>
        <div className="ap-preview-row">
          <span style={{ color, fontSize: "0.875rem", fontWeight: 500 }}>
            Link-style accent
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AdminThemeSettings() {
  return (
    <div className="ap-page-stack" style={{ maxWidth: "56rem" }}>
      <div>
        <h1 className="ap-title">Theme</h1>
        <p className="ap-subtitle">
          The public site always uses the primary color from the theme files, not
          the database. To change the brand color, update{" "}
          <code>public/scss/abstracts/_variable.scss</code> (<code>--Primary</code>) and{" "}
          <code>lib/brandPrimary.js</code> (<code>BRAND_PRIMARY_HEX</code>) so they stay in
          sync, then rebuild.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
      >
        <div className="admin-card" style={{ padding: "1.5rem" }}>
          <h2 className="ap-card-title">Primary color</h2>
          <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
            Current value applied on every page load:
          </p>
          <div className="ap-hex-row" style={{ marginBottom: "0.75rem" }}>
            <div
              className="ap-hex-swatch"
              style={{ backgroundColor: BRAND_PRIMARY_HEX, width: 48, height: 48 }}
            />
            <code className="ap-input" style={{ display: "inline-block", padding: "0.5rem 0.75rem" }}>
              {BRAND_PRIMARY_HEX}
            </code>
          </div>
        </div>
        <div className="admin-card" style={{ padding: "1.5rem" }}>
          <ColorPreview color={BRAND_PRIMARY_HEX} />
        </div>
      </div>

      <div className="ap-theme-info">
        <div className="ap-theme-info__inner">
          <svg
            className="ap-theme-info__icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="ap-theme-info__title">Admin “Theme” vs website</p>
            <p className="ap-theme-info__body">
              <code>--color-primary</code> and related variables are set in{" "}
              <code>ThemeLoader</code> from <code>BRAND_PRIMARY_HEX</code>. Any{" "}
              <code>primaryColor</code> value stored in site config is ignored for styling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
