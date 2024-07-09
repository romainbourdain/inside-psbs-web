"use client";

import { SignInAction } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export const LoginButton = async () => {
  return (
    <Button onClick={() => SignInAction()} size="sm">
      <LogIn className="mr-2" />
      Se connecter
    </Button>
  );
};
