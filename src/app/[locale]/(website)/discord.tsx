import Image from "next/image";
import { Heading } from "@/src/app/[locale]/components/heading";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { LinkButton } from "@/src/app/[locale]/components/link-button";
import { Card } from "@/src/app/[locale]/components/card";
import discordImage from "../../../../public/assets/discord-image.webp";
import discordImageEn from "../../../../public/assets/discord-image-en.webp";
import { useLocale, useTranslations } from "next-intl";

export function Discord() {
  const t = useTranslations("Discord");
  const locale = useLocale();

  const discordImageSrc = locale === "en" ? discordImageEn : discordImage;
  return (
    <PageWrapper>
      <>
        <Card bgColor="bg-yellow">
          <div className="flex flex-col-reverse lg:flex-row items-left lg:items-center justify-start gap-5 md:gap-10">
            <div className="h-full lg:basis-3/5">
              <Image
                src={discordImageSrc}
                width={800}
                height={800}
                alt="Discord Image"
                className="w-full max-h-4/5 object-cover rounded-2xl"
                placeholder="blur"
              />
            </div>
            <div className="flex flex-col justify-start gap-4 grow basis-2/5">
              <Image
                src="/assets/discord-icon.svg"
                width={50}
                height={50}
                alt="Discord Icon"
                className="object-cover"
              />
              <Heading size="sm" className="max-w-72">
                {t("title")}
              </Heading>

              <Paragraph size="lg" className="max-w-md">
                {t("description")}
              </Paragraph>
              <div>
                <LinkButton
                  size="md"
                  variant="secondary"
                  href={"https://forms.gle/camdd2joyHi9kAZt5"}
                  isExternal
                  showIcon
                >
                  {t("cta")}
                </LinkButton>
              </div>
            </div>
          </div>
        </Card>
      </>
    </PageWrapper>
  );
}
