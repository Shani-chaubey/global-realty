import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Blog from "@/models/Blog";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id };
    const blog = await Blog.findOne(query)
      .populate("category", "name slug")
      .lean();
    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    if (body.status === "published" && !body.publishedAt) {
      body.publishedAt = new Date();
    }
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
