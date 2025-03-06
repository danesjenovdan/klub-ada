"use client";

import EventComponent from "@/app/components/event-component";
import { Heading } from "@/app/components/heading";
import { PageWrapper } from "@/app/components/page-wrapper";
import { client } from "@/sanity/lib/client";
import { Event } from "../../utils/interface";
import { useSanityData } from "@/app/utils/use-sanity-data";
import { InlineError } from "@/app/components/inline-error";
import { Suspense } from "react";
import EventSkeleton from "@/app/components/event-skeleton";
import { Paragraph } from "@/app/components/paragraph";

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

export async function getEvents(today: string) {
  const query = `*[
    _type == "event" && eventTime <= $today
  ] | order(eventTime desc) {
  title,
  description,
  eventImage,
  slug,
  eventTime,
  _id,
}`;
  const data = await client.fetch(query, { today });
  return data;
}

function PastEventsContent() {
  const today = new Date().toISOString().split("T")[0];
  const { data, error, isLoading } = useSanityData({
    query: GET_PAST_EVENTS_QUERY,
    params: { today },
  });

  if (isLoading) {
    return [0, 1, 2, 3, 4, 5].map((element) => <EventSkeleton key={element} />);
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
  return (
    <PageWrapper>
      <div className="flex flex-col gap-8 md:gap-16">
        <div className="max-w-sm md:max-w-2xl">
          <Heading size="lg">Pretekli dogodki</Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PastEventsContent />
        </div>
      </div>
    </PageWrapper>
  );
}
