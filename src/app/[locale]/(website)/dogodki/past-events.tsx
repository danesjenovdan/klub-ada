"use client";

import EventComponent from "@/src/app/components/event-component";
import { Heading } from "@/src/app/components/heading";
import { PageWrapper } from "@/src/app/components/page-wrapper";
import { Event } from "@/src/app/utils/interface";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import { InlineError } from "@/src/app/components/inline-error";
import Skeleton from "@/src/app/components/skeleton";
import { Paragraph } from "@/src/app/components/paragraph";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

const GET_PAST_EVENTS_QUERY = `*[
  _type == "event" && eventTime <= $today
] | order(eventTime desc) {
title,
description,
eventImage,
slug,
eventTime,
_id,
}`;

function PastEventsContent() {
  const params = useMemo(
    () => ({ today: new Date().toISOString().split("T")[0] }),
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
    return <Paragraph>Na žalost ne najdemo nobenih dogodkov.</Paragraph>;
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
