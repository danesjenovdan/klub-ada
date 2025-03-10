import { Heading } from "@/app/components/heading";
import { PageWrapper } from "@/app/components/page-wrapper";
import { Paragraph } from "@/app/components/paragraph";
import Image from "next/image";

export function PartnersList() {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-20 md:gap-28">
        {/* Gold Partners */}
        <div className="flex flex-col gap-4 md:gap-8 items-center justify-center">
          <Paragraph size="xl">Zlati partnerji</Paragraph>
          <Image
            src="/assets/logo-teads.svg"
            alt="Outbrain logo"
            width={200}
            height={50}
            className="h-30 object-contain"
          />
        </div>

        {/* Silver Partners */}
        <div className="flex flex-col gap-4 md:gap-8 items-center justify-center">
          <Paragraph size="xl">Srebrni partnerji</Paragraph>
          <div className="flex md:flex-row flex-col gap-8 md:gap-16 items-center justify-center">
            <Image
              src="/assets/logo-celtra.svg"
              alt="Celtra logo"
              width={200}
              height={80}
              className="h-28 object-contain"
            />
            <Image
              src="/assets/logo-dewesoft.svg"
              alt="Dewesoft logo"
              width={200}
              height={80}
              className="h-28 object-contain"
            />
          </div>
        </div>

        {/* Project Partners */}
        <div className="flex flex-col gap-4 md:gap-8 items-center justify-center">
          <Paragraph size="xl">Projektni partnerji</Paragraph>
          <div className="flex md:flex-row flex-col gap-8 md:gap-16 items-center justify-center">
            <Image
              src="/assets/logo-impact-hub-lj.svg"
              alt="Impact Hub Ljubljana logo"
              width={200}
              height={50}
              className="h-28 object-contain"
            />
            <Image
              src="/assets/logo-fri.svg"
              alt="FRI logo"
              width={220}
              height={50}
              className="h-28 object-contain"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
