"use client";

import { useLocale, useTranslations } from "next-intl";
import { PageWrapper } from "./components/page-wrapper";
import { Heading } from "../../[locale]/components/heading";
import clsx from "clsx";
import { Paragraph } from "../../[locale]/components/paragraph";
import { useSanityData } from "../../utils/use-sanity-data";
import { useState } from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";

const GET_FAQ_ITEMS = `*[
  _type == "hackathonFaqItem"
] {
  'question': coalesce(question[$language], question.sl),
  'answer': coalesce(answer[$language], answer.sl)
}`;

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onChangeOpen: () => void;
};
function FaqItem({ question, answer, isOpen, onChangeOpen }: FaqItemProps) {
  return (
    <div
      className={clsx(
        "border rounded-md flex flex-col gap-2 p-6 cursor-pointer",
        {
          "border-red": isOpen,
          "border-gray500": !isOpen,
        }
      )}
      onClick={onChangeOpen}
    >
      <div className="flex justify-between w-full">
        <Heading size="xs" color="white">
          {question}
        </Heading>
        {isOpen ? (
          <IconMinus size={24} className="text-red" />
        ) : (
          <IconPlus size={24} className="text-gray500" />
        )}
      </div>
      {isOpen && (
        <Paragraph size="lg" color="lightGray">
          {answer}
        </Paragraph>
      )}
    </div>
  );
}

export function Faq() {
  const t = useTranslations("Hackathon");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const { data } = useSanityData({
    query: GET_FAQ_ITEMS,
    params: { language: locale },
  });

  const faqItems = (data || []) as Omit<FaqItemProps, "isOpen">[];

  return (
    <PageWrapper>
      <div className="flex flex-col gap-8 md:gap-14 items-center w-full py-4 md:py-5 lg:py-10">
        <Heading
          className="font-paragraph"
          color="white"
          size="lg"
          textAlign="center"
        >
          {t("faq.title")}
        </Heading>
        <div className="flex flex-col gap-4 max-w-[1000px] w-full">
          {faqItems.map(({ question, answer }, index) => (
            <FaqItem
              key={index}
              question={question}
              answer={answer}
              isOpen={isOpen === index}
              onChangeOpen={() =>
                setIsOpen((prevIsOpen) => (prevIsOpen === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
