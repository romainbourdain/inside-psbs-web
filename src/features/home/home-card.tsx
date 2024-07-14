import { cardVariants } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export type HomeCardProps = {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  color: "purple" | "red" | "green" | "orange";
  href: string;
};

export const HomeCard = ({
  icon: Icon,
  title,
  subtitle,
  color,
  href,
}: HomeCardProps) => {
  let className = "";
  switch (color) {
    case "purple":
      className = "bg-purple-100 text-purple-600";
      break;
    case "green":
      className = "bg-green-100 text-green-600";
      break;
    case "orange":
      className = "bg-orange-50 text-orange-600";
      break;
    case "red":
      className = "bg-red-100 text-red-600";
      break;
  }
  return (
    <Link
      href={href}
      className={cn(
        cardVariants({ variant: "clickable" }),
        "flex flex-row items-center gap-3 p-2"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-sm p-2",
          className
        )}
      >
        <Icon size={30} />
      </div>
      <div>
        <Typography variant="large">{title}</Typography>
        <Typography variant="small" className="text-muted-foreground">
          {subtitle}
        </Typography>
      </div>
    </Link>
  );
};
