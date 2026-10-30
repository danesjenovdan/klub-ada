"use client";

import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { plexMono } from "@/src/app/fonts";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
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

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * The design's plus/minus toggle: two 1.8px square-capped strokes. The
 * vertical one turns and fades away when the item opens, leaving the minus.
 */
function ToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      // Sits on the first line of the question, like in the design, even when
      // the question wraps.
      className="mt-[1.5px] h-6 w-6 shrink-0 text-red"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="square"
    >
      <path d="M5 12H19" />
      <motion.path
        d="M12 5V19"
        initial={false}
        animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        style={{ originX: "12px", originY: "12px" }}
      />
    </svg>
  );
}

/** One question. A 2px frame that turns red while it is open. */
function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div
      className={clsx(
        "border-2",
        isOpen ? "border-red bg-[#0c0303]" : "border-[#2c2424]",
      )}
    >
      <h2>
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={onToggle}
          className="flex w-full items-start gap-3 p-4 text-left outline-none focus-visible:bg-[rgba(250,250,250,0.04)] md:gap-4 md:p-6"
        >
          <ToggleIcon isOpen={isOpen} />
          <span className="text-base font-semibold leading-normal tracking-[-0.02em] text-[#fafafa] md:text-lg">
            {question}
          </span>
        </button>
      </h2>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="whitespace-pre-line px-4 pb-4 text-sm font-light leading-normal tracking-[-0.02em] text-[#9d9d9d] [overflow-wrap:anywhere] md:px-6 md:pb-6 md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Page() {
  const t = useTranslations("Hackathon.faq");
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { data, isLoading } = useSanityData({
    query: GET_FAQ_ITEMS,
    params: { language: locale },
    fixtures: FAQ_FIXTURES,
  });

  const faqItems = (data || []) as Pick<FaqItemProps, "question" | "answer">[];

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
              <FaqItem
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
