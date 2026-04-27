import AdminDashboard from "@/components/admin/AdminDashboard";
import Dashboard from "@/components/dashboard/Dashboard";
import React from "react";
import { getDashboardData } from "@/lib/dashboard-data";
import { getAuthenticatedAdmin } from "@/lib/auth";

export const metadata = {
  title: "Dashboard || Proty Real Estate",
  description: "Proty Real Estate Admin Dashboard",
};

export default async function Page() {
  const admin = await getAuthenticatedAdmin();
  if (admin?.role === "super-admin" || admin?.role === "admin") {
    return <AdminDashboard />;
  }
  const dashboardData = await getDashboardData();
  return <Dashboard dashboardData={dashboardData} />;
}
