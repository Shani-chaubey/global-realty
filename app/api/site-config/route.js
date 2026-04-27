import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import SiteConfig from "@/models/SiteConfig";

export async function GET() {
  try {
    await connectDB();
    const configs = await SiteConfig.find().lean();
    const configMap = {};
    configs.forEach((c) => {
      configMap[c.key] = c.value;
    });
    return NextResponse.json({ success: true, data: configMap });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const updates = await Promise.all(
      Object.entries(body).map(([key, value]) =>
        SiteConfig.findOneAndUpdate(
          { key },
          { key, value },
          { upsert: true, new: true }
        )
      )
    );
    return NextResponse.json({ success: true, data: updates });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
