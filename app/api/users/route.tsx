/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  try {
    if (!user?.id || !user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "User not authenticated or missing email" },
        { status: 401 },
      );
    }

    const userEmail = user.primaryEmailAddress.emailAddress;
    const clerkUserId = user.id;

    // First check if user exists by email (for backward compatibility)
    const emailUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (emailUsers.length > 0) {
      const existingUser = emailUsers[0];

      // If user exists but doesn't have clerkUserId, update it
      if (!existingUser.clerkUserId) {
        await db
          .update(usersTable)
          .set({
            clerkUserId: clerkUserId,
            subscription: "free", // Reset to free for existing users
          })
          .where(eq(usersTable.email, userEmail));

        return NextResponse.json({
          ...existingUser,
          clerkUserId: clerkUserId,
          subscription: "free",
        });
      }

      // If user has different clerkUserId (email change scenario)
      if (existingUser.clerkUserId !== clerkUserId) {
        await db
          .update(usersTable)
          .set({
            clerkUserId: clerkUserId,
            subscription: "free", // Reset to free when email changes
          })
          .where(eq(usersTable.email, userEmail));

        return NextResponse.json({
          ...existingUser,
          clerkUserId: clerkUserId,
          subscription: "free",
        });
      }

      return NextResponse.json(existingUser);
    }

    // Check if user exists by clerkUserId
    const clerkUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkUserId, clerkUserId));

    if (clerkUsers.length > 0) {
      // Update email if it changed
      const existingUser = clerkUsers[0];
      if (existingUser.email !== userEmail) {
        await db
          .update(usersTable)
          .set({
            email: userEmail,
            name: user?.fullName || existingUser.name,
            subscription: "free", // Reset to free when email changes
          })
          .where(eq(usersTable.clerkUserId, clerkUserId));

        return NextResponse.json({
          ...existingUser,
          email: userEmail,
          name: user?.fullName || existingUser.name,
          subscription: "free",
        });
      }

      return NextResponse.json(existingUser);
    }

    // Create new user
    const result = await db
      .insert(usersTable)
      .values({
        name: user?.fullName || "User",
        email: userEmail,
        credits: 10,
        clerkUserId: clerkUserId,
        subscription: "free",
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error in users API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const user = await currentUser();

  try {
    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const userEmail = user.primaryEmailAddress.emailAddress;

    // Get user by email
    const userRecord = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail))
      .limit(1);

    if (userRecord.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userRecord[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
