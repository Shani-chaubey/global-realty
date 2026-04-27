import React from "react";
import PropertyOverview from "./PropertyOverview";
import VideoReview from "./VideoReview";
import ExtraInfo from "./ExtraInfo";
import Features from "./Features";
import Location from "./Location";
import FloorPlan from "./FloorPlan";
import Attachments from "./Attachments";
import VirtualTour from "./VirtualTour";
import LoanCalculator from "./LoanCalculator";
import PropertyNearby from "./PropertyNearby";
import Reviews from "./Reviews";
import Sidebar from "./Sidebar";

export default function Details1({ property }) {
  return (
    <section className="section-property-detail">
      <div className="tf-container">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="wg-property box-overview">
              <PropertyOverview property={property} />
            </div>
            {property?.videoUrl && (
              <div className="wg-property video">
                <VideoReview videoUrl={property.videoUrl} />
              </div>
            )}
            <div className="wg-property box-property-detail">
              <ExtraInfo property={property} />
            </div>
            {property?.amenities?.length > 0 && (
              <div className="wg-property box-amenities">
                <Features amenities={property.amenities} features={property.features} />
              </div>
            )}
            {(property?.mapEmbedUrl || (property?.latitude && property?.longitude)) && (
              <div className="wg-property single-property-map">
                <Location property={property} />
              </div>
            )}
            {property?.virtualTourUrl && (
              <div className="wg-property box-virtual-tour">
                <VirtualTour url={property.virtualTourUrl} />
              </div>
            )}
            <div className="wg-property box-loan">
              <LoanCalculator price={property?.price} />
            </div>
            <div className="wg-property mb-0 box-comment">
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
