"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/axios";

const COMPARE_KEY = "proty_compare";
export const MAX_COMPARE = 3;
const COMPARE_EVENT = "proty_compare_changed";

const PLACEHOLDER = "/images/section/box-house.jpg";

const readCompareIds = () => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(COMPARE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    const arr = Array.isArray(parsed) ? parsed : [];
    if (arr.length > MAX_COMPARE) {
      const trimmed = arr.slice(0, MAX_COMPARE);
      localStorage.setItem(COMPARE_KEY, JSON.stringify(trimmed));
      return trimmed;
    }
    return arr;
  } catch {
    return [];
  }
};

const writeCompareIds = (ids) => {
  if (typeof window === "undefined") return;
  if (!ids.length) {
    localStorage.removeItem(COMPARE_KEY);
  } else {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(ids));
  }
  window.dispatchEvent(new CustomEvent(COMPARE_EVENT, { detail: ids }));
};

export function useComparison() {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    setIds(readCompareIds());

    const sync = () => setIds(readCompareIds());
    window.addEventListener("storage", sync);
    window.addEventListener(COMPARE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(COMPARE_EVENT, sync);
    };
  }, []);

  const addToCompare = (id) => {
    if (!id) return;
    setIds((prev) => {
      if (prev.includes(id) || prev.length >= MAX_COMPARE) return prev;
      const newIds = [...prev, id];
      writeCompareIds(newIds);
      return newIds;
    });
  };

  const removeFromCompare = (id) => {
    if (!id) return;
    setIds((prev) => {
      const newIds = prev.filter((i) => i !== id);
      writeCompareIds(newIds);
      return newIds;
    });
  };

  const clearAll = () => {
    setIds([]);
    writeCompareIds([]);
  };
  const isInCompare = (id) => ids.includes(id);

  return {
    ids,
    addToCompare,
    removeFromCompare,
    clearAll,
    isInCompare,
    count: ids.length,
  };
}

const isObjectIdLike = (v) => typeof v === "string" && /^[a-f\d]{24}$/i.test(v);

function getCityLabel(city) {
  if (city && typeof city === "object") return city.name || "";
  if (isObjectIdLike(city)) return "";
  return city || "";
}

function getImageSrc(p) {
  const images = p?.images;
  if (!Array.isArray(images) || images.length === 0) {
    return PLACEHOLDER;
  }
  const primary = images.find((i) => i && typeof i === "object" && i.isPrimary);
  const candidate = primary || images[0];
  if (typeof candidate === "string") return candidate || PLACEHOLDER;
  if (candidate?.url) return candidate.url;
  return PLACEHOLDER;
}

function formatPrice(p) {
  if (!p) return "—";
  if (p.priceType === "on-request") return "On Request";
  return `₹${Number(p.price || 0).toLocaleString("en-IN")}`;
}

function renderAreaAmount(p, raw) {
  if (raw == null || raw === "" || Number(raw) <= 0) return "—";
  const num = Number(raw);
  const formatted = num.toLocaleString("en-IN");
  const unit = p?.areaUnit || "sqft";
  if (unit === "sqm") {
    return (
      <>
        {formatted} m<sup className="size">2</sup>
      </>
    );
  }
  if (unit === "yards") {
    return `${formatted} sq. yd`;
  }
  return `${formatted} sq ft`;
}

function formatAreaMarkup(p, areaKey) {
  let val;
  if (areaKey === "built") {
    val =
      p?.superBuiltUpArea ||
      p?.builtUpArea ||
      p?.carpetArea ||
      p?.totalSize ||
      0;
  } else if (areaKey === "land") {
    val = p?.landSize || 0;
  } else {
    val = p?.garageSize || 0;
  }
  return renderAreaAmount(p, val);
}

function typeLine(p) {
  const t = p?.propertyType?.name;
  const st = p?.propertySubType?.name;
  const parts = [t, st].filter(Boolean);
  return parts.length ? parts.join(", ") : "—";
}

function listingStatus(p) {
  const t = p?.listingType;
  if (t === "rent") return <span className="type">For Rent</span>;
  if (t === "sale") return <span className="type">For Sale</span>;
  if (t === "both")
    return (
      <span className="type">
        Sale &amp; Rent
      </span>
    );
  if (t === "lease") return <span className="type">For Lease</span>;
  return "—";
}

function availabilityLabel(p) {
  const s = p?.status;
  if (!s) return "—";
  const map = {
    available: "Available",
    sold: "Sold",
    rented: "Rented",
    upcoming: "Upcoming",
  };
  return map[s] || s;
}

function formatFloor(p) {
  const fn = p?.floorNumber;
  const tf = p?.totalFloors;
  if (fn != null && tf != null) return `${fn} of ${tf}`;
  if (fn != null) return String(fn);
  if (Number(p?.floors) > 0) return String(p.floors);
  return "—";
}

