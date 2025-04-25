import type { Metadata } from "next";
import { Inter, Onest } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// Load fonts
const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GradeGenie",
  description: "AI-powered grading assistant for educators",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${onest.variable} ${inter.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
