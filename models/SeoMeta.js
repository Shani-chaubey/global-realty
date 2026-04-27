import mongoose from "mongoose";

const SeoMetaSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    keywords: { type: String, default: "" },
    ogImage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.SeoMeta ||
  mongoose.model("SeoMeta", SeoMetaSchema);
