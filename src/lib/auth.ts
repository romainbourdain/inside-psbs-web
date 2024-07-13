import { LoginSchema } from "@/schemas/auth.schema";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

const providers = [
  CredentialsProvider({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      const validateField = LoginSchema.safeParse(credentials);
      if (!validateField.success) {
        return null;
      }

      // const res = await fetch(`${env.API_URL}/api/login`, {
      //   method: "POST",
      //   body: JSON.stringify(validateField.data),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      const res = { ok: false, json: async () => ({ user: {}, token: "" }) };

      console.log("authorize");
      if (!res.ok) {
        return null;
      }

      const data = await res.json();

      return { ...data.user, token: data.token };
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = (provider as Function)();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      console.log("jwt");
      // eslint-disable-next-line
      if (user?.id) {
        token.id = user.id;
        token.user_name = user.user_name;
        token.auth_token = user.token;
      }
      return token;
    },
    session({ session, token }) {
      console.log("session");
      session.user.id = token.id;
      session.user.user_name = token.user_name as string;
      session.user.token = token.auth_token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
});
