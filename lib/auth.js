import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import crypto from "crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "change-me-admin-secret";
const normalizeUsername = (value = "") => value.trim().toLowerCase();

function signUsername(username) {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(username)
    .digest("hex");
}

export function createSessionToken(username) {
  return `${username}.${signUsername(username)}`;
}

function parseAndValidateToken(token) {
  const rawToken = token || "";
  const separatorIndex = rawToken.lastIndexOf(".");

  if (separatorIndex <= 0 || separatorIndex === rawToken.length - 1) {
    return null;
  }

  const username = rawToken.slice(0, separatorIndex);
  const signature = rawToken.slice(separatorIndex + 1);
  if (!username || !signature) {
    return null;
  }

  const expected = signUsername(username);
  if (signature !== expected) {
    return null;
  }

  return normalizeUsername(username);
}

export async function getAuthenticatedAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const username = parseAndValidateToken(token);
  if (!username) {
    return null;
  }

  const db = await getDb();
  const admin = await db.collection("admins").findOne(
    { username },
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

export async function requireSuperAdminSession() {
  const admin = await requireAdminSession();

  if (admin.role !== "super-admin") {
    redirect("/dashboard");
  }

  return admin;
}
