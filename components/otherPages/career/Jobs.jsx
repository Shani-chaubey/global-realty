import Link from "next/link";
import React from "react";

export default function Jobs({ career = {}, jobs = [] }) {
  const title = career.jobsSectionTitle || "Best Job For You At Proty";
  const subtitle =
    career.jobsSectionSubtitle ||
    "We connect you directly to the person that knows the most about a property for sale, the listing agent.";
  const loadMore = career.jobsLoadMoreUrl;

  return (
    <section className="section-career tf-spacing-1">
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
            <div className="tf-grid-layout-2 mb-48">
              {jobs.length === 0 ? (
                <p className="text-1 text-center w-100">
                  No open positions right now. Please check back later.
                </p>
              ) : (
                jobs.map((item) => (
                  <div
                    key={String(item._id)}
                    className={`career-item wow animate__${item.animation || "fadeInLeft"} animate__animated`}
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
                    {item.applyUrl ? (
                      <a
                        href={item.applyUrl}
                        className="tf-btn style-border pd-10"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply now
                      </a>
                    ) : (
                      <span className="tf-btn style-border pd-10">Apply now</span>
                    )}
                  </div>
                ))
              )}
            </div>
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
  );
}
