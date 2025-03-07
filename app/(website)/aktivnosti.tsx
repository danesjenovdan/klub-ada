"use client";

import { ActivityCard } from "../components/activity-card";
import { Heading } from "../components/heading";
import { PageWrapper } from "../components/page-wrapper";
import { Paragraph } from "../components/paragraph";
import { SanityDocument } from "next-sanity";
import imageLoader from "../utils/image-loader";
import { LinkButton } from "../components/link-button";
import { useSanityData } from "../utils/use-sanity-data";
import EventSkeleton from "../components/event-skeleton";

const ACTIVITIES_QUERY = `*[
  _type == "activity"] | order(_updatedAt desc)`;

export function Aktivnosti() {
  const { data, error, isLoading } = useSanityData({
    query: ACTIVITIES_QUERY,
  });

  const activities = (data || []) as SanityDocument[];

  if (!error) {
    return null;
  }

  return (
    <PageWrapper>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Heading size="lg">{"Aktivnosti"}</Heading>
              <Paragraph size="lg">
                {"Preberi si vse aktivnosti, ki jih ponujamo."}
              </Paragraph>
            </div>
            <div>
              <LinkButton
                size="md"
                variant="secondary"
                href="https://linktr.ee/klubada"
                isExternal
                showIcon
              >
                Koledar aktivnosti
              </LinkButton>
            </div>
          </div>
          {isLoading ? (
            <>
              {[0, 1, 2, 3, 4].map((element) => (
                <EventSkeleton key={element} />
              ))}
            </>
          ) : (
            <>
              {activities.map(({ name, description, activityImage }) => {
                const imageSrc = imageLoader(activityImage);
                return (
                  <div className="col-span-1" key={name}>
                    <ActivityCard
                      title={name}
                      description={description}
                      imageSrc={imageSrc}
                      imageAlt={activityImage.alt || "Placeholder alt"}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
