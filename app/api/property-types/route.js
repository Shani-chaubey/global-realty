import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import PropertyType from "@/models/PropertyType";
import { generateSlug } from "@/lib/apiHelpers";

export async function GET() {
  try {
    await connectDB();
    const types = await PropertyType.find({ isActive: true }).sort({ name: 1 }).lean();
    return NextResponse.json({ success: true, data: types });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    if (!body.slug) body.slug = generateSlug(body.name || "");
    const type = await PropertyType.create(body);
    return NextResponse.json({ success: true, data: type }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
