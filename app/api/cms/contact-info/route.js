import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import ContactInfo from "@/models/ContactInfo";

export async function GET() {
  try {
    await connectDB();
    const info = await ContactInfo.findOne().lean();
    return NextResponse.json({ success: true, data: info });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const info = await ContactInfo.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });
    return NextResponse.json({ success: true, data: info });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
