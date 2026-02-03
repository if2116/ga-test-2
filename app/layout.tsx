import type { Metadata } from 'next';
import { Manrope, Noto_Sans_SC, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RWAI Arena - Real-World AI Best Practices',
  description: 'Find the best AI solutions for your real-world business scenarios. Verified, open-source, production-ready.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${notoSansSC.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
