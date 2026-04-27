import React from "react";

const CATEGORY_ORDER = ["indoor", "outdoor", "security", "utilities", "recreation", "other"];

export default function Features({ amenities = [], features = [] }) {
  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = amenities.filter((a) => a.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  if (!amenities.length && !features.length) return null;

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">Amenities & Features</div>

      {amenities.length > 0 && (
        <div className="wrap-feature">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="box-feature">
              <p className="text-4 fw-6 text-color-heading mb-10 capitalize">{category}</p>
              <ul>
                {items.map((amenity) => (
                  <li key={amenity._id} className="feature-item">
                    {amenity.icon && <span className="mr-1">{amenity.icon}</span>}
                    {amenity.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Items not yet grouped */}
          {amenities.filter((a) => !CATEGORY_ORDER.includes(a.category)).length > 0 && (
            <div className="box-feature">
              <ul>
                {amenities.filter((a) => !CATEGORY_ORDER.includes(a.category)).map((amenity) => (
                  <li key={amenity._id} className="feature-item">
                    {amenity.icon && <span className="mr-1">{amenity.icon}</span>}
                    {amenity.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {features.length > 0 && (
        <div style={{ marginTop: "1.25rem" }}>
          <p className="text-4 fw-6 text-color-heading mb-10">Property Details</p>
          <table style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
            <tbody>
              {features.map((f, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#f9fafb" : "transparent" }}>
                  <td style={{ padding: "0.5rem 0.75rem", fontWeight: 500 }} className="text-color-heading">{f.label}</td>
                  <td style={{ padding: "0.5rem 0.75rem" }} className="text-color-default">{f.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
