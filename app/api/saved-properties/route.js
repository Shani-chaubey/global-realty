import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import SavedProperty from "@/models/SavedProperty";
import { cookies } from "next/headers";

function getSessionId(request) {
  const cookieStore = request.cookies;
  return cookieStore.get("session_id")?.value || null;
}

export async function GET(request) {
  try {
    await connectDB();
    const sessionId = getSessionId(request);
    if (!sessionId) return NextResponse.json({ success: true, data: [] });

    const saved = await SavedProperty.find({ sessionId })
      .populate("propertyId", "title slug price city images listingType bedrooms bathrooms")
      .lean();

    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const sessionId = getSessionId(request);
    if (!sessionId) {
      return NextResponse.json({ success: false, error: "No session" }, { status: 401 });
    }
    const { propertyId } = await request.json();
    const existing = await SavedProperty.findOne({ sessionId, propertyId });
    if (existing) {
      await SavedProperty.findByIdAndDelete(existing._id);
      return NextResponse.json({ success: true, saved: false });
    }
    await SavedProperty.create({ sessionId, propertyId });
    return NextResponse.json({ success: true, saved: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
