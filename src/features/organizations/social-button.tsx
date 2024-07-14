import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export type SocialButtonProps = PropsWithChildren<{ href?: string }>;

export const SocialButton = ({ children, href }: SocialButtonProps) =>
  href && (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        "p-2"
      )}
    >
      {children}
    </Link>
  );
