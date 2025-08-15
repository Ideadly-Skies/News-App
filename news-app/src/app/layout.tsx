import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Suspense } from 'react';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'New York Times News',
  description: 'Latest headlines and stories from The New York Times',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Wrap component that uses next/navigation hooks */}
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        
        {/* Wrap the page content so routes like /about are safe */}
        <Suspense fallback={null}>
          {children}
        </Suspense>

        <Footer />
      </body>
    </html>
  );
}
