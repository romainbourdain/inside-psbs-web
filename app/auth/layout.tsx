import { Header } from "@/features/layout/header";
import { auth } from "@/lib/auth";
import type { LayoutParams } from "@/types/next";
import { redirect } from "next/navigation";

export default async function RouteLayout({ children }: LayoutParams<{}>) {
  const session = await auth();

  if (session) {
    redirect("/home");
  }
  return (
    <>
      <Header />
      {children}
    </>
  );
}
