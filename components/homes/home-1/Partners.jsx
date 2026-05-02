"use client";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import BrandSlider from "@/components/common/BrandSlider";
export default function Partners({ partnerLogos = [] }) {
  return (
    <section className="section-work-together ">
      <div className="wg-partner  tf-spacing-1">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section  text-center mb-48">
                <h2 className="title text_white split-text effect-right">
                  <SplitTextAnimation text="Let’s Work Together" />
                </h2>
                <p
                  className="text-1 text_white wow animate__fadeInUp animate__animated"
                  data-wow-duration="1.5s"
                >
                  We focus on sales—helping owners list premium homes and reach
                  serious buyers, from first viewing to closing.
                </p>
              </div>
              <BrandSlider logos={partnerLogos} />
            </div>
          </div>
        </div>
      </div>
      <div className="wg-appraisal ">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="content">
                <div className="heading-section mb-30">
                  <h2 className="title split-text effect-right">
                    <SplitTextAnimation text="Ready to Buy" />
                    <br />
                    <SplitTextAnimation text="Your Dream Home?" />
                  </h2>
                  <p
                    className="text-1 split-text split-lines-transform"
                    data-wow-duration="1.5s"
                  >
                    Get a free home appraisal and
                    find your dream home with confidence.
                  </p>
                </div>
                <a href="/contact" className="tf-btn bg-color-primary fw-7 pd-11">
                  Request your free home appraisal
                </a>
                <div
                  className="person wow animate__fadeInRight animate__animated"
                  data-wow-duration="2s"
                >
                  <Image
                    alt=""
                    src="/images/section/person-1.webp"
                    width={366}
                    height={491}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
