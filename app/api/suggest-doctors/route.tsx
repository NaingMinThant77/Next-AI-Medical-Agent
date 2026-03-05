/* eslint-disable @typescript-eslint/ban-ts-comment */
import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "stepfun/step-3.5-flash:free",
      messages: [
        { role: "system", content: JSON.stringify(AIDoctorAgents) },
        {
          role: "user",
          content:
            "User Notes/Symptoms: " +
            notes +
            ", depends on user notes and symptoms, please suggest list of doctors, return Object in JSON only",
        },
      ],
    });

    const rawResp = completion.choices[0].message;
    // @ts-ignore
    const Resp = rawResp.content
      .trim()
      .replace("```json", "")
      .replace("```", "");

    let JSONResp;
    try {
      JSONResp = JSON.parse(Resp);
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError, "Response:", Resp);
      return NextResponse.json([]);
    }

    // Ensure we always return an array
    if (!Array.isArray(JSONResp)) {
      console.warn("API response is not an array:", JSONResp);
      return NextResponse.json([]);
    }

    return NextResponse.json(JSONResp);
  } catch (e) {
    console.error("API error:", e);
    return NextResponse.json([]);
  }
}
