"use client";

import { PageLayout } from "@/components/tailwind/page-layout";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { ErrorParams } from "@/types/next";
import Link from "next/link";

export default function RouteError({ error, reset }: ErrorParams) {
  return (
    <PageLayout className="flex h-screen flex-col items-center justify-center gap-3">
      <Typography variant="code">404</Typography>
      <Typography variant="h1">Page non trouvée</Typography>
      <Typography variant="base">
        Désolé, la page que vous recherchez n'existe pas.
      </Typography>
      <Link href="/" className={cn(buttonVariants(), "mt-5")}>
        Retourner à l'accueil
      </Link>
    </PageLayout>
  );
}
