import mongoose from "mongoose";

const SiteConfigSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, default: "" },
    label: { type: String, default: "" },
    type: {
      type: String,
      enum: ["text", "image", "url", "json", "boolean"],
      default: "text",
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteConfig ||
  mongoose.model("SiteConfig", SiteConfigSchema);
