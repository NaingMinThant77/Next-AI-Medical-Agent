/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

const REPORT_GEN_PROMPT = `
You are an AI Medical Voice Agent that just finished a voice conversation with a user. Depends on doctor AI agent info and conversation between user and AI medical agent, generate a structured report with the following fields:
1. sessionId: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician AI")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of AI suggestions (e.g., rest, see a doctor)
Return the result in this JSON format:
{
 "sessionId": "string",
 "agent": "string",
 "user": "string",
 "timestamp": "ISO Date string",
 "chiefComplaint": "string",
 "summary": "string",
 "symptoms": ["symptom1", "symptom2"],
 "duration": "string",
 "severity": "string",
 "medicationsMentioned": ["med1", "med2"],
 "recommendations": ["rec1", "rec2"],
}
Only include valid fields. Respond with nothing else.
`;

export async function POST(req: NextRequest) {
  const { messages, sessionDetail, sessionId } = await req.json();

  try {
    const UserInput =
      "AI Doctor Agent Info: " +
      JSON.stringify(sessionDetail) +
      ", Conversation: " +
      JSON.stringify(messages);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: REPORT_GEN_PROMPT },
        { role: "user", content: UserInput },
      ],
      temperature: 0.7,
    });

    const rawResp = completion.choices[0].message;
    // @ts-ignore
    const Resp = rawResp.content
      .trim()
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "");

    console.log("Medical report response:", Resp);

    let JSONResp;
    try {
      JSONResp = JSON.parse(Resp);
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError, "Response:", Resp);
      return NextResponse.json(
        { error: "Failed to generate report" },
        { status: 500 },
      );
    }

    // Validate response structure
    if (!JSONResp || typeof JSONResp !== "object") {
      console.warn("Invalid response structure:", JSONResp);
      return NextResponse.json(
        { error: "Invalid report format" },
        { status: 500 },
      );
    }

    // Save to Database
    const result = await db
      .update(SessionChatTable)
      .set({ report: JSONResp, conversation: messages })
      .where(eq(SessionChatTable.sessionId, sessionId))
      .returning();

    console.log("Report saved:", result);

    return NextResponse.json({
      success: true,
      report: JSONResp,
      sessionId: sessionId,
    });
  } catch (error) {
    console.error("Medical report generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate medical report",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
