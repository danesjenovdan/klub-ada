"use client";

import { useLocale, useTranslations } from "next-intl";
import { PageWrapper } from "./components/page-wrapper";
import { Heading } from "../../[locale]/components/heading";
import { Paragraph } from "../../[locale]/components/paragraph";
import { useSanityData } from "../../utils/use-sanity-data";
import { formatTime } from "../../utils/date";

const GET_TIMELINE_ITEMS = `*[
  _type == "hackathonTimelineItem"
] | order(time) {
  'title': coalesce(label[$language], label.sl),
  time
}`;

type TimelineItemProps = {
  time: string;
  title: string;
};
export function TimelineItem({ time, title }: TimelineItemProps) {
  return (
    <div className="border-l border-red px-4 py-2">
      <Paragraph size="lg" color="lightGray">
        {time}
      </Paragraph>
      <Paragraph size="lg" color="white">
        {title}
      </Paragraph>
    </div>
  );
}

export function Timeline() {
  const t = useTranslations("Hackathon");
  const locale = useLocale();
  const { data } = useSanityData({
    query: GET_TIMELINE_ITEMS,
    params: { language: locale },
  });

  const items = (data || []) as TimelineItemProps[];
  const dayOneItems =
    items?.filter(({ time }) => time.split("T")[0] === "2025-11-28") || [];
  const dayTwoItems =
    items?.filter(({ time }) => time.split("T")[0] === "2025-11-29") || [];
  return (
    <PageWrapper>
      <div className="flex flex-col gap-8 md:gap-14 items-center w-full py-4 md:py-5 lg:py-10">
        <Heading
          className="font-paragraph"
          color="white"
          size="lg"
          textAlign="center"
        >
          {t("timeline")}
        </Heading>
        <div className="flex flex-wrap max-w-[900px] gap-6 w-full">
          <div className="shrink-0 grow min-w-[300px] border border-red shadow-shineRed rounded-lg p-8 flex flex-col gap-4">
            <Heading size="sm" color="white">
              {t("saturday")}
            </Heading>
            <div>
              {dayOneItems.map(({ time, title }) => {
                const formattedTime = formatTime(time);
                return (
                  <TimelineItem key={time} time={formattedTime} title={title} />
                );
              })}
            </div>
          </div>
          <div className="shrink-0 grow min-w-[300px] border border-red shadow-shineRed rounded-lg p-8 flex flex-col gap-4">
            <Heading size="sm" color="white">
              {t("sunday")}
            </Heading>
            <div>
              {dayTwoItems.map(({ time, title }) => {
                const formattedTime = formatTime(time);
                return (
                  <TimelineItem key={time} time={formattedTime} title={title} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
