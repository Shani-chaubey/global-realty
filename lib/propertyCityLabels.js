import mongoose from "mongoose";

/** Same as home page / listing APIs: treat missing isActive as listed. */
export const PROPERTY_LISTED_QUERY = { isActive: { $ne: false } };

/**
 * Extract a City ObjectId string from Property.city (Mixed: ObjectId, string id, or plain name).
 */
export function extractCityObjectIdString(cityVal) {
  if (cityVal == null) return null;
  if (typeof cityVal === "string") {
    const t = cityVal.trim();
    if (/^[a-f\d]{24}$/i.test(t)) return t;
    return null;
  }
  if (typeof cityVal === "object") {
    if (cityVal._id != null) return String(cityVal._id);
    if (cityVal instanceof mongoose.Types.ObjectId) return String(cityVal);
  }
  return null;
}

/**
 * Label for one property's city field using optional id → name map from DB.
 */
export function cityLabelFromPropertyField(cityVal, idToName) {
  if (cityVal == null) return null;

  if (typeof cityVal === "string") {
    const t = cityVal.trim();
    if (!t) return null;
    if (/^[a-f\d]{24}$/i.test(t)) {
      return idToName?.get(t) || null;
    }
    return t;
  }

  if (typeof cityVal === "object") {
    const name = cityVal.name;
    if (name != null && String(name).trim()) return String(name).trim();

    const idStr = extractCityObjectIdString(cityVal);
    if (idStr && idToName?.has(idStr)) return idToName.get(idStr);
  }

  return null;
}

/**
 * Load map City _id → name for city ids appearing in these property rows.
 */
export async function loadCityIdNameMapFromRows(rows, City) {
  const ids = new Set();
  for (const row of rows) {
    const id = extractCityObjectIdString(row.city);
    if (id) ids.add(id);
  }

  if (ids.size === 0) return new Map();

  const cities = await City.find({ _id: { $in: [...ids] } })
    .select("name")
    .lean();

  const map = new Map();
  for (const c of cities) {
    const n = String(c.name || "").trim();
    if (n) map.set(String(c._id), n);
  }
  return map;
}
