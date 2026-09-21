import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Heading } from "@/src/app/[locale]/components/heading";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { Window } from "../components/window";

type PrizeItemProps = {
  amount: number;
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
        {`${amount} EUR`}
      </Heading>
    </div>
  );
}

export default function Page() {
  const t = useTranslations("Hackathon");
  // Last edition's prizes, kept until the 2026 ones are decided.
  const t25 = useTranslations("Hackathon25");

  const challenges = [
    { name: t25("challenges.1"), company: "Abelium" },
    { name: t25("challenges.2"), company: "Smartis" },
    { name: t25("challenges.3"), company: "Epilog" },
    { name: t25("challenges.4"), company: "Calda" },
  ];

  return (
    <Window title={t("pages.rewards")}>
      <div className="flex flex-col gap-4 max-w-[1000px] mx-auto">
        <PrizeItem amount={2000} title={t25("winner")} isMain />
        <div className="flex items-stretch flex-wrap gap-4">
          {challenges.map(({ name, company }) => (
            <PrizeItem
              key={company}
              amount={500}
              title={t25("challenge", { company })}
              subtitle={name}
            />
          ))}
        </div>
      </div>
    </Window>
  );
}
