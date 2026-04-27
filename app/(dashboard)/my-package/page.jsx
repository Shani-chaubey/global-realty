import Package from "@/components/dashboard/Package";
import React from "react";
import { getDashboardData } from "@/lib/dashboard-data";

export const metadata = {
  title: "My Package || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};

export default async function Page() {
  const dashboardData = await getDashboardData();
  return <Package plan={dashboardData.package} />;
}
