import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import HeroSection from "@/models/HeroSection";

export async function GET() {
  try {
    await connectDB();
    const slides = await HeroSection.find({ isActive: true }).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: slides });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const slide = await HeroSection.create(body);
    return NextResponse.json({ success: true, data: slide }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
