"use client";

import { PageLayout } from "@/components/tailwind/page-layout";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { ErrorParams } from "@/types/next";
import Link from "next/link";
import { useEffect } from "react";

export default function RouteError({ error }: ErrorParams) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageLayout className="flex h-screen max-w-md flex-col items-start justify-center gap-3">
      <Typography variant="code">400</Typography>
      <Typography variant="h1">Une erreur est survenue</Typography>
      <Typography variant="base">
        Il semble que nous rencontrons quelques difficultés techniques. Pas de
        panique, notre équipe travaille dessus. En attendant, essayez de
        rafraîchir la page ou de revenir un peu plus tard.
      </Typography>
      <Link href="/" className={cn(buttonVariants(), "mt-5")}>
        Retourner à l'accueil
      </Link>
    </PageLayout>
  );
}
