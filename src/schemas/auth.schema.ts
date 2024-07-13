import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
);

export const LoginSchema = z.object({
  user: z.object({
    id: z.number(),
    user_name: z.string(),
    last_name: z.string(),
    first_name: z.string(),
    sector_id: z.number(),
    email: z.string().email(),
    phone: z.string(),
    promotion_year: z.number().int(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
  token: z.string(),
});

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Un email est requis" })
    .email({ message: "L'email n'est pas valide" }),
  password: z.string().min(1, { message: "Un mot de passe est requis" }),
});

export const RegisterFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Un email est requis" })
      .max(255, {
        message: "L'email doit contenir au plus 255 caractères",
      })
      .email({
        message: "L'email n'est pas valide",
      }),
    password: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      })
      .regex(passwordRegex, {
        message:
          "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
      }),
    password_confirmation: z
      .string()
      .min(1, { message: "Veuillez confirmer votre mot de passe" }),
    user_name: z
      .string()
      .min(3, {
        message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
      })
      .max(30, {
        message: "Le nom d'utilisateur doit contenir au plus 30 caractères",
      }),
    last_name: z
      .string()
      .min(3, { message: "Le nom doit contenir au moins 3 caractères" })
      .max(255, { message: "Le nom doit contenir au plus 255 caractères" }),
    first_name: z
      .string()
      .min(3, { message: "Le prénom doit contenir au moins 3 caractères" })
      .max(255, { message: "Le prénom doit contenir au plus 255 caractères" }),
    sector: z.number().int(),
    phone: z
      .string()
      .regex(phoneRegex, "Le numéro de téléphone n'est pas valide"),
    promotion_year: z
      .number()
      .int()
      .min(2000, { message: "L'année de promotion n'est pas valide" })
      .max(3000),
  })
  .superRefine(({ password, password_confirmation }, ctx) => {
    if (password != password_confirmation)
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["password_confirmation"],
      });
  });

export type LoginData = z.infer<typeof LoginFormSchema>;
export type RegisterData = z.infer<typeof RegisterFormSchema>;
