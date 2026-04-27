import mongoose from "mongoose";

const SavedPropertySchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true }
);

SavedPropertySchema.index({ sessionId: 1, propertyId: 1 }, { unique: true });

export default mongoose.models.SavedProperty ||
  mongoose.model("SavedProperty", SavedPropertySchema);
