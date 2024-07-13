/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      user_name: string;
      token: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    user_name: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends JWT {
    id: string;
    user_name: string;
    auth_token: string;
  }
}
