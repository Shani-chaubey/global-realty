import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import SeoMeta from "@/models/SeoMeta";

function normalizePage(page) {
  return String(page || "")
    .trim()
    .toLowerCase();
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { page: raw } = await params;
    const page = normalizePage(raw);
    const meta = await SeoMeta.findOne({ page }).lean();
    return NextResponse.json({ success: true, data: meta });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { page: raw } = await params;
    const page = normalizePage(raw);
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
