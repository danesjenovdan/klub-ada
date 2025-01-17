import React from "react";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import Image from "next/image";
import { Event } from "../utils/interface";
import imageLoader from "../utils/image-loader";
import { formatDate } from "../utils/date";
import { client } from "@/sanity/lib/client";
import { Link } from "./link";

export async function getEventBlog(eventId: string) {
  const query = `*[_type == "post" && event._ref == $eventId] {
  slug,
}`;
  const data = await client.fetch(query, { eventId });
  return data;
}

interface Props {
  event: Event;
}
export default async function EventComponent({ event }: Props) {
  const imageSrc = imageLoader(event.eventImage);
  const formattedDate = formatDate(event.eventTime);
  const blogPost = await getEventBlog(event._id);

  return (
    <div className="flex flex-col bg-white gap-6 border border-black rounded-2xl p-4 lg:p-6 h-full justify-between">
      <div className="flex flex-col h-full justify-between gap-4">
        <div className="flex flex-col gap-4">
          <Image
            src={imageSrc}
            width={500}
            height={500}
            alt={event.eventImage.alt}
            className="w-full object-cover aspect-[4/3] md:aspect-square rounded-2xl"
          />
          <Paragraph size="md">{formattedDate}</Paragraph>
          <Heading size="xs" lineHeight="tight">
            {event.title}
          </Heading>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {blogPost.length > 0 && (
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
