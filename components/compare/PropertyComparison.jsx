"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/axios";

const COMPARE_KEY = "proty_compare";
const MAX_COMPARE = 4;

export function useComparison() {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(COMPARE_KEY);
    if (saved) setIds(JSON.parse(saved));
  }, []);

  const addToCompare = (id) => {
    setIds((prev) => {
      if (prev.includes(id) || prev.length >= MAX_COMPARE) return prev;
      const newIds = [...prev, id];
      localStorage.setItem(COMPARE_KEY, JSON.stringify(newIds));
      return newIds;
    });
  };

  const removeFromCompare = (id) => {
    setIds((prev) => {
      const newIds = prev.filter((i) => i !== id);
      localStorage.setItem(COMPARE_KEY, JSON.stringify(newIds));
      return newIds;
    });
  };

  const clearAll = () => { setIds([]); localStorage.removeItem(COMPARE_KEY); };
  const isInCompare = (id) => ids.includes(id);

  return { ids, addToCompare, removeFromCompare, clearAll, isInCompare, count: ids.length };
}

function ComparisonRow({ label, values, highlight = false }) {
  const isDifferent = new Set(values.map((v) => String(v || ""))).size > 1;
  return (
    <tr className="det-compare-row" style={{ background: isDifferent && highlight ? "#fefce8" : "transparent" }}>
      <td className="det-compare-row__label">{label}</td>
      {values.map((val, i) => (
        <td key={i} className="det-compare-row__value">{val || "—"}</td>
      ))}
    </tr>
  );
}

export default function PropertyComparison() {
  const { ids, removeFromCompare, clearAll } = useComparison();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ids.length) { setProperties([]); return; }
    setLoading(true);
    Promise.all(ids.map((id) => api.get(`/properties/${id}`).then((r) => r.data.data)))
      .then((props) => setProperties(props.filter(Boolean)))
      .finally(() => setLoading(false));
  }, [ids]);

  const formatPrice = (p) => {
    if (!p) return "—";
    if (p.priceType === "on-request") return "On Request";
    return `₹${Number(p.price || 0).toLocaleString("en-IN")}`;
  };

  if (!ids.length) {
    return (
      <div className="lst-empty">
        <div className="lst-empty__icon">🏠</div>
        <h3 className="lst-empty__title">No Properties to Compare</h3>
        <p className="lst-empty__text">Add properties to compare by clicking the compare button on property listings</p>
        <Link href="/properties" className="tf-btn bg-color-primary">Browse Properties</Link>
      </div>
    );
  }

  const fields = [
    { label: "Price", values: properties.map((p) => formatPrice(p)) },
    { label: "Listing Type", values: properties.map((p) => p?.listingType?.toUpperCase()) },
    { label: "Property Type", values: properties.map((p) => p?.propertyType?.name) },
    { label: "Status", values: properties.map((p) => p?.status) },
    { label: "Bedrooms", values: properties.map((p) => p?.bedrooms) },
    { label: "Bathrooms", values: properties.map((p) => p?.bathrooms) },
    { label: "Balconies", values: properties.map((p) => p?.balconies || "—") },
    { label: "Built-up Area", values: properties.map((p) => p?.builtUpArea ? `${Number(p.builtUpArea).toLocaleString()} ${p.areaUnit}` : "—") },
    { label: "Carpet Area", values: properties.map((p) => p?.carpetArea ? `${Number(p.carpetArea).toLocaleString()} ${p.areaUnit}` : "—") },
    { label: "Floor", values: properties.map((p) => p?.floors ? `${p.floors}/${p.totalFloors}` : "—") },
    { label: "Possession", values: properties.map((p) => p?.possessionStatus === "ready" ? "Ready to Move" : p?.possessionStatus === "under-construction" ? "Under Construction" : "—") },
    { label: "City", values: properties.map((p) => p?.city) },
    { label: "Featured", values: properties.map((p) => p?.isFeatured ? "Yes ✓" : "No") },
    { label: "Premium", values: properties.map((p) => p?.isPremium ? "Yes ✓" : "No") },
  ];

  return (
    <div>
      <div className="det-compare-header">
        <h2 className="det-compare-title">Comparing {properties.length} Properties</h2>
        <button onClick={clearAll} className="det-compare-clear">Clear All</button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <div className="det-compare-spinner" />
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: "max-content", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th className="det-compare-head det-compare-head--label">Feature</th>
                {properties.map((p) => {
                  const img = p?.images?.find((i) => i.isPrimary) || p?.images?.[0];
                  return (
                    <th key={p._id} className="det-compare-head">
                      <div style={{ position: "relative" }}>
                        <button onClick={() => removeFromCompare(p._id)} className="det-compare-remove">×</button>
                        {img && (
                          <Image src={img.url} alt={p.title} width={160} height={100} style={{ width: "100%", height: "6rem", objectFit: "cover", borderRadius: "0.5rem", marginBottom: "0.5rem" }} />
                        )}
                        <Link href={`/property-detail-v1/${p.slug || p._id}`} className="det-compare-prop-title">{p.title}</Link>
                        <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}>{p.city}</p>
                      </div>
                    </th>
                  );
                })}
                {ids.length < MAX_COMPARE && (
                  <th className="det-compare-head">
                    <Link href="/properties" className="det-compare-add-slot">
                      <div className="det-compare-add-slot__icon">+</div>
                      <span style={{ fontSize: "0.875rem" }}>Add Property</span>
                    </Link>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {fields.map((field, i) => (
                <ComparisonRow key={i} label={field.label} values={field.values} highlight />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
