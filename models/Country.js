import mongoose from "mongoose";

/** Minimal schema for populate / lean reads (shared DB with admin). */
const CountrySchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    code: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Country ||
  mongoose.model("Country", CountrySchema);
