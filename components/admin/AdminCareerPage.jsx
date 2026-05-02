"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { mergeCareerPage } from "@/lib/careerPageDefaults";

const fetcher = (url) => api.get(url).then((r) => r.data);

function Field({ label, children }) {
  return (
    <div>
      <label className="ap-label">{label}</label>
      {children}
    </div>
  );
}

export default function AdminCareerPage() {
  const { data, isLoading } = useSWR("/cms/career-page?raw=true", fetcher);
  const [form, setForm] = useState(() => mergeCareerPage(null));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setForm(mergeCareerPage(data.data));
    } else if (data && data.success && !data.data) {
      setForm(mergeCareerPage(null));
    }
  }, [data]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const setBenefit = (i, field, v) => {
    setForm((p) => {
      const items = [...(p.benefitItems || [])];
      items[i] = { ...items[i], [field]: v };
      return { ...p, benefitItems: items };
    });
  };

  const addBenefit = () => {
    setForm((p) => ({
      ...p,
      benefitItems: [
        ...(p.benefitItems || []),
        { iconClass: "icon-heart-1", label: "" },
      ],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        key: "main",
        heroTitle: form.heroTitle,
        heroSubtitle: form.heroSubtitle,
        jobsSectionTitle: form.jobsSectionTitle,
        jobsSectionSubtitle: form.jobsSectionSubtitle,
        jobsLoadMoreUrl: form.jobsLoadMoreUrl,
        benefitsTitle: form.benefitsTitle,
        benefitsPara1: form.benefitsPara1,
        benefitsPara2: form.benefitsPara2,
        benefitsImage1: form.benefitsImage1,
        benefitsImage2: form.benefitsImage2,
        benefitItems: (form.benefitItems || []).filter((b) => b.label?.trim()),
        benefitsCtaLabel: form.benefitsCtaLabel,
        benefitsCtaHref: form.benefitsCtaHref,
        reviewsTitle: form.reviewsTitle,
        reviewsPara1: form.reviewsPara1,
        reviewsPara2: form.reviewsPara2,
        reviewsPersonImage: form.reviewsPersonImage,
        reviewsSpotlightName: form.reviewsSpotlightName,
        reviewsSpotlightRole: form.reviewsSpotlightRole,
        reviewsSpotlightAvatar: form.reviewsSpotlightAvatar,
        reviewsCardQuote: form.reviewsCardQuote,
        reviewsCardName: form.reviewsCardName,
        reviewsCardRole: form.reviewsCardRole,
        reviewsCardAvatar: form.reviewsCardAvatar,
        reviewsMoreStoriesHref: form.reviewsMoreStoriesHref,
      };
      await api.put("/cms/career-page", payload);
      toast.success("Career page saved");
    } catch {
    } finally {
      setSaving(false);
    }
  };

  if (isLoading && !data) {
    return (
      <div className="ap-page-body">
        <p className="ap-title">Loading…</p>
      </div>
    );
  }

  return (
    <div className="ap-page-body">
      <div className="ap-header">
        <h1 className="ap-title">Career page</h1>
        <button onClick={handleSave} disabled={saving} className="ap-btn-primary">
          {saving ? "Saving…" : "Save all"}
        </button>
      </div>
      <p className="text-1 text-color-3 mb-24" style={{ maxWidth: "40rem" }}>
        Content for <code>/career</code>. Empty fields fall back to theme
        defaults until you publish copy here.
      </p>

      <div className="admin-card ap-form-stack mb-24">
        <h3 className="ap-title" style={{ fontSize: "1.1rem" }}>
          Hero
        </h3>
        <Field label="Title">
          <input
            className="ap-input"
            value={form.heroTitle}
            onChange={(e) => set("heroTitle", e.target.value)}
          />
        </Field>
        <Field label="Subtitle">
          <textarea
            className="ap-input"
            rows={2}
            value={form.heroSubtitle}
            onChange={(e) => set("heroSubtitle", e.target.value)}
          />
        </Field>
      </div>

      <div className="admin-card ap-form-stack mb-24">
        <h3 className="ap-title" style={{ fontSize: "1.1rem" }}>
          Jobs section
        </h3>
        <Field label="Section title">
          <input
            className="ap-input"
            value={form.jobsSectionTitle}
            onChange={(e) => set("jobsSectionTitle", e.target.value)}
          />
        </Field>
        <Field label="Section subtitle">
          <textarea
            className="ap-input"
            rows={3}
            value={form.jobsSectionSubtitle}
            onChange={(e) => set("jobsSectionSubtitle", e.target.value)}
          />
        </Field>
        <Field label="Load more button URL (optional)">
          <input
            className="ap-input"
            placeholder="https://..."
            value={form.jobsLoadMoreUrl}
            onChange={(e) => set("jobsLoadMoreUrl", e.target.value)}
          />
        </Field>
      </div>

      <div className="admin-card ap-form-stack mb-24">
        <h3 className="ap-title" style={{ fontSize: "1.1rem" }}>
          Benefits
        </h3>
        <Field label="Title (use line break in text for two lines)">
          <textarea
            className="ap-input"
            rows={2}
            value={form.benefitsTitle}
            onChange={(e) => set("benefitsTitle", e.target.value)}
          />
        </Field>
        <Field label="Paragraph 1">
          <textarea
            className="ap-input"
            rows={3}
            value={form.benefitsPara1}
            onChange={(e) => set("benefitsPara1", e.target.value)}
          />
        </Field>
        <Field label="Paragraph 2">
          <textarea
            className="ap-input"
            rows={2}
            value={form.benefitsPara2}
            onChange={(e) => set("benefitsPara2", e.target.value)}
          />
        </Field>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
          }}
        >
          <Field label="Image 1 URL">
            <input
              className="ap-input"
              value={form.benefitsImage1}
              onChange={(e) => set("benefitsImage1", e.target.value)}
            />
          </Field>
          <Field label="Image 2 URL">
            <input
              className="ap-input"
              value={form.benefitsImage2}
              onChange={(e) => set("benefitsImage2", e.target.value)}
            />
          </Field>
        </div>
        <p className="ap-label">Benefit icons</p>
        {(form.benefitItems || []).map((b, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <input
              className="ap-input"
              placeholder="icon class e.g. icon-heart-1"
              value={b.iconClass || ""}
              onChange={(e) => setBenefit(i, "iconClass", e.target.value)}
            />
            <input
              className="ap-input"
              placeholder="Label"
              value={b.label || ""}
              onChange={(e) => setBenefit(i, "label", e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addBenefit} className="ap-btn-cancel">
          + Add benefit row
        </button>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
            marginTop: "0.75rem",
          }}
        >
          <Field label="CTA label">
            <input
              className="ap-input"
              value={form.benefitsCtaLabel}
              onChange={(e) => set("benefitsCtaLabel", e.target.value)}
            />
          </Field>
          <Field label="CTA link">
            <input
              className="ap-input"
              value={form.benefitsCtaHref}
              onChange={(e) => set("benefitsCtaHref", e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div className="admin-card ap-form-stack mb-24">
        <h3 className="ap-title" style={{ fontSize: "1.1rem" }}>
          Reviews
        </h3>
        <Field label="Title">
          <input
            className="ap-input"
            value={form.reviewsTitle}
            onChange={(e) => set("reviewsTitle", e.target.value)}
          />
        </Field>
        <Field label="Intro 1">
          <textarea
            className="ap-input"
            rows={3}
            value={form.reviewsPara1}
            onChange={(e) => set("reviewsPara1", e.target.value)}
          />
        </Field>
        <Field label="Intro 2">
          <textarea
            className="ap-input"
            rows={2}
            value={form.reviewsPara2}
            onChange={(e) => set("reviewsPara2", e.target.value)}
          />
        </Field>
        <Field label="More stories link">
          <input
            className="ap-input"
            value={form.reviewsMoreStoriesHref}
            onChange={(e) => set("reviewsMoreStoriesHref", e.target.value)}
          />
        </Field>
        <Field label="Large person image URL">
          <input
            className="ap-input"
            value={form.reviewsPersonImage}
            onChange={(e) => set("reviewsPersonImage", e.target.value)}
          />
        </Field>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
          }}
        >
          <Field label="Spotlight name">
            <input
              className="ap-input"
              value={form.reviewsSpotlightName}
              onChange={(e) => set("reviewsSpotlightName", e.target.value)}
            />
          </Field>
          <Field label="Spotlight role">
            <input
              className="ap-input"
              value={form.reviewsSpotlightRole}
              onChange={(e) => set("reviewsSpotlightRole", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Spotlight avatar URL">
          <input
            className="ap-input"
            value={form.reviewsSpotlightAvatar}
            onChange={(e) => set("reviewsSpotlightAvatar", e.target.value)}
          />
        </Field>
        <Field label="Quote text">
          <textarea
            className="ap-input"
            rows={4}
            value={form.reviewsCardQuote}
            onChange={(e) => set("reviewsCardQuote", e.target.value)}
          />
        </Field>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
          }}
        >
          <Field label="Quote author name">
            <input
              className="ap-input"
              value={form.reviewsCardName}
              onChange={(e) => set("reviewsCardName", e.target.value)}
            />
          </Field>
          <Field label="Quote author role">
            <input
              className="ap-input"
              value={form.reviewsCardRole}
              onChange={(e) => set("reviewsCardRole", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Quote author avatar URL">
          <input
            className="ap-input"
            value={form.reviewsCardAvatar}
            onChange={(e) => set("reviewsCardAvatar", e.target.value)}
          />
        </Field>
      </div>

      <div className="ap-form-footer">
        <button
          type="button"
          onClick={() => setForm(mergeCareerPage(null))}
          className="ap-btn-cancel"
        >
          Reset form to defaults (not saved)
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="ap-btn-save"
        >
          {saving ? "Saving…" : "Save all"}
        </button>
      </div>
    </div>
  );
}
