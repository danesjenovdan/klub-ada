"use client";

import { FormEvent, useState } from "react";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { plexMono } from "@/src/app/fonts";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import { AccordionItem } from "../components/accordion-item";
import { Button } from "../components/button";
import { Window, WindowLoading } from "../components/window";
import { TREASURE_HUNT_FIXTURES } from "../_dev/fixtures";

// The password, lowercased, without diacritics, spaces or punctuation.
// It sits in the client bundle, like last year: finding it there is a fair
// solve too.
const SOLUTION = "naredispremembo";

const GET_PUZZLES = `*[_type == "hack26TreasureHuntPuzzle"] | order(order asc) {
  'hints': hints[]{ 'text': coalesce(@[$language], sl) }.text
}`;

type Puzzle = { hints: string[] };

type Result = "success" | "failure" | null;

export default function Page() {
  const t = useTranslations("Hackathon.treasure_hunt");
  const locale = useLocale();
  const { data, isLoading } = useSanityData({
    query: GET_PUZZLES,
    params: { language: locale },
    fixtures: TREASURE_HUNT_FIXTURES,
  });
  const puzzles = (data || []) as Puzzle[];
  const [open, setOpen] = useState<string | null>(null);
  const [solution, setSolution] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<Result>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsChecking(true);
    setResult(null);
    // A short pause for suspense.
    setTimeout(() => {
      const isCorrect =
        solution
          .normalize("NFD") // "č" -> "c" + caron, which the replace drops
          .replace(/[^a-z0-9]+/gi, "")
          .toLowerCase() === SOLUTION;
      setResult(isCorrect ? "success" : "failure");
      if (!isCorrect) setSolution("");
      setIsChecking(false);
    }, 1500);
  };

  return (
    <Window title={t("title")}>
      <div
        className={clsx(
          "mx-auto flex max-w-[706px] flex-col gap-10 py-2 md:py-6",
          plexMono.className,
        )}
      >
        <div className="flex flex-col gap-6 border-2 border-red bg-[#0c0303] p-4 md:p-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold uppercase leading-normal tracking-[-0.02em] text-[#fafafa] md:text-2xl">
              {t("title")}
            </h1>
            <p className="text-sm font-light leading-normal tracking-[-0.02em] text-[#9d9d9d] md:text-base">
              {t("description")}
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              aria-label={t("placeholder")}
              placeholder={t("placeholder")}
              value={solution}
              onChange={(event) => setSolution(event.target.value)}
              autoComplete="off"
              spellCheck={false}
              className="h-9 min-w-0 grow border-2 border-[#2c2424] bg-black px-3 text-base text-[#fafafa] outline-none placeholder:text-[#6b6b6b] focus:border-red md:h-11"
            />
            <Button type="submit" isDisabled={isChecking || !solution.trim()}>
              {isChecking ? "..." : t("cta")}
            </Button>
          </form>
          {result && (
            <p
              role="status"
              className={clsx(
                "text-sm leading-normal tracking-[-0.02em] md:text-base",
                result === "success" ? "text-[#fafafa]" : "text-red",
              )}
            >
              {t(result)}
            </p>
          )}
        </div>
        {/* The answer box works on its own, so only the hints wait for
            Sanity, and the help is left out until there are hints to show. */}
        {isLoading ? (
          <WindowLoading />
        ) : (
          puzzles.length > 0 && (
            <>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold uppercase leading-normal tracking-[-0.02em] text-[#fafafa] md:text-xl">
                  {t("more_help")}
                </h2>
                <p className="text-sm font-light leading-normal tracking-[-0.02em] text-[#9d9d9d] md:text-base">
                  {t("more_help_description")}
                </p>
              </div>
              {puzzles.map(({ hints }, puzzle) => (
                <section key={puzzle} className="flex flex-col gap-3">
                  <h3 className="text-base font-semibold uppercase tracking-[0.125em] text-red">
                    {t("puzzle", { number: puzzle + 1 })}
                  </h3>
                  <div className="flex flex-col gap-0.5">
                    {hints.map((hint, index) => {
                      const key = `${puzzle}-${index}`;
                      return (
                        <AccordionItem
                          key={key}
                          question={t("hint", { number: index + 1 })}
                          answer={hint}
                          isOpen={open === key}
                          onToggle={() =>
                            setOpen((previous) =>
                              previous === key ? null : key,
                            )
                          }
                        />
                      );
                    })}
                  </div>
                </section>
              ))}
            </>
          )
        )}
      </div>
    </Window>
  );
}
