import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ui/themeProvider";
import { ThemeToggle } from "./components/ui/themeToggle";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Organizen App",
  description:
    "Organizen It is a minimalistic web application that allows users to create, edit, and manage organizational charts intuitively. With drag-and-drop functionality, tier-based organization, and persistent storage, it optimizes the visualization and structure of any company.",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="flex justify-between items-center p-4 border-b border-[var(--border-color)]">
            <Image
              className="dark:invert"
              src="/organizen.svg"
              alt="Organizen logo"
              width={100}
              height={38}
              priority
            />
            <ThemeToggle />
          </header>
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
