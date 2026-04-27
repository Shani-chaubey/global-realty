import React from "react";
import Link from "next/link";

export default function Package({ plan }) {
  return (
    <div className="main-content w-100">
      <div className="main-content-inner style-3">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>
        <div className="widget-box-2 style-2 package">
          <h3 className="title">My Package</h3>
          <div className="flat-pricing">
            <div className="box box-style">
              <h3 className="sub-title fw-7">{plan.name}</h3>
              <p className="text-sub fw-6">{plan.description}</p>
              <div className="title-price flex">
                <h2>${plan.price}</h2>
                <div className="month fw-7">/ {plan.period}</div>
              </div>
              <ul className="check">
                {plan.features?.map((feature) => (
                  <li key={feature} className="flex-three">{feature}</li>
                ))}
              </ul>
              <div className="button-pricing">
                <Link className="tf-btn bg-color-primary pd-20" href="/pricing">
                  <span>Upgrade</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay-dashboard" />
    </div>
  );
}
