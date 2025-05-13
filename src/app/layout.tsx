import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/header';
import { ResultsProvider } from '@/context/results-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', 
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono', 
});

export const metadata: Metadata = {
  title: 'Career Compass',
  description: 'AI-Powered Career Guidance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased font-sans`}>
        <ResultsProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4 md:p-6">
              {children}
            </main>
            <footer className="bg-muted text-muted-foreground p-4 text-center text-sm no-print">
              © {new Date().getFullYear()} Career Compass. All rights reserved.
            </footer>
          </div>
          <Toaster />
        </ResultsProvider>
      </body>
    </html>
  );
}
