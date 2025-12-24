import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const imageDomains: string[] =
  process.env.IMAGE_DOMAINS?.split(',').map((d) => d.trim()) ?? [];

const nextConfig: NextConfig = {
  images: {
    // ✅ ใส่โดเมนของรูปภายนอกที่อนุญาต
    domains: imageDomains,
    unoptimized: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
