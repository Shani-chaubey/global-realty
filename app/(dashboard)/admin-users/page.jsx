import React from "react";
import AdminUsers from "@/components/dashboard/AdminUsers";
import { requireSuperAdminSession } from "@/lib/auth";

export const metadata = {
  title: "Admin Users || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};

export default async function Page() {
  await requireSuperAdminSession();
  return <AdminUsers />;
}
