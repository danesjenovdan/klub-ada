import { Heading } from "@/src/app/[locale]/components/heading";
import { LinkButton } from "@/src/app/[locale]/components/link-button";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { useTranslations } from "next-intl";

export function BecomePartner() {
  const t = useTranslations("Partners");

  return (
    <PageWrapper>
      <div className="flex p-8 md:p-16 lg:p-20 bg-blue grow rounded-2xl border border-black">
        <div className="flex flex-col gap-10 md:flex-row justify-between items-center w-full">
          <div className="flex flex-col gap-3 md:gap-6">
            <Heading size="lg">{t("join.title")}</Heading>
            <Paragraph size="xl">
              {t("join.write_to_us")}
              <a
                href="mailto:info@klub-ada.si"
                className="text-white font-medium"
              >
                info@klub-ada.si
              </a>
            </Paragraph>
          </div>
          <div className="flex justify-start md:justify-end w-full md:w-auto items-start self-start">
            <LinkButton
              size="md"
              variant="secondary"
              href="mailto:info@klub-ada.si"
              isExternal
              showIcon
            >
              {t("cta")}
            </LinkButton>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
