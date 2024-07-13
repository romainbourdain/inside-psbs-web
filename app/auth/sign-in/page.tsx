import { PageLayout } from "@/components/tailwind/page-layout";
import { LoginForm } from "@/features/auth/login-form";
import type { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <PageLayout className="flex h-full items-center justify-center">
      <LoginForm />
    </PageLayout>
  );
}
