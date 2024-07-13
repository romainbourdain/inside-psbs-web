import Image from "next/image";
import Link from "next/link";
import { UserButton } from "../auth/user-button";
import { ThemeToggle } from "../theme/theme-toggle";

export type NavbarProps = {
  showUserButton?: boolean;
};

export const Navbar = ({ showUserButton }: NavbarProps) => {
  return (
    <nav className="flex w-full items-center justify-between gap-2 border-b px-5 py-3">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/images/logo.svg"
          alt="InsidePSBS Logo"
          width={40}
          height={40}
        />
        <span className="text-lg font-semibold">Inside PSBS</span>
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {showUserButton && <UserButton />}
      </div>
    </nav>
  );
};
