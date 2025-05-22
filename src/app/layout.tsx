import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./library/css/globals.css";
import { Providers } from "./components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lost Girls Vintage Chat",
  description: "Chat with our vintage clothing assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
