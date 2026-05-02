import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Property from "@/models/Property";
import City from "@/models/City";
import {
  PROPERTY_LISTED_QUERY,
  cityLabelFromPropertyField,
  loadCityIdNameMapFromRows,
} from "@/lib/propertyCityLabels";

/** Distinct city names from active listings (for search filters). */
export async function GET() {
  try {
    await connectDB();
    const rows = await Property.find(PROPERTY_LISTED_QUERY)
      .select("city")
      .lean();

    const idMap = await loadCityIdNameMapFromRows(rows, City);

    const set = new Set();
    for (const row of rows) {
      const label = cityLabelFromPropertyField(row.city, idMap);
      if (label) set.add(label);
    }

    const names = [...set].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" }),
    );
    return NextResponse.json({ success: true, data: names });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
