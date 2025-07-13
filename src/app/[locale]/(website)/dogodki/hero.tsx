import { Heading } from "@/src/app/[locale]/components/heading";
import { LinkButton } from "@/src/app/[locale]/components/link-button";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import Image from "next/image";
import dogodek1 from "../../../../../public/assets/dogodek-1.webp";
import dogodek2 from "../../../../../public/assets/dogodek-2.webp";
import dogodek3 from "../../../../../public/assets/dogodek-3.webp";
import dogodek4 from "../../../../../public/assets/dogodek-4.webp";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Events");
  return (
    <PageWrapper>
      <div className="flex flex-col pb-10 md:pb-20 md:px-16 gap-6 items-center">
        <div className="flex flex-col gap-2 items-center">
          <Image
            src="/assets/calendar-illustration.svg"
            width={100}
            height={100}
            alt="Calendar illustration"
            className="w-[80px] md:w-[120px] lg:w-[160]"
          />
          <Heading size="lg" className="text-center">
            {t("title")}
          </Heading>
        </div>
        <Paragraph size="lg" className="max-w-xl text-center">
          {t("description")}
        </Paragraph>

        <LinkButton size="md" variant="secondary" href="#next-event">
          {t("cta_next_event")}
        </LinkButton>
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4">
          <Image
            src={dogodek1}
            width={800}
            height={800}
            alt="Dogodek Image 1"
            className="object-cover w-full md:w-4/6 rounded-2xl border border-black"
            placeholder="blur"
            priority
          />
          <Image
            src={dogodek2}
            width={650}
            height={650}
            alt="Dogodek Image 2"
            className="object-cover w-full md:w-2/6 rounded-2xl border border-black"
            placeholder="blur"
          />
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4">
          <Image
            src={dogodek3}
            width={650}
            height={650}
            alt="Dogodek Image 3"
            className="object-cover w-full md:w-2/6 rounded-2xl border border-black"
            placeholder="blur"
          />
          <Image
            src={dogodek4}
            width={800}
            height={800}
            alt="Dogodek Image 4"
            className="object-cover w-full md:w-4/6 rounded-2xl border border-black"
            placeholder="blur"
          />
        </div>
      </div>
    </PageWrapper>
  );
}
