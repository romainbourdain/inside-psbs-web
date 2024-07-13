"use client";

import { SignInWithEmailAndPasswordAction } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import { Typography } from "@/components/ui/typography";
import type { SignInData } from "@/schemas/auth.schema";
import { LoginSchema } from "@/schemas/auth.schema";
import Link from "next/link";
import { useState } from "react";
import { FormError } from "../form/form-error";
import { FormSuccess } from "../form/form-success";

export const LoginForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useZodForm({
    schema: LoginSchema,
  });

  const handleSubmit = async (values: SignInData) => {
    const data = await SignInWithEmailAndPasswordAction(values);
    setError(data.error || "");
    setSuccess(data.success || "");
  };
  return (
    <Form form={form} onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm p-4">
        <CardHeader>
          <Typography variant="h2">Se connecter</Typography>
          <CardDescription>
            Entrer vos identifiants pour vous connecter.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full">Se connecter</Button>
          <Typography variant="small">
            Pas encore de compte ?{" "}
            <Link
              className="text-primary underline-offset-4 hover:underline"
              href="/auth/register"
            >
              Créer un compte
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </Form>
  );
};
