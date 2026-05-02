import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Benefits({ career = {} }) {
  const title = career.benefitsTitle || "Benefits when you work at Proty";
  const p1 = career.benefitsPara1 || "";
  const p2 = career.benefitsPara2 || "";
  const img1 = career.benefitsImage1 || "/images/section/section-benefits-1.jpg";
  const img2 = career.benefitsImage2 || "/images/section/section-benefits-2.jpg";
  const items = Array.isArray(career.benefitItems) && career.benefitItems.length
    ? career.benefitItems
    : [
        { iconClass: "icon-heart-1", label: "Health care" },
        { iconClass: "icon-pig", label: "Attractive salary and bonus" },
        { iconClass: "icon-family", label: "Family life" },
      ];
  const cta = career.benefitsCtaLabel || "Join our team";
  const ctaHref = career.benefitsCtaHref || "#";

  return (
    <section className="section-benefits">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="box-benefits">
              <div className="wrap-image relative">
                <div
                  className="image img-1 wow animate__zoomIn animate__animated"
                  data-wow-duration="2s"
                  data-wow-delay="0s"
                >
                  <Image
                    className="lazyload parallax-img"
                    data-src={img1}
                    alt=""
                    width={400}
                    height={509}
                    src={img1}
                  />
                </div>
                <div
                  className="image img-2 wow animate__zoomIn animate__animated"
                  data-wow-duration="2s"
                  data-wow-delay="0s"
                >
                  <Image
                    className="lazyload parallax-img"
                    data-src={img2}
                    alt=""
                    width={400}
                    height={509}
                    src={img2}
                  />
                </div>
              </div>
              <div className="content">
                <h2
                  className="title wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  {title.split(/\n|<br\s*\/?>/gi).map((part, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <br />}
                      {part.trim()}
                    </React.Fragment>
                  ))}
                </h2>
                <div
                  className="description wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  {p1 ? <p className="text-1 mb-16">{p1}</p> : null}
                  {p2 ? <p className="text-1">{p2}</p> : null}
                </div>
                <div className="wrap-icon">
                  {items.map((b, idx) => (
                    <div
                      key={idx}
                      className="box-icon wow animate__zoomIn animate__animated"
                      data-wow-duration="1s"
                      data-wow-delay="0s"
                    >
                      <div className="icons">
                        <i className={b.iconClass || "icon-heart-1"} />
                      </div>
                      <div className="title text-1 text-center fw-6">
                        {b.label}
                      </div>
                    </div>
                  ))}
                </div>
                {ctaHref && ctaHref !== "#" ? (
                  <Link
                    href={ctaHref}
                    className="tf-btn bg-color-primary fw-7 pd-17 wow animate__fadeInUp animate__animated"
                    data-wow-duration="1s"
                    data-wow-delay="0s"
                  >
                    {cta}
                  </Link>
                ) : (
                  <a
                    href={ctaHref}
                    className="tf-btn bg-color-primary fw-7 pd-17 wow animate__fadeInUp animate__animated"
                    data-wow-duration="1s"
                    data-wow-delay="0s"
                  >
                    {cta}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
