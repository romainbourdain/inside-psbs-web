"use client";

import { SignInAction } from "@/actions/auth.action";
import type { PageParams } from "@/types/next";

export default function RoutePage(props: PageParams<{}>) {
  return (
    <form action={async (formData) => SignInAction()}>
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
