import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export type NavbarProps = PropsWithChildren<{}>;

export const Navbar = ({ children }: NavbarProps) => {
  return (
    <nav className="col-span-full flex w-full items-center justify-between gap-2 border-b px-5 py-3">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/images/logo.svg"
          alt="InsidePSBS Logo"
          width={40}
          height={40}
        />
        <span className="text-lg font-semibold">Inside PSBS</span>
      </Link>
      <div className="flex items-center gap-2">{children}</div>
    </nav>
  );
};
