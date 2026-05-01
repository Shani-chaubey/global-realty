"use client";
import Link from "next/link";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import { properties as FALLBACK_PROPERTIES } from "@/data/properties";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

function normalizeProperty(p) {
  const primaryImage = Array.isArray(p.images)
    ? (p.images.find((i) => i.isPrimary) || p.images[0])
    : null;
  const imageSrc = primaryImage?.url || p.imageSrc || p.image || "/images/listings/house-1.jpg";

  return {
    id: p._id || p.id,
    title: p.title,
    imageSrc,
    location: [p.address, p.city, p.state].filter(Boolean).join(", ") || p.location || "",
    beds: p.beds || p.bedrooms || 0,
    baths: p.baths || p.bathrooms || 0,
    sqft: p.builtUpArea || p.area || p.sqft || 0,
    areaUnit: p.areaUnit || "Sqft",
    price: p.price || 0,
    priceType: p.priceType || "",
    listingType: p.listingType === "sale" ? "For Sale" : p.listingType === "rent" ? "For Rent" : (p.listingType || "For Sale"),
    featured: p.isFeatured || p.featured || false,
  };
}

export default function Properties({ properties: dbProperties = [] }) {
  const rawList = dbProperties.length > 0 ? dbProperties : FALLBACK_PROPERTIES;
  const properties = rawList.map(normalizeProperty);

  return (
    <section className="section-listing tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text="Today's Luxury Listings" />
              </h2>
              <p className="text-1 split-text split-lines-transform">
                Thousands of luxury home enthusiasts just like you visit our
                website.
              </p>
            </div>
            {/* Desktop grid */}
            <div className="swiper-wrapper tf-layout-mobile-md md-col-2 lg-col-3 d-none d-lg-flex">
              {properties.slice(0, 6).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            {/* Mobile swiper */}
            <Swiper
              dir="ltr"
              className="swiper style-pagination tf-sw-mobile-1 d-lg-none"
              modules={[Pagination]}
              pagination={{ clickable: true, el: ".spd446" }}
              spaceBetween={15}
            >
              {properties.slice(0, 6).map((property) => (
                <SwiperSlide key={property.id}>
                  <PropertyCard property={property} />
                </SwiperSlide>
              ))}
              <div className="sw-pagination sw-pagination-mb-1 text-center d-lg-none d-block spd446" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ property }) {
  return (
    <div className="box-house hover-img">
      <div className="image-wrap">
        <Link href={`/property-detail/${property.id}`}>
          <Image
            className="lazyload"
            alt={property.title}
            src={property.imageSrc}
            width={600}
            height={401}
          />
        </Link>
        <ul className="box-tag flex gap-8">
          {property.featured && (
            <li className="flat-tag text-4 bg-main fw-6 text_white">Featured</li>
          )}
          <li className="flat-tag text-4 bg-3 fw-6 text_white">
            {property.listingType}
          </li>
        </ul>
        <div className="list-btn flex gap-8">
          <a href="#" className="btn-icon save hover-tooltip">
            <i className="icon-save" />
            <span className="tooltip">Add Favorite</span>
          </a>
          <a href="#" className="btn-icon find hover-tooltip">
            <i className="icon-find-plus" />
            <span className="tooltip">Quick View</span>
          </a>
        </div>
      </div>
      <div className="content">
        <h5 className="title">
          <Link href={`/property-detail/${property.id}`}>
            {property.title}
          </Link>
        </h5>
        {property.location && (
          <p className="location text-1 line-clamp-1">
            <i className="icon-location" /> {property.location}
          </p>
        )}
        <ul className="meta-list flex">
          <li className="text-1 flex">
            <span>{property.beds}</span>Beds
          </li>
          <li className="text-1 flex">
            <span>{property.baths}</span>Baths
          </li>
          <li className="text-1 flex">
            <span>{property.sqft}</span>Sqft
          </li>
        </ul>
        <div className="bot flex justify-between items-center">
          <h5 className="price">
            {property.priceType === "on-request"
              ? "Price on Request"
              : `₹${Number(property.price).toLocaleString("en-IN")}`}
          </h5>
          <div className="wrap-btn flex">
            <a href="#" className="compare flex gap-8 items-center text-1">
              <i className="icon-compare" />
              Compare
            </a>
            <Link
              href={`/property-detail/${property.id}`}
              className="tf-btn style-border pd-4"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
