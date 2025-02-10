import { Heading } from "@/app/components/heading";
import { LinkButton } from "@/app/components/link-button";
import { PageWrapper } from "@/app/components/page-wrapper";
import { Paragraph } from "@/app/components/paragraph";
import Image from "next/image";

export default function Hero() {
  return (
    <PageWrapper>
      <div className="flex flex-col pb-10 md:pb-20 md:px-16 gap-6 items-center">
        <div className="flex flex-col gap-2 items-center">
          <Image
            src="/assets/calendar-illustration.png"
            width={100}
            height={100}
            alt="Calendar illustration"
            className="w-[80px] md:w-[120px] lg:w-[160]"
          />
          <Heading size="lg" className="text-center">
            {"Dogodki"}
          </Heading>
        </div>
        <Paragraph size="lg" className="max-w-xl text-center">
          {
            "Pridruži se nam na neformalnih druženjih, kjer obravnavamo različne karierne in tehnične teme, gostimo strokovnjakinje iz industrije ter se družimo in izmenjujemo ideje v sproščenem okolju ob prigrizkih in pijači."
          }
        </Paragraph>

        <LinkButton size="md" variant="secondary" href="#next-event">
          {"Naslednji dogodek"}
        </LinkButton>
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="flex gap-2 md:gap-4">
          <Image
            src="/assets/dogodek-1.webp"
            width={500}
            height={500}
            alt="Dogodek Image 1"
            className="object-cover w-4/6 rounded-2xl border border-black"
          />
          <Image
            src="/assets/dogodek-2.webp"
            width={500}
            height={500}
            alt="Dogodek Image 2"
            className="object-cover w-2/6 rounded-2xl border border-black"
          />
        </div>
        <div className="flex gap-2 md:gap-4">
          <Image
            src="/assets/dogodek-3.webp"
            width={500}
            height={500}
            alt="Dogodek Image 3"
            className="object-cover w-2/6 rounded-2xl border border-black"
          />
          <Image
            src="/assets/dogodek-4.webp"
            width={500}
            height={500}
            alt="Dogodek Image 4"
            className="object-cover w-4/6 rounded-2xl border border-black"
          />
        </div>
      </div>
    </PageWrapper>
  );
}
