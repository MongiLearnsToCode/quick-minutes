import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { meetings, transcripts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://<R2_ACCOUNT_ID>.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export async function POST(request: Request) {
  const { meetingId } = await request.json();

  const [meeting] = await db
    .select()
    .from(meetings)
    .where(eq(meetings.id, meetingId));

  if (!meeting || !meeting.audioFilePath) {
    return NextResponse.json({ error: "Meeting not found or audio file path is missing" }, { status: 404 });
  }

  const getObjectCommand = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: meeting.audioFilePath,
  });

  try {
    const { Body } = await s3Client.send(getObjectCommand);

    if (!Body) {
        return NextResponse.json({ error: "Could not retrieve audio file from R2" }, { status: 500 });
    }

    const audioBuffer = await streamToBuffer(Body as Readable);

    const formData = new FormData();
    formData.append("file", new Blob([new Uint8Array(audioBuffer)]), meeting.audioFilePath);
    formData.append("model", "whisper-1");
    formData.append("response_format", "verbose_json");

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    });

    const transcription = await response.json();

    const formattedTranscript = transcription.segments.map((segment: { speaker: string, text: string }) => ({
      speaker: segment.speaker,
      text: segment.text,
    }));

    await db.insert(transcripts).values({
      id: uuidv4(),
      meetingId: meeting.id,
      content: JSON.stringify(formattedTranscript),
    });

    return NextResponse.json({ message: "Transcription complete" });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return NextResponse.json({ error: "Error transcribing audio" }, { status: 500 });
  }
}
