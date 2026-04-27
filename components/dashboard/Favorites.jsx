import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Favorites({ properties = [] }) {
  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>
        <div className="widget-box-2 wd-listing">
          <h3 className="title">My Favorites</h3>
          <div className="wrap-table">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Listing</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr key={property.id}>
                      <td>
                        <div className="listing-box">
                          <div className="images">
                            <Image alt="images" src={property.imageSrc} width={615} height={405} />
                          </div>
                          <div className="content">
                            <div className="title">
                              <Link href={`/property-detail-v1/${property.id}`} className="link">
                                {property.title}
                              </Link>
                            </div>
                            <div className="text-date">Posting date: {property.postingDate}</div>
                            <div className="text-btn text-color-primary">${Number(property.price || 0).toLocaleString()}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span>{property.expiryDate}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay-dashboard" />
    </div>
  );
}
