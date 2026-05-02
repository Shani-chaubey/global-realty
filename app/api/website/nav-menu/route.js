import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { getFooterListingInsights } from "@/lib/footerInsights";
import { buildPropertiesTypeMenu } from "@/lib/navPropertyMenu";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const [{ topCities }, propertiesMenu] = await Promise.all([
      getFooterListingInsights(),
      buildPropertiesTypeMenu(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        topCities: (topCities || []).slice(0, 6),
        propertiesMenu,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
