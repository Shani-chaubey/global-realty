import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import AboutSection from "@/models/AboutSection";

export async function GET() {
  try {
    await connectDB();
    const about = await AboutSection.findOne({ isActive: true }).lean();
    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    await AboutSection.updateMany({}, { isActive: false });
    const about = await AboutSection.create({ ...body, isActive: true });
    return NextResponse.json({ success: true, data: about }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const about = await AboutSection.findOneAndUpdate(
      { isActive: true },
      body,
      { new: true, upsert: true }
    );
    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
