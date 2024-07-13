"use server";

import { signIn, signOut } from "@/lib/auth";
import { LoginSchema, type SignInData } from "@/schemas/auth.schema";
import { AuthError } from "next-auth";

export const SignInAction = async () => {
  await signIn();
};

export const SignInWithEmailAndPasswordAction = async (values: SignInData) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Les champs ne sont pas valides" };
  }
  const { email, password } = validateFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/home" });
    return { success: "Un email de vérification vous a été envoyé" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Mauvaise combinaison email/mot de passe" };
        default:
          console.log(error.type);
          return { error: "Une erreur s'est produite" };
      }
    }

    throw error;
  }
};

export const SignOutAction = async () => {
  await signOut();
};
