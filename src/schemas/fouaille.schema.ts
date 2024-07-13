import { z } from "zod";

export const fouailleSchema = z.object({
  balance: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  user_name: z.string(),
  orders: z.array(
    z.object({
      date: z.string(),
      total_price: z.string(),
      amount: z.number(),
      product: z
        .object({
          name: z.string(),
          title: z.string(),
          unit_price: z.string(),
          color: z.string(),
        })
        .nullable(),
    })
  ),
});

export type FouailleData = z.infer<typeof fouailleSchema>;
