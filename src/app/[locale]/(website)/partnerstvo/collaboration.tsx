import { Heading } from "@/src/app/[locale]/components/heading";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Collaboration() {
  const t = useTranslations("Partners.collaboration");
  return (
    <PageWrapper bgColor="bg-blue">
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <div className="flex flex-col gap-6 basis-1/2 max-w-96">
          <Heading size="lg" className="text-left">
            {t("title")}
          </Heading>
        </div>
        <div className="flex flex-col gap-4 basis-1/2">
          <div className="flex gap-2 items-baseline md:items-center">
            <Image
              src="/assets/bullet.svg"
              width={36}
              height={36}
              alt="Bullet illustration"
              className="h-3 w-3"
            />
            <Paragraph size="lg" weight="bold">
              {t("options.0")}
            </Paragraph>
          </div>
          <div className="flex gap-2 items-baseline md:items-center">
            <Image
              src="/assets/bullet.svg"
              width={36}
              height={36}
              alt="Bullet illustration"
              className="h-3 w-3"
            />
            <Paragraph size="lg" weight="bold">
              {t("options.1")}
            </Paragraph>
          </div>
          <div className="flex gap-2 items-baseline md:items-center">
            <Image
              src="/assets/bullet.svg"
              width={36}
              height={36}
              alt="Bullet illustration"
              className="h-3 w-3"
            />
            <Paragraph size="lg" weight="bold">
              {t("options.2")}
            </Paragraph>
          </div>
          <div className="flex gap-2 items-baseline md:items-center">
            <Image
              src="/assets/bullet.svg"
              width={36}
              height={36}
              alt="Bullet illustration"
              className="h-3 w-3"
            />
            <Paragraph size="lg" weight="bold">
              {t("options.3")}
            </Paragraph>
          </div>
          <div className="flex gap-2 items-baseline md:items-center">
            <Image
              src="/assets/bullet.svg"
              width={36}
              height={36}
              alt="Bullet illustration"
              className="h-3 w-3"
            />
            <Paragraph size="lg" weight="bold">
              {t("options.4")}
            </Paragraph>
          </div>
          <div className="flex gap-2 items-baseline md:items-center">
            <Image
              src="/assets/bullet.svg"
              width={36}
              height={36}
              alt="Bullet illustration"
              className="h-3 w-3"
            />
            <Paragraph size="lg" weight="bold">
              {t("options.5")}
            </Paragraph>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
