import Property from "@/models/Property";
import City from "@/models/City";
import {
  PROPERTY_LISTED_QUERY,
  cityLabelFromPropertyField,
  loadCityIdNameMapFromRows,
} from "@/lib/propertyCityLabels";

/** Top 6 cities and property subtypes by active listing count (for footer). */
export async function getFooterListingInsights() {
  const rows = await Property.find(PROPERTY_LISTED_QUERY)
    .select("city propertySubType")
    .populate("propertySubType", "name slug")
    .lean();

  const idMap = await loadCityIdNameMapFromRows(rows, City);

  const cityCounts = new Map();
  const subCounts = new Map();

  for (const row of rows) {
    const cn = cityLabelFromPropertyField(row.city, idMap);
    if (cn) cityCounts.set(cn, (cityCounts.get(cn) || 0) + 1);

    const st = row.propertySubType;
    if (st && typeof st === "object" && st._id) {
      const id = String(st._id);
      const cur = subCounts.get(id) || {
        name: String(st.name || "Type"),
        slug: String(st.slug || ""),
        count: 0,
      };
      cur.count += 1;
      subCounts.set(id, cur);
    }
  }

  const topCities = [...cityCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({
      name,
      count,
      href: `/properties?city=${encodeURIComponent(name)}`,
    }));

  const topSubTypes = [...subCounts.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 6)
    .map(([id, v]) => ({
      _id: id,
      name: v.name,
      slug: v.slug,
      count: v.count,
      href: `/properties?propertySubType=${encodeURIComponent(String(v.slug || "").trim() || id)}`,
    }));

  return { topCities, topSubTypes };
}
