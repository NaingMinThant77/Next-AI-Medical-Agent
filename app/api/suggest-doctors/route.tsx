/* eslint-disable @typescript-eslint/ban-ts-comment */
import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a medical AI assistant. Based on the available doctors: ${JSON.stringify(AIDoctorAgents)}, recommend the most suitable doctors for the user's symptoms. Return ONLY a JSON array of doctor objects with their original properties.`,
        },
        {
          role: "user",
          content: `User Notes/Symptoms: "${notes}". Based on these symptoms, suggest appropriate doctors from the available list. Return JSON array only.`,
        },
      ],
      temperature: 0.7,
    });

    const rawResp = completion.choices[0].message;
    // @ts-ignore
    const Resp = rawResp.content
      .trim()
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "");

    let JSONResp;
    try {
      JSONResp = JSON.parse(Resp);
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError, "Response:", Resp);
      // Return default doctors if parsing fails
      return NextResponse.json(AIDoctorAgents.slice(0, 3));
    }

    // Ensure we always return an array
    if (!Array.isArray(JSONResp)) {
      console.warn("API response is not an array:", JSONResp);
      return NextResponse.json(AIDoctorAgents.slice(0, 3));
    }

    // Filter and validate returned doctors
    const validDoctors = JSONResp.filter(
      (doc: any) =>
        doc &&
        typeof doc.id === "number" &&
        doc.specialist &&
        doc.description &&
        AIDoctorAgents.some((agent) => agent.id === doc.id),
    );

    if (validDoctors.length === 0) {
      console.warn("No valid doctors found, returning defaults");
      return NextResponse.json(AIDoctorAgents.slice(0, 3));
    }

    return NextResponse.json(validDoctors);
  } catch (e) {
    console.error("API error:", e);
    // Return default doctors on error
    return NextResponse.json(AIDoctorAgents.slice(0, 3));
  }
}
