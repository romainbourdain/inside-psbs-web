"use server";

import { signIn, signOut } from "@/lib/auth";

export const SignInAction = async () => {
  await signIn();
};

export const SignOutAction = async () => {
  await signOut();
};
