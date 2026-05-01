import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Property from "@/models/Property";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await connectDB();
    const { ids } = await request.json();
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ success: false, error: "No IDs provided" }, { status: 400 });
    }

    const properties = await Property.find({ _id: { $in: ids } })
      .populate("propertyType", "name")
      .lean();

    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
