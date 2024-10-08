import "./globals.css";

import { ClerkProvider, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";

import ConvexClientProvider from "./ConvexClientProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Arcane Storm",
  description: "Clicker based MMORPG",
};

const Navbar = () => {
  return (
    <div className="flex h-20 items-center justify-between p-6">
      <Link
        href={"/"}
        className="font-bold uppercase leading-none tracking-tighter"
      >
        Arcane Storm
      </Link>

      <UserButton />
    </div>
  );
};

const Footer = () => {
  return (
    <div className="h-20 p-6">
      <p className="text-center text-xs text-neutral-600">
        &copy; {new Date().getFullYear()} RCB Software. All rights reserved. |
        By{" "}
        <Link href="https://ryelbanfield.me" target="_blank" rel="noreferrer">
          Ryel Banfield
        </Link>
      </p>
    </div>
  );
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.className} container mx-auto flex min-h-screen flex-col antialiased`}
        >
          <ConvexClientProvider>
            <Navbar />
            <main className="grid grow">{children}</main>
            <Footer />
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
