import SaveSearch from "@/components/dashboard/SaveSearch";
import React from "react";
import { getDashboardData } from "@/lib/dashboard-data";

export const metadata = {
  title: "My Save Search || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};

export default async function Page() {
  const dashboardData = await getDashboardData();
  return <SaveSearch saveSearches={dashboardData.saveSearches} />;
}
