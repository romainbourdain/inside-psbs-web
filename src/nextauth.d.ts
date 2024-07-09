/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      email: string;
      user_name: string;
      token: string;
    };
  }
}
