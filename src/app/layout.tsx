import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lost Girls Vintage - Curated Fashion From Bygone Eras',
  description: 'Chat with our vintage fashion specialists for personalized assistance with authentic vintage clothing.',
  keywords: 'vintage clothing, retro fashion, Lost Girls Vintage, vintage support, fashion history',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f5f5f5" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="vintage-bg overflow-hidden">
        {children}
      </body>
    </html>
  );
}