/* eslint-disable @typescript-eslint/ban-ts-comment */
import { db } from "@/config/db";
import { SessionChatTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { desc, eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { notes, selectedDoctor } = await req.json();
  const user = await currentUser();

  try {
    // Check if user is authenticated
    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    // Get user details to check credits and subscription
    const userRecord = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress))
      .limit(1);

    const currentUserData = userRecord[0];
    if (!currentUserData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has enough credits (only for free users)
    const isProUser = currentUserData.subscription === "pro";
    if (!isProUser && (currentUserData.credits ?? 0) <= 0) {
      return NextResponse.json(
        {
          error:
            "Insufficient credits. Buy pro version for unlimited consultations or create a new account for more credits.",
        },
        { status: 402 },
      );
    }

    const sessionId = uuidv4();

    // Insert new session
    const sessionResult = await db
      .insert(SessionChatTable)
      .values({
        sessionId: sessionId,
        notes: notes,
        selectedDoctor: selectedDoctor,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdOn: new Date().toISOString(),
      })
      // @ts-ignore
      .returning({ SessionChatTable });

    // Deduct 1 credit for free users only
    if (
      !isProUser &&
      currentUserData.credits !== null &&
      currentUserData.credits > 0
    ) {
      await db
        .update(usersTable)
        .set({
          credits: currentUserData.credits - 1,
        })
        .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));
    }

    return NextResponse.json(sessionResult[0].SessionChatTable);
  } catch (e) {
    console.error("Error creating session:", e);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const user = await currentUser();

  if (sessionId === "all") {
    // Check if user is authenticated
    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const result = await db
      .select()
      .from(SessionChatTable)
      .where(
        eq(SessionChatTable.createdBy, user.primaryEmailAddress.emailAddress),
      )
      .orderBy(desc(SessionChatTable.id));

    return NextResponse.json(result);
  } else {
    // Check if sessionId is provided
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 },
      );
    }

    const result = await db
      .select()
      .from(SessionChatTable)
      .where(eq(SessionChatTable.sessionId, sessionId));

    return NextResponse.json(result[0]);
  }
}
