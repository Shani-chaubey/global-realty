"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useComparison } from "@/components/compare/PropertyComparison";

const PLACEHOLDER = "/images/section/box-house.jpg";
const isObjectIdLike = (v) => typeof v === "string" && /^[a-f\d]{24}$/i.test(v);
const getCityLabel = (city) => {
  if (city && typeof city === "object") return city.name || "";
  if (isObjectIdLike(city)) return "";
  return city || "";
};

export default function PropertyGridItems({ properties = [], showItems }) {
  const { addToCompare, removeFromCompare, isInCompare } = useComparison();
  const items = showItems ? properties.slice(0, showItems) : properties;

  const formatPrice = (p) => {
    if (!p) return "";
    if (p.priceType === "on-request") return "Price on Request";
    return `₹${Number(p.price || 0).toLocaleString("en-IN")}`;
  };

  if (!items.length) return null;

  return (
    <>
      {items.map((property) => {
        const primaryImage = property.images?.find((i) => i.isPrimary) || property.images?.[0];
        const imgSrc = primaryImage?.url || PLACEHOLDER;
        const slug = property.slug || property._id;
        const inCompare = isInCompare(property._id);

        return (
          <div className="box-house hover-img" key={property._id}>
            <div className="image-wrap" style={{ height: 220, overflow: "hidden", flexShrink: 0 }}>
              <Link href={`/property-detail/${slug}`} style={{ display: "block", height: "100%" }}>
                <Image
                  className="lazyload"
                  alt={property.title || "Property"}
                  src={imgSrc}
                  width={400}
                  height={220}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  unoptimized
                />
              </Link>
              <ul className="box-tag flex gap-8">
                {property.isFeatured && (
                  <li className="flat-tag text-4 bg-main fw-6 text_white">Featured</li>
                )}
                {property.listingType && (
                  <li className="flat-tag text-4 bg-3 fw-6 text_white" style={{ textTransform: "capitalize" }}>
                    {property.listingType === "sale" ? "For Sale" : property.listingType === "rent" ? "For Rent" : property.listingType}
                  </li>
                )}
              </ul>
              <div className="list-btn flex gap-8">
                <Link href={`/property-detail/${slug}`} className="btn-icon find hover-tooltip">
                  <i className="icon-find-plus" />
                  <span className="tooltip">View Details</span>
                </Link>
              </div>
            </div>
            <div className="content">
              <h5 className="title">
                <Link href={`/property-detail/${slug}`}>{property.title}</Link>
              </h5>
              <p className="location text-1 flex items-center gap-6">
                <i className="icon-location" />
                {[property.address, getCityLabel(property.city)].filter(Boolean).join(", ")}
              </p>
              <ul className="meta-list flex">
                {property.bedrooms > 0 && (
                  <li className="text-1 flex">
                    <span>{property.bedrooms}</span>Beds
                  </li>
                )}
                {property.bathrooms > 0 && (
                  <li className="text-1 flex">
                    <span>{property.bathrooms}</span>Baths
                  </li>
                )}
                {property.builtUpArea > 0 && (
                  <li className="text-1 flex">
                    <span>{Number(property.builtUpArea).toLocaleString()}</span>
                    {property.areaUnit || "Sqft"}
                  </li>
                )}
              </ul>
              <div className="bot flex justify-between items-center">
                <h5 className="price">{formatPrice(property)}</h5>
                <div className="wrap-btn flex">
                  <button
                    className={`compare flex gap-8 items-center text-1${inCompare ? " text-color-primary" : ""}`}
                    style={{ background: "none", border: "none", cursor: "pointer", color: inCompare ? "var(--color-primary)" : undefined }}
                    onClick={() => inCompare ? removeFromCompare(property._id) : addToCompare(property._id)}
                    title={inCompare ? "Remove from compare" : "Add to compare"}
                  >
                    <i className="icon-compare" />
                    {inCompare ? "Added" : "Compare"}
                  </button>
                  <Link href={`/property-detail/${slug}`} className="tf-btn style-border pd-4">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
