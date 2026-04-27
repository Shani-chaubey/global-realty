import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import PropertyReview from "@/models/PropertyReview";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId");
    const all = searchParams.get("all");
    const query = all ? {} : { isApproved: true };
    if (propertyId) query.propertyId = propertyId;
    const reviews = await PropertyReview.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const review = await PropertyReview.create(body);
    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
