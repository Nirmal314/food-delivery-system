import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "EatEase",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log({ layoutSession: session });
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Header session={session!} isLoggedIn={session ? true : false} />
          <main>{children}</main>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
