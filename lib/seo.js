import connectDB from "@/lib/mongoose";
import SeoMeta from "@/models/SeoMeta";

const SITE_NAME = "Global Realty";

/**
 * Fetch SEO metadata for a given page slug from the DB.
 * Falls back to provided defaults.
 */
export async function getPageSeo(pageSlug, defaults = {}) {
  try {
    await connectDB();
    const meta = await SeoMeta.findOne({ page: pageSlug }).lean();

    const title = (meta?.title || defaults.title || `${SITE_NAME} | Real Estate`);
    const description = (meta?.description || defaults.description || "Find your dream property with Global Realty");
    const keywords = meta?.keywords || defaults.keywords || "";
    const ogImage = meta?.ogImage || defaults.ogImage || "";
    const robots = meta?.robots || "index, follow";
    const canonicalUrl = meta?.canonicalUrl || "";
    const twitterCard = meta?.twitterCard || "summary_large_image";
    const twitterTitle = meta?.twitterTitle || title;
    const twitterDescription = meta?.twitterDescription || description;

    const metadata = {
      title,
      description,
      keywords,
      robots,
      openGraph: {
        title,
        description,
        ...(ogImage ? { images: [{ url: ogImage }] } : {}),
        type: "website",
        siteName: SITE_NAME,
      },
      twitter: {
        card: twitterCard,
        title: twitterTitle,
        description: twitterDescription,
        ...(ogImage ? { images: [ogImage] } : {}),
      },
      ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
    };

    // Hreflang
    if (meta?.hreflang) {
      const hreflangLines = meta.hreflang.split("\n").filter(Boolean);
      const languages = {};
      hreflangLines.forEach((line) => {
        const [lang, url] = line.trim().split(/\s+/);
        if (lang && url) languages[lang] = url;
      });
      if (Object.keys(languages).length) {
        metadata.alternates = { ...metadata.alternates, languages };
      }
    }

    return { metadata, schemaMarkup: meta?.schemaMarkup || "" };
  } catch {
    return {
      metadata: {
        title: defaults.title || SITE_NAME,
        description: defaults.description || "",
      },
      schemaMarkup: "",
    };
  }
}
