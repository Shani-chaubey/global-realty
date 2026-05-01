import mongoose from "mongoose";

const FeaturedCitySchema = new mongoose.Schema(
  {
    cityName: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    propertyCount: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.FeaturedCity ||
  mongoose.model("FeaturedCity", FeaturedCitySchema);
