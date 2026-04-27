import Favorites from "@/components/dashboard/Favorites";
import React from "react";
import { getDashboardData } from "@/lib/dashboard-data";

export const metadata = {
  title: "My Favorites || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};

export default async function Page() {
  const dashboardData = await getDashboardData();
  return <Favorites properties={dashboardData.favorites} />;
}
