"use client";

import { useTranslations } from "next-intl";
import { PageWrapper } from "./components/page-wrapper";
import { Heading } from "../../[locale]/components/heading";
import { Paragraph } from "../../[locale]/components/paragraph";
import clsx from "clsx";

type PrizeItemProps = {
  amount: number;
  title: string;
  subtitle?: string;
  isMain?: boolean;
};
export function PrizeItem({
  amount,
  title,
  subtitle,
  isMain = false,
}: PrizeItemProps) {
  return (
    <div
      className={clsx(
        "rounded-md p-8 gap-2 shrink-0 grow flex border-red border flex-col max-w-full min-w-[48%] min-h-44 md:min-h-48 items-center justify-center",
        {
          "bg-[rgba(255,87,87,0.16)] shadow-shineRed": isMain,
        }
      )}
    >
      <Paragraph size="xl" color="white">
        {title}
      </Paragraph>
      {subtitle && (
        <Paragraph
          size="lg"
          color="lightGray"
          textAlign="center"
          className="text-wrap"
        >
          {subtitle}
        </Paragraph>
      )}
      <Heading
        className="font-paragraph"
        color="white"
        size="lg"
        textAlign="center"
      >
        {`${amount} EUR`}
      </Heading>
    </div>
  );
}

export function Prizes() {
  const t = useTranslations("Hackathon");

  const challenges = [
    { name: t("challenges.1"), company: "Abelium" },
    { name: t("challenges.2"), company: "Smartis" },
    { name: t("challenges.3"), company: "Epilog" },
    { name: t("challenges.4"), company: "Calda" },
  ];

  return (
    <PageWrapper>
      <div className="flex flex-col gap-8 md:gap-14 items-center w-full py-4 md:py-5 lg:py-10">
        <Heading
          className="font-paragraph"
          color="white"
          size="lg"
          textAlign="center"
        >
          {t("prizes")}
        </Heading>
        <div className="flex flex-col gap-4 max-w-[1000px] w-full">
          <div className="w-full">
            <PrizeItem amount={2000} title={t("winner")} isMain />
          </div>
          <div className="flex items-stretch flex-wrap gap-4">
            {challenges.map(({ name, company }, index) => (
              <PrizeItem
                key={index}
                amount={500}
                title={t("challenge", { company })}
                subtitle={name}
              />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
