import { z } from "zod";

export const OrganizationSchema = z.object({
  id: z.number(),
  short_name: z.string(),
  user_name: z.string().optional(),
  name: z.string(),
  logo_url: z.string().url(),
});

export const GetOrganizationsSchema = z.object({
  associations: z.array(OrganizationSchema),
  clubs: z.array(OrganizationSchema),
});

export const DetailedOrganizationSchema = z.object({
  organization: z.object({
    id: z.number(),
    short_name: z.string(),
    name: z.string(),
    user_name: z.string().optional(),
    description: z.string(),
    website_link: z.string().url().optional(),
    facebook_link: z.string().url().optional(),
    twitter_link: z.string().url().optional(),
    instagram_link: z.string().url().optional(),
    discord_link: z.string().url().optional(),
    email: z.string().email().optional(),
    logo_url: z.string().url(),
  }),
  members: z.array(
    z.object({
      id: z.number(),
      first_name: z.string(),
      last_name: z.string(),
      avatar_url: z.string().url().optional(),
    })
  ),
});
