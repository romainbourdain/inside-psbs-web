"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Calendar,
  CirclePlus,
  Home,
  Megaphone,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { forwardRef } from "react";

export const Sidebar = () => {
  return (
    <aside className="overflow-y-scroll border-r max-lg:hidden">
      <nav className="flex h-full flex-col justify-between p-2">
        <div className="space-y-2">
          <NavLink icon={Home} href="/home">
            Accueil
          </NavLink>
          <NavLink icon={Calendar} href="/calendar">
            Calendrier
          </NavLink>
          <NavLink icon={Megaphone} href="/posts">
            Publications
          </NavLink>
          <NavLink icon={Bell} href="/notifications">
            Notifications
          </NavLink>
          <NavLink icon={Settings} href="/settings">
            Settings
          </NavLink>
        </div>
        <Link href="/create/post" className={buttonVariants({ size: "sm" })}>
          <CirclePlus className="mr-2" size={20} />
          Publier
        </Link>
      </nav>
    </aside>
  );
};

const NavLink = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: LucideIcon }
>(({ href, className, icon: Icon, children, ...props }, ref) => {
  const [segment] = useSelectedLayoutSegments();
  const isActive = href === `/${segment}`;

  return (
    <Link
      ref={ref}
      href={href!}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "flex justify-start text-muted-foreground",
        isActive && "bg-secondary font-bold text-secondary-foreground",
        className
      )}
      {...props}
    >
      <Icon size={20} className="mr-2" />
      {children}
    </Link>
  );
});

NavLink.displayName = "NavLink";
