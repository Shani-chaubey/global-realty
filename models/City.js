import mongoose from "mongoose";

/** Matches admin `City` collection (`cities`) so we can resolve property city ObjectIds. */
const CitySchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    slug: { type: String, default: "" },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State", default: null },
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.City ||
  mongoose.model("City", CitySchema);
