import mongoose from "mongoose";

const HeroSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    backgroundImage: { type: String, default: "" },
    ctaText: { type: String, default: "Explore Properties" },
    ctaLink: { type: String, default: "/properties" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.HeroSection ||
  mongoose.model("HeroSection", HeroSectionSchema);
