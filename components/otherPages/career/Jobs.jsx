"use client";

import Link from "next/link";
import React, { useState } from "react";
import JobApplyModal from "./JobApplyModal";

export default function Jobs({ career = {}, jobs = [] }) {
  const title = career.jobsSectionTitle || "Best Job For You At Proty";
  const subtitle =
    career.jobsSectionSubtitle ||
    "We connect you directly to the person that knows the most about a property for sale, the listing agent.";
  const loadMore = career.jobsLoadMoreUrl;

  const [applyJob, setApplyJob] = useState(null);
  const [applyOpen, setApplyOpen] = useState(false);

  const openApply = (item) => {
    setApplyJob(item);
    setApplyOpen(true);
  };

  return (
    <>
      <section id="career-openings" className="section-career tf-spacing-1">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section text-center mb-48">
                <h2
                  className="title wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  {title}
                </h2>
                <p
                  className="text-1 wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  {subtitle.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </p>
              </div>
              {jobs.length === 0 ? (
                <div className="career-empty-state" role="status">
                  <div className="career-empty-state__icon" aria-hidden>
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                      <path d="M12 11v2M12 15h.01" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="career-empty-state__title">No openings right now</h3>
                  <p className="career-empty-state__text">
                    We don’t have active listings on this page at the moment. Send your CV to careers@yourcompany.com or check back soon—we post new roles regularly.
                  </p>
                </div>
              ) : (
                <div className="tf-grid-layout-2 mb-48">
                  {jobs.map((item) => (
                    <div
                      key={String(item._id)}
                      className="career-item wow animate__fadeInUp animate__animated"
                      data-wow-duration="1s"
                      data-wow-delay="0s"
                    >
                      <div className="content">
                        <h5 className="lh-28 name">{item.title}</h5>
                        <ul className="list-info">
                          <li className="text-4">
                            <i className="icon-bag" />
                            {item.department || "—"}
                          </li>
                          <li className="text-4">
                            <i className="icon-location" />
                            {item.location || "—"}
                          </li>
                          <li className="text-4">
                            <i className="icon-money" />
                            <span className="fw-7 text-color-primary">
                              {item.salaryLabel || "—"}
                            </span>
                            {item.salaryLabel ? " / Month" : ""}
                          </li>
                        </ul>
                      </div>
                      <button
                        type="button"
                        className="tf-btn style-border pd-10"
                        onClick={() => openApply(item)}
                      >
                        Apply now
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {loadMore ? (
                <Link
                  href={loadMore}
                  className="tf-btn bg-color-primary fw-7 pd-16 mx-auto"
                >
                  Load more
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <JobApplyModal
        open={applyOpen}
        onClose={() => {
          setApplyOpen(false);
          setApplyJob(null);
        }}
        job={applyJob}
      />
    </>
  );
}
