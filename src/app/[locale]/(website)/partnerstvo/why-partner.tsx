import { Heading } from "@/src/app/[locale]/components/heading";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function WhyPartner() {
  const t = useTranslations("Partners.why");
  return (
    <PageWrapper bgColor="bg-blue">
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <div className="flex flex-col gap-6 basis-1/2">
          <Heading size="lg" className="text-left max-w-96">
            {t("title")}
          </Heading>
        </div>
        <div className="flex flex-col gap-6 basis-1/2">
          <Paragraph size="lg">{t("description")}</Paragraph>
          <Paragraph size="lg">{t("description2")}</Paragraph>
          <div className="flex flex-col gap-4">
            <Paragraph size="lg" weight="bold">
              {t("benefits_title")}
            </Paragraph>
            <div className="flex gap-2 items-center">
              <Image
                src="/assets/bullet.svg"
                width={36}
                height={36}
                alt="Bullet illustration"
                className="h-3 w-3"
              />
              <Paragraph size="lg" weight="bold">
                {t("benefits.0")}
              </Paragraph>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/assets/bullet.svg"
                width={36}
                height={36}
                alt="Bullet illustration"
                className="h-3 w-3"
              />
              <Paragraph size="lg" weight="bold">
                {t("benefits.1")}
              </Paragraph>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/assets/bullet.svg"
                width={36}
                height={36}
                alt="Bullet illustration"
                className="h-3 w-3"
              />
              <Paragraph size="lg" weight="bold">
                {t("benefits.2")}
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
