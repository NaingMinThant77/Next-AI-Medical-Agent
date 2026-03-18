import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: NextRequest) {
  const user = await currentUser();

  try {
    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const userEmail = user.primaryEmailAddress.emailAddress;
    const { subscription } = await req.json();

    if (!subscription || (subscription !== "free" && subscription !== "pro")) {
      return NextResponse.json(
        { error: "Invalid subscription type" },
        { status: 400 }
      );
    }

    // Update user subscription
    const result = await db
      .update(usersTable)
      .set({ subscription })
      .where(eq(usersTable.email, userEmail))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ subscription: result[0].subscription });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
