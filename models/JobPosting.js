import mongoose from "mongoose";

const JobPostingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: String, default: "" },
    location: { type: String, default: "" },
    salaryLabel: { type: String, default: "" },
    applyUrl: { type: String, default: "" },
    animation: { type: String, default: "fadeInLeft" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.JobPosting ||
  mongoose.model("JobPosting", JobPostingSchema);
