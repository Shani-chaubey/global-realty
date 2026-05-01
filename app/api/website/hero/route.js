import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import HeroSection from "@/models/HeroSection";

export async function GET() {
  try {
    await connectDB();
    const slides = await HeroSection.find({ isActive: true })
      .sort({ order: 1 })
      .limit(5)
      .lean()
      .select("-__v");
    return NextResponse.json({ success: true, data: slides });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
