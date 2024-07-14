import { PageLayout } from "@/components/tailwind/page-layout";
import type { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  return <PageLayout></PageLayout>;
}
