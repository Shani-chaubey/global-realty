import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ isApproved: true, isActive: true })
      .sort({ createdAt: -1 })
      .limit(9)
      .lean()
      .select("-__v");
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