function formatFurnishing(p) {
  const f = p?.furnishingStatus;
  if (!f) return "—";
  const map = {
    furnished: "Furnished",
    "semi-furnished": "Semi-furnished",
    unfurnished: "Unfurnished",
  };
  return map[f] || f;
}

function formatParking(p) {
  const t = p?.parkingType;
  if (!t || t === "none") return "—";
  if (t === "covered") return "Covered";
  if (t === "open") return "Open";
  return t;
}

function formatPossession(p) {
  if (p?.possessionStatus === "ready") return "Ready to move";
  if (p?.possessionStatus === "under-construction") {
    if (p?.possessionDate) {
      try {
        const d = new Date(p.possessionDate);
        return `Under construction · ${d.toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        })}`;
      } catch {
        return "Under construction";
      }
    }
    return "Under construction";
  }
  return "—";
}

function bedroomsOnly(p) {
  const b = Number(p?.bedrooms);
  return b > 0 ? String(b) : "—";
}

function totalRoomsOnly(p) {
  const r = Number(p?.rooms);
  return r > 0 ? String(r) : "—";
}

function garagesCount(p) {
  const g = Number(p?.garages);
  return g > 0 ? String(g) : "—";
}

function pincodeLine(p) {
  const z = (p?.pincode || p?.zipCode || "").toString().trim();
  return z || "—";
}

function amenitiesSummary(p) {
  const a = p?.amenities;
  if (!Array.isArray(a) || !a.length) return "—";
  const names = a
    .map((x) => (x && typeof x === "object" ? x.name : null))
    .filter(Boolean);
  if (names.length) {
    const shown = names.slice(0, 6);
    const more = names.length > 6 ? ` +${names.length - 6}` : "";
    return (
      <span className="line-clamp-3" style={{ display: "block" }}>
        {shown.join(", ")}
        {more}
      </span>
    );
  }
  return `${a.length} listed`;
}

function CompareFieldRow({
  label,
  properties,
  showAddSlot,
  children,
  fieldClass = "",
  lastCellClass = "",
}) {
  return (
    <div className="tf-compare-row">
      <div className="tf-compare-col tf-compare-field d-md-block d-none">
        <h6>{label}</h6>
      </div>
      {properties.map((p) => (
        <div
          key={p._id}
          className={`tf-compare-col tf-compare-field text-center ${fieldClass}`.trim()}
        >
          {children(p)}
        </div>
      ))}
      {showAddSlot ? (
        <div
          className={`tf-compare-col tf-compare-field text-center ${lastCellClass}`.trim()}
        >
          —
        </div>
      ) : null}
    </div>
  );
}

