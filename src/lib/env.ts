import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * ServerSide Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    AUTH_SECRET: z.string(),
    API_URL: z.string(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {},
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    API_URL: process.env.API_URL,
  },
});
