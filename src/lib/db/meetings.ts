import { db } from "./index";
import { meetings } from "./schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function createMeeting(title: string, audioFilePath: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Unauthorized");
  }

  const [newMeeting] = await db
    .insert(meetings)
    .values({
      id: uuidv4(),
      title,
      audioFilePath,
      userId: session.user.id,
    })
    .returning();

  return newMeeting;
}
