import Image from "next/image";
import { Card } from "@/src/app/[locale]/components/card";
import { Heading } from "@/src/app/[locale]/components/heading";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { CtaLink } from "@/src/app/[locale]/components/cta-link";
import hero from "../../../../public/assets/hero.webp";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");
  return (
    <PageWrapper hasNoTopPadding hasNoBottomPadding>
      <div className="flex flex-col gap-4 md:flex-row pt-4">
        <div className="flex flex-col gap-4 shrink-1 basis-1/2 lg:basis-2/5">
          <Card bgColor="bg-white">
            <div className="flex flex-col h-full justify-between gap-8">
              <Heading size="lg">{t("title")}</Heading>
              <Paragraph size="lg">{t("description")}</Paragraph>
            </div>
          </Card>
          <div className="block md:hidden">
            <Image
              priority
              src={hero}
              width={768}
              height={150}
              alt="Hero picture"
              className="rounded-2xl max-h-52 object-cover"
              placeholder="blur"
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="basis-1/2">
              <CtaLink label={t("cta_event")} color="red" href="/dogodki" />
            </div>
            <div className="basis-1/2">
              <CtaLink
                label={t("cta_partners")}
                color="blue"
                href="/partnerstvo"
              />
            </div>
          </div>
        </div>
        <div className="hidden md:block grow basis-1/2 lg:basis-3/5">
          <Image
            src={hero}
            width={700}
            height={525}
            alt={t("image_alt")}
            className="rounded-2xl w-full h-full object-cover"
            placeholder="blur"
          />
        </div>
      </div>
    </PageWrapper>
  );
}
