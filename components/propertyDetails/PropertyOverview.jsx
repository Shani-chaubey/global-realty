import React from "react";

export default function PropertyOverview({ property }) {
  if (!property) return null;

  const formatPrice = (price, priceType) => {
    if (priceType === "on-request") return "Price on Request";
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  const primaryImage = property.images?.find((i) => i.isPrimary) || property.images?.[0];

  return (
    <>
      <div className="heading" style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="title text-5 fw-6 text-color-heading">{property.title}</div>
        <div className="price text-5 fw-6 text-color-heading">
          {formatPrice(property.price, property.priceType)}{" "}
          {property.listingType === "rent" && (
            <span className="h5 lh-30 fw-4 text-color-default">/month</span>
          )}
        </div>
      </div>
      <div className="info" style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="feature">
          <p className="location text-1" style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <i className="icon-location" />
            {[property.address, property.city, property.state].filter(Boolean).join(", ")}
          </p>
          <ul className="meta-list" style={{ display: "flex" }}>
            {property.bedrooms > 0 && (
              <li className="text-1" style={{ display: "flex" }}><span>{property.bedrooms}</span>Bed</li>
            )}
            {property.bathrooms > 0 && (
              <li className="text-1" style={{ display: "flex" }}><span>{property.bathrooms}</span>Bath</li>
            )}
            {property.builtUpArea > 0 && (
              <li className="text-1" style={{ display: "flex" }}>
                <span>{Number(property.builtUpArea).toLocaleString()}</span>
                {property.areaUnit || "sqft"}
              </li>
            )}
          </ul>
        </div>
        <div className="action">
          <ul className="list-action">
            <li>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(property.title + " - " + typeof window !== "undefined" ? window.location.href : "")}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.625 15.75L2.25 12.375M2.25 12.375L5.625 9M2.25 12.375H12.375M12.375 2.25L15.75 5.625M15.75 5.625L12.375 9M15.75 5.625H5.625" stroke="#5C5E61" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="info-detail">
        {property.propertyType && (
          <div className="wrap-box">
            <div className="box-icon">
              <div className="icons"><i className="icon-SlidersHorizontal" /></div>
              <div className="content">
                <div className="text-4 text-color-default">Type:</div>
                <div className="text-1 text-color-heading">{property.propertyType?.name || property.propertyType}</div>
              </div>
            </div>
            {property.possessionStatus && (
              <div className="box-icon">
                <div className="icons"><i className="icon-Hammer" /></div>
                <div className="content">
                  <div className="text-4 text-color-default">Possession:</div>
                  <div className="text-1 text-color-heading capitalize">{property.possessionStatus === "ready" ? "Ready to Move" : "Under Construction"}</div>
                </div>
              </div>
            )}
          </div>
        )}
        {(property.bedrooms > 0 || property.bathrooms > 0) && (
          <div className="wrap-box">
            {property.bedrooms > 0 && (
              <div className="box-icon">
                <div className="icons"><i className="icon-Bed-2" /></div>
                <div className="content">
                  <div className="text-4 text-color-default">Bedrooms:</div>
                  <div className="text-1 text-color-heading">{property.bedrooms} Rooms</div>
                </div>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="box-icon">
                <div className="icons"><i className="icon-Bathtub" /></div>
                <div className="content">
                  <div className="text-4 text-color-default">Bathrooms:</div>
                  <div className="text-1 text-color-heading">{property.bathrooms} Rooms</div>
                </div>
              </div>
            )}
          </div>
        )}
        {(property.builtUpArea > 0 || property.carpetArea > 0) && (
          <div className="wrap-box">
            {property.builtUpArea > 0 && (
              <div className="box-icon">
                <div className="icons"><i className="icon-Crop" /></div>
                <div className="content">
                  <div className="text-4 text-color-default">Built-up Area:</div>
                  <div className="text-1 text-color-heading">{Number(property.builtUpArea).toLocaleString()} {property.areaUnit}</div>
                </div>
              </div>
            )}
            {property.carpetArea > 0 && (
              <div className="box-icon">
                <div className="icons"><i className="icon-Ruler" /></div>
                <div className="content">
                  <div className="text-4 text-color-default">Carpet Area:</div>
                  <div className="text-1 text-color-heading">{Number(property.carpetArea).toLocaleString()} {property.areaUnit}</div>
                </div>
              </div>
            )}
          </div>
        )}
        {property.totalFloors > 0 && (
          <div className="wrap-box">
            <div className="box-icon">
              <div className="icons"><i className="icon-HouseLine" /></div>
              <div className="content">
                <div className="text-4 text-color-default">Floor:</div>
                <div className="text-1 text-color-heading">{property.floors || 0} / {property.totalFloors}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {property.description && (
        <div className="description mt-20">
          <h5 className="fw-6 mb-10">Description</h5>
          <div
            className="text-color-default"
            dangerouslySetInnerHTML={{ __html: property.description }}
          />
        </div>
      )}
    </>
  );
}
