import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  const { fileName, fileType } = await request.json();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 60 * 5, // 5 minutes
    });

    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("Error creating signed URL:", error);
    return NextResponse.json({ error: "Error creating signed URL" }, { status: 500 });
  }
}
