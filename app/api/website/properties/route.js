import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Property from "@/models/Property";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "12");
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const query = { isActive: { $ne: false } };
    if (featured === "true") query.featured = true;
    if (type) query.type = type;
    if (status) query.status = status;

    const properties = await Property.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
      .select("-__v");

    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
