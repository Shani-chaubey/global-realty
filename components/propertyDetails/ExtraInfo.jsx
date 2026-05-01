"use client";
import { useState } from "react";

const getLabel = (v) => {
  if (!v) return "";
  if (typeof v === "object") return v.name || "";
  if (typeof v === "string" && /^[a-f\d]{24}$/i.test(v)) return "";
  return v;
};

const fmtPrice = (price, currency = "INR") => {
  const sym = { INR: "₹", USD: "$", AED: "د.إ" }[currency] || "₹";
  return `${sym}${Number(price || 0).toLocaleString("en-IN")}`;
};

export default function ExtraInfo({ property }) {
  const [expanded, setExpanded] = useState(false);
  if (!property) return null;

  const desc = property.description || "";
  const subType = property.propertySubType?.name || getLabel(property.propertySubType) || "-";
  const plainDesc = desc.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const canExpand = plainDesc.length > 260;

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Property Details
      </div>

      {desc && (
        <div className="content">
          <div
            className="description text-1"
            style={
              expanded || !canExpand
                ? { maxHeight: "none", overflow: "visible" }
                : { maxHeight: "4.8em", overflow: "hidden" }
            }
            dangerouslySetInnerHTML={{ __html: desc }}
          />
          {canExpand && (
            <a
              role="button"
              onClick={() => setExpanded((p) => !p)}
              className="tf-btn-link style-hover-rotate"
              style={{ cursor: "pointer" }}
            >
              <span>{expanded ? "Show Less " : "Read More "}</span>
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2348_5612)">
                  <path
                    d="M1.66732 9.99999C1.66732 14.6024 5.39828 18.3333 10.0007 18.3333C14.603 18.3333 18.334 14.6024 18.334 9.99999C18.334 5.39762 14.603 1.66666 10.0007 1.66666C5.39828 1.66666 1.66732 5.39762 1.66732 9.99999Z"
                    stroke="#F1913D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 6.66666L10 13.3333"
                    stroke="#F1913D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66732 10L10.0007 13.3333L13.334 10"
                    stroke="#F1913D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2348_5612">
                    <rect
                      width={20}
                      height={20}
                      fill="white"
                      transform="translate(20) rotate(90)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          )}
        </div>
      )}

      <div className="box">
        <ul>
          <li className="flex">
            <p className="fw-6">Sub Type</p>
            <p>{subType}</p>
          </li>
          <li className="flex">
            <p className="fw-6">Price</p>
            <p>{fmtPrice(property.price, property.currency)}</p>
          </li>
          <li className="flex">
            <p className="fw-6">Size</p>
            <p>
              {property.builtUpArea
                ? `${Number(property.builtUpArea).toLocaleString()} ${property.areaUnit || "sqft"}`
                : "-"}
            </p>
          </li>
          <li className="flex">
            <p className="fw-6">Rooms</p>
            <p>{property.rooms || property.bedrooms || "-"}</p>
          </li>
          <li className="flex">
            <p className="fw-6">Baths</p>
            <p>{property.bathrooms || "-"}</p>
          </li>
        </ul>
        <ul>
          <li className="flex">
            <p className="fw-6">Beds</p>
            <p>{property.bedrooms || "-"}</p>
          </li>
          <li className="flex">
            <p className="fw-6">Year built</p>
            <p>{property.yearBuilt || "-"}</p>
          </li>
          <li className="flex">
            <p className="fw-6">Type</p>
            <p>{property.propertyType?.name || getLabel(property.propertyType) || "-"}</p>
          </li>
          <li className="flex">
            <p className="fw-6">Status</p>
            <p style={{ textTransform: "capitalize" }}>{property.status || "-"}</p>
          </li>
          <li className="flex">
            <p className="fw-6">Garage</p>
            <p>{property.garages ?? "-"}</p>
          </li>
        </ul>
      </div>
    </>
  );
}
