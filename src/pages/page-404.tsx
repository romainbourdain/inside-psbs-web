import { PageLayout } from "@/components/tailwind/page-layout";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Page404 = () => {
  return (
    <PageLayout className="flex h-screen flex-col items-center justify-center gap-3">
      <Typography variant="code">404</Typography>
      <Typography variant="h1">Page not found</Typography>
      <Typography variant="base">
        Sorry, we couldn't find the page you're looking for.
      </Typography>
      <Link href="/" className={cn(buttonVariants(), "mt-5")}>
        Go back home
      </Link>
    </PageLayout>
  );
};
