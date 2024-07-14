import { UserButton } from "@/features/auth/user-button";
import { Navbar } from "@/features/layout/navbar";
import { ThemeToggle } from "@/features/theme/theme-toggle";
import { auth } from "@/lib/auth";
import type { LayoutParams } from "@/types/next";

export default async function RouteLayout({ children }: LayoutParams<{}>) {
  const session = await auth();
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <Navbar>
        <ThemeToggle />
        <UserButton />
      </Navbar>
      <main>{children}</main>
    </div>
  );
}
