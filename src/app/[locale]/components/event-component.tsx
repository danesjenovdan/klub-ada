"use client";
import React, { useMemo } from "react";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import Image from "next/image";
import { Event } from "../../utils/interface";
import imageLoader from "../../utils/image-loader";
import { formatDate } from "../../utils/date";
import { Link } from "./link";
import { useSanityData } from "../../utils/use-sanity-data";
import { LinkDiv } from "./post-component";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Blog");
  const imageSrc = imageLoader(event.eventImage);
  const formattedDate = formatDate(event.eventTime);
  const params = useMemo(() => ({ eventId: event._id }), []);
  const { data } = useSanityData({
    query: EVENT_BLOG_QUERY,
    params,
  });

  const blogPost = (data || []) as EventBlogPost[];

  const Content = (
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
              <LinkDiv variant="secondary">{t("cta_blog_post")}</LinkDiv>
            )}
          </div>
          {blogPost.length > 0 && (
            <Image
              src="/assets/chevron-right-red.svg"
              width={24}
              height={24}
              alt="Chevron right illustration"
              className="cover-image"
            />
          )}
        </div>
      </div>
    </div>
  );

  return blogPost.length > 0 ? (
    <Link
      href={`/blog/${blogPost[0].slug.current}`}
      className="block h-full group"
    >
      {Content}
    </Link>
  ) : (
    Content
  );
}
