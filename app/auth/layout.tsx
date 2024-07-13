import { Navbar } from "@/features/layout/navbar";
import type { LayoutParams } from "@/types/next";

export default async function RouteLayout({ children }: LayoutParams<{}>) {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] overflow-hidden">
      <Navbar />
      <main className="overflow-scroll px-4 py-16">
        <div className="flex min-h-full items-center">{children}</div>
      </main>
    </div>
  );
}
