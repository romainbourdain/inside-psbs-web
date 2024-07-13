"use server";

import { env } from "@/lib/env";
import { action } from "@/lib/safe-actions";
import { SectorsSchema } from "@/schemas/sectors.schema";

export const getSectorsAction = action.action(async () => {
  const res = await fetch(`${env.API_URL}/api/sector`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sectors");
  }

  const data = await res.json();

  const parsedData = SectorsSchema.safeParse(data.data);

  if (!parsedData.success) {
    throw new Error("Failed to parse sectors data");
  }

  return parsedData.data;
});
