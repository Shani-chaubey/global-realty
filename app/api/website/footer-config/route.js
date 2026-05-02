import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import SiteConfig from "@/models/SiteConfig";
import { getFooterListingInsights } from "@/lib/footerInsights";

export const dynamic = "force-dynamic";

const DEFAULT_NAV_LINKS = [
  { label: "Contact", href: "/contact", active: true },
  { label: "Our team", href: "/team", active: true },
  { label: "Careers", href: "/career", active: true },
  { label: "FAQs", href: "/faq", active: true },
  { label: "Blog", href: "/blogs", active: true },
  { label: "Compare", href: "/compare", active: true },
];

function normalizeNavLinks(raw) {
  if (!Array.isArray(raw) || raw.length === 0) return DEFAULT_NAV_LINKS;
  return raw
    .filter((item) => item && item.active !== false)
    .map((item) => ({
      label: String(item.label || "").trim() || "Page",
      href: String(item.href || "").trim() || "/",
      active: item.active !== false,
    }))
    .map((item) =>
      item.href === "/properties" && item.label === "Properties"
        ? { ...item, label: "Compare", href: "/compare" }
        : item
    )
    .filter((item) => item.href.startsWith("/"));
}

/** Public footer payload: nav links, insights, copyright, social (from SiteConfig). */
export async function GET() {
  try {
    await connectDB();
    const [configs, insights] = await Promise.all([
      SiteConfig.find().lean(),
      getFooterListingInsights().catch(() => ({
        topCities: [],
        topSubTypes: [],
      })),
    ]);

    const map = {};
    configs.forEach((c) => {
      map[c.key] = c.value;
    });

    const navLinks = normalizeNavLinks(map.footerNavLinks);

    return NextResponse.json({
      success: true,
      data: {
        navLinks,
        topCities: insights.topCities,
        topSubTypes: insights.topSubTypes,
        footerText:
          typeof map.footerText === "string" && map.footerText.trim()
            ? map.footerText.trim()
            : `Copyright © ${new Date().getFullYear()} Proty Real Estate`,
        socialFacebook: String(map.socialFacebook || "").trim(),
        socialTwitter: String(map.socialTwitter || "").trim(),
        socialLinkedin: String(map.socialLinkedin || "").trim(),
        socialInstagram: String(map.socialInstagram || "").trim(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
