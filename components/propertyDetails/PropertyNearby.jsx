import React from "react";

export default function PropertyNearby({ nearby = [] }) {
  if (!Array.isArray(nearby) || nearby.length === 0) return null;

  // Build flat list. If a group has no places, show the category itself as a row.
  const items = nearby.flatMap((group) => {
    const places = Array.isArray(group.places) ? group.places : [];
    if (places.length === 0 && group.category) {
      return [{ label: group.category, value: group.icon || "—" }];
    }
    return places.map((place) => ({
      label: place.name || group.category || "Nearby",
      value: place.distance || "—",
    }));
  });

  if (!items.length) return null;

  const left  = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 !== 0);

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        What&apos;s Nearby?
      </div>
      <p className="description text-color-default">
        Explore nearby amenities to precisely locate your property and identify
        surrounding conveniences, providing a comprehensive overview of the
        living environment and the property&apos;s convenience.
      </p>
      <div className="row box-nearby">
        <div className="col-md-5">
          <ul className="box-left">
            {left.map((item, i) => (
              <li className="item-nearby" key={i}>
                <span className="fw-7 label text-4">{item.label}:</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-5">
          <ul className="box-right">
            {right.map((item, i) => (
              <li className="item-nearby" key={i}>
                <span className="fw-7 label text-4">{item.label}:</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
