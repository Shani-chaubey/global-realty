/** Map property type slug/name to theme icon class (icon-*). DB may store emoji — ignore for layout icons. */
const SLUG_TO_ICON = {
  apartment: "icon-apartment1",
  villa: "icon-villa",
  studio: "icon-studio",
  office: "icon-office1",
  townhouse: "icon-townhouse",
  commercial: "icon-commercial-line",
  "family-home": "icon-home",
  penthouse: "icon-penhouse",
  land: "icon-land",
  plot: "icon-land",
};

export function categoryIconClass({ icon, name, slug }) {
  const raw = (icon || "").trim();
  if (raw.startsWith("icon-")) return raw;

  const key = (slug || "").toLowerCase().replace(/_/g, "-");
  if (key && SLUG_TO_ICON[key]) return SLUG_TO_ICON[key];

  const n = (name || "").toLowerCase();
  if (n.includes("penthouse")) return "icon-penhouse";
  if (n.includes("townhouse") || n.includes("town house")) return "icon-townhouse";
  if (n.includes("commercial")) return "icon-commercial-line";
  if (n.includes("apartment")) return "icon-apartment1";
  if (n.includes("residential")) return "icon-apartment1";
  if (n.includes("villa")) return "icon-villa";
  if (n.includes("studio")) return "icon-studio";
  if (n.includes("office")) return "icon-office1";
  if (n.includes("land") || n.includes("plot")) return "icon-land";
  if (n.includes("family") && n.includes("home")) return "icon-home";
  return "icon-apartment1";
}
