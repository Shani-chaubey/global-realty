"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import ImageUploader from "@/components/ui/ImageUploader";

const fetcher = (url) => api.get(url).then((r) => r.data);

const DEFAULTS = {
  siteName: "Proty Real Estate",
  siteTagline: "Find Your Dream Property",
  logo: "",
  favicon: "",
  primaryColor: "#dc3545",
  footerText: "© 2024 Proty. All rights reserved.",
  googleAnalyticsId: "",
  facebookPixelId: "",
};

export default function AdminSiteConfig() {
  const [form, setForm] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const { data } = useSWR("/site-config", fetcher);

  useEffect(() => {
    if (data?.data) setForm((prev) => ({ ...prev, ...data.data }));
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/site-config", form);
      toast.success("Config saved");
    } catch {} finally { setSaving(false); }
  };

  return (
    <div className="ap-page-body">
      <div className="ap-header">
        <h1 className="ap-title">Site Configuration</h1>
        <button onClick={handleSave} disabled={saving} className="ap-btn-save" style={{ padding: "0.5rem 1.25rem" }}>{saving ? "Saving..." : "Save Config"}</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          <div className="admin-card" style={{ padding: "1.5rem" }}>
            <h3 className="ap-card-title">General</h3>
            <div className="ap-form-stack">
              <div><label className="ap-label">Site Name</label><input className="ap-input" value={form.siteName} onChange={(e) => setForm((p) => ({ ...p, siteName: e.target.value }))} /></div>
              <div><label className="ap-label">Tagline</label><input className="ap-input" value={form.siteTagline} onChange={(e) => setForm((p) => ({ ...p, siteTagline: e.target.value }))} /></div>
              <div><label className="ap-label">Footer Text</label><input className="ap-input" value={form.footerText} onChange={(e) => setForm((p) => ({ ...p, footerText: e.target.value }))} /></div>
              <div><label className="ap-label">Primary Color</label><input type="color" style={{ height: "2.5rem", width: "5rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", cursor: "pointer" }} value={form.primaryColor} onChange={(e) => setForm((p) => ({ ...p, primaryColor: e.target.value }))} /></div>
            </div>
          </div>
          <div className="admin-card" style={{ padding: "1.5rem" }}>
            <h3 className="ap-card-title">Logo & Favicon</h3>
            <div className="ap-form-stack">
              <div><label className="ap-label">Logo</label><ImageUploader value={form.logo} onChange={(url) => setForm((p) => ({ ...p, logo: url }))} folder="proty/brand" /></div>
              <div><label className="ap-label">Favicon</label><ImageUploader value={form.favicon} onChange={(url) => setForm((p) => ({ ...p, favicon: url }))} folder="proty/brand" /></div>
            </div>
          </div>
          <div className="admin-card" style={{ padding: "1.5rem" }}>
            <h3 className="ap-card-title">Analytics</h3>
            <div className="ap-form-stack">
              <div><label className="ap-label">Google Analytics ID</label><input className="ap-input" value={form.googleAnalyticsId} onChange={(e) => setForm((p) => ({ ...p, googleAnalyticsId: e.target.value }))} placeholder="G-XXXXXXXXXX" /></div>
              <div><label className="ap-label">Facebook Pixel ID</label><input className="ap-input" value={form.facebookPixelId} onChange={(e) => setForm((p) => ({ ...p, facebookPixelId: e.target.value }))} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
