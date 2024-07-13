import { PageLayout } from "@/components/tailwind/page-layout";
import { Tiptap } from "@/features/editor/tiptap";
import type { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <PageLayout className="h-full">
      <Tiptap className="h-full" />
    </PageLayout>
  );
}
