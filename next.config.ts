import type { NextConfig } from 'next';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const remotePatterns: { protocol: 'http' | 'https'; hostname: string }[] = [
  { protocol: 'https', hostname: 'images.unsplash.com' },
  { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
];

if (apiUrl) {
  const url = new URL(apiUrl);
  const protocol = url.protocol.replace(':', '');

  if (protocol === 'http' || protocol === 'https') {
    remotePatterns.push({
      protocol,
      hostname: url.hostname,
    });
  }
}

const nextConfig: NextConfig = {
  /* config options here */
  images: { remotePatterns },
};

export default nextConfig;
