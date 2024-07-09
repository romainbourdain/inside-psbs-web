import type { User as NextAuthUser } from "next-auth";
import NextAuth, { CredentialsSignin } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "./env";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

interface ExtendedUser extends NextAuthUser {
  id: string;
  user_name: string;
  token: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(`${env.API_URL}/api/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new InvalidLoginError();
        }

        return { ...data.user, token: data.token };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      const currentUser = user as ExtendedUser | null;
      if (currentUser) {
        token.id = currentUser.id;
        token.user_name = currentUser.user_name;
        token.auth_token = currentUser.token;
      }

      return token;
    },

    session({ session, token }) {
      const currentToken = token as JWT & {
        id: string;
        user_name: string;
        auth_token: string;
      };

      session.user.id = currentToken.id;
      session.user.user_name = currentToken.user_name as string;
      session.user.token = currentToken.auth_token;
      return session;
    },
  },
});
