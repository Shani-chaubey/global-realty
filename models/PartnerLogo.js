import mongoose from "mongoose";

const PartnerLogoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    link: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

PartnerLogoSchema.index({ isActive: 1, order: 1 });

export default mongoose.models.PartnerLogo ||
  mongoose.model("PartnerLogo", PartnerLogoSchema);
