"use client";

import { SignOutAction } from "@/actions/auth.action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import type { PropsWithChildren } from "react";

export type UserDropdownProps = PropsWithChildren<{}>;

export const UserDropdown = ({ children }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => SignOutAction()}>
          <LogOut className="mr-2" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
