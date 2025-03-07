"use client";
import React, { useMemo } from "react";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import Image from "next/image";
import { Event } from "../utils/interface";
import imageLoader from "../utils/image-loader";
import { formatDate } from "../utils/date";
import { client } from "@/sanity/lib/client";
import { Link } from "./link";
import { useSanityData } from "../utils/use-sanity-data";

const EVENT_BLOG_QUERY = `*[_type == "post" && event._ref == $eventId] {
  slug,
}`;

type EventBlogPost = {
  slug: { current: string };
};
interface Props {
  event: Event;
}
export default function EventComponent({ event }: Props) {
  const imageSrc = imageLoader(event.eventImage);
  const formattedDate = formatDate(event.eventTime);
  const params = useMemo(
    () => ({
      eventId: event._id,
    }),
    []
  );
  const { data } = useSanityData({
    query: EVENT_BLOG_QUERY,
    params,
  });

  const blogPost = (data || []) as EventBlogPost[];

  return (
    <div className="flex flex-col bg-white gap-6 border border-black rounded-2xl p-4 lg:p-6 h-full justify-between">
      <div className="flex flex-col h-full justify-between gap-4">
        <div className="flex flex-col gap-4">
          <Image
            src={imageSrc}
            width={500}
            height={500}
            alt={event.eventImage.alt || "Placeholder alt"}
            className="w-full object-cover aspect-[4/3] md:aspect-square rounded-2xl"
          />
          <div className="flex flex-col gap-2">
            <Paragraph size="md">{formattedDate}</Paragraph>
            <Heading size="xs">{event.title}</Heading>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {blogPost?.length > 0 && (
              <Link
                variant="secondary"
                href={`/blog/${blogPost[0].slug.current}`}
              >
                Preberi blog
              </Link>
            )}
          </div>
          {blogPost.length > 0 && (
            <a href={`/blog/${blogPost[0]?.slug?.current}`}>
              <Image
                src="/assets/chevron-right-red.svg"
                width={24}
                height={24}
                alt="Chevron right illustration"
                className="cover-image"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
