import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { createSessionToken } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";

const normalizeUsername = (value = "") => value.trim().toLowerCase();

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const normalizedUsername = normalizeUsername(username);

    if (!normalizedUsername || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const admin = await db
      .collection("admins")
      .findOne({ username: normalizedUsername });

    const isPasswordValid = admin
      ? await verifyPassword(password, admin.password)
      : false;

    if (!admin || !isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      createSessionToken(admin.username),
      {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
      }
    );

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to login" },
      { status: 500 }
    );
  }
}
