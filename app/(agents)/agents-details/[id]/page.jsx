import AgentDetails from "@/components/agents/AgentDetails";

import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import connectDB from "@/lib/mongoose";
import TeamAgent from "@/models/TeamAgent";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Agent profile | Global Realty",
  description: "Meet our real estate agent",
};

export default async function page({ params }) {
  const { id } = await params;
  await connectDB();

  let agent = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    agent = await TeamAgent.findOne({ _id: id, isActive: true }).lean();
  }
  if (!agent) {
    agent = await TeamAgent.findOne({ slug: id, isActive: true }).lean();
  }
  if (!agent) {
    notFound();
  }

  const plain = JSON.parse(JSON.stringify(agent));

  return (
    <>
      <div id="wrapper">
        <Header1 />
        <div className="page-content">
          <Breadcumb pageName="Agents Details" />
          <AgentDetails agent={plain} />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
