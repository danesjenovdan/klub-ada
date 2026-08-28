import { useTranslations } from "next-intl";
import { PageWrapper } from "./components/page-wrapper";
import { Heading } from "../../[locale]/components/heading";
import { ImageStat } from "./components/image-stat";
import stat1Src from "../../../../public/assets/hack-stat-1.png";
import stat2Src from "../../../../public/assets/hack-stat-2.png";
import stat3Src from "../../../../public/assets/hack-stat-3.png";

export function Stats() {
  const t = useTranslations("Hackathon");

  return (
    <PageWrapper>
      <div className="flex flex-col gap-8 md:gap-14 items-center w-full py-4 md:py-5 lg:py-10">
        <Heading
          className="font-paragraph"
          color="white"
          size="lg"
          textAlign="center"
        >
          {t.rich("numbers.title", {
            numbers: (chunks) => (
              <Heading
                isSpan
                className="font-paragraph"
                color="red"
                size="lg"
                textAlign="center"
              >
                {chunks}
              </Heading>
            ),
          })}
        </Heading>
        <div className="flex gap-4 md:gap-6 flex-wrap items-stretch justify-center w-full px-4 md:px-0">
          <ImageStat
            src={stat1Src}
            label={t("numbers.participants")}
            stat="80"
          />
          <ImageStat src={stat2Src} label={t("numbers.sponsors")} stat="25" />
          <ImageStat src={stat3Src} label={t("numbers.awards")} stat="4000€" />
        </div>
      </div>
    </PageWrapper>
  );
}
