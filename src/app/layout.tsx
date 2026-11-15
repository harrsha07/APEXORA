import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import StoreShell from '@/components/StoreShell';

export const metadata: Metadata = {
  title: 'APEXORA — Motorsport Culture by Harsha',
  description: 'Built for speed. Defined by culture. Premium motorsport streetwear and racing performance apparel.',
  applicationName: 'APEXORA Motorsport Culture',
  keywords: ['motorsport', 'streetwear', 'racing apparel', 'oversized tee', 'motogp', 'APEXORA', 'Harsha'],
  openGraph: {
    title: 'APEXORA — Motorsport Culture by Harsha',
    description: 'Built for speed. Defined by culture. Drop 001 — The Pursuit is now live.',
    type: 'website',
    siteName: 'APEXORA'
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Rajdhani:wght@500;600;700&family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#08090B] text-white">
        <StoreProvider>
          <StoreShell>{children}</StoreShell>
        </StoreProvider>
      </body>
    </html>
  );
}
