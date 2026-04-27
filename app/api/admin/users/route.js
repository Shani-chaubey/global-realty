import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireSuperAdminSession } from "@/lib/auth";
import { hashPassword } from "@/lib/password";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const normalizeUsername = (value = "") => value.trim().toLowerCase();

export async function GET() {
  await requireSuperAdminSession();
  const db = await getDb();

  const admins = await db
    .collection("admins")
    .find({}, { projection: { _id: 0, password: 0 } })
    .sort({ username: 1 })
    .toArray();

  return NextResponse.json({ success: true, admins });
}

export async function POST(request) {
  await requireSuperAdminSession();

  try {
    const { username, password, role } = await request.json();
    const normalizedUsername = normalizeUsername(username);

    if (!normalizedUsername || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(normalizedUsername)) {
      return NextResponse.json(
        { success: false, message: "Username must be a valid email address" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const normalizedRole = role === "super-admin" ? "super-admin" : "admin";

    const db = await getDb();
    const existingAdmin = await db
      .collection("admins")
      .findOne({ username: normalizedUsername });

    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin with this username already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    await db.collection("admins").insertOne({
      username: normalizedUsername,
      password: hashedPassword,
      role: normalizedRole,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      admin: { username: normalizedUsername, role: normalizedRole },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to create admin" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  await requireSuperAdminSession();

  try {
    const { username, password, role } = await request.json();
    const normalizedUsername = normalizeUsername(username);

    if (!normalizedUsername) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(normalizedUsername)) {
      return NextResponse.json(
        { success: false, message: "Username must be a valid email address" },
        { status: 400 }
      );
    }

    const updates = { updatedAt: new Date() };
    let hasMeaningfulUpdate = false;

    if (role) {
      updates.role = role === "super-admin" ? "super-admin" : "admin";
      hasMeaningfulUpdate = true;
    }

    if (password) {
      if (password.length < 8) {
        return NextResponse.json(
          { success: false, message: "Password must be at least 8 characters" },
          { status: 400 }
        );
      }
      updates.password = await hashPassword(password);
      hasMeaningfulUpdate = true;
    }

    if (!hasMeaningfulUpdate) {
      return NextResponse.json(
        {
          success: false,
          message: "Provide at least one change (password or role)",
        },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db
      .collection("admins")
      .updateOne({ username: normalizedUsername }, { $set: updates });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Admin account not found" },
        { status: 404 }
      );
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No changes were applied for this admin account",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to update admin" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const currentAdmin = await requireSuperAdminSession();

  try {
    const { searchParams } = new URL(request.url);
    const username = normalizeUsername(searchParams.get("username"));

    if (!username) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    if (username === currentAdmin.username) {
      return NextResponse.json(
        { success: false, message: "Super-admin cannot delete own account" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db.collection("admins").deleteOne({ username });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Admin account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to delete admin" },
      { status: 500 }
    );
  }
}
