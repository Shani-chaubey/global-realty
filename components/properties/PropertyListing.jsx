"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/axios";
import { SkeletonCard } from "@/components/ui/Skeleton";
import StatusBadge from "@/components/ui/StatusBadge";

const fetcher = (url) => api.get(url).then((r) => r.data);

function PropertyCard({ property, viewMode }) {
  const primaryImage = property.images?.find((i) => i.isPrimary) || property.images?.[0];
  const formatPrice = (p) => {
    if (p.priceType === "on-request") return "Price on Request";
    return `₹${Number(p.price || 0).toLocaleString("en-IN")}`;
  };

  if (viewMode === "list") {
    return (
      <div className="homeya-box style-list">
        <div className="archive-top" style={{ display: "flex" }}>
          <Link href={`/property-detail-v1/${property.slug || property._id}`} style={{ flexShrink: 0 }}>
            <Image
              src={primaryImage?.url || "/images/section/box-house.jpg"}
              alt={property.title}
              width={280}
              height={200}
              style={{ height: 200, width: 280, objectFit: "cover", borderRadius: "0.75rem 0 0 0.75rem" }}
            />
          </Link>
          <div className="archive-bottom" style={{ flex: 1, padding: "1rem" }}>
            <div className="lst-prop-header">
              <div>
                <div className="lst-prop-badges">
                  <StatusBadge status={property.status} />
                  <span className="lst-listing-type-badge">{property.listingType}</span>
                </div>
                <Link href={`/property-detail-v1/${property.slug || property._id}`} className="text-lg fw-6 text-color-heading hover:text-primary" style={{ overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 1 }}>
                  {property.title}
                </Link>
                <p className="text-sm text-color-default" style={{ marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <i className="icon-location" />
                  {[property.address, property.city].filter(Boolean).join(", ")}
                </p>
              </div>
              <div className="lst-prop-price-box">
                <p className="lst-prop-price">{formatPrice(property)}</p>
                {property.listingType === "rent" && <p className="lst-prop-price-sub">/month</p>}
              </div>
            </div>
            <ul className="meta-list" style={{ display: "flex", gap: "1rem", marginTop: "0.75rem" }}>
              {property.bedrooms > 0 && <li className="text-sm" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><span style={{ fontWeight: 500 }}>{property.bedrooms}</span> Bed</li>}
              {property.bathrooms > 0 && <li className="text-sm" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><span style={{ fontWeight: 500 }}>{property.bathrooms}</span> Bath</li>}
              {property.builtUpArea > 0 && <li className="text-sm" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><span style={{ fontWeight: 500 }}>{Number(property.builtUpArea).toLocaleString()}</span> {property.areaUnit}</li>}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="homeya-box">
      <div className="archive-top">
        <Link href={`/property-detail-v1/${property.slug || property._id}`}>
          <div className="images-group">
            <div className="images-style" style={{ height: 220, overflow: "hidden" }}>
              <Image
                src={primaryImage?.url || "/images/section/box-house.jpg"}
                alt={property.title}
                width={400}
                height={220}
                style={{ width: "100%", height: 220, objectFit: "cover" }}
              />
            </div>
          </div>
        </Link>
        <div className="top">
          <ul className="tag-list">
            <li><a className={`flag-tag ${property.status === "available" ? "success" : "warning"}`}>{property.status}</a></li>
            {property.isFeatured && <li><a className="flag-tag warning">Featured</a></li>}
          </ul>
        </div>
        {property.isPremium && (
          <div className="bottom">
            <span style={{ padding: "0.25rem 0.5rem", background: "#8b5cf6", color: "#fff", fontSize: "0.75rem", borderRadius: "0.25rem" }}>Premium</span>
          </div>
        )}
      </div>
      <div className="archive-bottom">
        <div className="content-box">
          <div className="title">
            <Link href={`/property-detail-v1/${property.slug || property._id}`} className="link" style={{ overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>
              {property.title}
            </Link>
          </div>
          <div className="text-date">
            <i className="icon-location" />
            {[property.city, property.state].filter(Boolean).join(", ")}
          </div>
          <ul className="meta-list">
            {property.bedrooms > 0 && <li className="item"><span>{property.bedrooms}</span>Bed</li>}
            {property.bathrooms > 0 && <li className="item"><span>{property.bathrooms}</span>Bath</li>}
            {property.builtUpArea > 0 && <li className="item"><span>{Number(property.builtUpArea).toLocaleString()}</span>{property.areaUnit}</li>}
          </ul>
        </div>
        <div className="price-box">
          <div className="price">{formatPrice(property)}</div>
          {property.listingType === "rent" && <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>/mo</span>}
        </div>
      </div>
    </div>
  );
}

export default function PropertyListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    city: searchParams.get("city") || "",
    listingType: searchParams.get("listingType") || "",
    propertyType: searchParams.get("propertyType") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    sort: searchParams.get("sort") || "newest",
    page: parseInt(searchParams.get("page") || "1"),
  });

  const { data: typesData } = useSWR("/property-types", fetcher);
  const queryString = new URLSearchParams(Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== "" && v !== null))).toString();
  const { data, isLoading } = useSWR(`/properties?${queryString}`, fetcher);

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  const clearFilters = () => setFilters({ keyword: "", city: "", listingType: "", propertyType: "", minPrice: "", maxPrice: "", bedrooms: "", sort: "newest", page: 1 });

  useEffect(() => {
    const params = new URLSearchParams(Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== "")));
    router.replace(`/properties?${params}`, { scroll: false });
  }, [filters]);

  const properties = data?.data || [];
  const pagination = data?.pagination;

  return (
    <section className="flat-section pt-0">
      <div className="tf-container">
        <div className="lst-filter-card">
          <div className="lst-filter-row">
            <input type="text" placeholder="Search by keyword, city..." className="lst-input" value={filters.keyword} onChange={(e) => updateFilter("keyword", e.target.value)} />
            <input type="text" placeholder="City" className="lst-input lst-input--md" value={filters.city} onChange={(e) => updateFilter("city", e.target.value)} />
            <select className="lst-input lst-input--select" value={filters.listingType} onChange={(e) => updateFilter("listingType", e.target.value)}>
              <option value="">Buy/Rent</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
            <select className="lst-input lst-input--select" value={filters.propertyType} onChange={(e) => updateFilter("propertyType", e.target.value)}>
              <option value="">Property Type</option>
              {typesData?.data?.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
            </select>
          </div>
          <div className="lst-filter-row">
            <input type="number" placeholder="Min Price" className="lst-input lst-input--sm" value={filters.minPrice} onChange={(e) => updateFilter("minPrice", e.target.value)} />
            <input type="number" placeholder="Max Price" className="lst-input lst-input--sm" value={filters.maxPrice} onChange={(e) => updateFilter("maxPrice", e.target.value)} />
            <select className="lst-input lst-input--select" value={filters.bedrooms} onChange={(e) => updateFilter("bedrooms", e.target.value)}>
              <option value="">Bedrooms</option>
              {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}+ BHK</option>)}
            </select>
            <button onClick={clearFilters} className="lst-btn-clear">Clear Filters</button>
          </div>
        </div>

        <div className="lst-results-bar">
          <p className="lst-results-count">{isLoading ? "Loading..." : `${pagination?.total || 0} properties found`}</p>
          <div className="lst-controls">
            <select className="lst-sort" value={filters.sort} onChange={(e) => updateFilter("sort", e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="featured">Featured First</option>
            </select>
            <div className="lst-view-toggle">
              <button onClick={() => setViewMode("grid")} className={`lst-view-btn${viewMode === "grid" ? " lst-view-btn--active" : ""}`}>⊞</button>
              <button onClick={() => setViewMode("list")} className={`lst-view-btn${viewMode === "list" ? " lst-view-btn--active" : ""}`}>☰</button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className={viewMode === "grid" ? "row" : ""} style={viewMode === "list" ? { display: "flex", flexDirection: "column", gap: "1rem" } : {}}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={viewMode === "grid" ? "col-xl-4 col-md-6 mb-4" : ""}><SkeletonCard /></div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="lst-empty">
            <div className="lst-empty__icon">🏠</div>
            <h3 className="lst-empty__title">No Properties Found</h3>
            <p className="lst-empty__text">Try adjusting your filters or search terms</p>
            <button onClick={clearFilters} className="lst-empty__btn">Clear All Filters</button>
          </div>
        ) : (
          <>
            <div className={viewMode === "grid" ? "row" : ""} style={viewMode === "list" ? { display: "flex", flexDirection: "column", gap: "1rem" } : {}}>
              {properties.map((property) => (
                <div key={property._id} className={viewMode === "grid" ? "col-xl-4 col-md-6 mb-4" : ""}>
                  <PropertyCard property={property} viewMode={viewMode} />
                </div>
              ))}
            </div>
            {pagination && pagination.pages > 1 && (
              <div className="lst-pagination">
                <button onClick={() => updateFilter("page", filters.page - 1)} disabled={filters.page <= 1} className="lst-page-btn">Previous</button>
                {[...Array(Math.min(pagination.pages, 5))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button key={pageNum} onClick={() => updateFilter("page", pageNum)} className={`lst-page-btn${filters.page === pageNum ? " lst-page-btn--active" : ""}`}>{pageNum}</button>
                  );
                })}
                <button onClick={() => updateFilter("page", filters.page + 1)} disabled={filters.page >= pagination.pages} className="lst-page-btn">Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
