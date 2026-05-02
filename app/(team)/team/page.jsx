import Agents from "@/components/agents/Agents";
import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Our team || Proty - Real Estate React Nextjs Template",
  description: "Meet our real estate team",
};

export default function TeamPage() {
  return (
    <>
      <div id="wrapper">
        <Header1 />
        <div className="page-content">
          <Breadcumb pageName="Our team" />
          <Agents />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
