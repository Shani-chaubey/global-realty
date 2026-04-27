"use client";
import React from "react";

export default function Profile({ profile }) {
  return (
    <div className="main-content style-2">
      <div className="main-content-inner wrap-dashboard-content-2">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>
        <div className="widget-box-2">
          <h5 className="title">Information</h5>
          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset className="box box-fieldset">
              <label htmlFor="name">Full name:</label>
              <input type="text" id="name" defaultValue={profile.fullName} className="form-control" />
            </fieldset>
            <fieldset className="box box-fieldset">
              <label>Description:</label>
              <textarea defaultValue={profile.description} />
            </fieldset>
            <fieldset className="box grid-layout-4 gap-30">
              <div className="box-fieldset">
                <label htmlFor="company">Your Company:</label>
                <input type="text" id="company" defaultValue={profile.company} className="form-control" />
              </div>
              <div className="box-fieldset">
                <label htmlFor="position">Position:</label>
                <input type="text" id="position" defaultValue={profile.position} className="form-control" />
              </div>
              <div className="box-fieldset">
                <label htmlFor="num">Office Number:</label>
                <input type="text" id="num" defaultValue={profile.officeNumber} className="form-control" />
              </div>
              <div className="box-fieldset">
                <label htmlFor="address">Office Address:</label>
                <input type="text" id="address" defaultValue={profile.officeAddress} className="form-control" />
              </div>
            </fieldset>
            <div className="box grid-layout-4 gap-30 box-info-2">
              <div className="box-fieldset">
                <label htmlFor="job">Job:</label>
                <input type="text" id="job" defaultValue={profile.job} className="form-control" />
              </div>
              <div className="box-fieldset">
                <label htmlFor="email">Email address:</label>
                <input type="text" id="email" defaultValue={profile.email} className="form-control" />
              </div>
              <div className="box-fieldset">
                <label htmlFor="phone">Your Phone:</label>
                <input type="text" id="phone" defaultValue={profile.phone} className="form-control" />
              </div>
            </div>
            <div className="box box-fieldset">
              <label htmlFor="location">Location:</label>
              <input type="text" id="location" defaultValue={profile.location} className="form-control" />
            </div>
          </form>
        </div>
      </div>
      <div className="overlay-dashboard" />
    </div>
  );
}
