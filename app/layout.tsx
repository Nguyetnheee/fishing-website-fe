import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Wild & Water | Trang bị dã ngoại & câu cá cao cấp',
  description: 'Chinh phục thiên nhiên hoang dã với các bộ trang bị chuyên biệt cho biển, sông suối và cắm trại.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable}`}>
      <body className="bg-background text-on-surface antialiased font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
