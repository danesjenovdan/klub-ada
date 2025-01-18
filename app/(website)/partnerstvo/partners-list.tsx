import { Heading } from "@/app/components/heading";
import { PageWrapper } from "@/app/components/page-wrapper";
import { Paragraph } from "@/app/components/paragraph";
import Image from "next/image";

export function PartnersList() {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-20 md:gap-28">
        {/* Gold Partners */}
        <div className="flex flex-col gap-5 md:gap-10 items-center justify-center">
          <Paragraph size="xl">Zlati partnerji</Paragraph>
          <Image
            src="/assets/outbrain-logo.png"
            alt="Outbrain logo"
            width={200}
            height={50}
            className="h-9 md:h-12 w-full object-contain"
          />
        </div>

        {/* Silver Partners */}
        <div className="flex flex-col gap-5 md:gap-10 items-center justify-center">
          <Paragraph size="xl">Srebrni partnerji</Paragraph>
          <Image
            src="/assets/celtra-logo.png"
            alt="Celtra logo"
            width={200}
            height={80}
            className="h-16 w-full object-contain"
          />
        </div>

        {/* Project Partners */}
        <div className="flex flex-col gap-5 md:gap-10 items-center justify-center">
          <Paragraph size="xl">Projektni partnerji</Paragraph>
          <div className="flex md:flex-row flex-col gap-8 md:gap-16">
            <Image
              src="/assets/impact-hub-logo.png"
              alt="Impact Hub Ljubljana logo"
              width={200}
              height={50}
              className="h-16 w-full object-contain"
            />
            <Image
              src="/assets/fri-logo.png"
              alt="FRI logo"
              width={220}
              height={50}
              className="h-16 w-full object-contain"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
