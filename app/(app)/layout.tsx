import { Header } from "@/features/layout/header";
import { Sidebar } from "@/features/layout/sidebar";
import { auth } from "@/lib/auth";
import type { LayoutParams } from "@/types/next";
import { redirect } from "next/navigation";

export default async function RouteLayout({ children }: LayoutParams<{}>) {
  const session = await auth();

  if (!session) redirect("/");
  return (
    <div className="grid h-screen grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[20%_1fr] xl:grid-cols-[15%_1fr]">
      <Header />
      <Sidebar />
      <main className="overflow-y-scroll p-4">{children}</main>
      <nav className="h-12 border-t lg:hidden"></nav>
    </div>
  );
}
