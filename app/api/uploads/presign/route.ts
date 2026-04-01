import { NextResponse } from 'next/server';
import {
  S3Client,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
    const version = Date.now();
    const key = `avatars/${userId}/avatar.jpg`;

    const s3 = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
      },
    });

    const cmd = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    });

    const url = await getSignedUrl(s3, cmd, { expiresIn: 60 * 60 });

    const publicBase =
      process.env.CLOUDFLARE_R2_PUBLIC_BASE_URL ??
      `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
    
    const normalizedBase = publicBase.replace(/\/$/, "");
    const publicUrl = `${normalizedBase}/${key}?v=${version}`;

    return NextResponse.json({ url, key, publicUrl });

  } catch (err) {
    console.error('presign upload error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
