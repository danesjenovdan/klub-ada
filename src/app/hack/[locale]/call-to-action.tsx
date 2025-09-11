import { useTranslations } from "next-intl";
import { PageWrapper } from "./components/page-wrapper";
import { Heading } from "../../[locale]/components/heading";
import { Paragraph } from "../../[locale]/components/paragraph";
import { Button } from "./components/button";
import { LinkButton } from "./components/link-button";
import Image from "next/image";
import racka from "../../../../public/assets/hackathon/racka.svg";

export function CallToAction() {
  const t = useTranslations("Hackathon");

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 bg-[rgba(255,87,87,0.16)] border border-red shadow-shineRed rounded-lg items-center w-full py-14 md:py-28 px-6">
        <Image src={racka} alt="Duck image" />
        <h1 className="font-paragraph font-extrabold text-white text-3xl md:text-6xl text-center tracking-tight">
          {t("call_to_action.title")}
        </h1>
        <Paragraph size="xl" weight="medium" color="white" textAlign="center">
          {t("call_to_action.description")}
        </Paragraph>
        <LinkButton
          variant="primary"
          showIcon
          isExternal
          href="https://www.eventbrite.com/e/hekaton-adahack-code-for-change-tickets-1686598053179"
        >
          {t("main_cta")}
        </LinkButton>
      </div>
    </PageWrapper>
  );
}
