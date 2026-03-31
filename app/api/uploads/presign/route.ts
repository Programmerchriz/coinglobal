import { NextResponse } from 'next/server';
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

import { unauthorizedSession } from '@/lib/session';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { filename, contentType } = await req.json();

    if (!filename || !contentType) {
      return NextResponse.json({ error: 'Missing filename or contentType' }, { status: 400 });
    };

    if (!(contentType === "image/jpeg" || contentType === "image/png" || contentType === "image/webp")) {
      return NextResponse.json({ error: 'Invalid image type' }, { status: 400 });
    };

    const session = await unauthorizedSession();
    const userId = session.user.id;

    const ext = filename.split(".").pop()?.toLowerCase();
    if (!ext) return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });

    const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME!;
    const key = `avatars/${userId}/avatar-${uuidv4()}.${ext}`;
    const prefix = `avatars/${userId}/`;

    const s3 = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
      },
    });

    // Delete any previous avatar file in this user's avatar folder
    const existing = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
      })
    );

    const keysToDelete = 
      existing.Contents?.map((obj) => obj.Key).filter(
        (k): k is string => !!k && k !== key
      ) ?? [];

    if (keysToDelete.length) {
      await s3.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: {
            Objects: keysToDelete.map((Key) => ({ Key })),
          },
        })
      );
    };

    const cmd = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3, cmd, { expiresIn: 60 * 60 });

    const publicBase =
      process.env.CLOUDFLARE_R2_PUBLIC_BASE_URL ??
      `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
    
    const publicUrl = `${publicBase.replace(/\/$/, "")}/${key}`;
    console.log("Public Url:", publicUrl);
    return NextResponse.json({ url, key, publicUrl });

  } catch (err) {
    console.error('presign upload error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
