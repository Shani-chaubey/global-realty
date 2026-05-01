import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import ScriptSettings from "@/models/ScriptSettings";

export async function GET() {
  try {
    await connectDB();
    const doc = await ScriptSettings.findOne().lean();
    return NextResponse.json({ success: true, data: doc || { scripts: "" } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
