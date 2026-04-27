import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { hashPassword } from "@/lib/password";

export async function POST(request) {
  try {
    const { username, newPassword } = await request.json();

    if (!username || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Username and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const admin = await db.collection("admins").findOne({ username });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin account not found" },
        { status: 404 }
      );
    }

    const hashedPassword = await hashPassword(newPassword);

    await db.collection("admins").updateOne(
      { username },
      {
        $set: {
          password: hashedPassword,
          passwordUpdatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Password reset successfully. Please sign in with your new password.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to reset password" },
      { status: 500 }
    );
  }
}
