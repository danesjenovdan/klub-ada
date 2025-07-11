"use client";

import { ActivityCard } from "@/src/app/[locale]/components/activity-card";
import { Heading } from "@/src/app/[locale]/components/heading";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { SanityDocument } from "next-sanity";
import imageLoader from "@/src/app/utils/image-loader";
import { LinkButton } from "@/src/app/[locale]/components/link-button";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import Skeleton from "@/src/app/[locale]/components/skeleton";
import { useTranslations } from "next-intl";

const ACTIVITIES_QUERY = `*[
  _type == "activity"] | order(_updatedAt desc)`;

export function Aktivnosti() {
  const t = useTranslations();
  const { data, error, isLoading } = useSanityData({
    query: ACTIVITIES_QUERY,
  });

  const activities = (data || []) as SanityDocument[];

  if (error) {
    return null;
  }

  return (
    <PageWrapper>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Heading size="lg">{t("Activities.title")}</Heading>
              <Paragraph size="lg">{t("Activities.description")}</Paragraph>
            </div>
            <div>
              <LinkButton
                size="md"
                variant="secondary"
                href="https://linktr.ee/klubada"
                isExternal
                showIcon
              >
                {t("Activities.cta")}
              </LinkButton>
            </div>
          </div>
          {isLoading ? (
            <>
              {[0, 1, 2, 3, 4].map((element) => (
                <Skeleton key={element} />
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
                      imageAlt={activityImage.alt || t("Common.image_alt")}
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
