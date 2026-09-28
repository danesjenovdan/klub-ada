"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { Heading } from "@/src/app/[locale]/components/heading";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import { Window } from "../components/window";

const GET_REWARDS = `*[_type == "hack26Reward"] | order(_createdAt) {
  'title': coalesce(title[$language], title.sl),
  'subtitle': coalesce(subtitle[$language], subtitle.sl),
  'amount': coalesce(amount[$language], amount.sl),
  isMain
}`;

type PrizeItemProps = {
  amount: string;
  title: string;
  subtitle?: string;
  isMain?: boolean;
};

function PrizeItem({ amount, title, subtitle, isMain }: PrizeItemProps) {
  return (
    <div
      className={clsx(
        "rounded-md p-8 gap-2 shrink-0 grow flex border-red border flex-col max-w-full min-w-[48%] min-h-44 md:min-h-48 items-center justify-center",
        isMain && "bg-[rgba(255,87,87,0.16)] shadow-shineRed",
      )}
    >
      <Paragraph size="xl" color="white">
        {title}
      </Paragraph>
      {subtitle && (
        <Paragraph size="lg" color="lightGray" textAlign="center">
          {subtitle}
        </Paragraph>
      )}
      <Heading className="font-paragraph" color="white" size="lg">
        {amount}
      </Heading>
    </div>
  );
}

export default function Page() {
  const t = useTranslations("Hackathon");
  const locale = useLocale();
  const { data } = useSanityData({
    query: GET_REWARDS,
    params: { language: locale },
  });

  const rewards = (data || []) as PrizeItemProps[];
  const main = rewards.filter(({ isMain }) => isMain);
  const others = rewards.filter(({ isMain }) => !isMain);

  return (
    <Window title={t("pages.rewards")}>
      {rewards.length ? (
        <div className="flex flex-col gap-4 max-w-[1000px] mx-auto">
          {main.map((reward) => (
            <PrizeItem key={reward.title} {...reward} />
          ))}
          <div className="flex items-stretch flex-wrap gap-4">
            {others.map((reward) => (
              <PrizeItem key={reward.title} {...reward} />
            ))}
          </div>
        </div>
      ) : (
        <p className="font-paragraph text-base">{t("main_cta")}</p>
      )}
    </Window>
  );
}
