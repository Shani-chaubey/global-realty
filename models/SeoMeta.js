import mongoose from "mongoose";

const SeoMetaSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    keywords: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    robots: { type: String, default: "index, follow" },
    canonicalUrl: { type: String, default: "" },
    schemaMarkup: { type: String, default: "" },
    hreflang: { type: String, default: "" },
    twitterCard: { type: String, default: "summary_large_image" },
    twitterTitle: { type: String, default: "" },
    twitterDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.SeoMeta ||
  mongoose.model("SeoMeta", SeoMetaSchema);
