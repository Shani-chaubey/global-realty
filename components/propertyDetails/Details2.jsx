import React from "react";
import Slider1 from "./sliders/Slider1";
import PropertyOverview from "./PropertyOverview";
import VideoReview from "./VideoReview";
import ExtraInfo from "./ExtraInfo";
import Features from "./Features";
import Location from "./Location";
import LoanCalculator from "./LoanCalculator";
import Reviews from "./Reviews";
import Sidebar from "./Sidebar";

export default function Details2({ property }) {
  return (
    <section className="section-property-detail style-2">
      <div className="tf-container">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <Slider1 images={property?.images} title={property?.title} />
            <div className="wg-property box-overview style-2">
              <PropertyOverview property={property} />
            </div>
            {property?.videoUrl && (
              <div className="wg-property video spacing-2">
                <VideoReview videoUrl={property.videoUrl} />
              </div>
            )}
            <div className="wg-property box-property-detail spacing-1">
              <ExtraInfo property={property} />
            </div>
            {property?.amenities?.length > 0 && (
              <div className="wg-property box-amenities spacing-3">
                <Features amenities={property.amenities} features={property.features} />
              </div>
            )}
            {(property?.mapEmbedUrl || (property?.latitude && property?.longitude)) && (
              <div className="wg-property single-property-map spacing-9">
                <Location property={property} />
              </div>
            )}
            <div className="wg-property box-loan spacing-4">
              <LoanCalculator price={property?.price} />
            </div>
            <div className="wg-property mb-0 box-comment spacing-8">
              <Reviews propertyId={property?._id} />
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            <Sidebar property={property} />
          </div>
        </div>
      </div>
    </section>
  );
}
