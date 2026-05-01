"use client";
import React, { useState } from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";

function StarRating({ rating = 5 }) {
  return (
    <div className="ratings">
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className="icon-star" />
      ))}
    </div>
  );
}

export default function Testimonials({ testimonials: dbTestimonials = [] }) {
  const [showMore, setShowMore] = useState(false);
  const items = dbTestimonials.filter((t) => t?.message || t?.review || t?.content);
  if (!items.length) return null;

  // Group items into columns of 3
  const firstCol = items.slice(0, 3);
  const secondCol = items.slice(3, 6);
  const thirdCol = items.slice(6, 9);

  const renderCard = (item) => (
    <div key={item._id || item.id} className="wg-testimonial style-2">
      <StarRating rating={item.rating} />
      <p className="text-1 description">
        {item.message || item.review || item.content}
      </p>
      <div className="author">
        <div className="avatar">
          <Image
            alt={item.name || ""}
            src={item.avatar || "/images/avatar/avt-png5.png"}
            width={120}
            height={120}
            unoptimized
          />
        </div>
        <div className="content">
          <h6 className="name">
            <a href="#">{item.name}</a>
          </h6>
          <p className="text-2">
            {item.role || item.designation || item.company || ""}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="section-testimonials style-1 tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center mb-48">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text="Clients Testimonials" />
              </h2>
              <p className="text-1 split-text split-lines-transform">
                Thousands of luxury home enthusiasts just like you visit our
                website.
              </p>
            </div>
            <div
              className={`tf-grid-layout md-col-3 loadmore-item-8 ${
                showMore ? "active" : ""
              }`}
            >
              {firstCol.length > 0 && (
                <div className="box-testimonials">{firstCol.map(renderCard)}</div>
              )}
              {secondCol.length > 0 && (
                <div className="box-testimonials">{secondCol.map(renderCard)}</div>
              )}
              {thirdCol.length > 0 && (
                <div className="box-testimonials">{thirdCol.map(renderCard)}</div>
              )}
              {!showMore && items.length > 6 && (
                <button
                  onClick={() => setShowMore(true)}
                  className="tf-btn bg-color-primary fw-7 mx-auto btn-loadmore view-more-button"
                >
                  Show more...
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
