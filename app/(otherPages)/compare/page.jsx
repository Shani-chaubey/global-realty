import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import PropertyComparison from "@/components/compare/PropertyComparison";

export const metadata = {
  title: "Compare | Proty Real Estate",
};

export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header1 />
        <Breadcumb pageName="Compare" />
        <div className="main-content">
          <PropertyComparison />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
