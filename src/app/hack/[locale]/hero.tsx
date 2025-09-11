import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { useTranslations } from "next-intl";
import { Button } from "./components/button";
import { IconArrowRight } from "@tabler/icons-react";
import { formatDate, formatDayOfDate } from "../../utils/date";
import UnicornScene from "unicornstudio-react/next";
import { LinkButton } from "./components/link-button";

export function Hero() {
  const startDate = "2025-11-22";
  const endDate = "2025-11-23";

  const formattedTime = `${formatDayOfDate(startDate)} - ${formatDate(endDate)}`;

  const t = useTranslations("Hackathon");

  return (
    <section className="box-border bg-[#000] max-w-full min-h-[100vh] relative">
      <div className="hidden md:block">
        <UnicornScene
          projectId="37S3ad8JDraTZQd2BVQn"
          width="100%"
          height="100vh"
        />
      </div>
      <div className="block md:hidden absolute inset-0">
        <video
          className="w-full h-full object-cover bg-black"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23000000'/%3E%3C/svg%3E"
        >
          <source
            src="/assets/hackathon/hackathon-loop.webm"
            type="video/webm"
          />
        </video>
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col gap-8 px-5 md:px-20 py-10 md:py-20 items-center justify-center">
        <div>
          <h1 className="font-paragraph font-extrabold text-white text-7xl text-center tracking-tight">
            {t("title")}
          </h1>
          <h1 className="font-paragraph font-extrabold text-white text-7xl text-center tracking-tight">
            {t("slogan")}
          </h1>
        </div>
        <Paragraph
          className="hidden md:block"
          size="xl"
          color="white"
          weight="semiBold"
        >
          {`${formattedTime} 📍 ${t("location")}`}
        </Paragraph>
        <div className="flex flex-col items-center md:hidden">
          <Paragraph size="xl" color="white" weight="semiBold">
            {formattedTime}
          </Paragraph>
          <Paragraph size="xl" color="white" weight="semiBold">
            {`📍 ${t("location")}`}
          </Paragraph>
        </div>
        <LinkButton
          variant="primary"
          showIcon
          size="lg"
          isExternal
          href="https://www.eventbrite.com/e/hekaton-adahack-code-for-change-tickets-1686598053179"
        >
          {t("main_cta")}
        </LinkButton>
      </div>
    </section>
  );
}
