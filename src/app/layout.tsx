import type { Metadata } from 'next';
import { Playfair_Display, Mali } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const mali = Mali({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Valentine 💖',
  description: 'Romantic Valentine Page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={mali.className}>{children}</body>
    </html>
  );
}
