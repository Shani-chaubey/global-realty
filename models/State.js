import mongoose from "mongoose";

/** Minimal schema for populate / lean reads (shared DB with admin). */
const StateSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    code: { type: String, default: "" },
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.State ||
  mongoose.model("State", StateSchema);
