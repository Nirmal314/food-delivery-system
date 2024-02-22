import { randomBytes, randomUUID } from "crypto";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
  },

  // ! modify in jwt({ token }) => reflect in session({ token, session })
  callbacks: {
    // ? modifying the session fields

    async session({ token, session }) {
      // ! if token has sub and session has user
      // ? assign user's id to be sub (from token)

      if (token.sub && session.user) session.user.id = token.sub;

      // ? assign role from token to session token to use it [role] further

      if (token.role && session.user)
        session.user.role = token.role as UserRole;

      // ! accesible from all over the website
      // console.log({ sessionToken: token });

      return session;
    },
    async jwt({ token }) {
      // ! if no unique id [sub], user is logged out
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // ? assign role from db to token to use it [role] further

      token.role = existingUser.role;

      return token;
    },
    //TODO: email verification

    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id);

    //   if (!existingUser || !existingUser.emailVerified) return false;
    //   return true;
    // },
  },
  ...authConfig,
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID() ?? randomBytes(32).toString("hex");
    },
  },
});
