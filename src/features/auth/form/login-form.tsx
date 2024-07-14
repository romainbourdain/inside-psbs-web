"use client";

import { signInWithEmailAndPasswordAction } from "@/actions/auth.action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { FormError } from "@/features/auth/form/form-error";
import { FormSuccess } from "@/features/auth/form/form-success";
import type { LoginData } from "@/schemas/auth.schema";
import { LoginFormSchema } from "@/schemas/auth.schema";
import { useState } from "react";
import { CardWrapper } from "./card-wrapper";

export type LoginFormProps = {
  csrfToken: string;
};

export const LoginForm = ({ csrfToken }: LoginFormProps) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const form = useZodForm({
    schema: LoginFormSchema,
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginData) => {
    const res = await signInWithEmailAndPasswordAction(values);
    if (!res?.data) return setError("Une erreur est survenue");

    setError(res.data.error);
    setSuccess(res.data.success);
  };

  return (
    <CardWrapper
      title="Se connecter"
      description="Connectez-vous à votre compte InsidePSBS"
      backButtonLabel="Non merci, je veux créer un compte"
      backButtonHref="/auth/register"
    >
      <Form form={form} onSubmit={onSubmit} className="space-y-4">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="fabien.pregaldiny@tps.fr"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="********" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}

        <LoadingButton
          type="submit"
          className="w-full"
          loading={form.formState.isSubmitting}
        >
          Se connecter
        </LoadingButton>
      </Form>
    </CardWrapper>
  );
};
