import AdminLayoutClient from "@/components/dashboard/AdminLayoutClient";
import { requireAdminSession } from "@/lib/auth";

export const metadata = {
  title: "Admin Panel | Proty Real Estate",
};

export default async function AdminLayout({ children }) {
  const admin = await requireAdminSession();

  return <AdminLayoutClient role={admin.role}>{children}</AdminLayoutClient>;
}
