import React from "react";
import Image from "next/image";

export default function FloorPlan({ floorPlans = [] }) {
  if (!Array.isArray(floorPlans) || floorPlans.length === 0) return null;

  return (
    <>
      <div className="wg-title text-11 fw-6 text-color-heading">Floor Plans</div>
      <ul className="box-floor" id="parent-floor">
        {floorPlans.map((fp, i) => {
          const id = `floor-${i + 1}`;
          return (
            <li className="floor-item" key={id}>
              <div
                role="button"
                className={`floor-header ${i === 0 ? "" : "collapsed"}`}
                data-bs-target={`#${id}`}
                data-bs-toggle="collapse"
                aria-expanded={i === 0 ? "true" : "false"}
                aria-controls={id}
              >
                <div className="inner-left">
                  <i className="icon icon-CaretDown" />
                  <span className="text-btn">{fp.name || `Floor ${i + 1}`}</span>
                </div>
                <ul className="inner-right">
                  {Number(fp.bedrooms) > 0 && <li className="flex items-center gap-8"><i className="icon icon-beds-3" />{fp.bedrooms} Bedroom</li>}
                  {Number(fp.bathrooms) > 0 && <li className="flex items-center gap-8"><i className="icon icon-baths" />{fp.bathrooms} Bathroom</li>}
                  {Number(fp.size) > 0 && <li className="flex items-center gap-8"><i className="icon icon-Crop" />{Number(fp.size).toLocaleString()} sqft</li>}
                </ul>
              </div>
              <div id={id} className={`collapse ${i === 0 ? "show" : ""}`} data-bs-parent="#parent-floor">
                <div className="faq-body">
                  <div className="box-img">
                    <Image alt={fp.name || `Floor ${i + 1}`} src={fp.image || "/images/section/floor.jpg"} width={712} height={501} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
