"use client";

import { Heading } from "@/src/app/[locale]/components/heading";
import { InlineError } from "@/src/app/[locale]/components/inline-error";
import { LoadingAnimation } from "@/src/app/[locale]/components/loading-animation";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import TeamMemberComponent from "@/src/app/[locale]/components/team-member-component";
import { TeamMember } from "@/src/app/utils/interface";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Suspense } from "react";

const TEAM_MEMBERS_QUERY = `*[_type == "teamMember" && language == $language]| order(_createdAt){
  image,
  name,
  role,
  bio,
  linkedin,
  _id,
  alt,
}`;

function TeamMembers() {
  const locale = useLocale();
  const { data, error } = useSanityData({
    query: TEAM_MEMBERS_QUERY,
    params: { language: locale },
  });

  const teamMembers = (data || []) as TeamMember[];

  if (error) {
    return (
      <div className="flex w-full">
        <InlineError hasBox />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {teamMembers.map((member) => (
        <div key={member._id} className="col-span-1">
          <TeamMemberComponent member={member} />
        </div>
      ))}
    </div>
  );
}
export default function Team() {
  const t = useTranslations("AboutUs");
  return (
    <PageWrapper>
      <div id="team" className="flex flex-col gap-6 md:gap-12">
        <div className="flex items-center gap-2">
          <Heading size="lg">{t("our")}</Heading>
          <Image
            src="/assets/flower.svg"
            width={100}
            height={100}
            alt="Flower illustration"
            className="w-[50px] md:w-[80px] lg:w-[100]"
          />
          <Heading size="lg">{t("team")}</Heading>
        </div>
        <Suspense
          fallback={
            <div className="w-full pt-32 flex items-center justify-center">
              <LoadingAnimation />
            </div>
          }
        >
          <TeamMembers />
        </Suspense>
      </div>
    </PageWrapper>
  );
}
