import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import TeamAgent from "@/models/TeamAgent";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    let agent = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      agent = await TeamAgent.findOne({
        _id: id,
        isActive: true,
      }).lean();
    }
    if (!agent) {
      agent = await TeamAgent.findOne({
        slug: id,
        isActive: true,
      }).lean();
    }
    if (!agent) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: agent });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const updated = await TeamAgent.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await TeamAgent.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
