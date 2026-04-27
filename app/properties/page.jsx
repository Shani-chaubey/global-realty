import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Breadcumb from "@/components/common/Breadcumb";
import { Suspense } from "react";
import PropertyListing from "@/components/properties/PropertyListing";

export const metadata = {
  title: "Properties | Proty Real Estate",
  description: "Browse all properties for sale and rent",
};

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <Breadcumb pageName="All Properties" />
      <div className="main-content">
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
          <PropertyListing />
        </Suspense>
      </div>
      <Footer1 />
    </div>
  );
}
