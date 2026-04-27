import Review from "@/components/dashboard/Review";
import React from "react";
import { getDashboardData } from "@/lib/dashboard-data";

export const metadata = {
  title: "Review || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};

export default async function Page() {
  const dashboardData = await getDashboardData();
  return <Review reviews={dashboardData.reviews} />;
}
