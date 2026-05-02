import mongoose from "mongoose";

function slugify(name) {
  return String(name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const TeamAgentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, index: true },
    role: { type: String, default: "" },
    photo: { type: String, default: "" },
    detailPhoto: { type: String, default: "" },
    agency: { type: String, default: "" },
    companyLink: { type: String, default: "" },
    city: { type: String, default: "" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    bio: { type: String, default: "" },
    aboutTitle: { type: String, default: "" },
    socialFacebook: { type: String, default: "" },
    socialTwitter: { type: String, default: "" },
    socialLinkedin: { type: String, default: "" },
    socialInstagram: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

TeamAgentSchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name);
  }
  next();
});

export default mongoose.models.TeamAgent ||
  mongoose.model("TeamAgent", TeamAgentSchema);
