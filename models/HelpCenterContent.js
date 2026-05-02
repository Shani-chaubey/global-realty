import mongoose from "mongoose";

const HelpCardSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    buttonLabel: { type: String, default: "" },
    buttonHref: { type: String, default: "" },
    icon: {
      type: String,
      enum: ["house", "wallet", "key"],
      default: "house",
    },
  },
  { _id: false }
);

const HelpTabSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    cards: { type: [HelpCardSchema], default: [] },
  },
  { _id: false }
);

const HelpCenterContentSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: "home", index: true },
    heading: { type: String, default: "" },
    subheading: { type: String, default: "" },
    tabs: { type: [HelpTabSchema], default: [] },
    footerLine: { type: String, default: "" },
    footerCtaLabel: { type: String, default: "" },
    footerCtaHref: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.HelpCenterContent ||
  mongoose.model("HelpCenterContent", HelpCenterContentSchema);
