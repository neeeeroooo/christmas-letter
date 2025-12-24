import { Prompt, Sarabun } from 'next/font/google';
import '../../globals.css';

import React from 'react';

import type { Metadata, ResolvingMetadata } from 'next';
import { ApolloWrapper } from '@/lib/ApolloWrapper';

// import { AntdRegistry } from '@ant-design/nextjs-registry';
import { unstable_noStore as noStore } from 'next/cache';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

import 'dayjs/locale/th'; // โหลด locale ภาษาไทย
import 'dayjs/locale/en'; // โหลด locale ภาษาอังกฤษ
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import LocaleSwitcher from '@/components/localeSwitcher';

const prompt = Prompt({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  noStore();

  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Fetch i18n messages for the current locale
  const messages = await getMessages({ locale });

  dayjs.locale(locale);
  dayjs.extend(buddhistEra);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* 🔹 ปุ่มสลับภาษาที่มุมขวาบน */}
      <div className="fixed top-4 right-4 z-50">
        <LocaleSwitcher />
      </div>
      {children}
    </NextIntlClientProvider>
  );
}
