"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import { properties6 } from "@/data/properties";
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
    garage: p.garage || 0,
    price: p.price || 0,
    priceType: p.priceType || "",
    listingType: p.listingType === "sale" ? "For Sale" : p.listingType === "rent" ? "For Rent" : (p.listingType || "For Sale"),
  };
}

function PropertyListCard({ property }) {
  return (
    <div className="box-house hover-img style-list">
      <div className="image-wrap">
        <Link href={`/property-detail/${property.id}`}>
          <Image
            className="lazyload"
            alt={property.title}
            src={property.imageSrc}
            width={435}
            height={408}
          />
        </Link>
        <ul className="box-tag flex gap-8">
          <li className="flat-tag text-4 bg-main fw-6 text_white">
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
          <li className="meta-item">
            <div className="text-9 flex">
              <i className="icon-bed" />
              Beds<span>{property.beds}</span>
            </div>
            <div className="text-9 flex">
              <i className="icon-sqft" />
              Sqft<span>{property.sqft}</span>
            </div>
          </li>
          <li className="meta-item">
            <div className="text-9 flex">
              <i className="icon-bath" />
              Baths<span>{property.baths}</span>
            </div>
            {property.garage > 0 && (
              <div className="text-9 flex">
                <i className="icon-garage" />
                Garage<span>{property.garage}</span>
              </div>
            )}
          </li>
        </ul>
        <div className="bot flex justify-between items-center">
          <h5 className="price">${Number(property.price).toLocaleString()}</h5>
          <div className="wrap-btn flex">
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

export default function Properties2({ properties: dbProperties = [] }) {
  const rawList =
    dbProperties.length > 0 ? dbProperties.slice(3, 9) : properties6;
  const properties = rawList.map(normalizeProperty);

  return (
    <section className="section-listing tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center mb-48">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text="Open Houses Listings" />
              </h2>
              <p className="text-1 split-text split-lines-transform">
                Thousands of luxury home enthusiasts just like you visit our
                website.
              </p>
            </div>
            <div className="swiper-wrapper tf-layout-mobile-lg lg-col-2 d-none d-lg-flex">
              {properties.map((property) => (
                <PropertyListCard key={property.id} property={property} />
              ))}
            </div>
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true, el: ".spd447" }}
              spaceBetween={15}
              className="swiper style-pagination tf-sw-mobile sw-swiper-992 d-lg-none"
            >
              {properties.map((property) => (
                <SwiperSlide key={property.id}>
                  <PropertyListCard property={property} />
                </SwiperSlide>
              ))}
              <div className="sw-pagination sw-pagination-mb text-center mt-20 d-lg-none d-block spd447" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
