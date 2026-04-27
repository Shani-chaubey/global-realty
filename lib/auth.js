import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";

export const ADMIN_SESSION_COOKIE = "admin_session";

export async function getAuthenticatedAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const db = await getDb();
  const admin = await db.collection("admins").findOne(
    { username: token },
    {
      projection: {
        _id: 0,
        password: 0,
      },
    }
  );

  return admin;
}

export async function requireAdminSession() {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    redirect("/admin-login");
  }

  return admin;
}
