import '@coinbase/onchainkit/styles.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import OnchainProviders from '@/components/OnchainProviders';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  applicationName: 'Automatic Agent',
  title: 'Automatic Agent',
  description:
    'Your secure, dedicated on-chain automation agent for seamless blockchain interactions.',
  icons: {
    icon: '/images/android-chrome-512x512.png',
    shortcut: '/images/favicon.ico',
    apple: '/images/apple-touch-icon.png',
    other: [
      {
        sizes: '16x16',
        url: '/images/favicon-16x16.png',
      },
      {
        sizes: '32x32',
        url: '/images/favicon-32x32.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  );
}
