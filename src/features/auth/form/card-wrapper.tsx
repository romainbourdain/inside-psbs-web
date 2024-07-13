import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export type CardWrapperProps = PropsWithChildren<{
  title: string;
  description?: string;
  backButtonLabel: string;
  backButtonHref: string;
}>;

export const CardWrapper = ({
  children,
  title,
  description,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex w-full justify-center">
        <Link
          href={backButtonHref}
          className={cn(buttonVariants({ variant: "link" }))}
        >
          {backButtonLabel}
        </Link>
      </CardFooter>
    </Card>
  );
};
