import type { DefaultSession } from "next-auth";
import "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  first_name: string;
  last_name: string;
  user_name: string;
  phone: string;
  sector_id: number;
  promotion_year: number;
  created_at: string;
  updated_at: string;
  token: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  interface User {
    id: string;
    token: string;
    user_name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends JWT {
    id: string;
    auth_token: string;
    user_name: string;
  }
}
