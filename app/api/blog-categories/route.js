import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import BlogCategory from "@/models/BlogCategory";
import { generateSlug } from "@/lib/apiHelpers";

export async function GET() {
  try {
    await connectDB();
    const categories = await BlogCategory.find({ isActive: true }).sort({ name: 1 }).lean();
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    if (!body.slug) body.slug = generateSlug(body.name || "");
    const cat = await BlogCategory.create(body);
    return NextResponse.json({ success: true, data: cat }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
