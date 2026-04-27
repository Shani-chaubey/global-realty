import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Details1 from "@/components/propertyDetails/Details1";
import RelatedProperties from "@/components/propertyDetails/RelatedProperties";
import Slider1 from "@/components/propertyDetails/sliders/Slider1";
import React from "react";
import connectDB from "@/lib/mongoose";
import Property from "@/models/Property";
import { notFound } from "next/navigation";

async function fetchProperty(id) {
  await connectDB();
  const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
  const query = isMongoId
    ? { _id: id, isActive: { $ne: false } }
    : { slug: id, isActive: { $ne: false } };

  const property = await Property.findOne(query)
    .populate("propertyType", "name slug icon")
    .populate("propertySubType", "name slug")
    .populate("amenities", "name icon category")
    .populate("agentId", "name email phone avatar")
    .lean();

  if (!property) return null;

  return {
    ...property,
    _id: property._id.toString(),
    propertyType: property.propertyType
      ? { ...property.propertyType, _id: property.propertyType._id?.toString() }
      : null,
    propertySubType: property.propertySubType
      ? { ...property.propertySubType, _id: property.propertySubType._id?.toString() }
      : null,
    amenities: (property.amenities || []).map((a) => ({ ...a, _id: a._id?.toString() })),
    agentId: property.agentId
      ? { ...property.agentId, _id: property.agentId._id?.toString() }
      : null,
  };
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const property = await fetchProperty(id);
    if (!property) return { title: "Property Not Found | Proty Real Estate" };
    return {
      title: property.metaTitle || `${property.title} | Proty Real Estate`,
      description:
        property.metaDescription ||
        property.excerpt ||
        `${property.title} in ${property.city}`,
    };
  } catch {
    return { title: "Property Details | Proty Real Estate" };
  }
}

export default async function page({ params }) {
  const { id } = await params;

  let property = null;
  try {
    property = await fetchProperty(id);
  } catch (error) {
    console.error("Error fetching property:", error);
  }

  if (!property) {
    notFound();
  }

  return (
    <>
      <div id="wrapper">
        <Header1 />
        <Breadcumb pageName={property.title} />
        <div className="main-content">
          <Slider1 images={property.images} title={property.title} />
          <Details1 property={property} />
          <RelatedProperties city={property.city} currentId={property._id} />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
