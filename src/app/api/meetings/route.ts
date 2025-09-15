import { createMeeting } from "@/lib/db/meetings";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, audioFilePath } = await request.json();

  try {
    const newMeeting = await createMeeting(title, audioFilePath);
    return NextResponse.json(newMeeting);
  } catch (error) {
    console.error("Error creating meeting:", error);
    return NextResponse.json({ error: "Error creating meeting" }, { status: 500 });
  }
}
