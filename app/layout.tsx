import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/sonner";
import { getCartByUserId } from "@/actions/user/getcartbyuserid";
import { getCartItemsByCartId } from "@/actions/user/getcartitemsbycartid";

export const metadata: Metadata = {
  title: "EatEase",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Header session={session!} />
          <main>{children}</main>
          <Toaster
            theme="light"
            richColors
            position="bottom-right"
            expand
            closeButton
          />
        </SessionProvider>
      </body>
    </html>
  );
}
