import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import JobPosting from "@/models/JobPosting";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");
    const query = all ? {} : { isActive: true };
    const jobs = await JobPosting.find(query)
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const job = await JobPosting.create(body);
    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
