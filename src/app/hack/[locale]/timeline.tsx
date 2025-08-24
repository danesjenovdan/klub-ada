"use client";

import { useLocale, useTranslations } from "next-intl";
import { PageWrapper } from "./components/page-wrapper";
import { Heading } from "../../[locale]/components/heading";
import { Paragraph } from "../../[locale]/components/paragraph";
import { useSanityData } from "../../utils/use-sanity-data";
import { formatTime } from "../../utils/date";
import clsx from "clsx";
import { isWithinInterval, parseISO, isSameDay } from "date-fns";

const GET_TIMELINE_ITEMS = `*[
  _type == "hackathonTimelineItem"
] | order(time) {
  'title': coalesce(label[$language], label.sl),
  time
}`;

const DAY_ONE = "2025-11-28";
const DAY_TWO = "2025-08-14";

const isNow = (time: string, endTime?: string) => {
  const now = new Date();
  const startDate = parseISO(time);

  // If endTime is provided, check if current time is within the interval
  if (endTime) {
    const endDate = parseISO(endTime);
    return isWithinInterval(now, { start: startDate, end: endDate });
  }

  // Otherwise, check if we're past the start time and it's the same day
  return now >= startDate && isSameDay(now, startDate);
};

type TimelineItemProps = {
  time: string;
  title: string;
  isNow?: boolean;
};
export function TimelineItem({
  time,
  title,
  isNow = false,
}: TimelineItemProps) {
  return (
    <div
      className={clsx("border-l px-4 py-2", {
        "border-red": isNow,
        "border-gray500": !isNow,
      })}
    >
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
  console.log(items);
  const dayOneItems =
    items?.filter(({ time }) => time.split("T")[0] === DAY_ONE) || [];
  const dayTwoItems =
    items?.filter(({ time }) => time.split("T")[0] === DAY_TWO) || [];
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
        <div className="flex flex-wrap max-w-[1000px] gap-6 w-full">
          <div className="shrink-0 grow min-w-[300px] border border-red shadow-shineRed rounded-lg p-8 flex flex-col gap-4">
            <Heading size="sm" color="white">
              {t("saturday")}
            </Heading>
            <div>
              {dayOneItems.map(({ time, title }, index) => {
                const formattedTime = formatTime(time);
                const nextTime = dayOneItems[index + 1]?.time;
                const isNowTime = isNow(time, nextTime);
                return (
                  <TimelineItem
                    key={time}
                    time={formattedTime}
                    title={title}
                    isNow={isNowTime}
                  />
                );
              })}
            </div>
          </div>
          <div className="shrink-0 grow min-w-[300px] border border-red shadow-shineRed rounded-lg p-8 flex flex-col gap-4">
            <Heading size="sm" color="white">
              {t("sunday")}
            </Heading>
            <div>
              {dayTwoItems.map(({ time, title }, index) => {
                const formattedTime = formatTime(time);
                const nextTime = dayTwoItems[index + 1]?.time;
                const isNowTime = isNow(time, nextTime);
                return (
                  <TimelineItem
                    key={time}
                    time={formattedTime}
                    title={title}
                    isNow={isNowTime}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
