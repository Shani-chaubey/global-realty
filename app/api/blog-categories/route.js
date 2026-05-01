import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import BlogCategory from "@/models/BlogCategory";
import Blog from "@/models/Blog";
import { generateSlug } from "@/lib/apiHelpers";

export async function GET() {
  try {
    await connectDB();
    const categories = await BlogCategory.find({ isActive: true }).sort({ name: 1 }).lean();
    const counts = await Blog.aggregate([
      { $match: { status: "published", category: { $ne: null } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(counts.map((c) => [String(c._id), c.count]));
    const categoriesWithCounts = categories.map((cat) => ({
      ...cat,
      blogCount: countMap.get(String(cat._id)) || 0,
    }));
    return NextResponse.json({ success: true, data: categoriesWithCounts });
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
