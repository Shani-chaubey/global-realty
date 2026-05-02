import mongoose from "mongoose";

const BenefitItemSchema = new mongoose.Schema(
  {
    iconClass: { type: String, default: "icon-heart-1" },
    label: { type: String, default: "" },
  },
  { _id: false }
);

const CareerPageSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: "main", index: true },
    heroTitle: { type: String, default: "" },
    heroSubtitle: { type: String, default: "" },
    heroBannerImage: { type: String, default: "" },
    jobsSectionTitle: { type: String, default: "" },
    jobsSectionSubtitle: { type: String, default: "" },
    jobsLoadMoreUrl: { type: String, default: "" },
    benefitsTitle: { type: String, default: "" },
    benefitsPara1: { type: String, default: "" },
    benefitsPara2: { type: String, default: "" },
    benefitsImage1: { type: String, default: "" },
    benefitsImage2: { type: String, default: "" },
    benefitItems: { type: [BenefitItemSchema], default: [] },
    benefitsCtaLabel: { type: String, default: "" },
    benefitsCtaHref: { type: String, default: "" },
    reviewsTitle: { type: String, default: "" },
    reviewsPara1: { type: String, default: "" },
    reviewsPara2: { type: String, default: "" },
    reviewsPersonImage: { type: String, default: "" },
    reviewsSpotlightName: { type: String, default: "" },
    reviewsSpotlightRole: { type: String, default: "" },
    reviewsSpotlightAvatar: { type: String, default: "" },
    reviewsCardQuote: { type: String, default: "" },
    reviewsCardName: { type: String, default: "" },
    reviewsCardRole: { type: String, default: "" },
    reviewsCardAvatar: { type: String, default: "" },
    reviewsMoreStoriesHref: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.CareerPage ||
  mongoose.model("CareerPage", CareerPageSchema);
