import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { transcripts, summaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { meetingId } = await request.json();

  const [transcript] = await db
    .select()
    .from(transcripts)
    .where(eq(transcripts.meetingId, meetingId));

  if (!transcript || !transcript.content) {
    return NextResponse.json({ error: "Transcript not found" }, { status: 404 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that summarizes meeting transcripts. Extract key points and action items.",
          },
          {
            role: "user",
            content: transcript.content as string,
          },
        ],
      }),
    });

    const data = await response.json();
    const summary = data.choices[0].message.content;

    const actionItems = summary
      ?.split("\n")
      .filter((line: string) => line.trim().startsWith("-") || line.trim().startsWith("*"))
      .map((line: string) => line.trim().substring(1).trim());

    await db.insert(summaries).values({
      id: uuidv4(),
      meetingId: meetingId,
      content: summary,
      actionItems: actionItems,
    });

    return NextResponse.json({ message: "Summarization complete" });
  } catch (error) {
    console.error("Error summarizing transcript:", error);
    return NextResponse.json({ error: "Error summarizing transcript" }, { status: 500 });
  }
}
