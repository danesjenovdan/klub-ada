import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { anaheim } from "@/src/app/fonts";
import "@/src/app/[locale]/globals.css";

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
      <body className={`${anaheim.className} antialiased mx-auto`}>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
