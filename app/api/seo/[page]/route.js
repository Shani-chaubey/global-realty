import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import SeoMeta from "@/models/SeoMeta";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { page } = await params;
    const meta = await SeoMeta.findOne({ page }).lean();
    return NextResponse.json({ success: true, data: meta });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { page } = await params;
    const body = await request.json();
    const meta = await SeoMeta.findOneAndUpdate(
      { page },
      { ...body, page },
      { upsert: true, new: true }
    );
    return NextResponse.json({ success: true, data: meta });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
