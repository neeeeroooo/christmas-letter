export const config = {
  runtime: 'nodejs', // ให้รันบน Node.js (จะใช้ fs ได้)
};

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  req: Request,
  {
    params,
  }: Readonly<{
    params: Promise<{ locale: string }>;
  }>,
) {
  const { locale } = await params;
  const translations: Record<string, any> = {};
  const dir = path.resolve(process.cwd(), 'public/locales', locale);
  try {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const name = path.basename(file, '.json');
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isFile()) {
          translations[name] = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        }
      }
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to load translations' },
      { status: 500 },
    );
  }

  return NextResponse.json(translations);
}
