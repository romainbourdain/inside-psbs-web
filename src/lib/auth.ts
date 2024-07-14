import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (user?.id) {
        token.id = user.id;
        token.auth_token = user.token;
        token.user_name = user.user_name;
      }
      return token;
    },
    async session({ token, session }) {
      session.user.id = token.id;
      session.user.token = token.auth_token;
      session.user.user_name = token.user_name;
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  ...authConfig,
});
