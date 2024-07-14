import { LoginFormSchema, LoginSchema } from "@/schemas/auth.schema";
import type { NextAuthConfig } from "next-auth";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { env } from "./env";

class InvalidLoginError extends CredentialsSignin {
  message = "Mauvaise combinaison email/mot de passe";
}

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginFormSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        //TODO: Hash the password

        const res = await fetch(`${env.API_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        if (!res.ok) {
          switch (res.status) {
            case 401:
              throw new InvalidLoginError();
            default:
              return null;
          }
        }

        const data = await res.json();

        const parsedData = LoginSchema.safeParse(data);
        if (!parsedData.success) return null;

        return {
          ...parsedData.data.user,
          id: parsedData.data.user.id.toString(),
          token: parsedData.data.token,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
