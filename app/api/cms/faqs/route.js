import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import FAQ from "@/models/FAQ";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");
    const category = searchParams.get("category");
    const query = all ? {} : { isActive: true };
    if (category) query.category = category;
    const faqs = await FAQ.find(query).sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json({ success: true, data: faqs });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const faq = await FAQ.create(body);
    return NextResponse.json({ success: true, data: faq }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
