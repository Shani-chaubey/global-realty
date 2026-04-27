import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Breadcumb from "@/components/common/Breadcumb";
import { Suspense } from "react";
import BlogListing from "@/components/blogs/BlogListing";

export const metadata = {
  title: "Blog | Proty Real Estate",
  description: "Read our latest real estate tips, news and insights",
};

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <Breadcumb pageName="Blog" />
      <div className="main-content">
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
          <BlogListing />
        </Suspense>
      </div>
      <Footer1 />
    </div>
  );
}
