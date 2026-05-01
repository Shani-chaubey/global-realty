import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import FeaturedCity from "@/models/FeaturedCity";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const cities = await FeaturedCity.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, data: cities });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
