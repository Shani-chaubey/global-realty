import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Amenity from "@/models/Amenity";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");
    const query = all ? {} : { isActive: true };
    const amenities = await Amenity.find(query).sort({ category: 1, name: 1 }).lean();
    return NextResponse.json({ success: true, data: amenities });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const amenity = await Amenity.create(body);
    return NextResponse.json({ success: true, data: amenity }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
