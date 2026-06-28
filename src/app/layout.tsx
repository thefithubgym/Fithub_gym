import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "The FitHub Gym",
  description: "Unisex Fitness Center Admin Portal & Member Site",
};

import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        {/* Material Symbols Outlined for UI icons */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background min-h-screen font-sans antialiased">
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
