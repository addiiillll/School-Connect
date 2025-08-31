import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavigationHeader } from "@/components/navigation-header";
import { BottomNav } from "@/components/bottom-nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School Connect - Find Your Perfect School",
  description: "Discover and manage schools with our comprehensive directory. Add new schools and browse through existing ones with advanced search and filtering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavigationHeader />
        <div className="min-h-screen pb-20 md:pb-0">
        {children}
        </div>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
