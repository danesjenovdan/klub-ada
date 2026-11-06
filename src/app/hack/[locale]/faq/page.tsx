"use client";

import { useState } from "react";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { plexMono } from "@/src/app/fonts";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import {
  AccordionItem,
  AccordionItemProps,
} from "../components/accordion-item";
import { Button } from "../components/button";
import { Window, WindowLoading } from "../components/window";
import { FAQ_FIXTURES } from "../_dev/fixtures";

const GET_FAQ_ITEMS = `*[
  _type == "hackathonFaqItem"
] | order(order asc) {
  'question': coalesce(question[$language], question.sl),
  'answer': coalesce(answer[$language], answer.sl)
}`;

const CONTACT_EMAIL = "info@klub-ada.si";

export default function Page() {
  const t = useTranslations("Hackathon.faq");
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { data, isLoading } = useSanityData({
    query: GET_FAQ_ITEMS,
    params: { language: locale },
    fixtures: FAQ_FIXTURES,
  });

  const faqItems = (data || []) as Pick<
    AccordionItemProps,
    "question" | "answer"
  >[];

  return (
    <Window title={t("title")}>
      {isLoading ? (
        <WindowLoading />
      ) : (
        <div
          className={clsx(
            "mx-auto flex max-w-[706px] flex-col gap-10 py-2 md:py-6",
            plexMono.className,
          )}
        >
          <div className="flex flex-col gap-0.5">
            {faqItems.map(({ question, answer }, index) => (
              <AccordionItem
                key={question}
                question={question}
                answer={answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((previous) =>
                    previous === index ? null : index,
                  )
                }
              />
            ))}
          </div>
          <Button as="a" href={`mailto:${CONTACT_EMAIL}`} className="mx-auto">
            {t("ask")}
          </Button>
        </div>
      )}
    </Window>
  );
}
