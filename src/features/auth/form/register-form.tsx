"use client";

import { registerAction } from "@/actions/auth.action";
import { getSectorsAction } from "@/actions/sectors.action";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormError } from "@/features/auth/form/form-error";
import { RegisterFormSchema, type RegisterData } from "@/schemas/auth.schema";
import type { SectorsData } from "@/schemas/sectors.schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const form = useZodForm({
    schema: RegisterFormSchema,
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
      first_name: "",
      last_name: "",
      user_name: "",
      phone: "",
      sector: 1,
      promotion_year: new Date().getFullYear(),
    },
  });
  const [sectors, setSectors] = useState<SectorsData>([]);

  useEffect(() => {
    getSectorsAction(null).then((res) => res?.data && setSectors(res.data));
  }, []);

  const onSubmit = async (values: RegisterData) => {
    const res = await registerAction(values);
    if (!res?.data) return setError("Une erreur est survenue");

    if (res.data.success) router.push("/auth/success");

    setError(res.data.error);
  };

  return (
    <CardWrapper
      title="Créer un compte"
      description="Créez un compte InsidePSBS pour accéder à l'application"
      backButtonLabel="Non merci, j'ai déjà un compte"
      backButtonHref="/auth/login"
    >
      <Form form={form} onSubmit={onSubmit} className="space-y-6">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Fabien"
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Prégaldiny"
                    autoComplete="family-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pseudo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="fabien.pregaldiny"
                  autoComplete="username"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  placeholder="0123456789"
                  autoComplete="tel"
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
                <Input
                  {...field}
                  type="password"
                  placeholder="********"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="********"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Filière</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sectors.map(({ id, short_name }) => (
                      <SelectItem key={id} value={id.toString()}>
                        {short_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="promotion_year"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Année d'arrivée</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="2010"
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {error && <FormError message={error} />}

        <LoadingButton
          type="submit"
          className="w-full"
          loading={form.formState.isSubmitting}
        >
          Créer un compte
        </LoadingButton>
      </Form>
    </CardWrapper>
  );
};
