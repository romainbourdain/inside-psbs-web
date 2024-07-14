import { cardVariants } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type OrganizationCardProps = {
  id: number;
  src: string;
  name: string;
  full_name: string;
};

export const OrganizationCard = ({
  id,
  src,
  name,
  full_name,
}: OrganizationCardProps) => (
  <Link
    className={cn(
      cardVariants({ variant: "clickable" }),
      "flex w-full items-center px-4 py-2"
    )}
    href={`/organizations/${id}`}
  >
    <div className="flex w-full items-center gap-3">
      <Image
        src={src}
        alt={`${name} logo`}
        width={50}
        height={50}
        className="rounded-full"
      />
      <div>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="base" className="line-clamp-1">
          {full_name}
        </Typography>
      </div>
    </div>
    <ChevronRight size={20} className="md:hidden" />
  </Link>
);
