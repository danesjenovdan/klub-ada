import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { anaheim, lilex } from "@/src/app/fonts";
import "@/src/app/[locale]/globals.css";
import { Navbar } from "./components/navbar";
import { Desktop } from "./components/desktop";
import { raised } from "./components/bevel";
import clsx from "clsx";
import { DataToggle } from "./_dev/data-toggle";

export const metadata: Metadata = {
  title: "Klub Ada - Hackathon",
  description: "Community for women in tech in Slovenia - Hackathon",
  openGraph: {
    type: "website",
    title: "Klub Ada - Hackathon",
    description: "Community for women in tech in Slovenia - Hackathon",
    url: "https://hack.klub-ada.si",
    siteName: "Klub Ada Hackathon",
    images: [
      {
        url: "/assets/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Klub Ada - Hackathon",
      },
    ],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        // The site is one maximised window: a raised grey frame holding the
        // navbar (its title bar) and the desktop sunk in below it.
        className={clsx(
          anaheim.className,
          lilex.variable,
          raised,
          "bg-gray200 antialiased h-screen flex flex-col overflow-hidden",
        )}
      >
        <NextIntlClientProvider locale={locale}>
          <Navbar />
          <Desktop>{children}</Desktop>
          {process.env.NODE_ENV === "development" && <DataToggle />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
