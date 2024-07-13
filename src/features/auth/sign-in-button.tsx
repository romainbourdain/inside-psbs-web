"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const SignInButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <LoadingButton
      onClick={() => {
        startTransition(() => {
          router.push("/auth/login");
        });
      }}
      size="sm"
      loading={isPending}
    >
      <div className="flex items-center">
        <LogIn size={16} className="mr-2" />
        Se connecter
      </div>
    </LoadingButton>
  );
};
