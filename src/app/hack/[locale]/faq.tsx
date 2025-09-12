"use client";

import { AnimatePresence, motion } from "framer-motion";
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
] | order(order asc) {
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
      className={clsx("border rounded-md p-6 cursor-pointer", {
        "border-red shadow-shineStrongRed": isOpen,
        "border-gray500": !isOpen,
      })}
      onClick={onChangeOpen}
    >
      <div className="flex justify-between w-full">
        <Paragraph size="xl" weight="bold" color="white">
          {question}
        </Paragraph>
        <div className="relative w-6 h-6 flex items-center justify-center">
          <motion.div
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0.9,
              scale: isOpen ? 1 : 0.9,
            }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <IconMinus
              className={isOpen ? "text-red" : "text-gray500"}
              size={24}
            />
          </motion.div>
          <motion.div
            initial={false}
            animate={{
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <IconPlus
              className={isOpen ? "text-red" : "text-gray500"}
              size={24}
            />
          </motion.div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div transition={{ duration: 0.8 }}>
              <Paragraph size="lg" color="lightGray">
                {answer}
              </Paragraph>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
