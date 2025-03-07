"use client";

import Image from "next/image";
import { Heading } from "../components/heading";
import { PageWrapper } from "../components/page-wrapper";
import { Card } from "../components/card";
import { Paragraph } from "../components/paragraph";
import imageLoader from "../utils/image-loader";
import { LinkButton } from "../components/link-button";
import { formatDate, formatTime } from "../utils/date";
import { usePathname } from "next/navigation";
import { LoadingAnimation } from "../components/loading-animation";
import { InlineError } from "../components/inline-error";
import { useSanityData } from "../utils/use-sanity-data";

interface EventData {
  title: string;
  description: string;
  eventImage: { src: string; alt: string };
  location: string;
  applyLink: string;
  eventTime: string;
}

const NEXT_EVENT_QUERY = `*[
  _type == "event" && eventTime >= $today
] | order(eventTime) [0] {title, description, eventImage, location, applyLink, eventTime}`;

function NextEventContent() {
  const today = new Date().toISOString().split("T")[0];
  const { data, error, isLoading } = useSanityData({
    query: NEXT_EVENT_QUERY,
    params: { today },
  });

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex w-full justify-center">
        <InlineError />
      </div>
    );
  }

  const nextEvent = data as EventData;
  const imageSrc = imageLoader(nextEvent.eventImage);
  const date = formatDate(nextEvent.eventTime);
  const time = formatTime(nextEvent.eventTime);
  const formattedDateAndTime = [date, time].join(" ");

  return (
    <div className="md:flex gap-8 md:items-center">
      <div className="h-full lg:basis-2/5">
        <Image
          src={imageSrc}
          width={500}
          height={500}
          alt={nextEvent.eventImage.alt || "Placeholder alt"}
          className="w-full object-cover aspect-square rounded-2xl"
        />
      </div>
      <div className="flex flex-col pt-4 gap-6 md:gap-12 justify-center grow">
        <div className="flex flex-col gap-3">
          <Paragraph size="lg">
            {`${formattedDateAndTime} @ ${nextEvent.location}`}
          </Paragraph>
          <Heading size="sm">{nextEvent.title}</Heading>
          <Paragraph size="lg" className="max-w-xl">
            {nextEvent.description}
          </Paragraph>
        </div>
        <div className="">
          <LinkButton size="md" showIcon href={nextEvent.applyLink} isExternal>
            Prijavi se
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
export function NextEvent() {
  const pathname = usePathname();

  return (
    <PageWrapper bgColor="bg-red">
      <div id="next-event" className="flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="max-w-sm md:max-w-xl">
            <Heading size="lg">{"Pridi na naš naslednji dogodek!"}</Heading>
          </div>
          {pathname !== "/dogodki" && (
            <div className="">
              <LinkButton size="md" variant="secondary" href="/dogodki">
                Vsi dogodki
              </LinkButton>
            </div>
          )}
        </div>
        <Card bgColor="bg-red100">
          <NextEventContent />
        </Card>
      </div>
    </PageWrapper>
  );
}
