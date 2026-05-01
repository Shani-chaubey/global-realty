"use client";
import SearchForm from "@/components/common/SearchForm";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

export default function Hero({ heroSlides = [] }) {
  const heroHeight = "clamp(560px, 72vh, 760px)";
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("For sale");
  const [keyword, setKeyword] = useState("");
  const items = ["For sale", "For rent"];

  const validSlides = (heroSlides || []).filter((s) => s?.backgroundImage);
  const defaultSlide = {
    title: "Search Luxury Homes",
    subtitle:
      "Thousands of luxury home enthusiasts just like you visit our website.",
    backgroundImage: "/images/slider/slider-1.jpg",
    ctaLink: "/properties",
  };
  const slides = validSlides.length ? validSlides : [defaultSlide];
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const currentSlide = slides[activeSlideIdx] || slides[0] || defaultSlide;
  const heroTitle = currentSlide?.title || defaultSlide.title;
  const heroSubtitle =
    currentSlide?.subtitle ||
    "Thousands of luxury home enthusiasts just like you visit our website.";

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const listingType = activeItem === "For rent" ? "rent" : "sale";
    params.set("listingType", listingType);
    if (keyword.trim()) params.set("q", keyword.trim());
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div
      className="page-title home01"
      style={{ position: "relative", overflow: "hidden", height: heroHeight }}
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={slides.length > 1}
        onSlideChange={(swiper) => setActiveSlideIdx(swiper.realIndex || 0)}
        className="hero-bg-swiper"
        style={{ position: "absolute", inset: 0, zIndex: 0, height: "100%" }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide._id || idx}>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${slide.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 100%)",
          zIndex: 1,
        }}
      />
      <div className="tf-container" style={{ height: "100%" }}>
        <div
          className="row justify-center relative"
          style={{ zIndex: 2, height: "100%", alignItems: "center" }}
        >
          <div className="col-lg-8">
            <div className="content-inner">
              <div className="heading-title">
                <h1 className="title">{heroTitle}</h1>
                <p className="h6 fw-4">{heroSubtitle}</p>
              </div>
              <div className="wg-filter">
                <div className="form-title">
                  <form onSubmit={handleSearch}>
                    <fieldset>
                      <input
                        type="text"
                        placeholder="Place, neighborhood, school or agent..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                    </fieldset>
                  </form>
                  <div className="box-item wrap-btn">
                    <div className="btn-filter show-form searchFormToggler">
                      <div className="icons">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 4H14"
                            stroke="var(--color-primary, #F1913D)"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 4H3"
                            stroke="var(--color-primary, #F1913D)"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 12H12"
                            stroke="var(--color-primary, #F1913D)"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 12H3"
                            stroke="var(--color-primary, #F1913D)"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 20H16"
                            stroke="var(--color-primary, #F1913D)"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 20H3"
                            stroke="var(--color-primary, #F1913D)"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 2V6"
                            stroke="var(--color-primary, #F1913D)"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 10V14"
                            stroke="var(--color-primary, #F1913D)"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 18V22"
                            stroke="var(--color-primary, #F1913D)"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="tf-btn bg-color-primary pd-3"
                    >
                      Search <i className="icon-MagnifyingGlass fw-6" />
                    </button>
                  </div>
                </div>
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
