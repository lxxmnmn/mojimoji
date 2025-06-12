import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Providers } from '@/components/Providers';
import { Toaster } from '@/components/ui/sonner';

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
  title: 'MojiMoji',
  description: '나를 담은 이모지',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const githubUrl = 'https://github.com/lxxmnmn';

  return (
    <html lang="ko">
      <body
        className={`min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <footer className="mt-auto p-4 text-center text-sm text-muted-foreground border-t">
          <a
            className="hover:underline hover:underline-offset-4"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {githubUrl}
          </a>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
