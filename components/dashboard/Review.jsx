import React from "react";
import Image from "next/image";

export default function Review({ reviews = [] }) {
  return (
    <div className="main-content w-100">
      <div className="main-content-inner style-3">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>
        <div className="widget-box-2 mess-box">
          <h3 className="title">Recent Reviews</h3>
          <ul className="list-mess">
            {reviews.map((item) => (
              <li key={item.id} className="mess-item">
                <div className="user-box">
                  <div className="avatar">
                    <Image alt="avt" src={item.avatar} width={51} height={51} />
                  </div>
                  <div className="content justify-content-start">
                    <div className="name fw-6">{item.name}</div>
                    <span className="caption-2 text-variant-3">{item.timeAgo}</span>
                  </div>
                </div>
                <p>{item.message}</p>
                <div className="ratings">
                  {Array.from({ length: item.rating || 0 }).map((_, index) => (
                    <i key={index} className="icon-star" />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="overlay-dashboard" />
    </div>
  );
}
