import type { Metadata } from "next";
import "./globals.css";

import { GoogleAnalytics } from '@next/third-parties/google';
import { googleEngine } from "@/lib/firebase";

export const metadata: Metadata = {
  title: "StadiumPulse | The Kinetic Horizon",
  description: "Real-time crowd dynamics and elite logistics management for high-density venues.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize Mock Google Services for Hackathon requirement
  googleEngine.initialize();

  return (
    <html lang="en" className="dark h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </head>
      <body className="font-body bg-background text-on-surface min-h-full overflow-x-hidden" suppressHydrationWarning>
        {children}
        <GoogleAnalytics gaId="G-MOCKMSRMT" />
      </body>
    </html>
  );
}