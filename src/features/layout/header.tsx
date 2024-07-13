import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "../auth/user-button";
import { ThemeToggle } from "../theme/theme-toggle";

export const Header = () => {
  return (
    <header className="col-span-full flex items-center justify-between border-b px-8 py-3">
      <Link className="flex items-center gap-3" href="/">
        <Image
          src="/images/logo.svg"
          alt="InsidePSBS logo"
          width={40}
          height={40}
        />
        <Typography variant="h3">InsidePSBS</Typography>
      </Link>
      <div className="flex items-center space-x-2">
        {" "}
        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  );
};
