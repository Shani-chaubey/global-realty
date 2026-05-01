"use client";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/axios";

const fetcher = (url) => api.get(url).then((r) => r.data);

function PropertyCard({ property }) {
  const primaryImage = property.images?.find((i) => i.isPrimary) || property.images?.[0];
  const formatPrice = (p) => {
    if (p?.priceType === "on-request") return "On Request";
    return `₹${Number(p?.price || 0).toLocaleString("en-IN")}`;
  };

  return (
    <div className="homeya-box">
      <div className="archive-top">
        <Link href={`/property-detail/${property.slug || property._id}`}>
          <div className="images-group">
            <div className="images-style">
              <Image
                className="lazyload img-style"
                data-src={primaryImage?.url || "/images/section/box-house.jpg"}
                src={primaryImage?.url || "/images/section/box-house.jpg"}
                alt={property.title}
                width={400}
                height={268}
                style={{ objectFit: "cover", height: 200 }}
              />
            </div>
          </div>
        </Link>
        <div className="top">
          <ul className="tag-list">
            <li>
              <a href="#" className="flag-tag success">{property.status}</a>
            </li>
            {property.isFeatured && (
              <li><a href="#" className="flag-tag warning">Featured</a></li>
            )}
          </ul>
        </div>
      </div>
      <div className="archive-bottom">
        <div className="content-box">
          <div className="title">
            <Link href={`/property-detail/${property.slug || property._id}`} className="link">
              {property.title}
            </Link>
          </div>
          <div className="text-date">
            <i className="icon-location" />
            {[property.city, property.state].filter(Boolean).join(", ")}
          </div>
          <ul className="meta-list">
            {property.bedrooms > 0 && (
              <li className="item"><span>{property.bedrooms}</span>Bed</li>
            )}
            {property.bathrooms > 0 && (
              <li className="item"><span>{property.bathrooms}</span>Bath</li>
            )}
            {property.builtUpArea > 0 && (
              <li className="item">
                <span>{Number(property.builtUpArea).toLocaleString()}</span>
                {property.areaUnit}
              </li>
            )}
          </ul>
        </div>
        <div className="price-box">
          <div className="price">{formatPrice(property)}</div>
        </div>
      </div>
    </div>
  );
}

export default function RelatedProperties({ city, currentId }) {
  const params = new URLSearchParams({ limit: 4 });
  if (city) params.set("city", city);

  const { data, isLoading } = useSWR(`/properties?${params}`, fetcher);

  const properties = (data?.data || []).filter(
    (p) => p._id !== currentId
  ).slice(0, 3);

  if (!isLoading && !properties.length) return null;

  return (
    <section className="section-related-properties flat-section">
      <div className="tf-container">
        <div className="box-title">
          <div className="text-subtitle text-primary">Similar Properties</div>
          <h3 className="mt-4 title">Related Properties</h3>
        </div>
        {isLoading ? (
          <div className="row">
            {[1, 2, 3].map((i) => (
              <div key={i} className="col-xl-4 col-md-6">
                <div className="det-related-skeleton" />
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            {properties.map((property) => (
              <div key={property._id} className="col-xl-4 col-md-6">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
