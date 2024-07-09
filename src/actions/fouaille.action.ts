"use server";

import { env } from "@/lib/env";
import { authenticatedAction } from "@/lib/safe-actions";
import { fouailleSchema } from "@/schemas/fouaille.schema";

export const getFouailleAction = authenticatedAction.action(
  async ({ ctx: token }) => {
    try {
      const res = await fetch(
        `${env.API_URL}/api/fouaille?per_page=10&page=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      const parsedData = fouailleSchema.parse(data.data);

      return parsedData;
    } catch (e) {
      throw e;
    }
  }
);
