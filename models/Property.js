import mongoose from "mongoose";
import "./PropertyType";
import "./PropertySubType";
import "./Amenity";

const PropertyFeatureSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: true }
);

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    priceType: {
      type: String,
      enum: ["fixed", "negotiable", "on-request"],
      default: "fixed",
    },

    propertyType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PropertyType",
    },
    propertySubType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PropertySubType",
    },

    status: {
      type: String,
      enum: ["available", "sold", "rented", "upcoming"],
      default: "available",
    },
    listingType: {
      type: String,
      enum: ["sale", "rent", "both"],
      default: "sale",
    },

    address: { type: String, default: "" },
    city: { type: mongoose.Schema.Types.Mixed, default: null },     // ObjectId ref or legacy string
    state: { type: mongoose.Schema.Types.Mixed, default: null },    // ObjectId ref or legacy string
    country: { type: mongoose.Schema.Types.Mixed, default: null },  // ObjectId ref or legacy string
    pincode: { type: String, default: "" },
    latitude: { type: Number },
    longitude: { type: Number },
    mapEmbedUrl: { type: String, default: "" },

    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    balconies: { type: Number, default: 0 },
    floors: { type: Number, default: 0 },
    totalFloors: { type: Number, default: 0 },
    carpetArea: { type: Number, default: 0 },
    builtUpArea: { type: Number, default: 0 },
    superBuiltUpArea: { type: Number, default: 0 },
    areaUnit: {
      type: String,
      enum: ["sqft", "sqm", "yards"],
      default: "sqft",
    },

    possessionStatus: {
      type: String,
      enum: ["ready", "under-construction"],
      default: "ready",
    },
    possessionDate: { type: Date },
    propertyAge: { type: Number },

    amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amenity" }],
    features: [PropertyFeatureSchema],

    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: "" },
        isPrimary: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
      },
    ],
    videoUrl: { type: String, default: "" },
    virtualTourUrl: { type: String, default: "" },
    documents: [
      {
        title: { type: String },
        fileUrl: { type: String },
        type: {
          type: String,
          enum: ["brochure", "floorplan", "legal", "other"],
          default: "other",
        },
      },
    ],

    agentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: String, default: "" },

    isFeatured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PropertySchema.index({ title: "text", description: "text", city: "text", address: "text" });
PropertySchema.index({ city: 1, status: 1, listingType: 1 });
PropertySchema.index({ price: 1 });
PropertySchema.index({ isFeatured: 1, isActive: 1 });

export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
