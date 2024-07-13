import type { z } from "zod";
import { object, string } from "zod";

export const LoginSchema = object({
  email: string({ required_error: "Un email est requis" })
    .min(1, "Un email est requis")
    .email("L'email entré est invalide"),
  password: string({ required_error: "Un mot de passe est requis" }),
});

export type SignInData = z.infer<typeof LoginSchema>;
