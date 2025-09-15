import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { meetings, transcripts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import OpenAI from "openai";
import { Readable } from "stream";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://<R2_ACCOUNT_ID>.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

    const transcription = await openai.audio.transcriptions.create({
      file: new File([audioBuffer], meeting.audioFilePath, { type: "audio/wav" }), // Assuming wav, adjust if needed
      model: "whisper-1",
      response_format: "verbose_json",
    });

    const formattedTranscript = transcription.segments.map((segment: any) => ({
      speaker: segment.speaker,
      text: segment.text,
    }));

    await db.insert(transcripts).values({
      meetingId: meeting.id,
      content: JSON.stringify(formattedTranscript),
    });

    return NextResponse.json({ message: "Transcription complete" });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return NextResponse.json({ error: "Error transcribing audio" }, { status: 500 });
  }
}