export default function PropertyComparison() {
  const { ids, removeFromCompare, clearAll } = useComparison();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ids.length) {
      setProperties([]);
      return;
    }
    setLoading(true);
    Promise.all(
      ids.map((id) =>
        api.get(`/properties/${id}`).then((r) => r.data?.data)
      )
    )
      .then((props) => setProperties(props.filter(Boolean)))
      .finally(() => setLoading(false));
  }, [ids]);

  const showAddSlot = properties.length > 0 && properties.length < MAX_COMPARE;

  if (!ids.length) {
    return (
      <div className="tf-spacing-7 pt-0">
        <div className="tf-container">
          <div className="lst-empty">
            <div className="lst-empty__icon">🏠</div>
            <h3 className="lst-empty__title">No Properties to Compare</h3>
            <p className="lst-empty__text">
              Add properties to compare using the compare button on property
              cards, then open this page to see them side by side.
            </p>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tf-spacing-7 pt-0">
      <div className="tf-container">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-40">
          <h4 className="fw-7 mb-0">Compare properties</h4>
          <button
            type="button"
            className="tf-btn bg-color-primary"
            onClick={clearAll}
          >
            Clear all
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="det-compare-spinner" />
            <p className="text-1 mt-3 mb-0">Loading properties…</p>
          </div>
        ) : properties.length === 0 ? (
          <p className="text-1 text-center py-5">Could not load properties.</p>
        ) : (
          <div className="tf-compare-table">
            <div className="tf-compare-row tf-compare-grid">
              <div className="tf-compare-col d-md-block d-none" />
              {properties.map((p) => {
                const href = `/property-detail/${p.slug || p._id}`;
                const img = getImageSrc(p);
                const loc = [p.address, getCityLabel(p.city)]
                  .filter(Boolean)
                  .join(", ");
                return (
                  <div key={p._id} className="tf-compare-col">
                    <div className="tf-compare-item">
                      <button
                        type="button"
                        className="det-compare-remove tf-compare-remove-floating"
                        onClick={() => removeFromCompare(p._id)}
                        aria-label="Remove from compare"
                      >
                        ×
                      </button>
                      <Link className="tf-compare-image" href={href}>
                        <Image
                          className="compare-img-fill"
                          src={img}
                          alt=""
                          fill
                          sizes="220px"
                        />
                      </Link>
                      <div className="tf-compare-content">
                        <Link
                          className="link text-title h6 line-clamp-1"
                          href={href}
                        >
                          {p.title}
                        </Link>
                        <div className="property-info">
                          <div className="price text-1 fw-5 text-color-heading">
                            {formatPrice(p)}
                          </div>
                          {loc ? (
                            <p className="d-flex align-items-center gap-8 mb-0">
                              <i className="icon-location text-color-default line-clamp-1" />
                              <span className="line-clamp-2">{loc}</span>
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {showAddSlot ? (
                <div className="tf-compare-col">
                  <div className="tf-compare-item tf-compare-item--add">
                    <Link href="/properties" className="tf-compare-add-link">
                      <span className="tf-compare-add-link__icon">+</span>
                      <span className="text-1 fw-6">Add property</span>
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>

            <CompareFieldRow
              label="Price"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => <span className="fw-6">{formatPrice(p)}</span>}
            </CompareFieldRow>

            <CompareFieldRow
              label="Type"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => <span>{typeLine(p)}</span>}
            </CompareFieldRow>

            <CompareFieldRow
              label="Status"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => listingStatus(p)}
            </CompareFieldRow>

            <CompareFieldRow
              label="Availability"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => <span>{availabilityLabel(p)}</span>}
            </CompareFieldRow>

            <CompareFieldRow
              label="Size"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => formatAreaMarkup(p, "built")}
            </CompareFieldRow>

            <CompareFieldRow
              label="Carpet area"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => renderAreaAmount(p, p?.carpetArea)}
            </CompareFieldRow>

            <CompareFieldRow
              label="Super built-up"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => renderAreaAmount(p, p?.superBuiltUpArea)}
            </CompareFieldRow>

            <CompareFieldRow
              label="Land Area"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => formatAreaMarkup(p, "land")}
            </CompareFieldRow>

            <CompareFieldRow
              label="Floor"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => <span>{formatFloor(p)}</span>}
            </CompareFieldRow>

            <CompareFieldRow
              label="Bedrooms"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => <span>{bedroomsOnly(p)}</span>}
            </CompareFieldRow>

            <CompareFieldRow
              label="Rooms (total)"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => <span>{totalRoomsOnly(p)}</span>}
            </CompareFieldRow>

            <CompareFieldRow
              label="Bathrooms"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => (
                <span className="size">
                  {Number(p?.bathrooms) > 0 ? p.bathrooms : "—"}
                </span>
              )}
            </CompareFieldRow>

            <CompareFieldRow
              label="Balconies"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) =>
                Number(p?.balconies) > 0 ? String(p.balconies) : "—"
              }
            </CompareFieldRow>

            <CompareFieldRow
              label="Furnishing"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => <span>{formatFurnishing(p)}</span>}
            </CompareFieldRow>

            <CompareFieldRow
              label="Facing"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => (p?.facing ? <span>{p.facing}</span> : "—")}
            </CompareFieldRow>

            <CompareFieldRow
              label="Parking"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => <span>{formatParking(p)}</span>}
            </CompareFieldRow>

            <CompareFieldRow
              label="Possession"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => <span>{formatPossession(p)}</span>}
            </CompareFieldRow>

            <CompareFieldRow
              label="Garages"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => <span>{garagesCount(p)}</span>}
            </CompareFieldRow>

            <CompareFieldRow
              label="Garages Size"
              properties={properties}
              showAddSlot={showAddSlot}
              fieldClass="tf-compare-viewcart"
            >
              {(p) => formatAreaMarkup(p, "garage")}
            </CompareFieldRow>

            <CompareFieldRow
              label="Year Built"
              properties={properties}
              showAddSlot={showAddSlot}
              fieldClass="tf-compare-viewcart"
            >
              {(p) =>
                p?.yearBuilt ? (
                  <span>{p.yearBuilt}</span>
                ) : (
                  <span>—</span>
                )
              }
            </CompareFieldRow>

            <CompareFieldRow
              label="Pincode"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => <span>{pincodeLine(p)}</span>}
            </CompareFieldRow>

            <CompareFieldRow
              label="Amenities"
              properties={properties}
              showAddSlot={showAddSlot}
            >
              {(p) => amenitiesSummary(p)}
            </CompareFieldRow>
          </div>
        )}
      </div>
    </div>
  );
}
