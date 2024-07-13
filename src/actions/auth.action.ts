"use server";

import { signIn, signOut } from "@/lib/auth";
import { env } from "@/lib/env";
import { action } from "@/lib/safe-actions";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { LoginFormSchema, RegisterFormSchema } from "../schemas/auth.schema";

export const signInAction = action
  .schema(z.string().nullable())
  .action(async ({ parsedInput: provider_id }) => {
    try {
      await signIn(provider_id);
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`auth/error?error=${error.type}`);
      }
      throw error;
    }
  });

export const signInWithEmailAndPasswordAction = action
  .schema(LoginFormSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
      return { success: "Vous pouvez vous connecter" };
    } catch (error) {
      if (error instanceof AuthError) {
        if (error.cause?.err instanceof Error) {
          return { error: error.cause.err.message };
        }
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Mauvaise combinaison email/mot de passe" };
          default:
            return { error: "Une erreur est survenue" };
        }
      }
      throw error;
    }
  });

export const registerAction = action
  .schema(RegisterFormSchema)
  .action(async ({ parsedInput }) => {
    const existingEmail = await checkAvailabilityAction({
      email: parsedInput.email,
    });
    if (!existingEmail?.data)
      return { error: "L'email entré est déjà utilisé" };

    const existingUserName = await checkAvailabilityAction({
      user_name: parsedInput.user_name,
    });
    if (!existingUserName?.data)
      return { error: "Le nom d'utilisateur entré est déjà utilisé" };

    const existingPhone = await checkAvailabilityAction({
      phone: parsedInput.phone,
    });
    if (!existingPhone?.data)
      return { error: "Le numéro de téléphone entré est déjà utilisé" };

    const hashedPassword = await bcrypt.hash(parsedInput.password, 10);

    const res = await fetch(`${env.API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...parsedInput,
        password: hashedPassword,
        password_confirmation: hashedPassword,
      }),
    });
    if (!res.ok)
      return { error: "Une erreur est survenue lors de l'inscription" };

    return { success: "Un email de vérification a été envoyé" };
  });

export const signOutAction = action.action(async () => {
  await signOut();
});

export const checkAvailabilityAction = action
  .schema(
    z.object({
      email: z.string().optional().nullable(),
      user_name: z.string().optional().nullable(),
      phone: z.string().optional().nullable(),
    })
  )
  .action(async ({ parsedInput: { email, user_name, phone } }) => {
    const url = new URL(`${env.API_URL}/api/register/availability`);
    if (email) url.searchParams.append("email", email);
    if (user_name) url.searchParams.append("user_name", user_name);
    if (phone) url.searchParams.append("phone", phone);

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.ok;
  });
