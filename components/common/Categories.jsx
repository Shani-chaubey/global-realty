"use client";
import { categories } from "@/data/categories";
import { categoryIconClass } from "@/lib/categoryTypeIcon";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SplitTextAnimation from "./SplitTextAnimation";
import { Pagination } from "swiper/modules";

function formatCount(n) {
  const c = Number(n) || 0;
  if (c === 1) return "1 Property";
  return `${c.toLocaleString("en-IN")} Properties`;
}

export default function Categories({
  parentClass = "tf-spacing-1 section-categories pb-0",
  items,
}) {
  /* Homepage passes `items` (possibly empty). Demo pages omit it → static placeholder. */
  if (Array.isArray(items) && items.length === 0) {
    return null;
  }

  const useDynamic = Array.isArray(items) && items.length > 0;
  const slides = useDynamic
    ? items.map((row, index) => ({
        key: row.slug || row._id || index,
        href: `/properties?type=${encodeURIComponent(row.slug || row._id || "")}`,
        name: row.name,
        countLabel: formatCount(row.count),
        iconClass: categoryIconClass({
          icon: row.icon,
          name: row.name,
          slug: row.slug,
        }),
        isActive: index === 0,
      }))
    : categories.map((category, index) => ({
        key: index,
        href: "#",
        name: category.name,
        countLabel: "234 Property",
        iconClass: category.icon,
        isActive: category.isActive,
      }));

  return (
    <section className={parentClass}>
      <div className="tf-container">
        <div className="heading-section text-center mb-48">
          <h2 className="title split-text effect-right">
            <SplitTextAnimation text="Try Searching For" />
          </h2>
          <p className="text-1 split-text split-lines-transform">
            Thousands of luxury home enthusiasts just like you have found their
            dream home
          </p>
        </div>
        <div className="wrap-categories-sw">
          <Swiper
            dir="ltr"
            className="swiper sw-layout style-pagination"
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 2 },
              575: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              992: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
            modules={[Pagination]}
            pagination={{
              el: ".spd2",
            }}
          >
            {slides.map((slide) => {
              const inner = (
                <>
                  <div className="icon-box">
                    <i className={`icon ${slide.iconClass}`}></i>
                  </div>
                  <div className="content text-center">
                    <h5>{slide.name}</h5>
                    <p className="mt-4 text-1">{slide.countLabel}</p>
                  </div>
                </>
              );
              return (
                <SwiperSlide className="swiper-slide" key={slide.key}>
                  {slide.href === "#" ? (
                    <a
                      href="#"
                      className={`categories-item ${
                        slide.isActive ? "active" : ""
                      }`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={slide.href}
                      className={`categories-item ${
                        slide.isActive ? "active" : ""
                      }`}
                    >
                      {inner}
                    </Link>
                  )}
                </SwiperSlide>
              );
            })}

            <div className="sw-pagination sw-pagination-layout text-center d-lg-none d-block mt-20 spd2" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
