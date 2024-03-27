import { randomBytes, randomUUID } from "crypto";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserByEmail, getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { getMenuByRestaurantId, getRestaurantByAdminId } from "./data/admin";
import { cookies } from "next/headers";

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

      if (token.role === UserRole.USER)
        session.user.address = token.address as string;

      if (token.role === UserRole.ADMIN) {
        session.user.restaurantId = token.restaurantId as string;
        session.user.menuId = token.menuId as string;
      }

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

      if (existingUser.role === UserRole.USER)
        token.address = existingUser.address;

      if (existingUser.role === UserRole.ADMIN) {
        const restaurant = await getRestaurantByAdminId(token.sub);
        token.restaurantId = restaurant?.id;

        const menu = await getMenuByRestaurantId(restaurant?.id as string);
        token.menuId = menu?.id;
      }

      return token;
    },
    //TODO: email verification

    async signIn({ user, credentials, account, email, profile }) {
      // TODO: try to figure out how to use { credentials }
      // console.log("credentials: ", credentials);
      // const { address, contactNumber } = credentials || {};
      // console.log({ address, contactNumber });

      // const { address, contactNumber } = credentials as {
      //   address: string;
      //   contactNumber: string;
      // };

      const currentCookies = cookies();
      const address = currentCookies.get("address")?.value;
      const contactNumber = currentCookies.get("contactNumber")?.value;

      const existingUser = await getUserByEmail(user?.email as string);
      if (!existingUser) {
        const res = await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            address,
            contactNumber,
          },
        });
        console.log(res);
        // TODO: somehow add address and contactNumber to google account
        console.log("new user");

        if (currentCookies.get("address")) currentCookies.delete("address");
        if (currentCookies.get("contactNumber"))
          currentCookies.delete("contactNumber");
      }
      return true;
    },
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
