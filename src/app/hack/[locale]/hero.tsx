import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { useTranslations } from "next-intl";
import { formatDate, formatDayOfDate } from "../../utils/date";
import { LinkButton } from "./components/link-button";

export function Hero() {
  const startDate = "2025-11-22";
  const endDate = "2025-11-23";

  const formattedTime = `${formatDayOfDate(startDate)} - ${formatDate(endDate)}`;

  const t = useTranslations("Hackathon");

  return (
    <section className="relative min-h-[100vh] w-full flex flex-col gap-4 md:gap-7 px-5 md:px-20 py-10 md:py-20 items-center justify-center">
      <div className="absolute top-4 right-4">
        <LinkButton showIcon href="/treasure-hunt" size="sm">
          {t("treasure_hunt.title")}
        </LinkButton>
      </div>
      <div>
        <h1 className="font-paragraph font-extrabold text-white md:text-6xl text-5xl text-center tracking-tight">
          {t("title")}
        </h1>
        <h1 className="font-paragraph font-extrabold text-white md:text-6xl text-5xl text-center tracking-tight">
          {t("slogan")}
        </h1>
      </div>
      <Paragraph
        className="hidden md:block"
        size="lg"
        color="white"
        weight="semiBold"
      >
        {`${formattedTime} 📍 ${t("location")}`}
      </Paragraph>
      <div className="flex flex-col items-center md:hidden">
        <Paragraph size="xl" color="white" weight="semiBold">
          {formattedTime}
        </Paragraph>
        <Paragraph
          size="xl"
          color="white"
          weight="semiBold"
          className="text-center"
        >
          {`📍 ${t("location")}`}
        </Paragraph>
      </div>
      <LinkButton
        variant="primary"
        showIcon
        size="lg"
        isExternal
        href="https://www.eventbrite.com/e/adahack-code-for-change-tickets-1758539983429"
      >
        {t("main_cta")}
      </LinkButton>
    </section>
  );
}
