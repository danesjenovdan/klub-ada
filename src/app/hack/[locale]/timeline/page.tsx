"use client";

import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import { isSameDay, parseISO } from "date-fns";
import { Heading } from "@/src/app/[locale]/components/heading";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { formatTime } from "@/src/app/utils/date";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import { Window } from "../components/window";

const GET_TIMELINE_ITEMS = `*[
  _type == "hackathonTimelineItem"
] | order(time) {
  'title': coalesce(label[$language], label.sl),
  time,
  endTime
}`;

type TimelineItem = {
  title: string;
  time: string;
  endTime?: string;
};

/** Whether `now` falls inside the slot starting at `time` and ending at `end`. */
const isNow = (time: string, end?: string) => {
  const now = new Date();
  const start = parseISO(time);
  if (end) return now >= start && now <= parseISO(end);
  return now >= start && isSameDay(now, start);
};

/** Days in the order they appear in the (time-ordered) list of items. */
function groupByDay(items: TimelineItem[]) {
  return items.reduce<TimelineItem[][]>((days, item) => {
    const lastDay = days[days.length - 1];
    if (lastDay && isSameDay(parseISO(lastDay[0].time), parseISO(item.time))) {
      lastDay.push(item);
    } else {
      days.push([item]);
    }
    return days;
  }, []);
}

export default function Page() {
  const t = useTranslations("Hackathon");
  const locale = useLocale();
  const { data } = useSanityData({
    query: GET_TIMELINE_ITEMS,
    params: { language: locale },
  });

  const days = groupByDay((data || []) as TimelineItem[]);

  return (
    <Window title={t("pages.timeline")}>
      {days.length === 0 ? (
        <p className="font-paragraph text-base">{t("main_cta")}</p>
      ) : (
        <div className="flex flex-wrap gap-6 max-w-[1000px] mx-auto">
          {days.map((items) => (
            <div
              key={items[0].time}
              className="shrink-0 grow min-w-[300px] border border-red shadow-shineRed rounded-lg p-6 flex flex-col gap-4"
            >
              <Heading size="sm" color="white">
                {new Date(items[0].time).toLocaleDateString(locale, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </Heading>
              <div>
                {items.map(({ time, endTime, title }, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "border-l px-4 py-2",
                      isNow(time, endTime || items[index + 1]?.time)
                        ? "border-red"
                        : "border-gray500",
                    )}
                  >
                    <Paragraph size="lg" color="lightGray">
                      {`${formatTime(time)}${endTime ? ` - ${formatTime(endTime)}` : ""}`}
                    </Paragraph>
                    <Paragraph size="lg" color="white">
                      {title}
                    </Paragraph>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Window>
  );
}
