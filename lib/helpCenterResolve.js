import { DEFAULT_HELP_CENTER_CONTENT } from "./helpCenterDefaults";

const ICONS = new Set(["house", "wallet", "key"]);

function normCard(raw, fallback) {
  const c = raw && typeof raw === "object" ? raw : {};
  const f = fallback && typeof fallback === "object" ? fallback : {};
  const icon = ICONS.has(c.icon) ? c.icon : ICONS.has(f.icon) ? f.icon : "house";
  return {
    title: String(c.title ?? f.title ?? "").trim(),
    description: String(c.description ?? f.description ?? "").trim(),
    buttonLabel: String(c.buttonLabel ?? f.buttonLabel ?? "").trim(),
    buttonHref: String(c.buttonHref ?? f.buttonHref ?? "/").trim() || "/",
    icon,
  };
}

function normTab(raw, fallbackTab) {
  const t = raw && typeof raw === "object" ? raw : {};
  const ft = fallbackTab && typeof fallbackTab === "object" ? fallbackTab : {};
  const fcards = Array.isArray(ft.cards) ? ft.cards : [];
  const cards = [];
  for (let i = 0; i < 3; i++) {
    cards.push(normCard(t.cards?.[i], fcards[i]));
  }
  return {
    label: String(t.label ?? ft.label ?? "").trim(),
    cards,
  };
}

/** Merge DB document with defaults so partial or empty CMS never breaks the layout. */
export function resolveHelpCenterContent(db) {
  const d = DEFAULT_HELP_CENTER_CONTENT;
  if (!db || typeof db !== "object") {
    return JSON.parse(JSON.stringify(d));
  }
  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push(normTab(db.tabs?.[i], d.tabs[i]));
  }
  return {
    heading: String(db.heading ?? d.heading).trim() || d.heading,
    subheading: String(db.subheading ?? d.subheading).trim() || d.subheading,
    tabs,
    footerLine: String(db.footerLine ?? d.footerLine).trim() || d.footerLine,
    footerCtaLabel:
      String(db.footerCtaLabel ?? d.footerCtaLabel).trim() || d.footerCtaLabel,
    footerCtaHref:
      String(db.footerCtaHref ?? d.footerCtaHref).trim() || d.footerCtaHref,
  };
}
