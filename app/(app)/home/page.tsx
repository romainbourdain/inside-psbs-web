import { PageLayout } from "@/components/tailwind/page-layout";
import { Typography } from "@/components/ui/typography";
import { HomeCard } from "@/features/home/home-card";
import type { PageParams } from "@/types/next";
import { Camera, CreditCard, UsersRound, Utensils } from "lucide-react";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <PageLayout className="space-y-5">
      <div className="grid grid-cols-2 gap-2">
        <HomeCard
          icon={CreditCard}
          title="10.00€"
          subtitle="Carte Fouaille"
          color="purple"
          href="/fouaille"
        />
        <HomeCard
          icon={UsersRound}
          title="Clubs et Associations"
          color="green"
          href="/organizations"
        />
        <HomeCard icon={Camera} title="Photos" color="orange" href="/" />
        <HomeCard icon={Utensils} title="Menu du RU" color="red" href="/menu" />
      </div>
      <Typography variant="h2">Actualités</Typography>
    </PageLayout>
  );
}
