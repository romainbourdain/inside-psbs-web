import { Header } from "@/features/layout/header";
import type { LayoutParams } from "@/types/next";

export default async function RouteLayout({ children }: LayoutParams<{}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
