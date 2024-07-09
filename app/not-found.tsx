import { Page404 } from "@/pages/page-404";
import type { ErrorParams } from "@/types/next";

export default function RouteError({ error, reset }: ErrorParams) {
  return <Page404 />;
}
