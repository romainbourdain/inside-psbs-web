"use client";

import { signOutAction } from "@/actions/auth.action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LucideIcon } from "lucide-react";
import { Bell, LayoutGrid, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export type UserDropdownProps = PropsWithChildren<{}>;

export const UserDropdown = ({ children }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownLink href="/home" icon={LayoutGrid} label="Application" />
        <DropdownLink href="/notifications" icon={Bell} label="Notifications" />
        <DropdownLink href="/settings" icon={Settings} label="Paramètres" />
        <DropdownMenuItem onClick={() => signOutAction(null)}>
          <LogOut size={16} className="mr-2" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DropdownLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) => (
  <DropdownMenuItem asChild>
    <Link href={href} className="flex items-center">
      <Icon size={16} className="mr-2" />
      {label}
    </Link>
  </DropdownMenuItem>
);
