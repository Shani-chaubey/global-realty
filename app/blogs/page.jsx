import Blogs2 from "@/components/blogs/Blogs2";
import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";
import { getPageSeo } from "@/lib/seo";

export async function generateMetadata() {
  const { metadata } = await getPageSeo("blog", {
    title: "Blogs | Global Realty",
    description: "Browse our latest real estate blog posts, tips, and market insights.",
  });
  return metadata;
}

export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header1 />
        <div className="main-content">
          <Breadcumb pageName="Blogs" />
          <Blogs2 />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
