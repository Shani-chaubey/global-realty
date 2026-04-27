import Profile from "@/components/dashboard/Profile";
import React from "react";
import { getDashboardData } from "@/lib/dashboard-data";

export const metadata = {
  title: "My Profile || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};

export default async function Page() {
  const dashboardData = await getDashboardData();
  return <Profile profile={dashboardData.profile} />;
}
