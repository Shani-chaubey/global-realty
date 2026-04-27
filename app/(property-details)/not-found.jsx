import Link from "next/link";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Breadcumb from "@/components/common/Breadcumb";

export default function PropertyNotFound() {
  return (
    <div id="wrapper">
      <Header1 />
      <Breadcumb pageName="Property Not Found" />
      <div className="main-content">
        <div className="tf-container tf-spacing-1">
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🏚️</div>
            <h1 className="text-3xl font-bold text-color-heading mb-4">Property Not Found</h1>
            <p className="text-color-default text-lg mb-2">
              We couldn't find the property you're looking for.
            </p>
            <p className="text-color-default mb-8">
              The property may have been removed, sold, or the link might be incorrect.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/properties"
                className="tf-btn bg-color-primary rounded-4 pd-3 fw-6"
              >
                Browse All Properties
              </Link>
              <Link
                href="/"
                className="tf-btn bg-color-white rounded-4 pd-3 fw-6 border"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
