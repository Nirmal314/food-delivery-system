import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/sonner";
import { Knock } from "@knocklabs/node";
// import { knockClient } from "@/lib/knock";
export const metadata: Metadata = {
  title: "EatEase",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY!);

  if (session?.user.id) {
    const knockUser = await knockClient.users.identify(session?.user.id, {
      name: session?.user.name!,
      email: session?.user.email!,
    });

    console.log(knockUser);
  }

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
