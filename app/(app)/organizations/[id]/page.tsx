import { getOrganizationByIdAction } from "@/actions/organizations.action";
import { PageLayout } from "@/components/tailwind/page-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { SocialButton } from "@/features/organizations/social-button";
import type { PageParams } from "@/types/next";
import { Globe, Mail } from "lucide-react";
import Link from "next/link";
import { FaDiscord, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default async function RoutePage({
  params: { id },
}: PageParams<{ id: string }>) {
  const data = await getOrganizationByIdAction({ id });
  if (!data?.data)
    return (
      <Card variant="destructive">
        <CardHeader>
          <CardTitle>Une erreur est survenue</CardTitle>
          <CardDescription>
            Nous ne parvenons pas à récupérer les données liées au club
          </CardDescription>
        </CardHeader>
      </Card>
    );

  const organization = data.data.organization;

  return (
    <PageLayout className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="size-24">
          <AvatarImage
            src={organization.logo_url}
            alt={`Logo de ${organization.name}`}
          />
          <AvatarFallback className="text-5xl">
            {organization.short_name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="grid w-full grid-cols-1 md:grid-cols-[1fr_auto]">
          <Typography variant="h2" className="col-start-1">
            {organization.short_name}
          </Typography>
          <Typography variant="base" className="col-start-1">
            {organization.name}
          </Typography>
          <div className="flex items-center gap-1 max-md:mt-2 md:col-start-2 md:row-start-1">
            <SocialButton href={organization.website_link}>
              <Globe className="size-full" />
            </SocialButton>
            <SocialButton href={organization.facebook_link}>
              <FaFacebookF className="size-full" />
            </SocialButton>
            <SocialButton href={organization.twitter_link}>
              <FaXTwitter className="size-full" />
            </SocialButton>
            <SocialButton href={organization.instagram_link}>
              <FaInstagram className="size-full" />
            </SocialButton>
            <SocialButton href={organization.discord_link}>
              <FaDiscord className="size-full" />
            </SocialButton>
            <SocialButton href={organization.email}>
              <Mail className="size-full" />
            </SocialButton>
          </div>
        </div>
      </div>
      <Typography variant="muted">{organization.description}</Typography>
      <Typography variant="h3">Membres</Typography>
      <div className="flex gap-2">
        {data.data.members.map(({ id, first_name, last_name, avatar_url }) => (
          <Link key={id} href={`/users/${id}`}>
            <Avatar>
              <AvatarImage
                src={avatar_url}
                alt={`Avatar de ${first_name} ${last_name}`}
              />
              <AvatarFallback>
                {first_name[0].toUpperCase()}
                {last_name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
