import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Property from "@/models/Property";

/** Distinct city names from active listings (for search filters). */
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

export async function GET() {
  try {
    await connectDB();
    const rows = await Property.find({ isActive: true })
      .select("city")
      .populate("city", "name slug")
      .lean();

    const set = new Set();
    for (const row of rows) {
      const label = cityLabelFromDoc(row.city);
      if (label) set.add(label);
    }
    const names = [...set].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    return NextResponse.json({ success: true, data: names });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
