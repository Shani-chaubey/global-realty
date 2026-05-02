import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { getFooterListingInsights } from "@/lib/footerInsights";

/** Top cities & property subtypes by listing count for footer. */
export async function GET() {
  try {
    await connectDB();
    const { topCities, topSubTypes } = await getFooterListingInsights();
    return NextResponse.json({
      success: true,
      data: { topCities, topSubTypes },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
