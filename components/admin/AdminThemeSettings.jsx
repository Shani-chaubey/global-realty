"use client";
import { useState, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import useSWR, { mutate } from "swr";
import toast from "react-hot-toast";
import api from "@/lib/axios";

const fetcher = (url) => api.get(url).then((r) => r.data);

const PRESET_COLORS = [
  { label: "Classic Red", value: "#dc3545" },
  { label: "Royal Blue", value: "#2563eb" },
  { label: "Emerald", value: "#059669" },
  { label: "Violet", value: "#7c3aed" },
  { label: "Amber", value: "#d97706" },
  { label: "Rose", value: "#e11d48" },
  { label: "Teal", value: "#0d9488" },
  { label: "Indigo", value: "#4338ca" },
];

function ColorPreview({ color }) {
  return (
    <div>
      <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--bs-body-color, #333)", marginBottom: "1rem" }}>Preview</h3>
      <div className="ap-preview-section">
        <div className="ap-preview-btns">
          <button style={{ backgroundColor: color }} className="ap-btn-primary">Primary Button</button>
          <button style={{ color, borderColor: color, background: "transparent", border: "1px solid", padding: "0.5rem 1rem", borderRadius: "0.5rem", fontSize: "0.875rem", cursor: "pointer" }}>Outlined Button</button>
          <span style={{ backgroundColor: color + "20", color, padding: "0.25rem 0.75rem", fontSize: "0.875rem", borderRadius: "9999px", fontWeight: 500 }}>Badge</span>
        </div>
        <div className="ap-preview-row">
          <a style={{ color, fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", textDecoration: "underline" }}>Link example</a>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <div style={{ backgroundColor: color, width: "0.75rem", height: "0.75rem", borderRadius: "9999px" }} />
            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Active indicator</span>
          </div>
        </div>
        <div className="ap-preview-sidebar-bar">
          <div className="ap-preview-sidebar-bar__top" style={{ backgroundColor: color }}>
            <span className="ap-preview-sidebar-bar__top span">Sidebar Active Item</span>
          </div>
          <div className="ap-preview-sidebar-bar__bottom">
            <div className="ap-preview-sidebar-bar__prog" style={{ backgroundColor: color, width: "60%" }} />
            <p className="ap-preview-sidebar-bar__sub">Progress bar / accent</p>
          </div>
        </div>
        <div className="ap-preview-grid2">
          <div className="ap-preview-stat" style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}>
            <p className="ap-preview-stat__label">Stat Card</p>
            <p className="ap-preview-stat__val">142</p>
            <p className="ap-preview-stat__sub">Properties</p>
          </div>
          <div className="ap-preview-card">
            <div className="ap-preview-card__icon" style={{ backgroundColor: color + "20" }}>
              <svg style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="ap-preview-card__text">Card with accent icon</p>
          </div>
        </div>
        <div className="ap-preview-input-row">
          <input
            type="text"
            readOnly
            value="Input with focus ring"
            style={{ outline: `2px solid ${color}`, outlineOffset: "2px", padding: "0.5rem 0.75rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem", fontSize: "0.875rem", flex: 1 }}
          />
        </div>
      </div>
    </div>
  );
}

export default function AdminThemeSettings() {
  const { data, isLoading } = useSWR("/site-config", fetcher);
  const [primaryColor, setPrimaryColor] = useState("#dc3545");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.data?.primaryColor) setPrimaryColor(data.data.primaryColor);
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/site-config", { primaryColor });
      document.documentElement.style.setProperty("--color-primary", primaryColor);
      toast.success("Theme color saved! Changes applied site-wide.");
      mutate("/site-config");
    } catch {
      toast.error("Failed to save theme settings");
    } finally {
      setSaving(false);
    }
  };

  const handleColorChange = (color) => {
    setPrimaryColor(color);
    document.documentElement.style.setProperty("--color-primary", color);
  };

  if (isLoading) {
    return (
      <div className="ap-page-stack">
        <div className="ap-skeleton" style={{ height: "2rem", width: "12rem" }} />
        <div className="ap-skeleton" style={{ height: "24rem", borderRadius: "1rem" }} />
      </div>
    );
  }

  return (
    <div className="ap-page-stack" style={{ maxWidth: "56rem" }}>
      <div>
        <h1 className="ap-title">Theme Settings</h1>
        <p className="ap-subtitle">Change the primary color of the entire website. Changes apply instantly site-wide.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div className="admin-card" style={{ padding: "1.5rem" }}>
          <h2 className="ap-card-title">Primary Color</h2>
          <div className="ap-form-stack">
            <div className="ap-color-picker-wrap">
              <HexColorPicker color={primaryColor} onChange={handleColorChange} style={{ width: "100%", maxWidth: 280 }} />
            </div>
            <div>
              <label className="ap-label" style={{ marginBottom: "0.375rem" }}>Hex Color Code</label>
              <div className="ap-hex-row">
                <div className="ap-hex-swatch" style={{ backgroundColor: primaryColor }} />
                <div className="ap-hex-input-wrap">
                  <span className="ap-hex-prefix">#</span>
                  <HexColorInput
                    color={primaryColor}
                    onChange={handleColorChange}
                    prefixed={false}
                    className="ap-input"
                    style={{ paddingLeft: "1.75rem" }}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="ap-label" style={{ marginBottom: "0.5rem" }}>Quick Presets</label>
              <div className="ap-preset-grid">
                {PRESET_COLORS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => handleColorChange(preset.value)}
                    title={preset.label}
                    className={`ap-preset-btn${primaryColor.toLowerCase() === preset.value.toLowerCase() ? " ap-preset-btn--active" : ""}`}
                  >
                    <div className="ap-preset-swatch" style={{ backgroundColor: preset.value }} />
                    <span className="ap-preset-label">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ paddingTop: "0.5rem", borderTop: "1px solid #f3f4f6", display: "flex", gap: "0.75rem" }}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ flex: 1, padding: "0.625rem 1rem", color: "#fff", borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 500, border: "none", cursor: "pointer", backgroundColor: primaryColor, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", opacity: saving ? 0.6 : 1 }}
              >
                {saving ? (
                  <>
                    <svg style={{ width: "1rem", height: "1rem", animation: "spin 1s linear infinite" }} fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }} />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style={{ opacity: 0.75 }} />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg style={{ width: "1rem", height: "1rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Theme Color
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => handleColorChange("#dc3545")}
                className="ap-btn-cancel"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="admin-card" style={{ padding: "1.5rem" }}>
          <ColorPreview color={primaryColor} />
        </div>
      </div>

      <div className="ap-theme-info">
        <div className="ap-theme-info__inner">
          <svg className="ap-theme-info__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="ap-theme-info__title">How it works</p>
            <p className="ap-theme-info__body">
              The selected color is saved to the database and injected as a CSS custom property (<code>--color-primary</code>) on page load.
              All buttons, links, highlights, badges, and accent elements throughout the site use this variable automatically.
              Changes apply instantly without a page reload.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
