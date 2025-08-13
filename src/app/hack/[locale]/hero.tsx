import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { useTranslations } from "next-intl";
import { Button } from "./components/button";
import { IconArrowRight } from "@tabler/icons-react";
import { formatDate, formatDayOfDate } from "../../utils/date";
import UnicornScene from "unicornstudio-react/next";

export function Hero() {
  const startDate = "2025-11-28";
  const endDate = "2025-11-29";

  const formattedTime = `${formatDayOfDate(startDate)} - ${formatDate(endDate)}`;

  const t = useTranslations("Hackathon");
  return (
    <div className="box-border max-w-full relative">
      <UnicornScene
        projectId="37S3ad8JDraTZQd2BVQn"
        width="100%"
        height="100vh"
      />
      <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col gap-8 px-5 md:px-20 py-10 md:py-20 items-center justify-center">
        <div>
          <h1 className="font-paragraph font-extrabold text-white text-7xl text-center tracking-tight">
            {t("title")}
          </h1>
          <h1 className="font-paragraph font-extrabold text-white text-7xl text-center tracking-tight">
            {t("slogan")}
          </h1>
        </div>
        <Paragraph size="xl" color="white" weight="semiBold">
          {`${formattedTime} 📍 ${t("location")}`}
        </Paragraph>
        <Button variant="primary" iconRight={IconArrowRight} size="lg">
          {t("main_cta")}
        </Button>
      </div>
    </div>
  );
}
