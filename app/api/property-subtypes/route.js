import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import PropertySubType from "@/models/PropertySubType";
import { generateSlug } from "@/lib/apiHelpers";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const typeId = searchParams.get("propertyType");
    const query = { isActive: true };
    if (typeId) query.propertyType = typeId;
    const subtypes = await PropertySubType.find(query)
      .populate("propertyType", "name slug")
      .sort({ name: 1 })
      .lean();
    return NextResponse.json({ success: true, data: subtypes });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    if (!body.slug) body.slug = generateSlug(body.name || "");
    const subtype = await PropertySubType.create(body);
    return NextResponse.json({ success: true, data: subtype }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
