import { LoginFormSchema, LoginSchema } from "@/schemas/auth.schema";
import bcrypt from "bcryptjs";
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
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginFormSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const res = await fetch(`${env.API_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: hashedPassword,
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

        return parsedData.data.user;
      },
    }),
  ],
} satisfies NextAuthConfig;
