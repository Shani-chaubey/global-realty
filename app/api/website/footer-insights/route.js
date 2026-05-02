import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Property from "@/models/Property";

function cityLabelFromDoc(cityVal) {
  if (!cityVal) return null;
  if (typeof cityVal === "object" && cityVal !== null && "name" in cityVal) {
    const n = String(cityVal.name || "").trim();
    return n || null;
  }
  if (typeof cityVal === "string") {
    const n = cityVal.trim();
    return n || null;
  }
  return null;
}

/** Top cities & property subtypes by listing count for footer. */
export async function GET() {
  try {
    await connectDB();
    const rows = await Property.find({ isActive: true })
      .select("city propertySubType")
      .populate("city", "name slug")
      .populate("propertySubType", "name slug")
      .lean();

    const cityCounts = new Map();
    const subCounts = new Map();

    for (const row of rows) {
      const cn = cityLabelFromDoc(row.city);
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
        href: `/properties?propertySubType=${encodeURIComponent(id)}`,
      }));

    return NextResponse.json({
      success: true,
      data: { topCities, topSubTypes },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
