import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import ContactInfo from "@/models/ContactInfo";

export async function GET() {
  try {
    await connectDB();
    const info = await ContactInfo.findOne().lean().select("-__v");
    return NextResponse.json({ success: true, data: info || {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
