import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { meetings, transcripts, summaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { meetingId: string } }
) {
  const meetingId = params.meetingId;

  const [meeting] = await db
    .select()
    .from(meetings)
    .where(eq(meetings.id, meetingId));

  if (!meeting) {
    return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
  }

  const [transcript] = await db
    .select()
    .from(transcripts)
    .where(eq(transcripts.meetingId, meetingId));

  const [summary] = await db
    .select()
    .from(summaries)
    .where(eq(summaries.meetingId, meetingId));

  return NextResponse.json({ meeting, transcript, summary });
}
