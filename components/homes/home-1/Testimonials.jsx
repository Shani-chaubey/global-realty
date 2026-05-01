"use client";
import React, { useState } from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";

const FALLBACK_TESTIMONIALS = [
  {
    _id: "1",
    name: "Annette Black",
    role: "CEO Themesflat",
    avatar: "/images/avatar/testimonials-4.jpg",
    message:
      "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation.",
    rating: 5,
  },
  {
    _id: "2",
    name: "Eleanor Pena",
    role: "CEO Themesflat",
    avatar: "/images/avatar/avt-png7.png",
    message:
      "In hac habitasse platea dictumst. Sed eleifend aliquam dui quis convallis. Sed aliquet eros sit amet metus rhoncus bibendum nec vel nunc. Nullam ac dapibus enim.",
    rating: 5,
  },
  {
    _id: "3",
    name: "Floyd Miles",
    role: "CEO Themesflat",
    avatar: "/images/avatar/avt-png12.png",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam tempus urna id interdum. Proin iaculis erat id sapien venenatis convallis.",
    rating: 5,
  },
  {
    _id: "4",
    name: "Cody Fisher",
    role: "CEO Themesflat",
    avatar: "/images/avatar/avt-png6.png",
    message:
      "Vivamus at nisl ornare, vulputate turpis finibus, posuere metus. Donec in placerat felis. Praesent ante tellus, dignissim nec imperdiet ac.",
    rating: 5,
  },
  {
    _id: "5",
    name: "Ralph Edwards",
    role: "CEO Themesflat",
    avatar: "/images/avatar/avt-png5.png",
    message:
      "Quisque tincidunt, nunc vitae maximus lobortis, tellus risus fringilla mi, pulvinar feugiat lacus ipsum nec tortor. Aliquam a venenatis orci.",
    rating: 5,
  },
  {
    _id: "6",
    name: "Jacob Jones",
    role: "CEO Themesflat",
    avatar: "/images/avatar/avt-png8.png",
    message:
      "Outstanding service from start to finish. The team was professional, responsive, and truly understood our needs. We found our dream home!",
    rating: 5,
  },
];

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
  const items =
    dbTestimonials.length > 0 ? dbTestimonials : FALLBACK_TESTIMONIALS;

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
          {item.avatar ? (
            <Image
              alt={item.name}
              src={item.avatar}
              width={120}
              height={120}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: 51,
                height: 51,
                borderRadius: "50%",
                background: "var(--color-primary, #dc3545)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.25rem",
              }}
            >
              {item.name?.[0] || "?"}
            </div>
          )}
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
