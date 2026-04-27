import React from "react";

export default function Location({ property }) {
  if (!property) return null;

  const { mapEmbedUrl, latitude, longitude, address, city, state } = property;
  const fullAddress = [address, city, state].filter(Boolean).join(", ");

  const embedUrl =
    mapEmbedUrl ||
    (latitude && longitude
      ? `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
      : null);

  if (!embedUrl) return null;

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">Location</div>
      {fullAddress && (
        <p className="text-color-default mb-20" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <i className="icon-location" />
          {fullAddress}
        </p>
      )}
      <div className="map-wrap">
        <iframe
          src={embedUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Property Location"
        />
      </div>
    </>
  );
}
