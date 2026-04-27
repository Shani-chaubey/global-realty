import AdminLayoutClient from "@/components/dashboard/AdminLayoutClient";
import { requireAdminSession } from "@/lib/auth";

export const metadata = {
  title: "Dashboard || Proty Real Estate",
  description: "Proty Real Estate Admin Dashboard",
};

export default async function Page({ children }) {
  const admin = await requireAdminSession();

  return <AdminLayoutClient role={admin.role}>{children}</AdminLayoutClient>;
}
