"use client";
import React from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import PropertyLoanCalculator from "@/components/propertyDetails/LoanCalculator";
export default function LoanCalculator() {
  return (
    <section id="loan-calculator" className="section-pre-approved tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-6">
            <div className="content">
              <div className="heading-section ">
                <h2 className="title split-text effect-right">
                  <SplitTextAnimation text="Do you need a home loan?" />
                  <br />
                  <SplitTextAnimation text=" Get pre-approved" />
                </h2>
                <p className="text-1 split-text split-lines-transform">
                  Find a lender who can offer competitive mortgage rates and
                  help you with pre-approval.
                </p>
              </div>
              <PropertyLoanCalculator price={1000000} showTitle={false} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="image-wrap img-animation wow animate__animated">
              <Image
                className="lazyload parallax-img max-h-650"
                alt=""
                src="/images/section/section-pre-approved.webp"
                width={620}
                height={650}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
