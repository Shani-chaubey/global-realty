import React from "react";

export default function Features({ amenities = [], features = [] }) {
  if (!amenities.length && !features.length) return null;

  // Chunk amenities into groups of ~5 for the 3-column layout
  const chunkSize = Math.ceil(amenities.length / 3) || 5;
  const col1 = amenities.slice(0, chunkSize);
  const col2 = amenities.slice(chunkSize, chunkSize * 2);
  const col3 = amenities.slice(chunkSize * 2);

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">
        Amenities And Features
      </div>
      <div className="wrap-feature">
        {col1.length > 0 && (
          <div className="box-feature">
            <ul>
              {col1.map((a) => (
                <li className="feature-item" key={a._id || a.name}>
                  {a.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {col2.length > 0 && (
          <div className="box-feature">
            <ul>
              {col2.map((a) => (
                <li className="feature-item" key={a._id || a.name}>
                  {a.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {col3.length > 0 && (
          <div className="box-feature">
            <ul>
              {col3.map((a) => (
                <li className="feature-item" key={a._id || a.name}>
                  {a.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Extra custom features (key-value pairs) */}
        {/* {features.length > 0 && (
          <div className="box-feature">
            <ul>
              {features.map((f, i) => (
                <li className="feature-item" key={i}>
                  {f.label}: {f.value}
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </>
  );
}
