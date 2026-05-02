import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Property from "@/models/Property";
import PropertyType from "@/models/PropertyType";
import PropertySubType from "@/models/PropertySubType";
import Amenity from "@/models/Amenity";
import "@/models/City";
import "@/models/State";
import "@/models/Country";
import mongoose from "mongoose";
import { generateSlug } from "@/lib/apiHelpers";

const isObjectId = (v) => typeof v === "string" && /^[a-f\d]{24}$/i.test(v);

const toSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    const all = searchParams.get("all") === "true";
    const query = all ? {} : { isActive: true };

    const keyword = searchParams.get("keyword");
    if (keyword) {
      query.$text = { $search: keyword };
    }

    const city = searchParams.get("city");
    if (city) {
      if (isObjectId(city)) {
        query.city = new mongoose.Types.ObjectId(city);
      } else {
        // Look up city by name to get its ObjectId (new data), also match legacy string
        const CityModel = mongoose.models.City ||
          mongoose.model("City", new mongoose.Schema({ name: String, slug: String }, { strict: false }));
        const cityDoc = await CityModel.findOne({ name: { $regex: `^${city}$`, $options: "i" } }).lean();
        if (cityDoc) {
          query.$or = [{ city: cityDoc._id }, { city: { $regex: city, $options: "i" } }];
        } else {
          query.city = { $regex: city, $options: "i" };
        }
      }
    }

    const pincode = searchParams.get("pincode");
    if (pincode) query.pincode = pincode;

    const propertyType = searchParams.get("propertyType");
    if (propertyType) {
      const raw = propertyType.trim();
      if (isObjectId(raw)) {
        query.propertyType = new mongoose.Types.ObjectId(raw);
      } else {
        const pt = await PropertyType.findOne({
          slug: raw.toLowerCase(),
        })
          .select("_id")
          .lean();
        if (pt?._id) query.propertyType = pt._id;
      }
    }

    const propertySubType = searchParams.get("propertySubType");
    if (propertySubType) {
      const raw = propertySubType.trim();
      if (isObjectId(raw)) {
        query.propertySubType = new mongoose.Types.ObjectId(raw);
      } else {
        const pst = await PropertySubType.findOne({
          slug: raw.toLowerCase(),
        })
          .select("_id")
          .lean();
        if (pst?._id) query.propertySubType = pst._id;
      }
    }

    const listingType = searchParams.get("listingType");
    if (listingType) query.listingType = listingType;

    const status = searchParams.get("status");
    if (status) query.status = status;

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const bedrooms = searchParams.get("bedrooms");
    if (bedrooms) query.bedrooms = { $gte: Number(bedrooms) };

    const bathrooms = searchParams.get("bathrooms");
    if (bathrooms) query.bathrooms = { $gte: Number(bathrooms) };

    const minArea = searchParams.get("minArea");
    const maxArea = searchParams.get("maxArea");
    if (minArea || maxArea) {
      query.builtUpArea = {};
      if (minArea) query.builtUpArea.$gte = Number(minArea);
      if (maxArea) query.builtUpArea.$lte = Number(maxArea);
    }

    const possessionStatus = searchParams.get("possessionStatus");
    if (possessionStatus) query.possessionStatus = possessionStatus;

    const isFeatured = searchParams.get("isFeatured");
    if (isFeatured === "true") query.isFeatured = true;

    const amenitiesParam = searchParams.get("amenities");
    if (amenitiesParam) {
      const slugs = amenitiesParam.split(",").filter(Boolean);
      const allAmenities = await Amenity.find({}).lean();
      const matchedIds = allAmenities
        .filter((a) => slugs.includes(toSlug(a.name)))
        .map((a) => a._id);
      if (matchedIds.length) query.amenities = { $all: matchedIds };
    }

    const sortParam = searchParams.get("sort") || "";
    let sort = { createdAt: -1 }; // default: newest first
    if (sortParam === "price_asc")                                    sort = { price: 1 };
    else if (sortParam === "price_desc")                              sort = { price: -1 };
    else if (sortParam === "featured")                                sort = { isFeatured: -1, createdAt: -1 };
    else if (sortParam === "createdAt_asc" || sortParam === "oldest") sort = { createdAt: 1 };
    else if (sortParam === "createdAt_desc" || sortParam === "newest")sort = { createdAt: -1 };

    const [properties, total] = await Promise.all([
      Property.find(query)
        .populate("propertyType", "name slug")
        .populate("propertySubType", "name slug")
        .populate("amenities", "name icon category")
        .populate({
          path: "city",
          select: "name slug state",
          populate: { path: "state", select: "name code" },
        })
        .populate("state", "name code")
        .populate("country", "name code")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Property.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: properties,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.slug) {
      body.slug = generateSlug(body.title || "property");
    }

    const existing = await Property.findOne({ slug: body.slug });
    if (existing) {
      body.slug = `${body.slug}-${Date.now()}`;
    }

    const property = await Property.create(body);
    return NextResponse.json(
      { success: true, data: property },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
