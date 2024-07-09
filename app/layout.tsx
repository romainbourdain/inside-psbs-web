import { config } from "@/config";
import { cn } from "@/lib/utils";
import type { LayoutParams } from "@/types/next";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
};

export default async function RootLayout({ children }: LayoutParams<{}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" {...config} />
      </head>
      <body className={cn("h-screen overflow-hidden", openSans.className)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
