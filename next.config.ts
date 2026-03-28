import type { NextConfig } from 'next';

// Local shape matching Next's RemotePattern for safe typing without `any`.
type LocalRemotePattern = {
  protocol?: 'http' | 'https' | string;
  hostname: string;
  port?: string | number;
  pathname?: string;
};

const r2Bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
const r2Account = process.env.CLOUDFLARE_R2_ACCOUNT_ID;

const r2Patterns: LocalRemotePattern[] =
  r2Bucket && r2Account
    ? [
        {
          protocol: 'https',
          hostname: `${r2Bucket}.${r2Account}.r2.cloudflarestorage.com`,
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: `${r2Account}.r2.cloudflarestorage.com`,
          pathname: `/${r2Bucket}/**`,
        },
      ]
    : [];

const baseRemotePatterns: LocalRemotePattern[] = [
  {
    protocol: 'https',
    hostname: 'assets.coingecko.com',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'coin-images.coingecko.com',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'lh3.googleusercontent.com',
    pathname: '/**',
  },
  // Allow Cloudflare R2 pub gateway for avatars (example host).
  {
    protocol: 'https',
    hostname: 'pub-239d85d80e03475bbf7f2b188c85c146.r2.dev',
    pathname: '/avatars/**',
  },
  ...r2Patterns,
];

// If a public base URL is provided for R2 (e.g. https://pub-...r2.dev/coinglobal-bucket),
// derive its hostname and add a remotePattern so `next/image` accepts it.
const r2PublicBase = process.env.CLOUDFLARE_R2_PUBLIC_BASE_URL;
let r2PublicPattern: LocalRemotePattern[] = [];
if (r2PublicBase) {
  try {
    const parsed = new URL(r2PublicBase);
    const host = parsed.hostname;
    // Normalize pathname to end with '/**' so it matches keys under that prefix
    const basePath = parsed.pathname === '/' ? '/**' : `${parsed.pathname.replace(/\/$/, '')}/**`;
    const proto = parsed.protocol.replace(':', '');

    r2PublicPattern = [
      {
        protocol: proto,
        hostname: host,
        pathname: basePath,
      },
    ];
  } catch (e) {
    // ignore invalid URL in env
    console.warn('Invalid CLOUDFLARE_R2_PUBLIC_BASE_URL:', r2PublicBase);
  }
}

// Append any derived public pattern
baseRemotePatterns.push(...r2PublicPattern);

const nextConfig: NextConfig = {
  images: {
    // Cast via `unknown` to NextConfig image type to avoid `any` usage while
    // keeping compile-time safety. This satisfies ESLint rules against `any`.
    remotePatterns: baseRemotePatterns as unknown as NonNullable<
      NextConfig['images']
    >['remotePatterns'],
  },
};

export default nextConfig;
