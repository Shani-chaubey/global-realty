import Brands from "@/components/common/Brands";
import Cta from "@/components/common/Cta";
import About from "@/components/contact/About";
import Contact from "@/components/contact/Contact";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { getPageSeo } from "@/lib/seo";
import React from "react";

export const revalidate = 60;

export async function generateMetadata() {
  const { metadata } = await getPageSeo("contact", {
    title: "Contact | Global Realty",
    description: "Get in touch with Global Realty for property inquiries and support.",
  });
  return metadata;
}
export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header1 />
        <div className="main-content">
          <Contact />
          <About />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
