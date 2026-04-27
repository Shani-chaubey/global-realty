import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Banner from "@/models/Banner";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const position = searchParams.get("position");
    const all = searchParams.get("all");
    const query = all ? {} : { isActive: true };
    if (position) query.position = position;
    const banners = await Banner.find(query).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: banners });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const banner = await Banner.create(body);
    return NextResponse.json({ success: true, data: banner }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
