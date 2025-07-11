import { Heading } from "@/src/app/[locale]/components/heading";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { StatsCard } from "@/src/app/[locale]/components/stats-card";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Statistics() {
  const t = useTranslations("Partners.stats");
  return (
    <PageWrapper>
      <div
        id="become-partner"
        className="flex flex-col pb-10 md:pb-20 px-8 md:px-16 gap-6 items-center"
      >
        <Image
          src="/assets/heart.svg"
          width={50}
          height={50}
          alt="Blog illustration"
          className="max-h-100 w-auto object-cover"
        />
        <Heading size="lg" className="text-center max-w-md">
          {t("title")}
        </Heading>
      </div>
      <div>
        <div className="grid gap-4 md:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <StatsCard number="430+" label={t("insta_followers")} />
          <StatsCard number="380+" label={t("linkedin_followers")} />
          <StatsCard number="200+" label={t("newsletter")} />
          <StatsCard number="120+" label={t("discord_members")} />
          <StatsCard number="12+" label={t("companies")} />
        </div>
      </div>
    </PageWrapper>
  );
}
