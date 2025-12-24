import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Prompt, Sarabun } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
const prompt = Prompt({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sarabun',
});
export const metadata: Metadata = {
  title: 'Gumon',
  description: 'Gumon Dynamic Admin ',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${prompt.className} ${sarabun.variable}`}>
        {children}
      </body>
    </html>
  );
}
