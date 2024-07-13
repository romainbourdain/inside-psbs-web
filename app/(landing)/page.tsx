import { PageLayout } from "@/components/tailwind/page-layout";
import { auth, signOut } from "@/lib/auth";
import type { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  const session = await auth();
  return (
    <PageLayout className="h-full">
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        {JSON.stringify(session)}
      </form>
    </PageLayout>
  );
}
