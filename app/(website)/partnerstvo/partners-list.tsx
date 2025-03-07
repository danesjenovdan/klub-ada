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
            src="/assets/teads-logo.webp"
            alt="Outbrain logo"
            width={200}
            height={50}
            className="h-16 w-40 object-contain"
          />
        </div>

        {/* Silver Partners */}
        <div className="flex flex-col gap-5 md:gap-10 items-center justify-center">
          <Paragraph size="xl">Srebrni partnerji</Paragraph>
          <div className="flex md:flex-row flex-col gap-8 md:gap-16 items-center justify-center">
            <Image
              src="/assets/celtra-logo.webp"
              alt="Celtra logo"
              width={200}
              height={80}
              className="h-16 w-40 object-contain"
            />
            <Image
              src="/assets/dewesoft-logo.svg"
              alt="Dewesoft logo"
              width={200}
              height={80}
              className="h-16 w-46 object-contain"
            />
          </div>
        </div>

        {/* Project Partners */}
        <div className="flex flex-col gap-5 md:gap-10 items-center justify-center">
          <Paragraph size="xl">Projektni partnerji</Paragraph>
          <div className="flex md:flex-row flex-col gap-8 md:gap-16 items-center justify-center">
            <Image
              src="/assets/impact-hub-logo.webp"
              alt="Impact Hub Ljubljana logo"
              width={200}
              height={50}
              className="h-16 w-40 object-contain"
            />
            <Image
              src="/assets/fri-logo.webp"
              alt="FRI logo"
              width={220}
              height={50}
              className="h-16 w-40 object-contain"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
