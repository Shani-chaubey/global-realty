import React from "react";

export default function SaveSearch({ saveSearches = [] }) {
  return (
    <div className="main-content w-100">
      <div className="main-content-inner style-3">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>
        <div className="widget-box-2 wd-listing">
          <h3 className="title">My Saved Searches</h3>
          <div className="tf-new-listing w-100">
            <div className="new-listing wrap-table">
              <div className="table-content">
                <div className="wrap-listing table-responsive">
                  <table className="table-save-search">
                    <thead>
                      <tr>
                        <th className="fw-6">Title</th>
                        <th className="fw-6">Parameters</th>
                        <th className="fw-6">Email</th>
                        <th className="fw-6">Date Published</th>
                      </tr>
                    </thead>
                    <tbody>
                      {saveSearches.map((item) => (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>
                            Status: <span className="fw-6">{item.status}</span> | Province/State:
                            <span className="fw-6"> {item.state}</span>
                          </td>
                          <td>{item.email}</td>
                          <td>{item.publishedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay-dashboard" />
    </div>
  );
}
