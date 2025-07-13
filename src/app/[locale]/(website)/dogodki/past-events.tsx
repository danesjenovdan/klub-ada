"use client";

import EventComponent from "@/src/app/[locale]/components/event-component";
import { Heading } from "@/src/app/[locale]/components/heading";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { Event } from "@/src/app/utils/interface";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import { InlineError } from "@/src/app/[locale]/components/inline-error";
import Skeleton from "@/src/app/[locale]/components/skeleton";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";

const GET_PAST_EVENTS_QUERY = `*[
  _type == "event" && language == $language && eventTime <= $today
] | order(eventTime desc) {
title,
description,
eventImage,
eventTime,
_id,
}`;

function PastEventsContent() {
  const locale = useLocale();
  const t = useTranslations("Events");
  const params = useMemo(
    () => ({ today: new Date().toISOString().split("T")[0], language: locale }),
    []
  );
  const { data, error, isLoading } = useSanityData({
    query: GET_PAST_EVENTS_QUERY,
    params,
  });

  if (isLoading) {
    return [0, 1, 2, 3, 4, 5].map((element) => <Skeleton key={element} />);
  }

  if (error) {
    return (
      <div className="flex w-full justify-center">
        <InlineError />
      </div>
    );
  }

  const events = (data || []) as Event[];

  if (!events.length) {
    return <Paragraph>{t("no_events_found")}</Paragraph>;
  }

  return events.map((event) => (
    <div key={event._id} className="w-full">
      <EventComponent event={event} />
    </div>
  ));
}
export default function PastEvents() {
  const t = useTranslations("Events");
  return (
    <PageWrapper>
      <div className="flex flex-col gap-8 md:gap-16">
        <div className="max-w-sm md:max-w-2xl">
          <Heading size="lg">{t("title_past_events")}</Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PastEventsContent />
        </div>
      </div>
    </PageWrapper>
  );
}
