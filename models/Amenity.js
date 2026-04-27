import mongoose from "mongoose";

const AmenitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: "" },
    category: {
      type: String,
      enum: ["indoor", "outdoor", "security", "utilities", "recreation", "other"],
      default: "other",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Amenity ||
  mongoose.model("Amenity", AmenitySchema);
