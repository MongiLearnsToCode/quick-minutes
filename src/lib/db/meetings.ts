import { db } from "./index";
import { meetings } from "./schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createMeeting(title: string, audioFilePath: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Unauthorized");
  }

  const [newMeeting] = await db
    .insert(meetings)
    .values({
      title,
      audioFilePath,
      userId: session.userId,
    })
    .returning();

  return newMeeting;
}
