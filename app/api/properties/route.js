import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Property from "@/models/Property";
import { generateSlug } from "@/lib/apiHelpers";

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
    if (city) query.city = { $regex: city, $options: "i" };

    const pincode = searchParams.get("pincode");
    if (pincode) query.pincode = pincode;

    const propertyType = searchParams.get("propertyType");
    if (propertyType) query.propertyType = propertyType;

    const propertySubType = searchParams.get("propertySubType");
    if (propertySubType) query.propertySubType = propertySubType;

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

    const amenities = searchParams.get("amenities");
    if (amenities) {
      query.amenities = { $all: amenities.split(",") };
    }

    const sortParam = searchParams.get("sort") || "newest";
    let sort = { createdAt: -1 };
    if (sortParam === "price_asc") sort = { price: 1 };
    else if (sortParam === "price_desc") sort = { price: -1 };
    else if (sortParam === "featured") sort = { isFeatured: -1, createdAt: -1 };

    const [properties, total] = await Promise.all([
      Property.find(query)
        .populate("propertyType", "name slug")
        .populate("propertySubType", "name slug")
        .populate("amenities", "name icon category")
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
