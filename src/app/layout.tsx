import type { Metadata } from "next";
import "./globals.css";
import { EventProvider } from "@/context/EventContext";

export const metadata: Metadata = {
  title: "StadiumPulse | The Kinetic Horizon",
  description: "Real-time crowd dynamics and elite logistics management for high-density venues.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="font-body bg-background text-on-surface min-h-full overflow-x-hidden">
        <EventProvider>{children}</EventProvider>
      </body>
    </html>
  );
}
