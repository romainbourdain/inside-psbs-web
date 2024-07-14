"use server";

import { env } from "@/lib/env";
import { ActionError, authenticatedAction } from "@/lib/safe-actions";
import {
  DetailedOrganizationSchema,
  GetOrganizationsSchema,
} from "@/schemas/organizations.schema";
import { z } from "zod";

export const getAllOrganizationsAction = authenticatedAction.action(
  async ({ ctx: { token } }) => {
    const res = await fetch(`${env.API_URL}/api/organization`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new ActionError(`Error on fetching : ${res.statusText}`);

    const data = await res.json();

    const parsedData = GetOrganizationsSchema.safeParse(data.data);
    if (parsedData.error) throw new ActionError(parsedData.error.message);

    return parsedData.data;
  }
);

export const getOrganizationByIdAction = authenticatedAction
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id }, ctx: { token } }) => {
    const res = await fetch(`${env.API_URL}/api/organization/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new ActionError(`Error on fetching : ${res.statusText}`);

    const data = await res.json();

    const parsedData = DetailedOrganizationSchema.safeParse(data);
    if (parsedData.error) throw new ActionError(parsedData.error.message);

    return parsedData.data;
  });
