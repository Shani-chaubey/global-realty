import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Newsletter from "@/models/Newsletter";

export async function GET() {
  try {
    await connectDB();
    const subscribers = await Newsletter.find({ isSubscribed: true })
      .sort({ subscribedAt: -1 })
      .lean();
    return NextResponse.json({ success: true, data: subscribers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, error: "Email required" }, { status: 400 });
    }
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (!existing.isSubscribed) {
        await Newsletter.findByIdAndUpdate(existing._id, { isSubscribed: true });
        return NextResponse.json({ success: true, message: "Re-subscribed successfully" });
      }
      return NextResponse.json({ success: true, message: "Already subscribed" });
    }
    await Newsletter.create({ email });
    return NextResponse.json({ success: true, message: "Subscribed successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
