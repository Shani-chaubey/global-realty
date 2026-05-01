"use client";
import React from "react";
import Image from "next/image";
import useSWR from "swr";
import api from "@/lib/axios";

const fetcher = (url) => api.get(url).then((r) => r.data);

const FALLBACK = [
  { _id: "1", cityName: "Mumbai", image: "/images/section/location-9.jpg", propertyCount: 120 },
  { _id: "2", cityName: "Delhi", image: "/images/section/location-16.jpg", propertyCount: 95 },
  { _id: "3", cityName: "Bangalore", image: "/images/section/location-17.jpg", propertyCount: 80 },
  { _id: "4", cityName: "Hyderabad", image: "/images/section/location-18.jpg", propertyCount: 65 },
  { _id: "5", cityName: "Chennai", image: "/images/section/location-19.jpg", propertyCount: 52 },
  { _id: "6", cityName: "Pune", image: "/images/section/location-9.jpg", propertyCount: 44 },
];

export default function Cities() {
  const { data } = useSWR("/cms/featured-cities", fetcher);
  const cities = data?.data?.length ? data.data : FALLBACK;

  return (
    <section className="section-neighborhoods">
      <div className="tf-container full">
        <div className="col-12">
          <div className="heading-section text-center mb-48">
            <h2 className="title split-text effect-right">Explore The Neighborhoods</h2>
            <p className="text-1 split-text split-lines-transform">
              Find your dream property in these thriving cities
            </p>
          </div>
          <div className="wrap-neighborhoods">
            {cities.map((city, index) => (
              <div
                key={city._id || index}
                className={`box-location hover-img item-${(index % 6) + 1}`}
              >
                <div className="image-wrap">
                  <a href={`/properties?city=${encodeURIComponent(city.cityName)}`}>
                    {city.image ? (
                      <Image
                        className="lazyload"
                        alt={city.cityName}
                        src={city.image}
                        width={400}
                        height={300}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        unoptimized
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: "2rem" }}>
                        🏙
                      </div>
                    )}
                  </a>
                </div>
                <div className="content">
                  <h6 className="text_white">{city.cityName}</h6>
                  <a
                    href={`/properties?city=${encodeURIComponent(city.cityName)}`}
                    className="text-1 tf-btn style-border pd-23 text_white"
                  >
                    {city.propertyCount} Properties <i className="icon-arrow-right" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
