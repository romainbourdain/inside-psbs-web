import { UserButton } from "@/features/auth/user-button";
import { Navbar } from "@/features/layout/navbar";
import { Sidebar } from "@/features/layout/sidebar";
import { ThemeToggle } from "@/features/theme/theme-toggle";
import { auth } from "@/lib/auth";
import type { LayoutParams } from "@/types/next";
import { redirect } from "next/navigation";

export default async function RouteLayout({ children }: LayoutParams<{}>) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }
  return (
    <div className="grid h-screen grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[20%_1fr] xl:grid-cols-[15%_1fr]">
      <Navbar>
        <ThemeToggle />
        <UserButton />
      </Navbar>
      <Sidebar />
      <main className="overflow-y-scroll px-4 py-10">{children}</main>
    </div>
  );
}
