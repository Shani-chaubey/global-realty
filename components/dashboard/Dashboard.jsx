"use client";
import React from "react";
import LineChart from "./Chart";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard({ dashboardData }) {
  const { stats, favorites, messages, reviews, chart } = dashboardData;

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="flat-counter-v2 tf-counter">
          <div className="counter-box">
            <div className="content-box">
              <div className="title-count text-variant-1">Your listing</div>
              <div className="box-count d-flex align-items-end">
                <div className="number">{stats.listingUsed}</div>
                <span className="text">/{stats.listingLimit} remaining</span>
              </div>
            </div>
          </div>
          <div className="counter-box">
            <div className="content-box">
              <div className="title-count text-variant-1">Pending</div>
              <div className="box-count d-flex align-items-end">
                <div className="number">{stats.pending}</div>
              </div>
            </div>
          </div>
          <div className="counter-box">
            <div className="content-box">
              <div className="title-count text-variant-1">Favorites</div>
              <div className="d-flex align-items-end">
                <div className="number">{stats.favorites}</div>
              </div>
            </div>
          </div>
          <div className="counter-box">
            <div className="content-box">
              <div className="title-count text-variant-1">Reviews</div>
              <div className="d-flex align-items-end">
                <div className="number">{stats.reviews}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-9">
            <div className="widget-box-2 wd-listing mb-24">
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
                      {favorites.map((listing) => (
                        <tr key={listing.id}>
                          <td>
                            <div className="listing-box">
                              <div className="images">
                                <Image alt="images" width={615} height={405} src={listing.imageSrc} />
                              </div>
                              <div className="content">
                                <div className="title">
                                  <Link href={`/property-detail/${listing.id}`} className="link">
                                    {listing.title}
                                  </Link>
                                </div>
                                <div className="text-date">Posting date: {listing.postingDate}</div>
                                <div className="text-btn text-color-primary">${Number(listing.price || 0).toLocaleString()}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>{listing.expiryDate}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="widget-box-2 wd-chart">
              <h5 className="title">Page Inside</h5>
              <div className="chart-box">
                <LineChart labels={chart.labels} values={chart.values} />
              </div>
            </div>
          </div>

          <div className="col-xl-3">
            <div className="widget-box-2 mess-box mb-20">
              <h5 className="title">Messages</h5>
              <ul className="list-mess">
                {messages.map((item) => (
                  <li key={item.id} className="mess-item">
                    <div className="user-box">
                      <div className="avatar">
                        <Image alt="avt" width={51} height={51} src={item.avatar} />
                      </div>
                      <div className="content">
                        <div className="name fw-6">{item.name}</div>
                        <span className="caption-2 text-variant-3">{item.timeAgo}</span>
                      </div>
                    </div>
                    <p>{item.message}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="widget-box-2 mess-box">
              <h5 className="title">Recent Reviews</h5>
              <ul className="list-mess">
                {reviews.map((item) => (
                  <li key={item.id} className="mess-item">
                    <div className="user-box">
                      <div className="avatar">
                        <Image alt="avt" width={51} height={51} src={item.avatar} />
                      </div>
                      <div className="content">
                        <div className="name fw-6">{item.name}</div>
                        <span className="caption-2 text-variant-3">{item.timeAgo}</span>
                      </div>
                    </div>
                    <p>{item.message}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay-dashboard" />
    </div>
  );
}
