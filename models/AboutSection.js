import mongoose from "mongoose";

const AboutSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    stats: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.AboutSection ||
  mongoose.model("AboutSection", AboutSectionSchema);
