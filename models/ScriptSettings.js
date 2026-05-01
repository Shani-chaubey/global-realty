import mongoose from "mongoose";

const ScriptSettingsSchema = new mongoose.Schema(
  {
    scripts: { type: String, default: "" },
    updatedBy: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.models.ScriptSettings ||
  mongoose.model("ScriptSettings", ScriptSettingsSchema);
