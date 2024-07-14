import { Navbar } from "@/features/layout/navbar";
import type { LayoutParams } from "@/types/next";

export default async function RouteLayout({ children }: LayoutParams<{}>) {
  return (
    <div className="grid min-h-screen grid-cols-[10%_1fr] grid-rows-[auto_1fr]">
      <Navbar showUserButton />
      <main>{children}</main>
    </div>
  );
}
