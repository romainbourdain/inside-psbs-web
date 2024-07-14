import { getAllOrganizationsAction } from "@/actions/organizations.action";
import { PageLayout } from "@/components/tailwind/page-layout";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { OrganizationCard } from "@/features/organizations/organization-card";
import type { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  const data = await getAllOrganizationsAction(null);
  if (!data?.data)
    return (
      <Card variant="destructive">
        <CardHeader>
          <CardTitle>Une erreur est survenue</CardTitle>
          <CardDescription>
            Nous ne parvenons pas à récupérer la liste des clubs et assos
          </CardDescription>
        </CardHeader>
      </Card>
    );

  return (
    <PageLayout className="space-y-6">
      <div className="space-y-2">
        <Typography variant="h2">Associations</Typography>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {data.data.associations.map(({ logo_url, id, short_name, name }) => (
            <OrganizationCard
              key={id}
              id={id}
              src={logo_url}
              name={short_name}
              full_name={name}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Typography variant="h2">Clubs</Typography>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {data.data.clubs.map(({ logo_url, id, short_name, name }) => (
            <OrganizationCard
              key={id}
              id={id}
              src={logo_url}
              name={short_name}
              full_name={name}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
