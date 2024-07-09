import { PageLayout } from "@/components/tailwind/page-layout";
import { Button } from "@/components/ui/button";
import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <PageLayout className="">
      <Link href="/home">
        <Button variant="link">Home</Button>
      </Link>
    </PageLayout>
  );
}
