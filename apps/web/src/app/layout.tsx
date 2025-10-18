import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AIWorkSpace - Modern Platform for IT & AI Freelancers',
  description:
    'Connect with top IT and AI professionals. AI-powered matching, secure escrow payments, and transparent collaboration.',
  keywords: ['freelance', 'IT', 'AI', 'blockchain', 'escrow', 'web3'],
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
