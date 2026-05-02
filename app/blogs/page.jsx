import Blogs2 from "@/components/blogs/Blogs2";
import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React, { Suspense } from "react";
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
          <Suspense fallback={<p className="text-1 text-center tf-container py-5">Loading…</p>}>
            <Blogs2 />
          </Suspense>
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
