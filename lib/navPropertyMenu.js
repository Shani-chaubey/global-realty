import Property from "@/models/Property";
import { PROPERTY_LISTED_QUERY } from "@/lib/propertyCityLabels";

/**
 * Property types → subtypes (with listing counts) for mega-menu.
 * Types sorted by total listings; subtypes per type by listings. Only entries with count > 0.
 */
export async function buildPropertiesTypeMenu() {
  const rows = await Property.find(PROPERTY_LISTED_QUERY)
    .select("propertyType propertySubType")
    .populate("propertyType", "name slug isActive")
    .populate("propertySubType", "name slug isActive propertyType")
    .lean();

  const typeMap = new Map();

  for (const row of rows) {
    const pt = row.propertyType;
    if (!pt || typeof pt !== "object" || !pt._id || pt.isActive === false) continue;
    const slug = String(pt.slug || "").trim();
    if (!slug) continue;

    const tid = String(pt._id);
    if (!typeMap.has(tid)) {
      typeMap.set(tid, {
        _id: tid,
        name: String(pt.name || "Type"),
        slug,
        count: 0,
        subs: new Map(),
      });
    }
    const entry = typeMap.get(tid);
    entry.count += 1;

    const st = row.propertySubType;
    if (st && typeof st === "object" && st._id && st.isActive !== false) {
      const sid = String(st._id);
      const cur = entry.subs.get(sid) || {
        _id: sid,
        name: String(st.name || ""),
        slug: String(st.slug || ""),
        count: 0,
      };
      cur.count += 1;
      entry.subs.set(sid, cur);
    }
  }

  const types = [...typeMap.values()]
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count);

  return types.map((t) => {
    const typeHref = `/properties?type=${encodeURIComponent(t.slug)}`;
    let subtypes = [...t.subs.values()]
      .filter((s) => s.count > 0 && s.name)
      .sort((a, b) => b.count - a.count)
      .map((s) => ({
        _id: s._id,
        name: s.name,
        slug: s.slug,
        count: s.count,
        href: `/properties?type=${encodeURIComponent(t.slug)}&propertySubType=${encodeURIComponent(String(s.slug || "").trim() || s._id)}`,
      }));

    if (subtypes.length === 0) {
      subtypes = [
        {
          _id: `all-${t._id}`,
          name: `All ${t.name}`,
          slug: "all",
          count: t.count,
          href: typeHref,
        },
      ];
    }

    return {
      _id: t._id,
      name: t.name,
      slug: t.slug,
      count: t.count,
      href: typeHref,
      subtypes,
    };
  });
}
