import { useTranslations } from "next-intl";
import { PageWrapper } from "./components/page-wrapper";
import { Paragraph } from "../../[locale]/components/paragraph";
import { LinkButton } from "./components/link-button";
import Image from "next/image";
import racka from "../../../../public/assets/hackathon/racka.svg";

export function CallToAction() {
  const t = useTranslations("Hackathon");

  return (
    <PageWrapper>
      <div className="flex flex-col gap-4 sm:gap-6 bg-[rgba(255,87,87,0.16)] border border-red shadow-shineRed rounded-lg items-center w-full py-6 sm:py-8 md:py-14 px-4 sm:px-6">
        <Image
          src={racka}
          alt="Duck image"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 object-contain"
        />
        <h1 className="font-paragraph font-extrabold text-white text-2xl sm:text-3xl md:text-5xl text-center tracking-tight max-w-2xl px-2">
          {t("call_to_action.title")}
        </h1>
        <Paragraph
          size="lg"
          weight="medium"
          color="white"
          textAlign="center"
          className="max-w-xl px-2"
        >
          {t("call_to_action.description")}
        </Paragraph>
        <LinkButton
          variant="primary"
          showIcon
          isExternal
          href="https://www.eventbrite.com/e/adahack-code-for-change-tickets-1758539983429"
        >
          {t("main_cta")}
        </LinkButton>
      </div>
    </PageWrapper>
  );
}
