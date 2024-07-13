import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PageParams } from "@/types/next";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader className="flex flex-row items-center gap-4">
        <CheckCircle className="size-8 text-success" />
        <div>
          <CardTitle>Email envoyé</CardTitle>
          <CardDescription>
            Un email vous a été envoyé afin de vérifier votre adresse email
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter>
        <Link
          href="/auth/login"
          className={buttonVariants({ variant: "success" })}
        >
          Revenir à la page de connexion
        </Link>
      </CardFooter>
    </Card>
  );
}
