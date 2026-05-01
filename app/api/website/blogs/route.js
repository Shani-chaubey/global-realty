import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Blog from "@/models/Blog";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "6");

    const blogs = await Blog.find({ status: "published" })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .populate("category", "name slug")
      .lean()
      .select("-__v -content");

    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
