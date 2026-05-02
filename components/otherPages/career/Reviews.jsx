import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Reviews({ career = {} }) {
  const title =
    career.reviewsTitle || "Reviews from employees working at Proty";
  const p1 = career.reviewsPara1 || "";
  const p2 = career.reviewsPara2 || "";
  const personImg =
    career.reviewsPersonImage || "/images/section/person-3.png";
  const spotName = career.reviewsSpotlightName || "";
  const spotRole = career.reviewsSpotlightRole || "";
  const spotAv = career.reviewsSpotlightAvatar || "/images/avatar/avt-png18.png";
  const quote = career.reviewsCardQuote || "";
  const cardName = career.reviewsCardName || "";
  const cardRole = career.reviewsCardRole || "";
  const cardAv = career.reviewsCardAvatar || "/images/avatar/testimonials-4.jpg";
  const moreHref = career.reviewsMoreStoriesHref || "#";

  return (
    <section className="section-review tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="box-review">
              <div className="content-left">
                <h2
                  className="title mb-32 wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  {title}
                </h2>
                <div
                  className="description mb-32 wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  {p1 ? <p className="text-1 mb-15">{p1}</p> : null}
                  {p2 ? <p className="text-1">{p2}</p> : null}
                </div>
                {moreHref && moreHref !== "#" ? (
                  <Link
                    href={moreHref}
                    className="tf-btn bg-color-primary fw-7 pd-18 wow animate__fadeInUp animate__animated"
                    data-wow-duration="1s"
                    data-wow-delay="0s"
                  >
                    More stories
                  </Link>
                ) : (
                  <a
                    href={moreHref}
                    className="tf-btn bg-color-primary fw-7 pd-18 wow animate__fadeInUp animate__animated"
                    data-wow-duration="1s"
                    data-wow-delay="0s"
                  >
                    More stories
                  </a>
                )}
              </div>
              <div className="content-right">
                <div
                  className="person wow animate__zoomIn animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  <Image alt="" width={509} height={578} src={personImg} />
                </div>
                <div
                  className="box-author ani5"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  <div className="avatar">
                    <Image alt="" width={120} height={120} src={spotAv} />
                  </div>
                  <div className="content">
                    <h6 className="name">{spotName}</h6>
                    <p className="text-2 lh-16">{spotRole}</p>
                  </div>
                </div>
                <div
                  className="ratings ani4 ani5"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  <i className="icon-star" />
                  <i className="icon-star" />
                  <i className="icon-star" />
                  <i className="icon-star" />
                  <i className="icon-star" />
                </div>
                <div
                  className="wg-testimonial ani8 style-2 ani5"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  <div className="ratings">
                    <i className="icon-star" />
                    <i className="icon-star" />
                    <i className="icon-star" />
                    <i className="icon-star" />
                    <i className="icon-star" />
                  </div>
                  <p className="text-1 description line-clamp-3">{quote}</p>
                  <div className="author">
                    <div className="avatar">
                      <Image alt="" width={200} height={200} src={cardAv} />
                    </div>
                    <div className="content">
                      <h6 className="name">
                        <span>{cardName}</span>
                      </h6>
                      <p className="text-2">{cardRole}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
