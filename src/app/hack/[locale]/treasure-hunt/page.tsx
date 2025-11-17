"use client";

import UnicornScene from "unicornstudio-react/next";
import { PageWrapper } from "../components/page-wrapper";
import { useTranslations } from "next-intl";
import Image from "next/image";
import racka from "../../../../../public/assets/hackathon/racka.svg";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { LinkButton } from "../components/link-button";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import { FaqItem } from "../faq";
import { Button } from "../components/button";

export default function Page() {
  const t = useTranslations("Hackathon");
  const [isOpen, setIsOpen] = useState<{
    puzzle: number | null;
    hint: number | null;
  }>({ puzzle: null, hint: null });
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSolutionSubmit = () => {
    setIsLoading(true);
    // Fake loading state hehe
    const fixedSolution = solution.replace(/[^A-Z0-9]+/gi, "").toLowerCase();
    setTimeout(() => {
      if (["hekajmozracko"].includes(fixedSolution)) {
        alert(t("treasure_hunt.success"));
      } else {
        alert(t("treasure_hunt.failure"));
        setSolution("");
      }
      setIsLoading(false);
    }, 2000);
  };

  const uganka1 = [
    {
      title: t("treasure_hunt.hint", { number: 1 }),
      hint: t("treasure_hunt.puzzle_1.hint_1"),
    },
    {
      title: t("treasure_hunt.hint", { number: 2 }),
      hint: t("treasure_hunt.puzzle_1.hint_2"),
    },
    {
      title: t("treasure_hunt.hint", { number: 3 }),
      hint: t("treasure_hunt.puzzle_1.hint_3"),
    },
  ];
  const uganka2 = [
    {
      title: t("treasure_hunt.hint", { number: 1 }),
      hint: t("treasure_hunt.puzzle_2.hint_1"),
    },
    {
      title: t("treasure_hunt.hint", { number: 2 }),
      hint: t("treasure_hunt.puzzle_2.hint_2"),
    },
    {
      title: t("treasure_hunt.hint", { number: 3 }),
      hint: t("treasure_hunt.puzzle_2.hint_3"),
    },
  ];
  const uganka3 = [
    {
      title: t("treasure_hunt.hint", { number: 1 }),
      hint: t("treasure_hunt.puzzle_3.hint_1"),
    },
    {
      title: t("treasure_hunt.hint", { number: 2 }),
      hint: t("treasure_hunt.puzzle_3.hint_2"),
    },
    {
      title: t("treasure_hunt.hint", { number: 3 }),
      hint: t("treasure_hunt.puzzle_3.hint_3"),
    },
  ];
  const uganka4 = [
    {
      title: t("treasure_hunt.hint", { number: 1 }),
      hint: t("treasure_hunt.puzzle_4.hint_1"),
    },
    {
      title: t("treasure_hunt.hint", { number: 2 }),
      hint: t("treasure_hunt.puzzle_4.hint_2"),
    },
    {
      title: t("treasure_hunt.hint", { number: 3 }),
      hint: t("treasure_hunt.puzzle_4.hint_3"),
    },
  ];
  const uganka5 = [
    {
      title: t("treasure_hunt.hint", { number: 1 }),
      hint: t("treasure_hunt.puzzle_5.hint_1"),
    },
    {
      title: t("treasure_hunt.hint", { number: 2 }),
      hint: t("treasure_hunt.puzzle_5.hint_2"),
    },
    {
      title: t("treasure_hunt.hint", { number: 3 }),
      hint: t("treasure_hunt.puzzle_5.hint_3"),
    },
  ];

  return (
    <div className="box-border bg-[#000] max-w-full min-h-[100vh] relative">
      <div className="hidden md:block fixed top-0 left-0 bottom-0 right-0">
        <UnicornScene
          projectId="37S3ad8JDraTZQd2BVQn"
          width="100%"
          height="100vh"
        />
      </div>
      <div className="block md:hidden fixed top-0 left-0 bottom-0 right-0 inset-0">
        <video
          className="w-full h-full object-cover bg-black"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23000000'/%3E%3C/svg%3E"
        >
          <source
            src="/assets/hackathon/hackathon-loop.webm"
            type="video/webm"
          />
        </video>
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 overflow-scroll">
        <PageWrapper>
          <div className="flex flex-col gap-3 items-start">
            <LinkButton iconLeft={IconArrowLeft} href="/">
              {t("treasure_hunt.back")}
            </LinkButton>
            <div className="flex flex-col gap-4 sm:gap-6 bg-[rgba(255,87,87,0.16)] border border-red shadow-shineRed rounded-lg items-center w-full py-6 sm:py-8 md:py-14 px-4 sm:px-6">
              <Image
                src={racka}
                alt="Duck image"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 object-contain"
              />
              <h1 className="font-paragraph font-extrabold text-white text-2xl sm:text-3xl md:text-5xl text-center tracking-tight max-w-2xl px-2">
                {t("treasure_hunt.title")}
              </h1>
              <Paragraph
                size="lg"
                weight="medium"
                color="white"
                textAlign="center"
                className="max-w-xl px-2"
              >
                {t("treasure_hunt.description")}
              </Paragraph>
              <div className="flex flex-col md:flex-row gap-3 w-full max-w-96 items-center">
                <input
                  type="email"
                  placeholder={t("treasure_hunt.placeholder")}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="w-full h-11 py-2 px-4 bg-white text-black border border-black rounded-lg"
                />
                <Button
                  className="w-24"
                  isDisabled={isLoading}
                  onClick={handleSolutionSubmit}
                >
                  {isLoading ? "..." : t("treasure_hunt.cta")}
                </Button>
              </div>
            </div>
            “
            <h3 className="font-paragraph font-extrabold text-white text-xl sm:text-2xl md:text-2xl text-center tracking-tight max-w-2xl">
              {t("treasure_hunt.more_help")}
            </h3>
            <Paragraph weight="medium" color="white" textAlign="center">
              {t("treasure_hunt.more_help_description")}
            </Paragraph>
          </div>
          <div className="h-12" />
          <div className="flex flex-col gap-4 max-w-[1000px] w-full">
            <h3 className="font-paragraph font-extrabold text-white text-xl sm:text-2xl md:text-2xl text-center tracking-tight">
              {t("treasure_hunt.puzzle", { number: 1 })}
            </h3>
            {uganka1.map(({ title, hint }, index) => (
              <FaqItem
                key={index}
                question={title}
                answer={hint}
                isOpen={isOpen.puzzle === 1 && isOpen.hint === index}
                onChangeOpen={() =>
                  setIsOpen(({ puzzle, hint }) => {
                    if (puzzle === 1 && hint === index)
                      return {
                        puzzle: null,
                        hint: null,
                      };
                    return { puzzle: 1, hint: index };
                  })
                }
              />
            ))}
          </div>
          <div className="h-12" />
          <div className="flex flex-col gap-4 max-w-[1000px] w-full">
            <h3 className="font-paragraph font-extrabold text-white text-xl sm:text-2xl md:text-2xl text-center tracking-tight">
              {t("treasure_hunt.puzzle", { number: 2 })}
            </h3>
            {uganka2.map(({ title, hint }, index) => (
              <FaqItem
                key={index}
                question={title}
                answer={hint}
                isOpen={isOpen.puzzle === 2 && isOpen.hint === index}
                onChangeOpen={() =>
                  setIsOpen(({ puzzle, hint }) => {
                    if (puzzle === 2 && hint === index)
                      return {
                        puzzle: null,
                        hint: null,
                      };
                    return { puzzle: 2, hint: index };
                  })
                }
              />
            ))}
          </div>
          <div className="h-12" />
          <div className="flex flex-col gap-4 max-w-[1000px] w-full">
            <h3 className="font-paragraph font-extrabold text-white text-xl sm:text-2xl md:text-2xl text-center tracking-tight">
              {t("treasure_hunt.puzzle", { number: 3 })}
            </h3>
            {uganka3.map(({ title, hint }, index) => (
              <FaqItem
                key={index}
                question={title}
                answer={hint}
                isOpen={isOpen.puzzle === 3 && isOpen.hint === index}
                onChangeOpen={() =>
                  setIsOpen(({ puzzle, hint }) => {
                    if (puzzle === 3 && hint === index)
                      return {
                        puzzle: null,
                        hint: null,
                      };
                    return { puzzle: 3, hint: index };
                  })
                }
              />
            ))}
          </div>
          <div className="h-12" />
          <div className="flex flex-col gap-4 max-w-[1000px] w-full">
            <h3 className="font-paragraph font-extrabold text-white text-xl sm:text-2xl md:text-2xl text-center tracking-tight">
              {t("treasure_hunt.puzzle", { number: 4 })}
            </h3>
            {uganka4.map(({ title, hint }, index) => (
              <FaqItem
                key={index}
                question={title}
                answer={hint}
                isOpen={isOpen.puzzle === 4 && isOpen.hint === index}
                onChangeOpen={() =>
                  setIsOpen(({ puzzle, hint }) => {
                    if (puzzle === 4 && hint === index)
                      return {
                        puzzle: null,
                        hint: null,
                      };
                    return { puzzle: 4, hint: index };
                  })
                }
              />
            ))}
          </div>
          <div className="h-12" />
          <div className="flex flex-col gap-4 max-w-[1000px] w-full">
            <h3 className="font-paragraph font-extrabold text-white text-xl sm:text-2xl md:text-2xl text-center tracking-tight">
              {t("treasure_hunt.puzzle", { number: 5 })}
            </h3>
            {uganka5.map(({ title, hint }, index) => (
              <FaqItem
                key={index}
                question={title}
                answer={hint}
                isOpen={isOpen.puzzle === 5 && isOpen.hint === index}
                onChangeOpen={() =>
                  setIsOpen(({ puzzle, hint }) => {
                    if (puzzle === 5 && hint === index)
                      return {
                        puzzle: null,
                        hint: null,
                      };
                    return { puzzle: 5, hint: index };
                  })
                }
              />
            ))}
          </div>
        </PageWrapper>
      </div>
    </div>
  );
}
